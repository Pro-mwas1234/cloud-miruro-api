var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/http.js
var HttpError = class extends Error {
  constructor(status, detail) {
    super(detail);
    this.status = status;
    this.detail = detail;
  }
};
__name(HttpError, "HttpError");
function httpError(status, detail) {
  return new HttpError(status, detail);
}
__name(httpError, "httpError");
function jsonResponse(obj, init = {}) {
  return new Response(JSON.stringify(obj), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers || {}
    }
  });
}
__name(jsonResponse, "jsonResponse");
function allowedOrigins(env2) {
  return (env2 && env2.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
}
__name(allowedOrigins, "allowedOrigins");
function applyCors(req, res, env2) {
  const allowed = allowedOrigins(env2);
  const origin = req.headers.get("Origin");
  const headers = new Headers(res.headers);
  if (origin && (allowed.includes(origin) || allowed.includes("*"))) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }
  return new Response(res.body, { status: res.status, headers });
}
__name(applyCors, "applyCors");
function corsPreflight(req, env2) {
  const headers = new Headers();
  const allowed = allowedOrigins(env2);
  const origin = req.headers.get("Origin");
  if (origin && (allowed.includes(origin) || allowed.includes("*"))) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set(
      "Access-Control-Allow-Methods",
      req.headers.get("Access-Control-Request-Method") || "*"
    );
    headers.set(
      "Access-Control-Allow-Headers",
      req.headers.get("Access-Control-Request-Headers") || "*"
    );
    headers.set("Vary", "Origin");
  }
  return new Response(null, { status: 200, headers });
}
__name(corsPreflight, "corsPreflight");

// src/pipe.js
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  Referer: "https://www.miruro.online/"
};
var MIRURO_PIPE_URL = "https://www.miruro.online/api/secure/pipe";
function b64urlEncode(input) {
  let bin = "";
  for (let i = 0; i < input.length; i++)
    bin += String.fromCharCode(input[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(b64urlEncode, "b64urlEncode");
function b64urlDecodeBytes(s) {
  let str = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4;
  if (pad)
    str += "=".repeat(4 - pad);
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++)
    out[i] = bin.charCodeAt(i);
  return out;
}
__name(b64urlDecodeBytes, "b64urlDecodeBytes");
function b64urlDecodeStr(s) {
  return new TextDecoder("utf-8").decode(b64urlDecodeBytes(s));
}
__name(b64urlDecodeStr, "b64urlDecodeStr");
function encodePipeRequest(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  return b64urlEncode(bytes);
}
__name(encodePipeRequest, "encodePipeRequest");
async function decodePipeResponse(encodedStr) {
  try {
    const bytes = b64urlDecodeBytes(encodedStr);
    const ds = new DecompressionStream("gzip");
    const stream = new Blob([bytes]).stream().pipeThrough(ds);
    const text = await new Response(stream).text();
    return JSON.parse(text);
  } catch {
    throw new Error("Failed to decode pipe response");
  }
}
__name(decodePipeResponse, "decodePipeResponse");
function translateId(encodedId) {
  try {
    const decoded = b64urlDecodeStr(encodedId);
    if (decoded.includes(":"))
      return decoded;
    return encodedId;
  } catch {
    return encodedId;
  }
}
__name(translateId, "translateId");
function deepTranslate(obj) {
  if (obj && typeof obj === "object") {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (item && typeof item === "object")
          deepTranslate(item);
      }
    } else {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (key === "id" && typeof value === "string") {
          obj[key] = translateId(value);
        } else if (value && typeof value === "object") {
          deepTranslate(value);
        }
      }
    }
  }
}
__name(deepTranslate, "deepTranslate");
async function callPipe(payload) {
  const encodedReq = encodePipeRequest(payload);
  const res = await fetch(`${MIRURO_PIPE_URL}?e=${encodedReq}`, {
    headers: HEADERS,
    cf: { cacheTtl: 60, cacheEverything: false }
  });
  if (!res.ok) {
    const err = new Error(`Pipe request failed (upstream ${res.status})`);
    err.status = res.status >= 400 && res.status < 600 && res.status !== 444 ? res.status : 502;
    throw err;
  }
  const text = (await res.text()).trim();
  return decodePipeResponse(text);
}
__name(callPipe, "callPipe");

// src/episodes.js
async function fetchRawEpisodes(anilistId) {
  let data;
  try {
    data = await callPipe({
      path: "episodes",
      method: "GET",
      query: { anilistId },
      body: null,
      version: "0.1.0"
    });
  } catch (e) {
    throw httpError(e.status || 502, "Pipe request failed");
  }
  deepTranslate(data);
  return data;
}
__name(fetchRawEpisodes, "fetchRawEpisodes");
function applySlugInjection(data, anilistId) {
  const providers = data && data.providers || {};
  for (const providerName of Object.keys(providers)) {
    const providerData = providers[providerName];
    if (!providerData || typeof providerData !== "object")
      continue;
    let episodes = providerData.episodes;
    if (!episodes || typeof episodes !== "object" || Array.isArray(episodes)) {
      if (Array.isArray(episodes)) {
        providerData.episodes = { sub: episodes };
        episodes = providerData.episodes;
      } else {
        continue;
      }
    }
    for (const category of Object.keys(episodes)) {
      const epList = episodes[category];
      if (!Array.isArray(epList))
        continue;
      for (const ep of epList) {
        if (!ep || typeof ep !== "object")
          continue;
        if ("id" in ep && "number" in ep) {
          const origId = String(ep.id);
          const prefix = origId.includes(":") ? origId.split(":")[0] : origId;
          ep.id = `watch/${providerName}/${anilistId}/${category}/${prefix}-${ep.number}`;
        }
      }
    }
  }
  return data;
}
__name(applySlugInjection, "applySlugInjection");
function buildSlugMap(data) {
  const map = {};
  const providers = data && data.providers || {};
  for (const providerName of Object.keys(providers)) {
    const providerData = providers[providerName];
    if (!providerData || typeof providerData !== "object")
      continue;
    let episodes = providerData.episodes;
    if (Array.isArray(episodes))
      episodes = { sub: episodes };
    if (!episodes || typeof episodes !== "object")
      continue;
    const provMap = {};
    for (const category of Object.keys(episodes)) {
      const epList = episodes[category];
      if (!Array.isArray(epList))
        continue;
      const catMap = {};
      for (const ep of epList) {
        if (!ep || typeof ep !== "object")
          continue;
        if (!("id" in ep) || !("number" in ep))
          continue;
        const origId = String(ep.id);
        const prefix = origId.includes(":") ? origId.split(":")[0] : origId;
        const slug = `${prefix}-${ep.number}`;
        catMap[slug] = origId;
      }
      provMap[category] = catMap;
    }
    map[providerName] = provMap;
  }
  return map;
}
__name(buildSlugMap, "buildSlugMap");

// src/cache.js
var ORIGIN = "https://kurovexa.internal";
function fullKey(anilistId) {
  return new Request(`${ORIGIN}/episodes/${anilistId}`, { method: "GET" });
}
__name(fullKey, "fullKey");
function mapKey(anilistId) {
  return new Request(`${ORIGIN}/episode-map/${anilistId}`, { method: "GET" });
}
__name(mapKey, "mapKey");
function jsonRes(obj, ttl) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${ttl}`
    }
  });
}
__name(jsonRes, "jsonRes");
async function loadAndCache(anilistId, ttl, ctx) {
  const raw = await fetchRawEpisodes(anilistId);
  const slugMap = buildSlugMap(raw);
  const fullPayload = applySlugInjection(raw, anilistId);
  const cache = caches.default;
  const writes = Promise.all([
    cache.put(fullKey(anilistId), jsonRes(fullPayload, ttl)),
    cache.put(mapKey(anilistId), jsonRes(slugMap, ttl))
  ]);
  if (ctx && typeof ctx.waitUntil === "function") {
    ctx.waitUntil(writes);
  } else {
    await writes;
  }
  return { full: fullPayload, slugMap };
}
__name(loadAndCache, "loadAndCache");
async function getEpisodes(anilistId, ttl, ctx) {
  if (ttl > 0) {
    const cache = caches.default;
    const hit = await cache.match(fullKey(anilistId));
    if (hit) {
      return { data: await hit.json(), cached: true };
    }
  }
  const { full } = await loadAndCache(anilistId, ttl || 3600, ctx);
  return { data: full, cached: false };
}
__name(getEpisodes, "getEpisodes");
async function getSlugMap(anilistId, ttl, ctx) {
  if (ttl > 0) {
    const cache = caches.default;
    const hit = await cache.match(mapKey(anilistId));
    if (hit) {
      return { map: await hit.json(), cached: true };
    }
  }
  const { slugMap } = await loadAndCache(anilistId, ttl || 3600, ctx);
  return { map: slugMap, cached: false };
}
__name(getSlugMap, "getSlugMap");

// src/watch.js
async function watch(provider, anilistId, category, slug, ttl, ctx) {
  const { map } = await getSlugMap(anilistId, ttl, ctx);
  const provMap = map && map[provider];
  if (!provMap) {
    throw httpError(
      404,
      `Provider '${provider}' not available for anilistId ${anilistId}`
    );
  }
  const catMap = provMap[category];
  if (!catMap) {
    throw httpError(
      404,
      `Category '${category}' not available for ${provider}/${anilistId}`
    );
  }
  const originalId = catMap[slug];
  if (!originalId) {
    throw httpError(
      404,
      `Episode slug '${slug}' not found for ${provider}/${anilistId}/${category}`
    );
  }
  const enc = b64urlEncode(new TextEncoder().encode(originalId));
  try {
    return await callPipe({
      path: "sources",
      method: "GET",
      query: { episodeId: enc, provider, category, anilistId },
      body: null,
      version: "0.1.0"
    });
  } catch (e) {
    throw httpError(e.status || 502, "Pipe request failed");
  }
}
__name(watch, "watch");

// src/index.js
var DOCS = {
  name: "Kurovexa API",
  version: "2.0.0",
  endpoints: {
    "GET /": "API documentation (this response)",
    "GET /episodes/{anilistId}": "Episode list for an AniList ID across all supported providers. Aggressively cached at the edge.",
    "GET /watch/{provider}/{anilistId}/{category}/{slug}": "Stream sources for one episode. provider e.g. zoro|kiwi|hop|bee|jet|arc|ally|wco|ANIMEGG|UNIQUESTREAM|dune|SENSHI|CRUNCHYROLL; category=sub|dub; slug from the episode's `id` field returned by /episodes."
  },
  removed: ["/search", "/suggestions", "/filter", "/spotlight", "/trending", "/popular", "/upcoming", "/recent", "/schedule", "/info/{id}", "/anime/{id}/characters|relations|recommendations", "/sources", "/watch/kuu/..."],
  cache: {
    episodes_ttl_seconds: "EPISODES_CACHE_TTL env var (default 3600)",
    watch_ttl_seconds: "WATCH_CACHE_TTL env var (default 300)",
    note: "/watch reuses the /episodes slug-map cache, so the first hit per anime per hour is the only slow one."
  }
};
function intEnv(env2, name, def) {
  const v = parseInt(env2 && env2[name], 10);
  return Number.isFinite(v) && v > 0 ? v : def;
}
__name(intEnv, "intEnv");
function withCacheControl(res, ttl) {
  if (!ttl || res.status >= 400)
    return res;
  const headers = new Headers(res.headers);
  headers.set(
    "Cache-Control",
    `public, max-age=${ttl}, s-maxage=${ttl}, stale-while-revalidate=${Math.max(60, Math.floor(ttl / 4))}`
  );
  return new Response(res.body, { status: res.status, headers });
}
__name(withCacheControl, "withCacheControl");
async function withResponseCache(request, ctx, ttl, build) {
  if (!ttl) {
    const r = await build();
    const h2 = new Headers(r.headers);
    h2.set("X-Cache", "BYPASS");
    return new Response(r.body, { status: r.status, headers: h2 });
  }
  const cache = caches.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const hit = await cache.match(cacheKey);
  if (hit) {
    const h2 = new Headers(hit.headers);
    h2.set("X-Cache", "HIT");
    return new Response(hit.body, { status: hit.status, headers: h2 });
  }
  let res = await build();
  res = withCacheControl(res, ttl);
  if (res.status < 400) {
    const stored = res.clone();
    if (ctx && typeof ctx.waitUntil === "function") {
      ctx.waitUntil(cache.put(cacheKey, stored));
    } else {
      await cache.put(cacheKey, stored);
    }
  }
  const h = new Headers(res.headers);
  h.set("X-Cache", "MISS");
  return new Response(res.body, { status: res.status, headers: h });
}
__name(withResponseCache, "withResponseCache");
async function route(request, env2, ctx) {
  const url = new URL(request.url);
  let path = url.pathname;
  if (path.length > 1 && path.endsWith("/"))
    path = path.slice(0, -1);
  if (request.method === "OPTIONS")
    return corsPreflight(request, env2);
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ detail: "Method Not Allowed" }, { status: 405 });
  }
  if (path === "" || path === "/") {
    return jsonResponse(DOCS);
  }
  let m = path.match(/^\/episodes\/(\d+)$/);
  if (m) {
    const anilistId = parseInt(m[1], 10);
    const ttl = intEnv(env2, "EPISODES_CACHE_TTL", 3600);
    return await withResponseCache(request, ctx, ttl, async () => {
      const { data } = await getEpisodes(anilistId, ttl, ctx);
      return jsonResponse(data);
    });
  }
  m = path.match(/^\/watch\/([^/]+)\/(\d+)\/(sub|dub)\/([^/]+)$/);
  if (m) {
    const provider = m[1];
    const anilistId = parseInt(m[2], 10);
    const category = m[3];
    const slug = m[4];
    if (provider === "kuu") {
      throw httpError(410, "kuu provider has been removed from this build");
    }
    const ttl = intEnv(env2, "WATCH_CACHE_TTL", 300);
    const epTtl = intEnv(env2, "EPISODES_CACHE_TTL", 3600);
    return await withResponseCache(request, ctx, ttl, async () => {
      const data = await watch(provider, anilistId, category, slug, epTtl, ctx);
      return jsonResponse(data);
    });
  }
  return jsonResponse({ detail: "Not Found" }, { status: 404 });
}
__name(route, "route");
var src_default = {
  async fetch(request, env2, ctx) {
    let res;
    try {
      res = await route(request, env2, ctx);
    } catch (e) {
      if (e instanceof HttpError) {
        res = jsonResponse({ detail: e.detail }, { status: e.status });
      } else {
        res = jsonResponse(
          { detail: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
    return applyCors(request, res, env2 || {});
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
