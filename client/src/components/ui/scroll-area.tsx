"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAreaPrimitive.Root className={cn("overflow-hidden", className)}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-md">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="w-2 bg-gray-700">
        <ScrollAreaPrimitive.Thumb className="bg-gray-500 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}
