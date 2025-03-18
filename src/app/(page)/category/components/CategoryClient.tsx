'use client';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/ui/header-title';
import Link from 'next/link';
import React from 'react';
import { categoryColumnDef } from '../data-table/category-column';
import RootDataTable from '@/components/table-common/RootDataTable';

type Props = {
    // categories: Category[];
};

const CategoryClient = (props: Props) => {
    return (
        <>
            <HeaderTitle title='Category management' rightAction={(
                <Button asChild>
                    <Link href={'/category/create'}>Add category</Link>
                </Button>
            )} />
            <RootDataTable
                api={`/api/category`}
                columns={categoryColumnDef}
                options={{
                    params:{
                        sort:"asc"
                    }
                }}
            />
        </>
    );
};

export default CategoryClient;