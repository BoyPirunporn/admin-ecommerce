
import React from 'react'
import CategoryTreeForm from './components/CategoryTreeForm';
import { getCategoryById } from '@/server-action/category.service';

type Props = {
    params: Promise<{
        id: string;
    }>
}

const page = async (props: Props) => {
    const categoryId = (await props.params).id;
    const category = (categoryId !== "created") ? await getCategoryById(Number(categoryId)) : null;
    return (
        <CategoryTreeForm category={category} />
    )
}

export default page