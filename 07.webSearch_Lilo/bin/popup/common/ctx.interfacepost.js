
$(document).ready(function() {
	_unmapAllGlobalLabels();
	delete GLOBAL.labels.ctxType;
	var showGrid = ctx.queryURL("ShowGrid");
	if (showGrid) {
		ctx.currentPopup._params.showGrid = true;
	}

	var testMode = ctx.queryURL("TestMode");
	if (testMode) {
		ctx.currentPopup._params.testMode = true;
	}
	var designMode = ctx.queryURL("DesignMode");
	if (designMode) {
		ctx.currentPopup._params.designMode = true;
		if (ctx.currentPopup) {
			ctx.currentPopup.open();
		}
		// reinit property display
		ctx.notify("", '_ctxStudioEdit', {}, true);
		
		// update declared items
		ctx.notifyDeclaredItems();
	}

} );

/**
* GLOBAL.labels has been overwritten/remapped in ctx.popup.bootbox so as not to overwrite GLOBAL.labels values at settings.js regeneration
* GLOBAL.labels values need to be unmapped before being used.
* @param	{*}	[obj]  
*/
function _unmapAllGlobalLabels(obj) {
	if (!obj) {
		obj = GLOBAL.labels;
	}
	for (var id in obj) {
		if (obj[id] && (typeof obj[id] === 'object')) {
			_unmapAllGlobalLabels(obj[id]);
		} else {
			obj[id] = ctx.unmapValue(obj[id]);
		}
	}
}



	