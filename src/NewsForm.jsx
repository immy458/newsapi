import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import { DateRangeInput } from "@datepicker-react/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewsForm() {
  window.onunload = () => {
    // Clear the local storage
    localStorage.clear();
  };

  const [category, setcategory] = useState("Business");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  // localStorage.clear();
  return (
    <>
      <div className="container col-md-8 col-lg-5 col-10 mt-5 d-flex flex-column justfy-content-between">
        <h1 className="mb-5">News Api</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group row">
            <label className="col-sm-3 col-3 col-form-label">
              Select Category
            </label>
            <div className="col-sm-8 col-8">
              <select
                class="form-control"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option>General</option>
                <option>Business</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Science</option>
                <option>Sports</option>
                <option>Technology</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">From</label>
            <div className="col-sm-8">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">To</label>
            <div className="col-sm-8">
              <DatePicker
                selected={endDate}
                onChange={(date) => setendDate(date)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
                minDate={new Date(startDate)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12 d-flex justify-content-center">
              <NavLink
                type="submit"
                className="btn btn-outline-info savebtn"
                to={{
                  pathname: "/news",
                  aboutProps: {
                    category: category,
                    startDate: startDate,
                    endDate: endDate,
                  },
                }}
              >
                Get News
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default NewsForm;
