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
	let dummyID = `dummy-${id}`;

	let editorDummy = $('<textarea />', {
		id: dummyID,
		style: 'height: 0; width: 0; position: absolute; left: -9999px',
	});

	editorDummy.insertAfter(target);

	function addLinkText(e) {
		$('#wp-link-text').val(
			$(e.currentTarget)
				.find('.item-title')
				.text(),
		);
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

			$('#search-results, #most-recent-results').off(
				'click.carbon-fields-urlpicker',
				'li',
				addLinkText,
			);

			resolve(data);
		});
	});
};
