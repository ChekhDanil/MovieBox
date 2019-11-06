import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import defaultImg from "./default_img.png";

const MovieCardImage = ({ id, path, year }) => {
  return (
    <div className="movie__img">
      <Link to={`/movie/${id}`}>
        {path ? (
          <img
            src={`http://image.tmdb.org/t/p/w500${path}`}
            /** Review: если это не шаблонная строка - делай просто строку в пропсах, без скобочек **/
            alt={"movie_image"}
          />
        ) : (
          <img src={defaultImg} width={500} alt="image_not_found" />
        )}
      </Link>
      <span className="movie__year">{year}</span>
    </div>
  );
};
MovieCardImage.propTypes = {
  id: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};

export default MovieCardImage;
