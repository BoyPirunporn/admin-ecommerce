import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';
import Image from 'next/image';

const ProductVariantItem = ({
    sku,
    url
}: {
    sku:string;
    url:string | File
}) => {
    let urlImage = url instanceof File ? URL.createObjectURL(url) : `${process.env.NEXT_PUBLIC_DOMAIN_IMAGE}/${url}`;
    return (
        <Accordion type="single" collapsible className="w-full  border border-gray-300 px-2 rounded-sm">
            <AccordionItem value={sku} >
                <AccordionTrigger>{sku}</AccordionTrigger>
                <AccordionContent>
                    <div className="relative h-[80px] w-[80px] ">
                        <Image src={urlImage} alt='product variant image' fill className='rounded-md' />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductVariantItem;