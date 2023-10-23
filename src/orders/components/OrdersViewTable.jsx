import { DataGrid } from '@mui/x-data-grid';
import { HeaderBar } from '../../shared/components/header/HeaderBar';
import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getOrdersbyCustomer } from '../../actions/OrderActions';

const columns = [
  { field: 'id', headerName: 'Order ID', width: 120 },
  { field: 'requireddate', headerName: 'Required Date', width: 150 },
  { field: 'shippeddate', headerName: 'Shipped Date', width: 200 },
  { field: 'shipname', headerName: 'Ship Name', sortable: false, width: 150 },
  { field: 'shipaddress', headerName: 'Ship Address', sortable: false, width: 150 },
  { field: 'shipcity', headerName: 'Ship City', sortable: false, width: 150 },
];

export const OrdersViewTable = ({closeModal}) => {

  const [rows, setRows] = useState([]);
  const {customer} = useContext(AppContext);

  useEffect(() => {
    getOrdersbyCustomer(customer.customerId)
      .then((response) => {

        const data = response.data;

        setRows(data);
      })
      .catch((error) => {
      });
  }, [customer]);

  return (
    <div 
      style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{
        width: '98%',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <HeaderBar title={`${customer.customerName} - ORDERS`} color="#7B1F22"/>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 1, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
        />
        <Grid
          item
          xs={12}
          md={12}
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button sx={{color: '#cc372d'}} onClick={()=>closeModal()}>Close</Button>
        </Grid>
      </div>
    </div>
  );
}