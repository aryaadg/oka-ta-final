"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
 id: string;
 title: string;
 content: string;
}

interface AccordionProps {
 items: AccordionItemData[];
 className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
 const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

 const toggle = (id: string) => {
 setOpenId((prev) => (prev === id ? null : id));
 };

 return (
 <div className={`divide-y divide-graphite/20 border-y border-gym-darkBorder ${className}`}>
 {items.map((item) => {
 const isOpen = openId === item.id;
 return (
 <div key={item.id} className="py-4">
 <button
 onClick={() => toggle(item.id)}
 className="w-full flex items-center justify-between text-left gap-4 font-semibold text-lg text-foreground dark:text-muted-foreground hover:text-gym-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gym-gold py-1"
 aria-expanded={isOpen}
 >
 <span>{item.title}</span>
 <ChevronDown
 className={`w-5 h-5 shrink-0 transition-transform duration-200 text-gym-gold ${
 isOpen ? "rotate-180" : ""
 }`}
 />
 </button>
 {isOpen && (
 <div className="mt-3 text-base text-graphite dark:text-muted-foreground/80 leading-relaxed pr-6">
 {item.content}
 </div>
 )}
 </div>
 );
 })}
 </div>
 );
}
