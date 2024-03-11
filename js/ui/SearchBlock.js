/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }  

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.element.querySelectorAll('.replace, .add').forEach(button => {
      button.addEventListener('click', (event) => {
        const inputId = this.element.getElementsByTagName('input')[0];
    
        if (!inputId.value.trim()) {
          alert('Введите id пользователя!');
        } else {
          if (event.currentTarget.classList.contains('replace')) {
            App.imageViewer.clear();
          }
          VK.get(inputId.value.trim(), App.imageViewer.drawImages);
          inputId.value = '';
        }
      })
    });
  }
}
