export type Product = {
    _id: string;
    name: string;
    imageURL: string,
    price: number,
    stock: number,
    description:string,
    category: Category,
    subcategory: SubCategory
    quantity: number;
  };

  export type SubCategory = {
    name: string,
    id: string,
    category: string
  }

  export type Category = {
    id: string,
    name: string,
    description: string
  }

  export type CartState = {
    // userId: string | null; 
    cart: Product[];
  };

  export type AddToCartAction = {
    type: 'ADD_TO_CART';
    payload: Product;
    // payload: {
    //   product: Product;
    //   userId: string | null; 
    // };
  };
  
  export type RemoveFromCartAction = {
    type: 'REMOVE_FROM_CART';
    payload: string; 
  };


export type UserState = {
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    address: string;
    role: string;
    phoneNumber: number;
  };
}

  