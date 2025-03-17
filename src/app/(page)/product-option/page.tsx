import React from 'react'
import ProductOptionClient from './components/ProductOptionClient'
import { getAllProductOption } from '@/server/product-option'
import { delay } from '@/lib/utils';


const ProductOptionPage = async () => {
    const result = await getAllProductOption();
    await delay(1000)
    return (
        <ProductOptionClient productOption={result}/>
    )
}

export default ProductOptionPage