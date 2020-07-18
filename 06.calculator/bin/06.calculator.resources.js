// Desktop Studio
// Auto-generated declaration file : do not modify !



var POPUPS = POPUPS || ctx.addApplication('POPUPS');



var Calculator = ctx.addApplication('Calculator', {"nature":"UIAUTOMATION","path":"calc.exe"});

Calculator.pWindowCalculator = Calculator.addPage('pWindowCalculator', {"comment":"Window - Calculator"});
Calculator.pWindowCalculator.btNum4Button = Calculator.pWindowCalculator.addItem('btNum4Button', {"trackEvents":{"CLICK":true}});
Calculator.pWindowCalculator.btNum2Button = Calculator.pWindowCalculator.addItem('btNum2Button', {"trackEvents":{"CLICK":true}});

GLOBAL.events.START.on(function(ev) { 
    GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '', '', '');
});
