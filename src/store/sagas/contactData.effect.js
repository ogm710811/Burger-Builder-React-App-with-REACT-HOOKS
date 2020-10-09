import { put } from "redux-saga/effects";

import * as fromContactDataActions from "../actions";
import axiosOrdersInstance from "../../axios/axios-orders";

export function* createNewOrderEffect(
  action: fromContactDataActions.ContactDataAction
) {
  const orderData = action.payload;
  yield put(fromContactDataActions.createNewOrder());
  try {
    const response = yield axiosOrdersInstance.post(
      `/orders.json?auth=${orderData.authToken}`,
      orderData.order
    );
    yield put(fromContactDataActions.createNewOrderSuccess(response.status));
  } catch (err) {
    yield put(fromContactDataActions.createNewOrderFail());
  }
}
