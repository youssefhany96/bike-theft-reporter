import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface SearchBarProps {
  onSearch: (searchItem: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchItem);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search by title"
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
