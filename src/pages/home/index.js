import React from 'react';
import { Link } from 'react-router-dom';
import ListOptionCharacter from "../../assets/images/list-option-characters.jpg";
import ListOptionLocations from "../../assets/images/list-option-locations.jpg";
import ListOptionEpisodes from "../../assets/images/list-option-episodes.jpg";
import './home.scss';

function Home() {

  return (
    <div className="home">
      <div className="row">
        <Link className="options-col characters-option col-xs-12 col-sm-12 col-md-4 col-lg-4" to={'/characters'}>
          <div className="list-option">
            <div className="description-tag">
              CHARACTERS
            </div>
            <div className="image">
              <img className="list-option-img" src={ListOptionCharacter} alt="list-option-characters" />
            </div>
            <div className="information">
              View all characters &#8599;
            </div>
          </div>
        </Link>
        <Link className="options-col locations-option col-xs-12 col-sm-12 col-md-4 col-lg-4" to={'/locations'}>
          <div className="list-option">
            <div className="description-tag">
              LOCATIONS
            </div>
            <div className="image">
              <img className="list-option-img" src={ListOptionLocations} alt="list-options-locations" />
            </div>
            <div className="information">
              View all locations &#8599;
            </div>
          </div>
        </Link>
        <Link className="options-col episodes-option col-xs-12 col-sm-12 col-md-4 col-lg-4" to={'/episodes'}>
          <div className="list-option">
            <div className="description-tag">
              EPISODES
            </div>
            <div className="image">
              <img className="list-option-img" src={ListOptionEpisodes} alt="list-options-episodes" />
            </div>
            <div className="information">
              View all episodes &#8599;
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;