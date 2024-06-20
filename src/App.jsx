import './App.css'
import axios from "axios";

function App() {
  const amount = "500";
  const currency = "INR";
  const handlePayment = async () => {
    try {
      const orderUrl = "http://35.238.255.92:5002/api/v1/order";
      const { data } = await axios.post(orderUrl, {
        transactionValue: amount,
        transactionCurrency: currency,
      });
      console.log(data);
      initPayment(data.order_details);
    } catch (error) {
      console.log(error);
    }
  };
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_lgHbxngaZZgJvI",
      amount: data.amount,
      currency: data.currency,
      name: "Reviewdale",
      description: "Test Transaction",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bWuKCz4gtbALIq4CBCVK47PHCGoSFg1Fzg&s",
      order_id: data.id,
      handler: async (response) => {
        const body = {
          gateway_order_id: response.razorpay_order_id,
          gateway_payment_id: response.razorpay_payment_id,
          gateway_signature: response.razorpay_signature
        };
        try {
          const verifyUrl = "http://35.238.255.92:5002/api/v1/order/validate";
          const { data } = await axios.post(verifyUrl, body);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button onClick={handlePayment} className='pay'>Pay</button>

  )
}

export default App
