import React, { useCallback, useEffect, useState } from "react";
import LocationsList from "../../components/locations-list";
import NoResults from "../../components/no-results";
import GoBackButton from "../../components/goBackButton";
import { Pagination } from "@mui/material";
import "./locations.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function Locations() {
  const [locationsData, setLocationsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function handleLocationsPage(e) {
    setCurrentPage(Number.parseInt(e.target.innerHTML.split("<")[0]));
  }

  const getLocations = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/location/?page=${currentPage}`
      );
      setLocationsData(data);
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <div className="locations">
      <GoBackButton />
      {locationsData && locationsData.results ? (
        <>
          <LocationsList locations={locationsData} />
          <Pagination
            className="pagination"
            count={locationsData.info.pages}
            size="large"
            color="primary"
            hidePrevButton
            hideNextButton
            siblingCount={1}
            boundaryCount={1}
            page={currentPage}
            onChange={handleLocationsPage}
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

export default Locations;
