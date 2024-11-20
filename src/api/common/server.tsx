"use server"
import { cookies } from 'next/headers';

export async function deleteCookie() {
    (await cookies()).delete("role");
    (await cookies()).delete("token");
    (await cookies()).delete("tenant");
  }
  
  