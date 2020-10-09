import { Action } from "redux";

export const LOAD_ORDERS_INIT = "[Orders] Load Orders Init";
export const LOAD_ORDERS = "[Orders] Load Orders";
export const LOAD_ORDERS_SUCCESS = "[Orders] Load Orders Success";
export const LOAD_ORDERS_FAIL = "[Orders] Load Orders Fail";

export const loadOrdersInit: Action = (authToken, userId) => {
  return {
    type: LOAD_ORDERS_INIT,
    authToken,
    userId,
  };
};

export const loadOrders: Action = () => {
  return {
    type: LOAD_ORDERS,
  };
};

export const loadOrdersSuccess: Action = (orders) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const loadOrdersFail: Action = () => {
  return {
    type: LOAD_ORDERS_FAIL,
  };
};

export type OrdersAction =
  | loadOrdersInit
  | loadOrdersSuccess
  | loadOrdersFail
  | loadOrders;
