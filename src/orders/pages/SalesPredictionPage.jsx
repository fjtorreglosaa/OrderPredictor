import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NewOrderModal } from "../components/NewOrderModal";
import { OrdersViewModal } from "../components/OrdersViewModal";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getNextOrders } from "../../actions/CustomerActions";
import { PredictorToolBar } from "../components/PredictorToolBar";
import { TableHeader } from "../components/TableHeader";
import { getComparator, stableSort } from "../helpers/orderHelpers";
import { AppContext } from "../../context/AppContext";
import { getProducts } from "../../actions/ProductActions";
import { getShippers } from "../../actions/ShipperActions";
import { getEmployees } from "../../actions/EmployeeActions";

export const SalesPredictionPage = () => {
  
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customername");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [rows, setRows] = useState([]);

  const{ setCustomer, setProducts, setShippers, setEmployees } = useContext(AppContext);

  useEffect(() => {
    getNextOrders()
      .then((response) => {
        const data = response.data;
        setRows(data);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    getProducts()
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    getShippers()
      .then((response) => {
        const data = response.data;
        setShippers(data);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        const data = response.data;
        setEmployees(data);
        console.log(data)
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    setCustomer(selectedCustomer);
  }, [selectedCustomer]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRowSelection = (customerId, customerName) => {

    setSelectedCustomer({
      customerId,
      customerName,
    });

  };

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "95%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <PredictorToolBar />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <TableHeader
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          key={row.custid}
                          onClick={() =>
                            handleRowSelection(row.custid, row.customername)
                          }
                        >
                          <TableCell align="center">
                            {row.customername}
                          </TableCell>
                          <TableCell align="center">
                            {row.lastorderdate}
                          </TableCell>
                          <TableCell align="center">
                            {row.nextpredictedorder}
                          </TableCell>
                          <TableCell id="orderview" align="center">
                            <OrdersViewModal title="VIEW ORDERS" />
                          </TableCell>
                          <TableCell
                            className="order-view-modal"
                            align="center"
                          >
                            <NewOrderModal
                              selectedCustomer={selectedCustomer}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
};
