## Carbon Field: urlpicker

_(this is an extension of [Carbon Fields](http://carbonfields.net/) plugin)_

You can install it via composer:

```
composer require iamntz/carbon-fields-urlpicker --prefer-dist
```

If you install it from the source, you need to make sure that you also run `npm install` and `npm run production` in order to have assets compiled.

## Return values:
The field will return an associative array with the following values:

```
url: the actual URL
anchor: the text anchor (might be blank)
blank: wether the link should open in a new window or not
```

## Example

### Registering A Field
This goes in your `functions.php` as with other Carbon Fields fields. The only difference is that the type is `urlpicker`.

```php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action( 'carbon_fields_register_fields', 'crb_url_picker_test' );

function crb_url_picker_test() {
  Container::make( 'post_meta', 'URL Picker Test' )
    ->add_fields( array(
      Field::make( 'urlpicker', 'crb_my_link', 'URL Picker Test' )
      ->set_help_text( "This is a test of the URL picker." )
    ));
}
```

### Using Field Values

```php
<?php $my_link = carbon_get_the_post_meta( 'crb_my_link' ); ?>
<a href="<?= $my_link[url] ?>"<?= ( $my_link[blank] ? ' target="_blank"' : '') ?>><?= $my_link[anchor] ?></a>
```

Note that the `blank` field will return `0` or `1`, depending on whether the checkbox is ticked next to "Open link in a new tab".

## Found this useful?

You can get [hosting](https://m.do.co/c/c95a44d0e992) (and receive $10 credit!), [donate](https://www.paypal.me/iamntz) or buy me a [gift](http://iamntz.com/wishlist).

