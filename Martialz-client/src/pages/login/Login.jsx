import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useContext, useState} from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import Container from '../../Layout/Container'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setLoading, signIn, signInWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  // Handle submit
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false)


  const onSubmit = data => {
    signIn(data.email, data.password)
    .then(()=> {
  
      toast.success('Successfully Loged in')
      navigate(from, { replace: true })
    })
    .catch(err => {
      setLoading(false)
      console.log(err.message)
      toast.error(err.message)
    })
  };

  // Handle google signin
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {

  // Save User Info Into Database
        const userInfo = result?.user
        const userData = {
          name: userInfo?.displayName,
          email: userInfo?.email,
          photoURL: userInfo?.photoURL
        }       
  
      fetch(`${import.meta.env.VITE_URL}/users`, {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(userData)
      })
      .then(res => res.json())
      .then(data => {
        navigate(from, { replace: true })
        if(data.insertedId) {
          toast.success('Signup successful')
        } 
      });
      })
      .catch(err => {
        setLoading(false)
        console.log(err.message)
        toast.error(err.message)
      })
  }

 
  return (
   <Container>
      <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign In</h1>
          <p className='text-sm text-gray-400'>Welcome to MARTIALZ</p>
        </div>
        <form
           onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                {...register("email")}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
        
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
           <div className='relative'>
           <input
                type={`${show ? 'text' : 'password'}`}
                name='password'
                {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/ })}
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900'
                />   
                {
                  show ?  <FaEye onClick={()=>setShow(!show)} className='absolute top-2 text-2xl right-5'></FaEye> : <FaEyeSlash onClick={()=>setShow(!show)} className='absolute top-2 text-2xl right-5'></FaEyeSlash> 
                }
           </div>
            </div> 
          </div>
          <div>
            <button
              type='submit'
              className='bg-error w-full rounded-md py-3 text-white'
            >
            Sign In
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Dont have an account?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-error text-gray-600'
          >
           SignUp
          </Link>
          .
        </p>
      </div>
    </div>
   </Container>
  )
}

export default Login