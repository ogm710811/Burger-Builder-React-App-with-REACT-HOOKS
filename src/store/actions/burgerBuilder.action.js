import { Action } from "redux";

export const LOAD_INGREDIENTS_INIT = "[Burger-Builder] Load Ingredients Init";
export const LOAD_INGREDIENTS = "[Burger-Builder] Load Ingredients";
export const LOAD_INGREDIENTS_SUCCESS =
  "[Burger-Builder] Load Ingredients Success";
export const LOAD_INGREDIENTS_FAIL = "[Burger-Builder] Load Ingredients Fail";
export const ADD_INGREDIENT = "[Burger-Builder] Add Ingredient";
export const REMOVE_INGREDIENT = "[Burger-Builder] Remove Ingredient";

export const loadIngredientsInit: Action = () => {
  return {
    type: LOAD_INGREDIENTS_INIT,
  };
};

export const loadIngredients: Action = () => {
  return {
    type: LOAD_INGREDIENTS,
  };
};

export const loadIngredientsSuccess: Action = (ingredients) => {
  return {
    type: LOAD_INGREDIENTS_SUCCESS,
    payload: ingredients,
  };
};

export const loadIngredientsFail: Action = () => {
  return {
    type: LOAD_INGREDIENTS_FAIL,
  };
};

export const addIngredient: Action = (ingredientName) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredientName,
  };
};

export const removeIngredient: Action = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientName,
  };
};

export type BurgerBuilderAction =
  | loadIngredientsInit
  | loadIngredients
  | loadIngredientsSuccess
  | loadIngredientsFail
  | addIngredient
  | removeIngredient;
