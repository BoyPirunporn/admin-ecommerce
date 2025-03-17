'use client';
import DataTable from '@/components/table-common';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/ui/header-title';
import Link from 'next/link';
import React from 'react';
import { categoryColumnDef } from '../data-table/category-column';
import { Category } from '@/typed';
import useDataTable from '@/hooks/data-table-hook';

type Props = {
    categories: Category[];
};

const CategoryClient = ({
    categories
}: Props) => {
    const { table } = useDataTable({
        data: categories,
        columns: categoryColumnDef,
    });
    return (
        <div className=''>
            <HeaderTitle title='Category management' rightAction={(
                <Button asChild>
                    <Link href={'/category/create'}>Add category</Link>
                </Button>
            )} />
            <DataTable table={table} options={{
                filterHeader:true,
                sort: {
                    by: "name"
                }
            }} />
        </div>
    );
};

export default CategoryClient;