// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { getQuote } from './quoteService';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [quote, setQuote] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    const fetchedQuote = await getQuote();
    setQuote(fetchedQuote);
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const existingNoteIndex = notes.findIndex((note) => note.text === newNote);

      if (existingNoteIndex !== -1) {
        // If note already exists, update tags and set updatedAt
        const updatedNotes = [...notes];
        updatedNotes[existingNoteIndex].tags = [...updatedNotes[existingNoteIndex].tags, ...tags];
        updatedNotes[existingNoteIndex].updatedAt = new Date().toLocaleString();
        setNotes(updatedNotes);
      } else {
        // If note doesn't exist, add a new note with creation time
        setNotes((prevNotes) => [
          ...prevNotes,
          { text: newNote, color: selectedColor, quote: quote, tags: [...tags], createdAt: new Date().toLocaleString(), updatedAt: null, editable: false },
        ]);
      }

      setNewNote('');
      setTags([]); // Clear tags after adding a note
      fetchQuote(); // Fetch a new quote after adding a note
    }
  };

  const editNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].editable = !updatedNotes[index].editable;
    updatedNotes[index].updatedAt = new Date().toLocaleString();
    setNotes(updatedNotes);
  };

  const saveNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].editable = false;
    updatedNotes[index].updatedAt = new Date().toLocaleString();
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const filterNotesByTag = () => {
    if (selectedTag === 'all') {
      return notes;
    } else {
      return notes.filter((note) => note.tags.includes(selectedTag));
    }
  };

  return (
    <div className="App">
      <h1>Quick Notes</h1>

      {/* Color selection dropdown */}
      <label htmlFor="colorSelect">Select Note Color:</label>
      <select
        id="colorSelect"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
      </select>

      {/* Input field to add a new note */}
      <div className="new-note-container">
        <textarea
          id="newNote"
          value={newNote}
          placeholder={`"${quote}"`}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <div className="tag-container">
          <label htmlFor="tagInput">Add Tag:</label>
          <input
            type="text"
            id="tagInput"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(','))}
          />
        </div>
        <button onClick={addNote}>{notes.findIndex((note) => note.text === newNote) !== -1 ? 'Update Tags' : 'Add Note'}</button>
      </div>

      {/* Tags and Filter */}
      <div className="tag-container">
        <label htmlFor="tagSelect">Filter by Tag:</label>
        <select
          id="tagSelect"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="all">All</option>
          {Array.from(new Set(notes.flatMap(note => note.tags))).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Displaying existing notes */}
      <div>
        {filterNotesByTag().map((note, index) => (
          <div
            key={index}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            <textarea
              readOnly={!note.editable}
              value={note.text}
              onChange={(e) => {
                const updatedNotes = [...notes];
                updatedNotes[index].text = e.target.value;
                updatedNotes[index].updatedAt = new Date().toLocaleString();
                setNotes(updatedNotes);
              }}
            ></textarea>
            <p className="quote">{note.quote}</p>
            {!note.editable && <p className="created-at">Created at: {note.createdAt}</p>}
            {note.updatedAt && !note.editable && <p className="updated-at">Last Updated at: {note.updatedAt}</p>}
            {note.updatedAt && note.editable && <p className="updated-at">Last Updated at: {note.updatedAt}</p>}
            <div className="tag-container">
              <label htmlFor="tagInput">Tags:</label>
              <input
                type="text"
                id="tagInput"
                value={note.tags}
                readOnly
              />
            </div>
            <button onClick={() => (note.editable ? saveNote(index) : editNote(index))}>
              {note.editable ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
