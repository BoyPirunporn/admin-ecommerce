import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { optionScheme, OptionScheme } from '../ProductActionClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldCommon } from '@/components/ui/form-field-common'
import { X } from 'lucide-react'

type Props = {
    handleSubmit: (option: OptionScheme) => void
}


const AddOption = (props: Props) => {

    const form = useForm<OptionScheme>({
        resolver: zodResolver(optionScheme),
        defaultValues: {
            name: "",
            choices: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "choices"
    })
    return (
        <Form {...form}>
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(props.handleSubmit)}>
                <div className='flex flex-col gap-3'>
                    <FormFieldCommon
                        control={form.control}
                        name={`name`}
                        label='Name'
                    />
                    {fields.map((choice, index) => (
                        <div className='p-3 border-[3px] border-dashed rounded-md flex flex-col' key={index}>
                            <Button variant={"destructive"} className="ml-auto" type='button' onClick={() => remove(index)}>
                                <X />
                            </Button>
                            <div className="flex flex-col gap-3">
                                <FormFieldCommon
                                    control={form.control}
                                    name={`choices.${index}.value`}
                                    label='Value'
                                    placeholder='Enter you choice'
                                />
                                <FormFieldCommon
                                    control={form.control}
                                    name={`choices.${index}.image`}
                                    label='Image'
                                    placeholder='enter your image'
                                    readOnly
                                />
                            </div>
                        </div>
                    ))}
                    <Button className='ml-auto' type="button" onClick={() => append({ value: "", image: "" })}>Add Option</Button>
                </div>
                <Button className='ml-auto'>Add</Button>
            </form>
        </Form>
    )
}

export default AddOption