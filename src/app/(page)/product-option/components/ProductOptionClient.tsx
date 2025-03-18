'use client';
import DataTable from '@/components/table-common';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/ui/header-title';
import Link from 'next/link';
import React from 'react';
import { productOptionColumnDef } from '../data-table/product-option-column';
import { ProductOption } from '@/typed';
import useDataTable from '@/hooks/data-table-hook';


const ProductOptionClient = ({
  productOption
}: {
  productOption: ProductOption[];
}) => {

  return (
    <div className=''>
      <HeaderTitle title='Product option management' rightAction={(
        <Button asChild>
          <Link href={'/product-option/create'}>Add option</Link>
        </Button>
      )} />
      {/* <DataTable table={table}  /> */}
    </div>
  );
};

export default ProductOptionClient;