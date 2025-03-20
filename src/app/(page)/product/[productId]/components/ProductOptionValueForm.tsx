import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldCommon } from '@/components/ui/form-field-common'
import { ProductScheme } from './ProductFormClient';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import FormFileUpload from '@/components/form-file-upload';

type Props = {
    nestIndexValue: `productOptions.${number}.productOptionValues.${number}`;
    enableImage: boolean;
}

const ProductOptionValueForm = ({
    nestIndexValue,
    enableImage,
}: Props) => {
    const { control, } = useFormContext<ProductScheme>();
    return (
        <div className="flex flex-col gap-3  p-5 rounded-sm">
            <div className='flex flex-col gap-10'>
                <FormFieldCommon
                    label='Option value'
                    name={`${nestIndexValue}.value`}
                    control={control}
                    placeholder='Option name'
                />
                {enableImage && (
                    <div className='flex flex-col mx-0 gap-4'>
                        <p className='text-sm mb-2'>image</p>
                        <FormField
                            control={control}
                            name={`${nestIndexValue}.image`}
                            render={({ field }) => (
                                <FormItem >
                                    <FormFileUpload
                                        className='w-32 h-32'
                                        value={field.value!}
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
                )}
            </div>
        </div>
    )
}

export default ProductOptionValueForm