/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import loginImage from "@/assets/images/login.jpg";
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
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";
// import config from "@/config";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const userInfo = {
      email: values.email,
      password: values.password,
    };
    console.log(userInfo);
    try {
      const result = await login(userInfo).unwrap();
      if (result.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
      console.error(err);
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
                  Login to your account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                  <Button className="w-full cursor-pointer" type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                {/* <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span> */}
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
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted md:col-span-3 relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
