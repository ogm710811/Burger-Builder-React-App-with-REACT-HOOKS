import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosOrdersInstance from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import * as orderActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const orders = () => {
  const {orders, orderLoading} = useSelector(state => state.orderReducer)
  const {idToken, userId} = useSelector(state => state.authenticationReducer)
  const dispatch = useDispatch()
  const onLoadOrders = useCallback((authToken, userId) =>
    dispatch(orderActions.loadOrdersInit(authToken, userId)), [idToken, userId]);

  useEffect(() => {
    onLoadOrders(idToken, userId);
  }, [onLoadOrders])

  let ordersToDisplay = orderLoading ? (
    <Spinner/>
  ) : (
    orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.totalPrice}
      />
    ))
  );

  return <div>{ordersToDisplay}</div>;
}

export default withErrorHandler(orders, axiosOrdersInstance);
