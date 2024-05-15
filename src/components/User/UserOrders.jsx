import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync } from "../../features/user/userSlice";
import { Link, Navigate } from "react-router-dom";

function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {!orders.length && <Navigate to="/" replace={true}></Navigate>}
      {orders.map((order) => (
        <div className="mx-auto mt-10 rounded-lg shadow-lg bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Order # {order.id}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Order Status : {order.status}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">₹ {item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 flex items-center">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty : {item.quantity}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="submit"
                            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:scale-95 duration-200"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-lg font-medium text-gray-900">
              <p>Total</p>
              <p>₹ {order.totalAmountAfterDiscount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items Ordered</p>
              <p>{order.totalItemsInCart} items</p>
            </div>
            <p className="block mt-3 text-sm font-medium text-gray-700">
              Shipping Address :
            </p>
            <div className="flex justify-between mt-2 gap-x-6 px-5 py-2 w-full rounded-md border border-gray-200 bg-transparent">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress[0].name}
                  </p>
                  <p className="truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress[0].address}
                  </p>
                  <p className="truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress[0].pincode}
                  </p>
                  <p className="truncate text-xs leading-5 text-gray-500">
                    Phone: {order.selectedAddress[0].phone}
                  </p>
                  <p className="truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress[0].city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
