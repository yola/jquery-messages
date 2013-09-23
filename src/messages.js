;(function($){
    'use strict';
    var pluginName = 'Messages',
        defaults = {
            default_classes: 'alert'
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
        var remove_classes;
        if(classes !== undefined){
            remove_classes = classes.split(' ');
        } else {
            remove_classes = defaults.default_classes.split(' ');
        }
        $.each(remove_classes, function(key, value){
            $('.' + value).remove();
        });
    };

    function Messages(element, options){
        this.element = element;
        this.options = options;
        var default_classes = defaults.default_classes.split(' ');

        if(this.options.hasOwnProperty('classes')) {
            this.options.classes = this.options.classes.split(' ');
            this.options.classes = this.options.classes.concat(default_classes);
        } else {
            this.options.classes = default_classes;
        }

        this._defaults = defaults;
        this._name = pluginName;

        if (this.options.clean === true || this.options.clean === false) {
            this.clean = this.options.clean;
        }
        else { this.clean = true; }

        if (this.options.slideIn === true || this.options.slideIn === false) {
            this.slideIn = this.options.slideIn;
        }
        else { this.slideIn = false; }

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
        if (this.clean) {
            var this_element = this.element;
            $.each(this.options.classes, function(key, value) {
                if(this.slideIn) {
                    $(this_element).find('.' + value).slideUp(200, function() {
                        $(this).remove();
                    });
                } else { $(this_element).find('.' + value).remove(); }
            });
        }
    };

    Messages.prototype.printableClasses = function() {
        return this.options.classes.join(' ');
    };

    Messages.prototype.insertMessage = function(){
        var message_class = this.printableClasses();

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

            if(this.slideIn) { message.slideDown(200); }
            else { message.show(); }

            return;
        }

        if (this.options.attach_to) {
            element = $(this.element).find(this.options.attach_to);
            message.attr('class', 'fieldError ' + message_class).hide();
            element.after(message);

            if(this.slideIn) { message.slideDown(200); }
            else { message.show(); }

            return;
        }

        $(this.element).prepend(message.hide());

        if(this.slideIn) { message.slideDown(200); }
        else { message.show(); }
    };
})(jQuery);
