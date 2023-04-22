import PropTypes from "prop-types";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./SearchFilter.css";

function MultiSelected({
  searchValue,
  setSearchValue,
  options,
  setOptions,
  selectedValue,
  setSelectedValue,
}) {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((tags) => {
        const optionsTags = tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }));
        setOptions(optionsTags);
      });
  }, []);

  return (
    <div className="p-3 rounded multiSelect mx-1 my-3">
      <h2>Languages</h2>
      {options ? (
        <MultiSelect
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          labelledBy="Select"
        />
      ) : (
        <div>chargement ...</div>
      )}
      <div className="pt-2">
        <label htmlFor="Search">Rechercher :</label>
        <div className="form-control-container has-right-icon">
          <input
            type=""
            className="form-control bg-white border "
            id="inputIcon2"
            title="Example for auto-completion"
            placeholder="Rechercher un titre de sujet..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="form-control-state" />
          <span className="form-control-icon">
            <i className="icons-search" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default MultiSelected;

MultiSelected.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  setOptions: PropTypes.func.isRequired,
  selectedValue: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  setSelectedValue: PropTypes.func.isRequired,
};
