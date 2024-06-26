// Consider this snippet from ./redux.js
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosReducer";
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
export default store;
