import { Product } from "@/commons/types.interface";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useProductCard (products: Product[]) {
    const [visibleProducts, setVisibleProducts] = useState(9);
    const [visibleProductsList, setVisibleProductsList] = useState<Product[]>([]);
    const router = useRouter()
    const ruta = router.pathname  
    const isSmallScreen = useMediaQuery('(max-width: 600px)')
    const isMediumScreen = useMediaQuery('(max-width: 1000px)')
  
    useEffect(() => {
      if (window.location.pathname === "/") {
        setVisibleProductsList(products.slice(0, visibleProducts));
      } else {
        setVisibleProductsList(products);
      }
    }, [visibleProducts, products]);

    return {visibleProducts,
        setVisibleProducts,
        visibleProductsList,
        ruta,
        isSmallScreen,
        isMediumScreen}
}