let $ = jQuery;

export const maybeLoadTinyMcerPicker = () => {
	return new Promise((resolve, reject) => {
		if ($('#wp-link-wrap').length) {
			resolve();
			return;
		}

		$.get(
			ajaxurl,
			{ action: 'carbonfields_urlpicker_get_tinymce_popup' },
			function(data) {
				$('#wpfooter').after(data);
				wpLink.init();
				resolve();
			},
		);
	});
};

export const openTinyMceLinkEditor = (target, id, value) => {
	let dummyID =
		'carbonfields-urlpicker-dummy-' +
		String(id).replace(/[^a-zA-Z0-9_-]/g, '-');

	// Drop any leftover dummies (e.g. from a dialog closed with ESC).
	$('[id^="carbonfields-urlpicker-dummy-"]').remove();

	let editorDummy = $('<textarea />', {
		id: dummyID,
		style: 'height: 0; width: 0; position: absolute; left: -9999px; top: 0;',
	}).appendTo(document.body);

	function addLinkText(e) {
		$('#wp-link-text').val(
			$(e.currentTarget)
				.find('.item-title')
				.text(),
		);
	}

	function cleanup() {
		$('#search-results, #most-recent-results').off(
			'click.carbon-fields-urlpicker',
			'li',
			addLinkText,
		);
		$('#wp-link-close, #wp-link-backdrop, #wp-link-cancel button').off(
			'click.carbon-fields-urlpicker',
			cleanup,
		);
		editorDummy.remove();
	}

	wpLink.setDefaultValues = function() {
		$('#wp-link-url').val(value.url);
		$('#wp-link-text').val(value.anchor);
		$('#wp-link-target').prop('checked', !!value.blank);
	};

	wpLink.open(dummyID);

	$('#search-results, #most-recent-results').on(
		'click.carbon-fields-urlpicker',
		'li',
		addLinkText,
	);

	$('#wp-link-close, #wp-link-backdrop, #wp-link-cancel button').on(
		'click.carbon-fields-urlpicker',
		cleanup,
	);

	return new Promise((resolve, reject) => {
		editorDummy.one('change', (e, wrap) => {
			let data = {
				url: $('#wp-link-url').val(),
				anchor: $('#wp-link-text').val(),
				blank: $('#wp-link-target').prop('checked') ? 1 : 0,
			};

			wpLink.setDefaultValues = function() {
				$('#wp-link-url').val('');
				$('#wp-link-text').val('');
				$('#wp-link-target').prop('checked', false);
			};

			cleanup();

			resolve(data);
		});
	});
};
