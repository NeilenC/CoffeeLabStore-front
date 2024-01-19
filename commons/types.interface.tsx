export type Product = {
  _id: string;
  name: string;
  imageURL: [string];
  price: number;
  stock: number;
  description: string;
  category: Category;
  subcategory: SubCategory;
  quantity: number;
  isFavorite: boolean;
  productPreferences: {
    grind: string;
  };
};

export type SubCategory = {
  name: string;
  _id: string;
  category: string;
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type CartState = {
  cart: any;
  userId?: string;
  totalPrice?: number;
};

export type AddToCartAction = {
  type: "ADD_TO_CART";
  payload: Product;
  userId?: string;
};

export type RemoveFromCartAction = {
  type: "REMOVE_FROM_CART";
  payload: Product;
};

export type AddTotalPriceAction = {
  type: "UPDATE_CART_TOTAL";
  payload: number;
};

export type UserState = {
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    address: string;
    role: string;
    phoneNumber: number;
  };
};

export type OrderState = {
  id: string;
  createdAt: string;
  shoppingData: shoppingData;
  userData: userData;
  paymentData: paymentData;
  totalCart: number;
  trackingNumber: string;
  cartId: string[];
};

type userData = {
  name: string;
  lastName: string;
  dni: number;
  phoneNumber: number;
  email: string;
};

type paymentData = {
  paymentMethod: string;
  cardNumber?: number;
};

type shoppingData = {
  address?: string;
  apartment?: string;
  directionNum: number;
  localidad: string;
};
