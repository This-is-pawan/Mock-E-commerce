import React, { useState } from "react";

const Checkout = ({ cartItems, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "89786766746", address: "india,model town street no.1 ,near villa park" });
  const [showReceipt, setShowReceipt] = useState(false);

  const totalPrice = cartItems.reduce(
    (t, i) => t + i.price * i.quantity,
    0
  );

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      return alert("⚠️ All fields are required!");
    }
    setShowReceipt(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[420px] rounded-xl shadow-lg p-6 relative overflow-y-auto">

        {!showReceipt ? (
          <>
            {/* Close Button */}
            <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">Checkout</h2>

            {/* Customer Inputs */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded mt-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Phone Number"
              className="w-full border p-2 rounded mt-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              placeholder="Full Address"
              className="w-full border p-2 rounded mt-2"
              rows="3"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* Summary */}
            <div className="border-t mt-4 pt-3">
              <h3 className="font-bold mb-2">Order Summary:</h3>
              {cartItems.map((item) => (
                <p key={item._id}>
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </p>
              ))}
              <p className="font-bold mt-2 text-lg">Total: ₹{totalPrice}</p>
            </div>

            <button
              onClick={handleOrder}
              className="bg-green-600 text-white w-full py-2 mt-4 rounded-lg font-semibold"
            >
              Confirm Order
            </button>
          </>
        ) : (
          <>
            {/* Receipt Section */}
            <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">✅ Order Receipt</h2>

            <div className="border p-3 rounded-lg mt-2 bg-gray-50">
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Phone:</strong> {form.phone}</p>
              <p><strong>Address:</strong> {form.address}</p>

              <div className="border-t mt-3 pt-2">
                <strong>Items:</strong>
                {cartItems.map((item) => (
                  <p key={item._id}>
                    {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                  </p>
                ))}
              </div>

              <p className="font-bold text-lg mt-3">Total Paid: ₹{totalPrice}</p>
            </div>

            <button
              onClick={onClose}
              className="bg-pink-600 text-white w-full py-2 mt-4 rounded-lg font-semibold"
            >
              Close Receipt
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
