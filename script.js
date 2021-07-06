define(['jquery', 'underscore', 'twigjs'], function ($, _, Twig) {
  var CustomWidget = function () {
    var self = this;

    this.getTemplate = _.bind(function (template, params, callback) {
      params = (typeof params == 'object') ? params : {};
      template = template || '';

      return this.render({
        href: '/templates/' + template + '.twig',
        base_path: this.params.path,
        v: this.get_version(),
        load: callback
      }, params);
    }, this);

    this.callbacks = {
      render: function () {
        console.log('render');
        return true;
      },
      init: _.bind(function () {
        console.log('init');

        AMOCRM.addNotificationCallback(self.get_settings().widget_code, function (data) {
          console.log(data)
        });

        this.add_action("phone", function (params) {
          /**
           * код взаимодействия с виджетом телефонии
           */
          console.log(params)
        });

        this.add_source("sms", function (params) {
          /**
           params - это объект в котором будут  необходимые параметры для отправки смс

           {
             "phone": 75555555555,   // телефон получателя
             "message": "sms text",  // сообщение для отправки
             "contact_id": 12345     // идентификатор контакта, к которому привязан номер телефона
          }
           */

          return new Promise(_.bind(function (resolve, reject) {
              // тут будет описываться логика для отправки смс
              self.crm_post(
                'https://example.com/',
                params,
                function (msg) {
                  console.log(msg);
                  resolve();
                },
                'text'
              );
            }, this)
          );
        });

        return true;
      }, this),
      bind_actions: function () {
        console.log('bind_actions');
        return true;
      },
      settings: function () {
        return true;
      },
      onSave: function () {
        alert('click');
        return true;
      },
      destroy: function () {

      },
      contacts: {
        //select contacts in list and clicked on widget name
        selected: function () {
          console.log('contacts');
        }
      },
      leads: {
        //select leads in list and clicked on widget name
        selected: function () {
          console.log('leads');
        }
      },
      tasks: {
        //select taks in list and clicked on widget name
        selected: function () {
          console.log('tasks');
        }
      },
    };
    return this;
  };

  return CustomWidget;
});