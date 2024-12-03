"use server"

import axios from "axios";
import { client } from "../common";

export const getAllHospitals = async () => {
    try {
        const data = client
            .get("/hospitals/all")
            .then((response) => response.data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "An error occurred");
        } else {
            throw new Error("Unexpected error");
        }
    }
};



export const getHospitalById = async (id: string) => {
    try {
        const data = client
            .get(`/hospitals/getById/${id}`)
            .then((response) => response.data);
        return data;
    } catch (error) {
        throw error;
    }
};

// curl -X 'POST' \
//   'https://spandana-api.atparui.com/hospitals' \
//   -H 'accept: */*' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'hospital={
//   "id": 0,
//   "domainUrl": "string",
//   "baseImgUrl": "string",
//   "iconImgUrl": "string",
//   "configurablePreBookingMinMinsBefore": 0,
//   "configurablePreBookingMaxMinsBefore": 0,
//   "hospitalName": "string",
//   "hospitalAddress": "string",
//   "contactNumber": "string",
//   "tenantId": "string",
//   "url": "string"
// }' \
//   -F 'baseImage=@Screenshot from 2024-12-02 10-29-52.png;type=image/png' \
//   -F 'iconImage=@Screenshot from 2024-12-02 10-30-03.png;type=image/png'

export const createHospital = async (formData: FormData) => {
    try {
        const data = await client.post("/hospitals", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiQURNSU4iLCJVU0VSSUQiOjEsIlRFTkFOVCI6InB1YmxpYyIsInN1YiI6ImFkbWluIiwiaWF0IjoxNzMzMjI4Mzg0LCJleHAiOjE3MzMyMzE5ODR9.p2L9pOVrtC4i-vFYiLKSMN2cfiiDXFLP88HiVxVwF9Y`
            },
        });
        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "An error occurred");
        } else {
            throw new Error("Unexpected error");
        }
    }
};