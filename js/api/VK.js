/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
  static ACCESS_TOKEN = 'vk1.a.-AKzYTF2i3nSVqR3bfAOO_m_BRdymambhcnb_0n-jZWbtYxDrEHicxfLSOdFiTLfckiTV-2wimKPxKeUo02lRUBdAYLqwgqNiyMJ1QwASzE-JUjuCH4MWLmku_Ff231GJNBNI_5YG3bqk-ZshHVb1hQejMBTwZozaUdVnS-re4dwJzrpXI8gxs1KS6gJzlBbIzlae0tTrqGDyaqgeK-NJw';
  // static ACCESS_TOKEN = '';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;

    if (!this.ACCESS_TOKEN || this.ACCESS_TOKEN === '') {
      this.ACCESS_TOKEN = parent('Ведите токен для VK');
    }

    let script = document.createElement('script');
    script.id = 'script_get';
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&photo_sizes=1&count=10&access_token=${this.ACCESS_TOKEN}&v=5.154&callback=VK.processData`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    try {      
      const scriptAdded = document.getElementById('script_get');
      
      if (scriptAdded) {
        scriptAdded.remove();
      }

      if (result.error) {
        return alert(result.error);
      }

      const listTypePhoto = ['w', 'z', 'y', 'x', 'r', 'q', 'p', 'o', 'm', 's'];
      let listlargestImage = [];
      
      result.response.items.forEach(item => {
        const largestSize = listTypePhoto.find(type => item.sizes.some(size => size.type === type));
        if (largestSize) {
          const largestImage = item.sizes.find(size => size.type === largestSize);
          listlargestImage.push(largestImage.url);
        }
      });

      this.lastCallback(listlargestImage);
      this.lastCallback = () => {};

    } catch (error) {
      alert(`Ошибка: ${error}`);
      console.log(error);
    }
  }
}
