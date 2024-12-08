// The correct middle name for Joe Biden
const middleName = "Robinette";
let hiddenName = Array(middleName.length).fill(''); // Start with empty guesses
let remainingGuesses = 5;

// Create the letter boxes when the page loads
window.onload = function() {
    const middleNameContainer = document.getElementById('middle-name');

    middleName.split('').forEach((letter, index) => {
        const letterBox = document.createElement('input'); // Change span to input
        letterBox.className = 'letter-box';
        letterBox.id = `letter-${index}`;
        letterBox.maxLength = 1; // Limit input to one character
        letterBox.style.textTransform = 'uppercase'; // Make input uppercase
        middleNameContainer.appendChild(letterBox);
    });
}

function submitGuess() {
    let guess = '';
    let foundCorrectLetter = false;

    // Iterate over each letter box and build the guess string
    for (let i = 0; i < middleName.length; i++) {
        const letterBox = document.getElementById(`letter-${i}`);
        const letter = letterBox.value.trim().toLowerCase(); // Get user input

        // Append the letter (or empty space if not filled) to the guess
        guess += letter || '_';

        // Check if the guessed letter is correct
        if (letter === middleName[i].toLowerCase()) {
            letterBox.value = middleName[i]; // Display correct letter
            letterBox.classList.add('correct'); // Highlight correct letter
            hiddenName[i] = middleName[i]; // Keep track of correct letters
            foundCorrectLetter = true;
        } else {
            letterBox.value = ''; // Clear the incorrect letter
        }
    }

    // Check if the guess was completely correct
    if (hiddenName.join('') === middleName) {
        alert("Congratulations! You've guessed the middle name correctly.");
        return;
    }

    // Decrease remaining guesses only if no letters were correct
    if (!foundCorrectLetter) {
        remainingGuesses--;
        document.getElementById('remaining').textContent = remainingGuesses;

        // Check if no remaining guesses
        if (remainingGuesses === 0) {
            alert("Game over! The correct middle name was " + middleName);
            revealAllLetters(); // Reveal all letters if the user runs out of guesses
        } else {
            alert("Incorrect guess! Try again.");
        }
    }
}

function revealAllLetters() {
    // Reveal all letters in the middle name
    for (let i = 0; i < middleName.length; i++) {
        const letterBox = document.getElementById(`letter-${i}`);
        letterBox.value = middleName[i];
        letterBox.classList.add('correct');
    }
}