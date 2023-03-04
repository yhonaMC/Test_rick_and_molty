import React from "react";
import { Link } from "react-router-dom";
import "./locations-list.scss";

function LocationsList({ locations }) {
  return (
    <div className="locations-component">
      <div className="locations-row row">
        {locations &&
          locations.results.map(({ id, name, type, dimension }) => (
            <Link
              to={`/location/${id}`}
              key={id}
              className="location-col col-xs-6 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="location">
                <div className="name-tag">{name.toUpperCase()}</div>
                <div className="information">
                  <p>Type: {type}</p>
                  <p>Dimension: {dimension}</p>
                </div>
                <p className="more-info">
                  Click to see more information &#8599;
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default LocationsList;
