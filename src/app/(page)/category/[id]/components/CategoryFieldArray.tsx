import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormFieldCommon } from "@/components/ui/form-field-common";
import useStoreModal from "@/stores/store-modal";
import { X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { dialogDelete } from "./CategoryTreeForm";
import { deleteCategoryById } from "@/server-action/category.service";
import { delay } from "@/lib/utils";

interface CategoryFormProps {
    nestIndex: string;
}

const CategoryFieldArray: React.FC<CategoryFormProps> = ({ nestIndex }) => {
    const { openModal, closeModal } = useStoreModal();
    const { control, ...props } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${nestIndex}.children`,
    });
    console.log(nestIndex);
    // ตรวจสอบระดับของความลึก (จำนวนจุดใน nestIndex)
    const depth = nestIndex.split('.').reduce((prve, v) => v === "children" ? prve += 1 : prve, 0);

    // // disable ปุ่มเมื่อความลึกมากกว่า 3
    const isDisabled = depth >= 2;

    const handleDelete = (index: number, id: number | null) => {
        if (id) {
            openModal("Are you sure to delete this category?", {
                content: dialogDelete(async () => {
                    try {
                        await deleteCategoryById(id);
                        await delay(1000);
                        remove(index);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        closeModal();
                    }
                })
            });
        } else {
            remove(index);
        }

    };
    return (
        <div className="pl-5">
            <div className="border-l pl-2 border-dashed flex flex-col gap-2">
                {
                    !isDisabled &&
                    (
                        <Button
                            disabled={isDisabled}
                            className="my-5 ml-auto" type="button" onClick={() => append({ name: "", children: [] })}>
                            add
                        </Button>
                    )}
                {fields.map((field, index) => {
                    const id = props.getValues(`${nestIndex}.children.${index}.id`) as number;
                    return (
                        <Accordion key={index} type="single" collapsible className="w-full hover:bg-background/30  cursor-pointer border border-gray-300 px-2 rounded-sm">
                            <AccordionItem value={`categories.${index}`} className="cursor-pointer" >
                                <AccordionTrigger className="p-3 flex items-center cursor-pointer w-full">
                                    <h1>#{index + 1}</h1>
                                    <X onClick={() => handleDelete(index, id)} className="ml-auto" />
                                </AccordionTrigger>
                                <AccordionContent className="w-full">
                                    <div key={field.id} className="mb-2 p-2 border border-dashed rounded-md">

                                        <div className='flex flex-col gap-3 max-w-[500px]'>
                                            <FormFieldCommon
                                                label='Category Name'
                                                control={control}
                                                name={`${nestIndex}.children.${index}.name`}
                                                placeholder='Name'
                                            />
                                        </div>
                                        {/* Recursive call for nested children */}
                                        {<CategoryFieldArray nestIndex={`${nestIndex}.children.${index}`} />}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                    // if (nestIndex.split('.').reduce((prve, v) => v === "children" ? prve += 1 : prve, 0) === 0) {
                    //     return (

                    //     )
                    // }
                    // return (
                    //     <div key={field.id} className="mb-2 p-2 border border-dashed rounded-md">
                    //         <h1>#{index + 1}</h1>
                    //         <X onClick={() => remove(index)} className="ml-auto" />
                    //         <div className='flex flex-col gap-3 max-w-[500px]'>
                    //             <FormFieldCommon
                    //                 label='Category Name'
                    //                 control={control}
                    //                 name={`${nestIndex}.children.${index}.name`}
                    //                 placeholder='Name'
                    //             />
                    //         </div>
                    //     </div>
                    // )
                })}

            </div>
        </div>
    );
};

export default CategoryFieldArray;