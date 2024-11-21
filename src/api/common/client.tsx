import axios from 'axios';



export const client = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-PrivateTenant": "spandana",
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});
