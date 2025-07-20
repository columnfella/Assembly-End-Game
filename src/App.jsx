import { languages } from "./languages"
import { useState } from "react"
import { useWindowSize } from 'react-use'
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./utils.js"
import Confetti from "react-confetti"

function App() {
	//state values
	const [currentWord, setCurrentWord] = useState(() => getRandomWord())
	const [guessedLetters, setGuessedLetters] = useState([])
	//derived values
	const numGuessesLeft = languages.length - 1
	const wrongGuessesCount = guessedLetters.filter((char)=>!currentWord.split('').includes(char)).length
	const isGameWon = currentWord.split('').every((char)=>guessedLetters.includes(char))
	const isGameLost = wrongGuessesCount >= numGuessesLeft
	const isGameOver = isGameWon || isGameLost
	const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    console.log(isLastGuessIncorrect)
	// Static values
	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	//other values
	const { width, height } = useWindowSize()

	const keyEls = alphabet.split('').map((letter) => {
		const isGuessed = guessedLetters.includes(letter)
		const isRight = isGuessed && currentWord.includes(letter)
		const isWrong = isGuessed && !currentWord.includes(letter)

		const buttonClass = clsx(
			"key-element",
			isRight && "right-guess-button",
			isWrong && "wrong-guess-button",
		)

		return (
			<button
				className={buttonClass}
				onClick={() => handleRightOrWrong(letter)}
				key={letter}
				disabled={isGameOver}
				aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
			>
				{letter.toUpperCase()}
			</button>
		)
	})

	if(isGameOver) {

	}

	console.log(guessedLetters)

	function addGuessedLetter(letter) {
		setGuessedLetters((prevLetters) =>
			prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
		)
	}

	function handleRightOrWrong(char) {
		addGuessedLetter(char)
	}

	const languageEls = languages.map((lang, index) => (
		<span
			key={lang.name}
			className={clsx(
				"language",
				index < wrongGuessesCount && "lost"
			)}
			style={{ color: lang.color, backgroundColor: lang.backgroundColor }}
		>
			{lang.name}
		</span>
	))
	const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
		farewell: !isGameOver && isLastGuessIncorrect
    })

	const lettersDisplayedEls = currentWord
		.split('')
		.map((char, index) => {
		const styles = clsx("guessed", {
			showed: isGameLost && !guessedLetters.includes(char)
		})

		return <span className={styles} key={index}>{guessedLetters.includes(char) || isGameOver? char.toUpperCase(): ""}</span>
	})

	function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p 
                    className="farewell-message"
                >
                    {getFarewellText(languages[wrongGuessesCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>better start learning x86 lil vro 🥀🥀🥀</p>
                </>
            )
        }
        
        return null
    }

	function resetGame() {
		setCurrentWord(getRandomWord())
		setGuessedLetters([])
	}

	return (
		<main>
			{isGameWon && <Confetti recycle={false} numberOfPieces={1000} gravity={0.3} initialVelocityY={{min:15, max:20}} width={width} height={height}/>}
			<header>
				<h1>Assembly: End Game</h1>
				<p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
			</header>
			<section aria-live="polite" role="status"  className={gameStatusClass}>{renderGameStatus()}</section>
			<section className="languages-container">{languageEls}</section>
			<section className="wordguess-container">{lettersDisplayedEls}</section>
			<section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
				<p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            </section>
			<section className="keyboard">{keyEls}</section>
			{isGameOver && <button onClick={resetGame} className="new-game">New Game</button>}
		</main>
	)
}

export default App
