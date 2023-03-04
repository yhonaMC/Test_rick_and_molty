import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./character-episode.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function CharacterEpisodes({ episode }) {
  const [characterEpisodeData, setCharacterEpisodeData] = useState(null);

  const getEpisode = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/episode/${episode}`);
      setCharacterEpisodeData(data);
    } catch (e) {
      console.log(e);
    }
  }, [episode]);

  useEffect(() => {
    getEpisode();
  }, [getEpisode]);

  return (
    characterEpisodeData && (
      <Link
        to={`/episode/${characterEpisodeData.id}`}
        className="character-episode"
        href={characterEpisodeData.url}
      >
        <div className="episode">
          <div className="character-episode-title">
            {characterEpisodeData.episode + ": " + characterEpisodeData.name}
          </div>
          <div className="more-info">Complete information &#8599;</div>
          <div className="character-episode-air-date">
            {characterEpisodeData.air_date}
          </div>
        </div>
      </Link>
    )
  );
}

export default CharacterEpisodes;
