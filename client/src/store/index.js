import { createStore } from "easy-peasy";

import { auth } from "./models/auth,js";
import { orders } from "./models/orders";
import { files } from "./models/files";

const store = createStore({
  auth,
  orders,
  files,
});

export default store;
