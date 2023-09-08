import { useState } from "react";
import Stripe from "stripe";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./purchase.css";
import axios from "axios"; // Import axios for API requests

export default function Purchase() {
  const { selectedUser, updateCredits, fetchMe, setUser, loginUser } =
    useAuth();
  const [selectedTier, setSelectedTier] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("successful order");
      setMessage("Order placed! You will receive an email confirmation.");
      // Update credits here
      const tierIndex = parseInt(query.get("tierIndex"));
      if (!isNaN(tierIndex)) {
        setSelectedTier(tierIndex);
        handlePurchase(tierIndex);
      }
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  //  price id's: 10: price_1MvpbeFQGhTdTKMrYIpCsYGz
  // 5: price_1MvpbIFQGhTdTKMrmjHGF4h2
  // 1: price_1MvpaqFQGhTdTKMrJgYDYhON

  const onCheckout = async (tier) => {
    // Create a new checkout session
    const response = await axios.post(
      "/routes/payments/create-checkout-session",
      {
        priceId: tier.priceId,
        tierIndex: selectedTier, // pass the selected tier index to the server
        userId: selectedUser.id,
      }
    );
    console.log(
      "userId in oncheckiut:",
      selectedUser.id,
      "tierIndex in oncheckout:",
      selectedTier
    );
    const session = response.data;
    window.location.href = session.url;
  };

  const tiers = [
    {
      name: "Starter",
      price: 1,
      credits: 1,
      priceId: "price_1MvpaqFQGhTdTKMrJgYDYhON",
    },
    {
      name: "Bulk",
      price: 4,
      credits: 5,
      priceId: "price_1MvpbIFQGhTdTKMrmjHGF4h2",
    },
    {
      name: "Pro",
      price: 7,
      credits: 10,
      priceId: "price_1MvpbeFQGhTdTKMrYIpCsYGz",
    },
  ];

  const handleTierSelection = (index) => {
    setSelectedTier(index);
  };

  const handlePurchase = async (tierIndex) => {
    const tier = tiers[tierIndex];

    // Create a new payment intent with the selected tier price

    const newTotalCredits = selectedUser.credits + tier.credits;
    const newCredits = await updateCredits({ credits: newTotalCredits });
    const updatedUser = await fetchMe();
    setUser(updatedUser);
    // setUser({ ...selectedUser, credits: newTotalCredits });

    console.log("selected user", selectedUser);
    setTimeout(() => {
      navigate("/upload");
    }, 0);
    // Redirect the user to the Stripe checkout page

    // window.location.href = paymentIntent.charges.data[0].receipt_url;

    // Send purchase request to server with selected tier info
  };

  return (
    <div className="container">
      <h3 className="purch">Purchase Credits</h3>
      <hr className="purch-hr" />
      <div className="credit-package-container">
        {tiers.map((tier, index) => (
          <div
            key={index}
            onClick={() => handleTierSelection(index)}
            className={`credit-package ${
              index === selectedTier ? "selected" : ""
            }`}
          >
            <h3 className="tier-name">{tier.name}</h3>
            <p className="price"> Credits</p>
            <div className="rowz">
              <svg
                className="purch-svg"
                width="30"
                height="22"
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6.19625V5.5C22 2.365 17.2712 0 11 0C4.72875 0 0 2.365 0 5.5V10.5C0 13.1112 3.28125 15.1863 8 15.8075V16.5C8 19.635 12.7288 22 19 22C25.2712 22 30 19.635 30 16.5V11.5C30 8.9125 26.8225 6.835 22 6.19625ZM28 11.5C28 13.1525 24.1512 15 19 15C18.5337 15 18.0712 14.9838 17.615 14.9538C20.3112 13.9713 22 12.375 22 10.5V8.2175C25.7338 8.77375 28 10.2838 28 11.5ZM8 13.7812V10.8075C8.99472 10.9371 9.99687 11.0014 11 11C12.0031 11.0014 13.0053 10.9371 14 10.8075V13.7812C13.0068 13.928 12.004 14.0011 11 14C9.99598 14.0011 8.99324 13.928 8 13.7812ZM20 8.74125V10.5C20 11.5488 18.4488 12.675 16 13.3587V10.4375C17.6137 10.0462 18.98 9.46375 20 8.74125ZM11 2C16.1512 2 20 3.8475 20 5.5C20 7.1525 16.1512 9 11 9C5.84875 9 2 7.1525 2 5.5C2 3.8475 5.84875 2 11 2ZM2 10.5V8.74125C3.02 9.46375 4.38625 10.0462 6 10.4375V13.3587C3.55125 12.675 2 11.5488 2 10.5ZM10 16.5V15.9788C10.3288 15.9913 10.6612 16 11 16C11.485 16 11.9587 15.9837 12.4237 15.9562C12.9403 16.1412 13.4665 16.2981 14 16.4263V19.3587C11.5512 18.675 10 17.5488 10 16.5ZM16 19.7812V16.8C16.9944 16.9337 17.9967 17.0005 19 17C20.0031 17.0014 21.0053 16.9371 22 16.8075V19.7812C20.0106 20.0729 17.9894 20.0729 16 19.7812ZM24 19.3587V16.4375C25.6137 16.0462 26.98 15.4637 28 14.7412V16.5C28 17.5488 26.4488 18.675 24 19.3587Z"
                  fill="#7855FF"
                />
              </svg>
              <p className="line2">|</p>
              <div className="price2">{tier.credits}</div>
            </div>
            <p className="price">Price</p>
            <div className="rowz">
              <svg
                className="purch-svg1"
                width="30"
                height="18"
                viewBox="0 0 30 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 4C14.0111 4 13.0444 4.29325 12.2221 4.84265C11.3999 5.39206 10.759 6.17295 10.3806 7.08658C10.0022 8.00021 9.90315 9.00555 10.0961 9.97545C10.289 10.9454 10.7652 11.8363 11.4645 12.5355C12.1637 13.2348 13.0546 13.711 14.0245 13.9039C14.9945 14.0969 15.9998 13.9978 16.9134 13.6194C17.827 13.241 18.6079 12.6001 19.1573 11.7779C19.7068 10.9556 20 9.98891 20 9C20 7.67392 19.4732 6.40215 18.5355 5.46447C17.5979 4.52678 16.3261 4 15 4ZM15 12C14.4067 12 13.8266 11.8241 13.3333 11.4944C12.8399 11.1648 12.4554 10.6962 12.2284 10.1481C12.0013 9.59987 11.9419 8.99667 12.0576 8.41473C12.1734 7.83279 12.4591 7.29824 12.8787 6.87868C13.2982 6.45912 13.8328 6.1734 14.4147 6.05764C14.9967 5.94189 15.5999 6.0013 16.1481 6.22836C16.6962 6.45542 17.1648 6.83994 17.4944 7.33329C17.8241 7.82664 18 8.40666 18 9C18 9.79565 17.6839 10.5587 17.1213 11.1213C16.5587 11.6839 15.7956 12 15 12ZM29 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H29C29.2652 18 29.5196 17.8946 29.7071 17.7071C29.8946 17.5196 30 17.2652 30 17V1C30 0.734784 29.8946 0.48043 29.7071 0.292893C29.5196 0.105357 29.2652 0 29 0ZM2 2H4.67125C4.15549 3.19945 3.19945 4.15549 2 4.67125V2ZM2 16V13.3288C3.19945 13.8445 4.15549 14.8005 4.67125 16H2ZM28 16H25.3288C25.8445 14.8005 26.8005 13.8445 28 13.3288V16ZM28 11.2062C26.8645 11.542 25.8311 12.1565 24.9938 12.9938C24.1565 13.8311 23.542 14.8645 23.2062 16H6.79375C6.45801 14.8645 5.84351 13.8311 5.00623 12.9938C4.16895 12.1565 3.1355 11.542 2 11.2062V6.79375C3.1355 6.45801 4.16895 5.84351 5.00623 5.00623C5.84351 4.16895 6.45801 3.1355 6.79375 2H23.2062C23.542 3.1355 24.1565 4.16895 24.9938 5.00623C25.8311 5.84351 26.8645 6.45801 28 6.79375V11.2062ZM28 4.67125C26.8005 4.15549 25.8445 3.19945 25.3288 2H28V4.67125Z"
                  fill="#777777"
                />
              </svg>
              <p className="line2">|</p>
              <div className="price1">${tier.price}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (selectedTier !== null) {
            onCheckout(tiers[selectedTier]);
          }

          // navigate("/upload");
        }}
        className="purchase-button"
      >
        Purchase
      </button>

      <div className="tep1">Don't want to pay?</div>
      <Link to="https://discord.gg/egEWKgadqU" className="tep">
        Join Discord for free credits
      </Link>
    </div>
  );
}
