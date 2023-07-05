var buttons = document.querySelectorAll('.category-button');

function resetActiveClass() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        resetActiveClass();
        this.classList.add('active');
    });
}
