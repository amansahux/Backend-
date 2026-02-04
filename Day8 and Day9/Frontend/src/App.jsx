import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://notes-tasks.onrender.com/api/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data.note);
    } catch (err) {
      setError("Failed to fetch notes", err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      await axios.post(API_URL, { title, description });
      setSuccess("Note created successfully");
      e.target.reset();
      fetchNotes();
    } catch (err) {
      setError("Failed to create note", err.message);
    }
  };

  // DELETE NOTE
  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    try {
      await axios.delete(`${API_URL}/${id}`);
      // setNotes((prev) => prev.filter((n) => n._id !== id));
      setSuccess("Note deleted");
      fetchNotes();
    } catch (err) {
      setError("Failed to delete note", err.messsage);
    }
  };
  // HandleUbdate
  const HandleUbdate = async (id) => {
    try {
      const newDesc = prompt("Enter new Description");
      axios
        .patch(`${API_URL}/${id}`, {
          description: newDesc,
        })
        .then((res) => {
          console.log(res);
          fetchNotes();
          setSuccess("Note ubdated successfully");
        });
    } catch (err) {
      setError("Failed to Ubdate Not", err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      {/* FORM */}
      <form onSubmit={handleSubmit} className="note-create-form">
        <h2>Create Note</h2>

        <input type="text" name="title" placeholder="Title" />
        <textarea name="description" placeholder="Description"></textarea>

        <button type="submit">Add Note</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      {/* NOTES */}
      <div className="notes">
        {loading && <p className="info">Loading notes...</p>}

        {!loading && notes.length === 0 && (
          <p className="info">No notes yet. Create one 👆</p>
        )}

        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <div className="note-header">
              <h3 className="note-title">{note.title}</h3>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                ✕
              </button>
              <button
                onClick={() => {
                  HandleUbdate(note._id);
                }}
              >
                Edit Description
              </button>
            </div>

            <p className="note-description">{note.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
