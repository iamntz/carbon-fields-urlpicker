/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = this["carbon.core"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() { module.exports = this["carbon.vendor"]; }());

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registry = __webpack_require__(3);

var _field = __webpack_require__(4);

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The internal dependencies.
 */
(0, _registry.registerFieldComponent)('urlpicker', _field2.default);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))("uokr");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.enhance = exports.UrlPicker = undefined;

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = __webpack_require__(8);

var _field = __webpack_require__(9);

var _field2 = _interopRequireDefault(_field);

var _withStore = __webpack_require__(10);

var _withStore2 = _interopRequireDefault(_withStore);

var _withSetup = __webpack_require__(11);

var _withSetup2 = _interopRequireDefault(_withSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render a number input field.
 *
 * @param  {Object}        props
 * @param  {String}        props.name
 * @param  {Object}        props.field
 * @param  {Function}      props.resetFieldValues
 * @return {React.Element}
 */
/**
 * The external dependencies.
 */
var UrlPicker = exports.UrlPicker = function UrlPicker(_ref) {
	var name = _ref.name,
	    field = _ref.field,
	    resetFieldValues = _ref.resetFieldValues,
	    openUrlPicker = _ref.openUrlPicker;

	return _react2.default.createElement(
		_field2.default,
		{ field: field },
		field.value.url.length > 0 ? _react2.default.createElement(
			'span',
			{ className: 'carbon-fields--urlpicker', 'data-is-blank': field.value.blank ? 1 : 0 },
			_react2.default.createElement(
				'span',
				{ onClick: openUrlPicker },
				field.value.url.replace('' + carbonFieldsUrlpickerL10n.home_url, ''),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'small',
					null,
					field.value.anchor
				)
			),
			_react2.default.createElement(
				'span',
				{ className: 'carbon-fields--urlpicker__remove', onClick: resetFieldValues, title: carbonFieldsUrlpickerL10n.remove_link },
				'\xD7'
			)
		) : _react2.default.createElement(
			'span',
			{
				className: 'button button-secondary',
				onClick: openUrlPicker },
			carbonFieldsUrlpickerL10n.select_link
		),
		_react2.default.createElement('input', {
			name: name + '[url]',
			value: field.value.url,
			type: 'hidden',
			readOnly: true }),
		_react2.default.createElement('input', {
			name: name + '[anchor]',
			value: field.value.anchor,
			type: 'hidden',
			readOnly: true }),
		_react2.default.createElement('input', {
			name: name + '[blank]',
			value: field.value.blank,
			type: 'hidden',
			readOnly: true })
	);
};

/**
 * Validate the props.
 *
 * @type {Object}
 */


/**
 * The internal dependencies.
 */
UrlPicker.propTypes = {
	name: _propTypes2.default.string,
	field: _propTypes2.default.shape({
		id: _propTypes2.default.string,
		value: _propTypes2.default.shape({
			url: _propTypes2.default.string,
			anchor: _propTypes2.default.string,
			blank: _propTypes2.default.boolean
		})
	}),
	resetFieldValues: _propTypes2.default.func,
	openUrlPicker: _propTypes2.default.func
};

/**
 * The enhancer.
 *
 * @type {Function}
 */
var enhance = exports.enhance = (0, _recompose.compose)(
/**
 * Connect to the Redux store.
 */
(0, _withStore2.default)(),

/**
 * Attach the setup hooks.
 */
(0, _withSetup2.default)(),

/**
 * The handlers passed to the component.
 */
(0, _recompose.withHandlers)({
	resetFieldValues: function resetFieldValues(_ref2) {
		var field = _ref2.field,
		    setFieldValue = _ref2.setFieldValue;
		return function (_ref3) {
			var value = _ref3.target.value;

			setFieldValue(field.id, {
				url: '',
				anchor: '',
				blank: 0
			});
		};
	},

	openUrlPicker: function openUrlPicker(_ref4) {
		var field = _ref4.field,
		    setFieldValue = _ref4.setFieldValue;
		return function (_ref5) {
			var value = _ref5.target.value;

			var dummyID = 'dummy' + field.id;
			var $ = jQuery;

			if (!$('#wp-link-wrap').length) {
				$.get(ajaxurl, { action: 'carbonfields_urlpicker_get_tinymce_popup' }, function (data) {
					$('#wpfooter').after(data);
					wpLink.init();
					openTinyMceLinkEditor();
				});
			} else {
				openTinyMceLinkEditor();
			}

			function addLinkText(e) {
				$('#wp-link-text').val($(e.currentTarget).find('.item-title').text());
			}

			function openTinyMceLinkEditor() {
				var editorDummy = jQuery('<textarea />', {
					id: dummyID
				});

				editorDummy.appendTo('body');
				wpLink.setDefaultValues = function () {
					$('#wp-link-url').val(field.value.url);
					$('#wp-link-text').val(field.value.anchor);
					$('#wp-link-target').prop('checked', !!field.value.blank);
				};

				wpLink.open(dummyID);

				$('#search-results, #most-recent-results').on('click.carbon-fields-urlpicker', 'li', addLinkText);

				editorDummy.one('change', function (e, wrap) {
					console.log(e, wrap);
					setFieldValue(field.id, {
						url: $('#wp-link-url').val(),
						anchor: $('#wp-link-text').val(),
						blank: $('#wp-link-target').prop('checked') ? 1 : 0
					});

					wpLink.setDefaultValues = function () {
						$('#wp-link-url').val('');
						$('#wp-link-text').val('');
						$('#wp-link-target').prop('checked', false);
					};

					$('#search-results, #most-recent-results').off('click.carbon-fields-urlpicker', 'li', addLinkText);
					$('#' + dummyID).remove();
				});
			}

			return false;
		};
	}
}));

exports.default = (0, _recompose.setStatic)('type', ['urlpicker'])(enhance(UrlPicker));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("GiK3");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("KSGD");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))("zpMW");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))("M6Uh");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))("0yqe");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))("8ctJ");

/***/ })
/******/ ]);