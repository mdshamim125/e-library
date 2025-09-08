import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import registerImage from "@/assets/images/register.jpg";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";
// import config from "@/config";
const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name requires at least 3 characters",
      })
      .max(50),
    email: z.email(),
    password: z
      .string({ message: "Password must be string" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),

    confirmPassword: z
      .string({ message: "Confirm Password must be string" })
      .min(8, {
        message: "Confirm Password must be at least 8 characters long.",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Confirm Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Confirm Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Confirm Password must contain at least 1 number.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    // console.log(userInfo);
    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("User Created Successfully");
      navigate("/login");
      // navigate("/verify", { state: userInfo.email });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user");
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${config.baseUrl}/auth/google`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-5">
          <div className="p-6 md:col-span-2 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Create a new Account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@company.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
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
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full cursor-pointer" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="w-full">
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  type="button"
                  className="w-full cursor-pointer flex items-center justify-center gap-3 rounded-lg 
               border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 
               dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 
               transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google Logo"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </Button>
              </div>

              <div className="text-center text-sm">
                Don you have any account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted md:col-span-3  relative hidden md:block">
            <img
              src={registerImage}
              alt="Image"
              className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
