import { useLoaderData } from "react-router-dom";
import Title from "../../../components/shared/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const unPaidClass = useLoaderData();
  const price = unPaidClass[0]?.price;
  const priseNum = parseFloat(price)
  const classPrice = parseFloat(priseNum.toFixed(2))

  const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_GateWay_pk}`)
  return (
    <div>
      <Title title={'Pay Now'}></Title>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly items-center gap-5 border-2 p-5 rounded-lg mb-14">
      <figure><img className="" src={unPaidClass[0]?.classImage} alt="class"/></figure>
      <div className="">
        <h2 className="text-3xl font-bold">{unPaidClass[0]?.className}</h2>
        <hr className="w-20 border-error border-2 mb-4"/>
        <h3 className="text-2xl font-semibold">Instructor:</h3>
        <p className="font-semibold">Name: <span>{unPaidClass[0]?.name}</span> </p>
        <p className="font-semibold">Email: <span>{unPaidClass[0]?.email}</span> </p>
        <p className="font-semibold">Price: <span>{unPaidClass[0]?.price}</span> </p>
        <p className="font-semibold">Avaiable Seat: <span>{unPaidClass[0]?.availableSeats}</span> </p>
      </div>
</div>
    <Elements stripe={stripePromise}>
      <CheckOut unPaidClass={unPaidClass} classPrice={classPrice} ></CheckOut>
    </Elements>

    </div>
  );
};

export default Payment;