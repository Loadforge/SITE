import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Checkbox } from "@/components/ui/checkbox";
  import { EyeOff, RefreshCw } from "lucide-react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { useState } from "react";

  const formSchema = z.object({
    apiUri: z.string().url({ message: "Insira uma URL válida" }),
    apiToken: z.string().optional(),
    keepConnected: z.boolean().optional(),
    autoSync: z.boolean().optional(),
  })

  export function FormApiConnect(){
    const [showToken, setShowToken] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        apiUri: "https://localhost:8080/",
        apiToken: "token",
        keepConnected: true,
        autoSync: true,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Dados enviados:", values)
      }

    return(
        <Form{...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 text-text p-1">
                <FormField
                    control={form.control}
                    name="apiUri"
                    render={({field}) => (
                    <FormItem className="gap-5">
                        <FormLabel className="text-lg font-bold">Api URI</FormLabel>
                        <FormControl>
                            <Input {...field} className="w-103 border-separators/50"/>
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apiToken"
                    render={({field}) => (
                    <FormItem className="gap-5">
                        <FormLabel className="text-lg font-bold">Api Token</FormLabel>
                        <div className="relative">
                            <FormControl>
                                <Input
                                    {...field}
                                    className="w-103 pr-10 border-separators/50"
                                    type={showToken ? "text" : "password"}
                                />
                            </FormControl>
                            <EyeOff
                                size={18}
                                className="cursor-pointer text-primary absolute top-1/2 left-95 -translate-y-1/2"
                                onClick={() => setShowToken(!showToken)}
                            />
                        </div>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="keepConnected"
                    render={({field}) => (
                    <FormItem className="flex items-center space-x-2">
                        <FormLabel className="text-lg font-bold">Keep connected</FormLabel>
                        <FormControl>
                            <Checkbox
                                checked={field.value}   
                                onCheckedChange={field.onChange}
                                className="border-primary" 
                            />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="autoSync"
                    render={({field}) => (
                    <FormItem className="flex items-center space-x-2">
                        <FormLabel className="text-lg font-bold">
                            Auto Sync <RefreshCw size={12}/> 
                        </FormLabel>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-primary"
                            />
                        </FormControl>
                    </FormItem>
                    )}
                />
            </form>
        </Form>
    );
  }
