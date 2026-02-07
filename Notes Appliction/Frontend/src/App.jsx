import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [allCards, setAllCards] = useState([]);

  const API_URL = "http://localhost:3000/api/card";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profilePic = e.target.profilePic.value.trim();
      const name = e.target.name.value.trim();
      const bio = e.target.bio.value.trim();

      if (!profilePic || !name || !bio) {
        alert("All fields are required");
        return;
      }
      const newCard = { profilePic, name, bio };
      await axios.post(API_URL, newCard);
      FetchCards();

      e.target.reset();
    } catch (error) {
      console.log("❌ Card Create Failed");

      if (error.response) {
        console.log("Status Code:", error.response.status);
        console.log("Backend Message:", error.response.data.message);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const FetchCards = async () => {
    try {
      const res = await axios.get(API_URL);
      setAllCards(res.data.cards);
    } catch (error) {
      console.log("❌ Failed to fetch cards");

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Message:", error.response.data.message);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      FetchCards();
    } catch (error) {
      console.log("❌ Delete Failed");

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Message:", error.response.data.message);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    FetchCards();
  }, []);

  return (
    <div className="page">
      {/* FORM */}
      <div className="formBox">
        <h2 className="heading">Create Profile Card</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="profilePic"
            placeholder="Image URL"
            className="input"
          />

          <input type="text" name="name" placeholder="Name" className="input" />

          <textarea
            name="bio"
            placeholder="Bio"
            rows="3"
            className="textarea"
          ></textarea>

          <button type="submit" className="button">
            Add Card
          </button>
        </form>
      </div>

      {/* CARDS */}
      <div className="cardsSection">
        {allCards.length === 0 ? (
          <p className="empty">No cards yet. Create one above 👆</p>
        ) : (
          allCards.map((card) => (
            <div key={card.id} className="card">
              <div className="card-img">
                <img src={card.profilePic} alt={card.name} />
              </div>

              <div className="card-content">
                <h3 className="cardName">
                  {card.name}
                  <span className="badge">✔</span>
                </h3>

                <p className="cardBio">{card.bio}</p>

                {/* Stats */}
                <div className="card-stats">
                  <div className="stat">
                    <span>👥</span>
                    <p>{Math.floor(Math.random() * 300)}</p>
                  </div>

                  <div className="stat">
                    <span>💾</span>
                    <p>{Math.floor(Math.random() * 100)}</p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    deleteCard(card._id);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
