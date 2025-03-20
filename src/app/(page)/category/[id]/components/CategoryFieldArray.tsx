import { useFieldArray, useFormContext } from "react-hook-form";

interface CategoryFormProps {
    nestIndex: string;
}

const CategoryFieldArray: React.FC<CategoryFormProps> = ({ nestIndex }) => {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `categories.${nestIndex}.children`,
    });

    return (
        <div className="border-l pl-4">
            {fields.map((field, index) => (
                <div key={field.id} className="mb-2 p-2 border">
                    <input
                        {...register(`categories.${nestIndex}.children.${index}.name`)}
                        placeholder="Child Category Name"
                        className="border p-1"
                    />
                    <button type="button" onClick={() => remove(index)}>Remove</button>

                    {/* Recursive call for nested children */}
                    <CategoryFieldArray nestIndex={`${nestIndex}.children.${index}`} />
                </div>
            ))}
            <button type="button" onClick={() => append({ name: "", children: [] })}>
                Add Child Category
            </button>
        </div>
    );
};

export default CategoryFieldArray;