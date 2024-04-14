import React from "react";
import PropTypes from 'prop-types';
import NoteItemContent from "./NoteItemContent";
import NoteItemAction from "./NoteItemAction";
import { addNote } from "../../utils/local-data";

function NoteItem({ title, body, id, createdAt, onDelete, onUpdate }) {
  return (
    <div className="note-item">
      <NoteItemContent
        title={title}
        body={body}
        date={addNote(createdAt)}
      />
      <NoteItemAction id={id} onDelete={onDelete} onUpdate={onUpdate} />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

export default NoteItem;
