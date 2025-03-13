'use client';
import DataTable from '@/components/table-common';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/ui/header-title';
import Link from 'next/link';
import React from 'react'
import { categoryColumnDef } from '../data-table/category-column';

type Props = {}

const CategoryClient = (props: Props) => {
    return (
        <div className=''>
            <HeaderTitle title='Category management' rightAction={(
                <Button asChild>
                    <Link href={'/category/create'}>Add category</Link>
                </Button>
            )} />
            <DataTable data={[]} columnsDef={categoryColumnDef} sortInputBy={"name"} />
        </div>
    )
}

export default CategoryClient