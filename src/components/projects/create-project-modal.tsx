"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Project name is required"),
  repository: z.string().min(2, "GitHub repository is required"),
  framework: z.enum(["Node.js", "React", "Next.js", "Express"]),
});

type FormValues = z.infer<typeof schema>;

export function CreateProjectModal() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", repository: "", framework: "Next.js" },
  });

  function onSubmit(values: FormValues) {
    toast.success(`${values.name} is queued for creation`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus size={16} /> Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Project</DialogTitle>
          <DialogDescription className="text-sm text-secondary">Connect a repository and choose the runtime.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="space-y-2 text-sm">
            <span className="text-secondary">Project Name</span>
            <Input placeholder="atlas-web" {...form.register("name")} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-secondary">GitHub Repository</span>
            <Input placeholder="github.com/acme/atlas-web" {...form.register("repository")} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-secondary">Framework</span>
            <Select defaultValue="Next.js" onValueChange={(value) => form.setValue("framework", value as FormValues["framework"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Node.js", "React", "Next.js", "Express"].map((framework) => (
                  <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
