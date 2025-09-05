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
    <div className="rounded-lg border border-border bg-background shadow-sm overflow-hidden max-h-[32rem] flex flex-col">
      <div className="relative overflow-x-auto">
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-3.5 text-left text-sm font-medium text-foreground/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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

        <div
          ref={scrollRef}
          className="overflow-y-auto max-h-[28rem] divide-y divide-border"
        >
          <Table>
            <TableBody className="divide-y divide-border">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group hover:bg-muted/20 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;
                      const value = cell.getValue();
                      return (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-3 text-sm text-foreground/90 group-hover:text-foreground"
                        >
                          {columnId === "http_status" ? (
                            <div className="w-fit">
                              <HttpStatuBadge
                                code={
                                  typeof value === "number"
                                    ? value
                                    : Number(value) || 0
                                }
                              />
                            </div>
                          ) : columnId === "duration_ms" ? (
                            <span className="font-mono text-sm">
                              {String(value)} ms
                            </span>
                          ) : (
                            <div className="truncate max-w-[200px]">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
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
                    className="h-48 text-center text-muted-foreground/70"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-foreground/60 text-base font-medium">
                        No data available
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or check back later
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
