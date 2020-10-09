import { Action } from "redux";

export const CREATE_NEW_ORDER_INIT =
  "[Checkout - ContactData] Create New Order Init";
export const CREATE_NEW_ORDER = "[Checkout - ContactData] Create New Order";
export const CREATE_NEW_ORDER_SUCCESS =
  "[Checkout - ContactData] Create New Order Success";
export const CREATE_NEW_ORDER_FAIL =
  "[Checkout - ContactData] Create New Order Fail";

export const createNewOrderInit: Action = (orderData) => {
  return {
    type: CREATE_NEW_ORDER_INIT,
    payload: orderData,
  };
};

export const createNewOrder: Action = () => {
  return {
    type: CREATE_NEW_ORDER,
  };
};

export const createNewOrderSuccess: Action = (resStatus) => {
  return {
    type: CREATE_NEW_ORDER_SUCCESS,
    payload: resStatus,
  };
};

export const createNewOrderFail: Action = () => {
  return {
    type: CREATE_NEW_ORDER_FAIL,
  };
};

export type ContactDataAction =
  | createNewOrderInit
  | createNewOrder
  | createNewOrderSuccess
  | createNewOrderFail;
