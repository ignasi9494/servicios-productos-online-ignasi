/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { AddOns } from './components/AddOns';
import { Maintenance } from './components/Maintenance';
import { Retainer } from './components/Retainer';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { ScrollToTop } from './components/ScrollToTop';
import { Testimonials } from './components/Testimonials';
import { usePageTitle } from './hooks/usePageTitle';

export default function App() {
  usePageTitle('Think Better | Estudio AI-first en Barcelona');
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <Hero />
      <SocialProof />
      <Benefits />
      <Pricing />
      <AddOns />
      <Maintenance />
      <Retainer />
      <Process />
      <Team />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <CookieBanner />
      <ScrollToTop />
    </div>
  );
}
