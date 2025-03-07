import React from 'react'
import ProductClient from './components/ProductClient'
import { products } from '@/lib/utils'

type Props = {}

const RootPage = async () => {
    return <ProductClient products={products} />
}

export default RootPage