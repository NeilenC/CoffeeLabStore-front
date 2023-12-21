import { Product } from "@/commons/types.interface";


//OBTENER TODOS LOS PRODUCTOS 

export const getProducts = async({setProducts, products}:any) => {
    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      
      setProducts(data);
      return products;
    } catch (error) {
        console.error("Error:", error);
    }
  }


// CATEGORIAS
export async function getProductsByCategory({categoryId, subCategoryId,setProducts, products}: any) {
    try {
      if (categoryId) {
        const response = await fetch(
          `http://localhost:8000/products/bySubCategory/${subCategoryId}`,
          { method: "GET" },
        );
        const dataPromise: Promise<Product[]> = response.json();

        const data = await dataPromise;

        if (data) {
          setProducts(data);
          return products
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  }

export const getSubCategory = async ({categoryId, setSubcategory, subCategory}: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/subcategory/${categoryId}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setSubcategory(data);

        return subCategory;
      }
    } catch (e) {
      throw new Error();
    }
  };

  export const getCategory = async ({categoryId, setCategory, category}: any) => {
    const categories = await fetch(
      `http://localhost:8000/categories/${categoryId}`,
      { method: "GET" },
    );

    const data = await categories.json();
    setCategory(data.name);
    return category;
  }