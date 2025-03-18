import { getAllCategory } from '@/server-action/category.service';
import { getProductById } from '@/server-action/product.service';
import { getAllProductOption } from '@/server-action/product-option.service';
import ProductActionClient from './components/ProductActionClient';

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