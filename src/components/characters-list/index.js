import React from "react";
import { Link } from "react-router-dom";
import "./characters-list.scss";

function CharactersList({ characters }) {
  return (
    <div className="characters-component">
      <div className="character-row row">
        {characters &&
          characters.results.map(
            ({ id, status, name, image, species, gender }) => (
              <Link
                to={`/character/${id}`}
                key={id}
                className="character-col col-xs-12 col-sm-6 col-md-6 col-lg-3"
              >
                <div className={"character character-" + status.toLowerCase()}>
                  <div className={"name-tag name-tag-" + status.toLowerCase()}>
                    {name.toUpperCase()}
                  </div>
                  <div className="image">
                    <div
                      className={
                        "status-tag status-tag-" + status.toLowerCase()
                      }
                    >
                      {status.toUpperCase()}
                    </div>
                    <img className="character-img" alt={name} src={image} />
                  </div>
                  <div className="information">
                    <p>Species: {species}</p>
                    <p>Gender: {gender}</p>
                    <p className="more-info">
                      Click to see more information &#8599;
                    </p>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  );
}

export default CharactersList;
