import { put } from "redux-saga/effects";

import * as fromBurgerBuilderActions from "../actions";
import axiosOrdersInstance from "../../axios/axios-orders";

export function* loadIngredientEffect() {
  yield put(fromBurgerBuilderActions.loadIngredients());
  try {
    const response = yield axiosOrdersInstance.get("/ingredients.json");
    yield put(fromBurgerBuilderActions.loadIngredientsSuccess(response.data));
  } catch (err) {
    yield put(fromBurgerBuilderActions.loadIngredientsFail());
  }
}
