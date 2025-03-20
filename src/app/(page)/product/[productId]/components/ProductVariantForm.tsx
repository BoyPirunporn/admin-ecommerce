'use client';
import FormFileUpload from '@/components/form-file-upload';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import EachElement from '@/lib/EachElement';
import { useStoreProductOption } from '@/stores/store-option';
import { ProductVariant } from '@/typed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
    productVariant: ProductVariant | null;
    onCallback: (data: ProductVariant) => void;
};

const variantImageZod = z.object({
    id: z.number().nullable(),
    url: z.union([z.string(), z.instanceof(File)])
});

export const variantOption = z.object({
    id: z.number().nullable().optional(),
    productOptionValue: z.object({
        id: z.number().transform(e => Number(e)),
        value: z.string().nullable().optional()
    })
});
export const productVariantZod = z.object({
    id: z.number().nullable(),
    price: z.number().default(0).transform(v => Number(v)),
    sku: z.string().min(1),
    stock: z.number().default(0).transform(v => Number(v)),
    variantImage: variantImageZod,
    productVariantOptions: z.array(variantOption)
});



export type ProductVariantZod = z.infer<typeof productVariantZod>;

const ProductVariantForm = (props: Props) => {
    const { productOptions } = useStoreProductOption();
    const form = useForm<ProductVariantZod>({
        resolver: zodResolver(productVariantZod),
        defaultValues: props.productVariant ?? {
            id: null,
            price: 0,
            sku: "",
            stock: 0,
            variantImage: {
                id: null,
                url: ""
            },
            productVariantOptions: []
        }
    });

    const onSubmit = (data: ProductVariantZod) => {
        props.onCallback(data as ProductVariant);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                <FormFieldCommon
                    label='Price'
                    name='price'
                    control={form.control}
                    placeholder='Price'
                    type='number'
                />
                <FormFieldCommon
                    label='SKU'
                    name='sku'
                    control={form.control}
                    placeholder='SKU'
                />
                <FormFieldCommon
                    label='Stock'
                    name='stock'
                    control={form.control}
                    placeholder='Stock'
                    type='number'
                />

                <div className='flex flex-col mx-0 gap-4'>
                    <p className='text-sm mb-2'>image</p>
                    <FormField
                        control={form.control}
                        name="variantImage.url"
                        render={({ field }) => (
                            <FormItem>
                                <FormFileUpload
                                    value={field.value}
                                    onDelete={(id: string) => {
                                        console.log("HANDLE");
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

                <div className="flex flex-col gap-3 border border-dashed p-5 rounded-sm">
                    <h1 className='text-lg mb-5'>OptionValue</h1>
                    <div className='flex flex-col gap-10'>
                        <EachElement
                            of={productOptions}
                            render={(item, index) => {
                                return (
                                    <div key={item.id} >
                                        <FormField
                                            control={form.control}
                                            name={`productVariantOptions.${index}.productOptionValue.id`}
                                            defaultValue={item.productOptionValues[0].id}
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <RadioGroup defaultValue={item.productOptionValues[0].id.toString()} onValueChange={(value) => {
                                                            const selectedOption = item.productOptionValues.find(v => v.id.toString() === value);
                                                            if (selectedOption) {
                                                                field.onChange(Number(value));
                                                                form.setValue(`productVariantOptions.${index}.productOptionValue.value`, selectedOption.value, {
                                                                    shouldValidate: true, // ✅ ให้ Form อัปเดต state
                                                                    shouldDirty: true,
                                                                    shouldTouch: true,
                                                                });
                                                            }
                                                        }}>
                                                            <div className="flex items-center space-x-5 flex-row">
                                                                <EachElement
                                                                    of={item.productOptionValues}
                                                                    render={(value) => (
                                                                        <div key={value.id} className='flex flex-row gap-2'>
                                                                            <RadioGroupItem className='w-7 h-7' value={value.id.toString()} id={value.value} />
                                                                            <Label htmlFor={value.value} className='text-base'>{value.value}</Label>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </div>
                                                        </RadioGroup>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                        <FormFieldCommon
                                            hidden
                                            name={`productVariantOptions.${index}.productOptionValue.value`}
                                            control={form.control}
                                            defaultValue={item.productOptionValues[0].value}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>

                <Button className='ml-auto h-12' size={"lg"}>Submit</Button>
            </form>
        </Form>
    );
};

export default ProductVariantForm;