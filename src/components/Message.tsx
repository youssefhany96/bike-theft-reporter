import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const Loading = () => <MessageContainer>Loading...</MessageContainer>;

export const Error = ({ message }: { message: string }) => (
  <MessageContainer>Error: {message}</MessageContainer>
);

export const NoData = () => <MessageContainer>No data found</MessageContainer>;
