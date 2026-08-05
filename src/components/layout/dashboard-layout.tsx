import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="fixed inset-y-0 left-0 hidden w-72 border-r bg-surface p-5 md:block">
          <Sidebar />
        </div>
        <div className="md:pl-72">
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
