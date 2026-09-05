import { getBranding } from "@/lib/data";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const branding = await getBranding();
  return <LoginForm branding={branding} />;
}
