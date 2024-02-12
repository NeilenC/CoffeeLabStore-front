import { Product } from "./commons/types.interface";

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