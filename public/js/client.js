// --------------VARIABLE DECRLARATIONS--------------------

// Get quiz sentences.
const sentences = document.getElementsByClassName("sentences");

// get buttons
const check = document.getElementById("check")

const show = document.getElementById("show")

const next = document.getElementById("next")

// Get the question box
const questionBox = document.getElementById("question-box-id")

// Get the main-game div for appending dynamically created elements.
const mainGame = document.getElementById("main-game")

// Array of Arrays. Ex: [["I'm", "fine"], ["This", "is", "a", "pen"]] Correct answers
const validationArrays = [];

// Current question array
let randomArray = [];


// Declare dragStartIndex.
let dragStartIndex;

// Get total number of questions for the quiz.
let totalQuestions = sentences.length;

// Set the question number. (also used to advance to the next question)
let questionNumber = 0;


//----------------CREATE GAME ARRAY OF ARRAYS----------------------------

for (i=0; i<sentences.length; i++) {
  // hold the value of one sentence, change it to lower case and strip off punctuation.
  let sentenceString = sentences[i].innerHTML.toLowerCase();
  console.log(sentenceString)
  if (sentenceString.includes('.') || sentenceString.includes('!') || sentenceString.includes('?')) {
    var punctuation = sentenceString.slice(sentenceString.length -1);
  }
  let strippedString = sentenceString.replace(/[.?!]/g, "");
  console.log(strippedString)
  
  // split each sentence into an array of words and append it to validationArrays.
  let validationArray = strippedString.split(" ");
  if (punctuation) {
    validationArray.push(punctuation);
    punctuation = '';
  }
  validationArrays.push(validationArray);
}



//---------------------------MAIN GAME FUNCTION CALL-------------------------

createList();


// -------------------MAIN GAME FUNCTION--------------------------------

function createList() {
  randomArray.length = 0;
  document.getElementById("total-questions").innerHTML = totalQuestions;
  document.getElementById("question-number").innerHTML = questionNumber + 1;
  [...validationArrays[questionNumber]]
  .map(a=> ({ value: a, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((word, index) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', index);
    listItem.setAttribute('class', 'word-container')
    listItem.innerHTML = `
    <div class="draggable" draggable="true">
        <p class="sentence-word">${word}</p>
        </div>
        `;
        randomArray.push(listItem);
        questionBox.appendChild(listItem)
      });
      addEventListeners();
    }
    

//----------------------EVENT LISTENERS---------------------------

    function dragStart() {
      dragStartIndex = +this.closest('li').getAttribute('data-index');
    }
    
    function dragEnter() {
      this.classList.add('over');
    }
    
    function dragLeave() {
      this.classList.remove('over');
    }
    
    function dragOver(e) {
      this.classList.add('over');
      e.preventDefault();
    }
    
    function dragDrop() {
      this.classList.remove('over')
      let dragEndIndex = +this.getAttribute('data-index');
      swapItems(dragStartIndex, dragEndIndex);
    }


//---------------------HELPER FUNCTIONS------------------------------

function swapItems(fromIndex, toIndex) {
  const itemOne = randomArray[fromIndex].querySelector('.draggable');
  const itemTwo = randomArray[toIndex].querySelector('.draggable');
  
  randomArray[fromIndex].appendChild(itemTwo);
  randomArray[toIndex].appendChild(itemOne);
}

function checkOrder() {
  // listItems are the randomly generated list of fruits with all the bells and whistles attached.
  randomArray.forEach((listItem, index) => {
    //get the div with the draggable class and the inner text from the internal p tag trimmed
    // it also gets the index of each item
    const word = listItem.querySelector('.draggable').innerText.trim();
    if (word !== validationArrays[questionNumber][index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const wordContainers = document.querySelectorAll('.word-container');
  const draggables = document.querySelectorAll('.draggable');
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })
  
  wordContainers.forEach(container => {
    container.addEventListener('dragover', dragOver);
    container.addEventListener('drop', dragDrop);
    container.addEventListener('dragenter', dragEnter);
    container.addEventListener('dragleave', dragLeave);
  })
}


//--------------------BUTTON-CLICK EVENT LISTENER FUNCITONS-----------------------

function showAnswer () {
  questionBox.innerHTML = sentences[questionNumber].innerText;
  console.log(sentences[questionNumber])
}

function nextQuestion() {
  questionNumber += 1;
  questionBox.innerHTML = "";
  console.log('question number: ', questionNumber)
  console.log('total questions: ', totalQuestions)
  console.log(questionNumber < totalQuestions)
  if (questionNumber < totalQuestions) {
    createList();
  } else {
    questionBox.innerText = "You did it!!";
    questionBox.classList.remove('border-style');
  }
}


check.addEventListener('click', checkOrder);

show.addEventListener('click', showAnswer);

next.addEventListener('click', nextQuestion);

