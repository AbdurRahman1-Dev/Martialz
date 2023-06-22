import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Title from "../../components/shared/Title";
import animation from '../../assets/dashboard.json';
import { Player } from '@lottiefiles/react-lottie-player';

const MinDashBoard = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Title title={`Welcome ${user?.displayName}`}></Title>
      <div>
      <Player 
      src={animation}
      loop
      autoplay
      className='md:w-[800px] w-[250px]'
      ></Player>
      </div>
    </div>
  );
};

export default MinDashBoard;