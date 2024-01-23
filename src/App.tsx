import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import BikeList from "./components/BikeList";
import Pagination from "./components/Pagination";
import { Loading, Error, NoData } from "./components/Message";
import {
  fetchBikeThefts,
  fetchBikeTheftsCount,
} from "./services/bikeTheftService";
import { Bike } from "./types";
import DateRangePicker from "./components/DateRangePicker";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TotalCountContainer = styled.div`
  text-align: center;
  margin: 20px auto;
  padding: 15px 20px;
  max-width: 800px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  color: #333;
`;

const App: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  useEffect(() => {
    const fetchBikesAndCount = async () => {
      setLoading(true);
      try {
        const totalBikeCount = await fetchBikeTheftsCount({
          query: searchTerm,
          page: 1,
          perPage: 10,
        });
        setTotalCount(totalBikeCount);
        setTotalPages(calculateTotalPages(totalBikeCount, 10));
        const bikeData = await fetchBikeThefts({
          page: currentPage,
          perPage: 10,
          query: searchTerm,
        });

        const filteredBikes = bikeData.filter((bike: Bike) => {
          const theftDate = bike.date_stolen
            ? new Date(bike.date_stolen * 1000)
            : null;
          const start = dateRange.start ? new Date(dateRange.start) : null;
          const end = dateRange.end
            ? new Date(dateRange.end.setHours(23, 59, 59, 999))
            : null;
          return (
            (!start || (theftDate && theftDate >= start)) &&
            (!end || (theftDate && theftDate <= end))
          );
        });

        setBikes(filteredBikes);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchBikesAndCount();
  }, [currentPage, searchTerm, dateRange]);

  const calculateTotalPages = (
    totalBikes: number,
    itemsPerPage: number,
  ): number => {
    return Math.ceil(totalBikes / itemsPerPage);
  };

  const handleSearch = (searchItem: string) => {
    setSearchTerm(searchItem);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDateFilter = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ start: startDate, end: endDate });
    setCurrentPage(1);
  };

  return (
    <div>
      <Container>
        <SearchBar onSearch={handleSearch} />
        <DateRangePicker
          dateRange={dateRange}
          handleDateFilter={handleDateFilter}
        />
      </Container>
      <TotalCountContainer>
        Total Bike Theft Cases: {totalCount}
      </TotalCountContainer>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && bikes.length === 0 && <NoData />}
      {!loading && !error && <BikeList bikes={bikes} filterDates={dateRange} />}
      {!loading && !error && bikes.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default App;
