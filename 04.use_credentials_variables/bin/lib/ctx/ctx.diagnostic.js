/**
 * @module      Diagnostic module
 * @file        ctx/ctx.diagnostic.js
 * @description
 * The ''ctx.diagnostic'' class implements a set of functions to help troubleshooting issues, making local or remote analysis.
 *
 * The services can be used during developement phase or even production phase to enable trace collection from desktops:
 *   * Activate/disable recording traces ('.pscl'),
 *   * Collect a set of information about the current project, the desktop, ...
 *   * Record traces during scenario execution (auto-recording mode)
 *
 * For more details, see [[:pg:orch.diagnostic|Audit and diagnostic]].
 *
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * \\
 * @author      SAP Intelligent RPA R&D team
 * 
 */

// init diagnostic labels
GLOBAL.labels.set({
  diagnostic: {
    initTitle: { _comment:"Title of the dialog box to monitor trace recording", _type:"XTIT", en:"Enable trace recording" },
    recordingTitle: { _type:"XTIT", en:"Recording in progress..." },
    submitTitle: { _type:"XTIT", en:"Submit a diagnostic" },
    diag: { _type:"XTIT", en:"Diagnostic" },
    initRecording: { _type:"XFLD", en:'Prepare the process to record, then click \'Start\'' },
    submitLabel: { _type:"XFLD", en:'Add comment and submit' },
    submitComment: { _type:"XFLD", en:'Click to validate recording' },
    cancelComment: { _type:"XFLD", en:'Click to cancel'  },
    commentTooltip: {	_type:"XTOL", en:'Free comment' },
    saveTooltip: { _type:"XTOL", en:"Click to save desktop and Agent diagnostics" },
    archiveReady: { _type:"XFLD", en:"A trace archive was created" },
    archiveTitle: { _type:"XTIT", en:"Trace archive" },
    openArchive: { _type:"XBUT", en:"Open" },
    openArchiveTooltip: { _type:"XTOL", en:"Click to open archive" },
    start: { _type:"XBUT", en:"Start" },
    startTooltip: { _type:"XTOL", en:"Click to start recording" },
    stop: { _type:"XBUT", en:"Stop" },
    stopTooltip: { _type:"XTOL", en:"Click to stop recording" },
    archiveSaved: {	_type:"XFLD", en:"Diagnostic archive was saved" },
    archiveSavedKO: {	_type:"XFLD", en:"Diagnostic archive could not be saved" },
    screenshot: {	_type:"XFLD", en:"Include screenshots" },
    screenshotTooltip: { _type:"XFLD", en:"Include screenshots with captured data" },
    comment: { _type:"XFLD", en:"Comment" },
    addComment: { _type:"XTIT", en:"Comment" },
    addCommentTooltip: { _type:"XTOL", en:"Click to insert a comment" },
    close: { _type:"XBUT", en:"Close" },
    closeTooltip: { _type:"XTOL", en:"Click to close window" },
    checkBHOSuccess: { _type:"XFLD", en:"I.E. Web connector is enabled" },
    checkBHOFail: { _type:"XFLD", en:"I.E. Web connector is disabled" },
    MissingMandatoryGalaxyLibrary: { _type:"XFLD", en:"Missing mandatory galaxy library" },
		time: { _comment:"Displayed in studio debugger during initialization", _type:"XFLD", en:"time" },
		options: { _comment:"Displayed in studio debugger during initialization", _type:"XFLD", en:"options" },
		autoRecordingEnabled: { _comment:"Displayed in studio debugger during initialization", _type:"XFLD", en:"Auto-recording is enabled" },
		recordingEnabled: { _type:"XFLD", en:"Recording is enabled" },
		screenshotRecordingEnabled: { _type:"XFLD", en:"Screenshot recording is enabled" }
  }
});

/**
 * Options for the 'ctx.diagnostic' library
 * @namespace ctx.options.diagnostic
 * @path      ctx.options.diagnostic
 */
ctx.options.diagnostic = {
 /**
  * Check if Web connector is available (default is 'true')
  * @property {boolean} checkBHO
  * @path     ctx.options.diagnostic.checkBHO
  * @default  true
  */
  checkBHO: true,

  /** Display a popup when the archive is ready (default is 'true')
  * @property {boolean} displayPopup
  * @path ctx.options.diagnostic.displayPopup */ displayPopup : true,

  /** Generate a diagnostic on a development machine at first startup
  * @property {boolean} generateSingleDevelopmentDiagnostic
  * @path ctx.options.diagnostic.generateSingleDevelopmentDiagnostic */ generateSingleDevelopmentDiagnostic : true,

  /** Include the Agent crash dumps in the archive (default is 'false')
  * @property {boolean} saveCrashDumps
  * @path ctx.options.diagnostic.saveCrashDumps */ saveCrashDumps: false,

  /** Include Desktop information (OS, HW, ...) in the archive (default is 'true')
  * @property {boolean} saveDesktop
  * @path ctx.options.diagnostic.saveDesktop */ saveDesktop: true,

  /** Include the Event Viewer errors in the archive (default is 'false')
  * @property {boolean} saveEventViewer
  * @path ctx.options.diagnostic.saveEventViewer */ saveEventViewer: false,

  /** Include active page status (default is 'true')
  * @property {boolean} savePageStatus
  * @path ctx.options.diagnostic.savePageStatus */ savePageStatus: true,

  /** Include the list of installed programs in the archive (default is 'true')
  * @property {boolean} savePrograms
  * @path ctx.options.diagnostic.savePrograms */ savePrograms: true,

  /** Include the XML context in the archive (default is 'false')
  * @property {boolean} saveXMLContext
  * @path ctx.options.diagnostic.saveXMLContext */ saveXMLContext: false,

  /** Technical trace folder
  * @ignore
  * @property {string} techTraceFolder
  * @path ctx.options.diagnostic.techTraceFolder */ techTraceFolder: '%localappdata%Low\\SAP\\Intelligent RPA',

  /** External archive URL
  * @ignore
  * @property {string} archiveURL
  * @path ctx.options.diagnostic.archiveURL */ archiveURL: '',

  /** Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
  * @property {e.trace.level} traceLevel
  * @path ctx.options.diagnostic.traceLevel */ traceLevel: e.trace.level.None,

  /** Options to save archive with FTP
  * @path ctx.options.diagnostic.archiveFTP
  * @class ctx.options.diagnostic.archiveFTP
  * @struct
  */
  archiveFTP : {
    /** Enable FTP archive mode
    * @property {boolean} archiveFTP.enabled
    * @path ctx.options.diagnostic.archiveFTP.enabled */ enabled: false,

    /** Use FTPS (instead of FTP)
    * @property {boolean} archiveFTP.useFTPS
    * @path ctx.options.diagnostic.archiveFTP.useFTPS */ useFTPS: false,

    /** FTP site
    * @property {string} archiveFTP.site
    * @path ctx.options.diagnostic.archiveFTP.site */ site: '',

    /** Remote folder on the FTP server
    * @property {string} archiveFTP.remoteFolder
    * @path ctx.options.diagnostic.archiveFTP.remoteFolder */ remoteFolder: '',

    /** Credential
    * @property {ctx.cryptography.credentialClass} archiveFTP.credential
    * @path ctx.options.diagnostic.archiveFTP.credential */ credential: null

//    /** User login
//    * @property {string} archiveFTP.user
//    * @path ctx.options.diagnostic.archiveFTP.user */ user: '',

//    /** User password
//    * @property {string} archiveFTP.password
//    * @path ctx.options.diagnostic.archiveFTP.password */ password: ''
  },

 /**
  * Options to save archive on a server
  * @namespace ctx.options.diagnostic.archiveCopy
  * @path      ctx.options.diagnostic.archiveCopy
  */
  archiveCopy : {
    /** Enable server archive mode
    * @property {boolean} archiveCopy.enabled
    * @path ctx.options.diagnostic.archiveCopy.enabled */ enabled: false,
    /** Use XCopy command to copy archive on network
    * @property {boolean} archiveCopy.useXCopy
    * @path ctx.options.diagnostic.archiveCopy.useXCopy */ useXCopy: false,
    /** Use Robocopy command to copy archive on network
    * @property {boolean} archiveCopy.useRobocopy
    * @path ctx.options.diagnostic.archiveCopy.useRobocopy */ useRobocopy: true,
    /** Use ctx.execRun instead of ctx.exec
    * @property {boolean} archiveCopy.useExecRun
    * @path ctx.options.diagnostic.archiveCopy.useExecRun */ useExecRun: false,
    /** Remote server path
    * @property {string} archiveCopy.remoteFolder
    * @path ctx.options.diagnostic.archiveCopy.remoteFolder */ remoteFolder: ''
    //user: '',
    //password: '',
  },

 /**
  * Options to send archive with Outlook
  * @namespace ctx.options.diagnostic.outlookSend
  * @path      ctx.options.diagnostic.outlookSend
  */
  outlookSend : {
   /**
    * Enable email sending with Outlook
    * @property {boolean} outlookSend.enabled
    * @path     ctx.options.diagnostic.outlookSend.enabled
    * @default  false
    */
    enabled: false,

   /**
    * Destination email address
    * @property {string} outlookSend.destination
    * @path     ctx.options.diagnostic.outlookSend.destination
    * @default
    */
    destination: ''
  }
};

/**
 * Diagnostic class
 * @class       ctx.diagnostic
 * @path        ctx.diagnostic
 * @constructor
 */
ctx.diagnostic = (function () {
  /** @type {Object} */ var _options = ctx.options.diagnostic;
  var _archiveFolder = '';
  var _comment = '';
  var _popupState = {
    none: 0,
    init: 1,
    recording: 2,
    submit: 3,
    done: 4
  };
  var _currentPopup = _popupState.none;

  ctx.popup('pDiagnosticTemplate').init({
    template: e.popup.template.NoButton,
    canClose: false,
    size : "small",
    XSlide: e.popup.position.Right,
    X: e.popup.position.Right,
    Y: e.popup.position.Bottom,
    CX: 600,
    CY: 200
  });

  // memorize start time
  var _startDate = new Date();

 /**
  * @ignore
  * Performs a WMI query
  * @param  {string} section WMI section to search
  * @param  {Array<string>} [params] Array of attributs (if undefined, all attributes)
  * @param  {string} [where] Selection string
  * @return {Array<string>|string} Results
  */
  var _wmiQuery = function(section, params, where) {
    ctx.noNotify = true;
    var tab = ctx.wmi.query(section, params, where);
    return (tab && (tab.length == 1) ? tab[0] : tab);
  }

  var self =
  /** @lends ctx.diagnostic */
  {
   /** @ignore
    * @const
    * @property {string} ctxType class type
    */
    ctxType: 'ctx.diagnostic',

    desktop: {},

    //comment : '',
    stopInProgress : false,

   /**
    * Checks if browser extensions are globally enabled.
    * @method      areBHOAllowed
    * @summary     Checks if browser extensions are globally enabled.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
var data = {};
if (!ctx.diagnostic.areBHOAllowed( ) ) {
  // add your code here
}
</code>
    * @path        ctx.diagnostic.areBHOAllowed
    * @return      {boolean} ''true'' if BHOs are enabled, otherwise ''false''
    */
    areBHOAllowed : function () {
			ctx.lockNoNotify = true;			
      var ebe = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Enable Browser Extensions");
      if (!ebe)
        ebe = ctx.registry.get("HKCU\\SOFTWARE\\Microsoft\\Internet Explorer\\Main\\Enable Browser Extensions");
			ctx.lockNoNotify = false;			
      return (ebe == 'yes' ? true : false);
    },

   /**
    * Creates an archive folder to save diagnostic files.
    * @method      createArchiveFolder
    * @summary     Creates an archive folder to save diagnostic files.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
var data = {};
ctx.diagnostic.createArchiveFolder( );
</code>
    * @path        ctx.diagnostic.createArchiveFolder
    * @param       {string} [rootFolder] Root folder (default is ''ctx.options.currentDir'')
    */
    createArchiveFolder : function (rootFolder) {
      ctx.notifyAction('ctx.diagnostic.createArchiveFolder');
      rootFolder = rootFolder || ctx.options.path.log;
      if (ctx.options.traceFolder)
        _archiveFolder = ctx.options.traceFolder; // use trace folder already defined
      else
        _archiveFolder = rootFolder + "/" + ctx.getTimestamp(null, true);
      this.setArchiveFolder(_archiveFolder);
    },

   /**
    * Deletes the archive folder.
    * @method      deleteArchiveFolder
    * @summary     Deletes archive folder.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.deleteArchiveFolder( );</code>
    * @throws      {Error}
    * @path        ctx.diagnostic.deleteArchiveFolder
    */
    deleteArchiveFolder : function () {
      ctx.notifyAction('ctx.diagnostic.deleteArchiveFolder');
      if (!(_archiveFolder && ctx.fso.folder.exist(_archiveFolder))) {
        throw new Error(e.error.KO, '[ctx.diagnostic.deleteArchiveFolder] Failed to archive or folder does not exist. ');
      }
      ctx.fso.folder.remove(_archiveFolder);
    },

   /**
    * Starts / stops the trace local recording
    * @method  enableRecording
    * @path    ctx.diagnostic.enableRecording
    * @param   {boolean} enable Start / stop recording
    * @param   {boolean} [advanced] Advanced diagnostic mode activation, including events viewers, programs list, ...
    * @param   {boolean} [recording] Use 'record' folder
    */
    enableRecording : function (enable, advanced, recording) {
      if (enable) {
        ctx.options.trace.recording = true;
        // archive traces, create a new folder
        ctx.reinitTraceFolder(false, true, (recording !== false));
      } else {
        // *** Save diagnostic ***
        ctx.wait(function(ev) {
          // force file saving
          ctx.options.trace.recording = true;
          // *** Insert comment ***
          self.saveComment();
          // generate a full diagnostic
          self.saveAll((advanced === false) ? false : true );
          // archive traces, don't create a new folder
          ctx.reinitTraceFolder(true, false, (recording !== false));
          // stop recording
          ctx.options.trace.recording = false;
        }, 100);
      }
    },

   /**
    * Checks if Agent Internet Explorer connector (BHO) is enabled.
    * @method      isAgentBHOEnabled
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
var data = {};
if (!ctx.diagnostic.isAgentBHOEnabled()) { ... }
</code>
    * @path        ctx.diagnostic.isAgentBHOEnabled
    * @return      {boolean} true if connector is enabled
    */
    isAgentBHOEnabled : function () {
      var BHOList = ctx.wscript.registry.getKeyBHO();
      for (var i in BHOList) {
        var bho = BHOList[i];
        if ((bho.name).toLowerCase().indexOf("contextor") >= 0)
          return bho.enabled;
      }
      return false;
    },

   /**
    * Generates a local diagnostic.
    * @method      generateLocalDiagnostic
    * @summary     Generates a local diagnostic.
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
var data = {};
ctx.diagnostic.generateLocalDiagnostic();
</code>
    * @path        ctx.diagnostic.generateLocalDiagnostic
    * @param       {boolean} [ifNotExist] generates only if the diagnostic doesn't exist yet
    */
    generateLocalDiagnostic : function (ifNotExist) {
      var diagName = ctx.options.computerName + '.' + ctx.options.userName + '.diagnostic.pscl';
      var diagFile = ctx.options.path.log + '\\' + diagName;
      if ((!ifNotExist) && ctx.fso.file.exist(diagFile)) {
        ctx.fso.file.remove(diagFile);
      }
      if (!ctx.fso.file.exist(diagFile)) {
        ctx.log('Generating a local diagnostic in file: \'' + diagName + '\'', e.logIconType.Info);
        ctx.diagnostic.saveAll(true, true, diagFile);
      }

    },

   /**
    * Collects data about the desktop.
    * @method      getDesktopInfo
    * @summary     Collects data about the desktop.
    * @description
    *  Collects data about the desktop:
    *   * Project: product, project, SDK versions, paths, ...
    *   * Software: OS infos, IE version, installed plugins, ...
    *   * Hardware: processor, RAM, monitors, ...
    *
    * <wrap help> //Example://</wrap>
<code javascript>
var data = {};
ctx.diagnostic.getDesktopInfo( data );
</code>
    * @throws      {Error}
    * @path        ctx.diagnostic.getDesktopInfo
    * @param       {Object} [data] Object to be filled with collected data
    * @return      {Object} Result object
    */
    getDesktopInfo : function (data) {
      data = data || {};
      try {
        // *** Software infos ***
        var tab;
        // IE infos
        data.IE = {};
        ctx.noNotify = true;
        data.IE.Version = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcVersion");
        ctx.noNotify = true;
        data.IE.UpdateVersion = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcUpdateVersion");
        ctx.noNotify = true;
        data.IE.KBNumber = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcKBNumber");
        ctx.noNotify = true;
        data.IE.InternalVersion = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version");
        ctx.noNotify = true;
        data.IE.AgentBHOEnabled = self.isAgentBHOEnabled();
        ctx.noNotify = true;
        data.IE.BHOAllowed = self.areBHOAllowed();
        data.IE.BHO =ctx.wscript.registry.getKeyBHO();
        // OS infos
        data.OS = _wmiQuery('Win32_OperatingSystem', ['Caption', 'Version', 'OSArchitecture', 'OSLanguage', 'SerialNumber', 'SystemDirectory', 'MUILanguages', 'InstallDate', 'FreePhysicalMemory', 'FreeVirtualMemory']);
        // Domains
        data.Computer = _wmiQuery('Win32_ComputerSystem', ['Name', 'Domain', 'UserName', 'SystemType', 'Manufacturer', 'Model', 'Description', 'CurrentTimeZone', 'Roles']);
        // *** Hardware infos ***
        // Processor
        data.Processor = _wmiQuery('Win32_Processor', ['DeviceID', 'Name', 'Caption', 'Manufacturer', 'NumberOfCores', 'NumberOfLogicalProcessors', 'ProcessorId']);
        // BIOS
        data.BIOS = _wmiQuery('Win32_BIOS', ['Caption', 'SerialNumber', 'Manufacturer']);
        // RAM
        data.RAM = _wmiQuery('Win32_ComputerSystem', ['TotalPhysicalMemory']);
        // network
        data.NetworkAdapters = _wmiQuery('Win32_NetworkAdapterConfiguration', ['Description', 'IPAddress', 'DHCPServer', 'MACAddress'], 'IPEnabled=true');
        // Login profiles
        data.LoginProfile = _wmiQuery('Win32_NetworkLoginProfile', ['Name', 'Domain', 'UserName', 'SystemType', 'Manufacturer', 'Model', 'Description', 'CurrentTimeZone', 'Roles']);
        // Network connections (can be slow if some networks are not connected)
        //tab = ctx.wmi.query('Win32_NetworkConnection', '');
        //data.NetworkConnection = (tab && (tab.length == 1) ? tab[0] : tab);
        // Monitors
        data.Monitor = _wmiQuery('Win32_DesktopMonitor', ['Caption', 'ScreenHeight', 'ScreenWidth', 'PixelsPerXLogicalInch', 'PixelsPerYLogicalInch', 'DeviceID']);
        // Video controllers
        data.VideoController = _wmiQuery('Win32_VideoController', ['Caption', 'DeviceID', 'VideoProcessor', 'CurrentHorizontalResolution', 'CurrentVerticalResolution', 'CurrentBitsPerPixel', 'CurrentRefreshRate', 'AdapterCompatibility', 'PNPDeviceID', 'DriverVersion', 'VideoModeDescription']);
        // Disks
        data.Disks = _wmiQuery('Win32_DiskDrive', ['Name', 'Caption', 'DeviceID', 'Size', 'Status', 'MediaType', 'InterfaceType', 'SerialNumber']);
        // USB keys
        var sKey = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR";
        tab = ctx.wscript.registry.getKeyDirect( sKey , 'Start') ;
        data.USB = (tab && (tab.length == 1) ? tab[0] : tab);
        data.USBController = _wmiQuery('Win32_USBController', ['Name', 'Manufacturer']);
        // Baseboard
        data.Baseboard = _wmiQuery('Win32_BaseBoard', ['Name', 'Manufacturer', 'Product', 'SerialNumber', 'Version']);
        // Battery
        data.Battery = _wmiQuery('Win32_Battery', ['Name', 'Caption', 'DeviceID', 'BatteryStatus', 'EstimatedChargeRemaining']);
        // Sound devices
        data.SoundDevice = _wmiQuery('Win32_SoundDevice', ['Name', 'Manufacturer']);
        // Keyboard
        data.Keyboard = _wmiQuery('Win32_Keyboard', ['Name', 'Description', 'NumberOfFunctionKeys']);
        // CDROMs
        data.CDROM = _wmiQuery('Win32_CDROMDrive', ['Name', 'Description', 'CapabilityDescriptions', 'Drive', 'MediaType', 'MfrAssignedRevisionLevel']);
        // Printers
        data.Printers = _wmiQuery('Win32_Printer', [ 'Name', 'DriverName', 'PrintProcessor', 'HorizontalResolution', 'VerticalResolution', 'PortName']);
      } catch (ex){  }
      return data;
    },

   /**
    * Collects system events in Windows Event Viewer.
    * @method      getEventViewer
    * @summary     Collects system events in Windows Event Viewer.
    * @description
    *  Collects system events in Windows Event Viewer:
    *   * Security
    *   * Application
    *   * System
    *   * ...
    *
    * <wrap help> //Example://</wrap>
<code javascript>
var data = {};
ctx.diagnostic.getEventViewer( data );
</code>
    * @throws      {Error}
    * @path        ctx.diagnostic.getEventViewer
    * @param       {Object} [data] Object to be filled with collected data
    * @return      {Object} Result object
    */
    getEventViewer : function (data) {
      data = data || {};
      try {
        // *** Software infos ***
        var tab;
        var maxCount = 300;
        // EventLog infos
        tab = ctx.wmi.query('Win32_NTEventLogFile', ['FileName', 'Name', 'FileSize', 'NumberOfRecords', 'LastModified']);
        data.LogFile = (tab && (tab.length == 1) ? tab[0] : tab);
        data.Events = {};
        // for each log file, get the last records (exclude EventType=3 ('Information' level))
        for (var i in data.LogFile) {
          var entry = data.LogFile[i];
          var filename = entry['FileName'];
          var count = parseInt(entry['NumberOfRecords'], 10);
          if (count > 0) {
            tab = ctx.wmi.query('Win32_NTLogEvent', ['EventCode', 'SourceName', 'Message', 'EventType', 'Type', 'TimeGenerated', 'RecordNumber'], 'Logfile = "' + filename + '" AND EventType != 3 AND RecordNumber > ' + (count >= maxCount ? count - maxCount : 0));
            data.Events[filename] = (tab && (tab.length == 1) ? tab[0] : (tab && (tab.length == 0) ? null : tab));
          }
        }
      } catch (ex){  }
      return data;
    },

   /**
    * Collects the list of installed programs.
    * @method      getPrograms
    * @description
    *  Collects the list of installed programs (as listed in 'Programs and Features' Control Panel) and stores it in the attribute 'programs' of the object passed in argument
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
var data = {};
ctx.diagnostic.getPrograms( data );
</code>
    * @path        ctx.diagnostic.getPrograms
    * @param       {Object} data Object to be filled with collected data (in attribute 'programs')
    */
    getPrograms : function (data) {
      //ctx.notifyAction('ctx.diagnostic.getPrograms');
      data = data || {};
      // programs
      try {
        data.programs = ctx.wscript.registry.getSubKeysUninstall();
      } catch (ex) {
        ctx.log(ex, e.logIconType.Warning, 'ctx.diagnostic.getPrograms failed')
      }
      //data.programs = ctx.wmi.query('Win32_Product', ['Name', 'Version', 'Vendor', 'InstallDate'])
      return data;
    },

   /**
    * Saves and archives a complete diagnostic.
    * @method      saveAll
    * @description Saves and archives these following elements:
    *   * Desktop info
    *   * Installed programs
    *   * JS context
    *   * XML context
    *
    * <wrap help> //Example://</wrap>
<code javascript>
ctx.diagnostic.saveAll(true);
</code>
    * @path        ctx.diagnostic.saveAll
    * @param       {boolean} advanced Advanced diagnostic, including event viewers, program list, ...
    * @param       {boolean} [noCopy] Skip the copy of technical trace files
    * @param       {string} [filename] Filename in which traces are recorded (if omitted, use the default trace files)
    * @return      {boolean} Result
    */
    saveAll : function (advanced, noCopy, filename) {
      var oldAlternativeTraceFile = '';
      if (filename) {
        oldAlternativeTraceFile = ctx.options.trace.alternativeTraceFile;
        ctx.options.trace.alternativeTraceFile = filename;
      }
      // time infos
      self.saveTime();

      // project options
      ctx.notifyInfo(ctx.options, GLOBAL.labels.diagnostic.options);

      // desktop informations
      if (ctx.options.diagnostic.saveDesktop) {
        try {
          ctx.diagnostic.desktop = {};
          self.getDesktopInfo(ctx.diagnostic.desktop);
          ctx.notifyInfo(ctx.diagnostic.desktop, 'desktop');
        } catch (ex) { }
      }

      var data = {};

      // full screen screenshot
      //ctx.notifyInfo('', 'screenshot', true);

      // Event Viewer
      if (advanced && ctx.options.diagnostic.saveEventViewer) {
        try {
          data = {};
          self.getEventViewer(data);
          ctx.notifyInfo(data, 'eventViewer');
        } catch (ex) { }
      }

      // JS context (applications, scenarios, ...)
      try {
        self.saveJSContext();
      } catch (ex) { }

      // Page context
      if (ctx.options.diagnostic.savePageStatus) {
        try {
          self.savePageStatus();
        } catch (ex) { }
      }

      // XML context
      if (ctx.options.diagnostic.saveXMLContext) {
        self.saveXMLContext();
      }

      // program list
      data = {};
      if (advanced && ctx.options.diagnostic.savePrograms) {
        try {
          self.getPrograms(data);
          ctx.notifyInfo(data, 'programs');
          //this.saveData(data, 'programs');
        } catch (ex) { }
      }

      if (!noCopy) {
        try {
          var source = ctx.options.path.log + "\\LogCtxt.000"; // Copy LogCtxt.000 file
          var dest = ctx.options.traceFolder + "\\LogCtxt.000";
          ctx.fso.file.copy(source, dest);
        } catch (ex) { }

        try {
          // Copy technical trace files
          var source = ctx.wscript.shell.expandEnvString(ctx.options.diagnostic.techTraceFolder);
          var dest = ctx.options.path.log + "\\" + ctx.options.traceFolder;
          var files = ctx.fso.folder.getFileCollection(source, true);
          ctx.each(files, function(id, file) {
            ctx.fso.file.copy(source + "\\" + file.Name, dest + "\\" + file.Name);
          });
        } catch (ex) { }

        if (advanced && ctx.options.diagnostic.saveCrashDumps) {
          try {
            // Copy dump files today for CtxtRun et CtxtStudio
            // use robocopy in synchronous mode
            var folder = '%localappdata%\\CrashDumps';
            ctx.fso.file.robocopy({
              source: folder,
              destination: ctx.options.traceFolder,
              filename: 'Ctxt*.dmp /MaxAge:1'
            });
          } catch (ex) { }
        }
      }

      if (filename) {
        ctx.options.trace.alternativeTraceFile = oldAlternativeTraceFile;
      }
      return true;
    },

   /**
    * Callback called after archive creation
    * @description
    *  This call implements the archive mechanism (network copy, FTP, ...). It can be overridden if proposed behaviors do not fit your requirements, and you want to define your own save mechanism.
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
ctx.diagnostic.saveCallback = function ( zipFile ) {
  // add your code here
}
</code>
    * @method  saveCallback
    * @path    ctx.diagnostic.saveCallback
    * @param  {string} zipFile Archive filename
    */
    saveCallback : function (zipFile) {
      var res = false;
      var bHandle = false; // set to true if asynchronous request
      // ********************************
      // *** copy on a shared network ***
      // ********************************
      if (ctx.options.diagnostic.archiveCopy.enabled
        && ctx.fso
        && ctx.options.diagnostic.archiveCopy.remoteFolder) {
        var folder = ctx.fso.file.getParentFolderName(zipFile);
        var file = e.trace.type.Record + '.*.zip'; // 'record.*.zip'
          if (ctx.options.diagnostic.archiveCopy.useRobocopy)
          {
            var options = '/MOV'; // move the files
            bHandle = true;
            if (ctx.options.diagnostic.archiveCopy.useExecRun)
            {
              ctx.fso.file.robocopy({
                source: folder,
                destination: ctx.options.diagnostic.archiveCopy.remoteFolder,
                filename: file + ' ' + options,
                style: 0, // invisible
                useExecRun: true
              });
            } else {
              ctx.fso.file.robocopy({
                source: folder,
                destination: ctx.options.diagnostic.archiveCopy.remoteFolder,
                filename: file + ' ' + options,
                timeout: 120,
                callback: function(obj) {
									if  ('undefined' !== typeof systray) {
	                  if ((!obj.timeout) && (obj.exitCode < 8)) {
	                    // success
	                    systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSaved, e.systray.iconType.Info, 5000);
	                  } else {
	                    // fail
	                    systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSavedKO, e.systray.iconType.Error, 5000);
	                  }
									}
                  ctx.log(obj, e.logIconType.Info, 'robocopy results: ');
                  if (ctx.diagnostic.stopInProgress) {
                    ctx.diagnostic.stopInProgress = false;
                    GLOBAL.notify(GLOBAL.events.evStopDone);
                  }
                }
              });
            }
          }
          if(ctx.options.diagnostic.archiveCopy.useXCopy)
          {
            ctx.fso.file.xcopy(folder, ctx.options.diagnostic.archiveCopy.remoteFolder, "", 120, function (obj){
              if(obj.timeout)
                var exit = true;
            });
          }
        res = true;
      }

      // **********************
      // *** copy using FTP ***
      // **********************
      else if (ctx.options.diagnostic.archiveFTP.enabled && ctx.fso && ctx.options.diagnostic.archiveFTP.site) {
        try {
          ctx.fso.ftp.init(
            ctx.options.diagnostic.archiveFTP.site,
            ctx.options.diagnostic.archiveFTP.useFTPS,
            ctx.options.diagnostic.archiveFTP.credential);
          var fileList = [zipFile];
          ctx.fso.ftp.upload('', ctx.options.diagnostic.archiveFTP.remoteFolder, fileList);
          // success
					if  ('undefined' !== typeof systray) {
          	systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSaved, e.systray.iconType.Info, 5000);
					}
        } catch (ex) {
          // fail
					if  ('undefined' !== typeof systray) {
	          systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSavedKO, e.systray.iconType.Error, 5000);
					}
        }
        res = true;
      }

      // *********************
      // *** send by email ***
      // *********************
      else if (ctx.options.diagnostic.outlookSend.enabled && ctx.options.diagnostic.outlookSend.destination) {
        try {
          if (typeof ctx.outlook !== 'undefined') {
            ctx.outlook.init();
            var obj = ctx.outlook.mail.create({
              To: ctx.options.diagnostic.outlookSend.destination,
              Subject:'Diagnostic from : ' + ctx.options.userName
            });
            ctx.outlook.mail.show(0);
            ctx.outlook.mail.attach(0, zipFile);
            ctx.outlook.mail.send(0);
            // success
						if  ('undefined' !== typeof systray) {
	            systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSaved, e.systray.iconType.Info, 5000);
	          }
          }
        } catch (ex) {
          // fail
					if  ('undefined' !== typeof systray) {
		        systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSavedKO, e.systray.iconType.Error, 5000);
          }
        }
        res = true;
      }

      // *************************************
      // *** display a popup when finished ***
      // *************************************
      else if (ctx.options.diagnostic.displayPopup && (!ctx.diagnostic.stopInProgress)) {
        try {

          // *************************************
          // *** display a popup when finished ***
          // *************************************
          var file = ctx.fso.file.getFileName(zipFile);
          var folder = ctx.fso.file.getParentFolderName(zipFile);
          _currentPopup = _popupState.done;
          ctx.popup('pDiagArchiveReady').open({
            template: 'pDiagnosticTemplate',
            title: GLOBAL.labels.diagnostic.archiveTitle,
            CX: 440,
            CY: 130,
            message: '<b>' + GLOBAL.labels.diagnostic.archiveReady + '</b><br/>' + file,
            //icon: e.popup.icon32.agent,
            autoClose: 30000, // auto close after 30s
            buttons: {
              open: {
                label: GLOBAL.labels.buttons.open,
                type: e.item.style.Green,
                icon: e.item.icon.folderOpen
              },
              del: {
                label: GLOBAL.labels.buttons.del,
                type: e.item.style.Red,
                icon:  e.item.icon.remove
              },
              close: {
                label: GLOBAL.labels.buttons.close,
                type: e.item.style.Grey
              }
            }
          }).waitResult(function(res) {
            _currentPopup = _popupState.none;
            if (res == e.item.id.Open) {
              ctx.fso.file.openExplorer(zipFile);
            } else if (res == e.item.id.Delete) {
              ctx.fso.file.remove(zipFile);
            }
          });
        } catch (ex) {
          // fail
					if  ('undefined' !== typeof systray) {
	          systray.showBalloon(ctx.options.projectLabel, GLOBAL.labels.diagnostic.archiveSavedKO, e.systray.iconType.Error, 5000);
	        }
        }
        res = true;
      }

      if ((!bHandle) && ctx.diagnostic.stopInProgress) {
        ctx.diagnostic.stopInProgress = false;
        GLOBAL.notify(GLOBAL.events.evStopDone);
      }
      return res;
    },

   /**
    * Saves a comment.
    * @method      saveComment
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.saveComment( );</code>
    * @path        ctx.diagnostic.saveComment
    * @return      {boolean} Result
    */
    saveComment : function () {
      if (_comment)
        ctx.notifyInfo(_comment, 'comment');
      _comment = '';
      return true;
    },

   /**
    * Saves data in a JSON file.
    * @method      saveData
    * @summary     Saves data in a JSON file.
    * @description
    *  <wrap box>ctx.diagnostic.createArchiveFolder( )</wrap> method should have been called before to create the containing folder.
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
 ctx.diagnostic.createArchiveFolder( );
 ctx.diagnostic.saveData( GLOBAL, 'GLOBAL' );
</code>
    * @path        ctx.diagnostic.saveData
    * @param       {Object|string} data Object to be filled with collected data
    * @param       {string} name Filename
    * @param       {boolean} [bXml] If ''true'', save as an XML file (by default, save in a JSON format)
    */
    saveData : function (data, name, bXml) {
      if (!(_archiveFolder && ctx.fso.folder.exist(_archiveFolder))) {
        this.createArchiveFolder();
      }
      if (bXml) {
        var filename = _archiveFolder + "/" + name + '.xml';
        if (typeof data === 'string') {
          /** @type {string} */var txt = data;
          ctx.writeFile(filename, txt);
        }
      } else {
        var txt = ctx.serialize(data, false, false, "\t", true);
        var filename = _archiveFolder + "/" + name + '.json';
        ctx.writeFile(filename, txt);
      }
    },

   /**
    * Saves JavaScript main variables in JSON files called 'ctx.app.<applicationId>.json'.
    * @method      saveJSContext
    * @description
    *  <wrap box>ctx.diagnostic.createArchiveFolder( )</wrap> method should have been called before to create the containing folder.
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
 ctx.diagnostic.createArchiveFolder( );
 ctx.diagnostic.saveJSContext( );
</code>
    * @path        ctx.diagnostic.saveJSContext
    */
    saveJSContext : function () {
//      ctx.notifyAction('ctx.diagnostic.saveJSContext');
//      if (!(_archiveFolder && ctx.fso.folder.exist(_archiveFolder))) {
//        this.createArchiveFolder();
//      }
      // serialize counters
      ctx.notifyInfo(ctx.counters, 'counters');

      // serialize scenarios
      ctx.notifyInfo(ctx.runningScenarios, 'runningScenarios');

      // serialize requests
      //ctx.notifyInfo(ctx.requests, 'requests');

      // serialize applications
      ctx.notifyInfo(ctx.app, 'applications');
    },

   /**
    * Saves information about the active pages.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.savePageStatus( );</code>
    * @method  savePageStatus
    * @path    ctx.diagnostic.savePageStatus
    */
    savePageStatus : function () {
      // serialize applications
      var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.recording) ? ctx.options.traceFolderRecording : ctx.options.traceFolder)
      for (var appliName in ctx.app) {
        var app = ctx.app[appliName];
        var pages = app.getActivePages();
        for (var id in pages) {
          var realPage =  pages[id];
          var pg = {};
          // read page infos
          if (realPage.getInfos) { pg.infos = realPage.getInfos(); }
          // read page item values
          if (realPage.getItems) { pg.items = realPage.getItems(); }
          // make page screenshot
          if (realPage.hwnd) {
            var file = ctx.getTimestamp(null, true) + '.png';
            ctx.noNotify = true;
            realPage.screenshot(ctx.options.path.log + '\\' + traceFolder + "\\" + file)
//            ctx.screenshot( {
//              File: ctx.options.path.log + '\\' + traceFolder + "\\" + file,
//              HWND: realPage.hwnd
//            } );
            pg.screenshot = {
              file: file,
              folder: traceFolder,
              hwnd: realPage.hwnd
            };
          }
          var label = realPage.parent.name + '[' + realPage.parent.instance + '].' + realPage.name + '[' + realPage.instance + '].screenshot()';
          var params = [label, e.logIconType.Data];
          var desc = realPage.getObjectDescriptor();
          ctx.notifyAction('ctx.log', undefined, desc, 'LOGMESS', params, pg);
        }
      }
    },

   /**
    * Saves current and start date and time.
    * @method      saveTime
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.saveTime( );</code>
    * @path        ctx.diagnostic.saveTime
    */
    saveTime : function () {
      var date = new Date();
      var time = {
        start: {
          date: ctx.getDate(_startDate),
          time: ctx.getTime(_startDate)
        },
        current: {
          date: ctx.getDate(date),
          time: ctx.getTime(date)
        }
      };
      ctx.notifyInfo(time, GLOBAL.labels.diagnostic.time);
    },

   /**
    * Saves the XML context.
    * @description
    *  The <wrap box>ctx.diagnostic.createArchiveFolder( )</wrap> method should have been called before to create the containing folder.
    *
    *  <wrap help> //Example://</wrap>
<code javascript>
ctx.diagnostic.createArchiveFolder( );
ctx.diagnostic.saveXMLContext( );
</code>
    * @method saveXMLContext
    * @path ctx.diagnostic.saveXMLContext
    */
    saveXMLContext : function () {
      //ctx.notifyAction('ctx.diagnostic.saveXMLContext');
      var txt = ctx.context.get('//GLOBAL');
      ctx.notifyInfo(txt, 'context');
    },

   /**
    * Sets the archive folder to save diagnostic files.
    * @method      setArchiveFolder
    * @description
    *  <wrap help> //Example://</wrap>
<code javascript>
var path = '...'
ctx.diagnostic.setArchiveFolder( path );
</code>
    * @throws      {Error}
    * @path        ctx.diagnostic.setArchiveFolder
    * @param       {string} [folder] Root folder (default is ''ctx.options.currentDir'')
    */
    setArchiveFolder : function (folder) {
      ctx.notifyAction('ctx.diagnostic.setArchiveFolder');
      if (!ctx.fso.folder.exist(folder))
        ctx.fso.folder.create(folder);
      _archiveFolder = folder;
    },

   /**
    * Displays diagnostic start popup.
    * @method      showRecordInitPopup
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript>ctx.diagnostic.showRecordInitPopup( );</code>
    * @path        ctx.diagnostic.showRecordInitPopup
    */
    showRecordInitPopup : function() {
      if (_currentPopup != _popupState.none) {
        return;
      }
      var form = {
        group : [{
          width : 12,
          label : {
            type : e.item.type.label,
            value : GLOBAL.labels.diagnostic.initRecording
          }
        }, {
          width : 8,
          screenshot : {
            type : e.item.type.checkbox,
            value : [(ctx.options.trace.screenshotTraces ? "screenshot" : "")],
            width : 12,
            tooltip : GLOBAL.labels.diagnostic.screenshotTooltip,
            tooltipPlacement: e.popup.position.Top,
            options : {
              screenshot : GLOBAL.labels.diagnostic.screenshot
            }
          }
        }
        ]
      };

      _currentPopup = _popupState.init;
      self.popup = ctx.popup('pDiagDone').open({
          template: 'pDiagnosticTemplate',
          title: GLOBAL.labels.diagnostic.initTitle,
          //message:  GLOBAL.labels.diagnostic.initRecording,
          form: form,
          escape: 'cancel',
          buttons: {
            start: {
              label: GLOBAL.labels.diagnostic.start,
              icon:  e.item.icon.play,
              tooltip: GLOBAL.labels.diagnostic.startTooltip,
              tooltipPlacement: e.popup.position.Top,
              submit : true,
              type: e.item.style.Green
            },
            cancel: {
              label: GLOBAL.labels.buttons.cancel,
              tooltip: GLOBAL.labels.diagnostic.cancelComment,
              tooltipPlacement: e.popup.position.Top,
              type: e.item.style.Grey
            }
          }
        }).waitResult(function(res) {
          _currentPopup = _popupState.none;
          // save current values
          if (res.button == 'start') {
            // *** Start recording ***
            ctx.options.trace.screenshotTraces = (res.screenshot ? true : false);
            self.enableRecording(true, false, true);
            self.showRecordingPopup();
          }
      });
    },

   /**
    * Displays diagnostic recording popup.
    * @method      showRecordingPopup
    * @summary     Displays diagnostic recording popup.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.showRecordingPopup( );</code>
    * @path        ctx.diagnostic.showRecordingPopup
    */
    showRecordingPopup : function() {
      if (_currentPopup != _popupState.none) {
        return;
      }
      _currentPopup = _popupState.recording;
      self.popup = ctx.popup('pDiagRecording').open({
          template: 'pDiagnosticTemplate',
          title: GLOBAL.labels.diagnostic.recordingTitle,
          form: {
            group : [{
              comment : {
                type : e.item.type.textarea,
                rows : 1,
                value : '',
                width : 12,
                tooltip : GLOBAL.labels.diagnostic.commentTooltip,
                tooltipPlacement : e.popup.position.Bottom
              }
            }]
          },
          size : "small",
          buttons: {
            stop: {
              label: GLOBAL.labels.diagnostic.stop,
              icon: e.item.icon.stop,
              tooltip: GLOBAL.labels.diagnostic.stopTooltip,
              tooltipPlacement: e.popup.position.Top,
              //close: true,
              submit : true,
              type: e.item.style.Red
            },
            addComment: {
              label: GLOBAL.labels.diagnostic.addComment,
              tooltip: GLOBAL.labels.diagnostic.addCommentTooltip,
              tooltipPlacement: e.popup.position.Top,
              icon: e.item.icon.pencil,
              //close: false,
              submit : true,
              type: e.item.style.Blue
            }
          }
        }).waitResult(function(res) {
          _currentPopup = _popupState.none;
          // save current values
          _comment = res.comment;
          if (res.button == 'stop') {
            // show submit popup
            self.showSubmitPopup(false, true);
            // *** Start / Stop recording ***
          } else if (res.button == 'addComment') {
            // *** Insert comment ***
            self.saveComment();
            ctx.wait(function(ev) {
              // update display
              self.showRecordingPopup();
            }, 100);
          }
      });
    },

   /**
    * Displays diagnostic submit popup.
    * @method      showSubmitPopup
    * @summary     Displays diagnostic submit popup.
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.diagnostic.showSubmitPopup( );</code>
    * @param       {boolean} [advanced] Advanced mode (by default, ''true'')
    * @param       {boolean} [recording] If ''true'', the diagnostic is saved in 'record' folder (by default, ''false'')
    * @path        ctx.diagnostic.showSubmitPopup
    */
    showSubmitPopup : function(advanced, recording) {
      if (_currentPopup != _popupState.none) {
        return;
      }
      var form = {
        group : [{
          width : 12,
          label : {
            type : e.item.type.label,
            value : GLOBAL.labels.diagnostic.submitLabel
          }
        }, {
          comment : {
            type : e.item.type.textarea,
            rows : 2,
            value : '',
            width : 12,
            tooltip : GLOBAL.labels.diagnostic.commentTooltip,
            tooltipPlacement : e.popup.position.Bottom
          }
        }]
      };

      _currentPopup = _popupState.submit;
      self.popup = ctx.popup('pDiagnostic').open({
          template: 'pDiagnosticTemplate',
          title: GLOBAL.labels.diagnostic.submitTitle,
          form: form,
          escape : "cancel",
          buttons: {
            ok: {
              label: GLOBAL.labels.buttons.submit,
              submit: true,
              tooltip: GLOBAL.labels.diagnostic.submitComment,
              tooltipPlacement: e.popup.position.Top,
              type: e.item.style.Green,
              icon: e.item.icon.ok
            },
            cancel: {
              label: GLOBAL.labels.buttons.cancel,
              submit: true,
              tooltip: GLOBAL.labels.diagnostic.cancelComment,
              tooltipPlacement: e.popup.position.Top,
              type: e.item.style.Grey,
              icon: e.item.icon.remove
            }
          }
        }).waitResult(function(res) {
          _currentPopup = _popupState.none;
          // save current values
          _comment = res.comment;
          // submit recording
          if (res.button == 'ok') {
            if (recording && (!ctx.options.trace.recording))
              self.enableRecording(true, false, recording); // if recording not started, create a folder
            self.enableRecording(false, advanced, recording);
          }
      });
    },

   /**
    * Creates an archive file (.zip).
    * @description
    *  The <wrap box>**zipArchiveFolder( )**</wrap> method of ''ctx.diagnostic'' class creates a complete archive file (.zip) of diagnostic folder.\\
    *  :!: Requires Windows Seven or more.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript>
    *   ctx.diagnostic.zipArchiveFolder( ctx.options.traceFolder );</code>
    * @method  zipArchiveFolder
    * @throws  {Error}
    * @path    ctx.diagnostic.zipArchiveFolder
    * @param   {string} [folder] Folder to be archived
    * @return  {string} ZIP File name and path
    */
    zipArchiveFolder : function (folder) {
      ctx.notifyAction('ctx.diagnostic.zipArchiveFolder');
      try {
        folder = folder || _archiveFolder;
        if (!(folder && ctx.fso.folder.exist(folder))) {
          return '';
        }
        var zipFile = folder + '.zip';
        var result = ctx.fso.file.zip([folder], zipFile, e.file.operation.NoUI);

        // delete folder
        ctx.fso.folder.remove(folder);
        //ctx.diagnostic.deleteArchiveFolder();
        
        if(result === undefined) return result;

      } catch (ex) {
        return '';
      }
      return zipFile;
    }

  };
  return self;
})();

// callback called when traces are enabled
ctx.onStartTraceCallback = function(folder) {
}

/**
* @ignore
* Callback called when traces are disabled
* @description
* @method onStopTraceCallback
* @path ctx.onStopTraceCallback
* @param {string} folder trace folder
* @param {boolean} [copyArchive] copy or send archive
* @return {string} trace archive (ZIP file)
*/
ctx.onStopTraceCallback = function(folder, copyArchive) {
  // save archive
  var zipFile = ctx.diagnostic.zipArchiveFolder(folder);
  if(zipFile) ctx.log('ctx.diagnostic: an archive was generated: ' + zipFile, e.logIconType.Warning);
  if (zipFile && copyArchive) {
    // call callback after save
    if (typeof ctx.diagnostic.saveCallback === 'function') {
      ctx.diagnostic.saveCallback(zipFile);
    }
  }
  return zipFile;
}

GLOBAL.events.evStopRequest.on(function(ev) {
  // stop recording, generate and save archive before quitting
  if ((ctx.options.trace.autoRecordingStarted && (ctx.options.trace.autoRecordingCode != e.error.OK)) || ctx.options.trace.recording) {
    // reply event to signify Stop is being handled
    ev.reply('', GLOBAL.events.evStopBeingHandled);
    ctx.diagnostic.stopInProgress = true;
    // stop recording
    ctx.wait(function(ev) {
      // before stopping recording, generate a light diagnostic
      ctx.diagnostic.enableRecording(false, false, true);
    }, 100);
  } else {
    ctx.reinitTraceFolder(false, false);
  }
});



/** display options and desktop information at startup */
GLOBAL.events.START.on(function(ev) {

	if (typeof ctx.galaxyAPI === 'undefined') {
		ctx.log(GLOBAL.labels.diagnostic.MissingMandatoryGalaxyLibrary, e.logIconType.Error);
	}
	
  GLOBAL.step({ stGetCounters: function(ev, sc, st) {
    var data = sc.data;
    ctx.set(ctx.counters, data);
    sc.endStep();
    return;
  }});


  GLOBAL.scenario({ GetCounters: function(ev, sc) {
    sc.onTimeout(30000, function(sc, st) { sc.endScenario();  }); // default timeout handler for each step
    sc.onError(function(sc, st, ex) { sc.endScenario(); }); // default error handler
    sc.setMode(e.scenario.mode.clearIfRunning);
    // add steps here...
    sc.step(GLOBAL.steps.stGetCounters);
  }}, null, 'Get counters', null, true);


  GLOBAL.step({ stGetDiagnostic: function(ev, sc, st) {
    var diagnostic = sc.data;
    //ctx.wait(function(ev) {
      ctx.diagnostic.getDesktopInfo(diagnostic);
      //ctx.diagnostic.getPrograms(diagnostic);
      sc.endStep();
    //}, 0);
    return;
  }});


  GLOBAL.scenario({ GetDiagnostic: function(ev, sc) {
    sc.onTimeout(90000, function(sc, st) { sc.endScenario();  }); // default timeout handler for each step
    sc.onError(function(sc, st, ex) { sc.endScenario(); }); // default error handler
    sc.setMode(e.scenario.mode.clearIfRunning);
    // add steps here...
    sc.step(GLOBAL.steps.stGetDiagnostic);
  }}, null, 'Get diagnostic', null, true);

  // create the special folder for technical traces (TraceViewer)
  try {
    var folder = ctx.wscript.shell.expandEnvString(ctx.options.diagnostic.techTraceFolder);
    ctx.fso.folder.create(folder);
  } catch (ex) {  }

  // load file for test users : enable auto-recording if this login is listed
  var file = ctx.options.path.bin + "\\users\\users.csv";
  if (ctx.fso.file.exist(file)) {
    var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
    var obj = ctx.json.CSV2Object(txt);
    if (obj) {
      for (var id in obj) {
        var login = String(ctx.options.userName).toLowerCase().trim();
        var machine = String(ctx.options.computerName).toLowerCase().trim();
        var value = String(obj[id]['login']).toLowerCase().trim();
        if ((login == value) || (machine == value)) {
          ctx.options.trace.autoRecording = true;
          var screenshot = String(obj[id]['screenshot']).toLowerCase().trim();
          if (screenshot == 'yes') {
            ctx.options.trace.screenshotTraces = true;
          }
          break;
        }
      }
    }
  }

  if (ctx.options.diagnostic.checkBHO) {
    // Check BHO status (I.E. Web connector)
    if (ctx.diagnostic.isAgentBHOEnabled() && ctx.diagnostic.areBHOAllowed())
      ctx.log(GLOBAL.labels.diagnostic.checkBHOSuccess, e.logIconType.Info);
    else
      ctx.log(GLOBAL.labels.diagnostic.checkBHOFail, e.logIconType.Warning);
  }

  // if the project is launched using Studio, generate a local diagnostic file (if it doesn't exist)
  if (ctx.options.diagnostic.generateSingleDevelopmentDiagnostic && ctx.options.trace.frameworkNotify) {
    ctx.diagnostic.generateLocalDiagnostic(true);
  }

  ctx.addPendingFunction(function () {
    ctx.diagnostic.saveTime();
    ctx.notifyInfo(ctx.options, GLOBAL.labels.diagnostic.options);
    var data = {};
    ctx.diagnostic.getDesktopInfo(data);
    ctx.diagnostic.desktop = data;

    if (ctx.options.trace.autoRecording) ctx.log(GLOBAL.labels.diagnostic.autoRecordingEnabled);
    if (ctx.options.trace.recording) ctx.log(GLOBAL.labels.diagnostic.recordingEnabled);
    if (ctx.options.trace.screenshotTraces) ctx.log(GLOBAL.labels.diagnostic.screenshotRecordingEnabled);
  });
});
