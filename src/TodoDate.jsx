function TodoDate({
  date,
  onPinToTop,
  isPinned,
  isCollapsed,
  onToggleCollapse,
}) {
  console.log("Date", date);
  console.log(
    "Rendering TodoDate - Date:",
    date,
    "isPinned:",
    isPinned,
    "isCollapsed:",
    isCollapsed,
  );
  function formatDate(dateString) {
    // Define a regular expression to match the date string "DD/MM/YYYY"
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    console.log("line no 22=>", dateRegex)
    // Parse the date string using the regular expression
    const match = dateRegex.exec(dateString);
    if (match) {
      const [, day, month, year] = match;

      // Convert the parsed day, month, and year to a standard date format "YYYY-MM-DD"
      const standardDate = `${year}-${month}-${day}`;

      // Create a Date object using the standard date format
      const date = new Date(standardDate);

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        const today = new Date();

        // Check if the date is today
        const isToday =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();

        if (isToday) {
          return "Today";
        }
        console.log("line no 22=>", isToday)
        // Check if the date is yesterday
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const isYesterday =
          date.getFullYear() === yesterday.getFullYear() &&
          date.getMonth() === yesterday.getMonth() &&
          date.getDate() === yesterday.getDate();

        if (isYesterday) {
          return "Yesterday";
        }
        console.log("line no 22=>", date.toLocaleDateString())
        // Otherwise, return the date in MM/DD/YYYY format
        return date.toLocaleDateString();
      }
    }
    console.log("line no 22=>", "Date is invalid")
    // If the date is invalid or does not match the expected format, return "Invalid Date"
    return "Invalid Date";
  }
  // const date = new Date();
  // const da = date.getDate();
  // const mo = date.getMonth();
  // const dayIndex = date.getDay();
  const formattedDate = formatDate(date);
  // const day = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // const month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const monthName = month[mo];
  // const dayName = day[dayIndex];

  return (
    <div
      className={`todo-date ${isPinned ? "pinned" : ""} ${isCollapsed ? "collapsed" : ""}`}
    >
      <div className="flex gap">
        <h2>Task for {formattedDate}</h2>
        {isPinned && <p className="pinned-state">Pinned</p>}
      </div>
      <div className="todo-extra-buttons">
        <button className="pin-btn" onClick={onPinToTop}>
          {isPinned ? "Unpin" : "Pin to top"}
        </button>
        <button className="pin-btn" onClick={onToggleCollapse}>
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
}
export default TodoDate;
