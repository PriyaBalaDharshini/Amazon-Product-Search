import React, { useState } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchQuery);

    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/search?searchQuery=${searchQuery}`);  // Correct query parameter
      const result = response.data;
      console.log(result);
      setProducts(result.products.map((product, index) => ({ id: index + 1, sno: index + 1, ...product })))
    } catch (error) {
      console.error("Error occurred while searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'sno', headerName: 'S.No', width: 100 },
    { field: 'productName', headerName: 'Product Name', width: 300 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 150 },
    { field: 'asin', headerName: 'ASIN', width: 200 },
  ];

  return (
    <div className="App">
      <h1>Amazon Search Product</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder='Search for products'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div>
        {products.length > 0 ?
          (<p>{products.length} results found</p>)
          : (<p>0 results found</p>)}
      </div>

      <div style={{ height: 500, width: '100%' }}>
        {products.length > 0 ? (
          <DataGrid
            rows={products}
            columns={columns}
            pagination
            loading={loading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
