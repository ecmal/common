export declare class XmlNode {
    private _;
    constructor(name: String, attributes: Object, children: any[]);
    name: any;
    attributes: any;
    children: any;
    value: any;
    isSimple: boolean;
    hasAttributes: boolean;
    hasChildren: boolean;
    child(child: any): any;
    childs(childs: any): this;
    getByName(name: any): any;
    findByName(name: any): any[];
    findById(id: any): any;
    attribute(name: any, value: any): any;
    inspect(): any;
    toJSON(): any;
    toString(): string;
    asString(l?: number, h?: boolean): string;
    asObject(ns?: boolean): any;
}
export declare class XmlBuffer {
    buffer: Buffer;
    pos: any;
    constructor();
    append(value: any): void;
    appendBuffer(value: any): void;
    toString(enc?: any): string;
    toBuffer(): Buffer;
}
export declare class XmlParser {
    col: any;
    line: any;
    private str;
    private value;
    private stack;
    private position;
    private quote;
    private encoding;
    constructor();
    stackUp(): void;
    stackDown(): void;
    parseBuffer(buffer: any, len: any, handler: any): boolean;
    parseString(str: any, handler: any): void;
}
export declare class XmlStream {
    static ELEMENT_OPEN: number;
    static ELEMENT_CLOSE: number;
    static ATTRIBUTE: number;
    static TEXT: number;
    static CDATA: number;
    private parser;
    private stream;
    constructor(stream: any);
    process(state: any, p1: any, p2: any): void;
    error(er: any): void;
    flush(): Promise<void>;
    write(buffer: any): this;
    end(buffer?: any): this;
}
export declare class XmlBuilder extends XmlStream {
    private stack;
    node: any;
    constructor(stream?: any);
    process(state: any, p1: any, p2: any): boolean;
    end(buffer?: any): any;
}
export declare class Xml {
    static node(name: String, attributes?: Object, children?: any[]): XmlNode;
    static parse(buffer: any): any;
}
