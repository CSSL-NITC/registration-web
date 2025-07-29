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

import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onLogin } from "@/lib/api/login-api";
import { INVALID_USERNAME } from "@/lib/constants/message-constants";
import jwtService from "@/lib/services/jwt-service";
import toastService from "@/lib/services/toast-service";
import { trim } from "@/lib/utils/app-utils";
import { getEncryptedPassword } from "@/lib/utils/password-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import cloneDeep from "lodash/cloneDeep";
import { Activity, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGE } from "@/lib/constants/common";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Username must be at least 2 charachters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 charachers" }),
});

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (jwtService.isUserLoggedIn()) {
      route.push(DASHBOARD_PAGE);
      /* setTimeout(() => {
        window.location.reload();
      }, 100); */
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const loginRQ = { ...values };
      loginRQ.password = getEncryptedPassword(loginRQ.password);
      const loginRQValidate = { ...loginRQ };

      if (!trim(loginRQValidate).email) {
        setLoading(false);
        toastService.showErrorMessage(INVALID_USERNAME);
        return;
      }

      let response = await onLogin(loginRQ);
      const userData = cloneDeep(response.data);
      jwtService.setAccessToken(userData.accessToken);
      jwtService.setRefreshToken(userData.refreshToken);
      delete userData.accessToken;
      delete userData.refreshToken;
      jwtService.setLoginUser(userData);
      jwtService.onLoginSuccess(userData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-indigo-800 dark:from-blue-600 dark:to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Login
            </CardTitle>
            <CardDescription>
              Access the NIT Conference 2025 admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((v) => onSubmit(v))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@nitconf.lk"
                          required
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
                    <FormItem style={{ marginBottom: "15px" }}>
                      <FormLabel className="text-base font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
                            placeholder="Password"
                            {...field}
                          />
                          <div
                            className="absolute top-3 right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye size={15} color="#a1a1aa" />
                            ) : (
                              <EyeOff size={15} color="#a1a1aa" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
