import Classes from "../../Classes/Classes";
import About from "../About/About";
import Instractors from "../Instructors/Instructors";
import Slider from "../slider/Slider";

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <Classes slice={6} title={'Popular Classes'}></Classes>
      <About></About>
      <Instractors slice={6} ></Instractors>
    </>
  );
};

export default Home;