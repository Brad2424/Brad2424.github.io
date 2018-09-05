const letters = document.querySelector('H1').children;

function getRandNum() {
    return (Math.random() * 2).toFixed(2);
};

function getRandNum2() {
    return Math.floor((Math.random() * 3) + 2);
};

for (let i = 1; i < 14; i++) {
    const randNum = getRandNum();
    const randNum2 = getRandNum2();
    
    letters[i].setAttribute('id', `letter${[i]}`);
    letters[i].style.animation = `letters 1s ${randNum}s ease-out ${randNum2} forwards`;
}