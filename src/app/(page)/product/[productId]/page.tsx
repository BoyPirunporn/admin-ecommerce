import { getProductById } from '@/server-action/product.service';
import ProductFormClient from './components/ProductFormClient';
import { getAllCategory } from '@/server-action/category.service';

type Props = {
    params: Promise<{
        productId: string;
    }>
}

const ProductAction = async ({
    params
}: Props) => {
    const productId = (await params).productId;
    // const productOption = await getAllProductOption();
    const categories = await getAllCategory();
    const product = (productId === "create") ? null : await getProductById(productId);

    return (
        <ProductFormClient product={product} productOption={[]} categories={categories} />
    )
}

export default ProductAction