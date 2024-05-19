

import { extendTheme, ThemeConfig } from "@chakra-ui/react";


const extraColors = {
    colors: {
        polisPrimary: '#0BBAB7'
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
    fonts: {
        heading: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        body: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    }
}

const theme = extendTheme(extraColors)

export default theme
