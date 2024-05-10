const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || {},
  pinnedDate: localStorage.getItem("pinnedDate") || null,
  collapsedDate: {},
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const { date, text } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [date]: [...(state.todos[date] || []), { text, done: false }],
        },
      };
    case "TOGGLE_DONE":
      const { date: toggledDate, index } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [toggledDate]: state.todos[toggledDate].map((todo, i) =>
            i === index ? { ...todo, done: !todo.done } : todo,
          ),
        },
      };
    case "PIN_DATE":
      const { dateToPin } = action.payload;
      return {
        ...state,
        pinnedDate: state.pinnedDate === dateToPin ? null : dateToPin,
      };
    case "TOGGLE_COLLAPSE":
      const { dateToCollapse } = action.payload;
      return {
        ...state,
        collapsedDate: {
          ...state.collapsedDate,
          [dateToCollapse]: !state.collapsedDate[dateToCollapse],
        },
      };
    case "SET_PRIORITY":
      const {
        date: priorityDate,
        index: priorityIndex,
        priority,
      } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [priorityDate]: state.todos[priorityDate].map((todo, i) =>
            i === priorityIndex ? { ...todo, priority } : todo,
          ),
        },
      };
    default:
      return state;
  }
}
export default todosReducer;
