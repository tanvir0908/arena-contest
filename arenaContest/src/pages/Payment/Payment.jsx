import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

export default function Payment() {
  const contest = useLoaderData();

  const stripePromise = loadStripe(
    "pk_test_51OEtWTJ5bzp9GZmm5xo4yISS97TL4G5p7wVEZVzEmSuKZ0ZUHtzSfC5pHoIVNMyS4PrGw8TgtWXo55AeUufIL8YP00frqB01lh"
  );

  return (
    <div className="mb-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-3 mt-10">
        Payment
      </h2>
      <hr className="border w-10/12 border-primary mx-auto mb-5" />
      <Elements stripe={stripePromise}>
        <CheckoutForm contest={contest} />
      </Elements>
    </div>
  );
}
