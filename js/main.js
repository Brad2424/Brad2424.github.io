const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

img1.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    img1.style.left = '0px';
})