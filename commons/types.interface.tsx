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
    cart: Product[];
  };

  export type AddToCartAction = {
    type: 'ADD_TO_CART';
    payload: Product;
  };
  
  export type RemoveFromCartAction = {
    type: 'REMOVE_FROM_CART';
    payload: string; 
  };

export type Category = {
  _id: string,
  name: string,
  description: string
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

  