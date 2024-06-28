const ThemeOption = ({ theme }: { theme: string }) => {
  const setTheme = () => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }
  return <div onClick={setTheme} className="theme-option" id={`theme-${theme}`} ></div>
}

export default ThemeOption