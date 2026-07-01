import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { user } from "@/data/user";

export default function AccountPage() {
  return (
    <DashboardLayout>
      <PageShell title="Account" description="GitHub identity and session controls.">
        <Card className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-secondary">{user.email}</p>
              <p className="text-secondary">@{user.githubUsername}</p>
            </div>
          </div>
          <Button variant="secondary"><LogOut size={16} /> Logout</Button>
        </Card>
      </PageShell>
    </DashboardLayout>
  );
}
