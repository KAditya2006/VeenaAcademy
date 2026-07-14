import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { AdminCard } from "../components/common/AdminCard";
import { useAdminAuth } from "../lib/auth";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string()
    .min(10, "Use at least 10 characters.")
    .regex(/[A-Z]/, "Add one uppercase letter.")
    .regex(/[a-z]/, "Add one lowercase letter.")
    .regex(/[0-9]/, "Add one number.")
    .regex(/[^A-Za-z0-9]/, "Add one special character."),
  confirmPassword: z.string().min(1, "Confirm your new password."),
}).refine((value) => value.newPassword === value.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match." });

type PasswordValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordPage() {
  const { changePassword } = useAdminAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PasswordValues>({ resolver: zodResolver(passwordSchema) });

  async function onSubmit(values: PasswordValues) {
    setError(null);
    setMessage(null);
    try {
      await changePassword(values);
      setMessage("Password changed. Please log in again.");
      setTimeout(() => navigate("/admin/login", { replace: true }), 500);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to change password.");
    }
  }

  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Security</p><h2 className="font-display text-5xl text-primary">Change Password</h2><p className="mt-2 text-text-secondary">Use at least 10 characters with uppercase, lowercase, number and special character.</p></div><AdminCard className="max-w-2xl p-6">{error && <div className="mb-5 rounded-tokenXl border border-error/30 bg-error/10 p-3 text-sm font-semibold text-error" role="alert">{error}</div>}{message && <div className="mb-5 rounded-tokenXl border border-success/30 bg-success/10 p-3 text-sm font-semibold text-success" role="status">{message}</div>}<form onSubmit={handleSubmit(onSubmit)} noValidate><div className="grid gap-5"><Input label="Current Password" type="password" autoComplete="current-password" error={errors.currentPassword?.message} {...register("currentPassword")} /><Input label="New Password" type="password" autoComplete="new-password" error={errors.newPassword?.message} {...register("newPassword")} /><Input label="Confirm New Password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword")} /></div><Button type="submit" className="mt-6" loading={isSubmitting} leftIcon={<KeyRound size={18} />}>{isSubmitting ? "Updating" : "Update Password"}</Button></form></AdminCard></div>;
}
