"use client";
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import FormFileUpload from '@/components/form-file-upload';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import EachElement from '@/lib/EachElement';
import useStoreModal from '@/stores/store-modal';
import { useStoreProductOption } from '@/stores/store-option';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductOption, Category } from '@/typed';
import ProductOptionForm from './ProductOptionForm';
import { X } from 'lucide-react';
import { createProduct, updateProduct } from '@/server-action/product.service';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import CategorySelector from './CategorySelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const productOptionValueZod = z.object({
    id: z.number().nullable().default(null),
    value: z.string().min(1),
    image: z.union([z.string(), z.instanceof(File)])
})

export const productOptionZod = z.object({
    id: z.number().nullable(),
    name: z.string().min(1),
    enableImage: z.boolean().default(false),
    productOptionValues: z.array(productOptionValueZod),
}).superRefine((values, ctx) => {
    // เช็คว่า enableImage เป็น true แล้ว image ใน productOptionValues ไม่เป็น null หรือ empty
    if (values.enableImage) {
        console.log(values.productOptionValues)
        for (let i = 0; i < values.productOptionValues.length; i++) {
            const image = values.productOptionValues[i].image;
            console.log("image", !image || (typeof image === 'string' && image.trim() === ''))
            if (!image || (typeof image === 'string' && image.trim() === '')) {
                return ctx.addIssue({
                    path: [`productOptionValues[${i}]`, 'image'],
                    message: "Image must not be null or empty if enableImage is true",
                    code: z.ZodIssueCode.custom,
                });
            }

        }
    }
    return true;
})


export const productScheme = z.object({
    id: z.number().nullable(),
    name: z.string().min(6),
    description: z.string().nullable(),
    category: z.string().min(1),
    price: z.number().default(0),
    mainImage: z.union([z.string(), z.instanceof(File)]).refine(v => {
        if (v instanceof File) {
            if (v.size > 5 * 1024 * 1024) {
                return false;
            }
        }
        return true;
    }, { message: "File must be less than 5MB" }).refine(v => {
        if (!v) {
            return false
        }
        return true
    }, { message: "Image must not be null!" }),
    productOptions: z.array(productOptionZod),
});



export type ProductScheme = z.infer<typeof productScheme>;
export type ProductOptionZod = z.infer<typeof productOptionZod>;
export type ProductOptionValueZod = z.infer<typeof productOptionValueZod>;

type Props = {
    product: Product | null;
    productOption: ProductOption[];
    categories: Category[];
};
const ProductFormClient = ({
    product,
    productOption,
    categories
}: Props) => {

    const storeModal = useStoreModal();
    const storeProductOption = useStoreProductOption();
    useEffect(() => {
        storeProductOption.setProductOption(productOption);
    }, []);
    const form = useForm<ProductScheme>({
        resolver: zodResolver(productScheme),
        defaultValues: product ? { ...product } : {
            id: null,
            name: "",
            price: 0,
            category: "",
            description: "",
            mainImage: "",
            productOptions: [],
        }
    });

    const { fields: productOptionFields, append, remove } = useFieldArray({
        control: form.control,
        name: "productOptions"
    });

    const onSubmit = async (data: ProductScheme) => {
        console.log(data)
        const formData = new FormData();
        try {
            data.productOptions.forEach((item, index) => {
                if (item.id) {
                    formData.append(`productOptions[${index}].id`, item.id.toString());
                }
                formData.append(`productOptions[${index}].name`, item.name.toString());
                formData.append(`productOptions[${index}].enableImage`, `${item.enableImage}`);

                // Loop through the productVariantOptions
                item.productOptionValues.forEach((c, i) => {
                    if (c.id) {
                        formData.append(`productOptions[${index}].productOptionValues[${i}].id`, c.id.toString());
                    }
                    formData.append(`productOptions[${index}].productOptionValues[${i}].value`, c.value);
                    formData.append(`productOptions[${index}].productOptionValues[${i}].image`, c.image);
                });
            });
            if (product?.id) {
                formData.append("id", product.id.toString()!);
            }
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("price", data.price.toString());
            formData.append("description", data.description!);
            formData.append("mainImage", data.mainImage);

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            if (product !== null) {
                await updateProduct(formData);
            } else {
                const response = await createProduct(formData);
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="md:p-8 flex flex-col gap-10 col-span-7">
                            <h2 className='font-bold text-md'>Product details</h2>
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <FormFieldCommon
                                    label='Product Name'
                                    control={form.control}
                                    name={"name"}
                                    placeholder='Thai name'
                                />
                                <FormField
                                    control={form.control}
                                    name='category'
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <CategorySelector defaultValue={field.value} categories={categories} onChange={field.onChange} />
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }} />
                            </div>


                            <div className="w-[198px]">
                                <FormFieldCommon
                                    label='Product Price'
                                    type='number'
                                    name={'price'}
                                    control={form.control}
                                />
                            </div>

                            <div className='flex flex-col mx-0 gap-4'>
                                <p className='text-sm mb-2'>image</p>
                                <FormField
                                    control={form.control}
                                    name="mainImage"
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

                        </div>

                        <div className=" p-8 max-w-[800px]">
                            <div className="border border-dashed flex flex-col gap-5 p-5 rounded-md">
                                <div className="flex flex-row justify-between">
                                    <h1 className='text-xl md:text-2xl'>Product option</h1>
                                    <Button type='button' onClick={() => append({
                                        id: null,
                                        name: "",
                                        enableImage: false,
                                        productOptionValues: []
                                    })}>Add Option</Button>
                                </div>
                                <div className="flex flex-col gap-4 ">
                                    {productOptionFields.map((_, index) => {
                                        return (
                                            <ProductOptionForm key={index} nestIndex={index} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <Button
                                className='rounded-lg  w-[250px]'
                                type='submit'
                            >Save</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProductFormClient;