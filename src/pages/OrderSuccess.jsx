import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <section className="rounded-3xl shadow-2xl">
          <div className="p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
              Your order is on the way
            </p>

            <h2 className="mt-6 text-3xl font-bold">
              Thanks for your purchase, we're getting it ready!
            </h2>
            <div className="mt-6 flex flex-col lg:flex-row lg:gap-2 lg:justify-center lg:items-center">
              <Link
                className="mt-8 lg:mt-0 w-full lg:w-auto lg:px-8 py-4 inline-block rounded-full bg-pink-600 text-sm font-bold text-white shadow-xl"
                to="/"
                style={{ minWidth: "150px" }}
              >
                Home
              </Link>
              <Link
                className="mt-8 lg:mt-0 w-full lg:w-auto lg:px-8 py-4 inline-block rounded-full bg-pink-600 text-sm font-bold text-white shadow-xl"
                href="#"
                style={{ minWidth: "150px" }}
              >
                Order History
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrderSuccess;
