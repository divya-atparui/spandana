"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useGetSuperAdminToken } from "@/api/auth/use-get-admin-token"
import { useToast } from "@/hooks/use-toast"

const SuperAdminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type SuperAdminLoginForm = z.infer<typeof SuperAdminLoginSchema>

export function SuperAdminLogin() {
  const { toast } = useToast()
  const router = useRouter()
  const { mutate: getSuperAdminToken, isPending } = useGetSuperAdminToken()

  const form = useForm<SuperAdminLoginForm>({
    resolver: zodResolver(SuperAdminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: SuperAdminLoginForm) => {
    getSuperAdminToken(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            // Store token in localStorage or your preferred storage method
          
            toast({
              title: "Login Successful",
              description: "Welcome back, admin!",
            })
            router.push("/admin") // Redirect to admin dashboard
          } else {
            toast({
              title: "Login Failed",
              description: data.message || "Please check your credentials",
              variant: "destructive",
            })
          }
        },
        onError: () => {
          toast({
            title: "Login Failed",
            description: "An error occurred during login. Please try again.",
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the admin dashboard.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
