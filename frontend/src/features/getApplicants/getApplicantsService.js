import axios from "axios";

const API_URL = "/api/info/";

// get applicants info
const getInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getApplicantsService = {
  getInfo,
};

export default getApplicantsService;
