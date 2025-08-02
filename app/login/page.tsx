"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onLogin, onForgotPassword, onResetPassword } from "@/lib/api/login-api";
import { INVALID_EMAIL } from "@/lib/constants/message-constants";
import jwtService from "@/lib/services/jwt-service";
import toastService from "@/lib/services/toast-service";
import { trim } from "@/lib/utils/app-utils";
import { getEncryptedPassword } from "@/lib/utils/password-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import cloneDeep from "lodash/cloneDeep";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE } from "@/lib/constants/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    newPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RoleRedirects = {
  [key: string]: string;
};

const ROLE_REDIRECTS: RoleRedirects = {
  "SUPER ADMIN": "/dashboard",
  "COMPANY": "/company-portal",
  "COMPANY_USER": "/user/dashboard",
  "INDIVIDUAL_USER": "/profile",
  DEFAULT: "/dashboard", // Fallback route
} as const;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (jwtService.isUserLoggedIn()) {
      router.push(DASHBOARD_PAGE);
    }
  }, [router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password
      };

      const loginRQ = { ...trimmedValues };
      loginRQ.password = getEncryptedPassword(loginRQ.password);

      if (!loginRQ.email) {
        setLoading(false);
        toastService.showErrorMessage(INVALID_EMAIL);
        return;
      }

      console.log("Sending login request:", loginRQ); // Debug log
      const response = await onLogin(loginRQ);
      console.log("Login response:", response); // Debug log

      const userData = cloneDeep(response.data);
      console.log("User data:", userData); // Debug log

      // Store tokens and user data
      jwtService.setAccessToken(userData.accessToken);
      jwtService.setRefreshToken(userData.refreshToken);
      delete userData.accessToken;
      delete userData.refreshToken; // Fixed typo

      jwtService.setLoginUser(userData);
      jwtService.onLoginSuccess(userData);

      // Determine redirect path based on role
      const userRole = userData.roles?.[0] || '';
      console.log("User role:", userRole); // Debug log
      const redirectPath = ROLE_REDIRECTS[userRole] || ROLE_REDIRECTS.DEFAULT;
      console.log("Redirecting to:", redirectPath); // Debug log

      toastService.showSuccessMessage("Login successful!");
      router.push(redirectPath);

    } catch (error: any) {
      console.error("Login error:", error); // Detailed error logging
      setLoading(false);

      if (error.response) {
        console.error("Error response data:", error.response.data); // Debug log
        const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          "Login failed. Please try again.";

        if (error.response.status === 401) {
          toastService.showErrorMessage("Invalid email or password");
        } else if (error.response.status === 403) {
          toastService.showErrorMessage("Account not authorized");
        } else {
          toastService.showErrorMessage(errorMessage);
        }
      } else if (error.request) {
        console.error("No response received:", error.request); // Debug log
        toastService.showErrorMessage("Network error. Please check your connection.");
      } else {
        console.error("Request setup error:", error.message); // Debug log
        toastService.showErrorMessage("An unexpected error occurred");
      }
    }
  };

  const handleForgotPassword = async (
    values: z.infer<typeof forgotPasswordSchema>
  ) => {
    try {
      setLoading(true);
      await onForgotPassword({ email: values.email, validate: true });
      setEmailForReset(values.email);
      setOtpSent(true);
      setForgotPasswordOpen(false);
      setResetPasswordOpen(true);
      toastService.showSuccessMessage("OTP sent to your email");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleResetPassword = async (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    try {
      setLoading(true);
      await onResetPassword({
        email: emailForReset,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      toastService.showSuccessMessage("Password reset successfully");
      setResetPasswordOpen(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </div>

        <Card className="shadow-xl border-0 rounded-xl overflow-hidden bg-white">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <Image
                  src="https://res.cloudinary.com/djxtjt1uf/image/upload/v1753804463/NITC-Logo-7c1f04fc_qobxl1.png"
                  alt="NITC 2025 Logo"
                  width={120}
                  height={80}
                  className="h-auto"
                  priority
                />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              NITC 2025 Portal
            </CardTitle>
            <CardDescription className="text-blue-100 mt-2 text-lg">
              Sign in to manage NIT Conference 2025
            </CardDescription>
          </div>

          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium block mb-2">
                        Email Address
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          placeholder="admin@nitconf.lk"
                          required
                          className="pl-10 h-11 text-base bg-white text-black focus:border-0"
                          {...field}
                        />
                      </div>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium block mb-2">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-11 text-base bg-white text-black focus:border-0"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant="link"
                    type="button"
                    className="text-blue-600 hover:text-blue-800 px-0 text-sm font-medium"
                    onClick={() => setForgotPasswordOpen(true)}
                  >
                    Forgot password?
                  </Button>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a
              href="mailto:admin.exec@cssl.lk"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md rounded-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Forgot Password
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter your email to receive a password reset OTP
            </DialogDescription>
          </DialogHeader>
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        className="h-11 text-base bg-white text-black focus:border-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="border-gray-700 text-gray-700 hover:bg-gray-50 hover:text-gray bg-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter the OTP sent to your email and your new password
            </DialogDescription>
          </DialogHeader>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <FormField
                control={resetPasswordForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        className="h-11 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={resetPasswordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-11 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetPasswordOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}