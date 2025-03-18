import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowData,
    SortingState,
    TableOptions,
    useReactTable,
    VisibilityState
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

type UseTableProps<T extends RowData> = {
    data: T[];
    columns: ColumnDef<T>[];
    options?: TableOptions<T>;
    pageCount: number;
    pageSize: number;
    pageIndex: number;

};

const useDataTable = <T extends RowData,>({
    data,
    columns,
    options,
    pageIndex,
    pageCount,
    pageSize,
}: UseTableProps<T>) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const memo = useMemo(() => ({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        pageCount: pageCount,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageIndex,
                pageSize
            }
        },
        ...options ?? {} // ป้องกัน options เป็น undefined
    }), [data, columns, sorting, columnFilters, columnVisibility, rowSelection, options]);
    const table = useReactTable(memo);
    return {
        columnFilters,
        columnVisibility,
        rowSelection,
        sorting,
        setColumnFilters,
        setColumnVisibility,
        setRowSelection,
        setSorting,
        table
    };
};

export default useDataTable;