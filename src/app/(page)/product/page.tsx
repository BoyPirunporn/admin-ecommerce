import { getAllProduct } from '@/server/product';
import ProductClient from './components/ProductClient';


const RootPage = async () => {
    const result = await getAllProduct(0, 10);
    return <ProductClient products={result} />
}

export default RootPage