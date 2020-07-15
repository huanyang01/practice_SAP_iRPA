/**
 * @module       Microsoft Excel extension
 * @file         office/excel.js
 * @description
 *  This library is a collection of functions for accessing and manipulating Microsoft Excel files.
 *
 *  === Usage ===
 *  The library is structured in different groups of functions.
 *
 *   - Global variables and functions used to handle the Excel instance: start, maintain and stop the Excel engine.
 *   - Application functions used to manage the Excel application and its objects.
 *   - File functions used to manipulate files: create, open, save, close, etc.
 *   - Sheet functions used to manipulate sheets in a workbook including cells, ranges, row and columns.
 *
 *  // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'Excel.Application'
 * @fileoverview
 * @suppress {missingProperties}
 */

/**
* @typedef {{
*   displayAlerts:(boolean|undefined),
*   visible: (boolean|undefined)
* }}
* @ignore
*/
var xloptions = {
  displayAlerts: false,
  visible: true
};

/**
 * Options for the 'ctx.excel' library
 * @namespace  ctx.options.excel
 * @path       ctx.options.excel
 */
ctx.options.excel = {
 /**
  * New Excel instance
  * @property  {boolean} newXlsInstance
  * @default   true
  * @path      ctx.options.excel.newXlsInstance
  */
  newXlsInstance: true,

 /**
  * Alert display
  * @property  {boolean} displayAlerts
  * @default   false
  * @path      ctx.options.excel.displayAlerts
  */
  displayAlerts: false,

 /**
  * Visible state
  * @property  {boolean} visible
  * @default   true
  * @path      ctx.options.excel.visible
  */
  visible: true,

 /**
  * Trace level
  * @property  {e.trace.level} traceLevel
  * @default   e.trace.level.None
  * @path      ctx.options.excel.traceLevel
  */
  traceLevel: e.trace.level.None
};

/**
 * Class ctx.excel
 * @class       ctx.excel
 * @constructor
 * @path        ctx.excel
 */
ctx.excel = (function() {
  var _excel =
  /** @lends ctx.excel*/
  {};


 // *** Constants ***
 /**
  * @ignore
  * Excel constants declaration
  * @enumeration  ctx.excel.constants
  //* @enum         {number}
  * @path         ctx.excel.constants
  */
  _excel.constants = {
    xlCalculationManual : -4135
    , xlCalculationAutomatic : -4105
    , xlLeft : -4131
    , xlCenter : -4108
    , xlRight : -4152
    , xlEdgeLeft : 7
    , xlEdgeTop : 8
    , xlEdgeBottom : 9
    , xlEdgeRight : 10
    , xlInsideVertical : 11
    , xlInsideHorizontal : 12
    , xlTop : -4160
    , xlBottom : -4107
    , xlNormal : -4143
    , xlWorkbookNormal : -4143
    , xlWorkbookDefault : 51
    , xlCSVMSDOS : 24
    , xlTextWindows : 20
    , xlHtml : 44
    , xlTemplate : 17
    , xlThin : 2
    , xlDouble : -4119
    , xlThick : 4
    , xl3DColumn : -4100
    , xlColumns : 2
    , xlLocationAsObject : 2
    , xlVAlignBottom : -4107
    , xlVAlignCenter : -4108
    , xlVAlignDistributed : -4117
    , xlVAlignJustify : -4130
    , xlVAlignTop : -4160
    , xlLine : 4
    , xlValue : 2
    , xlLinear : -4132
    , xlNone : -4142
    , xlDot : -4118
    , xlCategory : 1
    , xlContinuous : 1
    , xlMedium : -4138
    , xlLegendPositionLeft : -4131
    , xlRadar : -4151
    , xlAutomatic : -4105
    , xlHairline : 1
    , xlAscending : 1
    , xlDescending : 2
    , xlSortRows : 2
    , xlSortColumns : 1
    , xlSortLabels : 2
    , xlSortValues : 1
    , xlLeftToRight : 2
    , xlTopToBottom : 1
    , xlSortNormal : 0
    , xlSortTextAsNumbers : 1
    , xlGuess : 0
    , xlNo : 2
    , xlYes : 1
    , xlFormulas : -4123
    , xlPart : 2
    , xlWhole : 1
    , xlByColumns : 2
    , xlByRows : 1
    , xlNext : 1
    , xlPrevious : 2
    , xlCellTypeLastCell : 11
    , xlR1C1 : -4150
    , xlShiftDown : -4121
    , xlShiftToRight : -4161
    , xlValues : -4163
    , xlNotes : -4144
    , xlDown : -4121

    , xlExclusive : 3
    , xlNoChange : 1
    , xlShared : 2
    , xlDatabase:1
    , xlLinkTypeExcelLinks:1

    , xlLocalSessionChanges : 2
    , xlOtherSessionChanges : 3
    , xlUserResolution : 1

    // Constants used for testing if a worksheet is visible or hidden.
    , xlSheetHidden : 0
    , xlSheetVisible : -1
    , xlSheetVeryHidden : 2

    , xlWebFormattingAll : 1
    , xlWebFormattingRTF : 2
    , xlWebFormattingNone : 3

    , xlOverwriteCells : 0
    , xlSpecifiedTables : 3
    }

   // private variables
  var _excelApp = null; // Excel application
  var _workSheet = null;
  var _workBook = null;
  var _workBooks = [];

  /**
   * @ignore
   */
  _excel.createExcelFormatter = function(rangeBuilder){
    var formatter = new ExcelFormatter(rangeBuilder);
    return formatter;
  }



  //##################################################
 /**
 * Class ExcelFormatter
 * @class       ctx.excel.sheet.formatter
 * @constructor
 * @ignore
 * @path        ctx.excel.sheet.formatter
 */
function ExcelFormatter(rangeBuilder){
  this.formatterRequest = {};
  this.rangeBuilder = rangeBuilder;

  //if we where not called with "new", call the constructor again with "new"
  if(!(this instanceof ExcelFormatter))
      return new ExcelFormatter(rangeBuilder);

  //rename the "add" function by "set" functions
  this.addFormatFontBold = function addFormatBold(boolValue){
      this.formatterRequest.bold = boolValue;
  }

  this.addFormatFontItalic = function addFormatItalic(boolValue){
      this.formatterRequest.italic = boolValue;
  }

  this.addFormatFontUnderline = function addFormatUnderline(underlineStyle){
      this.formatterRequest.underline = underlineStyle;
  }

  this.addFormatAlignement = function addFormatAlignement(typeOfAlignment){
      this.formatterRequest.alignmentType = typeOfAlignment;
  }

  this.addFormatFontColor = function addFormatFontColor(fontColor){
      this.formatterRequest.fontColor = fontColor;
  }

  this.addFormatFontSize = function addFormatFontSize(fontSize){
      this.formatterRequest.fontSize = fontSize;
  }

  this.addFormatFontStrikethrough = function (strikethroughValue){
      this.formatterRequest.strikethrough = strikethroughValue;
  }

  this.addFormatFontSubscript  = function (subscriptValue){
      this.formatterRequest.subscript = subscriptValue;
  }

  this.addFormatFontSuperscript = function (superscriptValue){
      this.formatterRequest.superscript = superscriptValue;
  }

  //color is a array of 3 int
  this.addFormatBackgroundColor = function addFormatColorCells(color){
      //https://docs.microsoft.com/en-us/office/vba/api/excel.range.interior
      this.formatterRequest.backgroundColor = color;
  }



  // //https://docs.microsoft.com/en-us/office/vba/api/excel.borders
  // this.addFormatBorderLineStyle = function addFormatBorderLineStyle(xlBorderLineStyle, xlBordersindex){
  //     //TODO : to be continued !
  //     if(!xlBordersindex)
  //         this.formatterRequest.borderLineStyle = { xlBorderLineStyle, xlBordersIndex};  //not supported, ECMA script 6
  //     else
  //         this.formatterRequest.borderLineStyle = {xlBorderLineStyle};
  // }

  //Check all formatting on Font properties of Range. 
  //https://docs.microsoft.com/en-us/office/vba/api/excel.font(object)
  this.formatNow = function formatNow(){
      for(var propertyName in this.formatterRequest){
          switch (propertyName) {
              case "bold":
                  this.formatFontBold(this.formatterRequest[propertyName]);
              break;
              case "italic":
                  this.formatFontItalic(this.formatterRequest[propertyName]);
              break;
              case "underline":
                  this.formatFontUnderline(this.formatterRequest[propertyName]);
              break;
              case "fontSize":
                  this.fontSize(this.formatterRequest[propertyName]);
              break;
              case "alignmentType":
                  this.formatAlignmentType(this.formatterRequest[propertyName]);
              break;
              case "backgroundColor":
                  this.formatRangeBackgroundColor(this.formatterRequest[propertyName]);
              break;
              case "fontColor":
                  this.formatFontColor(this.formatterRequest[propertyName]);
              break;
              case "strikethrough":
                  this.formatFontStrikethrough(this.formatterRequest[propertyName]);
              break;
              case "subscript":
                  this.formatFontSubscript(this.formatterRequest[propertyName]);
              break;
              case "superscript":
                  this.formatFontSuperscript(this.formatterRequest[propertyName]);
              break;
          }
      }
  }

  /**
  * @ignore
  */
  this.formatFontBold = function(boolValue){
      if(typeof(boolValue) != 'boolean'){
          throw new Error("The input parameter should be a boolean. The current value is " + boolValue);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Bold = boolValue;
      }
  }

  /**
  * @ignore
  */
  this.formatFontItalic = function(boolValue){
      if(typeof(boolValue) != 'boolean'){
          throw new Error("The input parameter should be a boolean. The current value is " + boolValue);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Italic = boolValue;
      }
  }

  /**
  * @ignore
  */
  this.formatFontUnderline = function(underlineStyle){
      //TODO: validate that this is a number containing in the enum XlUnderline
      if(typeof(underlineStyle) != 'number'){
          throw new Error("The input parameter should be a value coming from e.excel.XlUnderline. The current value is " + underlineStyle);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Underline = underlineStyle;
      }
  }

  /**
  * @ignore
  */
  this.fontSize = function(size){
      if(typeof(size) != 'number' || size <= 0){
          throw new Error("The input parameter should be a positive number. The current value is " + size);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Size = size;
      }
  }

  /**
  * @ignore
  */
  this.formatAlignmentType = function(alignmentType){
      //e.excel.XlHAlign
      if(typeof(alignmentType) != 'number'){
          throw new Error("The input parameter should be a positive number. The current value is " + alignmentType);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().HorizontalAlignment = alignmentType;        
      }
  }

  /**
  * @ignore
  */
  this.formatRangeBackgroundColor = function(color){
      //validate that color should be a array of 3 figures. min 0, max 255
      if(color == null ||typeof(color) != 'object'){
          throw new Error("The input parameter should be an array of 3 integer each between 0 and 255. The current value is " + color);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Interior.Color = color[0] + 256*color[1] + 65536*color[2]; 
      }
  }

  /**
  * @ignore
  */
  this.formatFontColor = function(color){       
      //validate that color should be a array of 3 figures. min 0, max 255
      if(color == null ||typeof(color) != 'object'){
          throw new Error("The input parameter should be an array of 3 integer each between 0 and 255. The current value is " + color);
      }
      
      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Color = color[0] + 256*color[1] + 65536*color[2]; 
      }
  }

  /**
  * @ignore
  */
  this.formatFontStrikethrough = function(boolValue){
      if(typeof(boolValue) != 'boolean'){
          throw new Error("The input parameter should be a boolean. The current value is " + boolValue);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Strikethrough = boolValue;
      }
  }

  /**
  * @ignore
  */
  this.formatFontSubscript = function(boolValue){
      if(typeof(boolValue) != 'boolean'){
          throw new Error("The input parameter should be a boolean. The current value is " + boolValue);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Subscript = boolValue;
      }
  }

  /**
  * @ignore
  */
  this.formatFontSuperscript = function(boolValue){       
      if(typeof(boolValue) != 'boolean'){
          throw new Error("The input parameter should be a boolean. The current value is " + boolValue);
      }

      if(rangeBuilder.hasRange()){
          this.rangeBuilder.getRange().Font.Superscript = boolValue;
      }
  }

  // //public documentation here: https://docs.microsoft.com/en-us/office/vba/api/excel.xlbordersindex
  // this.xlBordersIndex = {
  //     xlDiagonalDown : 5,
  //     xlDiagonalUp : 6,
  //     xlEdgeBottom : 9,
  //     xlEdgeLeft : 7,
  //     xlEdgeRight : 10,
  //     xlEdgeTop : 8,
  //     xlInsideHorizontal : 12,
  //     xlInsideVertical : 11
  // }

  // //public documentation here:  https://docs.microsoft.com/en-us/office/vba/api/excel.xllinestyle
  // this.xlLineStyle = {
  //     xlContinuous : 1,
  //     xlDash : -4115,
  //     xlDashDot : 4,
  //     xlDashDotDot : 5,
  //     xlDot : -4118,
  //     xlDouble : -4119,
  //     xlLineStyleNone : -4142,
  //     xlSlantDashDot : 13
  // }

  // //public documentation here: https://docs.microsoft.com/en-us/office/vba/api/excel.xlborderweight
  // this.xlBorderWeight = {
  //     xlHairline : 1,
  //     xlMedium : -4138,
  //     xlThick : 4,
  //     xlThin : 2
  // }

  this.releaseComObjects = function releaseComObjects(){
      this.rangeBuilder.releaseComObjects();
      this.rangeBuilder = null;
  }
}

//##################################################
//Declare CellFactory
 /**
 * @constructor
 * @ignore
 */
function CellFactory(){
  this.errorMessages = [];
}

/**
* @ignore
*/
CellFactory.prototype.maxExcelColumn = function(returnAsNumber){
if(returnAsNumber)
  return 16384;
else
  return "XFD";
}

/**
* @ignore
*/
CellFactory.prototype.maxExcelRow = function(){
return 1048576;
}

/**
* @ignore
*/
CellFactory.prototype.validateInputEntriesForRowColPosition = function validateInputEntriesForRowColPosition(coordinate, isColumn){
  var isValid = false;

  switch (typeof(coordinate)){
    case "number" :
    if(!isColumn && coordinate>0 && coordinate<= 1048576){
      isValid= true;
    }
    else if (isColumn && coordinate>0 && coordinate <= 16384){                
        isValid= true;
    }
    break;

    case "string" :
    //just try to convert a string as figureS
    var coordinateAsInt = parseInt(coordinate, 10);
    if(!isColumn && coordinateAsInt>0 && coordinateAsInt<= 1048576){
      isValid= true;
    }
    else if (isColumn && coordinateAsInt>0 && coordinateAsInt <= 16384){                
        isValid= true;
    }

    //XFD is the maximum for the column position in Excel 
    if(!isValid && isColumn && coordinate.length<=3){
      isValid = true;
      var couldBeTheLimit = false;
      //Check if all characters are in the correct range
      for (var letterIndex = 0; (letterIndex < coordinate.length) && isValid ; letterIndex++){
        var charCode = coordinate.charCodeAt(letterIndex);
        isValid &= (charCode >=65 && charCode<=90) || (charCode >=97 && charCode<=122); //check from A to Z and a to z

        //Validate the limit which is XFD
        if(coordinate.length ==3){
          switch (letterIndex) {
            case 0:
              if(charCode == 89 || charCode == 90 || charCode == 121 || charCode == 122) 
                isValid = false; 
              else if (charCode == 88 || charCode == 120)
                couldBeTheLimit = true;
            break;
            case 1:
              if(couldBeTheLimit && ((charCode<=90 && charCode > 70) || (charCode>102 && charCode<=122)))
              {
                isValid = false;
                couldBeTheLimit = false;
              }  
              else if (couldBeTheLimit && ((charCode >= 65 && charCode < 70) || (charCode >=97 && charCode <102)))
                couldBeTheLimit = false;
            break;
            case 2 :
              if(couldBeTheLimit && ((charCode > 68 && charCode <=90) || (charCode >100 && charCode <=122)))
                isValid = false;
            break;
          }
        }
      }
    }
  }   
  return isValid;
}

/**
* @ignore
*/
CellFactory.prototype.createCell = function(rowFactory, columnFactory){

  this.errorMessages = [];

  if(!this.validateInputEntriesForRowColPosition(columnFactory, true)){
      this.errorMessages.push("the column of the cell is incorrect. The parameter " + columnFactory + " cannot be converted to a valid column");
      return null;
  }
                    
  if(!this.validateInputEntriesForRowColPosition(rowFactory, false)){
      this.errorMessages.push("the row of the cell is incorrect. The parameter " + rowFactory + " cannot be converted to a valid row");
      return null;
  }

  var row;
  if(typeof(rowFactory) === 'string') //in case of rowFactory = "5" instead of 5
    row = parseInt(rowFactory, 10);
  else
    row = rowFactory;

  var column;
  var columnAsString;
  var rangeUtilities = new RangeUtilities();
  if(typeof(columnFactory) === 'string'){
      column = parseInt(columnFactory, 10);
      if(isNaN(column)){
          columnAsString = columnFactory;
          column = rangeUtilities.getColumnIndexFromLetter(columnFactory);
      }
      else
          columnAsString = rangeUtilities.getColumnDesc(column);
  } 
  else{
      column = columnFactory;
      columnAsString = rangeUtilities.getColumnDesc(columnFactory);
  }
    
  var cellCreated = new Cell(row, column, columnAsString);
  return cellCreated;
}

/**
* @ignore
*/
CellFactory.prototype.createRangeDefinitionFromExcelMonoRangeAddress = function(monoRangeAddress){
//support M5:L90 or M5 or D:Z or 22:56
var rangeDefinition = {};

var rangeUtilities = new RangeUtilities();
var mappingResult = rangeUtilities.matchRangeExpressionAuto(monoRangeAddress);

if(mappingResult === null){
  throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
}

switch (mappingResult.type) {
  case rangeUtilities.rangeExpressionType.standardMonoRange:
      var inputIsCorrect = true;
      inputIsCorrect |= mappingResult.matchResult[0] === monoRangeAddress;
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[1], true);
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[2], false);
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[3], true);
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[4], false);            

      if(inputIsCorrect){
        rangeDefinition.startCell = this.createCell(mappingResult.matchResult[2], mappingResult.matchResult[1]);
        rangeDefinition.endCell = this.createCell(mappingResult.matchResult[4], mappingResult.matchResult[3]);
      }
      else{
        throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
      }

    break;
  case rangeUtilities.rangeExpressionType.monoCell:
      var inputIsCorrect = true;
      inputIsCorrect |= mappingResult.matchResult[0] === monoRangeAddress;
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[1], true);
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[2], false);

      if(inputIsCorrect){
        rangeDefinition.startCell = this.createCell(mappingResult.matchResult[2], mappingResult.matchResult[1]);
        rangeDefinition.endCell = rangeDefinition.startCell;
      }
      else{
        throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
      }
    break;
  case rangeUtilities.rangeExpressionType.columnSelection:
      var inputIsCorrect = true;
      inputIsCorrect |= mappingResult.matchResult[0] === monoRangeAddress;
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[1], true);
      inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[2], true);

      if(inputIsCorrect){
        rangeDefinition.startCell = this.createCell(1, mappingResult.matchResult[1]);
        rangeDefinition.endCell = this.createCell(this.maxExcelRow(), mappingResult.matchResult[2]);
      }
      else{
        throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
      }
    break;
  case rangeUtilities.rangeExpressionType.rowSelection:
    var inputIsCorrect = true;
    inputIsCorrect |= mappingResult.matchResult[0] === monoRangeAddress;
    inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[1], false);
    inputIsCorrect |= this.validateInputEntriesForRowColPosition(mappingResult.matchResult[2], false);

    if(inputIsCorrect){
      rangeDefinition.startCell = this.createCell(mappingResult.matchResult[1], 1);
      rangeDefinition.endCell = this.createCell(mappingResult.matchResult[2], this.maxExcelColumn(true));
    }
    else{
      throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
    }      
    break;
  default:
      throw new Error("the input parameter " + monoRangeAddress + " is not recognized as a monorange address.");
}

return rangeDefinition;
}

/**
* @ignore
*/
CellFactory.prototype.createCellFromExcelCellAddress = function(excelAddress){
//excelAddress is A5 or DF567 for example 
this.errorMessages = [];

//we have to validate first that the excelAddress starts with letters
var monoCellExpression = "^([A-Z]{1,3})([0-9]{1,7})$";
var matchResult = excelAddress.match(monoCellExpression);

if(matchResult === null || matchResult.length !== 3){
    this.errorMessages.push("the input address of the cell is incorrect.");
    return null;
}
    
return this.createCell(matchResult[2], matchResult[1]);
}

//Declare Cell
/**
* @constructor
* @ignore
*/
function Cell(row, column, columnAsString){
  //We consider row and column have already been validated thanks to ArgumentsValidation class.
  this.row = row;
  this.column = column;
  this.columnAsString = columnAsString;
  this.address = "";
}

/**
* @ignore
*/
Cell.prototype.fillAddress = function(){
  var columnAsString;
  if(typeof(this.column) !== 'string') {
      var rangeUtilities = new RangeUtilities();
      columnAsString = rangeUtilities.getColumnDesc(this.column);
  }
  else
    columnAsString = this.column;

  this.address = columnAsString + this.row;
}

//###################################################
//Declare RangeUtilities
 /**
 * @constructor
 * @ignore
 */
function RangeUtilities(){
  this.rangeExpressionType = {
      standardMonoRange : 0,
      monoCell : 1,
      columnSelection : 2,
      rowSelection : 3
  }
}

/**
* @ignore
*/
RangeUtilities.prototype.matchRangeExpression = function(rangeAddressToValidate, rangeExpressionType){
  //just identify the type of the range expression, does not validate the address
  //return the match Result
  if(!rangeAddressToValidate){
      return null;
  }

  var standardMonoRangeExpression = "^([A-Z]{1,3})([0-9]{1,7}):([A-Z]{1,3})([0-9]{1,7})$";  //D4:GH678
  var monoCellExpression = "^([A-Z]{1,3})([0-9]{1,7})$";      //C56
  var columnRangeExpression = "^([A-Z]{1,3}):([A-Z]{1,3})$";  //F:KIO
  var rowRangeExpression = "^([0-9]{1,7}):([0-9]{1,7})$"; //23:569

  var matchResult;
  switch (rangeExpressionType) {
      case this.rangeExpressionType.standardMonoRange:
          matchResult = rangeAddressToValidate.match(standardMonoRangeExpression);
          break;
      case this.rangeExpressionType.monoCell:
          matchResult = rangeAddressToValidate.match(monoCellExpression);
          break;
      case this.rangeExpressionType.columnSelection:
          matchResult = rangeAddressToValidate.match(columnRangeExpression);
          break;
      case this.rangeExpressionType.rowSelection:
          matchResult = rangeAddressToValidate.match(rowRangeExpression);
          break;
      default:
          throw new Error("the type of the range is not supported. The input parameter was " + rangeExpressionType);
  }

  return matchResult;
}

/**
* @ignore
*/
RangeUtilities.prototype.matchRangeExpressionAuto = function(rangeAddressToValidate){
  if(!rangeAddressToValidate){
      return null;
  }

  //used when we get addresses from Excel directly
  while (rangeAddressToValidate.indexOf("$")>-1) {
    rangeAddressToValidate = rangeAddressToValidate.replace("$", "");    
  }

  var standardMonoRangeExpression = "^([A-Z]{1,3})([0-9]{1,7}):([A-Z]{1,3})([0-9]{1,7})$";  //D4:GH678
  var monoCellExpression = "^([A-Z]{1,3})([0-9]{1,7})$";      //C56
  var columnRangeExpression = "^([A-Z]{1,3}):([A-Z]{1,3})$";  //F:KIO
  var rowRangeExpression = "^([0-9]{1,7}):([0-9]{1,7})$"; //23:569

  var matchMapping = {};

  var matchResult = rangeAddressToValidate.match(standardMonoRangeExpression);
  if(matchResult !== null){
      matchMapping.type = this.rangeExpressionType.standardMonoRange;
      matchMapping.matchResult = matchResult;
      return matchMapping;
  }

  matchResult = rangeAddressToValidate.match(monoCellExpression);
  if(matchResult !== null){
      matchMapping.type = this.rangeExpressionType.monoCell;
      matchMapping.matchResult = matchResult;
      return matchMapping;
  }
  
  matchResult = rangeAddressToValidate.match(columnRangeExpression);
  if(matchResult !== null){
      matchMapping.type = this.rangeExpressionType.columnSelection;
      matchMapping.matchResult = matchResult;
      return matchMapping;
  }

  matchResult = rangeAddressToValidate.match(rowRangeExpression);
  if(matchResult !== null){
      matchMapping.type = this.rangeExpressionType.rowSelection;
      matchMapping.matchResult = matchResult;
      return matchMapping;
  }

  return null;
}

/**
* @ignore
*/
RangeUtilities.prototype.getColumnDesc = function (lCol){
  if(lCol<1 || lCol>16384 || typeof(lCol) !== "number")
      return null;
  
  var result = null;

  if (lCol < 27)
      result = String.fromCharCode(lCol + 64);
  else if (lCol < 703)
      result = String.fromCharCode(((lCol - 1) / 26) + 64, ((lCol - 1) % 26) + 65);
  else
      result = String.fromCharCode(((lCol - 703) / 676) + 65, (((lCol - 703) % 676) / 26) + 65, ((lCol - 703) % 26) + 65);

  return result;
}

/**
* @ignore
*/
RangeUtilities.prototype.getColumnIndexFromLetter = function (characters){
  if(typeof(characters) != "string")
      return null;

  var columnIndex= 0;

  for (var index = 0; index < characters.length; index++) {
      var characterAsAscii = characters.charCodeAt(index);
      
      if(characterAsAscii >=65 && characterAsAscii<=90)
          columnIndex += (characterAsAscii - 64) * Math.pow(26, characters.length - 1 - index);
      else if(characterAsAscii >=97 && characterAsAscii<=122)
          columnIndex += (characterAsAscii - 96) * Math.pow(26, characters.length - 1 - index);
      else
          return null;
  }

  if(columnIndex > 16384 ||columnIndex < 1)
      return null;

  return columnIndex;
}

//###############################################################
/**
 * @constructor
 * @ignore
 */
function RangeBuilder(addressFromConstructor){
  this.addressFromConstructor = addressFromConstructor;
  this.addressString = "";  //TODO : Manage the marge of range when the size is too big
  this.comRange = null;
  this.worksheetName = "";
  this.officeRangeSeparator = typeof _excelApp !== "undefined" ? _excelApp.International(5) : "," ; //xlListSeparator
  this.usedRange = false;
}

 /**
 * @ignore
 */
RangeBuilder.prototype.hasRange = function hasRange(){
  if(this.addressFromConstructor)
  {
    this.addRange(null); //take care of this.addressFromConstructor
    this.addressFromConstructor = null;
  }
    
  if(this.comRange || this.addressString || this.usedRange)
    return true;

  return false;
}

 /**
 * @ignore
 */
RangeBuilder.prototype.hasMonoRange = function hasMonoRange(){
  if(this.addressFromConstructor)
  {
    this.addRange(null);
    this.addressFromConstructor = null;
  }

  if(this.usedRange){
    return true;
  }
    
  if(this.comRange && this.addressString){
    return false;
  }

  if(!this.comRange && !this.addressString){
    return false;
  }

  if(this.addressString){
    return this.addressString.indexOf(this.officeRangeSeparator)>-1;
  }
  else{
    return this.comRange.Areas.length >1;
  }
}

 /**
 * @ignore
 */
RangeBuilder.prototype.clearRange = function clearRange(){
  this.addressString = "";
  this.addressFromConstructor = null;
  this.comRange = null;
  this.usedRange = false;
}

 /**
 * @ignore
 */
RangeBuilder.prototype.getRange = function getRange(){
  var addComRange = function(comRangeToAdd){
    if(!comRangeToAdd)
      return;

    if(this.comRange == null)
      this.comRange = comRangeToAdd;
    else
      this.comRange = _excelApp.Union(this.comRange, comRangeToAdd);      
  }

  if(this.addressFromConstructor)
  {
    this.addRange(null);
    this.addressFromConstructor = null;
  }

  if(!_workSheet)
    _workSheet = _workBook.ActiveSheet;

  if(this.usedRange && !this.comRange){
    var usedRange = _workSheet.UsedRange;
    addComRange.call(this, usedRange);
    usedRange = null;
  }
  else if(this.addressString && this.addressString.length>0){
    var currentRange = _workSheet.Range(this.addressString); 
    this.addressString = "";
    addComRange.call(this, currentRange);
    currentRange = null;
  }
  
  return this.comRange; 
}

 /**
 * @ignore
 */
RangeBuilder.prototype.getRangeAddress = function(){
  
  if(this.addressFromConstructor){
    this.addRange(null);
    this.addressFromConstructor = null;
  }

  var address;

  if(this.usedRange && !this.comRange){
    if(!_workSheet){
      _workSheet = _workBook.ActiveSheet;
    }
    
    this.comRange = _workSheet.UsedRange;
  }

  if(this.comRange){
    address = this.comRange.Address;
  }
  
  if(address){
    address += this.officeRangeSeparator;
  }
  
  if(address && this.addressString){
    address += this.addressString;
  }
  else if(this.addressString){
    address = this.addressString;
  }

  if(address){
    var lastCharacter = address.substring(address.length-1, address.length);
    if(lastCharacter === this.officeRangeSeparator){
      address = address.substring(0, address.length-1);
    }

    return address;
  }
  else{
    return null;
  }   
}


 /**
 * @ignore
 */
RangeBuilder.prototype.addRange = function addRange(input){
  /// input can be "A3:FG579" or "A;3;FG;579" or "1;3;163;579" or "R5" or "R;5" or "18;5";
  /// startColumn;startRow;endColumn;endRow
  /// startColumn;startRow
  var addRangeInAddressString = function(rangeAddressToAdd){
    if(this.addressString === undefined || this.addressString === null || this.addressString.length<1)
      this.addressString = rangeAddressToAdd;
    else
      this.addressString = this.addressString.concat(this.officeRangeSeparator + rangeAddressToAdd);

    //the maximum size of range description for excel is 246, so when we are close to this limit, we create the real range
    if(this.addressString.length> 226){
      var rangeToAdd = _excelApp.Range(this.addressString);
      addComRange.call(this, rangeToAdd);
      this.addressString = "";
    }
  }

  var addComRange = function(comRangeToAdd){
    if(comRangeToAdd === null || comRangeToAdd === undefined)
      return;

    if(this.comRange)
      this.comRange = comRangeToAdd;
    else
      this.comRange = _excelApp.Union(this.comRange, comRangeToAdd);      
  }

  var addRangeImplementation = function(rangeDefinitionToValidate){
    if(!rangeDefinitionToValidate)
      return; 

    var indexSpecificCharacter = rangeDefinitionToValidate.indexOf(':')
    if(indexSpecificCharacter >-1)
    {
      var inputIndexes = rangeDefinitionToValidate.split(":");
      if(inputIndexes.length !== 2)
        throw new Error("The address " + rangeDefinitionToValidate + " is not correct.")

      var type1 = typeof(inputIndexes[0]);
      var type2 = typeof(inputIndexes[1]);

      if(type1=== type2 || inputIndexes.length !== 2){
        //type1=== type2 means we have A:A or D:M or 23:23 or 23:89
        //Do a specific validation for this case. for the moment we take it as it is.
        
        //inputIndexes.length !== 2 means there 
        addRangeInAddressString.call(this, rangeDefinitionToValidate);
      }
      else
      {
        var cellFactory = new CellFactory();
        var firstCell = cellFactory.createCellFromExcelCellAddress(inputIndexes[0]);
        var lastCell = cellFactory.createCellFromExcelCellAddress(inputIndexes[1]);

        if(firstCell === null || lastCell ===null)
          throw new Error("The address " + rangeDefinitionToValidate + " is not correct.")

        addRangeInAddressString.call(this, rangeDefinitionToValidate);       
      }
    }
    else
    {
      var inputIndexes = rangeDefinitionToValidate.split(";");

      //split on ';', then we should have 2 or 4 items (1 cell or 2 cells representing a monoRange)
      if(inputIndexes.length != 1 && inputIndexes.length != 2 && inputIndexes.length !=4){
        throw new Error("the definition of the range is incorrect. The parameter " + rangeDefinitionToValidate + " cannot be converted to a valid range");
      }
      else if(inputIndexes.length == 2){
        var cellFactory = new CellFactory();
        var cellInput = cellFactory.createCell(inputIndexes[1], inputIndexes[0]);
        if(cellInput === null){
          throw new Error(cellFactory.errorMessages[0]);
        }

        cellInput.fillAddress();
        addRangeInAddressString.call(this, cellInput.address);
      }
      else if(inputIndexes.length ==4 ){
        var cellFactory = new CellFactory();
        var cellTopLeft = cellFactory.createCell(inputIndexes[1], inputIndexes[0]);

        if(cellTopLeft === null)
          throw new Error(cellFactory.errorMessages[0]);
        
        var cellBottomRight = cellFactory.createCell(inputIndexes[3], inputIndexes[2]);
        if(cellBottomRight === null)
          throw new Error(cellFactory.errorMessages[0]);

        cellTopLeft.fillAddress();
        cellBottomRight.fillAddress();

        addRangeInAddressString.call(this, cellTopLeft.address + ":" + cellBottomRight.address);
      }
      else{ //means, we should have excel address like FG456 or A1 etc.
        var cellFactory = new CellFactory();
        var cellfromAddress = cellFactory.createCellFromExcelCellAddress(inputIndexes[0]);

        if(cellfromAddress === null)
          throw new Error(cellFactory.errorMessages[0]);

          cellfromAddress.fillAddress();

          addRangeInAddressString.call(this, cellfromAddress.address);
      }
    }
  }

  if((input && input.toLowerCase() == "usedrange") || (this.addressFromConstructor && this.addressFromConstructor.toLowerCase() == "usedrange")){
    this.clearRange();
    this.usedRange = true;
    return;
  }

  if(this.addressFromConstructor){
    addRangeImplementation.call(this, this.addressFromConstructor);
    this.addressFromConstructor = null;
  }
  
  addRangeImplementation.call(this, input);
}

 /**
 * @ignore
 */
RangeBuilder.prototype.releaseComObjects = function(){
  this.comRange = null;
}



//#####################################################
 /**
  * Initializes the Excel library.
  * @description
  *  The <wrap box>**init( )**</wrap> method of ''ctx.excel'' class initializes the Excel library.
  *
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.init( );</code>
  * @method      init
  * @throws      {Error}
  * @param       {xloptions} [Xlsoptions] Excel options
  * @deprecated  This method is available for compatibility reason. You should use ''ctx.excel.initialize'' method instead.
  * @path        ctx.excel.init
  */
 _excel.init = function(Xlsoptions) {
  if (_excelApp){
    return;
  }
  ctx.notifyAction('ctx.excel.init');
  try{
    if (_excelApp == null){
      _excelApp = new ActiveXObject("Excel.Application");
      if (Xlsoptions){
        if (Xlsoptions.displayAlerts == false ) _excelApp.DisplayAlerts = false;
        if (Xlsoptions.displayAlerts == true ) _excelApp.DisplayAlerts = true;
        if (Xlsoptions.visible == false ) _excelApp.visible = false;
        if (Xlsoptions.visible == true ) _excelApp.visible = true;

      } else {
        _excelApp.visible = true;
        _excelApp.DisplayAlerts = true;
      }
    }
    if (_excelApp == null){
      throw new Error(e.error.KO, '[ctx.excel.init] Failed to start excel.');
    }
  } catch (ex){
    throw new Error(e.error.KO, '[ctx.excel.init] Failed to start excel. '+ ex.description);
  }
}

/**
 * @ignore
 */
_excel.createRangeBuilder = function(rangeDefinition){
  return new RangeBuilder(rangeDefinition);
}

 /**
  * Initializes the Excel library.
  * @description
  *  The <wrap box>**initialize( )**</wrap> method of ''ctx.excel'' class initializes the Excel library.
  *
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.initialize( );</code>
  * @method  initialize
  * @throws  {Error}
  * @path    ctx.excel.initialize
  */
  _excel.initialize = function() {
    if (_excelApp){
      return;
    }
    ctx.notifyAction('ctx.excel.initialize');
    try{
      if (_excelApp == null){
        if (!ctx.options.excel.newXlsInstance){
          try{
            _excelApp = GetObject('',"Excel.Application");
          } catch(ex){
            ctx.log('No excel found, create a new one');
            _excelApp = new ActiveXObject("Excel.Application");
          }
        } else {
          _excelApp = new ActiveXObject("Excel.Application");
        }

        if (ctx.options.excel.displayAlerts == false ) _excelApp.DisplayAlerts = false;
        if (ctx.options.excel.displayAlerts == true ) _excelApp.DisplayAlerts = true;
        if (ctx.options.excel.visible == false ) _excelApp.visible = false;
        if (ctx.options.excel.visible == true ) _excelApp.visible = true;
      }
      if (_excelApp == null){
        throw new Error(e.error.KO, '[ctx.excel.initialize] Failed to start Excel application.');
      }
    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.initialize] Failed to start Excel application. '+ ex.description);
    }
  }

 /**
  * Ends the Excel library.
  * @description
  *  The <wrap box>**end( )**</wrap> method of ''ctx.excel'' class ends the Excel library.
  *
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.end( );</code>
  * @method  end
  * @throws  {Error}
  * @path    ctx.excel.end
  */
   _excel.end = function() {
    ctx.notifyAction('ctx.excel.end');
     try{
      if (_excelApp != null) {
        _workSheet = null;
        _workBook = null;
        _workBooks = [];
        _excelApp.Application.Quit();
        _excelApp.Quit();

        _excelApp = null;
        CollectGarbage();
      }
      if (_excelApp != null) {
        throw new Error(e.error.KO, '[ctx.excel.end] Failed to end Excel application.');
      }
    } catch (ex){
      throw new Error(e.error.KO, "[ctx.excel.end] Failed to end Excel application. "+ ex.description);
    }
  }

 /**
  * Releases the Excel library.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.release( );</code>
  * @method  release
  * @throws  {Error}
  * @path    ctx.excel.release
  */
  _excel.release = function() {
    ctx.notifyAction('ctx.excel.release');
     try{
      if (_excelApp != null) {
        _workSheet = null;
        _workBook = null;
        _workBooks = [];
        _excelApp = null;
        CollectGarbage();
      }
      if (_excelApp != null) {
        throw new Error(e.error.KO, '[ctx.excel.release] Failed to end excel.');
      }
    } catch (ex){
      throw new Error(e.error.KO, "[ctx.excel.release] Failed to end excel. "+ ex.description);
    }
  }

 /**
  * Get the workbook referenced by the workbookName.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.getWorkbook( workbookName );</code>
  * @method  getWorkbook
  * @param   {string} workbookName Workbook name
  * @throws  {Error}
  * @path    ctx.excel.getWorkbook
  */
  _excel.getWorkbook = function(workbookName) {
    ctx.notifyAction('ctx.excel.getWorkBook');
    var wbFound = false;
    try{
      _workBooks = [];
      try{
        for (var index = 0; index < _excelApp.Workbooks.Count; index++) {
          var wb = _excelApp.Workbooks.Item(index+1);
          _workBooks.push(wb);
        }
      } catch (ex){
        ctx.log('No Excel application running...');
        throw new Error(e.error.KO, '[ctx.excel.getWorkbook] Failed to get Excel object.');
      }

      if (_excelApp !== null){
        ctx.each(_workBooks, function(id, workBook) {
          if (workBook.Name == workbookName){
            _workBook = workBook;
            wbFound = true;
          }
        });
      }

      if (_excelApp == null){
        throw new Error(e.error.KO, '[ctx.excel.getWorkbook] Failed to start excel.');
      }
    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.getWorkbook] Failed to start excel. '+ ex.description);
    }
    return wbFound;
  }

 /**
  * Get reference to Excel application and get all open workbooks.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.getWorkbooks( );</code>
  * @method  getWorkbooks
  * @throws  {Error}
  * @return  {Array} List of open workbooks
  * @path    ctx.excel.getWorkbooks
  */
  _excel.getWorkbooks = function() {
    //if (_excelApp) return;
    ctx.notifyAction('ctx.excel.getWorkbooks');
    try{
      var list = [];
      _workBooks = [];
      try{
        _excelApp = GetObject('',"Excel.Application");
        for (var index = 0; index < _excelApp.Workbooks.Count; index++) {
          var wb = _excelApp.Workbooks.Item(index+1);
          _workBooks.push(wb);
          list.push(wb.Name);
        }
        return list;
      } catch (ex){
        ctx.log('No Excel application running...');
        throw new Error(e.error.KO, '[ctx.excel.getWorkbooks] Failed to get Excel object.');
      }

    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.getWorkbooks] Failed to catch excel. '+ ex.description);
    }
  }

 /**
  * Returns the name of the Excel WorkBook.
  * @method  getWorkBookName
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> var obj = ctx.excel.application.getWorkBookName( 0 );</code>
  * @param   {number} idBook Workbook index (by default, 0)
  * @throws  {Error}
  * @return  {Object}  Application object
  * @path    ctx.excel.application.getWorkBookName
  */
  _excel.getWorkBookName = function(idBook){
    ctx.notifyAction('ctx.excel.getWorkBookName');
    try{
      var id = (idBook == undefined) ? 0 : idBook;
      var name = '';

      name = _workBooks[id].Name;
      return name;
    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.getWorkBookName] Failed get Workbook name. '+ ex.description);
    }
  }

 /**
  * Returns the number of available WorkBooks.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> var obj = ctx.excel.application.getWorkBooksLength( );</code>
  * @method  getWorkBooksLength
  * @throws  {Error}
  * @return  {Object} Application object
  * @path    ctx.excel.application.getWorkBooksLength
  */
  _excel.getWorkBooksLength = function(){
    ctx.notifyAction('ctx.excel.getWorkBooksLength');
    try{
      return _workBooks.length;
    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.getWorkBooksLength] Failed get Workbook length. '+ ex.description);
    }
  }

 /**
  * Open or get the workbook with an initialization of the Excel object with the process of the workbook.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.initializeBook( macro );</code>
  * @method  initializeBook
  * @param   {string} book Full name of the workook
  * @throws  {Error}
  * @path    ctx.excel.initializeBook
  */
  _excel.initializeBook = function(book) {
    try{
      _workBook = GetObject(book);
      _excelApp = _workBook['Parent'];
      _excelApp.visible = true;

      //check if this method works !
    } catch(ex){
      ctx.log('No excel found, create a new one');
    }
    if (_excelApp == null){
      throw new Error(e.error.KO, '[ctx.excel.open] Failed to start excel.');
    }
  }

 /**
  * Run a macro.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> ctx.excel.run( macro );</code>
  * @method  run
  * @param   {string} macro Name of macro to run
  * @throws  {Error}
  * @path    ctx.excel.run
  */
  _excel.run = function(macro) {
    if (_excelApp == null){
      throw new Error(e.error.KO, '[ctx.excel.run] Failed to run a macro.');
    }
    try{
      _excelApp.Run(macro);
    } catch(ex){
      ctx.log('Run macro '+macro+' failed');
    }
  }

 /**
  * Class gathering a set of functions to manipulate Excel application
  * @class  ctx.excel.application
  * @path   ctx.excel.application
  */
  _excel.application = (function() {
    var _application = {};
     /**
      * Shows or hides the Excel application.
      * @description
      *  <wrap help> //Example://</wrap>
<code javascript>
 // show application
 ctx.excel.application.show( );
 // hide application
 ctx.excel.application.show( false );
</code>
      * @method  show
      * @throws  {Error}
      * @param   {boolean} [bShow] show/hide state (by default, ''true'')
      * @path    ctx.excel.application.show
      */
      _application.show = function(bShow) {
        ctx.notifyAction('ctx.excel.application.show');
        try{
          if (bShow === undefined) bShow = true;
          _excelApp.visible = bShow;
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.application.show] failed to change visible property. '+ ex.description);
        }
      }

     /**
      * Returns the instance of the Excel Application
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> var obj = ctx.excel.application.getObject( );</code>
      * @method  getObject
      * @throws  {Error}
      * @return  {Object} Application Object
      * @path    ctx.excel.application.getObject
      */
      _application.getObject = function() {
        ctx.notifyAction('ctx.excel.application.getObject');
        try{
          _excelApp = GetObject("","Excel.Application");
          if ( _excelApp == null ) {
            throw new Error(e.error.KO, '[ctx.excel.application.getObject] Failed to get Excel object.');
          } else {
            return _excelApp;
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.application.getObject] Failed to get Excel object. '+ ex.description);
        }
      }

     /**
      * Gets the list of the workbooks of the Excel application.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript>  var list = ctx.excel.application.getList( );</code>
      * @method  getList
      * @throws  {Error}
      * @return  {Object} List of workbooks
      * @path    ctx.excel.application.getList
      */
      _application.getList = function(){
        ctx.notifyAction('ctx.excel.application.getList');
        try{
          _excel.initialize();
          var aBooks;
          var iTemp = _excelApp.Workbooks.Count;
          aBooks = new Array(iTemp);
          for (var iIndex = 0; iIndex < iTemp; iIndex++){
            aBooks[iIndex] = _excelApp.Workbooks(iIndex + 1).Name+"|";
            aBooks[iIndex] += _excelApp.Workbooks(iIndex + 1).Path;
          }
          return aBooks;
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.application.getList] failed to get workbooks list. '+ ex.description);
        }
      }
    return _application;
  })();

 /**
  * Class gathering a set of functions to manipulate Excel files
  * @class  ctx.excel.file
  * @path   ctx.excel.file
  */
  _excel.file = (function() {
    var _file = {};
     /**
      * Creates a new workbook.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.create( );</code>
      * @method  create
      * @throws  {Error}
      * @path    ctx.excel.file.create
      */
      _file.create = function() {
        ctx.notifyAction('ctx.excel.file.create');
        try{
          _excel.initialize();
          _workBook = _excelApp.Workbooks.Add();

          if (_workBook === null) {
            throw new Error(e.error.KO, '[ctx.excel.file.create] Failed to create excel workbook.');
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.create] failed to create excel workbook. '+ ex.description);
        }
      }

     /**
      *
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.refresh( );</code>
      * @method  refresh
      * @throws  {Error}
      * @path    ctx.excel.file.refresh
      */
      _file.refresh = function() {
        ctx.notifyAction('ctx.excel.file.refresh');
        try{
          _excel.initialize();

          if (_workBook === null) {
            throw new Error(e.error.KO, '[ctx.excel.file.refresh] Failed to refresh excel workbook. The workbook is null.');
          }

          _workBook.RefreshAll();

        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.refresh] failed to refresh excel workbook. '+ ex.description);
        }
      }

     /**
      * Opens an existing Excel file.
      * @description
      * <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.open( "C:\\Documents\\Finance\\Balances\\Bal2014.xls" );</code>
      * @method  open
      * @throws  {Error}
      * @param   {string} filename Filename
      * @param   {string} [password] Password if file is protected
      * @param   {boolean} [readonly] Read only flag
      * @path    ctx.excel.file.open
      */
      _file.open = function(filename, password, readonly) {
        ctx.notifyAction('ctx.excel.file.open');
        try{
          _excel.initialize();
          if (password) {
            _workBook = _excelApp.WorkBooks.Open(filename, null, (readonly ? true : false), null, password);
          } else {
            _workBook = _excelApp.WorkBooks.Open(filename);
          }
          if ( _workBook == null ){
            throw new Error(e.error.KO, '[ctx.excel.file.open] Failed to open excel workbook.'+filename);
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.open] Failed to open excel workbook. '+ ex.description);
        }
      }

     /**
      * Saves the workbook.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.save( oWorkBook );</code>
      * @method  save
      * @throws  {Error}
      * @param   {Object} oWorkBook WorkBook
      * @path    ctx.excel.file.save
      */
      _file.save = function(oWorkBook) {
        ctx.notifyAction('ctx.excel.file.save');
        try{
          _excel.initialize();
          if (oWorkBook != null){
              oWorkBook.Save();
          } else {
            _workBook.Save();
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.save] Failed to save excel workbook. '+ ex.description);
        }
      }

     /**
      * Saves the workbook with another filename.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.saveAs( "C:\\Documents\\Backup\\Finance\\Balances\\Bal2014.xls" );</code>
      * @method  saveAs
      * @throws  {Error}
      * @param   {string} filename Filename
      * @param   {string} flFormat File format
      * @path    ctx.excel.file.saveAs
      */
      _file.saveAs = function(filename, flFormat) {
        ctx.notifyAction('ctx.excel.file.saveAs');
        try{
          if (flFormat==undefined)
            _workBook.SaveAs(filename);
          else{
            _workBook.SaveAs(filename, flFormat);
          }

        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.saveAs] Failed to save as Excel workbook. '+ ex.description);
        }
      }

      /**
       * Saves the workbook into a PDF file.
       * @description
       *  <wrap help> //Example://</wrap>
       *  <code javascript> ctx.excel.file.saveAsPDF( 0, "C:\Documents\Backup\Finance\Balances\Bal2014.pdf" );</code>
       * @method  saveAsPDF
       * @throws  {Error}
       * @param   {string} type File format. 0 is pdf, 1 is XPS.
       * @param   {string} [filename] The filename
       * @param   {Object|string} [vWorksheet] The worksheet
       * @path    ctx.excel.file.saveAsPDF
       */
      _file.saveAsPDF = function(type, filename, vWorksheet) {
        ctx.notifyAction('ctx.excel.file.saveAsPDF');
        try{
          if (vWorksheet == undefined){
            vWorksheet = _workBook.ActiveSheet;
          } else {
            vWorksheet = _workSheet = _excelApp.Worksheets(vWorksheet);
          }
          if (filename==undefined)
            vWorksheet.ExportAsFixedFormat(type);
          else{
            vWorksheet.ExportAsFixedFormat(type,filename);
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.saveAsPDF] Failed to save as PDF file. '+ ex.description);
        }
      }
 
     /**
      * Closes the current workbook.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.file.close( oWorkbook, 'true' );</code>
      * @method  close
      * @throws  {Error}
      * @param   {Object} [oWorkbook] oWorkbook
      * @param   {boolean} [bSave] (by default, ''false'')
      * @path    ctx.excel.file.close
      */
      _file.close = function(oWorkbook, bSave) {
        ctx.notifyAction('ctx.excel.file.close');
        try{
          _excel.initialize();
          if (bSave == undefined) {
            bSave = false;
          }
          if (typeof oWorkbook == "object") {
            if (bSave && !oWorkbook.Saved) {
              oWorkbook.Save();
              oWorkbook.Close();
            } else {
              oWorkbook.Close(bSave);
            }
          } else {
            if (bSave && !_workBook.Saved) {
              _workBook.Save();
              _workBook.Close();
            } else {
              _workBook.Close(bSave);
            }
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.close] Failed to close excel workbook. '+ ex.description);
        }
      }

     /**
      * @ignore  Tests KOs
      * Returns the workbook of the file if open.
      * @method  isOpen
      * @throws  {Error}
      * @param   {string} sFileName sFileName
      * @param   {string} sFilePath sFilePath
      * @return  {boolean}
      * @path    ctx.excel.file.isOpen
      */
      _file.isOpen = function(sFileName, sFilePath) {
        ctx.notifyAction('ctx.excel.file.isOpen');
        try{
          var fullName = _workBook.FullName;
          return fullName;

        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.isOpen] Failed to test if the excel workbook '+ +'is open. '+ ex.description);
        }
      }

     /**
      * Closes all the opens workbooks.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> var result = ctx.excel.file.closeAll( true );</code>
      * @method  isOpen
      * @throws  {Error}
      * @param   {boolean} bSave (by default, ''false'')
      * @return  {boolean}
      * @path    ctx.excel.file.closeAll
      */
      _file.closeAll = function(bSave) {
        ctx.notifyAction('ctx.excel.file.closeAll');

        try{
          _excel.initialize();
          if (bSave == undefined) {
            bSave = false;
          }
          //fill the _workbooks property
          _excel.getWorkbooks();
          
          if (bSave) {
            ctx.each(_workBooks, function(id, workBook) {
              workBook.Save();
              workBook.Close();
            });
          } else {
            ctx.each(_workBooks, function(id, workBook) {
              workBook.Close(bSave);
            });
          }
        } catch (ex){
          throw new Error(e.error.KO, '[ctx.excel.file.closeAll] Failed to close excel workbooks. '+ ex.description);
        }
				return true;
      }

    return _file;
  })();

 /**
  * Class gathering a set of worksheet functions
  * @class  ctx.excel.sheet
  * @path   ctx.excel.sheet
  * //@constructor
  */
  _excel.sheet = (function() {
    var _sheet = {};

     /**
    * Class gathering a set of formatting methods
    * @class  ctx.excel.sheet.formatter
    * @path   ctx.excel.sheet.formatter
    * //@constructor
    */
    _sheet.formatter = (function () {
      var _formatter = {};

      /**
      * Format a range as Bold on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontBold("A8:K30", true);</code>
      * @method  formatFontBold
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {boolean} boldValue True to apply Bold, false to remove Bold.
      * @path    ctx.excel.sheet.formatter.formatFontBold
      */
      _formatter.formatFontBold = function(rangeDefinition, boldValue){
        ctx.notifyAction('ctx.excel.sheet.formatter.formatFontBold');

        try {
          var rangeBuilder = new RangeBuilder(rangeDefinition);
          var excelFormatter = new ExcelFormatter(rangeBuilder);
          excelFormatter.addFormatFontBold(boldValue);
          excelFormatter.formatNow();
          excelFormatter.releaseComObjects();
          rangeBuilder = null;
          excelFormatter = null;
        } catch (ex) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontBold] Failed to format Bold. '+ ex.description);
        }
      };

      /**
      * Format the text of a range as Italic on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontItalic("A8:K30", true);</code>
      * @method  formatFontItalic
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {boolean} italicValue True to apply Italic, false to remove Italic.
      * @path    ctx.excel.sheet.formatter.formatFontItalic
      */
     _formatter.formatFontItalic = function(rangeDefinition, italicValue){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontItalic');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontItalic(italicValue);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontItalic] Failed to format Italic. '+ ex.description);
      }
    };

    /**
      * Underline the text of a range on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontUnderline("A8:K30", e.excel.XlUnderlineStyle.xlUnderlineStyleSingle);</code>
      * @method  formatFontUnderline
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {e.excel.XlUnderlineStyle} [underlineStyle] Use e.excel.XlUnderlineStyle to chose a style. The default is XlUnderlineStyle.xlUnderlineStyleSingle.   
      * @path    ctx.excel.sheet.formatter.formatFontUnderline
      */
     _formatter.formatFontUnderline = function(rangeDefinition, underlineStyle){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontUnderline');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);

        var underlineToUse = underlineStyle;
        if(!underlineStyle)
          underlineToUse = e.excel.XlUnderlineStyle.xlUnderlineStyleSingle;

        excelFormatter.addFormatFontUnderline(underlineToUse);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontUnderline] Failed to format underline. '+ ex.description);
      }
    };

    /**
      * Format the text of a range as Strikethrough on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontStrikethrough("A8:K30", true);</code>
      * @method  formatFontStrikethrough
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {boolean} strikethroughValue True to apply strikethrough, false to remove it.
      * @path    ctx.excel.sheet.formatter.formatFontStrikethrough
      */
     _formatter.formatFontStrikethrough = function(rangeDefinition, strikethroughValue){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontStrikethrough');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontStrikethrough(strikethroughValue);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontStrikethrough] Failed to apply strikethrough. '+ ex.description);
      }
    };

      /**
      * Format the text of a range as subscript on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontSubscript("A8:K30", true);</code>
      * @method  formatFontSubscript
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {boolean} subscriptValue True to apply subscript, false to remove it.
      * @path    ctx.excel.sheet.formatter.formatFontSubscript
      */
     _formatter.formatFontSubscript = function(rangeDefinition, subscriptValue){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontSubscript');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontSubscript(subscriptValue);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontSubscript] Failed to apply subscript. '+ ex.description);
      }
    };

      /**
      * Format the text of a range as superscript on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontSuperscript("A8:K30", true);</code>
      * @method  formatFontSuperscript
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {boolean} superscriptValue True to apply superscript, false to remove it.
      * @path    ctx.excel.sheet.formatter.formatFontSuperscript
      */
     _formatter.formatFontSuperscript = function(rangeDefinition, superscriptValue){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontSuperscript');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontSuperscript(superscriptValue);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontSuperscript] Failed to apply superscript. '+ ex.description);
      }
    };

      /**
      * Change the fontsize of the text of a range on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontSize("A8:K30", 16);</code>
      * @method  formatFontSize
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {number} fontSizeValue size of the font to apply
      * @path    ctx.excel.sheet.formatter.formatFontSize
      */
     _formatter.formatFontSize = function(rangeDefinition, fontSizeValue){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontSize');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontSize(fontSizeValue);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontSize] Failed to change font size. '+ ex.description);
      }
    };

      /**
      * Change the alignment of the text of a range on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatAlignment("A8:K30", e.excel.XlHAlign.xlHAlignRight);</code>
      * @method  formatAlignment
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {e.excel.XlHAlign} alignmentType alignment Type. Use the list in e.excel.XlHAlign to perform your selection.
      * @path    ctx.excel.sheet.formatter.formatAlignment
      */
     _formatter.formatAlignment = function(rangeDefinition, alignmentType){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatAlignment');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatAlignement(alignmentType);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatAlignment] Failed to change the alignment. '+ ex.description);
      }
    };

      /**
      * Change the background color of a range on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatBackgroundColor("A8:K30", [255, 120, 0]);</code>
      * @method  formatBackgroundColor
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {Array} colorToApply array containing 3 values following RGB. Each value can be between 0 and 255.
      * e.color.rgb can be used to select predefined colors.
      * @path    ctx.excel.sheet.formatter.formatBackgroundColor
      */
     _formatter.formatBackgroundColor = function(rangeDefinition, colorToApply){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatBackgroundColor');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatBackgroundColor(colorToApply);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatBackgroundColor] Failed to change the background color of the cells. '+ ex.description);
      }
    };

      /**
      * Change the font color of a range on the active sheet.
      * @description
      *  <wrap help> //Example://</wrap>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontColor("A8:K30", [255, 120, 0]);</code>
      *  <code javascript> ctx.excel.sheet.formatter.formatFontColor("A8:K30", e.color.rgb.black);</code>
      * @method  formatFontColor
      * @throws  {Error}
      * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
      * @param   {e.color.rgb|Array<number>} colorToApply array containing 3 values following RGB. Each value can be between 0 and 255.
      * e.color.rgb can be used to select predefined colors.
      * @path    ctx.excel.sheet.formatter.formatFontColor
      */
     _formatter.formatFontColor = function(rangeDefinition, colorToApply){
      ctx.notifyAction('ctx.excel.sheet.formatter.formatFontColor');

      try {
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        var excelFormatter = new ExcelFormatter(rangeBuilder);
        excelFormatter.addFormatFontColor(colorToApply);
        excelFormatter.formatNow();
        excelFormatter.releaseComObjects();
        rangeBuilder = null;
        excelFormatter = null;
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.formatter.formatFontColor] Failed to change the color of the cells. '+ ex.description);
      }
    };

      return _formatter;
    }());

   /**
    * Adds a worksheet to the workbook.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.add( "June2014" );</code>
    * @method  add
    * @throws  {Error}
    * @param   {string} sheetname Sheetname
    * @path    ctx.excel.sheet.add
    */
    _sheet.add = function(sheetname) {
      ctx.notifyAction('ctx.excel.sheet.add');
      try{
        _excel.initialize();
        _workSheet = _excelApp.Worksheets.Add();
        if (sheetname != undefined){
          _workSheet.Name = sheetname;
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.add] Failed to add sheet to excel workbook. '+ ex.description);
      }
    }

   /**
    * Removes worksheet from the workbook.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.remove( "April" );</code>
    * @method  remove
    * @throws  {Error}
    * @param   {string} worksheet Sheetname
    * @path    ctx.excel.sheet.remove
    */
    _sheet.remove = function(worksheet) {
      ctx.notifyAction('ctx.excel.sheet.remove');
      try{
        if (worksheet == undefined){
          worksheet = _workBook.ActiveSheet;
          _excelApp.DisplayAlerts = false;
          worksheet.Delete();
          _excelApp.DisplayAlerts = true;
        } else{
          _excelApp.DisplayAlerts = false;
          _excelApp.Worksheets(worksheet).Delete();
          _excelApp.DisplayAlerts = true;
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.remove] Failed to remove sheet from excel workbook. '+ ex.description);
      }
    }

    /**
     * Move worksheet in the same workbook.
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript> ctx.excel.sheet.move( "workSheet", "Sheet1", "Sheet2" );</code>
     * @method  move
     * @throws  {Error}
     * @param   {string} oWorksheet Moved sheetname
     * @param   {string} [before] Worksheet sheetname
     * @param   {string} [after] Worksheet sheetname
     * @path    ctx.excel.sheet.move
     */
    _sheet.move = function (oWorksheet, before, after) {
      ctx.notifyAction('ctx.excel.sheet.move');
      try {
        if (typeof oWorksheet != "object") {
          if (after != undefined && before == undefined) {

            _excelApp.Worksheets(oWorksheet).Move(null, _excelApp.Worksheets(after));
            _excelApp.Worksheets.Save();
          }
          else if (before != undefined && after == undefined) {
            _excelApp.Worksheets(oWorksheet).Move(_excelApp.Worksheets(before), null);
            _excelApp.Worksheets.Save();
          }
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.move] Failed to move worksheet .' + ex.description);
      }
    }

   /**
    * Renames a worksheet from the workbook.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.rename( "April2013", "April2014" );</code>
    * @method  remame
    * @throws  {Error}
    * @param   {string} oldName oldName
    * @param   {string} newName newName
    * @path    ctx.excel.sheet.remame
    */
    _sheet.rename = function(oldName, newName) {
      ctx.notifyAction('ctx.excel.sheet.remame');
      try{
        _excel.initialize();
        _workSheet = _excelApp.Worksheets(oldName);
        _workSheet.Name = newName;
        _workBook.Save();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.rename] Failed to rename sheet to excel workbook. '+ ex.description);
      }
    }

   /**
    * Activates a worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.activate( "April2014" );</code>
    * @method  activate
    * @throws  {Error}
    * @param   {string} sheetname Sheetname
    * @path    ctx.excel.sheet.activate
    */
    _sheet.activate = function(sheetname) {
      ctx.notifyAction('ctx.excel.sheet.activate');
      try{
        _excel.initialize();
        _workSheet = _excelApp.Worksheets(sheetname);
        _workSheet.Activate();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.activate] Failed to activate sheet to excel workbook. '+ ex.description);
      }
    }

   /**
    * @ignore  Not implemented!
    * Gets the active worksheet
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.getActive( );</code>
    * @method  getActive
    * @throws  {Error}
    * @return  {Object} The active sheet
    * @path    ctx.excel.sheet.getActive
    */
    _sheet.getActive = function() {
      ctx.notifyAction('ctx.excel.sheet.getActive');
      // todo _ExcelSheetNameGet
      throw new Error(e.error.NotImplemented, '[ctx.excel.sheet.getActive] not implemented');
    }

   /**
    * Gets a list of worksheets.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var sheetList = ctx.excel.sheet.getList( );</code>
    * @method  getList
    * @throws  {Error}
    * @return  {Object} List of worksheet names
    * @path    ctx.excel.sheet.getList
    */
    _sheet.getList = function() {
      ctx.notifyAction('ctx.excel.sheet.getList');
      try{
        _excel.initialize();
        var iSheetCount = _workBook.Sheets.Count;
        var aSheetsNames = new Array;
        for (var iIndex=0; iIndex<iSheetCount;iIndex++){
          aSheetsNames[iIndex] = _workBook.Sheets(iIndex + 1).Name;
        }
        return aSheetsNames;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getList] Failed to get the list of sheets of excel workbook. '+ ex.description);
      }
    }

   /**
    * Gets a cell from the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var value = ctx.excel.sheet.getCell( 3, 4 );</code>
    * @method  getCell
    * @throws  {Error}
    * @param   {number} row The row number or string
    * @param   {number} [col] The col number
    * @param   {Object|string} [vWorksheet] The worksheet
    * @return  {Object|string|number} The content of the cell
    * @path    ctx.excel.sheet.getCell
    */
    _sheet.getCell = function(row, col, vWorksheet) {
      ctx.notifyAction('ctx.excel.sheet.getCell');
      try{
        _excel.initialize();
        if (typeof vWorksheet != "object" ){
          if (vWorksheet == undefined){
            vWorksheet = _workBook.ActiveSheet;
          } else {
            vWorksheet = _workSheet = _excelApp.Worksheets(vWorksheet);
          }
        }
        var result;
        if(vWorksheet == undefined || row == undefined){
          throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell.');
        } else {
          if(typeof row == 'number'){
            if(col == undefined){
              throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell.');
            } else {
              result = vWorksheet.Cells(row, col).Value;
            }
          } else if(typeof row == 'string'){
            result = vWorksheet.Range(row).Value;
          } else {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell with the given parameters.');
          }
        }
        return result;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to get the content of cell in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets a value to the Cell in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setCell( 3, 4, "TestSetCell" );</code>
    * @method  setCell
    * @throws  {Error}
    * @param   {number} row The row number
    * @param   {number} col The col number
    * @param   {string} value The value to set
    * @param   {Object|string} [vWorksheet] The worksheet
    * @path    ctx.excel.sheet.setCell
    */
    _sheet.setCell = function(row, col, value, vWorksheet) {
      ctx.notifyAction('ctx.excel.sheet.setCell');
      try{
        _excel.initialize();
        if (typeof vWorksheet != "object" ){
          if (vWorksheet == undefined){
            vWorksheet = _workBook.ActiveSheet;
          } else{
            vWorksheet = _workSheet = _excelApp.Worksheets(vWorksheet);
          }
        }

        if(_workBook == undefined || row == undefined){
          throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell.');
        } else {
          if(typeof row == 'number'){
            if(col == undefined){
              throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell.');
            } else {
              vWorksheet.Cells(row, col).Value = value;
            }
          } else if(typeof row == 'string'){
            vWorksheet.Range(row).Value = value;
          } else {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getCell] Failed to find the cell with the given parameters.');
          }
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setCell] Failed to set the content of cell in excel workbook. '+ ex.description);
      }
    }


   /**
    * Group a range from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.setRangeGroup( 'A1:I8', 'January2014', 'Bal2014' );</code>
    * @method  setRangeGroup
    * @throws  {Error}
    * @param   {string} range
    * @param   {Object} [vWorksheet] The worksheet
    * @param   {Object} [oWorkbook] The workbook
    * @return  {boolean} true/false
    * @path    ctx.excel.sheet.setRangeGroup
    */
    _sheet.setRangeGroup = function(range, vWorksheet, oWorkbook) {
      ctx.notifyAction('ctx.excel.sheet.setRangeGroup');
      try{
        _excel.initialize();
        var result;
        if (typeof oWorkbook == "object" ) {
          if (typeof vWorksheet != "object" ){
              vWorksheet = oWorkbook.WorkSheets.Item(vWorksheet);
          }
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeGroup] Failed to find the workbook.');
          }
          result = vWorksheet.Range(range).Row.Group();
        } else {
          //Work with _workBook & _workSheet
          vWorksheet = _workSheet = _workBook.ActiveSheet;
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeGroup] Failed to find the workbook.');
          }
          result = _workSheet.Range(range).Group();
        }
        return result;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeGroup] Failed to group range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Ungroup a range from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.setRangeUnGroup( 'A1:I8', 'January2014', 'Bal2014' );</code>
    * @method  setRangeUnGroup
    * @throws  {Error}
    * @param   {string} range
    * @param   {Object} [vWorksheet] The worksheet
    * @param   {Object} [oWorkbook] The workbook
    * @return  {boolean} true/false
    * @path    ctx.excel.sheet.setRangeUnGroup
    */
    _sheet.setRangeUnGroup = function(range, vWorksheet, oWorkbook) {
      ctx.notifyAction('ctx.excel.sheet.setRangeUnGroup');
      try{
        _excel.initialize();
        var result;
        if (typeof oWorkbook == "object" ) {
          if (typeof vWorksheet != "object" ){
              vWorksheet = oWorkbook.WorkSheets.Item(vWorksheet);
          }
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeUnGroup] Failed to find the workbook.');
          }
          result = vWorksheet.Range(range).Ungroup();
        } else {
          //Work with _workBook & _workSheet
          vWorksheet = _workSheet = _workBook.ActiveSheet;
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeUnroup] Failed to find the workbook.');
          }
          result = _workSheet.Range(range).Ungroup();
        }
        return result;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeUnGroup] Failed to ungroup range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Gets the values of a range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var rangeValues = ctx.excel.sheet.getRangeValues( 'A1:I8', 'January2014', 'Bal2014' );</code>
    * @method  getRangeValues
    * @ignore Deprecated, use getValuesFromRangeDefinition instead
    * @throws  {Error}
    * @param   {string} range The range of cells we work with
    * @param   {Object} [vWorksheet] The worksheet
    * @param   {Object} [oWorkbook] The workbook
    * @return  {Object} The values of the range given in the parameters
    * @path    ctx.excel.sheet.getRangeValues
    */
    _sheet.getRangeValues = function(range, vWorksheet, oWorkbook) {
      ctx.notifyAction('ctx.excel.sheet.getRangeValues');
      try{
        _excel.initialize();
        var oRangeValues;
        if (typeof oWorkbook == "object" ) {
          if (typeof vWorksheet != "object" ){
              vWorksheet = oWorkbook.WorkSheets.Item(vWorksheet);
          }
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getRangeValues] Failed to find the workbook.');
          }
          oRangeValues = vWorksheet.Range(range).Value;
        } else {
          //Work with _workBook & _workSheet
          vWorksheet = _workSheet = _workBook.ActiveSheet;
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getRangeValues] Failed to find the workbook.');
          }
          oRangeValues = _workSheet.Range(range).Value;
        }
        return oRangeValues;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getRangeValues] Failed to get range in excel workbook. '+ ex.description);
      }
    }


   /**
    * Gets the formulas of a range from a specific range of the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var rangeFormulas = ctx.excel.sheet.getFullRangeFormulas( 'A', 1, 'I', 8, '' );</code>
    * @method  getFullRangeFormulas
    * @throws  {Error}
    * @param   {string} startColumn The start column of the range
    * @param   {number} startRow The start row of the range
    * @param   {string} lastColumn The last column of the range
    * @param   {number} lastRow The last row of the range
    * @param   {string} [defaultValueOrFormula] The default value of formula to fill the undefined cells
    * @return  {Object} The formulas of the range given in the parameters
    * @path    ctx.excel.sheet.getFullRangeFormulas
    */
    _sheet.getFullRangeFormulas = function(startColumn, startRow, lastColumn, lastRow, defaultValueOrFormula) {
      ctx.notifyAction('ctx.excel.sheet.getFullRangeFormulas');

        var rangeDefinition = startColumn + ";" + startRow + ";" + lastColumn + ";" + lastRow;
        var formulasToReturn = _getFormulaOrValueFromRange(rangeDefinition, defaultValueOrFormula, true, '[ctx.excel.sheet.getFullRangeFormulas]');
        return formulasToReturn;
    }


    /**
    * Gets the values of a range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var rangeValues = ctx.excel.sheet.getValuesFromRangeDefinition("A1:I8", '');</code>
    * @method  getValuesFromRangeDefinition
    * @throws  {Error}
    * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
    * @param   {string} [defaultValue] The default value to fill the undefined cells
    * @return  {Object} The values of the range given in the parameters
    * @path    ctx.excel.sheet.getValuesFromRangeDefinition
    */
    _sheet.getValuesFromRangeDefinition = function(rangeDefinition, defaultValue){
      ctx.notifyAction('ctx.excel.sheet.getValuesFromRangeDefinition');

      var valuesToReturn =_getFormulaOrValueFromRange(rangeDefinition, defaultValue, false, '[ctx.excel.sheet.getValuesFromRangeDefinition]');
      return valuesToReturn;
    }

    /**
    * Gets the formulas of a range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var rangeFormulas = ctx.excel.sheet.getFormulasFromRangeDefinition("A1:I8", '');</code>
    * @method  getFormulasFromRangeDefinition
    * @throws  {Error}
    * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
    * @param   {string} [defaultValueOrFormula] The default value or formula to fill the undefined cells
    * @return  {Object} The formulas of the range given in the parameters
    * @path    ctx.excel.sheet.getFormulasFromRangeDefinition
    */
   _sheet.getFormulasFromRangeDefinition = function(rangeDefinition, defaultValueOrFormula){
    ctx.notifyAction('ctx.excel.sheet.getFormulasFromRangeDefinition');

    var formulasToReturn = _getFormulaOrValueFromRange(rangeDefinition, defaultValueOrFormula, true, '[ctx.excel.sheet.getFormulasFromRangeDefinition]');
    return formulasToReturn;
  }

   /**
    * Gets the values of a range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var rangeValues = ctx.excel.sheet.getFullRangeValues( 'A', 1, 'I', 8, '' );</code>
    * @method  getFullRangeValues
    * @throws  {Error}
    * @param   {string} stcol The start column
    * @param   {number} strow The start row
    * @param   {string} ltcol The last column
    * @param   {number} ltrow The last row
    * @param   {string} [defaultval] The default value to fill the Undefined cells
    * @return  {Object} The values of the range given in the parameters
    * @path    ctx.excel.sheet.getFullRangeValues
    */
   _sheet.getFullRangeValues = function(stcol,strow, ltcol,ltrow, defaultval) {
    ctx.notifyAction('ctx.excel.sheet.getFullRangeValues');
    function translateCodeForExcel(code){
      //
      /** Description
        Cette fonction permet de vérifier si les lettres récupérées précédemment font parties de l'alphabet
      */
      function verifyLetters(obj, alphabet){
        for(var i = 0; i < obj["letters"].length; i++){
          if(!(obj["letters"][i] in alphabet)){
            obj["rightLetters"] = false;
            break;
          }
        }
      }
      //
      function getLettersAndNumbers(code, alphabet){
        var obj = {letters: "", numbers: "", colonne: "", ligne: "", message: "", rightLetters: true};
        for(var i=code.length-1; i >= 0; i--){
          if(isNaN(code[i])){
            if(i == code.length-1){
              obj.message = "Coordonnée incorrecte : il n'y a pas de chiffres"
              break;
            } else {
              obj.ligne = obj.numbers = parseInt(code.substring(i+1),10);
              obj.letters = obj.colonne = code.substring(0,i+1);
              verifyLetters(obj, alphabet);
              break;
            }
          } else if(!isNaN(code[i]) && i == 0){
            obj.message = "Coordonnée incorrecte : il n'y a pas de lettres";
            break;
          }
        }
        return obj;
      }
      //

      function lettersToNumber(obj, alphabet){
        var temp = 0;
        for(var i = 0; i < obj["letters"].length; i++){
          temp += (alphabet[obj["letters"][obj["letters"].length-1-i]]) * Math.pow(26,i);
        }
        obj["colonne"] = temp;
      }

      try{
        var valLettre = {"A":1,"B":2,"C":3,"D":4,"E":5,"F":6,"G":7,"H":8,"I":9,"J":10,"K":11,"L":12,"M":13,"N":14,"O":15,"P":16,"Q":17,"R":18,"S":19,"T":20,"U":21,"V":22,"W":23,"X":24,"Y":25,"Z":26};
        var translate = {};
        if(code != undefined){
          translate = getLettersAndNumbers(code, valLettre);
          //Si le code est conforme au format attendu ET que l'on a bien à faire à des lettres de l'alphabet, alors on peut continuer en transformant les lettres en chiffres
          if(translate["message"] == "" && translate["rightLetters"]){
            lettersToNumber(translate, valLettre);
          }
        } else {
          translate.message = "Il n'est pas possible de transformer ce code";
        }
        return translate;
      } catch(err){
        ctx.log("Une erreur est apparue lors de la transformation des lettres en chiffre");
        return null;
      }
    }

    
    function needsToBeReplacedByDefaultValue(value){
      var valueType = typeof(value);
      if(!value && value !==0 && value !== false && valueType !== 'date'){
        return true;
      }    

      return false;
    }

    try{
      var infodeb = translateCodeForExcel(stcol+strow);
      var infofin = translateCodeForExcel(ltcol+ltrow);

      var range = '';
      _excel.initialize();
      var oRangeValues = [];
      _workSheet = _workBook.ActiveSheet;
      for (var index = 0; index <= (ltrow-strow); index++) {
        //ligne traitee
        var line =strow+index;

        range = stcol+line+':'+ltcol+line;
        var rng = _workSheet.Range(range).Value;
        //ctx.log(':'+typeof(rng))
        if (typeof(rng)=='unknown'){
          rng = rng.toArray();
          // for (var index2 in rng) {
          //   var row = index+1;
          //   var col = parseInt(index2,10)+1;
          //   ctx.log('cell('+row+','+col+'): '+rng[index2]);
          // }
          for (var indks = 0; indks<=(infofin['colonne']-infodeb['colonne']); indks++){
            if(needsToBeReplacedByDefaultValue(rng[indks])){
              rng[indks]=defaultval;
              //ctx.log('missed index:'+indks);
            }
          }
        }
        oRangeValues.push(rng);
      }
      return oRangeValues;
    } catch (ex){
      throw new Error(e.error.KO, '[ctx.excel.sheet.getFullRangeValues] Failed to get range in excel workbook. '+ ex.description);
    }
  }


    var _getFormulaOrValueFromRange = function (rangeDefinition, defaultValueOrFormula, returnFormula, jsMethodName){

      try{

        function needsToBeReplacedByDefaultValue(value){
          var valueType = typeof(value);
          if(!value && value !==0 && value !== false && valueType !== 'date'){
            return true;
          }    
    
          return false;
        }    

        _excel.initialize();
        _workSheet = _workBook.ActiveSheet;

        //var cellTopLeft = createCell(startRow, startColumn);
        //var cellBottomRight = createCell(lastRow, lastColumn);
        
        var rangeBuilder = new RangeBuilder(rangeDefinition);

        if(!rangeBuilder.hasRange()){
          throw new Error(e.error.KO, jsMethodName + " the input parameters don't correspont to a valid range.");
        }
        
        var comRange = rangeBuilder.getRange();

        var valueVariantArray;        
        var columnCount = comRange.Columns.Count;
        var rowCount = comRange.Rows.Count ;

        if(returnFormula){
          valueVariantArray = comRange.Formula;
        }
        else{
          valueVariantArray = comRange.Value;
        }
          
        switch (typeof(valueVariantArray)) {
          case "string":
          case "number":
              if(!valueVariantArray && valueVariantArray !==0)
                valueJSResult = defaultValueOrFormula;
              else
                valueJSResult = valueVariantArray;
            break;
          case "boolean":
            valueJSResult = valueVariantArray;
            break;
          case "date":
            valueJSResult = new Date(valueVariantArray);
            break;
          case "undefined":
              valueJSResult = defaultValueOrFormula;
            break;
            
          default:
              var valueJsArray1D = valueVariantArray.toArray();
              valueVariantArray = null; //release the array of variant for memory optimisation
              var valueJSResult = new Array();
      
              for (var indexColumn = 0; indexColumn < columnCount; indexColumn++) {          
                for (var indexRow = 0; indexRow < rowCount; indexRow++) {
      
                  if(indexColumn == 0){
                    valueJSResult.push([]);
                  }

                  var currentIndexInTheArray = indexColumn * rowCount + indexRow;
                  var currentValue = valueJsArray1D[currentIndexInTheArray];
                  if(needsToBeReplacedByDefaultValue(currentValue)){
                    valueJSResult[indexRow].push(defaultValueOrFormula);
                  }
                  else{
                    switch(typeof(currentValue)){
                      case "date":
                        try {
                          //convert Excel date as Javascript Date
                          valueJSResult[indexRow].push(new Date(currentValue));  
                        } catch (error) {
                          valueJSResult[indexRow].push(currentValue);
                        }  
                      break;
                      default:
                        valueJSResult[indexRow].push(currentValue);
                      break;
                    }                                        
                  }
                }
              }
            break;
          }
        
        //release comObject
        valueVariantArray = null;
        rangeBuilder.releaseComObjects();
        rangeBuilder = null;
        comRange = null;

        return valueJSResult;

      } catch (ex){
        throw new Error(e.error.KO, jsMethodName + ' failed to get range in excel workbook. '+ ex.description);
      }
    }
   /**
    * Sets the values of a range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setFullRangeValues('A', 1, values, false);</code>
    * @method  setFullRangeValues
    * @throws  {Error}
    * @param   {string} stcol The start column
    * @param   {number} strow The start row
    * @param   {Object} values Range given in the parameters
    * @param   {boolean} [withHeader] If ''true'' sets the keys of the object as header of the table
    * @path    ctx.excel.sheet.setFullRangeValues
    */
    _sheet.setFullRangeValues = function(stcol,strow, values, withHeader) {
      ctx.notifyAction('ctx.excel.sheet.setFullRangeValues');
      function translateCodeForExcel(code){
        //
        /** Description
          Cette fonction permet de vérifier si les lettres récupérées précédemment font parties de l'alphabet
        */
        function verifyLetters(obj, alphabet){
          for(var i = 0; i < obj["letters"].length; i++){
            if(!(obj["letters"][i] in alphabet)){
              obj["rightLetters"] = false;
              break;
            }
          }
        }
        //
        function getLettersAndNumbers(code, alphabet){
          var obj = {letters: "", numbers: "", colonne: "", ligne: "", message: "", rightLetters: true};
          for(var i=code.length-1; i >= 0; i--){
            if(isNaN(code[i])){
              if(i == code.length-1){
                obj.message = "Coordonnée incorrecte : il n'y a pas de chiffres"
                break;
              } else {
                obj.ligne = obj.numbers = parseInt(code.substring(i+1),10);
                obj.letters = obj.colonne = code.substring(0,i+1);
                verifyLetters(obj, alphabet);
                break;
              }
            } else if(!isNaN(code[i]) && i == 0){
              obj.message = "Coordonnée incorrecte : il n'y a pas de lettres";
              break;
            }
          }
          return obj;
        }
        //

        function lettersToNumber(obj, alphabet){
          var temp = 0;
          for(var i = 0; i < obj["letters"].length; i++){
            temp += (alphabet[obj["letters"][obj["letters"].length-1-i]]) * Math.pow(26,i);
          }
          obj["colonne"] = temp;
        }
        try{
          var valLettre = {"A":1,"B":2,"C":3,"D":4,"E":5,"F":6,"G":7,"H":8,"I":9,"J":10,"K":11,"L":12,"M":13,"N":14,"O":15,"P":16,"Q":17,"R":18,"S":19,"T":20,"U":21,"V":22,"W":23,"X":24,"Y":25,"Z":26};
          var translate = {};
          if(code != undefined){
            translate = getLettersAndNumbers(code, valLettre);
            //Si le code est conforme au format attendu ET que l'on a bien à faire à des lettres de l'alphabet, alors on peut continuer en transformant les lettres en chiffres
            if(translate["message"] == "" && translate["rightLetters"]){
              lettersToNumber(translate, valLettre);
            }
          } else {
            translate.message = "Il n'est pas possible de transformer ce code";
          }
          return translate;
        } catch(err){
          ctx.log("Une erreur est apparue lors de la transformation des lettres en chiffre");
          return null;
        }
      }
      try{
        if (typeof(withHeader) != 'boolean'){
            withHeader = false;
        }
        var infodeb = translateCodeForExcel(stcol+strow);
        _excel.initialize();
        _workSheet = _workBook.ActiveSheet;
        var tabTemp = [];
        var rowTemp =[];
        if(typeof(values)=='object'){

           
          var i=0, j=0;

          var currentScreenUpdate = _excelApp.ScreenUpdating;
          _excelApp.ScreenUpdating = false;
          try {
            ctx.each(values, function(keyI, valueI){
              j=0;
              if (valueI instanceof Object){
                ctx.each(valueI, function(key, valueJ){
                  if (key!='ctxType' && key!='ctxName'){
                    var col = parseInt(infodeb['colonne'],10)+ parseInt(j,10);
                    var row = parseInt(strow,10) + parseInt(i,10);
                    if(keyI==0 && withHeader){
                      _workSheet.Cells(1, col).Value = key;
                      _workSheet.Cells(1, col).Interior.ColorIndex = 4;
                      _workSheet.Cells(1, col).Font.Bold = true;
                    }
                    _workSheet.Cells(row, col).Value = valueJ;
                    rowTemp[j] = valueJ;
                    j++;
                  }
                });
              } else {
                var colSingle = parseInt(infodeb['colonne'],10);
                var rowSingle = parseInt(strow,10) + parseInt(keyI,10);
                
                if(keyI==0 && withHeader){
                  _workSheet.Cells(rowSingle, colSingle).Interior.ColorIndex = 4;
                  _workSheet.Cells(rowSingle, colSingle).Font.Bold = true;
                }

                _workSheet.Cells(rowSingle, colSingle).Value = valueI;
              }
              tabTemp[i]=rowTemp;
              i++;
          });

            _excelApp.ScreenUpdating = currentScreenUpdate;
          } catch (error) {            
            _excelApp.ScreenUpdating = currentScreenUpdate;
            throw error;
          }
          

        } else {
          var col = parseInt(infodeb['colonne'],10);
          var row = parseInt(strow,10);
          _workSheet.Cells(row, col).Value = values;
        }
        return;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setFullRangeValues] Failed to set range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Gets the range positions of cells.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var range = ctx.excel.sheet.getRangePositions( 'A1:I8' );</code>
    * @method  getRangePositions
    * @throws  {Error}
    * @param   {string} range The range of cells we work with
    * @return  {Object} The range positions object given in the parameters
    * @path    ctx.excel.sheet.getRangePositions
    */
    _sheet.getRangePositions = function(range) {
      ctx.notifyAction('ctx.excel.sheet.getRangePositions');
      try{
        _excel.initialize();
        var expreg = /[A-Z]+|\d+/g
        var tmp = range.match(expreg);
        var oPositions = {};
        var startCol = false;
        var startRow = false;
        for (var i in tmp) {
          if (i != 'index'&& i !='input' && i != 'lastIndex'){
            i = parseInt(i,10);
            var value = tmp[i].trim();

            var expregString = /[A-Z]+/g
            var expregNumber = /\d+/g
            var tmp1 = value.match(expregNumber);
            var tmp2 = value.match(expregString);
            if (tmp1!=null){
              value = parseInt(value,10);
            }

            switch (typeof(value)) {
              case 'string':
              {
                if(!startCol){
                  oPositions.startCol = value;
                  startCol = true;
                } else {
                  oPositions.lastCol = value;
                }
                break;
              }
              case 'number':
              {
                if(!startRow){
                  oPositions.startRow = value;
                  startRow = true;
                } else {
                  oPositions.lastRow = value;
                }
                break;
              }
              default:
              {
                break;
              }
            }
          }
        }
        return oPositions;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getRangePositions] Failed to get range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets the range of cells from a given range values.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setRangeValues( 'A1:E5', range, 'Bal2014' );</code>
    * @method  setRangeValues
    * @throws  {Error}
    * @param   {string} range The range of cells that will be set
    * @param   {Object} values The range values we use to set
    * @param   {Object} [vWorksheet] The worksheet
    * @param   {Object} [oWorkbook] The workbook
    * @path    ctx.excel.sheet.setRangeValues
    */
    _sheet.setRangeValues = function(range, values, vWorksheet, oWorkbook) {
      ctx.notifyAction('ctx.excel.sheet.setRangeValues');
      try{
        _excel.initialize();

        if (oWorkbook != undefined && typeof oWorkbook == "object" ) {
          if (vWorksheet != undefined && typeof vWorksheet != "object"   ){
              vWorksheet = oWorkbook.WorkSheets.Item(vWorksheet);
          }
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeValues] Failed to find the workbook.');
          }
        } else {

          if (typeof vWorksheet == "string" && vWorksheet != undefined){
              vWorksheet = _workBook.WorkSheets.Item(vWorksheet);
          } else {
            vWorksheet = _workBook.ActiveSheet;
          }
        }
        if (vWorksheet == undefined || range == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeValues] Failed to find the workbook.');
        }
        vWorksheet.Range(range).Value = values;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeValues] Failed to set range values in excel workbook. '+ ex.description);
      }
    }

    /**
    * Remove duplicated items in the specified range
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.removeDuplicated( 'A1:E25', 'D' );</code>
    * @method  removeDuplicated
    * @throws  {Error}
    * @param   {string} rangeDefinition The definition of the range of cells.   "A;5;G;67" or "1;5;7;67" or "A5:G67" for a range. A;8 or 1;8 or A8 for a single cell.
    * @param   {string|number} onWhichColumn The name of the column to identify the duplicated values. For instance : "G" or 7.  
    * @path    ctx.excel.sheet.removeDuplicated
    */
    _sheet.removeDuplicated = function(rangeDefinition, onWhichColumn){
      //https://docs.microsoft.com/en-us/office/vba/api/excel.range.removeduplicates
      
      var range;

      try {
        var columnToFilterAsInt;
        switch (typeof(onWhichColumn)) {
          case "number":
            columnToFilterAsInt = onWhichColumn;
            break;
          case "string":
            var rangeUtilities = new RangeUtilities();
            columnToFilterAsInt = rangeUtilities.getColumnIndexFromLetter(onWhichColumn);
            if(columnToFilterAsInt==null)
              throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Invalid parameter onWhichColumn. The input parameter was ' + onWhichColumn);
            break;
          default:
              throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Invalid parameter onWhichColumn. The input parameter was ' + onWhichColumn);
        }
  
        var rangeBuilder = new RangeBuilder(rangeDefinition);
        if(!rangeBuilder.hasMonoRange)
          throw new Error(e.error.KO, '[ctx.excel.sheet.removeDuplicated] A range multi areas is not supported.)');
  
        var monoRangeAddress = rangeBuilder.getRangeAddress();
        var rangeUtilities = new RangeUtilities();
        var matchMapping = rangeUtilities.matchRangeExpressionAuto(monoRangeAddress);
  
        if(matchMapping.type === rangeUtilities.rangeExpressionType.monoCell) //no duplicated in a mono cell
          return;
  
        var startColumnOfTheRange = rangeUtilities.getColumnIndexFromLetter(matchMapping.matchResult[1]);        
        var endColumnOfTheRange = rangeUtilities.getColumnIndexFromLetter(matchMapping.matchResult[3]);
        var sizeOfTheRange = endColumnOfTheRange - startColumnOfTheRange + 1;

        var onWhichColumnWithOffset = columnToFilterAsInt - startColumnOfTheRange + 1;

        if(sizeOfTheRange < onWhichColumnWithOffset)
          throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Error during the remove Duplicated process, the onWhichColumn parameter is out of the range. The input parameter were rangeDefinition=' + rangeDefinition + " , onWhichColumn=" + onWhichColumn);

        range = rangeBuilder.getRange();
        try {
          if(range)
          {
            range.RemoveDuplicates(onWhichColumnWithOffset);
            rangeBuilder.releaseComObjects();
            rangeBuilder = null;
            range = null;
            CollectGarbage();
          }
          else{
            throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Error during the remove Duplicated process, the onWhichColumn parameter is out of the range. The input parameter were rangeDefinition=' + rangeDefinition + " , onWhichColumn=" + onWhichColumn);
          }           

        } catch (error) {
          throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Error during the remove Duplicated process. The input parameter were rangeDefinition=' + rangeDefinition + " , onWhichColumn=" + onWhichColumn);          
        }
        
        range=null;
      } catch (error) {
        throw new Error(e.error.InvalidArgument, '[ctx.excel.sheet.removeDuplicated] Error during the remove Duplicated process. The input parameter were rangeDefinition=' + rangeDefinition + " , onWhichColumn=" + onWhichColumn);
      }     
    }    

   /**
    * Gets the range of cells from a given workbook/worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var range = ctx.excel.sheet.getRange( 'A1:I8', 'January2014', 'Bal2014' );</code>
    * @method  getRange
    * @throws  {Error}
    * @param   {string} range The range of cells we work with
    * @param   {Object} [vWorksheet] The worksheet
    * @param   {Object} [oWorkbook] The workbook
    * @return  {Object} The range object given in the parameters
    * @path    ctx.excel.sheet.getRange
    */
    _sheet.getRange = function(range, vWorksheet, oWorkbook) {
      ctx.notifyAction('ctx.excel.sheet.getRange');
      try{
        _excel.initialize();
        var oRange;
        if (typeof oWorkbook == "object" ) {
          if (typeof vWorksheet != "object" ){
              vWorksheet = oWorkbook.WorkSheets.Item(vWorksheet);
          }
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getRange] Failed to find the workbook.');
          }
          oRange = vWorksheet.Range(range);
        } else {
          //Work with _workBook & _workSheet
          vWorksheet = _workSheet = _workBook.ActiveSheet;
          if (vWorksheet == undefined || range == undefined) {
            throw new Error(e.error.KO, '[ctx.excel.sheet.getRange] Failed to find the workbook.');
          }
          oRange = _workSheet.Range(range);
        }
        return oRange;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getRange] Failed to get range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets a value to the Cell in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setCellFormat( 3, 4, 'TestSetCell' );</code>
    * @method  setCellFormat
    * @throws  {Error}
    * @param   {number} row The row number
    * @param   {number} col The col number
    * @param   {string} value The value to set
    * @param   {Object|string} [vWorksheet] The worksheet
    * @path    ctx.excel.sheet.setCellFormat
    */
    _sheet.setCellFormat = function(row, col, value, vWorksheet) {
      ctx.notifyAction('ctx.excel.sheet.setCellFormat');
      try{
        _excel.initialize();
        if (typeof vWorksheet != "object" ){
          if (vWorksheet == undefined){
            vWorksheet = _workBook.ActiveSheet;
          } else{
            vWorksheet = _excelApp.Worksheets(vWorksheet);
          }
        }

        if (vWorksheet == undefined || row == undefined || col == undefined ) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setCellFormat] Failed to find the cell Format.');
        }

        vWorksheet.Cells(row,col).NumberFormat = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setCellFormat] Failed to set the Format of cell in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets style of the Excel sheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.styleAlign( 1, 3, 'Right' );</code>
    * @method  styleAlign
    * @throws  {Error}
    * @param   {number} row The row number
    * @param   {number} col The column number
    * @param   {string} align (Right, Left, Center)
    * @path    ctx.excel.sheet.styleAlign
    */
    _sheet.styleAlign = function(row, col, align){
      ctx.notifyAction('ctx.excel.application.styleAlign');
      try{
        _excel.initialize();
        var indiceRow = parseInt(row,10);
        var indiceCell = parseInt(col,10);
        switch (align) {
          case 'Center' :
          {
            _excelApp.cells(indiceRow,indiceCell).HorizontalAlignment = ctx.excel.constants.xlCenter;
            break;
          }
          case 'Right' :
          {
            _excelApp.cells(indiceRow,indiceCell).HorizontalAlignment = ctx.excel.constants.xlRight;
            break;
          }
          case 'Left' :
          {
            _excelApp.cells(indiceRow,indiceCell).HorizontalAlignment = ctx.excel.constants.xlLeft;
            break;
          }
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.application.StyleAlign] Failed to set style. '+ ex.description);
      }
    }

   /**
    * Gets the last empty row of the bloc (starting from the cellStart) in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.getLastRow( 'A20' );</code>
    * @method  getLastRow
    * @throws  {Error}
    * @param   {String} cellStart First filled cell to start with
    * @return  {Object} Result CellPosition
    * @path    ctx.excel.sheet.getLastRow
    */
    _sheet.getLastRow = function(cellStart) {
      ctx.notifyAction('ctx.excel.sheet.getLastRow');
      try{
        _excel.initialize();
        if (_workBook == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.getLastRow] Failed to find the workbook');
        }
        var objRange = _excelApp.Range(cellStart);
        var act = objRange.End(ctx.excel.constants.xlDown).Activate;
        var lastRow = _excelApp.ActiveCell.Row + 1;
        return lastRow ;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getLastRow] Failed to get the last row in excel workbook. '+ ex.description);
      }
    }

   /**
    * Gets the last empty row of the bloc (starting from the cellStart) in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.getLastRow2( 'A20' );</code>
    * @method  getLastRow2
    * @throws  {Error}
    * @param   {String} cellStart First filled cell to start with
    * @return  {Object} result CellPosition
    * @path    ctx.excel.sheet.getLastRow2
    */
    _sheet.getLastRow2 = function(cellStart) {
      ctx.notifyAction('ctx.excel.sheet.getLastRow2');
      try{
        _excel.initialize();
        if (_workBook == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.getLastRow2] Failed to find the workbook');
        }
        var objRange = _excelApp.Range(cellStart);
        var lastRow = objRange.SpecialCells(ctx.excel.constants.xlCellTypeLastCell).Row;
        return lastRow ;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getLastRow2] Failed to get the last row in excel workbook. '+ ex.description);
      }
    }

   /**
    * Gets the last empty column of the bloc (starting from the cellStart) in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var result = ctx.excel.sheet.getLastColumn( 'A20' );</code>
    * @method  getLastColumn
    * @throws  {Error}
    * @param   {String} cellStart First filled cell to start with
    * @return  {Object} result CellPosition
    * @path    ctx.excel.sheet.getLastColumn
    */
    _sheet.getLastColumn = function(cellStart) {
      ctx.notifyAction('ctx.excel.sheet.getLastColumn');
      try{
        _excel.initialize();
        if (_workBook == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.getLastColumn] Failed to find the workbook');
        }
        var objRange = _excelApp.Range(cellStart);
        var lastRow = objRange.SpecialCells(ctx.excel.constants.xlCellTypeLastCell).Column;
        return lastRow ;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.getLastColumn] Failed to get the last row in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets a style to the cell in the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setStyleFont( 3, 4, 'Gras' );</code>
    * @method  setStyleFont
    * @throws  {Error}
    * @param   {number} row The row number
    * @param   {number} col The col number
    * @param   {string} value The style font
    * @path    ctx.excel.sheet.setStyleFont
    */
    _sheet.setStyleFont = function(row, col, value) {
      ctx.notifyAction('ctx.excel.sheet.setStyleFont');
      try{
        _excel.initialize();
        if (_workBook == undefined || row == undefined || col == undefined ) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setStyleFont] Failed to find the cell');
        }
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Cells(row, col).Font.FontStyle = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setStyleFont] Failed to set style font to content of cell in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets ColummWidth to the cell in the active worksheet.
    * @description
    * <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setColummWidth( 3, 4, 20 );</code>
    * @method  setColummWidth
    * @throws  {Error}
    * @param   {number} row The row number
    * @param   {number} col The col number
    * @param   {number} value The width of the column
    * @path    ctx.excel.sheet.setColummWidth
    */
    _sheet.setColummWidth = function(row, col, value) {
      ctx.notifyAction('ctx.excel.sheet.setColummWidth');
      try{
        _excel.initialize();
        if (_workBook == undefined || row == undefined || col == undefined ) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setColummWidth] Failed to find the cell.');
        }
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Cells(row, col).ColumnWidth = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setColummWidth] Failed to set get Columm Width of cell in excel workbook. '+ ex.description);
      }
    }

   /**
    * @ignore Not tested!
    * Copy and paste a range of cells.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var range = ctx.excel.sheet.copyPasteRange( 'Bal2014', 'January2014Source', 'January2014Target', 'false', iPaste, iOperation, bSkipBlanks, bTranspose );</code>
    * @method  copyPasteRange
    * @throws  {Error}
    * @param   {Object} oWorksheet The worksheet
    * @param   {Object} vSourceRange The range to copy
    * @param   {Object} vTargetRange The range target
    * @param   {boolean} bCut If the range will be cut
    * @param   {number} iPaste
    * @param   {number} iOperation
    * @param   {boolean} bSkipBlanks
    * @param   {boolean} bTranspose
    * @return  {Object} vTargetRange Array range of values
    * @path    ctx.excel.sheet.copyPasteRange
    */
    _sheet.copyPasteRange = function(oWorksheet, vSourceRange, vTargetRange, bCut, iPaste, iOperation, bSkipBlanks, bTranspose) {
      ctx.notifyAction('ctx.excel.sheet.copyPasteRange');
      try{
        //TODO : test it
        _excel.initialize()
        var oRange;
        if (typeof oWorksheet != "object" ){
          if (oWorksheet == undefined){
            oWorksheet = _workBook.ActiveSheet;
          } else{
            oWorksheet = _workBook.WorkSheets.Item(oWorksheet);
          }
        }
        if (bCut == undefined) {bCut = false};
        if (vSourceRange == undefined &&  vTargetRange == undefined){
          throw new Error(e.error.KO, '[ctx.excel.sheet.copyPasteRange] Failed to find the target range.');
        }
        if (typeof vSourceRange != "object" && vSourceRange != undefined){
          vSourceRange = oWorksheet.Range(vSourceRange);
        }
        if (typeof vTargetRange != "object" && vTargetRange != undefined){
          vTargetRange = oWorksheet.Range(vTargetRange);
        }
        if(vSourceRange == undefined){
          if (bSkipBlanks == undefined) bSkipBlanks = false;
          if (bTranspose == undefined) bSkipBlanks = false;
          vTargetRange.PasteSpecial(iPaste, iOperation, bSkipBlanks, bTranspose);
        } else {
          if (bCut){
            vSourceRange.Cut(vTargetRange);
          } else {
            vSourceRange.Copy(vTargetRange);
          }
        }
        return vTargetRange;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.copyPasteRange] Failed to copy paste a range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets array values in the cells delimited by the rows and columns.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setCells( values, row, col, nbRows, nbCols );</code>
    * @method  setCells
    * @throws  {Error}
    * @param   {Array.<Object|string|number>} values The values to set in the cells
    * @param   {number} row
    * @param   {number} col
    * @param   {number} nbRows The number of rows
    * @param   {number} nbCols The number of columns
    * @path    ctx.excel.sheet.setCells
    */
    _sheet.setCells = function (values, row, col, nbRows, nbCols) {
      ctx.notifyAction('ctx.excel.sheet.setCells');
      // todo _ExcelWriteCell / _ExcelWriteArray / _ExcelWriteSheetFromArray
      try {
        _excel.initialize();
        _excelApp.visible = true;
        if (_workBook == undefined || row == undefined || col == undefined || nbRows < 0 || nbCols < 0) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setCells] Failed to find the cells.');
        }
        var activeSheet = _workBook.ActiveSheet;

        for (var j = 0; j < nbCols; j++) {
          for (var i = 0; i < nbRows; i++) {
            activeSheet.Cells(row + i, col + j).Value = values;
          }
        }
      } catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.setCells] Failed to setCells in excel workbook. ' + ex.description);
      }
    }

    /**
     * Sets range of formula cells to the active worksheet without Excel Functions
     * @description
     * <wrap help> //Example://</wrap>
<code javascript>
ctx.excel.sheet.setFormulaCell( row, col, values, operator );
</code>
     * @method setFormulaCell
     * @throws {Error}
     * @path ctx.excel.sheet.setFormulaCell
     * @param {string} operator set the type of operation
     * @param {Array.<Object|string|number>} values The values of cell to set in the cells
     * @param {number} row
     * @param {number} [col]
     * @param {Object} [vWorksheet] The worksheet
     */
    _sheet.setFormulaCell = function(operator, values, row, col, vWorksheet) {
      ctx.notifyAction('ctx.excel.sheet.setFormulaCells');
      // todo _ExcelWriteFormula
      try{
        _excel.initialize();
        _excelApp.visible = true;

        if (vWorksheet == undefined){
          vWorksheet = _workBook.ActiveSheet;
        } else{
          if(typeof vWorksheet != "object" ){
            vWorksheet = _workSheet = _excelApp.Worksheets(vWorksheet);
          }
        }
        if(vWorksheet == undefined || row == undefined || operator == undefined || values == undefined){
          throw new Error(e.error.KO, '[ctx.excel.sheet.setFormulaCell] Failed to find the cell.');
        } else {
          var calcul = {'valeur' : '', 'possible': true};
          for(var i = 0; i < values.length; i++){
            if(operator == '/' && i > 0){
              if(vWorksheet.Range(values[i]).Value == 0){
                ctx.log('Warning!!! You try to make a division by O');
                calcul['possible'] = false;
              }
            }
            if(calcul['possible']){
              calcul['valeur'] += (i == values.length-1 ? values[i] : values[i] + operator);
            }
          }
        }
        if(typeof row == 'number'){
          if(col == undefined){
            throw new Error(e.error.KO, '[ctx.excel.sheet.setFormulaCell] Failed to find the cell.');
          } else {
            vWorksheet.Cells(row, col).Value = (calcul['possible'] ? ('=' + calcul['valeur']) : '#ERROR');
          }
        } else if(typeof row == 'string'){
          vWorksheet.Range(row).Value = (calcul['possible'] ? ('=' + calcul['valeur']) : '#ERROR');
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setFormulaCells] Failed to setFormulaCells in excel workbook.'+ ex.description);
      }
    }

   /**
    * @ignore  Not finished!
    * Sets range of formula cells to the active worksheet with Excel functions.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setFormulaCells( values, row, col, nbRows, nbCols );</code>
    * @method  setFormulaCells
    * @throws  {Error}
    * @param   {number} row
    * @param   {number} col
    * @param   {Array.<Object|string|number>} values The values of cell to set in the cells
    * @path    ctx.excel.sheet.setFormulaCells
    */
    _sheet.setFormulaCellFunctions = function(row, col, values) {
      ctx.notifyAction('ctx.excel.sheet.setFormulaCells');
      // todo think of a way to have just one function to call all the mathematical function
      try{
        _excel.initialize();
        _excelApp.visible = true;
        if (_workBook == undefined || row == undefined || col == undefined || values == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setFormulaCells] Failed to find the cell.');
        }
        var objectFunction = _excelApp['WorksheetFunction'];
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Cells(row, col).Value = '=' + objectFunction.Sum(values);
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setFormulaCells] Failed to setFormulaCells in excel workbook.'+ ex.description);
      }
    }

   /**
    * @ignore
    * Sets range of hyperlink cells to the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setHyperlinkCells( values, row, col, nbRows, nbCols );</code>
    * @method  setHyperlinkCells
    * @throws  {Error}
    * @param   {Array.<Object|string|number>} values The values to set in the cells
    * @param   {number} row
    * @param   {number} col
    * @param   {number} nbRows The number of rows
    * @param   {number} nbCols The number of columns
    * @path    ctx.excel.sheet.setHyperlinkCells
    */
    _sheet.setHyperlinkCells = function(values, row, col, nbRows, nbCols) {
      ctx.notifyAction('ctx.excel.sheet.setHyperlinkCells');
      // todo _ExcelHyperlinkInsert
      try{
        throw new Error(e.error.NotImplemented, '[ctx.excel.sheet.setHyperlinkCells] Not implemented');
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setHyperlinkCells] Failed to setHyperlinkCells in excel workbook.'+ ex.description);
      }
    }

   /**
    * Clears the values and fhe formulas from a range of cells of the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.clearCells( row, col, nbRows, nbCols );</code>
    * @method  clearCells
    * @throws  {Error}
    * @param   {number} row
    * @param   {number} col
    * @param   {number} nbRows The number of rows
    * @param   {number} nbCols The number of columns
    * @path    ctx.excel.sheet.clearCells
    */
    _sheet.clearCells = function (row, col, nbRows, nbCols) {
      ctx.notifyAction('ctx.excel.sheet.clearCells');
      try {
        _excel.initialize();
        if (_workBook == undefined || row == undefined || col == undefined) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setCell] Failed to find the cell.');
        }

        var rangeDefinition = col.toString(10) + ";" + row.toString(10) + ";" + (col + nbCols - 1).toString(10) + ";" + (row + nbRows -1).toString();
        var rb = new RangeBuilder(rangeDefinition);
        var range = rb.getRange();
        if(range)
        {
          range.ClearContents();
          rb.releaseComObjects();
          rb = null;
          range = null;
          CollectGarbage();
        }
        else
          throw new Error(e.error.KO, '[ctx.excel.sheet.clearCells] The range to clear is invalid. The range definition was: ' + rangeDefinition);
      } 
      catch (ex) {
        throw new Error(e.error.KO, '[ctx.excel.sheet.clearCells] Failed to clearCells in excel workbook.' + ex.description);
      }
    }

   /**
    * @ignore  Not implemented!
    * Moves a range of cells of the active worksheet
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.moveCells( row, col, nbRows, nbCols );</code>
    * @method  moveCells
    * @throws  {Error}
    * @param   {number} row
    * @param   {number} col
    * @param   {number} nbRows The number of rows
    * @param   {number} nbCols The number of columns
    * @path    ctx.excel.sheet.moveCells
    */
    _sheet.moveCells = function(row, col, nbRows, nbCols) {
      ctx.notifyAction('ctx.excel.sheet.moveCells');
      // todo
      try{
        throw new Error(e.error.NotImplemented,'[ctx.excel.sheet.moveCells] Not implemented.');
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.moveCells] Failed to moveCells in excel workbook.'+ ex.description);
      }
    }

   /**
    * Select range (Col(s), row(s), set of cells) to the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
 // Insert 1 column
 ctx.excel.sheet.selectRange( 'B2:B6' );
 // Insert columns
 ctx.excel.sheet.selectRange( 'D:G' );
 //Insert 1 row
 ctx.excel.sheet.selectRange( '2:2' );
 // Insert rows
 ctx.excel.sheet.selectRange( '5:10' );
</code>
    * @method  selectRange
    * @throws  {Error}
    * @param   {string} range The column(s) to select
    * @param   {Object|string} [worksheetSrc] Source worksheet
    * @path    ctx.excel.sheet.selectRange
    */
    _sheet.selectRange = function(range, worksheetSrc) {
      ctx.notifyAction('ctx.excel.sheet.selectRange');
      try{
        if (typeof worksheetSrc !== "object" ){
          if (worksheetSrc == undefined){
            worksheetSrc = _workBook.ActiveSheet;
          } else{
            worksheetSrc = _excelApp.Worksheets(worksheetSrc);
          }
        }
        worksheetSrc.Range(range).Select();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.insertRange] Failed to insert Range in excel workbook.'+ ex.description);
      }
    }

   /**
    * Copies range (Col(s), row(s), set of cells) of the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
 // Insert 1 column
 ctx.excel.sheet.copyRange( 'B2:B6' );
 // Insert columns
 ctx.excel.sheet.copyRange( 'D:G' );
 //Insert 1 row
 ctx.excel.sheet.copyRange( '2:2' );
 // Insert rows
 ctx.excel.sheet.copyRange( '5:10' );
</code>
    * @method  copyRange
    * @throws  {Error}
    * @param   {string} range The column(s) to select
    * @param   {Object|string} [worksheetSrc] Source worksheet
    * @path    ctx.excel.sheet.copyRange
    */
    _sheet.copyRange = function(range, worksheetSrc) {
      ctx.notifyAction('ctx.excel.sheet.copyRange');
      try{
        if (typeof worksheetSrc !== "object" ){
          if (worksheetSrc == undefined){
            worksheetSrc = _workBook.ActiveSheet;
          } else{
            worksheetSrc = _excelApp.Worksheets(worksheetSrc);
          }
        }
        worksheetSrc.Range(range).Copy();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.copyRange] Failed to copy Range in excel workbook.'+ ex.description);
      }
    }

   /**
    * Pastes range (Col(s), row(s), set of cells) of the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
 // Insert 1 column
 ctx.excel.sheet.pasteRange( 'B2:B6' );
 // Insert columns
 ctx.excel.sheet.pasteRange( 'D:G' );
 //Insert 1 row
 ctx.excel.sheet.pasteRange( '2:2' );
 // Insert rows
 ctx.excel.sheet.pasteRange( 'A5', 'Feuil1', 'Statistics' );
</code>
    * @method  pasteRange
    * @throws  {Error}
    * @param   {string} targetRange The column(s) to select
    * @param   {Object|string} [worksheetSrc] Source worksheet
    * @param   {Object|string} [worksheetTarget] Target worksheet
    * @path    ctx.excel.sheet.pasteRange
    */
    _sheet.pasteRange = function(targetRange, worksheetSrc, worksheetTarget) {
      ctx.notifyAction('ctx.excel.sheet.pasteRange');
      try{
        if (typeof worksheetSrc !== "object" ){
          if (worksheetSrc == undefined){
            worksheetSrc = _workBook.ActiveSheet;
          } else{
            worksheetSrc = _excelApp.Worksheets(worksheetSrc);
          }
        }
        if (typeof worksheetTarget !== "object" ){
          if (worksheetTarget == undefined){
            worksheetTarget = _workBook.ActiveSheet;
          } else{
            worksheetTarget = _excelApp.Worksheets(worksheetTarget);
          }
        }
        worksheetSrc.Paste(worksheetTarget.Range(targetRange));
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.pasteRange] Failed to paste Range in excel workbook.'+ ex.description);
      }
    }

    /**
     * Inserts range (Col(s), row(s), set of cells) to the active worksheet
     * @description
     * <wrap help> //Example://</wrap>
<code javascript>
// Insert 1 column
ctx.excel.sheet.insertRange( 'B:B' );
// Insert columns
ctx.excel.sheet.insertRange( 'D:G' );
//Insert 1 row
ctx.excel.sheet.insertRange( '2:2' );
// Insert rows
ctx.excel.sheet.insertRange( '5:10' );
</code>
     * @method insertRange
     * @throws {Error}
     * @path ctx.excel.sheet.insertRange
     * @param {string} range The column(s) to insert
     */
    _sheet.insertRange = function(range) {
      ctx.notifyAction('ctx.excel.sheet.insertRange');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Range(range).Insert();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.insertRange] Failed to insert Range in excel workbook.'+ ex.description);
      }
    }

   /**
    * Deletes a range from the active worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
 // Insert 1 column
 ctx.excel.sheet.deleteRange( 'B:B' );
 // Insert columns
 ctx.excel.sheet.deleteRange( 'D:G' );
 //Insert 1 row
 ctx.excel.sheet.deleteRange( '2:2' );
 // Insert rows
 ctx.excel.sheet.deleteRange( '5:10' );
</code>
    * @method  deleteRange
    * @throws  {Error}
    * @param   {string} range Range to delete
    * @path    ctx.excel.sheet.deleteRange
    */
    _sheet.deleteRange = function(range) {
      ctx.notifyAction('ctx.excel.sheet.deleteRange');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Range(range).Delete();
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.deleteRange] Failed to deleteRange in excel workbook.'+ ex.description);
      }
    }

   /**
    * Sets the color for the range of worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setRangeColor( 'A1:G5', 2 );</code>
    * @method  setRangeColor
    * @throws  {Error}
    * @param   {string} range The range to set the style of the font
    * @param   {number} value The value of the border
    * @path    ctx.excel.sheet.setRangeColor
    */
    _sheet.setRangeColor = function(range, value) {
      ctx.notifyAction('ctx.excel.sheet.setRangeColor');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Range(range).Interior.ColorIndex = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeColor] Failed to set color in excel Range.'+ ex.description);
      }
    }

   /**
    * Sets the color for the cell of worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setCellColor( 1, 1, 3 );</code>
    * @method  setCellColor
    * @throws  {Error}
    * @param   {number} row The row of the cell
    * @param   {number} col The column of the cell
    * @param   {number} value The value of the color
    * @path    ctx.excel.sheet.setCellColor
    */
    _sheet.setCellColor = function(row, col, value) {
      ctx.notifyAction('ctx.excel.sheet.setCellColor');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Cells(row, col).Interior.ColorIndex = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setCellColor] Failed to set color in excel cell.'+ ex.description);
      }
    }

   /**
    * Sets the font style for the range of worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setRangeStyleFont( 'A1:G5', 'Gras' );</code>
    * @method  setRangeStyleFont
    * @throws  {Error}
    * @param   {string} range The range to set the style of the font
    * @param   {number} value The value of the border
    * @path    ctx.excel.sheet.setRangeStyleFont
    */
    _sheet.setRangeStyleFont = function(range, value) {
      ctx.notifyAction('ctx.excel.sheet.setRangeStyleFont');
      try{
        _excel.initialize();
        if (_workBook == undefined || range == undefined ) {
          throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeStyleFont] Failed to find the Range');
        }
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Range(range).Font.FontStyle = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeStyleFont] Failed to set style font to content of Range in excel workbook. '+ ex.description);
      }
    }

   /**
    * Sets the borders for the cell of worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setCellBorders( 1, 1, 1 );</code>
    * @method  setCellBorders
    * @throws  {Error}
    * @param   {number} row The row of the cell
    * @param   {number} col The column of the cell
    * @param   {number} value The value of the border
    * @path    ctx.excel.sheet.setCellBorders
    */
    _sheet.setCellBorders = function(row, col, value) {
      ctx.notifyAction('ctx.excel.sheet.setCellBorders');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Cells(row, col).Borders.linestyle = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setCellBorders] Failed to set border in excel cell.'+ ex.description);
      }
    }

   /**
    * Sets the borders for the range of worksheet.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.setRangeBorders( 'A1:G5', 1 );</code>
    * @method  setRangeBorders
    * @throws  {Error}
    * @param   {string} range The range to set the borders
    * @param   {number} value The value of the border
    * @path    ctx.excel.sheet.setRangeBorders
    */
    _sheet.setRangeBorders = function(range, value) {
      ctx.notifyAction('ctx.excel.sheet.setRangeBorders');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Range(range).Borders.linestyle = value;
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.setRangeBorders] Failed to set border in excel Range.'+ ex.description);
      }
    }

   /**
    * Copy a worksheet from a workbook to another.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.copySheet( filesrc, filenameDst, sheetSrc, newName );</code>
    * @method  copySheet
    * @throws  {Error}
    * @param   {string} filesrc The source workbook
    * @param   {string} filenameDst The destination workbook
    * @param   {string} sheetSrc The source worksheet
    * @param   {string} newName The name of the worksheet
    * @path    ctx.excel.sheet.copySheet
    */
    _sheet.copySheet = function(filesrc, filenameDst, sheetSrc, newName) {
      ctx.notifyAction('ctx.excel.sheet.copySheet');
      try{
        while(_workBooks.length > 0) {
            _workBooks.shift();
        }
        _workBooks.push(_workBook);
        var vSheetSrc = _excelApp.Worksheets(sheetSrc);
        _workBook = _excelApp.WorkBooks.Open(filenameDst);
        _workBooks.push(_workBook);
        var sheetDst = _excelApp.Worksheets(1);
        vSheetSrc.Copy(sheetDst);

        sheetDst = _excelApp.Worksheets(sheetSrc);
        sheetDst.Name = newName;

        var aLinksArray = _workBook.LinkSources(ctx.excel.constants.xlLinkTypeExcelLinks);

        if(aLinksArray){
          for (var index = aLinksArray.length; index>=1; index--) {
            var link = aLinksArray(index);
            _workBook.BreakLink(link, ctx.excel.constants.xlLinkTypeExcelLinks);
          }
        }
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.] Failed  '+ ex.description);
      }
    }

   /**
    * Insert an image in the sheet.
    * @description
    *  See more: [[https://msdn.microsoft.com/en-US/vba/excel-vba/articles/shapes-addpicture-method-excel]]
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.insertImage( filename, linkToFile, saveWithDocument, left, top, width, height );</code>
    * @method  insertImage
    * @throws  {Error}
    * @param   {string} filename The full path to the image to insert
    * @param   {string} linkToFile ''true'' if the file as to be linked
    * @param   {string} saveWithDocument ''true'' to save the picture with the document.
    * @param   {string} left The position (in points) of the upper-left corner of the picture relative to the upper-left corner of the document.
    * @param   {string} top The position (in points) of the upper-left corner of the picture relative to the top of the document.
    * @param   {string} width The width of the picture, in points (enter -1 to retain the width of the existing file).
    * @param   {string} height The height of the picture, in points (enter -1 to retain the height of the existing file).
    * @path    ctx.excel.sheet.insertImage
    */
    _sheet.insertImage = function( filename, linkToFile, saveWithDocument, left, top, width, height ){
      ctx.notifyAction('ctx.excel.sheet.insertImage');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Shapes.AddPicture( filename, linkToFile, saveWithDocument, left, top, width, height );
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.insertImage] Failed to insert image.'+ ex.description);
      }
    }

   /**
    * Insert an OLE object in the sheet.
    * @description
    *  See more: [[https://msdn.microsoft.com/en-us/vba/excel-vba/articles/shapes-addoleobject-method-excel]]
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.excel.sheet.addOLEObject( classType , filename , link , displayAsIcon , iconFileName , iconIndex , iconLabel , left , top , width , height );</code>
    * @method  addOLEObject
    * @throws  {Error}
    * @param   {string} classType A string that contains the programmatic identifier for the object to be created. If ClassType is specified, FileName and Link are ignored. (you must specify either ClassType or FileName).
    * @param   {string} filename The file from which the object is to be created. If the path isn?t specified, the current working folder is used. You must specify either the ClassType or FileName argument for the object, but not both.
    * @param   {string} link ''true'' to link the OLE object to the file from which it was created. ''false'' to make the OLE object an independent copy of the file. If you specified a value for ClassType, this argument must be ''false'' (by default, ''false'').
    * @param   {string} displayAsIcon ''true'' to display the OLE object as an icon (by default, ''false'').
    * @param   {string} iconFileName The file that contains the icon to be displayed.
    * @param   {string} iconIndex The index of the icon within IconFileName. The order of icons in the specified file corresponds to the order in which the icons appear in the Change Icon dialog box (accessed from the Object dialog box when the Display as icon check box is selected). The first icon in the file has the index number 0 (zero). If an icon with the given index number doesn't exist in IconFileName, the icon with the index number 1 (the second icon in the file) is used. The default value is 0 (zero).
    * @param   {string} iconLabel A label (caption) to be displayed beneath the icon.
    * @param   {string} left The position (in points) of the upper-left corner of the new object relative to the upper-left corner of the document. The default value is 0 (zero).
    * @param   {string} top The position (in points) of the upper-left corner of the new object relative to the upper-left corner of the document. The default value is 0 (zero).
    * @param   {string} width The initial dimensions of the OLE object, in points.
    * @param   {string} height The initial dimensions of the OLE object, in points.
    * @path    ctx.excel.sheet.addOLEObject
    */
    _sheet.addOLEObject = function(classType , filename , link , displayAsIcon , iconFileName , iconIndex , iconLabel , left , top , width , height ){
      ctx.notifyAction('ctx.excel.sheet.addOLEObject');
      try{
        var activeSheet = _workBook.ActiveSheet;
        activeSheet.Shapes.AddOLEObject( classType , filename , link , displayAsIcon , iconFileName , iconIndex , iconLabel , left , top , width , height );
      } catch (ex){
        throw new Error(e.error.KO, '[ctx.excel.sheet.addOLEObject] Failed to add OLE Obkect.'+ ex.description);
      }
    }

    return _sheet;
  })()

  return _excel;
})();







