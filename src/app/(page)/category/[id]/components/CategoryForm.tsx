'use client';
import FormFileUpload from '@/components/form-file-upload';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { delay } from '@/lib/utils';
import { createCategory } from '@/server/category';
import { Category } from '@/typed';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
type Props = {
    category: Category | null;
};

const baseCategorySchema = z.object({
    id: z.number().nullable(),
    name: z.string().min(1, "Name is required"),
    imageUrl: z.union([z.string(), z.instanceof(File)]).refine(v => {
        if (v instanceof File) {
            return v.size <= 5 * 1024 * 1024;
        }
        return true;
    }, { message: "File must be less than 5MB" }),
    parentId: z.number().nullable(),
});

type CategoryScheme = z.infer<typeof baseCategorySchema> & {
    children: CategoryScheme[];
};

const categoryZod: z.ZodType<CategoryScheme> = baseCategorySchema.extend({
    children: z.lazy(() => categoryZod.array()),
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
            name: "",
            imageUrl: "",
            parentId: null,
            children: []
        }
    });


    const onSubmit = async (data: CategoryZod) => {
        console.log(data)
        const formData = new FormData();
        try {
            formData.append("name", data.name);
            formData.append("imageUrl", data.imageUrl);
            if (data.children.length) {
                console.log("children is not empty")
                data.children.forEach((child: CategoryScheme, index) => {
                    formData.append(`children[${index}].name`, child.name);
                    formData.append(`children[${index}].imageUrl`, data.imageUrl);
                });
            }
            console.log(formData.get("children[0].name"))
            console.log(formData.get("children[0].imageUrl"))
            const response = await createCategory(formData);
            console.log(response);

            // toast(response);
            // await delay(1000);
            // window.location.href = "/category";
        } catch (error) {
            console.log(error);
        }
    };


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "children"
    });

    const handleAddSubCategory = () => {
        append({
            id: null,
            name: "",
            imageUrl: "",
            parentId: null,
            children: []
        });
    };
    const handleRemoveSubCategory = (index: number) => {
        remove(index);
    };

    useEffect(() => {
        const alertUser = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ""; // จำเป็นสำหรับบางเบราว์เซอร์
            const confirmLeave = window.confirm("Are you sure you want to reload?");
            if (confirmLeave) {
                route.back(); // Redirect ไปที่ /category
            }
        };

    }, []);

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col">
                        <div className="md:p-8 flex flex-col gap-10 col-span-7">
                            <h2 className='font-bold text-md'>Category details</h2>
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <FormFieldCommon
                                    label='Category Name'
                                    control={form.control}
                                    name={"name"}
                                    placeholder='Name'
                                />
                            </div>

                            <div className='flex flex-col mx-0 gap-4'>
                                <p className='text-sm mb-2'>image</p>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormFileUpload
                                                value={field.value}
                                                onDelete={(id: string) => {
                                                    field.onChange("");
                                                }}
                                                onChange={(e: File) => {
                                                    return field.onChange(e);
                                                }}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-3 border border-dashed py-3 px-5 rounded-sm">
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-xl font-bold">Sub categories</h1>
                                    <Button onClick={handleAddSubCategory} className='ml-auto' type='button'>Add subCategory</Button>
                                </div>
                                {fields.map((field, index) => (
                                    <div key={index} className='border border-dashed py-3 px-5  flex flex-col gap-3 rounded-sm '>
                                        <div className="flex flex-row w-full">
                                            <h1>Sub category#{index + 1}</h1>
                                            <X className="ml-auto" onClick={() => handleRemoveSubCategory(index)} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                                <FormFieldCommon
                                                    label='Sub Category Name'
                                                    control={form.control}
                                                    name={`children.${index}.name` as keyof CategoryScheme}
                                                    placeholder='Name'
                                                />
                                            </div>

                                            <div className='flex flex-col mx-0 gap-4'>
                                                <p className='text-sm mb-2'>image</p>
                                                <FormField
                                                    control={form.control}
                                                    name={`children.${index}.imageUrl` as keyof CategoryScheme}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormFileUpload
                                                                value={field.value as File}
                                                                onDelete={(id: string) => {
                                                                    field.onChange("");
                                                                }}
                                                                onChange={(e: File) => {
                                                                    return field.onChange(e);
                                                                }}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <Button className='ml-auto' disabled={loading}>Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
export default CategoryForm;