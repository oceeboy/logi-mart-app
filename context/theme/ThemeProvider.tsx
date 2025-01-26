import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

interface Colors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

interface Theme {
  dark: boolean;
  colors: Colors;
}

interface ThemeContextProps {
  theme: Theme;
  toogleTheme: () => void;
}

const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '',
    secondary: '',
  },
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '',
    secondary: '',
  },
};

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

export const useTheme = React.useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>(lightTheme);

  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    };

    loadTheme();
  }, []);

  async function toogleTheme() {
    const newTheme = theme.dark ? darkTheme : lightTheme;
    setTheme(newTheme);
    setTheme(theme.dark ? darkTheme : lightTheme);
    await AsyncStorage.setItem('theme', newTheme.dark ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
