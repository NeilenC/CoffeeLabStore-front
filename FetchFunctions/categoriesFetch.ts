import { Category, SubCategory } from "@/commons/types.interface";
import { getSubCatProps } from "./models/CategoryProps";



export const getSubCategoryFetch = async ({categoryId, setSubcategory, setExpandedCategory}: getSubCatProps) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/subcategory/${categoryId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSubcategory(data);
        setExpandedCategory(categoryId);
      }
    } catch (e) {
      throw new Error();
    }
  };

  export const getSubCategory = async ({
    categoryId,
    setSubcategory,
    subCategory,
  }: any) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/subcategory/${categoryId}`,
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
      `${process.env.BASE_URL}/categories/${categoryId}`,
      { method: "GET" },
    );
  
    const data = await categories.json();
    setCategory(data.name);
    return category;
  };
  
  //------------------------ FUNCION OBTENER CATEGORIAS ------------------------
  
  export const getCategories = async ({ setCategories }: any) => {
    const response = await fetch(`${process.env.BASE_URL}/categories`, {
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
        `${process.env.BASE_URL}/subcategory/${selectedCategory}`,
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