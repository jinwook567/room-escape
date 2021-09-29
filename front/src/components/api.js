import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const url = process.env.REACT_APP_API_URL;

export async function getTheme() {
  const response = await axios.get(`${url}/theme`);
  return response.data;
}

export async function getThemeTimeTable({ date }) {
  const response = await axios.get(`${url}/reservation/${date}`);
  return response.data;
}

export function postReservation(postData) {
  return axios.post(`${url}/reservation`, postData);
}

export async function getHolidays() {
  const response = await axios.get(`${url}/holiday`);
  return response.data;
}
