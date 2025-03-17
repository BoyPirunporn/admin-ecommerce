import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import EachElement from '@/lib/EachElement';
import {
    flexRender,
    RowData,
    Table as TableType
} from '@tanstack/react-table';
import React from 'react';
// import FilterHeader from '../filter-header';

interface IOptionFilter<T> {
    filterHeader: boolean;
    customFilter?: React.ReactNode | null;
    sort?: {
        by: keyof T;
        placeHolderSort?: string;
    };
}

interface IDataTable<T extends RowData> {
    options?: IOptionFilter<T>;
    table: TableType<T>;
}

const DataTable = <T,>({
    options,
    table
}: IDataTable<T>) => {
    
    // const table = useReactTable({
    //     data,
    //     columns,
    //     onSortingChange: setSorting,
    //     onColumnFiltersChange: setColumnFilters,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onColumnVisibilityChange: setColumnVisibility,
    //     onRowSelectionChange: setRowSelection,
    //     state: {
    //         sorting,
    //         columnFilters,
    //         columnVisibility,
    //         rowSelection,
    //     },

    // });
    return (
        <div className="w-full">
            {/* <FilterHeader
                value={table.getColumn(sortInputBy.toString())?.getFilterValue() as string}
                sortBy={sortInputBy}
                onInputChange={(e) => table.getColumn(sortInputBy.toString())?.setFilterValue(e.target.value)}
                renderDropdownContent={() => (
                    <EachElement
                        of={table.getAllColumns().filter(c => c.getCanHide())}
                        render={(column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )} />
                )}
                customHeader={customHeader} /> */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader >
                        <EachElement
                            of={table.getHeaderGroups()}
                            render={(headerGroup) => {
                                return (
                                    <TableRow key={headerGroup.id}>
                                        <EachElement
                                            of={headerGroup.headers}
                                            render={(header) => {
                                                return (
                                                    <TableHead key={header.id} style={{
                                                        width: `${header.getSize()}px`,
                                                        maxWidth: `${header.getSize()}px`,
                                                        minWidth: `${header.getSize()}px`,
                                                        

                                                    }} >
                                                        {header.isPlaceholder ? null : (
                                                            flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        )}
                                                    </TableHead>
                                                );
                                            }}
                                        />
                                    </TableRow>
                                );
                            }}
                        />
                    </TableHeader>
                    <TableBody >
                        {table.getRowModel().rows?.length ? (
                            <EachElement
                                of={table.getRowModel().rows}
                                render={(row) => (
                                    <TableRow

                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        <EachElement
                                            of={row.getVisibleCells()}
                                            render={(cell) => {
                                                return (
                                                    <TableCell key={cell.id} >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                );
                                            }}
                                        />
                                    </TableRow>
                                )}
                            />
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className='h-24 text-center'
                                >
                                    No Results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;