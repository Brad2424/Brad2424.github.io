function debounce(func, wait = 40, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const fadeInElements = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  fadeInElements.forEach(fadeInElement => {
    // upper part of the element
    const slideInAt = (window.scrollY + window.innerHeight) - (fadeInElement.clientHeight / 10);
    // bottom of the element
    const elementBottom = fadeInElement.offsetTop + fadeInElement.clientHeight;
    const isHalfShown = slideInAt > fadeInElement.offsetTop;
    const isNotScrolledPast = window.scrollY < elementBottom;
    if (isHalfShown && isNotScrolledPast) {
      fadeInElement.classList.add('active-fade-in');
    } else {
      fadeInElement.classList.remove('active-fade-in');
    }
    console.log('executed');
  });
}

window.addEventListener('scroll', debounce(checkFadeIn));