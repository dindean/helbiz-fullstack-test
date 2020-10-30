import React from 'react';
import { useQuery } from '@apollo/client';
import Search from './Components/Search';
import StickyHeadTable from './Components/StickyHeadTable';
import query from './query';

const App = () => {  
  // The useQuery React hook is the primary API for executing queries in an Apollo application
  const { loading, error, data } = useQuery(query.GET_ALL_BIKES);
  if (loading) return 'Loading...';
  if (error) return `Error! You don't have access! ${error.message}`;

  return (
    <div>
      <h1>Welcome to Helbiz!</h1>
      <Search />
      <h3>All bikes ⏬  </h3>
      <StickyHeadTable allBikeData={data.bikes} pagination />
    </div>
  )
}

export default App;
