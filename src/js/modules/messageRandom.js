// import messageList from "./helpers/messageList";
// import adjectivesList from "./helpers/adjectivesList";
// import adverbsList from "./helpers/adverbsList";
// import nounsList from '';
// import verbsList from '/src/js/helpers/verbsList';



window.addEventListener('load', function () {
  const messageBlockList = document.querySelectorAll('.message__block')
  const btn = document.querySelector('.btn')
  console.log(messageBlockList);

  btn.addEventListener('click', function () {
    // messageBlockList.forEach(el => {
    //   console.log(el);
    // })
  })



  delegate(btn, 'a', 'click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.hash)
    scrollToElement(target)
  })

})

function delegate(box, selector, eventName, handler) {
  box.addEventListener(eventName, function (e) {
    let elem = e.target.closest(selector)
    if (elem !== null && box.contains(elem)) {
      handler.call(elem, e)
    }
  })
}
