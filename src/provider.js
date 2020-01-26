import React, { useState } from 'react';
import themeLight from './themes/light';
import themeDark from './themes/dark';
import { ThemeProvider } from '@material-ui/core';

export const esquadraoContext = React.createContext();

const Provider = props => {
  let darkMode = null

  if (typeof window !== 'undefined') {
    darkMode = window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.darkTheme`)
  }

  if (darkMode === null) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`${process.env.STORAGE_PREFIX}.darkTheme`, true)
    }

    darkMode = true
  }

  /*if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode = true
  }*/

  const [isDark, setTheme] = useState(darkMode === 'false' ? false : true)

  const setThemeRef = isDark => {

    setTheme(isDark);
    window.localStorage.setItem(`${process.env.STORAGE_PREFIX}.darkTheme`, isDark)
  }

  return (
    <esquadraoContext.Provider value={{
      isDark,
      changeTheme: () => setThemeRef(!isDark)
    }}>
      <ThemeProvider
        theme={isDark ? themeDark : themeLight}
      >
        {props.children}
      </ThemeProvider>
    </esquadraoContext.Provider>
  )
};

export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
);