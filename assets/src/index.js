/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import UrlPickerField from './UrlPickerField';

registerFieldType( 'urlpicker', UrlPickerField );
