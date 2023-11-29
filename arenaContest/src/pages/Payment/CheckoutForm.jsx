import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ contest }) {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", {
        price: contest?.contestPrice,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosPublic, contest]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "hide",
            name: user?.displayName || "hide",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const registerContest = {
          contest_Id: contest._id,
          contestName: contest.contestName,
          contestPhoto: contest.contestPhoto,
          contestDeadline: contest.contestDeadline,
          contestPrice: contest.contestPrice,
          priceMoney: contest.priceMoney,
          status: "none",
          userEmail: user.email,
          userName: user.displayName,
          userPhoto: user.photoURL,
        };
        // console.log(registerContest);

        const res = await axiosPublic.post(
          "/registeredContest",
          registerContest
        );
        if (res.data.insertedId) {
          toast.success("Payment successful");
          navigate("/allContests");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center mt-10">
        <CardElement
          className="border-2 w-10/12 mx-auto px-3 py-3 border-primary rounded-xl"
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#00ABE4",
                "::placeholder": {
                  color: "#00ABE4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-lg mt-3 text-red-500">{error}</p>
        <button
          className="bg-primary mt-5 text-lg font-semibold px-5 py-3 rounded-xl text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Make Payment
        </button>
      </form>
    </div>
  );
}
