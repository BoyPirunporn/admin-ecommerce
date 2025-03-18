import React, { useEffect, useMemo, useState, useCallback } from 'react';
import DataTable, { PageSize, pageSizeOption } from '.';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { ResponseWithDataTable } from '@/typed';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type Props<T> = {
    api: string;
    columns: ColumnDef<T>[];
    pageSize?: PageSize;
    options?: OptionsTable<T> | null;
};

type ParamSort<T> = {
    sort?: 'desc' | 'asc';
    orderBy?: keyof T;
};

type OptionsTable<T> = {
    params?: ParamSort<T> | null;
};

const fetchData = async <T,>(page: number, pageSize: number, api: string, options?: OptionsTable<T>) => {
    const url = new URL(api, window.location.origin);
    const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(options?.params?.orderBy && { orderBy: options.params.orderBy.toString() }),
        ...(options?.params?.sort && { sort: options.params.sort.toString() })
    });

    url.search = params.toString();
    console.log({ url: url.toString() });

    const response = await fetch(url.toString());
    const result = (await response.json()) as ResponseWithDataTable<T>;

    return {
        payload: result.payload,
        totalPage: Math.ceil(result.count / pageSize),
        totalRecords: result.count
    };
};

const RootDataTable = <T,>({
    columns,
    api,
    pageSize: _pageSizeOption = pageSizeOption[0],
    options
}: Props<T>) => {
    const [pageSize, setPageSize] = useState(_pageSizeOption);
    const [pageIndex, setPageIndex] = useState(0);

    // Reset page index when pageSize changes
    useEffect(() => {
        setPageIndex(0);
    }, [pageSize]);

    const queryKey = useMemo(() => ["page", "size", "api", "options", pageIndex, pageSize, api, options], [pageIndex, pageSize, api, options]);

    const queryFn = useCallback(() => fetchData<T>(pageIndex, pageSize, api, options as OptionsTable<T>), [pageIndex, pageSize, api, options]);

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn,
        placeholderData: keepPreviousData
    });

    const table = useReactTable({
        data: data?.payload || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination: {
                pageIndex,
                pageSize
            }
        },
        manualPagination: true,
        pageCount: data?.totalPage ?? 0
    });

    return (
        <DataTable
            setPageSize={setPageSize}
            isLoading={isLoading}
            pageIndex={pageIndex}
            pageCount={data?.totalPage ?? 0}
            table={table}
            handlePreviousPage={() => setPageIndex(prev => Math.max(prev - 1, 0))}
            handleNextPage={() => setPageIndex(prev => prev + 1)}
        />
    );
};

export default RootDataTable;
