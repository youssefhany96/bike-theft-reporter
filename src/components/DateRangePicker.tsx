import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .react-datepicker-wrapper {
    flex-grow: 1;
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }
  }
  .react-datepicker__close-icon {
    position: absolute;
    right: -24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
`;

interface DateRangePickerProps {
  dateRange: { start: Date | null; end: Date | null };
  handleDateFilter: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  handleDateFilter,
}) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        selectsRange={true}
        startDate={dateRange.start}
        endDate={dateRange.end}
        onChange={(update: [Date | null, Date | null]) => {
          const [start, end] = update;
          handleDateFilter(start, end);
        }}
        isClearable={true}
        placeholderText="Select a date range"
      />
    </DatePickerWrapper>
  );
};

export default DateRangePicker;
