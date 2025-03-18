'use client';
import HeaderTitle from '@/components/ui/header-title';
import { orderColumnDef } from '../data-table/order-column';
import { Order } from '@/typed';
import RootDataTable from '@/components/table-common/RootDataTable';

type Props = {
    orders: Order[];
};

const OrderClient = ({
    orders
}: Props) => {

    return (
        <div className=''>
            <HeaderTitle title='Order management' />
            <RootDataTable columns={orderColumnDef} api='/api/order' options={{
                params: {
                    sort: "desc"
                }
            }} />
        </div>
    );
};

export default OrderClient;