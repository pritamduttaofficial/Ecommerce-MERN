import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import {
  deleteItemFromCartAsync,
  updateCartAsync,
} from "../../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const totalAmountBeforeDiscount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );

  const totalDiscount = items.reduce((total, item) => {
    const itemActualPrice = Math.round(
      item.product.price * (1 - item.product.discountPercentage / 100)
    );
    const discountedPrice = item.product.price - itemActualPrice;
    const itemTotalDiscount = discountedPrice * item.quantity;
    return total + itemTotalDiscount;
  }, 0);

  const totalAmountAfterDiscount = totalAmountBeforeDiscount - totalDiscount;

  const totalItemsInCart = items.reduce(
    (total, item) => item.quantity + total,
    0
  );

  // Function to update quantity for a specific product
  const handleQuantityChange = (item, newQuantity) => {
    dispatch(updateCartAsync({ id: item.id, quantity: newQuantity }));
  };

  // Function to handle incrementing quantity
  const handleQuantityIncrement = (item) => {
    if (item.quantity < 9) {
      handleQuantityChange(item, item.quantity + 1);
    }
  };

  // Function to handle decrementing quantity
  const handleQuantityDecrement = (item) => {
    if (item.quantity > 1) {
      handleQuantityChange(item, item.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-3 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((item, productIdx) => (
                  <div key={item.id} className="">
                    <li className="flex py-6 px-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={item.href}
                                  className="font-bold text-gray-600"
                                >
                                  {item.product.title}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-sm font-normal text-gray-600">
                                {item.product.brand}
                              </p>

                              <p className="ml-4 border-l flex items-center border-gray-200 pl-4 text-sm font-normal text-black">
                                {item.product.rating}
                                <StarIcon className="w-4 h-4 ml-1 text-yellow-400 inline" />
                              </p>
                            </div>
                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-500 line-through">
                                ₹{item.product.price}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp; ₹
                                {Math.round(
                                  item.product.price *
                                    (1 - item.product.discountPercentage / 100)
                                )}
                              </p>
                              &nbsp;&nbsp;
                              <p className="text-sm font-medium text-green-500">
                                {item.product.discountPercentage}% off
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 pb-2 px-6 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => handleQuantityDecrement(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                          onClick={() => handleQuantityIncrement(item)}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-5 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({totalItemsInCart} item)
                    </dt>
                    <dd className="text-sm font-medium text-black">
                      ₹ {totalAmountBeforeDiscount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-black">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      - ₹ {totalAmountBeforeDiscount - totalAmountAfterDiscount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-black">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹ {totalAmountAfterDiscount}
                    </dd>
                  </div>
                </dl>
                <div className="px-4 pb-4 font-medium text-green-700">
                  You will save ₹{" "}
                  {totalAmountBeforeDiscount - totalAmountAfterDiscount} on this
                  order
                </div>
              </div>
              <div className="space-y-4 text-center px-4 pb-4">
                <Link to="/checkout">
                  <button
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 duration-200 focus-visible:outline-black"
                  >
                    Checkout
                  </button>
                </Link>
                <Link
                  to="/"
                  className="inline-block text-sm text-gray-600 transition hover:text-gray-700 hover:underline hover:underline-offset-4"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
