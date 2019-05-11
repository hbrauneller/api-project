const baseURL = 'https://api.edamam.com/api/food-database/parser';
const key = '649b20bbae342bed620ad56b217f9b29';
const appId = '0b90a497'
let url;

const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

nav.style.display = 'none';

let pageNumber = 0;

let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
  e.preventDefault();
  url = `${baseURL}&ingr=${searchTerm.value}&app_id=${appId}&app_key=${key}`;
  console.log('URL:', url);

  fetch(url)
    .then(function(result) {
      console.log(result)
      return result.json();
    })
    .then(function(json) {
      console.log(json);
      displayResults(json);
    })
  }


function displayResults(json) {

  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let articles = json.response.docs;
  // console.log(articles);

  if (articles.length === 0) {
    console.log('No results');
  } else {
    for (let i = 0; i < articles.length; i++) {
      // console.log(i);
      let article = document.createElement('article');
      let heading = document.createElement('h2');
      let link = document.createElement('a');
      let img = document.createElement('img');
      let para = document.createElement('p');
      let clearfix = document.createElement('div');

      let current = articles[i];
      console.log('Current:', current);

      link.href = current.web_url;
      link.textContent = current.headline.main;

      para.textContent = 'Keywords: ';

      for (let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement('span');
        span.textContent += current.keywords[j].value + ' ';
        para.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
        img.alt = current.headline.main;
      }

      clearfix.setAttribute('class', 'clearfix');

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }

  if (articles.length === 10) {
    nav.style.display = 'block';
    previousBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    console.log('first conditional');
  } else if (articles.length < 10 && articles.length > 0 && pageNumber > 0){
    nav.style.display = 'block';
    previousBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    console.log('second conditional');
  } else {
    nav.style.display = 'none';
    console.log('third conditional');
  }
}

function nextPage(e) {
  // console.log('Next button clicked');
  pageNumber++;
  fetchResults(e);
  console.log('Page Number:', pageNumber);
}

function previousPage(e) {
  // console.log('Previous button clicked');
  if (pageNumber > 0) {
    pageNumber--;
    fetchResults(e);
  } else {
    return;
  }
  fetchResults(e);
  console.log('Page:', pageNumber);
}