import { Product } from "@/commons/types.interface";

//OBTENER TODOS LOS PRODUCTOS

export const getProducts = async ({ setProducts, products }: any) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/products`, {
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
        `${process.env.BASE_URL}/products/bySubCategory/${subCategoryId}`,
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
        `${process.env.BASE_URL}/products/byCategory/${categoryId}`,
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


// ------------------------ FUNCION PARA BUSCADOR ------------------------

export const searchProducts = async ({ searchTerm, setSearchResults }: any) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products/search/${searchTerm}`,
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
      `${process.env.BASE_URL}/products/${productId}`,
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

