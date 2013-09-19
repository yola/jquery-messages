# jQuery Messages Plugin

Easily display messages, alerts, warnings, and errors.

## Requirements
* jQuery 1.7 or higher
* For basic usage Messages is intended to be used with Bootstrap, but it is not required.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/yola/jquery-messages/master/dist/messages.min.js
[max]: https://raw.github.com/yola/jquery-messages/master/dist/messages.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/messages.min.js"></script>
```

## General Usage
Using the plugin is as easy as using jQuery:

```javascript
$("#my_element").displayMessage({message: "Hai"});
```

This will append a new message `Hai` to the top of `#my_element`. It will also remove all pre-existing Message that exist within `#my_element`.

A more advanced usage:

```javascript
$("#my_element").displayMessage({
    message_attribute: "user-error",
    message: "It looks like there is a typo.",
    message_type: "error",
    attach_to: ".internal_element",
    clean: false
});
```

Messages will look at `#my_element` for a data attribute `data-user-error` and use this as the message. If the data attribute does not exist Messages will fallback to the `message` option specified above. It will look inside `#my_element` for a match on `.internal-element` and the message appended there. Also, `clean: false` specifies that if there are existing messages inside `#my_element`, they will not be removed from the DOM.

##Options

### Message
The `message` option is used to specify the message text to display to the user.

Example usage:

```javascript
$("#my_element").displayMessage({message: "It looks like there is a typo."});
```

### Message Attribute
The `message_attribute` option specifies a data selector that holds message text. Remove the `data-` portion of the data selector.

Example usage:

```html
<form data-syntax-error="Please, enter a valid email." action="/form-endpoint">
...
</form>
```

```javascript
$("#my_element").displayMessage({message_attribute: 'syntax-error'});
```

### Attach To
The `attach_to` option is used to specify an element within the originally selected element to attach the message to.

Example Usage:

```javascript
$("#my_element").displayMessage({
    message: "Please enter a valid email",
    attach_to: "#email_input"
});
```

### Clean
The `clean` option is used to tell Messages to clean all previous messages or leave them in place. The `clean` option can be set to `true` and `false`.

### Message Type
The `message_type` option is used to set the class of the message displayed to the user. The values that may be set by default are as follows:

* All messages get the `alert` class.
* `message_type: 'error'` gets the `alert-error` class
* `message_type: 'success'` gets the `alert-success` class
* `message_type: 'info'` gets the `alert-info` class
* `message_type: 'loading'` gets the `alert-info loading` classes

These are Twitter Bootsrap alert classes. You may override these features in a few different ways. See the "Overriding Default CSS Classes" section below.

### Alert Classes

See section below, titled "Overriding Default CSS Classes" for documentation on the `alert_classes` option.

## Overriding Default CSS Classes
Out of the box Messages comes with some basic classes with which to style your messages. You may find these class names in the Options > Message Type section above.

If you don't like how Bootstrap styles alerts you may do either of the following:

* Don't use Twitter Bootstrap and implement these CSS classes yourself
* Override the styles that Bootstrap gives these alerts

You may also want to override the class names by sending in your own classes at the time of the call, like this:

```javascript
$('#my_element').displayMessage({
    message: 'It looks like there is a typo.',
    message_type: 'error',
    alert_classes: {
        'error': 'different_error_class'
    }
    attach_to: '.internal_element',
    clean: false
});
```

Or even make your own alert type:

```javascript
$('#my_element').displayMessage({
    message: 'It looks like there is a typo.',
    message_type: 'foobar',
    alert_classes: {
        'foobar': 'foobar_class'
    }
    attach_to: '.internal_element',
    clean: false
});
```

If you want to define your own set of alert classes, we recommend putting them in an object and sending them to Messages on every call:

```javascript
window.my_alert_classes = {
    'warning': 'warning_class',
    'error': 'error_class',
    'success': 'success_class',
}
```

```javascript
$('#my_element').displayMessage({
    message: 'It looks like there is a typo.',
    message_type: 'success',
    alert_classes: window.my_alert_classes,
    attach_to: '.internal_element',
    clean: false
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1 - First development release.

## License
Copyright (c) 2013 kahnjw  
Licensed under the MIT license.
