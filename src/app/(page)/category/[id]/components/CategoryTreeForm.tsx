'use client';
import FormFileUpload from "@/components/form-file-upload";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldCommon } from "@/components/ui/form-field-common";
import HeaderTitle from "@/components/ui/header-title";
import { delay } from "@/lib/utils";
import { createCategory, deleteCategoryById, updateCategory } from "@/server-action/category.service";
import { Category } from "@/typed";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { X } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CategoryFieldArray from "./CategoryFieldArray";
import useStoreModal from "@/stores/store-modal";
import { useStoreLoading } from "@/stores/store-loading";


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

const dialogDelete = (callback: () => void) => {

    return (
        <div className="flex flex-row gap-2 justify-center">
            <Button onClick={callback}>Ok</Button>
        </div>
    );
};

const CategoryTreeForm = ({
    category
}: {
    category: Category | null;
}) => {

    console.log({category})

    const methods = useForm<CategoryScheme>({
        defaultValues: category || { id: null, parent: null, name: "", imageUrl: "", children: [] },
    });

    const { openModal, closeModal } = useStoreModal();
    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({ control, name: "children" });

    const onSubmit = async (data: CategoryScheme) => {
        console.log("Submitted Data:", data);
        try {
            const formData = new FormData();
            if (data.id) {
                formData.append("id", data.id.toString());
            }
            formData.append("name", data.name);
            formData.append("imageUrl", data.imageUrl ?? null);
            if (data.parent && data.parent.id) {
                formData.append("parentId", data.parent.id.toString());

            }

            // ฟังก์ชันที่ถูกต้อง
            const toChildren = (nestId: string, child: CategoryScheme) => {
                if (Array.isArray(child.children) && child.children.length > 0) {
                    child.children.forEach((chi, index) => {
                        toChildren(`${nestId}.children[${index}]`, chi);
                    });
                }
                if (child.id) {
                    formData.append(`${nestId}.id`, child.id.toString());
                }
                if (child.parent && child.parent.id) {
                    formData.append("parentId", child.parent.id.toString());
                }

                formData.append(`${nestId}.name`, child.name);
                formData.append(`${nestId}.imageUrl`, child.imageUrl ?? child.parent?.imageUrl ?? null);
            };

            // เรียกใช้งาน toChildren
            if (Array.isArray(data.children) && data.children.length > 0) {
                data.children.forEach((child, index) => {
                    toChildren(`children[${index}]`, child);
                });
            }

            // for (let pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }
            const response = category !== null ? await updateCategory(formData) : await createCategory(formData);
            toast(response);
            await delay(1000);
        } catch (error) {
            console.log(error);
        }
    };



    const handleDelete = (index: number, id: number | null) => {
        if (id) {
            openModal("Are you sure to delete this category?", {
                content: dialogDelete(async () => {
                    try {
                        await deleteCategoryById(id);
                        await delay(1000);
                        remove(index);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        closeModal();
                    }
                })
            });
        } else {
            remove(index);
        }

    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <HeaderTitle title="Category create" />
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
                    <Button className="my-10 ml-auto" type="button" onClick={() => append({ children: [], parent: null, name: "", imageUrl: "", id: null })}>
                        Add Category
                    </Button>
                    <div className="flex flex-col gap-4">
                        {fields.map((field, index) => {
                            const id = methods.getValues(`children.${index}.id` as keyof CategoryScheme) as number;
                            const name = methods.watch(`children.${index}.name` as keyof CategoryScheme) as string;
                            return (
                                <Accordion key={index} type="single" collapsible className="w-full hover:bg-background/30  cursor-pointer border border-gray-300 px-2 rounded-sm">
                                    <AccordionItem value={`categories.${index}`} className="cursor-pointer" >
                                        <AccordionTrigger className="p-3 flex items-center cursor-pointer w-full">
                                            <h1>{(name as string).length ? name : "Item"}</h1>
                                            <X onClick={() => handleDelete(index, id)} className="ml-auto" />
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
                            );
                        })}
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