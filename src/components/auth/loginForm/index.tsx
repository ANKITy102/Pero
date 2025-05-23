"use client";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const Router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setIsLoading2(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/discover",
    });
    setIsLoading2(false);
    if (res?.ok) {
      Router.push("/discover");
    } else {
      toast.error("Login failed");
    }
  };

  const GoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { redirectTo: "/discover" });
  };

  return (
    <div className="bg-black/50 py-10 h-full mt-10 mb-5 w-full rounded-xl  max-w-md mx-auto px-7"> 
      <div className="flex justify-center ">
        <Link
          href="/"
          className="text-6xl px-2 italic font-bold font-carter bg-gradient-to-r from-[#c41df3] to-blue-400 bg-clip-text text-transparent"
        >
          Pero
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Log in to your account
        </h1>
        <p className="text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-300 hover:text-green-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="mb-6">
        <Button
          onClick={GoogleLogin}
          variant="secondary"
          className="w-full h-12"
          disabled={isLoading || isLoading2}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            <GoogleSvg />
          )}
        </Button>
      </div>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-grow h-0.5 bg-gray-500" />
        <span className="text-gray-300 text-sm text-center">
          OR <br /> continue with
        </span>
        <div className="flex-grow h-0.5 bg-gray-500" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1 text-white">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="h-12 placeholder:text-gray-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 text-white">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white"
            disabled={isLoading || isLoading2}
          >
            {isLoading2 ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <Link
          href="/forgot-password"
          className="text-gray-100 hover:text-gray-300"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

const GoogleSvg = () => (
  <svg
    className="scale-150"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 0 24 24"
    width="30"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);
