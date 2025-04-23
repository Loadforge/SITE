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
import { Button, Label } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Pencil } from "lucide-react";

type QueryParam = {
  id: string;
  enabled: boolean;
  name: string;
  value: string;
  isEditing: boolean;
};

export function ParamsReq() {
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [, setEditingParamId] = useState<string | null>(null);
  const nameInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const valueInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleAddParam = () => {
    const completelyEmptyParam = queryParams.find(
      (param) => param.name.trim() === "" && param.value.trim() === ""
    );

    if (completelyEmptyParam) {
      setEditingParamId(completelyEmptyParam.id);
      setTimeout(() => {
        setQueryParams((prev) =>
          prev.map((p) => (p.id === completelyEmptyParam.id ? { ...p, isEditing: true } : p))
        );
        nameInputRefs.current.get(completelyEmptyParam.id)?.focus();
      }, 0);
      return;
    }

    const newParam: QueryParam = {
      id: crypto.randomUUID(),
      name: "",
      value: "",
      enabled: false,
      isEditing: true,
    };
    setQueryParams((prev) => [...prev, newParam]);
    setEditingParamId(newParam.id);
    setTimeout(() => {
      nameInputRefs.current.get(newParam.id)?.focus();
    }, 0);
  };

  const removeQueryParam = (id: string) => {
    setQueryParams((prev) => prev.filter((param) => param.id !== id));
  };

  const updateQueryParam = (
    id: string,
    field: "name" | "value" | "enabled",
    value: string | boolean
  ) => {
    setQueryParams((prev) =>
      prev.map((param) => {
        if (param.id === id) {
          const updatedParam = { ...param, [field]: value };
          if (
            (field === "name" || field === "value") &&
            (updatedParam.name.trim() === "" || updatedParam.value.trim() === "")
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
        if (param.name.trim() === "") {
          nameInputRefs.current.get(id)?.focus();
        } else if (param.value.trim() === "") {
          valueInputRefs.current.get(id)?.focus();
        } else {
          nameInputRefs.current.get(id)?.focus();
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
    <div className="space-y-4">
      <div className="bg-muted rounded-md p-2 text-muted-foreground opacity-70 text-sm">
        <Label className="mb-1">URL Preview</Label>
        {buildUrlPreview(queryParams)}
      </div>
      
      <div className="overflow-y-auto max-h-65">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] border"></TableHead> {/* Checkbox */}
              <TableHead className="border">Name</TableHead>
              <TableHead className="border">Value</TableHead>
              <TableHead className="text-center border w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {queryParams.map((param) => (
              <TableRow key={param.id}>
                <TableCell className="border text-center p-0">
                  <Checkbox
                    checked={param.enabled}
                    disabled={param.name.trim() === "" || param.value.trim() === ""}
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
                            nameInputRefs.current.set(param.id, el);
                          } else {
                            nameInputRefs.current.delete(param.id);
                          }
                        }}
                        value={param.name}
                        onChange={(e) =>
                          updateQueryParam(param.id, "name", e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, param.id)}
                        className={
                          param.name.trim() === "" ? "border-destructive" : ""
                        }
                      />
                    ) : (
                      <span className="ml-3">
                        {param.name || (
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
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddParam} size="sm">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
    </div>
  );
}

function buildUrlPreview(params: QueryParam[]) {
  const enabledParams = params.filter(
    (p) => p.enabled && p.name.trim() && p.value.trim()
  );
  const queryString = enabledParams
    .map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value)}`)
    .join("&");

  return `http://localhost:8080/url_mock${queryString ? "?" + queryString : ""}`;
}