import { FaDownload, FaEdit, FaUpload } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" inline-flex items-center justify-center p-1.5 px-2 gap-2 whitespace-nowrap  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-text/25 bg-background/80  hover:opacity-80 rounded-lg ">
        New Workspace
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <FaDownload className="mr-2" /> Importar Workspace
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FaUpload className="mr-2" /> Exportar Workspace
        </DropdownMenuItem>

        <DropdownMenuItem>
          <FaEdit className="mr-2" /> Renomear Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
