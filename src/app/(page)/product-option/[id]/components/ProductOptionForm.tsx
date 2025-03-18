'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormFieldCommon } from '@/components/ui/form-field-common'
import { createProductOption } from '@/server-action/product-option.service';
import { ProductOption } from '@/typed';
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { z } from 'zod'


const productOptionValueScheme = z.object({
  id: z.number().nullable(),
  value: z.string().min(1)
});
const productOptionScheme = z.object({
  id: z.number().nullable(),
  name: z.string().min(1),
  productOptionValues: z.array(productOptionValueScheme)
});

type ProductOptionZod = z.infer<typeof productOptionScheme>;
type ProductOptionValueZod = z.infer<typeof productOptionValueScheme>;

type Props = {
  productOption: ProductOption | ProductOptionZod | undefined
}

const ProductOptionForm = ({
  productOption
}: Props) => {

  console.log(productOption?.productOptionValues)
  const form = useForm<ProductOptionZod>({
    resolver: zodResolver(productOptionScheme),
    defaultValues: productOption ? { ...productOption } : {
      id: null,
      name: "",
      productOptionValues: []
    }
  });

  const onSubmit = async (data: ProductOptionZod) => {
    try {
      const response = await createProductOption(data as ProductOption);
      toast.success(response);
      form.reset();
      window.location.href = "/product-option";
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productOptionValues"
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="md:px-8 md:py-8 flex flex-col gap-10 col-span-7">
            <h2 className='font-bold text-md'>Product details</h2>
            <div className='flex flex-col gap-3 max-w-[500px]'>
              <FormFieldCommon
                label='Option name'
                control={form.control}
                name={"name"}
                placeholder='name'
              />
            </div>


            <div className='max-w-[500px] flex flex-col gap-10'>
              <div className="flex flex-row justify-between w-full items-center">
                <h1>Option Value</h1>
                <Button type="button" className=' max-w-[150px]' onClick={() => append({ id: null, value: "" })}>Add Option value</Button>
              </div>
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <div className="flex-1">
                      <FormFieldCommon
                        label={`Value ${index + 1}`}
                        control={form.control}
                        name={`productOptionValues.${index}.value`}
                        placeholder='Enter value'
                      />
                    </div>
                    <X size={26} color='red' className='cursor-pointer' onClick={() => remove(index)} />
                  </div>
                ))}
              </div>

            </div>
          </div>


        </div>
        <div className='flex justify-end'>
          <Button
            className='rounded-lg  w-[250px]'
            type='submit'
          >Save</Button>
        </div>
      </form>
    </Form>
  )
}
export default ProductOptionForm