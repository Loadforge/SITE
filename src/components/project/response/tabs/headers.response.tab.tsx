import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  responseHeaders: Record<string, string>;
}

export function HeadersResponseTab({ responseHeaders }: Props) {
  const headers = Object.entries(responseHeaders);

  return (
    <div className="h-full overflow-y-auto p-4">
      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="border">Key</TableHead>
            <TableHead className="border">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headers.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="border text-start">
                <span className="ml-3">
                  {key || (
                    <span className="text-muted-foreground opacity-50">
                      Empty
                    </span>
                  )}
                </span>
              </TableCell>

              <TableCell className="border w-80">
                <span className="ml-3">
                  {value || (
                    <span className="text-muted-foreground opacity-50">
                      Empty
                    </span>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
