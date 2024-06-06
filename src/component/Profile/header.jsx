import React, { useState, useEffect } from 'react';
import { Button, Chip, Skeleton } from '@mui/material';
import Search from "../../assets/image/search-icon-sl7.png";
import { json } from 'react-router-dom';

const Header = ({ items, setFilteredItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [dummyChips, setDummyChips] = useState([]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };


  useEffect(() => {
    if (isFocused && searchTerm.trim() === '') {
      // Simulating loading state by adding a delay
      const timeout = setTimeout(() => {
        setDummyChips(['Krishna Kumar', 'John Doe', 'Sophie Brown', 'Ravi Sharma','Lily Johnson','Dummy Chip 6']);
      }, 1000); // Delay of 1 second
      return () => clearTimeout(timeout);
    } else {
      setDummyChips([]);
    }
  }, [searchTerm, isFocused]);

    const fetchData = async (searchTerm) => {
      try {
        const response = await fetch(`http://localhost:4000/user1`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const results = json.filter((user1) => {
            return user1 && user1.name.toLowerCase().includes(searchTerm);
          });
          console.log(results);
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchData(searchTerm);
  };

  return (
    <header className="header">
  <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={handleSearchChange}
  onFocus={handleInputFocus}
  onBlur={handleInputBlur}
  style={{
    borderRadius: '15px',
    padding: '10px 12px 10px 40px', // Added padding left for the icon
    width: '800px',
    float: 'right',
    marginBottom: isFocused ? '50px' : '0',
    transition: 'margin-bottom 0.3s ease',
    boxShadow: isFocused ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
    backgroundImage: `url(${Search})`,
    backgroundPosition: 'right 10px center', // Move the icon to the right side
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px 20px', // Adjust the size of the icon
  }}
/>

      <div className="dummy-chips" style={{ marginTop: isFocused ? '15px' : '10px', paddingTop:'5px', paddingLeft:'50px' }}>
        {dummyChips.map((chipText, index) => (
          <Chip
            key={index}
            label={
              chipText ? chipText : <Skeleton animation="wave" variant="text" width={80} />
            }
            style={{ marginRight: '5px' }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
