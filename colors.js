System.register([], function(exports_1) {
    var Color, Paint;
    return {
        setters:[],
        execute: function() {
            (function (Color) {
                Color[Color["RED"] = 31] = "RED";
                Color[Color["RED_FG"] = 41] = "RED_FG";
                Color[Color["GREEN"] = 32] = "GREEN";
                Color[Color["GREEN_FG"] = 42] = "GREEN_FG";
                Color[Color["YELLOW"] = 33] = "YELLOW";
                Color[Color["YELLOW_FG"] = 43] = "YELLOW_FG";
                Color[Color["BLUE"] = 34] = "BLUE";
                Color[Color["BLUE_FG"] = 44] = "BLUE_FG";
                Color[Color["MAGENTA"] = 35] = "MAGENTA";
                Color[Color["MAGENTA_FG"] = 45] = "MAGENTA_FG";
                Color[Color["CYAN"] = 36] = "CYAN";
                Color[Color["CYAN_FG"] = 46] = "CYAN_FG";
                Color[Color["LGRAY"] = 37] = "LGRAY";
                Color[Color["LGRAY_FG"] = 47] = "LGRAY_FG";
                Color[Color["GRAY"] = 90] = "GRAY";
                Color[Color["GRAY_FG"] = 100] = "GRAY_FG";
            })(Color || (Color = {}));
            exports_1("Color", Color);
            Paint = (function () {
                function Paint() {
                }
                Paint.bold = function (text) {
                    return "\033[1m" + text + "\033[0m";
                };
                Paint.dim = function (text) {
                    return "\033[2m" + text + "\033[0m";
                };
                Paint.underline = function (text) {
                    return "\033[4m" + text + "\033[0m";
                };
                Paint.color = function (text, color) {
                    return "\033[" + color + "m" + text + "\033[0m";
                };
                Paint.red = function (text, bg) {
                    return this.color(text, !bg ? Color.RED : Color.RED_FG);
                };
                Paint.green = function (text, bg) {
                    return this.color(text, !bg ? Color.GREEN : Color.GREEN_FG);
                };
                Paint.yellow = function (text, bg) {
                    return this.color(text, !bg ? Color.YELLOW : Color.YELLOW_FG);
                };
                Paint.blue = function (text, bg) {
                    return this.color(text, !bg ? Color.BLUE : Color.BLUE_FG);
                };
                Paint.magenta = function (text, bg) {
                    return this.color(text, !bg ? Color.MAGENTA : Color.MAGENTA_FG);
                };
                Paint.cyan = function (text, bg) {
                    return this.color(text, !bg ? Color.CYAN : Color.CYAN_FG);
                };
                Paint.gray = function (text, bg) {
                    return this.color(text, !bg ? Color.GRAY : Color.GRAY_FG);
                };
                return Paint;
            })();
            exports_1("Paint", Paint);
        }
    }
});
//# sourceMappingURL=colors.js.map