//Utils Methods
/**
* Given a textual form control -e.g. input/select/textarea- id,
* validates if this form control is empty or not
* @param {string} sInputId
* @return {boolean} True if form control is not empty, false otherwise
*/
function _validateInputNotEmpty(sInputId) {
	var sInputValue = POPUPS.Systray[sInputId].get().trim();
	if (!sInputValue) {
		$("#" + sInputId + "_content").addClass("has-error");
		$("#" + sInputId + "_content").append('<span class="help-block agent-systray-help-block">' + GLOBAL.labels.systray.emptyRequiredInput + '</span>');
		return false;
	} else {
		$("#" + sInputId + "_content").removeClass("has-error");
		$("#" + sInputId + "_content .help-block").remove();
		return true;
	}
}

/**
* Returns object with a certain id in given array
* @param {Array} aArray Array in which to find object
* @param {string} sId  ID of object to find
* @param {string} sIdKey  Name of ID attribute in object
* @return {*} Result
*/
function _findObjectInArrayById(aArray, sId, sIdKey) {
	var arrLength = aArray.length;
	if (arrLength > 0) {
		for (let i = 0; i < arrLength; i++) {
			if (aArray[i][sIdKey] === sId) {
				return aArray[i];
			}
		}
	}
	return null;
}

/**
* Finds menu item with a certain id in given menu array (Recursive Method)
* Menu array format must be :
[
		{
      id: 's1',
			name: 'Scenario 1'
    },
    {
      id: 'm1',
      name: 'Menu 1',
      content: [
        {
		      id: 's11',
          name: 'Scenario 11'
        },
        {
		      id: 'm11',
          name: 'Menu 11',
          content: [
            {
				      id: 's111',
              name: 'Scenario 111'
            }
          ]
        }
      ]
    },
    {
      id: 'm2',
      name: 'Menu 2',
			disabled: true,
      content: [
        {
		      id: 's21',
          name: 'Scenario 21'
        }
      ]
    }
	]
* @param {Array} aMenuArray Menu array in which to find object
* @param {string} sMenuId  ID of menu item to find
*/
function _findMenuItemInMenuArrayById(aMenuArray, sMenuId) {
	var arrLength = aMenuArray.length;
	if (arrLength > 0) {
		for (let i = 0; i < arrLength; i++) {
			if (aMenuArray[i].id === sMenuId) {
				return aMenuArray[i];
			}
			if (aMenuArray[i].content) {
				var foundMenuItem = _findMenuItemInMenuArrayById(aMenuArray[i].content, sMenuId);
				if ('undefined' !== typeof foundMenuItem) {
					return foundMenuItem;
				}
			}
		}
	}
}

function _deleteMenuItemInMenuArrayById(aMenuArray, sMenuId) {
	var arrLength = aMenuArray.length;
	if (arrLength > 0) {
		for (let i = 0; i < arrLength; i++) {
			if (aMenuArray[i].id === sMenuId) {
				aMenuArray = aMenuArray.filter(function (menuItem) { return menuItem.id !== sMenuId });
				return aMenuArray;
			}
			if (aMenuArray[i].content) {
				var res = _deleteMenuItemInMenuArrayById(aMenuArray[i].content, sMenuId);
				if ('undefined' !== typeof res) {
					if (res.length > 0) {
						aMenuArray[i].content = res;
					} else {
						delete aMenuArray[i].content;
					}
				}
			}
		}
		return aMenuArray;
	}
}

/**
* Edits object with a certain id in given array
* @param {Array} aArray Array in which to find object
* @param {string} sId  ID of object to edit
* @param {*} sNewData  New value of object to edit
*/
function _editObjectInArrayById(aArray, sId, sNewData) {
	var arrLength = aArray.length;
	if (arrLength > 0) {
		for (let i = 0; i < arrLength; i++) {
			if (aArray[i].id === sId) {
				aArray[i] = sNewData;
			}
		}
	}
}

/**
* Returns truncated text
* @param {string} sText Text to truncate
* @param {string} length  Length at which to truncate text
* @return {string} Truncated text
*/
function _truncateTextIfOverLength(sText, length) {
	return sText.length > length ? sText.substring(0, length) + '...' : sText;
}

/**
* Removes a confirmation dialog box on a button
* @param {string} sBtnId  ID of button from which to remove the dialog box
*/
function _removeDialogBoxOnButton(sBtnId) {
	$("#" + sBtnId + "_modal").remove();
	$("#" + sBtnId + "_modal_OK").unbind('click');
}

const jQueryInsertTypes = {
	AFTER: "after",
	APPEND: "append"
}

/**
* Creates a confirmation dialog box that is not linked to a UI element, but has to be shown programmatically
* @param {string} sModalID  Modal ID
* @param {string} sDialogText  Text to display in the dialog box
* @param {string} sOKButtonText  "OK" button text
* @param {string} sCancelButtonText  "Cancel" button text
* @param {function(*)} sOKButtonFunction  Function to assign to the "OK" button
* @param {jQueryInsertTypes} jQAppendOrAfter  Specify if modal html should be appended or placed after containing element
* @param {string} sWhereToPutItID  ID of containing element
*/
function _createConfirmationDialogBox(sModalID, sDialogText, sOKButtonText, sCancelButtonText, sOKButtonFunction, jQAppendOrAfter, sWhereToPutItID) {
	switch (jQAppendOrAfter) {
		case jQueryInsertTypes.AFTER:
			$("#" + sWhereToPutItID).after(_getConfirmationDialogBoxHTML(sModalID, sDialogText, sOKButtonText, sCancelButtonText));
			break;
		case jQueryInsertTypes.APPEND:
			$("#" + sWhereToPutItID).append(_getConfirmationDialogBoxHTML(sModalID, sDialogText, sOKButtonText, sCancelButtonText));
			break;
	}
	$("#" + sModalID + "_modal_OK").click(sOKButtonFunction);
}

/**
* Adds a confirmation dialog box on a button
* @param {string} sBtnId  ID of button on which to add the dialog box
* @param {string} sDialogText  Text to display in the dialog box
* @param {string} sOKButtonText  "OK" button text
* @param {string} sCancelButtonText  "Cancel" button text
* @param {function(*)} sOKButtonFunction  Function to assign to the "OK" button
*/
function _addDialogBoxOnButton(sBtnId, sDialogText, sOKButtonText, sCancelButtonText, sOKButtonFunction) {
	if ($("#" + sBtnId + "_modal").length > 0) {
		return;
	}
	$("#" + sBtnId).attr('data-toggle', 'modal').attr('data-target', '#' + sBtnId + '_modal');
	_createConfirmationDialogBox(sBtnId, sDialogText, sOKButtonText, sCancelButtonText, sOKButtonFunction, jQueryInsertTypes.AFTER, sBtnId);
	$("#" + sBtnId + "_modal_OK").click(function () { $("#" + sBtnId + "_modal").modal('hide') });
}

function _getConfirmationDialogBoxHTML(sBtnId, sDialogText, sOKButtonText, sCancelButtonText) {
	var html = '<div id="' + sBtnId + '_modal" class="modal fade agent-systray-modal" role="dialog">\
    <div class="modal-dialog" style="">\
			<div class="modal-dialog" style="">\
				<div class="modal-content" style="">\
					<div class="modal-body">\
						' + sDialogText + '\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-info btn-sm agent-systray-modal-btn-ok" id="' + sBtnId + '_modal_OK">' + sOKButtonText + '</button>\
						<button type="button" class="btn agent-systray-transparent-btn btn-sm" data-dismiss="modal" id="' + sBtnId + '_modal_Cancel">' + sCancelButtonText + '</button>\
					</div>\
				</div>\
			</div>\
  	</div>\
	</div>';
	return html;
}

function _removeInterrogationPoint(sText) {
	return sText.endsWith('?') ? sText.substring(0, sText.length - 1).trim() : sText;
}
