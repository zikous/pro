"use client";

// Login page with Formik form handling
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useRedirectIfAuthenticated } from "@/lib/redirect";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

// Login form validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Form values interface
interface LoginValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  const { loading: authLoading } = useRedirectIfAuthenticated();

  // Handle form submission
  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setError("");

    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.message || "Login failed. Check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to access your account.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
            {error}
          </div>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className={
                    errors.email && touched.email ? "border-red-500" : ""
                  }
                  disabled={isSubmitting}
                />
                {errors.email && touched.email && (
                  <div className="text-xs text-red-500">{errors.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  className={
                    errors.password && touched.password ? "border-red-500" : ""
                  }
                  disabled={isSubmitting}
                />
                {errors.password && touched.password && (
                  <div className="text-xs text-red-500">{errors.password}</div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
