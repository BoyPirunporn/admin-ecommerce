'use client';
import DataTable from '@/components/table-common';
import HeaderTitle from '@/components/ui/header-title';
import { orderColumnDef } from '../data-table/order-column';
import { Order } from '@/typed';

type Props = {
    orders: Order[];
};

const OrderClient = (props: Props) => {
    return (
        <div className=''>
            <HeaderTitle title='Order management' />
            <DataTable data={props.orders} columnsDef={orderColumnDef} sortInputBy={"orderData"} />
        </div>
    );
};

export default OrderClient;