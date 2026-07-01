export function PageShell({ title, description, action, children }: { title: string; description: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
          <p className="mt-2 text-secondary">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
