import { action, thunk } from "easy-peasy";
import axios from "axios";

export const orders = {
  data: [],
  setOrder: action((state, payload) => {
    state.data = payload;
  }),
  fetchOrders: thunk(async (actions, payload) => {
    const { data } = await axios.get(
      `${process.env.VITE_DB_URL}/routes/users/my_orders`
    );
    actions.setOrder(data);
  }),
  createOrder: thunk(async (actions, payload) => {
    const { data } = await axios.post(
      `${process.env.VITE_DB_URL}/routes/orders`
    );
    actions.setOrder(data);
  }),
};
