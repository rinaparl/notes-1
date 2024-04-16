import React from "react";
import PropTypes, { func } from 'prop-types'; 
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/Notes/NoteList";
import SearchBar from "../components/SearchBar";
import { getAllNotes, getActiveNotes, getArchivedNotes } from "../utils/local-data";
import NavAdd from "../components/layout/NavAdd";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      isArchive: getActiveNotes(),
      isArchived: false,
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onUpdateArchive = this.onUpdateArchive.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    
  }

  componentDidMount() {
    this.loadNotes(); 
  }

  loadNotes() {
    const notes = this.state.isArchivedVisible ? getArchivedNotes() : getAllNotes(); // Memuat catatan yang sesuai dengan status isArchivedVisible
    this.setState({ notes });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onUpdateArchive = (id) => {
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
  
  onAddNoteHandler = (data) => {
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

  toggleArchivedVisibility() {
    this.setState(
      (prevState) => ({ isArchivedVisible: !prevState.isArchivedVisible }),
      () => {
        this.loadNotes(); 
      }
    );
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    function ArchiveNote(bool) {
      const filteredNotes = data.filter(
        (item) =>
          item.archived === bool &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredNotes;
    }

    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <section className="search-bar">
          <SearchBar
            keyword={this.state.keyword}
            keywordChange={this.onKeywordChangeHandler}
          />
        </section>
        <section>
          <NoteList 
          notes={notes} 
          onDelete={this.onDeleteHandler}
          onUpdate={this.onUpdateArchive}
          />
        </section>
        <div className="homepage__action">
          <NavAdd />
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  keyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;