'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface FileUploadProps {
    value: File | string;
    onChange: (file: File) => void;
    onDelete?: (id: string) => void;
}
const FormFileUpload: React.FC<FileUploadProps> = ({
    value,
    onChange,
    onDelete
}) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        fileRef.current?.click();
    };

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onChange(files.item(0)!);
        }
    };

    const onChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length) {
            onChange(files.item(0)!);
        }
    };

    const deleteImage = (id: string) => {
        onDelete?.(id);
    };

    if (typeof window !== "undefined" && value instanceof File) {
        return (
            <div className="relative w-[224px] h-[224px] flex flex-row justify-start gap-2">
                <Image
                    src={URL.createObjectURL(value)}
                    fill
                    className='object-cover'
                    alt={''} />
                <div className="absolute top-2 right-2">
                    <Button
                        className="w-10 h-10"
                        type="button"
                        onClick={() => onDelete?.("")}
                        variant={"destructive"}
                        size={"icon"}
                    >
                        <Trash />
                    </Button>
                </div>
            </div>
        );
    } else if (value && value.toString().length) {
        let url = process.env.NEXT_PUBLIC_DOMAIN_IMAGE + "/" + value;
        return (
            <div className="relative w-[224px] h-[224px] flex flex-row justify-start gap-2">
                <Image
                    src={url}
                    fill
                    className='object-cover'
                    alt={''} />
                <div className="absolute top-2 right-2">
                    <Button
                        className="w-10 h-10"
                        type="button"
                        onClick={() => deleteImage("")}
                        variant={"destructive"}
                        size={"icon"}
                    >
                        <Trash />
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex h-[248px] w-[280px] gap-1 border border-gray-300 rounded-lg border-dashed ">
            <div
                className="flex gap-5 h-full flex-col w-full justify-center items-center p-5"
                onDrop={handleDrop}
                onDragOver={handleOnDragOver}
                onClick={handleMouseEvent}
                tabIndex={-1}
            >
                <Input
                    accept="image/jpeg,image/png"
                    ref={fileRef}
                    className='opacity-0 hidden'
                    autoComplete="off"
                    tabIndex={-1}
                    onChange={onChooseImage}
                    multiple={false}
                    type='file'
                />
                <p>Drag and drop the image to upload here or</p>
                <Button
                    className='rounded-lg'
                    type='button'
                    size={"sm"}
                    onClick={(e) => {
                        e.stopPropagation();
                        fileRef.current?.click();
                    }}
                >
                    <Plus />
                    <span>Select Image</span>
                </Button>
                <div />
            </div>
        </div>
    );
};

export default FormFileUpload;
