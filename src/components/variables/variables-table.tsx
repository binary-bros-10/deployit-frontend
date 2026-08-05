import { EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/table";
import type { DeploymentEnvironmentVariable } from "@/lib/deployment-env";

type VariablesTableProps = {
  variables: DeploymentEnvironmentVariable[];
  isLoading?: boolean;
  isError?: boolean;
};

export function VariablesTable({ variables, isLoading = false, isError = false }: VariablesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <Button size="sm"><Plus size={15} /> Add</Button>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table>
          <thead>
            <tr><Th>Key</Th><Th>Value</Th><Th className="text-right">Actions</Th></tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><Td colSpan={3}><div className="flex items-center gap-2 py-2 text-secondary"><LoadingSpinner /> Loading variables...</div></Td></tr>
            )}
            {isLoading && Array.from({ length: 3 }, (_, index) => (
              <tr key={index}><Td><Skeleton className="h-4 w-28" /></Td><Td><Skeleton className="h-4 w-40" /></Td><Td><Skeleton className="ml-auto h-8 w-20" /></Td></tr>
            ))}
            {!isLoading && isError && <tr><Td colSpan={3}><p role="alert" className="py-4 text-secondary">Unable to load environment variables.</p></Td></tr>}
            {!isLoading && !isError && variables.length === 0 && <tr><Td colSpan={3}><p className="py-4 text-secondary">No environment variables found.</p></Td></tr>}
            {!isLoading && !isError && variables.map((variable, index) => (
              <tr key={variable.id ?? `${variable.key}-${index}`}>
                <Td className="font-mono text-foreground">{variable.key}</Td>
                <Td className="font-mono">{variable.isSecret || variable.isMasked ? <span className="inline-flex items-center gap-2"><EyeOff size={15} />{variable.value ?? "Value unavailable"}</span> : variable.value ?? "Value unavailable"}</Td>
                <Td className="text-right">
                  <Button variant="ghost" size="icon" aria-label="Edit variable"><Pencil size={15} /></Button>
                  <Button variant="ghost" size="icon" aria-label="Delete variable"><Trash2 size={15} /></Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
