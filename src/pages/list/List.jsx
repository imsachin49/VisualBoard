import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './List.scss'
import { useLocation } from "react-router-dom";
import ProductDataTable from '../../components/datatable/ProductDataTable'
import UserDataTable from '../../components/datatable/UserDataTable'


const List = () => {
  const location = useLocation();
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        {
          location.pathname === '/users' ? <UserDataTable /> : <ProductDataTable />
        }
      </div>
    </div>
  )
}

export default List
