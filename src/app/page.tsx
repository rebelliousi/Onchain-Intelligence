import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import BentoGrid from '@/components/sections/BentoGrid'
import NetworkSection from '@/components/sections/Network'
import GuardianSection from '@/components/sections/Guardian'
import PulseSection from '@/components/sections/Pulse'
import Footer from '@/components/sections/Footer'
import DashboardPage from './dashboard/page'
import Dashboard from '@/components/sections/Dashboard'

export default function Home() {
  return (
    <main style={{ background: '#050505' }}>
      <Navbar />
      <Hero />
      <BentoGrid />  
      <GuardianSection />
      <PulseSection/>
    
      <Footer/>
    </main>
  )
}