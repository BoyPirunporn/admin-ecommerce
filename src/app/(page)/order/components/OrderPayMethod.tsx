import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentMethod } from '@/enum';
import EachElement from '@/lib/EachElement';
import React, { Suspense } from 'react';

type Props = {
    value: PaymentMethod;
};

const OrderPaymentMethod = ({
    value
}: Props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Select
                defaultValue={PaymentMethod[value]}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Payment Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <EachElement
                            of={Object.entries(PaymentMethod)}
                            render={([key, value]) => <SelectItem key={key} value={value}>{key}</SelectItem>}
                        />
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Suspense>
    );
};

export default OrderPaymentMethod;