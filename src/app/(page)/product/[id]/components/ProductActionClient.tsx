"use client";
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { Plus } from 'lucide-react';
import useStoreModal from '@/stores/store-modal';
import AddVarinatItem from './AddVarinatItem';
import AddVariant from './AddVariant';
import AddOption from './options/AddOption';


export const optionChoiceScheme = z.object({
    value: z.string(),
    image: z.union([
        z.string(),
        z.any()
            .refine((file) => typeof file !== "undefined" && file instanceof File, "Invalid file")
            .refine((file) => file?.size < 5 * 1024 * 1024, "File must be less than 5MB")
            .refine(file => ['image/png', 'image/jepg'].includes(file.type), "Only JPEG/PNG allowed")
    ]).nullable()
})
export const optionScheme = z.object({
    name: z.string(),
    choices: z.array(optionChoiceScheme)
})

export type OptionScheme = z.infer<typeof optionScheme>;

export const variantProductItem = z.object({
    value: z.string(),
    stock: z.number().default(0)
});

const variantSelectOption = z.object({
    optionId: z.number(),
    choiceValue: z.string()
})
const variantProduct = z.object({
    id: z.number(),
    sku: z.string(),
    stock: z.number(),
    selectedOptions: z.array(variantSelectOption),
    images: z.array(z.object({ url: z.string() }))
})

export const productScheme = z.object({
    name: z.string().min(6),
    price: z.number().default(0),
    description: z.string().nullable(),
    currency: z.enum(['USD', 'THB']),
    mainImage: z.string().nullable(),
    options: z.array(optionScheme),
    variant: z.array(variantProduct)
});



export type ProductScheme = z.infer<typeof productScheme>;
export type Variant = z.infer<typeof variantProduct>;
export type VariantProductItem = z.infer<typeof variantProductItem>;


type Props = {
    product: Product | ProductScheme | undefined
}
const ProductActionClient = ({
    product
}: Props) => {

    const storeModal = useStoreModal();
    const form = useForm<ProductScheme>({
        resolver: zodResolver(productScheme),
        defaultValues: product ? { ...product } : {
            name: "",
            price: 0,
            description: "",
            currency: "USD",
            mainImage: "",
            variant: [],
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const variantArray = useFieldArray({
        control: form.control,
        name: "variant"
    })



    const onSubmit = (data: ProductScheme) => {
        console.log(data)
    }

    // const handleVariantSubmit = (text: string) => {
    //     storeModal.closeModal();
    //     // append({ key: text, items: [] })
    // }
    // const handleClickAdd = () => {
    //     storeModal.openModal("Add variant", {
    //         content: <AddVariant onClick={handleVariantSubmit} />
    //     })
    // }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="md:px-8 md:py-8 flex flex-col gap-10 col-span-7">
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

                            {/* <div className="flex flex-col gap-5 border border-dashed p-5 rounded-md">
                                <h1 className='text-xl md:text-2xl'>Variant</h1>
                                <Button className='max-w-[200px]' type='button' onClick={handleClickAdd}>
                                    <Plus />
                                    Add variant
                                </Button>
                                {fields.map((e: VariantProduct, i) => (
                                    <div key={e.key} className='flex flex-col gap-2'>
                                        <h1 className='font-bold'>{e.key}</h1>
                                        <div className='flex flex-row flex-wrap max-w-[500px] gap-3 '>{
                                            e.items.map((item) => (
                                                <div key={item.value} >
                                                    <p className="p-2 border-2 border-dashed min-w-[80px] text-center rounded-md">
                                                        {item.value}
                                                    </p>
                                                </div>
                                            ))}
                                            <Button onClick={() => {
                                                storeModal.openModal("Add " + e.key, {
                                                    content: <AddVarinatItem handleSubmit={(data) => {
                                                        const index = fields.findIndex(field => field.key === e.key);
                                                        if (index !== -1) {
                                                            update(index, {
                                                                ...fields[index],
                                                                items: [...fields[index].items, data]
                                                            });
                                                        }
                                                        storeModal.closeModal();
                                                    }} />
                                                })
                                            }} type="button">Add {e.key}</Button>
                                        </div>

                                    </div>
                                ))}
                            </div> */}
                        </div>

                        <div className="flex flex-col gap-5 border border-dashed p-5 rounded-md">
                            <div className="flex flex-row justify-between">
                                <h1 className='text-xl md:text-2xl'>Option</h1>
                                <Button type='button' onClick={() => storeModal.openModal("Add Options", {
                                    content: <AddOption handleSubmit={(option) => {
                                        storeModal.closeModal();
                                        append(option)
                                    }} />
                                })}>Add Option</Button>
                            </div>

                            {fields.map((option, index) => (
                                <div key={index} className='flex flex-col gap-2'>
                                    <h1 className='font-bold'>{option.name}</h1>
                                    <div className='flex flex-row flex-wrap max-w-[500px] gap-3 '>{
                                        option.choices.map((choice, idx) => (
                                            <div key={idx} >
                                                <p className="p-2 border-2 border-dashed min-w-[80px] text-center rounded-md">
                                                    {choice.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="flex flex-col gap-5 border border-dashed p-5 rounded-md">
                            <div className="flex flex-row justify-between">
                                <h1 className='text-xl md:text-2xl'>Varian</h1>
                                <Button type='button' onClick={
                                    () => storeModal.openModal("Add Variant", {
                                        content: <AddOption handleSubmit={(option) => {
                                            storeModal.closeModal();
                                            append(option)
                                        }} />
                                    })
                                }
                                >Add Variant</Button>
                            </div>

                            {variantArray.fields.map((variant, index) => (
                                <div key={index} className='flex flex-col gap-2'>
                                    <h1 className='font-bold'>{variant.sku}</h1>
                                    <div className='flex flex-row flex-wrap max-w-[500px] gap-3 '>{
                                        variant.selectedOptions.map((selectOption, idx) => (
                                            <div key={idx} >
                                                <p className="p-2 border-2 border-dashed min-w-[80px] text-center rounded-md">
                                                    {selectOption.choiceValue}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

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