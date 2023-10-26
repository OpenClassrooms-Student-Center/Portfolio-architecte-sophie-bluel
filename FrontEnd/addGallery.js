document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token')
  const formElement = document.getElementById('uploadForm')
  const fileInput = document.getElementById('image')
  const photoLoad = document.getElementById('photoLoad')
  let binaryData

  if (token) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        photoLoad.src = URL.createObjectURL(fileInput.files[0])
        convertFileToBinary(fileInput.files[0])
      } else {
        photoLoad.src = './assets/icons/picture-svgrepo-com 1.png'
      }
    })
  }

  function convertFileToBinary (file) {
    const reader = new FileReader()

    reader.onload = function (event) {
      binaryData = event.target.result
    }

    reader.readAsArrayBuffer(file)
  }

  if (token) {
    formElement.addEventListener('submit', async (event) => {
      event.preventDefault() // Empêche la soumission automatique

      // Validation côté client
      const titreInput = formElement.querySelector('[name="title"]')
      const categorieInput = formElement.querySelector('[name="category"]')

      if (!binaryData || !titreInput.value || !categorieInput.value) {
        alert('Veuillez sélectionner un fichier, saisir un titre et une catégorie.')
        return
      }

      const formData = new FormData()
      formData.append('image', new Blob([binaryData]))
      formData.append('title', titreInput.value)
      formData.append('category', categorieInput.value)

      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })
        if (response.ok) {
          const data = await response.json()
          alert('Votre formulaire a bien été envoyé')
          console.log(data)
        } else {
          throw new Error('Échec de la requête.')
        }
      } catch (error) {
        console.error('Erreur : ' + error)
      }
    })
  }
})
