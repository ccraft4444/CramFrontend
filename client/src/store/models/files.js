import { action, thunk } from "easy-peasy";
import axios from "axios";

export const files = {
  data: [],
  setFile: action((state, payload) => {
    state.data = payload;
  }),
  fetchFiles: thunk(async (actions, payload) => {
    const { data } = await axios.get(`${process.env.DB_URL}/routes/documents`);
    actions.setFIle(data);
  }),
  fetchFile: action(async (state, fileId) => {
    try {
      const response = await fetch(
        `${process.env.DB_URL}/routes/documents/${fileId}`
      );
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error(error);
      return null;
    }
  }),
  createFile: thunk(async (actions, payload) => {
    console.log("create file payload", payload);
    const { data } = await axios.post(
      `${process.env.DB_URL}/routes/documents`,
      payload
    );
    actions.setFile(data);
  }),
};
