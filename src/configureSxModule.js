define([
	'fontoxml-families/configureAsFrame',
	'fontoxml-families/configureAsSheetFrame',
	'fontoxml-families/configureAsTitleFrame',
	'fontoxml-families/createMarkupLabelWidget',
	'fontoxml-families/createRelatedNodesQueryWidget',
	'fontoxml-localization/t'
], function (
	configureAsFrame,
	configureAsSheetFrame,
	configureAsTitleFrame,
	createMarkupLabelWidget,
	createRelatedNodesQueryWidget,
	t
) {
	'use strict';

	return function configureSxModule (sxModule) {
		// glossgroup
		//     The <glossgroup> element may be used to contain multiple <glossentry> topics within a single
		//     collection.
		configureAsSheetFrame(sxModule, 'self::glossgroup', t('glossary'), {
			titleQuery: './title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
			blockFooter: [
				createRelatedNodesQueryWidget('descendant::fn[not(@conref) and fonto:in-inline-layout(.)]')
			],
			blockHeaderLeft: [
				createMarkupLabelWidget()
			]
		});

		// glossgroup nested in topic
		configureAsFrame(sxModule, 'self::glossgroup[parent::*[fonto:dita-class(., "topic/topic")]]', undefined, {
			blockFooter: []
		});

		// title in glossary
		configureAsTitleFrame(sxModule, 'self::title[parent::glossgroup]', undefined, {
			fontVariation: 'document-title'
		});
	};
});
