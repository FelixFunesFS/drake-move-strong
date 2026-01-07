import { cn } from "@/lib/utils";
import { CREDENTIAL_TABLE_DATA } from "@/data/trustStats";

interface CredentialTableProps {
  className?: string;
  rows?: number; // Limit number of rows shown
  variant?: 'full' | 'condensed';
}

export function CredentialTable({ 
  className,
  rows,
  variant = 'full'
}: CredentialTableProps) {
  const data = rows ? CREDENTIAL_TABLE_DATA.slice(0, rows) : CREDENTIAL_TABLE_DATA;

  if (variant === 'condensed') {
    return (
      <div className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4",
        className
      )}>
        {data.map((item, index) => (
          <div 
            key={index}
            className="text-center p-4 rounded-lg bg-muted/50"
          >
            <div className="font-bold text-lg text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/50">
              Proof Area
            </th>
            <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/50">
              Drake Fitness
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={index}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="py-3 px-4 text-muted-foreground font-medium">
                {item.label}
              </td>
              <td className="py-3 px-4 text-foreground font-semibold">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CredentialTable;
