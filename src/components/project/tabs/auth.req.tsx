import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestAuth, Type } from "@/db/types";
import { RequestAuthService } from "@/services/request/auth.request.service";

interface Props {
  id: string;
}

export function AuthReq({ id }: Props) {
  const [auth, setAuth] = useState<RequestAuth>();
  const [type, setType] = useState<Type>("none");
  const [showPassword, setShowPassword] = useState(false);

  const [enabled, setEnabled] = useState(true);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [addTo, setAddTo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    RequestAuthService.getAuthByRequestId(id).then((auth) => {
      if (!auth) return;

      setAuth(auth);
      setType(auth.type);

      if (auth.type !== "none") {
        setEnabled(auth.value.enabled ?? true);

        if (auth.type === "apiKey") {
          setKey(auth.value.key || "");
          setValue(auth.value.value || "");
          setAddTo(auth.value.addTo || "");
        }

        if (auth.type === "basic") {
          setUsername(auth.value.username || "");
          setPassword(auth.value.password || "");
        }

        if (auth.type === "bearer") {
          setToken(auth.value.token || "");
        }
      }
    });
  }, [id]);

  const updateField = (field: string, newValue: any) => {
    if (!auth || auth.value.type === "none") return;

    const newInnerValue = {
      ...auth.value,
      [field]: newValue,
    };

    const updatedAuth: RequestAuth = {
      ...auth,
      value: newInnerValue,
    };

    setAuth(updatedAuth);

    RequestAuthService.update(updatedAuth).catch((error) => {
      console.error("Error updating auth:", error);
    });
  };

  const updateType = (newType: Type) => {
    if (!auth) return;

    const updated: RequestAuth = {
      ...auth,
      type: newType,
      value: { enabled: true },
    };

    setType(newType);
    setAuth(updated);

    RequestAuthService.update(updated).catch((error) => {
      console.error("Error updating type:", error);
    });
  };

  return (
    <div className="space-y-6 p-1 w-full">
      <div className="flex items-center gap-3">
        <Label>Auth Type</Label>
        <Select
          value={type}
          onValueChange={(value) => updateType(value as Type)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="apiKey">API Key</SelectItem>
            <SelectItem value="basic">Basic Auth</SelectItem>
            <SelectItem value="bearer">Bearer Token</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === "apiKey" && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Label htmlFor="api-key-enabled">Enabled</Label>
            <Checkbox
              id="api-key-enabled"
              className="border-primary"
              checked={enabled}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setEnabled(isChecked);
                updateField("enabled", isChecked);
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-20">Key</Label>
            <Input
              className="w-full"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                updateField("key", e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-3 relative">
            <Label className="w-20">Value</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-full"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                updateField("value", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-20">Add To</Label>
            <Select
              value={addTo}
              onValueChange={(val) => {
                setAddTo(val);
                updateField("addTo", val);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="query">Query Params</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {type === "basic" && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Label htmlFor="basic-enabled">Enabled</Label>
            <Checkbox
              id="basic-enabled"
              className="border-primary"
              checked={enabled}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setEnabled(isChecked);
                updateField("enabled", isChecked);
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Label className="w-24">Username</Label>
            <Input
              className="w-full"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                updateField("username", e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-3 relative">
            <Label className="w-24">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                updateField("password", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>
        </div>
      )}

      {type === "bearer" && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Label htmlFor="bearer-enabled">Enabled</Label>
            <Checkbox
              id="bearer-enabled"
              className="border-primary"
              checked={enabled}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setEnabled(isChecked);
                updateField("enabled", isChecked);
              }}
            />
          </div>

          <div className="flex items-center gap-3 relative">
            <Label className="w-20">Token</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-full"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                updateField("token", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
