import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { RiNotification4Line } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [Data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState(0);
  const [increament, setIncreament] = useState(1);
  const [decreament, setDecreament] = useState(1);
  const [CartClick, setCartClick] = useState(false);
const [loading,setLoading]=useState('')
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const url = "https://mock-commerce-backend.onrender.com/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data.data);
        setLoading('loading')
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchProducts();
  }, []);

  const filteredData = Data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const cartClick = (id) => {
    const item = Data.find((i) => i._id === id);
    setSelectedItem(item);
    
  };

  return (
    <div className="w-full relative">
      {/* Header */}
      <h1 className="flex items-center justify-between px-4 py-3 bg-pink-500 border-b-2 text-white tracking-wider font-semibold text-xl">
        <span>Products List</span>

        {/* Cart Notification Icon */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => {
            setCartClick(!CartClick);
          }}
        >
          <RiNotification4Line className="text-2xl" />
          <span className="absolute -top-1 -right-2 w-[18px] h-[18px] bg-white text-pink-600 text-[11px] font-bold rounded-full flex items-center justify-center">
            {notification}
          </span>
        </div>
      </h1>

      {/* Search */}
      <div className="flex items-center justify-center p-2">
        <div className="relative">
          <input
            type="text"
            value={search}
            placeholder="Search item"
            className="p-2 border rounded pr-10"
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Product List */}
      <div className="bg-pink-50 w-full p-4 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredData.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                cartClick(item._id);
              }}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <h5 className="text-[11px] tracking-wide">
                Product Id: <span className="text-green-600">{item._id}</span>
              </h5>
              <h2 className="font-semibold tracking-wide">{item.name}</h2>
              <p className="font-bold text-pink-600 text-lg">
                ₹{Math.round(item.price)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-72 sm:w-80 md:w-96 bg-white shadow-2xl rounded-xl p-5 flex flex-col items-center justify-center text-center">
            <p className="font-semibold text-lg">{selectedItem.name}</p>
            <p className="text-pink-600 font-bold text-xl mt-1">
              ₹{Math.round(selectedItem.price)}
            </p>
            <div className="w-full p-2 ">
              <button
                className="w-4 h-4 cursor-pointer border text-[10px] text-green-900 m-1"
                onClick={() => {
                  setIncreament((prev) => (prev > 1 ? prev - 1 : prev));
                }}
              >
                -
              </button>
              <button
                className="w-4 h-4 cursor-pointer border text-[10px] text-green-900 m-1"
                onClick={() => {
                  setIncreament((prev) => prev + 1);
                }}
              >
                +
              </button>
            </div>
            <button
              className="mt-2 px-2 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all"
              onClick={() => {
                setCartClick(!CartClick);
                setSelectedItem(null);
                setNotification((prev)=>prev+1)
               setCartItems((prev) => [...prev, { ...selectedItem, quantity: increament }]);

                
              }}
            >
              add to cart {`[${increament}]`}
            </button>
            <button
              className="mt-10 px-2 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all "
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {CartClick && (
        <div className="w-full max-w-[350px] h-screen z-10 bg-pink-200 absolute right-0 top-[3.2rem]">
          {/* Close Button */}
          <div className="flex justify-between m-2">
             <button className="text-[12px]"  onClick={()=>{
                   setCartItems([])
                   setNotification(0)
                  }}>Clear all</button>
                 <p>
  Total ₹:
  {cartItems.length > 0
    ? Math.round(
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    : 0}
</p>

            <button
              className="cursor-pointer w-10 h-10 rounded-full bg-white"
              onClick={() => {
                setCartClick(false);
              }}
            >
              X
            </button>
            
          </div>

          {/* Cart Items */}
          <div className="p-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid gap-1 grid-cols-2 items-center bg-white p-2 rounded-lg mb-2 shadow"
                >
                 
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm">₹{item.price}</span>
                  <span className="text-sm">qty: {item.quantity}</span>
                  <button className="text-[12px]"  onClick={()=>{
                    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
                    setNotification((prev)=>prev-1)
                  }}>Delete</button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Your cart is empty 🛒</p>
            )}
          </div>
{/* payment */}
{/* payment */}
<div className="flex justify-end items-center"> 
  <button
    className={`w-full m-2 rounded-lg capitalize p-2 ${
      cartItems.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500"
    }`}
    disabled={cartItems.length === 0} // ✅ disable when cart empty
    onClick={() => {
      if (cartItems.length > 0) {
        setLoading(" ");
      }
    }}
  >
    {loading === "" ? (
      <LuLoader aria-hidden="true" className="animate-spin" />
    ) : (
      <Link
        to="/payment"
        className={cartItems.length === 0 ? "pointer-events-none" : ""}
      >
        Pay Now
      </Link>
    )}
  </button>
</div>

          
        </div>
      )}
    </div>
  );
};

export default Dashboard;
