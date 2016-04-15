System.register([], function(exports_1) {
    var Definition, Member;
    function decorate(args, fn) {
        var def;
        switch (typeof args[0]) {
            case 'function':
            case 'object':
                def = Definition.for(args[0], args[1], args[2]);
                break;
        }
        return def ? fn(def, args[0], args[1], args[2]) : function (target, key, desc) {
            fn.apply(void 0, [def = Definition.for(target, key, desc), target, key, desc].concat(args));
        };
    }
    exports_1("decorate", decorate);
    function Cached() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return decorate(args, function (def, target, key, desc, enumerable, writable, configurable) {
            if (enumerable === void 0) { enumerable = false; }
            if (writable === void 0) { writable = false; }
            if (configurable === void 0) { configurable = true; }
            if (def instanceof Member) {
                var getter = desc.get;
                desc.get = function () {
                    try {
                        return Object.defineProperty(this, key, {
                            enumerable: enumerable, writable: writable, configurable: configurable,
                            value: getter.call(this)
                        })[key];
                    }
                    catch (ex) {
                        return Object.defineProperty(this, key, {
                            configurable: true,
                            writable: true,
                            value: undefined
                        })[key];
                    }
                };
                return desc;
            }
        });
    }
    exports_1("Cached", Cached);
    return {
        setters:[],
        execute: function() {
            Definition = Reflect.Definition;
            Member = Reflect.Member;
        }
    }
});
//# sourceMappingURL=decorators.js.map