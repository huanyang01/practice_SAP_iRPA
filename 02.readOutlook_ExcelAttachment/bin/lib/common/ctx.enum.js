/**
 * @module      Enumerations and constants
 * @file        ctx/ctx.enum.js
 * @description The global object 'e' gathers all constants and enumerations which can be used within functions and language.\\
 * \\
 * Enumerations are grouped by category:
 *   * errors: ''e.error.OK'', ''systeme.error.NotImplemented'', ...
 *   * keys: ''e.key.F1'', ''e.key.Shift'', ...
 *   * navigator type: ''e.navigator.IE'', ...
 *   * messbox characteristics: ''e.messbox.appbarType.Right'', ...
 *   * ...
 *
 * Auto-completion can help discovering the possible enumerated values:
 *
 * {{ :lib:ctx:enum_intellisense.png?nolink }}
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Enumeration object
 * @class e
 * @path e
 */
var e = {
  ctxType: 'e'
};

/**
 * @ignore
 * Ajax collection
 * @class     ajax
 * @path      e.ajax
 * @readonly
 */
//e.ajax = ctxAdd(e, 'ajax', {});
e.ajax = {};

/**
 * Ajax call method
 * @enumeration e.ajax.method
 * @enum {string}
 * @path e.ajax.method
 * @var del DELETE method
 * @var get GET method
 * @var head HEAD method
 * @var options OPTIONS method
 * @var post POST method
 * @var put PUT method
 * @readonly
 */
e.ajax.method = {
  del: 'DELETE',
  get: 'GET',
  head: 'HEAD',
  options: 'OPTIONS',
  post: 'POST',
  put: 'PUT'
};

/**
* Ajax request type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.requestType
* @enum {string}
* @path e.ajax.requestType
* @var client Client request (to be used when calling from Web Browser JS engine)
* @var server Server request (to be used when calling from Interactive JS engine)
* @readonly
*/
e.ajax.requestType = {
  client: 'client',
  server: 'server'
};

/**
* Ajax response type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.responseType
* @enum {string}
* @path e.ajax.responseType
* @var arraybuffer The response is an array buffer.
* @var blob The response is binary data.
* @var document The response is a document.
* @var DOMString DOMString (this is the default value)
* @var ms-stream The response is part of a streaming download. This value is supported only for download requests.
* @var text The response is text.
* @readonly
*/
e.ajax.responseType = {
  none: '',
  arrayBuffer: 'arraybuffer',
  blob: 'blob',
  document: 'document',
//  MozBlob: 'moz-blob',
//  MozChunkedText: 'moz-chunked-text',
//  MozChunkedArraybuffer: 'moz-chunked-arraybuffer',
  MSStream: 'ms-stream',
  text: 'text'
};

/**
* Ajax header type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.header
* @enum {string}
* @path e.ajax.header
* @var contentType 'Content-Type' header
* @var cacheControl 'Cache-Control' header
* @readonly
*/
e.ajax.header = {
  contentType: 'Content-Type',
  contentLength: 'Content-Length',
  cacheControl: 'Cache-Control'
};

/**
* Ajax cache type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.cache
* @enum {string}
* @path e.ajax.cache
* @var noCache 'no-cache' type
* @readonly
*/
e.ajax.cache = {
  noCache: 'no-cache'
};

/**
* Ajax content type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.content
* @enum {string}
* @path e.ajax.content
* @var html 'text/html'
* @var base64 'bin.base64'
* @var javascript 'application/javascript'
* @var javascriptText 'text/javascript'
* @var javascriptX 'application/x-javascript'
* @var json 'application/json'
* @var jsonText 'text/json'
* @var form 'application/x-www-form-urlencoded'
* @var text 'text/plain'
* @var xml 'application/xml'
* @var xmlText 'text/xml'
* @readonly
*/
e.ajax.content = {
  html: 'text/html',
  base64: 'bin.base64',
  binary: 'application/octet-stream',
  charsetUTF8: 'charset=utf-8',
  javascript: 'application/javascript',
  javascriptText: 'text/javascript',
  javascriptX: 'application/x-javascript',
  json: 'application/json',
  jsonp: 'jsonp',
  jsonText: 'text/json',
  form: 'application/x-www-form-urlencoded',
  pdf: 'application/pdf',
  text: 'text/plain',
  xml: 'application/xml',
  xmlText: 'text/xml'
};

/**
* Ajax error type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.error
* @path e.ajax.error
* @var timeout timeout
* @var error error
* @var abort abort
* @var parsererror parser error
* @enum {string}
* @readonly
*/
e.ajax.error = {
  none: "",
  timeout: "timeout",
  error: "error",
  abort: "abort",
  parserError: "parsererror"
};

/**
* Ajax content type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.ajax.status
* @enum {number}
* @readonly
*/
e.ajax.status = {
  // 1xx: Information
  Continue: 100,
  SwitchingProtocols: 101,
  Checkpoint: 103,
  // 2xx: Successful
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  // 3xx: Redirection
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,
  ResumeIncomplete: 308,
  // 4xx: Client Error
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  RequestEntityTooLarge: 413,
  RequestURITooLong: 414,
  UnsupportedMediaType: 415,
  RequestedRangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  // 5xx: Server Error
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  NetworkAuthenticationRequired: 511
};

// See: https://www.w3schools.com/tags/ref_httpmessages.asp
e.ajax.statusLabel = {
  '100' : 'Continue',
  '101' : 'Switching Protocols',
  '103' : 'Checkpoint',
  '200' : 'OK',
  '201' : 'Created',
  '202' : 'Accepted',
  '203' : 'Non-Authoritative Information',
  '204' : 'No Content',
  '205' : 'Reset Content',
  '206' : 'Partial Content',
  '300' : 'Multiple Choices',
  '301' : 'Moved Permanently',
  '302' : 'Found',
  '303' : 'See Other',
  '304' : 'Not Modified',
  '305' : 'Use Proxy',
  '307' : 'Temporary Redirect',
  '308' : 'Resume Incomplete',
  '400' : 'Bad Request',
  '401' : 'Unauthorized',
  '402' : 'Payment Required',
  '403' : 'Forbidden',
  '404' : 'Not Found',
  '405' : 'Method Not Allowed',
  '406' : 'Not Acceptable',
  '407' : 'Proxy Authentication Required',
  '408' : 'Request Timeout',
  '409' : 'Conflict',
  '410' : 'Gone',
  '411' : 'Length Required',
  '412' : 'Precondition Failed',
  '413' : 'Request Entity Too Large',
  '414' : 'Request-URI Too Long',
  '415' : 'Unsupported Media Type',
  '416' : 'Requested Range Not Satisfiable',
  '417' : 'Expectation Failed',
  '500' : 'Internal Server Error',
  '501' : 'Not Implemented',
  '502' : 'Bad Gateway',
  '503' : 'Service Unavailable',
  '504' : 'Gateway Timeout',
  '505' : 'HTTP Version Not Supported',
  '511' : '511 Network Authentication Required'
};


///**
// * Predefined color collection
// * @class e.color
// * @path e.color
// * @readonly
// */
e.color = {};

/**
* Predefined color collection represented by RGB array
* @class e.color.rgb
* @path e.color.rgb
* @enum Array<number>
* @readonly
*/
e.color.rgb = {
  aqua:[51,204,204],
  black:[0,0,0],
  blue:[0,0,255],
  blueGray:[102,102,153],
  brightGreen:[0,255,0],
  brown:[153,51,0],
  cyan:[0,255,255],
  darkBlue:[0,0,128],
  darkGreen:[0,51,0],
  darkRed:[128,0,0],
  darkTeal:[0,51,102],
  darkYellow:[128,128,0],
  gold:[255,204,0],
  gray05:[243,243,243],
  gray10:[230,230,230],
  gray125:[224,224,224],
  gray15:[217,217,217],
  gray20:[204,204,204],
  gray25:[192,192,192],
  gray30:[179,179,179],
  gray35:[166,166,166],
  gray375:[160,160,160],
  gray40:[153,153,153],
  gray45:[140,140,140],
  gray50:[128,128,128],
  gray55:[115,115,115],
  gray60:[102,102,102],
  gray625:[96,96,96],
  gray65:[89,89,89],
  gray70:[76,76,76],
  gray75:[64,64,64],
  gray80:[51,51,51],
  gray85:[38,38,38],
  gray875:[32,32,32],
  gray90:[25,25,25],
  gray95:[12,12,12],
  green:[0,128,0],
  indigo:[51,51,153],
  lavender:[204,153,255],
  lightBlue:[51,102,255],
  lightGreen:[204,255,204],
  lightOrange:[255,153,0],
  lightTurquoise:[204,255,255],
  lightYellow:[255,255,153],
  lime:[153,204,0],
  magenta:[255,0,255],
  oliveGreen:[51,51,0],
  orange:[255,102,0],
  paleBlue:[153,204,255],
  pink:[255,0,255],
  plum:[153,51,102],
  red:[255,0,0],
  rose:[255,153,204],
  seaGreen:[51,153,102],
  skyBlue:[0,204,255],
  tan:[255,204,153],
  teal:[0,128,128],
  violet:[128,0,128],
  white:[255,255,255],
  yellow:[255,255,0]  
};

///**
// * Cryptography collection
// * @class cryptography
// * @path e.cryptography
// * @readonly
// */
e.cryptography = {}

/**
* encryption or signature algorithm
* @description
* __Ex.:__
<code javascript>
var crypt = ctx.cryptography.signMessage(
  'Hello world', 'My', 'MyCertificate',   '',
  e.cryptography.algorithm.PKCS12,
  e.cryptography.storeLocation.LocalMachine);
</code>
* @enumeration e.cryptography.algorithm
* @enum {string}
* @path e.cryptography.algorithm
* @var None Undefined
* @var RSA RSA
* @var PKCS PKCS
* @var RSA_HASH RSA_HASH
* @var RSA_ENCRYPT RSA_ENCRYPT
* @var PKCS_1 PKCS_1
* @var PKCS_2 PKCS_2
* @var PKCS_3 PKCS_3
* @var PKCS_4 PKCS_4
* @var PKCS_5 PKCS_5
* @var PKCS_6 PKCS_6
* @var PKCS_7 PKCS_7
* @var PKCS_8 PKCS_8
* @var PKCS_9 PKCS_9
* @var PKCS_10 PKCS_10
* @var PKCS_12 PKCS_12
* @var RSA_MD2 RSA_MD2
* @var RSA_MD4 RSA_MD4
* @var RSA_MD5 RSA_MD5
* @var RSA_RSA RSA_RSA
* @var RSA_MD2RSA RSA_MD2RSA
* @var RSA_MD4RSA RSA_MD4RSA
* @var RSA_MD5RSA RSA_MD5RSA
* @var RSA_SHA1RSA RSA_SHA1RSA
* @var RSA_SETOAEP_RSA RSA_SETOAEP_RSA
* @var RSAES_OAEP RSAES_OAEP
* @var RSA_MGF1 RSA_MGF1
* @var RSA_PSPECIFIED RSA_PSPECIFIED
* @var RSA_SSA_PSS RSA_SSA_PSS
* @var RSA_SHA256RSA RSA_SHA256RSA
* @var RSA_SHA384RSA RSA_SHA384RSA
* @var RSA_SHA512RSA RSA_SHA512RSA
* @var RSA_DH RSA_DH
* @var RSA_data RSA_data
* @var RSA_signedData RSA_signedData
* @var RSA_envelopedData RSA_envelopedData
* @var RSA_signEnvData RSA_signEnvData
* @var RSA_digestedData RSA_digestedData
* @var RSA_hashedData RSA_hashedData
* @var RSA_encryptedData RSA_encryptedData
* @var RSA_emailAddr RSA_emailAddr
* @var RSA_unstructName RSA_unstructName
* @var RSA_contentType RSA_contentType
* @var RSA_messageDigest RSA_messageDigest
* @var RSA_signingTime RSA_signingTime
* @var RSA_counterSign RSA_counterSign
* @var RSA_challengePwd RSA_challengePwd
* @var RSA_unstructAddr RSA_unstructAddr
* @var RSA_extCertAttrs RSA_extCertAttrs
* @var RSA_certExtensions RSA_certExtensions
* @var RSA_SMIMECapabilities RSA_SMIMECapabilities
* @var RSA_preferSignedData RSA_preferSignedData
* @var TIMESTAMP_TOKEN TIMESTAMP_TOKEN
* @var RFC3161_counterSign RFC3161_counterSign
* @var RSA_SMIMEalg RSA_SMIMEalg
* @var RSA_SMIMEalgESDH RSA_SMIMEalgESDH
* @var RSA_SMIMEalgCMS3DESwrap RSA_SMIMEalgCMS3DESwrap" ,
* @var RSA_SMIMEalgCMSRC2wrap RSA_SMIMEalgCMSRC2wrap
* @var RSA_RC2CBC RSA_RC2CBC
* @var RSA_RC4 RSA_RC4
* @var RSA_DES_EDE3_CBC RSA_DES_EDE3_CBC
* @var RSA_RC5_CBCPad RSA_RC5_CBCPad
* @var ANSI_x942 ANSI_x942
* @var ANSI_x942_DH ANSI_x942_DH
* @var X957 X957
* @var X957_DSA X957_DSA
* @var X957_SHA1DSA X957_SHA1DSA
* @var ECC_PUBLIC_KEY ECC_PUBLIC_KEY
* @var ECC_CURVE_P256 ECC_CURVE_P256
* @var ECC_CURVE_P384 ECC_CURVE_P384
* @var ECC_CURVE_P521 ECC_CURVE_P521
* @var ECDSA_SHA1 ECDSA_SHA1
* @var ECDSA_SPECIFIED ECDSA_SPECIFIED
* @var ECDSA_SHA256 ECDSA_SHA256
* @var ECDSA_SHA384 ECDSA_SHA384
* @var ECDSA_SHA512 ECDSA_SHA512
* @var NIST_AES128_CBC NIST_AES128_CBC
* @var NIST_AES192_CBC NIST_AES192_CBC
* @var NIST_AES256_CBC NIST_AES256_CBC
* @var NIST_AES128_WRAP NIST_AES128_WRAP
* @var NIST_AES192_WRAP NIST_AES192_WRAP
* @var NIST_AES256_WRAP NIST_AES256_WRAP
* @var DATA_STRUCTURE DATA STRUCTURE
* @var DH_SINGLE_PASS_STDDH_SHA1_KDF DH_SINGLE_PASS_STDDH_SHA1_KDF
* @var DH_SINGLE_PASS_STDDH_SHA256_KDF DH_SINGLE_PASS_STDDH_SHA256_KDF
* @var DH_SINGLE_PASS_STDDH_SHA384_KDF DH_SINGLE_PASS_STDDH_SHA384_KDF
* @var DS DS
* @var DSALG DSALG
* @var DSALG_CRPT DSALG_CRPT
* @var DSALG_HASH DSALG_HASH
* @var DSALG_SIGN DSALG_SIGN
* @var DSALG_RSA DSALG_RSA
* @var OIW OIW
* @var OIWSEC OIWSEC
* @var OIWSEC_md4RSA OIWSEC_md4RSA
* @var OIWSEC_md5RSA OIWSEC_md5RSA
* @var OIWSEC_md4RSA2 OIWSEC_md4RSA2
* @var OIWSEC_desECB OIWSEC_desECB
* @var OIWSEC_desCBC OIWSEC_desCBC
* @var OIWSEC_desOFB OIWSEC_desOFB
* @var OIWSEC_desCFB OIWSEC_desCFB
* @var OIWSEC_desMAC OIWSEC_desMAC
* @var OIWSEC_rsaSign OIWSEC_rsaSign
* @var OIWSEC_dsa OIWSEC_dsa
* @var OIWSEC_shaDSA OIWSEC_shaDSA
* @var OIWSEC_mdc2RSA OIWSEC_mdc2RSA
* @var OIWSEC_shaRSA OIWSEC_shaRSA
* @var OIWSEC_dhCommMod OIWSEC_dhCommMod
* @var OIWSEC_desEDE OIWSEC_desEDE
* @var OIWSEC_sha OIWSEC_sha
* @var OIWSEC_mdc2 OIWSEC_mdc2
* @var OIWSEC_dsaComm OIWSEC_dsaComm
* @var OIWSEC_dsaCommSHA OIWSEC_dsaCommSHA
* @var OIWSEC_rsaXchg OIWSEC_rsaXchg
* @var OIWSEC_keyHashSeal OIWSEC_keyHashSeal
* @var OIWSEC_md2RSASign OIWSEC_md2RSASign
* @var OIWSEC_md5RSASign OIWSEC_md5RSASign
* @var OIWSEC_sha1 OIWSEC_sha1
* @var OIWSEC_dsaSHA1 OIWSEC_dsaSHA1
* @var OIWSEC_dsaCommSHA1 OIWSEC_dsaCommSHA1
* @var OIWSEC_sha1RSASign OIWSEC_sha1RSASign
* @var OIWDIR OIWDIR
* @var OIWDIR_CRPT OIWDIR_CRPT
* @var OIWDIR_HASH OIWDIR_HASH
* @var OIWDIR_SIGN OIWDIR_SIGN
* @var OIWDIR_md2 OIWDIR_md2
* @var OIWDIR_md2RSA OIWDIR_md2RSA
* @var INFOSEC INFOSEC
* @var INFOSEC_sdnsSignature INFOSEC_sdnsSignature
* @var INFOSEC_mosaicSignature INFOSEC_mosaicSignature
* @var INFOSEC_sdnsConfidentiality  INFOSEC_sdnsConfidentiality" ,
* @var INFOSEC_mosaicConfidentiality INFOSEC_mosaicConfidentiality
* @var INFOSEC_sdnsIntegrity INFOSEC_sdnsIntegrity
* @var INFOSEC_mosaicIntegrity INFOSEC_mosaicIntegrity
* @var INFOSEC_sdnsTokenProtection  INFOSEC_sdnsTokenProtection" ,
* @var INFOSEC_mosaicTokenProtection INFOSEC_mosaicTokenProtection
* @var INFOSEC_sdnsKeyManagement INFOSEC_sdnsKeyManagement
* @var INFOSEC_mosaicKeyManagement  INFOSEC_mosaicKeyManagement" ,
* @var INFOSEC_sdnsKMandSig INFOSEC_sdnsKMandSig
* @var INFOSEC_mosaicKMandSig INFOSEC_mosaicKMandSig
* @var INFOSEC_SuiteASignature INFOSEC_SuiteASignature
* @var INFOSEC_SuiteAConfidentiality INFOSEC_SuiteAConfidentiality
* @var INFOSEC_SuiteAIntegrity INFOSEC_SuiteAIntegrity
* @var INFOSEC_SuiteATokenProtection INFOSEC_SuiteATokenProtection
* @var INFOSEC_SuiteAKeyManagement  INFOSEC_SuiteAKeyManagement" ,
* @var INFOSEC_SuiteAKMandSig INFOSEC_SuiteAKMandSig
* @var INFOSEC_mosaicUpdatedSig INFOSEC_mosaicUpdatedSig
* @var INFOSEC_mosaicKMandUpdSig INFOSEC_mosaicKMandUpdSig
* @var INFOSEC_mosaicUpdatedInteg INFOSEC_mosaicUpdatedInteg
* @var NIST_sha256 NIST_sha256
* @var NIST_sha384 NIST_sha384
* @var NIST_sha512 NIST_sha512
* @var PKIX_NO_SIGNATURE PKIX_NO_SIGNATURE
* @var ECDSA_SPECIFIED ECDSA_SPECIFIED
* @readonly
*/
e.cryptography.algorithm = {
  none: "",
  RSA: "RSA",
  PKCS: "PKCS",
  RSA_HASH: "RSA_HASH",
  RSA_ENCRYPT: "RSA_ENCRYPT",
  PKCS_1: "PKCS_1",
  PKCS_2: "PKCS_2",
  PKCS_3: "PKCS_3",
  PKCS_4: "PKCS_4",
  PKCS_5: "PKCS_5",
  PKCS_6: "PKCS_6",
  PKCS_7: "PKCS_7",
  PKCS_8: "PKCS_8",
  PKCS_9: "PKCS_9",
  PKCS_10: "PKCS_10",
  PKCS_12: "PKCS_12",
  RSA_MD2: "RSA_MD2",
  RSA_MD4: "RSA_MD4",
  RSA_MD5: "RSA_MD5",
  RSA_RSA: "RSA_RSA",
  RSA_MD2RSA: "RSA_MD2RSA",
  RSA_MD4RSA: "RSA_MD4RSA",
  RSA_MD5RSA: "RSA_MD5RSA",
  RSA_SHA1RSA: "RSA_SHA1RSA",
  RSA_SETOAEP_RSA: "RSA_SETOAEP_RSA",
  RSAES_OAEP: "RSAES_OAEP",
  RSA_MGF1: "RSA_MGF1",
  RSA_PSPECIFIED: "RSA_PSPECIFIED",
  RSA_SSA_PSS: "RSA_SSA_PSS",
  RSA_SHA256RSA: "RSA_SHA256RSA",
  RSA_SHA384RSA: "RSA_SHA384RSA",
  RSA_SHA512RSA: "RSA_SHA512RSA",
  RSA_DH: "RSA_DH",
  RSA_data: "RSA_data",
  RSA_signedData: "RSA_signedData",
  RSA_envelopedData: "RSA_envelopedData",
  RSA_signEnvData: "RSA_signEnvData",
  RSA_digestedData: "RSA_digestedData",
  RSA_hashedData: "RSA_hashedData",
  RSA_encryptedData: "RSA_encryptedData",
  RSA_emailAddr: "RSA_emailAddr",
  RSA_unstructName: "RSA_unstructName",
  RSA_contentType: "RSA_contentType",
  RSA_messageDigest: "RSA_messageDigest",
  RSA_signingTime: "RSA_signingTime",
  RSA_counterSign: "RSA_counterSign",
  RSA_challengePwd: "RSA_challengePwd",
  RSA_unstructAddr: "RSA_unstructAddr",
  RSA_extCertAttrs: "RSA_extCertAttrs",
  RSA_certExtensions: "RSA_certExtensions",
  RSA_SMIMECapabilities: "RSA_SMIMECapabilities",
  RSA_preferSignedData: "RSA_preferSignedData",
  TIMESTAMP_TOKEN: "TIMESTAMP_TOKEN",
  RFC3161_counterSign: "RFC3161_counterSign",
  RSA_SMIMEalg: "RSA_SMIMEalg",
  RSA_SMIMEalgESDH: "RSA_SMIMEalgESDH",
  RSA_SMIMEalgCMS3DESwrap: "RSA_SMIMEalgCMS3DESwrap" ,
  RSA_SMIMEalgCMSRC2wrap: "RSA_SMIMEalgCMSRC2wrap",
  RSA_RC2CBC: "RSA_RC2CBC",
  RSA_RC4: "RSA_RC4",
  RSA_DES_EDE3_CBC: "RSA_DES_EDE3_CBC",
  RSA_RC5_CBCPad: "RSA_RC5_CBCPad",
  ANSI_x942: "ANSI_x942",
  ANSI_x942_DH: "ANSI_x942_DH",
  X957: "X957",
  X957_DSA: "X957_DSA",
  X957_SHA1DSA: "X957_SHA1DSA",
  ECC_PUBLIC_KEY: "ECC_PUBLIC_KEY",
  ECC_CURVE_P256: "ECC_CURVE_P256",
  ECC_CURVE_P384: "ECC_CURVE_P384",
  ECC_CURVE_P521: "ECC_CURVE_P521",
  ECDSA_SHA1: "ECDSA_SHA1",
  ECDSA_SPECIFIED: "ECDSA_SPECIFIED",
  ECDSA_SHA256: "ECDSA_SHA256",
  ECDSA_SHA384: "ECDSA_SHA384",
  ECDSA_SHA512: "ECDSA_SHA512",
  NIST_AES128_CBC: "NIST_AES128_CBC",
  NIST_AES192_CBC: "NIST_AES192_CBC",
  NIST_AES256_CBC: "NIST_AES256_CBC",
  NIST_AES128_WRAP: "NIST_AES128_WRAP",
  NIST_AES192_WRAP: "NIST_AES192_WRAP",
  NIST_AES256_WRAP: "NIST_AES256_WRAP",
  DATA_STRUCTURE: "DATA STRUCTURE",
  DH_SINGLE_PASS_STDDH_SHA1_KDF: "DH_SINGLE_PASS_STDDH_SHA1_KDF",
  DH_SINGLE_PASS_STDDH_SHA256_KDF: "DH_SINGLE_PASS_STDDH_SHA256_KDF",
  DH_SINGLE_PASS_STDDH_SHA384_KDF: "DH_SINGLE_PASS_STDDH_SHA384_KDF",
  DS: "DS",
  DSALG: "DSALG",
  DSALG_CRPT: "DSALG_CRPT",
  DSALG_HASH: "DSALG_HASH",
  DSALG_SIGN: "DSALG_SIGN",
  DSALG_RSA: "DSALG_RSA",
  OIW: "OIW",
  OIWSEC: "OIWSEC",
  OIWSEC_md4RSA: "OIWSEC_md4RSA",
  OIWSEC_md5RSA: "OIWSEC_md5RSA",
  OIWSEC_md4RSA2: "OIWSEC_md4RSA2",
  OIWSEC_desECB: "OIWSEC_desECB",
  OIWSEC_desCBC: "OIWSEC_desCBC",
  OIWSEC_desOFB: "OIWSEC_desOFB",
  OIWSEC_desCFB: "OIWSEC_desCFB",
  OIWSEC_desMAC: "OIWSEC_desMAC",
  OIWSEC_rsaSign: "OIWSEC_rsaSign",
  OIWSEC_dsa: "OIWSEC_dsa",
  OIWSEC_shaDSA: "OIWSEC_shaDSA",
  OIWSEC_mdc2RSA: "OIWSEC_mdc2RSA",
  OIWSEC_shaRSA: "OIWSEC_shaRSA",
  OIWSEC_dhCommMod: "OIWSEC_dhCommMod",
  OIWSEC_desEDE: "OIWSEC_desEDE",
  OIWSEC_sha: "OIWSEC_sha",
  OIWSEC_mdc2: "OIWSEC_mdc2",
  OIWSEC_dsaComm: "OIWSEC_dsaComm",
  OIWSEC_dsaCommSHA: "OIWSEC_dsaCommSHA",
  OIWSEC_rsaXchg: "OIWSEC_rsaXchg",
  OIWSEC_keyHashSeal: "OIWSEC_keyHashSeal",
  OIWSEC_md2RSASign: "OIWSEC_md2RSASign",
  OIWSEC_md5RSASign: "OIWSEC_md5RSASign",
  OIWSEC_sha1: "OIWSEC_sha1",
  OIWSEC_dsaSHA1: "OIWSEC_dsaSHA1",
  OIWSEC_dsaCommSHA1: "OIWSEC_dsaCommSHA1",
  OIWSEC_sha1RSASign: "OIWSEC_sha1RSASign",
  OIWDIR: "OIWDIR",
  OIWDIR_CRPT: "OIWDIR_CRPT",
  OIWDIR_HASH: "OIWDIR_HASH",
  OIWDIR_SIGN: "OIWDIR_SIGN",
  OIWDIR_md2: "OIWDIR_md2",
  OIWDIR_md2RSA: "OIWDIR_md2RSA",
  INFOSEC: "INFOSEC",
  INFOSEC_sdnsSignature: "INFOSEC_sdnsSignature",
  INFOSEC_mosaicSignature: "INFOSEC_mosaicSignature",
  INFOSEC_sdnsConfidentiality : "INFOSEC_sdnsConfidentiality" ,
  INFOSEC_mosaicConfidentiality: "INFOSEC_mosaicConfidentiality",
  INFOSEC_sdnsIntegrity: "INFOSEC_sdnsIntegrity",
  INFOSEC_mosaicIntegrity: "INFOSEC_mosaicIntegrity",
  INFOSEC_sdnsTokenProtection : "INFOSEC_sdnsTokenProtection" ,
  INFOSEC_mosaicTokenProtection: "INFOSEC_mosaicTokenProtection",
  INFOSEC_sdnsKeyManagement: "INFOSEC_sdnsKeyManagement",
  INFOSEC_mosaicKeyManagement : "INFOSEC_mosaicKeyManagement" ,
  INFOSEC_sdnsKMandSig: "INFOSEC_sdnsKMandSig",
  INFOSEC_mosaicKMandSig: "INFOSEC_mosaicKMandSig",
  INFOSEC_SuiteASignature: "INFOSEC_SuiteASignature",
  INFOSEC_SuiteAConfidentiality: "INFOSEC_SuiteAConfidentiality",
  INFOSEC_SuiteAIntegrity: "INFOSEC_SuiteAIntegrity",
  INFOSEC_SuiteATokenProtection: "INFOSEC_SuiteATokenProtection",
  INFOSEC_SuiteAKeyManagement : "INFOSEC_SuiteAKeyManagement" ,
  INFOSEC_SuiteAKMandSig: "INFOSEC_SuiteAKMandSig",
  INFOSEC_mosaicUpdatedSig: "INFOSEC_mosaicUpdatedSig",
  INFOSEC_mosaicKMandUpdSig: "INFOSEC_mosaicKMandUpdSig",
  INFOSEC_mosaicUpdatedInteg: "INFOSEC_mosaicUpdatedInteg",
  NIST_sha256: "NIST_sha256",
  NIST_sha384: "NIST_sha384",
  NIST_sha512: "NIST_sha512",
  PKIX_NO_SIGNATURE: "PKIX_NO_SIGNATURE"
}

/**
* Credential type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.cryptography.credentialType
* @enum {number}
* @path e.cryptography.credentialType
* @var generic Generic
* @var domainPassword Domain password
* @var domainCertificate Domain certificate
* @var domainVisiblePassword Domain visible password
* @var genericCertificate Generic certificate
* @var domainExtended Domain extended
* @readonly
*/
e.cryptography.credentialType = {
  generic : 1,
  domainPassword : 2,
  domainCertificate : 3,
  domainVisiblePassword : 4,
  genericCertificate : 5,
  domainExtended : 6
}

/**
* Credential persist field
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.cryptography.credentialPersist
* @enum {number}
* @path e.cryptography.credentialPersist
* @var none None
* @var session Session
* @var localMachine Local machine
* @var enterprise Enterprise
* @readonly
*/
e.cryptography.credentialPersist = {
  none : 0,
  session : 1,
  localMachine : 2,
  enterprise : 3
}

/**
* Cyphering key type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.cryptography.keyUsage
* @enum {string}
* @path e.cryptography.keyUsage
* @var signature signature/authentication
* @var encryption encryption/decryption
* @readonly
*/
e.cryptography.keyUsage = {
  signature : 'signature',
  encryption : 'encryption'
}

/**
* Cyphering key type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.cryptography.keyType
* @enum {string}
* @path e.cryptography.keyType
* @var none None
* @var container Key container
* @var certificate Certificate
* @var publicKey Public key
* @readonly
*/
e.cryptography.keyType = {
  none : '',
  container : 'container',
  certificate : 'certificate'
}

/**
* Certificate store location
* @description
* __Ex.:__
<code javascript>
var crypt = ctx.cryptography.signMessage(
  'Hello world', 'My', 'MyCertificate',   '',
  e.cryptography.algorithm.PKCS12,
  e.cryptography.storeLocation.LocalMachine);
</code>
* @enumeration e.cryptography.storeLocation
* @enum {number}
* @path e.cryptography.storeLocation
* @var None Undefined
* @var CurrentUser Current User
* @var LocalMachine Local Machine
* @var CurrentService Current Service
* @var Services Services
* @var Users Users
* @var CurrentUserGroupPolicy Current User Group Policy
* @var LocalMachineGroupPolicy Local Machine Group Policy
* @var LocalMachineEnterprise Local Machine Enterprise
* @readonly
*/
e.cryptography.storeLocation = {
  none : 0,
  currentUser : 1,
  localMachine : 2,
  currentService : 4,
  services : 5,
  users : 6,
  currentUserGroupPolicy : 7,
  localMachineGroupPolicy : 8,
  localMachineEnterprise : 9
}

e.data = {}

/**
* Path type for data access
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.pathType
* @enum {number}
* @path e.data.pathType
* @var JsonPath JsonPath syntax
* @var XPath XPath syntax
* @var SQLPath SQL-like syntax
* @readonly
*/
e.data.pathType = {
  JsonPath : 1,
  SQLPath : 2,
  XPath : 3
}

/**
* Data initialization type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.initType
* @enum {string}
* @path e.data.initType
* @var ADD creates a new node even if one already exists with the same name
* @var CREATE creates a new node only if it does not already exist
* @var CRINIT creates a new node if it doesn't exist already. If it exists, it is re-initialized
* @var DEL deletes a node if it exists.
* @readonly
*/
e.data.initType = {
  ADD : 'ADD',
  CREATE : 'CREATE',
  CRINIT : 'CRINIT',
  DEL : 'DEL'
}

/**
* Data initialization or output format
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.data.format
* @enum {string}
* @path e.data.format
* @var CTX existing node defined in the Context
* @var JS Javascript object
* @var JSON text in JSON format
* @var JSONURL URL of an external JSON file
* @var TEXT text without specific format
* @var XML text in XML format
* @var XMLURL URL of an external XML file
* @readonly
*/
e.data.format = {
  none : '',
  bson : 'bson',
  ctx : '2',      // '2' or 'CTX'
  js : '5',
  json : 'json',
  jsonURL : '4',
  text : '6',
  xjson : 'xjson',
  xml : '1',      // '1' or 'XML'
  xmlURL : '0'    // '0' or 'URL'
}

/**
* Platform environment
* @description
* __Ex.:__
<code javascript>
// define production and test URL for MyAppli application
MyAppli.pHome.setPath(e.env.prod, 'https://prodserver/crm/index.html')
MyAppli.pHome.setPath(e.env.dev, 'https://testserver/crm/index.html')
...
// select 'production' as current environment
ctx.options.env = e.env.prod;
...
// start application (with 'production' URL)
MyAppli.pHome.start();
</code>
* @enumeration e.env
* @enum {string}
* @path e.env
* @var none Not defined
* @var prod Poduction
* @var qual Qualification
* @var test Test
* @var dev Development
* @readonly
*/
e.env = {
  none: '',
  prod: 'prod',
  qual: 'qual',
  test: 'test',
  dev: 'dev'
}

/**
* Standard error list
* @description
* __Ex.:__
<code javascript> return e.error.OK; </code>
* @enumeration e.error
* @enum {string}
* @path e.error
* @readonly
* @var None undefined error
* @var OK success
* @var KO generic failure
* @var Fail generic failure
* @var NotImplemented non implemented functions
* @var InvalidArgument invalid arguments in a function call
* @var InvalidCommand unknown command in a function call
* @var NotConnected unconnected channel
* @var UndefinedObject undefined object
* @var NotFound object not found
* @var Duplicated name or identifier is not unique
* @var Reserved name or identifier is reserved
* @var TimeOut treatment or scenario failed in timeout
* @var Canceled treatment or scenario was cancelled
*/
e.error = {
  None : '',
  OK : 'OK',
  KO: 'KO',
  Fail : 'Fail',
  NotImplemented : 'NotImplemented',
  InvalidArgument : 'InvalidArgument',
  InvalidCommand : 'InvalidCommand',
  NotConnected : 'NotConnected',
  NotAuthorized : 'NotAuthorized',
  UndefinedObject : 'UndefinedObject',
  NotFound : 'NotFound',
  Duplicated : 'Duplicated',
  Reserved : 'Reserved',
  TimeOut : 'TimeOut',
  Canceled : 'Canceled'
}

/**
* Standard state list for agent
* @description
* __Ex.:__
<code javascript> e.agentStatus.Idle; </code>
* @enumeration e.agentStatus
* @enum {string}
* @path e.agentStatus
* @readonly
* @var None status is undefined
* @var New job is created but not started
* @var Running job is currently being executed
* @var Pending job has been executed, but is not finalized
* @var Canceled job has been canceled
* @var Successful job is terminated in success state
* @var Failed job is terminated in failure state
*/
e.agentStatus = {
  None : '',
  Idle : 'Idle',
  Ready : 'Ready',
  Paused : 'Paused',
  Warning : 'Warning',
  Error : 'Error',
  Running : 'Running'
}

/**
* Standard status list for a job
* @description
* __Ex.:__
<code javascript> return e.status.Pending; </code>
* @enumeration e.status
* @enum {string}
* @path e.status
* @readonly
* @var None status is undefined
* @var New job is created but not started
* @var Running job is currently being executed
* @var Pending job has been executed, but is not finalized
* @var Canceled job has been canceled
* @var Successful job is terminated in success state
* @var Failed job is terminated in failure state
*/
e.status = {
  None : '',
  New : 'New',
  Running : 'Running',
  Pending : 'Pending',
  Canceled : 'Canceled',
  Successful : 'Successful',
	Rejected : 'Rejected',
  Failed : 'Failed'
}

/**
* Trace collection
* @class trace
* @path e.trace
* @ignore
* @readonly
*/
e.alert = {};

/**
* Alert category
* @enumeration e.alert.category
* @enum {string}
* @path e.alert.level
* @var None Undefined category
* @var Server Server category
* @var Security Security category
* @var Application Application category
* @var Business Business category
* @readonly
*/
e.alert.category = {
  None : '',
  Server : 'Server',
  Security : 'Security',
  Application : 'Application',
  Business : 'Business'
}

/**
* Alert level
* @enumeration e.alert.level
* @enum {string}
* @path e.alert.level
* @var None Undefined level
* @var Info Info level
* @var Warning Warning level
* @var Error Error level
* @var Critical Critical level
* @readonly
*/
e.alert.level = {
  None : '',
  Info : 'Info',
  Warning : 'Warning',
  Error : 'Error',
  Critical : 'Critical'
}
/**
* Job priority
* @description
* __Ex.:__
<code javascript>
job.priority = e.priority.high;
</code>
* @enumeration e.priority
* @enum {number}
* @path e.priority
* @var lowest Very Low priority
* @var low Low priority
* @var normal Normal priority
* @var high High priority
* @var highest Very High priority
* @readonly
*/
e.priority = {
  lowest : 0,
  low : 1,
  normal : 2,
  high : 3,
  highest : 4
}

/**
 * Event collection
 * @class event
 * @path e.event
 * @readonly
 */
e.event = {}

/**
 * Technical event for an application
 * @description
 * __Ex.:__
<code javascript>
GLOBAL.events.START.on(function (ev) {function(ev) { ... });
</code>
* @enumeration e.event.application
* @enum {string}
* @path e.event.application
* @var START application started
* @var INIT application initialized
* @var QUIT application quitting
* @var END application stopped
* @readonly
*/
e.event.application = {
  START : 'START',
  INIT : 'INIT',
  QUIT : 'QUIT',
  END : 'END'
}

/**
* Technical event for an item
* @description
* __Note:__ a TRACK_EVENT should habe been set on the item to trigger the event
*
* __Ex.:__
<code javascript>
LinkedIn.pHome.btDetails.events.COMMAND.on(function(ev) { ... });
</code>
* @enumeration e.event.item
* @enum {string}
* @path e.event.item
* @var SETFOCUS    Set focus
* @var KILLFOCUS   Kill focus
* @var ENABLE      Enable
* @var DISABLE     Disable
* @var COMMAND     Command
* @var UPDATE      Update
* @var SCROLL      Scroll
* @var CLICK       Click
* @var RCLICK      Right click
* @var DBLCLICK    Double click
* @var DBLCLK      Double click
* @var RDBLCLICK   Right double click
* @readonly
*/
e.event.item = {
  SETFOCUS : 'SETFOCUS',
  KILLFOCUS : 'KILLFOCUS',
  ENABLE : 'ENABLE',
  DISABLE : 'DISABLE',
  COMMAND : 'COMMAND',
  UPDATE : 'UPDATE',
  SCROLL : 'SCROLL',
  CLICK : 'CLICK',
  RCLICK : 'RCLICK',
  DBLCLICK : 'DBLCLICK',
  DBLCLK : 'DBLCLK',
  RDBLCLICK : 'RDBLCLICK'
}

/**
* Technical event for a page
* @description
* __Ex.:__
<code javascript>
LinkedIn.pHome.events.LOAD.on(function(ev) { ... });
</code>
* @enumeration e.event.page
* @enum {string}
* @path e.event.page
* @var LOAD page load
* @var UNLOAD page unload
* @var ACTIVATE  page activation
* @var ENABLE page enabling
* @var DISABLE page disabling
* @var SHOW page showing
* @var HIDE page hiding
* @var UPDATE page update
* @var SCROLL page scrolling
* @var SIZE page resizing
* @var RESIZE  page resizing
* @var MENUPOPUP page menu opening
* @var CHANGE page change
* @var SAP_CNX SAP BAPI connection event
* @var SAP_RESP SAP BAPI answer event
* @readonly
*/
e.event.page = {
  LOAD : 'LOAD',
  UNLOAD : 'UNLOAD',
  ACTIVATE : 'ACTIVATE',
  ENABLE : 'ENABLE',
  DISABLE : 'DISABLE',
  SHOW : 'SHOW',
  HIDE : 'HIDE',
  UPDATE : 'UPDATE',
  SCROLL : 'SCROLL',
  SIZE : 'SIZE',
  RESIZE : 'RESIZE',
  MENUPOPUP : 'MENUPOPUP',
  CHANGE : 'CHANGE',
  SAP_CNX : 'SAP_CNX',
  SAP_RESP : 'SAP_RESP'
}

/**
 * Excel constants collection
 * @class excel
 * @path e.excel
 * @readonly
 */
e.excel = {};

/**
 * Enumeration to define the horizontal alignment in Excel
* @description Enumeration to define the horizontal alignment in Excel
* @enumeration e.excel.XlHAlign
* @enum {number}
* @path e.excel.XlHAlign
* @var   xlHAlignCenter Center
* @var   xlHAlignCenterAcrossSelection Center Across Selection
//* @var   xlHAlignDistributed
* @var   xlHAlignFill Fill
* @var   xlHAlignGeneral General
* @var   xlHAlignJustify Justify
* @var   xlHAlignLeft Left
* @var   xlHAlignRight Right
* @readonly
*/
e.excel.XlHAlign = {
  xlHAlignCenter: -4108,
  xlHAlignCenterAcrossSelection: 7,
  //xlHAlignDistributed: -4117,
  xlHAlignFill: 5,
  xlHAlignGeneral: 1,
  xlHAlignJustify: -4130,
  xlHAlignLeft: -4131,
  xlHAlignRight: -4152
}

/**
* Used to define the underline style in Excel
* @description Used to define the underline style in Excel
* @enumeration e.excel.XlUnderlineStyle
* @enum {number}
* @path e.excel.XlUnderlineStyle
* @var xlUnderlineStyleDouble Double thick underline
* @var xlUnderlineStyleDoubleAccounting Two thin underlines placed close together
* @var xlUnderlineStyleNone No underling
* @var xlUnderlineStyleSingle Single
* @readonly
*/
e.excel.XlUnderlineStyle = {
  xlUnderlineStyleDouble : -4119,
  xlUnderlineStyleDoubleAccounting : 5,
  xlUnderlineStyleNone : -4142,
  xlUnderlineStyleSingle :	2
}


/**
* Extended connnectors
* @description
* __Ex.:__
<code javascript>
GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '');
</code>
* @enumeration e.extendedConnector
* @enum {string}
* @path e.extendedConnector
* @var UIAutomation UIAutomation connector
* @var HLLAPI HLLAPI (3270) connector
* @var ExpBar ExpBar (systray, menu bar) connector
* @var Discovery Discovery connector
* @readonly
*/
e.extendedConnector = {
  UIAutomation : 'CxUIADriver.Pilote',
  HLLAPI : 'XsContextor2.ExpIHll2',
  ExpBar : 'XsContextor2.ExpBar2',
  Discovery : 'XsContextor2.ExpBae'
}

/**
* File collection
* @class file
* @path e.file
* @readonly
*/
e.file = {}

/**
* File encoding (Ascii, UTF-8, ...)
* @description
* __Ex.:__
<code javascript>
var file = '...';
var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
</code>
* @enumeration e.file.encoding
* @enum {string}
* @path e.file.encoding
* @var ASCII ASCII
* @var Binary Binary
* @var UTF8 UTF-8
* @var UTF16 UTF-16
* @readonly
*/
e.file.encoding = {
  ASCII : 'iso-8859-1', // 'Windows-1252',
  Binary : 'binary',
  UTF8 : 'utf-8',
  UTF8withoutBOM : 'utf-8-without-bom',
  UTF16 : 'utf-16'
}

/**
* @deprecated use e.file.encoding instead of e.fileEncoding
* @enumeration fileEncoding
* @advanced
* @enum {string}
* @path e.fileEncoding
* @readonly
*/
e.fileEncoding = e.file.encoding;

/**
* File mode used for FTP operations
* @description
* __Ex.:__
<code javascript>
fso.ftp.download('c:\\temp', 'home/temp', fileList, e.file.operation.NoUI);
</code>
* @enumeration e.file.operation
* @enum {number}
* @path e.file.operation
* @var MultiDestFiles  The destination specifies multiple destination files (one for each source file in pFrom) rather than one directory where all source files are to be deposited
* @var Silent don't display progress UI (confirm prompts may be displayed still)
* @var RenameOnCollision automatically rename the source files to avoid the collisions
* @var NoConfirmation don't display confirmation UI, assume "yes" for cases that can be bypassed, "no" for those that can not
* @var AllowUndo enable undo including Recycle behavior for IFileOperation::Delete()
* @var FilesOnly only operate on the files (non folders), both files and folders are assumed without this
* @var SimpleProgress means don't show names of files
* @var NoConfirmMkdir don't dispplay confirmatino UI before making any needed directories, assume "Yes" in these cases
* @var NoErrorUI don't put up error UI, other UI may be displayed, progress, confirmations
* @var NoCopySecurityAttribs dont copy file security attributes (ACLs)
* @var NoRecursion don't recurse into directories for operations that would recurse
* @var NoConnectedElements don't operate on connected elements ("xxx_files" folders that go with .htm files)
* @var WantNukeWarning during delete operation, warn if nuking instead of recycling (partially overrides NOCONFIRMATION)
* @var NoRecurseReparse deprecated; the operations engine always does the right thing on FolderLink objects (symlinks, reparse points, folder shortcuts)
* @var NoUI don't display any UI at all ( = Silent + NoConfirmation + NoConfirmMkdir + NoErrorUI )
* @readonly
*/
e.file.operation = {
  MultiDestFiles        : 1,
  Silent                : 4,
  RenameOnCollision     : 8 ,
  NoConfirmation        : 16,
  AllowUndo             : 64,
  FilesOnly             : 128,
  SimpleProgress        : 256,
  NoConfirmMkdir        : 512,
  NoErrorUI             : 1024,
  NoCopySecurityAttribs : 2048,
  NoRecursion           : 4096,
  NoConnectedElements   : 8192,
  WantNukeWarning       : 16384,
  NoRecurseReparse      : 32768,
  NoUI                  : (4 + 16 + 512 + 1024)
}

/**
* @deprecated use e.file.operation instead of e.fileOperation
* @enumeration fileOperation
* @advanced
* @enum {number}
* @path e.fileOperation
* @readonly
*/
e.fileOperation = e.file.operation;

/**
* Html collection
* @class html
* @path e.html
* @readonly
*/
e.html = {}

/**
* HTML attribute type (id, name, class, ...)
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.html.type
* @enum {string}
* @path e.html.type
* @var id object id
* @var name object name
* @var tag object tag
* @var class object class
* @readonly
*/
e.html.event = {
  blur : 'blur',
  click: 'click',
  contextmenu: 'contextmenu',
  dblclick: 'dblclick',
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  mousemove: 'mousemove',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave',
  submit: 'submit'
}


/**
* HTML attribute type (id, name, class, ...)
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.html.type
* @enum {string}
* @path e.html.type
* @var id object id
* @var name object name
* @var tag object tag
* @var class object class
* @readonly
*/
e.html.type = {
  id : 'id',
  name : 'name',
  tag : 'tag',
  className : 'class'
}

/**
* Relative insertion position for HTML objects
* @description
* __Ex.:__
<code javascript>
// create a myCompany button inside MyWebAppli MyPage page, before 'company' object
var sLabel = 'Copy to myCompany';
var sIcon = 'http://.../myCompany_icon.jpg';
this.insertImageButton('btMyCompany', MyWebAppli.MyPage.oCompany, sIcon, sLabel, e.html.position.beforeBegin);
</code>
* @enumeration e.html.position
* @enum {string}
* @path e.html.position
* @var beforeBegin Inserts html immediately before the object.
* @var afterBegin Inserts html after the start of the object but before all other content in the object.
* @var beforeEnd Inserts html immediately before the end of the object but after all other content in the object.
* @var afterEnd Inserts html immediately after the end of the object
* @readonly
*/
e.html.position = {
  beforeBegin : 'beforeBegin',
  afterBegin : 'afterBegin',
  beforeEnd : 'beforeEnd',
  afterEnd : 'afterEnd'
}

/**
* @deprecated use e.html.position instead of e.htmlPosition
* @enumeration htmlPosition
* @advanced
* @enum {string}
* @path e.htmlPosition
* @readonly
*/
e.htmlPosition = e.html.position;

/**
* Special keyboard keys (Shift, Ctrl, F1, F2, ...)
* @description
* __Ex.:__
<code javascript>
// send Ctrl+F12 shortcut
MyHllApiAppli.pSchedule.keyStroke(e.key.Ctrl + e.key.F12);
</code>
* @enumeration e.key
* @enum {string}
* @path e.key
* @var Add '+' key
* @var Alt 'Alt' key
* @var Attn 'Attn' key
* @var Back 'Back' key
* @var BackTab 'Back Tab' key
* @var Clear 'Clear' key (HLLAPI specific)
* @var ContextMenu 'Context Menu' key
* @var Ctrl 'Control' key
* @var Decimal 'Decimal' key
* @var Del 'Delete' key
* @var Divide '/' key
* @var Down 'Down' key
* @var End 'End' key
* @var Enter 'Enter' key
* @var Erase 'Erase' key (HLLAPI specific)
* @var Esc 'Escape' key
* @var F1 'F1' key
* @var F2 'F2' key
* @var F3 'F3' key
* @var F4 'F4' key
* @var F5 'F5' key
* @var F6 'F6' key
* @var F7 'F7' key
* @var F8 'F8' key
* @var F9 'F9' key
* @var F10 'F10' key
* @var F11 'F11' key
* @var F12 'F12' key
* @var F13 'F13' key
* @var F14 'F14' key
* @var F15 'F15' key
* @var F16 'F16' key
* @var F17 'F17' key
* @var F18 'F18' key
* @var F19 'F19' key
* @var F20 'F20' key
* @var F21 'F21' key
* @var F22 'F22' key
* @var F23 'F23' key
* @var F24 'F24' key
* @var Home 'Home' key
* @var Insert 'Insert' key
* @var Left 'Left' key
* @var Multiply '*' key
* @var NumEnter 'Enter' key on numeric keyboard
* @var PA1 'PA1' key (HLLAPI specific)
* @var PA2 'PA2' key (HLLAPI specific)
* @var PA3 'PA3' key (HLLAPI specific)
* @var PageDown 'Page Down' key
* @var PageUp 'Page Up' key
* @var Pause 'Pause' key
* @var PrintScreen 'Print Screen' key
* @var Reset 'Reset' key (HLLAPI specific)
* @var Right 'Right' key
* @var ScrollLock 'ScrollLock' key
* @var Shift 'Shift' key
* @var Space 'Space' key
* @var Substract '-' key
* @var Tab 'Tab' key
* @var Up 'Up' key
* @readonly
*/
e.key = {
  Add : '_Add_',
  Alt : '_Alt_',
  Attn : '_Attn_',
  Back : '_Back_',
  BackTab : '_BackTab_',
  Clear : '_Clear_',
  ContextMenu : '_ContextMenu_',
  Ctrl : '_Ctrl_',
  Decimal : '_Decimal_',
  Del : '_Del_',
  Divide : '_Divide_',
  Down : '_Down_',
  End : '_End_',
  Enter : '_Enter_',
  Erase : '_Erase_',
  Esc : '_Esc_',
  F1 : '_F1_',
  F2 : '_F2_',
  F3 : '_F3_',
  F4 : '_F4_',
  F5 : '_F5_',
  F6 : '_F6_',
  F7 : '_F7_',
  F8 : '_F8_',
  F9 : '_F9_',
  F10 : '_F10_',
  F11 : '_F11_',
  F12 : '_F12_',
  F13 : '_F13_',
  F14 : '_F14_',
  F15 : '_F15_',
  F16 : '_F16_',
  F17 : '_F17_',
  F18 : '_F18_',
  F19 : '_F19_',
  F20 : '_F20_',
  F21 : '_F21_',
  F22 : '_F22_',
  F23 : '_F23_',
  F24 : '_F24_',
  Home : '_Home_',
  Insert : '_Insert_',
  Left : '_Left_',
  Multiply : '_Multiply_',
  NumEnter : '_NumEnter_',
  PA1 : '_PA1_',
  PA2 : '_PA2_',
  PA3 : '_PA3_',
  PageDown : '_PageDown_',
  PageUp : '_PageUp_',
  Pause : '_Pause_',
  PrintScreen : '_PrintScreen_',
  Reset : '_Reset_',
  Right : '_Right_',
  ScrollLock : '_ScrollLock_',
  Shift : '_Shift_',
  Space : ' ',
  Substract : '_Substract_',
  Tab : '_Tab_',
  Up : '_Up_',
  CapsLock : '_CapsLock_',
  Windows : '_Win_'
}

/**
* Process launch flag
* @description
* __Ex.:__
<code javascript>// start Linked home page in maximized mode
LinkedIn.pHome.start(null, null, null, e.launchFlag.ShowMaximized);
</code>
* @enumeration e.launchFlag
* @enum {string}
* @path e.launchFlag
* @var Maximize Maximize application
* @var Minimize Minimize application
* @var Hide Hide application
* @var Show Show application
* @var ShowMaximized Show application in maximized mode
* @readonly
*/
e.launchFlag = {
  Maximize : 'SW_MAXIMIZE',
  Minimize : 'SW_MINIMIZE',
  Hide : 'SW_HIDE',
  Show : 'SW_SHOW',
  ShowMaximized : 'SW_SHOWMAXIMIZED'
}

/**
* Type used to store a message in Windows Event Viewer
* @description
* __Ex.:__
<code javascript>
ctx.logEvent('Launch failed', e.logEventType.Warning );
</code>
* @enumeration e.logEventType
* @enum {number}
* @path e.logEventType
* @var Success    Success
* @var Error     Error
* @var Warning   Warning
* @var Information Information
* @var AuditSuccess Audit success
* @var AuditFailure Audit failure
* @readonly
*/
e.logEventType = {
  Success : 0,
  Error : 1,
  Warning : 2,
  Information : 4,
  AuditSuccess : 8,
  AuditFailure : 16
}

/**
* Type used to display a ctx.log icon
* @description
* __Ex.:__
<code javascript>
ctx.log('Step ' + _step.name + ': timeout' , e.logIconType.Warning );
</code>
* @enumeration e.logIconType
* @enum {number}
* @path e.logIconType
* @var Info      Info
* @var Error     Error
* @var Question  Question
* @var Warning   Warning
* @var Event     Event
* @var Data      Data
* @var Action    Action
* @var UserAction    User action
* @readonly
*/
e.logIconType = {
  Info : 0,
  Error : 1,
  Question : 2,
  Warning : 3,
  Event : 28,
  UserAction : 4,
  Data : 6,
  Action : 24
}

/**
* message box type collection
* @class messbox
* @path e.messbox
* @readonly
*/
e.messbox = {}

/**
* Message box Appbar type (used for MESSBOX v1 only)
* @description
<code javascript>
<code javascript>
ctx.popup({pInfo: {
  Type : e.messbox.type.HTMLView,
  Template : e.messbox.template.Info,
  AppBar : e.messbox.appbarType.Top,
  ...
}});
</code>
* @enumeration e.messbox.appbarType
* @enum {string}
* @path e.messbox.appbarType
* @var None disabled
* @var Top Top position
* @var Bottom Bottom position
* @var Left Left position
* @var Right Right position
* @readonly
*/
e.messbox.appbarType = {
  None : '',
  Top : 'Top',
  Bottom : 'Bottom',
  Left : 'Left',
  Right : 'Right'
}

/**
* Message box template type (used for MESSBOX v1 only)
* @description
* __Ex.:__
<code javascript>
ctx.popup('pInfo').messbox({
  Type : e.messbox.type.HTMLView,
  Template : e.messbox.template.Info,
  ...
});
</code>
* @enumeration e.messbox.template
* @enum {string}
* @path e.messbox.template
* @var Info Windows popup with icon 'Info'
* @var Warning Windows popup with icon 'Warning'
* @var Error Windows popup with icon 'Error'
* @var Choice Windows popup with icon 'Choice'
* @readonly
*/
e.messbox.template = {
  Info : 'Info',
  Warning : 'Warning',
  Error : 'Error',
  Choice : 'Choice'
}

/**
* Message box template type (used for MESSBOX v1 only)
* @description
* __Ex.:__
<code javascript>
ctx.popup('pInfo').messbox({
  Type : e.messbox.type.HTMLView,
  ...
});
</code>
* @enumeration e.messbox.type
* @enum {string}
* @path e.messbox.type
* @var Info Windows popup with icon 'Info'
* @var Warning Windows popup with icon 'Warning'
* @var Error Windows popup with icon 'Error'
* @var Question Windows popup with icon 'Question'
* @var Choice Windows popup with icon 'Choice'
* @var HTMLDialog HTML modal popup
* @var HTMLView HTML modeless popup
* @var XMLDialog HTML modal popup with interpretation of XML (XSLT)
* @var XMLView HTML modeless popup with interpretation of XML (XSLT)
* @readonly
*/
e.messbox.type = {
  Info : 'Info',
  Warning : 'Warning',
  Error : 'Error',
  Choice : 'Choice',
  HTMLView : 'HTMLView',
  HTMLDialog : 'HTMLDialog',
  XMLView : 'XMLView',
  XMLDialog : 'XMLDialog'
}

///**
//* message box alert type collection
//*
//* @class messboxAlert
//* @path e.messboxAlert
//* @readonly
//*/
e.messboxAlert = {}

/**
* messboxAlert animation type
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  AnimationType: e.messboxAlert.animation.Slide,
  ...
</code>
* @enumeration e.messboxAlert.animation
* @enum {string}
* @path e.messboxAlert.animation
* @var None    Disabled
* @var Unfold  Unfold animation
* @var Slide   Slide animation
* @var Face    Face animation
* @readonly
*/
e.messboxAlert.animation = {
  None : '',
  Unfold : 'Unfold',
  Slide : 'Slide',
  Face : 'Face'
}

/**
* type of link displayed in the message box
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event,
  Value: 'evStartScenario',
  Data: 'scScenario1',
  ...
</code>
* @enumeration e.messboxAlert.linkType
* @enum {string}
* @path e.messboxAlert.linkType
* @var None Link is disabled
* @var Action Link triggers an action
* @var Event Link triggers an event
* @readonly
*/
e.messboxAlert.linkType = {
  None : '',
  Action : 'Action',
  Event : 'Event'
}

/**
* messboxAlert look type
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert1').messboxAlert({
  Look: e.messboxAlert.look.AppLookVisualStudio2008,
  ...
</code>
* @enumeration e.messboxAlert.look
* @enum {string}
* @path e.messboxAlert.look
* @var AppLookWindows2000 Windows 2000
* @var AppLookOfficeXP Office XP
* @var AppLookWindowsXP Windows XP
* @var AppLookWindows7 Windows 7
* @var AppLookOffice2003 Office 2003
* @var AppLookVisualStudio2005 Visual Studio 2005
* @var AppLookVisualStudio2008 Visual Studio 2008
* @var AppLookOffice2007Blue Office 2007 Blue
* @var AppLookOffice2007Black Office 2007 Black
* @var AppLookOffice2007BlueSilver Office 2007 BlueSilver
* @var AppLookOffice2007Aqua Office 2007 Aqua
* @readonly
*/
e.messboxAlert.look = {
  AppLookWindows2000          : 'AppLookWindows2000',
  AppLookOfficeXP             : 'AppLookOfficeXP',
  AppLookWindowsXP            : 'AppLookWindowsXP',
  AppLookWindows7             : 'AppLookWindows7',
  AppLookOffice2003           : 'AppLookOffice2003',
  AppLookVisualStudio2005     : 'AppLookVisualStudio2005',
  AppLookVisualStudio2008     : 'AppLookVisualStudio2008',
  AppLookOffice2007Blue       : 'AppLookOffice2007Blue',
  AppLookOffice2007Black      : 'AppLookOffice2007Black',
  AppLookOffice2007BlueSilver : 'AppLookOffice2007BlueSilver',
  AppLookOffice2007Aqua       : 'AppLookOffice2007Aqua'
}

/**
* Page or application nature
* @description
* __Ex.:__
<code javascript>// test if application is declared as an UIAutomation application
if (MyAppli.is(e.nature.UIAUTOMATION)) { ... }
</code>
* @enumeration e.nature
* @enum {string}
* @path e.nature
* @var WEB Web (v2)
* @var WEB3 Web (v3)
* @var EXEWIN Windows (v1)
* @var WIN Windows (v2)
* @var SWG Javaswing
* @var HLLAPI HLL API
* @var UIAUTOMATION UI Automation
* @var WINDOWLESS Windowless
* @var NSDK NSDK
* @var OCR OCR
* @var EXPBAR2 systray
* @var MESSBOX message box v1
* @var MESSBOX2 message box v2
* @var MESSBOXALERT alert message box
* @readonly
*/
e.nature = {
  WEB : 'WEB',
  WEB3 : 'WEB3',
  EXEWIN : 'EXEWIN',
  WIN : 'WIN',
  SWG : 'SWG',
  HLLAPI :  'HLLAPI',
  UIAUTOMATION : 'UIAUTOMATION',
  WINDOWLESS : 'Txt',
  NSDK : 'NSDK',
  OCR : 'OCR',
  SAPGUI : 'SAPGUI',
  EXPBAR2 : 'EXPBAR2',
  MESSBOX : 'MESSBOX',
  MESSBOX2 : 'MESSBOX2',
  POPUP : 'POPUP',
  MESSBOXALERT : 'MESSBOXALERT'
}

/**
* Standard Web navigators
* @description
* __Ex.:__
<code javascript>// force Firefox as navigator when starting myApplication
myApplication.navigator = e.navigator.Firefox;
...
myApplication.start();
</code>
* @enumeration e.navigator
* @enum {string}
* @path e.navigator
* @var IE Internet Explorer
* @var Firefox Firefox
* @var Chrome Chrome
* @readonly
*/
e.navigator = {
  Chrome : 'chrome.exe',
  Firefox : 'firefox.exe',
  IE : 'iexplore.exe',
  Undefined : ''
}

/**
* Server type : Citrix, Rdp, ...
* @description
* __Ex.:__
<code javascript>
myApplication.server = e.server.M2M;
</code>
* @enumeration e.server
* @enum {string}
* @path e.server
* @var Citrix Citrix
* @var Rdp RDP
* @var M2M Galaxy Hub
* @readonly
*/
e.server = {
  Citrix : 'Citrix',
  RDP : 'Rdp',
  M2M : 'M2M',
  Undefined : ''
}

/**
* Item enumerations
* @class item
* @path e.item
* @readonly
*/
e.item = {};

/**
* Popup enumerations
* @class popup
* @path e.popup
* @readonly
*/
e.popup = {};

/**
* Popup button identifiers
* @description
* __Ex.:__
<code javascript>
popup.waitResult( function( res ) {
  if( res == e.item.id.Yes ) {
    // add your code here
  }
});
</code>
* @enumeration e.item.id
* @enum {string}
* @path e.item.id
* @readonly
* @var Cancel 'cancel' button
* @var Close 'close' button
* @var Delete 'delete' button
* @var No 'no' button
* @var Ok 'ok' button
* @var Open 'open' button
* @var Other 'other' button
* @var Submit 'submit' button
* @var Yes 'yes' button
*/
e.item.id = {
  Cancel:   'cancel',
  Close:    'close',
  Delete:   'del',
  No:       'no',
  Ok:       'ok',
  Open:     'open',
  Other:    'other',
  Submit:   'submit',
  Yes:      'yes'
};

/**
 * @deprecated use e.item.id instead of e.popup.button
 * @enumeration e.popup.button
 * @advanced
 * @enum {string}
 * @path e.popup.button
 * @readonly
 */
e.popup.button = e.item.id;

/**
* Item display side (left, right, top, bottom)
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.item.side
* @enum {string}
* @path e.item.side
* @var none undefined side
* @var bottom bottom side
* @var left left side
* @var right right side
* @var top top side
* @readonly
*/
e.item.side = {
  none: '',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  top: 'top'
};

/**
* Bootstrap Popup button style or color
* @description
* __Ex.:__
<code javascript>
// *** popupClose ***
ctx.popup(e.popup.template.Close).init({
  ...
  buttons: {
    ok: {
      ...
      type: e.item.style.Grey
    }
  }
});
</code>
* @enumeration e.item.style
* @enum {string}
* @path e.item.style
* @readonly
* @var Blue Blue button
* @var Cyan Cyan button
* @var Green Green button
* @var Grey Grey button
* @var Orange Orange button
* @var Red Red button
* @var Link Link button
*/
e.item.style = {
  None:   '',
  Blue:   'primary',
  Cyan:   'info',
  Green:  'success',
  Grey:   'default',
  Orange: 'warning',
  Red:    'danger',
  Link:   'link'
};

/**
* Bootstrap Popup image shape (circle, rounded, ...)
* @enumeration e.item.imageShape
* @enum {string}
* @path e.item.imageShape
* @readonly
* @var none no specific shape
* @var circle circle shape
* @var rounded rounded shape
* @var thumbnail thumbnail shape
*/
e.item.imageShape = {
  none:       '',
  circle:     'circle',
  rounded:    'rounded',
  thumbnail:  'thumbnail'
};

/**
* Bootstrap Popup input style or color
* @enumeration e.item.inputStyle
* @enum {string}
* @path e.item.inputStyle
* @readonly
* @var Green Green button
* @var Orange Orange button
* @var Red Red button
*/
e.item.inputStyle = {
  None:   '',
  Green:  'success',
  Orange: 'warning',
  Red:    'error'
};

/**
* @deprecated use e.item.style instead of e.popup.buttonStyle
* @enumeration e.popup.buttonStyle
* @advanced
* @enum {string}
* @path e.popup.buttonStyle
* @readonly
*/
e.popup.buttonStyle = e.item.style;

/**
* Object type in a Bootstrap popup form
* @description
* __Ex.:__
<code javascript>
ctx.popup('pMyForm').init({
  ...
  form: {
    group: [ {
      labelUsername: {
        type: e.item.type.label,
        value: 'Username',
        width: 3
      }, {
      username: {
        type: e.item.type.text,
        width: 9
      }
    }
  ] }
});
</code>
* @enumeration e.popup.formType
* @deprecated use e.item.type instead of e.popup.formType
* @enum {string}
* @path e.popup.formType
* @readonly
* @var Button Button
* @var Checkbox Checkbox
* @var Date Date text area
* @var Email Email
* @var Image Image
* @var Label Simple label
* @var Number Number
* @var Password Password text area
* @var Radio Radio button
* @var Select Combobox control
* @var Text Single-lign text area
* @var Time Time text area
*/
e.popup.formType = {
  Image:      'img',
  Select:     'select',
  Button:     'button',
  Checkbox:   'checkbox',
  'Date':     'date',
  Email:      'email',
  Label:      'label',
  'Number':   'number',
  Password:   'password',
  Radio:      'radio',
  Text:       'text',
  Time:       'time',
  TextArea:   'textarea'
};

/**
* Bootstrap Popup button icons
* @description
* The icons are based on Bootstrap glyphicon
*
* For more details about the available icons, see: [[http://www.w3schools.com/bootstrap/bootstrap_ref_comp_glyphs.asp|Bootstrap Glyphicon Components]]
*
* To use a given , for example 'glyphicon glyphicon-pushpin', just use 'pushpin'
* __Ex.:__
<code javascript>
// *** popupClose ***
ctx.popup(e.popup.template.Close).init({
  ...
  buttons: {
    ok: {
      ...
      icon: e.item.icon.ok
    }
  }
});
</code>
* @enumeration item.icon
* @enum {string}
* @path e.item.icon
* @readonly
* @var asterisk glyphicon-asterisk
* @var plus glyphicon-plus
* @var ... ...
*/
e.item.icon = {
  none: '',
  adjust: 'adjust',
  alert: 'alert',
  alignCenter: 'align-center',
  alignJustify: 'align-justify',
  alignLeft: 'align-left',
  alignRight: 'align-right',
  apple: 'apple',
  arrowDown: 'arrow-down',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  arrowUp: 'arrow-up',
  asterisk: 'asterisk',
  babyFormula: 'baby-formula',
  backward: 'backward',
  banCircle: 'ban-circle',
  barcode: 'barcode',
  bed: 'bed',
  bell: 'bell',
  bishop: 'bishop',
  bitcoin: 'bitcoin',
  blackboard: 'blackboard',
  bold: 'bold',
  book: 'book',
  bookmark: 'bookmark',
  briefcase: 'briefcase',
  bullhorn: 'bullhorn',
  calendar: 'calendar',
  camera: 'camera',
  cd: 'cd',
  certificate: 'certificate',
  check: 'check',
  chevronDown: 'chevron-down',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'chevron-up',
  circleArrowDown: 'circle-arrow-down',
  circleArrowLeft: 'circle-arrow-left',
  circleArrowRight: 'circle-arrow-right',
  circleArrowUp: 'circle-arrow-up',
  cloud: 'cloud',
  cloudDownload: 'cloud-download',
  cloudUpload: 'cloud-upload',
  cog: 'cog',
  collapseDown: 'collapse-down',
  collapseUp: 'collapse-up',
  comment: 'comment',
  compressed: 'compressed',
  copy: 'copy',
  copyrightMark: 'copyright-mark',
  creditCard: 'credit-card',
  cutlery: 'cutlery',
  dashboard: 'dashboard',
  download: 'download',
  downloadAlt: 'download-alt',
  duplicate: 'duplicate',
  earphone: 'earphone',
  edit: 'edit',
  education: 'education',
  eject: 'eject',
  envelope: 'envelope',
  equalizer: 'equalizer',
  erase: 'erase',
  euro: 'euro',
  exclamationSign: 'exclamation-sign',
  expand: 'expand',
  eyeClose: 'eye-close',
  eyeOpen: 'eye-open',
  facetimeVideo: 'facetime-video',
  fastBackward: 'fast-backward',
  fastForward: 'fast-forward',
  file: 'file',
  fileExport: 'export',
  fileImport: 'import',
  film: 'film',
  filter: 'filter',
  fire: 'fire',
  flag: 'flag',
  flash: 'flash',
  floppyDisk: 'floppy-disk',
  floppyOpen: 'floppy-open',
  floppyRemove: 'floppy-remove',
  floppySave: 'floppy-save',
  floppySaved: 'floppy-saved',
  folderClose: 'folder-close',
  folderOpen: 'folder-open',
  font: 'font',
  forward: 'forward',
  fullscreen: 'fullscreen',
  gbp: 'gbp',
  gift: 'gift',
  glass: 'glass',
  globe: 'globe',
  grain: 'grain',
  handDown: 'hand-down',
  handLeft: 'hand-left',
  handRight: 'hand-right',
  handUp: 'hand-up',
  hdd: 'hdd',
  hdVideo: 'hd-video',
  header: 'header',
  headphones: 'headphones',
  heart: 'heart',
  heartEmpty: 'heart-empty',
  home: 'home',
  hourglass: 'hourglass',
  iceLolly: 'ice-lolly',
  iceLollyTasted: 'ice-lolly-tasted',
  inbox: 'inbox',
  indentLeft: 'indent-left',
  indentRight: 'indent-right',
  infoSign: 'info-sign',
  italic: 'italic',
  king: 'king',
  knight: 'knight',
  lamp: 'lamp',
  leaf: 'leaf',
  levelUp: 'level-up',
  link: 'link',
  list: 'list',
  listAlt: 'list-alt',
  lock: 'lock',
  logIn: 'log-in',
  logOut: 'log-out',
  magnet: 'magnet',
  mapMarker: 'map-marker',
  menuDown: 'menu-down',
  menuHamburger: 'menu-hamburger',
  menuLeft: 'menu-left',
  menuRight: 'menu-right',
  menuUp: 'menu-up',
  minus: 'minus',
  minusSign: 'minus-sign',
  modalWindow: 'modal-window',
  move: 'move',
  music: 'music',
  newWindow: 'new-window',
  objectAlignBottom: 'object-align-bottom',
  objectAlignHorizontal: 'object-align-horizontal',
  objectAlignLeft: 'object-align-left',
  objectAlignRight: 'object-align-right',
  objectAlignTop: 'object-align-top',
  objectAlignVertical: 'object-align-vertical',
  off: 'off',
  oil: 'oil',
  ok: 'ok',
  okCircle: 'ok-circle',
  okSign: 'ok-sign',
  open: 'open',
  openFile: 'open-file',
  optionHorizontal: 'option-horizontal',
  optionVertical: 'option-vertical',
  paperclip: 'paperclip',
  paste: 'paste',
  pause: 'pause',
  pawn: 'pawn',
  pencil: 'pencil',
  phone: 'phone',
  phoneAlt: 'phone-alt',
  picture: 'picture',
  piggyBank: 'piggy-bank',
  plane: 'plane',
  play: 'play',
  playCircle: 'play-circle',
  plus: 'plus',
  plusSign: 'plus-sign',
  print: 'print',
  pushpin: 'pushpin',
  qrcode: 'qrcode',
  queen: 'queen',
  questionSign: 'question-sign',
  random: 'random',
  record: 'record',
  refresh: 'refresh',
  registrationMark: 'registration-mark',
  remove: 'remove',
  removeCircle: 'remove-circle',
  removeSign: 'remove-sign',
  repeat: 'repeat',
  resizeFull: 'resize-full',
  resizeHorizontal: 'resize-horizontal',
  resizeSmall: 'resize-small',
  resizeVertical: 'resize-vertical',
  retweet: 'retweet',
  road: 'road',
  ruble: 'ruble',
  save: 'save',
  saved: 'saved',
  saveFile: 'save-file',
  scale: 'scale',
  scissors: 'scissors',
  screenshot: 'screenshot',
  sdVideo: 'sd-video',
  search: 'search',
  send: 'send',
  share: 'share',
  shareAlt: 'share-alt',
  shoppingCart: 'shopping-cart',
  signal: 'signal',
  sort: 'sort',
  sortByAlphabet: 'sort-by-alphabet',
  sortByAlphabetAlt: 'sort-by-alphabet-alt',
  sortByAttributes: 'sort-by-attributes',
  sortByAttributesAlt: 'sort-by-attributes-alt',
  sortByOrder: 'sort-by-order',
  sortByOrderAlt: 'sort-by-order-alt',
  sound51: 'sound-5-1',
  sound61: 'sound-6-1',
  sound71: 'sound-7-1',
  soundDolby: 'sound-dolby',
  soundStereo: 'sound-stereo',
  star: 'star',
  starEmpty: 'star-empty',
  stats: 'stats',
  stepBackward: 'step-backward',
  stepForward: 'step-forward',
  stop: 'stop',
  subscript: 'subscript',
  subtitles: 'subtitles',
  sunglasses: 'sunglasses',
  superscript: 'superscript',
  tag: 'tag',
  tags: 'tags',
  tasks: 'tasks',
  tent: 'tent',
  textBackground: 'text-background',
  textColor: 'text-color',
  textHeight: 'text-height',
  textSize: 'text-size',
  textWidth: 'text-width',
  th: 'th',
  thLarge: 'th-large',
  thList: 'th-list',
  thumbsDown: 'thumbs-down',
  thumbsUp: 'thumbs-up',
  time: 'time',
  tint: 'tint',
  tower: 'tower',
  transfer: 'transfer',
  trash: 'trash',
  treeConifer: 'tree-conifer',
  treeDeciduous: 'tree-deciduous',
  triangleBottom: 'triangle-bottom',
  triangleLeft: 'triangle-left',
  triangleRight: 'triangle-right',
  triangleTop: 'triangle-top',
  unchecked: 'unchecked',
  upload: 'upload',
  usd: 'usd',
  user: 'user',
  volumeDown: 'volume-down',
  volumeOff: 'volume-off',
  volumeUp: 'volume-up',
  warningSign: 'warning-sign',
  wrench: 'wrench',
  yen: 'yen',
  zoomIn: 'zoom-in',
  zoomOut: 'zoom-out'
};

/**
* @deprecated use e.item.icon instead of e.popup.buttonIcon
* @enumeration popup.buttonIcon
* @advanced
* @enum {string}
* @path e.popup.buttonIcon
* @readonly
*/
e.popup.buttonIcon = e.item.icon;

///**
//* Font Awesome button icons
//* @description
//* The icons are based on Bootstrap glyphicon
//*
//* For more details about the available icons, see: [[http://fontawesome.io/icons/|Font Awesome icons]]
//*
//* __Ex.:__
//<code javascript>
//// *** popupClose ***
//ctx.popup(e.popup.template.Close).init({
//  ...
//  buttons: {
//    ok: {
//      ...
//      fa: e.item.fa.a.addressBook
//    }
//  }
//});
//</code>
//* @enumeration item.fa
//* @enum {string}
//* @path e.item.fa
//*/
//e.item.fa = {};

///**
//* @enumeration item.fa.a
//* @enum {string}
//* @path e.item.fa.a
//*/
//e.item.fa.a = {
//  addressBook: "fa-address-book",
//  addressBookO: "fa-address-book-o",
//  addressCard: "fa-address-card",
//  addressCardO: "fa-address-card-o",
//  adjust: "fa-adjust",
//  adn: "fa-adn",
//  alignCenter: "fa-align-center",
//  alignJustify: "fa-align-justify",
//  alignLeft: "fa-align-left",
//  alignRight: "fa-align-right",
//  amazon: "fa-amazon",
//  ambulance: "fa-ambulance",
//  americanSignLanguageInterpreting: "fa-american-sign-language-interpreting",
//  anchor: "fa-anchor",
//  android: "fa-android",
//  angellist: "fa-angellist",
//  angleDoubleDown: "fa-angle-double-down",
//  angleDoubleLeft: "fa-angle-double-left",
//  angleDoubleRight: "fa-angle-double-right",
//  angleDoubleUp: "fa-angle-double-up",
//  angleDown: "fa-angle-down",
//  angleLeft: "fa-angle-left",
//  angleRight: "fa-angle-right",
//  angleUp: "fa-angle-up",
//  apple: "fa-apple",
//  archive: "fa-archive",
//  areaChart: "fa-area-chart",
//  arrowCircleDown: "fa-arrow-circle-down",
//  arrowCircleLeft: "fa-arrow-circle-left",
//  arrowCircleODown: "fa-arrow-circle-o-down",
//  arrowCircleOLeft: "fa-arrow-circle-o-left",
//  arrowCircleORight: "fa-arrow-circle-o-right",
//  arrowCircleOUp: "fa-arrow-circle-o-up",
//  arrowCircleRight: "fa-arrow-circle-right",
//  arrowCircleUp: "fa-arrow-circle-up",
//  arrowDown: "fa-arrow-down",
//  arrowLeft: "fa-arrow-left",
//  arrowRight: "fa-arrow-right",
//  arrowUp: "fa-arrow-up",
//  arrows: "fa-arrows",
//  arrowsAlt: "fa-arrows-alt",
//  arrowsH: "fa-arrows-h",
//  arrowsV: "fa-arrows-v",
//  aslInterpreting: "fa-asl-interpreting",
//  assistiveListeningSystems: "fa-assistive-listening-systems",
//  asterisk: "fa-asterisk",
//  at: "fa-at",
//  audioDescription: "fa-audio-description",
//  automobile: "fa-automobile"
//};
///**
//* @enumeration item.fa.b
//* @enum {string}
//* @path e.item.fa.b
//*/
//e.item.fa.b = {
//  backward: "fa-backward",
//  balanceScale: "fa-balance-scale",
//  ban: "fa-ban",
//  bandcamp: "fa-bandcamp",
//  bank: "fa-bank",
//  barChart: "fa-bar-chart",
//  barChartO: "fa-bar-chart-o",
//  barcode: "fa-barcode",
//  bars: "fa-bars",
//  bath: "fa-bath",
//  bathtub: "fa-bathtub",
//  battery: "fa-battery",
//  battery0: "fa-battery-0",
//  battery1: "fa-battery-1",
//  battery2: "fa-battery-2",
//  battery3: "fa-battery-3",
//  battery4: "fa-battery-4",
//  batteryEmpty: "fa-battery-empty",
//  batteryFull: "fa-battery-full",
//  batteryHalf: "fa-battery-half",
//  batteryQuarter: "fa-battery-quarter",
//  batteryThreeQuarters: "fa-battery-three-quarters",
//  bed: "fa-bed",
//  beer: "fa-beer",
//  behance: "fa-behance",
//  behanceSquare: "fa-behance-square",
//  bell: "fa-bell",
//  bellO: "fa-bell-o",
//  bellSlash: "fa-bell-slash",
//  bellSlashO: "fa-bell-slash-o",
//  bicycle: "fa-bicycle",
//  binoculars: "fa-binoculars",
//  birthdayCake: "fa-birthday-cake",
//  bitbucket: "fa-bitbucket",
//  bitbucketSquare: "fa-bitbucket-square",
//  bitcoin: "fa-bitcoin",
//  blackTie: "fa-black-tie",
//  blind: "fa-blind",
//  bluetooth: "fa-bluetooth",
//  bluetoothB: "fa-bluetooth-b",
//  bold: "fa-bold",
//  bolt: "fa-bolt",
//  bomb: "fa-bomb",
//  book: "fa-book",
//  bookmark: "fa-bookmark",
//  bookmarkO: "fa-bookmark-o",
//  braille: "fa-braille",
//  briefcase: "fa-briefcase",
//  btc: "fa-btc",
//  bug: "fa-bug",
//  building: "fa-building",
//  buildingO: "fa-building-o",
//  bullhorn: "fa-bullhorn",
//  bullseye: "fa-bullseye",
//  bus: "fa-bus",
//  buysellads: "fa-buysellads"
//};
///**
//* @enumeration item.fa.c
//* @enum {string}
//* @path e.item.fa.c
//*/
//e.item.fa.c = {
//  cab: "fa-cab",
//  calculator: "fa-calculator",
//  calendar: "fa-calendar",
//  calendarCheckO: "fa-calendar-check-o",
//  calendarMinusO: "fa-calendar-minus-o",
//  calendarO: "fa-calendar-o",
//  calendarPlusO: "fa-calendar-plus-o",
//  calendarTimesO: "fa-calendar-times-o",
//  camera: "fa-camera",
//  cameraRetro: "fa-camera-retro",
//  car: "fa-car",
//  caretDown: "fa-caret-down",
//  caretLeft: "fa-caret-left",
//  caretRight: "fa-caret-right",
//  caretSquareODown: "fa-caret-square-o-down",
//  caretSquareOLeft: "fa-caret-square-o-left",
//  caretSquareORight: "fa-caret-square-o-right",
//  caretSquareOUp: "fa-caret-square-o-up",
//  caretUp: "fa-caret-up",
//  cartArrowDown: "fa-cart-arrow-down",
//  cartPlus: "fa-cart-plus",
//  cc: "fa-cc",
//  ccAmex: "fa-cc-amex",
//  ccDinersClub: "fa-cc-diners-club",
//  ccDiscover: "fa-cc-discover",
//  ccJcb: "fa-cc-jcb",
//  ccMastercard: "fa-cc-mastercard",
//  ccPaypal: "fa-cc-paypal",
//  ccStripe: "fa-cc-stripe",
//  ccVisa: "fa-cc-visa",
//  certificate: "fa-certificate",
//  chain: "fa-chain",
//  chainBroken: "fa-chain-broken",
//  check: "fa-check",
//  checkCircle: "fa-check-circle",
//  checkCircleO: "fa-check-circle-o",
//  checkSquare: "fa-check-square",
//  checkSquareO: "fa-check-square-o",
//  chevronCircleDown: "fa-chevron-circle-down",
//  chevronCircleLeft: "fa-chevron-circle-left",
//  chevronCircleRight: "fa-chevron-circle-right",
//  chevronCircleUp: "fa-chevron-circle-up",
//  chevronDown: "fa-chevron-down",
//  chevronLeft: "fa-chevron-left",
//  chevronRight: "fa-chevron-right",
//  chevronUp: "fa-chevron-up",
//  child: "fa-child",
//  chrome: "fa-chrome",
//  circle: "fa-circle",
//  circleO: "fa-circle-o",
//  circleONotch: "fa-circle-o-notch",
//  circleThin: "fa-circle-thin",
//  clipboard: "fa-clipboard",
//  clockO: "fa-clock-o",
//  clone: "fa-clone",
//  close: "fa-close",
//  cloud: "fa-cloud",
//  cloudDownload: "fa-cloud-download",
//  cloudUpload: "fa-cloud-upload",
//  cny: "fa-cny",
//  code: "fa-code",
//  codeFork: "fa-code-fork",
//  codepen: "fa-codepen",
//  codiepie: "fa-codiepie",
//  coffee: "fa-coffee",
//  cog: "fa-cog",
//  cogs: "fa-cogs",
//  columns: "fa-columns",
//  comment: "fa-comment",
//  commentO: "fa-comment-o",
//  commenting: "fa-commenting",
//  commentingO: "fa-commenting-o",
//  comments: "fa-comments",
//  commentsO: "fa-comments-o",
//  compass: "fa-compass",
//  compress: "fa-compress",
//  connectdevelop: "fa-connectdevelop",
//  contao: "fa-contao",
//  copy: "fa-copy",
//  copyright: "fa-copyright",
//  creativeCommons: "fa-creative-commons",
//  creditCard: "fa-credit-card",
//  creditCardAlt: "fa-credit-card-alt",
//  crop: "fa-crop",
//  crosshairs: "fa-crosshairs",
//  css3: "fa-css3",
//  cube: "fa-cube",
//  cubes: "fa-cubes",
//  cut: "fa-cut",
//  cutlery: "fa-cutlery"
//};
///**
//* @enumeration item.fa.d
//* @enum {string}
//* @path e.item.fa.d
//*/
//e.item.fa.d = {
//  dashboard: "fa-dashboard",
//  dashcube: "fa-dashcube",
//  database: "fa-database",
//  deaf: "fa-deaf",
//  deafness: "fa-deafness",
//  dedent: "fa-dedent",
//  delicious: "fa-delicious",
//  desktop: "fa-desktop",
//  deviantart: "fa-deviantart",
//  diamond: "fa-diamond",
//  digg: "fa-digg",
//  dollar: "fa-dollar",
//  dotCircleO: "fa-dot-circle-o",
//  download: "fa-download",
//  dribbble: "fa-dribbble",
//  driversLicense: "fa-drivers-license",
//  driversLicenseO: "fa-drivers-license-o",
//  dropbox: "fa-dropbox",
//  drupal: "fa-drupal"
//};
///**
//* @enumeration item.fa.e
//* @enum {string}
//* @path e.item.fa.e
//*/
//e.item.fa.e = {
//  edge: "fa-edge",
//  edit: "fa-edit",
//  eercast: "fa-eercast",
//  eject: "fa-eject",
//  ellipsisH: "fa-ellipsis-h",
//  ellipsisV: "fa-ellipsis-v",
//  empire: "fa-empire",
//  envelope: "fa-envelope",
//  envelopeO: "fa-envelope-o",
//  envelopeOpen: "fa-envelope-open",
//  envelopeOpenO: "fa-envelope-open-o",
//  envelopeSquare: "fa-envelope-square",
//  envira: "fa-envira",
//  eraser: "fa-eraser",
//  etsy: "fa-etsy",
//  eur: "fa-eur",
//  euro: "fa-euro",
//  exchange: "fa-exchange",
//  exclamation: "fa-exclamation",
//  exclamationCircle: "fa-exclamation-circle",
//  exclamationTriangle: "fa-exclamation-triangle",
//  expand: "fa-expand",
//  expeditedssl: "fa-expeditedssl",
//  externalLink: "fa-external-link",
//  externalLinkSquare: "fa-external-link-square",
//  eye: "fa-eye",
//  eyeSlash: "fa-eye-slash",
//  eyedropper: "fa-eyedropper"
//};
///**
//* @enumeration item.fa.f
//* @enum {string}
//* @path e.item.fa.f
//*/
//e.item.fa.f = {
//  fa: "fa-fa",
//  facebook: "fa-facebook",
//  facebookF: "fa-facebook-f",
//  facebookOfficial: "fa-facebook-official",
//  facebookSquare: "fa-facebook-square",
//  fastBackward: "fa-fast-backward",
//  fastForward: "fa-fast-forward",
//  fax: "fa-fax",
//  feed: "fa-feed",
//  female: "fa-female",
//  fighterJet: "fa-fighter-jet",
//  file: "fa-file",
//  fileArchiveO: "fa-file-archive-o",
//  fileAudioO: "fa-file-audio-o",
//  fileCodeO: "fa-file-code-o",
//  fileExcelO: "fa-file-excel-o",
//  fileImageO: "fa-file-image-o",
//  fileMovieO: "fa-file-movie-o",
//  fileO: "fa-file-o",
//  filePdfO: "fa-file-pdf-o",
//  filePhotoO: "fa-file-photo-o",
//  filePictureO: "fa-file-picture-o",
//  filePowerpointO: "fa-file-powerpoint-o",
//  fileSoundO: "fa-file-sound-o",
//  fileText: "fa-file-text",
//  fileTextO: "fa-file-text-o",
//  fileVideoO: "fa-file-video-o",
//  fileWordO: "fa-file-word-o",
//  fileZipO: "fa-file-zip-o",
//  filesO: "fa-files-o",
//  film: "fa-film",
//  filter: "fa-filter",
//  fire: "fa-fire",
//  fireExtinguisher: "fa-fire-extinguisher",
//  firefox: "fa-firefox",
//  firstOrder: "fa-first-order",
//  flag: "fa-flag",
//  flagCheckered: "fa-flag-checkered",
//  flagO: "fa-flag-o",
//  flash: "fa-flash",
//  flask: "fa-flask",
//  flickr: "fa-flickr",
//  floppyO: "fa-floppy-o",
//  folder: "fa-folder",
//  folderO: "fa-folder-o",
//  folderOpen: "fa-folder-open",
//  folderOpenO: "fa-folder-open-o",
//  font: "fa-font",
//  fontAwesome: "fa-font-awesome",
//  fonticons: "fa-fonticons",
//  fortAwesome: "fa-fort-awesome",
//  forumbee: "fa-forumbee",
//  forward: "fa-forward",
//  foursquare: "fa-foursquare",
//  freeCodeCamp: "fa-free-code-camp",
//  frownO: "fa-frown-o",
//  futbolO: "fa-futbol-o"
//};
///**
//* @enumeration item.fa.g
//* @enum {string}
//* @path e.item.fa.g
//*/
//e.item.fa.g = {
//  gamepad: "fa-gamepad",
//  gavel: "fa-gavel",
//  gbp: "fa-gbp",
//  ge: "fa-ge",
//  gear: "fa-gear",
//  gears: "fa-gears",
//  genderless: "fa-genderless",
//  getPocket: "fa-get-pocket",
//  gg: "fa-gg",
//  ggCircle: "fa-gg-circle",
//  gift: "fa-gift",
//  git: "fa-git",
//  gitSquare: "fa-git-square",
//  github: "fa-github",
//  githubAlt: "fa-github-alt",
//  githubSquare: "fa-github-square",
//  gitlab: "fa-gitlab",
//  gittip: "fa-gittip",
//  glass: "fa-glass",
//  glide: "fa-glide",
//  glideG: "fa-glide-g",
//  globe: "fa-globe",
//  google: "fa-google",
//  googlePlus: "fa-google-plus",
//  googlePlusCircle: "fa-google-plus-circle",
//  googlePlusOfficial: "fa-google-plus-official",
//  googlePlusSquare: "fa-google-plus-square",
//  googleWallet: "fa-google-wallet",
//  graduationCap: "fa-graduation-cap",
//  gratipay: "fa-gratipay",
//  grav: "fa-grav",
//  group: "fa-group"
//};
///**
//* @enumeration item.fa.h
//* @enum {string}
//* @path e.item.fa.h
//*/
//e.item.fa.h = {
//  hSquare: "fa-h-square",
//  hackerNews: "fa-hacker-news",
//  handGrabO: "fa-hand-grab-o",
//  handLizardO: "fa-hand-lizard-o",
//  handODown: "fa-hand-o-down",
//  handOLeft: "fa-hand-o-left",
//  handORight: "fa-hand-o-right",
//  handOUp: "fa-hand-o-up",
//  handPaperO: "fa-hand-paper-o",
//  handPeaceO: "fa-hand-peace-o",
//  handPointerO: "fa-hand-pointer-o",
//  handRockO: "fa-hand-rock-o",
//  handScissorsO: "fa-hand-scissors-o",
//  handSpockO: "fa-hand-spock-o",
//  handStopO: "fa-hand-stop-o",
//  handshakeO: "fa-handshake-o",
//  hardOfHearing: "fa-hard-of-hearing",
//  hashtag: "fa-hashtag",
//  hddO: "fa-hdd-o",
//  header: "fa-header",
//  headphones: "fa-headphones",
//  heart: "fa-heart",
//  heartO: "fa-heart-o",
//  heartbeat: "fa-heartbeat",
//  history: "fa-history",
//  home: "fa-home",
//  hospitalO: "fa-hospital-o",
//  hotel: "fa-hotel",
//  hourglass: "fa-hourglass",
//  hourglass1: "fa-hourglass-1",
//  hourglass2: "fa-hourglass-2",
//  hourglass3: "fa-hourglass-3",
//  hourglassEnd: "fa-hourglass-end",
//  hourglassHalf: "fa-hourglass-half",
//  hourglassO: "fa-hourglass-o",
//  hourglassStart: "fa-hourglass-start",
//  houzz: "fa-houzz",
//  html5: "fa-html5"
//};
///**
//* @enumeration item.fa.i
//* @enum {string}
//* @path e.item.fa.i
//*/
//e.item.fa.i = {
//  iCursor: "fa-i-cursor",
//  idBadge: "fa-id-badge",
//  idCard: "fa-id-card",
//  idCardO: "fa-id-card-o",
//  ils: "fa-ils",
//  image: "fa-image",
//  imdb: "fa-imdb",
//  inbox: "fa-inbox",
//  indent: "fa-indent",
//  industry: "fa-industry",
//  info: "fa-info",
//  infoCircle: "fa-info-circle",
//  inr: "fa-inr",
//  instagram: "fa-instagram",
//  institution: "fa-institution",
//  internetExplorer: "fa-internet-explorer",
//  intersex: "fa-intersex",
//  ioxhost: "fa-ioxhost",
//  italic: "fa-italic"
//};
///**
//* @enumeration item.fa.j
//* @enum {string}
//* @path e.item.fa.j
//*/
//e.item.fa.j = {
//  joomla: "fa-joomla",
//  jpy: "fa-jpy",
//  jsfiddle: "fa-jsfiddle"
//};
///**
//* @enumeration item.fa.k
//* @enum {string}
//* @path e.item.fa.k
//*/
//e.item.fa.k = {
//  key: "fa-key",
//  keyboardO: "fa-keyboard-o",
//  krw: "fa-krw"
//};
///**
//* @enumeration item.fa.l
//* @enum {string}
//* @path e.item.fa.l
//*/
//e.item.fa.l = {
//  language: "fa-language",
//  laptop: "fa-laptop",
//  lastfm: "fa-lastfm",
//  lastfmSquare: "fa-lastfm-square",
//  leaf: "fa-leaf",
//  leanpub: "fa-leanpub",
//  legal: "fa-legal",
//  lemonO: "fa-lemon-o",
//  levelDown: "fa-level-down",
//  levelUp: "fa-level-up",
//  lifeBouy: "fa-life-bouy",
//  lifeBuoy: "fa-life-buoy",
//  lifeRing: "fa-life-ring",
//  lifeSaver: "fa-life-saver",
//  lightbulbO: "fa-lightbulb-o",
//  lineChart: "fa-line-chart",
//  link: "fa-link",
//  linkedin: "fa-linkedin",
//  linkedinSquare: "fa-linkedin-square",
//  linode: "fa-linode",
//  linux: "fa-linux",
//  list: "fa-list",
//  listAlt: "fa-list-alt",
//  listOl: "fa-list-ol",
//  listUl: "fa-list-ul",
//  locationArrow: "fa-location-arrow",
//  lock: "fa-lock",
//  longArrowDown: "fa-long-arrow-down",
//  longArrowLeft: "fa-long-arrow-left",
//  longArrowRight: "fa-long-arrow-right",
//  longArrowUp: "fa-long-arrow-up",
//  lowVision: "fa-low-vision"
//};
///**
//* @enumeration item.fa.m
//* @enum {string}
//* @path e.item.fa.m
//*/
//e.item.fa.m = {
//  magic: "fa-magic",
//  magnet: "fa-magnet",
//  mailForward: "fa-mail-forward",
//  mailReply: "fa-mail-reply",
//  mailReplyAll: "fa-mail-reply-all",
//  male: "fa-male",
//  map: "fa-map",
//  mapMarker: "fa-map-marker",
//  mapO: "fa-map-o",
//  mapPin: "fa-map-pin",
//  mapSigns: "fa-map-signs",
//  mars: "fa-mars",
//  marsDouble: "fa-mars-double",
//  marsStroke: "fa-mars-stroke",
//  marsStrokeH: "fa-mars-stroke-h",
//  marsStrokeV: "fa-mars-stroke-v",
//  maxcdn: "fa-maxcdn",
//  meanpath: "fa-meanpath",
//  medium: "fa-medium",
//  medkit: "fa-medkit",
//  meetup: "fa-meetup",
//  mehO: "fa-meh-o",
//  mercury: "fa-mercury",
//  microchip: "fa-microchip",
//  microphone: "fa-microphone",
//  microphoneSlash: "fa-microphone-slash",
//  minus: "fa-minus",
//  minusCircle: "fa-minus-circle",
//  minusSquare: "fa-minus-square",
//  minusSquareO: "fa-minus-square-o",
//  mixcloud: "fa-mixcloud",
//  mobile: "fa-mobile",
//  mobilePhone: "fa-mobile-phone",
//  modx: "fa-modx",
//  money: "fa-money",
//  moonO: "fa-moon-o",
//  mortarBoard: "fa-mortar-board",
//  motorcycle: "fa-motorcycle",
//  mousePointer: "fa-mouse-pointer",
//  music: "fa-music"
//};
///**
//* @enumeration item.fa.n
//* @enum {string}
//* @path e.item.fa.n
//*/
//e.item.fa.n = {
//  navicon: "fa-navicon",
//  neuter: "fa-neuter",
//  newspaperO: "fa-newspaper-o"
//};
///**
//* @enumeration item.fa.o
//* @enum {string}
//* @path e.item.fa.o
//*/
//e.item.fa.o = {
//  objectGroup: "fa-object-group",
//  objectUngroup: "fa-object-ungroup",
//  odnoklassniki: "fa-odnoklassniki",
//  odnoklassnikiSquare: "fa-odnoklassniki-square",
//  opencart: "fa-opencart",
//  openid: "fa-openid",
//  opera: "fa-opera",
//  optinMonster: "fa-optin-monster",
//  outdent: "fa-outdent"
//};
///**
//* @enumeration item.fa.p
//* @enum {string}
//* @path e.item.fa.p
//*/
//e.item.fa.p = {
//  pagelines: "fa-pagelines",
//  paintBrush: "fa-paint-brush",
//  paperPlane: "fa-paper-plane",
//  paperPlaneO: "fa-paper-plane-o",
//  paperclip: "fa-paperclip",
//  paragraph: "fa-paragraph",
//  paste: "fa-paste",
//  pause: "fa-pause",
//  pauseCircle: "fa-pause-circle",
//  pauseCircleO: "fa-pause-circle-o",
//  paw: "fa-paw",
//  paypal: "fa-paypal",
//  pencil: "fa-pencil",
//  pencilSquare: "fa-pencil-square",
//  pencilSquareO: "fa-pencil-square-o",
//  percent: "fa-percent",
//  phone: "fa-phone",
//  phoneSquare: "fa-phone-square",
//  photo: "fa-photo",
//  pictureO: "fa-picture-o",
//  pieChart: "fa-pie-chart",
//  piedPiper: "fa-pied-piper",
//  piedPiperAlt: "fa-pied-piper-alt",
//  piedPiperPp: "fa-pied-piper-pp",
//  pinterest: "fa-pinterest",
//  pinterestP: "fa-pinterest-p",
//  pinterestSquare: "fa-pinterest-square",
//  plane: "fa-plane",
//  play: "fa-play",
//  playCircle: "fa-play-circle",
//  playCircleO: "fa-play-circle-o",
//  plug: "fa-plug",
//  plus: "fa-plus",
//  plusCircle: "fa-plus-circle",
//  plusSquare: "fa-plus-square",
//  plusSquareO: "fa-plus-square-o",
//  podcast: "fa-podcast",
//  powerOff: "fa-power-off",
//  print: "fa-print",
//  productHunt: "fa-product-hunt",
//  puzzlePiece: "fa-puzzle-piece"
//};
///**
//* @enumeration item.fa.q
//* @enum {string}
//* @path e.item.fa.q
//*/
//e.item.fa.q = {
//  qq: "fa-qq",
//  qrcode: "fa-qrcode",
//  question: "fa-question",
//  questionCircle: "fa-question-circle",
//  questionCircleO: "fa-question-circle-o",
//  quora: "fa-quora",
//  quoteLeft: "fa-quote-left",
//  quoteRight: "fa-quote-right"
//};
///**
//* @enumeration item.fa.r
//* @enum {string}
//* @path e.item.fa.r
//*/
//e.item.fa.r = {
//  ra: "fa-ra",
//  random: "fa-random",
//  ravelry: "fa-ravelry",
//  rebel: "fa-rebel",
//  recycle: "fa-recycle",
//  reddit: "fa-reddit",
//  redditAlien: "fa-reddit-alien",
//  redditSquare: "fa-reddit-square",
//  refresh: "fa-refresh",
//  registered: "fa-registered",
//  remove: "fa-remove",
//  renren: "fa-renren",
//  reorder: "fa-reorder",
//  repeat: "fa-repeat",
//  reply: "fa-reply",
//  replyAll: "fa-reply-all",
//  resistance: "fa-resistance",
//  retweet: "fa-retweet",
//  rmb: "fa-rmb",
//  road: "fa-road",
//  rocket: "fa-rocket",
//  rotateLeft: "fa-rotate-left",
//  rotateRight: "fa-rotate-right",
//  rouble: "fa-rouble",
//  rss: "fa-rss",
//  rssSquare: "fa-rss-square",
//  rub: "fa-rub",
//  ruble: "fa-ruble",
//  rupee: "fa-rupee"
//};
///**
//* @enumeration item.fa.s
//* @enum {string}
//* @path e.item.fa.s
//*/
//e.item.fa.s = {
//  s15: "fa-s15",
//  safari: "fa-safari",
//  save: "fa-save",
//  scissors: "fa-scissors",
//  scribd: "fa-scribd",
//  search: "fa-search",
//  searchMinus: "fa-search-minus",
//  searchPlus: "fa-search-plus",
//  sellsy: "fa-sellsy",
//  send: "fa-send",
//  sendO: "fa-send-o",
//  server: "fa-server",
//  share: "fa-share",
//  shareAlt: "fa-share-alt",
//  shareAltSquare: "fa-share-alt-square",
//  shareSquare: "fa-share-square",
//  shareSquareO: "fa-share-square-o",
//  shekel: "fa-shekel",
//  sheqel: "fa-sheqel",
//  shield: "fa-shield",
//  ship: "fa-ship",
//  shirtsinbulk: "fa-shirtsinbulk",
//  shoppingBag: "fa-shopping-bag",
//  shoppingBasket: "fa-shopping-basket",
//  shoppingCart: "fa-shopping-cart",
//  shower: "fa-shower",
//  signIn: "fa-sign-in",
//  signLanguage: "fa-sign-language",
//  signOut: "fa-sign-out",
//  signal: "fa-signal",
//  signing: "fa-signing",
//  simplybuilt: "fa-simplybuilt",
//  sitemap: "fa-sitemap",
//  skyatlas: "fa-skyatlas",
//  skype: "fa-skype",
//  slack: "fa-slack",
//  sliders: "fa-sliders",
//  slideshare: "fa-slideshare",
//  smileO: "fa-smile-o",
//  snapchat: "fa-snapchat",
//  snapchatGhost: "fa-snapchat-ghost",
//  snapchatSquare: "fa-snapchat-square",
//  snowflakeO: "fa-snowflake-o",
//  soccerBallO: "fa-soccer-ball-o",
//  sort: "fa-sort",
//  sortAlphaAsc: "fa-sort-alpha-asc",
//  sortAlphaDesc: "fa-sort-alpha-desc",
//  sortAmountAsc: "fa-sort-amount-asc",
//  sortAmountDesc: "fa-sort-amount-desc",
//  sortAsc: "fa-sort-asc",
//  sortDesc: "fa-sort-desc",
//  sortDown: "fa-sort-down",
//  sortNumericAsc: "fa-sort-numeric-asc",
//  sortNumericDesc: "fa-sort-numeric-desc",
//  sortUp: "fa-sort-up",
//  soundcloud: "fa-soundcloud",
//  spaceShuttle: "fa-space-shuttle",
//  spinner: "fa-spinner",
//  spoon: "fa-spoon",
//  spotify: "fa-spotify",
//  square: "fa-square",
//  squareO: "fa-square-o",
//  stackExchange: "fa-stack-exchange",
//  stackOverflow: "fa-stack-overflow",
//  star: "fa-star",
//  starHalf: "fa-star-half",
//  starHalfEmpty: "fa-star-half-empty",
//  starHalfFull: "fa-star-half-full",
//  starHalfO: "fa-star-half-o",
//  starO: "fa-star-o",
//  steam: "fa-steam",
//  steamSquare: "fa-steam-square",
//  stepBackward: "fa-step-backward",
//  stepForward: "fa-step-forward",
//  stethoscope: "fa-stethoscope",
//  stickyNote: "fa-sticky-note",
//  stickyNoteO: "fa-sticky-note-o",
//  stop: "fa-stop",
//  stopCircle: "fa-stop-circle",
//  stopCircleO: "fa-stop-circle-o",
//  streetView: "fa-street-view",
//  strikethrough: "fa-strikethrough",
//  stumbleupon: "fa-stumbleupon",
//  stumbleuponCircle: "fa-stumbleupon-circle",
//  subscript: "fa-subscript",
//  subway: "fa-subway",
//  suitcase: "fa-suitcase",
//  sunO: "fa-sun-o",
//  superpowers: "fa-superpowers",
//  superscript: "fa-superscript",
//  support: "fa-support"
//};
///**
//* @enumeration item.fa.t
//* @enum {string}
//* @path e.item.fa.t
//*/
//e.item.fa.t = {
//  table: "fa-table",
//  tablet: "fa-tablet",
//  tachometer: "fa-tachometer",
//  tag: "fa-tag",
//  tags: "fa-tags",
//  tasks: "fa-tasks",
//  taxi: "fa-taxi",
//  telegram: "fa-telegram",
//  television: "fa-television",
//  tencentWeibo: "fa-tencent-weibo",
//  terminal: "fa-terminal",
//  textHeight: "fa-text-height",
//  textWidth: "fa-text-width",
//  th: "fa-th",
//  thLarge: "fa-th-large",
//  thList: "fa-th-list",
//  themeisle: "fa-themeisle",
//  thermometer: "fa-thermometer",
//  thermometer0: "fa-thermometer-0",
//  thermometer1: "fa-thermometer-1",
//  thermometer2: "fa-thermometer-2",
//  thermometer3: "fa-thermometer-3",
//  thermometer4: "fa-thermometer-4",
//  thermometerEmpty: "fa-thermometer-empty",
//  thermometerFull: "fa-thermometer-full",
//  thermometerHalf: "fa-thermometer-half",
//  thermometerQuarter: "fa-thermometer-quarter",
//  thermometerThreeQuarters: "fa-thermometer-three-quarters",
//  thumbTack: "fa-thumb-tack",
//  thumbsDown: "fa-thumbs-down",
//  thumbsODown: "fa-thumbs-o-down",
//  thumbsOUp: "fa-thumbs-o-up",
//  thumbsUp: "fa-thumbs-up",
//  ticket: "fa-ticket",
//  times: "fa-times",
//  timesCircle: "fa-times-circle",
//  timesCircleO: "fa-times-circle-o",
//  timesRectangle: "fa-times-rectangle",
//  timesRectangleO: "fa-times-rectangle-o",
//  tint: "fa-tint",
//  toggleDown: "fa-toggle-down",
//  toggleLeft: "fa-toggle-left",
//  toggleOff: "fa-toggle-off",
//  toggleOn: "fa-toggle-on",
//  toggleRight: "fa-toggle-right",
//  toggleUp: "fa-toggle-up",
//  trademark: "fa-trademark",
//  train: "fa-train",
//  transgender: "fa-transgender",
//  transgenderAlt: "fa-transgender-alt",
//  trash: "fa-trash",
//  trashO: "fa-trash-o",
//  tree: "fa-tree",
//  trello: "fa-trello",
//  tripadvisor: "fa-tripadvisor",
//  trophy: "fa-trophy",
//  truck: "fa-truck",
//  'try': "fa-try",
//  tty: "fa-tty",
//  tumblr: "fa-tumblr",
//  tumblrSquare: "fa-tumblr-square",
//  turkishLira: "fa-turkish-lira",
//  tv: "fa-tv",
//  twitch: "fa-twitch",
//  twitter: "fa-twitter",
//  twitterSquare: "fa-twitter-square"
//};
///**
//* @enumeration item.fa.u
//* @enum {string}
//* @path e.item.fa.u
//*/
//e.item.fa.u = {
//  umbrella: "fa-umbrella",
//  underline: "fa-underline",
//  undo: "fa-undo",
//  universalAccess: "fa-universal-access",
//  university: "fa-university",
//  unlink: "fa-unlink",
//  unlock: "fa-unlock",
//  unlockAlt: "fa-unlock-alt",
//  unsorted: "fa-unsorted",
//  upload: "fa-upload",
//  usb: "fa-usb",
//  usd: "fa-usd",
//  user: "fa-user",
//  userCircle: "fa-user-circle",
//  userCircleO: "fa-user-circle-o",
//  userMd: "fa-user-md",
//  userO: "fa-user-o",
//  userPlus: "fa-user-plus",
//  userSecret: "fa-user-secret",
//  userTimes: "fa-user-times",
//  users: "fa-users"
//};
///**
//* @enumeration item.fa.v
//* @enum {string}
//* @path e.item.fa.v
//*/
//e.item.fa.v = {
//  vcard: "fa-vcard",
//  vcardO: "fa-vcard-o",
//  venus: "fa-venus",
//  venusDouble: "fa-venus-double",
//  venusMars: "fa-venus-mars",
//  viacoin: "fa-viacoin",
//  viadeo: "fa-viadeo",
//  viadeoSquare: "fa-viadeo-square",
//  videoCamera: "fa-video-camera",
//  vimeo: "fa-vimeo",
//  vimeoSquare: "fa-vimeo-square",
//  vine: "fa-vine",
//  vk: "fa-vk",
//  volumeControlPhone: "fa-volume-control-phone",
//  volumeDown: "fa-volume-down",
//  volumeOff: "fa-volume-off",
//  volumeUp: "fa-volume-up"
//};
///**
//* @enumeration item.fa.w
//* @enum {string}
//* @path e.item.fa.w
//*/
//e.item.fa.w = {
//  warning: "fa-warning",
//  wechat: "fa-wechat",
//  weibo: "fa-weibo",
//  weixin: "fa-weixin",
//  whatsapp: "fa-whatsapp",
//  wheelchair: "fa-wheelchair",
//  wheelchairAlt: "fa-wheelchair-alt",
//  wifi: "fa-wifi",
//  wikipediaW: "fa-wikipedia-w",
//  windowClose: "fa-window-close",
//  windowCloseO: "fa-window-close-o",
//  windowMaximize: "fa-window-maximize",
//  windowMinimize: "fa-window-minimize",
//  windowRestore: "fa-window-restore",
//  windows: "fa-windows",
//  won: "fa-won",
//  wordpress: "fa-wordpress",
//  wpbeginner: "fa-wpbeginner",
//  wpexplorer: "fa-wpexplorer",
//  wpforms: "fa-wpforms",
//  wrench: "fa-wrench"
//};
///**
//* @enumeration item.fa.x
//* @enum {string}
//* @path e.item.fa.x
//*/
//e.item.fa.x = {
//  xing: "fa-xing",
//  xingSquare: "fa-xing-square"
//};
///**
//* @enumeration item.fa.y
//* @enum {string}
//* @path e.item.fa.y
//*/
//e.item.fa.y = {
//  yCombinator: "fa-y-combinator",
//  yCombinatorSquare: "fa-y-combinator-square",
//  yahoo: "fa-yahoo",
//  yc: "fa-yc",
//  ycSquare: "fa-yc-square",
//  yelp: "fa-yelp",
//  yen: "fa-yen",
//  yoast: "fa-yoast",
//  youtube: "fa-youtube",
//  youtubePlay: "fa-youtube-play",
//  youtubeSquare: "fa-youtube-square"
//};

/**
* item size
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration item.size
* @enum {string}
* @path e.item.size
* @readonly
* @var Large Large
* @var Medium Medium
* @var Small Small
* @var XSmall Extra small
*/
e.item.size = {
 Large: 'lg',
 Medium: 'md',
 Small: 'sm',
 XSmall: 'xs'
};

/**
* Item row type
* @description * __Ex.:__
<code javascript>
</code>
* @enumeration item.rowType
* @enum {string}
* @path e.item.rowType
* @readonly
* @var None None type
* @var Footer Footer type
* @var Header Header type
* @var Body Body type
*/
e.item.rowType = {
  None: '',
  Footer: 'modal-footer',
  Header: 'modal-header',
  Body: 'modal-body'
};

/**
* item text alignment
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration item.alignment
* @enum {string}
* @path e.item.alignment
* @readonly
* @var None Default alignment
* @var Left Left alignment
* @var Center Center alignment
* @var Right Right alignment
* @var NoWrap No wrap alignment
* @var Justify Justified alignment
*/
e.item.alignment = {
  None: '',
  Left: 'text-left',
  Center: 'text-center',
  Right: 'text-right',
  NoWrap: 'text-nowrap',
  Justify: 'text-justify'
};

/**
* item vertical alignment
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration item.alignmentVertical
* @enum {string}
* @path e.item.alignmentVertical
* @readonly
* @var None Default alignment
* @var Baseline Baseline alignment
* @var Top Top alignment
* @var Middle Middle alignment
* @var Bottom Bottom alignment
//* @var TextTop Text top alignment
//* @var TextBottom Text bottom alignment
*/
e.item.alignmentVertical = {
  None: '',
  Baseline: 'align-items-baseline',
  Top: 'align-items-start',
  Middle: 'align-items-center',
  Bottom: 'align-items-end'
//  Baseline: 'align-baseline',
//  Top: 'align-top',
//  Middle: 'align-middle',
//  Bottom: 'align-bottom',
//  TextTop: 'align-text-top',
//  TextBottom: 'align-text-bottom'
};

/**
* item text transformation
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration item.textTransform
* @enum {string}
* @path e.item.textTransform
* @readonly
* @var None No transformation
* @var Lowercase Lowercase transformation
* @var Uppercase Uppercase transformation
* @var Capitalize Capitalize transformation
*/
e.item.textSize = {
  None: '',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6'
};

/**
* item text transformation
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration item.textTransform
* @enum {string}
* @path e.item.textTransform
* @readonly
* @var None No transformation
* @var Bold Bold transformation
* @var Capitalize Capitalize transformation
* @var Highlight Highlight transformation
* @var Italic Italic transformation
* @var Lowercase Lowercase transformation
* @var Underline Underline transformation
* @var Uppercase Uppercase transformation
*/
e.item.textTransform = {
  None: '',
  Bold: 'text-bold',
  Capitalize: 'text-capitalize',
  Highlight: 'mark',
  Italic: 'text-italic',
  Lowercase: 'text-lowercase',
  Underline: 'text-underline',
  Uppercase: 'text-uppercase'
};

/**
* @deprecated use e.item.size instead of e.popup.buttonSize
* @enumeration popup.buttonSize
* @advanced
* @enum {string}
* @path e.popup.buttonSize
* @readonly
*/
e.popup.buttonSize = e.item.size;

/**
* Popup content type : Executable, Web page, ...
* @description
* __Ex.:__
<code javascript>
var popup = ctx.popup(e.popup.template.NoButton).init({
  content: e.popup.content.Web,
  ...
});
</code>
* @enumeration popup.content
* @enum {string}
* @path e.popup.content
* @readonly
* @var Exe Executable
* @var Web Web application
* @var Other Other
*/
e.popup.content = {
  Exe:    'Executable',
  Web:    'WebPage',
  Other:  'Other'
};

/**
* Screen used to display popup
* @description
* __Ex.:__
<code javascript>
ctx.popup('pAlert').open({
  ...,
  display: e.popup.display.Primary,
  ...
});
</code>
* @enumeration popup.display
* @enum {string}
* @path e.popup.display
* @readonly
* @var Main 'Main' display
* @var Left 'Left' display
* @var Right 'Right' display
* @var Primary 'Primary' display
* @var Secondary 'Secondary' display
* @var Third 'Third' display
* @var Fourth 'Fourth' display
* @var Undefined Undefined
*/
e.popup.display = {
  Undefined:  '',
  Main:   '-4',
  Left:   '-3',
  Right:  '-2',
  Primary:  '0',
  Secondary:   '1',
  Third:   '2',
  Fourth:   '3'
};

e.popup.icon16 = {
  /** @deprecated */ contextor: "/bmp/agent.png",
  agent: "/bmp/agent.png",
  ok: "/bmp/accept.png",
  error: "/bmp/cancel.png",
  help: "/bmp/help.png",
  info: "/bmp/information.png",
  repeat: "/bmp/repeat.png",
  stop: "/bmp/stop.png",
  warning: "/bmp/warning.png",
  record: "/bmp/record.png"
};
e.popup.icon32 = {
  /** @deprecated */ contextor: "/bmp32/agent.png",
  agent: "/bmp32/agent.png",
  ok: "/bmp32/accept.png",
  error: "/bmp32/cancel.png",
  help: "/bmp32/help.png",
  info: "/bmp32/information.png",
  user: "/bmp32/user.png",
  warning: "/bmp32/warning.png"
};
e.popup.icon64 = {
  /** @deprecated */ contextor: "/bmp64/agent.png",
  agent: "/bmp64/agent.png",
  hello: "/bmp64/hello.png",
  hello128: "/bmp64/hello128.png"
};
e.popup.gif = {
  arrows: "/gif/arrows.gif",
  loader1: "/gif/loader1.gif",
  loader2: "/gif/loader2.gif",
  loader2_48: "/gif/loader2_48.gif",
  loader3: "/gif/loader3.gif",
  loader4: "/gif/loader4.gif",
  snake: "/gif/snake.gif"
};

/**
* Bootstrap Popup backgroup color
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.btSearch.tooltip({
  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
  icon: e.popup.icon32.info,
  color: e.popup.color.Green
});
</code>
* @enumeration popup.color
* @enum {string}
* @path e.popup.color
* @readonly
* @var Blue Blue
* @var Green Green
* @var None No color (White)
* @var Orange Orange
* @var Red Red
* @var Yellow Yellow
 */
e.popup.color = {
  Blue:   'blue',
  Green:  'green',
  None:   '',
  Orange: 'orange',
  Red:    'red',
  Yellow: 'yellow'
}

/**
* Popup position
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.btSearch.tooltip({
  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
  XRelative: e.popup.position.Right,
  YRelative: e.popup.position.Center
  ...
});
</code>
* @enumeration popup.position
* @enum {string}
* @path e.popup.position
* @readonly
* @var None Undefined position
* @var Left Left position
* @var Right Right position
* @var Top Top position
* @var Bottom Bottom position
* @var Center Center position
*/
e.popup.position = {
  None:   '',
  Left:   'left',
  Right:  'right',
  Top:    'top',
  Bottom: 'bottom',
  Center: 'center'
};

/**
* Internal prefixes for serialization/unserialization
* @ignore
* @description
* @enumeration e.prefix
* @enum {string}
* @path e.prefix
* @var json json data
* @var number number
* @var raw raw data
* @readonly
*/
e.prefix = {
  //date : '!date:',
  bool : '!bool:',
  json : '!json:',
  number : '!number:',
  raw : '!raw:',
  rawBegin : '%<%',
  rawEnd : '%>%',
  string : '!string:',
  tryCatch : '!try:'
}

/**
 * Outlook constants collection
 * @class outlook
 * @path e.outlook
 * @readonly
 */
e.outlook = {}

/**
 * for legacy reason
 * @ignore
 */
e.outlook.tableContent = {
    olHiddenItems : 1,
    olUserItems : 0
  }

/**
* Outlook constants to define outlook items type
* @description Outlook constants to define outlook items type
* @enumeration e.outlook.OlItemType
* @enum {number}
* @path e.outlook.OlItemType
* @var olAppointmentItem An appointment item
* @var olContactItem A contact item
* @var olMailItem A mail item
* @var olNoteItem A note item
* @var olTaskItem A Task Item
* @readonly
*/
e.outlook.OlItemType = {
  olAppointmentItem : 1,
  olContactItem : 2,
  // olDistributionListItem : 3,
  // olJournalItem : 4,
  olMailItem :	0,
  // olMobileItemMMS :	12,
  // olMobileItemSMS	: 11,
  olNoteItem : 5,
  // olPostItem : 6,
  olTaskItem : 3
}

/**
 * for legacy reason
 * @enumeration e.outlook.itemType
 * @enum {number}
 * @path e.outlook.itemType
 * @readonly
 */
e.outlook.itemType = {
  Mail : 0,
  Calendar: 1,
  Contact: 2,
  Task : 3,
  Journal: 4,
  Note : 5,
  Post: 6,
  DistributionList: 7
};

/**
 * Outlook constants to response to a meeting request
 * @description Outlook constants to response to a meeting request
 * @enumeration e.outlook.OlResponseStatus
 * @enum {number}
 * @var olResponseAccepted Meeting accepted
 * @var olResponseDeclined Meeting declined
 * @var  olResponseNone The appointment is a simple appointment and does not require a response
 * @var  olResponseNotResponded Recipient has not responded
 * @var  olResponseOrganized	The AppointmentItem is on the Organizer's calendar or the recipient is the Organizer of the meeting
 * @var  olResponseTentative Meeting tentatively accepted
 */
e.outlook.OlResponseStatus = {
  olResponseAccepted : 3,
  olResponseDeclined : 4,
  olResponseNone : 0,	
  olResponseNotResponded : 5,
  olResponseOrganized	: 1,
  olResponseTentative :	2
}

/**
 * Outlook constants to represents the sensivity for an Outlook item
 * @description Outlook constants to represents the sensivity for an Outlook item
 * @enumeration e.outlook.OlSensitivity
 * @enum {number|undefined}
 * @path e.outlook.OlSensitivity
 * @var olConfidential Confidential
 * @var olNormal Normal sensitivity
 * @var olPersonal Personal
 * @var olPrivate	Private
 */
e.outlook.OlSensitivity = {
  olConfidential : 3,
  olNormal : 0,
  olPersonal : 1,
  olPrivate :2,
  none : undefined
}

/** Outlook constants to define the recipient type for an Outlook email
 * @description
 * @enumeration e.outlook.OlMailRecipient
 * @enum {number}
 * @path e.outlook.OlMailRecipient
 * @var olBCC The recipient is specified in the BCC property of the Item.
 * @var olCC The recipient is specified in the CC property of the Item.
 * @var olOriginator Originator (sender) of the Item.
 * @var olTo The recipient is specified in the To property of the Item.
 */
e.outlook.OlMailRecipient = {
  olBCC : 3,
  olCC : 2,
  olOriginator : 0,
  olTo : 1
}

/**
* Outlook constants to define importance of items
* @description Outlook constants to define importance of items
* @enumeration e.outlook.OlImportance
* @enum {number | undefined}
* @path e.outlook.OlImportance
* @var olImportanceHigh High Importance
* @var olImportanceLow Low Importance
* @var olImportanceNormal Normal Importance
* @readonly
*/
e.outlook.OlImportance  = {
  olImportanceHigh : 2,
  olImportanceLow : 0,
  olImportanceNormal : 1,
  none : undefined
}

/**
 * Outlook constants to define recipient type in a meeting
 * @description Outlook constants to define recipient type in a meeting
 * @enum {number}
 * @path e.outlook.OlMeetingRecipientType
 * @var olOptional Optional attendee
 * @var olOrganizer Meeting organizer
 * @var olRequired Required attendee
 * @var olResource A resource such as a conference room
 */
e.outlook.OlMeetingRecipientType = {
  olOptional : 2,
  olOrganizer :	0,
  olRequired : 1,
  olResource : 3
}


/**
 * Outlook constants to define the folder type for a specified folder
 * @description Outlook constants to define the folder type for a specified folder
 * @path e.outlook.OlDefaultFolders
 * @enum {number}
 * @var olFolderCalendar The Calendar folder.
 * @var olFolderConflicts The Conflicts folder (subfolder of the Sync Issues folder). Only available for an Exchange account.
 * @var olFolderContacts The Contacts folder.
 * @var olFolderDeletedItems The Deleted Items folder.
 * @var olFolderDrafts The Drafts folder.
 * @var olFolderInbox The Inbox folder.
 * @var olFolderJournal The Journal folder.
 * @var olFolderJunk The Junk E-Mail folder.
 * @var olFolderLocalFailures The Local Failures folder (subfolder of the Sync Issues folder). Only available for an Exchange account.
 * @var olFolderManagedEmail The top-level folder in the Managed Folders group. For more information on Managed Folders, see the Help in Microsoft Outlook. Only available for an Exchange account.
 * @var olFolderNotes The Notes folder.
 * @var olFolderOutbox The Outbox folder.
 * @var olFolderSentMail The Sent Mail folder.
 * @var olFolderServerFailures The Server Failures folder (subfolder of the Sync Issues folder). Only available for an Exchange account.
 * @var olFolderSuggestedContacts The Suggested Contacts folder.
 * @var olFolderSyncIssues The Sync Issues folder. Only available for an Exchange account.
 * @var olFolderTasks The Tasks folder.
 * @var olFolderToDo The To Do folder.
 * @var olPublicFoldersAllPublicFolders The All Public Folders folder in the Exchange Public Folders store. Only available for an Exchange account.
 * @var olFolderRssFeeds The RSS Feeds folder.
 */
e.outlook.OlDefaultFolders = {
  olFolderCalendar:9,
  olFolderConflicts:19,
  olFolderContacts:10,
  olFolderDeletedItems:3,
  olFolderDrafts:16,
  olFolderInbox:6,
  olFolderJournal:11,
  olFolderJunk:23,
  olFolderLocalFailures:21,
  olFolderManagedEmail:29,
  olFolderNotes:12,
  olFolderOutbox:4,
  olFolderSentMail:5,
  olFolderServerFailures:22,
  olFolderSuggestedContacts:30,
  olFolderSyncIssues:20,
  olFolderTasks:13,
  olFolderToDo:28,
  olPublicFoldersAllPublicFolders:18,
  olFolderRssFeeds:25
}

/**
 * Outlook constants to define the busy status for an appointment
 * @description Outlook constants to define the busy status for an appointment
 * @path e.outlook.OlBusyStatus
 * @enum {number | undefined}
 * @var olBusy The user is busy
 * @var olFree The user is available
 * @var olOutOfOffice the user is out of office.
 * @var olTentative The user has a tentative appointment scheduled.
 * @var olWorkingElsewhere The user is working away from the office
 */
e.outlook.OlBusyStatus = {
  olBusy : 2,
  olFree : 0, 
  olOutOfOffice : 3,
  olTentative : 1	,
  olWorkingElsewhere : 4,
  none : undefined
}

/**
 * for legacy reason
 * @ignore
 */
e.outlook.folderItem = {
  olFolderCalendar:9,
  olFolderConflicts:19,
  olFolderContacts:10,
  olFolderDeletedItems:3,
  olFolderDrafts:16,
  olFolderInbox:6,
  olFolderJournal:11,
  olFolderJunk:23,
  olFolderLocalFailures:21,
  olFolderManagedEmail:29,
  olFolderNotes:12,
  olFolderOutbox:4,
  olFolderSentMail:5,
  olFolderServerFailures:22,
  olFolderSuggestedContacts:30,
  olFolderSyncIssues:20,
  olFolderTasks:13,
  olFolderToDo:28,
  olPublicFoldersAllPublicFolders:18,
  olFolderRssFeeds:25
}

/**
* Outlook constants to define status of meetings
* @description Word constants to define status of meetings
* @enumeration e.outlook.OlMeetingStatus
* @enum {number}
* @path e.outlook.OlMeetingStatus
* @var olMeeting The meeting has been scheduled
* @var olMeetingCanceled The scheduled meeting has been cancelled
* @var olMeetingReceived The meeting request has been received
* @var olMeetingReceivedAndCanceled The scheduled meeting has been cancelled but still appears on the user's calendar
* @var olNonMeeting An Appointment item without attendees has been scheduled. This status can be used to set up holidays on a calendar
* @readonly
*/
e.outlook.OlMeetingStatus = {
  olMeeting : 1,
  olMeetingCanceled : 5,
  olMeetingReceived :	3,
  olMeetingReceivedAndCanceled : 7,
  olNonMeeting :0 
}

/**
 * Registry collection
 * @class registry
 * @path e.registry
 * @readonly
 */
e.registry = {}

/**
* Registry Key root
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.registry.root
* @enum {string}
* @path e.registry.root
* @var CurrentUser HKEY_CURRENT_USER
* @var LocalMachine HKEY_LOCAL_MACHINE
* @var ClassesRoot HKEY_CLASSES_ROOT
* @var Users HKEY_USERS
* @var CurrentConfig HKEY_CURRENT_CONFIG
* @readonly
*/
e.registry.root = {
  CurrentUser : 'HKCU',
  LocalMachine : 'HKLM',
  ClassesRoot : 'HKCR',
  Users : 'HKEY_USERS',
  CurrentConfig : 'HKEY_CURRENT_CONFIG'
}

/**
* Registry Key type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.registry.type
* @enum {string}
* @path e.registry.type
* @var Binary binary value
* @var ExpandString expandable string (e.g., "%windir%\\calc.exe")
* @var MultiString Array of strings
* @var Number Number
* @var String String
* @readonly
*/
e.registry.type = {
  Binary : 'REG_BINARY',
  ExpandString : 'REG_EXPAND_SZ',
  MultiString : 'REG_MULTI_SZ',
  Number : 'REG_DWORD',
  String : 'REG_SZ'
}

/**
 * Setting variable
 * @class setting
 * @path e.setting
 * @readonly
 */
e.setting = {}

/**
* Setting type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.setting.type
* @enum {string}
* @path e.setting.type
* @var string string
* @var bool boolean
* @var number number
* @var json json
* @var cyphered cyphered
* @readonly
*/
e.setting.type = {
  bool : 'bool',
  cyphered : 'cyphered',
  json : 'json',
  number : 'number',
  string : 'string'
}

/**
 * @ignore
 * Tooltip collection
 * @class     tooltip
 * @path      e.tooltip
 * @readonly
 */
e.tooltip = {};

/**
* Tooltip animation
* @enumeration e.tooltip.animation
* @enum {string}
* @path e.tooltip.animation
* @var fade fade effect
* @var fall fall effect
* @var grow grow effect
* @var slide slide effect
* @var swing swing effect
* @readonly
*/
e.tooltip.animation = {
  fade: 'fade',
  fall: 'fall',
  grow: 'grow',
  slide: 'slide',
  swing: 'swing'
};

/**
 * Tooltip library
 * @enumeration e.tooltip.library
 * @enum        {string}
 * @path        e.tooltip.library
 * @var         opentip      Opentip library (see [[http://www.opentip.org]])
 * @var         tooltipster  Tooltipster library (default value) (see [[http://iamceege.github.io/tooltipster/]])
 * @readonly
 */
e.tooltip.library = {
  opentip:     'opentip',
  tooltipster: 'tooltipster'
};

/**
 * Tooltip theme for Tooltipster library
 * @enumeration e.tooltip.theme
 * @enum       {string}
 * @path       e.tooltip.theme
 * @var        grey    Grey theme
 * @var        light   Light theme
 * @var        shadow  Shadow theme
 * @var        white   White theme
 * @readonly
 */
e.tooltip.theme = {
  grey:   '',
  light:  'tooltipster-light',
  shadow: 'tooltipster-shadow',
  white:  'tooltipster-noir'
};

/**
* Tooltip theme for Opentip library
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.tooltip.look
* @enum {string}
* @path e.tooltip.look
* @var none default theme
* @var standard standard theme (yellow)
* @var dark dark theme (black)
* @var alert alert theme (red)
* @var glass glass theme (white)
* @readonly
*/
e.tooltip.look = {
  none: '',
  standard: 'standard',
  dark: 'dark',
  alert: 'alert',
  glass: 'glass'
};

/**
* Tooltip trigger
* @enumeration e.tooltip.trigger
* @enum {string}
* @path e.tooltip.trigger
* @var click click trigger
* @var clickAndKeep click trigger (and tooltip is not closed when clicking outside the tooltip)
* @var custom custom trigger
* @var hover hover trigger
* @readonly
*/
e.tooltip.trigger = {
  click: 'click',
  clickAndKeep: 'clickAndKeep',
  custom: 'custom',
  hover: 'hover',
  none: ''
};

/**
* Tooltip animation update
* @enumeration e.tooltip.updateAnimation
* @enum {string}
* @path e.tooltip.updateAnimation
* @var fade fading animation
* @var none no animation
* @var rotate rotation animation
* @var scale scaling animation
* @readonly
*/
e.tooltip.updateAnimation = {
  fade: 'fade',
  none: '',
  rotate: 'rotate',
  scale: 'scale'
};


/**
* Trace collection
* @class trace
* @path e.trace
* @ignore
* @readonly
*/
e.trace = {};

/**
* Trace type
* @enumeration e.trace.type
* @enum {string}
* @path e.trace.type
* @ignore
* @var Discovery Discovery trace file
* @var Log Standarad trace file
* @var Record Recording trace file
* @readonly
* @advanced
*/
e.trace.type = {
  Discovery : 'discovery',
  Log : 'log',
  Record : 'record'
}

/**
* Trace level
* @enumeration e.trace.level
* @enum {number}
* @path e.trace.level
* @var Info Info level
* @var Warning Warning level
* @var Error Error level
* @var None No trace level
* @readonly
*/
e.trace.level = {
  Info : 0,
  Warning : 1,
  Error : 2,
  None : 3
}

/**
 * @ignore
 * Scenario collection
 * @class     scenario
 * @path      e.scenario
 * @readonly
 */
e.scenario = {}

/**
* Scenario mode
* @description
* __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  ...
  sc.setMode(e.scenario.mode.clearIfRunning);
  // *** Add steps ***
  sc.step(...);
  ...
}});
</code>
* @enumeration e.scenario.mode
* @enum {number}
* @path e.messbox.type
* @var noControl no control on scenario launch
* @var noStartIfRunning scenario is not launched if an instance with same name is running
* @var clearIfRunning if an instance with same name is running, it is cleared before the scenario is launched
* @var clearAll all scenarios are cleared before scenario is launched
* @readonly
*/
e.scenario.mode = {
  noControl : 0,
  noStartIfRunning : 1,
  clearIfRunning : 2,
  clearAll : 3
}

/**
* Step collection
* @class step
* @path e.step
* @readonly
*/
e.step = {}

/**
* Step exit code
* @description
* __Ex.:__
<code javascript>
  ...
  sc.step(e.step.loop);
  ...
}});
</code>
* @enumeration e.step.exit
* @enum {string}
* @path e.step.exit
* @readonly
*/
e.step.exit = {
  none : '',
  done : 'done',
  loop : 'loop',
  error : 'error',
  timeout : 'timeout',
  case1 : 'case1',
  case2 : 'case2',
  case3 : 'case3',
  case4 : 'case4',
  case5 : 'case5',
  case6 : 'case6',
  case7 : 'case7',
  case8 : 'case8'
}

/**
* Script languages
* @description
* __Ex.:__
<code javascript>
// execute VBScript in a web page
var code = 'Call MyVBFunction(Var1, Var2)';
res = ctx.actionApp(desc, 'execScript', 'EXECSCRIPT', code, e.scriptLanguage.VBScript);
</code>
* @enumeration e.scriptLanguage
* @enum {string}
* @path e.scriptLanguage
* @var JavaScript JavaScript language
* @var VBScript VBScript language
* @readonly
*/
e.scriptLanguage = {
  JavaScript : 'JavaScript',
  VBScript : 'VBScript'
}

///**
//* Shell special folders
//* @class shell
//* @path e.shell
//* @readonly
//*/
e.shell = {}

/**
* Windows system environment types : System, User, ...
* @description
* __Ex.:__
<code javascript>// Get Desktop path
str = ctx.wscript.shell.getEnvVariable(e.shell.envVariable.Desktop, e.shell.envType.User);
</code>
* @enumeration e.shell.envType
* @enum {string}
* @path e.shell.envType
* @readonly
* @var System   System
* @var User     User
* @var Process  Process
*/
e.shell.envType = {
  System :   'SYSTEM',
  User : 'USER',
  Process : 'PROCESS'
}

/**
* Windows System variables
* @description
<code javascript>// Get temporary directory
str = ctx.wscript.shell.getEnvVariable(e.shell.envVariable.PathTemp, e.shell.envType.User);
</code>
* @enumeration e.shell.envVariable
* @enum {string}
* @path e.shell.envVariable
* @readonly
* @var NbProcessors Number of processors, \\
* ex.: NbProcessors= 8
* @var ProcessorArchitecture Processor architecture, \\
* ex. : ProcessorArchitecture= AMD64
* @var ProcessorId Processor Id,  \\
* ex. : ProcessorId= Intel64 Family 6 Model 42 Stepping 7, GenuineIntel
* @var ProcessorLevel Processor level,  \\
* ex. : ProcessorLevel= 6
* @var ProcessorRevision Processor revision, \\
* ex. : ProcessorRevision= 2a07
* @var OS OS family , \\
* ex. : OS= Windows_NT
* @var CommandPrompt Command prompt, \\
* ex. : CommandPrompt= %SystemRoot%\system32\cmd.exe
* @var HomeDrive Home drive, \\
* ex. : HomeDrive = c:
* @var PathHome Path home, \\
* ex. : PathHome= \Users\<login>
* @var Path Path, \\
* ex. : Path= %SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;...
* @var PathExtensions Path extensions, \\
* ex. : PathExtensions= .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC
* @var Prompt
* @var SystemDrive System drive, \\
* ex. : SystemDrive = c:
* @var SystemRoot system main directory, \\
* ex. : SystemRoot= C:\Windows
* @var Windir Windows main directory, \\
* ex. : Windir= %SystemRoot%
* @var PathTemp Default temporary path, \\ ex. : [System] PathTemp= %SystemRoot%\TEMP \\ ex. : [User] PathTemp= C:\Users\cpuget\AppData\Local\Temp
* @var PathTmp Default temporary path, \\ ex. : PathTemp= %SystemRoot%\TEMP
*/
e.shell.envVariable = {
  NbProcessors : 'NUMBER_OF_PROCESSORS',
  ProcessorArchitecture : 'PROCESSOR_ARCHITECTURE',
  ProcessorId : 'PROCESSOR_IDENTIFIER',
  ProcessorLevel : 'PROCESSOR_LEVEL',
  ProcessorRevision : 'PROCESSOR_REVISION',
  OS : 'OS',
  CommandPrompt : 'COMSPEC',
  HomeDrive : 'HOMEDRIVE',
  PathHome : 'HOMEPATH',
  Path : 'PATH',
  PathExtensions : 'PATHEXT',
  Prompt : 'PROMPT',
  SystemDrive : 'SYSTEMDRIVE',
  SystemRoot : 'SYSTEMROOT',
  Windir : 'WINDIR',
  PathTemp : 'TEMP',
  PathTmp : 'TMP'
}

/**
* Windows special folder list : '%MyDocuments%', '%Desktop%', ...
* @description
* see http://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx for more details
*
* __Ex.:__
<code javascript>str = ctx.wscript.shell.getSpecialFolders(e.shell.specialFolder.Programs);</code>
* @enumeration e.shell.specialFolder
* @enum {string}
* @path e.shell.specialFolder
* @readonly
* @var AllUsersDesktop    All Users Desktop
* @var AllUsersStartMenu All Users Start Menu
* @var AllUsersPrograms  All Users Programs
* @var AllUsersStartup   All Users Startup
* @var Desktop           Desktop
* @var Favorites         Favorites
* @var Fonts             Fonts
* @var MyDocuments       My Documents
* @var NetHood           NetHood
* @var PrintHood         Print Hood
* @var Programs          Programs
* @var Recent            Recent
* @var SendTo            SendTo
* @var StartMenu         Start Menu
* @var Startup           Startup
* @var Templates         Templates
 */
e.shell.specialFolder = {
  AllUsersDesktop :   'AllUsersDesktop',
  AllUsersStartMenu : 'AllUsersStartMenu',
  AllUsersPrograms :  'AllUsersPrograms',
  AllUsersStartup :   'AllUsersStartup',
  Desktop :           'Desktop',
  Favorites :         'Favorites',
  Fonts :             'Fonts',
  MyDocuments :       'MyDocuments',
  NetHood :           'NetHood',
  PrintHood :         'PrintHood',
  Programs :          'Programs',
  Recent :            'Recent',
  SendTo :            'SendTo',
  StartMenu :         'StartMenu',
  Startup :           'Startup',
  Templates :         'Templates'
}


///**
//* systray collection
//* @class systray
//* @path e.systray
//* @readonly
//*/
e.systray = {}

/**
* Type used to display a systray 'ballon' tooltip
* @description
* __Ex.:__
<code javascript>
// show a balloon toolip during 10 s to mention it's ready
systray.showBalloon('Demo', 'Ready for testing', e.systray.iconType.Warning, 10000);
</code>
* @enumeration e.systray.iconType
* @enum {string}
* @path e.systray.iconType
* @var Info    Information
* @var Warning Warning
* @var Error   Error
* @readonly
*/
e.systray.iconType = {
  Info : 'NIIF_INFO',
  Warning : 'NIIF_WARNING',
  Error : 'NIIF_ERROR'
}

/**
* Target frame : name of the frame in which to display the resource
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.navigate('http://www....', e.targetFrame.Blank);
</code>
* @enumeration e.targetFrame
* @enum {string}
* @path e.targetFrame
* @var Blank Load the link into a new unnamed window.
* @var Parent Load the link into the immediate parent of the document the link is in.
* @var Self Load the link into the same window the link was clicked in.
* @var Top Load the link into the full body of the current window.
* @readonly
*/
e.targetFrame = {
  Blank : '_blank',
  Parent : '_parent',
  Self : '_self',
  Top : '_top'
}

/**
* Browser bar style
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.setVisible(e.windowBarType.AddressBar, true);
</code>
* @enumeration e.windowBarType
* @enum {string}
* @path e.windowBarType
* @var AddressBar Address bar
* @var Browser Full browser
* @var MenuBar Menu bar
* @var StatusBar Status bar
* @var ToolBar Tool bar
* @readonly
*/
e.windowBarType = {
  AddressBar : 'ADRESSBAR',
  Browser : 'BROWSER',
  MenuBar : 'MENUBAR',
  StatusBar : 'STATUSBAR',
  ToolBar: 'TOOLBAR'
}
/**
* Window style
* @description
* __Ex.:__
<code javascript>
MyAppli.MyPage.setWindowStyle(true, e.windowStyle.MaximizeBox);
</code>
* @enumeration e.windowStyle
* @enum {string}
* @path e.windowStyle
* @var MinimizeBox Maximize box style
* @var MinimizeBox Minimize box style
* @var SystemMenu System menu style
* @var ToolWindow Tool window style
* @readonly
*/
e.windowStyle = {
  MaximizeBox : 'WS_MAXIMIZEBOX',
  MinimizeBox : 'WS_MINIMIZEBOX',
  SystemMenu : 'WS_SYSMENU',
  ToolWindow : 'WS_EX_TOOLWINDOW'
}

/**
 * Word constants collection
 * @class word
 * @path e.word
 * @readonly
 */
e.word = {};

/**
* Word constants to define direction to move cursor
* @description Word constants to define direction to move cursor
* @enumeration e.word.moveDirection
* @enum {number}
* @path e.word.moveDirection
* @var right Right
* @var down Down
* @var left Left
* @var up Up
* @readonly
*/
e.word.moveDirection = {
  right: 0,
  down: 1,
  left: 2,
  up: 3
}

/**
* Word constants to define an item type for goTo function
* @description Word constants to define an item type for goTo function
* @enumeration e.word.WdGoToItem
* @enum {number}
* @path e.word.WdGoToItem
* @var wdGoToBookmark A bookmark
* @var wdGoToComment A comment
* @var wdGoToEndnote An endnote
* @var wdGoToEquation An equation
* @var wdGoToField A field
* @var wdGoToFootnote A footnote
* @var wdGoToGrammaticalError A grammatical error
* @var wdGoToGraphic A graphic
* @var wdGoToHeading A heading
* @var wdGoToLine A line
* @var wdGoToObject An object
* @var wdGoToPage A page
* @var wdGoToPercent A percent
* @var wdGoToProofreadingError A proofreading error
* @var wdGoToSection A section
* @var wdGoToSpellingError A spelling error
* @var wdGoToTable A table
* @readonly
*/
e.word.WdGoToItem = {
  wdGoToBookmark : -1,
  wdGoToComment : 6,
  wdGoToEndnote : 5,
  wdGoToEquation : 10,
  wdGoToField : 7,
  wdGoToFootnote : 4,
  wdGoToGrammaticalError : 14,
  wdGoToGraphic : 8,
  wdGoToHeading : 11,
  wdGoToLine : 3,
  wdGoToObject : 9,
  wdGoToPage : 1,
  wdGoToPercent : 12,
  wdGoToProofreadingError : 15,
  wdGoToSection : 0,
  wdGoToSpellingError : 13,
  wdGoToTable : 2
}

/**
* Word constants to define direction to use the goTo function
* @description Word constants to define direction to use the goTo function
* @enumeration e.word.WdGoToDirection
* @enum {number}
* @path e.word.WdGoToDirection
* @var wdGoToAbsolute An absolute position
* @var wdGoToFirst The first instance of the specified object
* @var wdGoToLast The last instance of the specified object
* @var wdGoToNext The next instance of the specified object
* @var wdGoToPrevious The previous instance of the specified object
* @var wdGoToRelative A position relative to the current position
* @readonly
*/
e.word.WdGoToDirection = {
  wdGoToAbsolute : 1,
  wdGoToFirst : 1,
  wdGoToLast : -1,
  wdGoToNext : 2,
  wdGoToPrevious : 3,
  wdGoToRelative : 2
}

/**
* Word constants to define units when moving the cursor
* @description Word constants to define units when moving the cursor
* @enumeration e.word.WdUnits
* @enum {number}
* @path e.word.WdUnits
* @var wdCharacter A character
* @var wdLine A line
* @var wdScreen A screen
* @var wdWord A word
* @readonly
*/
e.word.WdUnits = {
//    wdCell: 12,
  wdCharacter: 1,
  // wdCharacterFormatting: 13,
  // wdColumn: 9,
  // wdItem: 16,
  wdLine: 5,
  // wdParagraph: 4,
  // wdParagraphFormatting: 14,
  // wdRow: 10,
  wdScreen: 7,
  // wdSection: 8,
  // wdSentence: 3,
  // wdStory: 6,
  // wdTable: 15,
  // wdWindow: 11,
  wdWord: 2
}

/**
* Word constants to define character case
* @description Word constants to define character case
* @enumeration e.word.WdCharacterCase
* @enum {number}
* @path e.word.WdCharacterCase
* @var wdFullWidth Full-width. Used for Japanese characters
* @var wdHalfWidth Half-width. Used for Japanese characters
* @var wdHiragana Hiragana characters. Used with Japanese text
* @var wdKatakana Katakana characters. Used with Japanese text
* @var wdLowerCase Lower case
* @var wdNextCase Toggles between upper, lower, and sentence case
* @var wdTitleSentence Sentence case
* @var wdTitleWord Title word case
* @var wdToggleCase Toggles upper case characters to lower, and lower case characters to upper
* @var wdUpperCase Upper case
* @readonly
*/
e.word.WdCharacterCase = {
  wdFullWidth: 7,
  wdHalfWidth: 6,
  wdHiragana:	9,
  wdKatakana:	8,
  wdLowerCase: 0,     
  wdNextCase:	-1,
  wdTitleSentence: 4,
  wdTitleWord: 2, 
  wdToggleCase: 5,
  wdUpperCase: 1	
}

/**
* Word constants to define if the move of the cursor has to be added to the current selection
* @description Word constants to define if the move of the cursor has to be added to the current selection
* @enumeration e.word.WdMovementType
* @enum {number}
* @path e.word.WdMovementType
* @var wdExtend The end of the selection is extended to the end of the specified unit.
* @var wdMove The selection is collapsed to an insertion point and moved to the end of the specified unit.
* @readonly
*/
e.word.WdMovementType = {
  wdExtend: 1,
  wdMove: 0
}

/**
* Word constants to define the type of replacement when replace All is used
* @description Word constants to define the type of replacement when replace All is used
* @enumeration e.word.WdReplace
* @enum {number}
* @path e.word.WdReplace
* @var wdReplaceAll Replace all occurrences
* @var wdReplaceNone Replace no occurrences
* @var wdReplaceOne Replace the first occurrence encountered
* @readonly
*/
e.word.WdReplace = {
  wdReplaceAll : 2,
  wdReplaceNone :	0,
  wdReplaceOne: 1
}

/**
 * Color index
* @description Color index
* @enumeration e.word.WdColorIndex
* @enum {number}
* @path e.word.WdColorIndex
* @var   wdBlack Black
* @var   wdBlue Blue
* @var   wdBrightGreen Bright Green
* @var   wdDarkBlue Dark Blue
* @var   wdDarkRed Dark Red
* @var   wdDarkYellow Dark Yellow
* @var   wdGray25 Shade 25 of gray
* @var   wdGray50 Shade 50 of gray 
* @var   wdGreen Green
* @var   wdNoHighlight Removes highlighting that has been applied.
* @var   wdPink Pink
* @var   wdRed Red
* @var   wdTeal Teal
* @var   wdTurquoise Turquoise
* @var   wdViolet Violet
* @var   wdWhite White
* @var   wdYellow Yellow
* @readonly
*/
e.word.WdColorIndex = {
  wdBlack: 1,
  wdBlue: 2,
  wdBrightGreen: 4,  
  wdDarkBlue: 9,
  wdDarkRed: 13,
  wdDarkYellow: 14,
  wdGray25: 16,
  wdGray50: 15,
  wdGreen: 11,
  wdNoHighlight: 0,
  wdPink: 5,
  wdRed: 6,
  wdTeal: 10,
  wdTurquoise: 3,
  wdViolet: 12,
  wdWhite: 8,
  wdYellow: 7
}

/**
 * Constants used in various methods
* @description Constants used in various methods
* @enumeration e.word.WdConstants
* @enum {number}
* @path e.word.WdConstants
* @var wdToggle Toggles a property's value
* @var wdUndefined Represents an undefined value
* @var wdColorAutomatic Represents the automatic color
* @readonly
*/
e.word.WdConstants = {
  wdToggle : 9999998,
  wdUndefined : 9999999,
  wdColorAutomatic:-16777216
}

/**
 * SAPUI5 constants collection
 * @class word
 * @path e.SAPUI5
 * @readonly
 */
e.SAPUI5 = {};
/**
* SAPUI5 Calendar Meeting type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.SAPUI5.meetingType
* @path e.SAPUI5.meetingType
* @var TeamMeeting Type01
* @var Personal Type05
* @var Discussions Type08
* @var OutofOffice Type09
* @var PrivateMeeting Type03
* @readonly
*/
e.SAPUI5.meetingType = {
  TeamMeeting: 'Type01',
  Personal: 'Type05',
  Discussions: 'Type08',
  OutofOffice: 'Type09',
  PrivateMeeting: 'Type03'
};


