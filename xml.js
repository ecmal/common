System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CS, XmlNode, XmlBuffer, XmlParser, XmlStream, XmlBuilder, Xml;
    return {
        setters:[],
        execute: function() {
            CS = {
                BS: 32,
                XS: {
                    START: 0,
                    EAT_SPACES: 1,
                    ELEMENT: 2,
                    ELEMENT_NAME: 3,
                    ATTRIBUTES: 4,
                    ATTRIBUTE_NAME: 5,
                    EQUAL: 6,
                    ATTRIBUTE_VALUE: 7,
                    CLOSE_EMPTY_ELEMENT: 8,
                    TRY_CLOSE_ELEMENT: 9,
                    CLOSE_ELEMENT_NAME: 10,
                    CHILD_NODES: 11,
                    ELEMENT_STRING: 12,
                    ELEMENT_COMMENT: 13,
                    CLOSE_ELEMENT_COMMENT: 14,
                    DOCTYPE: 15,
                    ELEMENT_PI: 16,
                    ELEMENT_DATA_PI: 17,
                    CLOSE_ELEMENT_PI: 18,
                    ELEMENT_CDATA: 19,
                    CLOSE_ELEMENT_CDATA: 20,
                    ESCAPE: 21,
                    ESCAPE_LT: 22,
                    ESCAPE_GT: 23,
                    ESCAPE_AMP: 24,
                    ESCAPE_APOS: 25,
                    ESCAPE_QUOT: 26,
                    ESCAPE_CHAR: 27,
                    ESCAPE_CH_NUM: 28,
                    ESCAPE_CH_HEX: 29,
                    END: 30
                },
                XC: {
                    ELEMENT: 0,
                    COMMENT: 1,
                    STRING: 2,
                    CDATA: 3,
                    PROCESS_INST: 4
                },
                XT: {
                    OPEN: 0,
                    CLOSE: 1,
                    ATTRIBUTE: 2,
                    TEXT: 3,
                    CDATA: 4,
                    COMMENT: 5
                },
                CH: {
                    TAB: 9,
                    LF: 10,
                    CR: 13,
                    SP: 32,
                    EXCL: 33,
                    DBLQ: 34,
                    SHRP: 35,
                    AMPE: 38,
                    SINQ: 39,
                    MINU: 45,
                    PT: 46,
                    SLAH: 47,
                    ZERO: 48,
                    NINE: 57,
                    COLO: 58,
                    SCOL: 59,
                    LESS: 60,
                    EQUA: 61,
                    GREA: 62,
                    QUES: 63,
                    A: 65,
                    C: 67,
                    D: 68,
                    F: 70,
                    T: 84,
                    Z: 90,
                    LEBR: 91,
                    RIBR: 93,
                    LL: 95,
                    a: 97,
                    f: 102,
                    g: 103,
                    l: 108,
                    m: 109,
                    o: 111,
                    p: 112,
                    q: 113,
                    s: 115,
                    t: 116,
                    u: 117,
                    x: 120,
                    z: 122,
                    HIGH: 161
                },
                ST: {
                    ENC: 'encoding',
                    XML: 'xml'
                },
                isSpace: function (v) {
                    return (v == CS.CH.TAB || v == CS.CH.LF || v == CS.CH.CR || v == CS.CH.SP);
                },
                isAlpha: function (v) {
                    return (v >= CS.CH.A && v <= CS.CH.Z) ||
                        (v >= CS.CH.a && v <= CS.CH.z) ||
                        (v == CS.CH.LL) || (v == CS.CH.COLO) || (v >= CS.CH.HIGH);
                },
                isNum: function (v) {
                    return (v >= CS.CH.ZERO && v <= CS.CH.NINE);
                },
                isAlphaNum: function (v) {
                    return (CS.isAlpha(v) || CS.isNum(v) || (v == CS.CH.PT) || (v == CS.CH.MINU));
                },
                isHex: function (v) {
                    return (v >= CS.CH.A && v <= CS.CH.F) ||
                        (v >= CS.CH.a && v <= CS.CH.f) ||
                        (v >= CS.CH.ZERO && v <= CS.CH.NINE);
                },
                hexDigit: function (v) {
                    if (v <= CS.CH.NINE) {
                        return v - CS.CH.ZERO;
                    }
                    else {
                        return (v & 7) + 9;
                    }
                },
                space: function (c) {
                    var str = '';
                    for (var i = 0; i < c; i++) {
                        str += '  ';
                    }
                    return str;
                }
            };
            XmlNode = (function () {
                function XmlNode(name, attributes, children) {
                    if (attributes === void 0) { attributes = {}; }
                    this._ = {
                        name: name,
                        attributes: attributes,
                        children: children.filter(function (item) { return item !== ''; })
                    };
                }
                Object.defineProperty(XmlNode.prototype, "name", {
                    get: function () {
                        return this._.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "attributes", {
                    get: function () {
                        return this._.attributes;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "children", {
                    get: function () {
                        return this._.children;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "value", {
                    get: function () {
                        if (this.isSimple) {
                            return this.child(0).toString();
                        }
                        else {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "isSimple", {
                    get: function () {
                        return (this.children.length == 1 && !(this.child(0) instanceof XmlNode));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "hasAttributes", {
                    get: function () {
                        return Object.keys(this.attributes).length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XmlNode.prototype, "hasChildren", {
                    get: function () {
                        return this.children.length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                XmlNode.prototype.child = function (child) {
                    if (typeof child == 'number') {
                        return this.children[child];
                    }
                    else if (typeof child == 'string') {
                        this.children.push(child);
                        return this;
                    }
                    else if (child instanceof XmlNode) {
                        this.children.push(child);
                        return this;
                    }
                };
                XmlNode.prototype.childs = function (childs) {
                    if (childs instanceof Array) {
                        for (var _i = 0; _i < childs.length; _i++) {
                            var child = childs[_i];
                            this.child(child);
                        }
                        return this;
                    }
                };
                XmlNode.prototype.getByName = function (name) {
                    if (this.name == name) {
                        return this;
                    }
                    else {
                        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                            var child = _a[_i];
                            if (child instanceof XmlNode) {
                                var el = child.getByName(name);
                                if (el) {
                                    return el;
                                }
                            }
                        }
                    }
                    return false;
                };
                XmlNode.prototype.findByName = function (name) {
                    var elements = [];
                    if (this.name == name) {
                        elements.push(this);
                    }
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        if (child instanceof XmlNode) {
                            elements.push.apply(elements, child.findByName(name));
                        }
                    }
                    return elements;
                };
                XmlNode.prototype.findById = function (id) {
                    if (this.attributes.id && this.attributes.id == id) {
                        return this;
                    }
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        if (child instanceof XmlNode) {
                            var el = child.findById(id);
                            if (el) {
                                return el;
                            }
                        }
                    }
                    return false;
                };
                XmlNode.prototype.attribute = function (name, value) {
                    if (typeof name === 'object') {
                        for (var key in name) {
                            this.attribute(key, name[key]);
                        }
                        return this;
                    }
                    else if (typeof name === 'string') {
                        if (value !== undefined) {
                            this.attributes[name] = value;
                            return this;
                        }
                        else {
                            return this.attributes[name];
                        }
                    }
                };
                XmlNode.prototype.inspect = function () {
                    return this.toJSON();
                };
                XmlNode.prototype.toJSON = function () {
                    var node = { name: this.name };
                    if (this.hasAttributes) {
                        node.attributes = this.attributes;
                    }
                    if (this.isSimple) {
                        node.value = this.value;
                    }
                    else if (this.hasChildren) {
                        node.children = this.children;
                    }
                    return node;
                };
                XmlNode.prototype.toString = function () {
                    return this.asString();
                };
                XmlNode.prototype.asString = function (l, h) {
                    var _this = this;
                    if (l === void 0) { l = 0; }
                    if (h === void 0) { h = true; }
                    var head = (function () {
                        return (l == 0 && h) ? '<?xml version="1.0"?>\n' : '';
                    }).call(this);
                    var attr = (function () {
                        var a, v, pairs = [];
                        for (a in _this.attributes) {
                            v = _this.attributes[a];
                            if (typeof v != 'function') {
                                pairs.push(a + "=\"" + v + "\"");
                            }
                        }
                        return pairs.length ? ' ' + pairs.join(' ') : '';
                    }).call(this);
                    var chld = (function () {
                        var pairs = [];
                        for (var _i = 0, _a = _this.children; _i < _a.length; _i++) {
                            var c = _a[_i];
                            if (c instanceof XmlNode) {
                                pairs.push(c.asString(l + 1));
                            }
                            else {
                                pairs.push(String(c));
                            }
                        }
                        return pairs.length ? pairs.join('\n') + '\n' : '';
                    }).call(this);
                    if (this.isSimple) {
                        return "" + head + CS.space(l) + "<" + this.name + attr + ">" + this.value + "</" + this.name + ">";
                    }
                    else if (this.children.length) {
                        return "" + head + CS.space(l) + "<" + this.name + attr + ">" + '\n' + chld + CS.space(l) + "</" + this.name + ">";
                    }
                    else {
                        return "" + head + CS.space(l) + "<" + this.name + attr + "/>" + '\n';
                    }
                };
                XmlNode.prototype.asObject = function (ns) {
                    if (ns === void 0) { ns = true; }
                    if (!this.hasAttributes && this.isSimple) {
                        return this.value;
                    }
                    else {
                        var a, v, node = {}, empty = true;
                        for (a in this.attributes) {
                            empty = false;
                            if (ns) {
                                v = this.attributes[a];
                                if (typeof v != 'function') {
                                    node['@' + a] = this.attributes[a];
                                }
                            }
                            else {
                                if (a.indexOf('xmlns') != 0) {
                                    node['@' + a.split(':').pop().replace(/(\.|\-)+/g, '')] = this.attributes[a];
                                }
                            }
                        }
                        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                            var child = _a[_i];
                            empty = false;
                            var childObject = child, childName = 'value';
                            if ((child instanceof XmlNode)) {
                                childName = child.name;
                                if (!ns) {
                                    childName = childName.split(':').pop();
                                    childName = childName.replace(/(\.|\-)+/g, '');
                                }
                                childObject = child.asObject(ns);
                            }
                            if (!node[childName]) {
                                node[childName] = childObject;
                            }
                            else if (Array.isArray(node[childName])) {
                                node[childName].push(childObject);
                            }
                            else {
                                node[childName] = [node[childName], childObject];
                            }
                        }
                        return empty ? undefined : node;
                    }
                };
                return XmlNode;
            })();
            exports_1("XmlNode", XmlNode);
            XmlBuffer = (function () {
                function XmlBuffer() {
                    this.buffer = new Buffer(CS.BS);
                    this.pos = 0;
                }
                XmlBuffer.prototype.append = function (value) {
                    if (this.pos == this.buffer.length) {
                        var buf = new Buffer(this.buffer.length * 2);
                        this.buffer.copy(buf);
                        this.buffer = buf;
                    }
                    this.buffer.writeUInt8(value, this.pos);
                    this.pos++;
                };
                XmlBuffer.prototype.appendBuffer = function (value) {
                    if (value.length) {
                        var len = this.buffer.length;
                        while (len - this.pos < value.length) {
                            len *= 2;
                        }
                        if (len != this.buffer.length) {
                            var buf = new Buffer(len);
                            this.buffer.copy(buf);
                            this.buffer = buf;
                        }
                        value.copy(this.buffer, this.pos);
                        this.pos += value.length;
                    }
                };
                XmlBuffer.prototype.toString = function (enc) {
                    return this.buffer.slice(0, this.pos).toString((enc ? enc : ''));
                };
                XmlBuffer.prototype.toBuffer = function () {
                    var ret = new Buffer(this.pos);
                    this.buffer.copy(ret);
                    return ret;
                };
                return XmlBuffer;
            })();
            exports_1("XmlBuffer", XmlBuffer);
            XmlParser = (function () {
                function XmlParser() {
                    this.stackUp();
                    this.str = new XmlBuffer();
                    this.value = new XmlBuffer();
                    this.line = 0;
                    this.col = 0;
                }
                XmlParser.prototype.stackUp = function () {
                    var st = {};
                    st.state = CS.XS.EAT_SPACES;
                    st.savedstate = CS.XS.START;
                    st.prev = this.stack;
                    if (st.prev) {
                        st.prev.next = st;
                    }
                    this.stack = st;
                };
                XmlParser.prototype.stackDown = function () {
                    if (this.stack) {
                        this.stack = this.stack.prev;
                        if (this.stack) {
                            delete this.stack.next;
                        }
                    }
                };
                XmlParser.prototype.parseBuffer = function (buffer, len, handler) {
                    var i = 0;
                    var c = buffer[i];
                    while (true) {
                        switch (this.stack.state) {
                            case CS.XS.EAT_SPACES:
                                {
                                    if (!CS.isSpace(c)) {
                                        this.stack.state = this.stack.savedstate;
                                        continue;
                                    }
                                }
                                break;
                            case CS.XS.START: {
                                if (c == CS.CH.LESS) {
                                    this.stack.state = CS.XS.ELEMENT;
                                    break;
                                }
                                else {
                                    return false;
                                }
                            }
                            case CS.XS.ELEMENT:
                                switch (c) {
                                    case CS.CH.QUES:
                                        this.stack.savedstate = CS.XS.START;
                                        this.stack.state = CS.XS.EAT_SPACES;
                                        this.stackUp();
                                        this.str.pos = 0;
                                        this.stack.state = CS.XS.ELEMENT_PI;
                                        this.stack.clazz = CS.XC.PROCESS_INST;
                                        break;
                                    case CS.CH.EXCL:
                                        this.position = 0;
                                        this.stack.savedstate = CS.XS.START;
                                        this.stack.state = CS.XS.ELEMENT_COMMENT;
                                        this.stack.clazz = CS.XC.COMMENT;
                                        break;
                                    default:
                                        if (CS.isAlpha(c)) {
                                            this.str.pos = 0;
                                            this.stack.state = CS.XS.ELEMENT_NAME;
                                            this.stack.clazz = CS.XC.ELEMENT;
                                            continue;
                                        }
                                        else {
                                            return false;
                                        }
                                }
                                break;
                            case CS.XS.ELEMENT_PI:
                                if (CS.isAlphaNum(c)) {
                                    this.str.append(c);
                                    break;
                                }
                                else {
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    if (this.str == CS.ST.XML) {
                                        this.stack.savedstate = CS.XS.ATTRIBUTES;
                                    }
                                    else {
                                        this.value.pos = 0;
                                        this.stack.savedstate = CS.XS.ELEMENT_DATA_PI;
                                    }
                                    continue;
                                }
                            case CS.XS.ELEMENT_DATA_PI:
                                if (c == CS.CH.QUES) {
                                    this.stack.state = CS.XS.CLOSE_ELEMENT_PI;
                                }
                                else {
                                    this.value.append(c);
                                }
                                break;
                            case CS.XS.CLOSE_ELEMENT_PI:
                                if (c != CS.CH.GREA) {
                                    return false;
                                }
                                this.stackDown();
                                break;
                            case CS.XS.ELEMENT_NAME:
                                if (CS.isAlphaNum(c)) {
                                    this.str.append(c);
                                }
                                else {
                                    this.stack.name = this.str.toBuffer();
                                    if (!handler.process(CS.XT.OPEN, this.str.toString())) {
                                        return false;
                                    }
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    this.stack.savedstate = CS.XS.ATTRIBUTES;
                                    continue;
                                }
                                break;
                            case CS.XS.CHILD_NODES:
                                if (c == CS.CH.LESS) {
                                    this.stack.state = CS.XS.TRY_CLOSE_ELEMENT;
                                    break;
                                }
                                else {
                                    this.value.pos = 0;
                                    this.stack.state = CS.XS.ELEMENT_STRING;
                                    this.stack.clazz = CS.XC.STRING;
                                    continue;
                                }
                            case CS.XS.CLOSE_EMPTY_ELEMENT:
                                if (c == CS.CH.GREA) {
                                    if (!handler.process(CS.XT.CLOSE)) {
                                        return false;
                                    }
                                    if (!this.stack.prev) {
                                        return true;
                                    }
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    this.stack.savedstate = CS.XS.END;
                                    break;
                                }
                                else {
                                    return false;
                                }
                            case CS.XS.TRY_CLOSE_ELEMENT:
                                switch (c) {
                                    case CS.CH.SLAH:
                                        this.stack.state = CS.XS.CLOSE_ELEMENT_NAME;
                                        this.position = 0;
                                        this.str.pos = 0;
                                        this.str.appendBuffer(this.stack.name);
                                        break;
                                    case CS.CH.EXCL:
                                        this.position = 0;
                                        this.stack.savedstate = CS.XS.CHILD_NODES;
                                        this.stack.state = CS.XS.ELEMENT_COMMENT;
                                        this.stack.clazz = CS.XC.COMMENT;
                                        break;
                                    case CS.CH.QUES:
                                        this.stack.savedstate = CS.XS.CHILD_NODES;
                                        this.stack.state = CS.XS.EAT_SPACES;
                                        this.stackUp();
                                        this.str.pos = 0;
                                        this.stack.state = CS.XS.ELEMENT_PI;
                                        this.stack.clazz = CS.XC.PROCESS_INST;
                                        break;
                                    default:
                                        this.stack.state = CS.XS.CHILD_NODES;
                                        this.stackUp();
                                        if (CS.isAlpha(c)) {
                                            this.str.pos = 0;
                                            this.stack.state = CS.XS.ELEMENT_NAME;
                                            this.stack.clazz = CS.XC.ELEMENT;
                                            continue;
                                        }
                                        else {
                                            return false;
                                        }
                                }
                                break;
                            case CS.XS.CLOSE_ELEMENT_NAME:
                                if (this.str.pos == this.position) {
                                    this.stack.savedstate = CS.XS.CLOSE_EMPTY_ELEMENT;
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    continue;
                                }
                                else {
                                    if (c != this.str.buffer[this.position]) {
                                        return false;
                                    }
                                    this.position++;
                                }
                                break;
                            case CS.XS.ATTRIBUTES:
                                switch (c) {
                                    case CS.CH.QUES:
                                        if (this.stack.clazz != CS.XC.PROCESS_INST) {
                                            return false;
                                        }
                                        this.stack.state = CS.XS.CLOSE_ELEMENT_PI;
                                        break;
                                    case CS.CH.SLAH:
                                        this.stack.state = CS.XS.CLOSE_EMPTY_ELEMENT;
                                        break;
                                    case CS.CH.GREA:
                                        this.stack.state = CS.XS.EAT_SPACES;
                                        this.stack.savedstate = CS.XS.CHILD_NODES;
                                        break;
                                    default:
                                        if (CS.isAlpha(c)) {
                                            this.str.pos = 0;
                                            this.str.append(c);
                                            this.stack.state = CS.XS.ATTRIBUTE_NAME;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                }
                                break;
                            case CS.XS.ATTRIBUTE_NAME:
                                if (CS.isAlphaNum(c)) {
                                    this.str.append(c);
                                    break;
                                }
                                else {
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    this.stack.savedstate = CS.XS.EQUAL;
                                    continue;
                                }
                            case CS.XS.EQUAL:
                                if (c != CS.CH.EQUA) {
                                    return false;
                                }
                                this.stack.state = CS.XS.EAT_SPACES;
                                this.stack.savedstate = CS.XS.ATTRIBUTE_VALUE;
                                this.value.pos = 0;
                                this.position = 0;
                                delete this.quote;
                                break;
                            case CS.XS.ATTRIBUTE_VALUE:
                                if (this.quote) {
                                    if (c == this.quote) {
                                        if (this.stack.clazz != CS.XC.PROCESS_INST) {
                                            handler.process(CS.XT.ATTRIBUTE, this.str.toString(), this.value.toString(this.encoding));
                                        }
                                        else if (this.str == CS.ST.ENC) {
                                            this.encoding = this.value.toString();
                                        }
                                        this.stack.savedstate = CS.XS.ATTRIBUTES;
                                        this.stack.state = CS.XS.EAT_SPACES;
                                    }
                                    else {
                                        switch (c) {
                                            case CS.CH.AMPE:
                                                this.stack.state = CS.XS.ESCAPE;
                                                this.stack.savedstate = CS.XS.ATTRIBUTE_VALUE;
                                                break;
                                            default:
                                                this.value.append(c);
                                        }
                                    }
                                }
                                else {
                                    if (c == CS.CH.SINQ || c == CS.CH.DBLQ) {
                                        this.quote = c;
                                        this.position++;
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                break;
                            case CS.XS.ELEMENT_STRING:
                                switch (c) {
                                    case CS.CH.LESS:
                                        if (!handler.process(CS.XT.TEXT, this.value.toString(this.encoding))) {
                                            return false;
                                        }
                                        this.stack.state = CS.XS.TRY_CLOSE_ELEMENT;
                                        break;
                                    case CS.CH.AMPE:
                                        this.stack.state = CS.XS.ESCAPE;
                                        this.stack.savedstate = CS.XS.ELEMENT_STRING;
                                        break;
                                    default:
                                        this.value.append(c);
                                }
                                break;
                            case CS.XS.ELEMENT_COMMENT:
                                switch (this.position) {
                                    case 0:
                                        switch (c) {
                                            case CS.CH.MINU:
                                                this.position++;
                                                break;
                                            case CS.CH.LEBR:
                                                this.value.pos = 0;
                                                this.position = 0;
                                                this.stack.state = CS.XS.ELEMENT_CDATA;
                                                this.stack.clazz = CS.XC.CDATA;
                                                break;
                                            default:
                                                this.stack.state = CS.XS.DOCTYPE;
                                        }
                                        break;
                                    case 1:
                                        if (c != CS.CH.MINU) {
                                            return false;
                                        }
                                        this.str.pos = 0;
                                        this.position++;
                                        break;
                                    default:
                                        if (c !== CS.CH.MINU) {
                                            this.str.append(c);
                                        }
                                        else {
                                            this.position = 0;
                                            this.stack.state = CS.XS.CLOSE_ELEMENT_COMMENT;
                                        }
                                }
                                break;
                            case CS.XS.CLOSE_ELEMENT_COMMENT:
                                switch (this.position) {
                                    case 0:
                                        if (c != CS.CH.MINU) {
                                            this.position = 2;
                                            this.stack.state = CS.XS.ELEMENT_COMMENT;
                                        }
                                        else {
                                            this.position++;
                                        }
                                        break;
                                    case 1:
                                        if (c != CS.CH.GREA) {
                                            return false;
                                        }
                                        handler.process(CS.XT.COMMENT, this.str.toString(this.encoding));
                                        this.stack.state = CS.XS.EAT_SPACES;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.DOCTYPE:
                                // todo: parse elements ...
                                if (c == CS.CH.GREA) {
                                    this.stack.state = CS.XS.EAT_SPACES;
                                    if (this.stack.prev) {
                                        this.stack.savedstate = CS.XS.CHILD_NODES;
                                    }
                                    else {
                                        this.stack.savedstate = CS.XS.START;
                                    }
                                }
                                break;
                            case CS.XS.ELEMENT_CDATA:
                                switch (this.position) {
                                    case 0:
                                        if (c == CS.CH.C) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    case 1:
                                        if (c == CS.CH.D) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    case 2:
                                        if (c == CS.CH.A) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    case 3:
                                        if (c == CS.CH.T) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    case 4:
                                        if (c == CS.CH.A) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    case 5:
                                        if (c == CS.CH.LEBR) {
                                            this.position++;
                                            break;
                                        }
                                        else {
                                            return false;
                                        }
                                    default:
                                        if (c == CS.CH.RIBR) {
                                            this.position = 0;
                                            this.stack.state = CS.XS.CLOSE_ELEMENT_CDATA;
                                        }
                                        else {
                                            this.value.append(c);
                                        }
                                }
                                break;
                            case CS.XS.CLOSE_ELEMENT_CDATA:
                                switch (this.position) {
                                    case 0:
                                        if (c == CS.CH.RIBR) {
                                            this.position++;
                                        }
                                        else {
                                            this.value.append(CS.CH.RIBR);
                                            this.value.append(c);
                                            this.position = 6;
                                            this.stack.state = CS.XS.ELEMENT_CDATA;
                                        }
                                        break;
                                    case 1:
                                        switch (c) {
                                            case CS.CH.GREA:
                                                if (!handler.process(CS.XT.CDATA, this.value.toString(this.encoding))) {
                                                    return false;
                                                }
                                                this.stack.state = CS.XS.EAT_SPACES;
                                                this.stack.savedstate = CS.XS.CHILD_NODES;
                                                break;
                                            case CS.CH.RIBR:
                                                this.value.append(c);
                                                break;
                                        }
                                        break;
                                    default:
                                        this.value.append(c);
                                        this.stack.state = CS.XS.ELEMENT_CDATA;
                                }
                                break;
                            case CS.XS.ESCAPE:
                                this.position = 0;
                                switch (c) {
                                    case CS.CH.l:
                                        this.stack.state = CS.XS.ESCAPE_LT;
                                        break;
                                    case CS.CH.g:
                                        this.stack.state = CS.XS.ESCAPE_GT;
                                        break;
                                    case CS.CH.a:
                                        this.stack.state = CS.XS.ESCAPE_AMP;
                                        break;
                                    case CS.CH.q:
                                        this.stack.state = CS.XS.ESCAPE_QUOT;
                                        break;
                                    case CS.CH.SHRP:
                                        this.stack.state = CS.XS.ESCAPE_CHAR;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.ESCAPE_LT:
                                switch (this.position) {
                                    case 0:
                                        if (c != CS.CH.t) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 1:
                                        if (c != CS.CH.SCOL) {
                                            return false;
                                        }
                                        this.value.append(CS.CH.LESS);
                                        this.stack.state = this.stack.savedstate;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.ESCAPE_GT:
                                switch (this.position) {
                                    case 0:
                                        if (c != CS.CH.t) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 1:
                                        if (c != CS.CH.SCOL) {
                                            return false;
                                        }
                                        this.value.append(CS.CH.GREA);
                                        this.stack.state = this.stack.savedstate;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.ESCAPE_AMP:
                                switch (this.position) {
                                    case 0:
                                        switch (c) {
                                            case CS.CH.m:
                                                this.position++;
                                                break;
                                            case CS.CH.p:
                                                this.stack.state = CS.XS.ESCAPE_APOS;
                                                this.position++;
                                                break;
                                            default:
                                                return false;
                                        }
                                        break;
                                    case 1:
                                        if (c != CS.CH.p) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 2:
                                        if (c != CS.CH.SCOL) {
                                            return false;
                                        }
                                        this.value.append(CS.CH.AMPE);
                                        this.stack.state = this.stack.savedstate;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.ESCAPE_APOS:
                                switch (this.position) {
                                    case 0:
                                        switch (c) {
                                            case CS.CH.p:
                                                this.position++;
                                                break;
                                            case CS.CH.m:
                                                this.stack.state = CS.XS.ESCAPE_AMP;
                                                this.position++;
                                                break;
                                            default:
                                                return false;
                                        }
                                        break;
                                    case 1:
                                        if (c != CS.CH.o) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 2:
                                        if (c != CS.CH.s) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 3:
                                        if (c != CS.CH.SCOL) {
                                            return false;
                                        }
                                        this.value.append(CS.CH.SINQ);
                                        this.stack.state = this.stack.savedstate;
                                        break;
                                }
                                break;
                            case CS.XS.ESCAPE_QUOT:
                                switch (this.position) {
                                    case 0:
                                        if (c != CS.CH.u) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 1:
                                        if (c != CS.CH.o) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 2:
                                        if (c != CS.CH.t) {
                                            return false;
                                        }
                                        this.position++;
                                        break;
                                    case 3:
                                        if (c != CS.CH.SCOL) {
                                            return false;
                                        }
                                        this.value.append(CS.CH.DBLQ);
                                        this.stack.state = this.stack.savedstate;
                                        break;
                                    default:
                                        return false;
                                }
                                break;
                            case CS.XS.ESCAPE_CHAR:
                                if (CS.isNum(c)) {
                                    this.position = c - CS.CH.ZERO;
                                    this.stack.state = CS.XS.ESCAPE_CH_NUM;
                                }
                                else if (c == CS.CH.x) {
                                    this.stack.state = CS.XS.ESCAPE_CH_HEX;
                                }
                                else {
                                    return false;
                                }
                                break;
                            case CS.XS.ESCAPE_CH_NUM:
                                if (CS.isNum(c)) {
                                    this.position = (this.position * 10) + (c - CS.CH.ZERO);
                                }
                                else if (c == CS.CH.SCOL) {
                                    this.value.append(this.position);
                                    this.stack.state = this.stack.savedstate;
                                }
                                else {
                                    return false;
                                }
                                break;
                            case CS.XS.ESCAPE_CH_HEX:
                                if (CS.isHex(c)) {
                                    this.position = (this.position * 16) + CS.hexDigit(c);
                                }
                                else if (c == CS.CH.SCOL) {
                                    this.value.append(this.position);
                                    this.stack.state = this.stack.savedstate;
                                }
                                else {
                                    return false;
                                }
                                break;
                            case CS.XS.END:
                                this.stackDown();
                                continue;
                            default:
                                return false;
                        }
                        i++;
                        if (i >= len)
                            break;
                        c = buffer[i];
                        if (c !== CS.CH.LF) {
                            this.col++;
                        }
                        else {
                            this.col = 0;
                            this.line++;
                        }
                    }
                };
                XmlParser.prototype.parseString = function (str, handler) {
                    var buf = new Buffer(str);
                    this.parseBuffer(buf, buf.length, handler);
                };
                return XmlParser;
            })();
            exports_1("XmlParser", XmlParser);
            XmlStream = (function () {
                function XmlStream(stream) {
                    var _this = this;
                    this.parser = new XmlParser();
                    if (stream) {
                        this.stream = stream;
                        this.stream.on('data', function (chunk) {
                            _this.stream.pause();
                            _this.write(chunk);
                            _this.flush()
                                .then(function () {
                                _this.stream.resume();
                            })
                                .catch(function () {
                                _this.stream.close();
                            });
                        });
                        this.stream.on('error', function (error) {
                            _this.error(error);
                        });
                        this.stream.on('end', function (chunk) {
                            if (chunk) {
                                _this.write(chunk);
                                _this.flush()
                                    .then(function () {
                                    _this.end();
                                })
                                    .catch(function () {
                                    _this.stream.close();
                                });
                            }
                            else {
                                _this.end();
                            }
                        });
                    }
                }
                XmlStream.prototype.process = function (state, p1, p2) {
                };
                XmlStream.prototype.error = function (er) {
                    console.info(er);
                    this.stream.close();
                };
                XmlStream.prototype.flush = function () {
                    return Promise.resolve();
                };
                XmlStream.prototype.write = function (buffer) {
                    if (buffer && buffer.length > 0) {
                        if (typeof buffer === 'string') {
                            buffer = new Buffer(buffer);
                        }
                        var ret = this.parser.parseBuffer(buffer, buffer.length, this);
                        if (ret === false) {
                            throw new Error("parsing error at line: " + this.parser.line + ", col: " + this.parser.col + ' ' + buffer.toString());
                        }
                    }
                    return this;
                };
                XmlStream.prototype.end = function (buffer) {
                    if (buffer) {
                        this.write(buffer);
                    }
                    return this;
                };
                XmlStream.ELEMENT_OPEN = CS.XT.OPEN;
                XmlStream.ELEMENT_CLOSE = CS.XT.CLOSE;
                XmlStream.ATTRIBUTE = CS.XT.ATTRIBUTE;
                XmlStream.TEXT = CS.XT.TEXT;
                XmlStream.CDATA = CS.XT.CDATA;
                return XmlStream;
            })();
            exports_1("XmlStream", XmlStream);
            XmlBuilder = (function (_super) {
                __extends(XmlBuilder, _super);
                function XmlBuilder(stream) {
                    _super.call(this, stream);
                    this.node = null;
                    this.stack = [];
                }
                XmlBuilder.prototype.process = function (state, p1, p2) {
                    var node, parent, stack = this.stack;
                    switch (state) {
                        case XmlStream.ELEMENT_OPEN:
                            node = Xml.node(p1);
                            stack.push(node);
                            break;
                        case XmlStream.ELEMENT_CLOSE:
                            node = stack.pop();
                            if (stack.length) {
                                parent = stack[stack.length - 1];
                                parent.child(node);
                            }
                            break;
                        case XmlStream.ATTRIBUTE:
                            parent = stack[stack.length - 1];
                            parent.attribute(p1, p2);
                            break;
                        case XmlStream.TEXT:
                        case XmlStream.CDATA:
                            parent = stack[stack.length - 1];
                            parent.child(p1);
                            break;
                    }
                    this.node = node;
                    return true;
                };
                XmlBuilder.prototype.end = function (buffer) {
                    return _super.prototype.end.call(this, buffer);
                };
                return XmlBuilder;
            })(XmlStream);
            exports_1("XmlBuilder", XmlBuilder);
            Xml = (function () {
                function Xml() {
                }
                Xml.node = function (name, attributes, children) {
                    if (attributes === void 0) { attributes = {}; }
                    if (children === void 0) { children = []; }
                    return new XmlNode(name, attributes, children);
                };
                Xml.parse = function (buffer) {
                    var builder = new XmlBuilder();
                    var end = builder.end();
                    return new XmlBuilder().end(buffer).node;
                };
                return Xml;
            })();
            exports_1("Xml", Xml);
        }
    }
});
//# sourceMappingURL=xml.js.map