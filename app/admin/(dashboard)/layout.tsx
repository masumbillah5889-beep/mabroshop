import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, getBranding } from "@/lib/data";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense in depth — middleware already redirects signed-out visitors, this
  // catches direct navigation and the pre-Supabase-setup state.
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }

  const branding = await getBranding();

  return (
    <div className="flex min-h-screen bg-paper">
      <AdminSidebar branding={branding} />
      <div className="flex-1 overflow-x-hidden">
        {!isSupabaseConfigured() && (
          <div className="bg-signal/10 px-6 py-2 text-center text-xs font-medium text-signal-dark">
            Supabase কানেক্ট করা হয়নি — এখন ডেমো ডেটা দেখানো হচ্ছে। README.md দেখুন।
          </div>
        )}
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
