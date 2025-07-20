import { languages } from "./languages"
import {useState} from "react"

function App() {
	const [currentWord, setCurrentWord] = useState("react")
	const [guessedLetters, setGuessedLetters] = useState([]) 
	const alphabet = "abcdefghijklmnopqrstuvwxyz"

	console.log(guessedLetters)

	function addGuessedLetter(letter) {
		setGuessedLetters((prevLetters) => prevLetters.includes(letter) ? prevLetters:[...prevLetters, letter])
	}

	const languageEls = languages.map((lang)=>
		(<span key={lang.name} className="language" style={{color:lang.color, backgroundColor: lang.backgroundColor}}>{lang.name}</span>))

	const lettersDisplayedEls = currentWord.split('').map((char, index)=>(<span key={index}>{char.toUpperCase()}</span>))

	const keyEls = alphabet.split('').map((char)=>(<button onClick={()=>(addGuessedLetter(char))} key={char}>{char.toUpperCase()}</button>))

	return (
		<main>
			<header>
				<h1>Assembly: End Game</h1>
				<p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
			</header>
			<section className="status-you-win">
				<h2>You Win!</h2>
				<p>Well done! 🎉</p>
			</section>
			<section className="languages-container">
				{languageEls}
			</section>
			<section className="wordguess-container">
				{lettersDisplayedEls}
			</section>
			<section className="keyboard">
				{keyEls}
			</section>
			<button className="new-game">New Game</button>
		</main>
	)
}

export default App
