import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RequestAuth, Type } from "@/db/types";
import { RequestAuthService } from "@/services/request/auth.request.service";

interface Props{
  id: string;
}

export function AuthReq({id}: Props) {
  useEffect(()=>{
    RequestAuthService.getAuthByRequestId(id).then((auth)=>{setAuth(auth)})
  },[])

  const [auth, setAuth] = useState<RequestAuth>();
  const [type ,setType] = useState<"none"| "apiKey" | "basic" | "bearer">(auth ? auth.type : "none")

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 p-1 w-full">
      <div className="flex items-center gap-3">
        <Label>Auth Type</Label>
        <Select value={type} onValueChange={(value) => setType(value as Type)}  >
          <SelectTrigger>
            <SelectValue/>
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
          <div className="flex items-center space-x-3">
          <Label htmlFor="api-key-enabled">Enabled</Label>
            <Checkbox defaultChecked
              id="api-key-enabled" 
              className="border-primary"
              />
          </div>
          <div className="flex space-y-2">
            <Label className="w-15">Key</Label>
            <Input className="w-xl"/>
          </div>
          <div className="flex relative  w-2xl">
            <Label className="w-15">Value</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-xl"
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
            <Select>
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
          <div className="flex items-center space-x-3">
          <Label htmlFor="api-key-enabled">Enabled</Label>
            <Checkbox defaultChecked
              id="api-key-enabled" 
              className="border-primary"
              />
          </div>
          <div className="flex space-y-2">
            <Label className="w-18">Username</Label>
            <Input className="w-xl"/>
          </div>
          <div className="flex relative w-2xl">
            <Label className="w-18">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              className="w-xl"
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

      {type === "bearer" && (
        <div className="space-y-5 relative">
          <div className="flex items-center space-x-3">
          <Label htmlFor="api-key-enabled">Enabled</Label>
            <Checkbox defaultChecked
              id="api-key-enabled" 
              className="border-primary"
              />
          </div>
          <div className="flex relative w-2xl">
          <Label className="w-15">Token</Label>
          <Input
            type={showPassword ? "text" : "password"}
            className="w-xl"
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