const createPictureCard = (title, imageUrl) => {
    const pictureContainer = document.createElement('figure')
    const picture = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    picture.setAttribute('src', imageUrl)
    picture.setAttribute('alt', title)
    figcaption.innerHTML = title
    pictureContainer.appendChild(picture)
    pictureContainer.appendChild(figcaption)
    return pictureContainer
}
