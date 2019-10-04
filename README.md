# MicroShop
## MODX REVO | FormIt | AjaxForm | JS | jQuery | LocalStorage | BootStrap4 | FontAveasome 
> Магазин с хранением и обработкой товаров на стороне пользователя  
> Подробности на [trywar.ru](https://trywar.ru/3/205/)

### Содержуха
ajaxform.tpl - _Вывод AjaxForm_  
order.php - _Хук для AjaxForm который приводит товары в таблицу перед отправкой_  
main.html - _html формы оформления заказа и всего необходимого_  
main.js - _Сам движок на js_  
email.tpl - _Письмо на почту с контактами и списком товаров_  
main.css - _Скрываем не нужное через css_  
___

В *main.js* начиная со строчки 126 собирается инфа о товаре при добавлении его в корзину, там нужно поменять как нужно
```
var oProduct = {
    art: form.find('.product_art_value').val(),
    price: form.find('.product_price_value').val(),
    count: form.find('.product_count_value').val(),
    url: window.location.pathname,
    img: $('.slider-catalog-item-nav .slick-slide:eq(0) img').attr('src'),
    name: $('.product_name_value').html(),
  }
```
