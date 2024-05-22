const questions = [
    ...Array.from({ length: 12 }, (_, i) => `Driver ${i + 1}/12`),
    ...Array.from({ length: 2 }, (_, i) => `3 Wood ${i + 1}/2`),
    ...Array.from({ length: 2 }, (_, i) => `5 Wood/Hybrid ${i + 1}/2`),
    ...Array.from({ length: 2 }, (_, i) => `4 Iron ${i + 1}/2`),
    ...Array.from({ length: 5 }, (_, i) => `5 Iron ${i + 1}/5`),
    ...Array.from({ length: 5 }, (_, i) => `6 Iron ${i + 1}/5`),
    ...Array.from({ length: 6 }, (_, i) => `7 Iron ${i + 1}/6`),
    ...Array.from({ length: 2 }, (_, i) => `8 Iron ${i + 1}/2`),
    ...Array.from({ length: 2 }, (_, i) => `9 Iron ${i + 1}/2`),
    ...Array.from({ length: 3 }, (_, i) => `Pitching Wedge ${i + 1}/3`),
    ...Array.from({ length: 2 }, (_, i) => `Approach/Sand Wedge ${i + 1}/2`),
    ...Array.from({ length: 2 }, (_, i) => `Lob Wedge ${i + 1}/2`),
    ...Array.from({ length: 27 }, (_, i) => `Putter ${i + 1}/27`)
];

const scores = {
    A: [0, 0, 0, 0],
    B: [0.33, 0.25, 0.36, 0.5],
    C: [0.67, 0.375, 0.64, 1.0],
    D: [1.0, 1.0, 1.0, 1.5]
};

function generateQuiz() {
    const quizContainer = document.getElementById('quiz');
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${question}</p>`;
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        ['A', 'B', 'C', 'D'].forEach((option) => {
            const button = document.createElement('button');
            button.innerText = `${option}. ${getOptionText(option)}`;
            button.setAttribute('data-question-index', index);
            button.setAttribute('data-option', option);
            button.onclick = () => selectOption(button);
            optionsDiv.appendChild(button);
        });
        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

function getOptionText(option) {
    switch (option) {
        case 'A': return 'Good';
        case 'B': return 'Short/Long';
        case 'C': return 'Waggle';
        case 'D': return 'Pooch/OB';
    }
}

function selectOption(button) {
    const index = button.getAttribute('data-question-index');
    const options = document.querySelectorAll(`[data-question-index="${index}"]`);
    options.forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    
    const nextQuestion = document.querySelector(`.question:nth-child(${index + 2})`);
    if (nextQuestion) {
        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function submitQuiz() {
    let totalScore = 0;
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`.options [data-question-index="${index}"].selected`);
        if (selectedOption) {
            const option = selectedOption.getAttribute('data-option');
            const scoreIndex = getScoreIndex(index + 1);
            totalScore += scores[option][scoreIndex];
        }
    });

    const eighteenHoleScore = Math.round(totalScore) + 72;
    const nineHoleScore = Math.round(totalScore / 2) + 36;

    const resultPopup = document.getElementById('result-popup');
    resultPopup.innerHTML = `
        <p>18 Hole Score: ${eighteenHoleScore}</p>
        <p>9 Hole Score: ${nineHoleScore}</p>
    `;
    resultPopup.style.display = 'block';
}

function getScoreIndex(questionNumber) {
    if (questionNumber <= 18) return 0;
    if (questionNumber <= 34) return 1;
    if (questionNumber <= 45) return 2;
    return 3;
}

generateQuiz();
