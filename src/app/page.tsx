"use client"

import { useGetUserCategories } from "@/api/user-categories/use-get-user-categories";
import { useGetAllDoctors } from "@/api";
export default function Home() {
  const { data} = useGetUserCategories({
    variables: {
      tenantId: "spandana"
    }
  });
  const { data: doctors } = useGetAllDoctors({
    variables: {
      tenantId: "spandana"
    }
  })
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div>
        Hello
        {JSON.stringify(data, null, 2)}
        hello
        {JSON.stringify(doctors, null, 2)}
      </div>
    </div>
  );
}
