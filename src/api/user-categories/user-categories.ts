"use server"

import axios from "axios";
import { client } from "../common";

export const getAllUserCategories = async (tenantId: string) => {
    try {
        const data = client
            .get("/api/user-categories/all", {
                headers: {
                    "X-PrivateTenant": tenantId,
                },
            })
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