<?php
use Carbon_Fields\Carbon_Fields;
use Carbon_Field_UrlPicker\UrlPicker_Field;

define('Carbon_Field_UrlPicker\\DIR', __DIR__);

add_action('after_setup_theme', function () {
	Carbon_Fields::extend(UrlPicker_Field::class, function ($container) {
		return new UrlPicker_Field( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
	});
}, 99);
