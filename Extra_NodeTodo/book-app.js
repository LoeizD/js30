const fs = require('fs');

function unlockNextWord() {
    const bookString = fs.readFileSync('book-object.json', 'utf-8');
    const bookArr = Array.from(JSON.parse(bookString));
    for (let index = 0; index < bookArr.length; index++) {
        if (bookArr[index].locked == true) {
            bookArr[index].locked = false;
            fs.writeFileSync('book-object.json', JSON.stringify(bookArr));
            return bookArr[index].word;
        }
    }
    return "All words unlocked already! No words to unlock.";
}

function getUnlockedWords() {
    const bookString = fs.readFileSync('book-object.json', 'utf-8');
    const bookObj = JSON.parse(bookString);
    var wordsArr = [];
    wordsArr = bookObj.filter(e => !e.locked).map(e => e.word);
    return wordsArr;
}

function getBookLength() {
    const bookString = fs.readFileSync('book-object.json', 'utf-8');
    return JSON.parse(bookString).length;
}

// console.log("Total words: " + getBookLength());
// console.log("Unlocked Words: " + getUnlockedWords());
// console.log("NewWord: " + unlockNextWord());