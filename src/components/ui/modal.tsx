'use client';

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./dialog";


interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    size?: "sm" | "md" | "lg";
    className?: string;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    title,
    description = " ",
    isOpen,
    onClose,
    size = "md",
    children,
    className
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <div className="">
                <DialogContent className={cn(
                    className,
                    "overflow-auto max-h-[calc(100%_-_64px)] max-w-md"
                )}>
                    <DialogHeader>
                        <DialogTitle className="text-md">{title}</DialogTitle>
                        <DialogDescription className="text-sm">{description}</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-auto">{children}</div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default Modal;