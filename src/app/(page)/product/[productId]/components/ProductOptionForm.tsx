'use client';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import React, { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductScheme } from './ProductFormClient';
import ProductOptionValueForm from './ProductOptionValueForm';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

    const name = useMemo(() => props.watch(`productOptions.${nestIndex}.name`),[props.watch])
    return (
        <Accordion type='single' collapsible className='border border-dashed rounded-xl p-2 flex flex-col gap-2'>
            <AccordionItem value={`productOptions.${nestIndex}.id`}>
                <AccordionTrigger>
                    <h1>{props.watch(`productOptions.${nestIndex}.name`).length ? props.watch(`productOptions.${nestIndex}.name`) : "Option name"}</h1>
                    <X onClick={() => { }} className="ml-auto" />
                </AccordionTrigger>
                <AccordionContent>
                    <div className='flex flex-col gap-8 max-w-[500px]'>
                        <FormFieldCommon
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
                                    <Plus className='text-black dark:text-white' size={20} />
                                </Button>
                            </div>
                            <div className='flex flex-col'>
                                {fields.map((_, index) => {
                                    return (
                                        <div key={index} className='flex flex-row items-center rounded-sm p-2'>
                                            <div className="flex-1">
                                                <ProductOptionValueForm enableImage={props.watch(`productOptions.${nestIndex}.enableImage`)} nestIndexValue={`productOptions.${nestIndex}.productOptionValues.${index}`} />
                                            </div>
                                            <X className='ml-auto cursor-pointer' onClick={() => remove(index)} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    );
};

export default ProductOptionForm;