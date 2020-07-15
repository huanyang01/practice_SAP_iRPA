/**
 * @module       Microsoft Outlook extension
 * @file         office/outlook.js
 * @description
 *  This library is a collection of functions for accessing and manipulating Microsoft Outlook files.
 *
 *  === Usage ===
 *   - Global variables and functions are used to handle the Outlook instance: start, maintain and stop the Excel engine.
 *   - Mail functions are used to manipulate mails in outlook application.
 *
 *  A mail collection contains mails that have been created and/or created.\\
 *  Accessors are allowing user to set or get mail properties.\\
 *  Search in outlook folder uses an intermediate filter table allowing faster filtering.\\
 *  Retrieving a mail is based on EntryID and optionally storeID.
 *
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'ctx.outlook.Application'
 * @fileoverview
 * @suppress {missingProperties}
 */


/**
 * Options for the 'ctx.outlook' library
 * @namespace ctx.options.outlook
 * @path      ctx.options.outlook
 */
ctx.options.outlook = {
 /**
  * Trace level
  * @property {e.trace.level} traceLevel
  * @default  e.trace.level.None
  * @path     ctx.options.outlook.traceLevel
  */
  traceLevel: e.trace.level.None
};

/**
 * Outlook Library
 * @class       ctx.outlook
 * @constructor
 * @path        ctx.outlook
 */
ctx.outlook = (function() {
  // private variables
  /** @type {Object} */ var _options = ctx.options.outlook;
  var _outlookApp = null; // Outlook application

  var _oSelectedItems = []; // Selected Items list (mails, contacts, tasks, ...)
  var _oMails = []; // Working mail list
  var _oFilteredTable = []; // Search Table containing infos about mail to retrieve
  var _oNotes = []; // Working mail list
  var _oTasks = []; // Working task list
  var _oContacts = []; // Working contact list
  var _oResults = []; // Working list


  // mapping between item type and class
  var _itemClasses = {};
  _itemClasses[e.outlook.itemType.Calendar] = 'IPM.Appointment';
  _itemClasses[e.outlook.itemType.Contact] = 'IPM.Contact';
  _itemClasses[e.outlook.itemType.Journal] = 'IPM.Activity';
  _itemClasses[e.outlook.itemType.Mail] = 'IPM.Note';
  _itemClasses[e.outlook.itemType.Note] = 'IPM.StickyNote';
  _itemClasses[e.outlook.itemType.Task] = 'IPM.Task';

  var _outlook =
  /** @lends ctx.outlook*/
  {

      // *** Constants ***
  /**
  * Outlook constants declaration
  //* @enum {number}
  * @path ctx.outlook.constants
  */
   constants : {
    inbox: 6,
    outBox:4,
    sentMail:5,
    deletedMail :3,
    drafts:16 ,
    color : {
      blue: 5,
      red: 6,
      green: 3,
      purple : 1,
      yellow : 4,
      orange : 2

    }

    },

   /**
    * ctx.outlook.getSelectedItems
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.getSelectedItems( );</code>
    * @method  getSelectedItems
    * @throws  {Error}
    * @param   {e.outlook.itemType} type
    * @path    ctx.outlook.getSelectedItems
    */
    getSelectedItems: function(type) {
      try{
        ctx.outlook.init();
        // inspired from https://support.microsoft.com/en-us/kb/240935
        _oSelectedItems = [];
        var oExp = _outlookApp.ActiveExplorer;  // Get the ActiveExplorer.
        if (oExp) {
          var oSel = oExp.Selection;       // Get the selection.
          if (oSel && oSel.Count) {
            for (var i = 1; i <= oSel.Count; i++) {
              var oItem = oSel.Item(i);
              if (oItem.MessageClass == _itemClasses[type])
                _oSelectedItems.push(oItem);
            }
          }
        }
        return _oSelectedItems;
      } catch(err) {
        //ctx.log("*** ctx.outlook.init(): KO *** Error " + err.description);
        throw new Error(e.error.KO, '[ctx.outlook.getSelectedItems] Failed . '+ err.description);
      }
    },

   /**
    * Initializes Outlook application.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.init( );</code>
    * @method  init
    * @throws  {Error}
    * @path    ctx.outlook.init
    */
    init: function() {
      try{
        if (_outlookApp == null){
            _outlookApp = new ActiveXObject("outlook.Application");
            //ctx.log(" *** ctx.outlook.init(): OK ***");
        }
        if (_outlookApp == null){
          throw new Error(e.error.KO, '[ctx.outlook.init] Failed to start Outlook.');
        } else {
          //ctx.log(' *** ctx.outlook.init(): OK *** ');
        }
      } catch(err) {
        //ctx.log("*** ctx.outlook.init(): KO *** Error " + err.description);
        throw new Error(e.error.KO, '[ctx.outlook.init] Failed to start Outlook: '+ err.description);
      }
    },

   /**
    * Ends Outlook Application
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.end( );</code>
    * @path    ctx.outlook.end
    * @throws  {Error}
    * @method  end
    */
    end: function() {
      ctx.log(" *** ctx.outlook.end() ***");
      try {
        this.reset();

        if (_outlookApp != null) {
          _outlookApp = null;
          CollectGarbage();
        }
        if (_outlookApp != null) {
          throw 'application variable still full';
        } else {
          //ctx.log(' *** ctx.outlook.end(): OK ***');
        }
      } catch(err) {
        //ctx.log("*** ctx.outlook.end(): KO *** Error " + err.description);
        _outlookApp = null;
        throw new Error(e.error.KO, "[ctx.outlook.end] Failed to end ctx.outlook. "+ err.description);
      }
    },

   /**
    * Resets every working list.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.reset( );</code>
    * @method  reset
    * @throws  {Error}
    * @path    ctx.outlook.reset
    */
    reset : function(){
      try {
        _oMails = [];
        _oFilteredTable = [];
        _oNotes = [];
        _oTasks = [];
        //return e.error.OK;
      } catch(err){
        //ctx.log(" *** ctx.outlook.reset(): KO *** Error " + err.description);
        throw new Error(e.error.KO, "[ctx.outlook.reset] Failed to reset temporary tables. "+ err.description);
      }
    },

   /**
    * Recovers the current user address.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var emailAddress = ctx.outlook.getCurrentUserAddress( );</code>
    * @method  getCurrentUserAddress
    * @return  {string|null} The current user email address
    * @throws  {Error}
    * @path    ctx.outlook.getCurrentUserAddress
    */
    getCurrentUserAddress : function(){
      ctx.notifyAction('ctx.outlook.getCurrentUserAddress');
      try {
        // Application.ActiveExplorer().Session.CurrentUser.AddressEntry.GetExchangeUser().PrimarySmtpAddress;

        var emailCurrent =  _outlookApp.Session.CurrentUser.Address;
        var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
        var res = regEmail.test(emailCurrent);
        if (!res) {
          emailCurrent = _outlookApp.Session.CurrentUser.AddressEntry.GetExchangeUser().PrimarySmtpAddress;
          res = regEmail.test(emailCurrent);
        }
        if (res) {
          return emailCurrent;
        } else {
          throw new Error(e.error.KO, "[ctx.outlook.getCurrentUserAddress] Failed to get current user address (Email address Invalid). ");
        }

      } catch(err) {
        //ctx.log("*** ctx.outlook.getCurrentUserAddress(): KO *** Error " + err.description);
        _outlookApp = null;
        throw new Error(e.error.KO, "[ctx.outlook.getCurrentUserAddress] Failed to get current user address. "+ err.description);
      }
    },

   /**
    * getAdvancedSearch
    * @method  getAdvancedSearch
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.getAdvancedSearch( "Contacts", "\"urn:schemas:contacts:sn\" = 'test'" )</code>
    *  Scope mandatory ("Contacts""Inbox" etc ...) ,Filter SearchSubFoders Tag optional
    *  Now SearchSubFolders and Tag not used
    * @throws  {Error}
    * @path    ctx.outlook.getAdvancedSearch
    */

    //    Example filters
    //    filter = "(urn:schemas:mailheader:subject like '%project%' or " _
    //& "urn:schemas:httpmail:textdescription like '%project%') and " _
    //& "urn:schemas:mailheader:date > 'now - 1:00:00' and " _
    //& "urn:schemas:httpmail:hasattachment > 0 and " _
    //**& "urn:schemas:httpmail:attachmentfilename like '%tonnage%'"**

    // filter = "\"urn:schemas:contacts:sn\"  = 'test'"  // LastName

    getAdvancedSearch : function ( Scope, oFilter) {
      try {
        ctx.outlook.init();
        // Filter inspired from  http://www.gregthatcher.com/Scripts/VBA/Outlook/GetListOfContactsUsingPropertyAccessor.aspx
        _oResults = [];
        var readItem;
        if (Scope != 'undefined' ) {
          if (oFilter == undefined ) {
            var obj =   _outlookApp.AdvancedSearch(Scope);
          } else {
            var obj =   _outlookApp.AdvancedSearch(Scope,oFilter);
          }

          var rsts = obj.Results;
          //ctx.log ("getAdvancedSearch before " + rsts.Count + " " + rsts.Class);
          var nbBoucles = 0;
          while (rsts.Count == 0 ) {
            ctx.sleep(200);
            //ctx.log ("getAdvancedSearch after " + rsts.Count + " " + rsts.Class);
            nbBoucles ++;
            if (nbBoucles > 10 ) {
              break;
            }
          }

          for (var index = 1; index <= rsts.Count; index++) {
            readItem = rsts.Item(index);
            _oResults.push(readItem);
          }
        }
        return _oResults;
      } catch (ex) {
        throw new Error(e.error.KO, "[ctx.outlook.getAdvancedSearch] Failed. "+ ex.description);
      }
    },

   /**
    * getAdvancedSearchCond
    * @method  getAdvancedSearchCond
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.outlook.getAdvancedSearchCond( "Contacts", {LastName : "test",FirstName : "Test"} )</code>
    *  Scope mandatory,Filter SearchSubFoders Tag optional
    *  Now SearchSubFolders and Tag not used
    * @throws  {Error}
    * @path    ctx.outlook.getAdvancedSearchCond
    */
    getAdvancedSearchCond : function ( Scope, conditions) {
      // var liste = new Array();
      try {
        ctx.outlook.init();
        // inspired from https://support.microsoft.com/en-us/kb/240935
        _oResults = [];
        var readItem;
        var cptSelect;
        var cptBoucles;
        if (Scope != 'undefined' ) {
          var obj =   _outlookApp.AdvancedSearch(Scope);
          var rsts = obj.Results;
          //ctx.log ("getAdvancedSearchCond before " + rsts.Count + " " + rsts.Class);
          var nbBoucles = 0;
          while (rsts.Count == 0 ) {
            ctx.sleep(200);
            //ctx.log ("getAdvancedSearchCond after " + rsts.Count + " " + rsts.Class);
            nbBoucles ++;
            if (nbBoucles > 10 ) {
              break;
            }
          }

          for (var index = 1; index <= rsts.Count; index++) {
            readItem = rsts.Item(index);
            cptSelect = 0;
            cptBoucles = 0;
            for(var ind in conditions){
                cptBoucles++;
                if ( conditions[ind] == readItem[ind] ) {
                  cptSelect++;
                }
            }
            if (cptSelect > 0 && cptSelect == cptBoucles) {
                _oResults.push(readItem);
            }
            if ( cptBoucles == 0 ) {
              _oResults.push(readItem);
            }
          }
        }
        return _oResults;
      } catch (ex) {
        throw new Error(e.error.KO, "[ctx.outlook.getAdvancedSearchCond] Failed. "+ ex.description);
      }
    },

   /**
    * @ignore
    * Recovers the first encountered outlook folder named foldername - recursively look for it, starting by the given folder in parameter.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var folder = ctx.outlook.getFolderByName( 'folder name', baseFolder );</code>
    * @method  getFolderByName
    * @param   {string} folderName Name of the folder
    * @param   {Object} folder Searching root folder
    * @return  {Object|null} Outlook folder object
    * @throws  {Error}
    * @private
    * @path    ctx.outlook.getFolderByName
    */
    getFolderByName : function(folderName,folder){
      ctx.notifyAction('ctx.outlook.getFolderByName');
      try {
        var oFolder,oFolders, oCount, found;

        oFolder=folder;

        found=(oFolder.Name==folderName);
        if(found){
          return oFolder;
        }

        oFolders=oFolder.Folders;
        oCount=oFolders.Count;

        var i=1;
        while(i<=(oCount)&&(oCount>0) &&(!found)){
          oFolder=oFolders.Item(i);
          oFolder = ctx.outlook.getFolderByName(folderName,oFolder);
          found=(oFolder != null);
          i++;
        }
        if(found){
          return oFolder;
        }
        return null;
      } catch(err) {
        //ctx.log("*** ctx.outlook.getFolderByName(): KO *** Error " + err.description);
        _outlookApp = null;
        throw new Error(e.error.KO, "[ctx.outlook.getFolderByName] Failed to get folder. "+ err.description);
      }
    },


   /**
    * @ignore
    * Gets an Outlook store.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript>
    *   var folder = ctx.outlook.getStore( {storeName : 'storeName@storeName.eu'} );
    *   var folder = ctx.outlook.getStore( {storeID : '1111111111111111ABABAABABAABABABAABB2222222222222'} );</code>
    * @method   getStore
    * @param    {Object} [object]\\   * (optional) storeID {string} Entry ID of store\   * (optional) storeName {string} Store name
    * @return   {Object|null} Outlook folder object
    * @throws   {Error}
    * @private
    * @path     ctx.outlook.getStore
    */
    getStore : function(object){
      ctx.notifyAction('ctx.outlook.getStore');
      try{
        var oNamespace, oStores, oStore, oFolder, oCount, oStoreID;
        var found, index;

        //Initialization
        found = false;
        index = 1;

        oNamespace = _outlookApp.GetNameSpace("MAPI");
        oStores = oNamespace.Stores;
        oCount = oStores.count;
        oStore = null;

        //Looking for Store
        if(oCount >= 1){
          if(object['storeName'] == undefined && object['storeID'] == undefined){
            oStore = oNamespace.DefaultStore;
          } else {
            if(object['storeID']!=undefined){
              oStore = oNamespace.GetStoreFromID(object['storeID']);
            }
            if(object['storeName']!=undefined && (oStore == null )){
              oStore = oStores(index);
              found=(oStore.DisplayName==object['storeName']);
              while(!(index>oCount)&&(!found)){
                oStore=oStores(index);
                found=(oStore.DisplayName==object['storeName']);
                index++;
              }
              if(!found){
                throw 'Store not found in outlook session.';
              }
            }
          }
        } else {
          throw 'No store in outlook session.';
        }

        return oStore;

      } catch(err) {
        //ctx.log("*** ctx.outlook.getStore(): KO *** Error " + err.description);
        throw new Error(e.error.KO, "[ctx.outlook.getStore] Failed to get store. "+ err.description);
      }
    },

   /**
    * Gets the ID of the store with given name in parameter.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var folder = ctx.outlook.getStoreID( { storeName : 'storeName@storeName.eu' } );</code>
    * @method  getStoreID
    * @param   {string} storeName Name of the store
    * @return  {string|null} ID of the store
    * @throws  {Error}
    * @path    ctx.outlook.getStoreID
    */
    getStoreID : function(storeName){
      ctx.notifyAction('ctx.outlook.getStoreID');
      try{
        //Definition
        var oNamespace, oStores, oStore, oFolder, oTable, oRow, oCount, oStoreID;
        var found, index;

        //Initialization
        found = false;
        index = 1;
        oNamespace = _outlookApp.GetNameSpace("MAPI");
        oStores = oNamespace.Stores;
        oCount = oStores.count;

        //Looking for Store
        if(oCount >= 1){
          oStore = oStores(index);
          found=(oStore.DisplayName==storeName);
          while(!(index>oCount)&&(!found)){
            oStore=oStores(index);
            found=(oStore.DisplayName==storeName);
            index++;
          }
          if(!found){
            throw 'store not found in outlook session.';
          }
        } else {
          throw 'No store in outlook session.';
        }

        return oStore.StoreID;

      } catch(err){
        //ctx.log(" *** ctx.outlook.getStoreID(): KO *** Error " + err.description);
        throw new Error(e.error.KO, "[ctx.outlook.getStoreID] Failed to get store ID. "+ err.description);
      }
    },

    /**
    * Gets statistics about the current Outlook instance counts
    * @description Get statistics about the current Outlook instance counts
    *  <wrap help> //Example://</wrap>
    *  <code javascript> var folder = ctx.outlook.getStatisticsItemsCount();</code>
    * @method  getStatisticsItemsCount
    * @return  {Object} Object which contains the count of different item types. Returned properties: 'inbox', 'outBox', 'deleted', 'junk', 'drafts', 'calendar', 'tasks', 'doDos', 'contacts', 'notes'
    * @throws  {Error}
    * @path    ctx.outlook.getStatisticsItemsCount
    */
    getStatisticsItemsCount : function(){
      var result = {};

      var inboxFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderInbox);
      result.inbox = inboxFolder.Items.Count; 
      
      var sentFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderSentMail);
      result.sent = sentFolder.Items.Count; 

      var outBoxFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderOutbox);
      result.outBox = outBoxFolder.Items.Count;

      var deletedFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderDeletedItems);
      result.deleted = deletedFolder.Items.Count;

      var junkFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderJunk);
      result.junk = junkFolder.Items.Count;

      var draftsFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderDrafts);
      result.drafts = draftsFolder.Items.Count;

      var calendarFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderCalendar);
      result.calendar = calendarFolder.Items.Count;

      var taskFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderTasks);
      result.tasks = taskFolder.Items.Count;

      var todoFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderToDo);
      result.toDos = todoFolder.Items.Count;

      var contactFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderContacts);
      result.contacts = contactFolder.Items.Count;

      var notesFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderNotes);
      result.notes = notesFolder.Items.Count;

      return result;
    },

   /**
    * Class gathering a set of functions to manipulate mail items of Outlook application
    * @class  ctx.outlook.application
    * @path   ctx.outlook.application
    */
    mail : (function() {
      // private variables

//      var _oMails = []; //Working mail list
//      var _oFilteredTable = []; //Search Table containing infos about mail to retrieve
      var _oFilteredTableRowCount = null;

      var _mail = {

       /**
        * Get the email address of the sender.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.getSenderAddress( 0 );</code>
        * @method  getSenderAddress
        * @param   {number} oIndex Mail index of working mail collection
        * @throws  {Error}
        * @path    ctx.outlook.mail.getSenderAddress
        */
        getSenderAddress:function(oIndex){
          ctx.notifyAction('ctx.outlook.getSenderAddress');
          try {

            var oNamespace = _outlookApp.GetNameSpace("MAPI");
            if (_oMails[oIndex].SenderEmailType == "EX"){
              try{
                var recip = oNamespace.CreateRecipient(_oMails[oIndex].SenderEmailAddress);//SenderEmailAddress
                var exUser = recip.AddressEntry.GetExchangeUser();
                return exUser.PrimarySmtpAddress;
                //ctx.log("oNS.sAddress :"+oNS.sAddress );
              } catch (ex){
                //throw ex.description;
                return "";
              }
            } else {
              return _oMails[oIndex].SenderEmailAddress;
            }
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.inspector.getSenderAddress] Failed to get sender Mail. "+ err.description);
          }
        },


       /**
        * Sets mail main recipients.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setTo( 0 );</code>
        * @method  setTo
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} to Recipients list of the mail separated by ";"
        * @throws  {Error}
        * @path    ctx.outlook.mail.setTo
        */
        setTo : function(oIndex, to) {
          ctx.notifyAction('ctx.outlook.mail.setTo');
          try{
            _oMails[oIndex].To = to;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setTo(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setTo] Failed to set main recipient. "+ err.description);
          }
        },

       /**
        * Gets mail main recipients.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript>res = ctx.outlook.mail.getTo( 0 );</code>
        * @method  getTo
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null}
        * @path    ctx.outlook.mail.getTo
        */
        getTo : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getTo');
          try{
            return _oMails[oIndex].To;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getTo(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.getTo] Failed to get main recipient. "+ err.description);
          }
        },

       /**
        * Sets mail Carbon Copy.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setCc( 0 );</code>
        * @method  setCc
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} cc Carbon copy recipients of the mail separated by ';'
        * @throws  {Error}
        * @path    ctx.outlook.mail.setCc
        */
        setCc : function(oIndex, cc) {
          ctx.notifyAction('ctx.outlook.mail.setCc');
          try{
            _oMails[oIndex].Cc = cc;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setCc(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setCc] Failed to set Carbon Copy. "+ err.description);
          }
        },

       /**
        * Gets mail Carbon Copy.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getCc( 0 );</code>
        * @method  getCc
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null} Carbon copy recipients list of the mail or null
        * @path    ctx.outlook.mail.getCc
        */
        getCc : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getCc');
          try{
            return _oMails[oIndex].Cc;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getCc(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getCc] Failed to get Carbon Copy. "+ err.description);
          }
        },

       /**
        * Sets mail Blind Carbon Copy.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setBcc( 0 );</code>
        * @method  setBcc
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} bcc blind carbon copy recipients of the mail separated by ";"
        * @throws  {Error}
        * @path    ctx.outlook.mail.setBcc
        */
        setBcc : function(oIndex, bcc) {
          ctx.notifyAction('ctx.outlook.mail.setBcc');
          try{
            _oMails[oIndex].Bcc = bcc;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setBcc(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setBcc] Failed to set Blind Carbon Copy. "+ err.description);
          }
        },

       /**
        * Gets mail Blind Carbon Copy.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getBcc( 0 );</code>
        * @method  getBcc
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null}
        * @path    ctx.outlook.mail.getBcc
        */
        getBcc : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getBcc');
          try{
            return _oMails[oIndex].Bcc;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getBcc(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getBcc] Failed to get Blind Carbon Copy. "+ err.description);
          }
        },

       /**
        * Sets mail subject.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setSubject( 0 );</code>
        * @method  setSubject
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} subject Subject of the mail
        * @throws  {Error}
        * @path    ctx.outlook.mail.setSubject
        */
        setSubject : function(oIndex, subject) {
          ctx.notifyAction('ctx.outlook.mail.setSubject');
          try{
            _oMails[oIndex].Subject = subject;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.Setubject(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setSubject] Failed to set subject. "+ err.description);
          }
        },

       /**
        * Gets mail subject.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getSubject( 0 );</code>
        * @method  getSubject
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null}
        * @path    ctx.outlook.mail.getSubject
        */
        getSubject : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getSubject');
          try{
            return _oMails[oIndex].Subject;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getSubject(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getSubject] Failed to get subject. "+ err.description);
          }
        },

       /**
        * Sets email body.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setBody(0, "Here is the new body");</code>
        * @method  setBody
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} body body of the mail
        * @throws  {Error}
        * @path    ctx.outlook.mail.setBody
        */
        setBody : function(oIndex, body) {
          ctx.notifyAction('ctx.outlook.mail.setBody');
          try{
            _oMails[oIndex].Body = body;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setBody(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setBody] Failed to set body. The error is: "+ err.description);
          }
        },

        /**
        * Update email body.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.appendBody(0, "Here is the body to add to the existing body. \r\n Additional line." );</code>
        * * Important: Note that the body of the email will switch to Text format if you use this method.
        * @method  appendBody
        * @param   {number} oIndex eMail index of working email collection
        * @param   {string} textToAppend body to add in the email
        * Important: Note that the body of the email will switch to Text format if you use this method.
        * @throws  {Error}
        * @path    ctx.outlook.mail.appendBody
        */
       appendBody : function(oIndex, textToAppend) {
        ctx.notifyAction('ctx.outlook.mail.appendBody');
        try{
          _oMails[oIndex].Body = textToAppend + "\r\n" + _oMails[oIndex].Body;
        } catch(err){
          throw new Error(e.error.KO, "[ctx.outlook.mail.appendBody] Failed to append body. The error is: "+ err.description);
        }
      },

       /**
        * Sets mail HTML body.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setBodyHtml( 0 );</code>
        * @method  setBodyHtml
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string} body body of the mail
        * @throws  {Error}
        * @path    ctx.outlook.mail.setBodyHtml
        */
        setBodyHtml : function (oIndex, body) {
          ctx.notifyAction('ctx.outlook.mail.setBodyHtml');
          try {
            _oMails[oIndex].HTMLBody = body;
          }catch(err) {
            throw new Error(e.error.KO, "[ctx.outlook.mail.setBodyHtml] Failed to set html body; "+err.description);
          }
        },

       /**
        * Gets mail body.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getBody( 0 );</code>
        * @method  getBody
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null}
        * @path    ctx.outlook.mail.getBody
        */
        getBody : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getBody');
          try{
            return _oMails[oIndex].Body;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getBody(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getBody] Failed to get body. "+ err.description);
          }
        },

      //   /**
      //   * Gets html mail body.
      //   * @description
      //   *  <wrap help> //Example://</wrap>
      //   *  <code javascript> res = ctx.outlook.mail.getHtmlBody( 0 );</code>
      //   * @method  getHtmlBody
      //   * @param   {number} oIndex Mail index of working mail collection
      //   * @return  {string|null}
      //   * @path    ctx.outlook.mail.getHtmlBody
      //   */
      //  getHTMLBody : function(oIndex) {
      //   ctx.notifyAction('ctx.outlook.mail.getHTMLBody');
      //   try{
      //     return _oMails[oIndex].HTMLBody;
      //   } catch(err){
      //     throw new Error(e.error.KO, "[ctx.outlook.mail.getHTMLBody] Failed to get html body. "+ err.description);
      //   }
      // },

       /**
        * Gets attachments name.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getAttachmentsName( 0 );</code>
        * @method  getAttachmentsName
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {Array<string>}
        * @path    ctx.outlook.mail.getAttachmentsName
        */
        getAttachmentsName : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getAttachmentsName');
          var attIndex = 1;
          var attName = [];
          try{
            while (attIndex <= _oMails[oIndex].Attachments.Count) {
              attName[attIndex -1] = _oMails[oIndex].Attachments.Item(attIndex).Filename;
              attIndex++;
            }
            return attName;
            //return _oMails[oIndex].Attachments.Item(oIndex+1).DisplayName;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.getAttachmentsName] Failed to get attachments name. "+ err.description);
          }
        },

       /**
        * Adds attachment(s) to the mail.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript>
        *   ctx.outlook.mail.attach( 0, ctx.options.path.bin+"\\resources\\TextAttachment.txt" );
        *   ctx.outlook.mail.attach( 0, [ ctx.options.path.bin+"\\resources\\chargement.gif", ctx.options.path.bin+"\\resources\\TextAttachment Array.txt" ] );</code>
        * @method  attach
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {string|Array} attachments attachment URLs - an unique URL may be given as a String.
        * @throws  {Error}
        * @path    ctx.outlook.mail.attach
        */
        attach : function(oIndex,attachments) {
          ctx.notifyAction('ctx.outlook.mail.attach');
          try{
            if(typeof(attachments) == "string"){
              _oMails[oIndex].Attachments.Add(attachments);
            } else {
              ctx.each(attachments, function(id, attachment) {
                _oMails[oIndex].Attachments.Add(attachment);
              });
            }
            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.attach(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.attach] Failed to add attachment. "+ err.description);
          }
        },

       /**
        * Saves attachment(s) of the indexed mail to specified path.
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * //To save the attachement named "filename1.txt"
        * ctx.outlook.mail.attachmentSave(0,ctx.options.path.bin+"\\resources\\TextAttachment.txt", {AttachmentName : "filename1.txt"});
        * 
        * //To Save all attachment without filtering
        * ctx.outlook.mail.attachmentSave(0, "C:\\MyFolder\\resources\\", {SaveAllAttachments : true}]);
        * 
        * //To Save all attachment with filtering on extensions to keep
        * ctx.outlook.mail.attachmentSave(0, "C:\\MyFolder\\resources\\", {SaveAllAttachments : true, ExtensionsToKeep : "xslx; txt"}]);
        *         
        * //To Save all attachment with filtering on extensions to skip
        * ctx.outlook.mail.attachmentSave(0, "C:\\MyFolder\\resources\\", {SaveAllAttachments : true, ExtensionsToSkip : "xslx; txt; docx"}]);
        * 
        * </code>
        * @path ctx.outlook.mail.attachmentSave
        * @method attachmentSave
        * @param {number} oIndex Mail index of working mail collection
        * @param {string} path File path of a single attachment. To save all Attachements, the path is not a file path but a folder path.
        * @param {Object} attachmentFilter (mandatory) To save one attachement use 'AttachmentName' or 'Index'. If both are given, then index method will be used. To save all attachements, set 'SaveAllAttachments' to true.
        * (optional) AttachmentName {string} file name of the attachment to be saved. beware : File name may be different from display name
        * (optional) Index {number} index (starting to 1) of the attachment to be saved
        * (optional) SaveAllAttachments to true to save all attachements
        * (optional) ExtensionsToKeep When SaveAllAttachments is true, this list of the extensions to keep is used to filter the attachment to keep. Each has to be separated by ";"
        * (optional) ExtensionsToSkip When SaveAllAttachments is true, this list of the extensions to skip is used to filter the attachment to skip. Each has to be separated by ";"        
        * @throws {Error}
        */
        attachmentSave : function(oIndex,path, attachmentFilter) {
          ctx.notifyAction('ctx.outlook.mail.attachmentSave');

          //return true if should be kept
          var filterOnFileExtension = function(fileName, extensionToSkip, extensionToKeep){
            if(!extensionToSkip && !extensionToKeep){
              return true;
            }

            if(fileName && fileName.indexOf('.') == -1){
              return true; //default value if the file has no extension
            }

            var fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);
            fileExtension = fileExtension.toLowerCase();

            if(extensionToKeep){
              var extensionsToKeep = extensionToKeep.split(';');

              for (var currIndex = 0; currIndex < extensionsToKeep.length; currIndex++) {
                var currExtension = extensionsToKeep[currIndex].toLowerCase().trim();
                if(currExtension == fileExtension){
                  return true;
                }
              }

              return false;
            }

            if(extensionToSkip){
              var extensionsToSkip = extensionToSkip.split(';');

              for (var currIndex = 0; currIndex < extensionsToSkip.length; currIndex++) {
                var currExtension = extensionsToSkip[currIndex].toLowerCase().trim();
                if(currExtension == fileExtension){
                  return false;
                }
              }

              return true;
            }
          }

          try{
            if (attachmentFilter.AttachmentName == undefined && attachmentFilter.Index == undefined && attachmentFilter.SaveAllAttachments == undefined){
              throw "attachment name or index not defined";
            }

            var index = 0;

            if(!_oMails[oIndex]){
              throw new Error("No email corresponding to the input index. The parameter was + " + oIndex);
            }

            var attachmentsCount = _oMails[oIndex].Attachments.Count;
            var found = false;

            if(attachmentsCount<1){
              throw 'No attachment found in this email.';
            }

            if(attachmentFilter.Index !=undefined) {
              if (attachmentFilter.Index >0 && attachmentFilter.Index <= attachmentsCount) {
                _oMails[oIndex].Attachments.Item(attachmentFilter.Index).SaveAsFile(path);
              } else {
                throw 'Index out of Attachment list boundary.';
              }
            }
            else if(attachmentFilter.AttachmentName!=undefined) {
              while((index < attachmentsCount) && !(found)) {
                  found = _oMails[oIndex].Attachments.Item(index+1).FileName == attachmentFilter.AttachmentName;
                  if(found) {
                    _oMails[oIndex].Attachments.Item(index+1).SaveAsFile(path);
                  }
                  index++;
                }              
            }
            else if(attachmentFilter.SaveAllAttachments){
              while((index < attachmentsCount)) {
                
                var currAttachment = _oMails[oIndex].Attachments.Item(index+1);
                var fileName = currAttachment.FileName;                
                var pathFile = path + fileName;

                if(filterOnFileExtension(fileName, attachmentFilter.ExtensionsToSkip, attachmentFilter.ExtensionsToKeep)){
                  currAttachment.SaveAsFile(pathFile);
                }                  
                
                index++;
              }
            }


            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.attach(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.attachmentSave] Failed to save attachment. "+ err.description);
          }
        },

       /**
        * Gets count of attachments in indexed email.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getAttachmentsCount( 0 );</code>
        * @method  getAttachmentsCount
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {number}
        * @path    ctx.outlook.mail.getAttachmentsCount
        */
        getAttachmentsCount : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getAttachmentsCount');
          try{
            return _oMails[oIndex].Attachments.Count;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getBody(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getAttachmentsCount] Failed to get attachment count. "+ err.description);
          }
        },

       /**
        * Sets mail body format.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setBodyFormat( 0 );</code>
        * @method  setBodyFormat
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {number} iBodyFormat 0 (unspecified), 1 (plain), 2 (HTML), 3 (rich text)
        * @throws  {Error}
        * @path    ctx.outlook.mail.setBodyFormat
        */
        setBodyFormat : function(oIndex,iBodyFormat) {
          ctx.notifyAction('ctx.outlook.mail.setBodyFormat');
          try{
            _oMails[oIndex].BodyFormat = iBodyFormat;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setBodyFormat(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setBodyFormat] Failed to set body format. "+ err.description);
          }
        },

       /**
        * Gets mail body format.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getBodyFormat( 0 );</code>
        * @method  getBodyFormat
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {string|null} mail body
        * @path    ctx.outlook.mail.getBodyFormat
        */
        getBodyFormat : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getBodyFormat');
          try{
            return _oMails[oIndex].BodyFormat;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.getBodyFormat(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.getBodyFormat] Failed to get body format. "+ err.description);
          }
        },

       /**
        * Sets mail importance.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> ctx.outlook.mail.setImportance( 0 );</code>
        * @method  setImportance
        * @param   {number} oIndex Mail index of working mail collection
        * @param   {number} iImportance 1 (default), 2 (high), 0 (low)
        * @throws  {Error}
        * @path    ctx.outlook.mail.setImportance
        */
        setImportance : function(oIndex, iImportance) {
          ctx.notifyAction('ctx.outlook.mail.setImportance');
          try{
            _oMails[oIndex].Importance = iImportance;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.setImportance(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setImportance] Failed to set importance. "+ err.description);
          }
        },

       /**
        * Gets mail importance
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> res = ctx.outlook.mail.getImportance( 0 );</code>
        * @method  getImportance
        * @param   {number} oIndex Mail index of working mail collection
        * @return  {number} mail importance
        * @path    ctx.outlook.mail.getImportance
        */
        getImportance : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.getImportance');
          try{
            return _oMails[oIndex].Importance;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.getImportance] Failed to get importance. "+ err.description);
          }
        },

        // ajout Sabine
        /**
        * Sets request acknowledgment of receipt for the mail
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.mail.setAskAR(index);</code>
        * @path ctx.outlook.mail.setAskAR
        * @method setAskAR
        * @param {number} oIndex Mail index of working mail collection
        * @throws {Error}
        */

        setAskAR : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.setdemandeAR');
          try{
            _oMails[oIndex].OriginatorDeliveryReportRequested  = true;
          } catch(err){
            throw new Error(e.error.KO, " *** ctx.outlook.mail.setAskAR: KO *** Error "+ err.description);
          }
        },

        // ajout Sabine
        /**
        * Sets OptionVote for the mail
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.mail.setOptionVote(index,votingOptions);</code>
        * @path ctx.outlook.mail.setOptionVote
        * @method setOptionVote
        * @param {number} oIndex Mail index of working mail collection
        * @param {string} oVoting
        * @throws {Error}
        */

        setOptionVote : function(oIndex,oVoting) {
          ctx.notifyAction('ctx.outlook.mail.setOptionVote');
          try{
            //_oMails[oIndex].VotingOptions  = "Approuver; Refuser;"
            _oMails[oIndex].VotingOptions  = oVoting;
          } catch(err){
            //mylog(" *** ctx.outlook.mail.setImportance(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.setOptionVote] Failed to set setAskAR. "+ err.description);
          }
        },
        //mail.VotingOptions = “Cheese; Mushroom; Sausage; Combo; Veg Combo;”


        /**
        * Gets working mail collection length
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.getCollectionLength();</code>
        * @path ctx.outlook.mail.getCollectionLength
        * @method getCollectionLength
        * @return {number} length of mail collection
        */
        getCollectionLength : function() {
          ctx.notifyAction('ctx.outlook.mail.getCollectionLength');
          try{
              return  _oMails.length;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.getCollectionLength] Failed to get working mail collection length. "+ err.description);
          }
        },

        /**
        * Gets mail MessageID
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.getMessageId( 0 );</code>
        * @path ctx.outlook.mail.getMessageId
        * @method getMessageId
        * @param {number} oIndex Mail index of working mail collection
        * @return {string|null}
        */
        getMessageId : function(oIndex){
          ctx.notifyAction('ctx.outlook.mail.getMessageId');
          try{
            var propertyAccessor = _oMails[oIndex].PropertyAccessor;
            propertyAccessor=propertyAccessor.GetProperty("http://schemas.microsoft.com/mapi/proptag/0x1035001E");
            if(propertyAccessor == undefined || propertyAccessor == null || propertyAccessor == ""){
              return null;
            }
            return propertyAccessor;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.getMessageId] Failed to get message ID. "+ err.description);
          }
        },

        /**
        * Replies to the indexed mail
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.reply( 0 );</code>
        * @path ctx.outlook.mail.reply
        * @method reply
        * @param {number} oIndex Mail index of working mail collection
        * @history 1.3.0 : initial version
        */
        reply : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.reply');
          try{
            var oMail = _oMails[oIndex].Reply();
            _oMails.push(oMail);
            //return e.error.OK;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.reply] Failed to reply. "+ err.description);
          }
        },

        /**
        * Shows indexed mail
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.show( 0 );</code>
        * @path ctx.outlook.mail.show
        * @method show
        * @param {number} oIndex Mail index of working mail collection
        * @history 1.3.0 : initial version
        */
        show : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.show');
          try{
            _oMails[oIndex].Display();
            //return e.error.OK;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.show] Failed to show. "+ err.description);
          }
        },

        /**
        * Replies to the indexed mail
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.task.replyAll( 0 );</code>
        * @path ctx.outlook.mail.replyAll
        * @method replyAll
        * @param {number} oIndex Mail index of working mail collection
        * @history 1.3.0 : initial version
        */
        replyAll : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.replyAll');
          try{
            var oMail = _oMails[oIndex].ReplyAll();
            _oMails.push(oMail);
            //return e.error.OK;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.mail.replyAll] Failed to reply All. "+ err.description);
          }
        },

        /**
        * Creates a new mail using object as parameter and pushes it to mail collection
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * ctx.outlook.mail.create({
        *   To:'mymail@sap.com',
        *   Cc :'hismail@sap.com',
        *   Subject:'[OUTLOOK LIBRARY TEST] - Subject',
        *   Body:'[OUTLOOK LIBRARY TEST] - Body'
        * });
        </code>
        * @see http://msdn.microsoft.com/en-us/library/office/dn320330(v=office.15).aspx
        * @path ctx.outlook.mail.create
        * @method create
        * @param {Object} object contains desired user list of mail properties\\
        * {To: '...', Cc :'...', Subject: '...', Body: '...'}
        * @history 1.0.0 : initial version
        */
        create : function(object) {
          ctx.notifyAction('ctx.outlook.mail.create');
          try{
            var refMail = _outlookApp.CreateItem(e.outlook.itemType.Mail);
            for(var index in object){
              if(index in refMail){
                refMail[index] = object[index];
              } else {
                ctx.log(index+' is not supported by outlook mail item');
              }
            }
            var length = _oMails.push(refMail);
            return (length -1);
            //_oMail = refMail;
            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.create(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.create] Failed to create mail. "+ err.description);
          }
        },

        /**
        * Sends mail and removes the mail for the working mail collection.
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.mail.send( 0 );</code>
        * @path ctx.outlook.mail.send
        * @method send
        * @param {number} oIndex Mail index of working mail collection
        * @throws {Error}
        */
        send : function(oIndex) {
          ctx.notifyAction('ctx.outlook.mail.send');
          try{
              _oMails[oIndex].Send();

              //_oMails[oIndex] = null;
              _oMails.splice(oIndex,1);
              //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.send(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.send] Failed to send mail. "+ err.description);
          }
        },

        /**
        * Sends mail with specific account and removes the mail for the working mail collection.
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.mail.sendUsingAccount( 0, "myFirstName.myName@email.com");</code>
        * @path ctx.outlook.mail.sendUsingAccount
        * @method sendUsingAccount
        * @param {number} oIndex Mail index of working mail collection
        * @param {string} accountInfo Account Display Name or the store ID or the display name of the store associated to the account which should be use to send the email
        * @throws {Error}
        */
       sendUsingAccount : function(oIndex, accountInfo) {
        ctx.notifyAction('ctx.outlook.mail.sendUsingAccount');
        try{
          var accounts = _outlookApp.Session.Accounts;
          var accountToUse;
          accountInfo = accountInfo.toLowerCase();

          for (var accountIndex = 1; accountIndex <= accounts.Count; accountIndex++) {
            var currAccount = accounts.Item(accountIndex);
            var associatedAccount = currAccount.DeliveryStore;
            if(associatedAccount.StoreID.toLowerCase() == accountInfo || associatedAccount.DisplayName.toLowerCase() == accountInfo || currAccount.DisplayName.toLowerCase() == accountInfo){
              accountToUse = currAccount;
              break;
            }
          }

          if(!accountToUse){
            throw new Error(e.error.KO, "[ctx.outlook.mail.send] The account cannot be identified. The input parameter was "+ accountInfo);
          }

            _oMails[oIndex].SendUsingAccount = accountToUse;
            _oMails[oIndex].Send();

            _oMails.splice(oIndex,1);
        } catch(err){
          throw new Error(e.error.KO, "[ctx.outlook.mail.sendUsingAccount] Failed to send mail with specific account. "+ err.description);
        }
      },

        /**
        * Searches for mail informations using user defined filter in object parameter
        * @description
        *
        *   * sample : "%lastweek(" + "\"" +"DAV:getlastmodified" + "\"" + ")%"
        *   * see: [[http://msdn.microsoft.com/en-us/library/office/jj973053(v=office.15).aspx]]
        *   * see: [[http://blogs.msdn.com/b/andrewdelin/archive/2005/05/11/416312.aspx]]
        *   * (optional) storeName : string - store name
        *   * sample : 'myName@myCompany.com'
        *   * (optional) storeID : string - outlook Store id
        *   * (optional) folderID : string - Entry ID of folder
        *   * (optional) folderName : string - folder name
        *   * (optional) folderPath : string - folder path, backslahes must be doubled in the path
        *   * (optional) folderID : string - folder ID
        *   * (optional) maxRow : number - number of rows
        *   * (optional) sort : string - sort array of mail information
        *   * sample : [ReceivedTime] (default value)
        *   * (optional) descending : boolean - true descending sort (default), false ascending
        *   * see: [[http://msdn.microsoft.com/en-us/library/office/ff866960(v=office.15).aspx]]
        *   * (optional) tableContent : number - e.outlook.tableContent.olUserItems for normal items e.outlook.tableContent.olHiddenItems for hidden items
        *   * (optional) dontThrowExceptionIfNoMailFound : boolean - if true, no exception will be thrown if there is no email found
        *
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * ctx.outlook.mail.search({
        *   filter : "@SQL=" + "%thisweek(" + "\"" +"DAV:getlastmodified" + "\"" + ")%",
        *   maxRow : 2,
        *   storeName : 'mymail@myprovider.eu'
        * });
        * </code>
        * @path ctx.outlook.mail.search
        * @method search
        * @param {Object} object (mandatory) filter : string - Contains filter used to search for mail
        */
        search : function(object) {
          ctx.notifyAction('ctx.outlook.mail.search');
          try{
            //Mandatory object property
            if (object['filter'] == undefined){
              throw "filter undefined";
            }

            //Definition
            var oNamespace, oStores, oStore, oFolder, oTable, oRow, oCount, pTableContent, pSort, pDescending, pMaxRow, oStoreID;
            var found, index, row;

            //Initialization
            found = false;
            index = 1;
            // The only supported name space type is "MAPI".
            oNamespace = _outlookApp.GetNameSpace("MAPI");
            oStores = oNamespace.Stores;
            oCount = oStores.count;
            pTableContent = (object['tableContent'] == undefined) ? e.outlook.tableContent.olUserItems : object['tableContent'];
            pSort = (object['sort'] == undefined) ? '[ReceivedTime]' : object['sort'];
            pDescending = (object['descending'] == undefined) ? true : object['descending'];

            row = [];
            _oFilteredTable = [];


            //Looking for Store
            oStore = ctx.outlook.getStore(object);

            if (oStore == null){
              throw 'store not recovered';
            }

            if(object['storeID']!=undefined){
              oStoreID = object['storeID'];
            } else {
              oStoreID = oStore.StoreID;
            }

            //Looking for Folder with ID
            if(object['folderID'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderID: object['folderID'], store : oStore});
            } else

            //Looking for Folder with Path
            if(object['folderPath'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderPath : object['folderPath'], store : oStore});
            } else

            //Looking for Folder with Name
            if(object['folderName'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderName : object['folderName'], store : oStore});
            } else {

              //If no folder
              oFolder = ctx.outlook.folder.getFolder({store : oStore});
            }

            if(oFolder == null){
              throw "folder not found in this store";
            }

            //Getting filter table
            if (object['filter'] == "") {
              oTable = oFolder.GetTable("", pTableContent);
            } else {
              oTable = oFolder.GetTable("@SQL="+object['filter'], pTableContent);
            }

            oCount = oTable.GetRowCount();

            //Define maximum number of rows
            if(object['maxRow'] == undefined){
              pMaxRow = oCount;
            } else {
              pMaxRow = object['maxRow'];
              if(pMaxRow > oCount){
                pMaxRow = oCount;
              } else if(pMaxRow<=0){
                //return e.error.OK;
                return;
              }
            }

            if(pMaxRow == 0){
              if(object.dontThrowExceptionIfNoMailFound){
                return 0;
              }

              throw 'No email found';
            }

            //Sorting filter table and adding column on it
            oTable.Sort(pSort,pDescending);
            oTable.Columns.Add("urn:schemas:httpmail:importance");
            oTable.Columns.Add("urn:schemas:httpmail:datereceived");
            oTable.Columns.Add("urn:schemas:httpmail:hasattachment");
            oTable.Columns.Add("urn:schemas:httpmail:date");
            oTable.Columns.Add("urn:schemas:httpmail:sender");
            //oTable.Columns.Add("urn:schemas:httpmail:from");
            //oTable.Columns.Add("urn:schemas:httpmail:to");
            //oTable.Columns.Add("urn:schemas:httpmail:cc");
            //oTable.Columns.Add("urn:schemas:httpmail:bcc");
            oTable.MoveToStart();
            oCount = 0;

            //Getting asked number of rows of filter table
            for(index=0;index<pMaxRow && !oTable.EndOfTable;index++){
              oRow = oTable.GetNextRow();
              row={};

              //Is that an Email?
              if(oRow('MessageClass')=='IPM.Note'){
                oCount++;

                if(oRow('EntryID') != undefined){
                    row['EntryID']=oRow('EntryID');
                }

                if(oRow('Subject') != undefined){
                    row['Subject']=oRow('Subject');
                }

                if(oRow('CreationTime') != undefined){
                    row['CreationTime']=oRow('CreationTime');
                }

                if(oRow('LastModificationTime') != undefined){
                    row['LastModificationTime']=oRow('LastModificationTime');
                }

                if(oRow('MessageClass') != undefined){
                    row['MessageClass']=oRow('MessageClass');
                }

                if(oRow('urn:schemas:httpmail:importance') != undefined){
                    row['Importance']=oRow('urn:schemas:httpmail:importance');
                }

                if(oRow('urn:schemas:httpmail:datereceived') != undefined){
                    row['DateReceveid']=oRow('urn:schemas:httpmail:datereceived');
                }

                if(oRow('urn:schemas:httpmail:hasattachment') != undefined){
                    row['HasAttachment']=oRow('urn:schemas:httpmail:hasattachment');
                }

                if(oRow('urn:schemas:httpmail:date') != undefined){
                    row['Date']=oRow('urn:schemas:httpmail:date');
                }

                if(oRow('urn:schemas:httpmail:sender') != undefined){
                    row['Sender']=oRow('urn:schemas:httpmail:sender');
                }

                //if(oRow('urn:schemas:httpmail:From') != undefined){
                //    row['From']=oRow('urn:schemas:httpmail:from');
                //    ctx.logMess(row['From']);
                //}

                //if(oRow('urn:schemas:httpmail:to') != undefined){
                //    row['To']=oRow('urn:schemas:httpmail:to');
                //    ctx.logMess(row['To']);
                //}

                //if(oRow('urn:schemas:httpmail:cc') != undefined){
                //    row['CC']=oRow('urn:schemas:httpmail:cc');
                //    ctx.logMess(row['CC']);
                //}

                //if(oRow('urn:schemas:httpmail:bcc') != undefined){
                //    row['BCC']=oRow('urn:schemas:httpmail:bcc');
                //    ctx.logMess(row['BCC']);
                //}

                row['StoreID']=oStoreID;
                _oFilteredTable.push(row);
              }
            }

            //return number of Email found
            //return e.error.OK;

          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.search(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.search] Failed to search mail. "+ err.description==undefined?err:err.description);
          }
        },

        /**
        * Searches for mail informations using user defined criteria in object parameter
        * @description
        *   * (optional) fromEmail : string - sender mail
        *   * sample :  '%hismail@example.com%'
        *   * (optional) subject : string - mail subject
        *   * sample :  'Sub%' - represents each mail contains subject who starts whith 'Sub'
        *   * (optional) sender : string - sender name
        *   * sample :  '%abc' - represents sender name who ends with 'abc'
        *   * (optional) textDescription: string - mail body
        *   * (optional) read : Boolean - true (1) represents read mails , false (0) represents unread mails
        *   * (optional) hasAttachment : Number -'1' represents mails who contains attachments
        *   * (optional) date : object - date object who contains :
        *   * after : Date - searching for mails recieved after this date
        *   * before   : Date - searching for mails recieved before this date
        *   * (optional) maxRow : number - number of rows
        *   * (optional) dontThrowExceptionIfNoMailFound : boolean - if true, no exception will be thrown if there is no email found
        *
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * ctx.outlook.mail.searchByCriteria({
        *   fromEmail : "%hismail@example.fr%",subject : "mail subject", date : {after : new Date("MM/JJ/AAAA"),before : new Date("MM/JJ/AAAA")}}
        *  });
        * </code>
        * @path ctx.outlook.mail.searchByCriteria
        * @method searchByCriteria
        * @param {Object} obj (mandatory) criteria : string - Contains criteria used to search for mail
        *
        */

        searchByCriteria : function( obj ) {
          ctx.notifyAction('ctx.outlook.mail.searchByCriteria');
          var finalFilter = "";

          try {
            for( var i in obj ) {
              if( obj[i] != null && i != "maxRow" && i!="dontThrowExceptionIfNoMailFound") {
                if( finalFilter != "" )
                  finalFilter += " AND ";
                switch( i ) {
                  case "fromEmail":
                  case "subject" :
                  case "sender" :
                  case "textDescription" :
                    finalFilter += "urn:schemas:httpmail:" + i.toLowerCase( ) + " like '" + obj[i] + "'";
                    break;
                  case "read" :
                  case "hasAttachment":
                    finalFilter += " urn:schemas:httpmail:" + i.toLowerCase( ) + " = " + obj[i] + "";
                    break;
                  case "date" :
                    if( obj[i].from != undefined && obj[i].until != undefined ) { 
                      finalFilter += dateFilter( obj[i] );
                      obj[i].from = undefined;
                      finalFilter += " AND " + dateFilter( obj[i] );
                    }
                    else {
                      finalFilter += dateFilter( obj[i] );
                    }
                    break;
                }
              }
            }

            //Changing the date to have a clean date/hour and not be bovered with timezone
            function changeDate( date, time ) { 
              var hour, exactDay;
              var newDate = ( time == 'until' ? new Date( Date.UTC( date.getFullYear( ), date.getMonth( )+1, date.getDate( )+1, 0, 0, 0 ) ) : new Date( Date.UTC( date.getFullYear( ), date.getMonth( )+1, date.getDate( ), 0, 0, 0 ) ) );
              //Getting how many hours we have exactly by putting it inside the function that will return this format ==> HH:MM [AM/PM]
              hour = getExactHour(newDate);
              exactDay = getExactDay(newDate); 
              //It returns something like that ==> MM/JJ/AAAA HH:MM [AM/PM]
              return exactDay + " " + hour;
            }
            function getExactDay( date ) { 
              var month, day, year;
              day = date.getDate( );
              day = String( "0"+day ).slice(-2);
              month = date.getMonth( );
              month = String( "0"+month ).slice(-2);
              year = date.getFullYear( );
              return month+"/"+day+"/"+year;
            }
            function pad( value ) { 
              return value < 10 ? '0' + value : value;
            }
            function getExactHour( date ) { 
              var time = pad( date.getHours( ) ) + ":" + pad( date.getMinutes( ) ); 
              //Should be AM or PM 
              var dayTime = ( date.getHours( ) >= 12 ? 'PM' : 'AM' ); 
              return time + " " + dayTime; 
            }
            function dateFilter( dateObj ) {
              var dateFilter = "";
              if( dateObj.from != undefined ) { 
                dateObj.from = changeDate( dateObj.from, 'from' ); 
                dateFilter += " \"urn:schemas:httpmail:datereceived\" >= '" + dateObj.from + "'"; 
              }
              else { 
                dateObj.until = changeDate( dateObj.until, 'until' ); 
                dateFilter += " \"urn:schemas:httpmail:datereceived\" <= '" + dateObj.until + "'";
              }
              return dateFilter;
            }
            ctx.outlook.mail.search({filter : finalFilter,maxRow : obj.maxRow, dontThrowExceptionIfNoMailFound : obj.dontThrowExceptionIfNoMailFound});
          } 
          catch( err ) { 
            throw new Error( e.error.KO, "[ctx.outlook.mail.searchByCriteria] Failed to search mail. "+ err.description); 
          }
        },


          /**
        * Move a mail into a folder of the default store
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.mail.move(0,{
        *   defaultFolder : ctx.outlook.constants.inbox,
        *   folderName:'myFolder',
        * });</code>
        * @path ctx.outlook.mail.move
        * @method move
        * @param {number} oIndex Index of the mail.
        * @param {Object} object (mandatory) defaultFolder : constant - must be "inbox"(mandatory) folderID or folderPath or folderName\\ - (optional) folderID : string - Entry ID of folder\\ - (optional) folderName : string - folder name\\ - (optional) folderPath : string - folder path, backslahes must be doubled in the path\\
        * @return {boolean} result
        */
        move: function(oIndex,object){
          ctx.notifyAction("ctx.outlook.mail.move");
          try {
            var oNamespace, oInbox, oDestFolder;

            oNamespace = _outlookApp.Session;
            if(object["defaultFolder"] == undefined){
              object["defaultFolder"]="inbox";
            }
            
            //https://msdn.microsoft.com/en-us/library/office/aa219371(v=office.11).aspx
            oInbox = oNamespace.GetDefaultFolder(object["defaultFolder"]);
            oDestFolder = oInbox.Folders(object["folderName"]);
            _oMails[oIndex].Move(oDestFolder);

           return true;
          } catch (ex) {
            throw new Error(e.error.KO, "[ctx.outlook.mail.move] Failed to move the mail. "+ ex.description);
          }
        },

        /**
        * Move a mail into a folder in a specific store
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.mail.moveToSpecificStore(0, "My Store name", "Inbox\\Folder1\\Folder2");
        * res = ctx.outlook.mail.moveToSpecificStore(0, "Online Archive - storeName@storeName.com", "Archive\\Folder1");
        * </code>
        * @path ctx.outlook.mail.moveToSpecificStore
        * @method moveToSpecificStore
        * @param {number} oIndex Index of the mail.
        * @param {string} storeIdOrName ID or Display Name of the store
        * @param {string} [destinationFolderPath] Destination folder from the root folder e.g. folder1\\folder2\\folder3 otherwise if empty, the root folder will be used.             
        * @return {boolean} true if success, false if failure
        */
       moveToSpecificStore: function(oIndex, storeIdOrName, destinationFolderPath){
        ctx.notifyAction("ctx.outlook.mail.moveToSpecificStore");
        try {
          var store;
          var storeId;

          var storesInfo = ctx.outlook.store.enumerateStores();
          for (var storeIndex = 0; storeIndex < storesInfo.length; storeIndex++) {
            var currStore = storesInfo[storeIndex];
            if(currStore.storeId == storeIdOrName){
              storeId = storeIdOrName;
            }
            else if(currStore.displayName == storeIdOrName){
              storeId = currStore.storeId;
            }

            if(storeId !== undefined){
              break;
            }
          }

          if(storeId === undefined){
            throw new Error(e.error.KO, " Failed to identify the Store. The input parameter was: " + storeIdOrName);
          }
         
          store = _outlookApp.Session.GetStoreFromID(storeId);
          
          var destinationFolder = store.GetRootFolder();
          if(destinationFolderPath){
            var splittedPath = destinationFolderPath.split('\\');            
            for (var splitIndex  = 0; splitIndex  < splittedPath.length; splitIndex  ++) {
              var singleFolderPath = splittedPath[splitIndex];

              try {
                destinationFolder = destinationFolder.Folders(singleFolderPath);  
              } catch (error) {
                throw new Error(e.error.KO, " Failed to check the Folder Path. You input parameter was '" + destinationFolderPath + "'. The folder '" + singleFolderPath + "' is not found.");
              }              
            }           
          }

          _oMails[oIndex].Move(destinationFolder);

         return true;
        } catch (ex) {
          throw new Error(e.error.KO, "[ctx.outlook.mail.moveToSpecificStore] Failed to move the mail. "+ ex.description);
        }
      },
        /**
        *sets mail Flag Icon
        *__Ex:__
        *  <code javascript>
        *    res = ctx.outlook.mail.setFlag(0,ctx.outlook.constants.color.blue);
        *  </code>
        * @param oIndex : color: constant - 0 for no  Flag Icon
        * @param color
        *
        *
        *
        **/
        setFlag : function(oIndex,color) {
          ctx.notifyAction("ctx.outlook.mail.setFlag");
          try {
            //https://msdn.microsoft.com/en-us/library/office/aa219371(v=office.11).aspx
           _oMails[oIndex].FlagIcon = color;

          }catch(err) {
          throw new Error(e.error.KO, "[ctx.outlook.mail.setFlag] Failed to flag mail. "+ err.description);
          }

        },

          /**
          @param date : Date - new Date();
          https://msdn.microsoft.com/fr-fr/vba/outlook-vba/articles/mailitem-remindertime-property-outlook
          **/
          setReminderTime: function(oIndex,date) {
            ctx.notifyAction('ctx.outlook.mail.setReminderTime');
            try {
               _oMails[oIndex].ReminderTime = date;
            }catch (err) {
              throw new Error(e.error.KO, "[ctx.outlook.mail.setReminderTime] Failed to set  reminder Time. "+ err.description);
            }
          },
            /***


        ...



        **/

        /**Flag an email as read or unread.
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.setUnRead(0);
        * ctx.outlook.mail.setUnRead(0, true);</code>
        * @path ctx.outlook.mail.setUnRead
        * @method setUnRead
        * @param {number} oIndex  Mail index of working mail collection
        * @param {boolean} [forceValue] (optional) if true, the email will have the status "unread". If false, the email will have the status "read".
        * If this parameter is undefined, the toggle value is used. 
        * @throws {Error}
        */
        setUnRead:function(oIndex, forceValue) {
          ctx.notifyAction('ctx.outlook.mail.setUnRead');
              try{
                if(forceValue === undefined){
                  if(_oMails[oIndex].UnRead)
                   _oMails[oIndex].UnRead = false;
                else
                  _oMails[oIndex].UnRead = true;
                }
                else if (typeof(forceValue) ==="boolean"){
                  _oMails[oIndex].UnRead = forceValue;
                }
                else{
                  throw new Error(e.error.InvalidArgument, "[ctx.outlook.mail.setUnRead] The type of the parameter forceValue is not supported.");
                }
              }catch(err) {
                throw new Error(e.error.KO, "[ctx.outlook.mail.setUnRead] Failed to set UnRead Value. "+ err.description);
              }
        },
        /**
        * Gets List of mail informations
        * @description
        * Result properties :
        *   * EntryID,
        *   * Subject,
        *   * CreationTime,
        *   * LastModificationTime,
        *   * MessageClass,
        *   * Importance,
        *   * DateReceveid,
        *   * HasAttachment,
        *   * Date,
        *   * Sender,
        *   * StoreID
        *
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.mail.getFilteredTable();
        * </code>
        * @path ctx.outlook.mail.getFilteredTable
        * @method getFilteredTable
        * @return {Array} result properties
        */
        getFilteredTable : function(){
          ctx.notifyAction('ctx.outlook.mail.getFilteredTable');
          return _oFilteredTable;
        },

        /**
        * Retrieves mail using EntryID and StoreID and pushes it in working mail list
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.mail.getFilteredTable();
        * ctx.outlook.mail.retrieveMail({EntryID : res[0]['EntryID'], StoreID : res[0]['StoreID']});</code>
        * @path ctx.outlook.mail.retrieveMail
        * @method retrieveMail
        * @param {Object} object (mandatory) EntryID : string - entryID of outlook mail
        * (optional) StoreID : string - storeID of outlook store
        * @throws {Error}
        */
        retrieveMail : function(object){
          ctx.notifyAction('ctx.outlook.mail.retrieveMail');
          try{
            //Mandatory object properties
            if(object['EntryID'] == undefined){
              throw 'EntryID undefined';
            }

            var oNamespace;
            oNamespace = _outlookApp.GetNameSpace("MAPI");

            if(object['StoreID'] != undefined){
              _oMails.push(oNamespace.GetItemFromID(object['EntryID'],object['StoreID']));
            } else {
              _oMails.push(oNamespace.GetItemFromID(object['EntryID']));
            }
            //return e.error.OK;

          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.retrieveMail(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.retrieveMail] Failed to retrieve mail. "+ err.description);
          }
        },

        /**
        * Resets Mail working list
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.mail.resetMailCollection();</code>
        * @path ctx.outlook.mail.resetMailCollection
        * @method resetMailCollection
        * @throws {Error}
        */
        resetMailCollection : function(){
          ctx.notifyAction('ctx.outlook.mail.resetMailCollection');
          try{
            _oMails = [];
          } catch(err){
            //ctx.log(" *** ctx.outlook.mail.resetMailCollection(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.mail.resetMailCollection] Failed to reset Mail working list. "+ err.description);
          }
        }
        //,
        //save : function() {},
        //remove : function() {},
        //copy : function() {},
        //move : function() {}
      }
      return _mail;
    })(),

    /**
     * Note class
     * @path ctx.outlook.note
     * @module outlook
     * @class note
     */
    note :(function() {
      var _oNote = null;
//      var _oNotes = []; //Working mail list
      var _note = {

        /**
        * Creates a new note using object as parameter ans pushes it to note collection
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.note.create({Body:'This is the note content'});</code>
        * @see http://msdn.microsoft.com/en-us/library/office/ff869608(v=office.15).aspx
        * @path ctx.outlook.note.create
        * @method create
        * @param {Object} object contains desired user list of note properties\\
        * {Body:'...'}
        * @history 1.3.0 : initial version
        */
        create : function(object) {
          ctx.notifyAction('ctx.outlook.note.create');
          try{

            var refNote = _outlookApp.CreateItem(e.outlook.itemType.Note);

            for(var index in object){
              if(index in refNote){
                refNote[index] = object[index];
              } else {
                ctx.log(index+' is not supported by outlook note item');
              }
            }
            refNote.Save();

            _oNotes.push(refNote);

            //_oMail = refMail;
            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.note.create(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.note.create] Failed to create a new note. "+ err.description);
          }
        },

        /**
        * Shows indexed note
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.note.show( 0 );</code>
        * @path ctx.outlook.note.show
        * @method show
        * @param {number} oIndex note index of working note collection
        * @history 1.3.0 : initial version
        */
        show : function(oIndex) {
          ctx.notifyAction('ctx.outlook.task.show');
          try{
            _oNotes[oIndex].Display();
            //return e.error.OK;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.task.show] Failed to show. "+ err.description);
          }
        },

        /**
        * Resets Note working list
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.note.resetNoteCollection();</code>
        * @path ctx.outlook.note.resetNoteCollection
        * @method resetNoteCollection
        * @throws {Error}
        */
        resetNoteCollection : function(){
          ctx.notifyAction('ctx.outlook.note.resetNoteCollection');
          try{
            _oNotes = [];
          } catch(err){
            //ctx.log(" *** ctx.outlook.note.resetNoteCollection(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.note.resetNoteCollection] Failed to reset note working list. "+ err.description);
          }
        }
        //,
        //create : function() {},
        //get : function() {},
        //remove : function() {},
        //modify : function() {}
      };
      return _note;
    })(),

   /**
    * Task class
    * @class  outlook.task
    * @path   ctx.outlook.task
    */
    task :(function() {
      var _oTask = null;
//      var _oTasks = []; //Working mail list
      var _task = {
        /**
        * Creates a new task using object as parameter and pushes it to tasks collection
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.task.create({Subject:'This is the task subject',Body:'This is the task body',
        *        Sensitivity:2,StartDate:'13/01/2015 18:00:00',DueDate:'13/01/2015 19:00:00'});</code>
        * @see http://msdn.microsoft.com/en-us/library/office/microsoft.office.interop.ctx.outlook.taskitem_properties(v=office.15).aspx
        * @path ctx.outlook.task.create
        * @method create
        * @param {Object} object contains desired user list of task properties
        * @history 1.3.0 : initial version
        */
        create : function(object) {
          ctx.notifyAction('ctx.outlook.task.create');
          try{
            var refTask = _outlookApp.CreateItem(e.outlook.itemType.Task);

            for(var index in object){
              if(index in refTask){
                refTask[index] = object[index];
              } else {
                ctx.log(index+' is not supported by outlook task item');
              }
            }
            refTask.Save();

            _oTasks.push(refTask);

            //_oMail = refMail;
            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.task.create(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.task.create] Failed to create a task. "+ err.description);
          }
        },

        /**
        * Shows indexed task
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.task.show( 0 );</code>
        * @path ctx.outlook.task.show
        * @method show
        * @param {number} oIndex task index of working task collection
        * @history 1.3.0 : initial version
        */
        show : function(oIndex) {
          ctx.notifyAction('ctx.outlook.task.show');
          try{
            _oTasks[oIndex].Display();
            //return e.error.OK;
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.task.show] Failed to show. "+ err.description);
          }
        },

        /**
        * Resets Task working list
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * ctx.outlook.task.resetTaskCollection();
        * </code>
        * @path ctx.outlook.task.resetTaskCollection
        * @method resetTaskCollection
        * @throws {Error}
        */
        resetTaskCollection : function(){
          ctx.notifyAction('ctx.outlook.task.resetTaskCollection');
          try{
            _oTasks = [];
          } catch(err){
            //ctx.log(" *** ctx.outlook.task.resetTaskCollection(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.task.resetTaskCollection] Failed to reset task working list. "+ err.description);
          }
        }
        //get : function() {},
        //remove : function() {},
        //modify : function() {}
      };
      return _task;
    })(),

   /**
    * Appointment class
    * @class   outlook.appointment
    * @path    ctx.outlook.appointment
    */
    appointment : (function() {
      var _appointment = {};
      
      /**
      * Appointment context class
      * @class   outlook.appointment.context
      * @path    ctx.outlook.appointment.context
      */
      _appointment.context = (function(){
        var _context = {};

        var previousSearchCriteria = null;  //string
        var previousAppointmentsFiltered = null;  //Items type
        var currentAppointment = null;

        //folderItem == e.outlook.folderItem.olFolderCalendar
        var appointmentsFinder = function(folderItem, filterInfo){
          var allAppointments;
  

            var filteringCriteria = "";
            
            var addItemToFilteringCriteria = function(item){
              filteringCriteria += filteringCriteria ?  " AND " : "@SQL=";
              filteringCriteria += item;
            }
  
            for (var property in filterInfo) {
              if (filterInfo.hasOwnProperty(property)) {
                var propertyValues = filterInfo[property];
                
                if(propertyValues === undefined || propertyValues == ""){
                  continue;
                }            
    
                switch (property) {
                  case "startAfterSpecificDate":
                      // http://schemas.microsoft.com/mapi/start_date
                      addItemToFilteringCriteria("\"urn:schemas:calendar:dtstart\" >= '" + propertyValues + "'");
                    break;
                  case "endBeforeSpecificDate":
                      addItemToFilteringCriteria("\"urn:schemas:calendar:dtend\" <= '" + propertyValues + "'");
                    break;
                  // case "durationLowerThan":
                  //     addItemToFilteringCriteria("\"urn:schemas:calendar:duration\" <= '" + propertyValues + "'");
                  //   break;
                  // case "durationHigherThan":
                  //     addItemToFilteringCriteria("\"urn:schemas:calendar:duration\" >= '" + propertyValues + "'");
                  //   break;
                  case "subjectEqualTo":
                      addItemToFilteringCriteria("\"urn:schemas:mailheader:subject\" = '" +  propertyValues +"'");
                    break;
                  case "subjectContains":
                      addItemToFilteringCriteria("\"urn:schemas:mailheader:subject\" like '%" +  propertyValues +"%'");
                    break;
                  // case "responseStatus":
                  //     //addItemToFilteringCriteria("\"urn:schemas:calendar:responsestatus\" = '" +  propertyValues +"'");
                  //     addItemToFilteringCriteria("\"urn:schemas:calendar:attendeestatus\" = '" +  propertyValues +"'");                      
                  //   break;
                  default:
                    break;
                    //urn:schemas:calendar:meetingstatus
                    //urn:schemas:calendar:alldayevent
    
                }
              }
            }
  
            // if(!filteringCriteria || (previousSearchCriteria && filteringCriteria == previousSearchCriteria && !filterInfo.forceRefresh)){
            //   return previousAppointmentsFiltered;
            // }
    
            allAppointments = _outlookApp.Session.GetDefaultFolder(folderItem).Items;
            
            if(filterInfo.includeRecurrences == true){
              //Outlook seems to have trouble when IncludeRecurrences is false because recurrent meetings like anniversaries are returned even if they don't correspond to the filtering criterias
              allAppointments.IncludeRecurrences = true;
            }
            else{
              allAppointments.IncludeRecurrences = false;
            }
            
            allAppointments.Sort("[Start]");
    
            // filteringCriteria = "@SQL=\"urn:schemas:mailheader:subject\" = 'TEST_My_IRPA_Appointment AUTO Generated'";
            // filteringCriteria = "@SQL=\"urn:schemas:mailheader:subject\" like '%TEST_My_IRPA_Appointment%'";
    
            var filteredAppointments = allAppointments.Restrict(filteringCriteria);
            
            previousSearchCriteria = filteringCriteria;
            previousAppointmentsFiltered = filteredAppointments;
  
  
  
        };
  
        //Don't use, only for technical reason
        /**
         * @ignore
         */
        _context.getCurrentAppointment = function(){        
          return currentAppointment;
        };

        //Don't use, only for technical reason
        /**
         * @ignore
         */
        _context.setCurrentAppointment = function(myAppointment){

          currentAppointment = myAppointment;
        };

        
        /** Search to perform the filtering of the appointments and keep a reference on the result set.
        * @description Search to perform the filtering of the appointments and keep a reference on the result set.
        * <wrap help> //Example://</wrap>
        * <code javascript>
        *   //Perform the selection of the appointments starting after the 1er day of the year 2020 at 4pm.
        *   var filterInfo = {};
        *   filterInfo.startAfterSpecificDate = "01/01/2020 4:00 PM"; //here English culture, the date depends of the user's current culture
        *   ctx.outlook.appointment.context.filter(filteringInfo);
        * 
        *   //Perform the selection of the appointments ending before the last day of the year 2020 at 8:00 AM and having for subject "My appointments to find".
        *   var filterInfo = {};
        *   filterInfo.endBeforeSpecificDate = "12/31/2020 8:00 AM"; //here English culture, the date depends of the user's current culture
        *   filterInfo.subjectEqualTo = "My appointments to find";
        *   ctx.outlook.appointment.context.filter(filteringInfo);
        *
        *   //Perform the selection of the appointments defined during the year 2020 and which contain the word urgent in the subject.
        *   var filterInfo = {};
        *   filterInfo.startAfterSpecificDate = "01/01/2020 4:00 AM"; //here English culture, the date depends of the user's current culture
        *   filterInfo.endBeforeSpecificDate = "12/31/2020 8:00 PM"; //here English culture, the date depends of the user's current culture
        *   filterInfo.subjectContains = "urgent"
        *   ctx.outlook.appointment.context.filter(filteringInfo);
        * 
        *   //Perform the selection of the appointments (including recurrent appointments) between the 6th and the 12th of January of the year 2020 and which contain the word urgent in the subject.
        *   var filterInfo = {};
        *   filterInfo.startAfterSpecificDate = "01/06/2020 4:00 AM"; //here English culture, the date depends of the user's current culture
        *   filterInfo.endBeforeSpecificDate = "01/12/2020 8:00 PM"; //here English culture, the date depends of the user's current culture
        *   filterInfo.subjectContains = "urgent"
        *   filterInfo.includeRecurrences = true;
        *   ctx.outlook.appointment.context.filter(filteringInfo);
        * </code>
        * @path ctx.outlook.appointment.context.filter
        * @method filter
        * @param {Object} filterInfo Object which is containing the information to perform the filtering.
        * It supports the following properties: startAfterSpecificDate, endBeforeSpecificDate, durationLowerThan, durationHigherThan, subjectEqualTo, subjectContains
        * @return {number} count of filtered items.
        * @throws {Error}
        */
        //return the count of corresponding items
        _context.filter = function(filterInfo){
          ctx.outlook.init();

          appointmentsFinder(e.outlook.folderItem.olFolderCalendar, filterInfo);
   
          var filteredItemsCount = previousAppointmentsFiltered ? previousAppointmentsFiltered.Count : 0;

          if(filteredItemsCount == 2147483647){
            var info = _context.getItemsInformation();
            filteredItemsCount = info.length;
          }
          
          currentAppointment = filteredItemsCount>0 ? previousAppointmentsFiltered.GetFirst() : null;
          return filteredItemsCount;
        }
        
        /** Provide information of the corresponding appointments filtered in the context
        * @description Provide information of the corresponding appointments filtered in the context
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.getItemsInformation();
        * 
        * Note that the call to this method will reset the current appointment to the first appointment in the filtered list
        * </code>
        * @path ctx.outlook.appointment.context.getItemsInformation
        * @method getItemsInformation
        * @throws {Error}
        */
        _context.getItemsInformation = function(){
          ctx.outlook.init();

          var resultInfo = [];

          //Impossible to perform a standard loop here because Outlook always return a bad Count if the recurrent meetings are including in the search
          if(previousAppointmentsFiltered && previousAppointmentsFiltered.Count >0){            
            var currAppointment = previousAppointmentsFiltered.GetFirst();
            while (currAppointment !== null) {
              var appointmentToAdd = {};
              appointmentToAdd.subject = currAppointment.Subject;
              appointmentToAdd.startTime = currAppointment.Start;
              appointmentToAdd.endTime = currAppointment.End;
              appointmentToAdd.category = currAppointment.Categories;
              // appointmentToAdd.id = currentAppointment.GlobalAppointmentID;
              // appointmentToAdd.responseStatus = currAppointment.ResponseStatus;
              // appointmentToAdd.meetingStatus = currAppointment.MeetingStatus;

              resultInfo.push(appointmentToAdd);
  
              currAppointment = previousAppointmentsFiltered.GetNext();
            }

            _context.currentAppointment = previousAppointmentsFiltered.GetFirst();
          }

          return resultInfo;
        }

      
        /** Select the first appointment in the appointment context
        * @description Select the first appointment in the appointment context
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.selectFirstAppointment();
        * </code>
        * @path ctx.outlook.appointment.context.selectFirstAppointment
        * @method selectFirstAppointment
        * @throws {Error}
        */
        _context.selectFirstAppointment = function(){
          ctx.outlook.init();

          if(previousAppointmentsFiltered){
            currentAppointment = previousAppointmentsFiltered.GetFirst();
          }
        }

        /** Select the next appointment in the appointment context
        * @description Select the next appointment in the appointment context
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.selectNextAppointment();
        * </code>
        * @path ctx.outlook.appointment.context.selectNextAppointment
        * @method selectNextAppointment
        * @throws {Error}
        */
        _context.selectNextAppointment = function(){
          ctx.outlook.init();

          if(previousAppointmentsFiltered){
            currentAppointment = previousAppointmentsFiltered.GetNext();
          }
        }

        /** Select the previous appointment in the appointment context
        * @description Select the previous appointment in the appointment context
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.selectPreviousAppointment();
        * </code>
        * @path ctx.outlook.appointment.context.selectPreviousAppointment
        * @method selectPreviousAppointment
        * @throws {Error}
        */
        _context.selectPreviousAppointment = function(){
          ctx.outlook.init();

          if(previousAppointmentsFiltered){
            currentAppointment = previousAppointmentsFiltered.GetPrevious();
          }
        }        

        /** Select the last appointment in the appointment context
        * @description Select the last appointment in the appointment context
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.selectLastAppointment();
        * </code>
        * @path ctx.outlook.appointment.context.selectLastAppointment
        * @method selectLastAppointment
        * @throws {Error}
        */
        _context.selectLastAppointment = function(){
          ctx.outlook.init();

          if(previousAppointmentsFiltered){
            currentAppointment = previousAppointmentsFiltered.GetLast();
          }
        }

        /** Return true if a current context appointment exists
        * @description Return true if a current context appointment exists
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.isCurrentAppointmentExist();
        * </code>
        * @path ctx.outlook.appointment.context.isCurrentAppointmentExist
        * @method isCurrentAppointmentExist
        * @return {boolean} true if the current appointment exists, false otherwise.
        * @throws {Error}
        */
        _context.isCurrentAppointmentExist = function(){
          ctx.outlook.init();

          return currentAppointment !== null;
        }

        
        /**Clean the current context. Useful before to close Outlook
        * @description Clean the current context. Useful before to close Outlook
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.context.clean();
        * </code>
        * @path ctx.outlook.appointment.context.clean
        * @method clean
        * @throws {Error}
        */
        _context.clean = function(){
          ctx.outlook.init();

          previousSearchCriteria = null;
          previousAppointmentsFiltered = null;
          currentAppointment = null;
        }

        return _context;
      })();


      

        /**Create an appointment
        * @description Create an appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        *   //Here is an example to create an appointment with custom information.
        * 	var appointmentInformation = {};
        * 	appointmentInformation.subject = "Subject of the appointment";  //set a subject
        * 	appointmentInformation.location = "MyRoom";  //Name of a room
        * 	appointmentInformation.startDateTime = "13/12/19 16:30:00";  //Set a start Date. IMPORTANT Note: the format depends of your current culture
        * 	appointmentInformation.duration = 120;  //Set a duration in minutes
        * 	appointmentInformation.importance = e.outlook.OlImportance.olImportanceHigh;  //Use e.outlook.OlImportance enumeration to set an importance level.        
        * 	appointmentInformation.body = "My custom body \r\n Create another line of body";  //Set a body
        * 	appointmentInformation.busyStatus = e.outlook.OlBusyStatus.olOutOfOffice;   //Use e.outlook.OlBusyStatus enumeration to set a busyStatus
        * 	appointmentInformation.category = "myMailCategory";  //Set a category for the appointment
        * 	appointmentInformation.sensitivity = e.outlook.OlSensitivity.olConfidential;     //Use e.outlook.OlSensitivity enumeration to set a sensitivity
        * 	ctx.outlook.appointment.create(appointmentInformation);
        * 
        * //note that appointmentInformation.endDateTime can be used instead of duration.
        * //There is no property mandatory.
        * 
        *   //Here is another example to prefill the Outlook user interface about the creation of an appointment (because displayOnly is set to true)
        *   var appointment2 = {};
        *   appointment2.subject = "My appointment";
        *   appointmentInformation.startDateTime = "12/01/19 2:00:00 PM";  //IMPORTANT Note: the format depends of your current culture
        *   appointmentInformation.endDateTime = "12/01/19 4:30:00 PM";  //IMPORTANT Note: the format depends of your current culture
        * 
        *   var actionSettings = {};
        *   actionSettings.displayOnly = true;  //Prefills the Outlook user interface with the information given above.
        *   actionSettings.updateContext = true; //If true, the context is updated automatically with the new appointment.
        * 
        *   ctx.outlook.appointment.create(appointmentInformation, actionSettings);
        * 
        * </code>
        * @path ctx.outlook.appointment.create
        * @method create
        * @param {Object} myAppointmentInfo  Information to create the appointment. Supports the properties: subject, location, startDateTime, endDateTime, duration, importance, organizer, body, busyStatus, category, sensitivity
        * @param {Object} [actionSettings] Set advanced behavior for the creation of the appointment. Supports the properties: 'displayOnly' (true/false)(default=false) to don't send by only display the filled appointment and 'updateContext' (true/false)(default=false) to update the appointment context with the new appointment.
        * @throws {Error}
        */
        _appointment.create = function(myAppointmentInfo, actionSettings) {
          ctx.notifyAction('ctx.outlook.appointment.create');

          ctx.outlook.init();

          try {
            var myAppointment = _outlookApp.CreateItem(e.outlook.itemType.Calendar);

            if(myAppointmentInfo){
              for (var property in myAppointmentInfo) {
                if (myAppointmentInfo.hasOwnProperty(property)) {
                  var propertyValue = myAppointmentInfo[property];
                  if(propertyValue === undefined){
                    continue;
                  }

                  switch (property) {
                    case "subject":
                      myAppointment.Subject = propertyValue;
                      break;
                    case "location":
                      myAppointment.Location = propertyValue;
                      break;
                    case "startDateTime" :
                      myAppointment.Start = propertyValue; // e.g. English culture "11/29/19 3:30:00 PM"
                      break;
                    case "endDateTime" :
                      myAppointment.End = propertyValue; // e.g. English culture "11/30/19 8:30:00 AM"
                      break;
                    case "duration":
                      if(typeof(propertyValue) =="number"){
                        myAppointment.Duration = propertyValue;
                      }
                      break;
                    case "importance":
                      myAppointment.Importance = propertyValue;  //e.g. e.outlook.OlImportance.olImportanceHigh;
                      break;
                    case "organizer":
                      myAppointment.Organizer = propertyValue;
                      break;
                    case "body":
                      myAppointment.Body = propertyValue;
                      break;
                    case "busyStatus":
                      myAppointment.BusyStatus = propertyValue; //e.outlook.OlBusyStatus.olOutOfOffice
                    break;
                    case "sensitivity":
                      myAppointment.Sensitivity = propertyValue;
                    break;
                    case "category":
                    case "categories":
                      myAppointment.Categories = propertyValue;
                    break;
                    default:
                      break;
                  }
                }
              }
            }

            if(actionSettings.updateContext){
              _appointment.context.clean();
              _appointment.context.setCurrentAppointment(myAppointment);
            }
            
            if(actionSettings && actionSettings.displayOnly){
              myAppointment.Display();
            }
            else{
              myAppointment.Save();
            }
            
          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.appointment.create] Failed to create a new appointment: " + err.description);
          }
        }

          /**Returns the start dateTime of the current context appointment
          * @description Returns the start dateTime of the current context appointment
          * <wrap help> //Example://</wrap>
          * <code javascript>
          * 	ctx.outlook.appointment.getStartDateTime();
          * </code>
          * @path ctx.outlook.appointment.getStartDateTime
          * @method getStartDateTime
          * @return {string} startDateTime of the current context appointment
          * @throws {Error}
          */
        _appointment.getStartDateTime = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Start;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getStartDateTime] Failed to get the start DateTime of the appointment: " + err.description);
          }
        }

          /**Returns the duration of the current context appointment
          * @description Returns the duration of the current context appointment
          * <wrap help> //Example://</wrap>
          * <code javascript>
          * 	ctx.outlook.appointment.getDuration();
          * </code>
          * @path ctx.outlook.appointment.getDuration
          * @method getDuration
          * @return {number} duration in minutes of the current context appointment
          * @throws {Error}
          */
        _appointment.getDuration = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Duration;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getDuration] Failed to get the duration of the appointment: " + err.description);
          }
        }

        /**Returns the body of the current context appointment
        * @description Returns the body of the current context appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.getBody();
        * </code>
        * @path ctx.outlook.appointment.getBody
        * @method getBody
        * @return {string} body of the current context appointment
        * @throws {Error}
        */
        _appointment.getBody = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Body;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getBody] Failed to get the body of the appointment: " + err.description);
          }
        }

        
        /**Sets the body of the current context appointment
        * @description Sets the body of the current context appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.setBody("newBody for the appointment \r\n New line.");
        * </code>
        * @path ctx.outlook.appointment.setBody
        * @method setBody
        * @param {Object} newBody New body to set to the current context appointment
        * @throws {Error}
        */
        _appointment.setBody = function(newBody){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              _appointment.context.getCurrentAppointment().Body = newBody;
              _appointment.context.getCurrentAppointment().Save();
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.setBody] Failed to set the body of the appointment: " + err.description);
          }
        }

        /**Appends text in the text body of the current context appointment
        * @description Appends text in the text body of the current context appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.appendBody("textToAppend");
        * 
        * Important: Note that the body will be switch to Text format (maybe instead of HTML) if you use this function.
        * </code>
        * @path ctx.outlook.appointment.appendBody
        * @method appendBody
        * @param {Object} textToAppend  Text which should be appended in the current context appointement.
        * Important: Note that the body will be switch to Text (maybe instead of HTML) if you use this function.
        * @throws {Error}
        */
        _appointment.appendBody = function(textToAppend){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              _appointment.context.getCurrentAppointment().Body = textToAppend + "\r\n" + _appointment.context.getCurrentAppointment().Body;
              _appointment.context.getCurrentAppointment().Save();
            }
            else{
              throw new Error("The context does not contain any current appointment.");
            }
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.appendBody] Failed to set the body of the appointment: " + err.description);
          }
        }

        /**Gets the categories of the current appointment
        * @description Gets the categories of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.getCategories();
        * </code>
        * @path ctx.outlook.appointment.getCategories
        * @method getCategories
        * @return {string} Categories of the current context appointment.
        * @throws {Error}
        */
        _appointment.getCategories = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Categories;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getCategories] Failed to get the categories of the appointment: " + err.description);
          }
        }

        /**Sets the categories of the current appointment
        * @description Sets the categories of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.setCategories("Category1");
        * 
        * Note that if you want to set several categories, the separator (generally ',' or ';') between the different categories depend about your current culture. To know your separator, you can firt use the method ctx.outlook.appointment.getCategories and check the separator in the corresponding value.
        * </code>
        * @path ctx.outlook.appointment.setCategories
        * @method setCategories
        * @throws {Error}
        */
        _appointment.setCategories = function(newCategories){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              _appointment.context.getCurrentAppointment().Categories = newCategories;
              _appointment.context.getCurrentAppointment().Save();
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.setCategories] Failed to set the categories of the appointment: " + err.description);
          }
        }

        /**Gets the subject of the current appointment
        * @description Gets the subject of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.getSubject();
        * </code>
        * @path ctx.outlook.appointment.getSubject
        * @method getSubject
        * @throws {Error}
        */
        _appointment.getSubject = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Subject;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getSubject] Failed to get the subject of the appointment: " + err.description);
          }
        }

        /**Set the subjet of the current appointment
        * @description Set the subjet  of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.setSubject("New Subject");
        * </code>
        * @path ctx.outlook.appointment.setSubject
        * @method setSubject
        * @throws {Error}
        */
        _appointment.setSubject = function(newSubject){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              _appointment.context.getCurrentAppointment().Subject = newSubject;
              _appointment.context.getCurrentAppointment().Save();
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.setSubject] Failed to set the subject of the appointment: " + err.description);
          }
        }

        /**Get the response status of the current appointment
        * @description Get the response status of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.getResponseStatus();
        * </code>
        * @path ctx.outlook.appointment.getResponseStatus
        * @method getResponseStatus
        * @return {e.outlook.OlResponseStatus} Returns the response status equals to one value of e.outlook.OlResponseStatus
        * @throws {Error}
        */
        _appointment.getResponseStatus = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().ResponseStatus;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getResponseStatus] Failed to get the response status of the appointment: " + err.description);
          }
        }

        /**Get the sensitivity of the current appointment
        * @description Get the sensitivity of the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.getSensitivity();
        * </code>
        * @path ctx.outlook.appointment.getSensitivity
        * @method getSensitivity
        * @return {e.outlook.OlSensitivity} Returns the sensitivity of the current appointment equals to one value of e.outlook.OlSensitivity
        * @throws {Error}
        */        
        _appointment.getSensitivity = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              return _appointment.context.getCurrentAppointment().Sensitivity;
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getSensitivity] Failed to get the sensitivity of the appointment: " + err.description);
          }
        }

        /** Reschedule the current appointment
        * @description Reschedule the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.reschedule("12/17/2019 5:00 PM", 45);  //IMPORTANT Note: the format depends of your current culture
        * </code>
        * @path ctx.outlook.appointment.reschedule
        * @method reschedule
        * @param {string} [newDateTime] Start Date to reschedule the appointment. Note: the format depends of your current culture
        * @param {number} [newDuration] Duration in minutes for the rescheduling
        * @param {string} [endDateTime] End Date to reschedule the appointment. Note: the format depends of your current culture.
        * @throws {Error}
        */    
        _appointment.reschedule = function(newDateTime, newDuration, endDateTime){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              if(newDateTime !==undefined){
                _appointment.context.getCurrentAppointment().Start = newDateTime;
              }              

              if(newDuration !== undefined){
                _appointment.context.getCurrentAppointment().Duration = newDuration;
              }

              if (endDateTime !== undefined){
                _appointment.context.getCurrentAppointment().End = endDateTime;
              }
              
              _appointment.context.getCurrentAppointment().Save();
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getSensitivity] Failed to get the sensitivity of the appointment: " + err.description);
          }
        }

        /**Get information about the current appointment
        * @description Get information about the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        *   //Get information about an appointment
        * 	var appointmentInfo = ctx.outlook.appointment.get();
        * </code>
        * @path ctx.outlook.appointment.get
        * @method get
        * @return {Object} appointmentInformation  Information about the current context appointment. Supports the properties: subject, location, startDateTime, endDateTime, duration, importance, body, busyStatus, categories, sensitivity
        * @throws {Error}
        */
        _appointment.get = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              var returnInfo = {};

              returnInfo.subject = _appointment.context.getCurrentAppointment().Subject;
              returnInfo.location = _appointment.context.getCurrentAppointment().Location;
              returnInfo.startDateTime = _appointment.context.getCurrentAppointment().Start;
              returnInfo.endDateTime = _appointment.context.getCurrentAppointment().End;
              returnInfo.duration = _appointment.context.getCurrentAppointment().Duration;
              returnInfo.importance = _appointment.context.getCurrentAppointment().Importance;
              returnInfo.body = _appointment.context.getCurrentAppointment().Body;
              returnInfo.busyStatus = _appointment.context.getCurrentAppointment().BusyStatus;
              returnInfo.sensitivity = _appointment.context.getCurrentAppointment().Sensitivity;
              returnInfo.categories = _appointment.context.getCurrentAppointment().Categories;

              return returnInfo;              
            }             
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.get] Failed to get information about the appointment: " + err.description);
          } 
        }
        
        /**Update the current appointment
        * @description Update the current appointment
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	var newAppointmentInformation = {};
        * 	newAppointmentInformation.subject = "Subject of the appointment";
        * 	newAppointmentInformation.location = "MyRoom";
        * 	newAppointmentInformation.startDateTime = "13/12/19 16:30:00";  //IMPORTANT Note: the format depends of your current culture
        * 	newAppointmentInformation.duration = 120;  //2 hours
        * 	newAppointmentInformation.importance = e.outlook.OlImportance.olImportanceHigh;
        * 	newAppointmentInformation.body = "My custom body \r\n Create another line of body";
        * 	newAppointmentInformation.busyStatus = e.outlook.OlBusyStatus.olOutOfOffice;
        * 	newAppointmentInformation.category = "myMailCategory";
        * 	newAppointmentInformation.sensitivity = e.outlook.OlSensitivity.olConfidential;
        * 	ctx.outlook.appointment.update(newAppointmentInformation);
        * 
        * //note that newAppointmentInformation.endDateTime can be used instead of duration.
        * //There is no property mandatory.
        * </code>
        * @path ctx.outlook.appointment.update
        * @method update
        * @param {Object} newAppointmentInformation  Information to update the appointment. Supports the properties: subject, location, startDateTime, endDateTime, duration, importance, body, busyStatus, category, sensitivity
        * @throws {Error}
        */
        _appointment.update = function(newAppointmentInformation){ 
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              for (var property in newAppointmentInformation) {
                if (newAppointmentInformation.hasOwnProperty(property) && property !== undefined) {
                  switch (property) {
                    case "subject":
                      _appointment.context.getCurrentAppointment().Subject = newAppointmentInformation[property];
                      break;
                    case "location":
                      _appointment.context.getCurrentAppointment().Location = newAppointmentInformation[property];
                      break;
                    case "startDateTime" :
                      _appointment.context.getCurrentAppointment().Start = newAppointmentInformation[property];
                      break;
                    case "endDateTime" :
                      _appointment.context.getCurrentAppointment().End = newAppointmentInformation[property];
                      break;
                    case "duration":
                      _appointment.context.getCurrentAppointment().Duration = newAppointmentInformation[property];
                      break;
                    case "importance":
                      _appointment.context.getCurrentAppointment().Importance = newAppointmentInformation[property];
                      break;
                    case "body":
                      _appointment.context.getCurrentAppointment().Body = newAppointmentInformation[property];
                      break;
                    case "busyStatus":
                      _appointment.context.getCurrentAppointment().BusyStatus = newAppointmentInformation[property];
                    break;
                    case "sensitivity":
                      _appointment.context.getCurrentAppointment().Sensitivity = newAppointmentInformation[property];
                    break;
                    case "category":
                    case "categories":
                      _appointment.context.getCurrentAppointment().Categories = newAppointmentInformation[property];
                    break;
                    default:
                      break;
                  }
                }
              }
              
              _appointment.context.getCurrentAppointment().Save();
            }             
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.update] Failed to update the appointment: " + err.description);
          }          
        }

        /**Forward an appointment
        * @description
        * <wrap help> //Examples://</wrap>
        * <code javascript>
        * 	var forwardingInformation = {};
        * 	forwardingInformation.to_recipients = "email1@factory.com; email2@factory.com; email3@factory.com";
        * 	forwardingInformation.cC_recipients = "email4@factory.com; email5@factory.com";
        * 	forwardingInformation.bCC_recipients = "email6@factory.com"        
        * 	ctx.outlook.appointment.forward(forwardingInformation);
        * 
        *  ___________________
        *   Another example to fill and display only  
        *   var forwardingInformation = {};
        * 	forwardingInformation.to_recipients = "email1@factory.com; email2@factory.com; email3@factory.com";
        * 	forwardingInformation.cC_recipients = "email4@factory.com; email5@factory.com";
        * 	forwardingInformation.bCC_recipients = "email6@factory.com"        
        * 
        *   var actionSettings = {};
        *   var actionSettings.displayOnly = true;
        * 
        *   ctx.outlook.appointment.forward(forwardingInformation, actionSettings);
        * 
        * </code>
        * @path ctx.outlook.appointment.forward
        * @method create
        * @param {Object} forwardingInformation  Information to forward the appointment. Supports the properties: 'to_recipients', 'cC_recipients' and 'bCC_recipients'
        * @param {Object} [actionSettings] Set advanced behavior for the creation of the appointment. Supports the properties: 'displayOnly' (true/false)(default=false) to don't send by only display the filled appointment
        * @throws {Error}
        */
        _appointment.forward = function(forwardingInformation, actionSettings){
          ctx.notifyAction('ctx.outlook.appointment.forward');
        
          try {
            ctx.outlook.init();

            var myAppointment;
            if(!_appointment.context.getCurrentAppointment()){
              throw new Error("The context does not contain any current appointment.");
            }
            else{
              myAppointment = _appointment.context.getCurrentAppointment();
            }            
  
            var mailItemToFoward = myAppointment.ForwardAsVcal();
            
            for (var property in forwardingInformation) {
              if (forwardingInformation.hasOwnProperty(property)) {
                switch (property){
                  case "to_recipients":
                    if(forwardingInformation[property]){
                      var mandatoryRecipients = forwardingInformation[property].split(";");
  
                      for (var recipientIndex = 0; recipientIndex < mandatoryRecipients.length; recipientIndex++) {
                        var currRecipient = mandatoryRecipients[recipientIndex];
                        var myRecipientTo = mailItemToFoward.Recipients.Add(currRecipient);
                        myRecipientTo.Type = e.outlook.OlMailRecipient.olTo;
                      }
                    }
                  break;
                  case "cC_recipients":
                    if(forwardingInformation[property]){
                      var optionalRecipients = forwardingInformation[property].split(";");
  
                      for (var recipientIndex = 0; recipientIndex < optionalRecipients.length; recipientIndex++) {
                        var currRecipient = optionalRecipients[recipientIndex];
                        var myRecipientCc = mailItemToFoward.Recipients.Add(currRecipient);
                        myRecipientCc.Type = e.outlook.OlMailRecipient.olCC;
                      }
                    }
                  break;
                  case "bCC_recipients":
                      if(forwardingInformation[property]){
                        var resourceRecipients = forwardingInformation[property].split(";");
    
                        for (var recipientIndex = 0; recipientIndex < resourceRecipients.length; recipientIndex++) {
                          var currRecipient = resourceRecipients[recipientIndex];
                          var myRecipientBcc = mailItemToFoward.Recipients.Add(currRecipient);
                          myRecipientBcc.Type = e.outlook.OlMailRecipient.olBCC;
                        }
                      }
                  break;
                }
              }
            }
        
            mailItemToFoward.Recipients.ResolveAll();
            
            if(actionSettings && actionSettings.displayOnly){
              mailItemToFoward.Display();
            }
            else{
              mailItemToFoward.Send();
            }            
    
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.meeting.forward] Failed to remove the appointment: " + err.description);
          }
        }

        /**Delete the current appointment 
        * @description Delete the current appointment 
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.deleteItem();
        * </code>
        * @path ctx.outlook.appointment.deleteItem
        * @method deleteItem
        * @throws {Error}
        */   
        _appointment.deleteItem = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              _appointment.context.getCurrentAppointment().Delete();
            }              
            else{
              throw new Error("The context does not contain any current appointment.");
            }              
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.deleteItem] Failed to remove the appointment: " + err.description);
          }
        }

        /** Accept the current appointment and send an email to inform the organizer.
        * @description Accept the current appointment and send an email to inform the organizer.
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.accept();
        * </code>
        * @path ctx.outlook.appointment.accept
        * @method accept
        * @throws {Error}
        */   
        _appointment.accept = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              var myResponse = _appointment.context.getCurrentAppointment().Respond(e.outlook.OlResponseStatus.olResponseAccepted);
              myResponse.Send();
            }
            else{
              throw new Error("The context does not contain any current appointment.");
            }         
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.accept] Failed to accept the appointment: " + err.description);
          }
        }

        /** Decline the current appointment and send an email to inform the organizer.
        * @description Decline the current appointment and send an email to inform the organizer.
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * 	ctx.outlook.appointment.decline();
        * </code>
        * @path ctx.outlook.appointment.decline
        * @method decline
        * @throws {Error}
        */  
        _appointment.decline = function(){
          try {
            ctx.outlook.init();

            if(_appointment.context.getCurrentAppointment()){
              var myResponse = _appointment.context.getCurrentAppointment().Respond(e.outlook.OlResponseStatus.olResponseDeclined);
              myResponse.Send();
            }
            else{
              throw new Error("The context does not contain any current appointment.");
            }   
          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.decline] Failed to decline the appointment: " + err.description);
          }
        }

        /** Get appointments information from a time slot
        * @description Get appointments information from a time slot
        * <wrap help> //Example://</wrap>
        * <code javascript>
        *   var searchParameters = {};
        *   searchParameters.startDateTime = "12/16/2019 8:00 AM"; //Note: the format depends of your current culture
        *   searchParameters.endDateTime = "12/20/2019 8:00 PM"; //Note: the format depends of your current culture
        * 	var result = ctx.outlook.appointment.getAppointmentsInfoFromTimeSlot(searchParameters);
        * </code>
        * @path ctx.outlook.appointment.getAppointmentsInfoFromTimeSlot
        * @method getAppointmentsInfoFromTimeSlot
        * @param {Object} searchParameters Object containing the search parameters. Supports 'startDateTime' (culture depend) and 'endDateTime' (culture depend)
        * @return {Array} information about corresponding appointments.
        * @throws {Error}
        */    
        _appointment.getAppointmentsInfoFromTimeSlot = function(searchParameters){
          try {
            //The search in Outlook is not working when includeRecurrences is set to false, so for the moment, this option is removed in order to understand what's happen.
            ctx.outlook.init();

            var calendarFolder = _outlookApp.Session.GetDefaultFolder(e.outlook.OlDefaultFolders.olFolderCalendar);
            var filteringCriteria = "[Start] >= '" + searchParameters.startDateTime + "' AND [END] <= '" + searchParameters.endDateTime + "'";
            var allAppointments = calendarFolder.Items;
            // if(searchParameters.includeRecurrences == false){
            //   allAppointments.IncludeRecurrences = false;
            // }              
            // else{
              allAppointments.IncludeRecurrences = true;
            // }              

            allAppointments.Sort("[Start]");

            var filteredAppointments = allAppointments.Restrict(filteringCriteria);
            var result = new Array();

            if(filteredAppointments.Count >0){
              var currAppointment = filteredAppointments.GetFirst();
              while (currAppointment !== null) {
                var appointmentToAdd = {};
                appointmentToAdd.subject = currAppointment.Subject;
                appointmentToAdd.startTime = currAppointment.Start;
                appointmentToAdd.endTime = currAppointment.End;
                appointmentToAdd.category = currAppointment.Categories;
                appointmentToAdd.duration = currAppointment.Duration;

                result.push(appointmentToAdd);

                currAppointment = filteredAppointments.GetNext();
              }
            }
            
            return result;

          } catch (err) {
            throw new Error(e.error.KO, "[ctx.outlook.appointment.getAppointmentsFromTimeSlot] Failed to decline the appointment: " + err.description + " Input parameters were: " + searchParameters.startDateTime + " and " + searchParameters.endDateTime);
          }
        }
      
      return _appointment;
    })(),

    store : (function () {
      var _store = {};
            
      /**
      * Enumerate Stores from current Outlook instance
      * @description
      * <wrap help> //Example://</wrap>
      * <code javascript> var myStores = ctx.outlook.store.enumerateStores();</code>
      * @path ctx.outlook.store.enumerateStores
      * @method enumerateStores
      * @returns Returns an array containing information on the stores. Currently "storeId" and "displayName" properties can be used to get information on the stores. Note that additional properties could be added later if needed.
      */
      _store.enumerateStores = function(){
        ctx.notifyAction('ctx.outlook.store.enumerateStores');

        try {
          ctx.outlook.init();

          var stores = _outlookApp.Session.Stores;
          var storeToReturn = new Array();
          for (var storeIndex = 1; storeIndex <= stores.Count; storeIndex++) {
            var currStore = stores.Item(storeIndex);
            
            storeToReturn.push({ storeId : currStore.StoreID, displayName : currStore.DisplayName});
          }
  
          return storeToReturn;  
        } catch (err) {
          throw new Error(e.error.KO, "[ctx.outlook.store.enumerateStore] Failed to enumerate the stores: " + err.description);
        }
      }

      return _store;
    })(),

    account : (function () {
      var _account = {};

      /**
      * Enumerate Accounts from current Outlook instance
      * @description
      * <wrap help> //Example://</wrap>
      * <code javascript>res = ctx.outlook.account.enumerateAccounts();</code>
      * @path ctx.outlook.account.enumerateAccounts
      * @method enumerateAccounts
      * @returns Returns an array containing information on the accounts. Currently "accountId" and "displayName" properties can be used to get information on the accounts. Note that additional properties could be added later if needed.
      */
      _account.enumerateAccounts = function(){
        ctx.notifyAction('ctx.outlook.account.enumerateAccounts');

        try {
          ctx.outlook.init();

          var accounts = _outlookApp.Session.Accounts;
          var accountsToReturn = new Array();
          for (var accountIndex = 1; accountIndex <= accounts.Count; accountIndex++) {
            var currAccount = accounts.Item(accountIndex);
            var associatedAccount = currAccount.DeliveryStore;
            accountsToReturn.push({ accountId : associatedAccount.StoreID, displayName : currAccount.DisplayName});
          }
  
          return accountsToReturn;  
        } catch (err) {
          throw new Error(e.error.KO, "[ctx.outlook.account.enumerateAccounts] Failed to enumerate the accounts: " + err.description);
        }
      }

      return _account;
    })(),

    /**
    * Meeting class
    * @class   outlook.meeting
    * @path    ctx.outlook.meeting
    */
   meeting : (function() {
    var _meeting = {};

      /**
      * Create a meeting
      * @description Create a meeting
      * <wrap help> //Example://</wrap>
      * <code javascript>
      *   //Here is an example to create a meeting with custom information.
      *   var meetingInformation = {};
      * 	meetingInformation.subject = "Subject of the meeting";  //Set a subject
      * 	meetingInformation.location = "MyRoom";  //Name of a room
      * 	meetingInformation.startDateTime = "13/12/19 16:30:00";  //Set a startDate. IMPORTANT Note: the format depends of your current culture
      * 	meetingInformation.duration = 120;  //Set a duration in minutes.
      * 	meetingInformation.importance = e.outlook.OlImportance.olImportanceHigh;  //Use e.outlook.OlImportance enumeration to set an importance level.
      *   meetingInformation.requiredAttendees = "FirstName1 LastName1; FirstName2 LastName 2; firstname3.lastname3@company.com";  //Fill required Attendees
      *   meetingInformation.optionalAttendees = "FirstName4 LastName4; firstname5.lastname5@company.com";  //Fill optional attendees
      *   meetingInformation.resources = "resource name";  //Needed resources
      *   meetingInformation.reminderSet = true;  //set a reminder
      *   meetingInformation.reminderMinutesBeforeStart = 60;  //define the reminder in minutes
      *   meetingInformation.organizer = "MyFirstName MyLastName";  //Set the name of the organizer
      * 	meetingInformation.body = "My custom body \r\n Create another line of body";  //set a body
      * 	meetingInformation.busyStatus = e.outlook.OlBusyStatus.olOutOfOffice;   //Use e.outlook.OlBusyStatus enumeration to set a busyStatus
      * 	meetingInformation.category = "myMailCategory";  //Set a category for the meeting
      * 	meetingInformation.sensitivity = e.outlook.OlSensitivity.olConfidential;  //Use e.outlook.OlSensitivity enumeration to set a sensitivity
      * 	ctx.outlook.meeting.create(meetingInformation);
      * 
      *   //note that meetingInformation.endDateTime can be used instead of duration.
      *   
      *   //Another example to prefill the meeting user interface in the current instance of Outlook
      *   var meetingInformation = {};
      *   meetingInformation.subject = "My meeting";
      *   meetingInformation.startDateTime = "12/01/19 2:00:00 PM";  //IMPORTANT Note: the format depends of your current culture
      *   meetingInformation.endDateTime = "12/01/19 4:30:00 PM";  //IMPORTANT Note: the format depends of your current culture
      *   meetingInformation.requiredAttendees = "FirstName1 LastName1; FirstName2 LastName 2; firstname3.lastname3@company.com";
      *   meetingInformation.optionalAttendees = "FirstName4 LastName4; firstname5.lastname5@company.com";
      *   meetingInformation.resources = "resource name";
      *   meetingInformation.reminderSet = true;
      *   meetingInformation.reminderMinutesBeforeStart = 60;
      * 
      *   var creationSettings = {};
      *   creationSettings.displayOnly = true;  //does not send the meeting but open the meeting interface pre-filled in your Outlook instance      
      * 
      *   ctx.outlook.meeting.create(meetingInformation, creationSettings);
      * 
      * </code>
      * @path ctx.outlook.meeting.create
      * @method create
      * @param {Object} meetingInformation  Information to create the meeting. Supports the properties: subject, location, startDateTime, endDateTime, duration, importance, organizer, body, busyStatus, category, sensitivity, reminderSet, reminderMinutesBeforeStart, requiredAttendees, optionalAttendees, resources
      * @param {Object} [creationSettings] Set advanced behavior for the creation of the meeting. Supports the properties: 'displayOnly' (true/false)(default=false) to don't send the meeting but only display the filled meeting user interface in Outlook
      * @throws {Error}
      * @returns Create a meeting and send it or Fill meeting information and display it according to the creationSettings 
      */
      _meeting.create = function(meetingInformation, creationSettings) {
        ctx.notifyAction('ctx.outlook.meeting.create');

        try {
          ctx.outlook.init();

          if(!meetingInformation){
            throw new Error(e.error.InvalidArgument, "[ctx.outlook.meeting.create] Failed to create a new meeting. The first parameter is not correct.");
          }

          var myMeeting = _outlookApp.CreateItem(e.outlook.itemType.Calendar);
          myMeeting.MeetingStatus = e.outlook.OlMeetingStatus.olMeeting;
          var recipientSeparator = ';';
          for(var property in meetingInformation){
            if (meetingInformation.hasOwnProperty(property)){
              var propertyValue = meetingInformation[property];
              if(propertyValue === undefined){
                continue;
              }

              switch (property) {
                case "subject":
                  myMeeting.Subject = propertyValue;
                  break;
                case "location":
                  myMeeting.Location = propertyValue;
                  break;
                case "startDateTime":
                  myMeeting.Start = propertyValue;
                  break;
                case "duration":
                  myMeeting.Duration = propertyValue;
                  break;
                case "endDateTime":
                  myMeeting.End = propertyValue;
                  break;
                case "importance":
                  myMeeting.Importance = propertyValue;
                  break;
                case "organizer":
                  myMeeting.Organizer = propertyValue;
                  break;
                case "body":
                  myMeeting.Body = propertyValue;
                  break;
                case "sensitivity" :
                  myMeeting.Sensitivity = propertyValue;
                  break;
                case "busyStatus":
                  myMeeting.BusyStatus = propertyValue;
                  break;
                case "reminderSet":
                  myMeeting.ReminderSet = propertyValue;
                  break;
                case "reminderMinutesBeforeStart":
                  myMeeting.ReminderMinutesBeforeStart = propertyValue;
                  break;
                case "category":
                case "categories":
                  myMeeting.Categories = propertyValue;
                  break;
                case "requiredAttendees" :
                  var requiredAttendees = meetingInformation.requiredAttendees.split(recipientSeparator);

                  for (var recipientIndex = 0; recipientIndex < requiredAttendees.length; recipientIndex++) {
                    var currAttendee = requiredAttendees[recipientIndex];
                    var myAttended = myMeeting.Recipients.Add(currAttendee);
                    myAttended.Type = e.outlook.OlMeetingRecipientType.olRequired;
                  }
                  break;
                case "optionalAttendees":
                  var optionalAttendees = meetingInformation.optionalAttendees.split(recipientSeparator);

                  for (var recipientIndex = 0; recipientIndex < optionalAttendees.length; recipientIndex++) {
                    var currAttendee = optionalAttendees[recipientIndex];
                    var myAttended = myMeeting.Recipients.Add(currAttendee);
                    myAttended.Type = e.outlook.OlMeetingRecipientType.olOptional;
                  }
                  break;
                case "resources":
                  var resources = meetingInformation.resources.split(recipientSeparator);

                  for (var recipientIndex = 0; recipientIndex < resources.length; recipientIndex++) {
                    var currResource = resources[recipientIndex];
                    var myResource = myMeeting.Recipients.Add(currResource);
                    myResource.Type = e.outlook.OlMeetingRecipientType.olResource;
                  }
                  break;
                default:
                  ctx.log("The property named " + property + " is not recognized. Note that the case is important.")
                  break;
              }
            }
          }

          myMeeting.Recipients.ResolveAll();

          if(creationSettings && creationSettings.displayOnly){
            //Attended mode
            myMeeting.Display();
          }
          else{
            //Non attended mode
            myMeeting.Send();
          }
          
          //Release comObjects
          myMeeting = null;
        } catch(err){
          throw new Error(e.error.KO, "[ctx.outlook.meeting.create] Failed to create a new meeting: " + err.description);
        }
      }

   
    return _meeting;
  })(),

   /**
    * @ignore
    * Contact class
    * @path ctx.outlook.contact
    * @module outlook
    * @class contact
    */
    contact :(function() {
      var _contact = {

        //create : function(object) {},
      /**
        * Creates a new contact
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>res = ctx.outlook.contact.create({FullName : 'prenomTest nomTest',Email1Address : 'testmail@sap.com',Body:'ceci est le corps du contact',
        *       BusinessAddressCity = 'Paris',BusinessAddressCountry = 'France,BusinessAddressPostalCode = '75020',BusinessAddressStreet = '1 Bis rue stendhal',
        *       Company Name = 'Contextor',MobileTelephoneNumber = '0623456789',WebPage = 'www.sap.com'});</code>
        * @see https://msdn.microsoft.com/fr-fr/library/office/ff867603.aspx
        * @path ctx.outlook.contact.create
        * @method create
        * @param {Object} object contains desired user list of task properties
        * @history
        */
        create : function(object) {
          ctx.notifyAction('ctx.outlook.contact.create');
          try{

            var refContact = _outlookApp.CreateItem(e.outlook.itemType.Contact);

            for(var index in object){
              if(index in refContact){
                refContact[index] = object[index];
              } else {
                ctx.log(index+' is not supported by outlook contact item');
              }
            }
            refContact.Save();

            _oContacts.push(refContact);

          } catch(err){
            //ctx.log(" *** ctx.outlook.contact.create(): KO *** Error : " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.contact.create] Failed to create a contact. "+ err.description);
          }
        } ,
        //show : function() {},
        /**
        * show a contact
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.contact.show(object)</code>
        * @see
        * @path ctx.outlook.contact.show
        * @method create
        * @param {Object} object contains objet contact
        * @history
        */

        show : function(object) {
          ctx.notifyAction('ctx.outlook.contact.show');
          try{
            ctx.log(" *** ctx.outlook.contact.show()" );
            object.Display();

          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.contact.show] Failed to get a contact. "+ err.description);
          }
        },
        //remove : function() {},
        /** @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.contact.remove(object)</code>
        * @see
        * @path ctx.outlook.contact.remove
        * @method remove
        * @param {Object} object contains objet contact
        * @history
        */
        remove : function(object) {
          ctx.notifyAction('ctx.outlook.contact.remove');
          try{
            ctx.log(" *** ctx.outlook.contact.remove()" );
            object.Delete()

          } catch(err){
            throw new Error(e.error.KO, "[ctx.outlook.contact.remove] Failed to get a contact. "+ err.description);
          }
        } ,
        //modify : function() {},
        /** @description
        * <wrap help> //Example://</wrap>
        * <code javascript>ctx.outlook.contact.modify(object)</code>
        * @see
        * @path ctx.outlook.contact.modify
        * @method modify
        * @param {Object} refContact contains objet modify
        * @param {Object} modifications
        * @history
        */
        modify : function(refContact, modifications) {
          for(var index in modifications){
              if(index in refContact){
                refContact[index] = modifications[index];
              } else {
                ctx.log(index+' is not supported by outlook contact item');
              }
            }
            refContact.Save();
            _oContacts.push(refContact);
        }
      };
      return _contact;
    })(),

   /**
    * @ignore
    * Distribution List class
    * @path   ctx.outlook.distributionList
    * @class  distributionList
    */
    distributionList :(function() {
      var _distributionList = {
        //create : function() {},
        //get : function() {},
        //remove : function() {},
        //modify : function() {}
      };
      return _distributionList;
    })(),

   /**
    * Folder class
    * @path   ctx.outlook.folder
    * @class  folder
    */
    folder :(function() {
      var _folder = {
        getFolderID : function(object){
          ctx.notifyAction('ctx.outlook.folder.getFolderID');
          try{
            //Definition
            var oFolder, oFolderID;

            //If no folder
            oFolder = ctx.outlook.folder.getFolder(object);

            if(oFolder == null){
              throw "no folder found";
            }

            oFolderID = oFolder.EntryID;
            return oFolderID;

          } catch(err){
            //ctx.log(" *** ctx.outlook.getFolderID(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.getFolderID] Failed to get folder id. "+ err.description);
          }
        },

        /**
        * Tests the existence of the folder with given path or name or ID in parameter
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.folder.exist({
        *   folderName:'Contextor',
        *   storeName : 'storeName@storeName.eu'
        * });</code>
        * @path ctx.outlook.folder.exist
        * @method exist
        * @param {Object} object (mandatory) folderID or folderPath or folderName\\ - (optional) folderID : string - Entry ID of folder\\ - (optional) folderName : string - folder name\\ - (optional) folderPath : string - folder path, backslahes must be doubled in the path\\ - (optional) storeID : string - storeID of outlook store
        * @return {boolean} result
        */
        exist : function(object) {
          ctx.notifyAction('ctx.outlook.folder.exist');
          try{
            //Definition
            var oFolders, oSearchedFolder, oPath, oPathFolders, oFolderPath;
            var oNamespace, oStores, oStore, oFolder, oTable, oRow, oCount, pTableContent, pSort, pDescending, pMaxRow, oStoreID;
            var found, index, row;

            //Initialization
            found = false;
            index = 1;
            oNamespace = _outlookApp.GetNameSpace("MAPI");
            oStores = oNamespace.Stores;
            oCount = oStores.count;
            oFolder = null;

            //Looking for Store
            oStore = ctx.outlook.getStore(object);

            if (oStore == null){
              return false;
            }

            if(object['storeID']!=undefined){
              oStoreID = object['storeID'];
            } else {
              oStoreID = oStore.StoreID;
            }

            if(object['folderID'] != undefined){
              oFolder=oNamespace.GetFolderFromID(object['folderID']);
            }

            if(object['folderPath'] != undefined){
              oPath = object['folderPath'];
              oPath = oPath.replace('\\\\','');
              oPathFolders = oPath.split('\\');
              oFolder=oStore.GetRootFolder();
              found=(oFolder.Name==oPathFolders[0]);
              var y;
              for(var i=1;i<oPathFolders.length && found;i++){
                y=1;
                found=false;
                oFolderPath=oFolder.Folders;
                oCount=oFolderPath.Count;
                while(!found &&y<=oCount&&y>0){
                  oFolder=oFolderPath.Item(y);
                  found=(oFolder.Name==oPathFolders[i]);
                  y++;
                }
              }

              if(found && i==oPathFolders.length){

              } else {
                oFolder = null;
              }
            }

            if(object['folderName'] != undefined){
              oFolder=oStore.GetRootFolder();
              oFolder=ctx.outlook.getFolderByName(object['folderName'],oFolder);
            }

            if(oFolder == null){
              return false;
            }
            return true;

          } catch(err){
            //ctx.log(" *** ctx.outlook.folder.exist(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.exist] Failed to test folder presence. "+ err.description);
          }
        },

        /**
        * Adds a new folder in the folder with given path or name or ID in parameter
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.folder.add({
        *   folderPath:'\\\\storeName@storeName.eu\\Inbox\\Contextor\\Test',
        *   storeName : 'storeName@storeName.eu',
        *   folder : "newFolder"
        * });
        * </code>
        * @path ctx.outlook.folder.add
        * @method add
        * @param {Object} object (mandatory) folderID or folderPath or folderName\\ - (mandatory) folder : string - name of folder to be created\\ - (optional) folderID : string - Entry ID of parent folder\\ - (optional) folderName : string - parent folder name\\ - (optional) folderPath : string - parent folder path, backslahes must be doubled in the path\\ - (optional) storeID : string - storeID of outlook store
        * @throws {Error}
        */
        add : function(object) {
          ctx.notifyAction('ctx.outlook.folder.add');
          try{
            if(object['folder']==undefined){
              throw 'folder undefined';
            }

            //Definition
            var oNamespace, oStores, oStore, oFolder, oStoreID, oCount;
            var found, index, row;

            found = false;
            index = 1;
            oNamespace = _outlookApp.GetNameSpace("MAPI");
            oStores = oNamespace.Stores;
            oCount = oStores.count;

            //Looking for Store
            oStore = ctx.outlook.getStore(object);

            if (oStore == null){
              throw 'store not recovered';
            }

            if(object['storeID']!=undefined){
              oStoreID = object['storeID'];
            } else {
              oStoreID = oStore.StoreID;
            }

            //Looking for Folder with ID
            if(object['folderID'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderID : object['folderID'], store : oStore});
            } else

            //Looking for Folder with Path
            if(object['folderPath'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderPath : object['folderPath'], store : oStore});
            } else

            //Looking for Folder with Name
            if(object['folderName'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderName : object['folderName'], store : oStore});
            }

            if(object['folderName'] == undefined && object['folderPath'] == undefined && object['folderName'] == undefined){
              oFolder = oStore.GetRootFolder();
            }

            if(oFolder == null){
              throw 'no Folder found';
            }

            oFolder.Folders.Add(object['folder']);

          } catch(err){
            //ctx.log(" *** ctx.outlook.folder.add(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.add] Failed to add a new folder. "+ err.description);
          }
        },

        /**
        * Removes the folder with given path or name or ID in parameter
        * @description
        * CAUTION : IF you want to delete a file by its name, this function will delete the FIRST found folder with that name. It is safer to use folder path or ID.
        *
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * res = ctx.outlook.folder.remove({
        *   folderPath:'\\\\storeName@storeName.eu\\Inbox\\Contextor\\Test',
        *   storeName : 'storeName@storeName.eu',
        *   folder : "newFolder"
        * });
        * </code>
        * @path ctx.outlook.folder.remove
        * @method remove
        * @param {Object} object (mandatory) folderID or folderPath or folderName\\ - (optional) folderID : string - Entry ID of folder to be deleted\\ - (optional) folderName : string - folder name of folder to be deleted\\ - (optional) folderPath : string - folder path of the folder to be deleted, backslahes must be doubled in the path\\ - (optional) storeID : string - storeID of outlook store
        * @throws {Error}
        */
        remove : function(object) {
          ctx.notifyAction('ctx.outlook.folder.remove');
          try{
            if(object['folderName'] == undefined && object['folderPath'] != undefined && object['folderName'] != undefined){
              throw 'either a folder path, name or ID must be defined';
            }

            //Definition
            var oNamespace, oStores, oStore, oFolder, oStoreID, oCount;
            var found, index, row;

            found = false;
            index = 1;
            oNamespace = _outlookApp.GetNameSpace("MAPI");
            oStores = oNamespace.Stores;
            oCount = oStores.count;

            //Looking for Store
            oStore = ctx.outlook.getStore(object);

            if (oStore == null){
              throw 'store not recovered';
            }

            if(object['storeID']!=undefined){
              oStoreID = object['storeID'];
            } else {
              oStoreID = oStore.StoreID;
            }

            //Looking for Folder with ID
            if(object['folderID'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderID : object['folderID'], store : oStore});
            } else

            //Looking for Folder with Path
            if(object['folderPath'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderPath : object['folderPath'], store : oStore});
            } else

            //Looking for Folder with Name
            if(object['folderName'] != undefined){
              oFolder = ctx.outlook.folder.getFolder({folderName : object['folderName'], store : oStore});
            }

            if(oFolder == null){
              throw 'no Folder found';
            }

            oFolder.Delete();
            //return e.error.OK;
          } catch(err){
            //ctx.log(" *** ctx.outlook.folder.Remove(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.remove] Failed to remove the folder. "+ err.description);
          }
        },

        /**
        * Gets the root folder name of the store with given path or name or ID in parameter
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript>
        *   res = ctx.outlook.folder.getRootFolderName({
        *    storeName: 'storeName@storeName.eu'
        *  } );
        *  </code>
        * @path ctx.outlook.folder.getRootFolderName
        * @method  getRootFolderName
        * @param   {Object} object List of parameters:\\ - (optional) storeID : string - store ID of outlook store\\ - (optional) storeName : string - store name of outlook store
        * @return  {string|null} Name of the store
        */
        getRootFolderName : function(object) {
          ctx.notifyAction('ctx.outlook.folder.getRootFolderName');
          try{
            //Definition
            var oNamespace, oStores, oStore, oFolder, oStoreID, oCount, oName;
            var found, index, row;

            found = false;
            index = 1;
            oNamespace = _outlookApp.GetNameSpace("MAPI");
            oStores = oNamespace.Stores;
            oCount = oStores.count;

            //Looking for Store
            oStore = ctx.outlook.getStore(object);

            if (oStore == null){
              throw 'store not recovered';
            }

            oFolder = oStore.GetRootFolder();
            oName = oFolder.Name;

            return oName;

          } catch(err){
            //ctx.log(" *** ctx.outlook.folder.getRootFolder(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.getRootFolderName] Failed to get root folder name. "+ err.description);
          }
        },

       /**
        * Gets the default inbox name of the store with given path or name or ID in parameter.
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript>
        *  res = ctx.outlook.folder.getInboxName( {
        *    storeName: 'storeName@storeName.eu'
        *  } );</code>
        * @method  getFolderName
        * @param   {Object} object List of parameters:\\ - (optional) storeID : string - store ID of outlook store\\ - (optional) storeName : string - store name of outlook store\\ - (optional) folderType : enum - e.outlook.folderItem
        * @return  {string|null} Name of the store
        * @path    ctx.outlook.folder.getFolderName
        */
        getFolderName : function(object) {
          ctx.notifyAction('ctx.outlook.folder.getInboxName');
          try{
            //Definition
            var oNamespace, oStores, oStore, oFolder, oStoreID, oCount, oName;
            var found, index, row;

            oFolder = ctx.outlook.folder.getFolder(object);
            oName = oFolder.Name;

            return oName;

          } catch(err){
            //ctx.log(" *** ctx.outlook.folder.getRootFolder(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.getInboxName] Failed to get dafault inbox name. "+ err.description);
          }
        },

        /**
        * @ignore
        * Gets an outlook folder
        * @description
        * <wrap help> //Example://</wrap>
        * <code javascript>
        * var folder = ctx.outlook.folder.getFolder({folderPath : '\\\\storename@storename.eu\\Inbox\\Contextor\\Test'});
        * var folder = ctx.outlook.folder.getFolder({folderName : 'Test'});
        * var folder = ctx.outlook.folder.getFolder({folderID : '0000000000AAAAAAAAAAAA00000000000000001234567890'});
        * </code>
        * @path  ctx.outlook.folder.getFolder
        * @method getFolder
        * @param {Object} [object] (optional) folderID : string - Entry ID of folder
        * (optional) folderName : string - folder name
        * (optional) folderPath : string - folder path, backslahes must be doubled in the path
        * (optional) storeName : string - store name
        * sample : 'fakemail@sap.com'
        * (optional) storeID : string - outlook Store id
        * (optional) folderType : enum - e.outlook.folderItem
        * @return {Object|null} Outlook folder object
        * @throws {Error}
        * @private
        */
        getFolder : function(object){
          ctx.notifyAction('ctx.outlook.folder.getFolder');
          try{
    //        if(object['folderPath']==undefined && object['folderName']==undefined && object['folderID']==undefined){
    //          throw 'folderPath or folder or folderID must be defined';
    //        }

            //Definition
            var oStore, oFolders, oSearchedFolder, oPath, oFolder, oPathFolders, oFolderPath, oCount, found, oNamespace;

            oNamespace = _outlookApp.GetNameSpace("MAPI");

            if(object['store']==undefined){
              oStore = ctx.outlook.getStore(object);
            } else {
              //internal use, if we already have the object store
              oStore = object['store'];
            }

            if(object['folderID'] != undefined){
              oFolder=oNamespace.GetFolderFromID(object['folderID']);
              return oFolder;
            }

            if(object['folderPath'] != undefined){
              oPath = object['folderPath'];
              oPath = oPath.replace('\\\\','');
              oPathFolders = oPath.split('\\');
              oFolder=oStore.GetRootFolder();
              found=(oFolder.Name==oPathFolders[0]);
              var y;
              for(var i=1;i<oPathFolders.length && found;i++){
                y=1;
                found=false;
                oFolderPath=oFolder.Folders;
                oCount=oFolderPath.Count;
                while(!found &&y<=oCount&&y>0){
                  oFolder=oFolderPath.Item(y);
                  found=(oFolder.Name==oPathFolders[i]);
                  y++;
                }
              }

              if(found && i==oPathFolders.length){
                return oFolder;
              }
            }

            if(object['folderName'] != undefined){
              oFolder=oStore.GetRootFolder();
              oFolder=ctx.outlook.getFolderByName(object['folderName'],oFolder);
              return oFolder;
            }

            if(object['folderType'] != undefined){
              oFolder = oStore.GetDefaultFolder(object['folderType']);
              return oFolder;
            }

            oFolder = oStore.GetDefaultFolder(e.outlook.folderItem.olFolderInbox);
            return oFolder;
          } catch(err) {
            //ctx.log("*** ctx.outlook.folder.getFolder(): KO *** Error " + err.description);
            throw new Error(e.error.KO, "[ctx.outlook.folder.getFolder] Failed to get folder. "+ err.description);
          }
        }
      };
      return _folder;
    })()

  };
  return _outlook;
}());