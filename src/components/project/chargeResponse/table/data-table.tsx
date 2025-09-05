"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useRef } from "react";

import { HttpStatuBadge } from "@/components/badge/http.badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<
  TData extends { status?: string; duration?: number },
  TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="bg-background shadow-sm border border-border max-h-80">
      <div>
        <Table>
          <TableHeader className="bg-background border-b border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-semibold text-foreground border-r border-border last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>

      <div ref={scrollRef} className="max-h-64 overflow-y-auto">
        <Table>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    i % 2 === 0 ? "bg-background" : "bg-muted/10"
                  } hover:bg-muted/30 transition-colors`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    const value = cell.getValue();
                    return (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-2 text-sm text-foreground border-r border-b border-border last:border-r-0"
                      >
                        {columnId === "http_status" ? (
                          <HttpStatuBadge
                            code={
                              typeof value === "number"
                                ? value
                                : Number(value) || 0
                            }
                          />
                        ) : columnId === "duration_ms" ? (
                          <span>{String(value)} ms</span>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
