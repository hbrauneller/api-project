let input = document.getElementById("word");
let button = document.querySelector("button");
let body = document.querySelector("body");

button.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${input}?key=8c0c79ce-ac13-4550-95c9-e15874150498`)
    .then(response => {
        return response.json();
    }).then(json => {
            console.log(json); 
            showResults(json); 
        })
})

function showResults(word) {
    let p = document.createElement("p");
    p.innerText = word;
    body.appendChild(p);
}