import axios from "axios";

export function useFetchTheme() {
  const response = axios.get("http://localhost:5000");
  console.log(response.data);
}
