import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageShell title="Settings" description="General project defaults and destructive actions.">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>General</CardTitle>
              <CardDescription>Update project name and framework preferences.</CardDescription>
            </div>
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm"><span className="text-secondary">Project Name</span><Input defaultValue="Atlas Web" /></label>
            <label className="space-y-2 text-sm"><span className="text-secondary">Framework</span><Select defaultValue="Next.js"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Node.js", "React", "Next.js", "Express"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label>
          </div>
          <Button className="mt-6"><Save size={16} /> Save Changes</Button>
        </Card>
        <Card className="border-red-500/30">
          <CardHeader>
            <div>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Delete this project and all deployment history.</CardDescription>
            </div>
            <Button variant="danger"><Trash2 size={16} /> Delete Project</Button>
          </CardHeader>
        </Card>
      </PageShell>
    </DashboardLayout>
  );
}
