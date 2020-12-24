import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function News(props) {
  const [newsdata, setnewsdata] = useState([]);
  const [favourite, setfavourite] = useState([]);
  window.onunload = () => {
    // Clear the local storage
    localStorage.clear();
  };

  const fetchnews = () => {
    let startDate, endDate, category;
    console.log(props);
    if (props.location.aboutProps) {
      startDate = props.location.aboutProps.startDate;
      endDate = props.location.aboutProps.endDate;
      category = props.location.aboutProps.category;
      localStorage.setItem("startDate", startDate);
      localStorage.setItem("endDate", endDate);
      localStorage.setItem("category", category);
      console.log(localStorage);
    } else {
      startDate = localStorage.getItem("startDate");
      endDate = localStorage.getItem("endDate");
      category = localStorage.getItem("category");
      console.log(localStorage);

      console.log("le: " + startDate);
    }

    var url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=in&" +
      "category=" +
      category +
      "&" +
      "from=" +
      startDate +
      "&" +
      "end=" +
      endDate +
      "&" +
      "apiKey=6ca2c97ac61e43a9a83dd36e788d19aa";
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setnewsdata(response.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchnews();
    const check = localStorage.getItem("mydata");
    if (check) {
      setfavourite(JSON.parse(check));
    } else {
      //localStorage.clear();
    }
  }, []);
  const getclassname = (id, title) => {
    const check = favourite.filter(
      (item) => item[0].publishedAt === id && item[0].title === title
    );
    if (check.length === 0) {
      return "favouriteinactive";
    } else {
      return "favouriteactive";
    }
  };
  const addtofavourites = (id, title) => {
    const check = favourite.filter(
      (item) => item[0].publishedAt === id && item[0].title === title
    );

    if (check.length === 0) {
      const temp = newsdata.filter(
        (item) => item.publishedAt === id && item.title === title
      );
      const data = favourite;
      data.push(temp);
      setfavourite(data);
      alert("Added to favourite");
      localStorage.setItem("mydata", JSON.stringify(data));
    } else {
      const data = favourite.filter(
        (item) => item[0].publishedAt !== id && item[0].title !== title
      );
      setfavourite(data);
      alert("Removed from favourite");
      localStorage.setItem("mydata", JSON.stringify(data));
    }
  };

  return (
    <>
      <h1>News</h1>
      <NavLink
        className="btn btn-primary"
        to={{
          pathname: "/favourite",
        }}
      >
        {" "}
        Show Favourites
      </NavLink>
      <div className="container">
        {newsdata.map((item) => {
          return (
            <div className="commondiv row">
              <div className="col-lg-2 col-md-3 col-xs-4 col-12 d-flex flex-column justify-content-center">
                <center>
                  {" "}
                  <img src={item.urlToImage} className="dataimage"></img>
                </center>
              </div>
              <div className="col-lg-9 col-md-7  col-xs-12 col-12  p-4">
                <h6 className="heading">
                  Author:
                  <small className="data">{item.author}</small>
                </h6>
                <h6 className="heading">
                  Title: <small className="data">{item.title}</small>
                </h6>
                <h6 className="heading">
                  Description:{" "}
                  <small className="data">{item.description}</small>
                </h6>
                <h6 className="heading">
                  Content: <small className="data">{item.content}</small>
                </h6>
                <h6 className="heading">
                  Published At:{" "}
                  <small className="data">{item.publishedAt}</small>
                </h6>
              </div>
              <div className="col-lg-1 col-md-2  col-xs-2  col-12 d-flex flex-column justify-content-center">
                <h6>Add / Remove</h6>
                <button
                  onClick={() => addtofavourites(item.publishedAt, item.title)}
                >
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={getclassname(item.publishedAt, item.title)}
                    />{" "}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default News;
