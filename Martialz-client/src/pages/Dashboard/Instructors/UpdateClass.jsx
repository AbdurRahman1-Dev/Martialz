import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const Image_Hosting_token = import.meta.env.VITE_IMAGE_upload;


const UpdateClass = () => {
const {user} = useContext(AuthContext);
const { register, handleSubmit} = useForm();
const myClass = useLoaderData();


  // Submit class function
  const onSubmit = async data => {
  // classes necessary info added
    const availableSeats = parseInt(data.availableSeats);
    data.availableSeats = availableSeats;

 
    // uploading to imgbb
    try{
      const formData = new FormData();
      formData.append('image', data.classImage[0]);
      formData.append('key', Image_Hosting_token);
  
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if(response.ok) {
        data.classImage = result.data.display_url;
      }
    } catch (error) {
      console.log(error);
    }

  // add to databse
    fetch(`${import.meta.env.VITE_URL}/updateclass/${myClass?._id}`, {
      method: 'PATCH',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify( data)
    })
    .then(res => res.json())
    .then(() => {
      toast.success('class Updated')
    })

  }
  return (
    <div className='flex w-full'>
    <div className='flex flex-col  p-6 rounded-md w-full'>
      <div className='mb-8 text-center'>
        <h1 className='my-3 text-4xl font-bold'>Update Classes</h1>
      </div>
      <form
         onSubmit={handleSubmit(onSubmit)}
        noValidate=''
        action=''
        className='space-y-6  w-full'
      >
        <div className='space-y-4'>
  
          <div className="md:flex justify-between gap-5">
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
              Name
            </label>
            <input
              type='text'
              {...register("name")}     
              name="name"
              defaultValue={user?.displayName}
              placeholder='Class Name'
              className='px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900'
            />
          </div> 
  
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
              Email 
            </label>
            <input
              type='email'
              name='email'
              {...register("email")}
             defaultValue={user?.email}
              id='email'
              placeholder='Enter Your Email Here'
              className='w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900'
            />
          </div>
          </div>
  
  
          <div className="md:flex justify-between gap-5">
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
              Class Name
            </label>
            <input
              type='text'
              {...register("className")}     
              defaultValue={myClass?.className}
              placeholder='Class Name'
              className='px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900'
            />
          </div> 
  
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
            Available seats 
            </label>
            <input
              type='number'
              {...register("availableSeats")}
              defaultValue={myClass?.availableSeats}
              placeholder='Available seats'
              className='w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900'
            />
          </div>
          </div> 
          
          <div className="md:flex justify-between gap-5">
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
              Price
            </label>
            <input
              type='text'
              {...register("price")}   
              defaultValue={myClass?.price}  
              placeholder='Price'
              className='px-3 py-2 border rounded-md border-gray-300 w-full bg-gray-200 text-gray-900'
            />
          </div> 
  
          <div className="w-full">
            <label htmlFor='email' className='block mb-2 text-sm'>
            Class Image
            </label>
            <input
              type='file'
              name='classImage'
              {...register("classImage")}
              accept='image/*'
              className='w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900'
            />
          </div>
          </div> 
        </div>
        <div>
          <button
            type='submit'
            className='bg-error w-full rounded-md py-3 text-white'
          >
         Add Now
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default UpdateClass;