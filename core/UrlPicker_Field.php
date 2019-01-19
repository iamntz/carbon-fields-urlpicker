<?php

namespace Carbon_Field_UrlPicker;

use Carbon_Fields\Field\Field;
use Carbon_Fields\Value_Set\Value_Set;

class UrlPicker_Field extends Field
{

	protected $url = '';
	protected $anchor = '';
	protected $blank = 0;

	/**
	 * Create a field from a certain type with the specified label.
	 *
	 * @param string $type  Field type
	 * @param string $name  Field name
	 * @param string $label Field label
	 */
	public function __construct($type, $name, $label)
	{
		$this->set_value_set(new Value_Set(Value_Set::TYPE_MULTIPLE_PROPERTIES, [
			'url' => $this->url,
			'anchor' => $this->anchor,
			'blank' => (bool) $this->blank
		]));

		remove_action('wp_ajax_carbonfields_urlpicker_get_tinymce_popup', [$this, 'get_tinymce_popup']);
		add_action('wp_ajax_carbonfields_urlpicker_get_tinymce_popup', [$this, 'get_tinymce_popup']);

		parent::__construct($type, $name, $label);
	}

	/**
	 * Prepare the field type for use
	 * Called once per field type when activated
	 */
	public static function field_type_activated()
	{
		$dir = \Carbon_Field_UrlPicker\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain('carbon-field-urlpicker', $path);
	}

	/**
	 * Enqueue scripts and styles in admin
	 * Called once per field type
	 */
	public static function admin_enqueue_scripts()
	{
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url(\Carbon_Field_UrlPicker\DIR);

		$suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

		# Enqueue JS
		wp_register_script('carbon-field-urlpicker', $root_uri . "/assets/build/bundle{$suffix}.js", ['carbon-fields-core', 'wplink', 'wpdialogs']);

		wp_localize_script('carbon-field-urlpicker', 'carbonFieldsUrlpickerL10n', [
			'select_link' => __('Select Link'),
			'remove_link' => __('Remove Link'),
			'home_url' => home_url(),
		]);

    wp_enqueue_script('carbon-field-urlpicker');

		# Enqueue CSS
		wp_enqueue_style('carbon-field-urlpicker', $root_uri . "/assets/build/bundle{$suffix}.css", ['editor-buttons']);
	}

	public function get_tinymce_popup()
	{
		require_once ABSPATH . "wp-includes/class-wp-editor.php";
		\_WP_Editors::wp_link_dialog();
		die();
	}

	/**
	 * Load the field value from an input array based on it's name
	 *
	 * @param array $input Array of field names and values.
	 */
	public function set_value_from_input($input)
	{
		if (!isset($input[$this->get_name()])) {
			$this->set_value(null);
			return $this;
		}

		$value_set = [
			'url' => $this->url,
			'anchor' => $this->anchor,
			'blank' => (bool) $this->blank,
		];

		foreach ($value_set as $key => $v) {
			if (isset($input[$this->get_name()][$key])) {
				$value_set[$key] = $input[$this->get_name()][$key];
			}
		}

		$this->set_value($value_set);
		return $this;
	}

	/**
	 * Returns an array that holds the field data, suitable for JSON representation.
	 *
	 * @param bool $load  Should the value be loaded from the database or use the value from the current instance.
	 * @return array
	 */
	public function to_json($load)
	{
		$field_data = parent::to_json($load);

		$field_data['value']['blank'] = (bool)$field_data['value']['blank'];

		$field_data = array_merge($field_data, [
			'url' => $this->url,
			'anchor' => $this->anchor,
			'blank' => (bool) $this->blank,
		]);

		return $field_data;
	}
}
