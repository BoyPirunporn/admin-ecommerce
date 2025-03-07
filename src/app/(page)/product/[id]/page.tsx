import ProductActionClient from './components/ProductActionClient';
import { delay, products } from '@/lib/utils';

type Props = {
    params: Promise<{
        id: string;
    }>
}

const ProductAction = async ({
    params
}: Props) => {
    const productId = (await params).id;
    const product = products.find(p => p.id === Number(productId));
    return (
        <ProductActionClient product={product} />
    )
}

export default ProductAction