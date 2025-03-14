'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn, delay } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/server/category';
import { toast } from 'sonner';
type Props = {
    category: Category | null;
};


const categoryZod = z.object({
    id: z.number().nullable(),
    name: z.string().min(1)
});

type CategoryZod = z.infer<typeof categoryZod>;
const CategoryForm = ({
    category
}: Props) => {
    const route = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CategoryZod>({
        resolver: zodResolver(categoryZod),
        defaultValues: category || {
            id: null,
            name: ""
        }
    });

    const onSubmit = async (data: CategoryZod) => {
        try {
            const response = await createCategory(data as Category);
            toast(response);
            await delay(1000);
            window.location.href = "/category"
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dialog open={true} onOpenChange={() => route.back()}>
            <div className="">
                <DialogContent className={cn(
                    "overflow-auto max-h-[calc(100%_-_64px)] max-w-md"
                )}>
                    <DialogHeader>
                        <DialogTitle className="text-md">Add Category</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                                <FormFieldCommon
                                    label='Category name'
                                    control={form.control}
                                    name='name'
                                    placeholder='Enter category name'
                                />

                                <Button className='ml-auto' disabled={loading}>Submit</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};
export default CategoryForm;