/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.blockPreviewImage = element.querySelector('.image');
    this.blockAllImages = element.querySelector('.images-list .grid .row');
    this.imgAll = this.blockAllImages.getElementsByTagName('img');
    this.drawImages = this.drawImages.bind(this)
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.blockAllImages.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        event.target.classList.toggle('selected');
        this.checkButtonText()
      };      
    })

    this.blockAllImages.addEventListener('dblclick', (event) => {
      if (event.target.tagName.toLowerCase() === "img") {
        this.blockPreviewImage.src = event.target.src;
      };
    })

    document.querySelector('.select-all').addEventListener('click', () => {
      // console.log(Array.from(this.imgAll));
      if (ImageViewer.anySelected(this.imgAll))
        Array.from(this.imgAll).forEach(element => {
          element.classList.remove('selected');
        });
      else {  
        Array.from(this.imgAll).forEach(element => {
          element.classList.add('selected');
        });
      }
      this.checkButtonText();
    })

    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modalPrev = App.getModal('filePreviewer');
      document.querySelector(".uploaded-previewer-modal .content").innerHTML = '<i class="asterisk loading icon massive"></i>';
      modalPrev.open();
      Yandex.getUploadedFiles(modalPrev.showImages);
      // Yandex.getUploadedFiles(callback => {
      //   modalPrev.showImages(callback);
      // });
    })

    document.querySelector('.send').addEventListener('click', () => {
      const modalUpload = App.getModal('fileUploader');
      const imgSrcAll = Array.from(this.blockAllImages.querySelectorAll(".selected"));
      modalUpload.open();
      modalUpload.showImages(imgSrcAll);
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.blockAllImages.innerHTML = ''    
    // while (this.blockAllImages.firstChild) {
    //   this.blockAllImages.removeChild(this.blockAllImages.firstChild);
    // }
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled')
      images.forEach(image => {
        const divElement = document.createElement('div');
        const imgElement = document.createElement('img')
  
        divElement.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
        imgElement.src = image;
  
        divElement.appendChild(imgElement);
        this.blockAllImages.appendChild(divElement);
      });
    } else {
      document.querySelector('.select-all').classList.add('disabled')
    }
    
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText() {
    // console.log('imgAll=', this.imgAll);
    // const imgAll = this.blockAllImages.getElementsByTagName('img');
    const selectAllBtns = document.querySelectorAll('.select-all');
    const sendAllBtns = document.querySelector('.send');
    // console.log('sendAllBtns', sendAllBtns);
    
    selectAllBtns.innerText = ImageViewer.allSelected(this.imgAll) ? 'Снять выделение' : 'Выбрать всё';
    selectAllBtns.innerText = ImageViewer.anySelected(this.imgAll) ? 'Снять выделение' : 'Выбрать всё';
    ImageViewer.anySelected(this.imgAll) ? sendAllBtns.classList.remove('disabled') : sendAllBtns.classList.add('disabled');
  }

  static anySelected(element) {
    for (let index = 0; index < element.length; index++) {
      if (element[index].classList.contains('selected')) {
        return true;
      };
    }
    return false;
  }

  static allSelected(element) {
    for (let index = 0; index < element.length; index++) {
      if (!element[index].classList.contains('selected')) {
        return false;
      };
    }
    return true;
  }
}