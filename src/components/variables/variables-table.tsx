import { EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import type { EnvironmentVariable } from "@/types";

export function VariablesTable({ variables }: { variables: EnvironmentVariable[] }) {
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
            {variables.map((variable) => (
              <tr key={variable.id}>
                <Td className="font-mono text-foreground">{variable.key}</Td>
                <Td className="font-mono">{variable.sensitive ? <span className="inline-flex items-center gap-2"><EyeOff size={15} /> Hidden</span> : variable.value}</Td>
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
