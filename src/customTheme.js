import { createMuiTheme } from "@material-ui/core/styles";

// Only use for custom global styles
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#c8102e",
    },
  },
});

export default customTheme;
