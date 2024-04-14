import React from "react";
import PropTypes from 'prop-types';
import { HiCheck } from "react-icons/hi";

class NoteInput extends React.Component {
  state = {
    id: Date.now(),
    title: "",
    body: "",
    archived: false,
    createdAt: Date.now(),
  };

  handleTitleChange = (event) => {
    const title = event.target.value.slice(0, 40);
    this.setState({ title });
  };

  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = this.state;

    if (!title || !body) {
      alert("Judul dan catatan harus diisi");
      return;
    }

    this.props.addNote({
      ...this.state,
      id: Date.now(),
      createdAt: Date.now(),
    });
  };

  render() {
    return (
      <form className="note-input" onSubmit={this.handleSubmit}>
        <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan Rahasia"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        </div>
        
        <div className="add-new-page__input__body">
        <input
          placeholder="Sebenarnya saya adalah ..."
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        </div>
        <div className="add-new-page__action">
          <button
           className="action"
           type="button"
           title="Simpan">
            <HiCheck />
           </button>
        </div>
        
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;
