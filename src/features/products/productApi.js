export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter) {
  // filter: {"category": "Iphone", "color": "white"}

  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsBySort(sort) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:3000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
