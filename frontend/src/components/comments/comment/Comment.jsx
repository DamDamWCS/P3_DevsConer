/* eslint-disable react/require-default-props */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../../services/context/TokenContext";
import DeleteItem from "../../deleteItem/DeleteItem";
import ModifyComment from "../modifyComment/ModifyComment";

function Comment({ comment, reload, setReload, onCommentDeleted }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyComment, setShowModifyComment] = useState(false);
  const { user } = useContext(TokenContext);

  const handleModifyCommentClick = () => {
    setShowModifyComment(true);
  };

  return (
    <div className="">
      <div className="d-flex align-items-center pb-2">
        {!showModifyComment && (
          <div className="font-weight-bold text-secondary mr-2 m-sm-2 mr-sm-3">
            {comment.first_name.charAt(0).toUpperCase() +
              comment.first_name.slice(1)}
            .{comment.last_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="w-100">
          {!showModifyComment ? (
            <div className="m-1 text-sm text-break overflow-auto">
              {comment.text}
            </div>
          ) : (
            <ModifyComment
              showModifyComment={showModifyComment}
              setShowModifyComment={setShowModifyComment}
              text={comment.text}
              commentId={comment.id}
              setReload={setReload}
              reload={reload}
            />
          )}
        </div>
      </div>
      {user && !showModifyComment && (
        <div className="d-flex flex-row justify-content-end px-sm-3 pb-1  pb-sm-3">
          {comment.user_id === user.id || user.role === "admin" ? (
            <>
              <button
                type="submit"
                className="btn btn-danger btn-sm text-white mb-1 mb-sm-0"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                supprimer
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm text-white mb-1 ml-3 mb-sm-0"
                onClick={handleModifyCommentClick}
              >
                modifier
              </button>
            </>
          ) : null}
        </div>
      )}

      <DeleteItem
        itemId={comment.id}
        itemName="comment"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onItemDeleted={onCommentDeleted}
      />
    </div>
  );
}

export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    answer_id: PropTypes.number,
    created_at: PropTypes.string,
    first_name: PropTypes.string,
    id: PropTypes.number,
    last_name: PropTypes.string,
    text: PropTypes.string,
    update_at: PropTypes.string,
    user_id: PropTypes.number,
  }).isRequired,
  reload: PropTypes.bool,
  setReload: PropTypes.func,
  onCommentDeleted: PropTypes.func,
};
