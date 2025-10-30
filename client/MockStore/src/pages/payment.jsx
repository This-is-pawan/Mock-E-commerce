import React, { useState } from "react";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState("Peter");
  
  const [email, setEmail] = useState("peter@gmail.com");

  const handlePaymentForm = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 1500);
  };

  // Print receipt
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!paid ? (
        <form
          onSubmit={handlePaymentForm}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-xl font-semibold text-center mb-4">Payment Form</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-green-400"
          />

          
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-3 text-green-600">Payment Successful</h2>
          <p className="text-gray-700">Thank you for your payment!</p>

          <div className="border-t mt-3 pt-3 text-left">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Mobile:</strong> {email}</p>
            <p><strong>Amount:</strong> ₹299</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>

          <button
            onClick={handlePrint}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
