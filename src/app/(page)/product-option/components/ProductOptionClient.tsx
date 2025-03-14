'use client'
import DataTable from '@/components/table-common'
import { Button } from '@/components/ui/button'
import HeaderTitle from '@/components/ui/header-title'
import Link from 'next/link'
import React from 'react'
import { productOptionColumnDef } from '../data-table/product-option-column'

type Props = {}

const ProductOptionClient = ({
  productOption
}: {
  productOption: ProductOption[]
}) => {
  return (
    <div className=''>
      <HeaderTitle title='Product option management' rightAction={(
        <Button asChild>
          <Link href={'/product-option/create'}>Add option</Link>
        </Button>
      )} />
      <DataTable data={productOption} columnsDef={productOptionColumnDef} sortInputBy={"name"} />
    </div>
  )
}

export default ProductOptionClient