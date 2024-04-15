import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/Notes/NoteList";
import SearchBar from "../components/SearchBar";
import { getArchivedNotes, deleteNote } from "../utils/local-data";
import NoteListEmpty from "../components/Notes/NoteListEmpty";

function ArchivPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onUpdateArchive = this.onUpdateArchive.bind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onUpdateArchive(id) {
    const notes = this.state.notes;
    const indexData = notes.findIndex((note) => note.id === id);

    if (notes[indexData].archived) {
      notes[indexData].archived = false;
      this.setState({ notes: notes });
    } else {
      notes[indexData].archived = true;
      this.setState({ notes: notes });
    }
  }

  onAddNoteHandler(data) {
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, data],
      };
    });
  }
  
  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      }
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <section className="archive-page">
        <h2>Catatan Arsip</h2>
        <section className="search-bar">
          <SearchBar
            keyword={this.state.keyword}
            keywordChange={this.onKeywordChangeHandler}
          />
        </section>
        <section className="notes-list-empty">
          {filteredNotes.length > 0 ? (
            <NoteList
              notes={filteredNotes}
              onDelete={this.onDeleteHandler}
              onUpdate={this.onUpdateArchive}
            />
          ) : (
            <NoteListEmpty />
          )}
        </section>
      </section>
    );
  }
}

export default ArchivPageWrapper;