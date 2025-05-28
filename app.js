
document.querySelector('.projects').addEventListener('click',function(e){ //listens for all clicks on parent container
    const target = e.target;
    if (target.matches('.read-more')){
        const hiddenContent = target.previousElementSibling;
        const isVisible = hiddenContent.classList.toggle('reveal-button');
        target.textContent = isVisible ? 'read less':'read more'

    }

})

