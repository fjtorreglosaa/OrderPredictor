import { InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from "@mui/material/styles";

export const PredictorToolBar = (props) => {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Customers
        </Typography>
  
        <TextField
          sx={{ m: 2, width: "100%" }}
          placeholder="Customer Name"
          variant="standard"
          padding="10px"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Toolbar>
    );
  };