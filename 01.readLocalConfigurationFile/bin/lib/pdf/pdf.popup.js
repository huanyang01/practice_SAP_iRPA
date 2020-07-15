//--------------------------------------------------------------------------
//!! THIS SCRIPT IS RUNNING INSIDE NAVIGATOR (OR POPUP) !!
//this script is loaded in ctx.pdf._writeHTMLfile method
//--------------------------------------------------------------------------
/**
 * Read PDF and return result or error
 * @fileoverview
 * @suppress {undefinedVars|es5Strict|checkTypes|checkVars}
 *
 */
if (typeof (pdfjsLib) == "undefined") {
    // To prevent Studio complaining pdfjsLib is undeclared
    var pdfjsLib;
}
function getPdf(sPdfUrlOrData, pdfjsWorkerSourcePath, sPassword, fGetPdfCallback) {
    readPdf(sPdfUrlOrData, pdfjsWorkerSourcePath, sPassword).then(function (textsAndPositions) {
        //Send datas to popup
        fGetPdfCallback(textsAndPositions);
        return;

    }, function (error) {
        fGetPdfCallback({
            error: error
        });
        console.error("ctxPdfIn.getPdf ERROR " + error);
        return;
    });
    return;
}

/**
 * PDF will be embedded in HTML as base64 string
 */
function convertStringBase64ToStringBase2(sBase64String) {
    var raw = window.atob(sBase64String);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

/**
 * Use PDF.js to read PDFs contents
 */
function readPdf(sPdfUrlOrData, pdfjsWorkerSourcePath, sPassword) {
    // These are options that affect pdfjs library
    pdfjsLib.disableFontFace = true;
    pdfjsLib.ignoreErrors = true;
    pdfjsLib.workerSrc = pdfjsWorkerSourcePath;
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerSourcePath;

    var pdfJsParamsObj = {};
    if (sPdfUrlOrData.indexOf('http') == 0) {
        pdfJsParamsObj.url = sPdfUrlOrData;
    } else {
        pdfJsParamsObj.data = convertStringBase64ToStringBase2(sPdfUrlOrData);
    }
    pdfJsParamsObj.password = sPassword;
    var pdf = pdfjsLib.getDocument(pdfJsParamsObj);
    return pdf.then(function (pdf) {
        var maxPages = pdf.pdfInfo.numPages;
        var countPromises = [];
        for (var jj = 1; jj <= maxPages; jj++) {
            var page = pdf.getPage(jj);
            (function(currentPageNumber) {
                countPromises.push(page.then(function(page) {return readPage(page, currentPageNumber)}));
            })(jj);

        }
        return Promise.all(countPromises).then(function (textsAndPositions) {
            return {
                pageNum: maxPages,
                pageContent: textsAndPositions
            };
        });
    });
}

function readPage(page, currentPageNumber) {
    var textContent = page.getTextContent({
        normalizeWhitespace: true
    });
    return textContent.then(function (text) {
        var viewport = page.getViewport(1);
        var words = text.items.map(function (item,index) {
            return {
                word: item.str,
                width: item.width,
                height: item.height,
                left: item.transform[4],
                top: viewport.height - item.transform[5],
                fontName: item.fontName,
                page: currentPageNumber,
                index: index
            };
        });
        return {
            page: currentPageNumber,
            width: viewport.width,
            height: viewport.height,
            words: words
        };
    });
};
