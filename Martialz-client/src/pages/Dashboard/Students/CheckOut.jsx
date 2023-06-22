import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../apis/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import './checkout.css'


const CheckOut = ({classPrice, unPaidClass}) => {
  const {user} = useContext(AuthContext)
const stripe= useStripe();
const elements = useElements();
const [error, setError] = useState('');
const [axiosSecure] = useAxiosSecure();
const [clientSecret, setClientSecreet] = useState('');
const [processing, setProcessing] = useState(false);



useEffect(() => {
  axiosSecure.post("/create-payment-intent", {classPrice})
  .then(res => {
    setClientSecreet(res.data.clientSecret)
  })
}, [])


const handleSubmit = async (event) => {
  // Block native form submission.
  event.preventDefault();

  if (!stripe || !elements) {
    return
  }

  const card = elements.getElement(CardElement);

  if (card === null) {
    return
  }
  
  const {error} = await stripe.createPaymentMethod({
    type: 'card',
    card
  });

  if (error) {
    console.log('error', error);
    setError(error?.message)
  } else {
    setError('')
  }

  setProcessing(true)

const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method: {
      card: card,
      billing_details: {
        email: user?.email || 'unknown',
       name: user?.name || 'annonymous'
      }
    }
  }
)

if(confirmError) {
  console.log(confirmError);
}

setProcessing(false)
if(paymentIntent.status === 'succeeded') {

  // paymentInfo
  const paymentInfo = {
    email: user?.email,
    transactionId: paymentIntent.id,
    classPrice,
    classId: unPaidClass[0]?._id,
    date: new Date(),
    name: unPaidClass[0]?.name,
    status: 'paid',
    className: unPaidClass[0]?.className,
    classImage: unPaidClass[0]?.classImage
}
  axiosSecure.post(`/setpayments/${unPaidClass[0]?._id}`, paymentInfo)
  .then(() => {
      toast.success('payment successful')
      fetch(`${import.meta.env.VITE_URL}/classupdate/${unPaidClass[0]?.classId}`,{
        method: 'PATCH',
        headers: {'content-type' : 'application/json'}
      }).then(res => res.json())
      .then(()=> {
    
      })
  })
}

};

  return (
    <div className="md:w-2/3 mx-auto">
      <form className="" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-success w-full" type="submit" disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
    </form>

      {
        error && <p className="text-error text-center mt-5">{error}</p>
      }

    
    </div>
  );
};

export default CheckOut;