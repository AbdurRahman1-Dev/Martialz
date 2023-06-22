import Container from '../../../Layout/Container';
import bgImg from '../../../assets/sliderImg/bgImg.jpg'
import { motion } from "framer-motion"

const About = () => {
  return (
<>
<motion.div
 initial={{ opacity: 0,scale: 0.8 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: false }}
 transition={{ duration: 0.5 }}

className=" hero min-h-screen text-left bg-center" style={{ backgroundImage: `url(${bgImg})`}}>
    <div className="hero-overlay bg-black bg-opacity-30"></div>
      <div className="w-full">
      <Container>
      <div className="md:w-1/2 ms-auto">
        <h1 className="mb-5 text-5xl md:text-5xl font-semibold text-slate-50">About <span className='text-error'>MAIRTIALZ</span> school</h1>
        <hr className='w-10 border-2 border-error' />
        <p className="mb-5 text-slate-200 text-lg pt-3">MAIRTIALZ School has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.</p>
        <p className='mb-5 text-slate-200 text-l'>
        We teach martial arts because we love it — not because we want to make money on you. Unlike other martial arts schools, we do not require you to sign long term contracts. You just pay one low monthly fee for your martial arts and self defense classes at the beginning of each month. Many martial arts
        </p>
        <div className='mb-3'>
          <h3 className=' text-3xl md:text-4xl font-semibold text-slate-50'>
          Aiden Richards
          </h3>
          <span className='text-error'>Director / Instructor</span>
        </div>
        <button className="btn btn-outline btn-error">Get A Lesson</button>
      </div>
      </Container>
    </div>
  </motion.div>
</>
  );
};

export default About;