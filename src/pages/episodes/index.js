import React, { useCallback, useEffect, useState } from "react";
import EpisodesList from "../../components/episodes-list";
import NoResults from "../../components/no-results";
import GoBackButton from "../../components/goBackButton";
import { Pagination } from "@mui/material";
import "./episodes.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function Episodes() {
  const [episodesData, setEpisodesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function handleEpisodesPage(e) {
    setCurrentPage(Number.parseInt(e.target.innerHTML.split("<")[0]));
  }

  const getEpisodies = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/episode/?page=${currentPage}`
      );
      setEpisodesData(data);
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  useEffect(() => {
    getEpisodies();
  }, [getEpisodies]);

  return (
    <div className="episodes">
      <GoBackButton />
      {episodesData && episodesData.results ? (
        <>
          <EpisodesList episodes={episodesData} />
          <Pagination
            className="pagination"
            count={episodesData.info.pages}
            size="large"
            color="primary"
            hidePrevButton
            hideNextButton
            siblingCount={1}
            boundaryCount={1}
            page={currentPage}
            onChange={handleEpisodesPage}
          />
        </>
      ) : (
        <>
          <NoResults showBackButton={false} />
          <Pagination
            className="container pagination"
            count={1}
            size="large"
            color="primary"
            hidePrevButton
            hideNextButton
            siblingCount={2}
            boundaryCount={1}
            page={1}
            disabled
          />
        </>
      )}
    </div>
  );
}

export default Episodes;
