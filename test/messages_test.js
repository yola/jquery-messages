(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery.messages.test1', {
    // This will run before each test in this module.
    setup: function() {

      this.message_text = 'test message';
    }
  });

  test('inserts message', function() {
    expect(1);

    $('#qunit').message({message: this.message_text});
    var message_contents = $('.alert').html();

    equal(this.message_text,  message_contents, 'They\'re not equal!');
  });

  test('inserts message from attribute', function () {
    expect(1);

    $('#qunit').attr('data-message', this.message_text);

    $('#qunit').message({
      message_attribute: 'message',
    });

    var message_contents = $('.alert').html();

    equal(this.message_text,  message_contents, 'They\'re not equal!');
  });

  test('inserts message from fallback', function () {
    expect(1);

    $('body').attr('data-message-fallback', this.message_text);

    $('#qunit').message({
      message_attribute: 'message',
      fallback_message_attribute: 'message-fallback'
    });

    var message_contents = $('.alert').html();

    equal(this.message_text,  message_contents, 'They\'re not equal!');
  });

  test('attach message to', function () {
    expect(1);
    var expected = 'qunit';
    var attach_id = '#' + expected;

    $('body').message({
      message: this.message_text,
      attach_to: attach_id
    });

    var attached_to = $('.alert').prev().attr('id');
    equal(attached_to, expected, 'They\'re not equal!');
  });

}(jQuery));
