import { action, thunk } from "easy-peasy";
import axios from "axios";

export const orders = {
  data: [],
  setOrder: action((state, payload) => {
    state.data = payload;
  }),
  fetchOrders: thunk(async (actions, payload) => {
    const { data } = await axios.get(`${env("DB")}/routes/users/my_orders`);
    actions.setOrder(data);
  }),
  createOrder: thunk(async (actions, payload) => {
    const { data } = await axios.post(`${env("DB")}/routes/orders`);
    actions.setOrder(data);
  }),
};
