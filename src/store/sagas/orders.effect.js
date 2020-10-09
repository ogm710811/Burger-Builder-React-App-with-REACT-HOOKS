import { put } from "redux-saga/effects";

import * as fromOrdersActions from "../actions";
import axiosOrdersInstance from "../../axios/axios-orders";

export function* loadOrdersEffect(action: fromOrdersActions.OrdersAction) {
  yield put(fromOrdersActions.loadOrders());
  const queryParams = `?auth=${action.authToken}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axiosOrdersInstance.get(
      `/orders.json${queryParams}`
    );
    yield put(fromOrdersActions.loadOrdersSuccess(response.data));
  } catch (err) {
    yield put(fromOrdersActions.loadOrdersFail());
  }
}
