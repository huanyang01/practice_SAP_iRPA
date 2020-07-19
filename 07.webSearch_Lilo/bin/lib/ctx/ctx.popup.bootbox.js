/**
 * @module      Bootstrap popup templates
 * @file        ctx/ctx.popup.bootbox.js
 * @description Bootstrap popup templates are a set of pre-defined templates based on the Bootstrap JS framework.\\
 * \\
 * See [[http://getbootstrap.com/|Bootstrap Web site]] for more details about this framework.\\
 * \\
 * It provides an easy way to display popups or forms with advanced html content, buttons, input controls, ...\\
 * \\
 * To avoid spending time in learning Bootstrap syntax and possibilities, the templates provides a configuration interface which allows to specify the html content to display (messages, controls, ...) by providing a description object.\\
 * \\
 * Different types of templates are provided by default:
 *   * simple popups to display messages, with buttons ('Yes', 'No', 'Ok', 'Cancel', 'Close', ...),
 *   * tooltip popups,
 *   * forms to input values.
 *
 * The template can be displayed inside a web browser (Internet Explorer) or in a popup ('ctx.popup.messbox2').
 *
 * Syntax to display a popup is:
 *
<code javascript>
var popup = ctx.popup( '<popup name>'[, <template name>] ).open( <container options> <html options> );
</code>
 *
 * For more details about the popup management, see [[:lib:ctx:ctx.popup|ctx.popup]].\\
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @enumeration  popup.template
 * @enum         {string}
 * @path         e.popup.template
 * @readonly
 * @var None Base default template
 * @var NoButton Display template without buttons
 * @var Close Display template with 'Close' button
 * @var Ok Display template with 'Ok' button
 * @var YesNo Display template with 'Yes', 'No' buttons
 * @var OkCancel Display template with 'Ok', 'Cancel' buttons
 * @var OkCancelOther Display template with 'Ok', 'Cancel', 'Other' buttons
 * @var FormSubmit Template used to build forms
 * @var Tooltip Template used to build tooltips
 * @var TooltipAlert Template used to build progress tooltips (right bottom corner with slide effect)
 * @var AppBar Template used to build application bars (AppBar)
 * @var AppBarHorizontal Template used to build application bars (AppBar)
 * @var Maps Template used to display Google Maps or StreetView popup
 */
e.popup.template = {
  None:               'pCtxtPopupBase',
  NoButton:           'pCtxtPopupBootstrapNoButton',
  Close:              'pCtxtPopupBootstrapClose',
  Ok :                'pCtxtPopupBootstrapOk',
  YesNo:              'pCtxtPopupBootstrapYesNo',
  OkCancel:           'pCtxtPopupBootstrapOkCancel',
  OkCancelOther:      'pCtxtPopupBootstrapOkCancelOther',
  FormSubmit:         'pCtxtPopupBootstrapFormSubmit',
  Tooltip:            'pCtxtPopupBootstrapTooltip',
  TooltipAlert:       'pCtxtPopupBootstrapTooltipAlert',
  TooltipAlertClose:  'pCtxtPopupBootstrapTooltipAlertClose',
  AppBar:             'pCtxtPopupAppBar',
  AppBarHorizontal:   'pCtxtPopupAppBarHorizontal',
  Maps:               'pCtxtPopupBootstrapMaps'
}

// init button labels
GLOBAL.labels.set({
  buttons: {
    start: { _comment:"Start button", _type:"XBUT", en:"Start"},
    restart: { _comment:"Restart button", _type:"XBUT", en:"Restart" },
    stop: { _comment:"Stop button", _type:"XBUT", en:"Shutdown" },
    yes: { _comment:"Yes button", _type:"XBUT", en:"Yes" },
    no: { _comment:"No button", _type:"XBUT", en:"No" },
    ok: { _comment:"OK button", _type:"XBUT", en:"Ok" },
    cancel: { _comment:"Cancel button", _type:"XBUT", en:"Cancel" },
    open: { _comment:"Open button", _type:"XBUT", en:"Open" },
    del: { _comment:"Delete button", _type:"XBUT", en:"Delete" },
    close: { _comment:"Close button", _type:"XBUT", en:"Close" },
    submit: { _comment:"Submit button", _type:"XBUT", en:"Submit" },
    other: { _comment:"Other button", _type:"XBUT", en:"Other" }
  },
  popup: {
    defaultTitle: { _comment:"Default popup title", _type:"XTIT", en:"Desktop Agent" }
  },
  stopPopup: {
    title: { en:"Agent shutdown" },
    label: { en:"Are you sure you want to stop Agent ?" }
  },
	changeLanguagePopup: {
		title: { _comment: "Title of the popup displayed when the user changes the language", _type: "XTIT", en:"Language change"},
		changeInfo: { _comment: "Indication of the selected language", _type: "XMSG", en:"You changed language to "},
		requestRestart: { _comment: "The user must restart the agent to see changes", _type: "XMSG", en:"Language changes will be taken in account after a restart of the agent"}
	},
//  restartPopup: {
//    title: { en:"Agent restart" },
//    label: { en:"Do you want to restart now ?" }
//  },
  updatePopup: {
    title: { en:"Agent update" },
    label: { en:"A new version is available, do you want to restart now ?" }
  }
});


// ===Popup template hierarchy===
// * \\
// * <WRAP orgchart>
// * ^Name              ^Parent        ^Description                         ^
// * |None              |              |Root template                       |
// * |NoButton          |None          |Basic empty popup                   |
// * |Close             |NoButton      |Popup with 'Close'                  |
// * |Ok                |NoButton      |Popup with 'Ok'                     |
// * |YesNo             |NoButton      |Popup with 'Yes', 'No'              |
// * |OkCancel          |NoButton      |Popup with 'Ok', 'Cancel'           |
// * |OkCancelOther     |NoButton      |Popup with 'Ok', 'Cancel' , 'Other' |
// * |FormSubmit        |NoButton      |Popup to display a form             |
// * |Tooltip           |NoButton      |Tooltip popup                       |
// * |TooltipProgress   |Tooltip       |Tooltip for progress display        |
// * |Maps              |Tooltip       |Tooltip for Google Maps display     |
// * |AppBar            |              |Application bar popup (vertical)    |
// * |AppBarHorizontal  |              |Application bar popup (horizontal)  |
// * </WRAP>


/**
 * Bootstrap Popup templates: just an alias for compatibility with existing configurations
 * @enumeration  popup.bootbox
 * @deprecated   Use **e.popup.template** instead of e.popup.bootbox
 * @advanced
 * @enum         {string}
 * @path         e.popup.bootbox
 * @readonly
 */
e.popup.bootbox = e.popup.template;

ctx.mapObject(e);
GLOBAL.labels.ctxType='GLOBAL.labels';
ctx.mapObject(GLOBAL.labels);//This will overwrite GLOBAL.labels. It is restored in ctx.interfacepost

ctx.popup.bootstrap = {
  type: {}
};

ctx.popup.bootstrap.meta = {};

ctx.popup.bootstrap.meta.type = {
  name: 'item type',
  description: 'item type (input, button, icon, list, ...)',
  type: 'string',
  required: true,
  readonly: true,
  group: '0 - General',
  value: ''
};

ctx.popup.bootstrap.meta.id = {
  name: 'id',
  description: 'item id. Can be modified later on.',
  type: 'string',
  validation: '',
  group: '0 - General',
  value: ''
};

//ctx.popup.bootstrap.meta.html = {
//  name: 'html',
//  description: 'html code',
//  type: 'string',
//  validation: '',
//  group: '0 - General',
//  value: ''
//};

ctx.popup.bootstrap.meta.parent = {
  name: 'parent',
  description: 'Contains the parent item id, as a string.',
  type: 'string',
  validation: '',
  group: '0 - General',
  value: ''
};

ctx.popup.bootstrap.meta.columns = {
  name: 'columns',
  description: 'table columns, included in a container',
  type: 'array',
  validation: '',
  group: '3 - Child items',
  value: ''
};

ctx.popup.bootstrap.meta.items = {
  name: 'items',
  description: 'object child items',
  type: 'array',
  validation: '',
  group: '3 - Child items',
  value: ''
};

ctx.popup.bootstrap.meta.menus = {
  name: 'menus',
  description: 'object child menus',
  type: 'array',
  validation: '',
  group: '3 - Child items',
  value: ''
};

ctx.popup.bootstrap.meta.rightMenus = {
  name: 'right menus',
  description: 'object child right menus',
  type: 'array',
  validation: '',
  group: '3 - Child items',
  value: ''
};

ctx.popup.bootstrap.meta.predecessor = {
  name: 'predecessor',
  description: 'predecessor item',  /// Predecessor de quoi ? Semble ne pas être utilisé
  type: 'string',
  validation: '',
  group: '0 - General',
  value: ''
};

ctx.popup.bootstrap.meta.auto = {
  name: 'auto declaration',
  description: 'item auto declaration', /// description à faire par ailleurs sur le principe d'auto declaration
  type: 'boolean',
  validation: '',
  group: '0 - General',
  value: true
};

ctx.popup.bootstrap.meta.markdown = {
  name: 'markdown',
  description: 'markdown syntax',   /// description à faire par ailleurs sur le principe de Markdown
  type: 'boolean',
  validation: '',
  group: '0 - General',
  value: false
};

ctx.popup.bootstrap.meta.indicators = {
  name: 'indicators',
  description: 'Little dots displayed or not, at the bottom of each slide (which indicates how many slides there is in the carousel, and which slide the user are currently viewing).',
  type: 'boolean',
  validation: '',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.previous = {
  name: 'previous',
  description: 'label for previous item',   /// previous item ? dans quel cadre ? Si on met n'importe quoi, une flêche apparait.
  type: 'string',
  validation: '',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.next = {
  name: 'next',
  description: 'label for next item',   /// Next item ? dans quel cadre ? Si on met n'importe quoi, une flêche apparait.
  type: 'string',
  validation: '',
  group: '1 - Display',
  value: ''
};

//ctx.popup.bootstrap.meta.badgeId = {
//  name: 'badge id',
//  description: 'Badges can be used as part of links or buttons to provide a counter.',
//  type: 'string',
//  validation: '',
//  group: '1 - Display',
//  value: ''
//};

//ctx.popup.bootstrap.meta.iconId = {
//  name: 'icon id',
//  description: 'icon id',     /// utilisé ?
//  type: 'string',
//  validation: '',
//  group: '2 - Icon',
//  value: ''
//};

ctx.popup.bootstrap.meta.tag = {
  name: 'item tag',
  description: 'item tag',    /// utilisé ?
  type: 'string',
  validation: '',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.title = {
  name: 'title',
  description: 'item title',
  type: 'string',
  validation: '',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.footer = {
  name: 'footer',
  description: 'footer label, displayed in the item',
  type: 'string',
  validation: '',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.collapsable = {
  name: 'collapsable',
  description: 'collapsable object',
  type: 'boolean',
  validation: '',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.collapsed = {
  name: 'collapsed',
  description: 'collapsed state',
  type: 'boolean',
  validation: '',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.visible = {
  name: 'visible',
  description: 'visible item (if checked)',
  type: 'boolean',
  validation: '',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.multiple = {
  name: 'multiple selection',
  description: 'multiple selection for a select control',
  type: 'boolean',
  validation: '',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.icon = {
  name: 'icon',
  description: 'glyphicon id to select',
  type: e.item.icon,
  group: '2 - Icon',
  value: e.item.icon.none
};

ctx.popup.bootstrap.meta.myClass = {
  name: 'class',
  description: 'potential additional class',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.myStyle = {
  name: 'style',
  description: 'potential additional style',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.iconStyle = {
  name: 'icon color',
  description: 'icon style (color)',
  type: e.item.style,
  group: '2 - Icon',
  value: e.item.style.None
};

ctx.popup.bootstrap.meta.iconSize = {
  name: 'icon size',
  description: 'icon size (Large, Medium (default), Small, XSmall)',
  type: e.item.size,
  group: '2 - Icon',
  value: e.item.size.Medium
};

ctx.popup.bootstrap.meta.inputStyle = {
  name: 'input color',
  description: 'input style (color)',
  type: e.item.inputStyle,
  group: '1 - Display',
  value: e.item.inputStyle.None
};

ctx.popup.bootstrap.meta.iconButton = {
  name: 'button icon',
  description: 'button icon',     // A quoi ça sert ? Le paramètre existe dans un select ou input file. Mais semble n'avoir aucun effet
  type: 'boolean',
  group: '2 - Icon',
  value: false
};

ctx.popup.bootstrap.meta.iconText = {
  name: 'icon text',
  description: 'icon text',     // A quoi ça sert ? Le paramètre existe dans un select ou input file. Mais semble n'avoir aucun effet
  type: 'string',
  group: '2 - Icon',
  value: ''
};

ctx.popup.bootstrap.meta.size = {
  name: 'size',
  description: 'item size (Large, Medium (default), Small, XSmall)',
  type: e.item.size,
  group: '1 - Display',
  value: e.item.size.Medium
};

ctx.popup.bootstrap.meta.iconSide = {
  name: 'icon side',
  description: 'icon side (left (default), right, top, bottom)',
  type: e.item.side,
  group: '2 - Icon',
  value: e.item.side.left
};

ctx.popup.bootstrap.meta.fa = {
  name: 'fa icon',
  description: 'font awesome icon id',    /// utilisé ?
  type: 'string',
  group: '2 - Icon',
  value: ''
};

ctx.popup.bootstrap.meta.animated = {
  name: 'animated',
  description: 'Allows to animate the item (boolean)',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.divider = {
  name: 'divider',
  description: 'Inserts a space line or column before menu',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.header = {
  name: 'header',
  description: 'Inserts a label (header) before menu',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.showHeader = {
  name: 'show header',
  description: 'Show table header',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.justified = {
  name: 'justified',
  description: 'make the item justified in the popup width',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.href = {
  name: 'link',
  description: 'item href (link)',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.imageShape = {
  name: 'image shape',
  description: 'image shape (select Circle, Rounded or Thumbnail, default: none)',
  type: e.item.imageShape,
  group: '1 - Display',
  value: e.item.imageShape.none
};

ctx.popup.bootstrap.meta.src = {
  name: 'source',
  description: 'image path, from popup location: bin/popup',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.pulse = {
  name: 'pulsing fa icon',
  description: 'pulsing font awesome icon',   /// utilisé ?
  type: 'boolean',
  group: '2 - Icon',
  value: false
};

ctx.popup.bootstrap.meta.left = {
  name: 'item on left',
  description: 'item justified on left',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.right = {
  name: 'item on right',
  description: 'item justified on right',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

//ctx.popup.bootstrap.meta.block = {
//  name: 'block item',
//  description: 'item as a block',
//  type: 'boolean',
//  group: '1 - Display',
//  value: false
//};

ctx.popup.bootstrap.meta.badge = {
  name: 'badge',
  description: 'small indicator located close to an item - most of the time represented  by a number. But input as string',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.badgeStyle = {
  name: 'badge color',
  description: 'badge style (color)',
  type: e.item.style,
  group: '1 - Display',
  value: e.item.style.None
};

ctx.popup.bootstrap.meta.active = {
  name: 'active item',
  description: 'active item so that all sub-items are visible',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.fluid = {
  name: 'fluid container',
  description: 'fluid container, for a full width container, spanning the entire width of your viewport',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

//ctx.popup.bootstrap.meta.saveAsHtml = {
//  name: 'save as HTML',
//  description: 'save as HTML',
//  type: 'boolean',
//  group: '0 - General',
//  value: false
//};

ctx.popup.bootstrap.meta.current = {
  name: 'current value',
  description: 'current value, representing the filling rate of the drawing (0-100)',
  type: 'number',
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.min = {
  name: 'minimum value',
  description: 'minimum value (>= 0)',
  type: 'number',
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.max = {
  name: 'maximum value',
  description: 'maximum value (<= 100)',
  type: 'number',
  group: '1 - Display',
  value: 100
};

ctx.popup.bootstrap.meta.xs = {
  name: 'phone width',
  description: 'phone width',   // Ne sais pas trop comment l'utiliser...
  type: 'number',
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.sm = {
  name: 'tablet width',
  description: 'tablet width',    // Ne sais pas trop comment l'utiliser...
  type: 'number',
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.md = {
  name: 'desktop width',
  description: 'desktop width',   // Ne sais pas trop comment l'utiliser...
  type: 'number',
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.lg = {
  name: 'larger desktop width',
  description: 'larger desktop width',  // Ne sais pas trop comment l'utiliser...
  type: 'number',
  group: '1 - Display',
  value: 12
};

ctx.popup.bootstrap.meta.inline = {
  name: 'inline',
  description: 'group alignment: horizontal (true) or vertical (false)',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.pills = {
  name: 'pills',
  description: 'Tab format : pills (true) or standard (false)',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.circle = {
  name: 'circle',
  description: 'circular checkbox form',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.disabled = {
  name: 'disabled',
  description: 'disabled item',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.readonly = {
  name: 'read only',
  description: 'read only item',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.feedbackIcon = {
  name: 'feedback icon',
  description: 'feedback icon on the right side',
  type: e.item.icon,
  group: '1 - Display',
  value: e.item.icon.none
};

ctx.popup.bootstrap.meta.bordered = {
  name: 'bordered',
  description: 'table bordered on all sides',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.condensed = {
  name: 'condensed',
  description: 'Condensed, to make tables more compact by cutting cell padding in half',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.hover = {
  name: 'hover',
  description: 'table hover, to enable a hover state on table rows within a <tbody>.',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.striped = {
  name: 'striped',
  description: 'table striped, to add zebra-striping to any table row within the <tbody>.',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.placeholder = {
  name: 'placeholder',
  description: 'specifies a short hint that describes the expected value of an input field',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.rows = {
  name: 'row count',
  description: 'Number of rows displayed in the item',
  type: 'number',
  group: '1 - Display',
  value: 3
};

ctx.popup.bootstrap.meta.label = {
  name: 'item label',
  description: 'item label, displayed above the item',
  type: 'string',
  group: '1 - Display',
  value: ''
};
ctx.popup.bootstrap.meta.rowType = {
  name: 'row type',
  description: 'row type, among Footer, Header or Body (possibly None)',
  type: e.item.rowType,
  group: '1 - Display',
  value: e.item.rowType.None
};

ctx.popup.bootstrap.meta.tooltip = {
  name: 'tooltip',
  description: 'item tooltip',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.tooltipPlacement = {
  name: 'tooltip placement',
  description: 'item placement (None (default), left, right, top, bottom)',
  type: e.item.side,
  group: '1 - Display',
  value: e.item.side.none
};

ctx.popup.bootstrap.meta.background = {
  name: 'background color',
  description: 'background style (color)',
  type: e.item.style,
  group: '1 - Display',
  value: e.item.style.None
};

ctx.popup.bootstrap.meta.style = {
  name: 'item color',
  description: 'item style (color)',
  type: e.item.style,
  group: '1 - Display',
  value: e.item.style.Grey
};

ctx.popup.bootstrap.meta.alignment = {
  name: 'alignment',
  description: 'alignment, among None (Default), Left, Center, Right, NoWrap, Justify',
  type: e.item.alignment,
  group: '1 - Display',
  value: e.item.alignment.None
};

ctx.popup.bootstrap.meta.alignmentVertical = {
  name: 'vertical alignment',
  description: 'vertical alignment, among None (Default), Top, Middle, Bottom, ...',
  type: e.item.alignmentVertical,
  group: '1 - Display',
  value: e.item.alignmentVertical.None
};

ctx.popup.bootstrap.meta.textSize = {
  name: 'text size',
  description: 'text size. Select between H1 and H6 (None equiv. H4).',
  type: e.item.textSize,
  group: '1 - Display',
  value: e.item.textSize.None
};

ctx.popup.bootstrap.meta.textTransform = {
  name: 'transformation',
  description: 'text transformation, among None (default), Bold, Capitalize, Highlight, Italic, Lowercase, Underline, Uppercase',
  type: e.item.textTransform,
  group: '1 - Display',
  value: e.item.textTransform.None
};

ctx.popup.bootstrap.meta.close = {
  name: 'close button',
  description: 'close popup on button click',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.escape = {
  name: 'escape key',
  description: 'click button when pressing escape key',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.submit = {
  name: 'submit button',
  description: 'submit all item values on button click',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.inverse = {
  name: 'inverse',
  description: 'Indicates (true) if color is inversed',
  type: 'boolean',
  group: '1 - Display',
  value: true
};

ctx.popup.bootstrap.meta.test = {
  name: 'test value',
  description: 'test value',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.value = {
  name: 'value',
  description: 'item value',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.checked = {
  name: 'checked',
  description: 'Indicates if an item is checked or not at display',
  type: 'boolean',
  group: '1 - Display',
  value: false
};

ctx.popup.bootstrap.meta.width = {
  name: 'item width',
  description: 'item width value (px, %, ...)',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.height = {
  name: 'item height',
  description: 'item height value (px, %, ...)',
  type: 'string',
  group: '1 - Display',
  value: ''
};

ctx.popup.bootstrap.meta.tableHeight = {
  name: 'table height',
  description: 'table height value (px)',
  type: 'number',
  min: 0,
  max: 2000,
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.colWidth = {
  name: 'column width',
  description: 'column width value',
  type: 'number',
  min: 0,
  max: 12,
  group: '1 - Display',
  value: 0
};

ctx.popup.bootstrap.meta.accordionItem = {
  name: 'accordion item',
  description: 'accordion item',    
  type: 'object',
  group: '3 - Child items',
  value: null
};

ctx.popup.bootstrap.meta.listItem = {
  name: 'list item',
  description: 'list item',   
  type: 'object',
  group: '3 - Child items',
  value: null
};

ctx.popup.bootstrap.meta.menuItem = {
  name: 'menu item',
  description: 'menu item',   
  type: 'object',
  group: '3 - Child items',
  value: null
};

ctx.popup.bootstrap.meta.pageItem = {
  name: 'page item',
  description: 'page item',    
  type: 'object',
  group: '3 - Child items',
  value: null
};

ctx.popup.bootstrap.meta.navbarMenu = {
  name: 'navbar item',
  description: 'navbar item',   
  type: 'object',
  group: '3 - Child items',
  value: null
};

ctx.popup.bootstrap.meta.wizardItem = {
  name: 'wizard item',
  description: 'wizard item',   
  type: 'object',
  group: '3 - Child items',
  value: null
};



e.item.type = {
  ctxType: 'e.item.type'
};


e.item.type.myType = 'ctx.popup.bootstrap.type.myType';
ctx.popup.bootstrap.type.myType = {
  meta: {
    type: ''
  },
  model: {
  },
  template: '{{#if type}} ctxtype="{{type}}"{{/if}}'
};

e.item.type.myStyle = 'ctx.popup.bootstrap.type.myStyle';
ctx.popup.bootstrap.type.myStyle = {
  meta: {
    type: '',
    myStyle: ''
  },
  model: {
    type: e.item.type.myStyle
  },
  template: '{{#if myStyle}} style="{{myStyle}}"{{/if}}'
};

e.item.type.tooltip = 'ctx.popup.bootstrap.type.tooltip';
ctx.popup.bootstrap.type.tooltip = {
  meta: {
    type: '',
    tooltip: '',
    tooltipPlacement: ''
  },
  model: {
    type: e.item.type.tooltip
  },
  template: '{{#if tooltip}} data-toggle="tooltip" title="{{tooltip}}"{{/if}}'
};

e.item.type.none = 'ctx.popup.bootstrap.type.none';
ctx.popup.bootstrap.type.none = {
  //useSet: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    test: ''
  },
  model: {
    type: e.item.type.none
  }
};

e.item.type.item = 'ctx.popup.bootstrap.type.item';
ctx.popup.bootstrap.type.item = {
  icon: '/fa/tag.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    test: '',
    tooltip: '',
    tooltipPlacement: '',
    markdown: '',
    icon: '',
    badge: '',
    badgeStyle: '',
    style: '',
    disabled: '',
    alignment: '',
    textSize: '',
    textTransform: '',
    myClass: '',
    myStyle: '',
    visible: '',
    tag: '',
    auto: ''
  },
  model: {
    type: e.item.type.item,
    textSize: e.item.textSize.None,
    id: 'it%index%'
  },
  template: '<{{#if tag}}{{tag}}{{else}}{{#if textSize}}{{textSize}}{{else}}div{{/if}}{{/if}} id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"\
 {{> myType}} class="{{#if disabled}} disabled{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if style}} text-{{style}}{{/if}}\
{{#if alignment}} {{alignment}}{{/if}}{{#if textTransform}} {{textTransform}}{{/if}}"{{> myStyle}}{{> tooltip}} >\
{{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
</{{#if tag}}{{tag}}{{else}}{{#if textSize}}{{textSize}}{{else}}div{{/if}}{{/if}}>',
  init: function (item, params) {
//    item.get = function() {
//      return $('#'+ item.id).html();
//    };
//    item.set = function(value) {
//      if (value) {
//        $('#'+ item.id).html(value);
//        item.update();
//      }
//    };
  }
};

e.item.type.badge = 'ctx.popup.bootstrap.type.badge';
ctx.popup.bootstrap.type.badge = {
  icon: '/fa/circle-o.png',
  meta: {
    id: '',
    badge: '',
    badgeStyle: '',
    myClass: '',
    myStyle: ''
  },
  model: {
    type: e.item.type.badge,
    id: 'badge%index%'
  },
  template: '{{#if badge}}<span{{#if id}} id="{{id}}"{{/if}} class="badge{{#if myClass}} {{myClass}}{{/if}}{{#if badgeStyle}} progress-bar-{{badgeStyle}}{{/if}}"{{> myStyle}} > {{badge}} </span>{{/if}}'
}

e.item.type.icon = 'ctx.popup.bootstrap.type.icon';
ctx.popup.bootstrap.type.icon = {
  meta: {
    type: '',
    id: '',
    parent: '',
    icon: '',
    iconStyle: '',
    iconSize: '',
    fa: '',
    animated: '',
    pulse: '',
    tooltip: '',
    tooltipPlacement: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.icon,
    id: 'icon%index%'
  },
  template: '{{#if icon}}<i{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="glyphicon glyphicon-{{icon}}{{#if iconStyle}} text-{{iconStyle}}{{/if}}{{#if iconSize}} btn-{{iconSize}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}}{{> tooltip}}></i>{{/if}}\
{{#if fa}}<i{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="fa fa-{{fa}} fa-fw{{#if iconStyle}} text-{{iconStyle}}{{/if}}{{#if animated}} fa-spin{{/if}}{{#if pulse}} fa-pulse{{/if}}"{{> myStyle}}{{> tooltip}}></i>{{/if}} \
{{#if iconText}}{{{iconText}}}{{/if}}'
};

e.item.type.tableColumn = 'ctx.popup.bootstrap.type.tableColumn';
ctx.popup.bootstrap.type.tableColumn = {
  meta: {
    value: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    colWidth: '',
    alignment: '',
    textTransform: '',
    myClass: '',
    myStyle: '',
    visible: ''
  },
  model: {
  },
  template: '<th class="{{#if colWidth}}col-xs-{{colWidth}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} > {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }} </th>'
};

e.item.type.panelItem = 'ctx.popup.bootstrap.type.panelItem';
ctx.popup.bootstrap.type.panelItem = {
  meta: {
    id: '',
    value: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    tooltip: '',
    tooltipPlacement: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '<a id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myType}}{{#if parentId}} ctxparent="{{parentId}}"{{/if}}\
 class="ctxlink{{#if listClass}} {{listClass}}{{#if style}} {{listClass}}-{{style}}{{/if}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if active}} active{{/if}}{{#if disabled}} disabled{{/if}}"\
 href="{{#if href}}{{href}}{{else}}javascript:void(0);{{/if}}"{{> myStyle}} {{> tooltip}}>\
 {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}</a>'
};

e.item.type.listItem = 'ctx.popup.bootstrap.type.listItem';
ctx.popup.bootstrap.type.listItem = {
  meta: {
    id: '',
    value: '',
    title: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    disabled: '',
    active: '',
    href: '',
    tooltip: '',
    tooltipPlacement: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '<a id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myType}}{{#if parentId}} ctxparent="{{parentId}}"{{/if}}\
 class="ctxlink{{#if listClass}} {{listClass}}{{#if style}} {{listClass}}-{{style}}{{/if}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if active}} active{{/if}}{{#if disabled}} disabled{{/if}}"\
 href="{{#if href}}{{href}}{{else}}javascript:void(0);{{/if}}"{{> myStyle}} {{> tooltip}}>\
{{#if title}}<h4 class="list-group-item-heading">{{{title}}}</h4><p class="list-group-item-text">{{/if}}\
  {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
{{#if title}}</p>{{/if}}\
</a>'
};

e.item.type.iconItem = 'ctx.popup.bootstrap.type.iconItem';
ctx.popup.bootstrap.type.iconItem = {
  meta: {
    id: '',
    fa: '',
    disabled: '',
    active: '',
    tooltip: '',
    tooltipPlacement: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '<a class="ctxlink{{#if active}} active{{/if}}{{#if myClass}} {{myClass}}{{/if}}" href="#" {{> myStyle}}{{> tooltip}}>\
  {{#if icon}}<i class="glyphicon glyphicon-{{icon}}{{#if iconStyle}} text-{{iconStyle}}{{/if}}{{#if iconSize}} btn-{{iconSize}}{{/if}}"></i>{{/if}}\
  {{#if fa}}<i class="fa fa-{{fa}}"></i>{{/if}}\
  </a>'
};

e.item.type.menuItem = 'ctx.popup.bootstrap.type.menuItem';
ctx.popup.bootstrap.type.menuItem = {
  meta: {
    id: '',
    value: '',
    //style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    disabled: '',
    active: '',
    header: '',
    tooltip: '',
    tooltipPlacement: '',
    divider: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '{{#if header}}<li class="dropdown-header">{{header}}</li>{{/if}}\
{{#if value}}<li id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{#if parentId}} ctxparent="{{parentId}}"{{/if}} {{> myType}} \
class="ctxlink{{#if myClass}} {{myClass}}{{/if}}{{#if active}} active{{/if}}{{#if disabled}} disabled{{/if}}" >\
  <a href="javascript:void(0);"{{> myStyle}}{{> tooltip}}>\
    {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
  </a>\
</li>{{/if}}\
{{#if divider}}<li class="divider"></li>{{/if}}'
};

e.item.type.navbarMenu = 'ctx.popup.bootstrap.type.navbarMenu';
ctx.popup.bootstrap.type.navbarMenu = {
  meta: {
    id: '',
    value: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    active: '',
    disabled: '',
    tooltip: '',
    tooltipPlacement: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '\
<li id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myType}}{{#if parentId}} ctxparent="{{parentId}}"{{/if}} class="ctxlink{{#if listClass}} {{listClass}}{{#if style}} {{listClass}}-{{style}}{{/if}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if active}} active{{/if}}"{{#if disabled}} disabled=""{{/if}}>\
  {{#ifCond icon "||" value}}<a href="{{#if href}}{{href}}{{else}}javascript:void(0);{{/if}}"{{> myStyle}}{{> tooltip}}>\
  {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}</a>{{/ifCond}}\
</li>'
};

e.item.type.subItem = 'ctx.popup.bootstrap.type.subItem';
ctx.popup.bootstrap.type.subItem = {
  meta: {
    id: ''
  },
  model: {
  },
  template: '\
<div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myType}}{{#if parentId}} ctxparent="{{parentId}}"{{/if}}></div>'
};

e.item.type.multiItem = 'ctx.popup.bootstrap.type.multiItem';
ctx.popup.bootstrap.type.multiItem = {
  meta: {
    id: '',
    value: '',
    checked: '',
    disabled: '',
    style: '',
    //tooltip: '',
    //tooltipPlacement: '',
    myClass: '',
    myStyle: ''
  },
  model: {
    //type: e.item.type.multiItem,
    //id: 'it%index%'
  },
  template: '\
    <div class="ctxlink{{#if disabled}} disabled{{/if}}{{#if custom}} {{custom}}{{else}} {{format}}{{/if}}{{#if circle}}{{#if custom}} {{custom}}{{else}} {{format}}{{/if}}-circle{{/if}}{{#if myClass}} {{myClass}}{{/if}}\
      {{#if style}} {{#if custom}}{{custom}}{{else}}{{format}}{{/if}}-{{style}}{{else}}{{#if parentStyle}} \
      {{#if custom}}{{custom}}{{else}}{{format}}{{/if}}-{{parentStyle}}{{/if}}{{/if}}{{#if inline}} {{#if custom}}{{custom}}{{else}}{{format}}{{/if}}-inline{{/if}}">\
      <input {{#if checked}} checked="checked"{{/if}} type="{{format}}"{{#if disabled}} disabled=""{{/if}} class="input-group{{#if size}} input-group-{{size}}{{/if}}{{#if style}}{{#if custom}} {{custom}}{{else}} {{format}}{{/if}}-{{style}}{{/if}}" \
      name="{{parentId}}" id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{#if parentId}} ctxparent="{{parentId}}"{{/if}} value="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myStyle}} /> \
      <label for="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}" {{> tooltip}}> {{{value}}} </label>\
    </div>\
  ',
  init: function (item, params) {
    item.get = function() {
      var res = $('#'+ item.id).is(':checked');
      return res;
    };
    item.set = function(value) {
      $('#'+ item.id).attr('checked', (value ? true : false));
      //item.update({ checked: (value ? true : false)});
    };
  }
};

e.item.type.pagerItem = 'ctx.popup.bootstrap.type.pagerItem';
ctx.popup.bootstrap.type.pagerItem = {
  meta: {
    id: '',
    value: '',
    left: '',
    right: '',
    iconSide: '',
    icon: '',
    badge: '',
    badgeStyle: '',
    disabled: '',
    href: ''
  },
  model: {
    id: 'it%index%'
  },
  template: '<li class="{{#if disabled}} disabled{{/if}}{{#if left}} previous{{/if}}{{#if right}} next{{/if}}">\
  <a id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{#if parentId}} ctxparent="{{parentId}}"{{/if}} \
  class="ctxlink" href="{{#if href}}{{href}}{{else}}javascript:void(0);{{/if}}">{{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}</a></li>'
};

e.item.type.paginationItem = 'ctx.popup.bootstrap.type.paginationItem';
ctx.popup.bootstrap.type.paginationItem = {
  meta: {
    id: '',
    value: '',
    active: '',
    disabled: '',
    href: ''
  },
  model: {
    id: 'it%index%'
  },
  template: '<li class="{{#if disabled}} disabled{{/if}}{{#if active}} active{{/if}}"><a id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}" class="ctxlink" href="{{#if href}}{{href}}{{else}}javascript:void(0);{{/if}}">{{{value}}}</a></li>'
};

e.item.type.selectItem = 'ctx.popup.bootstrap.type.selectItem';
ctx.popup.bootstrap.type.selectItem = {
  meta: {
    id: '',
    value: '',
    myClass: '',
    myStyle: ''
  },
  model: {
    //type: e.item.type.selectItem,
    //id: 'it%index%'
  },
  template: '<option {{#if id}}value="{{id}}"{{/if}}{{#if parentId}} ctxparent="{{parentId}}"{{/if}}{{#if myClass}} class="{{myClass}}"{{/if}}{{> myStyle}}{{> tooltip}}> {{{value}}} </option>'
};

e.item.type.alert = 'ctx.popup.bootstrap.type.alert';
ctx.popup.bootstrap.type.alert = {
  icon: '/fa/warning.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    style: '',
    close: '',
    value: '',
    test: '',
    markdown: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.alert,
    id: 'alert%index%'
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="ctxcontent alert{{#if style}} alert-{{style}}{{/if}}{{#if close}} alert-dismissable{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
  {{#if close}}<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>{{/if}}\
  <div id="{{id}}"> {{{value}}} </div>\
</div>'
}

e.item.type.accordionItem = 'ctx.popup.bootstrap.type.accordionItem';
ctx.popup.bootstrap.type.accordionItem = {
  meta: {
    id: '',
    value: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    disabled: '',
    collapsed: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '\
<div class="panel{{#if style}} panel-{{style}}{{else}}{{#if parentStyle}} panel-{{parentStyle}}{{else}} panel-default{{/if}}{{/if}}">\
  <div class="panel-heading">\
    <h4 class="panel-title">\
      <a class="ctxlink" data-toggle="collapse" data-parent="#{{parentId}}" href="#{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" aria-expanded="{{#if @first}}true{{else}}false{{/if}}" aria-controls="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content"{{> myStyle}} >\
        {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
      </a>\
    </h4>\
  </div>\
  <div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" class="panel-collapse collapse{{#ifCond collapsed "===" false}} in{{/ifCond}}" aria-labelledby="{{parentId}}_heading{{@index}}">\
    <div class="panel-body">\
      <div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{#if parentId}} ctxparent="{{parentId}}"{{/if}}></div>\
    </div>\
  </div>\
</div>'
};


e.item.type.accordion = 'ctx.popup.bootstrap.type.accordion';
ctx.popup.bootstrap.type.accordion = {
  icon: '/fa/server.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.accordionItem]
  },
  model: {
    type: e.item.type.accordion,
    id: 'accordion%index%'
  },
  template: '\
<div class="panel-group" id="{{id}}"{{> myType}} aria-multiselectable="true"{{#if myClass}} class="{{myClass}}"{{/if}}{{> myStyle}} >\
{{#each items}}\
  {{> accordionItem parentId=../id parentStyle=../style }}\
{{/each}}\
</div>',
  init: function (item, params) {
    item.collapse = function(collapsed, childId) {
      var value = ((collapsed === true) ? 'hide' : ((collapsed === false) ? 'show' : 'toggle'));
      $('#' + childId + '_content').collapse(value);
      var res = null;
    };
  },
  initProxy: function (item, params) {
    item.collapse = function(collapsed, childId) {
      return item.itemExec('collapse', collapsed, childId);
    };
  }
}

e.item.type.breadcrumb = 'ctx.popup.bootstrap.type.breadcrumb';
ctx.popup.bootstrap.type.breadcrumb = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    value: '',
    test: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.listItem]
  },
  model: {
    type: e.item.type.breadcrumb,
    id: 'breadcrumb%index%'
  },
  template: '\
<ol id="{{id}}"{{> myType}} class="breadcrumb{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
{{#each items}}\
  <li class="{{#if myClass}}{{myClass}}{{/if}}"><a id="{{#if id}}{{id}}{{else}}{{../id}}_{{@index}}{{/if}}" class="ctxlink" href="javascript:void(0);">\
  {{> icon id="" type="" tooltip="" }} {{{value}}} </a></li>\
{{/each}}\
</ol>'
}

e.item.type.button = 'ctx.popup.bootstrap.type.button';
ctx.popup.bootstrap.type.button = {
  icon: '/fa/hand-o-up.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    tooltip: '',
    tooltipPlacement: '',
    style: '',
    icon: '',
    //collapsable: '',
    //collapsed: '',
    iconSide: '',
    iconStyle: '',
    fa: '',
    animated: '',
    pulse: '',
    badge: '',
    badgeStyle: '',
    close: '',
    submit: '',
    escape: '',
    size: '',
    disabled: '',
    right: '',
    justified: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.button,
    id: 'button%index%',
    parent: '',
    value: "",
    tooltip: '',
    style: e.item.style.None,
    icon: e.item.icon.none,
    iconSide: e.item.side.left,
    badge: "",
    badgeStyle: e.item.style.None,
    size: e.item.size.Medium,
    close: false,
    submit: false,
    disabled: false,
    right: false,
    justified: false,
    fa: '',
    animated: false,
    pulse: false
  },
  events: {
    CLICK: ''
  },
  template: '{{#if collapsable}}<div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content">{{/if}}\
  <button{{#if disabled}} disabled=""{{/if}} class="ctxlink btn{{#if right}} pull-right{{/if}}\
{{#if justified}} btn-block{{/if}}{{#if style}} btn-{{style}}{{else}}{{#if parentStyle}} btn-{{parentStyle}}{{/if}}{{/if}}\
{{#if size}} btn-{{size}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}" \
    id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{> myType}}\
    {{#if popover}} data-toggle="popover" data-content="{{popover}}" {{#if popoverTitle}} title="{{popoverTitle}}" {{/if}}{{/if}}\
    {{#if collapsable}} data-toggle="collapse" data-target="#{{id}}_collapse" aria-expanded="{{#if collapsed}}false{{else}}true{{/if}}" aria-controls="collapse"{{/if}} type="button"{{> myStyle}} >\
  {{#ifCond iconSide "==" "top"}}\
    {{> icon id="" type="" tooltip="" }} <br/> {{{value}}}\
  {{else}}\
    {{#ifCond iconSide "==" "right"}}\
      {{{value}}}  {{> icon id="" type="" tooltip="" }}\
    {{else}}\
      {{#ifCond iconSide "==" "bottom"}}\
        {{{value}}} <br/> {{> icon id="" type="" tooltip="" }}\
      {{else}}\
        {{> icon id="" type="" tooltip="" }}   {{{value}}}\
      {{/ifCond}}\
    {{/ifCond}}\
  {{/ifCond}}\
  {{> badge id="" }}\
</button>\
  {{#if collapsable}} <div id="{{id}}_collapse" class="collapse{{#unless collapsed}} in{{/unless}}">\
    {{#each items}}\
      {{> item parentId=../id }}\
    {{/each}}\
  </div>\
  </div>{{/if}}'
};

e.item.type.buttonGroup = 'ctx.popup.bootstrap.type.buttonGroup';
ctx.popup.bootstrap.type.buttonGroup = {
  icon: '/fa/circle-o.png',
  subIcon: '/fa/angle-down.png',
  //subAuto: true,
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    justified: '',
    style: '',
    inline: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    //items: [e.item.type.subItem]
    items: [e.item.type.button]
  },
  model: {
    id: 'group%index%',
    type: e.item.type.buttonGroup,
    parent: ''
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} role="group" class="{{#if justified}}btn-group-justified{{/if}}{{#if inline}} btn-group{{else}} btn-group-vertical{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
  {{#each items}}\
    {{> button parentId=../id parentStyle=../style }}\
  {{/each}}\
</div>'
};

e.item.type.toolbar = 'ctx.popup.bootstrap.type.toolbar';
ctx.popup.bootstrap.type.toolbar = {
  icon: '/fa/circle-o.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.subItem]
  },
  model: {
    id: 'toolbar%index%',
    type: e.item.type.toolbar,
    parent: '',
    auto: false
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="btn-toolbar{{#if myClass}} {{myClass}}{{/if}}" role="toolbar"{{> myStyle}} >\
  {{#each items}}\
    {{> item parentId=../id parentStyle=../style }}\
  {{/each}}\
</div>'
};

e.item.type.callout = 'ctx.popup.bootstrap.type.callout';
ctx.popup.bootstrap.type.callout = {
  icon: '/fa/comment.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    textSize: '',
    value: '',
    test: '',
    markdown: '',
    style: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    id: 'callout%index%',
    type: e.item.type.callout,
    style: e.item.style.Blue,
    textSize: e.item.textSize.H4,
    parent: ''
  },
  template: '\
<div{{#if id}} id="{{id}}_content"{{/if}}{{> myType}}>\
  <div{{#if id}} id="{{id}}"{{/if}} class="bs-callout{{#if style}} bs-callout-{{style}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
    {{#if title}}<{{#if textSize}}{{textSize}}{{else}}h4{{/if}} class="bs-callout-title">{{title}}</{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>{{/if}}\
    {{{value}}}\
  </div>\
</div>'
};

e.item.type.card = 'ctx.popup.bootstrap.type.card';
ctx.popup.bootstrap.type.card = {
  icon: '/fa/comment.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    value: '',
    test: '',
    markdown: '',
    src: '',
    textSize: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    id: 'card%index%',
    type: e.item.type.card,
    textSize: e.item.textSize.H4,
    parent: ''
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="ctxcontent card{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
  <div class="card-body">\
    {{#if src}}<img class="card-img-top" src="{{src}}"{{#if title}} alt="{{title}}"{{/if}}>{{/if}}\
    {{#if title}}<{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>{{title}}</{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>{{/if}}\
    <p class="card-text">{{{value}}}</p>\
  </div>\
</div>'
};

e.item.type.mediaObject = 'ctx.popup.bootstrap.type.mediaObject';
ctx.popup.bootstrap.type.mediaObject = {
  icon: '/fa/image.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    value: '',
    test: '',
    markdown: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.subItem]
  },
  model: {
    type: e.item.type.mediaObject,
    id: 'media%index%'
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="media{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
  <div class="{{#ifCond iconSide "==" "right"}}media-right{{else}}media-left{{/ifCond}}">\
    {{> image class=media-object }}\
  </div>\
  <div class="media-body">\
    {{#if title}}<h4 class="media-heading">{{title}}</h4>{{/if}}\
    {{{value}}}\
    {{#each items}}\
      {{> item parentId=../id }}\
    {{/each}}\
  </div>\
</div>'
};

e.item.type.panel = 'ctx.popup.bootstrap.type.panel';
ctx.popup.bootstrap.type.panel = {
  icon: '/fa/columns.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    test: '',
    textSize: '',
    markdown: '',
    title: '',
    collapsable: '',
    collapsed: '',
    icon: '',
    iconSide: '',
    iconStyle: '',
    footer: '',
    style: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.listItem]
  },
  model: {
    type: e.item.type.panel,
    id: 'panel%index%'
  },
  template: '\
<div {{#if id}} id="{{id}}_content"{{/if}}{{> myType}} class="panel-group">\
  <div class="panel {{#if style}} panel-{{style}}{{/if}}">\
    {{#if title}}<div class="panel-heading">\
      <{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>\
        {{#if collapsable}}<a class="ctxlink" data-toggle="collapse" href="#{{id}}"> {{> icon id="" type="" tooltip="" }} {{{title}}} </a>{{else}} {{> icon id="" type="" tooltip="" }} {{{title}}} {{/if}}\
      </{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>\
    </div>{{/if}}\
    <div id="{{id}}" class="{{#if collapsable}}panel-collapse collapse{{#unless collapsed}} in{{/unless}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} >\
      <div class="panel-body">\
        {{{value}}}\
        {{#each items}}\
          {{> item parentId=../id}}\
        {{/each}}\
      </div>\
      {{#if footer}}<div class="panel-footer">{{{footer}}}</div>{{/if}}\
    </div>\
  </div>\
</div>'
};

e.item.type.carouselItem = 'ctx.popup.bootstrap.type.carouselItem';
ctx.popup.bootstrap.type.carouselItem = {
  meta: {
    id: '',
    value: '',
    src: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '<div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}" class="item{{#if myClass}} {{myClass}}{{/if}}{{#if @first}} active{{/if}}"{{> myStyle}} >\
      {{#if src}}<img src="{{src}}" class="img-responsive"/>{{/if}}\
      {{#if value}}<div class="carousel-caption"> {{{value}}} </div>{{/if}}\
    </div>'
}

e.item.type.carousel = 'ctx.popup.bootstrap.type.carousel';
ctx.popup.bootstrap.type.carousel = {
  icon: '/fa/tv.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    indicators: '',
    previous: '',
    next: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.carouselItem]
  },
  model: {
    type: e.item.type.carousel,
    id: 'carousel%index%'
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="carousel slide{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}} data-ride="carousel">\
  {{#if indicators}}\
  <ol class="carousel-indicators">\
    {{#each items}}\
      <li data-target="#{{../id}}" data-slide-to="{{@index}}" {{#if @first}}class="active"{{/if}}></li>\
    {{/each}}\
  </ol>\
  {{/if}}\
  <div class="carousel-inner"{{#if role}} role="{{role}}"{{/if}}>\
  {{#each items}}\
    {{> carouselItem parentId=../id }}\
  {{/each}}\
  </div>\
  {{#if previous}}\
  <a class="left carousel-control" href="#{{id}}" data-slide="prev">\
    <span class="glyphicon glyphicon-chevron-left"></span>\
    <span class="sr-only">{{previous}}</span>\
  </a>\
  {{/if}}\
  {{#if next}}\
  <a class="right carousel-control" href="#{{id}}" data-slide="next">\
    <span class="glyphicon glyphicon-chevron-right"></span>\
    <span class="sr-only">{{next}}</span>\
  </a>\
  {{/if}}\
</div>'
}

e.item.type.dropdown = 'ctx.popup.bootstrap.type.dropdown';
ctx.popup.bootstrap.type.dropdown = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    style: '',
    size: '',
    badge: '',
    badgeStyle: '',
    disabled: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.menuItem]
  },
  model: {
    type: e.item.type.dropdown,
    id: 'dropdown%index%'
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="dropdown btn-group">\
  <button data-toggle="dropdown"{{#if disabled}} disabled=""{{/if}} class="ctxlink btn{{#if style}} btn-{{style}}{{/if}}{{#if size}} btn-{{size}}{{/if}}{{#if myClass}} {{myClass}}{{/if}} dropdown-toggle"{{> myStyle}} type="button">\
    {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
  <span class="caret"></span></button>\
  <ul class="dropdown-menu" role="menu">\
  {{#each  items}}\
    {{> menuItem parentId=../id }}\
  {{/each}}\
  </ul>\
</div>\
'
};

ctx.popup.bootstrap.type.multi = {
  virtual: true,
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    label: '',
    style: '',
    size: '',
    inline: '',
    circle: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.multiItem]
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="ctxcontent form-group{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}}>\
  {{#if label}}<label for="{{id}}" class="control-label">{{label}}</label><br/>{{/if}}\
  <div id="{{id}}">\
  {{#each  items}}\
    {{> multiItem parentId=../id parentStyle=../style custom=../custom size=../size inline=../inline format=../format circle=../circle }}\
  {{/each}}\
  </div>\
</div>\
',
  init: function (item, params) {
    item.get = function() {
      var res = [];
      $("[name=" + item.id + "]:checked").each(function() {
        res.push($(this).val());
      });
      return res;
    };
    item.set = function(value) {
      if (!$.isArray(value)) {
        value = [value];
      }
      $("[name=" + item.id + "]").attr('checked', false);
      $(value).each(function(id, val) {
        $("[name=" + item.id + "][value='" + val + "']").attr('checked', true);
      });
    };
  }
};

e.item.type.checkbox = 'ctx.popup.bootstrap.type.checkbox';
ctx.popup.bootstrap.type.checkbox = {
  icon: '/fa/check-square-o.png',
  root: ctx.popup.bootstrap.type.multi,
  //meta: ctx.popup.bootstrap.type.multi.meta,
  model: {
    type: e.item.type.checkbox,
    id: 'checkbox%index%'
  },
  template: '{{> multi format="checkbox" }}'
};

e.item.type.radio = 'ctx.popup.bootstrap.type.radio';
ctx.popup.bootstrap.type.radio = {
  icon: '/fa/dot-circle-o.png',
  root: ctx.popup.bootstrap.type.multi,
  //meta: ctx.popup.bootstrap.type.multi.meta,
  model: {
    type: e.item.type.radio,
    id: 'radio%index%'
  },
  template: '{{> multi format="radio" }}'
};

e.item.type.collapsedButton = 'ctx.popup.bootstrap.type.collapsedButton';
ctx.popup.bootstrap.type.collapsedButton = {
  icon: '/fa/hand-o-up.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    tooltip: '',
    tooltipPlacement: '',
    style: '',
    icon: '',
    collapsed: '',
    iconSide: '',
    iconStyle: '',
    fa: '',
    animated: '',
    pulse: '',
    badge: '',
    badgeStyle: '',
    close: '',
    size: '',
    disabled: '',
    right: '',
    justified: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.item]
  },
  model: {
    type: e.item.type.collapsedButton,
    id: 'collapse%index%',
    parent: '',
    value: "",
    tooltip: '',
    style: e.item.style.None,
    icon: e.item.icon.none,
    iconSide: e.item.side.left,
    badge: "",
    badgeStyle: e.item.style.None,
    size: e.item.size.Medium,
    close: false,
    submit: false,
    disabled: false,
    right: false,
    justified: false,
    fa: '',
    animated: false,
    pulse: false
  },
  template: '{{> button collapsable=true }}'
}

e.item.type.collapsedMenu = 'ctx.popup.bootstrap.type.collapsedMenu';
ctx.popup.bootstrap.type.collapsedMenu = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    icon: '',
    iconStyle: '',
    value: '',
    active: '',
    collapsed: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.menuItem]
  },
  model: {
    type: e.item.type.collapsedMenu,
    id: 'collapse%index%'
  },
  template: '\
<div id="{{id}}_content" {{> myType}} class="ctxcontent{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle}}>\
  <li id="{{id}}" data-toggle="collapse" data-target="#{{id}}_menu" class="ctxlink collapsed{{#if active}} active{{/if}}">\
    <a>{{> icon id="" type="" tooltip="" }} {{{value}}} {{#if items}}<span class="arrow"></span>{{/if}}</a>\
  </li>\
  <ul class="sub-menu collapse{{#unless collapsed}} in{{/unless}}" id="{{id}}_menu">\
  {{#each  items}}\
    {{> menuItem parentId=../id }}\
  {{/each}}\
  </ul>\
</div>'
}

e.item.type.iframe = 'ctx.popup.bootstrap.type.iframe';
ctx.popup.bootstrap.type.iframe = {
  icon: '/fa/window-maximize.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    src: '',
    width: '',
    height: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.iframe,
    id: 'iframe%index%'
  },
  template: '\
<div id="{{id}}_content"{{> myType}} style="width: 100%">\
  <iframe {{> myStyle}}{{#if myClass}} class="{{myClass}}"{{/if}}{{#if height}} height="{{height}}"{{/if}}{{#if width}} width="{{width}}"{{/if}}{{#if src}} src="{{src}}"{{/if}} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>\
</div>'
};

e.item.type.image = 'ctx.popup.bootstrap.type.image';
ctx.popup.bootstrap.type.image = {
  icon: '/fa/image.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    src: '',
    imageShape: '',
    href: '',
    title: '',
    width: '',
    height: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.image,
    id: 'image%index%'
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="ctxcontent">\
  <img id="{{id}}"{{#if src}} src="{{src}}"{{/if}}{{#if href}} href="{{href}}"{{/if}}{{#if title}} alt="{{title}}"{{/if}}{{#if height}} height="{{height}}"{{/if}}{{#if width}} width="{{width}}"{{/if}} class="{{#if imageShape}}img-{{imageShape}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}/>\
</div>'
};

ctx.popup.bootstrap.type.input = {
  icon: '/fa/terminal.png',
  virtual: true,
  //useSet: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    placeholder: '',
    test: '',
    label: '',
    icon: '',
    iconStyle: '',
    iconSide: '',
    iconText: '',
    iconButton: '',
    feedbackIcon: '',
    inputStyle: '',
    size: '',
    readonly: '',
    myClass: '',
    myStyle: '',
    disabled: '',
    visible: '',
    auto: ''
  },
  model: {
    icon: e.item.icon.none,
    iconStyle: e.item.style.None,
    iconSide: e.item.side.left,
    label: '',
    test: '',
    inputStyle: e.item.inputStyle.None,
    placeholder: ''
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="ctxcontent form-group{{#if inputStyle}} has-{{inputStyle}}{{/if}}{{#if feedbackIcon}} has-feedback{{/if}}{{#if myClass}} {{myClass}}{{/if}}">\
  {{#if label}}<label for="{{id}}" class="control-label"> {{label}} </label>{{/if}}\
  {{#ifCond icon "||" iconText}}\
    <div class="input-group{{#if size}} input-group-{{size}}{{/if}}">\
    {{#ifCond iconSide "!=" "right"}}\
      {{#if iconButton}}\
        <div class="input-group-btn"><button id="{{id}}_button" class="ctxlink btn {{#if iconStyle}}btn-{{iconStyle}}{{/if}}" type="submit"><i class="glyphicon {{#if icon}}glyphicon-{{icon}}{{/if}}"></i></button></div>\
      {{else}}\
        <span class="input-group-addon"> {{> icon id="" type="" tooltip="" }}</span>\
      {{/if}}\
    {{/ifCond}}\
  {{/ifCond}}\
  <{{#if tag}}{{tag}}{{else}}input{{/if}} id="{{id}}"{{#if readonly}} readonly=""{{/if}}{{#if disabled}} disabled=""{{/if}}{{#if placeholder}} placeholder="{{placeholder}}"{{/if}} class="form-control"{{> myStyle }}{{#if format}} type="{{format}}"{{/if}}{{#if rows}} rows="{{rows}}"{{/if}}></{{#if tag}}{{tag}}{{else}}input{{/if}}>\
  {{#if feedbackIcon}}<span class="glyphicon glyphicon-{{feedbackIcon}} form-control-feedback"></span>{{/if}}\
  {{#ifCond icon "||" iconText}}\
    {{#ifCond iconSide "==" "right"}}\
      {{#if iconButton}}\
        <div class="input-group-btn"><button id="{{id}}_button" class="ctxlink btn {{#if iconStyle}}btn-{{iconStyle}}{{/if}}" type="submit"><i class="glyphicon {{#if icon}}glyphicon-{{icon}}{{/if}}"></i></button></div>\
      {{else}}\
        <span class="input-group-addon"> {{> icon id="" type="" tooltip="" }}</span>\
      {{/if}}\
    {{/ifCond}}\
    </div>\
  {{/ifCond}}\
</div>\
'
};

e.item.type.date = 'ctx.popup.bootstrap.type.date';
ctx.popup.bootstrap.type.date = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.date,
    id: 'date%index%'
  },
  template: '{{> input format="date" }}'
};

e.item.type.email = 'ctx.popup.bootstrap.type.email';
ctx.popup.bootstrap.type.email = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.email,
    id: 'email%index%'
  },
  template: '{{> input format="email" }}'
};

e.item.type.number = 'ctx.popup.bootstrap.type.number';
ctx.popup.bootstrap.type.number = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.number,
    id: 'number%index%'
  },
  template: '{{> input format="number" }}'
};

e.item.type.password = 'ctx.popup.bootstrap.type.password';
ctx.popup.bootstrap.type.password = {
  icon: '/fa/lock.png',
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.password,
    id: 'password%index%'
  },
  template: '{{> input format="password" }}'
};

e.item.type.text = 'ctx.popup.bootstrap.type.text';
ctx.popup.bootstrap.type.text = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.text,
    id: 'text%index%'
  },
  template: '{{> input format="text" }}'
};

e.item.type.time = 'ctx.popup.bootstrap.type.time';
ctx.popup.bootstrap.type.time = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.time,
    id: 'time%index%'
  },
  template: '{{> input format="time" }}'
};

e.item.type.fileInput = 'ctx.popup.bootstrap.type.fileInput';
ctx.popup.bootstrap.type.fileInput = {
  icon: '/fa/folder.png',
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.file,
    id: 'file%index%'
  },
  template: '{{> input format="file" }}'
};

e.item.type.url = 'ctx.popup.bootstrap.type.url';
ctx.popup.bootstrap.type.url = {
  root: ctx.popup.bootstrap.type.input,
  //meta: ctx.popup.bootstrap.type.input.meta,
  model: {
    type: e.item.type.url,
    id: 'url%index%'
  },
  template: '{{> input format="url" }}'
};

e.item.type.textarea = 'ctx.popup.bootstrap.type.textarea';
ctx.popup.bootstrap.type.textarea = {
  icon: '/fa/terminal.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    icon: '',
    iconStyle: '',
    iconSide: '',
    label: '',
    test: '',
    placeholder: '',
    rows: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    id: 'area%index%',
    type: e.item.type.textarea,
    test: '',
    icon: e.item.icon.none,
    iconSide: e.item.side.left,
    label: '',
    placeholder: '',
    myClass: ''
  },
  template: '{{> input tag="textarea" }}'
};

e.item.type.label = 'ctx.popup.bootstrap.type.label';
ctx.popup.bootstrap.type.label = {
  icon: '/fa/tag.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    test: '',
    style: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    textSize: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.label,
    id: 'label%index%',
    textSize: e.item.textSize.H4
  },
  template: '{{#if textSize}}<{{textSize}}>{{/if}}<span id="{{id}}"{{> myType}}\
    class="label{{#if style}} label-{{style}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>{{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}</span>\
    {{#if textSize}}</{{textSize}}>{{/if}}'
}

e.item.type.list = 'ctx.popup.bootstrap.type.list';
ctx.popup.bootstrap.type.list = {
  icon: '/fa/list.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    textSize: '',
    style: '',
    footer: '',
    collapsable: '',
    collapsed: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.listItem]
  },
  model: {
    type: e.item.type.list,
    id: 'list%index%'
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="ctxcontent panel-group{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
  <div class="panel panel-{{#if style}}{{style}}{{else}}default{{/if}}">\
    {{#if title}}\
    <div class="panel-heading">\
      <{{#if textSize}}{{textSize}}{{else}}h4{{/if}} class="panel-title">\
        {{#if collapsable}}<a class="ctxlink" data-toggle="collapse" href="#{{id}}_panel">{{{title}}}</a>{{else}}{{{title}}}{{/if}}\
      </{{#if textSize}}{{textSize}}{{else}}h4{{/if}}>\
    </div>\
    {{/if}}\
    <div id="{{id}}_panel" class="{{#if collapsable}}panel-collapse collapse{{#unless collapsed}} in{{/unless}}{{/if}}">\
      <div id="{{id}}" class="list-group">\
      {{#each items}}\
        {{> listItem listClass="list-group-item"}}\
      {{/each}}\
        {{#if footer}}<div class="panel-footer">{{{footer}}}</div>{{/if}}\
      </div>\
    </div>\
  </div>\
</div>\
',
  initProxy: function (item, params) {
    item.get = function(iRow) {
      var res = null;
      if ((iRow === undefined) || (iRow === null)) {
        res = item.items;
      } else {
        if (item.items && item.items.length && (iRow < item.items.length)) {
          res = item.items[iRow];
        }
      }
      return res;
    };
    item.set = function(value, iRow) {
      var items = item.items;
      if ((iRow === undefined) || (iRow === null)) {
        items = item.items = value;
      } else {
        if (items && items.length && (iRow < items.length)) {
          items[iRow] = value;
        }
      }
      return item.update({ items: value }, iRow);
    };
  }
}

e.item.type.iconBar = 'ctx.popup.bootstrap.type.iconBar';
ctx.popup.bootstrap.type.iconBar = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    inline: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.iconItem]
  },
  model: {
    type: e.item.type.iconBar,
    id: 'menu%index%',
    parent: '',
    inline: true,
    auto: false
  },
  template: '\
<div id="{{id}}"{{> myType}} class="icon-bar{{#if myClass}} {{myClass}}{{/if}}{{#if inline}} list-inline{{/if}}"{{> myStyle }}>\
{{#each items}}\
  {{> iconItem parentId=../id }}\
{{/each}}\
</ul>\
'
}

e.item.type.menu = 'ctx.popup.bootstrap.type.menu';
ctx.popup.bootstrap.type.menu = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    inline: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.menuItem]
  },
  model: {
    type: e.item.type.menu,
    id: 'menu%index%',
    parent: '',
    inline: true,
    auto: false
  },
  template: '\
<ul id="{{id}}"{{> myType}} class="{{#if myClass}}{{myClass}}{{/if}}{{#if inline}} list-inline{{/if}}"{{> myStyle }}>\
{{#each items}}\
  {{> menuItem parentId=../id }}\
{{/each}}\
</ul>\
'
}

e.item.type.menuSide = 'ctx.popup.bootstrap.type.menuSide';
ctx.popup.bootstrap.type.menuSide = {
  icon: '/fa/toggle-down.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    collapsed: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.subItem]
  },
  model: {
    type: e.item.type.menuSide,
    id: 'menuSide%index%',
    parent: '',
    inline: true,
    auto: false
  },
  template: '\
<div id="{{id}}"{{> myType}} class="nav-side-menu {{#if myClass}}{{myClass}}{{/if}}"{{> myStyle }}>\
    {{#if title}}<div class="brand">{{title}}</div>{{/if}}\
     <i class="ctxlink fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#{{id}}_menu"></i> \
      <div class="menu-list">\
      <ul id="{{id}}_menu" class="menu-content{{#if collapsed}}{{else}} out{{/if}}">\
{{#each items}}\
  {{> subItem parentId=../id}}\
{{/each}}\
      </ul>\
   </div>\
</div>'
}

e.item.type.navbar = 'ctx.popup.bootstrap.type.navbar';
ctx.popup.bootstrap.type.navbar = {
  icon: '/fa/window-maximize.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    inverse: '',
    title: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    menus: [e.item.type.navbarMenu],
    items: [e.item.type.subItem],
    rightMenus: [e.item.type.navbarMenu]
  },
  model: {
    type: e.item.type.navbar,
    id: "navbar%index%"
  },
  template: '\
<nav id="{{id}}" {{#if type}}ctxtype="{{type}}" {{/if}}class="navbar {{#if inverse}}navbar-inverse{{else}}navbar-default{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
  <div class="container-fluid">\
{{#if title}}\
  <div class="navbar-header">\
    <a class="navbar-brand" href="javascript:void(0);">{{title}}</a>\
  </div>\
{{/if}}\
  <ul class="nav navbar-nav">\
{{#each menus}}\
    {{> navbarMenu parentId=../id }}\
{{/each}}\
  </ul>\
{{#if items}}\
  <form class="nav navbar-form navbar-left">\
{{#each items}}\
    {{> subItem parentId=../id }}\
{{/each}}\
   </form>\
{{/if}}\
{{#if rightMenus}}\
  <ul class="nav navbar-nav navbar-right">\
{{#each rightMenus}}\
    {{> navbarMenu parentId=../id }}\
{{/each}}\
   </ul>\
{{/if}}\
  </div>\
</nav>\
'
}

e.item.type.navItem = 'ctx.popup.bootstrap.type.navItem';
ctx.popup.bootstrap.type.navItem = {
  meta: {
    id: '',
    value: '',
    icon: '',
    iconStyle: '',
    badge: '',
    badgeStyle: '',
    tooltip: '',
    tooltipPlacement: '',
    active: '',
    disabled: '',
    myClass: ''
  },
  model: {
  },
  template: '\
<li id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_tab" class="ctxlink{{#if disabled}} disabled{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if @first}} active{{else}}{{#if active}} active{{/if}}{{/if}}"{{> myStyle }}{{> tooltip}}>\
  {{#ifCond icon "||" value}}<a data-toggle="{{#if pills}}pill{{else}}tab{{/if}}" href="#{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" ctxparent="{{parentId}}">\
    {{> icon id="" type="" tooltip="" }} {{{value}}} {{> badge id="" }}\
  </a>{{/ifCond}}\
</li>'
};

e.item.type.navIconItem = 'ctx.popup.bootstrap.type.navIconItem';
ctx.popup.bootstrap.type.navIconItem = {
  meta: {
    id: '',
    tooltip: '',
    tooltipPlacement: '',
    style: '',
    icon: '',
    iconStyle: '',
    active: '',
    disabled: '',
    myClass: ''
  },
  model: {
  },
  template: '\
<li role="presentation" class="ctxlink{{#if myClass}} {{myClass}}{{/if}}{{#if @first}} active{{else}}{{#if active}} active{{/if}}{{/if}}"{{> myStyle }}>\
  <a href="#{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" data-toggle="tab" aria-controls="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" role="tab" >\
    <span class="round-tab" {{> tooltip}}>\
      {{> icon id="" type="" tooltip="" }}\
    </span>\
  </a>\
</li>'
};

e.item.type.navContentItem = 'ctx.popup.bootstrap.type.navContentItem';
ctx.popup.bootstrap.type.navContentItem = {
  meta: {
  },
  model: {
  },
  template: '\
    <div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" class="tab-pane fade{{#if @first}} in active{{else}}{{#if active}} in active{{/if}}{{/if}}">\
      <div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"></div>\
    </div>\
  '
};

e.item.type.tabs = 'ctx.popup.bootstrap.type.tabs';
ctx.popup.bootstrap.type.tabs = {
  icon: '/fa/window-maximize.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    pills: '',
    parent: '',
    inline: '',
    justified: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.navItem]
  },
  model: {
    type: e.item.type.tabs,
    id: "tabs%index%",
    inline: true
  },
  template: '\
<div id="{{id}}" {{#if type}}ctxtype="{{type}}" {{/if}}>\
  <ul class="nav {{#if pills}}nav-pills{{else}}nav-tabs{{/if}}{{#if inline}}{{else}} nav-stacked{{/if}}{{#if justified}} nav-justified{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
{{#each items}}\
    {{> navItem parentId=../id pills=../pills }}\
{{/each}}\
  </ul>\
  <div class="tab-content{{#if pills}}{{else}} tab-border{{/if}}">\
{{#each items}}\
    {{> navContentItem parentId=../id }}\
{{/each}}\
  </div>\
</div>'
};


e.item.type.pager = 'ctx.popup.bootstrap.type.pager';
ctx.popup.bootstrap.type.pager = {
  icon: '/fa/circle-o.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.pagerItem]
    //saveAsHtml: ''
  },
  model: {
    type: e.item.type.pager,
    id: "pager%index%"
  },
  template: '\
<ul id="{{id}}" {{#if type}}ctxtype="{{type}}" {{/if}}class="pager {{#if myClass}}{{myClass}}{{/if}}"{{> myStyle }}>\
{{#each items}}\
  {{> pagerItem parentId=../id}}\
{{/each}}\
</ul>\
'
}

e.item.type.pageItem = 'ctx.popup.bootstrap.type.pageItem';
ctx.popup.bootstrap.type.pageItem = {
  meta: {
    id: '',
    style: '',
    disabled: '',
    collapsed: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '\
<div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}_content" class="panel-collapse collapse{{#ifCond collapsed "===" false}} in{{/ifCond}}" aria-labelledby="{{parentId}}_heading{{@index}}">\
  <div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}"{{#if parentId}} ctxparent="{{parentId}}"{{/if}}></div>\
</div>'
};


e.item.type.page = 'ctx.popup.bootstrap.type.page';
ctx.popup.bootstrap.type.page = {
  icon: '/fa/server.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.pageItem]
  },
  model: {
    type: e.item.type.page,
    id: 'page%index%'
  },
  template: '\
<div class="panel-group" id="{{id}}"{{> myType}} {{#if myClass}} class="{{myClass}}"{{/if}}{{> myStyle}} >\
{{#each items}}\
  {{> pageItem parentId=../id parentStyle=../style }}\
{{/each}}\
</div>',
  init: function (item, params) {
    item.collapse = function(collapsed, childId) {
      var value = ((collapsed === true) ? 'hide' : ((collapsed === false) ? 'show' : 'toggle'));
      $('#' + childId + '_content').collapse(value);
      var res = null;
    };
  },
  initProxy: function (item, params) {
    item.collapse = function(collapsed, childId) {
      return item.itemExec('collapse', collapsed, childId);
    };
  }
}

e.item.type.pagination = 'ctx.popup.bootstrap.type.pagination';
ctx.popup.bootstrap.type.pagination = {
  icon: '/fa/circle-o.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    right: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    size: '',
    auto: '',
    items: [e.item.type.paginationItem]
  },
  model: {
    type: e.item.type.pagination,
    id: "pag%index%"
  },
  template: '\
<ul id="{{id}}" {{#if type}}ctxtype="{{type}}" {{/if}}class="pagination{{#if size}} pagination-{{size}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if right}} pull-right{{/if}}"{{> myStyle }}>\
{{#each items}}\
  {{> paginationItem parentId=../id}}\
{{/each}}\
</ul>\
'
}

e.item.type.progressItem = 'ctx.popup.bootstrap.type.progressItem';
ctx.popup.bootstrap.type.progressItem = {
  meta: {
    id: '',
    value: '',
    current: '',
    style: '',
    myClass: '',
    myStyle: ''
  },
  model: {
  },
  template: '<div id="{{#if id}}{{id}}{{else}}{{parentId}}_{{@index}}{{/if}}" \
    class="progress-bar{{#if style}} progress-bar-{{style}}{{/if}}{{#if animated}} progress-bar-striped active{{else}}{{#if striped}} progress-bar-striped{{/if}}{{/if}}"{{> myStyle }} role="progressbar" aria-valuenow="{{current}}" aria-valuemin="{{#if min}}{{min}}{{else}}0{{/if}}" aria-valuemax="{{#if max}}{{max}}{{else}}100{{/if}}" style="width:{{current}}%">{{{value}}}</div>'
}

e.item.type.progress = 'ctx.popup.bootstrap.type.progress';
ctx.popup.bootstrap.type.progress = {
  icon: '/fa/tasks.png',
  subIcon: '/fa/angle-down.png',
  subContainers: true,
  meta: {
    type: '',
    id: '',
    parent: '',
    min: '',
    max: '',
    striped: '',
    animated: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.progressItem]
  },
  model: {
    type: e.item.type.progress,
    id: "progress%index%"
  },
  template: '\
<div id="{{id}}"{{> myType}} class="progress"{{> myStyle }}>\
  {{#each  items}}\
    {{> progressItem parentId=../id min=../min max=../max striped=../striped animated=../animated }}\
  {{/each}}\
</div>'
}

e.item.type.select = 'ctx.popup.bootstrap.type.select';
ctx.popup.bootstrap.type.select = {
  icon: '/fa/terminal.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    placeholder: '',
    test: '',
    label: '',
    icon: '',
    iconStyle: '',
    iconSide: '',
    iconText: '',
    iconButton: '',
    inputStyle: '',
    size: '',
    multiple: '',
    myClass: '',
    myStyle: '',
    disabled: '',
    visible: '',
    auto: '',
    items: [e.item.type.selectItem]
  },
  model: {
    type: e.item.type.select,
    id: "select%index%"
  },
  template: '\
<div id="{{id}}_content" {{#if type}}ctxtype="{{type}}" {{/if}}class="ctxcontent form-group{{#if inputStyle}} has-{{inputStyle}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
  {{#if label}}<label for="{{id}}" class="control-label">{{label}}</label>{{/if}}\
  {{#ifCond icon "||" iconText}}\
    <div class="input-group{{#if size}} input-group-{{size}}{{/if}}">\
    {{#ifCond iconSide "!=" "right"}}\
      {{#if iconButton}}\
        <div class="input-group-btn"><button id="{{id}}_button" class="ctxlink btn {{#if iconStyle}}btn-{{iconStyle}}{{/if}}" type="submit"><i class="glyphicon {{#if icon}}glyphicon-{{icon}}{{/if}}"></i></button></div>\
      {{else}}\
        <span class="input-group-addon"> {{> icon id="" type="" tooltip="" }}</span>\
      {{/if}}\
    {{/ifCond}}\
  {{/ifCond}}\
  <select {{#if multiple}}multiple=""{{/if}} name="{{id}}" class="form-control selectpicker" id="{{id}}" data-bv-field="{{id}}">\
  {{#each  items}}\
    {{> selectItem parentId=../id }}\
  {{/each}}\
  </select>\
  {{#ifCond icon "||" iconText}}\
    {{#ifCond iconSide "==" "right"}}\
      {{#if iconButton}}\
        <div class="input-group-btn"><button id="{{id}}_button" class="ctxlink btn {{#if iconStyle}}btn-{{iconStyle}}{{/if}}" type="submit"><i class="glyphicon {{#if icon}}glyphicon-{{icon}}{{/if}}"></i></button></div>\
      {{else}}\
        <span class="input-group-addon"> {{> icon id="" type="" tooltip="" }}</span>\
      {{/if}}\
    {{/ifCond}}\
    </div>\
  {{/ifCond}}\
</div>'
}

e.item.type.slider = 'ctx.popup.bootstrap.type.slider';
ctx.popup.bootstrap.type.slider = {
  icon: '/fa/sliders.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    value: '',
    test: '',
    myClass: '',
    myStyle: '',
    disabled: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.slider,
    id: "slider%index%"
  },
  template: '\
<div id="{{id}}_content"{{> myType}} class="slidecontainer{{#if myClass}} {{myClass}}{{/if}}{{#if disabled}} {{disabled}}{{/if}}"{{> myStyle }}>\
  <input type="range" id="{{id}}" min="0" max="100" value="{{#if value}}{{value}}{{else}}0{{/if}}" class="slider">\
</div>'
}

e.item.type.table = 'ctx.popup.bootstrap.type.table';
ctx.popup.bootstrap.type.table = {
  icon: '/fa/table.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    title: '',
    style: '',
    showHeader: '',
    bordered : '',
    condensed : '',
    hover : '',
    striped : '',
    tableHeight: '',
    //filter: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    columns: [e.item.type.tableColumn],
    items: ''
  },
  model: {
    type: e.item.type.table,
    showHeader: true,
    id: "table%index%"
  },
//      <td class="{{#if ../columns.@index.myClass}} {{../columns.@index.myClass}}{{/if}}{{#if ../columns.@index.style}} text-{{../columns.@index.style}}{{/if}}\
//  {{#if ../columns.@index.alignment}} {{../columns.@index.alignment}}{{/if}}{{#if ../columns.@index.textTransform}} {{../columns.@index.textTransform}}{{/if}}">{{{this}}}</td>\
  template: '\
<div id="{{id}}_content" {{#if type}}ctxtype="{{type}}" {{/if}}{{#if tableHeight}} style="height:{{tableHeight}}px"{{/if}} class="ctxcontent tableContainer panel {{#if style}}panel-{{style}} {{/if}}"{{> myStyle }}>\
  {{#if title}}<div class="panel-heading">\
  <h3 class="panel-title"> {{{title}}} </h3>\
  </div>\
  {{/if}}\
  <table class="table{{#if bordered}} table-bordered{{/if}}{{#if condensed}} table-condensed{{/if}}{{#if hover}} table-hover{{/if}}{{#if striped}} table-striped{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }} id="{{id}}" >\
    {{#if showHeader}}\
    <thead><tr>\
    {{#each columns}}\
      {{> tableColumn }}\
    {{/each}}\
    </tr></thead>\
    {{/if}}\
    {{#if columns}}\
    <tbody>\
    {{#each items}}\
    <tr>\
      {{#each this}}\
      <td style="{{lookup (lookup ../../columns @index) \'myStyle\'}}" class="{{lookup (lookup ../../columns @index) \'myClass\'}} text-{{lookup (lookup ../../columns @index) \'style\'}} {{lookup (lookup ../../columns @index) \'textTransform\'}} {{lookup (lookup ../../columns @index) \'alignment\'}}"> {{{this}}} </td>\
      {{/each}}\
    </tr>\
    {{/each}}\
    <tr>\
    </tbody>\
    {{/if}}\
  </table>\
</div>',
  init: function (item, params) {
    item.get = function(iRow, iCol) {
      var res = null;
      if ((iCol === undefined) || (iCol === null)) {
        if ((iRow === undefined) || (iRow === null)) {
          res = item.items;
        } else {
          if (item.items && item.items.length && (iRow < item.items.length)) {
            res = item.items[iRow];
          }
        }
      } else {
        if (!((iRow === undefined) || (iRow === null))) {
          if (item.items && item.items.length && (iRow < item.items.length)) {
            if (item.items[iRow] && item.items[iRow].length && (iCol < item.items[iRow].length)) {
              res = item.items[iRow][iCol];
            }
          }
        }
      }
      return res;
    };

    item.set = function(value, iRow, iCol) {
      var items = item.items;
      if ((iCol === undefined) || (iCol === null)) {
        if ((iRow === undefined) || (iRow === null)) {
          items = item.items = value;
        } else {
          if (items && items.length && (iRow < items.length)) {
            items[iRow] = value;
          }
        }
      } else {
        if (!((iRow === undefined) || (iRow === null))) {
          if (items && items.length && (iRow < items.length)) {
            if (items[iRow] && items[iRow].length && (iCol < items[iRow].length)) {
              items[iRow][iCol] = value;
            }
          }
        }
      }
      item.update({ items: items });
    };
  },
  initProxy: function (item, params) {
   /**
    * Gets item values on a table.
    * @description
    * <wrap help> //Example://</wrap>
<code javascript>
POPUPS.myPopup.myList.get( );
</code>
    * @method  get
    * @path    ctx.popupItem.get
    * @param   {number} [iRow] Row index
    * @param   {number} [iCol] Column index
    */
    item.get = function(iRow, iCol) {
      return item.itemExec('get', iRow, iCol);
    };
   /**
    * Sets items on a table.
    * @description
    * <wrap help> //Example://</wrap>
<code javascript>
POPUPS.myPopup.myList.set( [ ['John', 'Smith', 'jsmith@gmail.com'], ['Jack', 'Waller', 'j.waller@gmail.com'] ] );
</code>
    * @method  set
    * @path    ctx.popupItem.set
    * @param   {Array|string} value Value to be set
    * @param   {number} [iRow] Row index
    * @param   {number} [iCol] Column index
    */
    item.set = function(value, iRow, iCol) {
      return item.itemExec('set', value, iRow, iCol);
    };
  }
}

e.item.type.treeview = 'ctx.popup.bootstrap.type.treeview';
//ctx.popup.bootstrap.type.treeview = {
//  options: {
//    showTags: true
//  },
//  initItem: function (item) {
//    item.getAll = function() {
//      // todo
//    }
//    item.refresh = function() {
//      //var obj = ctx.initRefresh(item);
//      //var jQobj = (item.element ? $(item.element) : $('#' + item.id));
//      //jQobj.treeview( obj );
//      var jQobj = (item.element ? $(item.element) : $('#' + item.id));
//      jQobj.treeview( item.options );
//    }
//    item.setAll = function(data) {
//      // todo
//      if (data) item.data = data;
//      item.refresh();
//    }
//    item.refresh();
//  }
//}

e.item.type.update = 'ctx.popup.bootstrap.type.update';
ctx.popup.bootstrap.type.update = {
  icon: '/fa/tag.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    icon: '',
    style: '',
    value: '',
    test: '',
    markdown: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    id: 'update%index%',
    type: e.item.type.update,
    parent: ''
  },
  template: '\
<div{{#if id}} id="{{id}}"{{/if}}{{> myType}} class="update-nag{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
  {{#if icon}}<div class="update-split{{#if style}} update-{{style}}{{/if}}"><i class="glyphicon glyphicon-{{icon}}"></i></div>{{/if}}\
  <div class="update-text">{{{value}}}</div>\
</div>'
};

e.item.type.wizard = 'ctx.popup.bootstrap.type.wizard';
ctx.popup.bootstrap.type.wizard = {
  icon: '/fa/tv.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: '',
    items: [e.item.type.navIconItem]
  },
  model: {
    type: e.item.type.wizard,
    id: "wizard%index%"
  },
  template: '\
<div id="{{id}}" {{#if type}}ctxtype="{{type}}" {{/if}} class="wizard">\
  <div class="wizard-inner">\
    <div class="connecting-line"></div>\
    <ul class="nav nav-tabs{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }} role="tablist">\
    {{#each items}}\
      {{> navIconItem parentId=../id pills=false }}\
    {{/each}}\
    </ul>\
  </div>\
  <div class="tab-content">\
  {{#each items}}\
    {{> navContentItem parentId=../id }}\
  {{/each}}\
  </div>\
</div>'
};

e.item.type.column = 'ctx.popup.bootstrap.type.column';
ctx.popup.bootstrap.type.column = {
  isContainer: true,
  icon: '/fa/ellipsis-h.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    alignment: '',
    alignmentVertical: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.column,
    id: "col%index%",
    auto: false
  },
  template: '<div {{#if id}}id="{{id}}" {{/if}}{{#if type}}ctxtype="{{type}}" {{/if}}\
  class="\
  {{#if xs}}col-xs-{{xs}}{{else}}{{#if sm}}col-xs-{{sm}}{{else}}{{#if md}}col-xs-{{md}}{{else}}{{#if lg}}col-xs-{{lg}}{{/if}}{{/if}}{{/if}}{{/if}}\
  {{#if sm}}col-sm-{{sm}}{{else}}{{#if md}}col-sm-{{md}}{{else}}{{#if lg}}col-sm-{{lg}}{{/if}}{{/if}}{{/if}}\
  {{#if md}}col-md-{{md}}{{else}}{{#if lg}}col-md-{{lg}}{{/if}}{{/if}}\
  {{#if lg}}col-lg-{{lg}}{{/if}}\
  {{#if myClass}} {{myClass}}{{/if}}{{#if alignment}} {{alignment}}{{/if}}{{#if alignmentVertical}} {{alignmentVertical}}{{/if}}"{{> myStyle }}>\
</div>'
};

e.item.type.row = 'ctx.popup.bootstrap.type.row';
ctx.popup.bootstrap.type.row = {
  isContainer: true,
  icon: '/fa/bars.png',
  meta: {
    type: '',
    id: '',
    parent: '',
    rowType: '',
    alignment: '',
    alignmentVertical: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.row,
    id: "row%index%",
    auto: false
  },
  template: '<div {{#if id}}id="{{id}}" {{/if}}{{#if type}}ctxtype="{{type}}" {{/if}}class="row{{#if rowType}} {{rowType}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}{{#if alignment}} {{alignment}}{{/if}}{{#if alignmentVertical}} {{alignmentVertical}}{{/if}}"{{> myStyle}}>\
{{#each columns}}\
  {{> column}}\
{{/each}}\
</div>'
};

e.item.type.container = 'ctx.popup.bootstrap.type.container';
ctx.popup.bootstrap.type.container = {
  isContainer: true,
  icon: 'fa/vcard-o.png',
  meta: {
    type: '',
    id: '',
    background: '',
    parent: '',
    fluid: '',
    myClass: '',
    myStyle: '',
    visible: '',
    auto: ''
  },
  model: {
    type: e.item.type.container,
    id: "container%index%",
    auto: false
  },
  template: '<div {{#if id}}id="{{id}}" {{/if}}{{#if type}}ctxtype="{{type}}" {{/if}}class="container{{#if fluid}}-fluid{{/if}}{{#if background}} bg-{{background}}{{/if}}{{#if myClass}} {{myClass}}{{/if}}"{{> myStyle }}>\
{{#if form}}\
  <form>\
  {{/if}}\
  {{#each rows}}\
    {{> row}}\
  {{/each}}\
  {{#if form}}\
  </form>\
{{/if}}\
</div>'
};

ctx.mapObject(e.item.type);

// ********************
// *** item samples ***
// ********************
e.item.sample = {
  ctxType: 'e.item.sample'
};


ctx.popup.bootstrap.sample = {
  ctxType: 'ctx.popup.bootstrap.sample',
  display: {
    name: 'insert',
    icon: 'fa-send',
    folder: true
  }
}

e.item.sampleNone = 'ctx.popup.bootstrap.sampleNone';
ctx.popup.bootstrap.sampleNone = {
  display: {
    name: 'Declare item...',
    icon: 'fa-bookmark',
    description: 'item declaration'
  },
  model: {
    type: e.item.type.none
  }
}

e.item.sample.grid = {};

ctx.popup.bootstrap.sample.grid = {
  display: {
    name: 'Insert grid',
    icon: 'fa-th',
    folder: true
  }
}

e.item.sample.grid.container = 'ctx.popup.bootstrap.sample.grid.container';
ctx.popup.bootstrap.sample.grid.container = {
  display: {
    name: 'container',
    icon: 'fa-th-large',
    description: 'Fluid container'
  },
  model: {
    type: e.item.type.container,
    id: 'container%index%',
    fluid: true,
    auto: false
    //saveAsHtml: true
  }
}

e.item.sample.grid.row0 = 'ctx.popup.bootstrap.sample.grid.row0';
ctx.popup.bootstrap.sample.grid.row0 = {
  display: {
    name: 'row + 0 column',
    icon: 'fa-bars',
    description: 'Row + 0 column'
  },
  model: {
    type: e.item.type.row,
    id: 'row%index%',
    parent: ''
  }
}

e.item.sample.grid.row1 = 'ctx.popup.bootstrap.sample.grid.row1';
ctx.popup.bootstrap.sample.grid.row1 = {
  display: {
    name: 'row + 1 column',
    icon: 'fa-bars',
    description: 'Row + 1 column'
  },
  model: {
    type: e.item.type.row,
    id: 'row%index%',
    parent: '',
    model: {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 12
    }
  }
}

e.item.sample.grid.row2 = 'ctx.popup.bootstrap.sample.grid.row2';
ctx.popup.bootstrap.sample.grid.row2 = {
  display: {
    name: 'row + 2 columns',
    icon: 'fa-bars',
    description: 'Row + 2 columns'
  },
  model: {
    type: e.item.type.row,
    id: 'row%index%',
    parent: '',
    model: [{
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 6
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 6
    }]
  }
}

e.item.sample.grid.row3 = 'ctx.popup.bootstrap.sample.grid.row3';
ctx.popup.bootstrap.sample.grid.row3 = {
  display: {
    name: 'row + 3 columns',
    icon: 'fa-bars',
    description: 'Row + 3 columns'
  },
  model: {
    type: e.item.type.row,
    id: 'row%index%',
    parent: '',
    model: [{
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 4
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 4
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 4
    }]
  }
}

e.item.sample.grid.row4 = 'ctx.popup.bootstrap.sample.grid.row4';
ctx.popup.bootstrap.sample.grid.row4 = {
  display: {
    name: 'row + 4 columns',
    icon: 'fa-bars',
    description: 'Row + 4 columns'
  },
  model: {
    type: e.item.type.row,
    id: 'row%index%',
    parent: '',
    model: [{
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 3
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 3
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 3
    }, {
      type: e.item.type.column,
      id: "col%index%",
      xs: 0,
      sm: 0,
      md: 0,
      lg: 3
    }]
  }
}

e.item.sample.grid.rowHeader = 'ctx.popup.bootstrap.sample.grid.rowHeader';
ctx.popup.bootstrap.sample.grid.rowHeader = {
  display: {
    name: 'header row',
    icon: 'fa-bars',
    description: 'Header row'
  },
  model: {
    type: e.item.type.row,
    rowType: e.item.rowType.Header,
    id: 'row%index%',
    parent: '',
    auto: false
    //saveAsHtml: true
  }
}

e.item.sample.grid.rowFooter = 'ctx.popup.bootstrap.sample.grid.rowFooter';
ctx.popup.bootstrap.sample.grid.rowFooter = {
  display: {
    name: 'footer row',
    icon: 'fa-bars',
    description: 'Footer row'
  },
  model: {
    type: e.item.type.row,
    rowType: e.item.rowType.Footer,
    id: 'row%index%',
    parent: '',
    auto: false
  }
}

e.item.sample.grid.column = 'ctx.popup.bootstrap.sample.grid.column';
ctx.popup.bootstrap.sample.grid.column = {
  display: {
    name: 'column',
    icon: 'fa-list',
    description: 'Column'
  },
  model: {
    type: e.item.type.column,
    id: 'col%index%',
    parent: '',
    xs: 0,
    sm: 0,
    md: 0,
    lg: 12,
    auto: false
  }
}

e.item.sample.item = {};

ctx.popup.bootstrap.sample.item = {
  display: {
    name: 'Insert basic item',
    icon: 'fa-tag',
    folder: true
  }
}

e.item.sample.input = {};
ctx.popup.bootstrap.sample.input = {
  display: {
    name: 'Insert input',
    icon: 'fa-minus',
    folder: true
  }
}

e.item.sample.button = {};

ctx.popup.bootstrap.sample.button = {
  display: {
    name: 'Insert button',
    icon: 'fa-hand-o-up',
    folder: true
  }
}

e.item.sample.navigation = {};

ctx.popup.bootstrap.sample.navigation = {
  display: {
    name: 'Insert navigation',
    icon: 'fa-caret-down',
    folder: true
  }
}

e.item.sample.lists = {};

ctx.popup.bootstrap.sample.lists = {
  display: {
    name: 'insert list/table',
    icon: 'fa-table',
    folder: true
  }
}

e.item.sample.item.alert = 'ctx.popup.bootstrap.sample.item.alert';
ctx.popup.bootstrap.sample.item.alert = {
  display: {
    name: 'alert',
    description: 'alert'
  },
  model: {
    type: e.item.type.alert,
    id: 'alert%index%',
    parent: '',
    style: e.item.style.Orange,
    close: false,
    value: "",
    test: "<strong>Warning!</strong>  Set your alert here !",
    auto: true
  }
};

e.item.sample.item.badge = 'ctx.popup.bootstrap.sample.item.badge';
ctx.popup.bootstrap.sample.item.badge = {
  display: {
    name: 'badge',
    description: 'badge'
  },
  model: {
    type: e.item.type.badge,
    id: 'badge%index%',
    parent: '',
    badge: "3",
    badgeStyle: e.item.style.Orange,
    auto: true
  }
};

e.item.sample.item.callout = 'ctx.popup.bootstrap.sample.item.callout';
ctx.popup.bootstrap.sample.item.callout = {
  display: {
    name: 'callout',
    description: 'callout'
  },
  model: {
    type: e.item.type.callout,
    id: 'callout%index%',
    parent: '',
    style: e.item.style.Blue,
    title: "Title here",
    value: "",
    test: "<strong>Warning!</strong>  Set your text here !",
    auto: true
  }
};

e.item.sample.item.card = 'ctx.popup.bootstrap.sample.item.card';
ctx.popup.bootstrap.sample.item.card = {
  display: {
    name: 'card',
    description: 'card'
  },
  model: {
    type: e.item.type.card,
    id: 'card%index%',
    parent: '',
    title: "Title here",
    value: "",
    src: "../bmp64/hello128.png",
    test: "<strong>Warning!</strong>  Set your text here !",
    auto: true
  }
};

e.item.sample.item.none = 'ctx.popup.bootstrap.sample.item.none';
ctx.popup.bootstrap.sample.item.none = {
  display: {
    name: 'empty item',
    description: 'empty item'
  },
  model: {
    type: e.item.type.none,
    id: 'div%index%',
    parent: '',
    auto: false
  }
}

e.item.sample.item.iframe = 'ctx.popup.bootstrap.sample.item.iframe';
ctx.popup.bootstrap.sample.item.iframe = {
  icon: '/fa/window-maximize.png',
  display: {
    name: 'iframe',
    description: 'iframe'
  },
  model: {
    type: e.item.type.iframe,
    id: 'iframe%index%',
    parent: '',
    src: "https://www.sap.com",
    width: '600px',
    height: '450px',
    auto: true
  }
};

e.item.sample.item.image = 'ctx.popup.bootstrap.sample.item.image';
ctx.popup.bootstrap.sample.item.image = {
  icon: '/fa/image.png',
  display: {
    name: 'image',
    description: 'image'
  },
  model: {
    type: e.item.type.image,
    id: 'image%index%',
    parent: '',
    src: "../bmp64/hello128.png",
    width: '128px',
    height: '128px',
    auto: true
  }
};

e.item.sample.item.item = 'ctx.popup.bootstrap.sample.item.item';
ctx.popup.bootstrap.sample.item.item = {
  display: {
    name: 'item',
    description: 'simple text'
  },
  model: {
    type: e.item.type.item,
    id: 'item%index%',
    parent: '',
    alignment: e.item.alignment.None,
    textSize: e.item.textSize.None,
    textTransform: e.item.textTransform.None,
    icon: e.item.icon.none,
    value: "Simple text here",
    auto: true
  }
}

e.item.sample.item.icon = 'ctx.popup.bootstrap.sample.item.icon';
ctx.popup.bootstrap.sample.item.icon = {
  display: {
    name: 'icon',
    description: 'simple icon with tooltip'
  },
  model: {
    type: e.item.type.icon,
    id: 'icon%index%',
    parent: '',
    icon: e.item.icon.questionSign,
    iconStyle: e.item.style.Orange,
    tooltip: "Help text here",
    tooltipPlacement: e.item.side.right,
    auto: true
  }
}

e.item.sample.item.icon2 = 'ctx.popup.bootstrap.sample.item.icon2';
ctx.popup.bootstrap.sample.item.icon2 = {
  display: {
    name: 'icon (animated)',
    description: 'animated icon with tooltip'
  },
  model: {
    type: e.item.type.icon,
    id: 'icon%index%',
    parent: '',
    fa: e.item.icon.asterisk,
    animated: true,
    iconStyle: e.item.style.Blue,
    tooltip: "Help text here",
    tooltipPlacement: e.item.side.right,
    auto: true
  }
}

e.item.sample.item.label = 'ctx.popup.bootstrap.sample.item.label';
ctx.popup.bootstrap.sample.item.label = {
  display: {
    name: 'label',
    description: 'label'
  },
  model: {
    type: e.item.type.label,
    id: 'label%index%',
    parent: '',
    value: "My label",
    style: e.item.style.Blue,
    icon: e.item.icon.none,
    textSize: e.item.textSize.H4,
    badge: "",
    badgeStyle: e.item.style.Red,
    auto: true
  }
}

e.item.sample.item.panel = 'ctx.popup.bootstrap.sample.item.panel';
ctx.popup.bootstrap.sample.item.panel = {
  display: {
    name: 'panel',
    description: 'panel'
  },
  model: {
    type: e.item.type.panel,
    id: 'panel%index%',
    parent: '',
    title: "Panel title",
    value: "",
    style: e.item.style.Blue,
    textSize: e.item.textSize.H3,
    auto: true,
    items: [
      {
        id: 'it%index%',
        value: "<b>First List Group Item Heading</b><br/>List Group Item Text"
      },
      {
        id: 'it%index%',
        value: "<b>Second List Group Item Heading</b><br/>List Group Item Text"
      }
    ]
  }
}

e.item.sample.item.progress = 'ctx.popup.bootstrap.sample.item.progress';
ctx.popup.bootstrap.sample.item.progress = {
  display: {
    name: 'progress bar',
    description: 'progress bar',
    src: "../preview/progress.png"
  },
  model: {
    type: e.item.type.progress,
    id: 'progress%index%',
    parent: '',
    min: 0,
    max: 100,
    striped: true,
    animated: false,
    auto: true,
    items: [{
      current: 40,
      style: e.item.style.Green,
      value: "40 % Complete"
    }]
  }
};

e.item.sample.item.progress2 = 'ctx.popup.bootstrap.sample.item.progress2';
ctx.popup.bootstrap.sample.item.progress2 = {
  display: {
    name: 'stacked progr. bar',
    description: 'stacked progress bar'
  },
  model: {
    type: e.item.type.progress,
    id: 'progress%index%',
    parent: '',
    min: 0,
    max: 100,
    striped: false,
    animated: false,
    auto: true,
    items: [{
      current: 35,
      style: e.item.style.Green,
      value: "Free space"
    }, {
      current: 25,
      style: e.item.style.Orange,
      value: "Warning"
    }, {
      current: 15,
      style: e.item.style.Red,
      value: "Danger"
    }]
  }
};

e.item.sample.item.slider = 'ctx.popup.bootstrap.sample.item.slider';
ctx.popup.bootstrap.sample.item.slider = {
  display: {
    name: 'slider',
    description: 'slider'
  },
  model: {
    type: e.item.type.slider,
    id: 'slider%index%',
    parent: '',
    value: 0,
    test: 50,
    auto: true
  }
};

e.item.sample.item.update = 'ctx.popup.bootstrap.sample.item.update';
ctx.popup.bootstrap.sample.item.update = {
  display: {
    name: 'update',
    description: 'update'
  },
  model: {
    type: e.item.type.update,
    id: 'update%index%',
    parent: '',
    icon: e.item.icon.warningSign,
    style: e.item.style.Orange,
    value: "<strong>Warning!</strong>  Set your text here !",
    test: "",
    auto: true
  }
};

e.item.sample.input.checkbox = 'ctx.popup.bootstrap.sample.input.checkbox';
ctx.popup.bootstrap.sample.input.checkbox = {
  display: {
    name: 'checkbox',
    description: 'checkbox'
  },
  model: {
    type: e.item.type.checkbox,
    id: 'checkbox%index%',
    parent: '',
    label: "Label",
    inline: true,
    items: [
      {
        id: "ch%index%",
        value: "Choice 0",
        checked: true,
        style: e.item.style.Blue
      }, {
        id: "ch%index%",
        value: "Choice 1",
        checked: false,
        style: e.item.style.Green,
        disabled: true
      }, {
        id: "ch%index%",
        value: "Choice 2",
        checked: false,
        style: e.item.style.Orange
      }
    ],
    test: undefined,
    auto: true
  }
}

e.item.sample.input.radio = 'ctx.popup.bootstrap.sample.input.radio';
ctx.popup.bootstrap.sample.input.radio = {
  display: {
    name: 'radio',
    description: 'radio'
  },
  model: {
    type: e.item.type.radio,
    id: 'radio%index%',
    parent: '',
    label: "Label",
    inline: true,
    items: [
      {
        id: "ch%index%",
        value: "Choice 0",
        checked: true,
        style: e.item.style.Blue
      }, {
        id: "ch%index%",
        value: "Choice 1",
        checked: false,
        style: e.item.style.Green,
        disabled: true
      }, {
        id: "ch%index%",
        value: "Choice 2",
        checked: false,
        style: e.item.style.Orange
      }
    ],
    test: undefined,
    auto: true
  }
}

e.item.sample.input.select = 'ctx.popup.bootstrap.sample.input.select';
ctx.popup.bootstrap.sample.input.select = {
  display: {
    name: 'select',
    description: 'select'
  },
  model: {
    type: e.item.type.select,
    id: 'select%index%',
    parent: '',
    iconSide: e.item.side.left,
    label: 'Name:',
    icon: e.item.icon.list,
    items: [
      {
        id: ' ',
        value: "Select choice"
      }, {
        id: 'sel%index%',
        value: "Choice 1"
      }, {
        id: 'sel%index%',
        value: "Choice 2"
      }
    ],
    test: "",
    auto: true
  }
};

e.item.sample.input.text = 'ctx.popup.bootstrap.sample.input.text';
ctx.popup.bootstrap.sample.input.text = {
  display: {
    name: 'text',
    description: 'text input'
  },
  model: {
    type: e.item.type.text,
    id: 'text%index%',
    parent: '',
    icon: e.item.icon.user,
    iconStyle: e.item.style.None,
    iconSide: e.item.side.left,
    label: 'Name: ',
    placeholder: 'Type test here',
    test: "John Smith",
    auto: true
  }
};

e.item.sample.input.textarea = 'ctx.popup.bootstrap.sample.input.textarea';
ctx.popup.bootstrap.sample.input.textarea = {
  display: {
    name: 'textarea',
    description: 'textarea'
  },
  model: {
    type: e.item.type.textarea,
    id: 'textarea%index%',
    parent: '',
    icon: e.item.icon.pencil,
    iconStyle: e.item.style.None,
    label: '',
    rows: 4,
    test: "this is my comment\nOther content",
    auto: true
  }
};

e.item.sample.input.number = 'ctx.popup.bootstrap.sample.input.number';
ctx.popup.bootstrap.sample.input.number = {
  display: {
    name: 'number',
    description: 'number input'
  },
  model: {
    type: e.item.type.number,
    id: 'number%index%',
    parent: '',
    icon: e.item.icon.phone,
    iconSide: e.item.side.left,
    label: 'Number:',
    placeholder: 'Number',
    test: "321654987",
    auto: true
  }
}

e.item.sample.input.date = 'ctx.popup.bootstrap.sample.input.date';
ctx.popup.bootstrap.sample.input.date = {
  display: {
    name: 'date',
    description: 'date input'
  },
  model: {
    type: e.item.type.date,
    id: 'date%index%',
    parent: '',
    icon: e.item.icon.calendar,
    iconSide: e.item.side.left,
    label: 'Date:',
    placeholder: 'Date',
    test: "",
    auto: true
  }
}

e.item.sample.input.time = 'ctx.popup.bootstrap.sample.input.time';
ctx.popup.bootstrap.sample.input.time = {
  display: {
    name: 'time',
    description: 'time input'
  },
  model: {
    type: e.item.type.time,
    id: 'time%index%',
    parent: '',
    icon: e.item.icon.time,
    iconSide: e.item.side.left,
    label: 'Time:',
    placeholder: 'Tile',
    test: "",
    auto: true
  }
}

e.item.sample.input.email = 'ctx.popup.bootstrap.sample.input.email';
ctx.popup.bootstrap.sample.input.email = {
  display: {
    name: 'email',
    description: 'email input'
  },
  model: {
    type: e.item.type.email,
    id: 'email%index%',
    parent: '',
    icon: e.item.icon.envelope,
    iconSide: e.item.side.left,
    label: 'Email:',
    placeholder: 'Email',
    test: "jsmith@gmail.com",
    auto: true
  }
}

e.item.sample.input.password = 'ctx.popup.bootstrap.sample.input.password';
ctx.popup.bootstrap.sample.input.password = {
  display: {
    name: 'password',
    description: 'password input'
  },
  model: {
    type: e.item.type.password,
    id: 'password%index%',
    parent: '',
    icon: e.item.icon.lock,
    iconSide: e.item.side.left,
    label: 'Password:',
    placeholder: 'Password',
    test: "fm%q5$L",
    auto: true
  }
};

e.item.sample.input.fileInput = 'ctx.popup.bootstrap.sample.input.fileInput';
ctx.popup.bootstrap.sample.input.fileInput = {
  display: {
    name: 'file input',
    description: 'file input'
  },
  model: {
    type: e.item.type.fileInput,
    id: 'fileInput%index%',
    parent: '',
    label: 'File:',
    placeholder: 'Select file',
    test: "c:\\temp\\myFile.png",
    auto: true
  }
};

e.item.sample.input.url = 'ctx.popup.bootstrap.sample.input.url';
ctx.popup.bootstrap.sample.input.url = {
  display: {
    name: 'url',
    description: 'url input'
  },
  model: {
    type: e.item.type.url,
    id: 'url%index%',
    parent: '',
    icon: e.item.icon.globe,
    iconSide: e.item.side.left,
    label: 'URL:',
    placeholder: 'URL',
    test: "www.mySite.com",
    auto: true
  }
}

e.item.sample.button.button = 'ctx.popup.bootstrap.sample.button.button';
ctx.popup.bootstrap.sample.button.button = {
  display: {
    name: 'button (label)',
    description: 'button with label',
    src: "../preview/button.png"
  },
  model: {
    type: e.item.type.button,
    id: 'button%index%',
    parent: '',
    value: "Close",
    style: e.item.style.Blue,
    auto: true
  }
}

e.item.sample.button.button2 = 'ctx.popup.bootstrap.sample.button.button2';
ctx.popup.bootstrap.sample.button.button2 = {
  display: {
    name: 'button (icon)',
    description: 'button with icon',
    src: "../preview/button.png"
  },
  model: {
    type: e.item.type.button,
    id: 'button%index%',
    parent: '',
    icon: e.item.icon.plus,
    style: e.item.style.Green,
    tooltip: "Add",
    auto: true

  }
}

e.item.sample.button.buttonGroup = 'ctx.popup.bootstrap.sample.button.buttonGroup';
ctx.popup.bootstrap.sample.button.buttonGroup = {
  display: {
    name: 'button group (icon)',
    description: 'button group with icons'
  },
  model: {
    type: e.item.type.buttonGroup,
    id: 'group%index%',
    parent: '',
    inline: true,
    justified: false,
    style: e.item.style.Grey,
    auto: true,
    items: [
      {
        id: "bt%index%",
        icon: e.item.icon.plus,
        style: e.item.style.Green,
        tooltip: "Add"
      },
      {
        id: "bt%index%",
        icon: e.item.icon.minus,
        style: e.item.style.Red,
        tooltip: "Remove",
        disabled: true
      },
      {
        id: "bt%index%",
        icon: e.item.icon.ok,
        style: e.item.style.Blue,
        tooltip: "Validate"
      }
    ]
  }
}

e.item.sample.button.buttonGroup2 = 'ctx.popup.bootstrap.sample.button.buttonGroup2';
ctx.popup.bootstrap.sample.button.buttonGroup2 = {
  display: {
    name: 'button group (label)',
    description: 'button group with labels'
  },
  model: {
    type: e.item.type.buttonGroup,
    id: 'group%index%',
    parent: '',
    inline: true,
    style: e.item.style.Blue,
    auto: true,
    items: [
      {
        id: "bt%index%",
        value: "Button 1",
        tooltip: "Button 1 tooltip"
      },
      {
        id: "bt%index%",
        value: "Button 2",
        tooltip: "Button 2 tooltip"
      },
      {
        id: "bt%index%",
        value: "Button 3",
        tooltip: "Button 3 tooltip",
        disabled: true
      }
    ]
  }
}

e.item.sample.button.toolbar = 'ctx.popup.bootstrap.sample.button.toolbar';
ctx.popup.bootstrap.sample.button.toolbar = {
  display: {
    name: 'button toolbar',
    description: 'button toolbar'
  },
  model: {
    type: e.item.type.toolbar,
    id: 'toolbar%index%',
    parent: '',
    style: e.item.style.Grey,
    auto: true,
    items : [
      {
        id: 'group%index%'
      }, {
        id: 'group%index%'
      }, {
        id: 'group%index%'
      }
    ]
  }
}

e.item.sample.button.collapsedButton = 'ctx.popup.bootstrap.sample.button.collapsedButton';
ctx.popup.bootstrap.sample.button.collapsedButton = {
  display: {
    name: 'collapsed button',
    description: 'collapsed button'
  },
  model: {
    type: e.item.type.collapsedButton,
    id: 'collapsed%index%',
    parent: '',
    style: e.item.style.Cyan,
    value: 'Simple Collapsible',
    auto: true,
    items: [
      {
        id: 'id%index%',
        value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
      }
    ]
  }
}

e.item.sample.button.dropdown = 'ctx.popup.bootstrap.sample.button.dropdown';
ctx.popup.bootstrap.sample.button.dropdown = {
  display: {
    name: 'dropdown button',
    description: 'dropdown button'
  },
  model: {
    type: e.item.type.dropdown,
    id: 'dropdown%index%',
    parent: '',
    value: "Tutorials",
    style: e.item.style.Green,
    auto: true,
    items: [
      {
        header: "Dropdown header 1"
      },
      {
        id: "html",
        value: "HTML"
      },
      {
        id: "css",
        value: "CSS"
      },
      {
        id: "js",
        value: "JavaScript"
      },
      {
        divider: true
      },
      {
        header: "Dropdown header 2"
      },
      {
        id: "about",
        value: "About Us"
      }
    ]
  }
};

e.item.sample.navigation.accordion = 'ctx.popup.bootstrap.sample.navigation.accordion';
ctx.popup.bootstrap.sample.navigation.accordion = {
  display: {
    name: 'accordion',
    description: 'accordion'
  },
  model: {
    type: e.item.type.accordion,
    id: 'accordion%index%',
    parent: '',
    style: e.item.style.Blue,
    auto: true,
    items: [
      {
        value: "Menu 1",
        id: "menu%index%",
        icon: e.item.icon.adjust,
        collapsed: false
      },
      {
        value: "Menu 2",
        id: "menu%index%",
        style: e.item.style.Orange,
        icon: e.item.icon.alert,
        collapsed: true
      },
      {
        value: "Menu 3",
        id: "menu%index%",
        style: e.item.style.Green,
        icon: e.item.icon.user,
        collapsed: true
      },
      {
        value: "Menu 4",
        id: "menu%index%",
        style: e.item.style.Red,
        icon: e.item.icon.file,
        collapsed: true
      }
    ]
  }
};

e.item.sample.navigation.breadcrumb = 'ctx.popup.bootstrap.sample.navigation.breadcrumb';
ctx.popup.bootstrap.sample.navigation.breadcrumb = {
  display: {
    name: 'breadcrumb',
    description: 'breadcrumb'
  },
  model: {
    type: e.item.type.breadcrumb,
    id: 'bread%index%',
    parent: '',
    items: [
      {
        id: "menu%index%",
        value: "Menu 1"
      },
      {
        id: "menu%index%",
        value: "Menu 2"
      },
      {
        id: "menu%index%",
        value: "Menu 3"
      }
    ],
    auto: true
  }
};

e.item.sample.navigation.carousel = 'ctx.popup.bootstrap.sample.navigation.carousel';
ctx.popup.bootstrap.sample.navigation.carousel = {
  display: {
    name: 'carousel',
    description: 'carousel'
  },
  model: {
    type: e.item.type.carousel,
    id: 'carousel%index%',
    parent: '',
    indicators: true,
    previous: 'Previous',
    next: 'Next',
    auto: true,
    items: [],
    test: [
      {
        value: '<i class="fa fa-child fa-4x"></i>' },
      {
        value: '<h3>First item</h3>' },
      {
        value: '<h3>Second item</h3>' },
      {
        value: '<h3>Third item</h3>' }
    ]
  }
}

e.item.sample.navigation.collapsedMenu = 'ctx.popup.bootstrap.sample.navigation.collapsedMenu';
ctx.popup.bootstrap.sample.navigation.collapsedMenu = {
  display: {
    name: 'collapsed menu',
    description: 'collapsed menu'
  },
  model: {
    type: e.item.type.collapsedMenu,
    id: 'collapsed%index%',
    parent: '',
    iconStyle: e.item.style.None,
    value: 'Services',
    active: false,
    auto: true,
    items: [
      {
        id: 'serv1',
        value: 'Service 1',
        active: true
      }, {
        id: 'serv2',
        value: 'Service 2'
      }, {
        id: 'serv3',
        value: 'Service 3'
      }
    ]
  }
}

e.item.sample.navigation.iconBar = 'ctx.popup.bootstrap.sample.navigation.iconBar';
ctx.popup.bootstrap.sample.navigation.iconBar = {
  display: {
    name: 'Icon bar',
    description: 'Icon bar'
  },
  model: {
    type: e.item.type.iconBar,
    id: 'menu%index%',
    parent: '',
    inline: true,
    auto: true,
    items : [
      {
        id: 'menu%index%',
        fa: 'home'
      }, {
        id: 'menu%index%',
        fa: 'search'
      }, {
        id: 'menu%index%',
        icon: e.item.icon.envelope
      }, {
        id: 'menu%index%',
        icon: e.item.icon.globe
      }, {
        id: 'menu%index%',
        icon: e.item.icon.trash
      }
    ]
  }
}

e.item.sample.navigation.menu = 'ctx.popup.bootstrap.sample.navigation.menu';
ctx.popup.bootstrap.sample.navigation.menu = {
  display: {
    name: 'Menu',
    description: 'Menu'
  },
  model: {
    type: e.item.type.menu,
    id: 'menu%index%',
    parent: '',
    title: "Title",
    auto: true,
    items : [
      {
        id: 'menu%index%',
        value: "Menu 1"
      }, {
        id: 'menu%index%',
        value: "Menu 2"
      }, {
        id: 'menu%index%',
        value: "Menu 3"
      }
    ]
  }
}

e.item.sample.navigation.menuSide = 'ctx.popup.bootstrap.sample.navigation.menuSide';
ctx.popup.bootstrap.sample.navigation.menuSide = {
  display: {
    name: 'Side menu',
    description: 'Side menu'
  },
  model: {
    type: e.item.type.menuSide,
    id: 'menuSide%index%',
    parent: '',
    title: "Title",
    auto: true,
    items : [
      {
        id: 'menu%index%',
        value: "Menu 1"
      }, {
        id: 'menu%index%',
        value: "Menu 2"
      }, {
        id: 'menu%index%',
        value: "Menu 3"
      }
    ]
  }
}

e.item.sample.navigation.navbar = 'ctx.popup.bootstrap.sample.navigation.navbar';
ctx.popup.bootstrap.sample.navigation.navbar = {
  display: {
    name: 'navigation bar',
    description: 'navigation bar'
  },
  model: {
    type: e.item.type.navbar,
    id: 'navbar%index%',
    parent: '',
    inverse: true,
    title: "Title",
    auto: true,
    menus: [
      {
        id: "nav%index%",
        value: "Item 1"
      },
      {
        id: "nav%index%",
        value: "Item 2",
        badge: 3,
        badgeStyle: e.item.style.Green
      }
    ],
    items: [
      {
        id: "it%index%"
      },
      {
        id: "it%index%"
      }
    ],
    rightMenus: [
      {
        id: "nav%index%",
        value: "Sign up",
        icon: e.item.icon.user
      },
      {
        id: "nav%index%",
        value: "Login",
        icon: e.item.icon.logIn
      }
    ]
  }
}

e.item.sample.navigation.page = 'ctx.popup.bootstrap.sample.navigation.page';
ctx.popup.bootstrap.sample.navigation.page = {
  display: {
    name: 'page',
    description: 'page'
  },
  model: {
    type: e.item.type.page,
    id: 'page%index%',
    parent: '',
    style: e.item.style.Blue,
    auto: true,
    items: [
      {
        id: "pg%index%",
        collapsed: false
      },
      {
        id: "pg%index%",
        collapsed: false
      },
      {
        id: "pg%index%",
        collapsed: false
      },
      {
        id: "pg%index%",
        collapsed: false
      }
    ]
  }
};

e.item.sample.navigation.pager = 'ctx.popup.bootstrap.sample.navigation.pager';
ctx.popup.bootstrap.sample.navigation.pager = {
  display: {
    name: 'pager',
    description: 'pager'
  },
  model: {
    type: e.item.type.pager,
    id: 'pager%index%',
    parent: '',
    auto: true,
    items: [
      {
        id: "previous",
        icon: e.item.icon.arrowLeft,
        value: "Previous",
        badge: 5,
        badgeStyle: e.item.style.Orange,
        left: true
      },
      {
        id: "current",
        value: "Current"
      },
      {
        id: "next",
        iconSide: e.item.side.right,
        icon: e.item.icon.arrowRight,
        value: "Next",
        badge: 3,
        badgeStyle: e.item.style.Green,
        right: true
      }
    ]
  }
}

e.item.sample.navigation.pagination = 'ctx.popup.bootstrap.sample.navigation.pagination';
ctx.popup.bootstrap.sample.navigation.pagination = {
  display: {
    name: 'pagination',
    description: 'pagination'
  },
  model: {
    type: e.item.type.pagination,
    id: 'pagination%index%',
    parent: '',
    right: true,
    auto: true,
    items: [
      {
        value: "1"
      }, {
        value: "2"
      }, {
        value: "3"
      }, {
        value: "4"
      }, {
        value: "5"
      }
    ] }
}

e.item.sample.navigation.pills = 'ctx.popup.bootstrap.sample.navigation.pills';
ctx.popup.bootstrap.sample.navigation.pills = {
  display: {
    name: 'pills list',
    description: 'pills list'
  },
  model: {
    type: e.item.type.tabs,
    id: 'pills%index%',
    inline: true,
    pills: true,
    parent: '',
    auto: true,
    items: [
      {
        value: 'First pill',
        icon: e.item.icon.ok,
        style: e.item.style.Green
      }, {
        value: 'Second pill',
        icon: e.item.icon.send,
        style: e.item.style.Cyan
      }, {
        value: 'Third pill',
        icon: e.item.icon.dashboard,
        style: e.item.style.Orange
      }, {
        value: 'Fourth pill',
        icon: e.item.icon.remove,
        style: e.item.style.Red,
        badge: 3
      }
    ]
  }
};

e.item.sample.navigation.tabs = 'ctx.popup.bootstrap.sample.navigation.tabs';
ctx.popup.bootstrap.sample.navigation.tabs = {
  display: {
    name: 'tabs list',
    description: 'tabs list'
  },
  model: {
    type: e.item.type.tabs,
    id: 'tabs%index%',
    inline: true,
    pills: false,
    parent: '',
    auto: true,
    items: [
      {
        id: 'tab%index%',
        value: 'First tab',
        icon: e.item.icon.ok,
        style: e.item.style.Green
      }, {
        id: 'tab%index%',
        value: 'Second tab',
        icon: e.item.icon.send,
        style: e.item.style.Cyan
      }, {
        id: 'tab%index%',
        value: 'Third tab',
        icon: e.item.icon.dashboard,
        style: e.item.style.Orange
      }, {
        id: 'tab%index%',
        value: 'Fourth tab',
        icon: e.item.icon.remove,
        style: e.item.style.Red,
        badge: 3
      }
    ]
  }
}

e.item.sample.navigation.wizard = 'ctx.popup.bootstrap.sample.navigation.wizard';
ctx.popup.bootstrap.sample.navigation.wizard = {
  display: {
    name: 'wizard list',
    description: 'wizard list'
  },
  model: {
    type: e.item.type.wizard,
    id: 'wizard%index%',
    parent: '',
    auto: true,
    items: [
      {
        id: 'tab%index%',
        tooltip: 'First tab',
        icon: e.item.icon.user
      }, {
        id: 'tab%index%',
        tooltip: 'Second tab',
        icon: e.item.icon.lock
      }, {
        id: 'tab%index%',
        tooltip: 'Third tab',
        icon: e.item.icon.picture
      }, {
        id: 'tab%index%',
        tooltip: 'Fourth tab',
        icon: e.item.icon.ok
      }
    ]
  }
}

e.item.sample.lists.list = 'ctx.popup.bootstrap.sample.lists.list';
ctx.popup.bootstrap.sample.lists.list = {
  display: {
    name: 'colored list',
    description: 'colored list'
  },
  model: {
    type: e.item.type.list,
    id: 'list%index%',
    parent: '',
    auto: true,
    items: [],
    test: [
      {
        id: 'it%index%',
        value: 'First item',
        icon: e.item.icon.ok,
        style: e.item.style.Green
      }, {
        id: 'it%index%',
        value: 'Second item',
        icon: e.item.icon.send,
        style: e.item.style.Cyan
      }, {
        id: 'it%index%',
        value: 'Third item',
        icon: e.item.icon.dashboard,
        style: e.item.style.Orange
      }, {
        id: 'it%index%',
        value: 'Fourth item',
        icon: e.item.icon.remove,
        style: e.item.style.Red,
        badge: 3
      }
    ]
  }
}

e.item.sample.lists.list2 = 'ctx.popup.bootstrap.sample.lists.list2';
ctx.popup.bootstrap.sample.lists.list2 = {
  display: {
    name: 'collapsed list',
    description: 'collapsed list'
  },
  model: {
    type: e.item.type.list,
    id: 'list%index%',
    parent: '',
    collapsable: true,
    title: "Collapsible list group",
    footer: "Footer text here...",
    auto: true,
    items: [
      {
        id: 'it%index%',
        value: "<b>First List Group Item Heading</b><br/>List Group Item Text"
      },
      {
        id: 'it%index%',
        value: "<b>Second List Group Item Heading</b><br/>List Group Item Text"
      },
      {
        id: 'it%index%',
        value: "<b>Third List Group Item Heading</b><br/>List Group Item Text"
      }
    ]
  }
}

e.item.sample.lists.table = 'ctx.popup.bootstrap.sample.lists.table';
ctx.popup.bootstrap.sample.lists.table = {
  display: {
    name: 'table',
    description: 'table'
  },
  model: {
    type: e.item.type.table,
    id: 'table%index%',
    title: 'Table title...',
    tableHeight: 300,
    parent: '',
    style: e.item.style.Cyan,
    auto: true,
//    filter: true,
    columns: [
      {
        value: "#",
        colWidth: 1
      }, {
        value: "First Name",
        colWidth: 4
      }, {
        value: "Last Name",
        colWidth: 4
      }, {
        value: "Login",
        colWidth: 3
      }
    ],
    items: [
      [ "", "", "", "" ]
    ],
    test: [
      [ "0", "Kilgore", "Trout", "ktrout" ],
      [ "1", "John", "Smith", "jsmith" ],
      [ "2", "Bob", "Loblaw", "bloblaw" ],
      [ "3", "Holden", "Caulfield", "hcaulfield" ]
    ]
  }
}


// *** pattern samples ***
e.item.sample.pattern = {};

ctx.popup.bootstrap.sample.pattern = {
  display: {
    name: 'Insert pattern',
    icon: 'fa-plus',
    folder: true
  }
}


//ctx.popup.bootstrap.pattern = {
//  ctxType: 'ctx.popup.bootstrap.pattern',
//  display: {
//    name: 'insert',
//    icon: 'fa-send',
//    folder: true
//  }
//}

e.item.sample.pattern.patternGrid = 'ctx.popup.bootstrap.sample.pattern.patternGrid';
ctx.popup.bootstrap.sample.pattern.patternGrid = {
  display: {
    name: 'Grid',
    icon: 'fa-th',
    description: 'Grid (4 rows with 1, 2, 3, 4 columns)'
  },
  model: {
    type: e.item.type.container,
    id: "container%index%",
    fluid: true,
    model: [{
      type: e.item.type.row,
      id: "row%index%",
      model: {
        type: e.item.type.column,
        id: "col%index%",
        md: 12,
        xs: 12
      }
    }, {
      type: e.item.type.row,
      id: "row%index%",
      model: [{
        type: e.item.type.column,
        id: "col%index%",
        md: 6,
        xs: 6
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 6,
        xs: 6
      }]
    }, {
      type: e.item.type.row,
      id: "row%index%",
      model: [{
        type: e.item.type.column,
        id: "col%index%",
        md: 4,
        xs: 4
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 4,
        xs: 4
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 4,
        xs: 4
      }]
    }, {
      type: e.item.type.row,
      id: "row%index%",
      model: [{
        type: e.item.type.column,
        id: "col%index%",
        md: 3,
        xs: 3
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 3,
        xs: 3
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 3,
        xs: 3
      }, {
        type: e.item.type.column,
        id: "col%index%",
        md: 3,
        xs: 3
      }]
    }]
  }
}

e.item.sample.pattern.patternForm = 'ctx.popup.bootstrap.sample.pattern.patternForm';
ctx.popup.bootstrap.sample.pattern.patternForm = {
  display: {
    name: 'Form',
    icon: 'fa-id-card',
    description: 'Form (login, password)'
  },
  model: {
    type: e.item.type.container,
    id: "container%index%",
    fluid: true,
    model: [{
      type: e.item.type.row,
      id: "row%index%",
      model: {
        type: e.item.type.column,
        id: "col%index%",
        md: 12,
        xs: 12,
        model: {
          type: e.item.type.text,
          id: "login%index%",
          icon: e.item.icon.user,
          iconSide: e.item.side.left,
          label: "",
          value: "",
          test: "",
          placeholder: "Login",
          iconStyle: e.item.style.None
        }
      }
    }, {
      type: e.item.type.row,
      id: "row%index%",
      model: {
        type: e.item.type.column,
        id: "col%index%",
        md: 12,
        xs: 12,
        model: {
          type: e.item.type.password,
          id: "password%index%",
          icon: e.item.icon.lock,
          iconSide: e.item.side.left,
          label: "",
          placeholder: "Password",
          iconStyle: e.item.style.None
        }
      }
    }, {
      type: e.item.type.row,
      id: "footer%index%",
      rowType: e.item.rowType.Footer,
      model: [{
        type: e.item.type.button,
        id: "ok",
        value: "Ok",
        style: e.item.style.Cyan,
        icon: e.item.icon.zoomIn,
        close: true
      }, {
        type: e.item.type.button,
        id: "cancel",
        value: "Cancel",
        style: e.item.style.Red,
        icon: e.item.icon.remove,
        close: true
      }]
    }]
  }
}

e.item.sample.pattern.patternMessage = 'ctx.popup.bootstrap.sample.pattern.patternMessage';
ctx.popup.bootstrap.sample.pattern.patternMessage = {
  display: {
    name: 'Message box',
    icon: 'fa-comment',
    description: 'Message box'
  },
  model: {
    type: e.item.type.container,
    id: "container%index%",
    fluid: true,
    model: [{
      type: e.item.type.row,
      id: "row%index%",
      model: {
        type: e.item.type.column,
        id: "col%index%",
        md: 12,
        xs: 12,
        model: {
          type: e.item.type.text,
          id: "login",
          icon: e.item.icon.user,
          iconSide: e.item.side.left,
          label: "",
          value: "",
          test: "",
          placeholder: "Login",
          iconStyle: e.item.style.None
        }
      }
    }, {
      type: e.item.type.row,
      id: "row%index%",
      model: {
        type: e.item.type.column,
        id: "col%index%",
        md: 12,
        xs: 12,
        model: {
          type: e.item.type.password,
          id: "password",
          icon: e.item.icon.lock,
          iconSide: e.item.side.left,
          label: "",
          placeholder: "Password",
          iconStyle: e.item.style.None
        }
      }
    }, {
      type: e.item.type.row,
      id: "footer%index%",
      rowType: e.item.rowType.Footer,
      model: [{
        type: e.item.type.button,
        id: "ok",
        value: "Ok",
        style: e.item.style.Cyan,
        icon: e.item.icon.zoomIn,
        close: true
      }, {
        type: e.item.type.button,
        id: "cancel",
        value: "Cancel",
        style: e.item.style.Red,
        icon: e.item.icon.remove,
        close: true
      }]
    }]
  }
}


//ctx.popup.bootstrap.type.datatable = {
//  name: 'datatable',
//  tag: 'table',
//  attributes: {
//    "class" : "display cell-border table-hover table-striped table-bordered",
//    "cellspacing" : "0",
//    "width" : "100%"
//  },
//  options: {
//    //info: false,
//    paging: false,
//    ordering: false,
//    //autoWidth: false,
//    //scrollY: "100px",
//    //scrollCollapse: true,
//    searching: false,
//    initComplete: function () {
//      this.api().columns().every( function () {
//        var column = this;
//        var select = $('<select><option value=""></option></select>')
//          .appendTo( $(column.footer()).empty() )
//          .on( 'change', function () {
//            var val = $.fn.dataTable.util.escapeRegex(
//              $(this).val()
//            );
//            column
//              .search( val ? '^'+val+'$' : '', true, false )
//              .draw();
//          } );
//        column.data().unique().sort().each( function ( d, j ) {
//          select.append( '<option value="'+d+'">'+d+'</option>' )
//        } );
//      } );
//    }
//  },
//  initItem: function (item) {
//    item.get = function(iRow, iCol) {
//      // todo
//    }
//    item.getAll = function() {
//      // todo
//    }
//    item.refresh = function() {
//      if (!item.object) {
//        var jQobj = (item.element ? $(item.element) : $('#' + item.id));
//        item.object = jQobj.DataTable( item.options );
//      } else {
//        // reinint data source
//          item.object.clear();
//        if (item.data) { item.object.rows.add(item.data); }
//          item.object.draw();
//      }
//    }
//    item.set = function(value, iRow, iCol) {
//      // todo
//    }
//    item.setAll = function(data) {
//      // todo
//      if (data) { item.data = data; }
//      item.refresh();
//    }
//    item.sort = function(index, orderBy) {
//      if (item.object) {
//        index = index || 0;
//        orderBy = orderBy || 'asc';
//        var data = item.object.order( [ index, orderBy ] ).draw();
//      }
//    }
//    item.refresh();
//  }
//}

// build a dynamic enumerated with all declared types
//e.item.type = {};
//for (var id in ctx.popup.bootstrap.type) {
//  if (!ctx.popup.bootstrap.type[id].virtual) {
//    e.item.type[id] = id;
//  }
//};


ctx.popupMeta = {
  //name: { type: 'string', name: 'name', description: 'popup name', value: '' },
  visible: { type: 'boolean', name: 'visible', description: 'visible popup', group: '5 - Container', value: true },
  url: { type: 'string', name: 'url', description: 'html url', group: '5 - Container', value: '' },
  content: { type: e.popup.content, name: 'content', description: 'application type (Web, Windows)', group: '5 - Container', value: e.popup.content.Web },
  container: { type: 'boolean', name: 'container', description: 'container', group: '5 - Container', value: true },
  modal: { type: 'boolean', name: 'modal', description: 'modal popup', group: '5 - Container', value: false },
  color: { type: e.popup.color, name: 'color', description: 'popup color', group: '5 - Container', value: e.popup.color.None },
  resizable: { type: 'boolean', name: 'resizable', description: 'resizable popup', group: '5 - Container', value: true },
  canMove: { type: 'boolean', name: 'can move', description: 'popup can be moved', group: '5 - Container', value: true },
  topMost: { type: 'boolean', name: 'top most', description: 'top most', group: '5 - Container', value: false },
  IEHost: { type: 'boolean', name: 'IE host', description: 'hosting mode: ActiveX (false) or embedded IE (true)', group: '5 - Container', value: false },
  template: { type: e.popup.template, description: '', group: '0 - Html content', value: e.popup.template.None },
  header: { type: 'string', name: 'header', description: 'html header', group: '0 - Html content', value: '' },
  message: { type: 'string', name: 'message', description: 'html message', group: '0 - Html content', value: '' },
  footer: { type: 'string', name: 'footer', description: 'html footer', group: '0 - Html content', value: '' },
  file: { type: 'string', name: 'file', description: 'html content file', group: '0 - Html content', value: '' },
  autoClose: { type: 'number', name: 'auto close', description: 'auto close delay (in ms, 0 if disabled)', group: '0 - Html content', value: 0 },
  icon: { type: 'string', name: 'icon', description: 'content icon', group: '0 - Html content', value: '' },
  title: { type: 'string', name: 'title', description: 'popup title', group: '4 - Title bar', value: '' },
  titleIcon: { type: 'string', name: 'title icon', description: 'title icon', group: '4 - Title bar', value: '' },
  titleVisible: { type: 'boolean', name: 'title visible', description: 'title bar visible', group: '4 - Title bar', value: true },
  toolWindow: { type: 'boolean', name: 'tool window', description: 'tool window style', group: '4 - Title bar', value: false },
  maximize: { type: 'boolean', name: 'maximize button', description: 'maximize button', group: '4 - Title bar', value: false },
  minimize: { type: 'boolean', name: 'minimize button', description: 'minimize button', group: '4 - Title bar', value: false },
  canClose: { type: 'boolean', name: 'close button', description: 'close button', group: '4 - Title bar', value: true },
  autoIcon: { type: 'boolean', name: 'auto icon', description: 'get icon from web page', group: '4 - Title bar', value: false },
  autoTitle: { type: 'boolean', name: 'auto title', description: 'get title from web page', group: '4 - Title bar', value: false },
  autoSize: { type: 'boolean', name: 'auto size', description: 'auto size popup from web content', group: '1 - Position', value: false },
  autoSizeId: { type: 'string', name: 'auto size id', description: 'auto size id', group: '1 - Position', value: '' },
  X: { type: e.popup.position, name: 'X', description: 'horizontal position', group: '1 - Position', value: e.popup.position.None },
  Y: { type: e.popup.position, name: 'Y', description: 'vertical position', group: '1 - Position', value: e.popup.position.None },
  CX: { type: 'string', name: 'CX', description: 'width', group: '1 - Position', value: '' },
  CY: { type: 'string', name: 'CY', description: 'height', group: '1 - Position', value: '' },
  minCX: { type: 'string', name: 'min CX', description: 'min width', group: '1 - Position', value: '' },
  minCY: { type: 'string', name: 'min CY', description: 'min height', group: '1 - Position', value: '' },
  maxCX: { type: 'string', name: 'max CX', description: 'max width', group: '1 - Position', value: '' },
  maxCY: { type: 'string', name: 'max CY', description: 'max height', group: '1 - Position', value: '' },
  compactCX: { type: 'string', name: 'compact CX', description: 'compact width (auto-hide app bar)', group: '1 - Position', value: '' },
  compactCY: { type: 'string', name: 'compact CY', description: 'compact height (auto-hide app bar)', group: '1 - Position', value: '' },
  XRelative: { type: e.popup.position, name: 'relative X', description: 'relative width', group: '1 - Position', value: e.popup.position.None },
  YRelative: { type: e.popup.position, name: 'relative Y', description: 'relative height', group: '1 - Position', value: e.popup.position.None },
  display: { type: e.popup.display, name: 'display', description: 'selected monitor (primary, secondary, ...)', group: '1 - Position', value: e.popup.display.Undefined },
  transparency: { type: 'number', name: 'transparency', description: 'transparency effect (%)', group: '2 - Effect', value: 0 },
  fade: { type: 'number', name: 'fade', description: 'fade effect', group: '2 - Effect', value: 0 },
  slide: { type: 'number', name: 'slide', description: 'slide effect', group: '2 - Effect', value: 0 },
  XSlide: { type: e.popup.position, name: 'Slide X', description: 'horizontal slide effect', group: '2 - Effect', value: e.popup.position.None },
  YSlide: { type: e.popup.position, name: 'slide Y', description: 'vertical slide effect', group: '2 - Effect', value: '' },
  appBar: { type: 'boolean', name: 'app bar', description: 'app bar mode', group: '3 - App Bar', value: false },
  autoHide: { type: 'boolean', name: 'auto hide', description: 'auto hide mode', group: '3 - App Bar', value: false },
  forceShow: { type: 'boolean', name: 'force show', description: 'force app bar expansion', group: '3 - App Bar', value: false },
  plugin: { type: 'boolean', name: 'plugin', description: 'plugin mode (advanced usage)', group: '6 - Misc.', value: false },
  highlight: { type: 'boolean', name: 'highlight', description: 'highlight mode', group: '6 - Misc.', value: false },
  highlightColor: { type: 'number', name: 'highlight color', description: 'highlight color', group: '6 - Misc.', value: 0 },
  systray: { type: 'boolean', name: 'systray', description: 'systray mode', group: '6 - Misc.', value: false },
  demoMode: { type: 'boolean', name: 'demo mode', description: 'demo mode', group: '6 - Misc.', value: false },
  showToolbar: { type: 'boolean', name: 'show toolbar', description: 'show toolbar', group: '6 - Misc.', value: false },
  showAddressBar: { type: 'boolean', name: 'show address bar', description: 'show address bar', group: '6 - Misc.', value: false },
  //notifyReady: { type: 'boolean', name: '', description: 'send a READY event when the page has completed', group: '6 - Misc.', value: '' },
  detachOnClose: { type: 'boolean', name: 'detach on close', description: 'detach application when closing popup', group: '6 - Misc.', value: false }
};

//ctx.wait(function(ev) {
GLOBAL.events.START.on(function (ev) {

  // ***************************
  // *** set popup templates ***
  // ***************************
  // *** popupNone ***
  ctx.popup(e.popup.template.None).init({
    container: true,
    content: e.popup.content.Web,
    title: '',
    size : 'small',
    IEHost: false,
    toolWindow: true,
    topMost: true,
    modal: false,
    visible: true,
    X: e.popup.position.Center,
    Y: e.popup.position.Center,
    CX: 600,
    CY: 300,
    display: e.popup.display.Undefined,
    onFuncLoad: 'initialize',
    //header: "<H4>No valid template provided !</H4>",
    message: undefined,
    icon: undefined,
    escape: undefined,
    color: e.popup.color.None
  });

  // *** popupNone ***
  ctx.popup(e.popup.template.NoButton).init({
    template: e.popup.template.None,
    ///url: '/popup/popup.html',
    autoSize: true,
    autoSizeId: 'popupDiv',
    //autoSizeId: 'body',
    title: GLOBAL.labels.popup.defaultTitle,
    titleIcon: e.popup.icon16.agent,
    header: undefined
  });

  // *** popupClose ***
  ctx.popup(e.popup.template.Close).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.Close,
    buttons: {
      close: {
        value: GLOBAL.labels.buttons.close,
        type: e.item.style.Grey,
        escape: true
      }
    }
  });

  // *** popupOk ***
  ctx.popup(e.popup.template.Ok).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.Ok,
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.ok,
        type: e.item.style.Blue,
        icon: e.item.icon.ok,
        escape: true
      }
    }
  });

  // *** popupYesNo ***
  ctx.popup(e.popup.template.YesNo).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.No,
    buttons: {
      yes: {
        value: GLOBAL.labels.buttons.yes,
        type: e.item.style.Green,
        icon: e.item.icon.ok
      },
      no: {
        value: GLOBAL.labels.buttons.no,
        type: e.item.style.Red,
        icon: e.item.icon.remove,
        escape: true
      }
    }
  });

  // *** popupOkCancel ***
  ctx.popup(e.popup.template.OkCancel).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.Cancel,
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.ok,
        type: e.item.style.Green,
        icon: e.item.icon.ok
      },
      cancel: {
        value: GLOBAL.labels.buttons.cancel,
        type: e.item.style.Red,
        icon: e.item.icon.remove,
        escape: true
      }
    }
  });

  // *** popupOkCancelOther ***
  ctx.popup(e.popup.template.OkCancelOther).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.Cancel,
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.ok,
        type: e.item.style.Green,
        icon: e.item.icon.ok
      },
      cancel: {
        value: GLOBAL.labels.buttons.cancel,
        type: e.item.style.Red,
        icon: e.item.icon.remove,
        escape: true
      },
      other: {
        value: GLOBAL.labels.buttons.other,
        type: e.item.style.Grey,
        icon: e.item.icon.pushpin
      }
    }
  });


  // *** popupFormSubmit ***
  ctx.popup(e.popup.template.FormSubmit).init({
    template: e.popup.template.NoButton,
    //escape: e.item.id.Cancel,
    //form:{
      // form description to be completed...
    //},
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.ok,
        type: e.item.style.Green,
        submit: true,
        icon: e.item.icon.ok
      },
      cancel: {
        value: GLOBAL.labels.buttons.cancel,
        type: e.item.style.Red,
        icon: e.item.icon.remove,
        escape: true
      }
    }
  });

  // *** popupTooltip ***
  ctx.popup(e.popup.template.Tooltip).init({
    template: e.popup.template.NoButton,
    titleVisible: false,
    highlight: true,
    //resizable: false,
    fade: 500,
    XRelative: e.popup.position.Center,
    YRelative: e.popup.position.Top,
    CX: 500,
    transparency: 90,
    closeOnClick: true,
    autoClose: 5000, // default is 5 s
    color: e.popup.color.Blue
  });

  // *** popupTooltipAlert ***
  ctx.popup(e.popup.template.TooltipAlert).init({
    template: e.popup.template.Tooltip,
    X: e.popup.position.Right,
    Y: e.popup.position.Bottom,
    fade: undefined,
    XSlide: e.popup.position.Right,
    closeOnClick: false,
    icon: e.popup.gif.loader3,
    autoClose: 60000, // default is 60 s
    color: e.popup.color.Yellow
  });

  // *** popupTooltipAlertClose ***
  ctx.popup(e.popup.template.TooltipAlertClose).init({
    template: e.popup.template.TooltipAlert,
    autoClose: 0, // no auto close
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.close,
        type: e.item.style.Link
      }
    }
  });

  // *** popupMaps ***
  ctx.popup(e.popup.template.Maps).init({
    template: e.popup.template.Tooltip,
    url: '/popup/popupMaps.html',
    maps: { },
    resizable: true,
    closeOnClick: false,
    color: e.popup.color.None,
    transparency: 100,
    CX: 440,
    CY: 300,
    autoClose: 0, // no auto close
    buttons: {
      ok: {
        value: GLOBAL.labels.buttons.close,
        type: e.item.style.Cyan
      }
    }
  });

  // *** popupAppBar ***
  ctx.popup(e.popup.template.AppBar).init({
    template: e.popup.template.None,
    title: 'App Bar',
    url: '/appbar/appbar.html',
    IEHost: true,
    resizable: true,
    titleVisible: false,
    CX: 400,
    CY: 600,
    minCX: 36,
    maxCX: 800,
    compactCX: 36,
    topMost: true,
    autoHide: true,
    appBar: true,
    display: e.popup.display.Right,
    X: e.popup.position.Right,
    Y: e.popup.position.Center
  });

  // *** popupAppBarHorizontal ***
  ctx.popup(e.popup.template.AppBarHorizontal).init({
    template: e.popup.template.None,
    title: 'App Bar',
    url: '/appbar/appbar.html',
    IEHost: true,
    resizable: true,
    titleVisible: false,
    CX: 400,
    CY: 600,
    minCY: 36,
    maxCY: 800,
    compactCY: 36,
    topMost: true,
    autoHide: true,
    appBar: true,
    display: e.popup.display.Right,
    X: e.popup.position.Center,
    Y: e.popup.position.Top
  });

//}, 1);
});



