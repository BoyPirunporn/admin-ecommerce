'use client';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductScheme } from './ProductFormClient';
import ProductOptionValueForm from './ProductOptionValueForm';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
type Props = {
    nestIndex: number;
};


const ProductOptionForm = ({
    nestIndex,
}: Props) => {
    const { control, formState, ...props } = useFormContext<ProductScheme>();
    const { fields, append, remove } = useFieldArray({
        name: `productOptions.${nestIndex}.productOptionValues`,
        control: control
    })

    console.log(formState)

    return (
        <div className='flex flex-col gap-8'>
            <FormFieldCommon
                label='Option Name'
                name={`productOptions.${nestIndex}.name`}
                control={control}
                placeholder='Option name'
            />
            <FormField
                name={`productOptions.${nestIndex}.enableImage`}
                control={control}
                render={({ field }) => {
                    return (
                        <FormItem className="rounded-lg   p-3 flex flex-row justify-between  max-w-[200px]">
                            <div className="space-y-0.5 cursor-pointer">
                                <FormLabel>Enable image</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    className='cursor-pointer'
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>)
                }}
            />

            <div className="flex flex-col gap-3 border border-dashed p-5 rounded-sm">
                <div className="flex flex-row justify-between items-center">
                    <h1 className='text-lg'>Option Value</h1>
                    <Button variant={"outline"} type='button' onClick={() => append({ id: null, value: "", image: "" })} >
                        <Plus className='text-black' size={20} />
                    </Button>
                </div>
                <div className='flex flex-col gap-10'>
                    {fields.map((_, index) => {
                        return (
                            <div key={index} className='flex flex-col border border-dashed rounded-sm p-2'>
                                <X className='ml-auto' onClick={() => remove(index)} />
                                <ProductOptionValueForm enableImage={props.watch(`productOptions.${nestIndex}.enableImage`)} nestIndexValue={`productOptions.${nestIndex}.productOptionValues.${index}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductOptionForm;