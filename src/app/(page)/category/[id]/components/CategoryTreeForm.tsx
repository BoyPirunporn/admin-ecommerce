'use client';
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import CategoryFieldArray from "./CategoryFieldArray";
import FormFileUpload from "@/components/form-file-upload";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldCommon } from "@/components/ui/form-field-common";
import { X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { toast } from "sonner";
import { delay } from "@/lib/utils";
import { createCategory, updateCategory } from "@/server-action/category.service";
import { Category } from "@/typed";


const baseCategorySchema = z.object({
    id: z.number().nullable(),
    name: z.string().min(1, "Name is required"),
    imageUrl: z.union([z.string(), z.instanceof(File)]).refine(v => {
        if (v instanceof File) {
            return v.size <= 5 * 1024 * 1024;
        }
        return true;
    }, { message: "File must be less than 5MB" }),
});

type CategoryScheme = z.infer<typeof baseCategorySchema> & {
    children: CategoryScheme[];
} & {
    parent: CategoryScheme | null,
};

const categoryZod: z.ZodType<CategoryScheme> = baseCategorySchema.extend({
    children: z.lazy(() => categoryZod.array()),
    parent: z.lazy(() => categoryZod.nullable())
});


const CategoryTreeForm = ({
    category
}: {
    category: Category | null
}) => {


    const methods = useForm<CategoryScheme>({
        defaultValues: category || { id: null, parent: null, name: "", imageUrl: "", children: [] },
    });

    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({ control, name: "children" });

    const onSubmit = async (data: CategoryScheme) => {
        console.log("Submitted Data:", data);
        try {
            const formData = new FormData();
            formData.append("id", data.id?.toString()! ?? null);
            formData.append("name", data.name);
            formData.append("imageUrl", data.imageUrl);
            formData.append("parentId", data.parent?.id?.toString()! ?? null)

            // ฟังก์ชันที่ถูกต้อง
            const toChildren = (nestId: string, child: CategoryScheme) => {
                if (Array.isArray(child.children) && child.children.length > 0) {
                    child.children.forEach((chi, index) => {
                        toChildren(`${nestId}.children[${index}]`, chi);
                    });
                }
                formData.append(`${nestId}.id`, child.id?.toString()! ?? null);
                formData.append(`${nestId}.parentId`, child.parent?.id?.toString()! ?? null);
                formData.append(`${nestId}.name`, child.name);
                formData.append(`${nestId}.imageUrl`, child.imageUrl ?? null);
            };

            // เรียกใช้งาน toChildren
            if (Array.isArray(data.children) && data.children.length > 0) {
                data.children.forEach((child, index) => {
                    toChildren(`children[${index}]`, child);
                });
            }

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            const response = category !== null ? await updateCategory(formData) : await createCategory(formData);
            toast(response);
            await delay(1000);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <div className='border border-dashed py-3 px-5  flex flex-col gap-3 rounded-sm '>
                        <div className="flex flex-col gap-2">
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <FormFieldCommon
                                    label='Category Name'
                                    control={methods.control}
                                    name={`name`}
                                    placeholder='Name'
                                />
                            </div>

                            <div className='flex flex-col mx-0 gap-4'>
                                <p className='text-sm mb-2'>image</p>
                                <FormField
                                    control={methods.control}
                                    name={`imageUrl`}
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

                    <Button className="mb-10 ml-auto" type="button" onClick={() => append({ children: [], parent: null, name: "", imageUrl: "", id: null })}>
                        Add Category
                    </Button>
                    <div className="flex flex-col gap-4">
                        {fields.map((_, index) => (
                            <Accordion key={index} type="single" collapsible className="w-full hover:bg-background/30  cursor-pointer border border-gray-300 px-2 rounded-sm">
                                <AccordionItem value={`categories.${index}`} className="cursor-pointer" >
                                    <AccordionTrigger className="p-3 flex items-center cursor-pointer w-full">
                                        <h1>Sub Category#{index + 1}</h1>
                                        <X onClick={() => remove(index)} className="ml-auto" />
                                    </AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className='border border-dashed py-3 px-5  flex flex-col gap-3 rounded-sm '>
                                            <div className="flex flex-col gap-2">
                                                <div className='flex flex-col gap-3 max-w-[500px]'>
                                                    <FormFieldCommon
                                                        label='Category Name'
                                                        control={methods.control}
                                                        name={`children.${index}.name` as keyof CategoryScheme}
                                                        placeholder='Name'
                                                    />
                                                </div>

                                                <div className='flex flex-col mx-0 gap-4'>
                                                    <p className='text-sm mb-2'>image</p>
                                                    <FormField
                                                        control={methods.control}
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
                                        {/* Recursive Category Input */}
                                        <CategoryFieldArray nestIndex={`children.${index}`} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <Button className='ml-auto' disabled={false}>Submit</Button>
                </div>
            </form>
        </FormProvider>
    );
};


export default CategoryTreeForm;