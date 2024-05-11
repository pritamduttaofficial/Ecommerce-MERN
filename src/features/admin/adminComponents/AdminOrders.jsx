import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, updateOrderAsync } from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [filter, setFilter] = useState("");

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = (order) => {
    console.log("Showing order", order);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ filter }));
  }, [dispatch, filter]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-300 text-purple-700";
      case "dispatched":
        return "bg-yellow-300 text-yellow-700";
      case "delivered":
        return "bg-green-300 text-green-700";
      case "cancelled":
        return "bg-red-300 text-red-700";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={filter}
                onChange={handleFilter}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order Id</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-bold text-base">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center my-2">
                          <div className="mr-1">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 object-cover object-center"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">
                                {item.title}
                              </p>
                              <p className=" text-sm font-normal text-gray-500">
                                {item.brand}
                              </p>
                              <p className=" text-sm font-normal text-gray-500">
                                x {item.quantity}
                              </p>
                              <p className=" text-sm font-normal text-gray-500">
                                ₹{" "}
                                {Math.round(
                                  item.price *
                                    (1 - item.discountPercentage / 100)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <p className=" text-sm font-bold text-black">
                          ₹ {order.totalAmountAfterDiscount}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="ml-5 flex flex-col font-medium justify-center items-start">
                        <div>{order.selectedAddress.name},</div>
                        <div>{order.selectedAddress.address},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone} </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-2 px-4 rounded-full font-mono font-bold text-base`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-6 h-6"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
