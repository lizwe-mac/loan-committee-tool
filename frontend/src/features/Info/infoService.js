import axios from "axios";

const API_URL = "/api/applicants/";

// Create info
const createInfo = async (userData, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  console.log("I got here");
  const response = await axios.post(API_URL, userData);

  localStorage.setItem("applicant", JSON.stringify(userData));
  console.log("respnse:", response);

  return response;
};

const infoService = {
  createInfo,
};

export default infoService;
