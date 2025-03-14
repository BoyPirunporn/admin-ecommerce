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
import ProductVariantForm, { productVariantZod } from './ProductVariantForm';
import ProductVariantItem from './ProductVariantItem';
import { createProduct } from '@/server/product';



export const productScheme = z.object({
    name: z.string().min(6),
    category: z.string().min(1),
    price: z.number().default(0),
    description: z.string().nullable(),
    mainImage: z.union([z.string(), z.instanceof(File)]).refine(v => {
        if (v instanceof File) {
            if (v.size > 5 * 1024 * 1024) {
                return false;
            }
        }
        return true;
    }, { message: "File must be less than 5MB" }),
    productVariants: z.array(productVariantZod),
});



export type ProductScheme = z.infer<typeof productScheme>;


type Props = {
    product: Product | null;
    productOption: ProductOption[];
    categories: Category[];
};
const ProductActionClient = ({
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
            name: "",
            price: 0,
            category: "",
            description: "",
            mainImage: "",
            productVariants: [],
        }
    });

    const variantArray = useFieldArray({
        control: form.control,
        name: "productVariants"
    });



    const onSubmit = async (data: ProductScheme) => {
        const formData = new FormData();
        try {
            data.productVariants.map((item, index) => {
                formData.append(`productVariants[${index}].price`, item.price.toString());
                formData.append(`productVariants[${index}].stock`, item.stock.toString());
                formData.append(`productVariants[${index}].sku`, item.sku.toString());

                // Check if the variantImage is an instance of File
                if (item.variantImage.url instanceof File) {
                    formData.append(`productVariants[${index}].variantImage.url`, item.variantImage.url);
                }

                // Loop through the productVariantOptions
                item.productVariantOptions.map((c, i) => {
                    formData.append(`productVariants[${index}].productVariantOptions[${i}].productOptionValue.value`, c.productOptionValue.value!);
                    formData.append(`productVariants[${index}].productVariantOptions[${i}].productOptionValue.id`, c.productOptionValue.id.toString());
                });
            });
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("price", data.price.toString());
            formData.append("description", data.description!);
            if (data.mainImage instanceof File) {
                formData.append("mainImage", data.mainImage);
            }


            const response = await createProduct(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onHandleCallbackVariant = (data: ProductVariant) => {
        storeModal.closeModal();
        variantArray.append(data);
    };

    const openModalProductVariant = () => {
        storeModal.openModal("Add Product Variant", {
            content: <ProductVariantForm productVariant={null} onCallback={onHandleCallbackVariant} />
        });
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
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full" >
                                                    <SelectValue placeholder="Select a fruit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Category</SelectLabel>
                                                        <EachElement
                                                            of={categories}
                                                            render={(item) => (
                                                                <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                                            )}
                                                        />
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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

                        </div>

                        <div className=" p-8 ">
                            <div className="border border-dashed flex flex-col gap-5 p-5 rounded-md">
                                <div className="flex flex-row justify-between">
                                    <h1 className='text-xl md:text-2xl'>Varian</h1>
                                    <Button type='button' onClick={openModalProductVariant}>Add Variant</Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {variantArray.fields.map((variant, index) => (
                                        <ProductVariantItem key={index} sku={variant.sku} url={variant.variantImage.url} />
                                    ))}
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

export default ProductActionClient;