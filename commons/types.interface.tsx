export type Product = {
    _id: string;
    name: string;
    imageURL: string,
    price: number,
    stock: number,
    description:string,
    category: string[]
    quantity: number;
  };

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

export type Category = {
  _id: string,
  name: string,
  description: string,
  subcategories: string[]
}
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

  