import { getAllProductOption } from '@/server/product-option';
import ProductActionClient from './components/ProductActionClient';
import { products } from '@/lib/utils';

type Props = {
    params: Promise<{
        productId: string;
    }>
}

const ProductAction = async ({
    params
}: Props) => {
    const productId = (await params).productId;
    const productOption = await getAllProductOption();
    // const product = (productId === "create" || productId === "update") ? undefined : products.find(p => p.id === Number(productId));
    return (
        <ProductActionClient product={undefined} productOption={productOption} />
    )
}

export default ProductAction