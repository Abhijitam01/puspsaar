"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";

// Form schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="w-full max-w-md space-y-6 ">
      <h2 className="text-3xl font-bold text-tertiary mt-5 text-center leading-snug">
        Welcome to <br />
        <span className="text-sm font-medium text-gray-600">
          Pooja Samugri — Begin Your Divine Journey
        </span>
      </h2>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      className="pl-3 h-10 border-0 border-b border-gray-300 text-gray-500 rounded-none focus:border-blue-500 "
                      {...field}
                      placeholder="Enter your email"
                    />
                  </div>
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
                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-3 pr-10 border-0 border-b border-gray-300 rounded-none text-gray-500 hover:text-gray-700 focus:border-blue-500"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-tertiary hover:bg-indigo-700 text-white font-medium text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
      <Separator />
      {/* Footer note */}

      <p className="text-center text-xs text-gray-500 mt-8">
        By signing in, you agree to our{' '}
        <a
          href="/terms-of-service"
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy-policy"
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>

      <p className="text-center text-xs text-gray-500 mt-8">
        ©2025 Samugri. All rights reserved
      </p>
    </div>
  );
}