import React, { useState, useEffect } from "react";

function Info({ title, description }) {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <>
      {showInfo && (
        <div className="fixed top-3 left-0 right-0 z-50 flex justify-center">
          <div
            role="alert"
            className="rounded-xl border-l-4 bg-yellow-50 border-yellow-500 p-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
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

export default Info;
