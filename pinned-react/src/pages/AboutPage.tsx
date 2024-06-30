import  About  from '@/components/about page/about'; 
import OurTeam from '@/components/about page/team';
import GradientBackground from '@/components/shared/gradientbackground';

const AboutPage = () => {
  return (
    <section className='mt-0 space-y-10'>
      <GradientBackground />
         
      <About />
      <OurTeam />
    </section>
  )
}

export default AboutPage;
