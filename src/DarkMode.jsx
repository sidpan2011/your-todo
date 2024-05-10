import { useEffect, useState } from "react";
import { MdNightlight } from "react-icons/md";
function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  function handleDarkMode() {
    // Toggle dark mode state and save the preference in localStorage
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    console.log("dark mode activated");
  }

  useEffect(() => {
    // Toggle the body class based on the dark mode state
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div>
      <button className="dark-mode-btn" onClick={handleDarkMode}>
        <MdNightlight />
      </button>
    </div>
  );
}
export default DarkMode;
