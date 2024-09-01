import  About  from '@/components/about page/about'; 
import OurTeam from '@/components/about page/team';
import GradientBackground from '@/components/shared/gradientbackground';

const AboutPage = () => {
  return (
    <section className='mt-8'>
      <GradientBackground />
      <div className='space-y-20'>
        <About />
        <OurTeam />
      </div>
    </section>
  )
}

export default AboutPage;
