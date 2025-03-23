import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatus } from '@/enum';
import EachElement from '@/lib/EachElement';
import { Suspense } from 'react';

type Props = {
    value: OrderStatus;
};

const OrderStatusPage = ({
    value
}: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Select
                defaultValue={OrderStatus[value]}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a Payment Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <EachElement
                            of={Object.entries(OrderStatus)}
                            render={([key, value]) => <SelectItem key={key} value={value}>{key}</SelectItem>}
                        />
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Suspense>
    );
};

export default OrderStatusPage;