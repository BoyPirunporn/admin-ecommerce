'use client';
import DataTable from '@/components/table-common';
import HeaderTitle from '@/components/ui/header-title';
import { orderColumnDef } from '../data-table/order-column';
import { Order } from '@/typed';
import useDataTable from '@/hooks/data-table-hook';

type Props = {
    orders: Order[];
};

const OrderClient = ({
    orders
}: Props) => {

    return (
        <div className=''>
            <HeaderTitle title='Order management' />
            {/* <DataTable table={table}  /> */}
        </div>
    );
};

export default OrderClient;