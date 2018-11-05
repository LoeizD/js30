const fs = require('fs');

const bookString = fs.readFileSync('book-source.md', 'utf-8');//, (error) => console.log("error" + error));

console.log(bookString);

const bookArr = bookString.split(/(\s)/).filter(elem => !elem.match(/\s+/));



function Word(word) {
    this.word = word;
    this.locked = true;
}

bookArr.forEach((e, i) => {
    bookArr[i] = new Word(e);
});

// console.log(bookArr);
fs.writeFileSync('book-object.json', JSON.stringify(bookArr));
console.log("Wrote book object to \"book-object.json\"");

