'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import EachElement from '@/lib/EachElement';
import {
    flexRender,
    RowData,
    Table as TableType
} from '@tanstack/react-table';
import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface IOptionFilter<T> {
    filterHeader: boolean;
    customFilter?: React.ReactNode | null;
    sort?: {
        by: keyof T;
        placeHolderSort?: string;
    };
}

interface IDataTable<T extends RowData> {
    // options?: IOptionFilter<T>;
    table: TableType<T>;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    pageIndex: number;
    pageCount: number;
    isLoading: boolean;
    setPageSize: (value: PageSize) => void;
}

export const pageSizeOption = [5, 10, 20, 50, 100] as const;
export type PageSize = typeof pageSizeOption[number];

const DataTable = <T,>({
    table,
    pageIndex,
    pageCount,
    handlePreviousPage,
    handleNextPage,
    isLoading,
    setPageSize
}: IDataTable<T>) => {
    return (
        <div className="w-full">
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
                                    {isLoading ? "...Loading " : "No Result"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {pageIndex} of {pageCount || 0}
                </div>
                <Select
                    defaultValue={pageSizeOption[0].toString()}
                    onValueChange={(value) => setPageSize(Number(value) as PageSize)}
                >
                    <SelectTrigger disabled={!table.getRowModel().rows?.length} className="max-w-[100px] cursor-pointer">
                        <SelectValue placeholder="Select a Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {pageSizeOption.map(item => (
                                <SelectItem className='cursor-pointer' key={item} value={item.toString()}>{item}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={pageIndex === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={(pageIndex + 1 === pageCount) || !table.getRowModel().rows?.length}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default DataTable;