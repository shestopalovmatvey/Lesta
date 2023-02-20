let btnToTop = document.querySelector('#button');
let bigBtnToTop = document.querySelector('.button');

btnToTop.style.display = 'none';
bigBtnToTop.style.display = 'none';

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    
    if (window.innerWidth > 768) {
        (scrollY > 400) ? bigBtnToTop.style.display = 'inline-block' : bigBtnToTop.style.display = 'none';
    } else {
        (scrollY > 400) ? btnToTop.style.display = 'inline-block' : btnToTop.style.display = 'none';
    }
})

btnToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

bigBtnToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});