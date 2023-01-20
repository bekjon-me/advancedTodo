import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Content-Disposition":
      "file; filename=\"example.txt\"; filename*=UTF-8''ex%C3%A4mple.txt",
  },
});
