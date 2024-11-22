"use client";

import { usePostNewUser } from "@/api/test/use-post-new-user";
import { Button } from "@/components/ui/button";

const TestPage = () => {
  const { mutate: createUser, isPending } = usePostNewUser();

  const onSubmit = () => {
    createUser(
      {
        emailProductStoreId: "9000",
        CONFIRM_PASSWORD: "password",
        CUSTOMER_ADDRESS1: "test",
        CUSTOMER_ADDRESS2: "test",
        CUSTOMER_CITY: "Bangalore",
        CUSTOMER_COUNTRY: "IND",
        CUSTOMER_EMAIL: "divya@atparui.com",
        CUSTOMER_HOME_CONTACT: "9330438158",
        CUSTOMER_MOBILE_CONTACT: "9330438158",
        CUSTOMER_POSTAL_CODE: "560054",
        CUSTOMER_STATE: "kar",
        PASSWORD: "password",
        UNUSEEMAIL: "on",
        USERNAME: "divya@atparui.com",
        USER_FIRST_NAME: "Divyas",
        USER_LAST_NAME: "test",
        USER_MIDDLE_NAME: "test",
        USER_TITLE: "Mr",
      },
      {
        onSuccess: (data) => {
          console.log("User created successfully:", data);
        },
        onError: (error) => {
          console.error("Error creating user:", error);
        },
      }
    );
  };

  return (
    <div>
      <Button disabled={isPending} onClick={onSubmit}>
        {isPending ? "Creating..." : "Create User"}
      </Button>
    </div>
  );
};

export default TestPage;
