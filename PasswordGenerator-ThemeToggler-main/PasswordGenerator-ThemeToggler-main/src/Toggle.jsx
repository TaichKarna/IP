import React, { useEffect, useState } from 'react'
import { ThemeContextProvider } from './conext/ThemeContext'
import App from './App';

const Toggle = () => {
    const [themeMode, setThemeMode] = useState('light');
    const lightTheme = () => {
        setThemeMode('light')
    }
    const darkTheme = () => {
        setThemeMode('dark')
    }

    useEffect(() => {
        document.querySelector('html').classList.remove('light', 'dark');
        document.querySelector('html').classList.add(themeMode);
    },[themeMode])
  return (
    <ThemeContextProvider value={{themeMode, lightTheme, darkTheme}}>
        <App />
    </ThemeContextProvider>
  )
}

export default Toggle