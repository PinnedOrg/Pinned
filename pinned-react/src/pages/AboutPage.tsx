import  About  from '@/components/about page/about'; 
import OurTeam from '@/components/about page/team';

const AboutPage = () => {
  return (
    <section className='mt-0 space-y-10'>
      <div className='fixed top-0 w-full h-screen bg-gradient-to-b from-background via-background to-primary-background -z-10'></div>
         
      <About />
      <OurTeam />
    </section>
  )
}

export default AboutPage;
