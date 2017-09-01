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
 * @param  {Function}      props.resetFieldValues
 * @return {React.Element}
 */
export const UrlPicker = ({
	name,
	field,
	resetFieldValues,
	openUrlPicker
}) => {
	return <Field field={field}>
		<span
			className="button button-secondary"
			onClick={openUrlPicker}>cucu</span>

		<input
			name={`${name}[url]`}
			value={field.value.url}
			type="hidden"
			readOnly />

		<input
			name={`${name}[url_anchor]`}
			value={field.value.url_anchor}
			type="hidden"
			readOnly />

		<input
			name={`${name}[blank]`}
			value={field.value.blank}
			type="hidden"
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
	resetFieldValues: PropTypes.func,
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
		resetFieldValues: ({ field, setFieldValue }) => ({ target: { value } }) => {
			console.log(field.id, value);
			// setFieldValue(field.id, value)
		},
		openUrlPicker: ({ field, setFieldValue }) => ({ target: { value } }) => {
			let dummyID = 'dummy' + field.id;
			let $ = jQuery;

			if(!$('#wp-link-wrap').length) {
				$.get(ajaxurl, { action: 'carbonfields_urlpicker_get_tinymce_popup' }, function(data) {
					$('#wpfooter').after(data);
					openTinyMceLinkEditor();
				});
			} else {
				openTinyMceLinkEditor();
			}

			function openTinyMceLinkEditor() {
				let editorDummy = jQuery('<textarea />', {
					id: dummyID
				});

				editorDummy.appendTo('body')
				wpLink.setDefaultValues = function() {
					$('#wp-link-url').val(field.value.url);
					$('#wp-link-text').val(field.value.url_anchor);
					$('#wp-link-target').prop('checked', field.value.blank);
				};

				wpLink.init();
				wpLink.open(dummyID);

				$(document).one( 'wplink-close', function(e, wrap){
					setFieldValue(field.id, {
						url: $('#wp-link-url').val(),
						url_anchor: $('#wp-link-text').val(),
						blank: $('#wp-link-target').is(':checked'),
					});
				} );
			}

			return false;
		},
	})
);

export default setStatic('type', [
	'urlpicker',
])(enhance(UrlPicker));

