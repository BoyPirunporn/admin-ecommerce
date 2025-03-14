
import React from 'react'
import CategoryForm from './components/CategoryForm';

type Props = {
    params: Promise<{
        id: string;
    }>
}

const page = async (props: Props) => {
    return (
        <CategoryForm />
    )
}

export default page