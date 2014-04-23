# jQuery Messages Plugin

[![Build Status](https://travis-ci.org/yola/jquery-messages.png)](https://travis-ci.org/yola/jquery-messages)


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
$("#my_element").message({message: "Hai"});
```

This will append a new message `Hai` to the top of `#my_element`. It will also remove all pre-existing Message that exist within `#my_element`.

A more advanced usage:

```javascript
$("#my_element").message({
    message_attribute: "user-error",
    message: "It looks like there is a typo.",
    classes: "alert-error alert-danger",
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
$("#my_element").message({message: "It looks like there is a typo."});
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
$("#my_element").message({message_attribute: 'syntax-error'});
```

### Attach To
The `attach_to` option is used to specify an element within the originally selected element to attach the message to.

Example Usage:

```javascript
$("#my_element").message({
    message: "Please enter a valid email",
    attach_to: "#email_input"
});
```

### Clean
The `clean` option is used to tell Messages to clean all previous messages or leave them in place. The `clean` option can be set to `true` and `false`.

### Classes
The `classes` option is used to specify what CSS class or classes should be
applied to the message element.

Example Usage:

```javascript
$("#my_element").message({
    message: "Please enter a valid email",
    classes: "alert-danger alert-error"
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1 - First development release.

## License
Copyright (c) 2013 Yola
Licensed under the MIT license.
