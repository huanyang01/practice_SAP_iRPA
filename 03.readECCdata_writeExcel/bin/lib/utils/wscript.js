/**
 * @module      WScript.Shell extension
 * @file        utils/wscript.js
 * @description
 *  This library contains methods to explore the registry, system variables and network.
 *
 *   * init( ) to get WScript.Shell or to create WScript.Shell.
 *   * initNetwork( ) to get WScript.Network or to create WScript.Network.
 *   * end( ) to delete the WScript.Shell and the WScript.Network.
 *   * display( ) to format the result as a string.
 *
 * Using the class registry with some methods: getKey, getKeyList, getSubKeys, getKeyBHO, getKeyDirect, getSubKeysUninstall, getIEVersion.
 *
 * Using the class shell with some methods: execute, getEnvVariable, enumEnvVariable, expandEnvString, getObject, getSpecialFolders.
 *
 * Using the class network with method: getObject.
 *
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 *
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Suppress all warnings regarding missing interface declarations for 'WScript.Shell' and 'WScript.Network'
 * @fileoverview
 * @suppress {missingProperties}
 */

/**
 * Options for the 'ctx.wscript' library
 * @namespace  ctx.options.wscript
 * @path       ctx.options.wscript
 */
ctx.options.wscript = {
  /**
   * Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
   * @property  {e.trace.level} traceLevel
   * @default   e.trace.level.None
   * @path      ctx.options.wscript.traceLevel
   */
   traceLevel: e.trace.level.None
};

/**
 * Class for WShell manipulation
 * @class       ctx.wscript
 * @constructor
 * @path        ctx.wscript
 */
ctx.wscript = (function() {
  /** @type {Object} */ 
  var _options = ctx.options.wscript;
  /** @type {WScriptShell} */ 
  var _shellObj = null;
  /** @type {WScriptNetwork} */ 
  var _networkObj = null;
  var _wscript = /** @lends ctx.wscript */{
   /**
    * Initializes the WScript library.
    * @method      init
    * @description
    *  The <wrap box>**init( )**</wrap> method of ''ctx.wscript'' class initializes the WScript library.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wscript.init( );</code>
    * @return      {boolean} ''true'' for success, otherwise ''false'' 
    * @path        ctx.wscript.init
    */
    init: function() {
      try {
        // try to get Shell object
        if (_shellObj === null) {
          _shellObj = GetObject("WScript.Shell");
        }
      } catch (ex) {
        try {
          // create Shell object
          if (_shellObj === null) {
            _shellObj = new ActiveXObject("WScript.Shell");
          }
        } catch (ex2) {
          addLog("init : Exception : " + ex2.description);
          return false;
        } // try..catch
      } // try..catch
      return true;
    },

   /**
    * Initializes the WScript network library.
    * @method      initNetwork
    * @description
    *  The <wrap box>**initNetwork( )**</wrap> method of ''ctx.wscript'' class initializes the WScript network library.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wscript.initNetwork( );</code>
    * @return      {boolean} ''true'' for success, otherwise ''false'' 
    * @path        ctx.wscript.initNetwork
    */
    initNetwork: function() {
      try {
        // try to get Shell object
        if (_networkObj === null) {
          _networkObj = GetObject("WScript.Network");
        }
      } catch (ex) {
        try {
          // create Shell object
          if (_networkObj === null) {
            _networkObj = new ActiveXObject("WScript.Network");
          }
        } catch (ex2) {
          addLog("initNetwork : Exception : " + ex2.description);
          return false;
        } // try..catch
      } // try..catch
      return true;
    },

   /**
    * Ends the WScript library.
    * @method      end
    * @description
    *  The <wrap box>**end( )**</wrap> method of ''ctx.wscript'' class ends the WScript library.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wscript.end( );</code>
    * @return      {boolean} ''true'' for success, otherwise ''false'' 
    * @path        ctx.wscript.end
    */
    end: function() {
      //addLog(" *** ctx.wscript.end() ***");
      if (_shellObj != null) {
        _shellObj = null;
      }
      if (_networkObj != null) {
        _networkObj = null;
      }
      return true;
    },

   /**
    * Formats the result as an XML string.
    * @method      display
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wscript.display( tab, "Printer", "Printers" );</code>
    *  Output should be like:
    *  <code xml> "<Printers><Printer>...</Printer>...</Printers>"</code>
    * @param       {Array<string>} tab
    * @param       {string} item Node name
    * @param       {string} category Node category
    * @path        ctx.wscript.display
    */
    display: function(tab, item, category) {
      if (category) {
        category = category.replace(/ /g,"_");
        _wscript.log('  <' + category + '>');
      }
      ctx.each(tab, function(id, node) {
        if (item)
          _wscript.log('    <' + item + '>');
        ctx.each(node, function(id, value) {
          var iReman = id.replace(/ /g,"_");
          _wscript.log('      <' + iReman + '><![CDATA[' + value + ']]></' + iReman + '>');
        });
        if (item)
          _wscript.log('    </' + item + '>');
      });
      if (category)
        _wscript.log('  </' + category + '>');
    },

   /**
    * @ignore
    * Logs a single line.
    * @method      log
    * @description
    *  <WRAP todo>
    *  <todo @cpuget>ctx._wscript.log : to remove ?</todo>\\
    *  </WRAP>
    * <wrap help> //Example://</wrap>
    *  <code javascript> 
    *    ctx._wscript.log( "</" + item + ">" );
    *  </code>
    * @param       {string} text Text value to generate
    * @return      WScript application or KO
    * @path        ctx.wscript.log
    */
    log : function(text) {
      addLog(text);
    },

    /**
     * Class gathering a set of functions to access Windows registry base
     * @class      ctx.wscript.registry
     * @path       ctx.wscript.registry
     */
    registry: (function() {
      var _registry =
      {
       /**
        * Reads a registry key.
        * @method      getKey
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> bKey = ctx.wscript.registry.getKey( keyPath );</code>
        * @param       {string} keyPath Registry path
        * @path        ctx.wscript.registry.getKey
        */
        getKey : function (keyPath) {
          _wscript.init();
          var baseUrl="";
          try{
            var regValue = _shellObj.RegRead(keyPath);
            if(regValue != "" && regValue!= undefined){
              baseUrl=regValue;
              //addLog("getKey " + baseUrl + " pour la clé " + keyPath);
            }
            return baseUrl;
          }
          catch(ex){
            //addLog("getKey : Exception : " + ex.description);
            return "NotExist";
          }
        },

       /**
        * Returns an array with the subkeys contain.
        * @method       getKeyList
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> bKey = ctx.wscript.registry.getKeyList( sBaseKey, sKey, attribute );</code>
        * @param        {string} sBaseKey
        * @param        {string} sKey
        * @param        {string} attribute
        * @path         ctx.wscript.registry.getKeyList
        */
        getKeyList : function(sBaseKey , sKey , attribute)
        {
          var KLM = 0x80000002;
          var tab = [];
          var bKey = '';
          var rtn = _registry.getSubKeys('.', sBaseKey ,KLM);
          if ( rtn.Results == 0 )
            {
              for (var idx=0;idx<rtn.SubKeys.length;idx++)
              {
              try
              {
                //addLog("getKey indice : " + idx + " contenu" + rtn.SubKeys[idx]);
                var elem = {};
                var subKey = rtn.SubKeys[idx];
                if (attribute == "") {
                  bKey =  _registry.getKey (sKey + "\\"+ subKey + "\\");
                } else {
                  bKey =  _registry.getKey (sKey + "\\"+ subKey + "\\" + attribute);
                }
                //addLog("getKey donnees : " + bKey + "pour sous clé "+ subKey );
                elem[subKey] = bKey ;
                tab.push(elem);
              }
              catch(ex)
              {
                addLog("getKey exception : " + ex.description );
              }
              }
            }
          return tab;
        },

       /**
        * Returns an array with names of any subkeys.
        * @method      getSubKeys
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> bKey = ctx.wscript.registry.getSubKeys( '.', sBaseKey, KLM );</code>
        * @param       {string} strComputer Current computer (by default, '.')
        * @param       {string} strRegPath
        * @param       {number} HKLM
        * @path        ctx.wscript.registry.getSubKeys
        */
        getSubKeys : function (strComputer, strRegPath, HKLM)
        {
          try
          {
            var aNames = null;
            strComputer = strComputer || '.';
            var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator");
            var objService     = objLocator.ConnectServer(strComputer, "root\\default");
            var objReg         = objService.Get("StdRegProv");
            var objMethod      = objReg.Methods_.Item("EnumKey");
            var objInParam     = objMethod.InParameters.SpawnInstance_();
            var retVal;
            objInParam.hDefKey = HKLM;
            objInParam.sSubKeyName = strRegPath;
            var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
            switch(objOutParam.ReturnValue)
            {
              case 0:          // Success
                aNames = (objOutParam.sNames != null) ? objOutParam.sNames.toArray(): null;
            retVal = 0;
                break;

              case 2:        // Not Found
                aNames = null;
            retVal = 1;
                break;
            }
            return { Results : retVal, SubKeys : aNames };
          }
         catch(ex)
          {
            return { Results: ex.number, SubKeys : ex.description  }
          }
        },

       /**
        * Returns an array with the BHO state (locked or unlocked).
        * @method      getKeyBHO
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> tab = ctx.wscript.registry.getKeyBHO( );</code>
        * @path        ctx.wscript.registry.getKeyBHO
        */
        getKeyBHO : function()
        {
          var sKey = "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects";
          var sBaseKey = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\explorer\\Browser Helper Objects";
          var sBaseKey2 = "Software\\Microsoft\\Windows\\CurrentVersion\\Ext\\Settings";
          //var sBaseKeyIE = "Software\\Microsoft\\Internet Explorer\\Approved Extensions";
          var KLM = 0x80000002;
          var HKCU = 0x80000001;
          var tab = [];
          var rtn = _registry.getSubKeys(".", sBaseKey ,KLM);
          var rtn2 = _registry.getSubKeys(".", sBaseKey2 ,HKCU);
          //var rtIE =  _registry.getSubKeys(".", sBaseKeyIE ,HKCU);
          if ( rtn.Results == 0 )
            {
              for (var idx=0;idx<rtn.SubKeys.length;idx++)
              {
              try
              {
                var elem = {};
                var subKey = rtn.SubKeys[idx];
                elem.name =  _registry.getKey (sKey + "\\"+ subKey + "\\");
                elem.id =  subKey;
                if (elem.name) {
                  try
                    {
                      //elem.enabled = true;
                      var sReadKey = _registry.getKey ("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Approved Extensions\\" +  subKey );
                      if (sReadKey == "NotExist") {
                        var subKey2;
                        elem.enabled = true;
                        for (var idx2=0;idx2<rtn2.SubKeys.length;idx2++) {
                          subKey2 = rtn2.SubKeys[idx2];
                          if (subKey2 == subKey) {
                            // if key is present, and Flags=1, the BHO is disabled
                            var flags = _registry.getKey ("HKEY_CURRENT_USER\\" + sBaseKey2 + "\\" +  subKey + "\\Flags");
                            //var sReadKey = _registry.getKeyList ("HKEY_CURRENT_USER\\" + sBaseKey2,  subKey, "\\Flags");
                            if (flags == 1) {
                              elem.enabled = false;
                            }
                            break;
                          }
                        }
                      } else {
                        sReadKey = _registry.getKey ("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Approved Extensions\\" +  subKey );
                        if (sReadKey == "NotExist") {
                          elem.enabled = false;
                        } else {
                          elem.enabled = true;
                        }
                      }

                    } catch (ex) {
                      //addLog("getKeyBHO exception : " + ex.description  );
                      elem.enabled = false;
                    }

                  //addLog("getKeyBHO  existance  : " + bActif + "pour sous clé "+ subKey );
                  tab.push(elem);
                }
              }
              catch(ex)
              {
                addLog("getKeyBHO exception : " + ex.description  );
              }
              }
            }
          return tab;
        },

       /**
        * Returns an array with the subkeys contain.
        * @method      getKeyDirect
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> 
        *   var sKey = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR";
        *   tab = ctx.wscript.registry.getKeyDirect( sKey, 'Start' );</code>
        * @param       {string} sKey
        * @param       {string} attribute
        * @return      {Array<string>} Array
        * @path        ctx.wscript.registry.getKeyDirect
        */
        getKeyDirect : function(sKey , attribute) {
          var tab = [];
          var elem = {};
          var res;
          //var name = "xxx";
          try {
            if (attribute == "") {
              res =  _registry.getKey (sKey + "\\");
            } else {
              res =  _registry.getKey (sKey + "\\" + attribute);
            }

            elem.name =  _registry.getKey (sKey + "\\DisplayName");
            //addLog("getKeyDirect DisplayName : " + name);
            if (attribute == "Start") {
              if (res == 3) { elem.locked = false; }
              if (res == 4) { elem.locked = true; }
              //elem[name] =  "Usb "  + res ;
            } else {
              //elem[name] =  attribute + " " + res ;
            }
            tab.push(elem);
            return tab;
          }
          catch(ex)
          {
            addLog("getKeyDirect exception : " + ex.description  );
            return tab;
          }
        },

       /**
        * Returns an array with the name and version for the installed programs.
        * @method      getSubKeysUninstall
        * @description
        *  (SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\)
        *
        *  <wrap help> //Example://</wrap>
        *  <code javascript> tab = ctx.wscript.registry.getSubKeysUninstall( );</code>
        * @param       {string} [strComputer] Current computer (by default, '.')
        * @return      {Array<string>} Array of string with the name and version for installed programs on current computer
        * @path        ctx.wscript.registry.getSubKeysUninstall
        */
        getSubKeysUninstall : function(strComputer)
        {
          var HKLM = 0x80000002;
          var tab = [];

          strComputer = strComputer || '.';
          var rtn = _registry.getSubKeys(strComputer, "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\", HKLM);

          if ( rtn.Results == 0 )
            {
              for (var idx=0;idx<rtn.SubKeys.length;idx++)
              {
              //addLog("getSubKeysUninstall indice : " + idx + " contenu" + rtn.SubKeys[idx]);
              try
              {
                var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator");
                var objService     = objLocator.ConnectServer(strComputer, "root\\default");
                var objReg         = objService.Get("StdRegProv");
                var objMethod      = objReg.Methods_.Item("GetStringValue");
                var objInParam     = objMethod.InParameters.SpawnInstance_();
                objInParam.hDefKey = HKLM;
                var sBaseKey = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
                objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                objInParam.sValueName =  "DisplayName";
                var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
                //addLog("getSubKeysUninstall DisplayName: " + objOutParam.sValue );
                if (objOutParam.sValue == null) {
                  objInParam.sValueName =  "QuietDisplayName";
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
                  //addLog("getSubKeysUninstall QuietDisplayName: " + objOutParam.sValue );
                }
                var elem = {};
                elem.name = objOutParam.sValue;
                if (elem.name) {
                  //addLog("getSubKeysUninstall Name : " + elem.name );
                  // version
                  objInParam.sValueName =  "DisplayVersion";
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
                  elem.version = objOutParam.sValue;
                  // date
                  objInParam.sValueName =  "InstallDate";
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
                  elem.date = objOutParam.sValue;
                  // vendor
                  objInParam.sValueName =  "Publisher";
                  objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);
                  elem.vendor = objOutParam.sValue;
                  //addLog("getSubKeysUninstall Name : " + elem.name  + " DisplayVersion: " + displayVersion);
                  tab.push(elem);
                }
              }
              catch(ex)
              {
                addLog("getSubKeysUninstall exception : " + ex.description  );
              }
              }
            }
            return tab;
        },

       /**
        * Returns Internet Explorer version.
        * @method      getIEVersion
        * @description
        *  The <wrap box>**getIEVersion( )**</wrap> method of ''ctx.wscript.registry'' class returns Internet Explorer version of current computer.
        *
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var version = ctx.wscript.registry.getIEVersion( );</code>
        * @param       {string} [strComputer] Current computer (by default, '.')
        * @return      {Object} Object contains 2 variables: version and svcVersion
        * @path        ctx.wscript.registry.getIEVersion
        */
        getIEVersion : function(strComputer)
        {
          var HKLM = 0x80000002;
          var tab = [];
          var response = {};
          strComputer = strComputer || '.';
          var rtn = _registry.getSubKeys(strComputer, "SOFTWARE\\Microsoft\\",HKLM);
          var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator");
          var objService     = objLocator.ConnectServer(strComputer, "root\\default");
          var objReg         = objService.Get("StdRegProv");
          var elem = {};
          if ( rtn.Results == 0 )
            {
              for (var idx=0;idx<rtn.SubKeys.length;idx++)
              {
              //addLog("_wscript..getIEVersion  indice : " + idx + " contenu " + rtn.SubKeys[idx]);
              try
              {
                if (  rtn.SubKeys[idx] == "Internet Explorer") {
                  var objMethod      = objReg.Methods_.Item("GetStringValue");
                  var objInParam     = objMethod.InParameters.SpawnInstance_();
                  objInParam.hDefKey = HKLM;
                  var sBaseKey = "SOFTWARE\\Microsoft\\";
                  objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                  objInParam.sValueName =  "Version";
                  var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam);

                  var version = objOutParam.sValue;
                  //addLog("_wscript..getIEVersion: " + Version );
                  //elem["Internet Explorer"] = "Version : " + version;
                  //tab.push(elem);
                  objInParam.sSubKeyName = sBaseKey + rtn.SubKeys[idx];
                  objInParam.sValueName =  "svcVersion";
                  var objOutParam2 = objReg.ExecMethod_(objMethod.Name, objInParam);

                  var svcVersion = objOutParam2.sValue;
                  //addLog("_wscript..getIEVersion: " + Version );
                  //elem["Internet Explorer"] = "Version : " + version + " svcVersion : " + svcVersion;
                  //tab.push(elem);
                  response.version = version;
                  response.svcVersion = svcVersion;
                }
              }
              catch(ex)
              {
                addLog("getIEVersion exception : " + ex.description  );
              }
              }
            }
            //return tab;
            return response;
        }
      };
      return _registry;
    })(),

    /**
     * Class gathering a set of functions to access shell functions
     * @class    ctx.wscript.shell
     * @path     ctx.wscript.shell
     */
    shell: (function() {
      var _shell = {

       /**
        * Gets an environment variable (nb of processors, OS version, ...).
        * @method      getEnvVariable
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var res = ctx.wscript.shell.getEnvVariable( e.shell.envVariable.NbProcessors, e.shell.envType.System );</code>
        * @param       {string} variable System variable: 'NUMBER_OF_PROCESSORS' / 'HOMEDRIVE' / 'HOMEPATH' / ...\\ (see [[:lib:common:ctx.enum#enumeration_eshellenvvariable|e.shell.envVariable]])
        * @param       {string} [environment] Environment name: 'SYSTEM'(default) / 'USER' / 'PROCESS' / ...\\ (see [[:lib:common:ctx.enum#enumeration_eshellenvtype|e.shell.envType]])
        * @return      {string} Result ommand output (empty if failed)
        * @path        ctx.wscript.shell.getEnvVariable
        */
        getEnvVariable : function(variable, environment)
        {
          try {
            if (environment === undefined)
              environment = 'SYSTEM';
            var WshSysEnv = _shell.getObject().Environment(environment);
            var res = WshSysEnv(variable);
            return res;
          } catch (ex) {
            addLog('getEnvVariable failed: ' + ex.message);
            return '';
          }
        },

       /**
        * Gets an environment variable (nb of processors, OS version, ...).
        * @method      enumEnvVariable
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var res = ctx.wscript.shell.enumEnvVariable( e.shell.envType.System );</code>
        * @param       {string} [environment] Environment: 'SYSTEM'(default) / 'USER' / 'PROCESS' / ...\\ (see [[:lib:common:ctx.enum#enumeration_eshellenvtype|e.shell.envType]])
        * @return      {Object} A list of enumerated variables, for example: { 'OS':'WinNT', 'NUMBER_OF_PROCESSORS':'8', ... }
        * @path        ctx.wscript.shell.enumEnvVariable
        */
        enumEnvVariable : function(environment)
        {
          var list = {};
          try {
            if (environment === undefined)
              environment = 'SYSTEM';
            var WshSysEnv = _shell.getObject().Environment(environment);
            var colVars = new Enumerator(WshSysEnv);
            for(; ! colVars.atEnd(); colVars.moveNext())
            {
              var val = String(colVars.item());
              var pos = val.indexOf('=');
              if (pos > 0) {
                list[val.substring(0, pos)] = val.substring(pos + 1);
              }
            }
            return list;
          } catch (ex) {
            addLog('enumEnvVariable failed: ' + ex.message);
            return list;
          }
        },

       /**
        * Expands system variables.
        * @method      expandEnvString
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var res = ctx.wscript.shell.expandEnvString( '%path%' );</code>
        * @param       {string} path System variable: '%programfiles%', '%temp%', ...
        * @return      {string} Resolved path
        * @path        ctx.wscript.shell.expandEnvString
        */
        expandEnvString : function(path)
        {
          try {
            return _shell.getObject().ExpandEnvironmentStrings(path);
          } catch (ex) {
            addLog('expandEnvString failed: ' + ex.message);
            return '';
          }
        },

       /**
        * Gets shell ActiveX object.
        * @method      getObject
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var shell = ctx.wscript.shell.getObject( );</code>
        * @return      {WScriptShell} Shell 'WScript.Shell' object
        * @path        ctx.wscript.shell.getObject
        */
        getObject : function()
        {
          _wscript.init();
          return _shellObj;
        },

       /**
        * Gets full pathname of a special system folder.
        * @method      getSpecialFolders
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> 
        *   // returns 'User' folder
        *   var strDesktop = ctx.wscript.shell.getSpecialFolders( "Desktop" ); // C:\Users\<login>\Desktop</code>
        *  Check MSDN page for a complete list of special folders: [[http://msdn.microsoft.com/en-us/library/0ea7b5xe(v=vs.84).aspx]]
        * @param       {e.shell.specialFolder} folder Special folder name: 'Desktop', ... (see [[:lib:common:ctx.enum#enumeration_eshellspecialfolder|e.shell.specialFolder]])
        * @return      {WshSpecialFolders|string} Pathname or WshSpecialFolders (if 'folder' empty)
        * @path        ctx.wscript.shell.getSpecialFolders
        */
        getSpecialFolders : function(folder)
        {
          return _shell.getObject().SpecialFolders(folder);
        }
      };
      return _shell;
    })(),

   /**
    * Class gathering a set of functions to access Windows network functions
    * @class     ctx.wscript.network
    * @path      ctx.wscript.network
    */
    network: (function() {
      var _network = {
       /**
        * Gets network ActiveX object.
        * @method      getObject
        * @description
        *  <wrap help> //Example://</wrap>
        *  <code javascript> var shell = ctx.wscript.network.getObject( );</code>
        * @returns     {WScriptNetwork} Shell 'WScript.Shell' object
        * @path        ctx.wscript.network.getObject
        */
        getObject : function()
        {
          _wscript.initNetwork();
          return _networkObj;
        }
      };
      return _network;
    })()
  };

  return _wscript;
}());