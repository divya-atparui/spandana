"use server"

import axios from "axios"
import {client} from "../common"

export const getAllDepartments = async () => {
    try {
        const data = client
            .get("/api/departments/all")
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