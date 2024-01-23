import React from "react";
import styled from "styled-components";
import BikeListItem from "./BikeListItem";
import { Bike } from "../types";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    max-width: 1100px;
  }
`;

interface BikeListProps {
  bikes: Bike[];
  filterDates: { start: Date | null; end: Date | null };
}

const BikeList: React.FC<BikeListProps> = ({ bikes, filterDates }) => {
  const filteredBikes = bikes.filter((bike) => {
    const theftDate = new Date(bike.date_stolen * 1000);
    if (filterDates.start && theftDate < filterDates.start) {
      return false;
    }
    if (filterDates.end && theftDate > filterDates.end) {
      return false;
    }
    return true;
  });

  return (
    <ListContainer>
      {filteredBikes.map((bike) => (
        <BikeListItem key={bike.id} bike={bike} />
      ))}
    </ListContainer>
  );
};

export default BikeList;
