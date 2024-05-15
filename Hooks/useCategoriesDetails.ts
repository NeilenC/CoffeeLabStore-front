import { getCategory, getSubCategory } from "@/FetchFunctions/categoriesFetch";
import { getProductsBySubCategory } from "@/FetchFunctions/productsFetch";
import { Product, SubCategory } from "@/commons/types.interface";
import { useEffect, useState } from "react";

export default function useCategoriesDetails ({categoryId, subCategoryId }: any) {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState("");
    const [subCategory, setSubcategory] = useState<SubCategory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      getSubCategory({ categoryId, setSubcategory, subCategory });
    }, [categoryId]);
  
    useEffect(() => {
      getProductsBySubCategory({
        categoryId,
        subCategoryId,
        setProducts,
        products,
      });
    }, [categoryId, subCategoryId, category]);
  
    useEffect(() => {
      getCategory({ categoryId, setCategory, category });
    }, [categoryId]);
  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
    };
  
    return {currentPage, products, category,
        subCategory, handlePageChange}

}