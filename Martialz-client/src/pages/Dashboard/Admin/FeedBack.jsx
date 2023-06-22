import { useLoaderData } from "react-router-dom";
import Title from "../../../components/shared/Title";
import { toast } from "react-hot-toast";

const FeedBack = () => {
  const classes = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      feedback: e.target.message.value
    }
  
    fetch(`${import.meta.env.VITE_URL}/classfeedback/${classes?._id}`, {
      method: 'PATCH',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(() => {
      toast.success(`FeedBack Send`);
    })
  }

  return (
    <div>
      <Title title={'Give FeedBack'}></Title>

      <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
          <div className='space-y-4 mb-4'>
            <div>
              <label className='block mb-2 text-sm'>
               Give FeedBack
              </label>
              <textarea
                // {...register("message")}
                name="message"
              className="textarea textarea-bordered w-full" placeholder="You Message"></textarea>
            </div>
      
          </div>
          <div>
            <button
              type='submit'
              className='bg-error w-full rounded-md py-3 text-white'
            >
          Send
            </button>
          </div>
     </form> 
      </div>
    </div>
  );
};

export default FeedBack;