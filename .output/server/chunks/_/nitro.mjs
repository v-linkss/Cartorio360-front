import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { promises, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return undefined;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === undefined) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== undefined).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (undefined === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (undefined !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: undefined,
  excludeValues: undefined,
  replacer: undefined
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === undefined) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === undefined ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === undefined ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === undefined) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : undefined
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== undefined && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== undefined) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === undefined) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : undefined;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : undefined;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? undefined : arg1;
    if (data) {
      const encoding = arg2 === callback ? undefined : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = undefined;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = undefined;
    this._after = undefined;
    this._deprecatedMessages = undefined;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = undefined;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = undefined;
      _function = undefined;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : undefined;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== undefined) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== undefined) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : undefined
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === undefined) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: undefined,
      error: undefined
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : undefined, res.statusText);
  return send(event, html);
});

const plugins = [
  
];

const assets$1 = {
  "/cartorio_icon.png": {
    "type": "image/png",
    "etag": "\"1b89-UyCgcje02HDn+kB7TMVrRpY3FgA\"",
    "mtime": "2025-05-26T23:36:39.144Z",
    "size": 7049,
    "path": "../public/cartorio_icon.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2025-05-26T23:36:39.144Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/-zgYk4Vu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ead-SF2BAsvzuS0V6B190xIE+Sn+yiE\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:45.015Z",
    "size": 3757,
    "path": "../public/_nuxt/-zgYk4Vu.js"
  },
  "/_nuxt/0qPL5G_8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3410-0q07JbKVEgLOB053lPCBXPEtYXw\"",
    "mtime": "2025-11-03T23:58:45.035Z",
    "size": 13328,
    "path": "../public/_nuxt/0qPL5G_8.js"
  },
  "/_nuxt/1WtyFlJ1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176-ySufdwolzn7y7xFcWD1zpJxV9rI\"",
    "mtime": "2025-11-03T23:58:45.391Z",
    "size": 374,
    "path": "../public/_nuxt/1WtyFlJ1.js"
=======
    "mtime": "2025-11-04T23:22:07.215Z",
    "size": 3757,
    "path": "../public/_nuxt/-zgYk4Vu.js"
  },
  "/_nuxt/600_48Xy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cc8-M43gkpULzfZjCWL/rLE2y63ZjoQ\"",
    "mtime": "2025-11-04T23:22:07.868Z",
    "size": 3272,
    "path": "../public/_nuxt/600_48Xy.js"
  },
  "/_nuxt/7mc36lUH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46d-sAOT1xsMUc0yag4PPs3CZjaGRLo\"",
    "mtime": "2025-11-04T23:22:07.566Z",
    "size": 1133,
    "path": "../public/_nuxt/7mc36lUH.js"
  },
  "/_nuxt/9jZB0TkW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d7e-irBDhvrt6SZDRhGkzjy/zYcAdgw\"",
    "mtime": "2025-11-04T23:22:07.960Z",
    "size": 3454,
    "path": "../public/_nuxt/9jZB0TkW.js"
  },
  "/_nuxt/a5R-4jex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69-TxVnl+dGaYNKy9tIce9DNsXpFow\"",
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 105,
    "path": "../public/_nuxt/a5R-4jex.js"
>>>>>>> validate-document
  },
  "/_nuxt/Anexos.BnpNbNod.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e4841-Z2tBWa3jTXMkdrHjGrUbIWIbK00\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.677Z",
=======
    "mtime": "2025-11-04T23:22:06.846Z",
>>>>>>> validate-document
    "size": 1984577,
    "path": "../public/_nuxt/Anexos.BnpNbNod.css"
  },
  "/_nuxt/Anexos.wwHhR1GO.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e4749-pP4LLkFPYoHQnclwp1rsLtEBueQ\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.678Z",
=======
    "mtime": "2025-11-04T23:22:06.852Z",
>>>>>>> validate-document
    "size": 1984329,
    "path": "../public/_nuxt/Anexos.wwHhR1GO.css"
  },
  "/_nuxt/AtEKpY6P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3658-YDhjCEAMEVydTFi8iCKcSnIko2E\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 13912,
    "path": "../public/_nuxt/AtEKpY6P.js"
  },
  "/_nuxt/autencidade.DxZZmkDA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f7-TgB12tULgvQBcWY7wP3cfr8vOJA\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.650Z",
=======
    "mtime": "2025-11-04T23:22:06.835Z",
>>>>>>> validate-document
    "size": 247,
    "path": "../public/_nuxt/autencidade.DxZZmkDA.css"
  },
  "/_nuxt/autenticacao.5T4-ecIs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66-29yFz68Yy4JACX7Vs5VIq9PX2YM\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.640Z",
=======
    "mtime": "2025-11-04T23:22:06.816Z",
>>>>>>> validate-document
    "size": 102,
    "path": "../public/_nuxt/autenticacao.5T4-ecIs.css"
  },
  "/_nuxt/B0IxRygJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"203-nwbLHdhXY4EbOy1T6JSKy60ixiQ\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:45.286Z",
    "size": 515,
    "path": "../public/_nuxt/B0IxRygJ.js"
  },
  "/_nuxt/B16moC2y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1461-KHXcCwAhc5rGDP5ZTmGy5PjzT8Q\"",
    "mtime": "2025-11-03T23:58:45.506Z",
    "size": 5217,
    "path": "../public/_nuxt/B16moC2y.js"
  },
  "/_nuxt/B1FMj6-P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cf-05YHgpvf79Wue49flVzNF2hfRdc\"",
    "mtime": "2025-11-03T23:58:45.375Z",
    "size": 719,
    "path": "../public/_nuxt/B1FMj6-P.js"
  },
  "/_nuxt/B2Xl8e45.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1400-2jL+nyaZfgTvH9UvcVkSb4yT4K4\"",
    "mtime": "2025-11-03T23:58:45.289Z",
    "size": 5120,
    "path": "../public/_nuxt/B2Xl8e45.js"
  },
  "/_nuxt/B7hgzywA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6def-+95E8cCt9senTzY6u4eaRf/+kmo\"",
    "mtime": "2025-11-03T23:58:44.803Z",
    "size": 28143,
    "path": "../public/_nuxt/B7hgzywA.js"
  },
  "/_nuxt/B9Y-VaW1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b-OesFWkFx/Nvk9zxhiJ0cViJ3Pho\"",
    "mtime": "2025-11-03T23:58:44.986Z",
    "size": 123,
    "path": "../public/_nuxt/B9Y-VaW1.js"
  },
  "/_nuxt/BBCa4hUF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c24-XNda7YSF+EHQXIYsVfCCVZChoW8\"",
    "mtime": "2025-11-03T23:58:44.775Z",
    "size": 3108,
    "path": "../public/_nuxt/BBCa4hUF.js"
  },
  "/_nuxt/BBwiqAxh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba7-KZVWuk+kFnEnlvZroMzs+5as0bA\"",
    "mtime": "2025-11-03T23:58:45.186Z",
    "size": 7079,
    "path": "../public/_nuxt/BBwiqAxh.js"
  },
  "/_nuxt/BcgcKADO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da1-RWhwq2Ubv6RYSUSDzPT+7gYeIPs\"",
    "mtime": "2025-11-03T23:58:45.640Z",
    "size": 3489,
    "path": "../public/_nuxt/BcgcKADO.js"
  },
  "/_nuxt/BCkbO2go.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3bb-UL5z+NklkcE6eLCjXnj7ZLbL6iI\"",
    "mtime": "2025-11-03T23:58:45.406Z",
    "size": 955,
    "path": "../public/_nuxt/BCkbO2go.js"
  },
  "/_nuxt/BD6pJkzE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2682-wA0zgqj+uwVLLvGFRzdVqBOePJw\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 9858,
    "path": "../public/_nuxt/BD6pJkzE.js"
  },
  "/_nuxt/Bdzz26Zf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"96f-4aG5I5HkXzzRPupA8svdmIgW3pI\"",
    "mtime": "2025-11-03T23:58:45.818Z",
    "size": 2415,
    "path": "../public/_nuxt/Bdzz26Zf.js"
  },
  "/_nuxt/BeETgOl7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"363a-e1ifK7fuXNfMJ0GUN7H2ooE8ryE\"",
    "mtime": "2025-11-03T23:58:44.802Z",
    "size": 13882,
    "path": "../public/_nuxt/BeETgOl7.js"
  },
  "/_nuxt/BGe95753.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1656-ml78jURKEhMt3zM5BAzFhbnakhs\"",
    "mtime": "2025-11-03T23:58:45.188Z",
    "size": 5718,
    "path": "../public/_nuxt/BGe95753.js"
=======
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 515,
    "path": "../public/_nuxt/B0IxRygJ.js"
  },
  "/_nuxt/B15ljlvf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"170-UFbOmRHAipQWFP6kdeOxHFo0gJM\"",
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 368,
    "path": "../public/_nuxt/B15ljlvf.js"
  },
  "/_nuxt/BdV6RQKS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10e8-LlYQmydVkF8cuOq/W6LX8d/g+dc\"",
    "mtime": "2025-11-04T23:22:06.939Z",
    "size": 4328,
    "path": "../public/_nuxt/BdV6RQKS.js"
  },
  "/_nuxt/BeaCDA2e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1518-jLi6f3amq4ZBil4+vOs14cfqoYs\"",
    "mtime": "2025-11-04T23:22:08.160Z",
    "size": 5400,
    "path": "../public/_nuxt/BeaCDA2e.js"
  },
  "/_nuxt/BEj80GzK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1eec-zapRkoJIVmmm+lnrU23Lx2z9Hlo\"",
    "mtime": "2025-11-04T23:22:07.740Z",
    "size": 7916,
    "path": "../public/_nuxt/BEj80GzK.js"
  },
  "/_nuxt/BgAIGI-v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f6b-6Mg4OOuTMKuaRuWYj6oC8MzgRbw\"",
    "mtime": "2025-11-04T23:22:07.259Z",
    "size": 3947,
    "path": "../public/_nuxt/BgAIGI-v.js"
>>>>>>> validate-document
  },
  "/_nuxt/biometria.B7CPb5SR.png": {
    "type": "image/png",
    "etag": "\"14fc1-oSqO+dEJKOJRRxPhHtWbbfS3NzY\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.563Z",
    "size": 85953,
    "path": "../public/_nuxt/biometria.B7CPb5SR.png"
  },
  "/_nuxt/BISiUQQd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cac-vKE5rQCR5vq/rgu6Tw+CqvJCeEg\"",
    "mtime": "2025-11-03T23:58:45.617Z",
    "size": 3244,
    "path": "../public/_nuxt/BISiUQQd.js"
  },
  "/_nuxt/Bj-2FKWl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"652-PlQoyLRFs580vnWfTTFuqi1AlQ0\"",
    "mtime": "2025-11-03T23:58:45.277Z",
    "size": 1618,
    "path": "../public/_nuxt/Bj-2FKWl.js"
  },
  "/_nuxt/BjU7R_H0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"151d-xRMpkMbckK5qXu/BOCO8sSpa7Ug\"",
    "mtime": "2025-11-03T23:58:45.730Z",
    "size": 5405,
    "path": "../public/_nuxt/BjU7R_H0.js"
  },
  "/_nuxt/BL7VAyP8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f62-eX2ClvLlj6kzNyjns+UR9BxaFGU\"",
    "mtime": "2025-11-03T23:58:45.294Z",
    "size": 8034,
    "path": "../public/_nuxt/BL7VAyP8.js"
  },
  "/_nuxt/BlDFQPOV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d4d-JLzPuMCX0qyyZTH/10hVi+85VtI\"",
    "mtime": "2025-11-03T23:58:45.616Z",
    "size": 3405,
    "path": "../public/_nuxt/BlDFQPOV.js"
  },
  "/_nuxt/BMt2p-ht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a9-kIMHnHNRYpbTZecW/4S63HcnwMA\"",
    "mtime": "2025-11-03T23:58:45.808Z",
    "size": 1705,
    "path": "../public/_nuxt/BMt2p-ht.js"
  },
  "/_nuxt/BNxKBvey.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-SmpQi68lKYw3WZ3TuhyQm1BjASY\"",
    "mtime": "2025-11-03T23:58:45.390Z",
    "size": 101,
    "path": "../public/_nuxt/BNxKBvey.js"
  },
  "/_nuxt/BQ9nU0-C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27e-3oc3QuF3G+agT5AbC61zjWsHif0\"",
    "mtime": "2025-11-03T23:58:45.188Z",
    "size": 638,
    "path": "../public/_nuxt/BQ9nU0-C.js"
  },
  "/_nuxt/BqKfKras.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41c-OUy4Eu/iuiHHx65lD59tsqBqG2A\"",
    "mtime": "2025-11-03T23:58:45.353Z",
    "size": 1052,
    "path": "../public/_nuxt/BqKfKras.js"
  },
  "/_nuxt/BQWL7vbn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10e8-HzrhEdxXNPD3+JUdWLwml2qdyD8\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 4328,
    "path": "../public/_nuxt/BQWL7vbn.js"
  },
  "/_nuxt/BRDUiMuf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f88-VzJID8upHrB3hsP/fpeh0xH7Cnw\"",
    "mtime": "2025-11-03T23:58:45.330Z",
    "size": 20360,
    "path": "../public/_nuxt/BRDUiMuf.js"
  },
  "/_nuxt/BRwqhO8g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d11-q27QupdO8uB1qbZCVGJv2nBYBPM\"",
    "mtime": "2025-11-03T23:58:45.298Z",
    "size": 3345,
    "path": "../public/_nuxt/BRwqhO8g.js"
  },
  "/_nuxt/Bs_rMpwJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f9-QcC5kbsTRxfCAFiertbNHLxTPTQ\"",
    "mtime": "2025-11-03T23:58:45.807Z",
    "size": 1273,
    "path": "../public/_nuxt/Bs_rMpwJ.js"
  },
  "/_nuxt/btn-csv.DS5dvxBS.png": {
    "type": "image/png",
    "etag": "\"1317-UGQaC+x/KSEEPvaU2qMTlKchYbQ\"",
    "mtime": "2025-11-03T23:58:44.562Z",
    "size": 4887,
    "path": "../public/_nuxt/btn-csv.DS5dvxBS.png"
=======
    "mtime": "2025-11-04T23:22:06.731Z",
    "size": 85953,
    "path": "../public/_nuxt/biometria.B7CPb5SR.png"
  },
  "/_nuxt/BKd3iWnx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53bb6c-nJWeLzWEOQ42IhAIDTJ3vd62ozM\"",
    "mtime": "2025-11-04T23:22:07.654Z",
    "size": 5487468,
    "path": "../public/_nuxt/BKd3iWnx.js"
  },
  "/_nuxt/BkoAInbw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3a-8OS+1o9Lj+CR7t1O1EoDaRkFrnQ\"",
    "mtime": "2025-11-04T23:22:06.938Z",
    "size": 3130,
    "path": "../public/_nuxt/BkoAInbw.js"
  },
  "/_nuxt/BL43RjWk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b-qjzyDa5WKfJvsSH/87oBrMIx5Fw\"",
    "mtime": "2025-11-04T23:22:07.151Z",
    "size": 123,
    "path": "../public/_nuxt/BL43RjWk.js"
  },
  "/_nuxt/BN1bISu-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec4-QHnAN80SlGg7Z9b5hf7G/FVf+24\"",
    "mtime": "2025-11-04T23:22:06.933Z",
    "size": 3780,
    "path": "../public/_nuxt/BN1bISu-.js"
  },
  "/_nuxt/BndDhfif.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43f8-BSal+4ZMQ0sPHdxS/NE8JzXo8pw\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 17400,
    "path": "../public/_nuxt/BndDhfif.js"
  },
  "/_nuxt/BnQYERyJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d52-7X7dnOcS94BWx9keclAuSarBLl8\"",
    "mtime": "2025-11-04T23:22:06.934Z",
    "size": 3410,
    "path": "../public/_nuxt/BnQYERyJ.js"
  },
  "/_nuxt/BOxdxFVb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e4-f//Oz8iBOVWdZ30jWHCMpyfXwZ4\"",
    "mtime": "2025-11-04T23:22:07.899Z",
    "size": 2020,
    "path": "../public/_nuxt/BOxdxFVb.js"
  },
  "/_nuxt/BQOsD4cL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae0-kMNBGut1qrBTrQzHnHsAQcHKDes\"",
    "mtime": "2025-11-04T23:22:07.923Z",
    "size": 2784,
    "path": "../public/_nuxt/BQOsD4cL.js"
  },
  "/_nuxt/BRmpBc_Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a9-dwrNFZ0mGRXc3D1LwVQk4oi5Who\"",
    "mtime": "2025-11-04T23:22:08.184Z",
    "size": 1705,
    "path": "../public/_nuxt/BRmpBc_Q.js"
>>>>>>> validate-document
  },
  "/_nuxt/btn-pessoa.DOpc-kWJ.png": {
    "type": "image/png",
    "etag": "\"1692-LXoYhqMkydgV4Nin1HzHCka4Qy0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.562Z",
=======
    "mtime": "2025-11-04T23:22:06.728Z",
>>>>>>> validate-document
    "size": 5778,
    "path": "../public/_nuxt/btn-pessoa.DOpc-kWJ.png"
  },
  "/_nuxt/btn_cancela_lavratura.DGZVG9h_.png": {
    "type": "image/png",
    "etag": "\"17a9-ROLBZTNIu6ARB62aE4k9e/iP51Q\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
    "size": 6057,
    "path": "../public/_nuxt/btn_cancela_lavratura.DGZVG9h_.png"
  },
  "/_nuxt/Bu8-OHoC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"108d-Z18i3MRPZL5skt4wAIYp3dtKzIc\"",
    "mtime": "2025-11-03T23:58:45.035Z",
    "size": 4237,
    "path": "../public/_nuxt/Bu8-OHoC.js"
  },
  "/_nuxt/BuEHm_9K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"238e-4GE1K800m8meuuJFAKAhubLDDe0\"",
    "mtime": "2025-11-03T23:58:45.185Z",
    "size": 9102,
    "path": "../public/_nuxt/BuEHm_9K.js"
  },
  "/_nuxt/BUgpq5ms.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"186-xqWWL9CdVJCAYe6aTsIrBKo6QEU\"",
    "mtime": "2025-11-03T23:58:45.188Z",
    "size": 390,
    "path": "../public/_nuxt/BUgpq5ms.js"
  },
  "/_nuxt/BVgZkkqd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-vHBCJJk5J3x9wHoOJQFEUPSjK8M\"",
    "mtime": "2025-11-03T23:58:45.390Z",
    "size": 101,
    "path": "../public/_nuxt/BVgZkkqd.js"
=======
    "mtime": "2025-11-04T23:22:06.727Z",
    "size": 6057,
    "path": "../public/_nuxt/btn_cancela_lavratura.DGZVG9h_.png"
  },
  "/_nuxt/BVPjkOyL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c4-yfyM1PVWMlfB/Ht0sC34Bs8+PSE\"",
    "mtime": "2025-11-04T23:22:07.739Z",
    "size": 964,
    "path": "../public/_nuxt/BVPjkOyL.js"
>>>>>>> validate-document
  },
  "/_nuxt/BVz1G1IN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f69-7srjM41neG/G8GO65Ycc+mMs32M\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:45.297Z",
    "size": 3945,
    "path": "../public/_nuxt/BVz1G1IN.js"
  },
  "/_nuxt/BWG-R2YI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"170-D0cVkJcN82Uhp57dEJOw0uAE92E\"",
    "mtime": "2025-11-03T23:58:45.288Z",
    "size": 368,
    "path": "../public/_nuxt/BWG-R2YI.js"
  },
  "/_nuxt/BXOpNuad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46d-a+xBAc2hhNkQU0Xh9PCgb06SJS4\"",
    "mtime": "2025-11-03T23:58:45.330Z",
    "size": 1133,
    "path": "../public/_nuxt/BXOpNuad.js"
  },
  "/_nuxt/B_AYwNQp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ef1-S4p2LNheuZBbSqBijQEcNfO986U\"",
    "mtime": "2025-11-03T23:58:45.547Z",
    "size": 7921,
    "path": "../public/_nuxt/B_AYwNQp.js"
  },
  "/_nuxt/B_b38YPn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2fca-l4Lt/PW4b/zYlIjuqbv9Y6PV/kw\"",
    "mtime": "2025-11-03T23:58:45.506Z",
    "size": 12234,
    "path": "../public/_nuxt/B_b38YPn.js"
  },
  "/_nuxt/C-Xmr2Db.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a48-QrGi4uyUjWffW9kH7os3RX/WKT8\"",
    "mtime": "2025-11-03T23:58:45.208Z",
    "size": 6728,
    "path": "../public/_nuxt/C-Xmr2Db.js"
  },
  "/_nuxt/C0q9hfuB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a0d-VXmF/YU6OSElven1qIGfF3hb7mQ\"",
    "mtime": "2025-11-03T23:58:45.169Z",
    "size": 27149,
    "path": "../public/_nuxt/C0q9hfuB.js"
  },
  "/_nuxt/C5E_v8rs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d11-BACsIooq5XFhR7VeqSN5jCyeaqo\"",
    "mtime": "2025-11-03T23:58:45.189Z",
    "size": 3345,
    "path": "../public/_nuxt/C5E_v8rs.js"
  },
  "/_nuxt/C823Fyto.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"301-fuAXNhOCKAopEFfGc8Latn8GNXE\"",
    "mtime": "2025-11-03T23:58:45.361Z",
    "size": 769,
    "path": "../public/_nuxt/C823Fyto.js"
  },
  "/_nuxt/CabFh4CD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d50-/teOMa9cOIRFFuLuDzhZnX/9nuk\"",
    "mtime": "2025-11-03T23:58:45.087Z",
    "size": 3408,
    "path": "../public/_nuxt/CabFh4CD.js"
  },
  "/_nuxt/CASsHz-G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"192c2f-iXfKyoq/YpSsGelLICTGBgMiafs\"",
    "mtime": "2025-11-03T23:58:45.506Z",
    "size": 1649711,
    "path": "../public/_nuxt/CASsHz-G.js"
  },
  "/_nuxt/CaXKaERR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"130f-balhuTa/rQy/+La/tisvCJO57Go\"",
    "mtime": "2025-11-03T23:58:45.388Z",
    "size": 4879,
    "path": "../public/_nuxt/CaXKaERR.js"
  },
  "/_nuxt/CceN8J3l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a8-lZSVwxgXHSX9rjTgYPseGNNRoPI\"",
    "mtime": "2025-11-03T23:58:45.446Z",
    "size": 168,
    "path": "../public/_nuxt/CceN8J3l.js"
  },
  "/_nuxt/CCMs9vAy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae0-sDYwbCx6HIm6gfx59ItGsUl6ZdQ\"",
    "mtime": "2025-11-03T23:58:45.708Z",
    "size": 2784,
    "path": "../public/_nuxt/CCMs9vAy.js"
  },
  "/_nuxt/CcYKLLHz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f3-BTZjOx9LgmU7kI4vBCJXd24vHxA\"",
    "mtime": "2025-11-03T23:58:45.418Z",
    "size": 1011,
    "path": "../public/_nuxt/CcYKLLHz.js"
=======
    "mtime": "2025-11-04T23:22:07.557Z",
    "size": 3945,
    "path": "../public/_nuxt/BVz1G1IN.js"
  },
  "/_nuxt/Bx3FO7Ob.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12d6-/7/iQaZsB6v6Mzrnb4qOwii6nJo\"",
    "mtime": "2025-11-04T23:22:07.740Z",
    "size": 4822,
    "path": "../public/_nuxt/Bx3FO7Ob.js"
  },
  "/_nuxt/BYHg9QHm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"73-KT3JImF7tqU4uDsY4c8sDFFH4RU\"",
    "mtime": "2025-11-04T23:22:07.223Z",
    "size": 115,
    "path": "../public/_nuxt/BYHg9QHm.js"
  },
  "/_nuxt/BzJ0gXIO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b7b-Y8R/PcTQjeTVOwUS0PTujZe6dIc\"",
    "mtime": "2025-11-04T23:22:07.400Z",
    "size": 7035,
    "path": "../public/_nuxt/BzJ0gXIO.js"
  },
  "/_nuxt/Bzox1wXE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d26-htyxMMCHTwNNEAjMod/15tp2zSM\"",
    "mtime": "2025-11-04T23:22:07.740Z",
    "size": 3366,
    "path": "../public/_nuxt/Bzox1wXE.js"
  },
  "/_nuxt/B_le8eAU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"838b-Jm6M6l1EgDKzUzpvZw09sJBks3M\"",
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 33675,
    "path": "../public/_nuxt/B_le8eAU.js"
  },
  "/_nuxt/B_LPx9kA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6c-hLaT9EQhpZ1nR1bqk8tAwuppN4E\"",
    "mtime": "2025-11-04T23:22:07.249Z",
    "size": 3436,
    "path": "../public/_nuxt/B_LPx9kA.js"
  },
  "/_nuxt/C0iEiyay.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d10-QAz3cHyOKduHGbCKZnughvmESfg\"",
    "mtime": "2025-11-04T23:22:07.557Z",
    "size": 3344,
    "path": "../public/_nuxt/C0iEiyay.js"
  },
  "/_nuxt/C2YRNR5L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a36-yDJyG7vCTmG8SzHKnHjG9u0eoNs\"",
    "mtime": "2025-11-04T23:22:08.185Z",
    "size": 2614,
    "path": "../public/_nuxt/C2YRNR5L.js"
  },
  "/_nuxt/C6ulpppX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33fa-UvGAv34/zCNtIGoXavVJeTPcTvQ\"",
    "mtime": "2025-11-04T23:22:07.226Z",
    "size": 13306,
    "path": "../public/_nuxt/C6ulpppX.js"
  },
  "/_nuxt/C7X9vDv5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24c8-j5KPfo1u4r5kkYs7gCxrvwSPDIM\"",
    "mtime": "2025-11-04T23:22:07.739Z",
    "size": 9416,
    "path": "../public/_nuxt/C7X9vDv5.js"
  },
  "/_nuxt/C861OkWK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6478-4SKfyL+6IxDTtusttvDGbG6u34E\"",
    "mtime": "2025-11-04T23:22:07.557Z",
    "size": 25720,
    "path": "../public/_nuxt/C861OkWK.js"
  },
  "/_nuxt/CabdND4u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2381-H5UJGYKc1kjpmw+htrh1gyPJT7Y\"",
    "mtime": "2025-11-04T23:22:08.185Z",
    "size": 9089,
    "path": "../public/_nuxt/CabdND4u.js"
  },
  "/_nuxt/CAfdBaba.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"233a-W7MeWK6OAMlrzHEqH81sQFuM1kk\"",
    "mtime": "2025-11-04T23:22:06.956Z",
    "size": 9018,
    "path": "../public/_nuxt/CAfdBaba.js"
>>>>>>> validate-document
  },
  "/_nuxt/censec.WjIi3Oip.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11d-dr+8WJcHsR1sLWbzI6CoDaVDyhE\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.639Z",
    "size": 285,
    "path": "../public/_nuxt/censec.WjIi3Oip.css"
  },
  "/_nuxt/CfUMH_SJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80c-v9oA6TOzh2iYJmsbe4Vo4Ozfn9s\"",
    "mtime": "2025-11-03T23:58:44.993Z",
    "size": 2060,
    "path": "../public/_nuxt/CfUMH_SJ.js"
  },
  "/_nuxt/Cg--bzeN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d88-KnsZEXcE/OLsXGyI340pA7HtRdM\"",
    "mtime": "2025-11-03T23:58:45.709Z",
    "size": 3464,
    "path": "../public/_nuxt/Cg--bzeN.js"
  },
  "/_nuxt/CGviecw0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6dd-JOdt8FyHfyhtDucK1pw+D+eqVx8\"",
    "mtime": "2025-11-03T23:58:45.005Z",
    "size": 1757,
    "path": "../public/_nuxt/CGviecw0.js"
  },
  "/_nuxt/CHN5XX1J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1081-Wst6b9xg9pkLoebBjotHNInKwso\"",
    "mtime": "2025-11-03T23:58:44.796Z",
    "size": 4225,
    "path": "../public/_nuxt/CHN5XX1J.js"
  },
  "/_nuxt/CHPEVBAv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2a-VJnHNdILKPibK6I0TYZrHH2TBWo\"",
    "mtime": "2025-11-03T23:58:45.808Z",
    "size": 2858,
    "path": "../public/_nuxt/CHPEVBAv.js"
  },
  "/_nuxt/ChZdYnYu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"577-WDTVaLQL1juFWQBi9f6qlCK3WFI\"",
    "mtime": "2025-11-03T23:58:45.289Z",
    "size": 1399,
    "path": "../public/_nuxt/ChZdYnYu.js"
  },
  "/_nuxt/Ci6MKitc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe0-e5HMJQJikGT6xrBdtWOZgHahB+A\"",
    "mtime": "2025-11-03T23:58:45.506Z",
    "size": 8160,
    "path": "../public/_nuxt/Ci6MKitc.js"
  },
  "/_nuxt/CIodqvrQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d8a-Ctmx4HmZUNi1tgcX6mY/HSyn/cU\"",
    "mtime": "2025-11-03T23:58:45.807Z",
    "size": 3466,
    "path": "../public/_nuxt/CIodqvrQ.js"
  },
  "/_nuxt/CjbgEYGH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2380-Omrnb8jvYHotj9QML46qpeg6WFY\"",
    "mtime": "2025-11-03T23:58:45.688Z",
    "size": 9088,
    "path": "../public/_nuxt/CjbgEYGH.js"
  },
  "/_nuxt/CjeEiN3h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a09-bRgMnX6PsnXCiy6PYBRXr4rELuE\"",
    "mtime": "2025-11-03T23:58:45.015Z",
    "size": 6665,
    "path": "../public/_nuxt/CjeEiN3h.js"
  },
  "/_nuxt/Ckm4MDRe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1406-X2PZvAn1LDOyNLGjI5HA8o2XzmY\"",
    "mtime": "2025-11-03T23:58:45.616Z",
    "size": 5126,
    "path": "../public/_nuxt/Ckm4MDRe.js"
  },
  "/_nuxt/CmTVGV5X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6266-5dMz77xbAz2vnm+mAuyxpSveHW4\"",
    "mtime": "2025-11-03T23:58:45.170Z",
    "size": 25190,
    "path": "../public/_nuxt/CmTVGV5X.js"
=======
    "mtime": "2025-11-04T23:22:06.814Z",
    "size": 285,
    "path": "../public/_nuxt/censec.WjIi3Oip.css"
  },
  "/_nuxt/cF5_JDHk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"652-YwfXxbftFn6U1f9R2QAjMdLEnf8\"",
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 1618,
    "path": "../public/_nuxt/cF5_JDHk.js"
  },
  "/_nuxt/CfkMT6s3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d4-ze71jjLYDN3hRfdav5wInI1WieE\"",
    "mtime": "2025-11-04T23:22:07.661Z",
    "size": 724,
    "path": "../public/_nuxt/CfkMT6s3.js"
  },
  "/_nuxt/CfMtBw88.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"242fe-JEjkfnvQFyd5vRxVJp9tc3uVFjE\"",
    "mtime": "2025-11-04T23:22:07.687Z",
    "size": 148222,
    "path": "../public/_nuxt/CfMtBw88.js"
  },
  "/_nuxt/Chcc_4gx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"788-ronRGQXETI9jBqk+B1tMufdHRtA\"",
    "mtime": "2025-11-04T23:22:07.507Z",
    "size": 1928,
    "path": "../public/_nuxt/Chcc_4gx.js"
  },
  "/_nuxt/CHM6t0QY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da2-Vs9CAxBZoEQgGVF0j4XeadVATcA\"",
    "mtime": "2025-11-04T23:22:07.113Z",
    "size": 3490,
    "path": "../public/_nuxt/CHM6t0QY.js"
  },
  "/_nuxt/ChqhYIKY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11260-Qco0k803XH11VtA2kFRpZRdwQuY\"",
    "mtime": "2025-11-04T23:22:07.738Z",
    "size": 70240,
    "path": "../public/_nuxt/ChqhYIKY.js"
  },
  "/_nuxt/CigzS0m7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80c-B2ABoPk2WVWZqMC3gDnzR+iXC1k\"",
    "mtime": "2025-11-04T23:22:07.159Z",
    "size": 2060,
    "path": "../public/_nuxt/CigzS0m7.js"
  },
  "/_nuxt/CJRZvyTh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"184e-Ufij2ACerT4w1BogKQdhvY6ArXM\"",
    "mtime": "2025-11-04T23:22:07.151Z",
    "size": 6222,
    "path": "../public/_nuxt/CJRZvyTh.js"
  },
  "/_nuxt/CJX-rxBu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a8-Tbe7lRkseJLEe8GXDWdguz73Pts\"",
    "mtime": "2025-11-04T23:22:07.738Z",
    "size": 168,
    "path": "../public/_nuxt/CJX-rxBu.js"
  },
  "/_nuxt/ClfGx0OW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2a-UUfQtw3gUwLClvMUm1OObPqByLc\"",
    "mtime": "2025-11-04T23:22:08.185Z",
    "size": 2858,
    "path": "../public/_nuxt/ClfGx0OW.js"
  },
  "/_nuxt/ClOIGfLY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fa-e2e6Q+r90zC5j6LQswwLQDYQk5I\"",
    "mtime": "2025-11-04T23:22:07.244Z",
    "size": 1786,
    "path": "../public/_nuxt/ClOIGfLY.js"
  },
  "/_nuxt/CMQJRggl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2363-XsCZUSxsr8pDZstQ7ae2A27yWJM\"",
    "mtime": "2025-11-04T23:22:07.400Z",
    "size": 9059,
    "path": "../public/_nuxt/CMQJRggl.js"
>>>>>>> validate-document
  },
  "/_nuxt/Confirmacao.CnnFSkWE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"98-SKnuL0d58YlDw4a6bcXXX0q05kM\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.660Z",
    "size": 152,
    "path": "../public/_nuxt/Confirmacao.CnnFSkWE.css"
  },
  "/_nuxt/CoSEu-lD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2767-1566ZlCiOCBLIIhOdu3/0uBOAjo\"",
    "mtime": "2025-11-03T23:58:45.169Z",
    "size": 10087,
    "path": "../public/_nuxt/CoSEu-lD.js"
  },
  "/_nuxt/CpqhmGYL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d52-Ao0kNnD1AhSWBeFA863VUhXimlE\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 3410,
    "path": "../public/_nuxt/CpqhmGYL.js"
=======
    "mtime": "2025-11-04T23:22:06.833Z",
    "size": 152,
    "path": "../public/_nuxt/Confirmacao.CnnFSkWE.css"
  },
  "/_nuxt/COtqEAPu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6dd-ja6buOh2l2EacjFXNqKrExSXO+k\"",
    "mtime": "2025-11-04T23:22:07.223Z",
    "size": 1757,
    "path": "../public/_nuxt/COtqEAPu.js"
  },
  "/_nuxt/Cr0v-mMH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1177-W8lWNnFHTHm3IgMz103MCAqycpU\"",
    "mtime": "2025-11-04T23:22:07.568Z",
    "size": 4471,
    "path": "../public/_nuxt/Cr0v-mMH.js"
>>>>>>> validate-document
  },
  "/_nuxt/criar-ato.D9p6MIYo.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"33-wEx12OnMOpqhzVf1sSopI8fhMvE\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.638Z",
    "size": 51,
    "path": "../public/_nuxt/criar-ato.D9p6MIYo.css"
  },
  "/_nuxt/CwwZr2G0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72-lUrky05PfIHbKRU9GxCN72jK6yQ\"",
    "mtime": "2025-11-03T23:58:45.394Z",
    "size": 114,
    "path": "../public/_nuxt/CwwZr2G0.js"
  },
  "/_nuxt/Cxqkqjv8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"135d-/kguA47Xngbu5DIi2smuLboUbnc\"",
    "mtime": "2025-11-03T23:58:45.355Z",
    "size": 4957,
    "path": "../public/_nuxt/Cxqkqjv8.js"
  },
  "/_nuxt/CXZNUCN-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"117f-ZzvOx+3rgS63k3ydz625xKUr9u8\"",
    "mtime": "2025-11-03T23:58:45.353Z",
    "size": 4479,
    "path": "../public/_nuxt/CXZNUCN-.js"
  },
  "/_nuxt/CyqTGDD6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60a3f-Y7pAYnyJEqBCimBAXXA6KPswdXA\"",
    "mtime": "2025-11-03T23:58:44.764Z",
    "size": 395839,
    "path": "../public/_nuxt/CyqTGDD6.js"
  },
  "/_nuxt/CYztp-iq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26f-m7d3IVSDadDB1Cmyk+QTycC0Y/M\"",
    "mtime": "2025-11-03T23:58:45.056Z",
    "size": 623,
    "path": "../public/_nuxt/CYztp-iq.js"
  },
  "/_nuxt/D0NUQvAA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ac-sTWxVubYgzKmjRxZ/qH2X4FaMHA\"",
    "mtime": "2025-11-03T23:58:45.188Z",
    "size": 1708,
    "path": "../public/_nuxt/D0NUQvAA.js"
  },
  "/_nuxt/D257HQSt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9a-0sr+4XHOS8tnfYGQTQe/Vpktag0\"",
    "mtime": "2025-11-03T23:58:45.641Z",
    "size": 3226,
    "path": "../public/_nuxt/D257HQSt.js"
  },
  "/_nuxt/D2CiNNq-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176c-RxvLNRByoeiFvYS/OswqYt0ACvI\"",
    "mtime": "2025-11-03T23:58:45.391Z",
    "size": 5996,
    "path": "../public/_nuxt/D2CiNNq-.js"
  },
  "/_nuxt/D4dfpPbJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db8-JE0lOimUaWt7Ecynm9MDq30jI6k\"",
    "mtime": "2025-11-03T23:58:44.980Z",
    "size": 3512,
    "path": "../public/_nuxt/D4dfpPbJ.js"
  },
  "/_nuxt/D8o37Hsx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f9-EAeWUoflfVGp7rIy6a+rn6MniGM\"",
    "mtime": "2025-11-03T23:58:45.288Z",
    "size": 1529,
    "path": "../public/_nuxt/D8o37Hsx.js"
  },
  "/_nuxt/DA32pPmw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec4-awl6Qn32HYIbrf6jJemBMdTWxHc\"",
    "mtime": "2025-11-03T23:58:44.768Z",
    "size": 3780,
    "path": "../public/_nuxt/DA32pPmw.js"
  },
  "/_nuxt/DbnnzWWk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fa-r9tdrnGHO9s/LMnN5rN8cUiLWvY\"",
    "mtime": "2025-11-03T23:58:45.035Z",
    "size": 1786,
    "path": "../public/_nuxt/DbnnzWWk.js"
  },
  "/_nuxt/DCffu_Io.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137a-8a5c/7BCPk7sj6BG1D7isALpDZo\"",
    "mtime": "2025-11-03T23:58:44.776Z",
    "size": 4986,
    "path": "../public/_nuxt/DCffu_Io.js"
  },
  "/_nuxt/DcQSwM0f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-ufKapFlvETqB/ZpKVtY7i54jRQU\"",
    "mtime": "2025-11-03T23:58:45.208Z",
    "size": 101,
    "path": "../public/_nuxt/DcQSwM0f.js"
  },
  "/_nuxt/DeDWps2s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24f4-o7XEjLQBaSurg7ack6/OPCdozlo\"",
    "mtime": "2025-11-03T23:58:45.506Z",
    "size": 9460,
    "path": "../public/_nuxt/DeDWps2s.js"
  },
  "/_nuxt/default.CRJZTL4B.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"12cf-A4g6XmmBQ0881HDWS7VzBVsy+pk\"",
    "mtime": "2025-11-03T23:58:44.763Z",
    "size": 4815,
    "path": "../public/_nuxt/default.CRJZTL4B.css"
  },
  "/_nuxt/DeP7QlzJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a7-Jr7D4o08mkj+jeZr6QMOcTGEgD8\"",
    "mtime": "2025-11-03T23:58:45.090Z",
    "size": 4519,
    "path": "../public/_nuxt/DeP7QlzJ.js"
  },
  "/_nuxt/DFEr3SEp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11cd-YXl/+ETWGrZLV0m8U0L9HzsX6w0\"",
    "mtime": "2025-11-03T23:58:45.298Z",
    "size": 4557,
    "path": "../public/_nuxt/DFEr3SEp.js"
  },
  "/_nuxt/Dg8rY-y7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67-si6nAYFoQYHxbqE9b+98fjgY3Oo\"",
    "mtime": "2025-11-03T23:58:45.288Z",
    "size": 103,
    "path": "../public/_nuxt/Dg8rY-y7.js"
  },
  "/_nuxt/DGx_CJsQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24da4-5zkVrizpZQSd4ZrrgWoqadb1W8E\"",
    "mtime": "2025-11-03T23:58:45.391Z",
    "size": 150948,
    "path": "../public/_nuxt/DGx_CJsQ.js"
  },
  "/_nuxt/Dh2Yb6Lu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1000-yUlMnqF51dbmIqoYH6t3KELoNhE\"",
    "mtime": "2025-11-03T23:58:45.169Z",
    "size": 4096,
    "path": "../public/_nuxt/Dh2Yb6Lu.js"
  },
  "/_nuxt/Dht3a_QE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a2-SjRIxC08JvC9Khq0NAJsTLPe3Js\"",
    "mtime": "2025-11-03T23:58:45.807Z",
    "size": 5026,
    "path": "../public/_nuxt/Dht3a_QE.js"
=======
    "mtime": "2025-11-04T23:22:06.820Z",
    "size": 51,
    "path": "../public/_nuxt/criar-ato.D9p6MIYo.css"
  },
  "/_nuxt/CUklVh96.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6df4-nb16b5MAfuqJcz5Af463BgIY09c\"",
    "mtime": "2025-11-04T23:22:07.121Z",
    "size": 28148,
    "path": "../public/_nuxt/CUklVh96.js"
  },
  "/_nuxt/CUpuBZto.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1656-KkcXxTYF1jmAChjW/cTElXJTiYk\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 5718,
    "path": "../public/_nuxt/CUpuBZto.js"
  },
  "/_nuxt/CWN6luPG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2767-MTLHDMf6g/grxIdTiKgI/IXBZwU\"",
    "mtime": "2025-11-04T23:22:07.332Z",
    "size": 10087,
    "path": "../public/_nuxt/CWN6luPG.js"
  },
  "/_nuxt/CX3fCVG6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a09-t4Vc051m2woajhPXmn6XC2QuWsc\"",
    "mtime": "2025-11-04T23:22:07.219Z",
    "size": 6665,
    "path": "../public/_nuxt/CX3fCVG6.js"
  },
  "/_nuxt/CZOlsz2o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe0-Bf6Mcj2F2lCoaY8UOMbVsoH9Ba8\"",
    "mtime": "2025-11-04T23:22:07.400Z",
    "size": 8160,
    "path": "../public/_nuxt/CZOlsz2o.js"
  },
  "/_nuxt/C_r1b8p9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176-rIiEfNN/5ZzuBKqQsb+ygjN6xnc\"",
    "mtime": "2025-11-04T23:22:07.687Z",
    "size": 374,
    "path": "../public/_nuxt/C_r1b8p9.js"
  },
  "/_nuxt/C_X2VlRn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"180-y902ZFZGHyIo0oGBU487yLqV7Wk\"",
    "mtime": "2025-11-04T23:22:06.935Z",
    "size": 384,
    "path": "../public/_nuxt/C_X2VlRn.js"
  },
  "/_nuxt/D07dzGk5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c31-ZvSro29cyfm/IO/dI0rrBrq/o04\"",
    "mtime": "2025-11-04T23:22:07.900Z",
    "size": 3121,
    "path": "../public/_nuxt/D07dzGk5.js"
  },
  "/_nuxt/D07MhBQt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"106b-zkC+k06ZoNHQoLQ61z0hObVoZWY\"",
    "mtime": "2025-11-04T23:22:06.955Z",
    "size": 4203,
    "path": "../public/_nuxt/D07MhBQt.js"
  },
  "/_nuxt/Da0ajR_J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1124-4hfBwjJSCFKjETBnJHvKfi8z3YE\"",
    "mtime": "2025-11-04T23:22:07.332Z",
    "size": 4388,
    "path": "../public/_nuxt/Da0ajR_J.js"
  },
  "/_nuxt/DbV2tsck.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c1-7oUXEHDUgCQXkCsqtbvflbb8+L4\"",
    "mtime": "2025-11-04T23:22:07.721Z",
    "size": 449,
    "path": "../public/_nuxt/DbV2tsck.js"
  },
  "/_nuxt/dCoaB5pm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d11-7Die/4Q00JN8r5ykHfvw7QP7j8g\"",
    "mtime": "2025-11-04T23:22:07.406Z",
    "size": 3345,
    "path": "../public/_nuxt/dCoaB5pm.js"
  },
  "/_nuxt/default.C997pgiz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dbd-fpdzhCOzGEZzNCaZoJMB6qr19HU\"",
    "mtime": "2025-11-04T23:22:06.910Z",
    "size": 3517,
    "path": "../public/_nuxt/default.C997pgiz.css"
  },
  "/_nuxt/DeGEl5ly.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f3-YDR9XV7GBf0T9FEG5/b3EbjfDMc\"",
    "mtime": "2025-11-04T23:22:07.739Z",
    "size": 1011,
    "path": "../public/_nuxt/DeGEl5ly.js"
  },
  "/_nuxt/DGN4ujgu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-rWeMecM9dc3ex0ZpGlNb1JIQHmk\"",
    "mtime": "2025-11-04T23:22:07.413Z",
    "size": 101,
    "path": "../public/_nuxt/DGN4ujgu.js"
  },
  "/_nuxt/DGpfWU8A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"363a-n1/L5vAkQ7wlT2Z/+YS6tHBlayY\"",
    "mtime": "2025-11-04T23:22:06.998Z",
    "size": 13882,
    "path": "../public/_nuxt/DGpfWU8A.js"
  },
  "/_nuxt/DHN2A1Ax.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f79-udm3J8zSOjIpG6NCXjDgp3DXsFg\"",
    "mtime": "2025-11-04T23:22:06.954Z",
    "size": 3961,
    "path": "../public/_nuxt/DHN2A1Ax.js"
  },
  "/_nuxt/DILjbsm8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d3a-fX/80ypgdIeIgvcImTLfQStFBEw\"",
    "mtime": "2025-11-04T23:22:07.259Z",
    "size": 3386,
    "path": "../public/_nuxt/DILjbsm8.js"
  },
  "/_nuxt/Din39pJP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"108d-haIw0dpyaC4ulZa1lDLDJg7GRh4\"",
    "mtime": "2025-11-04T23:22:07.230Z",
    "size": 4237,
    "path": "../public/_nuxt/Din39pJP.js"
  },
  "/_nuxt/DIxAA8nB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"422-TenrlXOD2Gh3Q8hc25jbKQLnB3w\"",
    "mtime": "2025-11-04T23:22:07.568Z",
    "size": 1058,
    "path": "../public/_nuxt/DIxAA8nB.js"
  },
  "/_nuxt/Djhw0WNW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f62-toeniC+LjG7QK1AwoLOPmlIL5Ik\"",
    "mtime": "2025-11-04T23:22:07.556Z",
    "size": 8034,
    "path": "../public/_nuxt/Djhw0WNW.js"
  },
  "/_nuxt/DJsD-OF6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"577-zICnSQL9cAaiC26IZeXJjys9J6A\"",
    "mtime": "2025-11-04T23:22:07.497Z",
    "size": 1399,
    "path": "../public/_nuxt/DJsD-OF6.js"
>>>>>>> validate-document
  },
  "/_nuxt/DJvq3mCv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c87-JFlX81uiZP5Bg0KLGw1BtNpL4JU\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:45.298Z",
    "size": 7303,
    "path": "../public/_nuxt/DJvq3mCv.js"
  },
  "/_nuxt/DkUuQiU9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"787-h2jFIfSNgBsF9SPVaJjUavI8WQ0\"",
    "mtime": "2025-11-03T23:58:45.293Z",
    "size": 1927,
    "path": "../public/_nuxt/DkUuQiU9.js"
  },
  "/_nuxt/DkYyttRT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f79-0hAU49Jq2IXrhwqfd/lY7BUrWeU\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 3961,
    "path": "../public/_nuxt/DkYyttRT.js"
  },
  "/_nuxt/DNXbzd3-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a36-lOjkxWn3KBGEB+qqyUUjtNDZ6uI\"",
    "mtime": "2025-11-03T23:58:45.808Z",
    "size": 2614,
    "path": "../public/_nuxt/DNXbzd3-.js"
  },
  "/_nuxt/DoImNybr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1124-L7kokj2rZUWA7+sGSO7vKp5dJHE\"",
    "mtime": "2025-11-03T23:58:45.168Z",
    "size": 4388,
    "path": "../public/_nuxt/DoImNybr.js"
  },
  "/_nuxt/DqPiMxT6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a77-Vv4vIlIgBCQg8B3nJYQyJR/8XYA\"",
    "mtime": "2025-11-03T23:58:45.036Z",
    "size": 6775,
    "path": "../public/_nuxt/DqPiMxT6.js"
  },
  "/_nuxt/DqQ5MEt4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6477-E7fqsdrV2eWBBVeoV/Y0it7uDZQ\"",
    "mtime": "2025-11-03T23:58:45.314Z",
    "size": 25719,
    "path": "../public/_nuxt/DqQ5MEt4.js"
  },
  "/_nuxt/DqXA8zG1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22a7-Exwgd+3HuPT9BmYkUKEvaa3g5mU\"",
    "mtime": "2025-11-03T23:58:45.029Z",
    "size": 8871,
    "path": "../public/_nuxt/DqXA8zG1.js"
  },
  "/_nuxt/Dq_N2V3P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"387c-auGrpCgbB10tlK36nafoD0r7p2Q\"",
    "mtime": "2025-11-03T23:58:45.294Z",
    "size": 14460,
    "path": "../public/_nuxt/Dq_N2V3P.js"
  },
  "/_nuxt/DrcDDeJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14d5-OQjV52FFJW1XgFWSU5fWajsxW2A\"",
    "mtime": "2025-11-03T23:58:44.797Z",
    "size": 5333,
    "path": "../public/_nuxt/DrcDDeJ7.js"
  },
  "/_nuxt/DStV17H2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c31-wYi+WmFzAzh7Cay4SjXVALRh+oI\"",
    "mtime": "2025-11-03T23:58:45.707Z",
    "size": 3121,
    "path": "../public/_nuxt/DStV17H2.js"
  },
  "/_nuxt/DUX_Gfk1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1089-iEMHWo+K/rJki6BpKhIlQakPr+k\"",
    "mtime": "2025-11-03T23:58:45.085Z",
    "size": 4233,
    "path": "../public/_nuxt/DUX_Gfk1.js"
  },
  "/_nuxt/DVg-ZQ6h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"73-yWOzVrZucfQM7Q4cNqzpfacA7Ic\"",
    "mtime": "2025-11-03T23:58:45.015Z",
    "size": 115,
    "path": "../public/_nuxt/DVg-ZQ6h.js"
  },
  "/_nuxt/dVLXcY02.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"838f-AlLyx51ht9LQmHwWNYauKx94wpw\"",
    "mtime": "2025-11-03T23:58:45.288Z",
    "size": 33679,
    "path": "../public/_nuxt/dVLXcY02.js"
  },
  "/_nuxt/DytSlm_y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53b87e-fCt28FK22wdlKlFzcSheRh2ie7Y\"",
    "mtime": "2025-11-03T23:58:45.388Z",
    "size": 5486718,
    "path": "../public/_nuxt/DytSlm_y.js"
  },
  "/_nuxt/DZpw8Y6B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a0c-hqiKSdhQmBL5vS1m/f1MmF7E+Zs\"",
    "mtime": "2025-11-03T23:58:44.974Z",
    "size": 2572,
    "path": "../public/_nuxt/DZpw8Y6B.js"
=======
    "mtime": "2025-11-04T23:22:07.557Z",
    "size": 7303,
    "path": "../public/_nuxt/DJvq3mCv.js"
  },
  "/_nuxt/DLABgo-n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11cf-06jHUg7kGnlInLIzP6uubuJGRaU\"",
    "mtime": "2025-11-04T23:22:07.557Z",
    "size": 4559,
    "path": "../public/_nuxt/DLABgo-n.js"
  },
  "/_nuxt/DLgE5-a0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"96f-WJkh5CMWx7rtQwX6gjdgZi3CrQY\"",
    "mtime": "2025-11-04T23:22:08.185Z",
    "size": 2415,
    "path": "../public/_nuxt/DLgE5-a0.js"
  },
  "/_nuxt/DLS8Cs2N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69a1-GG2aA0pvFQ6vwrpCGu/AJdnHyt0\"",
    "mtime": "2025-11-04T23:22:07.346Z",
    "size": 27041,
    "path": "../public/_nuxt/DLS8Cs2N.js"
  },
  "/_nuxt/DMgyeRTS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"191cc7-7F7e7FdQMAA4izKKBSUEY87Fo8Q\"",
    "mtime": "2025-11-04T23:22:07.770Z",
    "size": 1645767,
    "path": "../public/_nuxt/DMgyeRTS.js"
  },
  "/_nuxt/DOTLAKMx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1401-rr+q07YR2qNxh+oRp+FSHyTKxl8\"",
    "mtime": "2025-11-04T23:22:07.506Z",
    "size": 5121,
    "path": "../public/_nuxt/DOTLAKMx.js"
  },
  "/_nuxt/DoZMYjFn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67-VUO1MfjbFBD3yvy1ZaNUYwD8tTs\"",
    "mtime": "2025-11-04T23:22:07.359Z",
    "size": 103,
    "path": "../public/_nuxt/DoZMYjFn.js"
  },
  "/_nuxt/DqA3MEC4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-AUF6CuR4QeO1WsVaQD30MNPCaDg\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 101,
    "path": "../public/_nuxt/DqA3MEC4.js"
  },
  "/_nuxt/DQegB1Mg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1719-tgkjhAuf+sjsRtjaNalFSetbdjE\"",
    "mtime": "2025-11-04T23:22:07.900Z",
    "size": 5913,
    "path": "../public/_nuxt/DQegB1Mg.js"
  },
  "/_nuxt/DrwEC22x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f9-bgPW4b3kw1rgVz+VgAbc1g6O2Rk\"",
    "mtime": "2025-11-04T23:22:07.414Z",
    "size": 1529,
    "path": "../public/_nuxt/DrwEC22x.js"
  },
  "/_nuxt/DtdRW7Mv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26f-NdU+Oqh7diLvZKRM8GZacLZQW5I\"",
    "mtime": "2025-11-04T23:22:07.256Z",
    "size": 623,
    "path": "../public/_nuxt/DtdRW7Mv.js"
  },
  "/_nuxt/DVEGWjbO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a7-vui8AuccVlbzxG+7ABu2ONqwf9M\"",
    "mtime": "2025-11-04T23:22:07.400Z",
    "size": 1703,
    "path": "../public/_nuxt/DVEGWjbO.js"
  },
  "/_nuxt/Dvj_9bxa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f9-P7OowHzlrgv7pRy0IXIzBIcHUz8\"",
    "mtime": "2025-11-04T23:22:08.160Z",
    "size": 1273,
    "path": "../public/_nuxt/Dvj_9bxa.js"
  },
  "/_nuxt/DwJbAEqt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"209e-pbQOoWKR+zGhxbKB2x/48JaAXNM\"",
    "mtime": "2025-11-04T23:22:07.320Z",
    "size": 8350,
    "path": "../public/_nuxt/DwJbAEqt.js"
  },
  "/_nuxt/DwzovLvB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27e-c0+/JRvjLombeVz41xsc2elTO+0\"",
    "mtime": "2025-11-04T23:22:07.722Z",
    "size": 638,
    "path": "../public/_nuxt/DwzovLvB.js"
  },
  "/_nuxt/DwZrmf85.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d8a-h4kfjimqKFDs5b+/+hXTjDN4BIg\"",
    "mtime": "2025-11-04T23:22:08.184Z",
    "size": 3466,
    "path": "../public/_nuxt/DwZrmf85.js"
  },
  "/_nuxt/Dyr8Iz-E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6167-k8KO1pcjAE8jDsM7Y4fmafxLDEU\"",
    "mtime": "2025-11-04T23:22:07.346Z",
    "size": 24935,
    "path": "../public/_nuxt/Dyr8Iz-E.js"
>>>>>>> validate-document
  },
  "/_nuxt/editar.DtDFP9oF.png": {
    "type": "image/png",
    "etag": "\"1060-+/4ytHkdZ8/sHmR0v2Hu9GPDr5s\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
=======
    "mtime": "2025-11-04T23:22:06.730Z",
>>>>>>> validate-document
    "size": 4192,
    "path": "../public/_nuxt/editar.DtDFP9oF.png"
  },
  "/_nuxt/entry.6XvFx5c8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9c464-S6qq6Ok7YH4r/8a2P75fYJHmqWY\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.638Z",
=======
    "mtime": "2025-11-04T23:22:06.804Z",
>>>>>>> validate-document
    "size": 640100,
    "path": "../public/_nuxt/entry.6XvFx5c8.css"
  },
  "/_nuxt/error-404.C3V-3Mc4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-tk05rgubWwonEl8hX4lgLuosKN0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.629Z",
=======
    "mtime": "2025-11-04T23:22:06.813Z",
>>>>>>> validate-document
    "size": 3556,
    "path": "../public/_nuxt/error-404.C3V-3Mc4.css"
  },
  "/_nuxt/error-500.dGVH929u.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-KF6NWZfD3QI/4EI5b2MfK1uNuAg\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.637Z",
=======
    "mtime": "2025-11-04T23:22:06.813Z",
>>>>>>> validate-document
    "size": 1884,
    "path": "../public/_nuxt/error-500.dGVH929u.css"
  },
  "/_nuxt/escanear.DNtQsXN4.png": {
    "type": "image/png",
    "etag": "\"12df-gGZ8vKCMjendixceL9QDko3zZ6Q\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
=======
    "mtime": "2025-11-04T23:22:06.728Z",
>>>>>>> validate-document
    "size": 4831,
    "path": "../public/_nuxt/escanear.DNtQsXN4.png"
  },
  "/_nuxt/escanearFicha.CgD8l9Wn.png": {
    "type": "image/png",
    "etag": "\"447a-Vlpnd/ObdiMFjCEcvjXyvUyzuWU\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.577Z",
    "size": 17530,
    "path": "../public/_nuxt/escanearFicha.CgD8l9Wn.png"
  },
  "/_nuxt/FichaCard.vcU62FxK.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d701b-gHQfiln5NJGwl7HBheKLXrDXzY4\"",
    "mtime": "2025-11-03T23:58:44.758Z",
    "size": 1929243,
    "path": "../public/_nuxt/FichaCard.vcU62FxK.css"
=======
    "mtime": "2025-11-04T23:22:06.763Z",
    "size": 17530,
    "path": "../public/_nuxt/escanearFicha.CgD8l9Wn.png"
  },
  "/_nuxt/FFrOgRHK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72-+c7o9FQxFIqYKgYdW8bVxG/EV0M\"",
    "mtime": "2025-11-04T23:22:07.688Z",
    "size": 114,
    "path": "../public/_nuxt/FFrOgRHK.js"
  },
  "/_nuxt/FichaCard.Cm2i7-aQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1d6ca1-l5wCZPZxXedobdjjBlENfRrHhag\"",
    "mtime": "2025-11-04T23:22:06.934Z",
    "size": 1928353,
    "path": "../public/_nuxt/FichaCard.Cm2i7-aQ.css"
>>>>>>> validate-document
  },
  "/_nuxt/filter.Mx-H8xFp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3072-x1spEBD6v6wXF6qUAq0mXh0+adg\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
    "size": 12402,
    "path": "../public/_nuxt/filter.Mx-H8xFp.css"
  },
  "/_nuxt/imprimirFicha.BlhLZ85F.png": {
    "type": "image/png",
    "etag": "\"30e4-eIN006luc84ILSno6SMM2sROjwM\"",
    "mtime": "2025-11-03T23:58:44.563Z",
=======
    "mtime": "2025-11-04T23:22:06.856Z",
    "size": 12402,
    "path": "../public/_nuxt/filter.Mx-H8xFp.css"
  },
  "/_nuxt/gnaP-qKr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2667-p0LCHvbFUgJSjhAm3cp/9sJUawM\"",
    "mtime": "2025-11-04T23:22:06.938Z",
    "size": 9831,
    "path": "../public/_nuxt/gnaP-qKr.js"
  },
  "/_nuxt/imprimirFicha.BlhLZ85F.png": {
    "type": "image/png",
    "etag": "\"30e4-eIN006luc84ILSno6SMM2sROjwM\"",
    "mtime": "2025-11-04T23:22:06.756Z",
>>>>>>> validate-document
    "size": 12516,
    "path": "../public/_nuxt/imprimirFicha.BlhLZ85F.png"
  },
  "/_nuxt/index.Bb0z1Wvf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b-OqfziXtEDphcU1kk2C4eY2ZJoIg\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.637Z",
=======
    "mtime": "2025-11-04T23:22:06.813Z",
>>>>>>> validate-document
    "size": 59,
    "path": "../public/_nuxt/index.Bb0z1Wvf.css"
  },
  "/_nuxt/index.Blmuia2N.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"99-YFNnJ3rhP6+dtWqVwo3qKg8CRCw\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.638Z",
    "size": 153,
    "path": "../public/_nuxt/index.Blmuia2N.css"
  },
  "/_nuxt/index.Bs0Dqn7k.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9b0-lZk0K7zzCL2hkXt/F2smOXfz8qE\"",
    "mtime": "2025-11-03T23:58:44.637Z",
    "size": 2480,
    "path": "../public/_nuxt/index.Bs0Dqn7k.css"
  },
  "/_nuxt/index.BUGTbxSp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"877-T34z80ktN4xvlAWYdBVLscEnxDw\"",
    "mtime": "2025-11-03T23:58:44.637Z",
    "size": 2167,
    "path": "../public/_nuxt/index.BUGTbxSp.css"
  },
  "/_nuxt/index.CKAMDCZd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b-aVtOOR1fQ0YylWtCti+1Hl7pSkE\"",
    "mtime": "2025-11-03T23:58:44.637Z",
=======
    "mtime": "2025-11-04T23:22:06.814Z",
    "size": 153,
    "path": "../public/_nuxt/index.Blmuia2N.css"
  },
  "/_nuxt/index.CKAMDCZd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b-aVtOOR1fQ0YylWtCti+1Hl7pSkE\"",
    "mtime": "2025-11-04T23:22:06.814Z",
>>>>>>> validate-document
    "size": 59,
    "path": "../public/_nuxt/index.CKAMDCZd.css"
  },
  "/_nuxt/index.DCXJQvSK.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"862-3E9MVqvvY78teU7OnUgFo7Ezm48\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.637Z",
=======
    "mtime": "2025-11-04T23:22:06.816Z",
>>>>>>> validate-document
    "size": 2146,
    "path": "../public/_nuxt/index.DCXJQvSK.css"
  },
  "/_nuxt/index.DRnbxj55.css": {
    "type": "text/css; charset=utf-8",
<<<<<<< HEAD
    "etag": "\"99-lvdW5WU9EsEjKvgqkpwFeBl3CZE\"",
    "mtime": "2025-11-03T23:58:44.741Z",
=======
    "etag": "\"99-opPRtxXwVwwR/LQtBgLOgKroRE0\"",
    "mtime": "2025-11-04T23:22:06.895Z",
>>>>>>> validate-document
    "size": 153,
    "path": "../public/_nuxt/index.DRnbxj55.css"
  },
<<<<<<< HEAD
  "/_nuxt/index.KYstRz8S.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a8-AugQWgjb8GG2youjY1sFjn1ivyc\"",
    "mtime": "2025-11-03T23:58:44.762Z",
    "size": 1704,
    "path": "../public/_nuxt/index.KYstRz8S.css"
  },
  "/_nuxt/KBx4Rvyj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22d6-YBl9yMVopsnAm8FX7sf5nsRsE3c\"",
    "mtime": "2025-11-03T23:58:44.802Z",
    "size": 8918,
    "path": "../public/_nuxt/KBx4Rvyj.js"
  },
  "/_nuxt/KFLJOwjW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2201-KeneYycYxtPh4Izp0/qfPvsYZYk\"",
    "mtime": "2025-11-03T23:58:45.290Z",
    "size": 8705,
    "path": "../public/_nuxt/KFLJOwjW.js"
  },
  "/_nuxt/kVm4LKEh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fb8-7nCekI5jbXUMmPoMFNTDpF33GZY\"",
    "mtime": "2025-11-03T23:58:44.775Z",
    "size": 4024,
    "path": "../public/_nuxt/kVm4LKEh.js"
=======
  "/_nuxt/iTgvSeZq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a72-OJdTRYG5GjKL9M4k8V92gJXzNo4\"",
    "mtime": "2025-11-04T23:22:07.244Z",
    "size": 6770,
    "path": "../public/_nuxt/iTgvSeZq.js"
  },
  "/_nuxt/KDxZnAr7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2380-TOPIXnHktzjFLCjGT7ub8Z3zL1A\"",
    "mtime": "2025-11-04T23:22:07.899Z",
    "size": 9088,
    "path": "../public/_nuxt/KDxZnAr7.js"
  },
  "/_nuxt/kkGkp2AC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1361-RL4v/6sqkU74Eo7Lb+wv5OH5RaE\"",
    "mtime": "2025-11-04T23:22:07.660Z",
    "size": 4961,
    "path": "../public/_nuxt/kkGkp2AC.js"
>>>>>>> validate-document
  },
  "/_nuxt/lavrar.D2Pu00F0.png": {
    "type": "image/png",
    "etag": "\"13c8-BzgrAGqdt9zGU6/QePG35RgXH6E\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.563Z",
=======
    "mtime": "2025-11-04T23:22:06.756Z",
>>>>>>> validate-document
    "size": 5064,
    "path": "../public/_nuxt/lavrar.D2Pu00F0.png"
  },
  "/_nuxt/LEvvnz40.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1387-Vv0cBwDl5MCIM9WtOlC/fdOv+ck\"",
    "mtime": "2025-11-04T23:22:06.955Z",
    "size": 4999,
    "path": "../public/_nuxt/LEvvnz40.js"
  },
  "/_nuxt/Login.C6E4XCGu.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c5072-kd3GMHD858E86Aluj1N8Kav0WOA\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.629Z",
=======
    "mtime": "2025-11-04T23:22:06.804Z",
>>>>>>> validate-document
    "size": 1855602,
    "path": "../public/_nuxt/Login.C6E4XCGu.jpg"
  },
  "/_nuxt/logo_login.yAQCWbno.png": {
    "type": "image/png",
    "etag": "\"20a23-N1hlHuDfozxzuQN3okROD/pmsJM\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.562Z",
=======
    "mtime": "2025-11-04T23:22:06.730Z",
>>>>>>> validate-document
    "size": 133667,
    "path": "../public/_nuxt/logo_login.yAQCWbno.png"
  },
  "/_nuxt/logo_navbar.WRqgS9jl.png": {
    "type": "image/png",
    "etag": "\"5c56-uoikQ6ZzJ4rbgjTvJTcLD/y4Sz0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.531Z",
=======
    "mtime": "2025-11-04T23:22:06.728Z",
>>>>>>> validate-document
    "size": 23638,
    "path": "../public/_nuxt/logo_navbar.WRqgS9jl.png"
  },
  "/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf": {
    "type": "font/ttf",
    "etag": "\"13f40c-T1Gk3HWmjT5XMhxEjv3eojyKnbA\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.585Z",
=======
    "mtime": "2025-11-04T23:22:06.763Z",
>>>>>>> validate-document
    "size": 1307660,
    "path": "../public/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf"
  },
  "/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"13f4e8-ApygSKV9BTQg/POr5dCUzjU5OZw\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.576Z",
=======
    "mtime": "2025-11-04T23:22:06.763Z",
>>>>>>> validate-document
    "size": 1307880,
    "path": "../public/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot"
  },
  "/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2": {
    "type": "font/woff2",
    "etag": "\"62710-TiD2zPQxmd6lyFsjoODwuoH/7iY\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.562Z",
=======
    "mtime": "2025-11-04T23:22:06.726Z",
>>>>>>> validate-document
    "size": 403216,
    "path": "../public/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2"
  },
  "/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff": {
    "type": "font/woff",
    "etag": "\"8f8d0-zD3UavWtb7zNpwtFPVWUs57NasQ\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.567Z",
=======
    "mtime": "2025-11-04T23:22:06.701Z",
>>>>>>> validate-document
    "size": 587984,
    "path": "../public/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff"
  },
  "/_nuxt/MoneyInput.wJpzzEu-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"33-lVFtxPBHbiCoYnkHHaMC/9yIecU\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.689Z",
    "size": 51,
    "path": "../public/_nuxt/MoneyInput.wJpzzEu-.css"
  },
  "/_nuxt/N4ztoqAr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69-JvBFwpr8EMp0T7Sn7LVcBatcqLw\"",
    "mtime": "2025-11-03T23:58:45.208Z",
    "size": 105,
    "path": "../public/_nuxt/N4ztoqAr.js"
  },
  "/_nuxt/NHjiDKC7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f6b-WmsMhiyBQrkwVGXyM108mPN4R2I\"",
    "mtime": "2025-11-03T23:58:45.088Z",
    "size": 3947,
    "path": "../public/_nuxt/NHjiDKC7.js"
  },
  "/_nuxt/pDeVLRW-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2f-ggZLodPSU/gSmWP2wZF2L4JoaCw\"",
    "mtime": "2025-11-03T23:58:45.855Z",
    "size": 2863,
    "path": "../public/_nuxt/pDeVLRW-.js"
  },
  "/_nuxt/prBOeBVf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1719-UypUZQDjocZ0UdXh2wc3nGpJdEc\"",
    "mtime": "2025-11-03T23:58:45.701Z",
    "size": 5913,
    "path": "../public/_nuxt/prBOeBVf.js"
  },
  "/_nuxt/qaL9sos9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1831-S7O1zoRw3T+6HcSToT2C2ZU3JRw\"",
    "mtime": "2025-11-03T23:58:44.982Z",
    "size": 6193,
    "path": "../public/_nuxt/qaL9sos9.js"
=======
    "mtime": "2025-11-04T23:22:06.853Z",
    "size": 51,
    "path": "../public/_nuxt/MoneyInput.wJpzzEu-.css"
  },
  "/_nuxt/MYwf52Uf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2291-AjdzVNP6VbvrNFswRWQ0hvA7k+U\"",
    "mtime": "2025-11-04T23:22:07.223Z",
    "size": 8849,
    "path": "../public/_nuxt/MYwf52Uf.js"
  },
  "/_nuxt/N260uwgK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"387b-dC6wR9jmk1Vi0X9h7FIFRdJtrDk\"",
    "mtime": "2025-11-04T23:22:07.507Z",
    "size": 14459,
    "path": "../public/_nuxt/N260uwgK.js"
  },
  "/_nuxt/naBkVxAZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a48-XQxaPpIGIabVi3MMNZcjkbCvMdY\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 6728,
    "path": "../public/_nuxt/naBkVxAZ.js"
  },
  "/_nuxt/r4lf5MgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60673-rmLgYqee/h4FE4+Je3xo+eUi6EM\"",
    "mtime": "2025-11-04T23:22:06.912Z",
    "size": 394867,
    "path": "../public/_nuxt/r4lf5MgJ.js"
>>>>>>> validate-document
  },
  "/_nuxt/recebe.CceqgowM.png": {
    "type": "image/png",
    "etag": "\"11cd-XXWolDiM6mJWBszWjzxg2m2BSZ0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
=======
    "mtime": "2025-11-04T23:22:06.730Z",
>>>>>>> validate-document
    "size": 4557,
    "path": "../public/_nuxt/recebe.CceqgowM.png"
  },
  "/_nuxt/RegistroPessoas.DeGaH9U-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"29a4-b2u2MY9T5t5+1luP2erOkr4zhWg\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.701Z",
=======
    "mtime": "2025-11-04T23:22:06.871Z",
>>>>>>> validate-document
    "size": 10660,
    "path": "../public/_nuxt/RegistroPessoas.DeGaH9U-.css"
  },
  "/_nuxt/salvar.b7udBb7s.png": {
    "type": "image/png",
    "etag": "\"145a-5623y80PSfYzveFxXHpWAd1VcXk\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.562Z",
=======
    "mtime": "2025-11-04T23:22:06.728Z",
>>>>>>> validate-document
    "size": 5210,
    "path": "../public/_nuxt/salvar.b7udBb7s.png"
  },
  "/_nuxt/selo.D9mIBRmY.png": {
    "type": "image/png",
    "etag": "\"12b7-dN0ViFiW2lCiJXeI7I8Yl3BcFbU\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
    "size": 4791,
    "path": "../public/_nuxt/selo.D9mIBRmY.png"
  },
  "/_nuxt/SfLH6TS8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11260-+u78RXipLcQzZwbG78Bj0YMX6Wk\"",
    "mtime": "2025-11-03T23:58:45.446Z",
    "size": 70240,
    "path": "../public/_nuxt/SfLH6TS8.js"
=======
    "mtime": "2025-11-04T23:22:06.728Z",
    "size": 4791,
    "path": "../public/_nuxt/selo.D9mIBRmY.png"
  },
  "/_nuxt/smPWFjrq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da1-92TQY0q2pD+XwcE18/tsGWWY4fo\"",
    "mtime": "2025-11-04T23:22:07.844Z",
    "size": 3489,
    "path": "../public/_nuxt/smPWFjrq.js"
  },
  "/_nuxt/stYXiBEI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74-TfBHfPa7SJe7S2iyfGe/qq+9O5Q\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 116,
    "path": "../public/_nuxt/stYXiBEI.js"
  },
  "/_nuxt/SwBx4kE3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c29-EzTYzf0lpWI7BDH8Cg5s6VfSFB0\"",
    "mtime": "2025-11-04T23:22:06.955Z",
    "size": 3113,
    "path": "../public/_nuxt/SwBx4kE3.js"
>>>>>>> validate-document
  },
  "/_nuxt/TDtrdbi3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef-6ksjCgqoQ3jaCb39TGNgg/+X0qI\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:45.418Z",
    "size": 239,
    "path": "../public/_nuxt/TDtrdbi3.js"
=======
    "mtime": "2025-11-04T23:22:07.738Z",
    "size": 239,
    "path": "../public/_nuxt/TDtrdbi3.js"
  },
  "/_nuxt/u1QbfP03.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1004-prG6BOU+3VDJGIV6yWdZ+45K5tQ\"",
    "mtime": "2025-11-04T23:22:07.246Z",
    "size": 4100,
    "path": "../public/_nuxt/u1QbfP03.js"
  },
  "/_nuxt/U2vKPAq8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a2-8/nnuZXZHBieBMMr9dp3sm1TjN0\"",
    "mtime": "2025-11-04T23:22:08.184Z",
    "size": 5026,
    "path": "../public/_nuxt/U2vKPAq8.js"
>>>>>>> validate-document
  },
  "/_nuxt/VAutocomplete.BXTqCHW9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9a2-N+lwcu/Ye5ZQ9EBJNddChL3Z6P0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.668Z",
=======
    "mtime": "2025-11-04T23:22:06.833Z",
>>>>>>> validate-document
    "size": 2466,
    "path": "../public/_nuxt/VAutocomplete.BXTqCHW9.css"
  },
  "/_nuxt/VAvatar.CK6jvLr0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8f2-tDfrtDRjCJ9XuzKNEIib5C3FFqk\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.689Z",
=======
    "mtime": "2025-11-04T23:22:06.870Z",
>>>>>>> validate-document
    "size": 2290,
    "path": "../public/_nuxt/VAvatar.CK6jvLr0.css"
  },
  "/_nuxt/VCard.CEgHfNs9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"198d-K8FYzrgfGHKcGEIdah4lzArPAHw\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.687Z",
=======
    "mtime": "2025-11-04T23:22:06.836Z",
>>>>>>> validate-document
    "size": 6541,
    "path": "../public/_nuxt/VCard.CEgHfNs9.css"
  },
  "/_nuxt/VCheckbox.CvH8ekHL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6d-0CbFad/TQeJ4x6jaztFtqpweNjY\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.738Z",
=======
    "mtime": "2025-11-04T23:22:06.894Z",
>>>>>>> validate-document
    "size": 109,
    "path": "../public/_nuxt/VCheckbox.CvH8ekHL.css"
  },
  "/_nuxt/VDataTable.CGRkVslf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"297c-BfA1vp8rS6R4JmyBpEgvVNr58Wo\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.666Z",
=======
    "mtime": "2025-11-04T23:22:06.833Z",
>>>>>>> validate-document
    "size": 10620,
    "path": "../public/_nuxt/VDataTable.CGRkVslf.css"
  },
  "/_nuxt/VDialog.Dc4-F0c_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"94e-6cJIOsiL1OZnPxeYW8Ypr9xc5Bk\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.683Z",
=======
    "mtime": "2025-11-04T23:22:06.836Z",
>>>>>>> validate-document
    "size": 2382,
    "path": "../public/_nuxt/VDialog.Dc4-F0c_.css"
  },
  "/_nuxt/VDivider.CRhg1j9w.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"345-ogxbbj+9cbt5FZ/+wyErZJOU9H0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
=======
    "mtime": "2025-11-04T23:22:06.856Z",
>>>>>>> validate-document
    "size": 837,
    "path": "../public/_nuxt/VDivider.CRhg1j9w.css"
  },
  "/_nuxt/VImg.0LEh3LCA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e1-rAChFpF0e6anyERm0WYkeDRe498\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
=======
    "mtime": "2025-11-04T23:22:06.870Z",
>>>>>>> validate-document
    "size": 481,
    "path": "../public/_nuxt/VImg.0LEh3LCA.css"
  },
  "/_nuxt/visualizar-vermelho.BmNZ_xMd.png": {
    "type": "image/png",
    "etag": "\"1172-hyzw6aie8jSSI25hp0XcJR38zr0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.562Z",
=======
    "mtime": "2025-11-04T23:22:06.731Z",
>>>>>>> validate-document
    "size": 4466,
    "path": "../public/_nuxt/visualizar-vermelho.BmNZ_xMd.png"
  },
  "/_nuxt/visualizar.trXHlKAj.png": {
    "type": "image/png",
    "etag": "\"1426-jCjiHuiGL6e1EtwjhKTcJgakvZU\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.560Z",
=======
    "mtime": "2025-11-04T23:22:06.725Z",
>>>>>>> validate-document
    "size": 5158,
    "path": "../public/_nuxt/visualizar.trXHlKAj.png"
  },
  "/_nuxt/VKYl1Id5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29e2-15dK/UjEHLx3lsguXNv3lL+JYTI\"",
    "mtime": "2025-11-04T23:22:07.687Z",
    "size": 10722,
    "path": "../public/_nuxt/VKYl1Id5.js"
  },
  "/_nuxt/VList.C3hbn22i.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3464-deIHagxH8gU+uB7QAZBL7TFm7D0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
=======
    "mtime": "2025-11-04T23:22:06.870Z",
>>>>>>> validate-document
    "size": 13412,
    "path": "../public/_nuxt/VList.C3hbn22i.css"
  },
  "/_nuxt/vqhvEnhr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d98-2iMlbhzYrFA+5KGE8cUhPgSgD0w\"",
    "mtime": "2025-11-03T23:58:45.065Z",
    "size": 3480,
    "path": "../public/_nuxt/vqhvEnhr.js"
  },
  "/_nuxt/VResponsive.EDskruyZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"188-AvJhee7vd3i/e4LhctJvIkKkBSs\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
=======
    "mtime": "2025-11-04T23:22:06.870Z",
>>>>>>> validate-document
    "size": 392,
    "path": "../public/_nuxt/VResponsive.EDskruyZ.css"
  },
  "/_nuxt/VSelectionControl.D_cHeB3n.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"90a-ndjnaWHpMsugbsjc9QPhOKvc6vA\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.699Z",
=======
    "mtime": "2025-11-04T23:22:06.876Z",
>>>>>>> validate-document
    "size": 2314,
    "path": "../public/_nuxt/VSelectionControl.D_cHeB3n.css"
  },
  "/_nuxt/VTabs.uUUnl-Bb.css": {
    "type": "text/css; charset=utf-8",
<<<<<<< HEAD
    "etag": "\"6f4-MiJEyNsHn8NGnJTrdXIMJK2tlgw\"",
    "mtime": "2025-11-03T23:58:44.699Z",
    "size": 1780,
    "path": "../public/_nuxt/VTabs.uUUnl-Bb.css"
=======
    "etag": "\"e36-7UI/69O2yLDRoz+T9kjWB4OWeBI\"",
    "mtime": "2025-11-04T23:22:06.871Z",
    "size": 3638,
    "path": "../public/_nuxt/VTabs.BTjDJZgH.css"
>>>>>>> validate-document
  },
  "/_nuxt/VTextarea.BuQdIF8A.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48e-xNNHNgrNpF6llLezI9+hAw2lwRk\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.689Z",
    "size": 1166,
    "path": "../public/_nuxt/VTextarea.BuQdIF8A.css"
  },
  "/_nuxt/VWindowItem.D49w9jIi.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"743-L3w5ilmw+RaFEXGW2iHG6KrriOA\"",
    "mtime": "2025-11-03T23:58:44.699Z",
    "size": 1859,
    "path": "../public/_nuxt/VWindowItem.D49w9jIi.css"
  },
  "/_nuxt/wvowXzEd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c1-3ufpSdDCzxeGLDx52mflWaTIW+U\"",
    "mtime": "2025-11-03T23:58:45.406Z",
    "size": 449,
    "path": "../public/_nuxt/wvowXzEd.js"
  },
  "/_nuxt/WZFWeRWs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30ab-cMGPBzODYsdmcm0C1EflcHvBU8Q\"",
    "mtime": "2025-11-03T23:58:45.855Z",
    "size": 12459,
    "path": "../public/_nuxt/WZFWeRWs.js"
  },
  "/_nuxt/z4ipdVxZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74-/uqoloM9M/YQyC3VZJMnOdawpdo\"",
    "mtime": "2025-11-03T23:58:45.209Z",
    "size": 116,
    "path": "../public/_nuxt/z4ipdVxZ.js"
  },
  "/_nuxt/z_Q9kq13.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c35-/KQAs2KSnALiI4QViWP5XhGvFpA\"",
    "mtime": "2025-11-03T23:58:44.769Z",
    "size": 3125,
    "path": "../public/_nuxt/z_Q9kq13.js"
=======
    "mtime": "2025-11-04T23:22:06.869Z",
    "size": 1166,
    "path": "../public/_nuxt/VTextarea.BuQdIF8A.css"
  },
  "/_nuxt/WWyS5KN7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a31-wBXBrZimTZ7zbANEM7D8ygtV/Rw\"",
    "mtime": "2025-11-04T23:22:07.137Z",
    "size": 2609,
    "path": "../public/_nuxt/WWyS5KN7.js"
  },
  "/_nuxt/xE3qjFmg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"301-MWHNALO1M/q8vTTEoChTPVA/MVY\"",
    "mtime": "2025-11-04T23:22:07.568Z",
    "size": 769,
    "path": "../public/_nuxt/xE3qjFmg.js"
  },
  "/_nuxt/Xyp_uJQG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2202-9M8APymCHpPlMKst3oVtKhPY1RU\"",
    "mtime": "2025-11-04T23:22:07.506Z",
    "size": 8706,
    "path": "../public/_nuxt/Xyp_uJQG.js"
  },
  "/_nuxt/Y8EVlUfF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3658-uqPGo28kPZHrQo7Cy+XH0yHzR+s\"",
    "mtime": "2025-11-04T23:22:06.936Z",
    "size": 13912,
    "path": "../public/_nuxt/Y8EVlUfF.js"
  },
  "/_nuxt/Y9Wy4so6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f8b-+D51l5u54zZSSiGmKgrEIEHhRCc\"",
    "mtime": "2025-11-04T23:22:07.568Z",
    "size": 20363,
    "path": "../public/_nuxt/Y9Wy4so6.js"
  },
  "/_nuxt/Z-ZQGaL3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-4R+i1VvyYintHhkthYJ3WVa+UGg\"",
    "mtime": "2025-11-04T23:22:07.407Z",
    "size": 101,
    "path": "../public/_nuxt/Z-ZQGaL3.js"
>>>>>>> validate-document
  },
  "/_nuxt/_id_.B4s31t9_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"57-XV6tqbg+8Wu/TvxmgeJQMbVVsVQ\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.746Z",
=======
    "mtime": "2025-11-04T23:22:06.894Z",
>>>>>>> validate-document
    "size": 87,
    "path": "../public/_nuxt/_id_.B4s31t9_.css"
  },
  "/_nuxt/_id_.BNyYJ06X.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66-eQd+04TkFIlAuqlkobqb3mrCDrQ\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.741Z",
=======
    "mtime": "2025-11-04T23:22:06.895Z",
>>>>>>> validate-document
    "size": 102,
    "path": "../public/_nuxt/_id_.BNyYJ06X.css"
  },
  "/_nuxt/_id_.DMcsjO7G.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"57-N7TYW2OU7gimfERfJ7sHztHruWo\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.638Z",
=======
    "mtime": "2025-11-04T23:22:06.816Z",
>>>>>>> validate-document
    "size": 87,
    "path": "../public/_nuxt/_id_.DMcsjO7G.css"
  },
  "/_nuxt/_id_.DQhbIOXM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"57-fwk6e87i1SOpcL4rNUtw62Chkt0\"",
<<<<<<< HEAD
    "mtime": "2025-11-03T23:58:44.757Z",
=======
    "mtime": "2025-11-04T23:22:06.910Z",
>>>>>>> validate-document
    "size": 87,
    "path": "../public/_nuxt/_id_.DQhbIOXM.css"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
<<<<<<< HEAD
    "etag": "\"47-ZFHGQ4rxWYPyB/A0slTxOe2E5ks\"",
    "mtime": "2025-11-04T00:01:00.770Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/2050531d-2f0f-4e44-b51e-9c22b4b1261f.json": {
    "type": "application/json",
    "etag": "\"8b-W8oxPcPm7Jt9SSap0/Gi3ql0e/U\"",
    "mtime": "2025-11-04T00:01:00.770Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/2050531d-2f0f-4e44-b51e-9c22b4b1261f.json"
=======
    "etag": "\"47-zhOgfqfkP4GdAp9NWfdPn4q4Yt0\"",
    "mtime": "2025-11-04T23:24:34.856Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/9aaa9a96-1049-43dd-8a74-eaab2731f31d.json": {
    "type": "application/json",
    "etag": "\"8b-HOKGpMtiB05ftUjNRA9xtj/okRk\"",
    "mtime": "2025-11-04T23:24:34.857Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/9aaa9a96-1049-43dd-8a74-eaab2731f31d.json"
>>>>>>> validate-document
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _8k4ew0 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_bRmLOg = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _8k4ew0, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_bRmLOg, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_bRmLOg, lazy: true, middleware: false, method: undefined }
];

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : undefined,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? undefined : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === undefined) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === undefined) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\Rodrigo\\Documents\\GitHub\\Cartorio360-front\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== undefined);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== undefined && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = undefined;
          entry.integrity = undefined;
          entry.mtime = undefined;
          entry.expires = undefined;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === undefined) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : undefined
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === undefined) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== undefined) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(undefined);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== undefined) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== undefined) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = undefined;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === undefined) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
<<<<<<< HEAD
    "buildId": "2050531d-2f0f-4e44-b51e-9c22b4b1261f",
=======
    "buildId": "9aaa9a96-1049-43dd-8a74-eaab2731f31d",
>>>>>>> validate-document
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "auth": "http://157.230.216.74:40176",
    "managemant": "http://157.230.216.74:14193",
    "chat_bot": "http://157.230.216.74:3452",
    "biometria": "http://localhost:5000/apiservice",
    "envioDoc": "http://localhost:3500",
    "docEditor": "Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpec3VXRmhfVUx2WUFWYUA=",
    "ws": "http://localhost:3333"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return undefined;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== undefined) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === undefined) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = undefined;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = undefined;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : undefined;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: undefined };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch as $, createHooks as A, toRouteMatcher as B, createRouter$1 as C, defu as D, hash as E, parseQuery as F, withTrailingSlash as G, withoutTrailingSlash as H, trapUnhandledNodeErrors as a, useNitroApp as b, defineRenderHandler as c, destr as d, createError$1 as e, getRouteRules as f, getQuery as g, getResponseStatus as h, getResponseStatusText as i, joinRelativeURL as j, hasProtocol as k, isScriptProtocol as l, joinURL as m, klona as n, getRequestHeader as o, parse as p, sanitizeStatusCode as q, isEqual as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, setCookie as v, withQuery as w, getCookie as x, deleteCookie as y, getContext as z };
//# sourceMappingURL=nitro.mjs.map
