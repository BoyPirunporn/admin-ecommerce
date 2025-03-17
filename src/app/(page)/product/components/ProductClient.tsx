'use client';
import DataTable from '@/components/table-common';
import React from 'react';
import { productColumnDef } from '../data-table/product-column';
import HeaderTitle from '@/components/ui/header-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Product } from '@/typed';
import useDataTable from '@/hooks/data-table-hook';

type Props = {
    products: Product[];
};

const ProductClient = ({
    products
}: Props) => {

    const { table } = useDataTable({
        data: products,
        columns: productColumnDef
    });
    return (
        <div className=''>
            <HeaderTitle title='Product management' rightAction={(
                <Button asChild>
                    <Link href={'/product/create?create=true'}>add product</Link>
                </Button>
            )} />
            <DataTable table={table} />
        </div>
    );
};

export default ProductClient;