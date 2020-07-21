ctx._stepPath = [];

/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Scenario and Step classes ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* Scenarios are used to implement complex functionalities, while ensuring safe and maintenable coding.
*
* Scenarios are composed of steps which implement elementary functions.\\
*   * Steps can be mutualized and reused in different scenarios, as far as they implement  clear and well delimited functions.\\
*   * By default, steps are executed sequentially, loops within a set of steps are possible.\\
* \\
* A scenario can have two different states, each state will provide different methods :\\
*   * 'model' or 'template' : the scenario is being declared : there are functions to add steps, declare timeout functions, ...\\
*   * 'instance' or 'running' : the scenario was started and is running : there are functions to end current step, stop scenario, ...\\
*
* \\
* For more details, see [[:pg:orch.scenario|Monitoring complex sequences using Scenarios]].
* \\
*  ====== Scenario and step accessors ======
*/

//GLOBAL.addEvent({ $evNextStep: ''});


// *********************************************************
// *** model extension : event subscription / publishing ***
// *********************************************************
var slice = [].slice;

// *********************************************
// *** model extension : Workflow management ***
// *********************************************
/**
 * application constructor class
 * jWorkflow.js
 * (c) 2010 tinyHippos inc.
 * jWorkflow is freely distributable under the terms of the MIT license.
 * Portions of jWorkflow are inspired by Underscore.js
 * @class ctx.jWorkflow
 * @path ctx.jWorkflow
 * @ignore
 * @constructor
 */
ctx.jWorkflow = (function () {
    /** [internal use]
    * Description
    * @ignore
    * @throws {Error}
    * @method _valid
    * @param {function(string,Object)|Array|ctx.jWorkflow} func
    */
    function _valid(func) {
      if (typeof(func) !== 'function') {
        throw new Error(e.error.InvalidArgument, "expected 'function' but was " + typeof(func));
      }
    }

    /** [internal use]
    * Description
    * @ignore
    * @method _isWorkflow
    * @param {function(string,Object)|Array|ctx.jWorkflow} func
    * @return {boolean} result
    */
    function _isWorkflow(func) {
      return typeof func.andThen === 'function' &&
      typeof func.start === 'function' &&
      typeof func.chill === 'function';
    }

    /** [internal use]
    * Description
    * @ignore
    * @method _isArray
    * @param {function(string,Object)|Array|ctx.jWorkflow} func
    * @return {boolean} result
    */
    function _isArray(func) {
      return !!func.map && !!func.reduce;
    }

    var transfunctioner =
    /**
    * @lends ctx.jWorkflow
    */
    {
      /** [internal use]
      * Description
      * @ignore
      * @method order
      * @path ctx.jWorkflow.order
      * @param {function(string,Object)} func
      * @param {ctx.stepClass} [step]
      * @param {ctx.stepClass} [nextStep] optional next step object
      * @param {*} [condition] to launch the step
      * @return {Object} self object
      */
      order : function (func, step, nextStep, condition) {
        var _workflow = [],
        _tasks = [],
        _transitions = [],
        _currentTransitionIndex = 0,
        //_taskIndex = 0,
        _callback = null,
        //_task = null,
        _runningStep = null,
        _baton = (function () {
          var _taken = false;
          return {

            /** [internal use]
             * Description
             * @ignore
             * @method take
             */
            take : function () {
              _taken = true;
            },

            /** [internal use]
            * Description
            * @ignore
            * @method pass
            * @throws {Error}
            * @param {ctx.stepClass} nextStep
            * @param {*} result
            */
            pass : function (nextStep, result) {
              _taken = false;

              if (nextStep) {
                // transition by mentioning the step to move to
                /** @type {string} */ var nextStepName = ((nextStep instanceof ctx.stepClass) ? nextStep.name : '');
                /** @type {string} */ var appliName = ((nextStep instanceof ctx.stepClass && nextStep.parent) ? nextStep.parent.name : '');
                // *** nextStep mentioned : search in the list ***
                var found = false;
                for ( var index = 0; index < _tasks.length; index++ ) {
                  var task = _tasks[index];
                  if (task && task.step && (task.step.name == nextStepName) && (task.step.parent.name == appliName)) {
                    // move _taskIndex to this value
                    //_taskIndex = index;
                    _runningStep = task.step;
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  if (task && task.step && task.step.sc) { task.step.sc.clear(); }
                  throw new Error(e.error.InvalidArgument, 'ctx.scenario: unknown next step \'' + nextStepName + '\'');
                }
              } else {
                // *** search in transition list ***
                var conditionStep = null;
                var noConditionStep = null;
                if ((!_runningStep) && ( _transitions.length == 0)) {
                  // there is no transition : it is a single step scenario
                  conditionStep = (_tasks[0] ? _tasks[0].step : null); // initialize the workflow with the initial step defined in the task list
                } else {
                  var length = _transitions.length;
                  var index = _currentTransitionIndex || 0;
                  var done = false;
                  //for ( var index = 0; index < length; index++ ) {
                  while ( !done ) {
                    var transition = _transitions[index];
                    if (transition && transition.step) {
                      if (!_runningStep) {
                        conditionStep = transition.step; // initialize the workflow with the initial step defined in the transition list
                        _currentTransitionIndex = index;
                        done = true;
                      } else if (transition.step == _runningStep) {
                        if (transition.condition) {
                          if (transition.condition == result) {
                            conditionStep = transition.nextStep;
                            _currentTransitionIndex = index;
                            done = true;
                          }
                        } else {
                          noConditionStep = transition.nextStep;
                          if (!result) {
                            if (transition.nextStep && transition.step && (transition.step.name == transition.nextStep.name)) {
                              index ++; // antiloop on itself
                            }
                            _currentTransitionIndex = index;
                            done = true;
                          }
                        }
                      }
                    }
                    index ++;
                    if (index >= length) index = 0;
                    if (index == _currentTransitionIndex) { done = true; } // loop ended
                  }
                }

                var previousStep = _runningStep;
                if (conditionStep) {
                  _runningStep = conditionStep;
                } else if (noConditionStep && (!result)) {
                  _runningStep = noConditionStep;
                } else {
                  _runningStep = null; // no more step to execute
                }
              }

              if (_runningStep) {
                ctx.notifyState('step', _runningStep.name , _runningStep.id, 'start', '', (_runningStep.sc ? _runningStep.sc.name : ''), (_runningStep.sc ? _runningStep.sc.id : ''), _runningStep.parent);
                ctx.currentParentId = _runningStep.id;
                result = _runningStep.stepFunc.apply(_runningStep, [result, _baton]);

                if (!_taken) {
                  _baton.pass(nextStep, result);
                }
              } else {
                if (_callback.func) {
                  if (!_callback.step) {
                    if (ctx.currentEvent.page) {
                      _callback.step = ctx.currentEvent.page;
                    } else if (ctx.currentEvent.appli) {
                      _callback.step = ctx.currentEvent.appli;
                    }
                  }
                  _callback.func.apply(_callback.step, [result]);
                }
                // scenario is finished : reset states
                if (previousStep && previousStep.sc) {
                  //ctx.notifyState('scenario', sc.name, sc.id, 'end');
                  previousStep.sc.clear();
                  previousStep = null;
                }
                _tasks = [];
              }
            },

            /** [internal use]
             * Description
             * @ignore
             * @method drop
             * @param {string} result
             */
            drop : function (result) {
              _taken = true;
              _tasks = [];
              //_taskIndex = 0;
              setTimeout(function () {
                _baton.pass(null, result);
              }, 1);
            },
            /** [internal use]
             * Description
             * @ignore
             * @method clear
             * @param {string} result
             */
            clear : function (result) {
              _taken = true;
              _tasks = [];
              //_taskIndex = 0;
            }
          };
        } ()),
        _self = {

          /** [internal use]
          * Description
          * @ignore
          * @method andThen
          * @path ctx.jWorkflow.andThen
          * @param {function(string,Object)|Array|ctx.jWorkflow} func
          * @param {ctx.stepClass} [step]
          * @param {ctx.stepClass} [nextStep] optional next step object
          * @param {*} [condition] to launch the step
          * @return {Object} workflow object
          */
          andThen : function (func, step, nextStep, condition) {
            if (_isWorkflow(func)) {
              var f = function (prev, baton) {
                baton.take();
                if (typeof func.start === 'function') {
                  func.start({
                    callback : function (result) {
                      baton.pass(null, result);
                    },
                    /** @type {ctx.stepClass} */ step : step || null,
                    initialValue : prev
                  });
                }
              };
              _workflow.push({
                func : f,
                /** @type {ctx.stepClass} */ step : step || null
              });
            } else if (_isArray(func)) {
              var orch = function (prev, baton) {
                baton.take();
                var l = func.length,
                join = function () {
                  return --l || baton.pass();
                };

                func.forEach(function (f) {
                  ctx.jWorkflow.order(f).start(join);
                });
              };
              _workflow.push({
                func : orch,
                step : step
              });
            } else {
              _valid(func);
              if (nextStep !== undefined) {
                _transitions.push({
                  /** @type {ctx.stepClass|undefined} */ step : step,
                  /** @type {ctx.stepClass|undefined} */ nextStep : nextStep,
                  condition : condition
                });
              } else {
                // old syntax < 3.3
                var lg = _transitions.length;
                if (lg > 0) {
                  var transition = _transitions[lg - 1];
                  if (transition && (transition.nextStep === null)) {
                    transition.nextStep = step;
                  }
                }
                _transitions.push({
                  /** @type {ctx.stepClass|undefined} */ step : step,
                  /** @type {ctx.stepClass|undefined} */ nextStep : null,
                  condition : condition
                });
//                var lg = _workflow.length;
//                var task = _workflow[_workflow.length - 1];
//                if (lg > 0) {
//                  _transitions.push({
//                    /** @type {ctx.stepClass|undefined} */ step : task.step,
//                    /** @type {ctx.stepClass|undefined} */ nextStep : step,
//                    condition : undefined
//                  });
//                }
              }
              var found = false;
              ctx.each(_workflow, function(id, value) {
                if (value == step) { found = true; return false; }
              });
              if (!found) {
                _workflow.push({
                  func : step.stepFunc,
                  /** @type {ctx.stepClass|undefined} */ step : step
                });
              }
              if (nextStep) {
                found = false;
                ctx.each(_workflow, function(id, value) {
                  if (value == nextStep) { found = true; return false; }
                });
                if (!found) {
                  _workflow.push({
                    func : nextStep.stepFunc,
                    /** @type {ctx.stepClass|undefined} */ step : nextStep
                  });
                }
              }
            }
            return _self;
          },

          /** [internal use]
           * Description
           * @ignore
           * @method chill
           * @path ctx.jWorkflow.chill
           * @param {number} time
           * @return CallExpression
           */
          chill : function (time) {
            return _self.andThen(function (prev, baton) {
              baton.take();
              setTimeout(function () {
                baton.pass(null, prev);
              }, time);
            });
          },

          /** [internal use]
           * Description
           * @ignore
           * @method start
           * @path ctx.jWorkflow.start
           */
          start : function () {
            var callback,
            step,
            initialValue;

            if (arguments[0] && typeof arguments[0] === 'object') {
              callback = arguments[0].callback;
              step = arguments[0].step;
              initialValue = arguments[0].initialValue;
            } else {
              callback = arguments[0];
              step = arguments[1];
            }

            _callback = {
              func : callback,
              step : step
            };
            _tasks = _workflow.slice();
            _runningStep = null;
            _baton.pass(null, initialValue);
          },
          /** [internal use]
           * Description
           * @ignore
           * @method drop
           * @path ctx.jWorkflow.drop
           * @param {string} result
           */
          drop : function (result) {
            _baton.drop(result);
          },
          /** [internal use]
           * Description
           * @ignore
           * @method clear
           * @path ctx.jWorkflow.clear
           */
          clear : function () {
            _baton.clear();
          },
          /** [internal use]
           * Description
           * @ignore
           * @method activeStep
           * @path ctx.jWorkflow.activeStep
           * @return MemberExpression
           */
          activeStep : function () {
            return _runningStep;
          }

        };

        return func ? _self.andThen(func, step, nextStep, condition) : _self;
      }
    };
    return transfunctioner;
  })();

/**
* Returns an existing running scenario from its id
* @description
* __Ex.:__
<code javascript>
// get a running scenario by its id, to stop it
ctx.scenario(sc.id).endScenario();
</code>
*
* @method ctx.scenario
* @path ctx.scenario
* @param {number} id scenario id (or id of an existing scenario for a numeric value)
* @return {ctx.scenarioClass} scenario object
*/
ctx.scenario = function (id) {
  /** @type {ctx.scenarioClass} */ var sc = null;
  // retrieve running scenario by its id
  sc = ctx.runningScenarios.map[id];
  return sc;
}

/**
* Declares a new step or retrieves an existing step
* @description
* __Ex.:__
<code javascript>
MyAppli.step({ stGetData: function(ev, sc, st) {
  // Add code here...
  sc.endStep();
}});
</code>
*
* @method ctx.step
* @path ctx.step
* @ignore [internal use]
* @throws {Error}
* @param {string} name step name
* @param {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} [func] step definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
* @param {ctx.application} [parent] parent application
* @param {ctx.stepClass} [nextStep] optional next step object
* @param {*} [condition] to launch the step
* @return {ctx.stepClass} step object
*/
ctx.step = function (name, func, parent, nextStep, condition) {
  parent = parent || GLOBAL;
  name = name || 'stDefault';
  var st = null;
  if (typeof func === "function" ) {
    // if callback is provided, create a new step model
    if (!ctx.currentScenario) {
      // step is declared outside a scenario (global declaration) : store step in application list
      if ((!parent.steps[name])) {
        parent.steps[name] = st = new ctx.stepClass(name, func, parent);
      } else {
        throw new Error(e.error.Duplicated, 'ctx.step: name already used: ' + name);
      }
    } else {
      // step is declared inside a scenario (local declaration)
      st = new ctx.stepClass(name, func, parent, ctx.currentScenario);
      ctx.currentScenario.addStep(st, nextStep, condition);
    }
  } else {
    // no callback : step is used in a scenario
    if (!parent.steps[name]) {
      throw new Error(e.error.InvalidArgument, 'ctx.step: unknown name: ' + name);
    }
    else {
      ctx.currentScenario.addStep(parent.steps[name], nextStep, condition);
    }
  }
  return st;
}

/**
* Class to store scenarios
* @class ctx.scenarioManager
* @path ctx.scenarioManager
* @param {ctx.application} parent
* @constructor
* @advanced
*/
ctx.scenarioManager = function (parent) {
  /** class type
  * @ignore
  * @const
  * @path ctx.scenarioManager.ctxType
  * @property {string} */ this.ctxType = 'ctx.scenarioManager';

  /** running scenario map
  * @path ctx.scenarioManager.map
  * @ignore
  * @property {string} */ this.map = {};

  /** @type {ctx.application} */ var _parent = parent;

  /**
  * Clears all running scenarios, on a given application, or on all applications
  * @description
  * __Ex.:__
  * <code javascript>
  * // clear all running scenarios on all applications
  * ctx.runningScenarios.clearAll(  );
  *
  * // clear all running scenarios on application MyAppli (all instances)
  * MyAppli.scenarios.clearAll(  );
  * </code>
  * @method clearAll
  * @path ctx.scenarioManager.clearAll
  */
  this.clearAll = function () {
    ctx.notifyAction('ctx.scenarioManager.clearAll');
    for (var i in ctx.runningScenarios.map) {
      var sc = ctx.runningScenarios.map[i];
      if (_parent && sc.parent) {
        if (_parent.name == sc.parent.name) {
          sc.endScenario();
          delete ctx.runningScenarios.map[i];
        }
      } else {
        sc.endScenario();
        delete ctx.runningScenarios.map[i];
      }
    }
  }

  /**
  * Merges a set of values in the object
  * @description
  * @ignore
  * __Ex.:__
  * <code javascript>
  * GLOBAL.scenarios.set(  );
  * </code>
  * @method set
  * @path ctx.scenarioManager.set
  * @param {Object} obj object
  */
  this.set = function (obj) {
    ctx.notifyAction('ctx.scenarioManager.set');
    ctx.set(obj, this);
  }
};

/**
* creates a ctx.jobClass object
*
* @class ctx.job
* @path ctx.job
* @param {*} [obj] initialization object
* @param {ctx.dataClass} [data] initialization object
* @param {boolean} [init] full initialization
* @return {ctx.jobClass} job object
*/
ctx.job = function (obj, data, init) {
  return new ctx.jobClass(obj, data, init);
}

/**
* Class to store job execution information
* @class ctx.jobClass
* @path ctx.jobClass
* @param {*} [obj] initialization object
* @param {ctx.dataClass} [data] initialization data
* @param {boolean} [init] full initialization
* @constructor
*/
ctx.jobClass = function (obj, data, init) {
  /** class type
  * @ignore
  * @const
  * @path ctx.jobClass.ctxType
  * @property {string} */ this.ctxType = 'ctx.jobClass';

  var self = this;
  /** job id
  * @path ctx.jobClass.id
  * @property {string} */ this.id = undefined;

  /** job name
  * @path ctx.jobClass.name
  * @property {string} */ this.name = '';

  /** creation timestamp
  * @path ctx.jobClass.ts
  * @property {string} */ this.ts = undefined;

  /** execution timestamp
  * @path ctx.jobClass.tsRun
  * @property {string} */ this.tsRun = undefined;

  /** execution type : attended / unattended
  * @path ctx.jobClass.attended
  * @property {boolean} */ this.attended = undefined;

  /** execution notifcation
  * @path ctx.jobClass.notify
  * @property {boolean} */ this.notify = false;

  /** execution count
  * @path ctx.jobClass.nbRun
  * @property {number} */ this.nbRun = 0;

  /** project name
  * @path ctx.jobClass.project
  * @property {string} */ this.project = '';

  /** log archive URL
  * @path ctx.jobClass.logUrl
  * @property {string} */ this.logUrl = undefined;

  /** appliName
  * @path ctx.jobClass.appliName
  * @property {string} */ this.appliName = '';

  /** scenario
  * @path ctx.jobClass.scenario
  * @property {string} */ this.scenario = '';

  /** scenario id
  * @path ctx.jobClass.scenarioId
  * @property {string} */ this.scenarioId = '';

  /** run group id
  * @path ctx.jobClass.groupId
  * @property {string} */ this.groupId = '';

  /** comment
  * @path ctx.jobClass.comment
  * @property {string} */ this.comment = undefined;

  /** job priority
  * @path ctx.jobClass.priority
  * @property {e.priority} */ this.priority = undefined; // e.priority.normal;

  /** status
  * @path ctx.jobClass.status
  * @property {e.status} */ this.status = e.status.None;

  /** code
  * @path ctx.jobClass.code
  * @property {e.error} */ this.code = e.error.None;

  /** label
  * @path ctx.jobClass.label
  * @property {string} */ this.label = '';

  /** execution duration in seconds
  * @path ctx.jobClass.duration
  * @property {number} */ this.duration = 0;

  /** total duration in seconds between creation and end of execution
  * @path ctx.jobClass.total
  * @property {number} */ this.total = 0;

//  /** log file (recording traces)
//  * @path ctx.jobClass.log
//  * @property {string} */ this.log = '';

//  /** exception)
//  * @path ctx.jobClass.exception
//  * @property {string} */ this.exception = '';

  /** destination : M2M Id which has to execute the job
  * @path ctx.jobClass.destination
  * @property {string} */ this.destination = undefined;

  /** source : M2M Id which created the job
  * @path ctx.jobClass.source
  * @property {string} */ this.source = undefined;

  /** runBy : M2M Id which executed the job
  * @path ctx.jobClass.runBy
  * @property {string} */ this.runBy = undefined;

  /** data source
  * @path ctx.jobClass.dataSource
  * @property {string} */ this.dataSource = undefined;

  /** encryption key
  * @path ctx.jobClass.key
  * @property {string} */ this.key = undefined;

  /** previous jobs
  * @path ctx.jobClass.previousJobs
  * @property {Array<string>} */ this.previousJobs = undefined;

  /** data
  * @path ctx.jobClass.data
  * @property {ctx.dataClass} */ this.data = undefined;

  /** data format
  * @path ctx.jobClass.format
  * @property {e.data.format} */ this.format = e.data.format.none;

	/** passport : passport job
  * @path ctx.jobClass.passport
  * @property {string} */ this.passport = undefined;
	
  //  /** [Internal usage]
//  * Returns the short description for serialization
//  * @ignore
//  * @method ctxShort
//  * @path ctx.jobClass.ctxShort
//  */
//  this.ctxShort = function() {
//    return ['id', 'name', 'parent', 'job'];
//  }

  /**
  * add a job predecessor
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method addPreviousJob
  * @path ctx.jobClass.addPreviousJob
  * @param {ctx.jobClass|string} jobOrId job object or id
  */
  this.addPreviousJob = function (jobOrId) {
    var id = '';
    if (jobOrId instanceof ctx.jobClass) {
      id = jobOrId.setId();
    } else if ('string' === typeof jobOrId) {
      id = jobOrId;
    }
    if (id) {
      this.previousJobs = this.previousJobs || [];
      this.previousJobs.push(id);
    }
  }

  /**
  * initializes job data
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method init
  * @path ctx.jobClass.init
  */
  this.init = function () {
// CPUG temporary !!! reenable 'job.id' et 'job.ts'
    if (!self.ts)
      self.ts = ctx.getTimestamp(null, false, undefined, true); // creation timestamp
    if (!self.format)
      self.format = e.data.format.json;
    if (!self.id)
      self.setId();
    if (self.priority === undefined)
      self.priority = e.priority.normal;
    if (!self.status)
      self.status = e.status.New;
    if (!self.project)
      self.project = ctx.options.projectName;
  }

  /**
  * reads a job content from a filename
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method read
  * @path ctx.jobClass.read
  * @param {string} [id] job id or ob file name (if omitted, current id is kept and returned, if not defined an unique id is generated)
  * @return {boolean} success
  */
  this.read = function (id) {
    id = id || this.id;
    try {
      var fname = ctx.options.path.log + "\\jobs\\";
      if (id.toLowerCase().indexOf('.json') > 0)
        fname += id;
      else
        fname += id + ".json";
      var txt = ctx.fso.file.read(fname);
      var obj = ctx.json.parse(txt);
      this.set(obj);
      return true;
    } catch (ex) {  }
    return false;
  }

  /**
  * removes a job filename
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method remove
  * @path ctx.jobClass.remove
  * @param {string} [id] job id or ob file name (if omitted, current id is kept and returned, if not defined an unique id is generated)
  * @return {boolean} success
  */
  this.remove = function (id) {
    id = id || this.id;
    try {
      var fname = ctx.options.path.log + "\\jobs\\";
      if (id.toLowerCase().indexOf('.json') > 0)
        fname += id;
      else
        fname += id + ".json";
      return ctx.fso.file.remove(fname);
    } catch (ex) {  }
    return false;
  }

  /**
  * saves job in log folder
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method save
  * @path ctx.jobClass.save
  * @return {boolean} result
  */
  this.save = function () {
    var fname = ctx.options.path.log + "\\jobs\\" + this.id + ".json";
    var txt = ctx.json.stringify(self, null, "\t");
    ctx.fso.file.write(fname, txt);
    return true;
  }

  /**
  * initializes job id
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method setId
  * @path ctx.jobClass.setId
  * @param {string} [id] job id (if omitted, current id is kept and returned, if not defined an unique id is generated)
  * @return {string} job id
  */
  this.setId = function (id) {
    this.id = id || this.id || ctx.uuid(); // unique id
    return this.id;
  }

  /**
  * initializes job data
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method set
  * @path ctx.jobClass.set
  * @param {*} [obj] initialization object
  * @param {ctx.dataClass} [data] initialization object
  */
  this.set = function (obj, data) {
    /** @type {ctx.scenarioClass} */ var sc ;
    if (obj) {
      if (obj instanceof ctx.scenarioClass) {
        sc = obj;
        self.scenario = sc.name;
        self.appliName = sc.parent.name;
        if (sc.scenarioId) {
          self.scenarioId = sc.scenarioId;
        }
        if (sc.key) {
          self.key = sc.key;
        }
        self.name = (sc.comment || self.appliName + '.' + self.scenario);
      } else if (obj instanceof ctx.application) {
        self.appliName = obj.name
      } else if ('object' === typeof obj) {
        ctx.each(self, function(id, value) {
          if (obj[id] !== undefined) {
            if (obj[id] instanceof ctx.scenarioClass) {
              sc = obj[id];
              self.scenario = sc.name;
              self.appliName = sc.parent.name;
              if (sc.scenarioId) {
                self.scenarioId = sc.scenarioId;
              }
              if (sc.key) {
                self.key = sc.key;
              }
              self.name = (sc.comment || self.appliName + '.' + self.scenario);
            } else {
            self[id] = obj[id];
            }
          }
        });
      }
    }
    //if (data && (data instanceof ctx.dataClass)) {
    if (data && ('object' === typeof data)) {
      self.data = data;
    //} else if (data && ('object' === typeof data) && sc && sc.dataModel && sc.dataModel.create) {
    //  self.data = sc.dataModel.create(data);
    }
  }

  self.set(obj, data);
  if (init) self.init();
}

/** Running scenario array
* @path ctx.runningScenarios
* @property {ctx.scenarioManager} ctx.runningScenarios */ ctx.runningScenarios = new ctx.scenarioManager(null);

/**
* Class implementing the scenario object
* @class ctx.scenarioClass
* @path ctx.scenarioClass
* @constructor
* @advanced
* @param {string} name scenario name
* @param {function(ctx.event,ctx.scenarioClass)} func scenario definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\
* @param {ctx.application} [parent] parent application or process ('GLOBAL' by default)
* @param {ctx.scenarioClass} [model] scenario model (if running clone)
* @param {ctx.dataClass} [dataModel] data structure for the scenario
*/
ctx.scenarioClass = function (name, func, parent, model, dataModel) {
  /** class type
  * @ignore
  * @const
  * @path ctx.scenarioClass.ctxType
  * @property {string} */ this.ctxType = 'ctx.scenarioClass';

	var clone = (model ? true : false);
	
  /** definitions for object copy
  * @ignore
  * @type {Array<string>} */ var _copyData = ['scenarioId', 'comment', 'timeoutCallback', 'errorCallback', 'sourceEvent', 'scenarioTimeoutDelay', 'timeoutDelay'];
  var _workflow = null;
  /** @type {Date} */ var _startDate;
  /** @type {Date} */ var _endDate;
  /** @type {Object} */ var _inputData;

  /** @type {function(ctx.event,ctx.scenarioClass)} */ var _func = func || null;

  /** @type {ctx.scenarioClass} */ var _scn = this;

  /** application instance list
  * @path ctx.scenarioClass.appliInst
  * @advanced
  * @property {Object} */ this.appliInst = {};

  /** scenario model or clone (running instance)
  * @ignore
  * @path ctx.scenarioClass.clone
  * @property {boolean} */ this.clone = clone || false;

  /** scenario error code
  * @path ctx.scenarioClass.code
  * @property {string} */ this.code = e.error.None;

  /** scenario comment
  * @path ctx.scenarioClass.comment
  * @advanced
  * @property {string} */ this.comment = "";

  /** scenario id
  * @path ctx.scenarioClass.scenarioId
  * @property {string} */ this.scenarioId = '';

  /** data container model
  * @path ctx.scenarioClass.dataModel
  * @property {ctx.dataClass} */ this.dataModel = this.dataModel || dataModel || null;

  /** data container
  * @path ctx.scenarioClass.data
  * @property {ctx.dataClass} */ this.data = null;

  /** scenario disabled
  * @ignore
  * @path ctx.scenarioClass.disabled
  * @property {boolean} */ this.disabled = false;

  /** scenario info
  * @path ctx.scenarioClass.job
  * @property {ctx.jobClass} */ this.job = null;

  /** optional key name for data cyphering
  * @path ctx.scenarioClass.key
  * @property {string} */ this.key = "";

  /** scenario ending function
  * @path ctx.scenarioClass.endFunc
  * @advanced
  * @property {function(ctx.scenarioClass)} */ this.endFunc = null;

  /** onEnd parent id
  * @path ctx.scenarioClass.onEndParentId
  * @ignore
  * @property {number} */ this.onEndParentId = 0;

  /** error handler function
  * @path ctx.scenarioClass.errorCallback
  * @property {function(ctx.scenarioClass,ctx.stepClass,Object)} */ this.errorCallback = null;

  if (this.clone) {
    /** unique identifier
    * @path ctx.scenarioClass.id
    * @property {number} */ this.id = ctx.objectIndex ++;
  }

  /** local data container
  * @path ctx.scenarioClass.localData
  * @property {Object} */ this.localData = {};

  /** scenario name
  * @path ctx.scenarioClass.name
  * @property {string} */ this.name = name;

  /** parent application
  * @path ctx.scenarioClass.parent
  * @property {ctx.application} */ this.parent = parent || GLOBAL;

  /** scenario running state
  * @path ctx.scenarioClass.running
  * @advanced
  * @property {boolean} */ this.running = false;

  /** scenario terminated state
  * @path ctx.scenarioClass.terminated
  * @advanced
  * @property {boolean} */ this.terminated = false;

  /** main vs. sub scenario 
  * @path ctx.scenarioClass.main
  * @advanced
  * @property {boolean} */ this.main = false;

  /** remove output on scenario exit 
  * @path ctx.scenarioClass.removeDataOutput
  * @advanced
  * @property {boolean} */ this.removeDataOutput = false;

  /** cancel mode
  * @path ctx.scenarioClass.runningMode
  * @ignore
  * @property {e.scenario.mode} */ this.runningMode = e.scenario.mode.clearIfRunning;

  /** source event to be replied to
  * @path ctx.scenarioClass.sourceEvent
  * @ignore
  * @property {ctx.event} */ this.sourceEvent = null;

  /** step list
  * @path ctx.scenarioClass.steps
  * @advanced
  * @property {Array<ctx.stepClass>} */ this.steps = [];

  /** timeout delay for each step
  * @path ctx.scenarioClass.timeoutDelay
  * @advanced
  * @property {number} */ this.timeoutDelay = 0;

  /** timeout handler function for each step
  * @path ctx.scenarioClass.timeoutCallback
  * @property {function(ctx.scenarioClass,ctx.stepClass)} */ this.timeoutCallback = null;

  /** scenario timer object
  * @path ctx.stepClass.scenarioTimeoutObject
  * @ignore
  * @property {number} */ this.scenarioTimeoutObject = 0;

  /** timeout delay for the global scenario
  * @path ctx.scenarioClass.scenarioTimeoutDelay
  * @advanced
  * @property {number} */ this.scenarioTimeoutDelay = 0;

  var _startScenarioTimer = function (clear) {
    if (_scn.running) {
      // clear potential running timer
      if (clear) {
        _stopScenarioTimer();
      }
      if ((!_scn.scenarioTimeoutObject) && (_scn.scenarioTimeoutDelay) && (!ctx.options.timeoutDisabled)) {
        _scn.timeoutIndex = ctx.objectIndex++;
        var strTimeoutName = 'timeout(' + _scn.name + ')' ;
        ctx.notifyState('once', strTimeoutName, _scn.timeoutIndex, 'set', '', _scn.name, _scn.id);
        _scn.scenarioTimeoutObject = setTimeout( function(scn) { return function() {
          if (ctx.options.autoTest) {
            // TODO 2JM : manage timeout
            var todo = 0;
          }
          ctx.notifyState('once', strTimeoutName, scn.timeoutIndex, 'run', '', scn.name, scn.id);
          ctx.options.trace.autoRecordingCode = e.error.TimeOut;
          var label = 'Scenario ' + scn.parent.name + '.' + scn.name + ': timeout';
          if (scn.job) {
            scn.code = scn.job.code = e.error.TimeOut;
            scn.label = scn.job.label = label;
            scn.job.status = e.status.Failed;
            if (ctx.options.trace.autoRecordingStarted && ctx.options.traceFolderRecording) {
              scn.job.log = ctx.options.traceFolderRecording;
            }
          }
          var stLog = ctx.ctxShort(scn);
          ctx.log(stLog, e.logIconType.Error, label);
          var prevParentId = ctx.currentParentId;
          ctx.currentParentId = scn.timeoutIndex;
          var step = scn.currentStep();
          if (step && step.running) {
            var timeoutCallback;
            if (step.timeoutCallback) {
              // set a step timeout handler
              timeoutCallback = step.timeoutCallback;
            } else if (step.sc.timeoutCallback) {
              // set the scenario timeout handler
              timeoutCallback = step.sc.timeoutCallback;
            }
            if (timeoutCallback) {
              timeoutCallback(scn, scn.currentStep());
            }
          }
          ctx.currentParentId = prevParentId;
          ctx.notifyState('once', strTimeoutName, scn.timeoutIndex, 'reset', '', scn.name, scn.id);
        }; }(_scn), _scn.scenarioTimeoutDelay);
      }
    }
  }

  var _stopScenarioTimer = function () {
    // clear potential running timer
    if (_scn.scenarioTimeoutObject) {
      clearTimeout(_scn.scenarioTimeoutObject);
      _scn.scenarioTimeoutObject = 0;
    }
  }

  /**
  * Adds a step object in the scenario
  * @description
  * __Ex.:__
<code javascript>
// add a step in scenario
sc.addStep(st);
</code>
  * @method addStep
  * @throws {Error}
  * @ignore
  * @path ctx.scenarioClass.addStep
  * @param {ctx.stepClass} step step object
  * @param {ctx.stepClass} [nextStep] optional next step object
  * @param {*} [condition] to launch the step
  * @return {ctx.stepClass} step object
  */
  this.addStep = function (step, nextStep, condition) {
    if (!(step instanceof ctx.stepClass))
      throw new Error(e.error.InvalidArgument, 'Step not created');
    /** @type {ctx.stepClass} */ var clonedStep;
    /** @type {ctx.stepClass} */ var clonedNextStep;
    ctx.each(_scn.steps, function(id, value) {
      if (( value instanceof ctx.stepClass) && (value.name == step.name) && (value.parent.name == step.parent.name)) {
        clonedStep = value;
        return false;
      }
    });
    if (!clonedStep) {
      clonedStep = step.cloneStep(this);
      _scn.steps.push(clonedStep);
    }
    if (nextStep && (nextStep instanceof ctx.stepClass)) {
      ctx.each(_scn.steps, function(id, value) {
        if (( value instanceof ctx.stepClass) && (value.name == nextStep.name) && (value.parent.name == nextStep.parent.name)) {
          clonedNextStep = value;
          return false;
        }
      });
      if (!clonedNextStep) {
        clonedNextStep = nextStep.cloneStep(this);
        _scn.steps.push(clonedNextStep);
      }
    }
    if (nextStep === null) {
      clonedNextStep = null;
    }
    ctx.notifyState('step', clonedStep.name , clonedStep.id, 'add', '', (clonedStep.sc ? clonedStep.sc.name : ''), (clonedStep.sc ? clonedStep.sc.id : -1), clonedStep.parent);

    if (_workflow) {
      _workflow.andThen(clonedStep.stepFunc, clonedStep, clonedNextStep, condition);
    } else {
      _workflow = ctx.jWorkflow.order(clonedStep.stepFunc, clonedStep, clonedNextStep, condition);
    }
    return clonedStep;
  }

  /** [Internal usage]
  * Gets internal baton object
  * @method baton
  * @ignore
  * @protected
  * @path ctx.scenarioClass.baton
  * @return {Object} baton object
  */
  this.baton = function () {
    if (_workflow)
      return _workflow.baton;
    else
      return null;
  }

  /**
  * Calls onEnd callback
  * Internal usage only : use ctx.scenarioClass.endScenario()
  * @description
  * __Ex.:__
<code javascript>
sc.clear();
</code>
  * @method callOnEnd
  * @ignore
  * @protected
  * @path ctx.scenarioClass.callOnEnd
  */
  this.callOnEnd = function () {
    if (this.endFunc && (typeof this.endFunc === 'function')) {
        // restore parent Id
        var id = ctx.objectIndex++;
        ctx.notifyState('onEnd', this.name, id, 'run', '', '', this.onEndParentId, this.parent);
        // call end callback
        this.endFunc(this);
    }
  }

  /**
  * Clears an existing scenario
  * Internal usage only : use ctx.scenarioClass.endScenario()
  * @description
  * __Ex.:__
<code javascript>
sc.clear();
</code>
  * @method clear
  * @ignore
  * @protected
  * @path ctx.scenarioClass.clear
  * @param {boolean} [init] initial or end clear
  * @param {boolean} [cancel] if true, cancel scenario execution, reset it to initial data and 'New' status
  * @return {ctx.scenarioClass} scenario object
  */
  this.clear = function (init, cancel) {
    this.running = false;

    if (init) {
      _startDate = new Date();
      // start the scenario timer now (if not started)
      _startScenarioTimer(false);
      // copy initial data
      _inputData = this.data;
      this.job.status = e.status.New;
      this.job.duration = 0;
      this.job.total = 0;
      this.job.code = this.code = e.error.None;
      this.job.label = this.label = '';
      if (!this.job.ts)
        this.job.ts = ctx.getTimestamp(_startDate, false, undefined, true);
      if ((typeof ctx.galaxyAPI !== 'undefined') && this.main) {
        //ctx.galaxyAPI.showProgressPopup(this.job, true);
				if (systray)
					systray.addToJobList(this.job);
      }
    } else {
      this.terminated = true;

      // clear potential running timer
      _stopScenarioTimer();
			//_stopStepTimer();

      if (this.steps.length) {
        this.steps = []; // reset step list
      }
      ctx.runningScenarios.map[this.id] = undefined;
      delete ctx.runningScenarios.map[this.id];
      if (_workflow) {
        _workflow.clear();
        _workflow = null;
      }

      if (cancel) {
				if (this.job.attended) {
	        // cancel execution in attended mode: failure
	        //this.job.status = e.status.Failed;
					this.job.status = e.status.Canceled;
	        this.job.code = this.code = e.error.Canceled;
	        this.job.label = this.label = 'Job was canceled';
	        this.job.tsRun = undefined;
	        this.job.data = _inputData;
				} else {
	        // cancel execution in unattended mode: reject job and restore initial values
	        //this.job.status = e.status.New;
					this.job.status = e.status.Canceled;
	        this.job.code = this.code = e.error.None;
	        this.job.label = this.label = 'Job was canceled';
	        this.job.tsRun = undefined;
	        this.job.data = _inputData;
				}
      } else {
        // compute ts and durations
        if (!this.code) this.code = e.error.OK;
        if (this.job.code != this.code) this.job.code = this.code;
        if (this.label && (this.job.label != this.label)) this.job.label = this.label;
        if (this.code == e.error.OK)
          this.job.status = e.status.Successful;
        else
          this.job.status = e.status.Failed;
        _endDate = new Date();
        if (_startDate)
          this.job.duration = Math.ceil((_endDate.getTime() - _startDate.getTime()) / 1000);
        this.job.nbRun = this.job.nbRun || 0;
        this.job.nbRun ++;
        if (!this.job.ts)
          this.job.ts = ctx.getTimestamp(_startDate, false, undefined, true);
        if (!this.job.tsRun)
          this.job.tsRun = ctx.getTimestamp(_endDate, false, undefined, true);
        this.job.total = ctx.computeTimeInterval(this.job.ts, this.job.tsRun, true);
				if (this.removeDataOutput && this.job.data && this.job.data.del) {
					this.data = this.job.data = {}; // delete output
				}
        if ((this.job.status == e.status.Failed) && ctx.options.trace.autoRecordingStarted && ctx.options.diagnostic.archiveURL && ctx.options.traceFolderRecording) {
          var logUrl = ctx.options.diagnostic.archiveURL + "/" + ctx.options.traceFolderRecording + ".zip";
          if (this.job.data && ('object' === typeof this.job.data))
            this.job.data.logUrl = logUrl; // temporary
          this.job.logUrl = logUrl;
        }
      }

      ctx.notifyState('scenario', this.name, this.id, 'end', this.code, '', ctx.currentParentId, this.parent);
      //_savedData.input = null;
      //_savedData.output = null;

      this.callOnEnd();

      if (this.sourceEvent && this.sourceEvent instanceof ctx.event) {
        // reply to the source event
        this.sourceEvent.reply(this.data);
      }

      if (typeof ctx.galaxyAPI !== 'undefined' && this.main) {
        // save job on server
				if (this.job.attended && ctx.options.galaxyAPI) {
	        ctx.galaxyAPI.updateRunJob(this.job);
				}
        //ctx.galaxyAPI.showProgressPopup(this.job, false);
				if (systray)
					systray.addToJobList(this.job);
      }

      if (ctx.isEmpty(ctx.runningScenarios.map)) {
        if (ctx.options.trace.autoRecordingStarted) {
          // stop auto recording if there is no more running scenario
          // - si scenario failed : archive folder trace
          // - si scenario succeeded : delete folder trace
          var isOK = (ctx.options.trace.autoRecordingCode == e.error.OK)
          if ((!isOK) && ctx.diagnostic && ctx.diagnostic.saveAll) {
            // before stopping recording, generate a light diagnostic
            ctx.diagnostic.saveAll(false);
          }
          ctx.reinitTraceFolder(true, false, true, isOK);
          ctx.options.trace.autoRecordingStarted = false;
          ctx.options.trace.autoRecordingCode = e.error.OK;
        }

        if (ctx.shutdownOnIdle) {
          // shutdown on idle
          ctx.shutdownAgent(ctx.restartAgent, false);
        }
      }
    }
    return this;
  }

  if (!this.clone)
  {
    // *******************************
    // *** Scenario model : static ***
    // *******************************
    /**
    * Clones a given scenario
    * @description
    * __Ex.:__
<code javascript>
var sc2 = sc.cloneScenario();
</code>
    * @ignore [Internal usage]
    * @method cloneScenario
    * @path ctx.scenarioClass.cloneScenario
    * @return {ctx.scenarioClass} cloned scenario
    */
    this.cloneScenario = function () {
      var sc = new ctx.scenarioClass(this.name, _func, this.parent, this, this.dataModel); // create new
      return sc;
    }
  }

  /** [Internal usage]
  * Returns the short description for serialization
  * @ignore
  * @method ctxShort
  * @path ctx.<.ctxShort
  */
  this.ctxShort = function() {
    return ['ctxType', 'id', 'name', 'parent', 'job'];
  }

  if (this.clone)
  {
    /**
    * Returns the current step in the running scenario
    * @description
    * __Ex.:__
<code javascript>
var st = sc.currentStep();
</code>
    * @method currentStep
    * @path ctx.scenarioClass.currentStep
    * @return {ctx.stepClass} scenario object
    */
    this.currentStep = function () {
      var st = null;
      if (_workflow)
        st = _workflow.activeStep();
      return st;
    }
  }

  if (this.clone)
  {
    /**
    * Cancels a running scenario and restores it in 'New' status.
    * @description
    * __Ex.:__
<code javascript>
// start scenario, memorize scenario object in application data
sc.cancelScenario();
...
MyAppli.data.MyScenario.cancelScenario();
</code>
    * @method cancelScenario
    * @path ctx.scenarioClass.cancelScenario
    * @return {ctx.scenarioClass} scenario object
    */
    this.cancelScenario = function () {
      this.endScenario(true);
      return this;
    }
  }

  if (this.clone)
  {
    /**
    * Stops and clears an existing scenario
    * @description
    * __Ex.:__
<code javascript>
// start scenario, memorize scenario object in application data
MyAppli.data.MyScenario = MyAppli.scenarios.MyScenario.start();
...
MyAppli.data.MyScenario.endScenario();
</code>
    * @method endScenario
    * @path ctx.scenarioClass.endScenario
    * @param {boolean} [cancel] if true, cancel scenario execution, reset it to initial data and 'New' status
    * @return {ctx.scenarioClass} scenario object
    */
    this.endScenario = function (cancel) {
      if (_workflow) {
        var st = _workflow.activeStep();
        if (st) {
          st.endStep(null, true);
        }
      }
      this.clear(false, cancel);
      return this;
    }
  }

  if (this.clone)
  {
    /**
    * Ends the current step in the running scenario, and starts the next step
    * @description
    * __Ex.:__
<code javascript>
MyAppli.step({stGetData: function(ev, sc, st) {
  // start MyAppli page if needed
  MyAppli.MyPage.start();
  MyAppli.MyPage.wait(function(ev) {
    ...
    // step done
    sc.endStep();
  });
}});
</code>
    * @method endStep
    * @path ctx.scenarioClass.endStep
    * @param {ctx.stepClass|*} [result] result code, or next step to move to : if omitted, the next step in the chain is started.\\ If mentioned, the mentioned step is executed
    * @return {ctx.scenarioClass} scenario object
    */
    this.endStep = function (result) {
      var st = this.currentStep();
      if (st) {
        st.endStep(result);
      }
      return this;
    }
  }

  /** Checks if an instance of the scenario is running [Internal usage]
  * @description
  * __Ex.:__
<code javascript>
if (MyAppli.scenarios.MyScenario.isRunning()) {
  ...
}
</code>
  * @method isRunning
  * @path ctx.scenarioClass.isRunning
  * @return {boolean} true if a scenario instance is running
  */
  this.isRunning = function () {
    var res = false;
    if (this.clone) {
      // running instance
      res = this.running;
    } else {
      // static model : check if there is a running scenario with the same name and parent
      for (var i in ctx.runningScenarios.map) {
        var sc = ctx.runningScenarios.map[i];
        if ((this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
          res = true;
          break;
        }
      }
    }
    return res;
  }

  /**
  * Declares a callback called when the scenario is ended
  * @description
  * __Ex.:__
<code javascript>
var sc = MyAppli.scenarios.MyScenario.start().onEnd(function() {
// function called when the scenario is ended...
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **sc.onEnd** + 'TAB' :
  *
<code javascript>
sc.onEnd( function(sc2) {

});
</code>
  * </WRAP>
  * @method onEnd
  * @path ctx.scenarioClass.onEnd
  * @param {function(ctx.scenarioClass)} func callback called when the scenario is ended\\ - //{ctx.scenarioClass}// **sc** : the scenario object
  * @return {ctx.scenarioClass} scenario object
  */
  this.onEnd = function (func) {
    this.onEndParentId = ctx.currentParentId;
    this.endFunc = func;
    if (this.terminated && !this.running) {
      this.callOnEnd();
    }
    return this;
  }

  if (this.clone)
  {
    /**
    * Declares a default error handler on a scenario
    * @description
    * This error handler is used by default on any step in the scenario
    *
    * __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default error handler
  sc.onError(function (sc, st, ex) { sc.endScenario(); });
  ...
}});
</code>
    *
    * <WRAP tip>You can use 'snippets' to accelerate development :
    *   * **sc.onError** + 'TAB' :
    *
<code javascript>
sc.onError( function(sc, st, ex) {
  sc.endScenario();
  ...
});
</code>
    * </WRAP>
    * @method onError
    * @path ctx.scenarioClass.onError
    * @param {function(ctx.scenarioClass,ctx.stepClass,Object)} func error definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object\\ - //{Object}// **ex** : the exception object
    * @return {ctx.scenarioClass} scenario object
    */
    this.onError = function (func) {
      this.errorCallback = func;
      return this;
    }
  }

  if (this.clone)
  {
    /**
    * Declares a default timeout handler on a scenario
    * @description
    * This timeout handler is used by default on any step in the scenario
    *
    * __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default timeout handler
  sc.onTimeout(5000, function (sc, st) { sc.endScenario(); });
  ...
}});
</code>
    *
    * <WRAP tip>You can use 'snippets' to accelerate development :
    *   * **sc.onTimeout** + 'TAB' :
    *
<code javascript>
sc.onTimeout( 30000, function(sc, st) {
  sc.endScenario();
  ...
});
</code>
    * </WRAP>
    * @method onTimeout
    * @path ctx.scenarioClass.onTimeout
    * @param {number} delay timeout delay (in ms)
    * @param {function(ctx.scenarioClass,ctx.stepClass)} func timeout definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
    * @return {ctx.scenarioClass} scenario object
    */
    this.onTimeout = function (delay, func) {
      if (delay) {
        this.timeoutDelay = delay;
      }
      if (typeof(func) === 'function') {
        this.timeoutCallback = func;
      }
      return this;
    }
  }

  if (this.clone)
  {
    /**
    * Declares a timeout delay for the global scenario
    * @description
    * This timeout handler is used as a global timeout on the scenario
    *
    * __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default timeout handler
  sc.setScenarioTimeout(600000);
  ...
}});
</code>
    * @method setScenarioTimeout
    * @path ctx.scenarioClass.setScenarioTimeout
    * @param {number} delay timeout delay (in ms)
    * @return {ctx.scenarioClass} scenario object
    */
    this.setScenarioTimeout = function (delay) {
      this.scenarioTimeoutDelay = delay;
      if (this.running) {
        _startScenarioTimer(true);
      }
      return this;
    }
  }

  /** [internal use]
  * Description
  * @ignore
  * @method scFunc
  * @path ctx.scenarioClass.scFunc
  * @param {function(ctx.event,ctx.scenarioClass)} [func] scenario callback
  * @return _func
  */
  this.scFunc = function (func) {
    if (func) _func = func;
    return _func;
  }

  if (this.clone)
  {
    /**
    * Resets the default instance for the application
    * @description
    * __Ex.:__
<code javascript>
Amazon.step({ stStop: function(ev, sc, st) {
  Amazon.pHome.close();
  sc.resetDefaultInst(Amazon);
}});
</code>
    * @method resetDefaultInst
    * @path ctx.scenarioClass.resetDefaultInst
    * @param {ctx.application} obj application object
    * @return {boolean} return true if instance was reset
    */
    this.resetDefaultInst = function (obj) {
      var res = false;
      if (obj && (obj instanceof ctx.application)) {
        delete this.appliInst[obj.name] ;
        res = true;
      }
      return res;
    }

    /**
    * Memorizes the default instance for the application
    * @description
    * __Ex.:__
<code javascript>
Amazon.step({ stStart: function(ev, sc, st) {
  // force page launch
  Amazon.pHome.start(undefined, undefined, undefined, undefined, true);
  Amazon.events.START.on(function(ev) {
    if (sc.setDefaultInst(ev))
      sc.endStep();
  });
}});
</code>
    * @method setDefaultInst
    * @path ctx.scenarioClass.setDefaultInst
    * @param {ctx.application|ctx.event} obj application or event object
    * @return {boolean} return true if instance was memorized
    */
    this.setDefaultInst = function (obj) {
      var res = false;
      if (obj && (obj instanceof ctx.event)) {
        //if ((obj.appliInst > 0) && (!this.appliInst[obj.appliName])) {
        if (obj.appliInst > 0) {
          this.appliInst[obj.appliName] = obj.appliInst;
          res = true;
        }
      } else if (obj && (obj instanceof ctx.application)) {
        //if ((obj.instance > 0) && (!this.appliInst[obj.name])) {
        if (obj.instance > 0) {
          this.appliInst[obj.name] = obj.instance;
          res = true;
        }
      }
      return res;
    }
  }

  /**
  * Declares the start mode on a scenario
  * @description
  * The start mode is used to define the behavior when the scenario is started.
  *
  * __Ex.:__
  *  * if a scenario with the same name is running, it is cancelled
  *  * if a scenario with the same name is running, the new scenario is not started
  *  * all running scenarios are cancelled
  *  * ...
  *
  * __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default error handler
  sc.setMode(e.scenario.mode.clearIfRunning);
  ...
}});
</code>
  * @method setMode
  * @path ctx.scenarioClass.setMode
  * @param {e.scenario.mode} mode start mode (see '[[lib:common:ctx.enum#escenariomode|e.scenario.mode]]' for more details)

  * @return {ctx.scenarioClass} scenario object
  */
  this.setMode = function (mode) {
    this.runningMode = mode;
    return this;
  }

  /**
  * Declares the comment on a scenario
  * @method setComment
  * @path ctx.scenarioClass.setComment
  * @param {string} comment
  * @return {ctx.scenarioClass} scenario object
  */
  this.setComment = function (comment) {
    this.comment = comment;
    return this;
  }

  /**
  * Declares the uuid on a scenario
  * @method setId
  * @path ctx.scenarioClass.setId
  * @param {string} scenarioId
  * @return {ctx.scenarioClass} scenario object
  */
  this.setId = function (scenarioId) {
    this.scenarioId = scenarioId;
    return this;
  }

  /**
  * Declares the uuid on a scenario
  * @method setKey
  * @path ctx.scenarioClass.setKey
  * @param {string} key
  * @return {ctx.scenarioClass} scenario object
  */
  this.setKey = function (key) {
    this.key = key;
    return this;
  }

  /**
  * Declares the data model on a scenario
  * @method setDataModel
  * @path ctx.scenarioClass.setDataModel
  * @param {ctx.dataClass} dataModel
  * @return {ctx.scenarioClass} scenario object
  */
  this.setDataModel = function (dataModel) {
    this.dataModel = dataModel;
    return this;
  }


  /**
  * Sets an error on a scenario
  * @description
  *
  * __Ex.:__
<code javascript>
  ...
  sc.setError(e.error.NotConnected, 'The channel is not connected');
  ...
</code>
  * @method setError
  * @path ctx.scenarioClass.setError
  * @param {e.error} error error code (see '[[lib:common:ctx.enum#eerror|e.error]]' for more details)
  * @param {string} [label] error label
  * @return {ctx.scenarioClass} scenario object
  */
  this.setError = function (error, label) {
    ctx.options.trace.autoRecordingCode = this.code = this.job.code = error;
    this.job.status = e.status.Failed;
    //label = 'Step ' + this.parent.name + '.' + this.name + (this.currentStep() ? '.' + this.currentStep().name : '') + ': [' + error + '] ' + (label ? ': ' + label : '');
    this.job.label = label;
    var stLog = ctx.ctxShort(this);
    ctx.log(stLog, e.logIconType.Error, label);
    return this;
  }

  if (!this.clone)
  {
    /**
    * Starts an existing scenario
    * @description
    * __Ex.:__
<code javascript>
// declare scenario
MyAppli.scenario({ scCRMGetData: function(ev, sc) { ... }});
...
// start scenario
var data = { ... }; // input data
var sc = MyAppli.scenarios.scCRMGetData.start( data );
</code>
    * @method start
    * @path ctx.scenarioClass.start
    * @param {Object} [data] initialization data
    * @param {ctx.event|ctx.jobClass} [sourceEvent] source event to be replied to
    * @param {ctx.jobClass} [job]
    * @return {ctx.scenarioClass} scenario object
    */
    this.start = function (data, sourceEvent, job) {
      // never instanciate the model, create a clone
      /** @type {ctx.scenarioClass} */ var sc = this.cloneScenario();
      if (sourceEvent && (sourceEvent instanceof ctx.jobClass)) {
        job = sourceEvent;
        sourceEvent = undefined;
      }
      var parentId = ctx.currentParentId;
      sc.sourceEvent = sourceEvent;
			if (!ctx.currentStep)
				sc.main = true;
      if (job && (job instanceof ctx.jobClass)) sc.job = job;
			if (sc.job.attended === undefined) sc.job.attended = true;
			if (data) sc.job.data = data;
			if(ctx.currentStep
				&& ctx.currentStep.sc
				&& ctx.currentStep.sc.job
				&& ctx.currentStep.sc.job.passport)
				sc.job.passport = ctx.currentStep.sc.job.passport;
			
			if (typeof ctx.galaxyAPI === 'undefined') {
				ctx.log("Scenario '"+ sc.name + "' could not be started", e.logIconType.Error);
			}
			else {
				if ((typeof ctx.galaxyAPI !== 'undefined') && sc.main && sc.job.attended && ctx.options.galaxyAPI ) {
		      // start of attended job is conditioned to job addition on server side
					ctx.galaxyAPI.addJob(sc.job, function(code, label, job) {
						if (code == e.error.OK) {
			        ctx.currentParentId = parentId;
			        sc.job.id = job.id;
							// update Systray status
							if (sc.main && ('undefined' !== typeof systray)) {
								systray.updateRunningStatus(true, sc.job);
							}
							sc.startClone(data);
						} else {
							ctx.log("Scenario '"+ sc.name + "' could not be started", e.logIconType.Error);
						}
					});
				} else {
		      // differed start
		      ctx.addPendingFunction(function () {
		        ctx.currentParentId = parentId;
						// update Systray status
						if (sc.main && ('undefined' !== typeof systray)) {
							systray.updateRunningStatus(true, sc.job);
						}
						sc.startClone(data);
		      });
				}
			}

      return sc;
    }
    /** alias used for Intellisense
    * @method $start
    * @path ctx.scenarioClass.$start
    * @ignore
    */
    this.$start = sc;
  }

  if (this.clone)
  {
    // ****************************
    // *** Clone mode : running ***
    // ****************************
    /**
    * Starts an existing cloned scenario
    * @description
    * __Ex.:__
<code javascript>
var sc = this.cloneScenario();
sc.startClone(data);
</code>
    *
    * @method startClone
    * @ignore
    * @path ctx.scenarioClass.startClone
    * @param {Object} [data] initialization data
    * @return {ctx.scenarioClass} scenario object
    */
    this.startClone = function (data) {
      if (!ctx.counters.scenarios[this.parent.name]) ctx.counters.scenarios[this.parent.name] = {};
      if (ctx.counters.scenarios[this.parent.name][this.name])
        ctx.counters.scenarios[this.parent.name][this.name] ++;
      else
        ctx.counters.scenarios[this.parent.name][this.name] = 1;

      // set initial data
			if ((!this.dataModel) && ctx.dataManagers && ctx.dataManagers.rootData) {
				// if no dataType associated to scenario, use rootData by default
				this.dataModel = ctx.dataManagers.rootData;
				this.removeDataOutput = true;
			}
      if (data && ('object' === typeof data)) {
        if ((data.ctxType == 'ctx.dataClass') && (this.dataModel) && (this.dataModel.ctxType == 'ctx.dataClass') && data.ctxName && (data.ctxName == this.dataModel.ctxName)) {
          this.data = data; // keep it as is
        } else {
          var initData = null;
          if (this.dataModel instanceof ctx.dataClass) {
            initData = this.dataModel.create(); // use provided model
          } else {
            initData = ctx.dataManager(); // no model provided, create an empty dataManager
          }
          this.data = initData.complete(data);
        }
      } else {
        if (this.dataModel instanceof ctx.dataClass) {
          this.data = this.dataModel.create(); // use provided model
        } else {
          this.data = ctx.dataManager(); // no model provided, create an empty dataManager
        }
      }
//      //if ((data instanceof ctx.dataClass) && (this.dataModel instanceof ctx.dataClass) && data.ctxName && (data.ctxName == this.dataModel.ctxName)) {
//      if (data && (data.ctxType == 'ctx.dataClass') && (this.dataModel) && (this.dataModel.ctxType == 'ctx.dataClass') && data.ctxName && (data.ctxName == this.dataModel.ctxName)) {
//        // don't make a copy, get a reference
//        this.data = data;
//      } else {
//        // create a data structure, copy input data
//        var intData = null;
//        if (this.dataModel instanceof ctx.dataClass) {
//          intData = this.dataModel.create(); // use provided model
//        } else {
//          intData = ctx.dataManager(); // no model provided, create an empty dataManager
//        }
//        if (data && (typeof data === 'object')) {
//          // copy input data
//          intData.set(data);
//          // now enrich input object with dataManager attributes
//          ctx.set(intData, data);
//          this.data = data;
//        } else {
//          this.data = intData;
//        }
//      }
      this.job.data = this.data;

      this.clear(true); // reset existing state

      var obj = {
        callback: null,
        step: null,
        initialValue: null
      };

      // Memorize as running scenario
      this.running = true;
      //this.synchronous = true;
      ctx.runningScenarios.map[this.id] = this;

      // activate autorecording mode
      if ((ctx.options.trace.autoRecording) && (!ctx.options.trace.autoRecordingStarted)) {
        ctx.reinitTraceFolder(false, true, true);
        ctx.options.trace.autoRecordingCode = e.error.OK;
        ctx.options.trace.autoRecordingStarted = true;
        // force current event generation
        var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
        ctx.notifyEvent(lastEvent, true);
      }

      // Lock the default instance to use for this scenario
      var parent = this.parent;
      var desc = this.parent.getObjectDescriptor();
      if (desc.appli && desc.appli.instance > 0) {
        parent = desc.appli;
        this.setDefaultInst(parent);
      }

      ctx.notifyState('scenario', this.name, this.id, 'start', parent, '', ctx.currentParentId, this.parent);

      if (_func) {
        ctx.currentScenario = this;
        var oldParentId = ctx.currentParentId;
        ctx.currentParentId = this.id;
        _func.apply(this.parent, [ctx.currentEvent, this]);
        ctx.currentParentId = oldParentId;
      }

      // Check running mode
      switch (this.runningMode) {
        case e.scenario.mode.noStartIfRunning:
        {
          // don't launch if a scenario with same name and parent is running
          for (var i in ctx.runningScenarios.map) {
            var sc = ctx.runningScenarios.map[i];
            if ((sc != this) && (this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
              this.endScenario();
              return sc;
            }
          }
          break;
        }
        case e.scenario.mode.clearIfRunning:
        {
          // clear if a scenario with same name and parent is running
          for (var i in ctx.runningScenarios.map) {
            var sc = ctx.runningScenarios.map[i];
            if ((sc != this) && (this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
              sc.endScenario();
            }
          }
          break;
        }
        case e.scenario.mode.clearAll:
        {
          // clear all running scenarios except this one
          for (var i in ctx.runningScenarios.map) {
            var sc = ctx.runningScenarios.map[i];
            if ((sc != this) && sc.running)
              sc.endScenario();
          }
          break;
        }
        case e.scenario.mode.noControl:
        default:
        {
          // nothing to do...
          break;
        }
      }

      if (_workflow) {
        _workflow.start(obj);
        //this.synchronous = false;
      }
      return this;
    }
  }

  if (this.clone)
  {
    /** [Internal usage]
    * Starts global scenario timer
    * @method startScenarioTimer
    * @param {boolean} [clear] if true, clears timer before restarting it
    * @ignore
    * @path ctx.scenarioClass.startScenarioTimer
    */
    this.startScenarioTimer = function (clear) {
      return _startScenarioTimer(clear);
    }
  }

  if (this.clone)
  {
    /** [Internal usage]
    * Stops global scenario timer
    * @method stopScenarioTimer
    * @ignore
    * @path ctx.scenarioClass.stopScenarioTimer
    */
    this.stopScenarioTimer = function () {
      return _stopScenarioTimer();
    }
  }

  if (this.clone)
  {
    /**
    * Adds a new step in the scenario
    * @description
    * __Ex.:__
<code javascript>
// declare scenario
MyAppli.scenario({MyScenario: function(ev, sc) {
  // add steps in scenario
  sc.step(MyAppli.steps.stGetData);
  ...
}});
</code>
    * @method step
    * @path ctx.scenarioClass.step
    * @throws {Error}
    * @param {number|ctx.stepClass} st step object (or id of an existing step in the scenario for a numeric value)
    * @param {ctx.stepClass} [nextStep] optional next step object
    * @param {*} [condition] to launch the step
    * @return {ctx.stepClass} step
    */
    this.step = function (st, nextStep, condition) {
      // 'st' is a a step object or an id
      /** @type {ctx.stepClass} */ var step = null;
      if (typeof st === 'number') {
        // retrieve existing step by its id
        for (var i = 0; i < this.steps.length; i ++)
        {
          step = this.steps[i];
          if (step.id == st)
            return step;
        }
      }  else if (st instanceof ctx.stepClass) {
        step = _scn.addStep(st, nextStep, condition);
      } else
        throw new Error(e.error.InvalidArgument, "ctx.scenario.step : invalid step object");
      return step;
    }
  }

  if (this.clone && model) {
    // copy data
    for (var i = 0; i < _copyData.length; i++) {
      var id = _copyData[i];
      if (model[id]) { this[id] = model[id]; }
    }
    if (model.endFunc) {
      this.endFunc = model.endFunc; // copy onEnd function if associated with model scenario
      model.endFunc = null;
    }
    this.id = ctx.objectIndex++;
		this.job = ctx.job(this);
  }

  return this;
}

/**
* Class implementing the step object
* @class ctx.stepClass
* @path ctx.stepClass
* @constructor
* @advanced
* @param {string} name step name
* @param {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} func step definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
* @param {ctx.application} [parent] parent application
* @param {ctx.scenarioClass} [sc] parent scenario
*/
ctx.stepClass = function (name, func, parent, sc) {

  /** class type
  * @ignore
  * @const
  * @path ctx.stepClass.ctxType
  * @property {string} */ this.ctxType = 'ctx.stepClass';

  var _copyData = ['timeoutCallback', 'errorCallback', 'timeoutDelay'];

  /** @type {ctx.stepClass} */ var _step = this;

  /** @type {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} */ var _func = func || null;

  /** baton object
  * @ignore
  * @path ctx.stepClass.baton
  * @property {number} baton  */ this.baton = null;

  /** step comment
  * @path ctx.stepClass.comment
  * @advanced
  * @property {string} */ this.comment = "";

  /** error handler function
  * @path ctx.stepClass.errorCallback
  * @property {function(ctx.scenarioClass,ctx.stepClass,Object)} errorCallback  */ this.errorCallback = null;

//  /** step data history
//  * @path ctx.stepClass.history
//  * @ignore
//  * @property {Object} */ this.history = {  };

  /** unique identifier
  * @path ctx.stepClass.id
  * @property {number} id  */ this.id = ctx.objectIndex ++;

  /** step name
  * @path ctx.stepClass.name
  * @property {string} */ this.name = name;

  /** parent application
  * @path ctx.stepClass.parent
  * @property {ctx.application} */ this.parent = parent || GLOBAL;

  /** previous step return value
  * @path ctx.stepClass.previousResult
  * @ignore
  * @property {string} */ this.previousResult = null;

  /** running state
  * @path ctx.stepClass.running
  * @property {boolean} running  */ this.running = false;

  /** parent scenario
  * @ignore
  * @path ctx.stepClass.sc
  * @property {ctx.scenarioClass} sc */ this.sc = sc || null;

  /** timeout delay
  * @path ctx.stepClass.timeoutDelay
  * @ignore
  * @property {number} timeoutDelay  */ this.timeoutDelay = 0;

  /** step timer index
  * @path ctx.stepClass.timeoutIndex
  * @ignore
  * @property {number} */ this.timeoutIndex = 0;

  /** step timer object
  * @path ctx.stepClass.timeoutObject
  * @ignore
  * @property {number} */ this.timeoutObject = null;

  /** step timer list
  * @path ctx.stepClass.timers
  * @ignore
  * @property {Object} */ this.timers = {};

  /** timeout handler function
  * @path ctx.stepClass.timeoutCallback
  * @property {function(ctx.scenarioClass,ctx.stepClass)} timeoutCallback  */ this.timeoutCallback = null;

  var _startStepTimer = function (clear) {
    if (_step.running) {
      // clear potential running timer
      if (clear) {
        _stopStepTimer();
      }
      var timeoutCallback, timeoutDelay;
      if ((_step.timeoutCallback) && (_step.timeoutDelay)) {
        // set a step timeout handler
        timeoutCallback = _step.timeoutCallback;
        timeoutDelay = _step.timeoutDelay;
      } else if ((_step.sc.timeoutCallback) && (_step.sc.timeoutDelay)) {
        // set the scenario timeout handler
        timeoutCallback = _step.sc.timeoutCallback;
        timeoutDelay = _step.sc.timeoutDelay;
      }
      if ((!_step.timeoutObject) && timeoutCallback && timeoutDelay && (!ctx.options.timeoutDisabled)) {
        _step.timeoutIndex = ctx.objectIndex++;
        // Name the timer for debugging
        var strTimeoutName = 'timeout(' + _step.name + ')' ;
        ctx.notifyState('once', strTimeoutName, _step.timeoutIndex, 'set', '', _step.name, _step.id);
        _step.timeoutObject = setTimeout( function(step, timeoutCallback) { return function() {
          if (ctx.options.autoTest) {
            // TODO 2JM : manage timeout
            var todo = 0;
          }
          ctx.notifyState('once', strTimeoutName, step.timeoutIndex, 'run', '', step.name, step.id);
          ctx.options.trace.autoRecordingCode = e.error.TimeOut;
          var label = 'Step ' + step.sc.parent.name + '.' + step.sc.name + '.' + step.name + ': timeout';
          if (step.sc.job) {
            step.sc.code = step.sc.job.code = e.error.TimeOut;
            step.sc.label = step.sc.job.label = label;
            step.sc.job.status = e.status.Failed;
            if (ctx.options.trace.autoRecordingStarted && ctx.options.traceFolderRecording) {
              step.sc.job.log = ctx.options.traceFolderRecording;
            }
          }
          var stLog = ctx.ctxShort(step);
          ctx.log(stLog, e.logIconType.Error, label);
          var prevParentId = ctx.currentParentId;
          ctx.currentParentId = step.timeoutIndex;
          timeoutCallback(step.sc, step);
          ctx.currentParentId = prevParentId;
          ctx.notifyState('once', strTimeoutName, step.timeoutIndex, 'reset', '', step.name, step.id);
        }; }(_step, timeoutCallback), timeoutDelay);
      }
    }
  }

  var _stopStepTimer = function () {
    // clear potential running timer
    if (_step.timeoutObject) {
      clearTimeout(_step.timeoutObject);
      var strTimeoutName = 'timeout(' + _step.name + ')' ;
      ctx.notifyState('once', strTimeoutName, _step.timeoutIndex, 'reset', '', _step.name, _step.id);
      _step.timeoutObject = 0;
      _step.timeoutIndex = 0;
    }
  }

  /** [Internal usage]
   * Function calling the step callback, protected by a try / catch to handle error if an 'errorFunction' was set
   * @ignore
   * @method callFunction
   * @path ctx.stepClass.callFunction
   * @param {Function} func
   * @param {Object} context
   * @param {Object} [args]
   * @return {*} 'func' return value
   */
  this.callFunction = function (func, context, args) {
    var ret;
    var bError = false;
    ctx.currentStep = this;
    if (!_step.running) {
      _step.running = true;
      _step.sc.startScenarioTimer(false); // restart global scenario timer (only if disabled in a previous step)
      _startStepTimer(true);  // start step timer
    }
//    if (ctx.options.autoTest) {
//      // TODO 2JM : test start
//      var todo = 0;
//    }
    if ((this.errorCallback) || (this.sc.errorCallback)) {
      try{
        ret = func.apply(context, args);
      } catch (ex) {
//        if (ctx.options.autoTest) {
//          // TODO 2JM : test error
//          var todo = 0;
//        }
        if ((_step.sc.code == '') || (_step.sc.code == e.error.OK)) {
          _step.sc.code = e.error.KO;
          _step.sc.label = 'Step ' + _step.sc.parent.name + '.' + _step.sc.name + '.' + _step.name + ': ' + ex.name + ', ' + ex.message;
        }
        ctx.options.trace.autoRecordingCode = _step.sc.code;
        if (_step.sc.job) {
          _step.sc.job.code = _step.sc.code;
          _step.sc.job.label = _step.sc.label;
          _step.sc.job.status = e.status.Failed;
          //_step.sc.job.exception = ex;
          if (ctx.options.trace.autoRecordingStarted && ctx.options.traceFolderRecording) {
            _step.sc.job.log = ctx.options.traceFolderRecording;
          }
        }
        var stLog = _step.ctxShort();
        ctx.log(stLog, e.logIconType.Error, _step.sc.label);
        if (bError) {
            ret = _step.sc.endScenario();
        } else {
          bError = true; // avoid loop in error : if second error, endScenario
          if (this.errorCallback)
            ret = this.errorCallback(this.sc, this, ex);
          else if (this.sc.errorCallback)
            ret = this.sc.errorCallback(this.sc, this, ex);
          else
            ret = this.sc.endScenario();
        }
      }
    } else {
      ret = func.apply(context, args);
    }
    return ret;
  }

  /** [Internal usage]
  * Clones a given step
  * @description
  * __Ex.:__
<code javascript>
var st2 = st.cloneStep(sc);
</code>
  * @ignore
  * @method cloneStep
  * @path ctx.stepClass.cloneStep
  * @param {ctx.scenarioClass} sc parent scenario
  * @return {ctx.stepClass} cloned step
  */
  this.cloneStep = function (sc) {
    /** @type {ctx.stepClass} */ var st = new ctx.stepClass(this.name, _func, this.parent, sc);
    for (var i = 0; i < _copyData.length; i++) {
      var id = _copyData[i];
      if (this[id]) { st[id] = this[id]; }
    }
    st.id = ctx.objectIndex++;
    return st;
  }

  /** [Internal usage]
   * Returns the short description for serialization
   * @ignore
   * @method ctxShort
   * @path ctx.stepClass.ctxShort
   */
  this.ctxShort = function() {
    return ['ctxType', 'id', 'name', 'parent', 'sc'];
  }

  /**
  * Disables the default timeout handler on a step
  * @description
  * If a timeout handler is declared by default on the parent scenario, the step handler overrides the default behavior
  *
  * __Ex.:__
<code javascript>
MyAppli.step({ stCRMStart: function(ev, sc, st) {
  // disable timeout handler for this step
  st.disableTimeout();
  ...
}});
</code>
  * @method disableTimeout
  * @path ctx.stepClass.disableTimeout
  */
  this.disableTimeout = function () {
    _stopStepTimer();
    _step.sc.stopScenarioTimer();
  }

  /**
  * Ends the current step in the running scenario, and starts and the next step
  * @description
  * __Note:__ : endStep() can be called indifferently on the scenario or step object : ''st.endStep();'' equivalent to ''sc.endStep();''
  *
  * __Ex.:__
<code javascript>
MyAppli.step({ MyStep: function(ev, sc, st) {
  // start MyAppli page if needed
  MyAppli.MyPage.start();
  MyAppli.MyPage.wait(function(ev) {
    ...
    // step done
    st.endStep(); // equivalent to 'sc.endStep();'
  });
}});
</code>
  * @method endStep
  * @path ctx.stepClass.endStep
  * @param {ctx.stepClass|*} [result] result code, or next step to move to : if omitted, the next step in the chain is started.\\ If mentioned, the mentioned step is executed
  * @param {boolean} [bNoPass] if 'true', next step is not called
  */
  this.endStep = function (result, bNoPass) {
    ctx.addPendingFunction(function () {
      _step.running = false;
      _stopStepTimer();
      // unsubscribe all handlers for this step
      ctx.amplify.unsubscribeStep(_step);

      ctx.notifyState('step', _step.name , _step.id, 'end', '', '', ctx.currentParentId, _step.parent);
      //ctx.notifyState('step', step.name , step.id, 'end', '', (step.sc ? step.sc.name : ''), (step.sc ? step.sc.id : -1), step.parent);

			ctx._stepPath.pop();
			if (ctx._stepPath.length == 0)
				ctx.currentStep = null;

/*
			if (ctx.currentStep == _step) {

			}
*/

			if ((ctx.currentParentId == _step.id) && ctx.currentSubscription)
        ctx.currentParentId = ctx.currentSubscription.id;

      //GLOBAL.notify(GLOBAL.events.$evNextStep);
      // move to next step
      if (_step.baton && !bNoPass) {
        if (result instanceof ctx.stepClass)
          _step.baton.pass(result);
        else
          _step.baton.pass(undefined, result);
      }
    });
  }

  /**
  * Declares an error handler on a step
  * @description
  * If an error handler is declared by default on the parent scenario, the step handler overrides the default behavior
  *
  * __Ex.:__
<code javascript>
MyAppli.step({ stStart: function(ev, sc, st) {
  // error handler for this step
  st.onError(function (sc, st, ex) { ... });
  ...
}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **st.onError** + 'TAB' :
  *
<code javascript>
st.onError(function(sc, st, ex) {
  sc.endScenario();
  ...
});
</code>
  * </WRAP>
  * @method onError
  * @path ctx.stepClass.onError
  * @param {function(ctx.scenarioClass,ctx.stepClass,Object)} func error definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object\\ - //{Object}// **ex** : the exception object
  */
  this.onError = function (func) {
    this.errorCallback = func;
  }

  /**
  * Declares a timeout handler on a step
  * @description
  * If a timeout handler is declared by default on the parent scenario, the step handler overrides the default behavior
  *
  * __Ex.:__
<code javascript>
MyAppli.step({ stStart: function(ev, sc, st) {
  // timeout handler for this step
  st.onTimeout(5000, function (sc, st) { ... });
  ...
}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **st.onTimeout** + 'TAB' :
  *
<code javascript>
st.onTimeout( 30000, function(sc, st) {
  sc.endScenario();
  ...
});
</code>
  * </WRAP>
  * @method onTimeout
  * @path ctx.stepClass.onTimeout
  * @param {number} delay timeout delay (in ms)
  * @param {function(ctx.scenarioClass,ctx.stepClass)} [func] timeout definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
  */
  this.onTimeout = function (delay, func) {
    if (delay) {
      this.timeoutDelay = delay;
    }
    if (typeof(func) === 'function') {
      this.timeoutCallback = func;
    }
    _startStepTimer(true);
  }

  /** [Internal usage]
  * Main step function
  * @ignore
  * @method stepFunc
  * @path ctx.stepClass.stepFunc
  * @param {string} previous
  * @param {Object} baton
  */
  this.stepFunc = function (previous, baton) {
    this.baton = baton;
    if (_func && _step) {
      _step.baton.take();
      _step.previousResult = previous;
			ctx._stepPath.push(_step);
      _step.callFunction(_func, _step, [ctx.currentEvent, _step.sc, _step]);
    }
  }


    /**
    * Starts an existing step
    * @description
    * __Ex.:__
<code javascript>
// declare scenario
MyAppli.step({ stCRMGetData: function(ev, sc) { ... }});
...
// start scenario
var data = { ... }; // input data
var sc = MyAppli.steps.stCRMGetData.start( data );
</code>
    * @method start
    * @path ctx.stepClass.start
    * @param {Object} [data] initialization data
    * @return {ctx.scenarioClass} scenario object
    */
    this.start = function (data) {
      var obj = {};
      var step = this;
      // create new scenario (with step name)
      obj[step.name] = function(ev, sc) {
        // no onTimeout management, default onError and mode management
        sc.onError(function(sc, st, ex) { sc.endScenario(); }); // default error handler
        sc.setMode(e.scenario.mode.clearIfRunning);
        sc.step(step);
      }
      var sc = this.parent.scenario(obj);
			return sc.start();
    }

  return this;
};

