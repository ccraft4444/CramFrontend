import { useStoreState, useStoreActions } from "easy-peasy";
export default function useOrders() {
  const fetchOrders = useStoreActions((actions) => actions.orders.fetchOrders);
  const createOrder = useStoreActions((actions) => actions.orders.createOrder);
  const orders = useStoreState((state) => state.orders.data);

  return {
    fetchOrders,
    createOrder,
    orders,
  };
}
