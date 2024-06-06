import React from "react";
import "./SearchResultList.css";

const SearchResultList = ({ results }) => {
  return (
    <div className="result-list">
      {results.map((result, id) => {
        return (
          <div key={id}>
            {/* <div className="image-div">{result.imageURL}</div> */}
            <div
              className="name-div"
              onClick={(e) => alert(`You clicked on ${result.name}`)}
            >
              {result.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
