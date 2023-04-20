import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import "./MultiSelected.css";

function NewMultiSelected({ options, selectedValue, setSelectedValue }) {
  return (
    <form className="was-validated ">
      <div className="">
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
    </form>
  );
}

export default NewMultiSelected;

NewMultiSelected.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  selectedValue: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  setSelectedValue: PropTypes.func.isRequired,
};
