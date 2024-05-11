import React, { useState, useEffect } from "react";

function Alert({ title, description }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="fixed top-3 left-0 right-0 z-50 flex justify-center">
          <div
            role="alert"
            className="rounded-xl border-l-4 bg-green-50 border-green-500 p-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <strong className="block font-medium text-gray-900">
                  {" "}
                  {title}{" "}
                </strong>

                <p className="mt-1 text-sm text-gray-700">{description}</p>
              </div>

              <button
                className="text-gray-500 transition hover:text-gray-600"
                onClick={handleClose}
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
