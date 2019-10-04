$(function(){
// MicroShop
// - Параметры
button_cart = '.shop_cart' // Кнопка перехода в корзину
button_add = 'button[value="cart/add"]' // Кнопка добавления в корзину
button_remove = 'button[value="cart/remove"]' // Кнопка удаления из корзины
button_remove_all = 'button[value="cart/removeall"]' // Кнопка удаления из корзины
form_order = '.form_order' // Форма оформления заказа
form_order_cart = '.form_order_cart' // Корзина в Форме оформления заказа
form_order_null = '.form_order_null' // Сообщение о пустой корзине
form_order_success = '.form_order_success' // Сообщение успешной отправки
product_count = '.product_count' // Поле с количеством товара в корзине

// - Пересчёт товаров
function cart_reload() {
  if (localStorage.getItem('MicroShop')) {
    oProducts = JSON.parse(localStorage.getItem('MicroShop'))
    count = 0
    sum = 0

    $.each(oProducts.items, function() {
      count = parseInt(count) + parseInt(this.count)
      sum = parseInt(sum + this.price * this.count)
    })

    $(document).find(button_cart).find('shop_cart_btn span').html(count)
    $(button_cart).show()

    // Если на странице корзины то и данные в форме бомбим
    if ($(document).find(form_order_cart).length > 0) {
      $(document).find('#cart_count').html(count)
      $(document).find('#cart_sum').html(sum)
    }
  } else {
    $(button_cart).hide()
    $(form_order).hide()
    $(form_order_null).show()
  }
}
cart_reload()

// - Отправка
function order_success() {
  $(document).find(form_order).hide()
  localStorage.removeItem('MicroShop')
  $(document).find(form_order_success).show()
}

// - Если на странице содержимое корзины, то выгружаем её
if (localStorage.getItem('MicroShop') && $(document).find(form_order_cart).length > 0) {
  $(document).find('.form_order_null').hide()

  oProducts = JSON.parse(localStorage.getItem('MicroShop'))
  var
    cart_html = '',
    sum = 0,
    count = 0

  // -- Собираем товары
  cart_html += '<tbody>'
  $.each(oProducts.items, function(index, elem) {
    var
      html = '<tr>'
      html += '<td>'
      html += index + 1
      html += '</td>'
      html += '<td>'
      html += '<a href="' + this.url + '">' + this.name + '</a>'
      html += '</td>'
      html += '<td class="text-center">'
      html += this.art
      html += '</td>'
      html += '<td class="text-center" style="min-width: 150px">'
      html += this.price + ' р.'
      html += '</td>'
      html += '<td class="text-center">'
      html += '<input data-atr="' + this.art + '" type="number" class="product_count form-control" min="1" value="' + this.count + '"></input>'
      html += '</td>'
      html += '<td class="text-center">'
      html += '<button data-atr="' + this.art + '" class="btn form-control" type="button" value="cart/remove"><i class="fas fa-minus-circle"></i></button></td></tr>'
      html += '</td>'
      html += '</tr>'
    cart_html += html
    sum = parseInt(sum + this.price * this.count)
    count = parseInt(count) + parseInt(this.count)
  })
  cart_html += '</tbody>'

  // -- Собираем итог
  var
    html = '<tfoot><tr>'
    html += '<td class="text-right" colspan="3"><strong>' + 'Итого:' + '</strong></td>'
    html += '<td class="text-center">'
    html += '<strong><span id="cart_sum">' + sum + '</span></strong> р.'
    html += '</td>'
    html += '<td class="text-center">'
    html += '<strong><span id="cart_count">' + count + '</span></strong> шт.'
    html += '</td>'
    html += '<td class="text-center">'
    html += '<button data-atr="' + this.art + '" class="btn form-control" type="button" value="cart/removeall"><i class="fas fa-trash-alt"></i></button></td></tr>'
    html += '</td>'
    html += '</tr></tfoot>'
    cart_html += html

  // -- Вставляем
  $(document).find(form_order_cart).find('table thead').after(cart_html)
  $(document).find(form_order_cart).find('#input_products').val(JSON.stringify(oProducts.items))
  $(document).find('.form_order').show()
}

// - Добавление товара
$(document).find(button_add).on('click', function() {
  // Переход в корзину если уже добавлен
  if ($(this).hasClass('._active_'))
    console.log('В корзине')
  // window.location = '/oformlenie-zakaza/'

  // Анимация
  // $(this).addClass('_active_')
  $(document).find('.ms2_form .cart_add_status').show()
  // $(this).html( $(this).html().replace('корзину', 'корзине') )

  // oProducts = {'items' : [ oProduct ]}
  // Объект добавляемого товара
  var form = $(this).parents('form')
  var oProduct = {
    art: form.find('.product_art_value').val(),
    price: form.find('.product_price_value').val(),
    count: form.find('.product_count_value').val(),
    url: window.location.pathname,
    img: $('.slider-catalog-item-nav .slick-slide:eq(0) img').attr('src'),
    name: $('.product_name_value').html(),
  }

  if (localStorage.getItem('MicroShop')) {
    // Если товары уже есть в корзине
    // Проверяем что такого товара нет
    oProducts = JSON.parse(localStorage.getItem('MicroShop'))
    add = true

    $.each(oProducts.items, function() {
      if (this.art == oProduct.art) {
        // Уже есть, увеличиваем количество
        this.count = parseInt(this.count) + parseInt(oProduct.count)
        localStorage.setItem('MicroShop', JSON.stringify(oProducts))
        add = false
      }
    })

    if (add) {
      // Такого ещё нет, добавляем
      oProducts.items.push(oProduct)
      localStorage.setItem('MicroShop', JSON.stringify(oProducts))
    }
  } else
    // Добавляем, если корзина еще пуста
    localStorage.setItem('MicroShop', JSON.stringify({
      'items': [oProduct]
    }))

  $.jGrowl("Товар добавлен в корзину")
  cart_reload()
  return false
})

// - Удаление товара
$(document).find(button_remove).on('click', function() {
  if (localStorage.getItem('MicroShop')) {
    // Объект удаляемого товара
    var oProduct = {
      art: $(this).data().atr
    }

    oProducts = JSON.parse(localStorage.getItem('MicroShop'))
    $.each(oProducts.items, function(index, elem) {
      if (oProducts.items.length == 1) {
        // Если в корзине 1 продукт удаляем всё
        localStorage.removeItem('MicroShop')
        // Удаляем из таблицы
        $('button[value="cart/remove"][data-atr="' + oProduct.art + '"]').parents('tr').remove()
      } else {
        // Если в корзине больше 1, ищём нужный
        if (elem.art == oProduct.art) {
          // Удаляем из корзины
          oProducts.items.splice(index, 1)
          localStorage.setItem('MicroShop', JSON.stringify(oProducts))

          // Удаляем из таблицы
          $('button[value="cart/remove"][data-atr="' + oProduct.art + '"]').parents('tr').remove()
        }
      }
    })

  }

  $.jGrowl("Товар удалён из корзины")
  cart_reload()
  return false
})

// - Удаление всех товаров
$(document).find(button_remove_all).on('click', function() {
  localStorage.removeItem('MicroShop')
  $.jGrowl("Товары удалены из корзины")
  cart_reload()
  return false
})

// - Изменения количества товара
$(document).find(product_count).on('change', function() {
  var oProduct = {
    art: $(this).data().atr,
    count: $(this).val()
  }
  oProducts = JSON.parse(localStorage.getItem('MicroShop'))
  $.each(oProducts.items, function() {
    if (this.art == oProduct.art) {
      // Находим товар и меняем количество
      this.count = parseInt(oProduct.count)
      localStorage.setItem('MicroShop', JSON.stringify(oProducts))
    }
  })
  cart_reload()
})
// MicroShop x

// Отправка сообщений AjaxForm
$(document).on('af_complete', function(event, response) {
  var form = response.form
  console.log('chelk')
  console.log(form.attr('id'))
  // Если у формы определённый id
  if (form.attr('id') == 'form_order') {
    // - Оформление заказа
    order_success()
  }
  // Иначе печатаем в консоль весь ответ
  else {
    console.log(response)
  }
})
// Отправка сообщений х
})
