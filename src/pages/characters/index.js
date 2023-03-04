import React, { useCallback, useEffect, useState } from "react";
import CharactersList from "../../components/characters-list";
import Filter from "../../components/filter";
import NoResults from "../../components/no-results";
import GoBackButton from "../../components/goBackButton";
import { Pagination } from "@mui/material";
import "./characters.scss";
import axios from "axios";
import { API_URL } from "../../API/api";

function Characters() {
  const [characterData, setCharacterData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const handlePage = (e) => {
    setCurrentPage(Number.parseInt(e.target.innerHTML.split("<")[0]));
  };

  const handleFilters = () => {
    setCurrentPage(1);
    setNameFilter(document.getElementById("character-name").value);
    setStatusFilter(document.getElementById("character-status").value);
    setSpeciesFilter(document.getElementById("character-species").value);
    setGenderFilter(document.getElementById("character-gender").value);
  };

  const clearAllFilters = () => {
    let name = document.getElementById("character-name");
    name.value = "";
    let status = document.getElementById("character-status");
    status.value = "";
    let specie = document.getElementById("character-species");
    specie.value = "";
    let gender = document.getElementById("character-gender");
    gender.value = "";
    setNameFilter("");
    setStatusFilter("");
    setSpeciesFilter("");
    setGenderFilter("");
  };

  const getCharacter = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/character/?page=${currentPage}&name=${nameFilter}&status=${statusFilter}&species=${speciesFilter}&gender=${genderFilter}`
      );
      setCharacterData(data);
    } catch (e) {
      console.log(e);
    }
  }, [speciesFilter, currentPage, genderFilter, nameFilter, statusFilter]);

  useEffect(() => {
    getCharacter();
  }, [getCharacter]);

  return (
    <div className="characters">
      <GoBackButton />
      <Filter handleFilters={handleFilters} clearAllFilters={clearAllFilters} />
      {characterData && characterData.results ? (
        <>
          <CharactersList characters={characterData} />
          <Pagination
            className="pagination"
            count={characterData.info.pages}
            size="large"
            color="primary"
            hidePrevButton
            hideNextButton
            siblingCount={1}
            boundaryCount={1}
            page={currentPage}
            onChange={handlePage}
          />
        </>
      ) : (
        <>
          <NoResults clearAllFilters={clearAllFilters} showBackButton={true} />
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

export default Characters;
