import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Products from './Products.jsx'
import ProductDetails from './ProductDetails.jsx';
const router = createBrowserRouter([
 
  {
      path: 'paginated',
      element: <Products/>,
      
  },
  {
    path: '/product/:id', // Fix the path to match the link in Products.jsx
    element: <ProductDetails />,
  },
  // {
  //     path: 'parallel',
  //     element: <Parallel />,
  // },
  // {
  //     path: 'optimistic',
  //     element: <Optimistic />,
  // },
  // {
  //     path: 'dependant',
  //     element: <Dependant />,
  // },
]);
export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
  );
}

export default App;
