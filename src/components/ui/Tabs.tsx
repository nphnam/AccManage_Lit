'use client';

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultValue: string;
  items: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export const Tabs = ({ defaultValue, items, className }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      className={cn('w-full', className)}
    >
      <TabsPrimitive.List className="flex w-full items-center gap-4 border-b border-gray-200">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700',
              'data-[state=active]:border-primary data-[state=active]:text-primary'
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className="mt-4"
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}; 