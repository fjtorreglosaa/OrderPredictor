import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const greenTheme = createTheme({
    palette:{
        primary: {
            main: green[700],
            text: {
                viewOrder: red[900]
            }
        },
        secondary: {
            main: green[900]
        },
        error: {
            main: red.A400
        },
    }
})