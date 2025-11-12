import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() =>{
    const getTheme = localStorage.getItem("theme");
    if(getTheme === 'winter'){
        setIsDarkMode(true);
        localStorage.setItem("theme", "winter");
        document.querySelector('html').setAttribute('data-theme', 'winter');
    }
    else{
        setIsDarkMode(false);
        localStorage.setItem('theme', 'night');
        document.querySelector('html').setAttribute('data-theme', 'night');
    }
  }, [])
  const handleToggle = () =>{
    if(isDarkMode){
        setIsDarkMode(false);
        localStorage.setItem("theme", "night");
        document.querySelector('html').setAttribute('data-theme', 'night');
    }
    else{
        setIsDarkMode(true);
        localStorage.setItem("theme", "winter");
        document.querySelector('html').setAttribute('data-theme', 'winter');
    }
  }
  return (
    <button
      onClick={handleToggle}
      className="btn btn-primary btn-circle"
    >
      {isDarkMode ? <Moon size={24} className="text-blue-200" /> : <Sun size={24} className="text-yellow-200" />}
    </button>
  );
};

export default ThemeToggle;
