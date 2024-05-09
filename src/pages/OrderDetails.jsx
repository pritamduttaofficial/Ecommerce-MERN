import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const OrderDetails = () => {
  const orders = useSelector((state) => state.order.userOrder);
  const d = new Date();
  let text = d.toDateString();
  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Order Details</h2>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border shadow-lg border-gray-200 md:flex-row">
        <div className="w-full border-r border-gray-200 bg-gray-200 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              {[
                ["Order ID", "#74557994327"],
                ["Date", `${text}`],
                ["Total Amount", `₹${orders.totalAmountAfterDiscount}`],
                ["Order Status", "Confirmed"],
              ].map(([key, value]) => (
                <div key={key} className="mb-4">
                  <div className="text-sm font-semibold">{key}</div>
                  <div className="text-sm text-blue-600 font-medium">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
              {orders.items.map((order) => (
                <li
                  key={order.id}
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-cover object-center"
                        src={order.thumbnail}
                        alt={order.title}
                      />
                    </div>

                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">
                          {order.title}
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                          {order.brand}
                        </p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500">
                        x {order.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">
                      ₹ {order.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-8 border-t border-t-gray-200" />
            <div className="space-x-4">
              <button
                type="button"
                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-95 duration-200"
              >
                View Order
              </button>
              <Link to="/user-orders">
                <button
                  type="button"
                  className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-95 duration-200"
                >
                  Order History
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
