import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationCharacters from "../../components/location-characters";
import GoBackButton from "../../components/goBackButton";
import "./episode.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function Episode() {
  const episode = useParams();
  const [singleEpisodeData, setSingleEpisodeData] = useState(null);
  const navigate = useNavigate();

  const getLocationsId = useCallback(async () => {
    try {
      const data = await axios.get(`${API_URL}/episode/${episode.id}`);
      if (data.status === 200) {
        setSingleEpisodeData(data.data);
      } else {
        navigate("/episodes");
      }
    } catch (e) {
      console.log(e);
    }
  }, [episode.id, navigate]);

  useEffect(() => {
    getLocationsId();
  }, [getLocationsId]);

  return (
    <div className="episode">
      <GoBackButton />
      {singleEpisodeData && (
        <div className="episode-data">
          <div className="episode-data-row row">
            <div className="episode-information col-lg-9">
              <p className="episode-name">
                {singleEpisodeData.episode + ": " + singleEpisodeData.name}
              </p>
              <p>Air date: {singleEpisodeData.air_date}</p>
            </div>
          </div>
          {singleEpisodeData &&
          singleEpisodeData.characters &&
          singleEpisodeData.characters.length === 0 ? (
            <div className="episode-characters-section row">
              <div className="episode-character-section-title">
                There are no results for characters in '{singleEpisodeData.name}
                '
              </div>
            </div>
          ) : (
            <div className="episode-characters-section row">
              <div className="episode-character-section-title">
                Characters in '
                {singleEpisodeData.episode + " " + singleEpisodeData.name}':
              </div>
              {singleEpisodeData.characters &&
                singleEpisodeData.characters.map(function (character) {
                  const characterId = character.split("/")[5];
                  return (
                    <div
                      key={"character-" + characterId}
                      className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <LocationCharacters id={characterId} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Episode;
