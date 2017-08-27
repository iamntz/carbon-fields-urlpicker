/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

/**
 * Render a number input field.
 *
 * @param  {Object}        props
 * @param  {String}        props.name
 * @param  {Object}        props.field
 * @param  {Function}      props.handleChange
 * @return {React.Element}
 */
export const UrlPicker = ({
	name,
	field,
	handleChange,
	openUrlPicker
}) => {
	return <Field field={field}>
		<span
			className="button button-secondary"
			onClick={openUrlPicker}>cucu</span>
		<input
			name={`${name}[url]`}
			value={field.value.url}
			readOnly />

		<input
			name={`${name}[url_anchor]`}
			value={field.value.url_anchor}
			readOnly />

		<input
			name={`${name}[blank]`}
			value={field.value.blank}
			readOnly />
	</Field>;
}

/**
 * Validate the props.
 *
 * @type {Object}
 */
UrlPicker.propTypes = {
	name: PropTypes.string,
	field: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.shape({
			url: PropTypes.string,
			url_anchor: PropTypes.string,
			blank: PropTypes.boolean,
		})
	}),
	handleChange: PropTypes.func,
	openUrlPicker: PropTypes.func,
};

/**
 * The enhancer.
 *
 * @type {Function}
 */
export const enhance = compose(
	/**
	 * Connect to the Redux store.
	 */
	withStore(),

	/**
	 * Attach the setup hooks.
	 */
	withSetup(),

	/**
	 * The handlers passed to the component.
	 */
	withHandlers({
		handleChange: ({ field, setFieldValue }) => ({ target: { value } }) => setFieldValue(field.id, value),
		openUrlPicker: ({ field }) => ({ target: { value } }) => {
			var editorDummy = jQuery('<textarea />', {
				id: field.id
			});

			editorDummy.appendTo('body')
		    // save any existing default initialization
		    // wplink_defaults = wpLink.setDefaultValues || {};

		    // initialize with current URL and title
		    // wpLink.setDefaultValues = function() {
		    //     // set the current title and URL
		    //     var $text_inputs = $('#wp-link').find('input[type=text]');
		    //     $($text_inputs[1]).val(field.url_anchor);
		    //     $($text_inputs[0]).val(field.url);

		    //     // target a blank page?
		    //     var $checkbox_inputs = $('#wp-link').find('input[type=checkbox]');
		    //     $checkbox_inputs.first().prop('checked', field.blank);
		    // };
		    wpLink.open(field.id); // open the link popup

			return false;
		},
	})
);

export default setStatic('type', [
	'urlpicker',
])(enhance(UrlPicker));

