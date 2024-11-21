"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
// import { deleteCookie } from "@/lib/server";
import { Button } from "../../components/ui/button";
import { deleteCookie } from "@/api";

const SignOut = () => {
  const form = useForm();

  const handleSubmit = async () => {
    // localStorage.clear()
    axios.defaults.headers.common["Authorization"] = "";
    axios.defaults.headers.common["X-PrivateTenant"] = "";
    await deleteCookie();
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default SignOut;
