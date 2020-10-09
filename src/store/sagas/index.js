import { takeEvery, takeLatest, all } from "redux-saga/effects";

import * as actionTypes from "../actions/index";
import * as fromAuthEffects from "./authentication.effect";
import * as fromBurgerBuilderEffects from "./burgerBuilder.effect";
import * as fromContactDataEffects from "./contactData.effect";
import * as fromOrdersEffects from "./orders.effect";

export function* watchAuthEffect() {
  yield all([
    takeEvery(actionTypes.AUTH_TIMEOUT, fromAuthEffects.authTimeoutEffect),
    takeEvery(actionTypes.AUTH_LOGOUT, fromAuthEffects.authLogoutEffect),
    takeEvery(actionTypes.AUTH_LOGIN_INIT, fromAuthEffects.authLoginEffect),
    takeEvery(
      actionTypes.AUTH_CHECK_SESSION,
      fromAuthEffects.authCheckSessionEffect
    ),
  ]);
}

export function* watchBurgerBuilderEffect() {
  yield takeEvery(
    actionTypes.LOAD_INGREDIENTS_INIT,
    fromBurgerBuilderEffects.loadIngredientEffect
  );
}

export function* watchContactDataEffect() {
  yield takeLatest(
    actionTypes.CREATE_NEW_ORDER_INIT,
    fromContactDataEffects.createNewOrderEffect
  );
}

export function* watchOrdersEffect() {
  yield takeEvery(
    actionTypes.LOAD_ORDERS_INIT,
    fromOrdersEffects.loadOrdersEffect
  );
}
