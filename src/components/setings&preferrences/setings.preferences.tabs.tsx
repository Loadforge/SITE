"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

function SettingsPreferencesTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-row h-full", className)}
      {...props}
    />
  );
}

function SettingsPreferencesTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex flex-col justify-between bg--background-secondary  border-r border-separators/50 text-text w-40 py-4 pt-10",
        className
      )}
      {...props}
    />
  );
}

function SettingsPreferencesTabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-separators/50 data-[state=active]:text-white flex items-center gap-2 px-3 py-2 text-md font-semibold rounded-sm w-full hover:bg-background/50 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

function SettingsPreferencesTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 p-6 overflow-y-auto", className)}
      {...props}
    />
  );
}

export {
  SettingsPreferencesTabs, SettingsPreferencesTabsContent, SettingsPreferencesTabsList,
  SettingsPreferencesTabsTrigger
};

