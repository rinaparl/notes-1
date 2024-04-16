import React from "react";
import PropTypes from 'prop-types';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import HomePageWrapper from "./HomePage";


function NoteDetailPage({
  archived, handleArchived, handleDelete
}) {
  return (
    <HomePageWrapper page="detail-page">
      <>
        <button 
        className="action" 
        type="button"
        title={archived ? 'Aktifkan' : 'Arsipkan'}
        onClick={() => handleArchived()}
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>

        <button
        className="action"
        type="button"
        title="Hapus"
        onClick={() => handleDelete()}
        >
          <HiOutlineTrash />
        </button>
      </>
    </HomePageWrapper>
  )
    }

    NoteDetailPage.propTypes = {
      archived: PropTypes.bool.isRequired,
      handleArchived: PropTypes.func.isRequired,
      handleDelete: PropTypes.func.isRequired
    }

export default NoteDetailPage;
