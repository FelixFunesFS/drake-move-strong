import * as React from "react";
import { cn } from "@/lib/utils";

interface ComparisonTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface ComparisonTableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface ComparisonTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface ComparisonTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  highlighted?: boolean;
}

interface ComparisonTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

interface ComparisonTableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const ComparisonTable = React.forwardRef<HTMLTableElement, ComparisonTableProps>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-xl border border-border shadow-card">
      <table
        ref={ref}
        className={cn("w-full border-collapse text-sm md:text-base", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
ComparisonTable.displayName = "ComparisonTable";

const ComparisonTableHead = React.forwardRef<HTMLTableSectionElement, ComparisonTableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("bg-primary text-primary-foreground", className)}
      {...props}
    >
      {children}
    </thead>
  )
);
ComparisonTableHead.displayName = "ComparisonTableHead";

const ComparisonTableBody = React.forwardRef<HTMLTableSectionElement, ComparisonTableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn("bg-card", className)} {...props}>
      {children}
    </tbody>
  )
);
ComparisonTableBody.displayName = "ComparisonTableBody";

const ComparisonTableRow = React.forwardRef<HTMLTableRowElement, ComparisonTableRowProps>(
  ({ className, children, highlighted, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border last:border-0 transition-colors hover:bg-muted/50",
        highlighted && "bg-drake-gold/10 hover:bg-drake-gold/20",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
);
ComparisonTableRow.displayName = "ComparisonTableRow";

const ComparisonTableHeaderCell = React.forwardRef<HTMLTableCellElement, ComparisonTableHeaderCellProps>(
  ({ className, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-4 py-4 text-left font-hero font-bold uppercase tracking-wide text-sm",
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
);
ComparisonTableHeaderCell.displayName = "ComparisonTableHeaderCell";

const ComparisonTableCell = React.forwardRef<HTMLTableCellElement, ComparisonTableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-4 py-4 text-foreground", className)}
      {...props}
    >
      {children}
    </td>
  )
);
ComparisonTableCell.displayName = "ComparisonTableCell";

export {
  ComparisonTable,
  ComparisonTableHead,
  ComparisonTableBody,
  ComparisonTableRow,
  ComparisonTableHeaderCell,
  ComparisonTableCell,
};
