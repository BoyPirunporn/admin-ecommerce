'use client';
import DataTable from '@/components/table-common';
import React from 'react';
import { productColumnDef } from '../data-table/product-column';
import HeaderTitle from '@/components/ui/header-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Product } from '@/typed';
import useDataTable from '@/hooks/data-table-hook';
import RootDataTable from '@/components/table-common/RootDataTable';

type Props = {
    products: Product[];
};

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
            <RootDataTable columns={productColumnDef} api='/api/product' options={{
                params: {
                    orderBy: "createdAt",
                    sort: "desc"
                }
            }} />
        </div>
    );
};

export default ProductClient;