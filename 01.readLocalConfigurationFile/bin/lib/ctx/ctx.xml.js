/**
 * @module       XML and JSON utilitary classes
 * @file         ctx/ctx.xml.js
 * @description
 *  This library implements XML and JSON utilitary classes.
 *
 *   * ''ctx.xml'':
 *     * IXMLNode object serialization / unserialization
 *
 *   * ''ctx.json'':
 *     * encapsulates JSON object: Javascript object serialization / unserialization
 *     * CSV file reading
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * Options for the 'ctx.xml' library
 * @namespace  ctx.options.xml
 * @path       ctx.options.xml
 */
ctx.options.xml = {
 /**
  * Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
  * @property  {e.trace.level} traceLevel
  * @default   e.trace.level.None
  * @path      ctx.options.xml.traceLevel
  */
  traceLevel: e.trace.level.None
};

/**
 * XML parser library
 * @class        ctx.xml
 * @constructor
 * @path         ctx.xml
 */
ctx.xml = (function () {

  var self =
  /** @lends ctx.xml */
  {

   /**
    * Converts a JSON string or a JavaScript object to an XML string.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript>
    *   var obj = { a: { b: 0, c: 'name', d: { e: 'e', f: 5 } } };
    *   var htmlCode = ctx.xml.json2xml( obj );</code>
    * @method  json2xml
    * @path    ctx.xml.json2xml
    * @param   {*} o Object to be converted
    * @param   {string} [tab] Tab indentation ('\t' by default if omitted, use empty string <nowiki>''</nowiki> to remove all indentations and carriage returns)
    * @return  {string} XML string
    */
	json2xml: function(o, tab) {
		
		function ObjectNodeToXml(nodeValue, nodeName, index) {
			var propKey = "";
			var propValue = "";
			var xmlResult = "";
			if (nodeValue instanceof Array) {
				for (var nodeIndex = 0, nodeCount = nodeValue.length; nodeIndex < nodeCount; nodeIndex++) {
					xmlResult = xmlResult + ObjectNodeToXml(nodeValue[nodeIndex], nodeName, index);
				}
			} else if (! (typeof(nodeValue) === "object")) {
				xmlResult = xmlResult + index + "<" + nodeName + ">" + nodeValue.toString() + "</" + nodeName + ">\n";
			} else {
				xmlResult = xmlResult + index + "<" + nodeName;

				var isParent;
				isParent = false;

				for (var member in nodeValue) {
					if ((typeof(nodeValue[member]) === "object") || (member == "#text") || (member == "#cdata")) {
						isParent = true;
					} else {
						if (member.charAt(0) == "@") {
							propValue = nodeValue[member].toString();
							//propValue = propValue.replace(/[\"]/g, "\\\""); // escape '\"'
							propValue = propValue.replace(/"/g, '\\"');
							//propValue = propValue.replace(/"/g, '&quot;');
							propKey = member.substr(1);
							xmlResult = xmlResult + " " + propKey + "=\"" + propValue + "\"";
						} else {
							isParent = true;
						}
					}
				}
				if (!isParent) {
					xmlResult += "/>\n";
				} else
					xmlResult += ">";
					var doCR = true;
					for (var member in nodeValue) {
						if (member == "#text") {
							xmlResult += nodeValue[member].replace(/</g, '&lt;').replace(/&/g, '&amp;');
						} else if (member == "#cdata") {
							xmlResult += "<![CDATA[" + nodeValue[member] + "]]>";
						} else if ((member.charAt(0) != "@") /*&& (typeof(nodeValue[member]) === "object")*/ ) {
							if (doCR) {
								xmlResult += '\n';
								doCR = false;
							}
							xmlResult += ObjectNodeToXml(nodeValue[member], member, index + "\t");
						}
					}
					xmlResult += (xmlResult.charAt(xmlResult.length - 1) == "\n" ? index : "") + "</" + nodeName + ">\n";

			}
			return xmlResult;
		}

		var result = "";
		if (o && ('string' === typeof o)) {
			try {
				o = ctx.json.parse(o);
			} catch (ex) {}
		}
		for (var member in o)
			result += ObjectNodeToXml(o[member], member, "");
		if (tab === undefined) tab = '';
		if (!tab)
			result = result.replace(/\t|\n/g, ""); // remove indentations and CR
		else if (tab !== '\t')
			result = result.replace(/\t/g, tab);

		return result;
	},

   /**
    * Parses an XML string to return a IXMLNode object.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var xml = ctx.xml.parse( "<customer><firstname>Joe</firstname><name>Smith</name></customer>" );</code>
    * @method  parse
    * @path    ctx.xml.parse
    * @param   {string} data String to be parsed
    * @return  {Object} XML object
    */
    parse : function (data) {
      var xml, tmp;
      try {
        if (!data || typeof data !== "string") {
          return null;
        }
        if (data.substring(0, 1) != '<') {
          return null;
        }
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        //var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
        xmlDoc.async = false;
        xmlDoc.loadXML(data);
        if (xmlDoc.parseError.errorCode !== 0) {
          ctx.log("Invalid XML: " + data, e.logIconType.Warning);
        } else {
          xml = xmlDoc.documentElement;
        }
      } catch (ex) {
        try {
          tmp = new DOMParser();
          xml = tmp.parseFromString(data, "text/xml");
        } catch (ex2) {
          xml = undefined;
          if (!xml || xml.getElementsByTagName("parsererror").length) {
            ctx.log("Invalid XML: " + data, e.logIconType.Warning);
          }
        }
      }
      return xml;
    },

   /**
    * Stringifies an IXMLNode object to return an XML string.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var xml = ctx.xml.stringify( strNode ); // returns "<customer><firstname>Joe</firstname><name>Smith</name></customer>"</code>
    * @method  stringify
    * @path    ctx.xml.stringify
    * @param   {Node} xmlNode IXMLNode object
    * @param   {boolean} removeCR Remove \n, \t, ... between nodes
    * @return  {string} Data string
    */
    stringify : function (xmlNode, removeCR) {
      var strXml = (xmlNode.xml ? xmlNode.xml : (new XMLSerializer()).serializeToString(xmlNode));
      if (removeCR) {
        strXml = strXml.replace(/>\r\n\t*</g, '><');
      }
      return strXml;
    },

   /**
    * Converts an XML object or string to a Javascript object.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var obj = ctx.xml.xml2object( xml );</code>
    * @method  xml2object
    * @path    ctx.xml.xml2object
    * @param   {*} xml XML object or string to be converted
    * @param   {boolean} [removeCData]
    * @return  {Object} Javascript object
    */
	xml2object: function(xml, removeCData) {
		var workObj = {
			innerXml: function(node) {
				var innerResult = ""
				if (!("innerHTML" in node)) {
					var asXml = function(n) {
						var innerResult = "";
						if (n.nodeType == 1) {
							innerResult = innerResult + "<" + n.nodeName;
							for (var i = 0; i < n.attributes.length; i++)
								innerResult = innerResult + " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
							if (n.firstChild) {
								innerResult = innerResult + ">";
								for (var c = n.firstChild; c; c = c.nextSibling)
									innerResult = innerResult + asXml(c);
								innerResult = innerResult + "</" + n.nodeName + ">";
							} else
								innerResult = innerResult + "/>";
						} else if (n.nodeType == 3)
							innerResult = innerResult + n.nodeValue;
						else if (n.nodeType == 4)
							innerResult = innerResult + "<![CDATA[" + n.nodeValue + "]]>";
						return innerResult;
					};
					for (var c = node.firstChild; c; c = c.nextSibling) {
						innerResult = innerResult + asXml(c);
					}
				}	
				else {
					innerResult = node.innerHTML;
				}
				return innerResult;
			},
			escape: function(txt) {
				return txt;
			},
			removeWhiteChars: function(e) {
				e.normalize();
				for (var n = e.firstChild; n;) {
					if (n.nodeType == 3) { // text node
						if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
							var nxt = n.nextSibling;
							e.removeChild(n);
							n = nxt;
						} else
							n = n.nextSibling;
					} else if (n.nodeType == 1) { // element node
						workObj.removeWhiteChars(n);
						n = n.nextSibling;
					} else // any other node
						n = n.nextSibling;
				}
				return e;
			},
			convertToObj: function(xmlToConvert, removeCData) {
				var objResult = {};
				
				switch(xmlToConvert.nodeType) {
					case 8: // comment : garbage
						break;

					case 9: // document.node
						objResult = workObj.convertToObj(xmlToConvert.documentElement, removeCData);
						break;
					
					case 1: // element node
						if (xmlToConvert.attributes.length)
							for (var i = 0; i < xmlToConvert.attributes.length; i++)
								objResult["@" + xmlToConvert.attributes[i].nodeName] = (xmlToConvert.attributes[i].nodeValue || "").toString();
						if (xmlToConvert.firstChild) { // element has child nodes ..
							var textChild = 0,
								cdataChild = 0,
								hasElementChild = false;
							for (var n = xmlToConvert.firstChild; n; n = n.nextSibling) {
								if (n.nodeType == 1) hasElementChild = true;
								else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++;
								else if (n.nodeType == 4) cdataChild++;
							}
							if (hasElementChild) {
								if (textChild < 2 && cdataChild < 2) {
									workObj.removeWhiteChars(xmlToConvert);
									for (var n = xmlToConvert.firstChild; n; n = n.nextSibling) {
										if (n.nodeType == 3) {
											if (removeCData)
												objResult = workObj.escape(n.nodeValue);
											else
												objResult["#text"] = workObj.escape(n.nodeValue);
										} else if (n.nodeType == 4) {
											if (removeCData)
												objResult = workObj.escape(n.nodeValue);
											else
												objResult["#cdata"] = workObj.escape(n.nodeValue);
										} else if (objResult[n.nodeName]) {
											if (objResult[n.nodeName] instanceof Array)
												objResult[n.nodeName][objResult[n.nodeName].length] = workObj.convertToObj(n, removeCData);
											else
												objResult[n.nodeName] = [objResult[n.nodeName], workObj.convertToObj(n, removeCData)];
										} else if (n.nodeType != 8)
											objResult[n.nodeName] = workObj.convertToObj(n, removeCData);
									}
								} else { // mixed content
									if (!xmlToConvert.attributes.length)
										objResult = workObj.escape(workObj.innerXml(xmlToConvert));
									else {
										if (removeCData)
											objResult = workObj.escape(workObj.innerXml(xmlToConvert));
										else
											objResult["#text"] = workObj.escape(workObj.innerXml(xmlToConvert));
									}
								}
							} else if (textChild) { // pure text
								if (!xmlToConvert.attributes.length)
									objResult = workObj.escape(workObj.innerXml(xmlToConvert));
								else
								if (removeCData)
									objResult = workObj.escape(workObj.innerXml(xmlToConvert));
								else
									objResult["#text"] = workObj.escape(workObj.innerXml(xmlToConvert));
							} else if (cdataChild) { // cdata
								if (cdataChild > 1)
									objResult = workObj.escape(workObj.innerXml(xmlToConvert));
								else
									for (var n = xmlToConvert.firstChild; n; n = n.nextSibling) {
										if (removeCData)
											objResult = workObj.escape(n.nodeValue);
										else
											objResult["#cdata"] = workObj.escape(n.nodeValue);
									}
							}
						}
						if (!xmlToConvert.attributes.length && !xmlToConvert.firstChild) objResult = null;

						break;

					default:
						ctx.log("unhandled node type: " + xmlToConvert.nodeType, e.logIconType.Warning);
				}
				
				return objResult;
			}
		};

		var xmlRoot;
		if (typeof xml === 'string') {
			// input is an XML string
			xmlRoot = ctx.xml.parse(xml);
		} else {
			// input is an XML object
			xmlRoot = xml;
		}
		if (xmlRoot.nodeType == 9) // document node
			xmlRoot = xmlRoot.documentElement;
		var obj = {}
		obj[xmlRoot.nodeName] = workObj.convertToObj(workObj.removeWhiteChars(xmlRoot), removeCData);
		return obj;
	},

   /**
    * Converts an XML object to a JSON string.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var htmlCode = ctx.xml.xml2json( xml );</code>
    * @method  xml2json
    * @path    ctx.xml.xml2json
    * @param   {*} xml XML object or string to be converted
    * @param   {string} [tab] Tab separator
    * @return  {string} JSON string
    */
    xml2json : function(xml, tab) {
      var obj = ctx.xml.xml2object(xml);
      return ctx.json.stringify(obj);
    }
  };
  return self;
})();

/**
 * Options for the 'ctx.json' library
 * @struct  ctx.options.json
 * @path    ctx.options.json
 */
ctx.options.json = {
 /**
  * Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
  * @property  {e.trace.level} traceLevel
  * @path      ctx.options.json.traceLevel
  * @default   e.trace.level.None
  */
  traceLevel: e.trace.level.None
};

/**
 * JSON parser library
 * @class        ctx.json
 * @path         ctx.json
 * @constructor
 */
ctx.json = (function () {

  /**
    @ignore
     JPath 1.0.5 - json equivalent to xpath
     Copyright (C) 2009-2011  Bryan English <bryan at bluelinecity dot com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

     Usage:
        var jpath = new JPath( myjsonobj );

        var somevalue = jpath.$('book/title').json;  //results in title
           //or
        var somevalue = jpath.query('book/title');   //results in title

     Supported XPath-like Syntax:
        /tagname
        //tagname
        tagname
        * wildcard
        [] predicates
        operators ( >=, ==, <= )
        array selection
        ..
        *
        and, or
        nodename[0]
        nodename[last()]
        nodename[position()]
        nodename[last()-1]
        nodename[somenode > 3]/node
        nodename[count() > 3]/node

     Tested With:
        Firefox 2-3, IE 6-7

     Update Log:
        1.0.1 - Bugfix for zero-based element selection
        1.0.2 - Bugfix for IE not handling eval() and returning a function
        1.0.3 - Bugfix added support for underscore and dash in query() function
                    Bugfix improper use of Array.concat which was flattening arrays
                    Added support for single equal sign in query() function
                    Added support for count() xpath function
                    Added support for and, or boolean expression in predicate blocks
                    Added support for global selector $$ and //
                    Added support for wildcard (*) selector support
      1.0.4 - Changed to MIT license
      1.0.5 - Bugfix for greedy regexp
  */
 /**
  * @constructor
  * @param {Object} json JS object
  * @param {Object} [parent] Parent object
  * @param {string} [lastAtt] Last memorized attribute
  */
  function JPath( json, parent, lastAtt )
  {
      this.json = json;
      this._parent = parent;
      this._lastAtt = lastAtt;
  }

  JPath.prototype = {

     /**
        @ignore
        Property: json
        Copy of current json segment to operate on
     */
     json: null,

     /**
        @ignore
        Property: parent
        Parent json object, null if root.
     */
     _parent: null,

     /**
        @ignore
        Property: lastAtt
        Last memorized attribute.
     */
     _lastAtt: '',

     /**
        @ignore
        Method: $
        Performs a find query on the current jpath object.

        Parameters:
          str - mixed, find query to perform. Can consist of a nodename or nodename path or function object or integer.

        Return:
          jpath - Returns the resulting jpath object after performing find query.

     */
    /**
    * @ignore
    * @param {string} str
    * @param {boolean} [bCreate] if true, force object creation
    * @param {boolean} [isSSCall]
    */
    '$': function ( str, bCreate, isSSCall )
    {
        var result = null;
        var working = this;

        if ( this.json && str !== null )
        {
           switch ( typeof(str) )
           {
              case 'function':
                 result = this.f(str).json;
              break;

              case 'number':
                 result = this.json[str] || null;
              break;

              case 'string':
                 var names = str.split('/');

                 //foreach slash delimited node name//
                 for ( var i=0; i<names.length ; i++ )
                 {
                    var name = new RegExp('^' + names[i].replace(/\*/g,'.*') + '$');
                    var isArray = (working.json instanceof Array);
                    var a = new Array();
                   var lastAtt = '';

                    //foreach working node property//
                    for ( var p in working.json )
                    {
                       if ( typeof( working.json[p] ) != 'function' )
                       {
                          //if ( isArray && (arguments.callee.caller != this.$$) )
                          if ( isArray && (!isSSCall) )
                          {
                             var res = this.findAllByRegExp( name, working.json[p] );
                             a = a.concat( res );
                          }
                          else if ( name.test(p) )
                          {
                             a.push( working.json[p] );
                            lastAtt = p;
                          }
                       }
                    }
                    if (bCreate && ( a.length==0)) {
                      // force creation
                      if (working.json && isArray && (typeof working.json[0] === 'object')) {
                        lastAtt = names[i];
                        working.json[0][lastAtt] = {};
                        a.push( working.json[0][lastAtt] );
                      } else {
                        lastAtt = names[i];
                        working.json[lastAtt] = {};
                        a.push( working.json[lastAtt] );
                      }
                    }
                    working = new JPath( ( a.length==0 ? null : ( ( a.length == 1) ? a[0] : a ) ), working, lastAtt );
                 }

                 return working;
              break;
           }
        }

        return new JPath( result, this );
     },

     /**
      * @ignore
        Method: $$
        Performs a global, recursive find query on the current jpath object.

        Parameters:
          str - mixed, find query to perform. Can consist of a nodename or nodename path or function object or integer.

        Return:
          jpath - Returns the resulting jpath object after performing find query.

     */
    /**
    * @ignore
    * @param {string} str
    * @param {boolean} [bCreate] if true, force object creation
    */
     '$$': function( str, bCreate )
     {
        var r = this.$(str, false, true).json; // don't propagate 'bCreate'
        var arr = new Array();

        if ( r instanceof Array )
           arr = arr.concat(r);
        else if ( r !== null )
           arr.push(r);

        for ( var p in this.json )
        {
           if ( typeof( this.json[p] ) == 'object' )
           {
              arr = arr.concat( new JPath( this.json[p], this ).$$(str, bCreate).json );
           }
        }

        return new JPath( arr, this );
     },

     /**
      * @ignore
        Method: findAllByRegExp
        Looks through a list of an object properties using a regular expression

        Parameters:
           re - regular expression, to use to search with
           obj - object, the object to search through

        Returns:
           array - resulting properties
     */
     findAllByRegExp: function( re, obj )
     {
        var a = new Array();

        ctx.each(obj, function(p, value) {
           if ( obj instanceof Array )
           {
              a = a.concat( this.findAllByRegExp( re,value ) );
           }
           else if ( typeof(value ) != 'function' && re.test(p) )
           {
              //a.push( value );
              a = a.concat( value );
           }
        });
//        for ( var p in obj )
//        {
//        }

        return a;
     },

     /**
      * @ignore
        Method: get
        Returns the object

        Parameters:
           re - regular expression, to use to search with
           obj - object, the object to search through

        Returns:
           array - resulting properties
     */
     get: function( )
     {
        return this.json;
     },

     /**
      * @ignore
        Method: set
        Returns the object

        Parameters:
           re - regular expression, to use to search with
           obj - object, the object to search through

        Returns:
           array - resulting properties
     */
      set: function( value, bRemove )
      {
        var res = false;
        if (this._lastAtt && this._parent && this._parent.json) {
          if (bRemove) {
            if (this._parent.json[this._lastAtt] !== undefined) {
              delete this._parent.json[this._lastAtt];
              res = true;
            }
          } else {
            if ((typeof this._parent.json[this._lastAtt] === 'object') && (typeof value === 'object'))
              ctx.set(value, this._parent.json[this._lastAtt]);
            else
              this._parent.json[this._lastAtt] = value;
            res = true;
          }
        }
        return res;
      },

     /**
      * @ignore
        Method: query (beta)
        Performs a find query on the current jpath object using a single string similar to xpath. This method
        is currently expirimental.

        Parameters:
          str - string, full xpath-like query to perform on the current object.
          value - Object|string, optional value or object to be set.

        Return:
          mixed - Returns the resulting json value after performing find query.

     */
    /**
    * @param {string} str
    * @param {*} [value]
    * @param {boolean} [bCreate] if true, force object creation
    * @param {boolean} [bRemove] if true, force object deletion
    */
     query: function( str, value, bCreate, bRemove )
     {
//        var re = {
//           " and ":" && ",
//           " or ":" || ",
//           "([\\#\\*\\@a-z\\_][\\*a-z0-9_\\-]*)(?=(?:\\s|$|\\[|\\]|\\/))" : "\$('$1').",
//           "\\[([0-9])+\\]" : "\$($1).",
//           "\\.\\." : "parent().",
//           "\/\/" : "$",
//           "(^|\\[|\\s)\\/" : "$1root().",
//           "\\/" : '',
//           "([^\\=\\>\\<\\!])\\=([^\\=])" : '$1==$2',
//           "\\[" : "$(function(j){ with(j){return(",
//           "\\]" : ");}}).",
//           "\\(\\.":'(',
//           "(\\.|\\])(?!\\$|\\p)":"$1json",
//           "count\\(([^\\)]+)\\)":"count('$1')"
//        };
      var bSet = (typeof value !== 'undefined' ?  true : false );
      var re = {
         " and ":" && ",
         " or ":" || ",
         "([\\#\\*\\@a-z\\_][\\*a-z0-9_\\-]*)(?=(?:\\s|$|\\[|\\]|\\/))" : '$(\'$1\', bCreate).',
         "('\\)\\.([^$|\\[|\\]|\\/]+)\"])" : '$2\').]',
         "\\[([0-9])+\\]" : '$($1, false).',
         '("\\$\\(\')' : "\\$\\('",
         "\\.\\." : "parent().",
         "\/\/" : "$",
         "(^|\\[|\\s)\\/" : "$1root().",
         "\\/" : '',
         "([^\\=\\>\\<\\!])\\=([^\\=])" : '$1==$2',
         "\\[" : "$(function(j){ with(j){return(",
         "\\!": "false === ",
         "\\]" : ");}}, false).",
         "\\(\\.":'(',
         "(\\.|\\])[^$](?!\\$|\\p)": "$1get()",
         "(\\.|\\])$(?!\\$|\\p)": (bSet ? "$1set(value, bRemove)" : "$1get()"),
         "starts\\-with\\(([^\\),]+),\\s?([^\\)]+)\\)":"startsWith('$1', $2)",
         "ends\\-with\\(([^\\),]+),\\s?([^\\)]+)\\)":"endsWith('$1', $2)",
         "contains\\(([^\\),]+),\\s?([^\\)]+)\\)":"contains('$1', $2)",
         "matches\\(([^\\),]+),\\s?([^\\)]+)\\)":"matches('$1', new RegExp($2))",
         "count\\(([^\\)]+)\\)":"count('$1')"
      };
        var val = String(str).trim();
        //save quoted strings//
        //var quotes = new RegExp('/(\'|\")([^\\1]*)\\1/');
        var quotes = /(\'|\")([^\1]*?)\1/;
        var saves = new Array();
        while ( quotes.test(val) )
        {
           saves.push( val.match(quotes)[2] );
           val = val.replace(quotes,'%'+ (saves.length-1) +'%');
        }

        for ( var expression in re )
        {
           val = val.replace( new RegExp(expression,'ig'), re[expression] );
        }
        val = 'this.' + val.replace(/\%(\d+)\%/g,'saves[$1]');

        val = val + ";";

        if ((val.indexOf('.get()') == -1) && (val.indexOf('.set(value, bRemove)') == -1)) {
          // invalid query
          throw new Error(e.error.InvalidArgument, 'jPath.query: invalid syntax \'' + str + '\'');
        }
        var res = [];
        try {
          res = eval(val);
        } catch (ex) {
          throw new Error(e.error.InvalidArgument, 'jPath.query: invalid syntax \'' + str + '\'');
        }

        return res;
     },

     /**
      * @ignore
        Method: f
        Performs the equivilant to an xpath predicate eval on the current nodeset.

        Parameters:
          f - function, an iterator function that is executed for every json node and is expected to return a boolean
          value which determines if that particular node is selected. Alternativly you can submit a string which will be
          inserted into a prepared function.

        Return:
          jpath - Returns the resulting jpath object after performing find query.

     */
     f: function ( iterator )
     {
        var a = new Array();

        if ( typeof(iterator) == 'string' )
        {
           eval('iterator = function(j){with(j){return('+ iterator +');}}');
        }
        var lastAtt = '';
        for ( var p in this.json )
        {
          var j = new JPath(this.json[p], this);
          j.index = p;
          if ( iterator( j ) )
          {
            a.push( this.json[p] );
            lastAtt = p;
          }
        }

        return new JPath( a, this, lastAtt );
     },

     /**
      * @ignore
        Method: parent
        Returns the parent jpath object or itself if its the root node

        Return:
          jpath - Returns the parent jpath object or itself if its the root node

     */
     parent: function()
     {
        return ( (this._parent) ? this._parent : this );
     },

     /**
      * @ignore
        Method: position
        Returns the index position of the current node. Only valid within a function or predicate

        Return:
          int - array index position of this json object.
     */
     position: function()
     {
        return this.index;
     },

     /**
      * @ignore
        Method: last
        Returns true if this is the last node in the nodeset. Only valid within a function or predicate

        Return:
          booean - Returns true if this is the last node in the nodeset
     */
     last: function()
     {
        return (this.index == (this._parent.json.length-1));
     },

     /**
      * @ignore
        Method: count
        Returns the count of child nodes in the current node

        Parameters:
           string - optional node name to count, defaults to all

        Return:
          booean - Returns number of child nodes found
     */
     count: function(n)
     {
        var found = this.$( n || '*').json;
        return ( found ? ( found instanceof Array ? found.length : 1 ) : 0 );
     },

   startsWith: function(n, s)
   {
      var found = this.$( n || '*').json;
      if( found !== null && found.indexOf(s) === 0)
      {
          return found;
      }
      return;
   },

   endsWith: function(n, s)
   {
      var found = this.$( n || '*').json,
          d = found ? found.length - s.length : -1;

      if( found !== null && d >= 0 && found.lastIndexOf(s) === d)
      {
          return found;
      }
      return;
   },

   /*

   */
   contains: function(n, s)
   {
      var found = this.$( n || '*').json;
      if( found !== null && found.indexOf(s) > -1)
      {
          return found;
      }
      return;
   },

   /*

   */
   matches: function(n, re)
   {
      var found = this.$( n || '*').json;

      if(found !== null && re.test(found))
      {
          return found;
      }

      return;
   },
     /**
      * @ignore
        Method: root
        Returns the root jpath object.

        Return:
          jpath - The top level, root jpath object.
     */
     root: function ()
     {
        return ( this._parent ? this._parent.root() : this );
     }

  };

 /**
  * @ignore
  * Custom replacer function used to stringify objects without failing 'circular' references
  * @method serializer
  * @param {Array<string>|function(string,*)|null} [replacer] transforms values and properties encountered while stringifying; if an array, specifies the set of properties included in objects in the final string
  * @param {function(string,*)} [cycleReplacer] function to be used as replacer for circular references.
  * @param {boolean} [isShort] if 'true', serialize using short description if objects owns a method 'ctxShort()' (default is true)
  * @see https://github.com/isaacs/json-stringify-safe/blob/master/stringify.js
  * @private
  */
  function serializer(replacer, cycleReplacer, isShort) {
    var stack = [], keys = []
    if (cycleReplacer == null) cycleReplacer = function(key, value) {
      if (stack[0] === value) return "[~]"
      return "[~." + keys.slice(0, indexOf(stack, value)).join(".") + "]"
    }
    return function(key, value) {
      if (stack.length > 0) {
        var thisPos = indexOf(stack, this) ;
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this) ;
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key) ;
        if (~indexOf(stack, value)) value = cycleReplacer.call(this, key, value) ;
      } else {
        stack.push(value);
      }
      var properties;
      if (isShort && value && ('function' === typeof value.ctxShort)) {
        properties = value.ctxShort();
      }
      if (properties) {
        var obj = {};
        ctx.each(properties, function(id, property) {
          obj[property] = value[property];
        });
        value = obj;
      }
//      if (isShort && ( key == 'ctxType')) {
//        value = undefined; // skip 'ctxType'
//      }
      return replacer == null ? value : replacer.call(this, key, value) ;
    }
  }

 /**
  * Custom 'indexOf' function.
  * @method  indexOf
  * @param   {Array} tab Array to be searched
  * @param   {*} obj Object to be searched
  * @param   {number} [start] The index to start the search at (by default, 0)
  * @path    ctx.json.indexOf
  */
  function indexOf(tab, obj, start) {
    for (var i = (start || 0); i < tab.length; i++) {
      if (i in tab && tab[i] === obj) { return i; }
    }
    return -1;
  }

//  /*
//   * JsonSQL
//   * By: Trent Richardson [http://trentrichardson.com]
//   * Version 0.1
//   * Last Modified: 1/1/2008
//   *
//   * Copyright 2008 Trent Richardson
//   *
//   * Licensed under the Apache License, Version 2.0 (the "License");
//   * you may not use this file except in compliance with the License.
//   * You may obtain a copy of the License at
//   *
//   *     http://www.apache.org/licenses/LICENSE-2.0
//   *
//   * Unless required by applicable law or agreed to in writing, software
//   * distributed under the License is distributed on an "AS IS" BASIS,
//   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   * See the License for the specific language governing permissions and
//   * limitations under the License.
//   */
  var jsonSql = (function  () {
    var self = {};
    var returnFields = function(scope,fields){
      if(fields.length == 0)
        fields = ["*"];

      if(fields[0] == "*")
        return scope;

      var returnobj = {};
      for(var i in fields)
        returnobj[fields[i]] = scope[fields[i]];

      return returnobj;
    };

   /**
    * @ignore
    * @param {string} json
    * @param {Object} jsonsql_o
    * @return {Array<string>} Result value
    * @suppress {es5Strict } warning "The 'with' statement cannot be used in ES5 strict mode."
    */
    var returnFilter = function(json, jsonsql_o){

      var jsonsql_scope = eval(jsonsql_o.from);
      var jsonsql_result = [];
      //var jsonsql_rc = 0;
      if (jsonsql_o.where == "")
        jsonsql_o.where = "true";
      for (var jsonsql_i in jsonsql_scope){
        with (jsonsql_scope[jsonsql_i]){
          if (eval(jsonsql_o.where)){
            //jsonsql_result[jsonsql_rc++] = returnFields(jsonsql_scope[jsonsql_i], jsonsql_o.fields);
            jsonsql_result.push(returnFields(jsonsql_scope[jsonsql_i], jsonsql_o.fields));
          }
        }
      }
      return jsonsql_result;
    };

    var returnOrderBy = function(result,orderby,order){
      if(orderby.length == 0)
        return result;
      result.sort(function(a,b){
        switch(order.toLowerCase()){
          case "desc": return (eval('a.'+ orderby[0] +' < b.'+ orderby[0]))? 1:-1;
          case "asc":  return (eval('a.'+ orderby[0] +' > b.'+ orderby[0]))? 1:-1;
          case "descnum": return (eval('a.'+ orderby[0] +' - b.'+ orderby[0]));
          case "ascnum":  return (eval('b.'+ orderby[0] +' - a.'+ orderby[0]));
        }
      });
      return result;
    };

    var returnLimit = function(result,limit){
      switch(limit.length){
        case 0: return result;
        case 1: return result.splice(0,limit[0]);
        case 2: return result.splice(limit[0]-1,limit[1]);
      }
    };

    var parse = function(json,ops){
      var o = { fields:["*"], from:"json", where:"", orderby:[], order: "asc", limit:[] };
      for(var i in ops) o[i] = ops[i];

      var result = [];
      result = returnFilter(json,o);
      result = returnOrderBy(result,o.orderby,o.order);
      result = returnLimit(result,o.limit);

      return result;
    };

    self.query = function(json, sql) {

      var returnfields = sql.match(/^(select)\s+([a-z0-9_\,\.\s\*]+)\s+from\s+([a-z0-9_\.]+)(?: where\s+\((.+)\))?\s*(?:order\sby\s+([a-z0-9_\,]+))?\s*(asc|desc|ascnum|descnum)?\s*(?:limit\s+([0-9_\,]+))?/i);
      if (!returnfields) {
        return null;
      }
      var ops = {
        fields: returnfields[2].replace(' ','').split(','),
        from: returnfields[3].replace(' ',''),
        where: (!returnfields[4]) ? "true" : returnfields[4],
        orderby: (!returnfields[5]) ? [] : returnfields[5].replace(' ','').split(','),
        order: (!returnfields[6]) ? "asc" : returnfields[6],
        limit: (!returnfields[7]) ? [] : returnfields[7].replace(' ','').split(',')
      };

      return parse(json, ops);
    }
    return self;
  })();

//   * JSONPath 0.8.0 - XPath for JSON
//   * Copyright (c) 2007 Stefan Goessner (goessner.net)
//   * Licensed under the MIT (MIT-LICENSE.txt) licence.
  /**
   * @ignore
   * @see http://goessner.net/articles/JsonPath/
   * @param {Object} obj
   * @param {string} expr
   * @param {*} [arg]
   */
  function jsonPath(obj, expr, arg) {
     var P = {
        resultType: arg && arg.resultType || "VALUE",
        result: [],
        normalize: function(expr) {
           var subx = [];
           return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                      .replace(/'?\.'?|\['?/g, ";")
                      .replace(/;;;|;;/g, ";..;")
                      .replace(/;$|'?\]|'$/g, "")
                      .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
        },
        asPath: function(path) {
           var x = path.split(";"), p = "$";
           for (var i=1,n=x.length; i<n; i++)
              p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
           return p;
        },
        store: function(p, v) {
           if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
           return !!p;
        },
        trace: function(expr, val, path) {
           if (expr) {
              var x = expr.split(";"), loc = x.shift();
              x = x.join(";");
              if (val && val.hasOwnProperty(loc))
                 P.trace(x, val[loc], path + ";" + loc);
              else if (loc === "*")
                 P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
              else if (loc === "..") {
                 P.trace(x, val, path);
                 P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
              }
              else if (/,/.test(loc)) { // [name1,name2,...]
                 for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                    P.trace(s[i]+";"+x, val, path);
              }
              else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                 P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
              else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                 P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
              else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                 P.slice(loc, x, val, path);
           }
           else
              P.store(path, val);
        },
        walk: function(loc, expr, val, path, f) {
           if (val instanceof Array) {
              for (var i=0,n=val.length; i<n; i++)
                 if (i in val)
                    f(i,loc,expr,val,path);
           }
           else if (typeof val === "object") {
              for (var m in val)
                 if (val.hasOwnProperty(m))
                    f(m,loc,expr,val,path);
           }
        },
        slice: function(loc, expr, val, path) {
           if (val instanceof Array) {
              var len=val.length, start=0, end=len, step=1;
              loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start, 10);end=parseInt($2||end, 10);step=parseInt($3||step, 10);});
              start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
              end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
              for (var i=start; i<end; i+=step)
                 P.trace(i+";"+expr, val, path);
           }
        },
        eval: function(x, _v, _vname) {
           try { return $ && _v && eval(x.replace(/@/g, "_v")); }
           catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
        }
     };

     var $ = obj;
     if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
        P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
        return P.result.length ? P.result : false;
     }
  }

  var self =
  /** @lends ctx.json */
  {
   /**
    * Reads a text in CSV format, returns an 2-dimension array.
    * @description
    * This will parse a delimited string into an array of arrays. The default delimiter is the ','.
    *
    * <wrap help> //Example://</wrap>
<code javascript>
// source text is :
var txt = "A, B, C \n
 1, 2, 3 \n
 6, 5, 4 ";
var obj = ctx.json.CSV2Array( txt );
// obj is [["A","B","C"],["1","2","3"],["6","5","4"]]
</code>
    * @method  CSV2Array
    * @path    ctx.json.CSV2Array
    * @param   {string} strData CSV file with headers
    * @param   {string} [strDelimiter] Splitter character (default is ',')
    * @param   {string} [newLine] New line character (default is '\n')
    * @see     http://stackoverflow.com/a/1293163/2343
    * @return  {Object} Result object
    */
    CSV2Array : function ( strData, strDelimiter, newLine ){
      ctx.notifyAction('ctx.json.CSV2Array');
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");
      newLine = (newLine || "\n");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );

      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;

      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
          ){

          // Since we have reached a new row of data,
          // add an empty row to our data array.
          arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

          // We found a quoted value. When we capture
          // this value, unescape any double quotes.
          strMatchedValue = arrMatches[ 2 ].replace(
            new RegExp( "\"\"", "g" ),
            "\""
            );
        } else {
          // We found a non-quoted value.
          strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
      }
      // Return the parsed data.
      return( arrData );
    },

   /**
    * Gets a text in CSV format and returns an object.
    * @description
    * The first line is supposed to be the header, with the column names.
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
// source text is:
var txt = "A, B, C \n
 1, 2, 3 \n
 6, 5, 4 ";
var obj = ctx.json.CSV2Object( txt );
// obj is [{"A":"1", "B":"2","C":"3"},{"A":"6", "B":"5","C":"4"}]
</code>
    *
    * <wrap help> //Example://</wrap>
<code javascript>
// 'ProductMapping.csv' is a Windows UTF8 CSV file, with ';' separator
var file = ctx.options.path.bin + "/ProductMapping.csv";
if( ctx.fso.file.exist( file ) ) {
  var txt = ctx.readFile( file );
  var tab = ctx.json.CSV2Object( txt, ';', '\r\n' );
}
</code>
    * @method  CSV2Object
    * @path    ctx.json.CSV2Object
    * @param   {string} csv CSV file with headers
    * @param   {string} [splitter] Splitter character (default is ',')
    * @param   {string} [newLine] New line character (default is '\n')
    * @param   {number} [headerLine] Index of the line containing the column headers (default is 0)
    * @return  {Object} Result object
    */
    CSV2Object : function (csv, splitter, newLine, headerLine) {
      ctx.notifyAction('ctx.json.CSV2Object');
      var arrData = self.CSV2Array(csv, splitter, newLine);
      headerLine = headerLine || 0;
      var result = [];
      var headers = arrData[headerLine];
      for ( var i = headerLine + 1; i < arrData.length; i++ ) {
        var obj = {};
        for ( var j = 0; j < headers.length; j++ ) {
          obj[headers[j]] = arrData[i][j];
        }
        result.push(obj);
      }
      return result;
    },

   /**
    * Generates a text in CSV format, based on an object.
    * @description
    * The first line will contain column names, based on object attribute names.
    *
    * <wrap help> //Example://</wrap>
<code javascript>
// source text is:
var obj = [ {"A":"1", "B":"2", "C":"3"}, {"A":"6", "B":"5", "C":"4"} ];
var txt = ctx.json.object2CSV( obj, ',', '\n' );
// txt is: "A,B,C\n1,2,3\n6,5,4";
</code>
    *
    * @method  object2CSV
    * @path    ctx.json.object2CSV
    * @param   {Object} obj Object to be serialized
    * @param   {string} [splitter] Splitter character (default is ',')
    * @param   {string} [newLine] New line character (default is '\r\n')
    * @return  {string} Result string in CSV format
    */
    object2CSV : function (obj, splitter, newLine) {
      ctx.notifyAction('ctx.json.object2CSV');
      var txtLine = '';
      var txt = '';
      var value = '';
      var firstLine = true;
      /** @type {string} */ var split = splitter || ",";
      /** @type {string} */ var newL = newLine || "\r\n";
      ctx.each(obj, function(lineIndex, line) {
        txtLine = '';
        ctx.each(line, function(colId, value) {
          if (colId && (colId[0]  != '_')) { // skip attributes starting with '_'
            if (firstLine) {
              if (txt) txt = txt + split;
              txt = txt + colId;
            }
            if (txtLine) txtLine = txtLine + split;
            if (typeof value === 'string') {
              if ((value.indexOf(split) >= 0) || (value.indexOf(newL) >= 0))
              {
                // escape splitter and newLine characters : if the value contains some, use double quotes
                //value = value.replace()
                txtLine = txtLine + '"' + value + '"';
              } else {
                txtLine = txtLine + value;
              }
            } else {
              txtLine = txtLine + String(value);
            }
          }
        });
        txt = txt + newL;
        txt = txt + txtLine;
        firstLine = false;
      });
      return txt;
    },

   /**
    * Parses a JSON string to return a Javascript object.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript>  var xml = ctx.json.parse( "{ \"firstname\": \"Joe\", \"name\": \"Smith\" }" );</code>
    * @method  parse
    * @path    ctx.json.parse
    * @param   {string} text The string to parse
    * @param   {function(string,*)} [reviver] If a function, prescribes how the value originally produced by parsing is transformed, before being returned
    * @see     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    * @return  {*} The parsed object
    */
    parse : function (text, reviver) {
      var obj = null;
      try {
        obj = JSON.parse(text, reviver);
        //obj = JSON.parse2(text, reviver);
      } catch (ex) {
        ctx.log(ex, e.logIconType.Warning, 'ctx.json.parse failed: '+ ex.name + ' ('+ ex.number + '): ' + ex.message);
      }
      return obj;
    },

   /**
    * Executes a 'JSonPath-like' query in a Javascript object.
    * @method  search
    * @path    ctx.json.search
    * @param   {Object} obj Object to be searched
    * @param   {string} path Request path
    * @param   {boolean} [returnPath] If ''true'', returns a set of paths instead of object value
    * @return  {*} The JSON object
    */
    search : function (obj, path, returnPath) {
      return jsonPath(obj, path, (returnPath ? {resultType : 'PATH'} : undefined));
    },

   /**
    * Executes a 'SQL-like' query in a Javascript object.
    * @method  searchSQL
    * @path    ctx.json.searchSQL
    * @param   {Object} obj Object to be searched
    * @param   {string} path Request path
    * @return  {*} The JSON object
    */
    searchSQL : function (obj, path) {
      return jsonSql.query(obj, path);
    },

   /**
    * Executes a 'XPath-like' query in a Javascript object (and sets value if provided).
    * @method  searchXPath
    * @path    ctx.json.searchXPath
    * @param   {Object} obj Object to be searched
    * @param   {string} path Request path
    * @param   {*} [value] Value or object to be set
    * @param   {boolean} [bCreate] If ''true'', force object creation
    * @param   {boolean} [bRemove] If ''true'', force object deletion
    * @return  {*} The JSON object
    */
    searchXPath : function (obj, path, value, bCreate, bRemove) {
      var jp = new JPath(obj);
      return jp.query(path, value, bCreate, bRemove);
    },

   /**
    * Creates and returns a JPath object.
    * @method  getJPath
    * @path    ctx.json.getJPath
    * @param   {Object} obj Object to be searched
    * @return  {*} The JPath object
    */
    getJPath : function (obj) {
      return new JPath(obj);
    },

   /**
    * Serializes a Javascript object to return a JSON string.
    * @description
    * The function removes circular references.
    *
    * <wrap help> //Example://</wrap>
<code javascript>
function escape( key, val ) { ... }
var txt = ctx.json.stringify( data, escape );
</code>
    * @method  stringify
    * @path    ctx.json.stringify
    * @param   {*} value Object to be serialized
    * @param   {Array<string>|function(string,*)|null} [replacer] Transforms values and properties encountered while stringifying; if an array, specifies the set of properties included in objects in the final string
    * @param   {number|string} [space] Causes the resulting string to be pretty-printed
    * @param   {function(string,*)} [cycleReplacer] Function to be used as replacer for circular references
    * @param   {boolean} [isShort] if ''true'', serialize using short description
    * @see     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    * @return  {string} JSON string which represents input object
    */
    stringify : function (value, replacer, space, cycleReplacer, isShort) {
      var str = "";
      try {
        //if (isShort !== false) { isShort = true; }
        str = JSON.stringify(value, serializer(replacer, cycleReplacer, isShort), space);
        //str = JSON.stringify2(value, serializer(replacer, cycleReplacer, isShort), space);
      } catch (ex) {
        ctx.log(ex, e.logIconType.Warning, 'ctx.json.stringify failed: '+ ex.name + ' ('+ ex.number + '): ' + ex.message);
        str = "";
      }
      return str;
    }

  };
  return self;
})();

