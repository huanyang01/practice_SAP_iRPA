/** @suppress {undefinedVars|es5Strict|checkTypes} */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = createFilter;

function createFilter(sPageRange, oArea) {
    ctx.notifyAction('ctx.pdf.createFilter');
    try {
        var oFilter = {"pages": []};
        if (typeof sPageRange !== "number" && typeof sPageRange !== "string") {
            throw new Error(e.error.KO, 'Mandatory parameter "pageRange" is null or undefined');
        }
        sPageRange = _removeAllSpacesFromString(sPageRange)
        if (sPageRange === "") {
            oFilter.pages.push("*");
        } else if (!_validatePageDeclaration(sPageRange)) {
            throw new Error(e.error.KO, 'Page Range Definition is not valid');
        } else {
            var aAllSplittedPages = _splitPageRange(sPageRange);
            _addPagesToFilter(aAllSplittedPages, oFilter);
            oFilter.pages = _removeDuplicatesfromArray(oFilter.pages);
            oFilter.pages = _sortArray(oFilter.pages);
        }
        oFilter.area = _getAreaValues(oArea);
        return oFilter;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.createFilter] Failed to create Filter. ERROR :: ' + ex.message);
    }
}

function _splitPageRange(sPageRange) {
    var aAllPages = [];
    var aSplittedPageRange = sPageRange.split(",");
    var aFullSequencePage = [];
    for (var i = 0; i < aSplittedPageRange.length; i++) {
        if (aSplittedPageRange[i].indexOf("-") !== -1) {
            var aSplittedByDash = aSplittedPageRange[i].split("-");
            aFullSequencePage =  aFullSequencePage.concat(_setFullRangeValues(aSplittedByDash));
        } else {
            aAllPages.push(aSplittedPageRange[i]);
        }
    }
    if (aFullSequencePage) {
        for (var i = 0; i < aFullSequencePage.length; i++) {
            aAllPages.push(aFullSequencePage[i]);
        }
    }
    return aAllPages;
}

function _getAreaValues(oArea) {
    if (typeof oArea === 'object') {
        oArea.top = _validateAreaValues(oArea.top);
        oArea.left = _validateAreaValues(oArea.left);
        oArea.width = _validateAreaValues(oArea.width);
        oArea.height = _validateAreaValues(oArea.height);
        oArea.right = oArea.left + oArea.width;
        oArea.bottom = oArea.top + oArea.height;
        return oArea;
    } else if (typeof oArea === 'undefined' || oArea === null) {
        return undefined;
    } else {
        throw new Error(e.error.KO, 'Malformed type for object Area!');
    }
}

function _addPagesToFilter(oPage, oFilter) {
    if (typeof oPage === 'number' || typeof oPage === 'string') {
        if (oPage <= 0) {
            throw new Error(e.error.KO, 'Negative page declaration!');
        } else {
            oFilter.pages.push(oPage);
        }
    } else if (typeof oPage === 'object') {
        for (var i = 0; i < oPage.length; i++) {
            if (oPage[i] <= 0) {
                throw new Error(e.error.KO, 'Negative page declaration!');
            } else {
                oFilter.pages.push(oPage[i]);
            }
        }
    }
}

function _removeAllSpacesFromString(sString) {
    // If sString is number => cast to string
    sString = sString + "";
    sString = sString.trim();
    sString = sString.replace(/\s/g, '');
    return sString;
}

function _validatePageDeclaration(sPageRange) {
    var bResult;
    var sRegexIsValidPageRangeDeclaration = /^(\d(-\d)?)(,\d(-\d)?)*$/;
    var aMatchedCharsOfInput = sPageRange.match(sRegexIsValidPageRangeDeclaration);
    if (aMatchedCharsOfInput[0].length === sPageRange.length) {
        bResult = true;
    } else {
        bResult = false;
    }
    return bResult;
}

function _setFullRangeValues(aArgs) {
    var sFirstPage = aArgs[0];
    var sSecondPage = aArgs[1];
    var aResult = [];
    var sMax = "";
    var sMin = "";
    if (sFirstPage >= sSecondPage) {
        sMax = sFirstPage;
        sMin = sSecondPage;
    } else if (sSecondPage > sFirstPage) {
        sMax = sSecondPage;
        sMin = sFirstPage;
    }
    for (var j = sMin; j <= sMax; j++) {
        aResult.push(j)
    }
    return aResult;
}

function _sortArray(aArgs) {
    var aSortedArray = aArgs.sort(function (a, b) {
        return a - b
    });
    return aSortedArray;
}

function _validateAreaValues(dAreaValue) {
    var dAreaValueReturn;
    if (!isNaN(dAreaValue) && dAreaValue !== undefined) {
        dAreaValueReturn = parseFloat(dAreaValue);
        if (dAreaValueReturn < 0) {
            throw new Error(e.error.KO, 'Malformed (negative) area value!');
        }
        return dAreaValueReturn;
    } else {
        throw new Error(e.error.KO, 'Malformed area value!');
    }
}

function _removeDuplicatesfromArray(aArgs) {
    var aUniqueArray = [];
    try {
        for (var i = 0; i < aArgs.length; i++) {

            var sCurrentElement = parseInt(aArgs[i], 10);
            if (aUniqueArray.indexOf(sCurrentElement) === -1) {
                aUniqueArray.push(parseInt(sCurrentElement, 10));
            }
        }
        return aUniqueArray;
    } catch (ex) {
        throw new Error(e.error.KO, '_removeDuplicatesFromArray failed. ERROR :: ' + ex.message);
    }
}

},{}],2:[function(require,module,exports){
module.exports = extract;

function extract(sRegex, oFilter) {
    ctx.notifyAction('ctx.pdf.extract');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        if(!sRegex) {
            throw new Error(e.error.KO, 'Mandatory parameter "Regex" is null or undefined');
        }
        var sText = ctx.pdf.getText(oFilter);
        var aResult =  sText.match(sRegex);
        if(!aResult) {
            return "";
        }
        var bNoCapturingGroup = aResult.length === 1;
        if(bNoCapturingGroup) {
            return aResult[0];
        } else if(!bNoCapturingGroup) {
            return aResult[1];
        }
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.extract] Failed to extract text. ERROR :: ' + ex.message);
    }
}

},{}],3:[function(require,module,exports){
module.exports = getText;
function getText (oFilter) {
    ctx.notifyAction('ctx.pdf.getText');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        var aTextItems = ctx.pdf.getTextItems(oFilter);
        var aWords = [];
        for (var i = 0; i < aTextItems.length; i++) {
            aWords.push(aTextItems[i].word);
        }
        return aWords.join(" ");
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getText] Failed to get text. ERROR :: ' + ex.message);
    }
}

},{}],4:[function(require,module,exports){
module.exports = getTextInArea;
function getTextInArea (oParams) {
    ctx.notifyAction('ctx.pdf.getTextInArea');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        if(!oParams) {
            throw new Error(e.error.KO, '[ctx.pdf.getTextInArea] Failed to get Text in Area ERROR:: ' + '\\Parameters not valid');
        }
        var oArea = {
            top: oParams.top,
            left: oParams.left,
            width: oParams.width,
            height: oParams.height
        };
        var oFilter = ctx.pdf.createFilter(oParams.page, oArea);
        return ctx.pdf.getText(oFilter);
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getTextInArea] Failed to get Text in Area ERROR:: ' + ex.message);
    }
}
},{}],5:[function(require,module,exports){
module.exports = getTextItems;

/**
 * Validate given page declaration
 * @path  ctx.pdf.getTextItems
 * @method getTextItems
 * @param {Object} oFilter (optional) Object containing filter values
 * @return {Array} aTextItems - contains object with the wanted text items
 * @throws {Error}
 */
function getTextItems(oFilter) {
    ctx.notifyAction('ctx.pdf.getTextItems');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        var pdfContent = ctx.pdf._getCachedContent();
        if (!oFilter) {
            return _getAllTextItems(pdfContent.pageContent);
        } else {
            return _getTextItemsWithFilter(pdfContent, oFilter);
        }
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getTextItems] Failed to get Text Items. ERROR :: ' + ex.message);
    }
}

function _getAllTextItems(aPageContent) {
    var aResult = [];
    for (var i = 0; i < aPageContent.length; i++) {
        aResult = aResult.concat(aPageContent[i].words)
    }
    return aResult;
}

function _getTextItemsWithFilter(oPdfContent, oFilter) {
    var aFilteredPages = _filterPages(oFilter, oPdfContent);
    if (!oFilter.area) {
        return _getAllTextItems(aFilteredPages);
    }
    return _filterArea(oFilter, aFilteredPages);
}

function _filterPages(oFilter, oPdfContent) {
    var aFilteredPages = [];
    for (var i = 0; i < oFilter.pages.length; i++) {
        var page = oFilter.pages[i];
        aFilteredPages.push(oPdfContent.pageContent[page - 1]);
    }
    return aFilteredPages;
}

function _filterArea(oFilter, aFilteredPages) {
    var aResult = [];
    var oArea = oFilter.area;
    for (var p = 0; p < aFilteredPages.length; p++) {
        var wordsOnPage = aFilteredPages[p].words;
        for (var w = 0; w < wordsOnPage.length; w++) {
            var currentWord = wordsOnPage[w];
            var wordInBound = _wordInBound(currentWord, oArea);
            if (wordInBound) {
                aResult.push(currentWord);
            }
        }
    }
    return aResult;
}

function _wordInBound(currentWord, oArea) {
    var iWordBottom = currentWord.top + currentWord.height;
    var iWordRight = currentWord.left + currentWord.width;
    var yInBound = currentWord.top >= oArea.top && iWordBottom <= oArea.bottom;
    var xInBound = currentWord.left >= oArea.left && iWordRight <= oArea.right;
    return yInBound && xInBound;
}

},{}],6:[function(require,module,exports){
module.exports = getWordAfter;
function getWordAfter (nPage,nIndex) {
    ctx.notifyAction('ctx.pdf.getWordAfter');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        if((!nPage)|| (nPage < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordAfter] Failed to get Word after index ERROR:: ' + '\\Page not valid');
        }
        if((!nIndex) || (nIndex < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordAfter] Failed to get Word after index ERROR:: ' + '\\Index not valid');
        }
        var oCachedContent = ctx.pdf._getCachedContent();
        return oCachedContent.pageContent[nPage-1].words[nIndex+1].word;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getWordAfter] Failed to get word after index. ERROR :: ' + ex.message);
    }
}

},{}],7:[function(require,module,exports){
module.exports = getWordArray;
function getWordArray (oFilter) {
    ctx.notifyAction('ctx.pdf.getWordArray');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        var aTextItems = ctx.pdf.getTextItems(oFilter);
        var aWordArray = [];
        for (var i = 0; i < aTextItems.length; i++) {
            aWordArray.push(aTextItems[i].word);
        }
        return aWordArray;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getWordArray] Failed to get Word Array ERROR:: ' + ex.message);
    }
}
},{}],8:[function(require,module,exports){
module.exports = getWordAt;
function getWordAt (nPage,nIndex) {
    ctx.notifyAction('ctx.pdf.getWordAt');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        if((!nPage)|| (nPage < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordAt] Failed to get Word at index ERROR:: ' + '\\Page not valid');
        }
        if((!nIndex) || (nIndex < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordAt] Failed to get Word at index ERROR:: ' + '\\Index not valid');
        }
        var oCachedContent = ctx.pdf._getCachedContent();
       return oCachedContent.pageContent[nPage-1].words[nIndex].word;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getWordAt] Failed to get word at index. ERROR :: ' + ex.message);
    }
}

},{}],9:[function(require,module,exports){
module.exports = getWordBefore;
function getWordBefore (nPage,nIndex) {
    ctx.notifyAction('ctx.pdf.getWordBefore');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        if((!nPage)|| (nPage < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordBefore] Failed to get Word before index ERROR:: ' + '\\Page not valid');
        }
        if((!nIndex) || (nIndex < 1)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordBefore] Failed to get Word before index ERROR:: ' + '\\Index not valid');
        }
        var oCachedContent = ctx.pdf._getCachedContent();
        if((nIndex - 1 < 0)) {
            throw new Error(e.error.KO, '[ctx.pdf.getWordBefore] Failed to get Word before index ERROR:: ' + '\\Index not valid');
        }
       return oCachedContent.pageContent[nPage-1].words[nIndex - 1].word;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.getWordBefore] Failed to get word before index. ERROR :: ' + ex.message);
    }
}

},{}],10:[function(require,module,exports){
var getTextItems = require('./sdk.getTextItems');
var createFilter = require('./sdk.createFilter');
var getText = require('./sdk.getText');
var getWordArray = require('./sdk.getWordArray');
var extract = require('./sdk.extract');
var getTextInArea = require('./sdk.getTextInArea');
var getWordAt = require('./sdk.getWordAt');
var getWordAfter = require('./sdk.getWordAfter');
var getWordBefore = require('./sdk.getWordBefore');
var searchWord = require('./sdk.searchWord');

/**
 * Suppress all warnings regarding missing interface declarations for 'ctx.pdf'
 * @fileoverview
 * @suppress {missingProperties|checkTypes}
 */
/**
 * Pdf Library
 * @module ctx.pdf
 * @class ctx.pdf
 * @path ctx.pdf
 * @constructor ctx.pdf
 */
ctx.pdf = (function () {
    var _displayLogs = false;
    var _errorOpeningPDF = undefined;
    var cachedPdfContent = undefined;
    var _pdf =
        /** @lends ctx.pdf*/
        {
            /**
             * Opens a PDF
             * @description
             * __Ex.:__
             * <code javascript>
             * ctx.pdf.openPdf("C:\\mypdf.pdf",,function(error){
             *  //first time we need to wait for pdf document loading before using ctx.pdf.getText()
             * 	ctx.log(ctx.pdf.getText());
             * 	return;
             * }, "password123");
             * </code>
             * @public
             * @method openPdf
             * @throws {Error}
             * @path ctx.pdf.openPdf
             * @param {string} sFilename (mandatory) file path of pdf file
             * @param {Function} fReadCallback(error) (mandatory) If an error occurs it will be passed to the callback
             * @param {string=} sPassword (optional) for password protected pdf file
             */
            openPdf: function (sFilename, fReadCallback, sPassword) {
                ctx.notifyAction('ctx.pdf.openPdf');
                try {
                    validatePDFToBeOpened(sFilename);
                    ctx.pdf._writeHTMLfile(sFilename, sPassword);
                    //In prod mode, we used an hidden popup to load an read html generated page (see _writeHTMLfile method)
                    ctx.popup('pCtxPdfNavigator').open({
                        "content": e.popup.content.Web,
                        "url": ctx.options.path.resources + "\\ctxPdf.html",
                        "title": '',
                        "CX": 0,
                        "CY": 0,
                        "resizable": false,
                        "AutoHide": true,
                        "X": -100,
                        "Y": -100,
                        "TopMost": false,
                        "onFuncLoad": 'popupInitialize',
                        "IEHost": true,
                        "AppBar": false,
                        "showToolbar": false,
                        "CompactCX": 0,
                        "CompactCY": 0,
                        "Display": 0
                    })
                        .waitResult(function (/** @type {string} */resultStringified) {
                            deleteGeneratedHTML();
                            var result = JSON.parse(resultStringified);
                            if (result.error) {
                                _errorOpeningPDF = "Failed opening PDF: " + result.error.message;
                                fReadCallback(result.error);
                                return;
                            }
                            _errorOpeningPDF = undefined;
                            cachedPdfContent = result;
                            fReadCallback();
                        });
                } catch (ex) {
                    throw new Error(e.error.KO, '[ctx.pdf.openPdf] Failed to read PDF file. ERROR :: ' + ex.message);
                }
                return true;
            },
            /**
             * Release cached PDF content
             * @path  ctx.pdf.release
             * @method release
             */
            release: function () {
                ctx.notifyAction('ctx.pdf.release');
                cachedPdfContent = undefined;
            },
            /**
             * Get total number of pages in the Pdf
             * @path  ctx.pdf.getPageNum
             * @method getPageNum
             * @returns {Number} Total number of pages
             */
            getPageNum: function () {
                ctx.notifyAction('ctx.pdf.getPageNum');
                ctx.pdf._abortIfNoPDFOpened();
                try {
                    return cachedPdfContent.pageNum;
                } catch (ex) {
                    throw new Error(e.error.KO, '[ctx.pdf.getPageNum] ERROR :: ' + ex.message);
                }
            },
            /**
             * Get Viewport for the desired page of pdf
             * @path  ctx.pdf.getViewport
             * @method getViewport
             * @param {number=} nPage Specify to get ViewPort of a specific page, will default to first page
             * @returns {Object}
             */
            getViewport: function (nPage) {
                ctx.notifyAction('ctx.pdf.getViewport');
                ctx.pdf._abortIfNoPDFOpened();
                try {
                    if (nPage !== 0) {
                        if (!nPage) {
                            nPage = 1;
                        }
                    }
                    var oPage = ctx.pdf._getPage(ctx.pdf._getCachedContent(), nPage);
                    return {
                        width: oPage.width,
                        height: oPage.height
                    };
                } catch (ex) {
                    throw new Error(e.error.KO, '[ctx.pdf.getPageNum] ERROR :: ' + ex.message);
                }
            },

            /**
             * Get list of text items (text + position)
             * @path  ctx.pdf.getTextItems
             * @method getTextItems
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @return {Array} aTextItems - contains object with the wanted text items
             * @throws {Error}
             */
            getTextItems: getTextItems,

            /**
             * Create a filter to only search parts of the PDF
             * @path  ctx.pdf.createFilter
             * @method createFilter
             * @param {string} sPageRange (mandatory) String containing page declaration
             * @param {Object=} oArea (optional) containing area declaration
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @throws {Error}
             */
            createFilter: createFilter,

            /**
             * Return plain text of PDF
             * @path  ctx.pdf.getText
             * @method getText
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @return {string} Complete Text
             * @throws {Error}
             */
            getText: getText,

            /**
             * Extract text using RegEx
             * @path  ctx.pdf.extract
             * @method extract
             * @param {RegExp} The regular expression to search for
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @return {string} First match or if a matching group was used the first matched group
             * @throws {Error}
             */
            extract: extract,

            /**
             * Return word array
             * @path  ctx.pdf.getWordArray
             * @method getWordArray
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @return {Array} Array of words
             * @throws {Error}
             */
            getWordArray: getWordArray,

            /**
             * Return text in area
             * @path  ctx.pdf.getTextInArea
             * @method getTextInArea
             * @param {Object} oParams (required) containing page and area declaration
             * @return {string} Complete text in given area
             * @throws {Error}
             */
            getTextInArea: getTextInArea,
            /**
             * Returns TextItems matched with word
             * @path  ctx.pdf.searchWord
             * @method searchWord
             * @param {string} sWord
             * @param {Object=} oFilter (Optional) Only apply to part of PDF. Use ctx.pdf.createFilter(...) to create filter object.
             * @return {Array} TextItems with matched word
             * @throws {Error}
             */
            searchWord: searchWord,

            /**
             * Return text at given index and page
             * @path  ctx.pdf.getWordAtIndex
             * @method getWordAtIndex
             * @param {Number} nPage
             * @param {Number} nIndex
             * @return {string} Text at a given index on page
             * @throws {Error}
             */
            getWordAt: getWordAt,

            /**
             * Return text after a given index on page
             * @path  ctx.pdf.getWordAfterIndex
             * @method getWordAfterIndex
             * @param {Number} nPage
             * @param {Number} nIndex
             * @return {string} Text after a given index on page
             * @throws {Error}
             */
            getWordAfter: getWordAfter,
            /**
             * Return text before a given index on page
             * @path  ctx.pdf.getWordBeforeIndex
             * @method getWordBeforeIndex
             * @param {Number} nPage
             * @param {Number} nIndex
             * @return {string} Text before a given index on page
             * @throws {Error}
             */
            getWordBefore: getWordBefore,


            // INTERNAL FUNCTIONS
            /**
             * @ignore
             */
            _getCachedContent: function () {
                var startTime = new Date();
                var copy = JSON.parse(JSON.stringify(cachedPdfContent));
                if (_displayLogs){
                    ctx.log('ctx.pdf._getCachedContent ' + (new Date().getTime() - startTime) + "ms");
                }
                return copy;
            },
            /**
             * @ignore
             */
            _abortIfNoPDFOpened: function () {
                if (_errorOpeningPDF) {
                    throw new Error(e.error.KO, '[ctx.pdf] ERROR ::  ' + _errorOpeningPDF);
                }
                if (!cachedPdfContent) {
                    throw new Error(e.error.KO, '[ctx.pdf] ERROR ::  No PDF opened.');
                }
            },
            /**
             * @ignore
             */
            _writeHTMLfile: function (sFilename, sPassword) {
                ctx.notifyAction('ctx.pdf._writeHTMLfile');
                try {
                    if (_displayLogs) ctx.log('ctx.pdf._writeHTMLfile ..');
                    var file = '';
                    if (sFilename.indexOf('http') == 0) {
                        file = sFilename;
                    } else {
                        file = ctx.pdf._binBase64Encode(ctx.pdf._readBinaryFile(sFilename));
                    }
                    var html = '<!DOCTYPE html><html>';
                    html += '<!-- saved from url=(0014)about:internet -->' + "\r\n" //prevent security error warning
                    html += '<head><meta charset="utf-8"><title>PDF popup</title>' + "\r\n";
                    html += '<script src="lib/pdf/pdfjs.min.js"></' + 'script>' + "\r\n";
                    html += '<script src="lib/pdf/pdf.popup.js"></' + 'script>' + "\r\n";

                    html += '<script>' + "\r\n";
                    //when popup is initialized, we get content, we put it in a container and we click on ctx_close button to send data back to Contextor
                    html += 'var pdfUrlOrPdfData ="' + file + '";' + "\r\n";
                    html += 'var pdfPassword ="' + sPassword + '";' + "\r\n";
                    html += 'function popupInitialize(){getPdf(pdfUrlOrPdfData, "lib/pdf/pdfjs.worker.min.js", pdfPassword,function(result){document.getElementById("Ctx_Result").innerText = JSON.stringify(result);document.getElementById("Ctx_Close").click();return;});return;};\r\n';
                    html += '</' + 'script>' + "\r\n";
                    html += '</head>' + "\r\n";
                    html += '<body class="noselect">' + "\r\n";
                    html += '<div id="loaded"></div>' + "\r\n";
                    html += '<div style="display:block;">\n    <div name="Ctx_Result" id="Ctx_Result"></div>\n    <button name="Ctx_Close" id="Ctx_Close">close</button>\n</div></body></html>';
                    var ctxPdfHtmlFilePath = getGeneratedHTMLPath();
                    deleteGeneratedHTML();
                    if (_displayLogs) ctx.log('ctx.pdf._writeHTMLfile .. sFilename :: ' + sFilename);
                    ctx.fso.file.write(ctxPdfHtmlFilePath, html);
                } catch (ex) {
                    throw new Error(e.error.KO, '[ctx.pdf._writeHTMLfile] ERROR :: ' + ex.message);
                }
                return;
            },
            /**
             * @ignore
             */
            _readBinaryFile: function (sFilename) {
                ctx.notifyAction('ctx.pdf._readBinaryFile');
                var _oStream;
                try {
                    _oStream = new ActiveXObject('ADODB.Stream');
                    _oStream.Type = 1;
                    _oStream.Open();
                    _oStream.LoadFromFile(sFilename);
                    var txt = _oStream.Read();
                    _oStream.Close();
                    return txt;
                } catch (ex) {
                    try {
                        _oStream.Close();
                    } catch (ex2) {
                    }
                    throw new Error(e.error.KO, '[ctx.pdf._readBinaryFile] : ' + ex.description);
                }
            },
            /**
             * @ignore
             */
            _binBase64Encode: function (sBytes) {
                ctx.notifyAction('ctx.pdf._binBase64Encode');
                try {
                    if (_displayLogs) ctx.log('ctx.pdf._binBase64Encode ..');
                    var _dom = new ActiveXObject('Microsoft.XMLDOM');
                    var elem = _dom.createElement('tmpCtxt');
                    elem.dataType = 'bin.base64';
                    elem.nodeTypedValue = sBytes;
                    return elem.text.replace(/[^A-Z\d+=\/]/gi, '');
                } catch (ex) {
                    throw new Error(e.error.KO, '[ctx.pdf._binBase64Encode] ERROR :: ' + ex.message);
                }
            },
            /**
             * @ignore
             */
            _getPage: function (pdfContent, nPage) {
                ctx.notifyAction('ctx.pdf._getPage');
                var nMaxPages = pdfContent.pageNum;
                var oRequiredPage = undefined;
                var aPage = pdfContent.pageContent;
                if (typeof nPage !== "number") {
                    throw new Error(e.error.KO, '[ctx.pdf._getPage] Invalid Page Number');
                }
                if ((nPage > nMaxPages) || (nPage <= 0)) {
                    throw new Error(e.error.KO, '[ctx.pdf._getPage] Invalid Page Number');
                }
                oRequiredPage = aPage[nPage - 1];
                return oRequiredPage;
            }
        };

    function deleteGeneratedHTML() {
        var ctxPdfHtmlFilePath = getGeneratedHTMLPath();
        try {
            ctx.fso.file.remove(ctxPdfHtmlFilePath);
            if (_displayLogs) ctx.log('ctx.pdf._writeHTMLfile .. delete ' + ctxPdfHtmlFilePath);
        } catch (ex) {
        }
    }

    function getGeneratedHTMLPath() {
        var ctxPdfHtmlFilePath = ctx.options.path.resources + '\\ctxPdf.html';
        return ctxPdfHtmlFilePath;
    }

    function validatePDFToBeOpened(sFilename) {
        if (cachedPdfContent) {
            throw new Error(e.error.KO, "Another PDF file is already opened. Use ctx.pdf.release() to close it first");
        }
        var isUrl = sFilename.substr(0, 4) === "http";
        if (!isUrl && !ctx.fso.file.exist(sFilename)) {
            throw new Error(e.error.KO, sFilename + ' doesn\'t exist');
        }
        if (_displayLogs) ctx.log('ctx.pdf.openPdf .. sFilename :: ' + sFilename);
        if (!ctx.fso.file.exist(ctx.options.path.resources + "\\lib\\pdf\\pdf.popup.js")) {
            throw new Error(e.error.KO, ctx.options.path.resources + '\\lib\\pdf\\pdf.popup.js doesn\'t exist');
        }
        if (!isUrl) {
            var fileObject = ctx.fso.file.get(sFilename);
            var sizeInMB = fileObject.Size / 1024 / 1024;
            if (sizeInMB > 15) {
                throw new Error(e.error.KO, sFilename + ' exceeds maximum supported file size of 15MB');
            }
        }
    }

    return _pdf;
}());

},{"./sdk.createFilter":1,"./sdk.extract":2,"./sdk.getText":3,"./sdk.getTextInArea":4,"./sdk.getTextItems":5,"./sdk.getWordAfter":6,"./sdk.getWordArray":7,"./sdk.getWordAt":8,"./sdk.getWordBefore":9,"./sdk.searchWord":11}],11:[function(require,module,exports){
module.exports = searchWord;
function searchWord (sWord,oFilter) {
    ctx.notifyAction('ctx.pdf.searchWord');
    ctx.pdf._abortIfNoPDFOpened();
    try {
        var aTextItems = ctx.pdf.getTextItems(oFilter);
        var aSearchedText = [];
        for (var i = 0; i < aTextItems.length; i++) {
            if (aTextItems[i].word === sWord) {
                aSearchedText.push(aTextItems[i]);
            }
        }
        return aSearchedText;
    } catch (ex) {
        throw new Error(e.error.KO, '[ctx.pdf.searchWord] Failed to search word. ERROR :: ' + ex.message);
    }
}

},{}]},{},[10]);

/**
 * Polyfill to apply 'indexOf' on Arrays
 * @suppress {checkTypes}
 */
if (!Array.prototype.indexOf) Array.prototype.indexOf = (function (Object, max, min) {
    "use strict";
    return function indexOf(member, fromIndex) {
        if (this === null || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");

        var that = Object(this), Len = that.length >>> 0, i = min(fromIndex | 0, Len);
        if (i < 0) i = max(0, Len + i); else if (i >= Len) return -1;

        if (member === void 0) {
            for (; i !== Len; ++i) if (that[i] === void 0 && i in that) return i; // undefined
        } else if (member !== member) {
            for (; i !== Len; ++i) if (that[i] !== that[i]) return i; // NaN
        } else for (; i !== Len; ++i) if (that[i] === member) return i; // all else

        return -1; // if the value was not found, then return -1
    };
})(Object, Math.max, Math.min);
