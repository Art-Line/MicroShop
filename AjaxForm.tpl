[[!AjaxForm?
  &snippet=`FormIt`
  &form=`tpl.form.order`
  &preHooks=`order`
  &hooks=`validate, FormItSaveForm, spam, email`
  &emailSubject=`Сообщение с сайта [[++site_name]]`
  &emailTo=`[[++email_to]]`
  &emailFrom=`[[++email_from]]`
  &emailTpl=`tpl.form.order.email`
  &fieldNames=`fio==ФИО,tel==Телефон,email==email,comment==Комментарий,products==Товары`
  &formFields=`fio,tel,email,comment,products`
  &formName=`Заказ`
  &validationErrorMessage=`В форме содержатся ошибки!`
  &successMessage=`Сообщение успешно отправлено`
]]
