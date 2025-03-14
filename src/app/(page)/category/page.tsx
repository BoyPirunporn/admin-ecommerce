import React from 'react'
import CategoryClient from './components/CategoryClient'
import { getAllCategory } from '@/server/category'

type Props = {}

const CategoryPage = async (props: Props) => {
  const result = await getAllCategory();
  console.log(result);
  return (
    <CategoryClient categories={result}/>
  )
}

export default CategoryPage