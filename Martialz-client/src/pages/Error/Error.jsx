import error from '../../assets/error.json'
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';


const Error = () => {

  return (
    <div className='text-center'>
      <Player 
      src={error}
      loop
      autoplay
      className='md:w-[500px] w-[200px]'
      ></Player>
    <div className='text-center'>
    <Link className='btn btn-error' to={'/'}>Go to Home page</Link>
    </div>
    </div>
  );
};

export default Error;