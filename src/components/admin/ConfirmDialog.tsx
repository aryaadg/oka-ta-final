"use client";

import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
 isOpen: boolean;
 title?: string;
 message: string;
 onConfirm: () => void;
 onCancel: () => void;
}

export function ConfirmDialog({
 isOpen,
 title = "Konfirmasi Hapus",
 message,
 onConfirm,
 onCancel,
}: ConfirmDialogProps) {
 return (
 <Dialog isOpen={isOpen} onClose={onCancel} title={title}>
 <div className="flex flex-col gap-6">
 <div className="flex items-start gap-3 p-4 bg-needle/10 border border-needle/30 rounded-[2px]">
 <AlertTriangle className="w-6 h-6 text-needle shrink-0 mt-0.5" />
 <p className="text-sm text-foreground dark:text-muted-foreground font-medium leading-relaxed">
 {message}
 </p>
 </div>

 <div className="flex items-center justify-end gap-3 pt-2">
 <Button variant="paper" onClick={onCancel}>
 Batal
 </Button>
 <Button variant="needle" onClick={onConfirm}>
 Ya, Hapus Data
 </Button>
 </div>
 </div>
 </Dialog>
 );
}
