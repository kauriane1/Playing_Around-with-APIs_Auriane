async function fetchTrivia() {
  const category = document.getElementById('categorySelect').value;
  const questionBox = document.getElementById('question');
  const answersList = document.getElementById('answers');
  const result = document.getElementById('result');
  result.textContent = "";

  questionBox.textContent = "Loading a fun question...";
  answersList.innerHTML = "";

  try {
    const res = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=easy&type=multiple`);
    const data = await res.json();

    if (data.results.length === 0) {
      questionBox.textContent = "Oops! No question found.";
      return;
    }

    const trivia = data.results[0];
    const correct = decodeHTML(trivia.correct_answer);
    const allAnswers = [...trivia.incorrect_answers.map(decodeHTML), correct].sort(() => 0.5 - Math.random());

    questionBox.innerHTML = decodeHTML(trivia.question);

    allAnswers.forEach(answer => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.onclick = () => {
        const isCorrect = answer === correct;
        result.textContent = isCorrect
          ? ";) Correct! Great job!"
          : `:( Oops! The right answer was "${correct}".`;
        selectAnswer(li, isCorrect);
      };
      answersList.appendChild(li);
    });

  } catch (error) {
    questionBox.textContent = "Something went wrong. Please try again later.";
    console.error("API Error:", error);
  }
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Main decision function
function selectAnswer(element, isCorrect) {
  if (isCorrect) {
    showCorrectFeedback(element);
  } else {
    showWrongFeedback(element);
  }
}

// Correct Answer Feedback
function showCorrectFeedback(element) {
  element.classList.add('correct-answer');
  triggerConfetti();
}

// Wrong Answer Feedback with overlay
function showWrongFeedback(element) {
  element.classList.add('wrong-answer');

  // Dark overlay
  const wrongOverlay = document.createElement('div');
  wrongOverlay.className = 'wrong-overlay';
  document.body.appendChild(wrongOverlay);

  // Text feedback
  const wrongText = document.createElement('div');
  wrongText.className = 'wrong-text';
  wrongText.textContent = '❌ TRY AGAIN! ❌';
  document.body.appendChild(wrongText);

  createStormEffect();

  // Clean up
  setTimeout(() => {
    wrongOverlay.remove();
    wrongText.remove();
  }, 2000);
}

// 🎉 Trigger multiple effects for fun
function triggerConfetti() {
  createConfetti();
  createFireworks();
}

// 🎇 Confetti burst
function createConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });
}

// ✨ Fireworks burst
function createFireworks() {
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.5 }
  });
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.5 }
  });
}

// Storm effect
function createStormEffect() {
  const storm = document.createElement('div');
  storm.className = 'storm-effect';
  document.body.appendChild(storm);
}