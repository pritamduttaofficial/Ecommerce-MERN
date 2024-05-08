import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync } from "../features/cart/cartSlice";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync } from "../features/order/orderSlice";

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.loggedInUser);
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalAmountBeforeDiscount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const totalDiscount = items.reduce((total, item) => {
    const itemActualPrice = Math.round(
      item.price * (1 - item.discountPercentage / 100)
    );
    const discountedPrice = item.price - itemActualPrice;
    const itemTotalDiscount = discountedPrice * item.quantity;
    return total + itemTotalDiscount;
  }, 0);

  const totalAmountAfterDiscount = totalAmountBeforeDiscount - totalDiscount;

  const totalItemsInCart = items.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handleOrder = (e) => {
    if (selectedAddress) {
      const order = {
        items,
        totalAmountAfterDiscount,
        totalItemsInCart,
        user,
        selectedAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Select an address or add a new one");
    }
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && <Navigate to="/order-success" replace={true}></Navigate>}
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden  rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <form
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        console.log(data);
                        dispatch(
                          updateUserAsync({
                            ...user,
                            addresses: [...user.addresses, data],
                          })
                        );
                        reset();
                      })}
                    >
                      {/* *********************** Contact Info ************************/}
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                          <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold text-gray-900"
                          >
                            Contact information
                          </h3>

                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              placeholder="Enter your name"
                              id="name"
                            ></input>
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="phone"
                            >
                              Phone number
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              {...register("phone", {
                                required: "phone number is required",
                              })}
                              placeholder="Phone number"
                              id="phone"
                            ></input>
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <hr className="my-8" />

                        {/* *********************** Add New Address ********************* */}
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Shipping address
                          </h3>

                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  {...register("address", {
                                    required: "Address is required",
                                  })}
                                  id="address"
                                  name="address"
                                  placeholder="House No., Building Name, Road, Area"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.address && (
                                  <p className="text-red-500">
                                    {errors.address.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  placeholder="City"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.city && (
                                  <p className="text-red-500">
                                    {errors.city.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State / Province
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  placeholder="State"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.state && (
                                  <p className="text-red-500">
                                    {errors.state.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="pincode"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Pincode
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="pincode"
                                  name="pincode"
                                  a
                                  {...register("pincode", {
                                    required: "pincode is required",
                                  })}
                                  placeholder="Pincode"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.pincode && (
                                  <p className="text-red-500">
                                    {errors.pincode.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end pt-6">
                          <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 duration-200 focus-visible:outline-black"
                          >
                            Add Address
                          </button>
                        </div>
                        <hr className="my-8" />

                        {/* *********************** Addresses ************************* */}
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Addresses
                          </h3>
                          <div className="mt-6 w-full">
                            <p className="block text-sm font-medium text-gray-700">
                              Choose from Existing addresses
                            </p>
                            <ul role="list">
                              {user.addresses.map((address, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between mt-1 gap-x-6 px-5 py-2 w-full rounded-md border border-black/30 bg-transparent"
                                >
                                  <div className="flex gap-x-4">
                                    <input
                                      onChange={handleAddress}
                                      name="address"
                                      type="radio"
                                      value={index}
                                      className="h-4 w-4 mt-1 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {address.name}
                                      </p>
                                      <p className="mt-0 truncate text-xs leading-5 text-gray-500">
                                        {address.address}
                                      </p>
                                      <p className="mt-0 truncate text-xs leading-5 text-gray-500">
                                        {address.pincode}
                                      </p>
                                      <p className="mt-0 truncate text-xs leading-5 text-gray-500">
                                        {address.city}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <hr className="my-8" />
                        {/* ********************* Payment Section ******************** */}
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Payment details
                          </h3>

                          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                            <div className="col-span-3 sm:col-span-4">
                              <label
                                htmlFor="cardNum"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Card number
                              </label>
                              <div className="mt-1">
                                <input
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="text"
                                  placeholder="4242 4242 4242 4242"
                                  id="cardNum"
                                ></input>
                              </div>
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                              <label
                                htmlFor="expiration-date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Expiration date (MM/YY)
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="expiration-date"
                                  id="expiration-date"
                                  autoComplete="cc-exp"
                                  className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="cvc"
                                className="block text-sm font-medium text-gray-700"
                              >
                                CVC
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="cvc"
                                  id="cvc"
                                  autoComplete="csc"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 duration-200 focus-visible:outline-black"
                          >
                            Make payment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------- Product List -----------------------*/}
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {items.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover object-center"
                            src={product.thumbnail}
                            alt={product.title}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">{product.title}</p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <p className="mt-4 text-xs font-medium ">
                            x {product.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          ₹{product.price}
                        </p>
                        <button
                          type="button"
                          className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                          onClick={() => handleRemove(product.id)}
                        >
                          <span className="sr-only">Remove</span>
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <form action="#" className="mt-6">
                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                  <div className="flex-grow">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-95 duration-200"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between text-gray-600">
                  <p className="text-sm font-medium">Sub total</p>
                  <p className="text-sm font-medium">
                    ₹{totalAmountBeforeDiscount}
                  </p>
                </li>
                <li className="flex items-center justify-between text-gray-600">
                  <p className="text-sm font-medium">Discount</p>
                  <p className="text-sm font-medium">₹{totalDiscount}</p>
                </li>
                <li className="flex items-center justify-between text-gray-900">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">
                    ₹{totalAmountAfterDiscount}
                  </p>
                </li>
              </ul>
              <hr className="mt-6 border-gray-200" />
              <div className="mt-6 text-center pb-4">
                <Link to="/checkout">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 duration-200 focus-visible:outline-black"
                  >
                    Order Now
                  </button>
                </Link>
                <Link
                  to="/"
                  className="inline-block text-sm mt-3 text-gray-600 transition hover:text-gray-700 hover:underline hover:underline-offset-4"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
