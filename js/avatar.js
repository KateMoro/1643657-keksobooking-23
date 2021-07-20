const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const userAvatarInput = document.querySelector('#avatar');
const userAvatar = document.querySelector('.ad-form-header__preview');

const userImagesInput = document.querySelector('#images');
const userImages = document.querySelector('.ad-form__photo');

const showImagePreview = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.width = 70;
        image.height = 70;
        preview.style.padding = 0;
        preview.textContent = '';
        preview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetImages = () => {
  userAvatar.innerHTML = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';
  userAvatar.style.padding = '0 15px';
  userImages.textContent = '';
};

showImagePreview(userAvatarInput, userAvatar);
showImagePreview(userImagesInput, userImages);

export {resetImages};
