define([
	'fontoxml-families/configureAsFrame',
	'fontoxml-families/configureAsSheetFrame',
	'fontoxml-families/configureAsTitleFrame',
	'fontoxml-families/createElementMenuButtonWidget',
	'fontoxml-families/createMarkupLabelWidget',
	'fontoxml-families/createRelatedNodesQueryWidget',
	'fontoxml-localization/t'
], function (
	configureAsFrame,
	configureAsSheetFrame,
	configureAsTitleFrame,
	createElementMenuButtonWidget,
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
			contextualOperations: [
				{ name: ':glossgroup-append-glossentry', hideIn: ['context-menu'] },
				{ name: ':glossgroup-insert-glossentry', hideIn: ['breadcrumbs-menu', 'element-menu'] }
			],
			titleQuery: './title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
			blockFooter: [
				createRelatedNodesQueryWidget('descendant::fn[not(@conref) and fonto:in-inline-layout(.)]')
			],
			blockHeaderLeft: [
				createMarkupLabelWidget()
			],
			blockOutsideAfter: [
				createElementMenuButtonWidget()
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
