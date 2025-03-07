import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { variantProductItem, VariantProductItem } from './ProductActionClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldCommon } from '@/components/ui/form-field-common'

type Props = {
  handleSubmit: (variantItem: VariantProductItem) => void
}

const AddVarinatItem = (props: Props) => {

  const form = useForm<VariantProductItem>({
    resolver: zodResolver(variantProductItem),
    defaultValues: {
      value: "",
      stock: 0
    }
  });


  return (
    <Form {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(props.handleSubmit)}>
        <FormFieldCommon
          control={form.control}
          name={`value`}
          label='Value'

        />
        <FormFieldCommon
          control={form.control}
          name={`stock`}
          label='Stock'
          type="number"
        />

        <Button className='ml-auto'>Add</Button>
      </form>
    </Form>
  )
}

export default AddVarinatItem