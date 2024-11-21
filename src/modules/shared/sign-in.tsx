"use client";

import { useGetAuthToken } from "@/api";
import { useGetUserCategories } from "@/api/user-categories/use-get-user-categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LoginAuthSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function UserSignIn() {
  const { toast } = useToast();

  const { mutate: getToken, isPending } = useGetAuthToken();

  const form = useForm<z.infer<typeof LoginAuthSchema>>({
    resolver: zodResolver(LoginAuthSchema),
    defaultValues: {
      username: "",
      password: "",
      hospitalId: "",
      userCategoryId: "",
    },
  });
  const { data: userCategoriesData  } = useGetUserCategories({ variables: { tenantId: "spandana" } })
  const userCategories = userCategoriesData?.data
  console.log(userCategories)




  const onSubmit = async (values: LoginFormValues) => {
    console.log(values)

    console.log(Number(values.userCategoryId))
    getToken(
      {
        username: values.username,
        password: values.password,
        userCategoryId: Number(values.userCategoryId),

      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            console.log('Login successful:', data.data)
            toast({
              title: "Login Successful",
              description: "You have been successfully logged in.",
            })
          } else {
            toast({
              title: "Login Failed",
              description: data.message || "Please check your credentials and try again.",
              variant: "destructive",
            })
          }
        },
        onError: (error) => {
          console.error('Login failed:', error)
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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Button onClick={() => {
        
      }}>Click me</Button>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="userCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>

                          {userCategories?.map((category) => (

                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
              />

            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
