import React from 'react'
import ProductOptionClient from './components/ProductOptionClient'
import { getAllProductOption } from '@/server/product-option'


const ProductOptionPage = async () => {
    const result = await getAllProductOption();
    return (
        <ProductOptionClient productOption={result}/>
    )
}

export default ProductOptionPage