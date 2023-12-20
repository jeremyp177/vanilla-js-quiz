import './styles.css';

const quizData = [
  {
    question: 'Die Erde ist flach',
    a: 'Ja',
    b: 'Nein',
    correct: 'b'
  },
  {
    question: 'Wie hoch ist der Eiffelturm ohne die Spitze?',
    a: '200 m',
    b: '300 m',
    c: '330 m',
    d: '150 m',
    correct: 'b'
  },
];

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
  const title = document.querySelector('#question');
  const optionContainer = document.querySelector('#options');
  const options = [];
  title.textContent = quizData[currentQuestion].question;
  for (const option of Object.keys(quizData[currentQuestion])) {
    if (option === 'question' || option === 'correct') {
      continue;
    } else {
      const optionElement = document.createElement('li');
      const radio = document.createElement('input');
      radio.setAttribute('id', option);
      radio.setAttribute('type', 'radio');
      radio.setAttribute('name', 'answer');

      const label = document.createElement('label');
      label.setAttribute('for', option);
      label.textContent = quizData[currentQuestion][option];
      optionElement.append(radio, label);
      options.push(optionElement);
    }
  }
  optionContainer.append(...options);
}

loadQuestion();

document.querySelector('.submit').addEventListener('click', (e) => {
  if (currentQuestion === -1) {
    document.querySelector('.submit').textContent = 'Next';
    currentQuestion++;
    loadQuestion();
  } else {
    let selected = false;
    const radios = document.getElementsByName('answer');
    for (const radio of radios) {
      if (radio.checked) {
        answers.push(radio.id);
        selected = true;
      }
    }
    if (selected) {
      currentQuestion++;
      const optionContainer = document.querySelector('#options');
      while (optionContainer.firstChild) {
        optionContainer.firstChild.remove();
      }
      if (currentQuestion === quizData.length) {
        let points = 0;
        answers.forEach((answer, index) => {
          if (answer === quizData[index].correct) {
            points = points + 1;
          }
        });
        const title = document.querySelector('#question');
        title.textContent = `Gratulation! Sie haben ${points} von ${quizData.length} Fragen korrekt beantwortet`;
        currentQuestion = -1;
        answers = [];
        document.querySelector('.submit').textContent = 'Neustart';
      } else {
        loadQuestion();
      }
      selected = false;
    }
  }
});
