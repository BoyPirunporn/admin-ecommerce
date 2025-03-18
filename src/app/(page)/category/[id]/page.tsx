
import React from 'react'
import CategoryForm from './components/CategoryForm';
import CategoryTreeForm from './components/CategoryTreeForm';

type Props = {
    params: Promise<{
        id: string;
    }>
}

const page = async (props: Props) => {
    return (
        <CategoryTreeForm  />
    )
}

export default page