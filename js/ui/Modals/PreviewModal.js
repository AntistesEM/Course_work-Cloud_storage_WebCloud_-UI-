/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.showImages = this.showImages.bind(this);
    // this.registerEvents = this.registerEvents.bind(this)
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  // registerEvents() {
  //   let that = this;
  //   const xIcon = this.dom.getElementsByTagName('i')[0]
  //   console.log('===', xIcon);
  //   xIcon.addEventListener('click', (e) => {
  //     that.close();
  //   });
  // }

  registerEvents() {
    // console.log('====', this.elementDoom);
    // console.log('++', this.elementDoom.querySelectorAll('.header i')[0]);
    // let that = this
    // const closeBtn = this.elementDoom.querySelectorAll('.header i')[0]
    // console.log(closeBtn);
    // closeBtn.addEventListener('click', () => {
    //   this.close();
    // });

    
    let that = this;
    const xIcon = this.elementDoom.getElementsByTagName('i')[0]

    xIcon.addEventListener('click', (e) => {
      that.close();
    });

    this.elementDoom.querySelector('.content').addEventListener('click', (event) => {
      if (event.target.classList.contains('delete')) {
        const icon = event.target.querySelector('i');

        icon.classList.add('.icon', '.spinner', '.loading');
        event.target.classList.add('disabled');

        const path = target.dataset.path;

        Yandex.removeFile(path, (resp) => {
          if (resp === null) {
            event.target.closest(".image-preview-container").remove();
          }
        }); 

      } else if (event.target.classList.contains('download')) {
        const url = event.target.dataset.file;

        Yandex.downloadFileByUrl(url);
      }
    })    
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */

  // Метод showImages получает все изображения, меняет порядок на противоположный (с помощью метода reverse). 
  // Для каждого изображения получает блок контейнер(с изображением, полем ввода и кнопкной загрузки). Объединяет все полученные разметки(с помощью метода join) и сохраняет полученую разметку(из блоков контейнеров ко всем изображениям) в свойство innerHTML содержимого модального окна(блока content).

  showImages(dataImages) {
    // const dataImages = data.items;
    dataImages.reverse();
    let imagesList = [];
    console.log('dataImages', dataImages);

    dataImages.forEach(image => {
      console.log('image', image);
      imagesList.push(this.getImageInfo(image));
    })

    const content = this.elementDoom.querySelector('.content');

    content.innerHTML = imagesList.join('');
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {    
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };

    const dateNew = new Date(date);
    const formattedDate = dateNew.toLocaleDateString('ru-RU', options);
    
    return formattedDate;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    // console.log('item', item);
  }
}
