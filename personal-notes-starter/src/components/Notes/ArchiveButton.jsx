import React from "react";
import PropTypes from 'prop-types';

function ArchiveButton({ id, onUpdate }) {
  return (
    <button className="note-item__archive-button" onClick={() => onUpdate(id)}>
      Arsipkan
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default ArchiveButton;
