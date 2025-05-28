// const hiddenContent = document.querySelector('.hidden-content');
// const readMore = document.querySelector('.read-more');

// function revealContent(){
//     hiddenContent.classList.toggle('reveal-button');
// }

// readMore.addEventListener('click', revealContent);

document.querySelector('.projects').addEventListener('click',function(e){ //listens for all clicks on parent container
    const target = e.target;
    if (target.matches('.read-more')){
        const hiddenContent = target.previousElementSibling;
        const isVisible = hiddenContent.classList.toggle('reveal-button');
        target.textContent = isVisible ? 'read less':'read more'

    }

})


    // document.querySelector('#id of parent element').addEventListener('click',function(e){
    //     const target = e.target;
    //     if (target.mathes('CSS selector')){
    //         target.style.backgroundColor = 'lightgray';
    //     }
    