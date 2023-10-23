import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const headCells = [
    {
      id: "customerName",
      numeric: false,
      disablePadding: true,
      label: "Customer Name",
    },
    {
      id: "lastorderdate",
      numeric: true,
      disablePadding: false,
      label: "Last Order Date",
    },
    {
      id: "nextpredictedorder",
      numeric: true,
      disablePadding: false,
      label: "Next Predicted Order",
    },
    {
      id: "vieworder",
      numeric: true,
      disablePadding: false,
      label: "",
    },
    {
      id: "neworder",
      numeric: true,
      disablePadding: false,
      label: "",
    }
  ];

export const TableHeader = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };