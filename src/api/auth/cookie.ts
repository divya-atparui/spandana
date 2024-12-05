"use server";

import { cookies } from "next/headers";

interface StoreTokenRequest {
  id_token: string;
}

export async function cookieLogin(request: StoreTokenRequest) {
  cookies().set({
    name: "authToken",
    value: request.id_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Set expiry to match token expiry (1 hour in this case)
    maxAge: 60 * 60 
  });
}

export const deleteCookie = async () => {
  cookies().delete("authToken");
};

export const getAuthToken = () => {
  return cookies().get("authToken")?.value;
};
