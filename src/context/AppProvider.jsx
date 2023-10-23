
import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ({children}) => {

    const [customer, setCustomer] = useState({});
    const [employees, setEmployees] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [products, setProducts] = useState([]);
  
    return (
        <AppContext.Provider value = {{customer, setCustomer, employees, setEmployees, shippers, setShippers, products, setProducts}}>
            {children}
        </AppContext.Provider>
    )
}
