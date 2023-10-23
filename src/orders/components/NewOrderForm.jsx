import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HeaderBar } from "../../shared/components/header/HeaderBar";
import { useContext, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Button,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { createOrder } from "../../actions/OrderActions";

export const NewOrderForm = ({ closeModal, selectedCustomer }) => {
  const { customer, products, shippers, employees } = useContext(AppContext);

  const [orderData, setOrderData] = useState({
    employeeId: 0,
    shipperId: 0,
    shipname: "",
    shipaddress: "",
    shipcity: "",
    shipcountry: "",
    orderdate: new Date(),
    requireddate: new Date(),
    shippeddate: new Date(),
    freight: 0,
    productId: 0,
    unitprice: 0,
    quantity: 0,
    discount: 0,
  });

  const addOrderValues = ({ target }) => {
    const { value, name } = target;

    setOrderData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const CreateNewOrder = (event) => {
    event.preventDefault();

    console.log(orderData);

    const orderObject = {
      order: {
        employeeId: parseInt(orderData.employeeId),
        custId: parseInt(customer.customerId),
        shipperId: parseInt(orderData.shipperId),
        shipname: orderData.shipname,
        shipaddress: orderData.shipaddress,
        shipcountry: orderData.shipcountry,
        orderdate: Date.parse(orderData.orderdate),
        requireddate: Date.parse(orderData.requireddate),
        shippeddate: Date.parse(orderData.shippeddate),
        freight: parseFloat(orderData.freight),
        orderDetails: [
          {
            productId: parseInt(orderData.productId),
            unitprice: parseFloat(orderData.unitprice),
            qty: parseInt(orderData.quantity),
            discount: parseFloat(orderData.discount),
          },
        ],
      },
    };

    createOrder(orderObject)
      .then((response) => {
        closeModal();
      })
      .catch();

    console.log(orderObject);
  };

  return (
    <>
      <HeaderBar title={`${customer.customerName} - New Order`} />
      <Container>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          Order
        </Typography>
        <form onSubmit={CreateNewOrder}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                name="employeeId"
                options={employees}
                getOptionLabel={(option) => option.fullName}
                renderInput={(params) => (
                  <TextField {...params} label="Employee*" variant="standard" />
                )}
                onChange={(event, selectedOption) => {
                  const selectedId = selectedOption
                    ? selectedOption.employeeId
                    : null;
                  addOrderValues({
                    target: { value: selectedId, name: "employeeId" },
                  });
                }}
                value={
                  employees.find(
                    (option) => option.employeeId === orderData.employeeId
                  ) || null
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                name="shipperId"
                options={shippers}
                getOptionLabel={(option) => option.companyName}
                renderInput={(params) => (
                  <TextField {...params} label="Shipper*" variant="standard" />
                )}
                onChange={(event, selectedOption) => {
                  const selectedId = selectedOption
                    ? selectedOption.shipperId
                    : null;
                  addOrderValues({
                    target: { value: selectedId, name: "shipperId" },
                  });
                }}
                value={
                  shippers.find(
                    (option) => option.shipperId === orderData.shipperId
                  ) || null
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="shipname"
                variant="standard"
                fullWidth
                label="Ship Name*"
                type="text"
                onChange={addOrderValues}
                value={orderData.shipname}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="shipaddress"
                variant="standard"
                fullWidth
                label="Ship Address*"
                type="text"
                onChange={addOrderValues}
                value={orderData.shipaddress}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="shipcity"
                variant="standard"
                fullWidth
                label="Ship City*"
                type="text"
                onChange={addOrderValues}
                value={orderData.shipcity}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="shipcountry"
                variant="standard"
                fullWidth
                label="Ship Country*"
                type="text"
                onChange={addOrderValues}
                value={orderData.shipcountry}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="orderdate"
                  label="Order Date*"
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="requireddate"
                  label="Required Date*"
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="shippeddate"
                  label="Shipped Date*"
                  slotProps={{ textField: { variant: "standard" } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="freight"
                variant="standard"
                fullWidth
                label="Freight*"
                type="number"
                onChange={addOrderValues}
                value={orderData.freight}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <hr style={{ width: "100%", marginTop: "20px" }} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography component="h1" variant="h5">
                Order Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Autocomplete
                options={products}
                getOptionLabel={(option) => option.productName}
                renderInput={(params) => (
                  <TextField {...params} label="Product*" variant="standard" />
                )}
                onChange={(event, selectedOption) => {
                  const selectedId = selectedOption
                    ? selectedOption.productId
                    : null;
                  addOrderValues({
                    target: { value: selectedId, name: "productId" },
                  });
                }}
                value={
                  products.find(
                    (option) => option.productId === orderData.productId
                  ) || null
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="unitprice"
                variant="standard"
                fullWidth
                label="Unit Price*"
                type="number"
                onChange={addOrderValues}
                value={orderData.unitprice}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="quantity"
                variant="standard"
                fullWidth
                label="Quantity*"
                type="number"
                onChange={addOrderValues}
                value={orderData.quantity}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="discount"
                variant="standard"
                fullWidth
                label="Discount*"
                type="number"
                onChange={addOrderValues}
                value={orderData.discount}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={() => closeModal()}>Close</Button>
              <Button type="submit">Save</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
