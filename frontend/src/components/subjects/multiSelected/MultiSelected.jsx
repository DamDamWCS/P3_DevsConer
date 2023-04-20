import PropTypes from "prop-types";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./MultiSelected.css";

function MultiSelected({
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
    </div>
  );
}

export default MultiSelected;

MultiSelected.propTypes = {
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
