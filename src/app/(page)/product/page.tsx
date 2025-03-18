import { getAllProduct } from '@/server-action/product.service';
import ProductClient from './components/ProductClient';
import { delay } from '@/lib/utils';


const RootPage = async () => {
    // const result = await getAllProduct(0, 10);
    // await delay(1000)
    return <ProductClient products={[]} />
}

export default RootPage