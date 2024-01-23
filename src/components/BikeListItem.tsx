import React from "react";
import styled from "styled-components";
import { Bike } from "../types";
import placeholderImage from "../assets/bike_photo_placeholder.svg";

const BikeContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const BikeImage = styled.img`
  display: block;
  flex-shrink: 0;
  width: 160px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
`;

const PlaceholderImage = styled.div`
  display: block;
  flex-shrink: 0;
  width: 160px;
  height: 120px;
  background: url(${placeholderImage}) no-repeat center center;
  background-size: cover;
  margin-right: 20px;
  border-radius: 4px;
  background-color: #f7f7f7;
`;

const BikeInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const BikeTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const BikeDetail = styled.p`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

interface BikeListItemProps {
  bike: Bike;
}

const BikeListItem: React.FC<BikeListItemProps> = ({ bike }) => {
  return (
    <BikeContainer>
      {bike.large_img || bike.thumb ? (
        <BikeImage src={bike.large_img || bike.thumb} alt={bike.title} />
      ) : (
        <PlaceholderImage aria-label="No image available" />
      )}
      <BikeInfo>
        <BikeTitle>{bike.title}</BikeTitle>
        {bike.description && (
          <BikeDetail>Description: {bike.description}</BikeDetail>
        )}
        <BikeDetail>
          Date of theft:{" "}
          {new Date(bike.date_stolen * 1000).toLocaleDateString()}
        </BikeDetail>
        <BikeDetail>Location of theft: {bike.stolen_location}</BikeDetail>
      </BikeInfo>
    </BikeContainer>
  );
};

export default BikeListItem;
