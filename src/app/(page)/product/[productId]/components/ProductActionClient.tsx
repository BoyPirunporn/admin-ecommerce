"use client";
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import useStoreModal from '@/stores/store-modal';
import FormFileUpload from '@/components/form-file-upload';
import { usePathname } from 'next/navigation';
import { useStoreProductOption } from '@/stores/store-option';
import ProductVariantForm from './ProductVariantForm';
import { productVariantZod } from '../@modal/product-variant/components/ProductVariantForm';



export const productScheme = z.object({
    name: z.string().min(6),
    price: z.number().default(0),
    description: z.string().nullable(),
    mainImage: z.union([z.string(), z.instanceof(File)]).refine(v => {
        if (v instanceof File) {
            if (v.size < 5 * 1024 * 1024) {
                return false
            }
        }
        return true;
    }, { message: "File must be less than 5MB" }),
    productVariants: z.array(productVariantZod),
});



export type ProductScheme = z.infer<typeof productScheme>;


type Props = {
    product: Product | undefined;
    productOption: ProductOption[]
}
const ProductActionClient = ({
    product,
    productOption
}: Props) => {

    const storeModal = useStoreModal();
    const storeProductOption = useStoreProductOption();

    useEffect(() => {
        storeProductOption.setProductOption(productOption);
    }, [])
    const form = useForm<ProductScheme>({
        resolver: zodResolver(productScheme),
        defaultValues: product ? { ...product } : {
            name: "",
            price: 0,
            description: "",
            mainImage: "",
            productVariants: [],
        }
    });

    const variantArray = useFieldArray({
        control: form.control,
        name: "productVariants"
    })



    const onSubmit = (data: ProductScheme) => {
        console.log(data)
    }

    const onHandleCallbackVariant = (data: ProductVariant) => {
        storeModal.closeModal();
        variantArray.append(data)
    }
    const pathName = usePathname();
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
                            </div>


                            <div className="w-[198px]">
                                <FormFieldCommon
                                    label='Product Price'
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
                                                    console.log("HANDLE")
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

                        <div className=" p-8 ">
                            <div className="border border-dashed flex flex-col gap-5 p-5 rounded-md">
                                <div className="flex flex-row justify-between">
                                    <h1 className='text-xl md:text-2xl'>Varian</h1>
                                    <Button type='button' onClick={() => storeModal.openModal("Add Product Variant", {
                                        content: <ProductVariantForm productVariant={null} onCallback={onHandleCallbackVariant} />
                                    })}>Add Variant</Button>
                                </div>
                                {variantArray.fields.map((variant, index) => (
                                    <div key={index} className='flex flex-col gap-2'>
                                        <h1 className='font-bold'>{variant.sku}</h1>

                                    </div>
                                ))}
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
    )
}

export default ProductActionClient