import axios from 'axios';

export const client = axios.create({
  baseURL: "https://spandana-api.atparui.com",
  headers: {
    "X-PrivateTenant": "spandana",
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});
