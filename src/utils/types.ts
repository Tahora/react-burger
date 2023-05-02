import { FC, PropsWithChildren } from "react";

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export type TIngredientType = "bun" | "main" | "sauce";
export type TOrderStatus = "done" | "pending" | "created";

export interface IName {
  name: string;
}

export interface IPassword {
  password: string;
}

export interface IEmail {
  email: string;
}

export interface IToken {
  token: string;
}

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

export interface IIngredientCounted extends IIngredient {
  count: number;
}

export interface IUniqueIngredient extends IIngredient {
  uuid: string | any;
}

export interface IResponse {
  success: boolean;
}

export interface IMessageResponse extends IResponse {
  message: string;
}

export interface IIngredients {
  data: IIngredient[];
}

export interface IUser {
  name: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokensResponse extends IResponse, ITokens {}

export interface IRegisteredUser extends IResponse, ITokens {
  user: IUser;
}

export interface ITimedItem {
  createdAt: string;
  updatedAt: string;
}

export interface IOrderOwner extends IUser, ITimedItem {}

export interface IOrder extends ITimedItem {
  ingredients: IIngredient[];
  name: string;
  number: number;
  owner: IOrderOwner;
  price: number;
  status: TOrderStatus;
  _id: string;
}

export interface IOrderResponse extends IResponse {
  order: IOrder;
  name: string;
}

export interface IIngredientsResponse extends IResponse, IIngredients {}

export type TApiData =
  | IOrderResponse
  | IIngredientsResponse
  | IMessageResponse
  | ITokensResponse;

export interface IWsOrder extends ITimedItem {
  name: string;
  number: number;
  status: TOrderStatus;
  _id: string;
  ingredients: string[];
}

export interface IWsOrdersResponse extends IResponse {
  orders: IWsOrder[];
  total: number;
  totalToday: number;
}

export interface IWsOrdersState extends IWsOrdersResponse {
  timestamp: number;
}

export interface IShotCountedIngredient {
  image: string;
  uuid: string;
  name: string;
  price: number;
  count: number;
}

export interface IOrderIngredients {
  [id: string]: IShotCountedIngredient;
}
