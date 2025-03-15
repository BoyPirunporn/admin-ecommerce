'use client';
import DataTable from '@/components/table-common';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/ui/header-title';
import Link from 'next/link';
import React from 'react'
import { categoryColumnDef } from '../data-table/category-column';
import { Category } from '@/typed';

type Props = {
    categories: Category[]
}

const CategoryClient = ({
    categories
}: Props) => {
    return (
        <div className=''>
            <HeaderTitle title='Category management' rightAction={(
                <Button asChild>
                    <Link href={'/category/create'}>Add category</Link>
                </Button>
            )} />
            <DataTable data={categories} columnsDef={categoryColumnDef} sortInputBy={"name"} />
        </div>
    )
}

export default CategoryClient