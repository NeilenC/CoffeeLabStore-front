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
  userId?: string;
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
  userId: string;
};

export type AddToCartAction = {
  type: "ADD_TO_CART";
  payload: {
    product: Product;
    userId: string;
    quantity: number;
  };
};

export type RemoveFromCartAction = {
  type: "REMOVE_FROM_CART";
  payload: {
    product: Product;
    userId: string;
  };
};

export type ClearCartAction = {
  type: "CLEAR_CART";
  payload: { userId: string };
};

export type AddTotalPriceAction = {
  type: "UPDATE_CART_TOTAL";
  payload: number;
};

export type UserState = {
  user: {
    _id: string;
    name: string;
    lastName: string;
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
  cartTotal: number;
  trackingNumber: string;
  cartId?: string[] | null;
  productId?: Product;
  quantity?: number;
  cartDetails?: any;
};

type userData = {
  _id: string;
  name: string;
  lastName: string;
  dni: number;
  phoneNumber: number;
  email: string;
};

type paymentData = {
  paymentMethod: string;
  cardNumber?: number;
  deliveryCharge: number;
};

type shoppingData = {
  address?: string;
  apartment?: string;
  directionNum: number;
  localidad: string;
  provincia: string;
};
