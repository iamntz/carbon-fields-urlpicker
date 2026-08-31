/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';


import {
  maybeLoadTinyMcerPicker,
  openTinyMceLinkEditor,
} from './LinkPicker.js';

const asString = (value) => (typeof value === 'string' ? value : '');

class UrlPickerField extends Component {
  getValue = () => {
    const raw = this.props.value || this.props.field.value || {};
    const value = raw && typeof raw === 'object' ? raw : {};

    return {
      url: asString(value.url),
      anchor: asString(value.anchor),
      blank: value.blank ? 1 : 0,
    };
  }

  resetFieldValues = (e) => {
    e.preventDefault();
    const {id} = this.props;

    this.props.onChange(id, {
      url: '',
      anchor: '',
      blank: '',
    });
  }

  openUrlPicker = ( e ) => {
      const target = e.currentTarget;
      const {id} = this.props; // use a unique id value in case field is used in complex field, field.id is always root field id
      const value = this.getValue();

      maybeLoadTinyMcerPicker()
        .then(() => openTinyMceLinkEditor(target, id, value))
        .then(data => this.props.onChange(id, { ...data }) );

      return false;
  }


  getButton = () => {
    const value = this.getValue();

    if( value.url.length > 0) {
      return  (
      <span
        className="carbon-fields--urlpicker"
        data-is-blank={value.blank}>
        <span onClick={this.openUrlPicker.bind(this)}>
          <strong>{value.url.replace(`${carbonFieldsUrlpickerL10n.home_url}`, '')}</strong>
          <br />
          <small><em>{value.anchor}</em></small>
        </span>

        <span
          className="carbon-fields--urlpicker__remove"
          onClick={this.resetFieldValues.bind(this)}
          title={carbonFieldsUrlpickerL10n.remove_link}>
          &times;
        </span>
      </span>
    );
    }

   return (
      <span className="button button-secondary" onClick={this.openUrlPicker.bind(this)}>
        {carbonFieldsUrlpickerL10n.select_link}
      </span>
    )
  }
  /**
   * Render a number input field.
   *
   * @return {Object}
   */
  render() {
    const { name } = this.props;
    const value = this.getValue();

    return  (
      <div>
      {this.getButton()}

      <input
        name={`${name}[url]`}
        value={value.url}
        type="hidden"
        readOnly
      />

      <input
        name={`${name}[anchor]`}
        value={value.anchor}
        type="hidden"
        readOnly
      />

      <input
        name={`${name}[blank]`}
        value={value.blank}
        type="hidden"
        readOnly
      />
      </div>
    );
  }
}

export default UrlPickerField;
