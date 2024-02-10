import { Category, Product, SubCategory } from "@/commons/types.interface";

//OBTENER TODOS LOS PRODUCTOS

export const getProducts = async ({ setProducts, products }: any) => {
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
};

// CATEGORIAS
export async function getProductsBySubCategory({
  categoryId,
  subCategoryId,
  setProducts,
  products,
}: any) {
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

        return products;
      }
    }
  } catch (e) {
    console.log("error", e);
  }
}

export async function getProductsByCategory({
  categoryId,
  setProducts,
  products,
}: any) {
  try {
    if (categoryId) {
      const response = await fetch(
        `http://localhost:8000/products/byCategory/${categoryId}`,
        { method: "GET" },
      );
      const dataPromise: Promise<Product[]> = response.json();

      const data = await dataPromise;

      if (data) {
        setProducts(data);
        return products;
      }
    }
  } catch (e) {
    console.log("error", e);
  }
}

export const getSubCategory = async ({
  categoryId,
  setSubcategory,
  subCategory,
}: any) => {
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

export const getCategory = async ({
  categoryId,
  setCategory,
  category,
}: any) => {
  const categories = await fetch(
    `http://localhost:8000/categories/${categoryId}`,
    { method: "GET" },
  );

  const data = await categories.json();
  setCategory(data.name);
  return category;
};

//------------------------ FUNCION OBTENER CATEGORIAS ------------------------

export const getCategories = async ({ setCategories }: any) => {
  const response = await fetch("http://localhost:8000/categories", {
    method: "GET",
  });
  const dataPromise: Promise<Category[]> = response.json();

  const data = await dataPromise;

  setCategories(data);
};

//------------------------ FUNCION OBTENER SUBCATEGORIAS ------------------------
export const getSubCategories = async ({
  selectedCategory,
  setSubcategory,
}: any) => {
  try {
    const response = await fetch(
      `http://localhost:8000/subcategory/${selectedCategory}`,
      {
        method: "GET",
      },
    );
    const dataPromise: Promise<SubCategory[]> = response.json();
    const data = await dataPromise;

    if (response.ok) {
      setSubcategory(data);
    }
  } catch (e) {
    throw new Error();
  }
};
// ------------------------ FUNCION PARA BUSCADOR ------------------------

export const searchProducts = async ({ searchTerm, setSearchResults }: any) => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/search/${searchTerm}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
};

export async function fetchProductDetails({productId, setProduct} : any) {
  try {
    const response = await fetch(
      `http://localhost:8000/products/${productId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const data = await response.json();
    setProduct(data);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

export const calculateTotalQuantity = (cart: any) => {
  if(cart && cart.length){
    const prices = cart.map((product: Product) => product.price * product.quantity)
    return prices.reduce((acc:number, item: number)=> {return acc + item})
  } 
    return 0
  
};

export const calculateTotalProducts = (cart: any) => {
  if(cart && cart.length) {
    
    const quantity = cart.map((product: Product) =>  product.quantity)
    const products = quantity.reduce((acc:number , item: number) => acc + item)
    return products
  }
   return 0
}