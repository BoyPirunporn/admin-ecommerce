import React from 'react'
import ProductClient from './components/ProductClient'
import { products } from '@/lib/utils'
import { getAllProduct } from '@/server/product'


const RootPage = async () => {
    const result = await getAllProduct(0, 10);
    return <ProductClient products={result} />
}

export default RootPage