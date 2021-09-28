// Functions
(function(){
  function buildQuiz(){
  // variable to store the HTML output, answers and questions
    const output = [];
  
    // for each question:
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers, create array to hold list
        const answers = [];
  
       // and for each available answer:
        for(letter in currentQuestion.answers){
  
          // add HTML radio button so user can only pick one answer from all options
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
          </div>`
        );
      }
    );

    // combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }  
    // build quiz function complete

  // Show quiz results
  function showResults() {
    // Grabs answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // // To keep track of user's answers
    let numCorrect = 0;

    // for each question:
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const  userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // If answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // Add to number of correct answers
        numCorrect++;
        answerContainers[questionNumber].style.color ='green';
      }
      // wrong or blank answer
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML =`${numCorrect} out of ${myQuestions.length}`;
  } 

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
 
  // Stores HTML elements in variables 
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  // Quiz questions
  // Using object literals for individual questions and array to hold quiz questions
  const myQuestions = [
      {
        question: "Which attribute specifies the URL of a page link?",
        answers: {
          a: "alt",
          b: "src",
          c: "href",
          d: "img"
        },
        correctAnswer: "c"
      },
      {
        question: "Where are CSS file links inserted in an HTML document?",
        answers: {
          a: "between body tags",
          b: "between footer tags",
          c: "between head tags",
          d: "CSS file link is not required"
        },
        correctAnswer: "c"
      },
      {
        question: "Which of the following is NOT a property value?",
        answers: {
            a: "red",
            b: "12px",
            c: "blue",
            d: "color"
        },
        correctAnswer: "d"
      },
      {
        question: "What are fixed values called in JavaScript?",
        answers: {
            a: "literals",
            b: "variables",
            c: "operators",
            d: "camel case"
        },
        correctAnswer: "a"
      },
      {
        question: "Which of the following are flex container properties?",
        answers: {
            a: "flex-direction",
            b: "justify-content",
            c: "align-items",
            d: "all of the above"
        },
        correctAnswer: "d"
      }
    ];
    // Executes build quiz function and displays quiz
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
  })();