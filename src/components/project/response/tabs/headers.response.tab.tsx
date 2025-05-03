import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  responseHeaders: Record<string, string>;
}

export function HeadersResponseTab({ responseHeaders }: Props) {
  const headers = Object.entries(responseHeaders);

  return (
    <div className="h-full overflow-y-auto ">
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
              <TableCell className="border text-start w-1/2">
                <span className="ml-1">
                  {key || (
                    <span className="text-muted-foreground opacity-50">
                      Empty
                    </span>
                  )}
                </span>
              </TableCell>

              <TableCell className="border w-full">
                <span className="ml-1">
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
