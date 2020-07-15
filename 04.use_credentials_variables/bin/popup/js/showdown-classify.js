(function (extension) {
    if (typeof showdown !== 'undefined') {
        // global (browser or nodejs global)
        extension(showdown);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['showdown'], extension);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = extension(require('showdown'));
    } else {
        // showdown was not found so we throw
        throw Error('Could not find showdown library');
    }
}(function (showdown) {
    // console.log(showdown)
    // loading extension into shodown
    showdown.extension('classify', function () {

        var myext1 = {
            type: 'html',
            regex: '{.(.*?)}<img (.*)\/>',
            replace: '<img class="$1" $2>'
            //regex: '{.(.*?)}<(.*) (.*)>',
            //replace: '<$2 class="$1" $3>'
        };
        var myext2 = {
            type: 'html',
            regex: '<table>',
            replace: '<table class=" table-striped table-bordered table-condensed">'
        };
        return [myext1, myext2];

    })
}));


