import { getAllProductOption } from '@/server/product-option';
import ProductActionClient from './components/ProductActionClient';
import { products } from '@/lib/utils';
import { getAllCategory } from '@/server/category';
import { getProductById } from '@/server/product';

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
    const categories = await getAllCategory();
    const product = (productId === "create" || productId === "update") ? null : await getProductById(productId);

    return (
        <ProductActionClient product={product} productOption={productOption} categories={categories} />
    )
}

export default ProductAction