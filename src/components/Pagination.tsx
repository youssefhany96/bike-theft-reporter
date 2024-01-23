import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #007bff;
  background-color: ${(props) => (props.isActive ? "#007bff" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#007bff")};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <PaginationContainer>
      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index}
          isActive={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
