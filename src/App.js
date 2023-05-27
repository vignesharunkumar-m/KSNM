
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import ProductList from './toolkit/productslist'
import Cartproducts from './toolkit/cartproducts'


const router = createBrowserRouter([
  {
    path:'/',
    children:[
      {
        index:true,
        element:<ProductList/>
      },
      {
        path:'cart',
        element:<Cartproducts />
      }
    ]
  },
])


function App() {
  
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App