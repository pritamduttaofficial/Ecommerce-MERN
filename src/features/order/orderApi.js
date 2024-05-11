export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(filter) {
  let queryString = "";

  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/orders?" + queryString);
    const data = await response.json();
    resolve({ data: { orders: data } });
  });
}
