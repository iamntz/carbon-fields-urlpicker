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

import {
	maybeLoadTinyMcerPicker,
	openTinyMceLinkEditor,
} from './LinkPicker.js';

export const UrlPicker = ({ name, field, resetFieldValues, openUrlPicker }) => {
	return (
		<Field field={field}>
			{field.value.url.length > 0 ? (
				<span
					className="carbon-fields--urlpicker"
					data-is-blank={field.value.blank ? 1 : 0}>
					<span onClick={openUrlPicker}>
						<strong>{field.value.url.replace(`${carbonFieldsUrlpickerL10n.home_url}`, '')}</strong>
						<br />
						<small><em>{field.value.anchor}</em></small>
					</span>

					<span
						className="carbon-fields--urlpicker__remove"
						onClick={resetFieldValues}
						title={carbonFieldsUrlpickerL10n.remove_link}>
						&times;
					</span>
				</span>
			) : (
				<span className="button button-secondary" onClick={openUrlPicker}>
					{carbonFieldsUrlpickerL10n.select_link}
				</span>
			)}

			<input
				name={`${name}[url]`}
				value={field.value.url}
				type="hidden"
				readOnly
			/>

			<input
				name={`${name}[anchor]`}
				value={field.value.anchor}
				type="hidden"
				readOnly
			/>

			<input
				name={`${name}[blank]`}
				value={field.value.blank}
				type="hidden"
				readOnly
			/>
		</Field>
	);
};

UrlPicker.propTypes = {
	name: PropTypes.string,
	field: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.shape({
			url: PropTypes.string,
			anchor: PropTypes.string,
			blank: PropTypes.boolean,
		}),
	}),
	resetFieldValues: PropTypes.func,
	openUrlPicker: PropTypes.func,
};

export const enhance = compose(
	withStore(),
	withSetup(),

	withHandlers({
		resetFieldValues: ({ field, setFieldValue }) => ({ target: { value } }) => {
			setFieldValue(field.id, {
				url: '',
				anchor: '',
				blank: 0,
			});
		},

		openUrlPicker: ({ field, setFieldValue }) => (e) => {
			let target = e.currentTarget;

			maybeLoadTinyMcerPicker()
				.then(() => {
					return openTinyMceLinkEditor(target, field);
				})
				.then((data) => {
					setFieldValue(field.id, { ...data });
				});
			return false;
		},
	}),
);

export default setStatic('type', ['urlpicker'])(enhance(UrlPicker));
