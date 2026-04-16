import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem {...props}>{children}</NextThemesProvider>;
}

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  return { theme: theme || resolvedTheme, setTheme };
};
