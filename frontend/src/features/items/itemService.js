import axios from "axios";

const API_URL = "/api/info/";

// Create info
const createInfo = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify([{ ...userData }]));
  } else {
    const items = JSON.parse(localStorage.getItem("items"));
    items.push({ ...userData });
    localStorage.setItem("items", JSON.stringify(items));
  }
  // const items = JSON.parse(localStorage.getItem("items"));
  console.log({ ...userData });
  console.log("item", JSON.parse(localStorage.getItem("items")));
  // console.log("items", items);
  // const response = await axios.post(API_URL, userData, config);
  // localStorage.setItem("items", JSON.stringify(items));

  return JSON.parse(localStorage.getItem("items"));
};

const itemService = {
  createInfo,
};

export default itemService;
