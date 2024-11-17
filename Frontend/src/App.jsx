import React, { useState } from 'react';
import axios from "axios";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchQuery);

    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/search?searchQuery=${searchQuery}`);  // Correct query parameter
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error("Error occurred while searching:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <button onClick={handleSearch} disabled={loading}>Search</button>
      </div>
    </div>
  );
};

export default App;
