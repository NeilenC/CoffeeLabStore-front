import { getSubCategoryFetch } from "@/FetchFunctions/categoriesFetch";
import { Category } from "@/commons/types.interface";
import { getCategories } from "@/FetchFunctions/categoriesFetch";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subCategory, setSubcategory] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState("");
  const subcategoryRef = useRef<HTMLDivElement | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isMouseOverCategory, setIsMouseOverCategory] = useState(false);
  const [isMouseOverSubcategory, setIsMouseOverSubcategory] = useState(false);
  const [isClosingCategory, setIsClosingCategory] = useState(false);

  useEffect(() => {
    getCategories({ setCategories });
  }, [selectedCategory]);

  const handleMouseEnterCategory = useCallback(
    (categoryId: string) => {
      //   getSubCategory(categoryId);
      setSelectedCategory(categoryId);
      setIsMouseOverCategory(true);
      setIsClosingCategory(false);
    },
    [selectedCategory]
  );

  const handleMouseLeaveCategory = useCallback(() => {
    if (!isMouseOverSubcategory) {
      setIsMouseOverCategory(false);
      setIsClosingCategory(true);
    }
  }, [isMouseOverSubcategory]);

  const handleMouseEnterSubcategory = () => {
    setIsMouseOverSubcategory(true);
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  const handleMouseLeaveSubcategory = () => {
    setIsMouseOverSubcategory(false);
    if (isMouseOverCategory) {
      const id = setTimeout(() => {
        setExpandedCategory("");
      }, 500);
      setTimerId(id);
    }
  };

  useEffect(() => {
    getSubCategoryFetch({
      categoryId: selectedCategory,
      setSubcategory,
      setExpandedCategory,
    });
  }, [selectedCategory]);

  const handleSubcategoryChange = (
    categoryId: string,
    subcategoryId: string | null
  ) => {
    const url = subcategoryId ? `/${categoryId}/${subcategoryId}` : `/${categoryId}`;
    router.push(url);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isClosingCategory) {
      timerId = setTimeout(() => {
        setExpandedCategory("");
      }, 500);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isClosingCategory]);

  return {
    handleSubcategoryChange,
    handleMouseLeaveSubcategory,
    handleMouseEnterSubcategory,
    selectedSubcategory,
    setSelectedSubcategory,
    subCategory,
    setSubcategory,
    expandedCategory,
    setExpandedCategory,
    subcategoryRef,
    handleMouseEnterCategory,
    handleMouseLeaveCategory,
    categories,
    selectedCategory,
  };
}
