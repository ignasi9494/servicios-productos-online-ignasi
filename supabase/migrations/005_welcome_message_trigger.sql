-- Auto-send welcome message when a new project is created from questionnaire
-- Trigger fires on INSERT to projects with status 'pending_proposal'

CREATE OR REPLACE FUNCTION fn_send_welcome_message()
RETURNS TRIGGER AS $$
DECLARE
  admin_id uuid;
BEGIN
  -- Find the first admin user to use as sender
  SELECT p.user_id INTO admin_id
  FROM profiles p
  WHERE p.role = 'admin'
  LIMIT 1;

  -- Fallback: use the client themselves if no admin exists
  IF admin_id IS NULL THEN
    admin_id := NEW.client_id;
  END IF;

  INSERT INTO messages (project_id, sender_id, sender_role, content)
  VALUES (
    NEW.id,
    admin_id,
    'admin',
    '¡Hola! 👋 Gracias por completar el cuestionario. Hemos recibido toda la información de tu proyecto y nuestro equipo ya está trabajando en tu propuesta personalizada.' || chr(10) || chr(10) || 'Recibirás la propuesta detallada en menos de 24 horas. Si tienes alguna duda mientras tanto, no dudes en escribirnos por aquí.' || chr(10) || chr(10) || '¡Estamos encantados de trabajar contigo!'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_welcome_message ON projects;
CREATE TRIGGER trg_welcome_message
  AFTER INSERT ON projects
  FOR EACH ROW
  WHEN (NEW.status = 'pending_proposal')
  EXECUTE FUNCTION fn_send_welcome_message();
