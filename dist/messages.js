/*! Messages - v0.1.0 - 2013-09-19
* https://github.com/yola/jquery-messages
* Copyright (c) 2013 kahnjw; Licensed MIT */
;(function($){
    var pluginName = 'Messages',
        defaults = {
            alert_classes: {
                'info': 'alert-info',
                'loading': 'alert-info loading',
                'error': 'alert-error alert-danger',
                'success': 'alert-success',
                'alert': 'alert'
            }
        };

    $.fn.message = function(options){
        return this.each(function() {
            $.data(this, 'plugin_' + pluginName,
            new Messages(this, options));
        });
    };

    $.message = {};

    $.message.close = function(selector) {
        $(selector).remove();
    };

    $.message.closeAll = function(classes) {
        if(classes !== undefined){
            defaults.alert_classes = classes;
        }
        $.each(defaults.alert_classes, function(key, value){
            $('.' + value).remove();
        });
    };

    function Messages(element, options){
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        if(this.buildMessage()) {
            this.cleanMessages();
            this.insertMessage();
        }
    }

    Messages.prototype.buildMessage = function(){
        var element_attribute = $(this.element).data(this.options.message_attribute);
        var body_attribute = $(document.body).data(this.options.message_attribute);
        var fallback_attribute = $(document.body).data(this.options.fallback_message_attribute);

        if (this.options.message_attribute && element_attribute) {
            this.message_details = element_attribute;
        }
        else if (this.options.message) {
            this.message_details = this.options.message;
        }
        else if (this.options.message_attribute && body_attribute) {
            this.message_details = body_attribute;
        }
        else if (this.options.fallback_message_attribute && fallback_attribute) {
            this.message_details = fallback_attribute;
        }
        else {
            this.message_details = { message: this.options.default_message };
        }

        if (this.message_details.constructor === String) {
            this.message_details = { message: this.message_details };
        }

        return this.message_details.message !== undefined;
    };

    Messages.prototype.cleanMessages = function(){
        var clean = null;
        if (this.options.clean === true || this.options.clean === false) {
            clean = this.options.clean;
        }
        else { clean = true; }

        if (clean) {
            var this_element = this.element;
            $.each(this.options.alert_classes, function(key, value) {
                $(this_element).find('.' + value).slideUp(200, function() {
                    $(this).remove();
                });
            });
        }
    };

    Messages.prototype.findStyleClass = function(){
        var this_options = this.options;
        var message_class = '';

        $.each(this.options.alert_classes, function(key, value) {
            if (this_options.message_type === key) { message_class = value; }
        });

        return message_class;
    };

    Messages.prototype.insertMessage = function(){
        var message_class = this.findStyleClass();

        var message = $('<div>').attr('class', 'alert ' + message_class);
        if (this.message_details.hasOwnProperty('message')) {
            message.html(this.message_details.message);
        }
        else {
            message.html(this.message_details);
        }

        var element = null;
        if(this.message_details.field_name){
            var element_selector = '[name="' + this.message_details.field_name + '"]';
            element = $(this.element).find(element_selector);
            message.attr('class', 'fieldError alert ' + message_class).hide();
            element.parent().append(message);
            message.slideDown(200);
            return;
        }

        if (this.options.attach_to) {
            element = $(this.element).find(this.options.attach_to);
            message.attr('class', 'fieldError alert ' + message_class).hide();
            element.after(message);
            message.slideDown(200);
            return;
        }

        $(this.element).prepend(message.hide());
        message.slideDown(200);
    };
})(jQuery);
