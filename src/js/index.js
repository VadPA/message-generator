import mobileNav from './modules/mobile-nav.js';
mobileNav();

import messageList from './helpers/messageList.js'
import adjectivesList from './helpers/adjectivesList'
import adverbsList from './helpers/adverbsList'
import nounsList from './helpers/nounsList'
import verbsList from './helpers/verbsList'

messageList.forEach(el => {
  let str = el.message.replaceAll(', ', ' , ').replaceAll('.', ' . ').replace(/ {2,}/g, " ").trim().split(' ');
  el.messageToArray = str;
})

window.addEventListener('load', function () {
  const messageListHTML = document.querySelectorAll('.message__text')
  const btnList = document.querySelectorAll('.message__btn')
  let currArrIdMessage = Array.from(messageListHTML).map(
    (el) => +el.dataset.idMessage
  )

  function changeMessage() {
    let attrClass = '';

    if (this.innerText === 'Change phrase') {
      /** We go through the array of messages and change them to new 
      arbitrary messages from the array of messages.*/
      messageListHTML.forEach((el) => {
        let newIndex = randNumForMessage(currArrIdMessage);
        el.innerText = messageList[newIndex].message
        el.setAttribute('data-id-message', messageList[newIndex].id)
      })
      // We update the values in the array (currArrIndexMessage) to valid ones.
      currArrIdMessage = Array.from(messageListHTML).map(
        (el) => +el.dataset.idMessage
      )
    } else {
      messageListHTML.forEach(el => {
        const obj = findObj(messageList, el.dataset.idMessage)
        let [ arrIndexOldWords, arrNewWords ] = createArrNewWords(this.innerText, el.dataset.idMessage);
        attrClass = arrNewWords.shift();
        arrIndexOldWords.forEach(
          (item, index) =>
            (obj.messageToArray[
              item
            ] = `<span class="${attrClass}">${arrNewWords[index]}</span>`)
        );
        el.innerHTML = obj.messageToArray.join(' ');
      })
    }
  }
  btnList.forEach(el => el.addEventListener('click', changeMessage));
})

function findNewWord(arrAllWords, arrWords) {
  const arrNewWord = [];
  let index;
  arrWords.forEach(item => {
    do {
      index = Math.floor(Math.random() * arrAllWords.length)
    } while (arrWords.includes(arrAllWords[index]));
    arrNewWord.push(arrAllWords[index]);
  })
  return arrNewWord;
}

function findObj(arr, idObj){
  return arr.filter((el) => el.id === +idObj)[0]
}

function createArrNewWords(partOfSpeech, idMessage) {
  const obj = findObj(messageList, idMessage);
  let arrIndexOldWords;
  let arrNewWord = []
  let arrOldWord = [];
  switch (partOfSpeech) {
    case 'Change noun':
      arrIndexOldWords = obj.noun;
      obj.noun.forEach((item) => arrOldWord.push(obj.messageToArray[item]))
      if (arrOldWord.length > 0) arrNewWord = findNewWord(nounsList, arrOldWord);
      arrNewWord.unshift('nouns')
      break
    case 'Change verb':
      arrIndexOldWords = obj.verb 
      obj.verb.forEach((item) => arrOldWord.push(obj.messageToArray[item]))
      if (arrOldWord.length > 0) arrNewWord = findNewWord(verbsList, arrOldWord)
      arrNewWord.unshift('verbs');
      break
    case 'Change adverb': 
      arrIndexOldWords = obj.adverb
      obj.adverb.forEach((item) => arrOldWord.push(obj.messageToArray[item]))
      if (arrOldWord.length > 0) arrNewWord = findNewWord(adverbsList, arrOldWord);
      arrNewWord.unshift('adverbs')
      break
    case 'Change adjective':
      arrIndexOldWords = obj.adjective 
      obj.adjective.forEach((item) => arrOldWord.push(obj.messageToArray[item]))
      if (arrOldWord.length > 0) arrNewWord = findNewWord(adjectivesList, arrOldWord)
      arrNewWord.unshift('adjectives')
      break
    default: break;
  };
  return [arrIndexOldWords, arrNewWord];
}

function randNumForMessage(currArrIdMessageLocal) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * messageList.length)
  } while (currArrIdMessageLocal.includes(newIndex))
  return newIndex;
}

