// const flipBackButtons = document.getElementsByClassName('flipBack');
// console.log(flipBackButtons);

// for (let i = 0; i < flipBackButtons.length; i++) {
//     const button = flipBackButtons[i];
    
//     button.addEventListener('click', (e) => {
//         const cube = e.target.parentElement.parentElement;
//         cube.style.animation = "leftReverse 0.3s ease-in-out forwards";
        
//         setTimeout(function(){ cube.removeAttribute("style") }, 1000);

//     });
// }

const flipBackButtons = document.getElementsByClassName('flipBack');
const cubes = document.getElementsByClassName('cube');

for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];
    const flipBackButton = flipBackButtons[i];;

    cube.addEventListener('mouseover', (e) => {
        cube.classList.add('leftSpin');
        cube.classList.remove('leftReverse');
    });
    cube.addEventListener('mouseout', (e) => {
        cube.classList.remove('leftSpin');
        cube.classList.add('leftReverse');
    });
    flipBackButton.addEventListener('click', (e) => {
        cube.classList.remove('leftSpin');
        cube.classList.add('leftReverse');
    });
    
}