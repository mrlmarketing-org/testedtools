import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Industries from './components/Industries'
import Process from './components/Process'
import WhyHireUs from './components/WhyHireUs'
import TechStack from './components/TechStack'
import Outcomes from './components/Outcomes'
import CaseStudies from './components/CaseStudies'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Industries />
        <Process />
        <WhyHireUs />
        <TechStack />
        <Outcomes />
        <CaseStudies />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
