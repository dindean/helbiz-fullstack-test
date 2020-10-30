import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import StickyHeadTable from './StickyHeadTable';
import query from '../query';

// useQuery is a declarative React Hook. It is not meant to be called in the sense of a classic function to receive data!
// The useLazyQuery hook is perfect for executing queries in response to events other than component rendering. 
// This hook acts just like useQuery, with one key exception: when useLazyQuery is called, it does not immediately 
// execute its associated query. Instead, it returns a function in its result tuple that you can call whenever you're ready to execute the query

const Search = () => {
  let topMessage = 'Search a bike by ID ⏬ ';
  const [ bikeId, setBikeId ] = useState('');
  const [ getBike, { loading, data, error }] = useLazyQuery(query.GET_BIKE);

  if (loading) topMessage = 'loading';
  if (error) topMessage = `Error! Unable to find a bike with this ID`;

  const handleSearch = () => {
    getBike({ variables: { bike_id: bikeId } })
    setBikeId('')
  }

  return (
    <div style={{margin: "20px"}}>
      <h3>{topMessage}</h3>
      {data ? <StickyHeadTable allBikeData={data.bikes}/> : null}
      <input value={bikeId} onChange={(e) => setBikeId(e.target.value)} placeholder="bike_id" style={{marginTop: "10px"}}></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search;