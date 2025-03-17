import { delay } from '@/lib/utils';
import { getAllCategory } from '@/server/category';
import CategoryClient from './components/CategoryClient';


const CategoryPage = async () => {
  await delay(1.5 * 1000)
  const result = await getAllCategory();
  return (
    <CategoryClient categories={result} />
  );
};

export default CategoryPage;