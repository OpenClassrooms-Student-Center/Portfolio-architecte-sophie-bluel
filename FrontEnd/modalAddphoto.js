const modalAddPhoto = `	<div class="modal__content">
                            <div class="button__group">
                                <i class="fa-solid fa-arrow-left"></i>
                                <i class="fa-solid fa-xmark"></i>
                                </div>
                                <div class="modal__content__container">
                                <h2>Ajout Photo</h2>
                                <form action="#">
                                <div class="submit__photos">
                                    <img src="./assets/images/icone.svg" alt="" id="preview">
                                    <label for="file">+ Ajouter photo</label>
                                    <input type="file" name="file" id="file" onchange="previewModalPicture(this)" accept=".jpg, .png, .gif">
                                    <span>jpg, png : 4mo max</span>
                                </div>
                                <div class="title">
                                    <label for="title">Titre</label>
                                    <input type="text" name="title" id="title">
                                </div>
                                <div class="title">
                                    <label for="cat">Catégorie</label>
                                    <div>
                                        <input type="cat" name="cat" id="cat" disabled>
                                        <i class="fa-solid fa-chevron-down"></i>
                                        <ul>
                                            <li>
                                                test1
                                            </li>
                                            <li>
                                                test2
                                            </li>
                                            <li>
                                                test3
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                </form>
                                <div class="underline"></div>
                                <button class="btn--validate" disabled>Valider</button>
                            </div>
                            </div>
                        </div>`
                        ;

export default modalAddPhoto;
