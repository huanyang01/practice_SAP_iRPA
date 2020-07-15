/**
 * @module      FSO (File System Object) library
 * @file        utils/fso.js
 * @description
 *  This library is a collection of functions for accessing and manipulating File System Objects.
 *
 *  The library is structured in different groups of functions.
 *   - Functions used to handle the FSO instance: ''ctx.fso.init'', ''ctx.fso.end''.
 *   - Functions used to manage different FSO objects: ''Drive'', ''Folder'' and ''Files''.
 *   - Main functions to manipulate the FSO objects: ''create'', ''copy'', ''move'', ''remove'', ...
 *   - Functions used to load text files and XML files.
 *
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 *
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'ctx.fso.Application'
 * @fileoverview
 * @suppress {missingProperties}
 */

/**
 * Options for the 'ctx.fso' library
 * @namespace   ctx.options.fso
 * @path        ctx.options.fso
 */
ctx.options.fso = {
  /**
   * Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
   * @property  {e.trace.level} traceLevel
   * @default   e.trace.level.None
   * @path      ctx.options.fso.traceLevel
   */
   traceLevel: e.trace.level.None
 };
 
  /**
   * @ignore
   * @typedef {{
   *    source: string,
   *    destination: string,
   *    filename: string,
   *    options: string,
   *    timeout: (number|undefined),
   *    style: (number|undefined),
   *    useExecRun: (boolean|undefined),
   *    waitEnd: (boolean|undefined),
   *    callback: (function ()|undefined)
   * }}
   */
   ctx.robocopyOptions = {
     source: '',
     destination: '',
     filename: '',
     options: '',
     timeout: 0,
     style: 1,
     useExecRun: false,
     waitEnd: false,
     callback: undefined
   };
 
 /**
  * Class gathering a set of functions to manage FSO instance
  * @class        ctx.fso
  * @constructor
  * @path         ctx.fso
  */
 ctx.fso = (function() {
   /** @type {Object} */ 
   var _options = ctx.options.fso;
   var _fso =
   /** @lends ctx.fso*/
   {};
   /** @type {ScriptingFileSystemObject} see: fso.externs */ 
   var _oFSO = null; // FSO object
   var _res = null;
 
  /**
   * Initializes the FSO library.
   * @method       init
   * @description
   *  The <wrap box>**init( )**</wrap> method of ''ctx.fso'' class initializes the FSO library.
   *
   *  <wrap help> //Example://</wrap>
   *  <code javascript> ctx.fso.init( );</code>
   * @throws       {Error}
   * @path         ctx.fso.init
   */
   _fso.init = function() {
     //ctx.notifyAction('ctx.fso.init');
     try {
       if (_oFSO == null) {
         _oFSO = new ActiveXObject("Scripting.FileSystemObject");
       }
       if (_oFSO == null){
         throw new Error(e.error.KO, '[fso.init] Failed to start fso.');
       }
     } catch (ex){
       throw new Error(e.error.KO, '[fso.init] Failed to start fso. '+ ex.description);
     }
   }
 
  /**
   * Ends the FSO library.
   * @method       end
   * @description
   *  The <wrap box>**end( )**</wrap> method of ''ctx.fso'' class ends the FSO library.
   *
   *  <wrap help> //Example://</wrap>
   *  <code javascript> ctx.fso.end( );</code>
   * @throws       {Error}
   * @path         ctx.fso.end
   */
   _fso.end = function () {
     ctx.notifyAction('ctx.fso.end');
     try {
       _oFSO = null;
       CollectGarbage();
     } catch (ex){
       throw new Error(e.error.KO, '[fso.end] Failed to end FSO. '+ ex.description);
     }
   }
 
  /**
   * Returns the internal FSO.
   * @method       getObject
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> var oFso = ctx.fso.getObject( );</code>
   * @path         ctx.fso.getObject
   */
   _fso.getObject = function () {
     ctx.notifyAction('ctx.fso.getObject');
     return _oFSO;
   }
 
  /**
   * Checks if a path is a valid Web URL.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>
   *   var path1 = "\\\\myServer\\myFolder\\myFile.pdf";
   *   var path2 = "http://myServer/myFolder/myFile.pdf";
   *   var res = ctx.isWebURL( path1 ); // false
   *   res = ctx.isWebURL( path2 ); // true</code>
   * @method  isWebURL
   * @path    ctx.fso.isWebURL
   * @param   {string} path The URL to be tested
   * @return  {boolean} ''true'' if the tested URL is a valid Web URL, otherwise ''false''
   */
   _fso.isWebURL = function(path) {
     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
     return (pattern.test(path) ? true : false);
   }
 
  /**
   * Tests if a path is absolute or relative.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>
   *   if ( ctx.isPathAbsolute( path ) ) {
   *     // Add your code here
   *   }</code>
   * @method  isPathAbsolute
   * @path    ctx.fso.isPathAbsolute
   * @param   {string} path The path to be tested
   * @return  {boolean} ''true'' if the tested path is an absolute path, otherwise ''false''
   */
   _fso.isPathAbsolute = function (path) {
     // path like : http://..., c:...
     if (path.indexOf(':') > 0) { return true; }
     // path like : ...//...
     var r = new RegExp('^(?:[a-z]+:)?//', 'i');
     if (r.test(path)) { return true; }
     // path like : \\server\...
      return (/^(?:[A-Za-z]:)?\\/.test(path) ? true : false);
   }
 
  /**
   * Class gathering a set of functions to manipulate FSO drives
   * @class      ctx.fso.drive
   * @path       ctx.fso.drive
   */
   _fso.drive = (function() {
     var _drive = {};
 
    /**
     * Checks if a drive exists.
     * @method       exist
     * @description
     *  The <wrap box>**exist( )**</wrap> method of ''ctx.fso.drive'' class checks if a drive exists.
     *
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Checks if the drive not exists
     *   if( !ctx.fso.drive.exist( drive ) {
     *     // Add your code here
     *   }</code>
     * @param       {string} driveName Drive name
     * @return      {boolean} ''true'' if drive exists, otherwise ''false''
     * @path        ctx.fso.drive.exist
     */
     _drive.exist = function(driveName) {
       ctx.notifyAction('ctx.fso.drive.exist');
       try{
         // returns true or false
         if (_oFSO == null)
           _fso.init();
         if (_oFSO.DriveExists(driveName) == true){
           return true;
         } else{
           return false;
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.drive.exist] Failed to test if the drive exists. '+ ex.description);
       }
     }
 
    /**
     * Gets the pointer to drive object.
     * @method      get
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Get a pointer to the drive C:
     *   ctx.fso.drive.get( 'C' );</code>
     * @throws      {Error}
     * @param       {string} driveLetter Letter of the drive
     * @return      {Object} Drive Object
     * @path        ctx.fso.drive.get
     */
     _drive.get = function(driveLetter) {
       ctx.notifyAction('ctx.fso.drive.get');
       try{
         _res = null;
         if (_oFSO == null)
           _fso.init();
         _res = _oFSO.GetDrive(driveLetter)
         if (_res !== null){
           return _res;
         } else {
           throw new Error(e.error.KO, '[fso.drive.get] Failed to get drive.');
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.drive.get] Failed to get the drive. '+ ex.description);
       }
     }
 
    /**
     * Gets the letter of the drive.
     * @method      getName
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Gets the letter of the drive
     *   ctx.fso.drive.getName( drive );</code>
     * @param       {string} drive Path of drive
     * @return      {Object} The letter describing the drive
     * @path        ctx.fso.drive.getName
     */
     _drive.getName = function(drive) {
       ctx.notifyAction('ctx.fso.drive.getName');
       try{
         _res = null;
         if (_oFSO == null)
           _fso.init();
         _res = _oFSO.GetDriveName(drive);
         if (_res !== null){
           return _res;
         } else {
           throw new Error(e.error.KO, '[fso.drive.getName]  Failed to get drive letter.');
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.drive.getName] Failed to get the drive letter. '+ ex.description);
       }
     }
     return _drive;
   })();
 
   /**
    * Class gathering a set of functions to manipulate folders
    * @class    ctx.fso.folder
    * @path     ctx.fso.folder
    */
   _fso.folder = (function() {
     var _folder = {};
 
    /**
     * Copies a folder.
     * @method      copy
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Copies the folder
     *   ctx.fso.folder.copy( foldersrc, folderdst, true );</code>
     * @throws      {Error}
     * @param       {string} foldersrc Folder source
     * @param       {string} folderdst Folder destination
     * @param       {boolean} [overwrite] Overwrite option
     * @path        ctx.fso.folder.copy
     */
     _folder.copy = function(foldersrc, folderdst, overwrite) {
       ctx.notifyAction('ctx.fso.folder.copy');
       try{
         // Copy the named folder
         // returns true or false
         if (_oFSO == null)
           _fso.init();
         foldersrc = ctx.wscript.shell.expandEnvString(foldersrc);
         folderdst = ctx.wscript.shell.expandEnvString(folderdst);
         _oFSO.CopyFolder(foldersrc, folderdst, overwrite);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.copy] folderSrc='+foldersrc+', folderdst='+folderdst+', overwrite='+overwrite+' Failed to copy the folder. '+ ex.description);
       }
     }
 
    /**
     * Creates a folder.
     * @method      create
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Creates the named folder
     *   ctx.fso.folder.create( folder );</code>
     * @throws  {Error}
     * @param   {string} folderName Folder name
     * @path    ctx.fso.folder.create
     */
     _folder.create = function(folderName) {
       ctx.notifyAction('ctx.fso.folder.create');
       try{
         if (_oFSO == null)
           _fso.init();
           folderName = ctx.wscript.shell.expandEnvString(folderName);
           if (!_oFSO.FolderExists(folderName)) {
             var parentFolder =  _oFSO.GetParentFolderName(folderName);
             if (parentFolder) {
               // recursively create parent folder
               ctx.fso.folder.create(parentFolder);
             }
             _res = _oFSO.CreateFolder(folderName);
           }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.create] folderName='+folderName+' Failed to create the folder. '+ ex.description);
       }
     }
 
    /**
     * Checks if the folder exists.
     * @method      exist
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Checks if the folder exists
     *   ctx.fso.folder.exist( folder );</code>
     * @throws      {Error}
     * @param       {string} folderName The name of folder to check
     * @return      {boolean} ''true'' if the folder exists, otherwise ''false''
     * @path        ctx.fso.folder.exist
     */
     _folder.exist = function(folderName) {
       ctx.notifyAction('ctx.fso.folder.exist');
       var result;
       try{
         // Tests if the named folder exists
         // returns true or false
         if (_oFSO == null)
           _fso.init();
         folderName = ctx.wscript.shell.expandEnvString(folderName);
         result = _oFSO.FolderExists(folderName);
         return result;
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.exist] folderName='+folderName+' Failed to test if the folder exists. '+ ex.description);
       }
     }
 
    /**
     * Gets the pointer to a folder.
     * @method      get
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Gets the pointer to a folder
     *   ctx.fso.folder.get( folder );</code>
     * @throws      {Error}
     * @param       {string} folderName Folder name
     * @return      {Object} Folder object
     * @path        ctx.fso.folder.get
     */
     _folder.get = function(folderName) {
       ctx.notifyAction('ctx.fso.folder.get');
       try{
         // access to the named folder
         if (_oFSO == null)
           _fso.init();
         folderName = ctx.wscript.shell.expandEnvString(folderName);
         return _oFSO.GetFolder(folderName);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.get] folderName='+folderName+' Failed to to get the folder object. '+ ex.description);
       }
     }
 
    /**
     * Gets a special folder path.
     * @method      getSpecialFolder
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Gets the pointer to a folder
     *   ctx.fso.folder.get( folder );</code>
     * @throws      {Error}
     * @param       {e.shell.specialFolder} folderName Special folder name
     * @return      {string} Special folder path
     * @path        ctx.fso.folder.getSpecialFolder
     */
     _folder.getSpecialFolder = function(folderName) {
       ctx.notifyAction('ctx.fso.folder.getSpecialFolder');
       try{
         return ctx.wscript.shell.getSpecialFolders(folderName);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.getSpecialFolder] folderName='+folderName+' Failed to to get the folder object. '+ ex.description);
       }
     }
 
    /**
     * Gets the collection of files in a folder.
     * @method      getFileCollection
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  var folder = '...';
  // get result as an Enumerator
  var files = ctx.fso.folder.getFileCollection( folder );
  for ( ; !files.atEnd( ); files.moveNext( ) ) {
    var file = files.item( );
    var filename = file.Name;
    var filedate = file.DateCreated;
    var filepath = file.Path;
    ...
  }
  // get result as an Array
  var files = ctx.fso.folder.getFileCollection( folder, true );
  ctx.each( files, function( file, item ) {
    var filename = file.Name;
    var filedate = file.DateCreated;
    var filepath = file.Path;
  } );
 </code>
     * @param       {string} folderName Folder name
     * @param       {boolean} [retArray] If ''true'', returns an array, otherwise an enumerator
     * @return      {Array<Object>|Enumerator} Collection of files
     * @path        ctx.fso.folder.getFileCollection
     */
     _folder.getFileCollection = function(folderName, retArray) {
       ctx.notifyAction('ctx.fso.folder.getFileCollection');
       try{
         // access to the named folder
         _res = null;
         if (_oFSO == null)
           _fso.init();
         folderName = ctx.wscript.shell.expandEnvString(folderName);
         var f = _oFSO.GetFolder(folderName);
         /** @type {Array<Object>|Enumerator} */ var result;
         if (retArray) {
           result = [];
           var en = new Enumerator(f.Files);
           en.moveFirst();
           while (en.atEnd() === false) {
             result.push(en.item());
             en.moveNext();
           }
           return result;
         } else {
           result = new Enumerator(f.Files);
           return result;
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.getFileCollection] Failed to to get the file collection of the folder. '+ ex.description);
       }
     }
 
    /**
     * Gets the collection of sub folders in a folder.
     * @method      getFolderCollection
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  var folder = '...';
  // get result as an Enumerator
  var folders = ctx.fso.folder.getFolderCollection( folder );
  for( ; !folders.atEnd( ); folders.moveNext( ) ) {
    var folder = folders.item( );
    var foldername = folder.Name;
    var folderdate = folder.DateCreated;
    var folderpath = folder.Path;
    ...
  }
  // get result as an Array
  var folders = ctx.fso.folder.getFolderCollection( folder, true );
  ctx.each( folders, function( folder, item ) {
    var foldername = folder.Name;
    var folderdate = folder.DateCreated;
    var folderpath = folder.Path;
  } );
 </code>
     * @param       {string} folderName Folder name
     * @param       {boolean} [retArray] If ''true'', returns an array, otherwise an enumerator
     * @return      {Array<Object>|Enumerator} Collection of folders
     * @path        ctx.fso.folder.getFolderCollection
     */
     _folder.getFolderCollection = function(folderName, retArray) {
       ctx.notifyAction('ctx.fso.folder.getFolderCollection');
       try{
         // access to the named folder
         _res = null;
         if (_oFSO == null)
           _fso.init();
         folderName = ctx.wscript.shell.expandEnvString(folderName);
         var f = _oFSO.GetFolder(folderName);
         /** @type {Array<Object>|Enumerator} */ var result;
         if (retArray) {
           result = [];
           var en = new Enumerator(f.SubFolders);
           en.moveFirst();
           while (en.atEnd() === false) {
             result.push(en.item());
             en.moveNext();
           }
           return result;
         } else {
           result = new Enumerator(f.SubFolders);
           return result;
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.getFolderCollection] Failed to to get the file collection of the folder. '+ ex.description);
       }
     }
 
    /**
     * Moves folder.
     * @method      move
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Moves the folder
     *   ctx.fso.folder.move( foldersrc, folderdst );</code>
     * @throws      {Error}
     * @param       {string} foldersrc The source folder name
     * @param       {string} folderdst The destination folder name
     * @path        ctx.fso.folder.move
     */
     _folder.move = function(foldersrc,folderdst) {
       ctx.notifyAction('ctx.fso.folder.move');
       try{
         if (_oFSO == null)
           _fso.init();
         foldersrc = ctx.wscript.shell.expandEnvString(foldersrc);
         folderdst = ctx.wscript.shell.expandEnvString(folderdst);
         var res = _oFSO.MoveFolder(foldersrc,folderdst);
 
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.move] Failed to move the folder. '+ ex.description);
       }
     }
 
    /**
     * Removes folder.
     * @method      remove
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Removes the folder
     *   ctx.fso.folder.remove( folder );</code>
     * @throws      {Error}
     * @path        ctx.fso.folder.remove
     * @param       {string} folderName The folder name to remove
     */
     _folder.remove = function(folderName) {
       ctx.notifyAction('ctx.fso.folder.remove');
       try{
         if (_oFSO == null)
           _fso.init();
         folderName = ctx.wscript.shell.expandEnvString(folderName);
         if (_oFSO.FolderExists(folderName) == true) {
           _oFSO.DeleteFolder(folderName);
         } else {
           throw new Error(e.error.KO, '[fso.folder.remove] Failed to remove the folder.');
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.remove] Failed to remove the folder. '+ ex.description);
       }
     }
 
     return _folder;
   })();
 
   /**
    * Class gathering a set of functions to manipulate files
    * @class    ctx.fso.file
    * @path     ctx.fso.file
    */
   _fso.file = (function() {
     var _file =
     {};
 
     _file.chr = function chr(n) { return String.fromCharCode(n); }
 
    /**
     * Copies a file.
     * @method      copy
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Copies the file
     *   ctx.fso.file.copy( filenamesrc, filenamedst, true );</code>
     * @throws {Error}
     * @param {string} filenamesrc The source filename
     * @param {string} filenamedst The destination filename
     * @param {boolean} [overwrite] Overwrite option
     * @path ctx.fso.file.copy
     */
     _file.copy = function(filenamesrc, filenamedst, overwrite) {
       ctx.notifyAction('ctx.fso.file.copy');
       try{
         if (_oFSO == null)
           _fso.init();
         filenamesrc = ctx.wscript.shell.expandEnvString(filenamesrc);
         filenamedst = ctx.wscript.shell.expandEnvString(filenamedst);
         _oFSO.CopyFile(filenamesrc,filenamedst, overwrite);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.copy] Failed to copy the file. '+ ex.description);
       }
     }
 
    /**
     * Downloads a http/https or a remote file to a local destination.
     * @method  downloadOrCopy
     * @param   {string} source Source URL
     * @param   {string} destination Destination local file
     * @param   {ctx.ajaxParams|function(boolean)} [params] Options (see 'ctx.ajax.call' for possible values), or callback function
     * @param   {function(string)} [callback] Callback to be called (string parameter gives the local filename (empty if failed))
     * @path    ctx.fso.file.downloadOrCopy
     */
     _file.downloadOrCopy = function (source, destination, params, callback) {
       ctx.notifyAction('ctx.ajax.downloadOrCopy');
       if (params && (typeof params === 'function')) {
         callback = params;
         params = undefined;
       }
       if (ctx.fso.isWebURL(source)) {
         ctx.ajax.download(source, destination, params, callback);
       } else {
         var filename = _file.getFileName(source);
         var sourcePath = _file.getFolderName(source);
         destination = destination || ctx.options.path.log;
         var destinationPath = _file.getFolderName(destination);
         _file.xcopy(sourcePath, destinationPath, filename, 120, function(obj) {
           if (callback && (typeof callback === 'function')) {
             var res = '';
             if ((!obj.timeout) && (obj.exitCode < 8)) {
               // success
               res = destinationPath + "\\" + filename;
             }
             callback.call(null, res);
           }
         });
       }
     }
 
    /**
     * Deletes all files in a folder.
     * @method       deleteInFolder
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // deletes all files in folder
     *   ctx.fso.file.deleteInFolder( folder );</code>
     * @throws       {Error}
     * @param        {string} strFolderFullPath The folder name
     * @path         ctx.fso.file.deleteInFolder
     */
     _file.deleteInFolder = function(strFolderFullPath) {
       ctx.notifyAction('ctx.fso.file.deleteInFolder');
       try{
         var oTheFolder = null;
         var oFilesEnum = null;
         if (_oFSO === null)
           _fso.init();
         strFolderFullPath = ctx.wscript.shell.expandEnvString(strFolderFullPath);
         oTheFolder = _fso.folder.get(strFolderFullPath);
         if (oTheFolder === null) {
           throw new Error(e.error.KO, '[fso.file.deleteInFolder] NULL Folder Object for Folder Spec [" + strFolderFullPath + "]');
         }
         oFilesEnum = new Enumerator(oTheFolder.Files);
         if (oFilesEnum === null) {
           throw new Error(e.error.KO, '[fso.file.deleteInFolder] NULL Files Enumerator for Folder Spec [" + strFolderFullPath + "]');
         } // endif
         var strOneFileName;
         for (; !oFilesEnum.atEnd(); oFilesEnum.moveNext()) {
           strOneFileName = oFilesEnum.item().Name;
           _fso.file.remove(strFolderFullPath + "\\" + strOneFileName);
         } // end for
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.deleteInFolder] Failed to delete the files in folder. '+ ex.description);
       }
     }
 
    /**
     * Checks if the file exists.
     * @method      exist
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Checks if the file exists
     *   ctx.fso.file.exist( file );</code>
     * @throws      {Error}
     * @param       {string} filename File name
     * @return      {boolean} ''true'' if the file exists, otherwise ''false''
     * @path        ctx.fso.file.exist
     */
     _file.exist = function(filename) {
       ctx.notifyAction('ctx.fso.file.exist');
       var result = false;
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         if (_oFSO.FileExists(filename) == true){
           return true;
         } else {
           return false;
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.exist] filename='+filename+' Failed to test the file object exists. '+ ex.description);
       }
     }
 
    /**
     * Gets a pointer to a file.
     * @method      get
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Gets the pointer to a file
     *   ctx.fso.file.get( file );</code>
     * @throws      {Error}
     * @param       {string} filename The file name
     * @return      {Object} File object
     * @path        ctx.fso.file.get
     */
     _file.get = function(filename) {
       ctx.notifyAction('ctx.fso.file.get');
       try{
         _res = null;
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         var result  = _oFSO.GetFile(filename);
         return result;
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.get] Failed to get the file object. '+ ex.description);
       }
     }
 
    /**
     * Returns a complete and unambiguous path from a provided file name.
     * @method      getAbsolutePathName
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Get the basename of a file
     *   ctx.fso.file.getAbsolutePathName( 'c:\temp\file.txt' );</code>
     * @throws      {Error}
     * @param       {string} filename The file name
     * @return      {string} Absolute file name
     * @path        ctx.fso.file.getAbsolutePathName
     */
     _file.getAbsolutePathName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getAbsolutePathName');
       try{
         // Get the file basename
         if (_oFSO == null)
           _fso.init();
         return _oFSO.GetAbsolutePathName(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getAbsolutePathName] Failed to get the path name. '+ ex.description);
       }
     }
 
    /**
     * Gets the basename of a file.
     * @method      getBaseName
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Get the basename of a file
     *   ctx.fso.file.getBaseName( 'c:\temp\file.txt' ); // returns 'file'</code>
     * @throws      {Error}
     * @param       {string} filename File name
     * @return      {string} Basename of the file
     * @path        ctx.fso.file.getBaseName
     */
     _file.getBaseName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getBaseName');
       try{
         // Get the file basename
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         return _oFSO.GetBaseName(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getBaseName] Failed to get the file basename. '+ ex.description);
       }
     }
 
    /**
     * Gets the extention of the file.
     * @method      getExtensionName
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Get the file extension (extension only, after ".")
     *   ctx.fso.file.getExtensionName( 'c:\temp\file.txt' ); // returns 'txt'</code>
     * @throws      {Error}
     * @param       {string} filename File name
     * @return      {string} Extention name
     * @path        ctx.fso.file.getExtensionName
     */
     _file.getExtensionName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getExtensionName');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         return _oFSO.GetExtensionName(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getExtensionName] Failed to get the file extention name. '+ ex.description);
       }
     }
 
    /**
     * Gets the full name of the file.
     * @method      getFileName
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  // Gets the full file name ( basename + extension )
  ctx.fso.file.getFileName( 'c:\temp\file.txt' ); // returns 'file.txt'
 </code>
     * @throws      {Error}
     * @path        ctx.fso.file.getFileName
     * @param       {string} filename File name
     * @return      {string} The full name of the file
     */
     _file.getFileName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getFileName');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         return _oFSO.GetFileName(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getFileName] Failed to get the file name. '+ ex.description);
       }
     }
 
    /**
     * Gets the version of the file.
     * @method      getFileVersion
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  // Gets the full file name ( basename + extension)
  ctx.fso.file.getFileVersion( 'c:\temp\file.txt' ); // returns 'file.txt'
 </code>
     * @throws      {Error}
     * @path        ctx.fso.file.getFileVersion
     * @param       {string} filename File name
     * @return      {string} The full name of the file
     */
     _file.getFileVersion = function(filename) {
       ctx.notifyAction('ctx.fso.file.getFileVersion');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         return _oFSO.GetFileVersion(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getFileVersion] Failed to get the file name. '+ ex.description);
       }
     }
 
    /**
     * Gets the folder path of the file.
     * @method      getFolderName
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
 // Gets the full file name ( basename + extension )
 ctx.fso.file.getFolderName( 'c:\\temp\\file.txt' ); // returns 'c:\\temp\\'
 </code>
     * @path        ctx.fso.file.getFolderName
     * @param       {string} filename File name
     * @return      {string} The full name of the file
     */
     _file.getFolderName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getFolderName');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         var file = _oFSO.GetFileName(filename);
         if (file.indexOf('.') > 0) {
           filename = _oFSO.GetParentFolderName(filename); // remove filename
         }
       } catch (ex) { }
       return filename;
     }
 
    /**
     * Gets the path of the parent folder.
     * @method      getParentFolderName
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
 ctx.fso.file.getParentFolderName( 'c:\temp\file.txt' ); // returns 'c:\temp'
 </code>
     * @throws      {Error}
     * @path        ctx.fso.file.getParentFolderName
     * @param       {string} filename File name
     * @return      {string} The parent folder name
     */
     _file.getParentFolderName = function(filename) {
       ctx.notifyAction('ctx.fso.file.getParentFolderName');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         return _oFSO.GetParentFolderName(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.getFileName] Failed to get the file name. '+ ex.description);
       }
     }
 
    /**
     * Creates a file.
     * @method      create
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
 // Reads the file
 var file = '...';
 var txt = ctx.fso.file.create( file );
 </code>
     * @throws      {Error}
     * @path        ctx.fso.file.create
     * @param       {string} filename File name
     */
     _file.create = function(filename)
     {
       ctx.notifyAction('ctx.fso.file.create');
       try {
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
          _oFSO.CreateTextFile(filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.create] : '+ ex.description);
       }
     }
 
    /**
     * Reads XML file as a string.
     * @method      loadXml
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
 // Reads an xml file and transforms in a string
 ctx.fso.file.loadXml( xmlfile, 'XML' );
 </code>
     * @path        ctx.fso.file.loadXml
     * @param       {string} strFullFileName strFullFileName
     * @param       {string} strLineKey strLineKey
     * @return      {string} The content of the XML file
     */
     _file.loadXml = function(strFullFileName, strLineKey) {
       ctx.notifyAction('ctx.fso.file.loadXml');
       // strLineKey : root of the string. If empty, then no root node
       // content is return with root node strLineKey, if exists
       if (_oFSO === null)
         _fso.init();
       /** @type {TextStream} */
       var oTextStream = null;
       var strLine = null;
       try {
         strFullFileName = ctx.wscript.shell.expandEnvString(strFullFileName);
         oTextStream = _oFSO.OpenTextFile(strFullFileName, 1, false, 0); // only for write, do not create, ascii
         if (oTextStream === null)
           return "NULL Text Stream Object in LoadFile, opening file [" + strFullFileName + "]";
         var strFileContent = "";
         if (strLineKey != "")
           strFileContent += "<" + strLineKey + ">";
         while (oTextStream.AtEndOfStream != true) {
           strLine = oTextStream.ReadLine();
           if (strLine.substring(0, 2) != "<?") // skip <?xmlLink ... ?>
             strFileContent += strLine;
         } // end while
         if (strLineKey != "")
           strFileContent += "</" + strLineKey + ">";
         oTextStream.Close();
         oTextStream = null;
         return strFileContent;
       } catch (ex) {
         if (oTextStream) {
           oTextStream.Close();
         }
         throw new Error(e.error.KO, '[fso.file.LoadFileAsXml] Failed to load the text file. '+ ex.description);
       }
     }
 
    /**
     * Moves the file.
     * @method      move
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Moves the file
     *   ctx.fso.file.move( filenamesrc, filenamedst );</code>
     * @throws      {Error}
     * @param       {string} filenamesrc File name source
     * @param       {string} filenamedst File name destination
     * @path        ctx.fso.file.move
     */
     _file.move = function(filenamesrc,filenamedst) {
       ctx.notifyAction('ctx.fso.file.move');
       try{
         if (_oFSO == null)
           _fso.init();
         filenamesrc = ctx.wscript.shell.expandEnvString(filenamesrc);
         filenamedst = ctx.wscript.shell.expandEnvString(filenamedst);
          _oFSO.MoveFile(filenamesrc,filenamedst);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.move] Failed to move the file. '+ ex.message);
       }
     }
 
    /**
     * Opens an Explorer dialog to select a file or folder.
     * @method      openDialog
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript> ctx.fso.file.openDialog( title, options );</code>
     * @throws      {Error}
     * @param       {string} title Dialog title
     * @param       {number} [options] Options
     * @param       {string} [rootFolder] Root folder
     * @param       {number} [hwnd] Hwnd parent window handle
     * @return      {string} Selected path or filename
     * @path        ctx.fso.file.openDialog
     */
     _file.openDialog = function(title, options, rootFolder, hwnd) {
       var res = '';
       ctx.notifyAction('ctx.fso.file.openDialog');
       try{
         var shell = new ActiveXObject("shell.application");
         hwnd = hwnd || 0; 
				 if (!hwnd && ctx.currentEvent && ctx.currentEvent.page) {
					 // SAPMLIPA-6734 : if no hwnd provided, try to use parent hwnd (to ensure the browse dialog is on top level)
					 hwnd = ctx.currentEvent.page.hwnd || ctx.currentEvent.page.hwndMain || 0;
				 }
         options = options || 16384;
				 title = title || '';
         rootFolder = ctx.wscript.shell.expandEnvString(rootFolder || '') || '';
         var file = shell.BrowseForFolder(hwnd, title, options, rootFolder);
         res = (file && file.Self ? file.Self.Path : '');
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.openDialog] Failed. '+ (ex.description || ex.number));
       }
       return res;
     }
 
    /**
     * Opens an Explorer application, and selects the mentioned filename.
     * @method      openExplorer
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   var file = "c:\\...";
     *   ctx.fso.file.openExplorer( file );</code>
     * @throws      {Error}
     * @param       {string} filename File name to be selected
     * @return      {string} Selected path or filename
     * @path        ctx.fso.file.openExplorer
     */
     _file.openExplorer = function(filename) {
       var res = '';
       ctx.notifyAction('ctx.fso.file.openExplorer');
       try{
         filename = ctx.wscript.shell.expandEnvString(filename);
         filename = filename.replace(/\//g, "\\");
         ctx.shellexec('explorer.exe', "/select," + filename);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.openExplorer] Failed. '+ (ex.description || ex.number));
       }
       return res;
     }
 
    /**
     * Reads a file.
     * @method      read
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Reads the file
     *   var file = '...';
     *   var txt = ctx.fso.file.read( file, e.file.encoding.ASCII );</code>
     * @throws      {Error}
     * @param       {string} filename File name
     * @param       {e.file.encoding} [encoding] File encoding (by default, ''e.file.encoding.UTF8''). See [[:lib:common:ctx.enum#enumeration_efileencoding|e.file.encoding]]
     * @param       {Object} [properties] Object with file properties
     * @return      {*} Content of the file
     * @path        ctx.fso.file.read
     */
     _file.read = function(filename, encoding, properties)
     {
       ctx.notifyAction('ctx.fso.file.read');
       try {
         /** @type {ADODBStreamObject} */ var oStream = new ActiveXObject('ADODB.Stream');        
         if (encoding === e.file.encoding.Binary) {
           oStream.Type = 1; // 1 = binary
         } else if (encoding === e.file.encoding.UTF8withoutBOM) {
           oStream.Type = 2; // 2 = text
           oStream.Charset = e.file.encoding.UTF8;
         } else {
           oStream.Type = 2; // 2 = text
           oStream.Charset = encoding || e.file.encoding.UTF8;
         }
         //oStream.Mode = 1; // 1 = read
         oStream.Open();
         oStream.Position = 0;
         filename = ctx.wscript.shell.expandEnvString(filename);
         oStream.LoadFromFile(filename);
         if (properties && (typeof properties === 'object')) {
           properties.size = oStream.Size;
           properties.type = oStream.Type;
         }
         //var size = oStream.Size;
         var content;
         if (encoding === e.file.encoding.Binary) {
           content = oStream.Read();
         } else {
           content = oStream.ReadText();
         }
         oStream.Close();
         return content;
       } catch (ex) {
         if (oStream) {
           oStream.Close();
         }
         throw new Error(e.error.KO, '[fso.file.read] : '+ ex.description);
       }
     };
 
    /**
     * Removes the file.
     * @method      remove
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   // Removes the file
     *   ctx.fso.file.remove( file );</code>
     * @throws      {Error}
     * @param       {string} filename File name
     * @return      {boolean} success
     * @path        ctx.fso.file.remove
     */
     _file.remove = function(filename) {
       ctx.notifyAction('ctx.fso.file.remove');
       try{
         if (_oFSO == null)
           _fso.init();
         filename = ctx.wscript.shell.expandEnvString(filename);
         if (_oFSO.FileExists(filename) == true){
           _oFSO.deleteFile(filename, false);
         } else {
           throw new Error(e.error.KO, '[fso.file.remove] Failed to remove the file.');
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.remove] Failed to remove the file. '+ ex.description);
       }
       return true;
     }
 
    /**
     * Copies a set of files in asyncronous mode, using 'robocopy' tool.
     * @method      robocopy
     * @description
     *  The copy can be synchronous or asynchronous (recommended usage). The copy is a mirroring: only new and modified files are copied.
     *
     *  The function is based on Microsoft 'robocopy' utility tool, so requires Windows Vista minimum. For more details:
     *   * [[https://en.wikipedia.org/wiki/Robocopy]]
     *   * [[https://technet.microsoft.com/en-us/library/cc733145.aspx]]
     *
     *  The 'ctx.robocopyOptions' object is composed of the following parameters:
     *
     * ^Attribute  ^Description ^
     * |source | Source path |
     * |destination | Destination path  |
     * |filename | Filename pattern (optional, defualt is '*')  |
     * |options | Options (see robocopy documentation)  |
     * |timeout | Copy timeout in seconds (default is 60 s)  |
     * |useExecRun | If ''true'', uses 'ctx.execRun', otherwise 'ctx.exec' (default is ''false''),  |
     * |style | Appearance style when using 'ctx.execRun' function |
     * |waitEnd | Wait mode when using 'ctx.execRun' function |
     * |callback | Asynchronous callback |
     *
     *  <wrap help> //Example://</wrap>
 <code javascript>
  var sourceFolder = '\\server\...';
  var destFolder = 'c:\\...';
 
  // Copies the folder from shared network, in synchronous mode
  var obj = ctx.fso.file.robocopy( {
    source: sourceFolder,
    destination: destFolder
    // add your code here
  } );
 
  // Copies the folder from shared network, in asynchronous mode
  ctx.fso.file.robocopy( {
    source: sourceFolder,
    destination: destFolder,
    timeout: 30,
    callback: function( obj ) {
     // add your code here
    }
  } );
 </code>
     * @throws      {Error}
     * @param       {ctx.robocopyOptions} params
     * @path        ctx.fso.file.robocopy
     */
     _file.robocopy = function(params) {
       ctx.notifyAction('ctx.fso.folder.robocopy');
       params = params || {};
       params.options = params.options || '/R:1 /W:1'; // '/R:0 /W:5';
       if (!params.filename) {
         params.filename = '*';
         params.options = params.options + ' /MIR';
       }
       var obj = {};
       try{
         // options :
         //  - /MIR : mirroring
         //  - /R:0 : no reiteration
         //  - /W:5 : 5s iteration
         var command = 'robocopy "' + params.source + '" "' + params.destination + '" ' + params.filename + ' ' + params.options;
         if (params.useExecRun) {
           obj = ctx.execRun(command, params.style, params.waitEnd);
         } else {
           obj = ctx.exec(command, params.timeout, params.callback);
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.robocopy] failed : '+ ex.description);
       }
       return obj;
     }
 
    /**
     * Unzips a ZIP file in a given folder.
     * @method      unzip
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript> ctx.fso.file.unzip( "c:\\temp\\result.zip", "c:\\temp\\result" );</code>
     * @throws      {Error}
     * @param       {string} zipFile Zip file to be unzipped
     * @param       {string} unzipDir Destination folder
     * @path        ctx.fso.file.unzip
     */
     _file.unzip = function(zipFile, unzipDir) {
       ctx.notifyAction('ctx.fso.file.unzip');
       try{
         // inspired from http://stackoverflow.com/questions/27037647/unzip-a-file-using-batch-scripting
         _fso.init();
         var shellApp = new ActiveXObject('Shell.Application');
         var dst, zip;
         unzipDir = ctx.wscript.shell.expandEnvString(unzipDir);
         zipFile = ctx.wscript.shell.expandEnvString(zipFile);
         if (!unzipDir) unzipDir = '.';
         if (!_oFSO.FolderExists(unzipDir))
           _oFSO.CreateFolder(unzipDir);
         dst = shellApp.NameSpace(_oFSO.getFolder(unzipDir).Path);
         zip = shellApp.NameSpace(_oFSO.getFile(zipFile).Path);
         for (var i=0; i<zip.Items().Count; i++) {
           try {
             if (_oFSO.FileExists(zipFile)) {
               dst.CopyHere(zip.Items().Item(i), 4 + 16);
             }
           } catch(ex) {
             ctx.log('[fso.file.unzip] Failed: ' + zip.Items().Item(i).Path + ', error: ' + ex.description, e.logIconType.Warning);
           }
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.unzip] Failed to unzip file. '+ ex.description);
       }
     }
 
 //   /**
 //    * Opens a file.
 //    * @method      open
 //    * @summary     Opens a file.
 //    * @description
 //    *  <wrap help> //Example://</wrap>
 //<code javascript>
 //// open a file
 //var file = '...';
 //var stream = ctx.fso.file.open(file, e.file.encoding.UTF8);
 //var txt = '...';
 //ctx.fso.file.append(stream, txt);
 //ctx.fso.file.close(stream);
 //</code>
 //    * @throws      {Error}
 //    * @path        ctx.fso.file.open
 //    * @param       {string} filename File name
 //    * @param       {e.file.encoding} [encoding] File encoding (default is 'e.file.encoding.UTF8'). See [[:lib:common:ctx.enum#enumeration_efileencoding|e.file.encoding]]
 //    */
 //    _file.open = function(filename, encoding)
 //    {
 //      ctx.notifyAction('ctx.fso.file.write');
 //      try {
 //        /** @type {ADODBStreamObject} */ var oStream = new ActiveXObject('ADODB.Stream');
 //        //oStream.Mode = 2; // 2 = write
 //        oStream.Open();
 //        if (encoding === e.file.encoding.Binary) {
 //          oStream.Type = 1; // 1 = binary
 //        } else {
 //          oStream.Type = 2; // 2 = text
 //          oStream.Charset = encoding || e.file.encoding.UTF8;
 //          oStream.Position = 0;
 //        }
 //        if (encoding === e.file.encoding.Binary) {
 //          oStream.Write(content);
 //        } else {
 //          if ('string' === typeof content) {
 //            oStream.WriteText(content, 0);
 //          }
 //        }
 //        if ( _file.exist(filename)) {
 //          _file.remove(filename);
 //        }
 //        oStream.SaveToFile(filename, 2); // 2 = overwrite if exist
 //        oStream.Close();
 //      } catch (ex) {
 //        if (oStream) {
 //          oStream.Close();
 //        }
 //        throw new Error(e.error.KO, '[fso.file.write] : '+ ex.description);
 //      }
 //    };
 
    /**
     * Writes a file.
     * @method      write
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  // Writes a file
  var file = '...';
  var txt = '...';
  ctx.fso.file.write( file, txt, e.file.encoding.UTF8 );
 </code>
     * @throws      {Error}
     * @path        ctx.fso.file.write
     * @param       {string} filename File name
     * @param       {*} content Text buffer to be written
     * @param       {e.file.encoding} [encoding] File encoding (by default, ''e.file.encoding.UTF8''). See [[:lib:common:ctx.enum#enumeration_efileencoding|e.file.encoding]]
     * @param       {boolean} [overwrite] If ''true'', overwrite existing file (by default, ''true'')
     */
     _file.write = function(filename, content, encoding, overwrite)
     {
       ctx.notifyAction('ctx.fso.file.write');
       if (overwrite === undefined) overwrite = true;
       /** @type {ADODBStreamObject} */ var oStream = null;
       /** @type {ADODBStreamObject} */ var oStreamUtf8NoBOM = null;
       try {
         filename = ctx.wscript.shell.expandEnvString(filename);
         if (_file.exist(filename)) {
           if (overwrite) {
             _file.remove(filename);
           } else {
             throw new Error(e.error.KO, 'file \'' + filename + '\' already exists');
           }
         }
         oStream = new ActiveXObject('ADODB.Stream');
         //oStream.Mode = 2; // 2 = write
         oStream.Open();
         if (encoding === e.file.encoding.Binary) {
           oStream.Type = 1; // 1 = binary
         } else if (encoding === e.file.encoding.UTF8withoutBOM) {          
           oStreamUtf8NoBOM = new ActiveXObject('ADODB.Stream');
           oStreamUtf8NoBOM.Open();
           oStreamUtf8NoBOM.Type = 1;
           oStream.Type = 2; // 2 = text
           oStream.Charset = e.file.encoding.UTF8;
           oStream.Position = 0;
         } else {
           oStream.Type = 2; // 2 = text
           oStream.Charset = encoding || e.file.encoding.UTF8;
           oStream.Position = 0;
         }
         if (encoding === e.file.encoding.Binary) {
           oStream.Write(content);
         } else {
           if ('string' === typeof content) {
             oStream.WriteText(content, 0);
           }
         }
         if (encoding === e.file.encoding.UTF8withoutBOM) {
           oStream.Position = 3;//skip BOM
           oStream.CopyTo(oStreamUtf8NoBOM);
           oStreamUtf8NoBOM.SaveToFile(filename, 2); // 2 = overwrite if exist
           oStreamUtf8NoBOM.Close();
         } else {
           oStream.SaveToFile(filename, 2); // 2 = overwrite if exist
         }        
         oStream.Close();
       } catch (ex) {
         if (oStream) {
           oStream.Close();
         }
         if (oStreamUtf8NoBOM) {
           oStreamUtf8NoBOM.Close();
         }
         throw new Error(e.error.KO, '[fso.file.write] : '+ ex.description);
       }
     };
 
    /**
     * Copies a set of files in asyncronous mode, using 'xcopy' tool.
     * @method      xcopy
     * @description 
     *  The copy can be synchronous or asynchronous (recommended usage). The copy is a mirroring : only new and modified files are copied.\\
     *  The function is based on Microsoft 'robocopy' utility tool, so requires Windows Vista minimum.
     *
     *  <wrap help> //Example://</wrap>
 <code javascript>
  // Copies the folder from shared network, in asynchronous mode
  var sourceFolder = '\\server\...';
  var destFolder = 'c:\\...';
  ctx.fso.file.xcopy( sourceFolder, destFolder, '', 30, function( obj ) {
    ...
  } );
 </code>
     * @throws      {Error}
     * @param       {string} sourceFolder Source folder
     * @param       {string} destFolder Destination folder
     * @param       {string} [filename] File name or pattern (if omitted, '*' is used)
     * @param       {number} [timeout] Timeout delay in seconds (default is 60 s)
     * @param       {function(Object)} [callback] Callback called with result object. If omitted, the copy is synchronous
     * @path        ctx.fso.file.xcopy
     */
     _file.xcopy = function(sourceFolder, destFolder, filename, timeout, callback) {
       ctx.notifyAction('ctx.fso.folder.xcopy');
       var options =  '';
       sourceFolder = ctx.wscript.shell.expandEnvString(sourceFolder);
       destFolder = ctx.wscript.shell.expandEnvString(destFolder);
       destFolder = _file.getFolderName(destFolder);
       filename = ctx.wscript.shell.expandEnvString(filename);
       if (!filename) {
         filename = '*';
       }
       var obj = {};
       try{
         var command = 'xcopy "' + sourceFolder + '\\' + filename + '" "' + destFolder + '" /Y'; // + ' ' + options;
         obj = ctx.exec(command, timeout, callback);
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.folder.xcopy] failed : '+ ex.description);
       }
       return obj;
     }
 
    /**
     * Archives a set of files or folders.
     * @method      zip
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  var files = [ "c:\\temp\\file1.txt", "c:\\temp\\file2.txt", "c:\\temp\\file3.txt", "c:\\temp\\file4.txt" ];
  ctx.fso.file.zip( files, "c:\\temp\\result.zip" );
 </code>
     * @throws      {Error}
     * @param       {Array<string>} files Array of files or folders to be zipped
     * @param       {string} zipFile Generated zip file
     * @param       {e.file.operation} [fileOperation] File operation flags (see [[:lib:common:ctx.enum#enumeration_efileoperation|e.file.operation]])
     * @path        ctx.fso.file.zip
     */
     _file.zip = function(files, zipFile, fileOperation) {
       ctx.notifyAction('ctx.fso.file.zip');
       // Inspired from : http://stackoverflow.com/questions/27273334/batch-script-to-zip-a-folder-without-using-external-softwares
       try{
         var res = e.error.OK;
         if (_oFSO === null)
           _fso.init();
         var shellApp = new ActiveXObject("Shell.Application");
         var nb = files.length;
         if (nb > 0) {
           if (!zipFile) { zipFile = files[0] + '.zip'; }
           zipFile = ctx.wscript.shell.expandEnvString(zipFile);
           var zip = _oFSO.CreateTextFile(zipFile);
           zip.Write("PK" + _fso.file.chr(5) + _fso.file.chr(6));
           for (var i=18; i > 0; i--) zip.Write(_fso.file.chr(0));
           zip.Close()
           zip = shellApp.NameSpace(_oFSO.GetFile(zipFile).Path);
           var file;
           var filename;
           var zipThis;
           for (var i=0; i < files.length; i++) {
             try {
               filename = ctx.wscript.shell.expandEnvString(files[i]);
               if (_oFSO.FileExists(filename)) {
                 file = _oFSO.GetFile(filename);
               } else if (_oFSO.FolderExists(filename)) {
                 file = _oFSO.GetFolder(filename);
                 if (!shellApp.NameSpace(file.Path).Items().Count) {
                  ctx.log('Folder ' + filename + 'is empty. No zip created. Deleting' , e.logIconType.Warning);
                  return; //no zip generated
                 }
               } else {
                 throw new Error(e.error.InvalidArgument, "Unable to locate " + filename);
               }
               var folder = shellApp.NameSpace(file.ParentFolder + '\\');
               zipThis = folder.ParseName(_oFSO.GetFileName(filename));
             } catch(ex) {
               var output = 'Skipping ' + filename + ': ';
               output += ex.description ? ex.description : 'error ' + ex.number + ' (unspecified error)';
               ctx.log('ctx.fso.file.zip: ' + output, e.logIconType.Warning);
               files.splice(i--,1);
               continue;
             }
             //ctx.log('Compressing ' + _oFSO.GetFileName(file) + '... ');
             if(fileOperation !== undefined)
             {
                 zip.CopyHere(zipThis, fileOperation);
             }
             else
             {
                  zip.CopyHere(zipThis);
             }
             while (zip.Items().Count <= i) {
               ctx.sleep(100);
             }
             //ctx.log('Done.  (' + zip.Items().Count + ' of ' + files.length + ')');
           }
 
					 // additional sleep because the while above is suspected to be not enough : when last item is inserted, some additional time may be necessary to really close the archive
					 ctx.sleep(500);
					 
           if (!zip.Items().Count) {
               _oFSO.DeleteFile(_oFSO.GetFile(zipFile));
               ctx.log('Zip file is empty.  Deleting.', e.logIconType.Warning);
           }
         }
       } catch (ex) {
         throw new Error(e.error.KO, '[fso.file.zip] files.length='+files.length+',  zipFile='+zipFile+' Failed to zip files. '+ ex.description);
       }
     }
     return _file;
   })();
 
  /**
   * Class gathering a set of functions to access files through FTP sites
   * @class       ctx.fso.ftp
   * @path        ctx.fso.ftp
   */
   _fso.ftp = (function() {
     var _ftp = {};
     /** @type {string} */ 
     var _site = '';
     /** @type {boolean} */ 
     var _secure = false;
     /** @type {ctx.cryptography.credentialClass} */ 
     var _credential;
     /** @type {e.file.operation} */ 
     var _flags = e.file.operation.NoUI;
     /** @type {string} */ 
     var _url;
     var _root = ctx.registry.getRoot("FTP");
     //var _shell = null;
     //var _shellApp = null;
 
     /** @param       {function(e.error,string)} [callback] Callback function with result */
     var _initialize = function(callback) {
       if (_credential instanceof ctx.cryptography.credentialClass) {
         _credential.get(function(code, label, credential) {
           if (code == e.error.OK) {
             _url = '';
             if (_site)
               // should be like : 'ftp(s)://<login>:<password>@<url>';
               _url = (_secure ? 'ftps://' : 'ftp://') + (credential && credential.userName.get() ? (credential.userName.get() + (credential.password.get() ? ':' + credential.password.get() : '')) : '') + '@' + _site;
             else {
               code = e.error.Fail;
               label = "No FTP URL provided";
             }
           }
           if (callback && ('function' === typeof callback)) {
             callback(code, label);
           }
         });
       } else {
         // no credential : anonymous access
         if (callback && ('function' === typeof callback)) {
           callback(e.error.OK, "");
         }
       }
     }
 
    /**
     * Downloads files from a FTP site.
     * @method      download
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  ctx.fso.ftp.init( '192.168.9.100', 'jsmith', 'xxxxxx' );
  var fileList = [ 'file.zip' ];
  ctx.fso.ftp.download( 'c:\\temp', 'home/temp', fileList, e.file.operation.NoUI );
 </code>
     * @throws      {Error}
     * @param       {string} localFolder Local folder name
     * @param       {string} remoteFolder Remote folder name
     * @param       {Array<string>} fileList File list
     * @param       {function(e.error,string)} [callback] Callback function with result
     * @path        ctx.fso.ftp.download
     */
     _ftp.download = function(localFolder, remoteFolder, fileList, callback) {
       ctx.notifyAction('ctx.fso.ftp.download');
       _initialize(function(code, label) {
         if (code == e.error.OK) {
           localFolder = ctx.wscript.shell.expandEnvString(localFolder) || '.';
           remoteFolder = remoteFolder || '.';
           var shellApp = new ActiveXObject("Shell.Application");
           var remoteURL = _url + (remoteFolder.startsWith('/') ? '' :  '/') + remoteFolder;
           if (!_fso.folder.exist(localFolder))
             _fso.folder.create(localFolder);
           var filename;
           try {
             var local = shellApp.NameSpace(localFolder);
             //var remote = shellApp.NameSpace(remoteURL);
             for (var i = 0; i < fileList.length; i++) {
               filename = remoteURL + "/" + fileList[i];
               if (_flags)
                 local.CopyHere(filename, _flags);
               else
                 local.CopyHere(filename);
             }
             if (callback && ('function' === typeof callback)) {
               callback(e.error.OK, "");
             }
           } catch (ex) {
             if (callback && ('function' === typeof callback)) {
               callback(e.error.Fail, ex.description);
             }
           }
         } else {
           if (callback && ('function' === typeof callback)) {
             callback(code, label);
           }
         }
       });
     }
 
    /**
     * Initializes FTP connection.
     * @method      init
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript> ctx.fso.ftp.init( 'ftp.mySite.com', true, ctx.cryptography.credentials.FTPSite );</code>
     * @throws  {Error}
     * @param   {string} site FTP site URL
     * @param   {boolean} [secure] If ''true'', use FTPS protocol; if ''false'', use FTP protocol
     * @param   {ctx.cryptography.credentialClass} [credential] Credential for site access (if omitted, anomynous access)
     * @param   {e.file.operation} [flags] File operation flags (by default, ''e.file.operation.NoUI'') (see [[:lib:common:ctx.enum#enumeration_efileoperation|e.file.operation]])
     * @path    ctx.fso.ftp.init
     */
     _ftp.init = function(site, secure, credential, flags) {
       ctx.notifyAction('ctx.fso.ftp.init');
       var res = e.error.OK;
       if (site !== undefined)
         _site = site;
       if (flags !== undefined)
         _flags = flags;
       else
         _flags = e.file.operation.NoUI;
       if (secure !== undefined)
         _secure = secure;
       else
         _secure = false;
       _credential = credential || null;
     }
 
    /**
     * Lists remote files.
     * @method      list
     * @description
     *  <wrap help> //Example://</wrap>
 <code javascript>
  ctx.fso.ftp.init( '192.168.9.100', 'jsmith', 'xxxxxx' );
  var tab = [ ];
  ctx.fso.ftp.list( '/home/temp', tab );
 </code>
     * @throws      {Error}
     * @param       {string} remoteFolder Remote folder name
     * @param       {function(e.error,string,Array<Object>)} [callback] Callback function with result
     * @path        ctx.fso.ftp.list
     */
     _ftp.list = function(remoteFolder, callback) {
       ctx.notifyAction('ctx.fso.ftp.list');
       _initialize(function(code, label) {
         if (code == e.error.OK) {
           var tab = [];
           var shellApp = new ActiveXObject("Shell.Application");
           remoteFolder = remoteFolder || '.';
           var remoteURL = _url + (remoteFolder.startsWith('/') ? '' :  '/') + remoteFolder;
           try {
             var remote = shellApp.NameSpace(remoteURL);
             for (var i = 0; i < remote.Items().Count; i++) {
               var it = remote.Items().item(i);
               tab.push({
                 name: it.Name,
                 size: it.Size,
                 type: it.Type,
                 isBrowsable: it.IsBrowsable,
                 isFileSystem: it.IsFileSystem,
                 isFolder: it.IsFolder,
                 isLink: it.IsLink
               });
             }
             if (callback && ('function' === typeof callback)) {
               callback(e.error.OK, "", tab);
             }
           } catch (ex) {
             if (callback && ('function' === typeof callback)) {
               callback(e.error.Fail, ex.description, null);
             }
           }
         } else {
           if (callback && ('function' === typeof callback)) {
             callback(code, label, null);
           }
         }
       });
     }
 
 //   /**
 //    * Saves FTP user information (login, password) for a given site, in the HKCU (Current User) registry.
 //    * @method      save
 //    * @summary     Saves FTP user information (login, password) for a given site, in the HKCU (Current User) registry.
 //    * @description
 //    *  <wrap help> //Example://</wrap>
 //<code javascript>
 //ctx.fso.ftp.save('192.168.9.100', 'jsmith', 'xxxxxx');
 //</code>
 //    * @throws      {Error}
 //    * @path        ctx.fso.ftp.save
 //    * @param       {string} site FTP site URL
 //    * @param       {string} user User name
 //    * @param       {string} password Password
 //    */
 //    _ftp.save = function(site, user, password) {
 //      try{
 //        // no user defined, read login/password in registry
 //        _shell = _shell || new ActiveXObject("WScript.Shell");
 //        _shell.RegWrite(_root + "\\" + _site + "\\user", user, "REG_SZ");
 //        _shell.RegWrite(_root + "\\" + _site + "\\password", password, "REG_SZ");
 //      } catch (ex) {
 //        throw new Error(e.error.KO, '[fso.ftp.save] Failed to save the connection. '+ ex.description);
 //      }
 //    }
 
    /**
     * Uploads files from a FTP site.
     * @method      upload
     * @description
     *  <wrap help> //Example://</wrap>
     *  <code javascript>
     *   ctx.fso.ftp.init( '192.168.9.100', 'jsmith', 'xxxxxx' );
     *   var fileList = [ 'file.zip' ];
     *   ctx.fso.ftp.upload( 'c:\\temp', 'home/temp', fileList, e.file.operation.NoUI );</code>
     * @throws      {Error}
     * @param       {string} localFolder Local folder name
     * @param       {string} remoteFolder Remote folder name
     * @param       {Array<string>} fileList File list
     * @param       {function(e.error,string)} [callback] Callback function with result
     * @path        ctx.fso.ftp.upload
     */
     _ftp.upload = function(localFolder, remoteFolder, fileList, callback) {
       ctx.notifyAction('ctx.fso.ftp.upload');
       _initialize(function(code, label) {
         if (code == e.error.OK) {
           localFolder = ctx.wscript.shell.expandEnvString(localFolder);
           remoteFolder = remoteFolder || '.';
           var shellApp = new ActiveXObject("Shell.Application");
           var remoteURL = _url + (remoteFolder.startsWith('/') ? '' :  '/') + remoteFolder;
           try {
             var remote = shellApp.NameSpace(remoteURL);
             for (var i = 0; i < fileList.length; i++) {
               var file = (localFolder ? localFolder + "\\" : '') + fileList[i];
               file = file.replace(/\//g, "\\");
               if (_flags)
                 remote.CopyHere(file, _flags);
               else
                 remote.CopyHere(file, _flags);
             }
             if (callback && ('function' === typeof callback)) {
               callback(e.error.OK, "");
             }
           } catch (ex) {
             if (callback && ('function' === typeof callback)) {
               callback(e.error.Fail, ex.description);
             }
           }
         } else {
           if (callback && ('function' === typeof callback)) {
             callback(code, label);
           }
         }
       });
     }
     return _ftp;
   })();
 
   return _fso;
 })();
 