/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.showImages = this.showImages.bind(this);
    this.content = document.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents() {
    const btnsClose = Array.from(this.elementDoom.querySelectorAll('.x, .close, .send-all'));

    btnsClose.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('send-all')) {
          this.sendAllImages();
        } else {
          this.close();
        }
      })
    })

    this.elementDoom.addEventListener('click', (el) => {
      switch (el.target.tagName) {
        case 'input':
          el.target.closest('.input').classList.remove('error');
          break;
        case 'button':
        case 'i':
          this.sendImage(el.target.closest('.image-preview-container'));
          break;
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    // console.log('images', images);
    images.reverse();
    let imagesList = [];
    images.forEach(image => {
      imagesList.push(this.getImageHTML(image));
    })
    const content = this.elementDoom.querySelector('.content');
    content.innerHTML = imagesList.join('');

    // this.content.innerHTML = imagesList.join('');
    // console.log('this.content.innerHTML', this.content.innerHTML);
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `
      <div class="image-preview-container">
        <img src='${item}' />
        <div class="ui action input">
          <input type="text" placeholder="Путь к файлу">
          <button class="ui button"><i class="upload icon"></i></button>
        </div>
      </div>
    `;
  }

  /**
   * Отправляет все изображения в облако на ЯДиск
   */
  sendAllImages() {
    this.elementDoom.querySelectorAll('.image-preview-container').forEach(el => { this.sendImage(el) });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const path = imageContainer.querySelector('.input').value.trim();

    if (!path) {
      imageContainer.querySelector('input').classList.add('.error');
    } else {
      imageContainer.querySelector('input').classList.add('.disabled');
      const src = imageContainer.querySelector('img').src;
      Yandex.uploadFile(path, src, () => {
        imageContainer.remove();

        if (this.contenContainer.children.length < 1) {
          this.close();
        }
      })
    }
  }
}