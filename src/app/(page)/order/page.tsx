import { getAllOrder } from '@/server/order';
import { Suspense } from 'react';
import OrderClient from './components/OrderClient';


const page = async () => {
    const orders = await getAllOrder(0, 10);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderClient orders={orders} />
        </Suspense>
    );
};

export default page;