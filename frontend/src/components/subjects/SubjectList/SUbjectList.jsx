/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import "./SubjectList.css";
import { Link } from "react-router-dom";

function SubjectList({ subject }) {
  return (
    <Link to={`/subject/${subject.id}`}>
      <div className="d-flex mx-1 p-2 my-3 subjectList rounded align-items-center">
        <div className="p-1 ">
          <i
            className="icons-document2 icons-size-50px d-none d-sm-block"
            aria-hidden="true"
          />
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between  flex-wrap align-items-start mt-1">
            <div className="d-flex flex-wrap align-items-center">
              <div className="font-weight-bold text-secondary mr-2">
                {subject.title}
              </div>
              {subject.tags
                .filter((tag, index) => subject.tags.indexOf(tag) === index)
                .map((tag, index) => (
                  <div
                    key={index}
                    className="d-inline bg-primary text-white rounded px-2 py-1 mr-1 tags"
                  >
                    {tag}
                  </div>
                ))}
              {subject.status_resolve === 1 && (
                <div className="d-inline bg-success text-white rounded px-2 py-1 mr-1 tags">
                  Clos
                </div>
              )}
            </div>

            <div className="p-1 px-sm-2 flex-grow-1 text-right font-weight-bold text-sm ">
              {subject.answer_count} réponse{subject.answer_count > 1 && "s"}
            </div>
          </div>
          <div className="m-1  text-sm text-break overflow-auto">
            {subject.text.slice(0, 250)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SubjectList;
SubjectList.propTypes = {
  subject: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,

    title: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
    answer_count: PropTypes.number,
    status_resolve: PropTypes.number,
  }).isRequired,
};
