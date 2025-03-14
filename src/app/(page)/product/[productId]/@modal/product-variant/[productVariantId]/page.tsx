import React from 'react'
import ProductVariantForm from '../components/ProductVariantForm'

type Props = {
    params: Promise<{
        id: string;
        productVariantId: string;
    }>
}

const page = async (props: Props) => {
    return (
        <ProductVariantForm productVariant={null} />
    )
}

export default page