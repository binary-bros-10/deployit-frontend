import { Box } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex min-h-48 flex-col items-center justify-center text-center">
      <Box className="mb-3 text-primary" size={28} />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-secondary">{description}</p>
    </Card>
  );
}
