
import React from 'react'
import ProductOptionForm from './components/ProductOptionForm';
import { getProductOptionById } from '@/server-action/product-option.service';

type Props = {
    params: Promise<{
        id: string;
    }>
}

const page = async (props: Props) => {
    const id = (await props.params).id;
    const productOption = (id === "update" || id === "create") ? undefined : await getProductOptionById(Number((await props.params).id))
    return (
        <ProductOptionForm productOption={productOption} />
    )
}

export default page