export function setAdminPage () {
  const projetsTitle = document.getElementById('portfolio').querySelector('h2')
  projetsTitle.remove()
  const modalLink = createModalLink('admin-div', 'modifier')
  const portfolioSection = document.getElementById('portfolio')
  portfolioSection.insertAdjacentElement('afterbegin', modalLink)

  const underMainPic = document
    .getElementById('introduction')
    .querySelector('figure')
  const modalLink2 = createModalLink('main-pic', 'modifier')
  underMainPic.insertAdjacentElement('beforeend', modalLink2)

  const h2Title = document.createElement('h2')
  h2Title.innerText = 'Mes projets'
  modalLink.prepend(h2Title)

  addMarginClass()

  createAdminNav()

  logBtn()
}

function createModalLink (classModal, editText) {
  //the font-awesome icon
  const editIcon = document.createElement('i')
  editIcon.classList.add('fa-sharp', 'fa-solid', 'fa-pen-to-square')
  // text that varies ==> 2nd param
  const pText = document.createElement('p')
  pText.innerHTML = editText
  const modalDivLink = document.createElement('div')
  modalDivLink.classList.add('modal-div-link', 'js-modal')

  modalDivLink.appendChild(editIcon)
  modalDivLink.appendChild(pText)

  const newDivTitle = document.createElement('div')
  // 1st param to set the name of specific div to be able to change it
  newDivTitle.className = classModal
  newDivTitle.appendChild(modalDivLink)

  return newDivTitle
}

function createAdminNav () {
  //Creating the black admin nav bar
  const adminBar = document.createElement('div')
  adminBar.innerHTML =
    '<i></i> <p>Mode Edition</p> <button> publier les changements </button>'
  adminBar.className = 'admin-bar'
  adminBar.firstChild.classList.add('fa-sharp', 'fa-solid', 'fa-pen-to-square')
  const navheader = document.querySelector('header')
  navheader.insertAdjacentElement('afterbegin', adminBar)

  return adminBar
}

const addMarginClass = function () {
  const navBar = document.querySelector('header')
  navBar.classList.add('adminHeader')
}

function logBtn () {
  const logBtn = document.querySelector('header nav ul li:nth-child(3)')
  logBtn.innerText = 'logout'
  logBtn.addEventListener('click', function () {
    localStorage.removeItem('token')
    window.location.href = './'
  })
}
