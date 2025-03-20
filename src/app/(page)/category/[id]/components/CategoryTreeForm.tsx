'use client';
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import CategoryFieldArray from "./CategoryFieldArray";
import FormFileUpload from "@/components/form-file-upload";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldCommon } from "@/components/ui/form-field-common";
import { X } from "lucide-react";
import { z } from "zod";


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
    parent: CategoryScheme | null | undefined,
};

const categoryZod: z.ZodType<CategoryScheme> = baseCategorySchema.extend({
    children: z.lazy(() => categoryZod.array()),  // ✅ children มีค่าเริ่มต้นเป็น []
    parent: z.lazy(() => categoryZod.nullable().optional()).default(null)
});


type CategoryZod = z.infer<typeof categoryZod>;
const CategoryTreeForm = () => {


    const methods = useForm<{ categories: CategoryZod[]; }>({
        defaultValues: { categories: [{ id: null, parent: null, name: "", imageUrl: "", children: [] }] },
    });

    const { register, control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({ control, name: "categories" });

    const onSubmit = (data: any) => {
        console.log("Submitted Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={index} className='border border-dashed py-3 px-5  flex flex-col gap-3 rounded-sm '>
                        <div className="flex flex-row w-full">
                            <h1>Sub category#{index + 1}</h1>
                            <X className="ml-auto" onClick={() => remove(index)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <FormFieldCommon
                                    label='Sub Category Name'
                                    control={methods.control}
                                    name={`categories.${index}.name`}
                                    placeholder='Name'
                                />
                            </div>

                            <div className='flex flex-col mx-0 gap-4'>
                                <p className='text-sm mb-2'>image</p>
                                <FormField
                                    control={methods.control}
                                    name={`categories.${index}.imageUrl`}
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

                        {/* Recursive Category Input */}
                        <CategoryFieldArray nestIndex={index.toString()} />
                    </div>
                ))}
                <button type="button" onClick={() => append({ children: [], parent: null, name: "", imageUrl: "", id: null })}>
                    Add Category
                </button>
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};


export default CategoryTreeForm;