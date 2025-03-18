import { getAllOrder } from '@/server-action/order.service';
import { Suspense } from 'react';
import OrderClient from './components/OrderClient';
import { delay } from '@/lib/utils';


const page = async () => {
    const orders = await getAllOrder(0, 10);
    await delay(1000)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderClient orders={orders} />
        </Suspense>
    );
};

export default page;