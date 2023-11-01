import { Category, Product } from '@/commons/types.interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function CategoryDetail() {
  const router = useRouter();
  const { categoryId, subCategoryId } = router.query;
  const [subcategory, setSubcategory] = useState("")

  console.log("category, subcategory", categoryId +","+ subCategoryId)
  //buscar los productos que tengan la categoryId y que coincidan con la subcategoria ? 

  async function getProductsByCategory() {
    if(categoryId) {
      
      const response = await fetch(`http://localhost:8000/products/byCategory/${categoryId}`,{method:"GET"})
      const dataPromise: Promise<any> = response.json();
    
    const data = await dataPromise; 

    if (data) {
      console.log("producto", data);
      console.log("categoria id de producto", data[0].category);
    }
    console.log("no")
  }
}
  async function findCategory() {
    if(categoryId) {
      const response = await fetch(`http://localhost:8000/categories/${categoryId}`)
      const dataPromise: Promise<any> = response.json();
    
      const data = await dataPromise; 
  
      if (data && data.subcategories) {
        const subcategoryMatch = data.subcategories.find((subcategory:string) => subcategory === subCategoryId);
  
        if (subcategoryMatch) {
          setSubcategory(subcategoryMatch)
        } else {
          console.log("La subcategoría especificada no coincide con ninguna subcategoría en la categoría.");
        }
      }
    }
  }
 

  useEffect(()=>{
    getProductsByCategory()
    findCategory()
  },[])

  return (
    <div>
      <h1>Detalles de la Categoría: {categoryId}</h1>
      <h2>Subcategoría: {subCategoryId}</h2>
      {/* Mostrar los detalles de la categoría y subcategoría */}
    </div>
  );
}

export default CategoryDetail;