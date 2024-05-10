import React, { useEffect, useState } from "react";
import DarkMode from "./DarkMode.jsx";
import TodoDate from "./TodoDate";
import CustomDropDown from "./CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
function Todos() {
  const dispatch = useDispatch();

  // const [todos, setTodos] = useState(() => {
  //   const savedTodos = localStorage.getItem("todos");
  //   if (savedTodos) {
  //     const parsedTodos = JSON.parse(savedTodos);
  //     // Check if parsed data is an object, otherwise initialize an empty object
  //     return typeof parsedTodos === "object" ? parsedTodos : {};
  //   }
  //   return {};
  // });
  const today = new Date().toLocaleDateString();
  const [item, setItem] = useState("");
  // const [pinnedDate, setPinnedDate] = useState(() => {
  //   const savedPinnedDate = localStorage.getItem("pinnedDate");
  //   return savedPinnedDate ? savedPinnedDate : null;
  // });
  // const [collapsedDates, setCollapsedDates] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const { todos, pinnedDate, collapsedDates } = useSelector((state) => ({
    todos: state.todos.todos || {},
    pinnedDate: state.todos.pinnedDate || null,
    collapsedDates: state.todos.collapsedDate || {},
  }));
  const pinnedDateToUse = pinnedDate || today;
  function handleChange(event) {
    setItem(event.target.value);
  }
  const handleAdd = () => {
    if (item.trim()) {
      const currentDate = new Date().toLocaleDateString();
      dispatch({
        type: "ADD_TODO",
        payload: { date: currentDate, text: item },
      });
      setItem("");
    }
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }
  // const debounce = (func, delay) => {
  //   let debounceTimeout;
  //   return (...args) => {
  //     clearTimeout(debounceTimeout);
  //     debounceTimeout = setTimeout(() => func(...args), delay);
  //   };
  // };
  const markAsDone = (date, index) => {
    dispatch({
      type: "TOGGLE_DONE",
      payload: { date: date, index },
    });
  };
  // const handleMarkAsDone = debounce((date, index) => {
  //   markAsDone(date, index);
  // }, 200);
  const sortedTodos = Object.entries(todos)
    .sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      // Sort by pinned date first, otherwise by date
      if (a[0] === pinnedDateToUse) return -1;
      if (b[0] === pinnedDateToUse) return 1;
      return dateA - dateB;
    })
    .map(([date, todosOnDate = []]) => ({
      date,
      todosOnDate,
      isPinned: date === pinnedDate,
      isCollapsed: collapsedDates[date] || false,
    }));
  if (pinnedDateToUse) {
    const index = sortedTodos.findIndex(
      (entry) => entry.date === pinnedDateToUse,
    );
    if (index !== -1) {
      const [pinnedEntry] = sortedTodos.splice(index, 1);
      sortedTodos.unshift(pinnedEntry);
    }
  }
  const handleToggleCollapse = (date) => {
    dispatch({
      type: "TOGGLE_COLLAPSE",
      payload: {
        dateToCollapse: date,
      },
    });
  };
  const handleDropDownChange = (date, index, priority) => {
    dispatch({
      type: "SET_PRIORITY",
      payload: { date, index, priority },
    });
  };
  const handlePinToTop = (date) => {
    dispatch({ type: "PIN_DATE", payload: { dateToPin: date } });
  };
  useEffect(() => {
    console.log("Todos state:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    if (pinnedDate !== null) {
      localStorage.setItem("pinnedDate", pinnedDate);
    } else {
      localStorage.removeItem("pinnedDate");
    }
  }, [todos, pinnedDate]);
  return (
    <div className="card">
      <div className="flex">
        <h1>Your Todo</h1>
        <DarkMode />
      </div>
      <div className="input-container">
        <input
          value={item}
          onChange={handleChange}
          className="input-box"
          placeholder="Add your task..."
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="content">
        {sortedTodos.map(
          ({ date, todosOnDate = [], isPinned, isCollapsed }) => (
            <div
              key={date}
              className={`date-card ${isPinned ? "pinned" : ""} ${isCollapsed ? "collapsed" : ""}`}
            >
              <TodoDate
                key={date}
                date={date}
                onPinToTop={() => handlePinToTop(date)}
                onToggleCollapse={() => handleToggleCollapse(date)}
                isPinned={isPinned}
                isCollapsed={isCollapsed}
              />
              {!isCollapsed && (
                <div className="todo-list-container">
                  {todosOnDate.map((todo, index) => (
                    <div className="item" key={`${date}-${index}`}>
                      <div
                        className={`circle ${todo.priority}`}
                        style={{
                          backgroundColor:
                            todo.priority === "high"
                              ? "#FFD93D"
                              : todo.priority === "urgent"
                                ? "#FF3EA5"
                                : "",
                        }}
                      ></div>
                      <p
                        className="text"
                        style={
                          todo.done
                            ? {
                                textDecoration: "line-through",
                                textDecorationColor: "#E72929",
                                textDecorationThickness: "3px",
                              }
                            : {}
                        }
                      >
                        {todo.text}
                      </p>
                      <div className="extra-btn">
                        <button onClick={() => markAsDone(date, index)}>
                          {todo.done ? "Mark as Undone" : "Mark as Done"}
                        </button>
                      </div>
                      <CustomDropDown
                        selectedValue={todo.priority}
                        handleChange={(event) =>
                          handleDropDownChange(date, index, event.target.value)
                        }
                        disabled={todo.done}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
export default Todos;
