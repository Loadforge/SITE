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
  const [showPassword, setShowPassword] = useState(false);

  const [enabled, setEnabled] = useState<boolean>(true);
  const [key, setKey] = useState<string>();
  const [value, setValue] = useState<string>();
  const [addTo, setAddTo] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    RequestAuthService.getAuthByRequestId(id).then((auth) => {
      setAuth(auth);

      if (auth) {
        if (auth.value.type !== "none") {
          setEnabled(auth.value.value?.enabled ?? true);

          if (auth.value.type === "apiKey") {
            setKey(auth.value.value?.key || "");
            setValue(auth.value.value?.value || "");
            setAddTo(auth.value.value?.addTo || "");
          }

          if (auth.value.type === "basic") {
            setUsername(auth.value.value?.username || "");
            setPassword(auth.value.value?.password || "");
          }

          if (auth.value.type === "bearer") {
            setToken(auth.value.value?.token || "");
            console.log("Aqui mesmo", auth.value.value?.token)
          }
        } 
      }
    });
  }, [id]);

  const updateField = (field: string, newValue: any) => {
    if (!auth || auth.value.type === "none") return;
  
    const newInnerValue = {
   
      ...auth.value.value,
      [field]: newValue,
    };
  
    const updatedAuth = {
      
      ...auth,
      value: {
        ...auth.value,
        value: newInnerValue,
      },
    };
  
    setAuth(updatedAuth);
  
    RequestAuthService.update(updatedAuth).catch((error) => {
      console.error("Error updating auth:", error);
    });
  };

  const updateType = (newType: Type) => {
    if (!auth) return;
    setAuth({
      ...auth,
      value: { type: newType, value: null },
    });
    RequestAuthService.update({
      ...auth,
      value: { type: newType, value: null },
    }).then(() => {});
  };



  return (
    <div className="space-y-6 p-1 w-full">
      <div className="flex items-center gap-3">
        <Label>Auth Type</Label>
        <Select
          value={auth?.value.type}
          onValueChange={(value) => updateType(value as Type)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="apiKey">API Key</SelectItem>
            <SelectItem value="basic">Basic Auth</SelectItem>
            <SelectItem value="bearer">Bearer Token</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {auth?.value.type === "apiKey" && (
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
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
          <div className="flex space-y-2">
            <Label className="w-15">Key</Label>
            <Input
              className="w-xl"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                updateField("key", e.target.value);
              }}
            />
          </div>
          <div className="flex relative w-2xl">
            <Label className="w-15">Value</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-xl"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                updateField("value", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-12 -translate-y-1/2 cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>
          <div className="flex space-y-2">
            <Label className="w-15">Add To</Label>
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

      {auth?.value.type === "basic" && (
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
            <Label htmlFor="basic-enabled">Enabled</Label>
            <Checkbox
              id="basic-enabled"
              className="border-primary"
              checked={enabled}
              onCheckedChange={(checked) => {
                const isChecked = checked === true; 
                setEnabled(isChecked);
                updateField("enabled", checked);
              }}
            />
          </div>
          <div className="flex space-y-2">
            <Label className="w-18">Username</Label>
            <Input
              className="w-xl"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                updateField("username", e.target.value);
              }}
            />
          </div>
          <div className="flex relative w-2xl">
            <Label className="w-18">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                updateField("password", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-9 -translate-y-1/2 cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>
        </div>
      )}

      {auth?.value.type === "bearer" && (
        <div className="space-y-5 relative">
          <div className="flex items-center space-x-3">
            <Label htmlFor="bearer-enabled">Enabled</Label>
            <Checkbox
              id="bearer-enabled"
              className="border-primary"
              checked={enabled}
              onCheckedChange={(checked) => {
                const isChecked = checked === true; 
                setEnabled(isChecked);
                updateField("enabled", checked);
              }}
            />
          </div>
          <div className="flex relative w-2xl">
            <Label className="w-15">Token</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-xl"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                updateField("token", e.target.value);
              }}
            />
            <div
              className="absolute top-1/2 right-12 -translate-y-1/2 cursor-pointer text-primary"
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
