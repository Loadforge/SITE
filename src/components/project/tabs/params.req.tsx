import { Pencil, Plus, Trash2 } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button, Label } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Param } from "@/db/types/params.type";
import { ParamsService } from "@/services/request/params.request.service";

interface Props {
  id: string;
  url: string;
}

type ParamWithEditing = Param & { isEditing?: boolean };

export function ParamsReq({ id, url }: Props) {
  const [queryParams, setQueryParams] = useState<ParamWithEditing[]>([]);
  const [, setEditingParamId] = useState<string | null>(null);
  const keyInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const valueInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleAddParam = () => {
    const completelyEmptyParam = queryParams.find(
      (param) => param.key.trim() === "" && param.value.trim() === ""
    );

    if (completelyEmptyParam) {
      setEditingParamId(completelyEmptyParam.id);
      setTimeout(() => {
        setQueryParams((prev) =>
          prev.map((p) =>
            p.id === completelyEmptyParam.id ? { ...p, isEditing: true } : p
          )
        );
        keyInputRefs.current.get(completelyEmptyParam.id)?.focus();
      }, 0);
      return;
    }

    ParamsService.create(id)
      .then((param) => {
        const newParam: ParamWithEditing = {
          ...param,
          isEditing: true,
        };

        setQueryParams((prev) => [...prev, newParam]);
        setEditingParamId(newParam.id);

        setTimeout(() => {
          keyInputRefs.current.get(newParam.id)?.focus();
        }, 0);
      })
      .catch((err) => {
        console.error("Erro ao criar parâmetro:", err);
      });
  };

  const removeQueryParam = (id: string) => {
    ParamsService.deleteById(id).then(() => {});
    setQueryParams((prev) => prev.filter((param) => param.id !== id));
  };

  const buildUrlPreview = (params: ParamWithEditing[]) => {
    const enabledParams = params.filter(
      (p) => p.enabled && p.key.trim() && p.value.trim()
    );
    const queryString = enabledParams
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join("&");

    return `${url}${queryString ? "?" + queryString : ""}`;
  };

  const updateQueryParam = (
    id: string,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    setQueryParams((prev) => {
      return prev.map((param) => {
        if (param.id === id) {
          const updatedParam = { ...param, [field]: value };
  
          if (
            (field === "key" || field === "value") &&
            (updatedParam.key.trim() === "" || updatedParam.value.trim() === "")
          ) {
            updatedParam.enabled = false;
          }
  
          const paramToSave = { ...updatedParam }; 
          delete paramToSave.isEditing;
          ParamsService.update(paramToSave).catch((err) =>
            console.error("Erro ao atualizar parâmetro:", err)
          );
  
          return updatedParam;
        }
        return param;
      });
    });
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

  useEffect(() => {
    ParamsService.getByRequestId(id).then((params) => {
      const enriched = params.map((p) => ({ ...p, isEditing: false }));
      setQueryParams(enriched);
    });
  }, [id]);

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-md p-2 text-muted-foreground opacity-70 text-sm">
        <Label className="mb-1">URL Preview</Label>
        {buildUrlPreview(queryParams)}
      </div>

      <div className="overflow-y-auto max-h-[35vh] max-w-4xl">
        <Table>
          <TableHeader className="bg-background-secondary">
            <TableRow>
              <TableHead className="w-[40px] border"></TableHead>
              <TableHead className="border">Key</TableHead>
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
                    disabled={
                      param.key.trim() === "" || param.value.trim() === ""
                    }
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

      <div className="flex justify-start">
        <Button onClick={handleAddParam} size="sm">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
    </div>
  );
}
