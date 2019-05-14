let input = document.getElementById("entry");
let button = document.querySelector("button");
let body = document.querySelector("body");
let section = document.querySelector("section");
let p = document.querySelector("p");

button.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${input.value}?key=8c0c79ce-ac13-4550-95c9-e15874150498`)
    .then(response => {
        return response.json();
    }).then(json => {
            console.log(json[0].shortdef); 
            showResults(json); 
        })
})

function showResults(json) {
    let arr = json[0].shortdef;
for (let i = 0; i<arr.length; i++) {
    let p = document.createElement("p");
    p.innerText = arr[i];
    section.appendChild(p);
}}