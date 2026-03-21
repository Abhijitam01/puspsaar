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
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-primary mt-5 text-center leading-snug">
        Welcome to <br />
        <span className="text-sm font-medium text-muted-foreground">
          Velaire House — Orchestrate your provenance desk
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
                <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-3 h-10 border-0 border-b border-border text-foreground rounded-none focus:border-primary bg-transparent"
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
                <FormLabel className="text-sm font-medium text-foreground">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-3 pr-10 border-0 border-b border-border rounded-none text-foreground hover:text-foreground focus:border-primary bg-transparent"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
      <Separator className="bg-border" />
      {/* Footer note */}

      <p className="text-center text-xs text-muted-foreground mt-8">
        By signing in, you agree to our{' '}
        <a
          href="/terms-of-service"
          className="text-primary hover:text-primary/80 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy-policy"
          className="text-primary hover:text-primary/80 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>

      <p className="text-center text-xs text-muted-foreground mt-8">
        ©2025 Velaire House. All rights reserved
      </p>
    </div>
  );
}
