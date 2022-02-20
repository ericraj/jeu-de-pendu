import React, { useEffect, useState } from "react";
import "./App.css";
import CurrentWord from "./components/CurrentWord";
import Keyboard from "./components/Keyboard";
import Life from "./components/Life";
import Scoring from "./components/Scoring";
import Form from "./components/Form";
import { getUsers, addUser } from "./utils";
import { faker } from "@faker-js/faker";

faker.setLocale("fr");

function App() {
  const initialState = {
    wordCollection: ["wordpress", "gare", "train", "glace", "code", "licorne"],
    currentWord: null,
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase().split(""),
    usedLetters: [],
    win: 0, // 0: neutral | 1: win | -1: lost
    life: null,
    currentUser: { username: "", score: 0 },
    users: getUsers(),
    formErrors: {
      username: ""
    }
  };

  const [
    { currentWord, alphabet, usedLetters, win, life, currentUser, users, formErrors },
    setState
  ] = useState(initialState);

  /* const generateNewWord = () => {
		const randomIndex = Math.floor(Math.random() * wordCollection.length);
		return wordCollection[randomIndex];
	}; */

  // Check Use - if user not exist, stocke user in localstorage
  const checkUser = () => {
    if (currentUser.username.length >= 4) {
      let users = getUsers();
      if (users === null) {
        addUser([currentUser]);
      } else {
        let userExist = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === currentUser.username) {
            userExist = true;
            break;
          }
        }

        if (userExist === false) {
          addUser([...users, currentUser]);
        }
      }
    }
  };

  // Set form error message
  const setFormErrorsMessage = (formErrors, inputName, inputValue) => {
    switch (inputName) {
      case "username":
        formErrors.username = inputValue.length < 4 ? "Minimum 4 charactères requise" : "";
        break;
      default:
        break;
    }
    setState((prevState) => ({ ...prevState, formErrors, [inputName]: inputValue }));
  };

  const initGame = () => {
    console.log("Init Game");
    // let word = generateNewWord().toUpperCase();
    let word = faker.lorem.word().toUpperCase();
    // console.log(word);
    // set form errors
    const inputs = document.querySelectorAll("input");
    if (currentUser.username.length < 4) {
      inputs.forEach((input) => setFormErrorsMessage(formErrors, input.name, input.value));
    } else {
      setState((prevState) => ({
        ...prevState,
        currentWord: word,
        usedLetters: [],
        findedLetters: [],
        win: 0,
        life: word.length * 2,
        users: getUsers()
      }));
      // Check User
      checkUser();
    }
  };

  // Init Game
  useEffect(() => {
    // initGame();
    const eventListener = (e) => {
      if (e.key === "Enter") {
        initGame();
      }
    };
    window.addEventListener("keyup", eventListener);
    return () => {
      window.removeEventListener("keyup", eventListener);
    };
  });

  // Check Game Status
  useEffect(() => {
    // // console.log("Check Game Status");
    // Game win
    if (currentWord !== null && usedLetters.length !== 0) {
      let wordFinded = true;
      for (let i = 0; i < currentWord.length; i++) {
        const letter = currentWord[i];
        if (usedLetters.indexOf(letter) === -1) {
          wordFinded = false;
        }
      }
      if (wordFinded) {
        // console.log("Game Win");
        setState((currentState) => ({ ...currentState, win: 1 }));
      }
    }

    // Game lost
    // Si life est inferieur ou égal à 0 et win est égal à 0 (neutre),
    // Alors on a perdu
    if (life <= 0 && win === 0 && currentWord !== null) {
      // // console.log("Game Over");
      setState((currentState) => ({ ...currentState, win: -1 }));
    }
  }, [currentWord, usedLetters, win, life]);

  // Score
  useEffect(() => {
    if (win === 1) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser.username) {
          users[i].score += life;
          break;
        }
      }
      // console.log("Users apres for", users);
      // Update Users
      addUser(users);
      setState((prevState) => ({ ...prevState, users: users }));
    }
    return () => {
      if (win === -1) {
        setState((prevState) => ({ ...prevState, win: 0 }));
      }
    };
  }, [win, life, currentUser, users]);

  const clickLetter = (letter) => {
    letter = letter.toUpperCase();
    // Si la lettre tapé n'est pas encore dans le usedLetters
    // Alors, on l'ajoute (maj state - usedLetters)
    if (usedLetters.indexOf(letter) === -1) {
      setState((currentState) => ({ ...currentState, usedLetters: [...usedLetters, letter] }));
      // Si la lettre tapé n'est pas dans le currentWorld
      // Alors on décrémente la vie (maj state - life)
      if (currentWord.indexOf(letter) === -1) {
        setState((currentState) => ({ ...currentState, life: currentState.life - 1 }));
      }
    } else {
      // console.log("La lettre déjà tapé");
    }
  };

  const handleChangeInput = (event) => {
    event.persist();
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      currentUser: { username: value, score: prevState.currentUser.score }
    }));
    setFormErrorsMessage(formErrors, name, value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Jeu du Pendu</h1>
        {win === 1 && (
          <h4>
            Yes !!! Bravo <span className="emoji__win">😎😎✌✌</span>
          </h4>
        )}
        {win === -1 && (
          <h4>
            Game Over !!! Loser !!! <span className="emoji__lost">😠😠👇👇</span>
          </h4>
        )}
        {currentWord !== null && <Life life={life} win={win} />}
        {currentWord !== null && (
          <CurrentWord currentWord={currentWord} usedLetters={usedLetters} win={win} />
        )}
        {win === 0 && currentWord !== null && (
          <Keyboard
            alphabet={alphabet}
            clickLetter={clickLetter}
            usedLetters={usedLetters}
            currentWord={currentWord}
          />
        )}

        <Form
          currentWord={currentWord}
          currentUser={currentUser}
          handleChangeInput={handleChangeInput}
          formErrors={formErrors}
        />

        {(currentWord === null || win !== 0) && (
          <button className="btn__new__game" onClick={() => initGame()}>
            {currentWord === null ? "Jouer" : "Novelle partie"}
          </button>
        )}
      </div>

      <Scoring currentUser={currentUser} users={users} />
    </div>
  );
}

export default App;
