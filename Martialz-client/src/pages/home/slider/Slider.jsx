import Container from '../../../Layout/Container';
import slider1 from '../../../assets/sliderImg/slide_01.jpg'
import slider2 from '../../../assets/sliderImg/slide_02.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion"


const Slider = () => {
  return (
    <>
<Carousel autoPlay={true} infiniteLoop={true} emulateTouch={false} showThumbs={false} >
<motion.div
  initial={{ opacity: 0,scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.4}}
className=" hero h-[380px] md:min-h-screen text-left bg-center object-cover w-full" style={{ backgroundImage: `url(${slider1})`}}>
  <div className="hero-overlay bg-black bg-opacity-30"></div>
    <div className="w-full">
    <Container>
    <div className="md:w-1/2">
      <h1 className="mb-5 text-3xl md:text-7xl font-bold text-slate-50">Welcome to  Arts <br /> MAIRTIALZ school</h1>
      <p className="mb-5 text-slate-300 text-lg">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-outline btn-error">Get A Lesson</button>
    </div>
    </Container>
  </div>
</motion.div>

<div className=" hero h-[380px] md:min-h-screen text-left bg-current" style={{ backgroundImage: `url(${slider2})`}}>
  <div className="hero-overlay bg-black bg-opacity-30"></div>
    <div className="w-full">
    <Container>
    <div className="md:w-1/2">
      <h1 className="mb-5 text-3xl md:text-7xl font-bold text-slate-50">Welcome to  Arts <br /> MAIRTIALZ school</h1>
      <p className="mb-5 text-slate-300 text-lg">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-outline btn-error">Get A Lesson</button>
    </div>
    </Container>
  </div>
</div>
</Carousel>
</>
  );
};

export default Slider;