import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentStatus } from '@/enum';
import EachElement from '@/lib/EachElement';
import { Suspense } from 'react';

type Props = {
    value: PaymentStatus;
};

const OrderPaymentStatus = ({
    value
}: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Select
                defaultValue={PaymentStatus[value]}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Payment Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <EachElement
                            of={Object.entries(PaymentStatus)}
                            render={([key, value]) => <SelectItem key={key} value={value}>{key}</SelectItem>}
                        />
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Suspense>
    );
};

export default OrderPaymentStatus;