import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAdminAuth } from "../lib/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid admin email."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { isAuthenticated, isInitializing, login, authError } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "admin@veenaacademy.com", password: "", remember: true } });

  if (isInitializing) return <section className="grid min-h-screen place-items-center bg-gradient-secondary p-5"><span className="eyebrow">Checking session</span></section>;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function onSubmit(values: LoginValues) {
    setSubmitError(null);
    try {
      await login(values.email, values.password, values.remember);
      navigate(from, { replace: true });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to login. Please try again.");
    }
  }

  const errorMessage = submitError ?? authError;

  return <section className="grid min-h-screen place-items-center bg-gradient-secondary p-5"><div className="w-full max-w-md rounded-token2xl border border-border bg-card p-7 shadow-level3"><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-tokenXl bg-primary text-lg font-black text-text-inverse">V</span><div><h1 className="text-2xl font-black text-primary">Veena Admin</h1><p className="text-sm font-semibold text-text-muted">Enterprise CMS Dashboard</p></div></div>{errorMessage && <div className="mt-6 rounded-tokenXl border border-error/30 bg-error/10 p-3 text-sm font-semibold text-error" role="alert">{errorMessage}</div>}<form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5" noValidate><Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} /><div className="relative"><Input label="Password" type={showPassword ? "text" : "password"} autoComplete="current-password" error={errors.password?.message} {...register("password")} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-9 grid h-8 w-8 place-items-center rounded-tokenPill text-text-muted hover:bg-primary-light hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><label className="flex items-center gap-3 text-sm font-semibold text-text-secondary"><input type="checkbox" className="h-4 w-4 rounded border-border text-primary" {...register("remember")} /> Remember me</label><Button type="submit" loading={isSubmitting} disabled={isSubmitting}>{isSubmitting ? "Signing in" : "Login"}</Button><p className="text-sm leading-6 text-text-muted">Use the seeded super admin credentials from your backend `.env`. Invalid credentials are intentionally reported generically for security.</p></form></div></section>;
}
