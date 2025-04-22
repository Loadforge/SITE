import { useState, KeyboardEvent, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Pencil } from "lucide-react";

type QueryParam = {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
  description : string;
  isEditing: boolean;
};

export function HeadersReq() {

  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [, setEditingParamId] = useState<string | null>(null);
  const keyInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const valueInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

const handleAddParam = () => {
    const emptyParam = queryParams.find(
      (param) => param.key.trim() === "" || param.value.trim() === ""
    );

    if (emptyParam) {
      setEditingParamId(emptyParam.id);
      setTimeout(() => {
        setQueryParams((prev) =>
          prev.map((p) => (p.id === emptyParam.id ? { ...p, isEditing: true } : p))
        );
          
      const param = queryParams.find((p) => p.id === emptyParam.id);
      if (!param) return;

      setTimeout(() => {
        if (param.key.trim() === "") {
          keyInputRefs.current.get(emptyParam.id)?.focus();
        } else if (param.value.trim() === "") {
          valueInputRefs.current.get(emptyParam.id)?.focus();
        } else {
          keyInputRefs.current.get(emptyParam.id)?.focus();
        }
        }, 0);
      }, 0);
      return;
    }

    const newParam: QueryParam = {
      id: crypto.randomUUID(),
      key: "",
      value: "",
      description: "",
      enabled: false,
      isEditing: true,
    };
    setQueryParams((prev) => [...prev, newParam]);
    setEditingParamId(newParam.id);
    setTimeout(() => {
      keyInputRefs.current.get(newParam.id)?.focus();
    }, 0);
  };

  const removeQueryParam = (id: string) => {
    setQueryParams((prev) => prev.filter((param) => param.id !== id));
  };

  const updateQueryParam = (
    id: string,
    field: "key" | "value" | "description" |"enabled",
    value: string | boolean
  ) => {
    setQueryParams((prev) =>
      prev.map((param) => {
        if (param.id === id) {
          const updatedParam = { ...param, [field]: value };
          if (
            (field === "key" || field === "value") &&
            (updatedParam.key.trim() === "" || updatedParam.value.trim() === "")
          ) {
            updatedParam.enabled = false;
          }
          return updatedParam;
        }
        return param;
      })
    );
  };

  const toggleEditQueryParam = (id: string) => {
    const param = queryParams.find((p) => p.id === id);
    if (!param) return;

    if (!param.isEditing) {
      setEditingParamId(id);
      setQueryParams((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isEditing: true } : p))
      );
      setTimeout(() => {
        if (param.key.trim() === "") {
          keyInputRefs.current.get(id)?.focus();
        } else if (param.value.trim() === "") {
          valueInputRefs.current.get(id)?.focus();
        } else {
          keyInputRefs.current.get(id)?.focus();
        }
      }, 0);
    } else {
      setEditingParamId(null);
      setQueryParams((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isEditing: false } : p))
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      toggleEditQueryParam(id);
    }
  };

  return (
    <div className="overflow-hidden space-y-4">
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] border"></TableHead>
              <TableHead className="border">Key</TableHead>
              <TableHead className="border">Value</TableHead>
              <TableHead className="border">Description</TableHead>
              <TableHead className="text-center border w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {queryParams.map((param) => (
              <TableRow key={param.id}>
                <TableCell className="border text-center p-0">
                  <Checkbox
                    checked={param.enabled}
                    disabled={param.key.trim() === "" || param.value.trim() === ""}
                    onCheckedChange={(checked) =>
                      updateQueryParam(param.id, "enabled", checked === true)
                    }
                  />
                </TableCell>

                <TableCell className="border w-80">
                  <div className="flex items-center">
                    {param.isEditing ? (
                      <Input
                        ref={(el) => {
                          if (el) {
                            keyInputRefs.current.set(param.id, el);
                          } else {
                            keyInputRefs.current.delete(param.id);
                          }
                        }}
                        value={param.key}
                        onChange={(e) =>
                          updateQueryParam(param.id, "key", e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, param.id)}
                        className={
                          param.key.trim() === "" ? "border-destructive" : ""
                        }
                      />
                    ) : (
                      <span className="ml-3">
                        {param.key || (
                          <span className="text-muted-foreground opacity-50">
                            Empty
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="border w-80">
                  {param.isEditing ? (
                    <Input
                      ref={(el) => {
                        if (el) {
                          valueInputRefs.current.set(param.id, el);
                        } else {
                          valueInputRefs.current.delete(param.id);
                        }
                      }}
                      value={param.value}
                      onChange={(e) =>
                        updateQueryParam(param.id, "value", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, param.id)}
                      className={
                        param.value.trim() === "" ? "border-destructive" : ""
                      }
                    />
                  ) : (
                    <span className="ml-3">
                      {param.value || (
                        <span className="text-muted-foreground opacity-50">
                          Empty
                        </span>
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell className="border w-80">
                {param.isEditing ? (
                  <Input
                    value={param.description}
                    onChange={(e) =>
                      updateQueryParam(param.id, "description", e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, param.id)}
                  />
                  ) : (
                    <span className="ml-3">
                      {param.description || (
                        <span className="text-muted-foreground opacity-50">
                          Empty
                        </span>
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell className="border text-center space-x-2">
                  <Button
                    className={`${param.isEditing ? "bg-primary" : ""}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleEditQueryParam(param.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQueryParam(param.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      <div className="flex justify-start">
        <Button onClick={handleAddParam} size="sm">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
    </div>
  );
}