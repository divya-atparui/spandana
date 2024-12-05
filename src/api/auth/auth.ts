"use server"

import { client } from "../common"; 

export const getSuperAdminToken = async (variables: SuperAdminLoginVariables): Promise<SuperAdminLoginResponse> => {
    try {
        const response = await client({
            url : "/auth/token",
            method: "POST",
            data: variables,
            headers: {
                "X-PrivateTenant": "public",
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
};