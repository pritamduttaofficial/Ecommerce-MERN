import "./App.css";
import { useEffect } from "react";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import Protected from "../src/components/Protected/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
