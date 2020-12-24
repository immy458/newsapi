import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function Favourite(props) {
  window.onunload = () => {
    // Clear the local storage
    localStorage.clear();
  };

  const rendermethod = () => {
    if (
      JSON.parse(localStorage.getItem("mydata")) != null &&
      JSON.parse(localStorage.getItem("mydata")).length > 0
    ) {
      return JSON.parse(localStorage.getItem("mydata")).map((item, i) => {
        return (
          <div className="commondiv row">
            <div className="col-lg-2 col-md-3 col-xs-4 col-12 d-flex flex-column justify-content-center">
              <center>
                {" "}
                <img src={item[0].urlToImage} className="dataimage"></img>
              </center>
            </div>
            <div className="col-lg-9 col-md-7  col-xs-12 col-12  p-4">
              <h6 className="heading">
                Author:
                <small className="data">{item[0].author}</small>
              </h6>
              <h6 className="heading">
                Title: <small className="data">{item[0].title}</small>
              </h6>
              <h6 className="heading">
                Description:{" "}
                <small className="data">{item[0].description}</small>
              </h6>
              <h6 className="heading">
                Published At:{" "}
                <small className="data">{item[0].publishedAt}</small>
              </h6>
            </div>
            {/* <div className="col-lg-1 col-md-2  col-xs-2  col-12 d-flex flex-column justify-content-center">
              <button
                className="btn btn-danger btn-sm"
                onClick={removeitem(item[0].publishedAt, item[0].title)}
              >
                Remove
              </button>
        </div>*/}
          </div>
        );
      });
    } else {
      return <h4 style={{ textAlign: "center" }}>List Is Empty</h4>;
    }
  };
  return (
    <>
      <h2>Favourite Items</h2>
      <div className="container">{rendermethod()}</div>
    </>
  );
}
export default Favourite;
