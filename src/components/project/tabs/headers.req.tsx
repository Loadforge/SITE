import { Pencil, Plus, Trash2 } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/index";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Header } from "@/db/types/headers.type";
import { HeadersService } from "@/services/request/headers.service";


interface Props {
  id: string;
}

type HeaderWithEditing = Header & { isEditing?: boolean };

export function HeadersReq({ id }: Props) {
  const { t } = useTranslation();
  const [headers, setHeaders] = useState<HeaderWithEditing[]>([]);
  const [, setEditingHeaderId] = useState<string | null>(null);
  const keyInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const valueInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const descriptionInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleAddHeader = () => {
    const completelyEmptyHeader = headers.find(
      (header) => header.key.trim() === "" && header.value.trim() === ""
    );

    if (completelyEmptyHeader) {
      setEditingHeaderId(completelyEmptyHeader.id);
      setTimeout(() => {
        setHeaders((prev) =>
          prev.map((h) =>
            h.id === completelyEmptyHeader.id ? { ...h, isEditing: true } : h
          )
        );
        keyInputRefs.current.get(completelyEmptyHeader.id)?.focus();
      }, 0);
      return;
    }

    HeadersService.create(id)
      .then((header) => {
        const newHeader: HeaderWithEditing = {
          ...header,
          isEditing: true,
        };

        setHeaders((prev) => [...prev, newHeader]);
        setEditingHeaderId(newHeader.id);

        setTimeout(() => {
          keyInputRefs.current.get(newHeader.id)?.focus();
        }, 0);
      })
      .catch((err) => {
        console.error("Erro ao criar cabeçalho:", err);
      });
  };

  const removeHeader = (id: string) => {
    HeadersService.deleteById(id).then(() => {});
    setHeaders((prev) => prev.filter((header) => header.id !== id));
  };

  const updateHeader = (
    id: string,
    field: "key" | "value" | "enabled" | "description",
    value: string | boolean
  ) => {
    setHeaders((prev) => {
      return prev.map((header) => {
        if (header.id === id) {
          const updatedHeader = { ...header, [field]: value };

          if (
            (field === "key" || field === "value") &&
            (updatedHeader.key.trim() === "" ||
              updatedHeader.value.trim() === "")
          ) {
            updatedHeader.enabled = false;
          }

          const headerToSave = { ...updatedHeader };
          delete headerToSave.isEditing;
          HeadersService.update(headerToSave).catch((err) =>
            console.error("Erro ao atualizar cabeçalho:", err)
          );

          return updatedHeader;
        }
        return header;
      });
    });
  };

  const toggleEditHeader = (id: string) => {
    const header = headers.find((h) => h.id === id);
    if (!header) return;

    if (!header.isEditing) {
      setEditingHeaderId(id);
      setHeaders((prev) =>
        prev.map((h) => (h.id === id ? { ...h, isEditing: true } : h))
      );
      setTimeout(() => {
        if (header.key.trim() === "") {
          keyInputRefs.current.get(id)?.focus();
        } else if (header.value.trim() === "") {
          valueInputRefs.current.get(id)?.focus();
        } else if (header.description.trim() === "") {
          descriptionInputRefs.current.get(id)?.focus();
        } else {
          keyInputRefs.current.get(id)?.focus();
        }
      }, 0);
    } else {
      setEditingHeaderId(null);
      setHeaders((prev) =>
        prev.map((h) => (h.id === id ? { ...h, isEditing: false } : h))
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      toggleEditHeader(id);
    }
  };

  useEffect(() => {
    HeadersService.getByRequestId(id).then((headers) => {
      const enriched = headers.map((h) => ({ ...h, isEditing: false }));
      setHeaders(enriched);
    });
  }, [id]);

  return (
    <div className="space-y-4">
      <div className="overflow-y-auto max-h-[35vh] max-w-6xl">
        <Table>
          <TableHeader className="bg-background-secondary">
            <TableRow>
              <TableHead className="w-[40px] border"></TableHead>
              <TableHead className="border">{t("Key")}</TableHead>
              <TableHead className="border">{t("Value")}</TableHead>
              <TableHead className="border">{t("Description")}</TableHead>
              <TableHead className="text-center border w-20">
                {t("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {headers.map((header) => (
              <TableRow key={header.id}>
                <TableCell className="border text-center p-0">
                  <Checkbox
                    checked={header.enabled}
                    disabled={
                      header.key.trim() === "" || header.value.trim() === ""
                    }
                    onCheckedChange={(checked) =>
                      updateHeader(header.id, "enabled", checked === true)
                    }
                  />
                </TableCell>

                <TableCell className="border w-80">
                  <div className="flex items-center">
                    {header.isEditing ? (
                      <Input
                        ref={(el) => {
                          if (el) {
                            keyInputRefs.current.set(header.id, el);
                          } else {
                            keyInputRefs.current.delete(header.id);
                          }
                        }}
                        value={header.key}
                        onChange={(e) =>
                          updateHeader(header.id, "key", e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, header.id)}
                        className={
                          header.key.trim() === "" ? "border-destructive" : ""
                        }
                      />
                    ) : (
                      <span className="ml-3">
                        {header.key || (
                          <span className="text-muted-foreground opacity-50">
                            {t("Empty")}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="border w-80">
                  {header.isEditing ? (
                    <Input
                      ref={(el) => {
                        if (el) {
                          valueInputRefs.current.set(header.id, el);
                        } else {
                          valueInputRefs.current.delete(header.id);
                        }
                      }}
                      value={header.value}
                      onChange={(e) =>
                        updateHeader(header.id, "value", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, header.id)}
                      className={
                        header.value.trim() === "" ? "border-destructive" : ""
                      }
                    />
                  ) : (
                    <span className="ml-3">
                      {header.value || (
                        <span className="text-muted-foreground opacity-50">
                          {t("Empty")}
                        </span>
                      )}
                    </span>
                  )}
                </TableCell>

                <TableCell className="border w-80">
                  {header.isEditing ? (
                    <Input
                      ref={(el) => {
                        if (el) {
                          descriptionInputRefs.current.set(header.id, el);
                        } else {
                          descriptionInputRefs.current.delete(header.id);
                        }
                      }}
                      value={header.description}
                      onChange={(e) =>
                        updateHeader(header.id, "description", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, header.id)}
                      className={
                        header.description.trim() === ""
                          ? "border-destructive"
                          : ""
                      }
                    />
                  ) : (
                    <span className="ml-3">
                      {header.description || (
                        <span className="text-muted-foreground opacity-50">
                          {t("Empty")}
                        </span>
                      )}
                    </span>
                  )}
                </TableCell>

                <TableCell className="border text-center space-x-2">
                  <Button
                    className={`${header.isEditing ? "bg-primary" : ""}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleEditHeader(header.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHeader(header.id)}
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
        <Button onClick={handleAddHeader} size="sm">
          <Plus className="h-4 w-4" /> {t("New")}
        </Button>
      </div>
    </div>
  );
}
