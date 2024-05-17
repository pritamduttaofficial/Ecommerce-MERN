export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// API is for admin
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// API is for admin
export function fetchAllOrders(filter) {
  const queryString = new URLSearchParams(filter).toString();

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8000/orders?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      resolve({ data: { orders: data } });
    } catch (error) {
      reject("Error fetching orders: " + error.message);
    }
  });
}
