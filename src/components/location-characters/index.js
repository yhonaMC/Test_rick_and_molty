import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./location-characters.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function LocationCharacters(props) {
  const [locationCharacterData, setLocationCharacterData] = useState(null);

  const getCharacterId = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/character/${props.id}`);
      setLocationCharacterData(data);
    } catch (e) {
      console.log(e);
    }
  }, [props.id]);

  useEffect(() => {
    getCharacterId();
  }, [getCharacterId]);

  return (
    locationCharacterData && (
      <Link
        className="location-resident"
        to={`/character/${locationCharacterData.id}`}
        key={locationCharacterData.id}
      >
        <div key={locationCharacterData.id} className="resident">
          <div
            className={
              "location-resident-image resident-" +
              locationCharacterData.status.toLowerCase()
            }
          >
            <div className="resident-status-tag">
              {locationCharacterData.status.toUpperCase()}
            </div>
            <img
              className="resident-image"
              alt="resident"
              src={locationCharacterData.image}
            />
          </div>
          <div className="location-resident-name">
            {locationCharacterData.name}
          </div>
          <p className="more-info">Click to see more information &#8599;</p>
        </div>
      </Link>
    )
  );
}

export default LocationCharacters;
