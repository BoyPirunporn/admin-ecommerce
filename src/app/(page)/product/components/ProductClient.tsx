'use client'
import DataTable from '@/components/table-common'
import React from 'react'
import { productColumnDef } from '../data-table/product-column'
import HeaderTitle from '@/components/ui/header-title'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
    products: Product[]
}

const ProductClient = ({
    products
}: Props) => {
    return (
        <div className=''>
            <HeaderTitle title='Product management' rightAction={(
                <Button asChild>
                    <Link href={'/product/create?create=true'}>add product</Link>
                </Button>
            )} />
            <DataTable data={products} columnsDef={productColumnDef} sortInputBy={"name"} />
        </div>
    )
}

export default ProductClient