import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:2901"
})

export default api