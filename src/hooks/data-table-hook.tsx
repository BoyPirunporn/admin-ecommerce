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
};

const useDataTable = <T extends RowData,>({
    data,
    columns,
    options
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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        ...options ?? {} // ป้องกัน options เป็น undefined
    }), [data, columns, sorting, columnFilters, columnVisibility, rowSelection, options]);
    const table = useReactTable(memo);
    return {
        table,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        columnVisibility,
        setColumnVisibility,
        rowSelection,
        setRowSelection
    };
};

export default useDataTable;