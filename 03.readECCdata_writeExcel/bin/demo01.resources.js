// Desktop Studio
// Auto-generated declaration file : do not modify !



var POPUPS = POPUPS || ctx.addApplication('POPUPS');



var SAPGUI = ctx.addApplication('SAPGUI', {"nature":"UIAUTOMATION","path":"C:\\Program Files (x86)\\SAP\\FrontEnd\\SAPgui\\saplogon.exe"});

SAPGUI.pSAPEasyAccessU = SAPGUI.addPage('pSAPEasyAccessU', {"comment":"GuiMainWindow - SAP Easy Access  -  User Menu for I311414","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPGUI.pSAPEasyAccessU.oGuiOkCodeField = SAPGUI.pSAPEasyAccessU.addItem('oGuiOkCodeField', {"customType":"GuiOkCodeField"});
SAPGUI.pSAPEasyAccessU.btGuiButton = SAPGUI.pSAPEasyAccessU.addItem('btGuiButton', {"customType":"GuiButton"});

SAPGUI.pUserMaintenanceIni = SAPGUI.addPage('pUserMaintenanceIni', {"comment":"GuiMainWindow - User Maintenance: Initial Screen","nature":"SAPGUI","customType":"GuiMainWindow"});
SAPGUI.pUserMaintenanceIni.edUser = SAPGUI.pUserMaintenanceIni.addItem('edUser', {"customType":"GuiCTextField"});
SAPGUI.pUserMaintenanceIni.btGuiButton = SAPGUI.pUserMaintenanceIni.addItem('btGuiButton', {"customType":"GuiButton"});

GLOBAL.events.START.on(function(ev) { 
    GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '', '', '');
});
