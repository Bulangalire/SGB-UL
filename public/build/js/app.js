(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/app"],{

/***/ "./assets/js/Chart.bundle.min.js":
/*!***************************************!*\
  !*** ./assets/js/Chart.bundle.min.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.2
 *
 * Copyright 2016 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function t(e, i, a) {
  function s(n, r) {
    if (!i[n]) {
      if (!e[n]) {
        var h = "function" == typeof require && require;
        if (!r && h) return require(n, !0);
        if (o) return o(n, !0);
        var l = new Error("Cannot find module '" + n + "'");
        throw l.code = "MODULE_NOT_FOUND", l;
      }

      var c = i[n] = {
        exports: {}
      };
      e[n][0].call(c.exports, function (t) {
        var i = e[n][1][t];
        return s(i ? i : t);
      }, c, c.exports, t, e, i, a);
    }

    return i[n].exports;
  }

  for (var o = "function" == typeof require && require, n = 0; n < a.length; n++) {
    s(a[n]);
  }

  return s;
}({
  1: [function (t, e, i) {
    function a(t) {
      var e,
          i,
          a,
          s = t[0] / 255,
          o = t[1] / 255,
          n = t[2] / 255,
          r = Math.min(s, o, n),
          h = Math.max(s, o, n),
          l = h - r;
      return h == r ? e = 0 : s == h ? e = (o - n) / l : o == h ? e = 2 + (n - s) / l : n == h && (e = 4 + (s - o) / l), e = Math.min(60 * e, 360), 0 > e && (e += 360), a = (r + h) / 2, i = h == r ? 0 : .5 >= a ? l / (h + r) : l / (2 - h - r), [e, 100 * i, 100 * a];
    }

    function s(t) {
      var e,
          i,
          a,
          s = t[0],
          o = t[1],
          n = t[2],
          r = Math.min(s, o, n),
          h = Math.max(s, o, n),
          l = h - r;
      return i = 0 == h ? 0 : l / h * 1e3 / 10, h == r ? e = 0 : s == h ? e = (o - n) / l : o == h ? e = 2 + (n - s) / l : n == h && (e = 4 + (s - o) / l), e = Math.min(60 * e, 360), 0 > e && (e += 360), a = h / 255 * 1e3 / 10, [e, i, a];
    }

    function o(t) {
      var e = t[0],
          i = t[1],
          s = t[2],
          o = a(t)[0],
          n = 1 / 255 * Math.min(e, Math.min(i, s)),
          s = 1 - 1 / 255 * Math.max(e, Math.max(i, s));
      return [o, 100 * n, 100 * s];
    }

    function n(t) {
      var e,
          i,
          a,
          s,
          o = t[0] / 255,
          n = t[1] / 255,
          r = t[2] / 255;
      return s = Math.min(1 - o, 1 - n, 1 - r), e = (1 - o - s) / (1 - s) || 0, i = (1 - n - s) / (1 - s) || 0, a = (1 - r - s) / (1 - s) || 0, [100 * e, 100 * i, 100 * a, 100 * s];
    }

    function h(t) {
      return X[JSON.stringify(t)];
    }

    function l(t) {
      var e = t[0] / 255,
          i = t[1] / 255,
          a = t[2] / 255;
      e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92, a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92;
      var s = .4124 * e + .3576 * i + .1805 * a,
          o = .2126 * e + .7152 * i + .0722 * a,
          n = .0193 * e + .1192 * i + .9505 * a;
      return [100 * s, 100 * o, 100 * n];
    }

    function c(t) {
      var e,
          i,
          a,
          s = l(t),
          o = s[0],
          n = s[1],
          r = s[2];
      return o /= 95.047, n /= 100, r /= 108.883, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, e = 116 * n - 16, i = 500 * (o - n), a = 200 * (n - r), [e, i, a];
    }

    function d(t) {
      return z(c(t));
    }

    function u(t) {
      var e,
          i,
          a,
          s,
          o,
          n = t[0] / 360,
          r = t[1] / 100,
          h = t[2] / 100;
      if (0 == r) return o = 255 * h, [o, o, o];
      i = .5 > h ? h * (1 + r) : h + r - h * r, e = 2 * h - i, s = [0, 0, 0];

      for (var l = 0; 3 > l; l++) {
        a = n + 1 / 3 * -(l - 1), 0 > a && a++, a > 1 && a--, o = 1 > 6 * a ? e + 6 * (i - e) * a : 1 > 2 * a ? i : 2 > 3 * a ? e + (i - e) * (2 / 3 - a) * 6 : e, s[l] = 255 * o;
      }

      return s;
    }

    function f(t) {
      var e,
          i,
          a = t[0],
          s = t[1] / 100,
          o = t[2] / 100;
      return 0 === o ? [0, 0, 0] : (o *= 2, s *= 1 >= o ? o : 2 - o, i = (o + s) / 2, e = 2 * s / (o + s), [a, 100 * e, 100 * i]);
    }

    function m(t) {
      return o(u(t));
    }

    function p(t) {
      return n(u(t));
    }

    function v(t) {
      return h(u(t));
    }

    function x(t) {
      var e = t[0] / 60,
          i = t[1] / 100,
          a = t[2] / 100,
          s = Math.floor(e) % 6,
          o = e - Math.floor(e),
          n = 255 * a * (1 - i),
          r = 255 * a * (1 - i * o),
          h = 255 * a * (1 - i * (1 - o)),
          a = 255 * a;

      switch (s) {
        case 0:
          return [a, h, n];

        case 1:
          return [r, a, n];

        case 2:
          return [n, a, h];

        case 3:
          return [n, r, a];

        case 4:
          return [h, n, a];

        case 5:
          return [a, n, r];
      }
    }

    function y(t) {
      var e,
          i,
          a = t[0],
          s = t[1] / 100,
          o = t[2] / 100;
      return i = (2 - s) * o, e = s * o, e /= 1 >= i ? i : 2 - i, e = e || 0, i /= 2, [a, 100 * e, 100 * i];
    }

    function k(t) {
      return o(x(t));
    }

    function _(t) {
      return n(x(t));
    }

    function S(t) {
      return h(x(t));
    }

    function D(t) {
      var e,
          i,
          a,
          s,
          o = t[0] / 360,
          n = t[1] / 100,
          h = t[2] / 100,
          l = n + h;

      switch (l > 1 && (n /= l, h /= l), e = Math.floor(6 * o), i = 1 - h, a = 6 * o - e, 0 != (1 & e) && (a = 1 - a), s = n + a * (i - n), e) {
        default:
        case 6:
        case 0:
          r = i, g = s, b = n;
          break;

        case 1:
          r = s, g = i, b = n;
          break;

        case 2:
          r = n, g = i, b = s;
          break;

        case 3:
          r = n, g = s, b = i;
          break;

        case 4:
          r = s, g = n, b = i;
          break;

        case 5:
          r = i, g = n, b = s;
      }

      return [255 * r, 255 * g, 255 * b];
    }

    function w(t) {
      return a(D(t));
    }

    function M(t) {
      return s(D(t));
    }

    function C(t) {
      return n(D(t));
    }

    function A(t) {
      return h(D(t));
    }

    function I(t) {
      var e,
          i,
          a,
          s = t[0] / 100,
          o = t[1] / 100,
          n = t[2] / 100,
          r = t[3] / 100;
      return e = 1 - Math.min(1, s * (1 - r) + r), i = 1 - Math.min(1, o * (1 - r) + r), a = 1 - Math.min(1, n * (1 - r) + r), [255 * e, 255 * i, 255 * a];
    }

    function T(t) {
      return a(I(t));
    }

    function F(t) {
      return s(I(t));
    }

    function P(t) {
      return o(I(t));
    }

    function O(t) {
      return h(I(t));
    }

    function V(t) {
      var e,
          i,
          a,
          s = t[0] / 100,
          o = t[1] / 100,
          n = t[2] / 100;
      return e = 3.2406 * s + -1.5372 * o + n * -.4986, i = s * -.9689 + 1.8758 * o + .0415 * n, a = .0557 * s + o * -.204 + 1.057 * n, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e = 12.92 * e, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i = 12.92 * i, a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a = 12.92 * a, e = Math.min(Math.max(0, e), 1), i = Math.min(Math.max(0, i), 1), a = Math.min(Math.max(0, a), 1), [255 * e, 255 * i, 255 * a];
    }

    function W(t) {
      var e,
          i,
          a,
          s = t[0],
          o = t[1],
          n = t[2];
      return s /= 95.047, o /= 100, n /= 108.883, s = s > .008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, e = 116 * o - 16, i = 500 * (s - o), a = 200 * (o - n), [e, i, a];
    }

    function L(t) {
      return z(W(t));
    }

    function R(t) {
      var e,
          i,
          a,
          s,
          o = t[0],
          n = t[1],
          r = t[2];
      return 8 >= o ? (i = 100 * o / 903.3, s = 7.787 * (i / 100) + 16 / 116) : (i = 100 * Math.pow((o + 16) / 116, 3), s = Math.pow(i / 100, 1 / 3)), e = .008856 >= e / 95.047 ? e = 95.047 * (n / 500 + s - 16 / 116) / 7.787 : 95.047 * Math.pow(n / 500 + s, 3), a = .008859 >= a / 108.883 ? a = 108.883 * (s - r / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(s - r / 200, 3), [e, i, a];
    }

    function z(t) {
      var e,
          i,
          a,
          s = t[0],
          o = t[1],
          n = t[2];
      return e = Math.atan2(n, o), i = 360 * e / 2 / Math.PI, 0 > i && (i += 360), a = Math.sqrt(o * o + n * n), [s, a, i];
    }

    function B(t) {
      return V(R(t));
    }

    function Y(t) {
      var e,
          i,
          a,
          s = t[0],
          o = t[1],
          n = t[2];
      return a = n / 360 * 2 * Math.PI, e = o * Math.cos(a), i = o * Math.sin(a), [s, e, i];
    }

    function H(t) {
      return R(Y(t));
    }

    function N(t) {
      return B(Y(t));
    }

    function E(t) {
      return J[t];
    }

    function U(t) {
      return a(E(t));
    }

    function j(t) {
      return s(E(t));
    }

    function G(t) {
      return o(E(t));
    }

    function q(t) {
      return n(E(t));
    }

    function Z(t) {
      return c(E(t));
    }

    function Q(t) {
      return l(E(t));
    }

    e.exports = {
      rgb2hsl: a,
      rgb2hsv: s,
      rgb2hwb: o,
      rgb2cmyk: n,
      rgb2keyword: h,
      rgb2xyz: l,
      rgb2lab: c,
      rgb2lch: d,
      hsl2rgb: u,
      hsl2hsv: f,
      hsl2hwb: m,
      hsl2cmyk: p,
      hsl2keyword: v,
      hsv2rgb: x,
      hsv2hsl: y,
      hsv2hwb: k,
      hsv2cmyk: _,
      hsv2keyword: S,
      hwb2rgb: D,
      hwb2hsl: w,
      hwb2hsv: M,
      hwb2cmyk: C,
      hwb2keyword: A,
      cmyk2rgb: I,
      cmyk2hsl: T,
      cmyk2hsv: F,
      cmyk2hwb: P,
      cmyk2keyword: O,
      keyword2rgb: E,
      keyword2hsl: U,
      keyword2hsv: j,
      keyword2hwb: G,
      keyword2cmyk: q,
      keyword2lab: Z,
      keyword2xyz: Q,
      xyz2rgb: V,
      xyz2lab: W,
      xyz2lch: L,
      lab2xyz: R,
      lab2rgb: B,
      lab2lch: z,
      lch2lab: Y,
      lch2xyz: H,
      lch2rgb: N
    };
    var J = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50]
    },
        X = {};

    for (var $ in J) {
      X[JSON.stringify(J[$])] = $;
    }
  }, {}],
  2: [function (t, e, i) {
    var a = t("./conversions"),
        s = function s() {
      return new l();
    };

    for (var o in a) {
      s[o + "Raw"] = function (t) {
        return function (e) {
          return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), a[t](e);
        };
      }(o);

      var n = /(\w+)2(\w+)/.exec(o),
          r = n[1],
          h = n[2];
      s[r] = s[r] || {}, s[r][h] = s[o] = function (t) {
        return function (e) {
          "number" == typeof e && (e = Array.prototype.slice.call(arguments));
          var i = a[t](e);
          if ("string" == typeof i || void 0 === i) return i;

          for (var s = 0; s < i.length; s++) {
            i[s] = Math.round(i[s]);
          }

          return i;
        };
      }(o);
    }

    var l = function l() {
      this.convs = {};
    };

    l.prototype.routeSpace = function (t, e) {
      var i = e[0];
      return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i));
    }, l.prototype.setValues = function (t, e) {
      return this.space = t, this.convs = {}, this.convs[t] = e, this;
    }, l.prototype.getValues = function (t) {
      var e = this.convs[t];

      if (!e) {
        var i = this.space,
            a = this.convs[i];
        e = s[i][t](a), this.convs[t] = e;
      }

      return e;
    }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (t) {
      l.prototype[t] = function (e) {
        return this.routeSpace(t, arguments);
      };
    }), e.exports = s;
  }, {
    "./conversions": 1
  }],
  3: [function (t, e, i) {
    function a(t) {
      if (t) {
        var e = /^#([a-fA-F0-9]{3})$/,
            i = /^#([a-fA-F0-9]{6})$/,
            a = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            s = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            o = /(\w+)/,
            n = [0, 0, 0],
            r = 1,
            h = t.match(e);

        if (h) {
          h = h[1];

          for (var l = 0; l < n.length; l++) {
            n[l] = parseInt(h[l] + h[l], 16);
          }
        } else if (h = t.match(i)) {
          h = h[1];

          for (var l = 0; l < n.length; l++) {
            n[l] = parseInt(h.slice(2 * l, 2 * l + 2), 16);
          }
        } else if (h = t.match(a)) {
          for (var l = 0; l < n.length; l++) {
            n[l] = parseInt(h[l + 1]);
          }

          r = parseFloat(h[4]);
        } else if (h = t.match(s)) {
          for (var l = 0; l < n.length; l++) {
            n[l] = Math.round(2.55 * parseFloat(h[l + 1]));
          }

          r = parseFloat(h[4]);
        } else if (h = t.match(o)) {
          if ("transparent" == h[1]) return [0, 0, 0, 0];
          if (n = y[h[1]], !n) return;
        }

        for (var l = 0; l < n.length; l++) {
          n[l] = v(n[l], 0, 255);
        }

        return r = r || 0 == r ? v(r, 0, 1) : 1, n[3] = r, n;
      }
    }

    function s(t) {
      if (t) {
        var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
            i = t.match(e);

        if (i) {
          var a = parseFloat(i[4]),
              s = v(parseInt(i[1]), 0, 360),
              o = v(parseFloat(i[2]), 0, 100),
              n = v(parseFloat(i[3]), 0, 100),
              r = v(isNaN(a) ? 1 : a, 0, 1);
          return [s, o, n, r];
        }
      }
    }

    function o(t) {
      if (t) {
        var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
            i = t.match(e);

        if (i) {
          var a = parseFloat(i[4]),
              s = v(parseInt(i[1]), 0, 360),
              o = v(parseFloat(i[2]), 0, 100),
              n = v(parseFloat(i[3]), 0, 100),
              r = v(isNaN(a) ? 1 : a, 0, 1);
          return [s, o, n, r];
        }
      }
    }

    function n(t) {
      var e = a(t);
      return e && e.slice(0, 3);
    }

    function r(t) {
      var e = s(t);
      return e && e.slice(0, 3);
    }

    function h(t) {
      var e = a(t);
      return e ? e[3] : (e = s(t)) ? e[3] : (e = o(t)) ? e[3] : void 0;
    }

    function l(t) {
      return "#" + x(t[0]) + x(t[1]) + x(t[2]);
    }

    function c(t, e) {
      return 1 > e || t[3] && t[3] < 1 ? d(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
    }

    function d(t, e) {
      return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")";
    }

    function u(t, e) {
      if (1 > e || t[3] && t[3] < 1) return f(t, e);
      var i = Math.round(t[0] / 255 * 100),
          a = Math.round(t[1] / 255 * 100),
          s = Math.round(t[2] / 255 * 100);
      return "rgb(" + i + "%, " + a + "%, " + s + "%)";
    }

    function f(t, e) {
      var i = Math.round(t[0] / 255 * 100),
          a = Math.round(t[1] / 255 * 100),
          s = Math.round(t[2] / 255 * 100);
      return "rgba(" + i + "%, " + a + "%, " + s + "%, " + (e || t[3] || 1) + ")";
    }

    function g(t, e) {
      return 1 > e || t[3] && t[3] < 1 ? m(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
    }

    function m(t, e) {
      return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")";
    }

    function p(t, e) {
      return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")";
    }

    function b(t) {
      return k[t.slice(0, 3)];
    }

    function v(t, e, i) {
      return Math.min(Math.max(e, t), i);
    }

    function x(t) {
      var e = t.toString(16).toUpperCase();
      return e.length < 2 ? "0" + e : e;
    }

    var y = t("color-name");
    e.exports = {
      getRgba: a,
      getHsla: s,
      getRgb: n,
      getHsl: r,
      getHwb: o,
      getAlpha: h,
      hexString: l,
      rgbString: c,
      rgbaString: d,
      percentString: u,
      percentaString: f,
      hslString: g,
      hslaString: m,
      hwbString: p,
      keyword: b
    };
    var k = {};

    for (var _ in y) {
      k[y[_]] = _;
    }
  }, {
    "color-name": 4
  }],
  4: [function (t, e, i) {
    e.exports = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50]
    };
  }, {}],
  5: [function (t, e, i) {
    var a = t("color-convert"),
        s = t("color-string"),
        o = function o(t) {
      if (t instanceof o) return t;
      if (!(this instanceof o)) return new o(t);

      if (this.values = {
        rgb: [0, 0, 0],
        hsl: [0, 0, 0],
        hsv: [0, 0, 0],
        hwb: [0, 0, 0],
        cmyk: [0, 0, 0, 0],
        alpha: 1
      }, "string" == typeof t) {
        var e = s.getRgba(t);
        if (e) this.setValues("rgb", e);else if (e = s.getHsla(t)) this.setValues("hsl", e);else {
          if (!(e = s.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
          this.setValues("hwb", e);
        }
      } else if ("object" == _typeof(t)) {
        var e = t;
        if (void 0 !== e.r || void 0 !== e.red) this.setValues("rgb", e);else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);else {
          if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));
          this.setValues("cmyk", e);
        }
      }
    };

    o.prototype = {
      rgb: function rgb(t) {
        return this.setSpace("rgb", arguments);
      },
      hsl: function hsl(t) {
        return this.setSpace("hsl", arguments);
      },
      hsv: function hsv(t) {
        return this.setSpace("hsv", arguments);
      },
      hwb: function hwb(t) {
        return this.setSpace("hwb", arguments);
      },
      cmyk: function cmyk(t) {
        return this.setSpace("cmyk", arguments);
      },
      rgbArray: function rgbArray() {
        return this.values.rgb;
      },
      hslArray: function hslArray() {
        return this.values.hsl;
      },
      hsvArray: function hsvArray() {
        return this.values.hsv;
      },
      hwbArray: function hwbArray() {
        return 1 !== this.values.alpha ? this.values.hwb.concat([this.values.alpha]) : this.values.hwb;
      },
      cmykArray: function cmykArray() {
        return this.values.cmyk;
      },
      rgbaArray: function rgbaArray() {
        var t = this.values.rgb;
        return t.concat([this.values.alpha]);
      },
      hslaArray: function hslaArray() {
        var t = this.values.hsl;
        return t.concat([this.values.alpha]);
      },
      alpha: function alpha(t) {
        return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this);
      },
      red: function red(t) {
        return this.setChannel("rgb", 0, t);
      },
      green: function green(t) {
        return this.setChannel("rgb", 1, t);
      },
      blue: function blue(t) {
        return this.setChannel("rgb", 2, t);
      },
      hue: function hue(t) {
        return this.setChannel("hsl", 0, t);
      },
      saturation: function saturation(t) {
        return this.setChannel("hsl", 1, t);
      },
      lightness: function lightness(t) {
        return this.setChannel("hsl", 2, t);
      },
      saturationv: function saturationv(t) {
        return this.setChannel("hsv", 1, t);
      },
      whiteness: function whiteness(t) {
        return this.setChannel("hwb", 1, t);
      },
      blackness: function blackness(t) {
        return this.setChannel("hwb", 2, t);
      },
      value: function value(t) {
        return this.setChannel("hsv", 2, t);
      },
      cyan: function cyan(t) {
        return this.setChannel("cmyk", 0, t);
      },
      magenta: function magenta(t) {
        return this.setChannel("cmyk", 1, t);
      },
      yellow: function yellow(t) {
        return this.setChannel("cmyk", 2, t);
      },
      black: function black(t) {
        return this.setChannel("cmyk", 3, t);
      },
      hexString: function hexString() {
        return s.hexString(this.values.rgb);
      },
      rgbString: function rgbString() {
        return s.rgbString(this.values.rgb, this.values.alpha);
      },
      rgbaString: function rgbaString() {
        return s.rgbaString(this.values.rgb, this.values.alpha);
      },
      percentString: function percentString() {
        return s.percentString(this.values.rgb, this.values.alpha);
      },
      hslString: function hslString() {
        return s.hslString(this.values.hsl, this.values.alpha);
      },
      hslaString: function hslaString() {
        return s.hslaString(this.values.hsl, this.values.alpha);
      },
      hwbString: function hwbString() {
        return s.hwbString(this.values.hwb, this.values.alpha);
      },
      keyword: function keyword() {
        return s.keyword(this.values.rgb, this.values.alpha);
      },
      rgbNumber: function rgbNumber() {
        return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2];
      },
      luminosity: function luminosity() {
        for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
          var a = t[i] / 255;
          e[i] = .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4);
        }

        return .2126 * e[0] + .7152 * e[1] + .0722 * e[2];
      },
      contrast: function contrast(t) {
        var e = this.luminosity(),
            i = t.luminosity();
        return e > i ? (e + .05) / (i + .05) : (i + .05) / (e + .05);
      },
      level: function level(t) {
        var e = this.contrast(t);
        return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : "";
      },
      dark: function dark() {
        var t = this.values.rgb,
            e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;
        return 128 > e;
      },
      light: function light() {
        return !this.dark();
      },
      negate: function negate() {
        for (var t = [], e = 0; 3 > e; e++) {
          t[e] = 255 - this.values.rgb[e];
        }

        return this.setValues("rgb", t), this;
      },
      lighten: function lighten(t) {
        return this.values.hsl[2] += this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this;
      },
      darken: function darken(t) {
        return this.values.hsl[2] -= this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this;
      },
      saturate: function saturate(t) {
        return this.values.hsl[1] += this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this;
      },
      desaturate: function desaturate(t) {
        return this.values.hsl[1] -= this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this;
      },
      whiten: function whiten(t) {
        return this.values.hwb[1] += this.values.hwb[1] * t, this.setValues("hwb", this.values.hwb), this;
      },
      blacken: function blacken(t) {
        return this.values.hwb[2] += this.values.hwb[2] * t, this.setValues("hwb", this.values.hwb), this;
      },
      greyscale: function greyscale() {
        var t = this.values.rgb,
            e = .3 * t[0] + .59 * t[1] + .11 * t[2];
        return this.setValues("rgb", [e, e, e]), this;
      },
      clearer: function clearer(t) {
        return this.setValues("alpha", this.values.alpha - this.values.alpha * t), this;
      },
      opaquer: function opaquer(t) {
        return this.setValues("alpha", this.values.alpha + this.values.alpha * t), this;
      },
      rotate: function rotate(t) {
        var e = this.values.hsl[0];
        return e = (e + t) % 360, e = 0 > e ? 360 + e : e, this.values.hsl[0] = e, this.setValues("hsl", this.values.hsl), this;
      },
      mix: function mix(t, e) {
        e = 1 - (null == e ? .5 : e);

        for (var i = 2 * e - 1, a = this.alpha() - t.alpha(), s = ((i * a == -1 ? i : (i + a) / (1 + i * a)) + 1) / 2, o = 1 - s, n = this.rgbArray(), r = t.rgbArray(), h = 0; h < n.length; h++) {
          n[h] = n[h] * s + r[h] * o;
        }

        this.setValues("rgb", n);
        var l = this.alpha() * e + t.alpha() * (1 - e);
        return this.setValues("alpha", l), this;
      },
      toJSON: function toJSON() {
        return this.rgb();
      },
      clone: function clone() {
        return new o(this.rgb());
      }
    }, o.prototype.getValues = function (t) {
      for (var e = {}, i = 0; i < t.length; i++) {
        e[t.charAt(i)] = this.values[t][i];
      }

      return 1 != this.values.alpha && (e.a = this.values.alpha), e;
    }, o.prototype.setValues = function (t, e) {
      var i = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"]
      },
          s = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
      },
          o = 1;
      if ("alpha" == t) o = e;else if (e.length) this.values[t] = e.slice(0, t.length), o = e[t.length];else if (void 0 !== e[t.charAt(0)]) {
        for (var n = 0; n < t.length; n++) {
          this.values[t][n] = e[t.charAt(n)];
        }

        o = e.a;
      } else if (void 0 !== e[i[t][0]]) {
        for (var r = i[t], n = 0; n < t.length; n++) {
          this.values[t][n] = e[r[n]];
        }

        o = e.alpha;
      }

      if (this.values.alpha = Math.max(0, Math.min(1, void 0 !== o ? o : this.values.alpha)), "alpha" != t) {
        for (var n = 0; n < t.length; n++) {
          var h = Math.max(0, Math.min(s[t][n], this.values[t][n]));
          this.values[t][n] = Math.round(h);
        }

        for (var l in i) {
          l != t && (this.values[l] = a[t][l](this.values[t]));

          for (var n = 0; n < l.length; n++) {
            var h = Math.max(0, Math.min(s[l][n], this.values[l][n]));
            this.values[l][n] = Math.round(h);
          }
        }

        return !0;
      }
    }, o.prototype.setSpace = function (t, e) {
      var i = e[0];
      return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this);
    }, o.prototype.setChannel = function (t, e, i) {
      return void 0 === i ? this.values[t][e] : (this.values[t][e] = i, this.setValues(t, this.values[t]), this);
    }, window.Color = e.exports = o;
  }, {
    "color-convert": 2,
    "color-string": 3
  }],
  6: [function (t, e, i) {
    //! moment.js
    //! version : 2.10.6
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    !function (t, a) {
      "object" == _typeof(i) && "undefined" != typeof e ? e.exports = a() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
    }(this, function () {
      "use strict";

      function i() {
        return Wi.apply(null, arguments);
      }

      function a(t) {
        Wi = t;
      }

      function s(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
      }

      function o(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
      }

      function n(t, e) {
        var i,
            a = [];

        for (i = 0; i < t.length; ++i) {
          a.push(e(t[i], i));
        }

        return a;
      }

      function r(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }

      function h(t, e) {
        for (var i in e) {
          r(e, i) && (t[i] = e[i]);
        }

        return r(e, "toString") && (t.toString = e.toString), r(e, "valueOf") && (t.valueOf = e.valueOf), t;
      }

      function l(t, e, i, a) {
        return Tt(t, e, i, a, !0).utc();
      }

      function c() {
        return {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1
        };
      }

      function d(t) {
        return null == t._pf && (t._pf = c()), t._pf;
      }

      function u(t) {
        if (null == t._isValid) {
          var e = d(t);
          t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour);
        }

        return t._isValid;
      }

      function f(t) {
        var e = l(NaN);
        return null != t ? h(d(e), t) : d(e).userInvalidated = !0, e;
      }

      function g(t, e) {
        var i, a, s;
        if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l), "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm), "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset), "undefined" != typeof e._pf && (t._pf = d(e)), "undefined" != typeof e._locale && (t._locale = e._locale), Ri.length > 0) for (i in Ri) {
          a = Ri[i], s = e[a], "undefined" != typeof s && (t[a] = s);
        }
        return t;
      }

      function m(t) {
        g(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), zi === !1 && (zi = !0, i.updateOffset(this), zi = !1);
      }

      function p(t) {
        return t instanceof m || null != t && null != t._isAMomentObject;
      }

      function b(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t);
      }

      function v(t) {
        var e = +t,
            i = 0;
        return 0 !== e && isFinite(e) && (i = b(e)), i;
      }

      function x(t, e, i) {
        var a,
            s = Math.min(t.length, e.length),
            o = Math.abs(t.length - e.length),
            n = 0;

        for (a = 0; s > a; a++) {
          (i && t[a] !== e[a] || !i && v(t[a]) !== v(e[a])) && n++;
        }

        return n + o;
      }

      function y() {}

      function k(t) {
        return t ? t.toLowerCase().replace("_", "-") : t;
      }

      function _(t) {
        for (var e, i, a, s, o = 0; o < t.length;) {
          for (s = k(t[o]).split("-"), e = s.length, i = k(t[o + 1]), i = i ? i.split("-") : null; e > 0;) {
            if (a = S(s.slice(0, e).join("-"))) return a;
            if (i && i.length >= e && x(s, i, !0) >= e - 1) break;
            e--;
          }

          o++;
        }

        return null;
      }

      function S(i) {
        var a = null;
        if (!Bi[i] && "undefined" != typeof e && e && e.exports) try {
          a = Li._abbr, t("./locale/" + i), D(a);
        } catch (s) {}
        return Bi[i];
      }

      function D(t, e) {
        var i;
        return t && (i = "undefined" == typeof e ? M(t) : w(t, e), i && (Li = i)), Li._abbr;
      }

      function w(t, e) {
        return null !== e ? (e.abbr = t, Bi[t] = Bi[t] || new y(), Bi[t].set(e), D(t), Bi[t]) : (delete Bi[t], null);
      }

      function M(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Li;

        if (!s(t)) {
          if (e = S(t)) return e;
          t = [t];
        }

        return _(t);
      }

      function C(t, e) {
        var i = t.toLowerCase();
        Yi[i] = Yi[i + "s"] = Yi[e] = t;
      }

      function A(t) {
        return "string" == typeof t ? Yi[t] || Yi[t.toLowerCase()] : void 0;
      }

      function I(t) {
        var e,
            i,
            a = {};

        for (i in t) {
          r(t, i) && (e = A(i), e && (a[e] = t[i]));
        }

        return a;
      }

      function T(t, e) {
        return function (a) {
          return null != a ? (P(this, t, a), i.updateOffset(this, e), this) : F(this, t);
        };
      }

      function F(t, e) {
        return t._d["get" + (t._isUTC ? "UTC" : "") + e]();
      }

      function P(t, e, i) {
        return t._d["set" + (t._isUTC ? "UTC" : "") + e](i);
      }

      function O(t, e) {
        var i;
        if ("object" == _typeof(t)) for (i in t) {
          this.set(i, t[i]);
        } else if (t = A(t), "function" == typeof this[t]) return this[t](e);
        return this;
      }

      function V(t, e, i) {
        var a = "" + Math.abs(t),
            s = e - a.length,
            o = t >= 0;
        return (o ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + a;
      }

      function W(t, e, i, a) {
        var s = a;
        "string" == typeof a && (s = function s() {
          return this[a]();
        }), t && (Ui[t] = s), e && (Ui[e[0]] = function () {
          return V(s.apply(this, arguments), e[1], e[2]);
        }), i && (Ui[i] = function () {
          return this.localeData().ordinal(s.apply(this, arguments), t);
        });
      }

      function L(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
      }

      function R(t) {
        var e,
            i,
            a = t.match(Hi);

        for (e = 0, i = a.length; i > e; e++) {
          Ui[a[e]] ? a[e] = Ui[a[e]] : a[e] = L(a[e]);
        }

        return function (s) {
          var o = "";

          for (e = 0; i > e; e++) {
            o += a[e] instanceof Function ? a[e].call(s, t) : a[e];
          }

          return o;
        };
      }

      function z(t, e) {
        return t.isValid() ? (e = B(e, t.localeData()), Ei[e] = Ei[e] || R(e), Ei[e](t)) : t.localeData().invalidDate();
      }

      function B(t, e) {
        function i(t) {
          return e.longDateFormat(t) || t;
        }

        var a = 5;

        for (Ni.lastIndex = 0; a >= 0 && Ni.test(t);) {
          t = t.replace(Ni, i), Ni.lastIndex = 0, a -= 1;
        }

        return t;
      }

      function Y(t) {
        return "function" == typeof t && "[object Function]" === Object.prototype.toString.call(t);
      }

      function H(t, e, i) {
        oa[t] = Y(e) ? e : function (t) {
          return t && i ? i : e;
        };
      }

      function N(t, e) {
        return r(oa, t) ? oa[t](e._strict, e._locale) : new RegExp(E(t));
      }

      function E(t) {
        return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, i, a, s) {
          return e || i || a || s;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }

      function U(t, e) {
        var i,
            a = e;

        for ("string" == typeof t && (t = [t]), "number" == typeof e && (a = function a(t, i) {
          i[e] = v(t);
        }), i = 0; i < t.length; i++) {
          na[t[i]] = a;
        }
      }

      function j(t, e) {
        U(t, function (t, i, a, s) {
          a._w = a._w || {}, e(t, a._w, a, s);
        });
      }

      function G(t, e, i) {
        null != e && r(na, t) && na[t](e, i._a, i, t);
      }

      function q(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
      }

      function Z(t) {
        return this._months[t.month()];
      }

      function Q(t) {
        return this._monthsShort[t.month()];
      }

      function J(t, e, i) {
        var a, s, o;

        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), a = 0; 12 > a; a++) {
          if (s = l([2e3, a]), i && !this._longMonthsParse[a] && (this._longMonthsParse[a] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[a] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), i || this._monthsParse[a] || (o = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[a] = new RegExp(o.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[a].test(t)) return a;
          if (i && "MMM" === e && this._shortMonthsParse[a].test(t)) return a;
          if (!i && this._monthsParse[a].test(t)) return a;
        }
      }

      function X(t, e) {
        var i;
        return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (i = Math.min(t.date(), q(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t);
      }

      function $(t) {
        return null != t ? (X(this, t), i.updateOffset(this, !0), this) : F(this, "Month");
      }

      function K() {
        return q(this.year(), this.month());
      }

      function tt(t) {
        var e,
            i = t._a;
        return i && -2 === d(t).overflow && (e = i[ha] < 0 || i[ha] > 11 ? ha : i[la] < 1 || i[la] > q(i[ra], i[ha]) ? la : i[ca] < 0 || i[ca] > 24 || 24 === i[ca] && (0 !== i[da] || 0 !== i[ua] || 0 !== i[fa]) ? ca : i[da] < 0 || i[da] > 59 ? da : i[ua] < 0 || i[ua] > 59 ? ua : i[fa] < 0 || i[fa] > 999 ? fa : -1, d(t)._overflowDayOfYear && (ra > e || e > la) && (e = la), d(t).overflow = e), t;
      }

      function et(t) {
        i.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t);
      }

      function it(t, e) {
        var i = !0;
        return h(function () {
          return i && (et(t + "\n" + new Error().stack), i = !1), e.apply(this, arguments);
        }, e);
      }

      function at(t, e) {
        pa[t] || (et(e), pa[t] = !0);
      }

      function st(t) {
        var e,
            i,
            a = t._i,
            s = ba.exec(a);

        if (s) {
          for (d(t).iso = !0, e = 0, i = va.length; i > e; e++) {
            if (va[e][1].exec(a)) {
              t._f = va[e][0];
              break;
            }
          }

          for (e = 0, i = xa.length; i > e; e++) {
            if (xa[e][1].exec(a)) {
              t._f += (s[6] || " ") + xa[e][0];
              break;
            }
          }

          a.match(ia) && (t._f += "Z"), St(t);
        } else t._isValid = !1;
      }

      function ot(t) {
        var e = ya.exec(t._i);
        return null !== e ? void (t._d = new Date(+e[1])) : (st(t), void (t._isValid === !1 && (delete t._isValid, i.createFromInputFallback(t))));
      }

      function nt(t, e, i, a, s, o, n) {
        var r = new Date(t, e, i, a, s, o, n);
        return 1970 > t && r.setFullYear(t), r;
      }

      function rt(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return 1970 > t && e.setUTCFullYear(t), e;
      }

      function ht(t) {
        return lt(t) ? 366 : 365;
      }

      function lt(t) {
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
      }

      function ct() {
        return lt(this.year());
      }

      function dt(t, e, i) {
        var a,
            s = i - e,
            o = i - t.day();
        return o > s && (o -= 7), s - 7 > o && (o += 7), a = Ft(t).add(o, "d"), {
          week: Math.ceil(a.dayOfYear() / 7),
          year: a.year()
        };
      }

      function ut(t) {
        return dt(t, this._week.dow, this._week.doy).week;
      }

      function ft() {
        return this._week.dow;
      }

      function gt() {
        return this._week.doy;
      }

      function mt(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d");
      }

      function pt(t) {
        var e = dt(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d");
      }

      function bt(t, e, i, a, s) {
        var o,
            n = 6 + s - a,
            r = rt(t, 0, 1 + n),
            h = r.getUTCDay();
        return s > h && (h += 7), i = null != i ? 1 * i : s, o = 1 + n + 7 * (e - 1) - h + i, {
          year: o > 0 ? t : t - 1,
          dayOfYear: o > 0 ? o : ht(t - 1) + o
        };
      }

      function vt(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d");
      }

      function xt(t, e, i) {
        return null != t ? t : null != e ? e : i;
      }

      function yt(t) {
        var e = new Date();
        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()];
      }

      function kt(t) {
        var e,
            i,
            a,
            s,
            o = [];

        if (!t._d) {
          for (a = yt(t), t._w && null == t._a[la] && null == t._a[ha] && _t(t), t._dayOfYear && (s = xt(t._a[ra], a[ra]), t._dayOfYear > ht(s) && (d(t)._overflowDayOfYear = !0), i = rt(s, 0, t._dayOfYear), t._a[ha] = i.getUTCMonth(), t._a[la] = i.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) {
            t._a[e] = o[e] = a[e];
          }

          for (; 7 > e; e++) {
            t._a[e] = o[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
          }

          24 === t._a[ca] && 0 === t._a[da] && 0 === t._a[ua] && 0 === t._a[fa] && (t._nextDay = !0, t._a[ca] = 0), t._d = (t._useUTC ? rt : nt).apply(null, o), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[ca] = 24);
        }
      }

      function _t(t) {
        var e, i, a, s, o, n, r;
        e = t._w, null != e.GG || null != e.W || null != e.E ? (o = 1, n = 4, i = xt(e.GG, t._a[ra], dt(Ft(), 1, 4).year), a = xt(e.W, 1), s = xt(e.E, 1)) : (o = t._locale._week.dow, n = t._locale._week.doy, i = xt(e.gg, t._a[ra], dt(Ft(), o, n).year), a = xt(e.w, 1), null != e.d ? (s = e.d, o > s && ++a) : s = null != e.e ? e.e + o : o), r = bt(i, a, s, n, o), t._a[ra] = r.year, t._dayOfYear = r.dayOfYear;
      }

      function St(t) {
        if (t._f === i.ISO_8601) return void st(t);
        t._a = [], d(t).empty = !0;
        var e,
            a,
            s,
            o,
            n,
            r = "" + t._i,
            h = r.length,
            l = 0;

        for (s = B(t._f, t._locale).match(Hi) || [], e = 0; e < s.length; e++) {
          o = s[e], a = (r.match(N(o, t)) || [])[0], a && (n = r.substr(0, r.indexOf(a)), n.length > 0 && d(t).unusedInput.push(n), r = r.slice(r.indexOf(a) + a.length), l += a.length), Ui[o] ? (a ? d(t).empty = !1 : d(t).unusedTokens.push(o), G(o, a, t)) : t._strict && !a && d(t).unusedTokens.push(o);
        }

        d(t).charsLeftOver = h - l, r.length > 0 && d(t).unusedInput.push(r), d(t).bigHour === !0 && t._a[ca] <= 12 && t._a[ca] > 0 && (d(t).bigHour = void 0), t._a[ca] = Dt(t._locale, t._a[ca], t._meridiem), kt(t), tt(t);
      }

      function Dt(t, e, i) {
        var a;
        return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (a = t.isPM(i), a && 12 > e && (e += 12), a || 12 !== e || (e = 0), e) : e;
      }

      function wt(t) {
        var e, i, a, s, o;
        if (0 === t._f.length) return d(t).invalidFormat = !0, void (t._d = new Date(NaN));

        for (s = 0; s < t._f.length; s++) {
          o = 0, e = g({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[s], St(e), u(e) && (o += d(e).charsLeftOver, o += 10 * d(e).unusedTokens.length, d(e).score = o, (null == a || a > o) && (a = o, i = e));
        }

        h(t, i || e);
      }

      function Mt(t) {
        if (!t._d) {
          var e = I(t._i);
          t._a = [e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], kt(t);
        }
      }

      function Ct(t) {
        var e = new m(tt(At(t)));
        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
      }

      function At(t) {
        var e = t._i,
            i = t._f;
        return t._locale = t._locale || M(t._l), null === e || void 0 === i && "" === e ? f({
          nullInput: !0
        }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), p(e) ? new m(tt(e)) : (s(i) ? wt(t) : i ? St(t) : o(e) ? t._d = e : It(t), t));
      }

      function It(t) {
        var e = t._i;
        void 0 === e ? t._d = new Date() : o(e) ? t._d = new Date(+e) : "string" == typeof e ? ot(t) : s(e) ? (t._a = n(e.slice(0), function (t) {
          return parseInt(t, 10);
        }), kt(t)) : "object" == _typeof(e) ? Mt(t) : "number" == typeof e ? t._d = new Date(e) : i.createFromInputFallback(t);
      }

      function Tt(t, e, i, a, s) {
        var o = {};
        return "boolean" == typeof i && (a = i, i = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = s, o._l = i, o._i = t, o._f = e, o._strict = a, Ct(o);
      }

      function Ft(t, e, i, a) {
        return Tt(t, e, i, a, !1);
      }

      function Pt(t, e) {
        var i, a;
        if (1 === e.length && s(e[0]) && (e = e[0]), !e.length) return Ft();

        for (i = e[0], a = 1; a < e.length; ++a) {
          (!e[a].isValid() || e[a][t](i)) && (i = e[a]);
        }

        return i;
      }

      function Ot() {
        var t = [].slice.call(arguments, 0);
        return Pt("isBefore", t);
      }

      function Vt() {
        var t = [].slice.call(arguments, 0);
        return Pt("isAfter", t);
      }

      function Wt(t) {
        var e = I(t),
            i = e.year || 0,
            a = e.quarter || 0,
            s = e.month || 0,
            o = e.week || 0,
            n = e.day || 0,
            r = e.hour || 0,
            h = e.minute || 0,
            l = e.second || 0,
            c = e.millisecond || 0;
        this._milliseconds = +c + 1e3 * l + 6e4 * h + 36e5 * r, this._days = +n + 7 * o, this._months = +s + 3 * a + 12 * i, this._data = {}, this._locale = M(), this._bubble();
      }

      function Lt(t) {
        return t instanceof Wt;
      }

      function Rt(t, e) {
        W(t, 0, 0, function () {
          var t = this.utcOffset(),
              i = "+";
          return 0 > t && (t = -t, i = "-"), i + V(~~(t / 60), 2) + e + V(~~t % 60, 2);
        });
      }

      function zt(t) {
        var e = (t || "").match(ia) || [],
            i = e[e.length - 1] || [],
            a = (i + "").match(wa) || ["-", 0, 0],
            s = +(60 * a[1]) + v(a[2]);
        return "+" === a[0] ? s : -s;
      }

      function Bt(t, e) {
        var a, s;
        return e._isUTC ? (a = e.clone(), s = (p(t) || o(t) ? +t : +Ft(t)) - +a, a._d.setTime(+a._d + s), i.updateOffset(a, !1), a) : Ft(t).local();
      }

      function Yt(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
      }

      function Ht(t, e) {
        var a,
            s = this._offset || 0;
        return null != t ? ("string" == typeof t && (t = zt(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && e && (a = Yt(this)), this._offset = t, this._isUTC = !0, null != a && this.add(a, "m"), s !== t && (!e || this._changeInProgress ? ae(this, $t(t - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, i.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? s : Yt(this);
      }

      function Nt(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
      }

      function Et(t) {
        return this.utcOffset(0, t);
      }

      function Ut(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Yt(this), "m")), this;
      }

      function jt() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(zt(this._i)), this;
      }

      function Gt(t) {
        return t = t ? Ft(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0;
      }

      function qt() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }

      function Zt() {
        if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
        var t = {};

        if (g(t, this), t = At(t), t._a) {
          var e = t._isUTC ? l(t._a) : Ft(t._a);
          this._isDSTShifted = this.isValid() && x(t._a, e.toArray()) > 0;
        } else this._isDSTShifted = !1;

        return this._isDSTShifted;
      }

      function Qt() {
        return !this._isUTC;
      }

      function Jt() {
        return this._isUTC;
      }

      function Xt() {
        return this._isUTC && 0 === this._offset;
      }

      function $t(t, e) {
        var i,
            a,
            s,
            o = t,
            n = null;
        return Lt(t) ? o = {
          ms: t._milliseconds,
          d: t._days,
          M: t._months
        } : "number" == typeof t ? (o = {}, e ? o[e] = t : o.milliseconds = t) : (n = Ma.exec(t)) ? (i = "-" === n[1] ? -1 : 1, o = {
          y: 0,
          d: v(n[la]) * i,
          h: v(n[ca]) * i,
          m: v(n[da]) * i,
          s: v(n[ua]) * i,
          ms: v(n[fa]) * i
        }) : (n = Ca.exec(t)) ? (i = "-" === n[1] ? -1 : 1, o = {
          y: Kt(n[2], i),
          M: Kt(n[3], i),
          d: Kt(n[4], i),
          h: Kt(n[5], i),
          m: Kt(n[6], i),
          s: Kt(n[7], i),
          w: Kt(n[8], i)
        }) : null == o ? o = {} : "object" == _typeof(o) && ("from" in o || "to" in o) && (s = ee(Ft(o.from), Ft(o.to)), o = {}, o.ms = s.milliseconds, o.M = s.months), a = new Wt(o), Lt(t) && r(t, "_locale") && (a._locale = t._locale), a;
      }

      function Kt(t, e) {
        var i = t && parseFloat(t.replace(",", "."));
        return (isNaN(i) ? 0 : i) * e;
      }

      function te(t, e) {
        var i = {
          milliseconds: 0,
          months: 0
        };
        return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i;
      }

      function ee(t, e) {
        var i;
        return e = Bt(e, t), t.isBefore(e) ? i = te(t, e) : (i = te(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i;
      }

      function ie(t, e) {
        return function (i, a) {
          var s, o;
          return null === a || isNaN(+a) || (at(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), o = i, i = a, a = o), i = "string" == typeof i ? +i : i, s = $t(i, a), ae(this, s, t), this;
        };
      }

      function ae(t, e, a, s) {
        var o = e._milliseconds,
            n = e._days,
            r = e._months;
        s = null == s ? !0 : s, o && t._d.setTime(+t._d + o * a), n && P(t, "Date", F(t, "Date") + n * a), r && X(t, F(t, "Month") + r * a), s && i.updateOffset(t, n || r);
      }

      function se(t, e) {
        var i = t || Ft(),
            a = Bt(i, this).startOf("day"),
            s = this.diff(a, "days", !0),
            o = -6 > s ? "sameElse" : -1 > s ? "lastWeek" : 0 > s ? "lastDay" : 1 > s ? "sameDay" : 2 > s ? "nextDay" : 7 > s ? "nextWeek" : "sameElse";
        return this.format(e && e[o] || this.localeData().calendar(o, this, Ft(i)));
      }

      function oe() {
        return new m(this);
      }

      function ne(t, e) {
        var i;
        return e = A("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ft(t), +this > +t) : (i = p(t) ? +t : +Ft(t), i < +this.clone().startOf(e));
      }

      function re(t, e) {
        var i;
        return e = A("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ft(t), +t > +this) : (i = p(t) ? +t : +Ft(t), +this.clone().endOf(e) < i);
      }

      function he(t, e, i) {
        return this.isAfter(t, i) && this.isBefore(e, i);
      }

      function le(t, e) {
        var i;
        return e = A(e || "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ft(t), +this === +t) : (i = +Ft(t), +this.clone().startOf(e) <= i && i <= +this.clone().endOf(e));
      }

      function ce(t, e, i) {
        var a,
            s,
            o = Bt(t, this),
            n = 6e4 * (o.utcOffset() - this.utcOffset());
        return e = A(e), "year" === e || "month" === e || "quarter" === e ? (s = de(this, o), "quarter" === e ? s /= 3 : "year" === e && (s /= 12)) : (a = this - o, s = "second" === e ? a / 1e3 : "minute" === e ? a / 6e4 : "hour" === e ? a / 36e5 : "day" === e ? (a - n) / 864e5 : "week" === e ? (a - n) / 6048e5 : a), i ? s : b(s);
      }

      function de(t, e) {
        var i,
            a,
            s = 12 * (e.year() - t.year()) + (e.month() - t.month()),
            o = t.clone().add(s, "months");
        return 0 > e - o ? (i = t.clone().add(s - 1, "months"), a = (e - o) / (o - i)) : (i = t.clone().add(s + 1, "months"), a = (e - o) / (i - o)), -(s + a);
      }

      function ue() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }

      function fe() {
        var t = this.clone().utc();
        return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : z(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }

      function ge(t) {
        var e = z(this, t || i.defaultFormat);
        return this.localeData().postformat(e);
      }

      function me(t, e) {
        return this.isValid() ? $t({
          to: this,
          from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
      }

      function pe(t) {
        return this.from(Ft(), t);
      }

      function be(t, e) {
        return this.isValid() ? $t({
          from: this,
          to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
      }

      function ve(t) {
        return this.to(Ft(), t);
      }

      function xe(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (e = M(t), null != e && (this._locale = e), this);
      }

      function ye() {
        return this._locale;
      }

      function ke(t) {
        switch (t = A(t)) {
          case "year":
            this.month(0);

          case "quarter":
          case "month":
            this.date(1);

          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);

          case "hour":
            this.minutes(0);

          case "minute":
            this.seconds(0);

          case "second":
            this.milliseconds(0);
        }

        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this;
      }

      function _e(t) {
        return t = A(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms");
      }

      function Se() {
        return +this._d - 6e4 * (this._offset || 0);
      }

      function De() {
        return Math.floor(+this / 1e3);
      }

      function we() {
        return this._offset ? new Date(+this) : this._d;
      }

      function Me() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()];
      }

      function Ce() {
        var t = this;
        return {
          years: t.year(),
          months: t.month(),
          date: t.date(),
          hours: t.hours(),
          minutes: t.minutes(),
          seconds: t.seconds(),
          milliseconds: t.milliseconds()
        };
      }

      function Ae() {
        return u(this);
      }

      function Ie() {
        return h({}, d(this));
      }

      function Te() {
        return d(this).overflow;
      }

      function Fe(t, e) {
        W(0, [t, t.length], 0, e);
      }

      function Pe(t, e, i) {
        return dt(Ft([t, 11, 31 + e - i]), e, i).week;
      }

      function Oe(t) {
        var e = dt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == t ? e : this.add(t - e, "y");
      }

      function Ve(t) {
        var e = dt(this, 1, 4).year;
        return null == t ? e : this.add(t - e, "y");
      }

      function We() {
        return Pe(this.year(), 1, 4);
      }

      function Le() {
        var t = this.localeData()._week;

        return Pe(this.year(), t.dow, t.doy);
      }

      function Re(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
      }

      function ze(t, e) {
        return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10);
      }

      function Be(t) {
        return this._weekdays[t.day()];
      }

      function Ye(t) {
        return this._weekdaysShort[t.day()];
      }

      function He(t) {
        return this._weekdaysMin[t.day()];
      }

      function Ne(t) {
        var e, i, a;

        for (this._weekdaysParse = this._weekdaysParse || [], e = 0; 7 > e; e++) {
          if (this._weekdaysParse[e] || (i = Ft([2e3, 1]).day(e), a = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[e] = new RegExp(a.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e;
        }
      }

      function Ee(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = ze(t, this.localeData()), this.add(t - e, "d")) : e;
      }

      function Ue(t) {
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d");
      }

      function je(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7);
      }

      function Ge(t, e) {
        W(t, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), e);
        });
      }

      function qe(t, e) {
        return e._meridiemParse;
      }

      function Ze(t) {
        return "p" === (t + "").toLowerCase().charAt(0);
      }

      function Qe(t, e, i) {
        return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM";
      }

      function Je(t, e) {
        e[fa] = v(1e3 * ("0." + t));
      }

      function Xe() {
        return this._isUTC ? "UTC" : "";
      }

      function $e() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }

      function Ke(t) {
        return Ft(1e3 * t);
      }

      function ti() {
        return Ft.apply(null, arguments).parseZone();
      }

      function ei(t, e, i) {
        var a = this._calendar[t];
        return "function" == typeof a ? a.call(e, i) : a;
      }

      function ii(t) {
        var e = this._longDateFormat[t],
            i = this._longDateFormat[t.toUpperCase()];

        return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function (t) {
          return t.slice(1);
        }), this._longDateFormat[t]);
      }

      function ai() {
        return this._invalidDate;
      }

      function si(t) {
        return this._ordinal.replace("%d", t);
      }

      function oi(t) {
        return t;
      }

      function ni(t, e, i, a) {
        var s = this._relativeTime[i];
        return "function" == typeof s ? s(t, e, i, a) : s.replace(/%d/i, t);
      }

      function ri(t, e) {
        var i = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof i ? i(e) : i.replace(/%s/i, e);
      }

      function hi(t) {
        var e, i;

        for (i in t) {
          e = t[i], "function" == typeof e ? this[i] = e : this["_" + i] = e;
        }

        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
      }

      function li(t, e, i, a) {
        var s = M(),
            o = l().set(a, e);
        return s[i](o, t);
      }

      function ci(t, e, i, a, s) {
        if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return li(t, e, i, s);
        var o,
            n = [];

        for (o = 0; a > o; o++) {
          n[o] = li(t, o, i, s);
        }

        return n;
      }

      function di(t, e) {
        return ci(t, e, "months", 12, "month");
      }

      function ui(t, e) {
        return ci(t, e, "monthsShort", 12, "month");
      }

      function fi(t, e) {
        return ci(t, e, "weekdays", 7, "day");
      }

      function gi(t, e) {
        return ci(t, e, "weekdaysShort", 7, "day");
      }

      function mi(t, e) {
        return ci(t, e, "weekdaysMin", 7, "day");
      }

      function pi() {
        var t = this._data;
        return this._milliseconds = Ja(this._milliseconds), this._days = Ja(this._days), this._months = Ja(this._months), t.milliseconds = Ja(t.milliseconds), t.seconds = Ja(t.seconds), t.minutes = Ja(t.minutes), t.hours = Ja(t.hours), t.months = Ja(t.months), t.years = Ja(t.years), this;
      }

      function bi(t, e, i, a) {
        var s = $t(e, i);
        return t._milliseconds += a * s._milliseconds, t._days += a * s._days, t._months += a * s._months, t._bubble();
      }

      function vi(t, e) {
        return bi(this, t, e, 1);
      }

      function xi(t, e) {
        return bi(this, t, e, -1);
      }

      function yi(t) {
        return 0 > t ? Math.floor(t) : Math.ceil(t);
      }

      function ki() {
        var t,
            e,
            i,
            a,
            s,
            o = this._milliseconds,
            n = this._days,
            r = this._months,
            h = this._data;
        return o >= 0 && n >= 0 && r >= 0 || 0 >= o && 0 >= n && 0 >= r || (o += 864e5 * yi(Si(r) + n), n = 0, r = 0), h.milliseconds = o % 1e3, t = b(o / 1e3), h.seconds = t % 60, e = b(t / 60), h.minutes = e % 60, i = b(e / 60), h.hours = i % 24, n += b(i / 24), s = b(_i(n)), r += s, n -= yi(Si(s)), a = b(r / 12), r %= 12, h.days = n, h.months = r, h.years = a, this;
      }

      function _i(t) {
        return 4800 * t / 146097;
      }

      function Si(t) {
        return 146097 * t / 4800;
      }

      function Di(t) {
        var e,
            i,
            a = this._milliseconds;
        if (t = A(t), "month" === t || "year" === t) return e = this._days + a / 864e5, i = this._months + _i(e), "month" === t ? i : i / 12;

        switch (e = this._days + Math.round(Si(this._months)), t) {
          case "week":
            return e / 7 + a / 6048e5;

          case "day":
            return e + a / 864e5;

          case "hour":
            return 24 * e + a / 36e5;

          case "minute":
            return 1440 * e + a / 6e4;

          case "second":
            return 86400 * e + a / 1e3;

          case "millisecond":
            return Math.floor(864e5 * e) + a;

          default:
            throw new Error("Unknown unit " + t);
        }
      }

      function wi() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12);
      }

      function Mi(t) {
        return function () {
          return this.as(t);
        };
      }

      function Ci(t) {
        return t = A(t), this[t + "s"]();
      }

      function Ai(t) {
        return function () {
          return this._data[t];
        };
      }

      function Ii() {
        return b(this.days() / 7);
      }

      function Ti(t, e, i, a, s) {
        return s.relativeTime(e || 1, !!i, t, a);
      }

      function Fi(t, e, i) {
        var a = $t(t).abs(),
            s = us(a.as("s")),
            o = us(a.as("m")),
            n = us(a.as("h")),
            r = us(a.as("d")),
            h = us(a.as("M")),
            l = us(a.as("y")),
            c = s < fs.s && ["s", s] || 1 === o && ["m"] || o < fs.m && ["mm", o] || 1 === n && ["h"] || n < fs.h && ["hh", n] || 1 === r && ["d"] || r < fs.d && ["dd", r] || 1 === h && ["M"] || h < fs.M && ["MM", h] || 1 === l && ["y"] || ["yy", l];
        return c[2] = e, c[3] = +t > 0, c[4] = i, Ti.apply(null, c);
      }

      function Pi(t, e) {
        return void 0 === fs[t] ? !1 : void 0 === e ? fs[t] : (fs[t] = e, !0);
      }

      function Oi(t) {
        var e = this.localeData(),
            i = Fi(this, !t, e);
        return t && (i = e.pastFuture(+this, i)), e.postformat(i);
      }

      function Vi() {
        var t,
            e,
            i,
            a = gs(this._milliseconds) / 1e3,
            s = gs(this._days),
            o = gs(this._months);
        t = b(a / 60), e = b(t / 60), a %= 60, t %= 60, i = b(o / 12), o %= 12;
        var n = i,
            r = o,
            h = s,
            l = e,
            c = t,
            d = a,
            u = this.asSeconds();
        return u ? (0 > u ? "-" : "") + "P" + (n ? n + "Y" : "") + (r ? r + "M" : "") + (h ? h + "D" : "") + (l || c || d ? "T" : "") + (l ? l + "H" : "") + (c ? c + "M" : "") + (d ? d + "S" : "") : "P0D";
      }

      var Wi,
          Li,
          Ri = i.momentProperties = [],
          zi = !1,
          Bi = {},
          Yi = {},
          Hi = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
          Ni = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
          Ei = {},
          Ui = {},
          ji = /\d/,
          Gi = /\d\d/,
          qi = /\d{3}/,
          Zi = /\d{4}/,
          Qi = /[+-]?\d{6}/,
          Ji = /\d\d?/,
          Xi = /\d{1,3}/,
          $i = /\d{1,4}/,
          Ki = /[+-]?\d{1,6}/,
          ta = /\d+/,
          ea = /[+-]?\d+/,
          ia = /Z|[+-]\d\d:?\d\d/gi,
          aa = /[+-]?\d+(\.\d{1,3})?/,
          sa = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
          oa = {},
          na = {},
          ra = 0,
          ha = 1,
          la = 2,
          ca = 3,
          da = 4,
          ua = 5,
          fa = 6;
      W("M", ["MM", 2], "Mo", function () {
        return this.month() + 1;
      }), W("MMM", 0, 0, function (t) {
        return this.localeData().monthsShort(this, t);
      }), W("MMMM", 0, 0, function (t) {
        return this.localeData().months(this, t);
      }), C("month", "M"), H("M", Ji), H("MM", Ji, Gi), H("MMM", sa), H("MMMM", sa), U(["M", "MM"], function (t, e) {
        e[ha] = v(t) - 1;
      }), U(["MMM", "MMMM"], function (t, e, i, a) {
        var s = i._locale.monthsParse(t, a, i._strict);

        null != s ? e[ha] = s : d(i).invalidMonth = t;
      });
      var ga = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
          ma = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
          pa = {};
      i.suppressDeprecationWarnings = !1;
      var ba = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          va = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]],
          xa = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]],
          ya = /^\/?Date\((\-?\d+)/i;
      i.createFromInputFallback = it("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
      }), W(0, ["YY", 2], 0, function () {
        return this.year() % 100;
      }), W(0, ["YYYY", 4], 0, "year"), W(0, ["YYYYY", 5], 0, "year"), W(0, ["YYYYYY", 6, !0], 0, "year"), C("year", "y"), H("Y", ea), H("YY", Ji, Gi), H("YYYY", $i, Zi), H("YYYYY", Ki, Qi), H("YYYYYY", Ki, Qi), U(["YYYYY", "YYYYYY"], ra), U("YYYY", function (t, e) {
        e[ra] = 2 === t.length ? i.parseTwoDigitYear(t) : v(t);
      }), U("YY", function (t, e) {
        e[ra] = i.parseTwoDigitYear(t);
      }), i.parseTwoDigitYear = function (t) {
        return v(t) + (v(t) > 68 ? 1900 : 2e3);
      };
      var ka = T("FullYear", !1);
      W("w", ["ww", 2], "wo", "week"), W("W", ["WW", 2], "Wo", "isoWeek"), C("week", "w"), C("isoWeek", "W"), H("w", Ji), H("ww", Ji, Gi), H("W", Ji), H("WW", Ji, Gi), j(["w", "ww", "W", "WW"], function (t, e, i, a) {
        e[a.substr(0, 1)] = v(t);
      });
      var _a = {
        dow: 0,
        doy: 6
      };
      W("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), C("dayOfYear", "DDD"), H("DDD", Xi), H("DDDD", qi), U(["DDD", "DDDD"], function (t, e, i) {
        i._dayOfYear = v(t);
      }), i.ISO_8601 = function () {};
      var Sa = it("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
        var t = Ft.apply(null, arguments);
        return this > t ? this : t;
      }),
          Da = it("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
        var t = Ft.apply(null, arguments);
        return t > this ? this : t;
      });
      Rt("Z", ":"), Rt("ZZ", ""), H("Z", ia), H("ZZ", ia), U(["Z", "ZZ"], function (t, e, i) {
        i._useUTC = !0, i._tzm = zt(t);
      });
      var wa = /([\+\-]|\d\d)/gi;

      i.updateOffset = function () {};

      var Ma = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
          Ca = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
      $t.fn = Wt.prototype;
      var Aa = ie(1, "add"),
          Ia = ie(-1, "subtract");
      i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      var Ta = it("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
        return void 0 === t ? this.localeData() : this.locale(t);
      });
      W(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100;
      }), W(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100;
      }), Fe("gggg", "weekYear"), Fe("ggggg", "weekYear"), Fe("GGGG", "isoWeekYear"), Fe("GGGGG", "isoWeekYear"), C("weekYear", "gg"), C("isoWeekYear", "GG"), H("G", ea), H("g", ea), H("GG", Ji, Gi), H("gg", Ji, Gi), H("GGGG", $i, Zi), H("gggg", $i, Zi), H("GGGGG", Ki, Qi), H("ggggg", Ki, Qi), j(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, a) {
        e[a.substr(0, 2)] = v(t);
      }), j(["gg", "GG"], function (t, e, a, s) {
        e[s] = i.parseTwoDigitYear(t);
      }), W("Q", 0, 0, "quarter"), C("quarter", "Q"), H("Q", ji), U("Q", function (t, e) {
        e[ha] = 3 * (v(t) - 1);
      }), W("D", ["DD", 2], "Do", "date"), C("date", "D"), H("D", Ji), H("DD", Ji, Gi), H("Do", function (t, e) {
        return t ? e._ordinalParse : e._ordinalParseLenient;
      }), U(["D", "DD"], la), U("Do", function (t, e) {
        e[la] = v(t.match(Ji)[0], 10);
      });
      var Fa = T("Date", !0);
      W("d", 0, "do", "day"), W("dd", 0, 0, function (t) {
        return this.localeData().weekdaysMin(this, t);
      }), W("ddd", 0, 0, function (t) {
        return this.localeData().weekdaysShort(this, t);
      }), W("dddd", 0, 0, function (t) {
        return this.localeData().weekdays(this, t);
      }), W("e", 0, 0, "weekday"), W("E", 0, 0, "isoWeekday"), C("day", "d"), C("weekday", "e"), C("isoWeekday", "E"), H("d", Ji), H("e", Ji), H("E", Ji), H("dd", sa), H("ddd", sa), H("dddd", sa), j(["dd", "ddd", "dddd"], function (t, e, i) {
        var a = i._locale.weekdaysParse(t);

        null != a ? e.d = a : d(i).invalidWeekday = t;
      }), j(["d", "e", "E"], function (t, e, i, a) {
        e[a] = v(t);
      });
      var Pa = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
          Oa = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
          Va = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
      W("H", ["HH", 2], 0, "hour"), W("h", ["hh", 2], 0, function () {
        return this.hours() % 12 || 12;
      }), Ge("a", !0), Ge("A", !1), C("hour", "h"), H("a", qe), H("A", qe), H("H", Ji), H("h", Ji), H("HH", Ji, Gi), H("hh", Ji, Gi), U(["H", "HH"], ca), U(["a", "A"], function (t, e, i) {
        i._isPm = i._locale.isPM(t), i._meridiem = t;
      }), U(["h", "hh"], function (t, e, i) {
        e[ca] = v(t), d(i).bigHour = !0;
      });
      var Wa = /[ap]\.?m?\.?/i,
          La = T("Hours", !0);
      W("m", ["mm", 2], 0, "minute"), C("minute", "m"), H("m", Ji), H("mm", Ji, Gi), U(["m", "mm"], da);
      var Ra = T("Minutes", !1);
      W("s", ["ss", 2], 0, "second"), C("second", "s"), H("s", Ji), H("ss", Ji, Gi), U(["s", "ss"], ua);
      var za = T("Seconds", !1);
      W("S", 0, 0, function () {
        return ~~(this.millisecond() / 100);
      }), W(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }), W(0, ["SSS", 3], 0, "millisecond"), W(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
      }), W(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
      }), W(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
      }), W(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
      }), W(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
      }), W(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
      }), C("millisecond", "ms"), H("S", Xi, ji), H("SS", Xi, Gi), H("SSS", Xi, qi);
      var Ba;

      for (Ba = "SSSS"; Ba.length <= 9; Ba += "S") {
        H(Ba, ta);
      }

      for (Ba = "S"; Ba.length <= 9; Ba += "S") {
        U(Ba, Je);
      }

      var Ya = T("Milliseconds", !1);
      W("z", 0, 0, "zoneAbbr"), W("zz", 0, 0, "zoneName");
      var Ha = m.prototype;
      Ha.add = Aa, Ha.calendar = se, Ha.clone = oe, Ha.diff = ce, Ha.endOf = _e, Ha.format = ge, Ha.from = me, Ha.fromNow = pe, Ha.to = be, Ha.toNow = ve, Ha.get = O, Ha.invalidAt = Te, Ha.isAfter = ne, Ha.isBefore = re, Ha.isBetween = he, Ha.isSame = le, Ha.isValid = Ae, Ha.lang = Ta, Ha.locale = xe, Ha.localeData = ye, Ha.max = Da, Ha.min = Sa, Ha.parsingFlags = Ie, Ha.set = O, Ha.startOf = ke, Ha.subtract = Ia, Ha.toArray = Me, Ha.toObject = Ce, Ha.toDate = we, Ha.toISOString = fe, Ha.toJSON = fe, Ha.toString = ue, Ha.unix = De, Ha.valueOf = Se, Ha.year = ka, Ha.isLeapYear = ct, Ha.weekYear = Oe, Ha.isoWeekYear = Ve, Ha.quarter = Ha.quarters = Re, Ha.month = $, Ha.daysInMonth = K, Ha.week = Ha.weeks = mt, Ha.isoWeek = Ha.isoWeeks = pt, Ha.weeksInYear = Le, Ha.isoWeeksInYear = We, Ha.date = Fa, Ha.day = Ha.days = Ee, Ha.weekday = Ue, Ha.isoWeekday = je, Ha.dayOfYear = vt, Ha.hour = Ha.hours = La, Ha.minute = Ha.minutes = Ra, Ha.second = Ha.seconds = za, Ha.millisecond = Ha.milliseconds = Ya, Ha.utcOffset = Ht, Ha.utc = Et, Ha.local = Ut, Ha.parseZone = jt, Ha.hasAlignedHourOffset = Gt, Ha.isDST = qt, Ha.isDSTShifted = Zt, Ha.isLocal = Qt, Ha.isUtcOffset = Jt, Ha.isUtc = Xt, Ha.isUTC = Xt, Ha.zoneAbbr = Xe, Ha.zoneName = $e, Ha.dates = it("dates accessor is deprecated. Use date instead.", Fa), Ha.months = it("months accessor is deprecated. Use month instead", $), Ha.years = it("years accessor is deprecated. Use year instead", ka), Ha.zone = it("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Nt);
      var Na = Ha,
          Ea = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      },
          Ua = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      },
          ja = "Invalid date",
          Ga = "%d",
          qa = /\d{1,2}/,
          Za = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
          Qa = y.prototype;
      Qa._calendar = Ea, Qa.calendar = ei, Qa._longDateFormat = Ua, Qa.longDateFormat = ii, Qa._invalidDate = ja, Qa.invalidDate = ai, Qa._ordinal = Ga, Qa.ordinal = si, Qa._ordinalParse = qa, Qa.preparse = oi, Qa.postformat = oi, Qa._relativeTime = Za, Qa.relativeTime = ni, Qa.pastFuture = ri, Qa.set = hi, Qa.months = Z, Qa._months = ga, Qa.monthsShort = Q, Qa._monthsShort = ma, Qa.monthsParse = J, Qa.week = ut, Qa._week = _a, Qa.firstDayOfYear = gt, Qa.firstDayOfWeek = ft, Qa.weekdays = Be, Qa._weekdays = Pa, Qa.weekdaysMin = He, Qa._weekdaysMin = Va, Qa.weekdaysShort = Ye, Qa._weekdaysShort = Oa, Qa.weekdaysParse = Ne, Qa.isPM = Ze, Qa._meridiemParse = Wa, Qa.meridiem = Qe, D("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function ordinal(t) {
          var e = t % 10,
              i = 1 === v(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
          return t + i;
        }
      }), i.lang = it("moment.lang is deprecated. Use moment.locale instead.", D), i.langData = it("moment.langData is deprecated. Use moment.localeData instead.", M);
      var Ja = Math.abs,
          Xa = Mi("ms"),
          $a = Mi("s"),
          Ka = Mi("m"),
          ts = Mi("h"),
          es = Mi("d"),
          is = Mi("w"),
          as = Mi("M"),
          ss = Mi("y"),
          os = Ai("milliseconds"),
          ns = Ai("seconds"),
          rs = Ai("minutes"),
          hs = Ai("hours"),
          ls = Ai("days"),
          cs = Ai("months"),
          ds = Ai("years"),
          us = Math.round,
          fs = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
      },
          gs = Math.abs,
          ms = Wt.prototype;
      ms.abs = pi, ms.add = vi, ms.subtract = xi, ms.as = Di, ms.asMilliseconds = Xa, ms.asSeconds = $a, ms.asMinutes = Ka, ms.asHours = ts, ms.asDays = es, ms.asWeeks = is, ms.asMonths = as, ms.asYears = ss, ms.valueOf = wi, ms._bubble = ki, ms.get = Ci, ms.milliseconds = os, ms.seconds = ns, ms.minutes = rs, ms.hours = hs, ms.days = ls, ms.weeks = Ii, ms.months = cs, ms.years = ds, ms.humanize = Oi, ms.toISOString = Vi, ms.toString = Vi, ms.toJSON = Vi, ms.locale = xe, ms.localeData = ye, ms.toIsoString = it("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Vi), ms.lang = Ta, W("X", 0, 0, "unix"), W("x", 0, 0, "valueOf"), H("x", ea), H("X", aa), U("X", function (t, e, i) {
        i._d = new Date(1e3 * parseFloat(t, 10));
      }), U("x", function (t, e, i) {
        i._d = new Date(v(t));
      }), i.version = "2.10.6", a(Ft), i.fn = Na, i.min = Ot, i.max = Vt, i.utc = l, i.unix = Ke, i.months = di, i.isDate = o, i.locale = D, i.invalid = f, i.duration = $t, i.isMoment = p, i.weekdays = fi, i.parseZone = ti, i.localeData = M, i.isDuration = Lt, i.monthsShort = ui, i.weekdaysMin = mi, i.defineLocale = w, i.weekdaysShort = gi, i.normalizeUnits = A, i.relativeTimeThreshold = Pi;
      var ps = i;
      return ps;
    });
  }, {}],
  7: [function (t, e, i) {
    var a = t("./core/core.js")();
    t("./core/core.helpers")(a), t("./core/core.element")(a), t("./core/core.animation")(a), t("./core/core.controller")(a), t("./core/core.datasetController")(a), t("./core/core.layoutService")(a), t("./core/core.legend")(a), t("./core/core.plugin.js")(a), t("./core/core.scale")(a), t("./core/core.scaleService")(a), t("./core/core.title")(a), t("./core/core.tooltip")(a), t("./controllers/controller.bar")(a), t("./controllers/controller.bubble")(a), t("./controllers/controller.doughnut")(a), t("./controllers/controller.line")(a), t("./controllers/controller.polarArea")(a), t("./controllers/controller.radar")(a), t("./scales/scale.category")(a), t("./scales/scale.linear")(a), t("./scales/scale.logarithmic")(a), t("./scales/scale.radialLinear")(a), t("./scales/scale.time")(a), t("./elements/element.arc")(a), t("./elements/element.line")(a), t("./elements/element.point")(a), t("./elements/element.rectangle")(a), t("./charts/Chart.Bar")(a), t("./charts/Chart.Bubble")(a), t("./charts/Chart.Doughnut")(a), t("./charts/Chart.Line")(a), t("./charts/Chart.PolarArea")(a), t("./charts/Chart.Radar")(a), t("./charts/Chart.Scatter")(a), window.Chart = e.exports = a;
  }, {
    "./charts/Chart.Bar": 8,
    "./charts/Chart.Bubble": 9,
    "./charts/Chart.Doughnut": 10,
    "./charts/Chart.Line": 11,
    "./charts/Chart.PolarArea": 12,
    "./charts/Chart.Radar": 13,
    "./charts/Chart.Scatter": 14,
    "./controllers/controller.bar": 15,
    "./controllers/controller.bubble": 16,
    "./controllers/controller.doughnut": 17,
    "./controllers/controller.line": 18,
    "./controllers/controller.polarArea": 19,
    "./controllers/controller.radar": 20,
    "./core/core.animation": 21,
    "./core/core.controller": 22,
    "./core/core.datasetController": 23,
    "./core/core.element": 24,
    "./core/core.helpers": 25,
    "./core/core.js": 26,
    "./core/core.layoutService": 27,
    "./core/core.legend": 28,
    "./core/core.plugin.js": 29,
    "./core/core.scale": 30,
    "./core/core.scaleService": 31,
    "./core/core.title": 32,
    "./core/core.tooltip": 33,
    "./elements/element.arc": 34,
    "./elements/element.line": 35,
    "./elements/element.point": 36,
    "./elements/element.rectangle": 37,
    "./scales/scale.category": 38,
    "./scales/scale.linear": 39,
    "./scales/scale.logarithmic": 40,
    "./scales/scale.radialLinear": 41,
    "./scales/scale.time": 42
  }],
  8: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.Bar = function (e, i) {
        return i.type = "bar", new t(e, i);
      };
    };
  }, {}],
  9: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.Bubble = function (e, i) {
        return i.type = "bubble", new t(e, i);
      };
    };
  }, {}],
  10: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.Doughnut = function (e, i) {
        return i.type = "doughnut", new t(e, i);
      };
    };
  }, {}],
  11: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.Line = function (e, i) {
        return i.type = "line", new t(e, i);
      };
    };
  }, {}],
  12: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.PolarArea = function (e, i) {
        return i.type = "polarArea", new t(e, i);
      };
    };
  }, {}],
  13: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers,
          i = {
        aspectRatio: 1
      };

      t.Radar = function (a, s) {
        return s.options = e.configMerge(i, s.options), s.type = "radar", new t(a, s);
      };
    };
  }, {}],
  14: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom",
            id: "x-axis-1"
          }],
          yAxes: [{
            type: "linear",
            position: "left",
            id: "y-axis-1"
          }]
        },
        tooltips: {
          callbacks: {
            title: function title(t, e) {
              return "";
            },
            label: function label(t, e) {
              return "(" + t.xLabel + ", " + t.yLabel + ")";
            }
          }
        }
      };
      t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function (e, i) {
        return i.type = "scatter", new t(e, i);
      };
    };
  }, {}],
  15: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.bar = {
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            categoryPercentage: .8,
            barPercentage: .9,
            gridLines: {
              offsetGridLines: !0
            }
          }],
          yAxes: [{
            type: "linear"
          }]
        }
      }, t.controllers.bar = t.DatasetController.extend({
        initialize: function initialize(e, i) {
          t.DatasetController.prototype.initialize.call(this, e, i), this.getMeta().bar = !0;
        },
        getBarCount: function getBarCount() {
          var t = 0;
          return e.each(this.chart.data.datasets, function (e, i) {
            var a = this.chart.getDatasetMeta(i);
            a.bar && this.chart.isDatasetVisible(i) && ++t;
          }, this), t;
        },
        addElements: function addElements() {
          var i = this.getMeta();
          e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Rectangle({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(e) {
          var i = new t.elements.Rectangle({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: e
          }),
              a = this.getBarCount();
          this.getMeta().data.splice(e, 0, i), this.updateElement(i, e, !0, a);
        },
        update: function update(t) {
          var i = this.getBarCount();
          e.each(this.getMeta().data, function (e, a) {
            this.updateElement(e, a, t, i);
          }, this);
        },
        updateElement: function updateElement(t, i, a, s) {
          var o,
              n = this.getMeta(),
              r = this.getScaleForId(n.xAxisID),
              h = this.getScaleForId(n.yAxisID);
          o = h.min < 0 && h.max < 0 ? h.getPixelForValue(h.max) : h.min > 0 && h.max > 0 ? h.getPixelForValue(h.min) : h.getPixelForValue(0), e.extend(t, {
            _chart: this.chart.chart,
            _xScale: r,
            _yScale: h,
            _datasetIndex: this.index,
            _index: i,
            _model: {
              x: this.calculateBarX(i, this.index),
              y: a ? o : this.calculateBarY(i, this.index),
              label: this.chart.data.labels[i],
              datasetLabel: this.getDataset().label,
              base: a ? o : this.calculateBarBase(this.index, i),
              width: this.calculateBarWidth(s),
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.rectangle.backgroundColor),
              borderSkipped: t.custom && t.custom.borderSkipped ? t.custom.borderSkipped : this.chart.options.elements.rectangle.borderSkipped,
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.rectangle.borderColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.rectangle.borderWidth)
            }
          }), t.pivot();
        },
        calculateBarBase: function calculateBarBase(t, e) {
          var i = this.getMeta(),
              a = (this.getScaleForId(i.xAxisID), this.getScaleForId(i.yAxisID)),
              s = 0;

          if (a.options.stacked) {
            var o = this.chart.data.datasets[t].data[e];
            if (0 > o) for (var n = 0; t > n; n++) {
              var r = this.chart.data.datasets[n],
                  h = this.chart.getDatasetMeta(n);
              h.bar && h.yAxisID === a.id && this.chart.isDatasetVisible(n) && (s += r.data[e] < 0 ? r.data[e] : 0);
            } else for (var l = 0; t > l; l++) {
              var c = this.chart.data.datasets[l],
                  d = this.chart.getDatasetMeta(l);
              d.bar && d.yAxisID === a.id && this.chart.isDatasetVisible(l) && (s += c.data[e] > 0 ? c.data[e] : 0);
            }
            return a.getPixelForValue(s);
          }

          return s = a.getPixelForValue(a.min), a.beginAtZero || a.min <= 0 && a.max >= 0 || a.min >= 0 && a.max <= 0 ? s = a.getPixelForValue(0, 0) : a.min < 0 && a.max < 0 && (s = a.getPixelForValue(a.max)), s;
        },
        getRuler: function getRuler() {
          var t = this.getMeta(),
              e = this.getScaleForId(t.xAxisID),
              i = (this.getScaleForId(t.yAxisID), this.getBarCount()),
              a = function () {
            for (var t = e.getPixelForTick(1) - e.getPixelForTick(0), i = 2; i < this.getDataset().data.length; i++) {
              t = Math.min(e.getPixelForTick(i) - e.getPixelForTick(i - 1), t);
            }

            return t;
          }.call(this),
              s = a * e.options.categoryPercentage,
              o = (a - a * e.options.categoryPercentage) / 2,
              n = s / i;

          if (e.ticks.length !== this.chart.data.labels.length) {
            var r = e.ticks.length / this.chart.data.labels.length;
            n *= r;
          }

          var h = n * e.options.barPercentage,
              l = n - n * e.options.barPercentage;
          return {
            datasetCount: i,
            tickWidth: a,
            categoryWidth: s,
            categorySpacing: o,
            fullBarWidth: n,
            barWidth: h,
            barSpacing: l
          };
        },
        calculateBarWidth: function calculateBarWidth() {
          var t = this.getScaleForId(this.getMeta().xAxisID),
              e = this.getRuler();
          return t.options.stacked ? e.categoryWidth : e.barWidth;
        },
        getBarIndex: function getBarIndex(t) {
          var e,
              i,
              a = 0;

          for (i = 0; t > i; ++i) {
            e = this.chart.getDatasetMeta(i), e.bar && this.chart.isDatasetVisible(i) && ++a;
          }

          return a;
        },
        calculateBarX: function calculateBarX(t, e) {
          var i = this.getMeta(),
              a = (this.getScaleForId(i.yAxisID), this.getScaleForId(i.xAxisID)),
              s = this.getBarIndex(e),
              o = this.getRuler(),
              n = a.getPixelForValue(null, t, e, this.chart.isCombo);
          return n -= this.chart.isCombo ? o.tickWidth / 2 : 0, a.options.stacked ? n + o.categoryWidth / 2 + o.categorySpacing : n + o.barWidth / 2 + o.categorySpacing + o.barWidth * s + o.barSpacing / 2 + o.barSpacing * s;
        },
        calculateBarY: function calculateBarY(t, e) {
          var i = this.getMeta(),
              a = (this.getScaleForId(i.xAxisID), this.getScaleForId(i.yAxisID)),
              s = this.getDataset().data[t];

          if (a.options.stacked) {
            for (var o = 0, n = 0, r = 0; e > r; r++) {
              var h = this.chart.data.datasets[r],
                  l = this.chart.getDatasetMeta(r);
              l.bar && l.yAxisID === a.id && this.chart.isDatasetVisible(r) && (h.data[t] < 0 ? n += h.data[t] || 0 : o += h.data[t] || 0);
            }

            return 0 > s ? a.getPixelForValue(n + s) : a.getPixelForValue(o + s);
          }

          return a.getPixelForValue(s);
        },
        draw: function draw(t) {
          var i = t || 1;
          e.each(this.getMeta().data, function (t, e) {
            var a = this.getDataset().data[e];
            null === a || void 0 === a || isNaN(a) || t.transition(i).draw();
          }, this);
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.rectangle.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.rectangle.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.rectangle.borderWidth);
        }
      }), t.defaults.horizontalBar = {
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom"
          }],
          yAxes: [{
            position: "left",
            type: "category",
            categoryPercentage: .8,
            barPercentage: .9,
            gridLines: {
              offsetGridLines: !0
            }
          }]
        }
      }, t.controllers.horizontalBar = t.controllers.bar.extend({
        updateElement: function updateElement(t, i, a, s) {
          var o,
              n = this.getMeta(),
              r = this.getScaleForId(n.xAxisID),
              h = this.getScaleForId(n.yAxisID);
          o = r.min < 0 && r.max < 0 ? r.getPixelForValue(r.max) : r.min > 0 && r.max > 0 ? r.getPixelForValue(r.min) : r.getPixelForValue(0), e.extend(t, {
            _chart: this.chart.chart,
            _xScale: r,
            _yScale: h,
            _datasetIndex: this.index,
            _index: i,
            _model: {
              x: a ? o : this.calculateBarX(i, this.index),
              y: this.calculateBarY(i, this.index),
              label: this.chart.data.labels[i],
              datasetLabel: this.getDataset().label,
              base: a ? o : this.calculateBarBase(this.index, i),
              height: this.calculateBarHeight(s),
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.rectangle.backgroundColor),
              borderSkipped: t.custom && t.custom.borderSkipped ? t.custom.borderSkipped : this.chart.options.elements.rectangle.borderSkipped,
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.rectangle.borderColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.rectangle.borderWidth)
            },
            draw: function draw() {
              function t(t) {
                return h[(c + t) % 4];
              }

              var e = this._chart.ctx,
                  i = this._view,
                  a = i.height / 2,
                  s = i.y - a,
                  o = i.y + a,
                  n = i.base - (i.base - i.x),
                  r = i.borderWidth / 2;
              i.borderWidth && (s += r, o -= r, n += r), e.beginPath(), e.fillStyle = i.backgroundColor, e.strokeStyle = i.borderColor, e.lineWidth = i.borderWidth;
              var h = [[i.base, o], [i.base, s], [n, s], [n, o]],
                  l = ["bottom", "left", "top", "right"],
                  c = l.indexOf(i.borderSkipped, 0);
              -1 === c && (c = 0), e.moveTo.apply(e, t(0));

              for (var d = 1; 4 > d; d++) {
                e.lineTo.apply(e, t(d));
              }

              e.fill(), i.borderWidth && e.stroke();
            },
            inRange: function inRange(t, e) {
              var i = this._view,
                  a = !1;
              return i && (a = i.x < i.base ? e >= i.y - i.height / 2 && e <= i.y + i.height / 2 && t >= i.x && t <= i.base : e >= i.y - i.height / 2 && e <= i.y + i.height / 2 && t >= i.base && t <= i.x), a;
            }
          }), t.pivot();
        },
        calculateBarBase: function calculateBarBase(t, e) {
          var i = this.getMeta(),
              a = this.getScaleForId(i.xAxisID),
              s = (this.getScaleForId(i.yAxisID), 0);

          if (a.options.stacked) {
            var o = this.chart.data.datasets[t].data[e];
            if (0 > o) for (var n = 0; t > n; n++) {
              var r = this.chart.data.datasets[n],
                  h = this.chart.getDatasetMeta(n);
              h.bar && h.xAxisID === a.id && this.chart.isDatasetVisible(n) && (s += r.data[e] < 0 ? r.data[e] : 0);
            } else for (var l = 0; t > l; l++) {
              var c = this.chart.data.datasets[l],
                  d = this.chart.getDatasetMeta(l);
              d.bar && d.xAxisID === a.id && this.chart.isDatasetVisible(l) && (s += c.data[e] > 0 ? c.data[e] : 0);
            }
            return a.getPixelForValue(s);
          }

          return s = a.getPixelForValue(a.min), a.beginAtZero || a.min <= 0 && a.max >= 0 || a.min >= 0 && a.max <= 0 ? s = a.getPixelForValue(0, 0) : a.min < 0 && a.max < 0 && (s = a.getPixelForValue(a.max)), s;
        },
        getRuler: function getRuler() {
          var t = this.getMeta(),
              e = (this.getScaleForId(t.xAxisID), this.getScaleForId(t.yAxisID)),
              i = this.getBarCount(),
              a = function () {
            for (var t = e.getPixelForTick(1) - e.getPixelForTick(0), i = 2; i < this.getDataset().data.length; i++) {
              t = Math.min(e.getPixelForTick(i) - e.getPixelForTick(i - 1), t);
            }

            return t;
          }.call(this),
              s = a * e.options.categoryPercentage,
              o = (a - a * e.options.categoryPercentage) / 2,
              n = s / i;

          if (e.ticks.length !== this.chart.data.labels.length) {
            var r = e.ticks.length / this.chart.data.labels.length;
            n *= r;
          }

          var h = n * e.options.barPercentage,
              l = n - n * e.options.barPercentage;
          return {
            datasetCount: i,
            tickHeight: a,
            categoryHeight: s,
            categorySpacing: o,
            fullBarHeight: n,
            barHeight: h,
            barSpacing: l
          };
        },
        calculateBarHeight: function calculateBarHeight() {
          var t = this.getScaleForId(this.getMeta().yAxisID),
              e = this.getRuler();
          return t.options.stacked ? e.categoryHeight : e.barHeight;
        },
        calculateBarX: function calculateBarX(t, e) {
          var i = this.getMeta(),
              a = this.getScaleForId(i.xAxisID),
              s = (this.getScaleForId(i.yAxisID), this.getDataset().data[t]);

          if (a.options.stacked) {
            for (var o = 0, n = 0, r = 0; e > r; r++) {
              var h = this.chart.data.datasets[r],
                  l = this.chart.getDatasetMeta(r);
              l.bar && l.xAxisID === a.id && this.chart.isDatasetVisible(r) && (h.data[t] < 0 ? n += h.data[t] || 0 : o += h.data[t] || 0);
            }

            return 0 > s ? a.getPixelForValue(n + s) : a.getPixelForValue(o + s);
          }

          return a.getPixelForValue(s);
        },
        calculateBarY: function calculateBarY(t, e) {
          var i = this.getMeta(),
              a = this.getScaleForId(i.yAxisID),
              s = (this.getScaleForId(i.xAxisID), this.getBarIndex(e)),
              o = this.getRuler(),
              n = a.getPixelForValue(null, t, e, this.chart.isCombo);
          return n -= this.chart.isCombo ? o.tickHeight / 2 : 0, a.options.stacked ? n + o.categoryHeight / 2 + o.categorySpacing : n + o.barHeight / 2 + o.categorySpacing + o.barHeight * s + o.barSpacing / 2 + o.barSpacing * s;
        }
      });
    };
  }, {}],
  16: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.bubble = {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom",
            id: "x-axis-0"
          }],
          yAxes: [{
            type: "linear",
            position: "left",
            id: "y-axis-0"
          }]
        },
        tooltips: {
          callbacks: {
            title: function title(t, e) {
              return "";
            },
            label: function label(t, e) {
              var i = e.datasets[t.datasetIndex].label || "",
                  a = e.datasets[t.datasetIndex].data[t.index];
              return i + ": (" + a.x + ", " + a.y + ", " + a.r + ")";
            }
          }
        }
      }, t.controllers.bubble = t.DatasetController.extend({
        addElements: function addElements() {
          var i = this.getMeta();
          e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Point({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(e) {
          var i = new t.elements.Point({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: e
          });
          this.getMeta().data.splice(e, 0, i), this.updateElement(i, e, !0);
        },
        update: function update(t) {
          var i,
              a = this.getMeta(),
              s = a.data,
              o = this.getScaleForId(a.yAxisID);
          this.getScaleForId(a.xAxisID);
          i = o.min < 0 && o.max < 0 ? o.getPixelForValue(o.max) : o.min > 0 && o.max > 0 ? o.getPixelForValue(o.min) : o.getPixelForValue(0), e.each(s, function (e, i) {
            this.updateElement(e, i, t);
          }, this);
        },
        updateElement: function updateElement(t, i, a) {
          var s,
              o = this.getMeta(),
              n = this.getScaleForId(o.yAxisID),
              r = this.getScaleForId(o.xAxisID);
          s = n.min < 0 && n.max < 0 ? n.getPixelForValue(n.max) : n.min > 0 && n.max > 0 ? n.getPixelForValue(n.min) : n.getPixelForValue(0), e.extend(t, {
            _chart: this.chart.chart,
            _xScale: r,
            _yScale: n,
            _datasetIndex: this.index,
            _index: i,
            _model: {
              x: a ? r.getPixelForDecimal(.5) : r.getPixelForValue(this.getDataset().data[i], i, this.index, this.chart.isCombo),
              y: a ? s : n.getPixelForValue(this.getDataset().data[i], i, this.index),
              radius: a ? 0 : t.custom && t.custom.radius ? t.custom.radius : this.getRadius(this.getDataset().data[i]),
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.point.backgroundColor),
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.point.borderColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.point.borderWidth),
              hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().hitRadius, i, this.chart.options.elements.point.hitRadius)
            }
          }), t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y), t.pivot();
        },
        getRadius: function getRadius(t) {
          return t.r || this.chart.options.elements.point.radius;
        },
        draw: function draw(t) {
          var i = t || 1;
          e.each(this.getMeta().data, function (t, e) {
            t.transition(i), t.draw();
          });
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.hoverRadius, a, this.chart.options.elements.point.hoverRadius) + this.getRadius(this.getDataset().data[t._index]), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          t._model.radius = t.custom && t.custom.radius ? t.custom.radius : this.getRadius(this.getDataset().data[t._index]), t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.point.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.point.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.point.borderWidth);
        }
      });
    };
  }, {}],
  17: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.doughnut = {
        animation: {
          animateRotate: !0,
          animateScale: !1
        },
        aspectRatio: 1,
        hover: {
          mode: "single"
        },
        legendCallback: function legendCallback(t) {
          var e = [];
          if (e.push('<ul class="' + t.id + '-legend">'), t.data.datasets.length) for (var i = 0; i < t.data.datasets[0].data.length; ++i) {
            e.push('<li><span style="background-color:' + t.data.datasets[0].backgroundColor[i] + '"></span>'), t.data.labels[i] && e.push(t.data.labels[i]), e.push("</li>");
          }
          return e.push("</ul>"), e.join("");
        },
        legend: {
          labels: {
            generateLabels: function generateLabels(t) {
              var i = t.data;
              return i.labels.length && i.datasets.length ? i.labels.map(function (a, s) {
                var o = t.getDatasetMeta(0),
                    n = i.datasets[0],
                    r = o.data[s],
                    h = r.custom && r.custom.backgroundColor ? r.custom.backgroundColor : e.getValueAtIndexOrDefault(n.backgroundColor, s, this.chart.options.elements.arc.backgroundColor),
                    l = r.custom && r.custom.borderColor ? r.custom.borderColor : e.getValueAtIndexOrDefault(n.borderColor, s, this.chart.options.elements.arc.borderColor),
                    c = r.custom && r.custom.borderWidth ? r.custom.borderWidth : e.getValueAtIndexOrDefault(n.borderWidth, s, this.chart.options.elements.arc.borderWidth);
                return {
                  text: a,
                  fillStyle: h,
                  strokeStyle: l,
                  lineWidth: c,
                  hidden: isNaN(n.data[s]) || o.data[s].hidden,
                  index: s
                };
              }, this) : [];
            }
          },
          onClick: function onClick(t, e) {
            var i,
                a,
                s,
                o = e.index,
                n = this.chart;

            for (i = 0, a = (n.data.datasets || []).length; a > i; ++i) {
              s = n.getDatasetMeta(i), s.data[o].hidden = !s.data[o].hidden;
            }

            n.update();
          }
        },
        cutoutPercentage: 50,
        rotation: Math.PI * -.5,
        circumference: 2 * Math.PI,
        tooltips: {
          callbacks: {
            title: function title() {
              return "";
            },
            label: function label(t, e) {
              return e.labels[t.index] + ": " + e.datasets[t.datasetIndex].data[t.index];
            }
          }
        }
      }, t.defaults.pie = e.clone(t.defaults.doughnut), e.extend(t.defaults.pie, {
        cutoutPercentage: 0
      }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
        linkScales: function linkScales() {},
        addElements: function addElements() {
          var i = this.getMeta();
          e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Arc({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(i, a) {
          var s = new t.elements.Arc({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: i
          });
          a && e.isArray(this.getDataset().backgroundColor) && this.getDataset().backgroundColor.splice(i, 0, a), this.getMeta().data.splice(i, 0, s), this.updateElement(s, i, !0);
        },
        getRingIndex: function getRingIndex(t) {
          for (var e = 0, i = 0; t > i; ++i) {
            this.chart.isDatasetVisible(i) && ++e;
          }

          return e;
        },
        update: function update(t) {
          var i = this.chart.chartArea.right - this.chart.chartArea.left - this.chart.options.elements.arc.borderWidth,
              a = this.chart.chartArea.bottom - this.chart.chartArea.top - this.chart.options.elements.arc.borderWidth,
              s = Math.min(i, a),
              o = {
            x: 0,
            y: 0
          };

          if (this.chart.options.circumference < 2 * Math.PI) {
            var n = this.chart.options.rotation % (2 * Math.PI);
            n += 2 * Math.PI * (n >= Math.PI ? -1 : n < -Math.PI ? 1 : 0);
            var r = n + this.chart.options.circumference,
                h = {
              x: Math.cos(n),
              y: Math.sin(n)
            },
                l = {
              x: Math.cos(r),
              y: Math.sin(r)
            },
                c = 0 >= n && r >= 0 || n <= 2 * Math.PI && 2 * Math.PI <= r,
                d = n <= .5 * Math.PI && .5 * Math.PI <= r || n <= 2.5 * Math.PI && 2.5 * Math.PI <= r,
                u = n <= -Math.PI && -Math.PI <= r || n <= Math.PI && Math.PI <= r,
                f = n <= .5 * -Math.PI && .5 * -Math.PI <= r || n <= 1.5 * Math.PI && 1.5 * Math.PI <= r,
                g = this.chart.options.cutoutPercentage / 100,
                m = {
              x: u ? -1 : Math.min(h.x * (h.x < 0 ? 1 : g), l.x * (l.x < 0 ? 1 : g)),
              y: f ? -1 : Math.min(h.y * (h.y < 0 ? 1 : g), l.y * (l.y < 0 ? 1 : g))
            },
                p = {
              x: c ? 1 : Math.max(h.x * (h.x > 0 ? 1 : g), l.x * (l.x > 0 ? 1 : g)),
              y: d ? 1 : Math.max(h.y * (h.y > 0 ? 1 : g), l.y * (l.y > 0 ? 1 : g))
            },
                b = {
              width: .5 * (p.x - m.x),
              height: .5 * (p.y - m.y)
            };
            s = Math.min(i / b.width, a / b.height), o = {
              x: (p.x + m.x) * -.5,
              y: (p.y + m.y) * -.5
            };
          }

          this.chart.outerRadius = Math.max(s / 2, 0), this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? this.chart.outerRadius / 100 * this.chart.options.cutoutPercentage : 1, 0), this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.chart.getVisibleDatasetCount(), this.chart.offsetX = o.x * this.chart.outerRadius, this.chart.offsetY = o.y * this.chart.outerRadius, this.getMeta().total = this.calculateTotal(), this.outerRadius = this.chart.outerRadius - this.chart.radiusLength * this.getRingIndex(this.index), this.innerRadius = this.outerRadius - this.chart.radiusLength, e.each(this.getMeta().data, function (e, i) {
            this.updateElement(e, i, t);
          }, this);
        },
        updateElement: function updateElement(t, i, a) {
          var s = (this.chart.chartArea.left + this.chart.chartArea.right) / 2,
              o = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2,
              n = this.chart.options.rotation,
              r = this.chart.options.rotation,
              h = a && this.chart.options.animation.animateRotate ? 0 : t.hidden ? 0 : this.calculateCircumference(this.getDataset().data[i]) * (this.chart.options.circumference / (2 * Math.PI)),
              l = a && this.chart.options.animation.animateScale ? 0 : this.innerRadius,
              c = a && this.chart.options.animation.animateScale ? 0 : this.outerRadius;
          e.extend(t, {
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: i,
            _model: {
              x: s + this.chart.offsetX,
              y: o + this.chart.offsetY,
              startAngle: n,
              endAngle: r,
              circumference: h,
              outerRadius: c,
              innerRadius: l,
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
              hoverBackgroundColor: t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor, i, this.chart.options.elements.arc.hoverBackgroundColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
              label: e.getValueAtIndexOrDefault(this.getDataset().label, i, this.chart.data.labels[i])
            }
          }), a && this.chart.options.animation.animateRotate || (0 === i ? t._model.startAngle = this.chart.options.rotation : t._model.startAngle = this.getMeta().data[i - 1]._model.endAngle, t._model.endAngle = t._model.startAngle + t._model.circumference), t.pivot();
        },
        draw: function draw(t) {
          var i = t || 1;
          e.each(this.getMeta().data, function (t, e) {
            t.transition(i).draw();
          });
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth);
        },
        calculateTotal: function calculateTotal() {
          var t,
              i = this.getDataset(),
              a = this.getMeta(),
              s = 0;
          return e.each(a.data, function (e, a) {
            t = i.data[a], isNaN(t) || e.hidden || (s += Math.abs(t));
          }), s;
        },
        calculateCircumference: function calculateCircumference(t) {
          var e = this.getMeta().total;
          return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
        }
      });
    };
  }, {}],
  18: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.line = {
        showLines: !0,
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            id: "x-axis-0"
          }],
          yAxes: [{
            type: "linear",
            id: "y-axis-0"
          }]
        }
      }, t.controllers.line = t.DatasetController.extend({
        addElements: function addElements() {
          var i = this.getMeta();
          i.dataset = i.dataset || new t.elements.Line({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _points: i.data
          }), e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Point({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(e) {
          var i = new t.elements.Point({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: e
          });
          this.getMeta().data.splice(e, 0, i), this.updateElement(i, e, !0), this.chart.options.showLines && 0 !== this.chart.options.elements.line.tension && this.updateBezierControlPoints();
        },
        update: function update(t) {
          var i,
              a = this.getMeta(),
              s = a.dataset,
              o = a.data,
              n = this.getScaleForId(a.yAxisID);
          this.getScaleForId(a.xAxisID);
          i = n.min < 0 && n.max < 0 ? n.getPixelForValue(n.max) : n.min > 0 && n.max > 0 ? n.getPixelForValue(n.min) : n.getPixelForValue(0), this.chart.options.showLines && (s._scale = n, s._datasetIndex = this.index, s._children = o, void 0 !== this.getDataset().tension && void 0 === this.getDataset().lineTension && (this.getDataset().lineTension = this.getDataset().tension), s._model = {
            tension: s.custom && s.custom.tension ? s.custom.tension : e.getValueOrDefault(this.getDataset().lineTension, this.chart.options.elements.line.tension),
            backgroundColor: s.custom && s.custom.backgroundColor ? s.custom.backgroundColor : this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor,
            borderWidth: s.custom && s.custom.borderWidth ? s.custom.borderWidth : this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth,
            borderColor: s.custom && s.custom.borderColor ? s.custom.borderColor : this.getDataset().borderColor || this.chart.options.elements.line.borderColor,
            borderCapStyle: s.custom && s.custom.borderCapStyle ? s.custom.borderCapStyle : this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle,
            borderDash: s.custom && s.custom.borderDash ? s.custom.borderDash : this.getDataset().borderDash || this.chart.options.elements.line.borderDash,
            borderDashOffset: s.custom && s.custom.borderDashOffset ? s.custom.borderDashOffset : this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset,
            borderJoinStyle: s.custom && s.custom.borderJoinStyle ? s.custom.borderJoinStyle : this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle,
            fill: s.custom && s.custom.fill ? s.custom.fill : void 0 !== this.getDataset().fill ? this.getDataset().fill : this.chart.options.elements.line.fill,
            scaleTop: n.top,
            scaleBottom: n.bottom,
            scaleZero: i
          }, s.pivot()), e.each(o, function (e, i) {
            this.updateElement(e, i, t);
          }, this), this.chart.options.showLines && 0 !== this.chart.options.elements.line.tension && this.updateBezierControlPoints();
        },
        getPointBackgroundColor: function getPointBackgroundColor(t, i) {
          var a = this.chart.options.elements.point.backgroundColor,
              s = this.getDataset();
          return t.custom && t.custom.backgroundColor ? a = t.custom.backgroundColor : s.pointBackgroundColor ? a = e.getValueAtIndexOrDefault(s.pointBackgroundColor, i, a) : s.backgroundColor && (a = s.backgroundColor), a;
        },
        getPointBorderColor: function getPointBorderColor(t, i) {
          var a = this.chart.options.elements.point.borderColor,
              s = this.getDataset();
          return t.custom && t.custom.borderColor ? a = t.custom.borderColor : s.pointBorderColor ? a = e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, a) : s.borderColor && (a = s.borderColor), a;
        },
        getPointBorderWidth: function getPointBorderWidth(t, i) {
          var a = this.chart.options.elements.point.borderWidth,
              s = this.getDataset();
          return t.custom && void 0 !== t.custom.borderWidth ? a = t.custom.borderWidth : void 0 !== s.pointBorderWidth ? a = e.getValueAtIndexOrDefault(s.pointBorderWidth, i, a) : void 0 !== s.borderWidth && (a = s.borderWidth), a;
        },
        updateElement: function updateElement(t, i, a) {
          var s,
              o = this.getMeta(),
              n = this.getScaleForId(o.yAxisID),
              r = this.getScaleForId(o.xAxisID);
          s = n.min < 0 && n.max < 0 ? n.getPixelForValue(n.max) : n.min > 0 && n.max > 0 ? n.getPixelForValue(n.min) : n.getPixelForValue(0), t._chart = this.chart.chart, t._xScale = r, t._yScale = n, t._datasetIndex = this.index, t._index = i, void 0 !== this.getDataset().radius && void 0 === this.getDataset().pointRadius && (this.getDataset().pointRadius = this.getDataset().radius), void 0 !== this.getDataset().hitRadius && void 0 === this.getDataset().pointHitRadius && (this.getDataset().pointHitRadius = this.getDataset().hitRadius), t._model = {
            x: r.getPixelForValue(this.getDataset().data[i], i, this.index, this.chart.isCombo),
            y: a ? s : this.calculatePointY(this.getDataset().data[i], i, this.index, this.chart.isCombo),
            radius: t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().pointRadius, i, this.chart.options.elements.point.radius),
            pointStyle: t.custom && t.custom.pointStyle ? t.custom.pointStyle : e.getValueAtIndexOrDefault(this.getDataset().pointStyle, i, this.chart.options.elements.point.pointStyle),
            backgroundColor: this.getPointBackgroundColor(t, i),
            borderColor: this.getPointBorderColor(t, i),
            borderWidth: this.getPointBorderWidth(t, i),
            hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().pointHitRadius, i, this.chart.options.elements.point.hitRadius)
          }, t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y);
        },
        calculatePointY: function calculatePointY(t, e, i, a) {
          var s = this.getMeta(),
              o = (this.getScaleForId(s.xAxisID), this.getScaleForId(s.yAxisID));

          if (o.options.stacked) {
            for (var n = 0, r = 0, h = 0; i > h; h++) {
              var l = this.chart.data.datasets[h],
                  c = this.chart.getDatasetMeta(h);
              "line" === c.type && this.chart.isDatasetVisible(h) && (l.data[e] < 0 ? r += l.data[e] || 0 : n += l.data[e] || 0);
            }

            return 0 > t ? o.getPixelForValue(r + t) : o.getPixelForValue(n + t);
          }

          return o.getPixelForValue(t);
        },
        updateBezierControlPoints: function updateBezierControlPoints() {
          var t = this.getMeta();
          e.each(t.data, function (i, a) {
            var s = e.splineCurve(e.previousItem(t.data, a)._model, i._model, e.nextItem(t.data, a)._model, t.dataset._model.tension);
            i._model.controlPointPreviousX = Math.max(Math.min(s.previous.x, this.chart.chartArea.right), this.chart.chartArea.left), i._model.controlPointPreviousY = Math.max(Math.min(s.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top), i._model.controlPointNextX = Math.max(Math.min(s.next.x, this.chart.chartArea.right), this.chart.chartArea.left), i._model.controlPointNextY = Math.max(Math.min(s.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top), i.pivot();
          }, this);
        },
        draw: function draw(t) {
          var i = this.getMeta(),
              a = t || 1;
          e.each(i.data, function (t) {
            t.transition(a);
          }), this.chart.options.showLines && i.dataset.transition(a).draw(), e.each(i.data, function (t) {
            t.draw();
          });
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.pointHoverRadius, a, this.chart.options.elements.point.hoverRadius), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.pointHoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.pointHoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          void 0 !== this.getDataset().radius && void 0 === this.getDataset().pointRadius && (this.getDataset().pointRadius = this.getDataset().radius), t._model.radius = t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().pointRadius, i, this.chart.options.elements.point.radius), t._model.backgroundColor = this.getPointBackgroundColor(t, i), t._model.borderColor = this.getPointBorderColor(t, i), t._model.borderWidth = this.getPointBorderWidth(t, i);
        }
      });
    };
  }, {}],
  19: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.polarArea = {
        scale: {
          type: "radialLinear",
          lineArc: !0
        },
        animation: {
          animateRotate: !0,
          animateScale: !0
        },
        aspectRatio: 1,
        legendCallback: function legendCallback(t) {
          var e = [];
          if (e.push('<ul class="' + t.id + '-legend">'), t.data.datasets.length) for (var i = 0; i < t.data.datasets[0].data.length; ++i) {
            e.push('<li><span style="background-color:' + t.data.datasets[0].backgroundColor[i] + '">'), t.data.labels[i] && e.push(t.data.labels[i]), e.push("</span></li>");
          }
          return e.push("</ul>"), e.join("");
        },
        legend: {
          labels: {
            generateLabels: function generateLabels(t) {
              var i = t.data;
              return i.labels.length && i.datasets.length ? i.labels.map(function (a, s) {
                var o = t.getDatasetMeta(0),
                    n = i.datasets[0],
                    r = o.data[s],
                    h = r.custom && r.custom.backgroundColor ? r.custom.backgroundColor : e.getValueAtIndexOrDefault(n.backgroundColor, s, this.chart.options.elements.arc.backgroundColor),
                    l = r.custom && r.custom.borderColor ? r.custom.borderColor : e.getValueAtIndexOrDefault(n.borderColor, s, this.chart.options.elements.arc.borderColor),
                    c = r.custom && r.custom.borderWidth ? r.custom.borderWidth : e.getValueAtIndexOrDefault(n.borderWidth, s, this.chart.options.elements.arc.borderWidth);
                return {
                  text: a,
                  fillStyle: h,
                  strokeStyle: l,
                  lineWidth: c,
                  hidden: isNaN(n.data[s]) || o.data[s].hidden,
                  index: s
                };
              }, this) : [];
            }
          },
          onClick: function onClick(t, e) {
            var i,
                a,
                s,
                o = e.index,
                n = this.chart;

            for (i = 0, a = (n.data.datasets || []).length; a > i; ++i) {
              s = n.getDatasetMeta(i), s.data[o].hidden = !s.data[o].hidden;
            }

            n.update();
          }
        },
        tooltips: {
          callbacks: {
            title: function title() {
              return "";
            },
            label: function label(t, e) {
              return e.labels[t.index] + ": " + t.yLabel;
            }
          }
        }
      }, t.controllers.polarArea = t.DatasetController.extend({
        linkScales: function linkScales() {},
        addElements: function addElements() {
          var i = this.getMeta();
          e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Arc({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(e) {
          var i = new t.elements.Arc({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: e
          });
          this.getMeta().data.splice(e, 0, i), this.updateElement(i, e, !0);
        },
        update: function update(t) {
          var i = this.getMeta(),
              a = Math.min(this.chart.chartArea.right - this.chart.chartArea.left, this.chart.chartArea.bottom - this.chart.chartArea.top);
          this.chart.outerRadius = Math.max((a - this.chart.options.elements.arc.borderWidth / 2) / 2, 0), this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? this.chart.outerRadius / 100 * this.chart.options.cutoutPercentage : 1, 0), this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.chart.getVisibleDatasetCount(), this.outerRadius = this.chart.outerRadius - this.chart.radiusLength * this.index, this.innerRadius = this.outerRadius - this.chart.radiusLength, i.count = this.countVisibleElements(), e.each(i.data, function (e, i) {
            this.updateElement(e, i, t);
          }, this);
        },
        updateElement: function updateElement(t, i, a) {
          for (var s = this.calculateCircumference(this.getDataset().data[i]), o = (this.chart.chartArea.left + this.chart.chartArea.right) / 2, n = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2, r = 0, h = this.getMeta(), l = 0; i > l; ++l) {
            isNaN(this.getDataset().data[l]) || h.data[l].hidden || ++r;
          }

          var c = t.hidden ? 0 : this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),
              d = -.5 * Math.PI + s * r,
              u = d + (t.hidden ? 0 : s),
              f = {
            x: o,
            y: n,
            innerRadius: 0,
            outerRadius: this.chart.options.animation.animateScale ? 0 : this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),
            startAngle: this.chart.options.animation.animateRotate ? Math.PI * -.5 : d,
            endAngle: this.chart.options.animation.animateRotate ? Math.PI * -.5 : u,
            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
            label: e.getValueAtIndexOrDefault(this.chart.data.labels, i, this.chart.data.labels[i])
          };
          e.extend(t, {
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: i,
            _scale: this.chart.scale,
            _model: a ? f : {
              x: o,
              y: n,
              innerRadius: 0,
              outerRadius: c,
              startAngle: d,
              endAngle: u,
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
              label: e.getValueAtIndexOrDefault(this.chart.data.labels, i, this.chart.data.labels[i])
            }
          }), t.pivot();
        },
        draw: function draw(t) {
          var i = t || 1;
          e.each(this.getMeta().data, function (t, e) {
            t.transition(i).draw();
          });
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth);
        },
        countVisibleElements: function countVisibleElements() {
          var t = this.getDataset(),
              i = this.getMeta(),
              a = 0;
          return e.each(i.data, function (e, i) {
            isNaN(t.data[i]) || e.hidden || a++;
          }), a;
        },
        calculateCircumference: function calculateCircumference(t) {
          var e = this.getMeta().count;
          return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0;
        }
      });
    };
  }, {}],
  20: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.radar = {
        scale: {
          type: "radialLinear"
        },
        elements: {
          line: {
            tension: 0
          }
        }
      }, t.controllers.radar = t.DatasetController.extend({
        linkScales: function linkScales() {},
        addElements: function addElements() {
          var i = this.getMeta();
          i.dataset = i.dataset || new t.elements.Line({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _points: i.data,
            _loop: !0
          }), e.each(this.getDataset().data, function (e, a) {
            i.data[a] = i.data[a] || new t.elements.Point({
              _chart: this.chart.chart,
              _datasetIndex: this.index,
              _index: a,
              _model: {
                x: 0,
                y: 0
              }
            });
          }, this);
        },
        addElementAndReset: function addElementAndReset(e) {
          var i = new t.elements.Point({
            _chart: this.chart.chart,
            _datasetIndex: this.index,
            _index: e
          });
          this.getMeta().data.splice(e, 0, i), this.updateElement(i, e, !0), this.updateBezierControlPoints();
        },
        update: function update(t) {
          var i,
              a = this.getMeta(),
              s = a.dataset,
              o = a.data,
              n = this.chart.scale;
          i = n.min < 0 && n.max < 0 ? n.getPointPositionForValue(0, n.max) : n.min > 0 && n.max > 0 ? n.getPointPositionForValue(0, n.min) : n.getPointPositionForValue(0, 0), void 0 !== this.getDataset().tension && void 0 === this.getDataset().lineTension && (this.getDataset().lineTension = this.getDataset().tension), e.extend(a.dataset, {
            _datasetIndex: this.index,
            _children: o,
            _model: {
              tension: s.custom && s.custom.tension ? s.custom.tension : e.getValueOrDefault(this.getDataset().lineTension, this.chart.options.elements.line.tension),
              backgroundColor: s.custom && s.custom.backgroundColor ? s.custom.backgroundColor : this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor,
              borderWidth: s.custom && s.custom.borderWidth ? s.custom.borderWidth : this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth,
              borderColor: s.custom && s.custom.borderColor ? s.custom.borderColor : this.getDataset().borderColor || this.chart.options.elements.line.borderColor,
              fill: s.custom && s.custom.fill ? s.custom.fill : void 0 !== this.getDataset().fill ? this.getDataset().fill : this.chart.options.elements.line.fill,
              borderCapStyle: s.custom && s.custom.borderCapStyle ? s.custom.borderCapStyle : this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle,
              borderDash: s.custom && s.custom.borderDash ? s.custom.borderDash : this.getDataset().borderDash || this.chart.options.elements.line.borderDash,
              borderDashOffset: s.custom && s.custom.borderDashOffset ? s.custom.borderDashOffset : this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset,
              borderJoinStyle: s.custom && s.custom.borderJoinStyle ? s.custom.borderJoinStyle : this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle,
              scaleTop: n.top,
              scaleBottom: n.bottom,
              scaleZero: i
            }
          }), a.dataset.pivot(), e.each(o, function (e, i) {
            this.updateElement(e, i, t);
          }, this), this.updateBezierControlPoints();
        },
        updateElement: function updateElement(t, i, a) {
          var s = this.chart.scale.getPointPositionForValue(i, this.getDataset().data[i]);
          e.extend(t, {
            _datasetIndex: this.index,
            _index: i,
            _scale: this.chart.scale,
            _model: {
              x: a ? this.chart.scale.xCenter : s.x,
              y: a ? this.chart.scale.yCenter : s.y,
              tension: t.custom && t.custom.tension ? t.custom.tension : e.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
              radius: t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().pointRadius, i, this.chart.options.elements.point.radius),
              backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, i, this.chart.options.elements.point.backgroundColor),
              borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, this.chart.options.elements.point.borderColor),
              borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, i, this.chart.options.elements.point.borderWidth),
              pointStyle: t.custom && t.custom.pointStyle ? t.custom.pointStyle : e.getValueAtIndexOrDefault(this.getDataset().pointStyle, i, this.chart.options.elements.point.pointStyle),
              hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().hitRadius, i, this.chart.options.elements.point.hitRadius)
            }
          }), t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y);
        },
        updateBezierControlPoints: function updateBezierControlPoints() {
          var t = this.getMeta();
          e.each(t.data, function (i, a) {
            var s = e.splineCurve(e.previousItem(t.data, a, !0)._model, i._model, e.nextItem(t.data, a, !0)._model, i._model.tension);
            i._model.controlPointPreviousX = Math.max(Math.min(s.previous.x, this.chart.chartArea.right), this.chart.chartArea.left), i._model.controlPointPreviousY = Math.max(Math.min(s.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top), i._model.controlPointNextX = Math.max(Math.min(s.next.x, this.chart.chartArea.right), this.chart.chartArea.left), i._model.controlPointNextY = Math.max(Math.min(s.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top), i.pivot();
          }, this);
        },
        draw: function draw(t) {
          var i = this.getMeta(),
              a = t || 1;
          e.each(i.data, function (t, e) {
            t.transition(a);
          }), i.dataset.transition(a).draw(), e.each(i.data, function (t) {
            t.draw();
          });
        },
        setHoverStyle: function setHoverStyle(t) {
          var i = this.chart.data.datasets[t._datasetIndex],
              a = t._index;
          t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.pointHoverRadius, a, this.chart.options.elements.point.hoverRadius), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor, a, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.pointHoverBorderColor, a, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.pointHoverBorderWidth, a, t._model.borderWidth);
        },
        removeHoverStyle: function removeHoverStyle(t) {
          var i = (this.chart.data.datasets[t._datasetIndex], t._index);
          t._model.radius = t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().radius, i, this.chart.options.elements.point.radius), t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, i, this.chart.options.elements.point.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, this.chart.options.elements.point.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, i, this.chart.options.elements.point.borderWidth);
        }
      });
    };
  }, {}],
  21: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.global.animation = {
        duration: 1e3,
        easing: "easeOutQuart",
        onProgress: e.noop,
        onComplete: e.noop
      }, t.Animation = t.Element.extend({
        currentStep: null,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
      }), t.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        request: null,
        addAnimation: function addAnimation(t, e, i, a) {
          a || (t.animating = !0);

          for (var s = 0; s < this.animations.length; ++s) {
            if (this.animations[s].chartInstance === t) return void (this.animations[s].animationObject = e);
          }

          this.animations.push({
            chartInstance: t,
            animationObject: e
          }), 1 === this.animations.length && this.requestAnimationFrame();
        },
        cancelAnimation: function cancelAnimation(t) {
          var i = e.findIndex(this.animations, function (e) {
            return e.chartInstance === t;
          });
          -1 !== i && (this.animations.splice(i, 1), t.animating = !1);
        },
        requestAnimationFrame: function requestAnimationFrame() {
          var t = this;
          null === t.request && (t.request = e.requestAnimFrame.call(window, function () {
            t.request = null, t.startDigest();
          }));
        },
        startDigest: function startDigest() {
          var t = Date.now(),
              e = 0;
          this.dropFrames > 1 && (e = Math.floor(this.dropFrames), this.dropFrames = this.dropFrames % 1);

          for (var i = 0; i < this.animations.length;) {
            null === this.animations[i].animationObject.currentStep && (this.animations[i].animationObject.currentStep = 0), this.animations[i].animationObject.currentStep += 1 + e, this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps && (this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps), this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject), this.animations[i].animationObject.onAnimationProgress && this.animations[i].animationObject.onAnimationProgress.call && this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance, this.animations[i]), this.animations[i].animationObject.currentStep === this.animations[i].animationObject.numSteps ? (this.animations[i].animationObject.onAnimationComplete && this.animations[i].animationObject.onAnimationComplete.call && this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance, this.animations[i]), this.animations[i].chartInstance.animating = !1, this.animations.splice(i, 1)) : ++i;
          }

          var a = Date.now(),
              s = (a - t) / this.frameDuration;
          this.dropFrames += s, this.animations.length > 0 && this.requestAnimationFrame();
        }
      };
    };
  }, {}],
  22: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.types = {}, t.instances = {}, t.controllers = {}, t.Controller = function (i) {
        return this.chart = i, this.config = i.config, this.options = this.config.options = e.configMerge(t.defaults.global, t.defaults[this.config.type], this.config.options || {}), this.id = e.uid(), Object.defineProperty(this, "data", {
          get: function get() {
            return this.config.data;
          }
        }), t.instances[this.id] = this, this.options.responsive && this.resize(!0), this.initialize(), this;
      }, e.extend(t.Controller.prototype, {
        initialize: function initialize() {
          return t.pluginService.notifyPlugins("beforeInit", [this]), this.bindEvents(), this.ensureScalesHaveIDs(), this.buildOrUpdateControllers(), this.buildScales(), this.buildSurroundingItems(), this.updateLayout(), this.resetElements(), this.initToolTip(), this.update(), t.pluginService.notifyPlugins("afterInit", [this]), this;
        },
        clear: function clear() {
          return e.clear(this.chart), this;
        },
        stop: function stop() {
          return t.animationService.cancelAnimation(this), this;
        },
        resize: function resize(t) {
          var i = this.chart.canvas,
              a = e.getMaximumWidth(this.chart.canvas),
              s = this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === !1 && isFinite(this.chart.aspectRatio) && 0 !== this.chart.aspectRatio ? a / this.chart.aspectRatio : e.getMaximumHeight(this.chart.canvas),
              o = this.chart.width !== a || this.chart.height !== s;
          return o ? (i.width = this.chart.width = a, i.height = this.chart.height = s, e.retinaScale(this.chart), t || (this.stop(), this.update(this.options.responsiveAnimationDuration)), this) : this;
        },
        ensureScalesHaveIDs: function ensureScalesHaveIDs() {
          var t = "x-axis-",
              i = "y-axis-";
          this.options.scales && (this.options.scales.xAxes && this.options.scales.xAxes.length && e.each(this.options.scales.xAxes, function (e, i) {
            e.id = e.id || t + i;
          }), this.options.scales.yAxes && this.options.scales.yAxes.length && e.each(this.options.scales.yAxes, function (t, e) {
            t.id = t.id || i + e;
          }));
        },
        buildScales: function buildScales() {
          if (this.scales = {}, this.options.scales && (this.options.scales.xAxes && this.options.scales.xAxes.length && e.each(this.options.scales.xAxes, function (i, a) {
            var s = e.getValueOrDefault(i.type, "category"),
                o = t.scaleService.getScaleConstructor(s);

            if (o) {
              var n = new o({
                ctx: this.chart.ctx,
                options: i,
                chart: this,
                id: i.id
              });
              this.scales[n.id] = n;
            }
          }, this), this.options.scales.yAxes && this.options.scales.yAxes.length && e.each(this.options.scales.yAxes, function (i, a) {
            var s = e.getValueOrDefault(i.type, "linear"),
                o = t.scaleService.getScaleConstructor(s);

            if (o) {
              var n = new o({
                ctx: this.chart.ctx,
                options: i,
                chart: this,
                id: i.id
              });
              this.scales[n.id] = n;
            }
          }, this)), this.options.scale) {
            var i = t.scaleService.getScaleConstructor(this.options.scale.type);

            if (i) {
              var a = new i({
                ctx: this.chart.ctx,
                options: this.options.scale,
                chart: this
              });
              this.scale = a, this.scales.radialScale = a;
            }
          }

          t.scaleService.addScalesToLayout(this);
        },
        buildSurroundingItems: function buildSurroundingItems() {
          this.options.title && (this.titleBlock = new t.Title({
            ctx: this.chart.ctx,
            options: this.options.title,
            chart: this
          }), t.layoutService.addBox(this, this.titleBlock)), this.options.legend && (this.legend = new t.Legend({
            ctx: this.chart.ctx,
            options: this.options.legend,
            chart: this
          }), t.layoutService.addBox(this, this.legend));
        },
        updateLayout: function updateLayout() {
          t.layoutService.update(this, this.chart.width, this.chart.height);
        },
        buildOrUpdateControllers: function buildOrUpdateControllers() {
          var i = [],
              a = [];
          if (e.each(this.data.datasets, function (e, s) {
            var o = this.getDatasetMeta(s);
            o.type || (o.type = e.type || this.config.type), i.push(o.type), o.controller ? o.controller.updateIndex(s) : (o.controller = new t.controllers[o.type](this, s), a.push(o.controller));
          }, this), i.length > 1) for (var s = 1; s < i.length; s++) {
            if (i[s] !== i[s - 1]) {
              this.isCombo = !0;
              break;
            }
          }
          return a;
        },
        resetElements: function resetElements() {
          e.each(this.data.datasets, function (t, e) {
            this.getDatasetMeta(e).controller.reset();
          }, this);
        },
        update: function update(i, a) {
          t.pluginService.notifyPlugins("beforeUpdate", [this]), this.tooltip._data = this.data;
          var s = this.buildOrUpdateControllers();
          e.each(this.data.datasets, function (t, e) {
            this.getDatasetMeta(e).controller.buildOrUpdateElements();
          }, this), t.layoutService.update(this, this.chart.width, this.chart.height), e.each(s, function (t) {
            t.reset();
          }), e.each(this.data.datasets, function (t, e) {
            this.getDatasetMeta(e).controller.update();
          }, this), this.render(i, a), t.pluginService.notifyPlugins("afterUpdate", [this]);
        },
        render: function render(i, a) {
          if (t.pluginService.notifyPlugins("beforeRender", [this]), this.options.animation && ("undefined" != typeof i && 0 !== i || "undefined" == typeof i && 0 !== this.options.animation.duration)) {
            var s = new t.Animation();
            s.numSteps = (i || this.options.animation.duration) / 16.66, s.easing = this.options.animation.easing, s.render = function (t, i) {
              var a = e.easingEffects[i.easing],
                  s = i.currentStep / i.numSteps,
                  o = a(s);
              t.draw(o, s, i.currentStep);
            }, s.onAnimationProgress = this.options.animation.onProgress, s.onAnimationComplete = this.options.animation.onComplete, t.animationService.addAnimation(this, s, i, a);
          } else this.draw(), this.options.animation && this.options.animation.onComplete && this.options.animation.onComplete.call && this.options.animation.onComplete.call(this);

          return this;
        },
        draw: function draw(i) {
          var a = i || 1;
          this.clear(), t.pluginService.notifyPlugins("beforeDraw", [this, a]), e.each(this.boxes, function (t) {
            t.draw(this.chartArea);
          }, this), this.scale && this.scale.draw(), this.chart.ctx.save(), this.chart.ctx.beginPath(), this.chart.ctx.rect(this.chartArea.left, this.chartArea.top, this.chartArea.right - this.chartArea.left, this.chartArea.bottom - this.chartArea.top), this.chart.ctx.clip(), e.each(this.data.datasets, function (t, e) {
            this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.draw(i);
          }, this, !0), this.chart.ctx.restore(), this.tooltip.transition(a).draw(), t.pluginService.notifyPlugins("afterDraw", [this, a]);
        },
        getElementAtEvent: function getElementAtEvent(t) {
          var i = e.getRelativePosition(t, this.chart),
              a = [];
          return e.each(this.data.datasets, function (t, s) {
            if (this.isDatasetVisible(s)) {
              var o = this.getDatasetMeta(s);
              e.each(o.data, function (t, e) {
                return t.inRange(i.x, i.y) ? (a.push(t), a) : void 0;
              });
            }
          }, this), a;
        },
        getElementsAtEvent: function getElementsAtEvent(t) {
          var i = e.getRelativePosition(t, this.chart),
              a = [],
              s = function () {
            if (this.data.datasets) for (var t = 0; t < this.data.datasets.length; t++) {
              var e = this.getDatasetMeta(t);
              if (this.isDatasetVisible(t)) for (var a = 0; a < e.data.length; a++) {
                if (e.data[a].inRange(i.x, i.y)) return e.data[a];
              }
            }
          }.call(this);

          return s ? (e.each(this.data.datasets, function (t, e) {
            if (this.isDatasetVisible(e)) {
              var i = this.getDatasetMeta(e);
              a.push(i.data[s._index]);
            }
          }, this), a) : a;
        },
        getDatasetAtEvent: function getDatasetAtEvent(t) {
          var e = this.getElementAtEvent(t);
          return e.length > 0 && (e = this.getDatasetMeta(e[0]._datasetIndex).data), e;
        },
        getDatasetMeta: function getDatasetMeta(t) {
          var e = this.data.datasets[t];
          e._meta || (e._meta = {});
          var i = e._meta[this.id];
          return i || (i = e._meta[this.id] = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null
          }), i;
        },
        getVisibleDatasetCount: function getVisibleDatasetCount() {
          for (var t = 0, e = 0, i = this.data.datasets.length; i > e; ++e) {
            this.isDatasetVisible(e) && t++;
          }

          return t;
        },
        isDatasetVisible: function isDatasetVisible(t) {
          var e = this.getDatasetMeta(t);
          return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden;
        },
        generateLegend: function generateLegend() {
          return this.options.legendCallback(this);
        },
        destroy: function destroy() {
          this.clear(), e.unbindEvents(this, this.events), e.removeResizeListener(this.chart.canvas.parentNode);
          var i = this.chart.canvas;
          i.width = this.chart.width, i.height = this.chart.height, void 0 !== this.chart.originalDevicePixelRatio && this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio), i.style.width = this.chart.originalCanvasStyleWidth, i.style.height = this.chart.originalCanvasStyleHeight, t.pluginService.notifyPlugins("destroy", [this]), delete t.instances[this.id];
        },
        toBase64Image: function toBase64Image() {
          return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
        },
        initToolTip: function initToolTip() {
          this.tooltip = new t.Tooltip({
            _chart: this.chart,
            _chartInstance: this,
            _data: this.data,
            _options: this.options
          }, this);
        },
        bindEvents: function bindEvents() {
          e.bindEvents(this, this.options.events, function (t) {
            this.eventHandler(t);
          });
        },
        eventHandler: function eventHandler(t) {
          if (this.lastActive = this.lastActive || [], this.lastTooltipActive = this.lastTooltipActive || [], "mouseout" === t.type) this.active = [], this.tooltipActive = [];else {
            var i = this,
                a = function a(e) {
              switch (e) {
                case "single":
                  return i.getElementAtEvent(t);

                case "label":
                  return i.getElementsAtEvent(t);

                case "dataset":
                  return i.getDatasetAtEvent(t);

                default:
                  return t;
              }
            };

            this.active = a(this.options.hover.mode), this.tooltipActive = a(this.options.tooltips.mode);
          }
          if (this.options.hover.onHover && this.options.hover.onHover.call(this, this.active), ("mouseup" === t.type || "click" === t.type) && (this.options.onClick && this.options.onClick.call(this, t, this.active), this.legend && this.legend.handleEvent && this.legend.handleEvent(t)), this.lastActive.length) switch (this.options.hover.mode) {
            case "single":
              this.getDatasetMeta(this.lastActive[0]._datasetIndex).controller.removeHoverStyle(this.lastActive[0], this.lastActive[0]._datasetIndex, this.lastActive[0]._index);
              break;

            case "label":
            case "dataset":
              for (var s = 0; s < this.lastActive.length; s++) {
                this.lastActive[s] && this.getDatasetMeta(this.lastActive[s]._datasetIndex).controller.removeHoverStyle(this.lastActive[s], this.lastActive[s]._datasetIndex, this.lastActive[s]._index);
              }

          }
          if (this.active.length && this.options.hover.mode) switch (this.options.hover.mode) {
            case "single":
              this.getDatasetMeta(this.active[0]._datasetIndex).controller.setHoverStyle(this.active[0]);
              break;

            case "label":
            case "dataset":
              for (var o = 0; o < this.active.length; o++) {
                this.active[o] && this.getDatasetMeta(this.active[o]._datasetIndex).controller.setHoverStyle(this.active[o]);
              }

          }

          if ((this.options.tooltips.enabled || this.options.tooltips.custom) && (this.tooltip.initialize(), this.tooltip._active = this.tooltipActive, this.tooltip.update()), this.tooltip.pivot(), !this.animating) {
            var n;
            e.each(this.active, function (t, e) {
              t !== this.lastActive[e] && (n = !0);
            }, this), e.each(this.tooltipActive, function (t, e) {
              t !== this.lastTooltipActive[e] && (n = !0);
            }, this), (this.lastActive.length !== this.active.length || this.lastTooltipActive.length !== this.tooltipActive.length || n) && (this.stop(), (this.options.tooltips.enabled || this.options.tooltips.custom) && this.tooltip.update(!0), this.render(this.options.hover.animationDuration, !0));
          }

          return this.lastActive = this.active, this.lastTooltipActive = this.tooltipActive, this;
        }
      });
    };
  }, {}],
  23: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.DatasetController = function (t, e) {
        this.initialize.call(this, t, e);
      }, e.extend(t.DatasetController.prototype, {
        initialize: function initialize(t, e) {
          this.chart = t, this.index = e, this.linkScales(), this.addElements();
        },
        updateIndex: function updateIndex(t) {
          this.index = t;
        },
        linkScales: function linkScales() {
          var t = this.getMeta(),
              e = this.getDataset();
          null === t.xAxisID && (t.xAxisID = e.xAxisID || this.chart.options.scales.xAxes[0].id), null === t.yAxisID && (t.yAxisID = e.yAxisID || this.chart.options.scales.yAxes[0].id);
        },
        getDataset: function getDataset() {
          return this.chart.data.datasets[this.index];
        },
        getMeta: function getMeta() {
          return this.chart.getDatasetMeta(this.index);
        },
        getScaleForId: function getScaleForId(t) {
          return this.chart.scales[t];
        },
        reset: function reset() {
          this.update(!0);
        },
        buildOrUpdateElements: function buildOrUpdateElements() {
          var t = this.getMeta(),
              e = this.getDataset().data.length,
              i = t.data.length;
          if (i > e) t.data.splice(e, i - e);else if (e > i) for (var a = i; e > a; ++a) {
            this.addElementAndReset(a);
          }
        },
        addElements: e.noop,
        addElementAndReset: e.noop,
        draw: e.noop,
        removeHoverStyle: e.noop,
        setHoverStyle: e.noop,
        update: e.noop
      }), t.DatasetController.extend = e.inherits;
    };
  }, {}],
  24: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.elements = {}, t.Element = function (t) {
        e.extend(this, t), this.initialize.apply(this, arguments);
      }, e.extend(t.Element.prototype, {
        initialize: function initialize() {
          this.hidden = !1;
        },
        pivot: function pivot() {
          return this._view || (this._view = e.clone(this._model)), this._start = e.clone(this._view), this;
        },
        transition: function transition(t) {
          return this._view || (this._view = e.clone(this._model)), 1 === t ? (this._view = this._model, this._start = null, this) : (this._start || this.pivot(), e.each(this._model, function (i, a) {
            if ("_" !== a[0] && this._model.hasOwnProperty(a)) {
              if (this._view.hasOwnProperty(a)) {
                if (i === this._view[a]) ;else if ("string" == typeof i) try {
                  var s = e.color(this._start[a]).mix(e.color(this._model[a]), t);
                  this._view[a] = s.rgbString();
                } catch (o) {
                  this._view[a] = i;
                } else if ("number" == typeof i) {
                  var n = void 0 !== this._start[a] && isNaN(this._start[a]) === !1 ? this._start[a] : 0;
                  this._view[a] = (this._model[a] - n) * t + n;
                } else this._view[a] = i;
              } else "number" != typeof i || isNaN(this._view[a]) ? this._view[a] = i : this._view[a] = i * t;
            } else ;
          }, this), this);
        },
        tooltipPosition: function tooltipPosition() {
          return {
            x: this._model.x,
            y: this._model.y
          };
        },
        hasValue: function hasValue() {
          return e.isNumber(this._model.x) && e.isNumber(this._model.y);
        }
      }), t.Element.extend = e.inherits;
    };
  }, {}],
  25: [function (t, e, i) {
    "use strict";

    var a = t("chartjs-color");

    e.exports = function (t) {
      function e(t, e, i) {
        var a;
        return "string" == typeof t ? (a = parseInt(t, 10), -1 != t.indexOf("%") && (a = a / 100 * e.parentNode[i])) : a = t, a;
      }

      function i(t, i, a) {
        var s,
            o = document.defaultView.getComputedStyle(t)[i],
            n = document.defaultView.getComputedStyle(t.parentNode)[i],
            r = null !== o && "none" !== o,
            h = null !== n && "none" !== n;
        return (r || h) && (s = Math.min(r ? e(o, t, a) : Number.POSITIVE_INFINITY, h ? e(n, t.parentNode, a) : Number.POSITIVE_INFINITY)), s;
      }

      var s = t.helpers = {};
      s.each = function (t, e, i, a) {
        var o, n;
        if (s.isArray(t)) {
          if (n = t.length, a) for (o = n - 1; o >= 0; o--) {
            e.call(i, t[o], o);
          } else for (o = 0; n > o; o++) {
            e.call(i, t[o], o);
          }
        } else if ("object" == _typeof(t)) {
          var r = Object.keys(t);

          for (n = r.length, o = 0; n > o; o++) {
            e.call(i, t[r[o]], r[o]);
          }
        }
      }, s.clone = function (t) {
        var e = {};
        return s.each(t, function (i, a) {
          t.hasOwnProperty(a) && (s.isArray(i) ? e[a] = i.slice(0) : "object" == _typeof(i) && null !== i ? e[a] = s.clone(i) : e[a] = i);
        }), e;
      }, s.extend = function (t) {
        for (var e = arguments.length, i = [], a = 1; e > a; a++) {
          i.push(arguments[a]);
        }

        return s.each(i, function (e) {
          s.each(e, function (i, a) {
            e.hasOwnProperty(a) && (t[a] = i);
          });
        }), t;
      }, s.configMerge = function (e) {
        var i = s.clone(e);
        return s.each(Array.prototype.slice.call(arguments, 1), function (e) {
          s.each(e, function (a, o) {
            if (e.hasOwnProperty(o)) if ("scales" === o) i[o] = s.scaleMerge(i.hasOwnProperty(o) ? i[o] : {}, a);else if ("scale" === o) i[o] = s.configMerge(i.hasOwnProperty(o) ? i[o] : {}, t.scaleService.getScaleDefaults(a.type), a);else if (i.hasOwnProperty(o) && s.isArray(i[o]) && s.isArray(a)) {
              var n = i[o];
              s.each(a, function (t, e) {
                e < n.length ? "object" == _typeof(n[e]) && null !== n[e] && "object" == _typeof(t) && null !== t ? n[e] = s.configMerge(n[e], t) : n[e] = t : n.push(t);
              });
            } else i.hasOwnProperty(o) && "object" == _typeof(i[o]) && null !== i[o] && "object" == _typeof(a) ? i[o] = s.configMerge(i[o], a) : i[o] = a;
          });
        }), i;
      }, s.extendDeep = function (t) {
        function e(t) {
          return s.each(arguments, function (i) {
            i !== t && s.each(i, function (i, a) {
              t[a] && t[a].constructor && t[a].constructor === Object ? e(t[a], i) : t[a] = i;
            });
          }), t;
        }

        return e.apply(this, arguments);
      }, s.scaleMerge = function (e, i) {
        var a = s.clone(e);
        return s.each(i, function (e, o) {
          i.hasOwnProperty(o) && ("xAxes" === o || "yAxes" === o ? a.hasOwnProperty(o) ? s.each(e, function (e, i) {
            var n = s.getValueOrDefault(e.type, "xAxes" === o ? "category" : "linear"),
                r = t.scaleService.getScaleDefaults(n);
            i >= a[o].length || !a[o][i].type ? a[o].push(s.configMerge(r, e)) : e.type && e.type !== a[o][i].type ? a[o][i] = s.configMerge(a[o][i], r, e) : a[o][i] = s.configMerge(a[o][i], e);
          }) : (a[o] = [], s.each(e, function (e) {
            var i = s.getValueOrDefault(e.type, "xAxes" === o ? "category" : "linear");
            a[o].push(s.configMerge(t.scaleService.getScaleDefaults(i), e));
          })) : a.hasOwnProperty(o) && "object" == _typeof(a[o]) && null !== a[o] && "object" == _typeof(e) ? a[o] = s.configMerge(a[o], e) : a[o] = e);
        }), a;
      }, s.getValueAtIndexOrDefault = function (t, e, i) {
        return void 0 === t || null === t ? i : s.isArray(t) ? e < t.length ? t[e] : i : t;
      }, s.getValueOrDefault = function (t, e) {
        return void 0 === t ? e : t;
      }, s.indexOf = function (t, e) {
        if (Array.prototype.indexOf) return t.indexOf(e);

        for (var i = 0; i < t.length; i++) {
          if (t[i] === e) return i;
        }

        return -1;
      }, s.where = function (t, e) {
        var i = [];
        return s.each(t, function (t) {
          e(t) && i.push(t);
        }), i;
      }, s.findIndex = function (t, e, i) {
        var a = -1;
        if (Array.prototype.findIndex) a = t.findIndex(e, i);else for (var s = 0; s < t.length; ++s) {
          if (i = void 0 !== i ? i : t, e.call(i, t[s], s, t)) {
            a = s;
            break;
          }
        }
        return a;
      }, s.findNextWhere = function (t, e, i) {
        (void 0 === i || null === i) && (i = -1);

        for (var a = i + 1; a < t.length; a++) {
          var s = t[a];
          if (e(s)) return s;
        }
      }, s.findPreviousWhere = function (t, e, i) {
        (void 0 === i || null === i) && (i = t.length);

        for (var a = i - 1; a >= 0; a--) {
          var s = t[a];
          if (e(s)) return s;
        }
      }, s.inherits = function (t) {
        var e = this,
            i = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
          return e.apply(this, arguments);
        },
            a = function a() {
          this.constructor = i;
        };

        return a.prototype = e.prototype, i.prototype = new a(), i.extend = s.inherits, t && s.extend(i.prototype, t), i.__super__ = e.prototype, i;
      }, s.noop = function () {}, s.uid = function () {
        var t = 0;
        return function () {
          return t++;
        };
      }(), s.warn = function (t) {
        console && "function" == typeof console.warn && console.warn(t);
      }, s.isNumber = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
      }, s.almostEquals = function (t, e, i) {
        return Math.abs(t - e) < i;
      }, s.max = function (t) {
        return t.reduce(function (t, e) {
          return isNaN(e) ? t : Math.max(t, e);
        }, Number.NEGATIVE_INFINITY);
      }, s.min = function (t) {
        return t.reduce(function (t, e) {
          return isNaN(e) ? t : Math.min(t, e);
        }, Number.POSITIVE_INFINITY);
      }, s.sign = function (t) {
        return Math.sign ? Math.sign(t) : (t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1);
      }, s.log10 = function (t) {
        return Math.log10 ? Math.log10(t) : Math.log(t) / Math.LN10;
      }, s.toRadians = function (t) {
        return t * (Math.PI / 180);
      }, s.toDegrees = function (t) {
        return t * (180 / Math.PI);
      }, s.getAngleFromPoint = function (t, e) {
        var i = e.x - t.x,
            a = e.y - t.y,
            s = Math.sqrt(i * i + a * a),
            o = Math.atan2(a, i);
        return o < -.5 * Math.PI && (o += 2 * Math.PI), {
          angle: o,
          distance: s
        };
      }, s.aliasPixel = function (t) {
        return t % 2 === 0 ? 0 : .5;
      }, s.splineCurve = function (t, e, i, a) {
        var s = t.skip ? e : t,
            o = e,
            n = i.skip ? e : i,
            r = Math.sqrt(Math.pow(o.x - s.x, 2) + Math.pow(o.y - s.y, 2)),
            h = Math.sqrt(Math.pow(n.x - o.x, 2) + Math.pow(n.y - o.y, 2)),
            l = r / (r + h),
            c = h / (r + h);
        l = isNaN(l) ? 0 : l, c = isNaN(c) ? 0 : c;
        var d = a * l,
            u = a * c;
        return {
          previous: {
            x: o.x - d * (n.x - s.x),
            y: o.y - d * (n.y - s.y)
          },
          next: {
            x: o.x + u * (n.x - s.x),
            y: o.y + u * (n.y - s.y)
          }
        };
      }, s.nextItem = function (t, e, i) {
        return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1];
      }, s.previousItem = function (t, e, i) {
        return i ? 0 >= e ? t[t.length - 1] : t[e - 1] : 0 >= e ? t[0] : t[e - 1];
      }, s.niceNum = function (t, e) {
        var i,
            a = Math.floor(s.log10(t)),
            o = t / Math.pow(10, a);
        return i = e ? 1.5 > o ? 1 : 3 > o ? 2 : 7 > o ? 5 : 10 : 1 >= o ? 1 : 2 >= o ? 2 : 5 >= o ? 5 : 10, i * Math.pow(10, a);
      };
      var o = s.easingEffects = {
        linear: function linear(t) {
          return t;
        },
        easeInQuad: function easeInQuad(t) {
          return t * t;
        },
        easeOutQuad: function easeOutQuad(t) {
          return -1 * t * (t - 2);
        },
        easeInOutQuad: function easeInOutQuad(t) {
          return (t /= .5) < 1 ? .5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
        easeInCubic: function easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic: function easeOutCubic(t) {
          return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic: function easeInOutCubic(t) {
          return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart: function easeOutQuart(t) {
          return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart: function easeInOutQuart(t) {
          return (t /= .5) < 1 ? .5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function easeInQuint(t) {
          return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint: function easeOutQuint(t) {
          return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint: function easeInOutQuint(t) {
          return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function easeInSine(t) {
          return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function easeOutSine(t) {
          return 1 * Math.sin(t / 1 * (Math.PI / 2));
        },
        easeInOutSine: function easeInOutSine(t) {
          return -0.5 * (Math.cos(Math.PI * t / 1) - 1);
        },
        easeInExpo: function easeInExpo(t) {
          return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo: function easeOutExpo(t) {
          return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
        },
        easeInOutExpo: function easeInOutExpo(t) {
          return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function easeInCirc(t) {
          return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc: function easeOutCirc(t) {
          return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc: function easeInOutCirc(t) {
          return (t /= .5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function easeInElastic(t) {
          var e = 1.70158,
              i = 0,
              a = 1;
          return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (i || (i = .3), a < Math.abs(1) ? (a = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)));
        },
        easeOutElastic: function easeOutElastic(t) {
          var e = 1.70158,
              i = 0,
              a = 1;
          return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (i || (i = .3), a < Math.abs(1) ? (a = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / a), a * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / i) + 1);
        },
        easeInOutElastic: function easeInOutElastic(t) {
          var e = 1.70158,
              i = 0,
              a = 1;
          return 0 === t ? 0 : 2 === (t /= .5) ? 1 : (i || (i = 1 * (.3 * 1.5)), a < Math.abs(1) ? (a = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / a), 1 > t ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)) : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * .5 + 1);
        },
        easeInBack: function easeInBack(t) {
          var e = 1.70158;
          return 1 * (t /= 1) * t * ((e + 1) * t - e);
        },
        easeOutBack: function easeOutBack(t) {
          var e = 1.70158;
          return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1);
        },
        easeInOutBack: function easeInOutBack(t) {
          var e = 1.70158;
          return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
        },
        easeInBounce: function easeInBounce(t) {
          return 1 - o.easeOutBounce(1 - t);
        },
        easeOutBounce: function easeOutBounce(t) {
          return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
        },
        easeInOutBounce: function easeInOutBounce(t) {
          return .5 > t ? .5 * o.easeInBounce(2 * t) : .5 * o.easeOutBounce(2 * t - 1) + .5;
        }
      };
      s.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
          return window.setTimeout(t, 1e3 / 60);
        };
      }(), s.cancelAnimFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (t) {
          return window.clearTimeout(t, 1e3 / 60);
        };
      }(), s.getRelativePosition = function (t, e) {
        var i,
            a,
            o = t.originalEvent || t,
            n = t.currentTarget || t.srcElement,
            r = n.getBoundingClientRect();
        o.touches && o.touches.length > 0 ? (i = o.touches[0].clientX, a = o.touches[0].clientY) : (i = o.clientX, a = o.clientY);
        var h = parseFloat(s.getStyle(n, "padding-left")),
            l = parseFloat(s.getStyle(n, "padding-top")),
            c = parseFloat(s.getStyle(n, "padding-right")),
            d = parseFloat(s.getStyle(n, "padding-bottom")),
            u = r.right - r.left - h - c,
            f = r.bottom - r.top - l - d;
        return i = Math.round((i - r.left - h) / u * n.width / e.currentDevicePixelRatio), a = Math.round((a - r.top - l) / f * n.height / e.currentDevicePixelRatio), {
          x: i,
          y: a
        };
      }, s.addEvent = function (t, e, i) {
        t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i;
      }, s.removeEvent = function (t, e, i) {
        t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = s.noop;
      }, s.bindEvents = function (t, e, i) {
        t.events || (t.events = {}), s.each(e, function (e) {
          t.events[e] = function () {
            i.apply(t, arguments);
          }, s.addEvent(t.chart.canvas, e, t.events[e]);
        });
      }, s.unbindEvents = function (t, e) {
        s.each(e, function (e, i) {
          s.removeEvent(t.chart.canvas, i, e);
        });
      }, s.getConstraintWidth = function (t) {
        return i(t, "max-width", "clientWidth");
      }, s.getConstraintHeight = function (t) {
        return i(t, "max-height", "clientHeight");
      }, s.getMaximumWidth = function (t) {
        var e = t.parentNode,
            i = parseInt(s.getStyle(e, "padding-left")) + parseInt(s.getStyle(e, "padding-right")),
            a = e.clientWidth - i,
            o = s.getConstraintWidth(t);
        return void 0 !== o && (a = Math.min(a, o)), a;
      }, s.getMaximumHeight = function (t) {
        var e = t.parentNode,
            i = parseInt(s.getStyle(e, "padding-top")) + parseInt(s.getStyle(e, "padding-bottom")),
            a = e.clientHeight - i,
            o = s.getConstraintHeight(t);
        return void 0 !== o && (a = Math.min(a, o)), a;
      }, s.getStyle = function (t, e) {
        return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e);
      }, s.retinaScale = function (t) {
        var e = t.ctx,
            i = t.canvas.width,
            a = t.canvas.height,
            s = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
        1 !== s && (e.canvas.height = a * s, e.canvas.width = i * s, e.scale(s, s), t.originalDevicePixelRatio = t.originalDevicePixelRatio || s), e.canvas.style.width = i + "px", e.canvas.style.height = a + "px";
      }, s.clear = function (t) {
        t.ctx.clearRect(0, 0, t.width, t.height);
      }, s.fontString = function (t, e, i) {
        return e + " " + t + "px " + i;
      }, s.longestText = function (t, e, i, a) {
        a = a || {}, a.data = a.data || {}, a.garbageCollect = a.garbageCollect || [], a.font !== e && (a.data = {}, a.garbageCollect = [], a.font = e), t.font = e;
        var o = 0;
        s.each(i, function (e) {
          if (void 0 !== e && null !== e) {
            var i = a.data[e];
            i || (i = a.data[e] = t.measureText(e).width, a.garbageCollect.push(e)), i > o && (o = i);
          }
        });
        var n = a.garbageCollect.length / 2;

        if (n > i.length) {
          for (var r = 0; n > r; r++) {
            delete a.data[a.garbageCollect[r]];
          }

          a.garbageCollect.splice(0, n);
        }

        return o;
      }, s.drawRoundedRectangle = function (t, e, i, a, s, o) {
        t.beginPath(), t.moveTo(e + o, i), t.lineTo(e + a - o, i), t.quadraticCurveTo(e + a, i, e + a, i + o), t.lineTo(e + a, i + s - o), t.quadraticCurveTo(e + a, i + s, e + a - o, i + s), t.lineTo(e + o, i + s), t.quadraticCurveTo(e, i + s, e, i + s - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath();
      }, s.color = function (e) {
        return a ? a(e instanceof CanvasGradient ? t.defaults.global.defaultColor : e) : (console.log("Color.js not found!"), e);
      }, s.addResizeListener = function (t, e) {
        var i = document.createElement("iframe"),
            a = "chartjs-hidden-iframe";
        i.classlist ? i.classlist.add(a) : i.setAttribute("class", a), i.style.width = "100%", i.style.display = "block", i.style.border = 0, i.style.height = 0, i.style.margin = 0, i.style.position = "absolute", i.style.left = 0, i.style.right = 0, i.style.top = 0, i.style.bottom = 0, t.insertBefore(i, t.firstChild), (i.contentWindow || i).onresize = function () {
          e && e();
        };
      }, s.removeResizeListener = function (t) {
        var e = t.querySelector(".chartjs-hidden-iframe");
        e && e.parentNode.removeChild(e);
      }, s.isArray = function (t) {
        return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t);
      }, s.pushAllIfDefined = function (t, e) {
        "undefined" != typeof t && (s.isArray(t) ? e.push.apply(e, t) : e.push(t));
      }, s.callCallback = function (t, e, i) {
        t && "function" == typeof t.call && t.apply(i, e);
      };
    };
  }, {
    "chartjs-color": 5
  }],
  26: [function (t, e, i) {
    "use strict";

    e.exports = function () {
      var t = function t(e, i) {
        this.config = i, e.length && e[0].getContext && (e = e[0]), e.getContext && (e = e.getContext("2d")), this.ctx = e, this.canvas = e.canvas, this.width = e.canvas.width || parseInt(t.helpers.getStyle(e.canvas, "width")) || t.helpers.getMaximumWidth(e.canvas), this.height = e.canvas.height || parseInt(t.helpers.getStyle(e.canvas, "height")) || t.helpers.getMaximumHeight(e.canvas), this.aspectRatio = this.width / this.height, (isNaN(this.aspectRatio) || isFinite(this.aspectRatio) === !1) && (this.aspectRatio = void 0 !== i.aspectRatio ? i.aspectRatio : 2), this.originalCanvasStyleWidth = e.canvas.style.width, this.originalCanvasStyleHeight = e.canvas.style.height, t.helpers.retinaScale(this), i && (this.controller = new t.Controller(this));
        var a = this;
        return t.helpers.addResizeListener(e.canvas.parentNode, function () {
          a.controller && a.controller.config.options.responsive && a.controller.resize();
        }), this.controller ? this.controller : this;
      };

      return t.defaults = {
        global: {
          responsive: !0,
          responsiveAnimationDuration: 0,
          maintainAspectRatio: !0,
          events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
          hover: {
            onHover: null,
            mode: "single",
            animationDuration: 400
          },
          onClick: null,
          defaultColor: "rgba(0,0,0,0.1)",
          defaultFontColor: "#666",
          defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          defaultFontSize: 12,
          defaultFontStyle: "normal",
          showLines: !0,
          elements: {},
          legendCallback: function legendCallback(t) {
            var e = [];
            e.push('<ul class="' + t.id + '-legend">');

            for (var i = 0; i < t.data.datasets.length; i++) {
              e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</li>");
            }

            return e.push("</ul>"), e.join("");
          }
        }
      }, t;
    };
  }, {}],
  27: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.layoutService = {
        defaults: {},
        addBox: function addBox(t, e) {
          t.boxes || (t.boxes = []), t.boxes.push(e);
        },
        removeBox: function removeBox(t, e) {
          t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1);
        },
        update: function update(t, i, a) {
          function s(t) {
            var e,
                i = t.isHorizontal();
            i ? (e = t.update(t.options.fullWidth ? m : k, y), _ -= e.height) : (e = t.update(x, v), k -= e.width), S.push({
              horizontal: i,
              minSize: e,
              box: t
            });
          }

          function o(t) {
            var i = e.findNextWhere(S, function (e) {
              return e.box === t;
            });
            if (i) if (t.isHorizontal()) {
              var a = {
                left: D,
                right: w,
                top: 0,
                bottom: 0
              };
              t.update(t.options.fullWidth ? m : k, p / 2, a);
            } else t.update(i.minSize.width, _);
          }

          function n(t) {
            var i = e.findNextWhere(S, function (e) {
              return e.box === t;
            }),
                a = {
              left: 0,
              right: 0,
              top: M,
              bottom: C
            };
            i && t.update(i.minSize.width, _, a);
          }

          function r(t) {
            t.isHorizontal() ? (t.left = t.options.fullWidth ? h : D, t.right = t.options.fullWidth ? i - h : D + k, t.top = F, t.bottom = F + t.height, F = t.bottom) : (t.left = T, t.right = T + t.width, t.top = M, t.bottom = M + _, T = t.right);
          }

          if (t) {
            var h = 0,
                l = 0,
                c = e.where(t.boxes, function (t) {
              return "left" === t.options.position;
            }),
                d = e.where(t.boxes, function (t) {
              return "right" === t.options.position;
            }),
                u = e.where(t.boxes, function (t) {
              return "top" === t.options.position;
            }),
                f = e.where(t.boxes, function (t) {
              return "bottom" === t.options.position;
            }),
                g = e.where(t.boxes, function (t) {
              return "chartArea" === t.options.position;
            });
            u.sort(function (t, e) {
              return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0);
            }), f.sort(function (t, e) {
              return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0);
            });
            var m = i - 2 * h,
                p = a - 2 * l,
                b = m / 2,
                v = p / 2,
                x = (i - b) / (c.length + d.length),
                y = (a - v) / (u.length + f.length),
                k = m,
                _ = p,
                S = [];
            e.each(c.concat(d, u, f), s);
            var D = h,
                w = h,
                M = l,
                C = l;
            e.each(c.concat(d), o), e.each(c, function (t) {
              D += t.width;
            }), e.each(d, function (t) {
              w += t.width;
            }), e.each(u.concat(f), o), e.each(u, function (t) {
              M += t.height;
            }), e.each(f, function (t) {
              C += t.height;
            }), e.each(c.concat(d), n), D = h, w = h, M = l, C = l, e.each(c, function (t) {
              D += t.width;
            }), e.each(d, function (t) {
              w += t.width;
            }), e.each(u, function (t) {
              M += t.height;
            }), e.each(f, function (t) {
              C += t.height;
            });
            var A = a - M - C,
                I = i - D - w;
            (I !== k || A !== _) && (e.each(c, function (t) {
              t.height = A;
            }), e.each(d, function (t) {
              t.height = A;
            }), e.each(u, function (t) {
              t.options.fullWidth || (t.width = I);
            }), e.each(f, function (t) {
              t.options.fullWidth || (t.width = I);
            }), _ = A, k = I);
            var T = h,
                F = l;
            e.each(c.concat(u), r), T += k, F += _, e.each(d, r), e.each(f, r), t.chartArea = {
              left: D,
              top: M,
              right: D + k,
              bottom: M + _
            }, e.each(g, function (e) {
              e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(k, _);
            });
          }
        }
      };
    };
  }, {}],
  28: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.global.legend = {
        display: !0,
        position: "top",
        fullWidth: !0,
        reverse: !1,
        onClick: function onClick(t, e) {
          var i = e.datasetIndex,
              a = this.chart.getDatasetMeta(i);
          a.hidden = null === a.hidden ? !this.chart.data.datasets[i].hidden : null, this.chart.update();
        },
        labels: {
          boxWidth: 40,
          padding: 10,
          generateLabels: function generateLabels(t) {
            var i = t.data;
            return e.isArray(i.datasets) ? i.datasets.map(function (e, i) {
              return {
                text: e.label,
                fillStyle: e.backgroundColor,
                hidden: !t.isDatasetVisible(i),
                lineCap: e.borderCapStyle,
                lineDash: e.borderDash,
                lineDashOffset: e.borderDashOffset,
                lineJoin: e.borderJoinStyle,
                lineWidth: e.borderWidth,
                strokeStyle: e.borderColor,
                datasetIndex: i
              };
            }, this) : [];
          }
        }
      }, t.Legend = t.Element.extend({
        initialize: function initialize(t) {
          e.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1;
        },
        beforeUpdate: e.noop,
        update: function update(t, e, i) {
          return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize;
        },
        afterUpdate: e.noop,
        beforeSetDimensions: e.noop,
        setDimensions: function setDimensions() {
          this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: e.noop,
        beforeBuildLabels: e.noop,
        buildLabels: function buildLabels() {
          this.legendItems = this.options.labels.generateLabels.call(this, this.chart), this.options.reverse && this.legendItems.reverse();
        },
        afterBuildLabels: e.noop,
        beforeFit: e.noop,
        fit: function fit() {
          var i = this.ctx,
              a = e.getValueOrDefault(this.options.labels.fontSize, t.defaults.global.defaultFontSize),
              s = e.getValueOrDefault(this.options.labels.fontStyle, t.defaults.global.defaultFontStyle),
              o = e.getValueOrDefault(this.options.labels.fontFamily, t.defaults.global.defaultFontFamily),
              n = e.fontString(a, s, o);

          if (this.legendHitBoxes = [], this.isHorizontal() ? this.minSize.width = this.maxWidth : this.minSize.width = this.options.display ? 10 : 0, this.isHorizontal() ? this.minSize.height = this.options.display ? 10 : 0 : this.minSize.height = this.maxHeight, this.options.display && this.isHorizontal()) {
            this.lineWidths = [0];
            var r = this.legendItems.length ? a + this.options.labels.padding : 0;
            i.textAlign = "left", i.textBaseline = "top", i.font = n, e.each(this.legendItems, function (t, e) {
              var s = this.options.labels.boxWidth + a / 2 + i.measureText(t.text).width;
              this.lineWidths[this.lineWidths.length - 1] + s + this.options.labels.padding >= this.width && (r += a + this.options.labels.padding, this.lineWidths[this.lineWidths.length] = this.left), this.legendHitBoxes[e] = {
                left: 0,
                top: 0,
                width: s,
                height: a
              }, this.lineWidths[this.lineWidths.length - 1] += s + this.options.labels.padding;
            }, this), this.minSize.height += r;
          }

          this.width = this.minSize.width, this.height = this.minSize.height;
        },
        afterFit: e.noop,
        isHorizontal: function isHorizontal() {
          return "top" === this.options.position || "bottom" === this.options.position;
        },
        draw: function draw() {
          if (this.options.display) {
            var i = this.ctx,
                a = {
              x: this.left + (this.width - this.lineWidths[0]) / 2,
              y: this.top + this.options.labels.padding,
              line: 0
            },
                s = e.getValueOrDefault(this.options.labels.fontColor, t.defaults.global.defaultFontColor),
                o = e.getValueOrDefault(this.options.labels.fontSize, t.defaults.global.defaultFontSize),
                n = e.getValueOrDefault(this.options.labels.fontStyle, t.defaults.global.defaultFontStyle),
                r = e.getValueOrDefault(this.options.labels.fontFamily, t.defaults.global.defaultFontFamily),
                h = e.fontString(o, n, r);
            this.isHorizontal() && (i.textAlign = "left", i.textBaseline = "top", i.lineWidth = .5, i.strokeStyle = s, i.fillStyle = s, i.font = h, e.each(this.legendItems, function (e, s) {
              var n = i.measureText(e.text).width,
                  r = this.options.labels.boxWidth + o / 2 + n;
              a.x + r >= this.width && (a.y += o + this.options.labels.padding, a.line++, a.x = this.left + (this.width - this.lineWidths[a.line]) / 2), i.save();

              var h = function h(t, e) {
                return void 0 !== t ? t : e;
              };

              i.fillStyle = h(e.fillStyle, t.defaults.global.defaultColor), i.lineCap = h(e.lineCap, t.defaults.global.elements.line.borderCapStyle), i.lineDashOffset = h(e.lineDashOffset, t.defaults.global.elements.line.borderDashOffset), i.lineJoin = h(e.lineJoin, t.defaults.global.elements.line.borderJoinStyle), i.lineWidth = h(e.lineWidth, t.defaults.global.elements.line.borderWidth), i.strokeStyle = h(e.strokeStyle, t.defaults.global.defaultColor), i.setLineDash && i.setLineDash(h(e.lineDash, t.defaults.global.elements.line.borderDash)), i.strokeRect(a.x, a.y, this.options.labels.boxWidth, o), i.fillRect(a.x, a.y, this.options.labels.boxWidth, o), i.restore(), this.legendHitBoxes[s].left = a.x, this.legendHitBoxes[s].top = a.y, i.fillText(e.text, this.options.labels.boxWidth + o / 2 + a.x, a.y), e.hidden && (i.beginPath(), i.lineWidth = 2, i.moveTo(this.options.labels.boxWidth + o / 2 + a.x, a.y + o / 2), i.lineTo(this.options.labels.boxWidth + o / 2 + a.x + n, a.y + o / 2), i.stroke()), a.x += r + this.options.labels.padding;
            }, this));
          }
        },
        handleEvent: function handleEvent(t) {
          var i = e.getRelativePosition(t, this.chart.chart);
          if (i.x >= this.left && i.x <= this.right && i.y >= this.top && i.y <= this.bottom) for (var a = 0; a < this.legendHitBoxes.length; ++a) {
            var s = this.legendHitBoxes[a];

            if (i.x >= s.left && i.x <= s.left + s.width && i.y >= s.top && i.y <= s.top + s.height) {
              this.options.onClick && this.options.onClick.call(this, t, this.legendItems[a]);
              break;
            }
          }
        }
      });
    };
  }, {}],
  29: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.plugins = [], t.pluginService = {
        register: function register(e) {
          -1 === t.plugins.indexOf(e) && t.plugins.push(e);
        },
        remove: function remove(e) {
          var i = t.plugins.indexOf(e);
          -1 !== i && t.plugins.splice(i, 1);
        },
        notifyPlugins: function notifyPlugins(i, a, s) {
          e.each(t.plugins, function (t) {
            t[i] && "function" == typeof t[i] && t[i].apply(s, a);
          }, s);
        }
      }, t.PluginBase = t.Element.extend({
        beforeInit: e.noop,
        afterInit: e.noop,
        beforeUpdate: e.noop,
        afterUpdate: e.noop,
        beforeDraw: e.noop,
        afterDraw: e.noop,
        destroy: e.noop
      });
    };
  }, {}],
  30: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.scale = {
        display: !0,
        position: "left",
        gridLines: {
          display: !0,
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1,
          drawOnChartArea: !0,
          drawTicks: !0,
          tickMarkLength: 10,
          zeroLineWidth: 1,
          zeroLineColor: "rgba(0,0,0,0.25)",
          offsetGridLines: !1
        },
        scaleLabel: {
          labelString: "",
          display: !1
        },
        ticks: {
          beginAtZero: !1,
          maxRotation: 50,
          mirror: !1,
          padding: 10,
          reverse: !1,
          display: !0,
          autoSkip: !0,
          autoSkipPadding: 0,
          callback: function callback(t) {
            return "" + t;
          }
        }
      }, t.Scale = t.Element.extend({
        beforeUpdate: function beforeUpdate() {
          e.callCallback(this.options.beforeUpdate, [this]);
        },
        update: function update(t, i, a) {
          return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = i, this.margins = e.extend({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, a), this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this.beforeBuildTicks(), this.buildTicks(), this.afterBuildTicks(), this.beforeTickToLabelConversion(), this.convertTicksToLabels(), this.afterTickToLabelConversion(), this.beforeCalculateTickRotation(), this.calculateTickRotation(), this.afterCalculateTickRotation(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize;
        },
        afterUpdate: function afterUpdate() {
          e.callCallback(this.options.afterUpdate, [this]);
        },
        beforeSetDimensions: function beforeSetDimensions() {
          e.callCallback(this.options.beforeSetDimensions, [this]);
        },
        setDimensions: function setDimensions() {
          this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
        },
        afterSetDimensions: function afterSetDimensions() {
          e.callCallback(this.options.afterSetDimensions, [this]);
        },
        beforeDataLimits: function beforeDataLimits() {
          e.callCallback(this.options.beforeDataLimits, [this]);
        },
        determineDataLimits: e.noop,
        afterDataLimits: function afterDataLimits() {
          e.callCallback(this.options.afterDataLimits, [this]);
        },
        beforeBuildTicks: function beforeBuildTicks() {
          e.callCallback(this.options.beforeBuildTicks, [this]);
        },
        buildTicks: e.noop,
        afterBuildTicks: function afterBuildTicks() {
          e.callCallback(this.options.afterBuildTicks, [this]);
        },
        beforeTickToLabelConversion: function beforeTickToLabelConversion() {
          e.callCallback(this.options.beforeTickToLabelConversion, [this]);
        },
        convertTicksToLabels: function convertTicksToLabels() {
          this.ticks = this.ticks.map(function (t, e, i) {
            return this.options.ticks.userCallback ? this.options.ticks.userCallback(t, e, i) : this.options.ticks.callback(t, e, i);
          }, this);
        },
        afterTickToLabelConversion: function afterTickToLabelConversion() {
          e.callCallback(this.options.afterTickToLabelConversion, [this]);
        },
        beforeCalculateTickRotation: function beforeCalculateTickRotation() {
          e.callCallback(this.options.beforeCalculateTickRotation, [this]);
        },
        calculateTickRotation: function calculateTickRotation() {
          var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
              a = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
              s = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
              o = e.fontString(i, a, s);
          this.ctx.font = o;
          var n,
              r = this.ctx.measureText(this.ticks[0]).width,
              h = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;

          if (this.labelRotation = 0, this.paddingRight = 0, this.paddingLeft = 0, this.options.display && this.isHorizontal()) {
            this.paddingRight = h / 2 + 3, this.paddingLeft = r / 2 + 3, this.longestTextCache || (this.longestTextCache = {});

            for (var l, c, d = e.longestText(this.ctx, o, this.ticks, this.longestTextCache), u = d, f = this.getPixelForTick(1) - this.getPixelForTick(0) - 6; u > f && this.labelRotation < this.options.ticks.maxRotation;) {
              if (l = Math.cos(e.toRadians(this.labelRotation)), c = Math.sin(e.toRadians(this.labelRotation)), n = l * r, n + i / 2 > this.yLabelWidth && (this.paddingLeft = n + i / 2), this.paddingRight = i / 2, c * d > this.maxHeight) {
                this.labelRotation--;
                break;
              }

              this.labelRotation++, u = l * d;
            }
          }

          this.margins && (this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0), this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0));
        },
        afterCalculateTickRotation: function afterCalculateTickRotation() {
          e.callCallback(this.options.afterCalculateTickRotation, [this]);
        },
        beforeFit: function beforeFit() {
          e.callCallback(this.options.beforeFit, [this]);
        },
        fit: function fit() {
          this.minSize = {
            width: 0,
            height: 0
          };
          var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
              a = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
              s = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
              o = e.fontString(i, a, s),
              n = e.getValueOrDefault(this.options.scaleLabel.fontSize, t.defaults.global.defaultFontSize),
              r = e.getValueOrDefault(this.options.scaleLabel.fontStyle, t.defaults.global.defaultFontStyle),
              h = e.getValueOrDefault(this.options.scaleLabel.fontFamily, t.defaults.global.defaultFontFamily);
          e.fontString(n, r, h);

          if (this.isHorizontal() ? this.minSize.width = this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth : this.minSize.width = this.options.gridLines.tickMarkLength, this.isHorizontal() ? this.minSize.height = this.options.gridLines.tickMarkLength : this.minSize.height = this.maxHeight, this.options.scaleLabel.display && (this.isHorizontal() ? this.minSize.height += 1.5 * n : this.minSize.width += 1.5 * n), this.options.ticks.display && this.options.display) {
            this.longestTextCache || (this.longestTextCache = {});
            var l = e.longestText(this.ctx, o, this.ticks, this.longestTextCache);

            if (this.isHorizontal()) {
              this.longestLabelWidth = l;
              var c = Math.sin(e.toRadians(this.labelRotation)) * this.longestLabelWidth + 1.5 * i;
              this.minSize.height = Math.min(this.maxHeight, this.minSize.height + c), this.ctx.font = o;
              var d = this.ctx.measureText(this.ticks[0]).width,
                  u = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width,
                  f = Math.cos(e.toRadians(this.labelRotation)),
                  g = Math.sin(e.toRadians(this.labelRotation));
              this.paddingLeft = 0 !== this.labelRotation ? f * d + 3 : d / 2 + 3, this.paddingRight = 0 !== this.labelRotation ? g * (i / 2) + 3 : u / 2 + 3;
            } else {
              var m = this.maxWidth - this.minSize.width;
              this.options.ticks.mirror || (l += this.options.ticks.padding), m > l ? this.minSize.width += l : this.minSize.width = this.maxWidth, this.paddingTop = i / 2, this.paddingBottom = i / 2;
            }
          }

          this.margins && (this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0), this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0), this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0), this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0)), this.width = this.minSize.width, this.height = this.minSize.height;
        },
        afterFit: function afterFit() {
          e.callCallback(this.options.afterFit, [this]);
        },
        isHorizontal: function isHorizontal() {
          return "top" === this.options.position || "bottom" === this.options.position;
        },
        isFullWidth: function isFullWidth() {
          return this.options.fullWidth;
        },
        getRightValue: function i(t) {
          return null === t || "undefined" == typeof t ? NaN : "number" == typeof t && isNaN(t) ? NaN : "object" == _typeof(t) ? t instanceof Date ? t : i(this.isHorizontal() ? t.x : t.y) : t;
        },
        getLabelForIndex: e.noop,
        getPixelForValue: e.noop,
        getValueForPixel: e.noop,
        getPixelForTick: function getPixelForTick(t, e) {
          if (this.isHorizontal()) {
            var i = this.width - (this.paddingLeft + this.paddingRight),
                a = i / Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
                s = a * t + this.paddingLeft;
            e && (s += a / 2);
            var o = this.left + Math.round(s);
            return o += this.isFullWidth() ? this.margins.left : 0;
          }

          var n = this.height - (this.paddingTop + this.paddingBottom);
          return this.top + t * (n / (this.ticks.length - 1));
        },
        getPixelForDecimal: function getPixelForDecimal(t) {
          if (this.isHorizontal()) {
            var e = this.width - (this.paddingLeft + this.paddingRight),
                i = e * t + this.paddingLeft,
                a = this.left + Math.round(i);
            return a += this.isFullWidth() ? this.margins.left : 0;
          }

          return this.top + t * this.height;
        },
        draw: function draw(i) {
          if (this.options.display) {
            var a,
                s,
                o,
                n,
                r,
                h = 0 !== this.labelRotation,
                l = this.options.ticks.autoSkip;
            this.options.ticks.maxTicksLimit && (r = this.options.ticks.maxTicksLimit);

            var c = e.getValueOrDefault(this.options.ticks.fontColor, t.defaults.global.defaultFontColor),
                d = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                u = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                f = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                g = e.fontString(d, u, f),
                m = this.options.gridLines.tickMarkLength,
                p = e.getValueOrDefault(this.options.scaleLabel.fontColor, t.defaults.global.defaultFontColor),
                b = e.getValueOrDefault(this.options.scaleLabel.fontSize, t.defaults.global.defaultFontSize),
                v = e.getValueOrDefault(this.options.scaleLabel.fontStyle, t.defaults.global.defaultFontStyle),
                x = e.getValueOrDefault(this.options.scaleLabel.fontFamily, t.defaults.global.defaultFontFamily),
                y = e.fontString(b, v, x),
                k = Math.cos(e.toRadians(this.labelRotation)),
                _ = (Math.sin(e.toRadians(this.labelRotation)), this.longestLabelWidth * k);

            if (this.ctx.fillStyle = c, this.isHorizontal()) {
              a = !0;
              var S = "bottom" === this.options.position ? this.top : this.bottom - m,
                  D = "bottom" === this.options.position ? this.top + m : this.bottom;
              if (s = !1, (_ / 2 + this.options.ticks.autoSkipPadding) * this.ticks.length > this.width - (this.paddingLeft + this.paddingRight) && (s = 1 + Math.floor((_ / 2 + this.options.ticks.autoSkipPadding) * this.ticks.length / (this.width - (this.paddingLeft + this.paddingRight)))), r && this.ticks.length > r) for (; !s || this.ticks.length / (s || 1) > r;) {
                s || (s = 1), s += 1;
              }
              l || (s = !1), e.each(this.ticks, function (t, o) {
                var n = this.ticks.length === o + 1,
                    r = s > 1 && o % s > 0 || o % s === 0 && o + s > this.ticks.length;

                if ((!r || n) && void 0 !== t && null !== t) {
                  var l = this.getPixelForTick(o),
                      c = this.getPixelForTick(o, this.options.gridLines.offsetGridLines);
                  this.options.gridLines.display && (o === ("undefined" != typeof this.zeroLineIndex ? this.zeroLineIndex : 0) ? (this.ctx.lineWidth = this.options.gridLines.zeroLineWidth, this.ctx.strokeStyle = this.options.gridLines.zeroLineColor, a = !0) : a && (this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color, a = !1), l += e.aliasPixel(this.ctx.lineWidth), this.ctx.beginPath(), this.options.gridLines.drawTicks && (this.ctx.moveTo(l, S), this.ctx.lineTo(l, D)), this.options.gridLines.drawOnChartArea && (this.ctx.moveTo(l, i.top), this.ctx.lineTo(l, i.bottom)), this.ctx.stroke()), this.options.ticks.display && (this.ctx.save(), this.ctx.translate(c, h ? this.top + 12 : "top" === this.options.position ? this.bottom - m : this.top + m), this.ctx.rotate(-1 * e.toRadians(this.labelRotation)), this.ctx.font = g, this.ctx.textAlign = h ? "right" : "center", this.ctx.textBaseline = h ? "middle" : "top" === this.options.position ? "bottom" : "top", this.ctx.fillText(t, 0, 0), this.ctx.restore());
                }
              }, this), this.options.scaleLabel.display && (this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.ctx.fillStyle = p, this.ctx.font = y, o = this.left + (this.right - this.left) / 2, n = "bottom" === this.options.position ? this.bottom - b / 2 : this.top + b / 2, this.ctx.fillText(this.options.scaleLabel.labelString, o, n));
            } else {
              a = !0;
              var w = "right" === this.options.position ? this.left : this.right - 5,
                  M = "right" === this.options.position ? this.left + 5 : this.right;

              if (e.each(this.ticks, function (t, s) {
                if (void 0 !== t && null !== t) {
                  var o = this.getPixelForTick(s);

                  if (this.options.gridLines.display && (s === ("undefined" != typeof this.zeroLineIndex ? this.zeroLineIndex : 0) ? (this.ctx.lineWidth = this.options.gridLines.zeroLineWidth, this.ctx.strokeStyle = this.options.gridLines.zeroLineColor, a = !0) : a && (this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color, a = !1), o += e.aliasPixel(this.ctx.lineWidth), this.ctx.beginPath(), this.options.gridLines.drawTicks && (this.ctx.moveTo(w, o), this.ctx.lineTo(M, o)), this.options.gridLines.drawOnChartArea && (this.ctx.moveTo(i.left, o), this.ctx.lineTo(i.right, o)), this.ctx.stroke()), this.options.ticks.display) {
                    var n,
                        r = this.getPixelForTick(s, this.options.gridLines.offsetGridLines);
                    this.ctx.save(), "left" === this.options.position ? this.options.ticks.mirror ? (n = this.right + this.options.ticks.padding, this.ctx.textAlign = "left") : (n = this.right - this.options.ticks.padding, this.ctx.textAlign = "right") : this.options.ticks.mirror ? (n = this.left - this.options.ticks.padding, this.ctx.textAlign = "right") : (n = this.left + this.options.ticks.padding, this.ctx.textAlign = "left"), this.ctx.translate(n, r), this.ctx.rotate(-1 * e.toRadians(this.labelRotation)), this.ctx.font = g, this.ctx.textBaseline = "middle", this.ctx.fillText(t, 0, 0), this.ctx.restore();
                  }
                }
              }, this), this.options.scaleLabel.display) {
                o = "left" === this.options.position ? this.left + b / 2 : this.right - b / 2, n = this.top + (this.bottom - this.top) / 2;
                var C = "left" === this.options.position ? -.5 * Math.PI : .5 * Math.PI;
                this.ctx.save(), this.ctx.translate(o, n), this.ctx.rotate(C), this.ctx.textAlign = "center", this.ctx.fillStyle = p, this.ctx.font = y, this.ctx.textBaseline = "middle", this.ctx.fillText(this.options.scaleLabel.labelString, 0, 0), this.ctx.restore();
              }
            }

            this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color;
            var A = this.left,
                I = this.right,
                T = this.top,
                F = this.bottom;
            this.isHorizontal() ? (T = F = "top" === this.options.position ? this.bottom : this.top, T += e.aliasPixel(this.ctx.lineWidth), F += e.aliasPixel(this.ctx.lineWidth)) : (A = I = "left" === this.options.position ? this.right : this.left, A += e.aliasPixel(this.ctx.lineWidth), I += e.aliasPixel(this.ctx.lineWidth)), this.ctx.beginPath(), this.ctx.moveTo(A, T), this.ctx.lineTo(I, F), this.ctx.stroke();
          }
        }
      });
    };
  }, {}],
  31: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.scaleService = {
        constructors: {},
        defaults: {},
        registerScaleType: function registerScaleType(t, i, a) {
          this.constructors[t] = i, this.defaults[t] = e.clone(a);
        },
        getScaleConstructor: function getScaleConstructor(t) {
          return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0;
        },
        getScaleDefaults: function getScaleDefaults(i) {
          return this.defaults.hasOwnProperty(i) ? e.scaleMerge(t.defaults.scale, this.defaults[i]) : {};
        },
        addScalesToLayout: function addScalesToLayout(i) {
          e.each(i.scales, function (e) {
            t.layoutService.addBox(i, e);
          });
        }
      };
    };
  }, {}],
  32: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.global.title = {
        display: !1,
        position: "top",
        fullWidth: !0,
        fontStyle: "bold",
        padding: 10,
        text: ""
      }, t.Title = t.Element.extend({
        initialize: function initialize(i) {
          e.extend(this, i), this.options = e.configMerge(t.defaults.global.title, i.options), this.legendHitBoxes = [];
        },
        beforeUpdate: e.noop,
        update: function update(t, e, i) {
          return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize;
        },
        afterUpdate: e.noop,
        beforeSetDimensions: e.noop,
        setDimensions: function setDimensions() {
          this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: e.noop,
        beforeBuildLabels: e.noop,
        buildLabels: e.noop,
        afterBuildLabels: e.noop,
        beforeFit: e.noop,
        fit: function fit() {
          var i = (this.ctx, e.getValueOrDefault(this.options.fontSize, t.defaults.global.defaultFontSize)),
              a = e.getValueOrDefault(this.options.fontStyle, t.defaults.global.defaultFontStyle),
              s = e.getValueOrDefault(this.options.fontFamily, t.defaults.global.defaultFontFamily);
          e.fontString(i, a, s);
          this.isHorizontal() ? this.minSize.width = this.maxWidth : this.minSize.width = 0, this.isHorizontal() ? this.minSize.height = 0 : this.minSize.height = this.maxHeight, this.isHorizontal() ? this.options.display && (this.minSize.height += i + 2 * this.options.padding) : this.options.display && (this.minSize.width += i + 2 * this.options.padding), this.width = this.minSize.width, this.height = this.minSize.height;
        },
        afterFit: e.noop,
        isHorizontal: function isHorizontal() {
          return "top" === this.options.position || "bottom" === this.options.position;
        },
        draw: function draw() {
          if (this.options.display) {
            var i,
                a,
                s = this.ctx,
                o = e.getValueOrDefault(this.options.fontColor, t.defaults.global.defaultFontColor),
                n = e.getValueOrDefault(this.options.fontSize, t.defaults.global.defaultFontSize),
                r = e.getValueOrDefault(this.options.fontStyle, t.defaults.global.defaultFontStyle),
                h = e.getValueOrDefault(this.options.fontFamily, t.defaults.global.defaultFontFamily),
                l = e.fontString(n, r, h);
            if (s.fillStyle = o, s.font = l, this.isHorizontal()) s.textAlign = "center", s.textBaseline = "middle", i = this.left + (this.right - this.left) / 2, a = this.top + (this.bottom - this.top) / 2, s.fillText(this.options.text, i, a);else {
              i = "left" === this.options.position ? this.left + n / 2 : this.right - n / 2, a = this.top + (this.bottom - this.top) / 2;
              var c = "left" === this.options.position ? -.5 * Math.PI : .5 * Math.PI;
              s.save(), s.translate(i, a), s.rotate(c), s.textAlign = "center", s.textBaseline = "middle", s.fillText(this.options.text, 0, 0), s.restore();
            }
          }
        }
      });
    };
  }, {}],
  33: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      function e(t, e) {
        return e && (i.isArray(e) ? t = t.concat(e) : t.push(e)), t;
      }

      var i = t.helpers;
      t.defaults.global.tooltips = {
        enabled: !0,
        custom: null,
        mode: "single",
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontStyle: "bold",
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleColor: "#fff",
        titleAlign: "left",
        bodySpacing: 2,
        bodyColor: "#fff",
        bodyAlign: "left",
        footerFontStyle: "bold",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerColor: "#fff",
        footerAlign: "left",
        yPadding: 6,
        xPadding: 6,
        yAlign: "center",
        xAlign: "center",
        caretSize: 5,
        cornerRadius: 6,
        multiKeyBackground: "#fff",
        callbacks: {
          beforeTitle: i.noop,
          title: function title(t, e) {
            var i = "";
            return t.length > 0 && (t[0].xLabel ? i = t[0].xLabel : e.labels.length > 0 && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i;
          },
          afterTitle: i.noop,
          beforeBody: i.noop,
          beforeLabel: i.noop,
          label: function label(t, e) {
            var i = e.datasets[t.datasetIndex].label || "";
            return i + ": " + t.yLabel;
          },
          afterLabel: i.noop,
          afterBody: i.noop,
          beforeFooter: i.noop,
          footer: i.noop,
          afterFooter: i.noop
        }
      }, t.Tooltip = t.Element.extend({
        initialize: function initialize() {
          var e = this._options;
          i.extend(this, {
            _model: {
              xPadding: e.tooltips.xPadding,
              yPadding: e.tooltips.yPadding,
              xAlign: e.tooltips.yAlign,
              yAlign: e.tooltips.xAlign,
              bodyColor: e.tooltips.bodyColor,
              _bodyFontFamily: i.getValueOrDefault(e.tooltips.bodyFontFamily, t.defaults.global.defaultFontFamily),
              _bodyFontStyle: i.getValueOrDefault(e.tooltips.bodyFontStyle, t.defaults.global.defaultFontStyle),
              _bodyAlign: e.tooltips.bodyAlign,
              bodyFontSize: i.getValueOrDefault(e.tooltips.bodyFontSize, t.defaults.global.defaultFontSize),
              bodySpacing: e.tooltips.bodySpacing,
              titleColor: e.tooltips.titleColor,
              _titleFontFamily: i.getValueOrDefault(e.tooltips.titleFontFamily, t.defaults.global.defaultFontFamily),
              _titleFontStyle: i.getValueOrDefault(e.tooltips.titleFontStyle, t.defaults.global.defaultFontStyle),
              titleFontSize: i.getValueOrDefault(e.tooltips.titleFontSize, t.defaults.global.defaultFontSize),
              _titleAlign: e.tooltips.titleAlign,
              titleSpacing: e.tooltips.titleSpacing,
              titleMarginBottom: e.tooltips.titleMarginBottom,
              footerColor: e.tooltips.footerColor,
              _footerFontFamily: i.getValueOrDefault(e.tooltips.footerFontFamily, t.defaults.global.defaultFontFamily),
              _footerFontStyle: i.getValueOrDefault(e.tooltips.footerFontStyle, t.defaults.global.defaultFontStyle),
              footerFontSize: i.getValueOrDefault(e.tooltips.footerFontSize, t.defaults.global.defaultFontSize),
              _footerAlign: e.tooltips.footerAlign,
              footerSpacing: e.tooltips.footerSpacing,
              footerMarginTop: e.tooltips.footerMarginTop,
              caretSize: e.tooltips.caretSize,
              cornerRadius: e.tooltips.cornerRadius,
              backgroundColor: e.tooltips.backgroundColor,
              opacity: 0,
              legendColorBackground: e.tooltips.multiKeyBackground
            }
          });
        },
        getTitle: function getTitle() {
          var t = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments),
              i = this._options.tooltips.callbacks.title.apply(this, arguments),
              a = this._options.tooltips.callbacks.afterTitle.apply(this, arguments),
              s = [];

          return s = e(s, t), s = e(s, i), s = e(s, a);
        },
        getBeforeBody: function getBeforeBody() {
          var t = this._options.tooltips.callbacks.beforeBody.apply(this, arguments);

          return i.isArray(t) ? t : void 0 !== t ? [t] : [];
        },
        getBody: function getBody(t, e) {
          var a = [];
          return i.each(t, function (t) {
            i.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this, t, e), a), i.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this, t, e), a), i.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this, t, e), a);
          }, this), a;
        },
        getAfterBody: function getAfterBody() {
          var t = this._options.tooltips.callbacks.afterBody.apply(this, arguments);

          return i.isArray(t) ? t : void 0 !== t ? [t] : [];
        },
        getFooter: function getFooter() {
          var t = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments),
              i = this._options.tooltips.callbacks.footer.apply(this, arguments),
              a = this._options.tooltips.callbacks.afterFooter.apply(this, arguments),
              s = [];

          return s = e(s, t), s = e(s, i), s = e(s, a);
        },
        getAveragePosition: function getAveragePosition(t) {
          if (!t.length) return !1;
          var e = [],
              a = [];
          i.each(t, function (t) {
            if (t) {
              var i = t.tooltipPosition();
              e.push(i.x), a.push(i.y);
            }
          });

          for (var s = 0, o = 0, n = 0; n < e.length; n++) {
            s += e[n], o += a[n];
          }

          return {
            x: Math.round(s / e.length),
            y: Math.round(o / e.length)
          };
        },
        update: function update(t) {
          if (this._active.length) {
            this._model.opacity = 1;
            var e,
                a = this._active[0],
                s = [],
                o = [];

            if ("single" === this._options.tooltips.mode) {
              var n = a._yScale || a._scale;
              o.push({
                xLabel: a._xScale ? a._xScale.getLabelForIndex(a._index, a._datasetIndex) : "",
                yLabel: n ? n.getLabelForIndex(a._index, a._datasetIndex) : "",
                index: a._index,
                datasetIndex: a._datasetIndex
              }), e = this.getAveragePosition(this._active);
            } else i.each(this._data.datasets, function (t, e) {
              if (this._chartInstance.isDatasetVisible(e)) {
                var i = this._chartInstance.getDatasetMeta(e),
                    s = i.data[a._index];

                if (s) {
                  var n = a._yScale || a._scale;
                  o.push({
                    xLabel: s._xScale ? s._xScale.getLabelForIndex(s._index, s._datasetIndex) : "",
                    yLabel: n ? n.getLabelForIndex(s._index, s._datasetIndex) : "",
                    index: a._index,
                    datasetIndex: e
                  });
                }
              }
            }, this), i.each(this._active, function (t) {
              t && s.push({
                borderColor: t._view.borderColor,
                backgroundColor: t._view.backgroundColor
              });
            }, null), e = this.getAveragePosition(this._active);

            i.extend(this._model, {
              title: this.getTitle(o, this._data),
              beforeBody: this.getBeforeBody(o, this._data),
              body: this.getBody(o, this._data),
              afterBody: this.getAfterBody(o, this._data),
              footer: this.getFooter(o, this._data)
            }), i.extend(this._model, {
              x: Math.round(e.x),
              y: Math.round(e.y),
              caretPadding: i.getValueOrDefault(e.padding, 2),
              labelColors: s
            });
            var r = this.getTooltipSize(this._model);
            this.determineAlignment(r), i.extend(this._model, this.getBackgroundPoint(this._model, r));
          } else this._model.opacity = 0;

          return t && this._options.tooltips.custom && this._options.tooltips.custom.call(this, this._model), this;
        },
        getTooltipSize: function getTooltipSize(t) {
          var e = this._chart.ctx,
              a = {
            height: 2 * t.yPadding,
            width: 0
          },
              s = t.body.length + t.beforeBody.length + t.afterBody.length;
          return a.height += t.title.length * t.titleFontSize, a.height += (t.title.length - 1) * t.titleSpacing, a.height += t.title.length ? t.titleMarginBottom : 0, a.height += s * t.bodyFontSize, a.height += s ? (s - 1) * t.bodySpacing : 0, a.height += t.footer.length ? t.footerMarginTop : 0, a.height += t.footer.length * t.footerFontSize, a.height += t.footer.length ? (t.footer.length - 1) * t.footerSpacing : 0, e.font = i.fontString(t.titleFontSize, t._titleFontStyle, t._titleFontFamily), i.each(t.title, function (t) {
            a.width = Math.max(a.width, e.measureText(t).width);
          }), e.font = i.fontString(t.bodyFontSize, t._bodyFontStyle, t._bodyFontFamily), i.each(t.beforeBody.concat(t.afterBody), function (t) {
            a.width = Math.max(a.width, e.measureText(t).width);
          }), i.each(t.body, function (i) {
            a.width = Math.max(a.width, e.measureText(i).width + ("single" !== this._options.tooltips.mode ? t.bodyFontSize + 2 : 0));
          }, this), e.font = i.fontString(t.footerFontSize, t._footerFontStyle, t._footerFontFamily), i.each(t.footer, function (t) {
            a.width = Math.max(a.width, e.measureText(t).width);
          }), a.width += 2 * t.xPadding, a;
        },
        determineAlignment: function determineAlignment(t) {
          this._model.y < t.height ? this._model.yAlign = "top" : this._model.y > this._chart.height - t.height && (this._model.yAlign = "bottom");
          var e,
              i,
              a,
              s,
              o,
              n = this,
              r = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2,
              h = (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2;
          "center" === this._model.yAlign ? (e = function e(t) {
            return r >= t;
          }, i = function i(t) {
            return t > r;
          }) : (e = function e(_e2) {
            return _e2 <= t.width / 2;
          }, i = function i(e) {
            return e >= n._chart.width - t.width / 2;
          }), a = function a(e) {
            return e + t.width > n._chart.width;
          }, s = function s(e) {
            return e - t.width < 0;
          }, o = function o(t) {
            return h >= t ? "top" : "bottom";
          }, e(this._model.x) ? (this._model.xAlign = "left", a(this._model.x) && (this._model.xAlign = "center", this._model.yAlign = o(this._model.y))) : i(this._model.x) && (this._model.xAlign = "right", s(this._model.x) && (this._model.xAlign = "center", this._model.yAlign = o(this._model.y)));
        },
        getBackgroundPoint: function getBackgroundPoint(t, e) {
          var i = {
            x: t.x,
            y: t.y
          };
          return "right" === t.xAlign ? i.x -= e.width : "center" === t.xAlign && (i.x -= e.width / 2), "top" === t.yAlign ? i.y += t.caretPadding + t.caretSize : "bottom" === t.yAlign ? i.y -= e.height + t.caretPadding + t.caretSize : i.y -= e.height / 2, "center" === t.yAlign ? "left" === t.xAlign ? i.x += t.caretPadding + t.caretSize : "right" === t.xAlign && (i.x -= t.caretPadding + t.caretSize) : "left" === t.xAlign ? i.x -= t.cornerRadius + t.caretPadding : "right" === t.xAlign && (i.x += t.cornerRadius + t.caretPadding), i;
        },
        drawCaret: function drawCaret(t, e, a, s) {
          var o,
              n,
              r,
              h,
              l,
              c,
              d = this._view,
              u = this._chart.ctx;
          "center" === d.yAlign ? ("left" === d.xAlign ? (o = t.x, n = o - d.caretSize, r = o) : (o = t.x + e.width, n = o + d.caretSize, r = o), l = t.y + e.height / 2, h = l - d.caretSize, c = l + d.caretSize) : ("left" === d.xAlign ? (o = t.x + d.cornerRadius, n = o + d.caretSize, r = n + d.caretSize) : "right" === d.xAlign ? (o = t.x + e.width - d.cornerRadius, n = o - d.caretSize, r = n - d.caretSize) : (n = t.x + e.width / 2, o = n - d.caretSize, r = n + d.caretSize), "top" === d.yAlign ? (h = t.y, l = h - d.caretSize, c = h) : (h = t.y + e.height, l = h + d.caretSize, c = h));
          var f = i.color(d.backgroundColor);
          u.fillStyle = f.alpha(a * f.alpha()).rgbString(), u.beginPath(), u.moveTo(o, h), u.lineTo(n, l), u.lineTo(r, c), u.closePath(), u.fill();
        },
        drawTitle: function drawTitle(t, e, a, s) {
          if (e.title.length) {
            a.textAlign = e._titleAlign, a.textBaseline = "top";
            var o = i.color(e.titleColor);
            a.fillStyle = o.alpha(s * o.alpha()).rgbString(), a.font = i.fontString(e.titleFontSize, e._titleFontStyle, e._titleFontFamily), i.each(e.title, function (i, s) {
              a.fillText(i, t.x, t.y), t.y += e.titleFontSize + e.titleSpacing, s + 1 === e.title.length && (t.y += e.titleMarginBottom - e.titleSpacing);
            });
          }
        },
        drawBody: function drawBody(t, e, a, s) {
          a.textAlign = e._bodyAlign, a.textBaseline = "top";
          var o = i.color(e.bodyColor);
          a.fillStyle = o.alpha(s * o.alpha()).rgbString(), a.font = i.fontString(e.bodyFontSize, e._bodyFontStyle, e._bodyFontFamily), i.each(e.beforeBody, function (i) {
            a.fillText(i, t.x, t.y), t.y += e.bodyFontSize + e.bodySpacing;
          }), i.each(e.body, function (o, n) {
            "single" !== this._options.tooltips.mode && (a.fillStyle = i.color(e.legendColorBackground).alpha(s).rgbaString(), a.fillRect(t.x, t.y, e.bodyFontSize, e.bodyFontSize), a.strokeStyle = i.color(e.labelColors[n].borderColor).alpha(s).rgbaString(), a.strokeRect(t.x, t.y, e.bodyFontSize, e.bodyFontSize), a.fillStyle = i.color(e.labelColors[n].backgroundColor).alpha(s).rgbaString(), a.fillRect(t.x + 1, t.y + 1, e.bodyFontSize - 2, e.bodyFontSize - 2), a.fillStyle = i.color(e.bodyColor).alpha(s).rgbaString()), a.fillText(o, t.x + ("single" !== this._options.tooltips.mode ? e.bodyFontSize + 2 : 0), t.y), t.y += e.bodyFontSize + e.bodySpacing;
          }, this), i.each(e.afterBody, function (i) {
            a.fillText(i, t.x, t.y), t.y += e.bodyFontSize;
          }), t.y -= e.bodySpacing;
        },
        drawFooter: function drawFooter(t, e, a, s) {
          if (e.footer.length) {
            t.y += e.footerMarginTop, a.textAlign = e._footerAlign, a.textBaseline = "top";
            var o = i.color(e.footerColor);
            a.fillStyle = o.alpha(s * o.alpha()).rgbString(), a.font = i.fontString(e.footerFontSize, e._footerFontStyle, e._footerFontFamily), i.each(e.footer, function (i) {
              a.fillText(i, t.x, t.y), t.y += e.footerFontSize + e.footerSpacing;
            });
          }
        },
        draw: function draw() {
          var t = this._chart.ctx,
              e = this._view;

          if (0 !== e.opacity) {
            var a = e.caretPadding,
                s = this.getTooltipSize(e),
                o = {
              x: e.x,
              y: e.y
            },
                n = Math.abs(e.opacity < .001) ? 0 : e.opacity;

            if (this._options.tooltips.enabled) {
              var r = i.color(e.backgroundColor);
              t.fillStyle = r.alpha(n * r.alpha()).rgbString(), i.drawRoundedRectangle(t, o.x, o.y, s.width, s.height, e.cornerRadius), t.fill(), this.drawCaret(o, s, n, a), o.x += e.xPadding, o.y += e.yPadding, this.drawTitle(o, e, t, n), this.drawBody(o, e, t, n), this.drawFooter(o, e, t, n);
            }
          }
        }
      });
    };
  }, {}],
  34: [function (t, e, i) {
    "use strict";

    e.exports = function (t, e) {
      var i = t.helpers;
      t.defaults.global.elements.arc = {
        backgroundColor: t.defaults.global.defaultColor,
        borderColor: "#fff",
        borderWidth: 2
      }, t.elements.Arc = t.Element.extend({
        inLabelRange: function inLabelRange(t) {
          var e = this._view;
          return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) : !1;
        },
        inRange: function inRange(t, e) {
          var a = this._view;

          if (a) {
            for (var s = i.getAngleFromPoint(a, {
              x: t,
              y: e
            }), o = a.startAngle, n = a.endAngle; o > n;) {
              n += 2 * Math.PI;
            }

            for (; s.angle > n;) {
              s.angle -= 2 * Math.PI;
            }

            for (; s.angle < o;) {
              s.angle += 2 * Math.PI;
            }

            var r = s.angle >= o && s.angle <= n,
                h = s.distance >= a.innerRadius && s.distance <= a.outerRadius;
            return r && h;
          }

          return !1;
        },
        tooltipPosition: function tooltipPosition() {
          var t = this._view,
              e = t.startAngle + (t.endAngle - t.startAngle) / 2,
              i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
          return {
            x: t.x + Math.cos(e) * i,
            y: t.y + Math.sin(e) * i
          };
        },
        draw: function draw() {
          var t = this._chart.ctx,
              e = this._view;
          t.beginPath(), t.arc(e.x, e.y, e.outerRadius, e.startAngle, e.endAngle), t.arc(e.x, e.y, e.innerRadius, e.endAngle, e.startAngle, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke();
        }
      });
    };
  }, {}],
  35: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.global.elements.line = {
        tension: .4,
        backgroundColor: t.defaults.global.defaultColor,
        borderWidth: 3,
        borderColor: t.defaults.global.defaultColor,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        fill: !0
      }, t.elements.Line = t.Element.extend({
        lineToNextPoint: function lineToNextPoint(t, e, i, a, s) {
          var o = this._chart.ctx;
          e._view.skip ? a.call(this, t, e, i) : t._view.skip ? s.call(this, t, e, i) : 0 === e._view.tension ? o.lineTo(e._view.x, e._view.y) : o.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, e._view.controlPointPreviousX, e._view.controlPointPreviousY, e._view.x, e._view.y);
        },
        draw: function draw() {
          function i(t) {
            n._view.skip || r._view.skip ? t && o.lineTo(a._view.scaleZero.x, a._view.scaleZero.y) : o.bezierCurveTo(r._view.controlPointNextX, r._view.controlPointNextY, n._view.controlPointPreviousX, n._view.controlPointPreviousY, n._view.x, n._view.y);
          }

          var a = this,
              s = this._view,
              o = this._chart.ctx,
              n = this._children[0],
              r = this._children[this._children.length - 1];
          o.save(), this._children.length > 0 && s.fill && (o.beginPath(), e.each(this._children, function (t, i) {
            var a = e.previousItem(this._children, i),
                n = e.nextItem(this._children, i);
            0 === i ? (this._loop ? o.moveTo(s.scaleZero.x, s.scaleZero.y) : o.moveTo(t._view.x, s.scaleZero), t._view.skip ? this._loop || o.moveTo(n._view.x, this._view.scaleZero) : o.lineTo(t._view.x, t._view.y)) : this.lineToNextPoint(a, t, n, function (t, e, i) {
              this._loop ? o.lineTo(this._view.scaleZero.x, this._view.scaleZero.y) : (o.lineTo(t._view.x, this._view.scaleZero), o.moveTo(i._view.x, this._view.scaleZero));
            }, function (t, e) {
              o.lineTo(e._view.x, e._view.y);
            });
          }, this), this._loop ? i(!0) : (o.lineTo(this._children[this._children.length - 1]._view.x, s.scaleZero), o.lineTo(this._children[0]._view.x, s.scaleZero)), o.fillStyle = s.backgroundColor || t.defaults.global.defaultColor, o.closePath(), o.fill()), o.lineCap = s.borderCapStyle || t.defaults.global.elements.line.borderCapStyle, o.setLineDash && o.setLineDash(s.borderDash || t.defaults.global.elements.line.borderDash), o.lineDashOffset = s.borderDashOffset || t.defaults.global.elements.line.borderDashOffset, o.lineJoin = s.borderJoinStyle || t.defaults.global.elements.line.borderJoinStyle, o.lineWidth = s.borderWidth || t.defaults.global.elements.line.borderWidth, o.strokeStyle = s.borderColor || t.defaults.global.defaultColor, o.beginPath(), e.each(this._children, function (t, i) {
            var a = e.previousItem(this._children, i),
                s = e.nextItem(this._children, i);
            0 === i ? o.moveTo(t._view.x, t._view.y) : this.lineToNextPoint(a, t, s, function (t, e, i) {
              o.moveTo(i._view.x, i._view.y);
            }, function (t, e) {
              o.moveTo(e._view.x, e._view.y);
            });
          }, this), this._loop && this._children.length > 0 && i(), o.stroke(), o.restore();
        }
      });
    };
  }, {}],
  36: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers;
      t.defaults.global.elements.point = {
        radius: 3,
        pointStyle: "circle",
        backgroundColor: t.defaults.global.defaultColor,
        borderWidth: 1,
        borderColor: t.defaults.global.defaultColor,
        hitRadius: 1,
        hoverRadius: 4,
        hoverBorderWidth: 1
      }, t.elements.Point = t.Element.extend({
        inRange: function inRange(t, e) {
          var i = this._view;

          if (i) {
            var a = i.hitRadius + i.radius;
            return Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(a, 2);
          }

          return !1;
        },
        inLabelRange: function inLabelRange(t) {
          var e = this._view;
          return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2) : !1;
        },
        tooltipPosition: function tooltipPosition() {
          var t = this._view;
          return {
            x: t.x,
            y: t.y,
            padding: t.radius + t.borderWidth
          };
        },
        draw: function draw() {
          var i = this._view,
              a = this._chart.ctx;

          if (!i.skip) {
            if ("object" == _typeof(i.pointStyle) && ("[object HTMLImageElement]" === i.pointStyle.toString() || "[object HTMLCanvasElement]" === i.pointStyle.toString())) return void a.drawImage(i.pointStyle, i.x - i.pointStyle.width / 2, i.y - i.pointStyle.height / 2);

            if (!isNaN(i.radius) && i.radius > 0) {
              a.strokeStyle = i.borderColor || t.defaults.global.defaultColor, a.lineWidth = e.getValueOrDefault(i.borderWidth, t.defaults.global.elements.point.borderWidth), a.fillStyle = i.backgroundColor || t.defaults.global.defaultColor;
              var s,
                  o,
                  n = i.radius;

              switch (i.pointStyle) {
                default:
                  a.beginPath(), a.arc(i.x, i.y, n, 0, 2 * Math.PI), a.closePath(), a.fill();
                  break;

                case "triangle":
                  a.beginPath();
                  var r = 3 * n / Math.sqrt(3),
                      h = r * Math.sqrt(3) / 2;
                  a.moveTo(i.x - r / 2, i.y + h / 3), a.lineTo(i.x + r / 2, i.y + h / 3), a.lineTo(i.x, i.y - 2 * h / 3), a.closePath(), a.fill();
                  break;

                case "rect":
                  a.fillRect(i.x - 1 / Math.SQRT2 * n, i.y - 1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n), a.strokeRect(i.x - 1 / Math.SQRT2 * n, i.y - 1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n);
                  break;

                case "rectRot":
                  a.translate(i.x, i.y), a.rotate(Math.PI / 4), a.fillRect(-1 / Math.SQRT2 * n, -1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n), a.strokeRect(-1 / Math.SQRT2 * n, -1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n), a.setTransform(1, 0, 0, 1, 0, 0);
                  break;

                case "cross":
                  a.beginPath(), a.moveTo(i.x, i.y + n), a.lineTo(i.x, i.y - n), a.moveTo(i.x - n, i.y), a.lineTo(i.x + n, i.y), a.closePath();
                  break;

                case "crossRot":
                  a.beginPath(), s = Math.cos(Math.PI / 4) * n, o = Math.sin(Math.PI / 4) * n, a.moveTo(i.x - s, i.y - o), a.lineTo(i.x + s, i.y + o), a.moveTo(i.x - s, i.y + o), a.lineTo(i.x + s, i.y - o), a.closePath();
                  break;

                case "star":
                  a.beginPath(), a.moveTo(i.x, i.y + n), a.lineTo(i.x, i.y - n), a.moveTo(i.x - n, i.y), a.lineTo(i.x + n, i.y), s = Math.cos(Math.PI / 4) * n, o = Math.sin(Math.PI / 4) * n, a.moveTo(i.x - s, i.y - o), a.lineTo(i.x + s, i.y + o), a.moveTo(i.x - s, i.y + o), a.lineTo(i.x + s, i.y - o), a.closePath();
                  break;

                case "line":
                  a.beginPath(), a.moveTo(i.x - n, i.y), a.lineTo(i.x + n, i.y), a.closePath();
                  break;

                case "dash":
                  a.beginPath(), a.moveTo(i.x, i.y), a.lineTo(i.x + n, i.y), a.closePath();
              }

              a.stroke();
            }
          }
        }
      });
    };
  }, {}],
  37: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      t.helpers;
      t.defaults.global.elements.rectangle = {
        backgroundColor: t.defaults.global.defaultColor,
        borderWidth: 0,
        borderColor: t.defaults.global.defaultColor,
        borderSkipped: "bottom"
      }, t.elements.Rectangle = t.Element.extend({
        draw: function draw() {
          function t(t) {
            return h[(c + t) % 4];
          }

          var e = this._chart.ctx,
              i = this._view,
              a = i.width / 2,
              s = i.x - a,
              o = i.x + a,
              n = i.base - (i.base - i.y),
              r = i.borderWidth / 2;
          i.borderWidth && (s += r, o -= r, n += r), e.beginPath(), e.fillStyle = i.backgroundColor, e.strokeStyle = i.borderColor, e.lineWidth = i.borderWidth;
          var h = [[s, i.base], [s, n], [o, n], [o, i.base]],
              l = ["bottom", "left", "top", "right"],
              c = l.indexOf(i.borderSkipped, 0);
          -1 === c && (c = 0), e.moveTo.apply(e, t(0));

          for (var d = 1; 4 > d; d++) {
            e.lineTo.apply(e, t(d));
          }

          e.fill(), i.borderWidth && e.stroke();
        },
        height: function height() {
          var t = this._view;
          return t.base - t.y;
        },
        inRange: function inRange(t, e) {
          var i = this._view,
              a = !1;
          return i && (a = i.y < i.base ? t >= i.x - i.width / 2 && t <= i.x + i.width / 2 && e >= i.y && e <= i.base : t >= i.x - i.width / 2 && t <= i.x + i.width / 2 && e >= i.base && e <= i.y), a;
        },
        inLabelRange: function inLabelRange(t) {
          var e = this._view;
          return e ? t >= e.x - e.width / 2 && t <= e.x + e.width / 2 : !1;
        },
        tooltipPosition: function tooltipPosition() {
          var t = this._view;
          return {
            x: t.x,
            y: t.y
          };
        }
      });
    };
  }, {}],
  38: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers,
          i = {
        position: "bottom"
      },
          a = t.Scale.extend({
        determineDataLimits: function determineDataLimits() {
          this.minIndex = 0, this.maxIndex = this.chart.data.labels.length - 1;
          var t;
          void 0 !== this.options.ticks.min && (t = e.indexOf(this.chart.data.labels, this.options.ticks.min), this.minIndex = -1 !== t ? t : this.minIndex), void 0 !== this.options.ticks.max && (t = e.indexOf(this.chart.data.labels, this.options.ticks.max), this.maxIndex = -1 !== t ? t : this.maxIndex), this.min = this.chart.data.labels[this.minIndex], this.max = this.chart.data.labels[this.maxIndex];
        },
        buildTicks: function buildTicks(t) {
          this.ticks = 0 === this.minIndex && this.maxIndex === this.chart.data.labels.length - 1 ? this.chart.data.labels : this.chart.data.labels.slice(this.minIndex, this.maxIndex + 1);
        },
        getLabelForIndex: function getLabelForIndex(t, e) {
          return this.ticks[t];
        },
        getPixelForValue: function getPixelForValue(t, e, i, a) {
          var s = Math.max(this.maxIndex + 1 - this.minIndex - (this.options.gridLines.offsetGridLines ? 0 : 1), 1);

          if (this.isHorizontal()) {
            var o = this.width - (this.paddingLeft + this.paddingRight),
                n = o / s,
                r = n * (e - this.minIndex) + this.paddingLeft;
            return this.options.gridLines.offsetGridLines && a && (r += n / 2), this.left + Math.round(r);
          }

          var h = this.height - (this.paddingTop + this.paddingBottom),
              l = h / s,
              c = l * (e - this.minIndex) + this.paddingTop;
          return this.options.gridLines.offsetGridLines && a && (c += l / 2), this.top + Math.round(c);
        },
        getPixelForTick: function getPixelForTick(t, e) {
          return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e);
        },
        getValueForPixel: function getValueForPixel(t) {
          var e,
              i = Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
              a = this.isHorizontal(),
              s = a ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom),
              o = s / i;
          return this.options.gridLines.offsetGridLines && (t -= o / 2), t -= a ? this.paddingLeft : this.paddingTop, e = 0 >= t ? 0 : Math.round(t / o);
        }
      });
      t.scaleService.registerScaleType("category", a, i);
    };
  }, {}],
  39: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers,
          i = {
        position: "left",
        ticks: {
          callback: function callback(t, i, a) {
            var s = a.length > 3 ? a[2] - a[1] : a[1] - a[0];
            Math.abs(s) > 1 && t !== Math.floor(t) && (s = t - Math.floor(t));
            var o = e.log10(Math.abs(s)),
                n = "";

            if (0 !== t) {
              var r = -1 * Math.floor(o);
              r = Math.max(Math.min(r, 20), 0), n = t.toFixed(r);
            } else n = "0";

            return n;
          }
        }
      },
          a = t.Scale.extend({
        determineDataLimits: function determineDataLimits() {
          if (this.min = null, this.max = null, this.options.stacked) {
            var t = {},
                i = !1,
                a = !1;
            e.each(this.chart.data.datasets, function (s, o) {
              var n = this.chart.getDatasetMeta(o);
              void 0 === t[n.type] && (t[n.type] = {
                positiveValues: [],
                negativeValues: []
              });
              var r = t[n.type].positiveValues,
                  h = t[n.type].negativeValues;
              this.chart.isDatasetVisible(o) && (this.isHorizontal() ? n.xAxisID === this.id : n.yAxisID === this.id) && e.each(s.data, function (t, e) {
                var s = +this.getRightValue(t);
                isNaN(s) || n.data[e].hidden || (r[e] = r[e] || 0, h[e] = h[e] || 0, this.options.relativePoints ? r[e] = 100 : 0 > s ? (a = !0, h[e] += s) : (i = !0, r[e] += s));
              }, this);
            }, this), e.each(t, function (t) {
              var i = t.positiveValues.concat(t.negativeValues),
                  a = e.min(i),
                  s = e.max(i);
              this.min = null === this.min ? a : Math.min(this.min, a), this.max = null === this.max ? s : Math.max(this.max, s);
            }, this);
          } else e.each(this.chart.data.datasets, function (t, i) {
            var a = this.chart.getDatasetMeta(i);
            this.chart.isDatasetVisible(i) && (this.isHorizontal() ? a.xAxisID === this.id : a.yAxisID === this.id) && e.each(t.data, function (t, e) {
              var i = +this.getRightValue(t);
              isNaN(i) || a.data[e].hidden || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i));
            }, this);
          }, this);

          if (this.options.ticks.beginAtZero) {
            var s = e.sign(this.min),
                o = e.sign(this.max);
            0 > s && 0 > o ? this.max = 0 : s > 0 && o > 0 && (this.min = 0);
          }

          void 0 !== this.options.ticks.min ? this.min = this.options.ticks.min : void 0 !== this.options.ticks.suggestedMin && (this.min = Math.min(this.min, this.options.ticks.suggestedMin)), void 0 !== this.options.ticks.max ? this.max = this.options.ticks.max : void 0 !== this.options.ticks.suggestedMax && (this.max = Math.max(this.max, this.options.ticks.suggestedMax)), this.min === this.max && (this.min--, this.max++);
        },
        buildTicks: function buildTicks() {
          this.ticks = [];
          var i;
          if (this.isHorizontal()) i = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.width / 50));else {
            var a = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize);
            i = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.height / (2 * a)));
          }
          i = Math.max(2, i);
          var s,
              o = this.options.ticks.fixedStepSize && this.options.ticks.fixedStepSize > 0 || this.options.ticks.stepSize && this.options.ticks.stepSize > 0;
          if (o) s = e.getValueOrDefault(this.options.ticks.fixedStepSize, this.options.ticks.stepSize);else {
            var n = e.niceNum(this.max - this.min, !1);
            s = e.niceNum(n / (i - 1), !0);
          }
          var r = Math.floor(this.min / s) * s,
              h = Math.ceil(this.max / s) * s,
              l = (h - r) / s;
          l = e.almostEquals(l, Math.round(l), s / 1e3) ? Math.round(l) : Math.ceil(l), this.ticks.push(void 0 !== this.options.ticks.min ? this.options.ticks.min : r);

          for (var c = 1; l > c; ++c) {
            this.ticks.push(r + c * s);
          }

          this.ticks.push(void 0 !== this.options.ticks.max ? this.options.ticks.max : h), ("left" === this.options.position || "right" === this.options.position) && this.ticks.reverse(), this.max = e.max(this.ticks), this.min = e.min(this.ticks), this.options.ticks.reverse ? (this.ticks.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max);
        },
        getLabelForIndex: function getLabelForIndex(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t]);
        },
        convertTicksToLabels: function convertTicksToLabels() {
          this.ticksAsNumbers = this.ticks.slice(), this.zeroLineIndex = this.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(this);
        },
        getPixelForValue: function getPixelForValue(t, e, i, a) {
          var s,
              o = +this.getRightValue(t),
              n = this.end - this.start;

          if (this.isHorizontal()) {
            var r = this.width - (this.paddingLeft + this.paddingRight);
            return s = this.left + r / n * (o - this.start), Math.round(s + this.paddingLeft);
          }

          var h = this.height - (this.paddingTop + this.paddingBottom);
          return s = this.bottom - this.paddingBottom - h / n * (o - this.start), Math.round(s);
        },
        getValueForPixel: function getValueForPixel(t) {
          var e;

          if (this.isHorizontal()) {
            var i = this.width - (this.paddingLeft + this.paddingRight);
            e = (t - this.left - this.paddingLeft) / i;
          } else {
            var a = this.height - (this.paddingTop + this.paddingBottom);
            e = (this.bottom - this.paddingBottom - t) / a;
          }

          return this.start + (this.end - this.start) * e;
        },
        getPixelForTick: function getPixelForTick(t, e) {
          return this.getPixelForValue(this.ticksAsNumbers[t], null, null, e);
        }
      });
      t.scaleService.registerScaleType("linear", a, i);
    };
  }, {}],
  40: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers,
          i = {
        position: "left",
        ticks: {
          callback: function callback(e, i, a) {
            var s = e / Math.pow(10, Math.floor(t.helpers.log10(e)));
            return 1 === s || 2 === s || 5 === s || 0 === i || i === a.length - 1 ? e.toExponential() : "";
          }
        }
      },
          a = t.Scale.extend({
        determineDataLimits: function determineDataLimits() {
          if (this.min = null, this.max = null, this.options.stacked) {
            var t = {};
            e.each(this.chart.data.datasets, function (i, a) {
              var s = this.chart.getDatasetMeta(a);
              this.chart.isDatasetVisible(a) && (this.isHorizontal() ? s.xAxisID === this.id : s.yAxisID === this.id) && (void 0 === t[s.type] && (t[s.type] = []), e.each(i.data, function (e, i) {
                var a = t[s.type],
                    o = +this.getRightValue(e);
                isNaN(o) || s.data[i].hidden || (a[i] = a[i] || 0, this.options.relativePoints ? a[i] = 100 : a[i] += o);
              }, this));
            }, this), e.each(t, function (t) {
              var i = e.min(t),
                  a = e.max(t);
              this.min = null === this.min ? i : Math.min(this.min, i), this.max = null === this.max ? a : Math.max(this.max, a);
            }, this);
          } else e.each(this.chart.data.datasets, function (t, i) {
            var a = this.chart.getDatasetMeta(i);
            this.chart.isDatasetVisible(i) && (this.isHorizontal() ? a.xAxisID === this.id : a.yAxisID === this.id) && e.each(t.data, function (t, e) {
              var i = +this.getRightValue(t);
              isNaN(i) || a.data[e].hidden || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i));
            }, this);
          }, this);

          this.min = void 0 !== this.options.ticks.min ? this.options.ticks.min : this.min, this.max = void 0 !== this.options.ticks.max ? this.options.ticks.max : this.max, this.min === this.max && (0 !== this.min && null !== this.min ? (this.min = Math.pow(10, Math.floor(e.log10(this.min)) - 1), this.max = Math.pow(10, Math.floor(e.log10(this.max)) + 1)) : (this.min = 1, this.max = 10));
        },
        buildTicks: function buildTicks() {
          this.ticks = [];

          for (var t = void 0 !== this.options.ticks.min ? this.options.ticks.min : Math.pow(10, Math.floor(e.log10(this.min))); t < this.max;) {
            this.ticks.push(t);
            var i = Math.floor(e.log10(t)),
                a = Math.floor(t / Math.pow(10, i)) + 1;
            10 === a && (a = 1, ++i), t = a * Math.pow(10, i);
          }

          var s = void 0 !== this.options.ticks.max ? this.options.ticks.max : t;
          this.ticks.push(s), ("left" === this.options.position || "right" === this.options.position) && this.ticks.reverse(), this.max = e.max(this.ticks), this.min = e.min(this.ticks), this.options.ticks.reverse ? (this.ticks.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max);
        },
        convertTicksToLabels: function convertTicksToLabels() {
          this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this);
        },
        getLabelForIndex: function getLabelForIndex(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t]);
        },
        getPixelForTick: function getPixelForTick(t, e) {
          return this.getPixelForValue(this.tickValues[t], null, null, e);
        },
        getPixelForValue: function getPixelForValue(t, i, a, s) {
          var o,
              n = +this.getRightValue(t),
              r = e.log10(this.end) - e.log10(this.start);
          if (this.isHorizontal()) {
            if (0 === n) o = this.left + this.paddingLeft;else {
              var h = this.width - (this.paddingLeft + this.paddingRight);
              o = this.left + h / r * (e.log10(n) - e.log10(this.start)), o += this.paddingLeft;
            }
          } else if (0 === n) o = this.top + this.paddingTop;else {
            var l = this.height - (this.paddingTop + this.paddingBottom);
            o = this.bottom - this.paddingBottom - l / r * (e.log10(n) - e.log10(this.start));
          }
          return o;
        },
        getValueForPixel: function getValueForPixel(t) {
          var i,
              a = e.log10(this.end) - e.log10(this.start);

          if (this.isHorizontal()) {
            var s = this.width - (this.paddingLeft + this.paddingRight);
            i = this.start * Math.pow(10, (t - this.left - this.paddingLeft) * a / s);
          } else {
            var o = this.height - (this.paddingTop + this.paddingBottom);
            i = Math.pow(10, (this.bottom - this.paddingBottom - t) * a / o) / this.start;
          }

          return i;
        }
      });
      t.scaleService.registerScaleType("logarithmic", a, i);
    };
  }, {}],
  41: [function (t, e, i) {
    "use strict";

    e.exports = function (t) {
      var e = t.helpers,
          i = {
        display: !0,
        animate: !0,
        lineArc: !1,
        position: "chartArea",
        angleLines: {
          display: !0,
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1
        },
        ticks: {
          showLabelBackdrop: !0,
          backdropColor: "rgba(255,255,255,0.75)",
          backdropPaddingY: 2,
          backdropPaddingX: 2
        },
        pointLabels: {
          fontSize: 10,
          callback: function callback(t) {
            return t;
          }
        }
      },
          a = t.Scale.extend({
        getValueCount: function getValueCount() {
          return this.chart.data.labels.length;
        },
        setDimensions: function setDimensions() {
          this.width = this.maxWidth, this.height = this.maxHeight, this.xCenter = Math.round(this.width / 2), this.yCenter = Math.round(this.height / 2);
          var i = e.min([this.height, this.width]),
              a = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize);
          this.drawingArea = this.options.display ? i / 2 - (a / 2 + this.options.ticks.backdropPaddingY) : i / 2;
        },
        determineDataLimits: function determineDataLimits() {
          if (this.min = null, this.max = null, e.each(this.chart.data.datasets, function (t, i) {
            if (this.chart.isDatasetVisible(i)) {
              var a = this.chart.getDatasetMeta(i);
              e.each(t.data, function (t, e) {
                var i = +this.getRightValue(t);
                isNaN(i) || a.data[e].hidden || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i));
              }, this);
            }
          }, this), this.options.ticks.beginAtZero) {
            var t = e.sign(this.min),
                i = e.sign(this.max);
            0 > t && 0 > i ? this.max = 0 : t > 0 && i > 0 && (this.min = 0);
          }

          void 0 !== this.options.ticks.min ? this.min = this.options.ticks.min : void 0 !== this.options.ticks.suggestedMin && (this.min = Math.min(this.min, this.options.ticks.suggestedMin)), void 0 !== this.options.ticks.max ? this.max = this.options.ticks.max : void 0 !== this.options.ticks.suggestedMax && (this.max = Math.max(this.max, this.options.ticks.suggestedMax)), this.min === this.max && (this.min--, this.max++);
        },
        buildTicks: function buildTicks() {
          this.ticks = [];
          var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
              a = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)));
          a = Math.max(2, a);
          var s = e.niceNum(this.max - this.min, !1),
              o = e.niceNum(s / (a - 1), !0),
              n = Math.floor(this.min / o) * o,
              r = Math.ceil(this.max / o) * o,
              h = Math.ceil((r - n) / o);
          this.ticks.push(void 0 !== this.options.ticks.min ? this.options.ticks.min : n);

          for (var l = 1; h > l; ++l) {
            this.ticks.push(n + l * o);
          }

          this.ticks.push(void 0 !== this.options.ticks.max ? this.options.ticks.max : r), this.max = e.max(this.ticks), this.min = e.min(this.ticks), this.options.ticks.reverse ? (this.ticks.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), this.zeroLineIndex = this.ticks.indexOf(0);
        },
        convertTicksToLabels: function convertTicksToLabels() {
          t.Scale.prototype.convertTicksToLabels.call(this), this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this);
        },
        getLabelForIndex: function getLabelForIndex(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t]);
        },
        fit: function fit() {
          var i,
              a,
              s,
              o,
              n,
              r,
              h,
              l,
              c,
              d,
              u,
              f,
              g = e.getValueOrDefault(this.options.pointLabels.fontSize, t.defaults.global.defaultFontSize),
              m = e.getValueOrDefault(this.options.pointLabels.fontStyle, t.defaults.global.defaultFontStyle),
              p = e.getValueOrDefault(this.options.pointLabels.fontFamily, t.defaults.global.defaultFontFamily),
              b = e.fontString(g, m, p),
              v = e.min([this.height / 2 - g - 5, this.width / 2]),
              x = this.width,
              y = 0;

          for (this.ctx.font = b, a = 0; a < this.getValueCount(); a++) {
            i = this.getPointPosition(a, v), s = this.ctx.measureText(this.pointLabels[a] ? this.pointLabels[a] : "").width + 5, 0 === a || a === this.getValueCount() / 2 ? (o = s / 2, i.x + o > x && (x = i.x + o, n = a), i.x - o < y && (y = i.x - o, h = a)) : a < this.getValueCount() / 2 ? i.x + s > x && (x = i.x + s, n = a) : a > this.getValueCount() / 2 && i.x - s < y && (y = i.x - s, h = a);
          }

          c = y, d = Math.ceil(x - this.width), r = this.getIndexAngle(n), l = this.getIndexAngle(h), u = d / Math.sin(r + Math.PI / 2), f = c / Math.sin(l + Math.PI / 2), u = e.isNumber(u) ? u : 0, f = e.isNumber(f) ? f : 0, this.drawingArea = Math.round(v - (f + u) / 2), this.setCenterPoint(f, u);
        },
        setCenterPoint: function setCenterPoint(t, e) {
          var i = this.width - e - this.drawingArea,
              a = t + this.drawingArea;
          this.xCenter = Math.round((a + i) / 2 + this.left), this.yCenter = Math.round(this.height / 2 + this.top);
        },
        getIndexAngle: function getIndexAngle(t) {
          var e = 2 * Math.PI / this.getValueCount();
          return t * e - Math.PI / 2;
        },
        getDistanceFromCenterForValue: function getDistanceFromCenterForValue(t) {
          if (null === t) return 0;
          var e = this.drawingArea / (this.max - this.min);
          return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
        },
        getPointPosition: function getPointPosition(t, e) {
          var i = this.getIndexAngle(t);
          return {
            x: Math.round(Math.cos(i) * e) + this.xCenter,
            y: Math.round(Math.sin(i) * e) + this.yCenter
          };
        },
        getPointPositionForValue: function getPointPositionForValue(t, e) {
          return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
        },
        draw: function draw() {
          if (this.options.display) {
            var i = this.ctx;

            if (e.each(this.ticks, function (a, s) {
              if (s > 0 || this.options.reverse) {
                var o = this.getDistanceFromCenterForValue(this.ticks[s]),
                    n = this.yCenter - o;
                if (this.options.gridLines.display) if (i.strokeStyle = this.options.gridLines.color, i.lineWidth = this.options.gridLines.lineWidth, this.options.lineArc) i.beginPath(), i.arc(this.xCenter, this.yCenter, o, 0, 2 * Math.PI), i.closePath(), i.stroke();else {
                  i.beginPath();

                  for (var r = 0; r < this.getValueCount(); r++) {
                    var h = this.getPointPosition(r, this.getDistanceFromCenterForValue(this.ticks[s]));
                    0 === r ? i.moveTo(h.x, h.y) : i.lineTo(h.x, h.y);
                  }

                  i.closePath(), i.stroke();
                }

                if (this.options.ticks.display) {
                  var l = e.getValueOrDefault(this.options.ticks.fontColor, t.defaults.global.defaultFontColor),
                      c = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                      d = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                      u = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                      f = e.fontString(c, d, u);

                  if (i.font = f, this.options.ticks.showLabelBackdrop) {
                    var g = i.measureText(a).width;
                    i.fillStyle = this.options.ticks.backdropColor, i.fillRect(this.xCenter - g / 2 - this.options.ticks.backdropPaddingX, n - c / 2 - this.options.ticks.backdropPaddingY, g + 2 * this.options.ticks.backdropPaddingX, c + 2 * this.options.ticks.backdropPaddingY);
                  }

                  i.textAlign = "center", i.textBaseline = "middle", i.fillStyle = l, i.fillText(a, this.xCenter, n);
                }
              }
            }, this), !this.options.lineArc) {
              i.lineWidth = this.options.angleLines.lineWidth, i.strokeStyle = this.options.angleLines.color;

              for (var a = this.getValueCount() - 1; a >= 0; a--) {
                if (this.options.angleLines.display) {
                  var s = this.getPointPosition(a, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max));
                  i.beginPath(), i.moveTo(this.xCenter, this.yCenter), i.lineTo(s.x, s.y), i.stroke(), i.closePath();
                }

                var o = this.getPointPosition(a, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max) + 5),
                    n = e.getValueOrDefault(this.options.pointLabels.fontColor, t.defaults.global.defaultFontColor),
                    r = e.getValueOrDefault(this.options.pointLabels.fontSize, t.defaults.global.defaultFontSize),
                    h = e.getValueOrDefault(this.options.pointLabels.fontStyle, t.defaults.global.defaultFontStyle),
                    l = e.getValueOrDefault(this.options.pointLabels.fontFamily, t.defaults.global.defaultFontFamily),
                    c = e.fontString(r, h, l);
                i.font = c, i.fillStyle = n;
                var d = this.pointLabels.length,
                    u = this.pointLabels.length / 2,
                    f = u / 2,
                    g = f > a || a > d - f,
                    m = a === f || a === d - f;
                0 === a ? i.textAlign = "center" : a === u ? i.textAlign = "center" : u > a ? i.textAlign = "left" : i.textAlign = "right", m ? i.textBaseline = "middle" : g ? i.textBaseline = "bottom" : i.textBaseline = "top", i.fillText(this.pointLabels[a] ? this.pointLabels[a] : "", o.x, o.y);
              }
            }
          }
        }
      });
      t.scaleService.registerScaleType("radialLinear", a, i);
    };
  }, {}],
  42: [function (t, e, i) {
    "use strict";

    var a = t("moment");
    a = "function" == typeof a ? a : window.moment, e.exports = function (t) {
      var e = t.helpers,
          i = {
        units: [{
          name: "millisecond",
          steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
        }, {
          name: "second",
          steps: [1, 2, 5, 10, 30]
        }, {
          name: "minute",
          steps: [1, 2, 5, 10, 30]
        }, {
          name: "hour",
          steps: [1, 2, 3, 6, 12]
        }, {
          name: "day",
          steps: [1, 2, 5]
        }, {
          name: "week",
          maxStep: 4
        }, {
          name: "month",
          maxStep: 3
        }, {
          name: "quarter",
          maxStep: 4
        }, {
          name: "year",
          maxStep: !1
        }]
      },
          s = {
        position: "bottom",
        time: {
          parser: !1,
          format: !1,
          unit: !1,
          round: !1,
          displayFormat: !1,
          displayFormats: {
            millisecond: "h:mm:ss.SSS a",
            second: "h:mm:ss a",
            minute: "h:mm:ss a",
            hour: "MMM D, hA",
            day: "ll",
            week: "ll",
            month: "MMM YYYY",
            quarter: "[Q]Q - YYYY",
            year: "YYYY"
          }
        },
        ticks: {
          autoSkip: !1
        }
      },
          o = t.Scale.extend({
        initialize: function initialize() {
          if (!a) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
          t.Scale.prototype.initialize.call(this);
        },
        getLabelMoment: function getLabelMoment(t, e) {
          return this.labelMoments[t][e];
        },
        determineDataLimits: function determineDataLimits() {
          this.labelMoments = [];
          var t = [];
          this.chart.data.labels && this.chart.data.labels.length > 0 ? (e.each(this.chart.data.labels, function (e, i) {
            var a = this.parseTime(e);
            a.isValid() && (this.options.time.round && a.startOf(this.options.time.round), t.push(a));
          }, this), this.firstTick = a.min.call(this, t), this.lastTick = a.max.call(this, t)) : (this.firstTick = null, this.lastTick = null), e.each(this.chart.data.datasets, function (i, s) {
            var o = [],
                n = this.chart.isDatasetVisible(s);
            "object" == _typeof(i.data[0]) ? e.each(i.data, function (t, e) {
              var i = this.parseTime(this.getRightValue(t));
              i.isValid() && (this.options.time.round && i.startOf(this.options.time.round), o.push(i), n && (this.firstTick = null !== this.firstTick ? a.min(this.firstTick, i) : i, this.lastTick = null !== this.lastTick ? a.max(this.lastTick, i) : i));
            }, this) : o = t, this.labelMoments.push(o);
          }, this), this.options.time.min && (this.firstTick = this.parseTime(this.options.time.min)), this.options.time.max && (this.lastTick = this.parseTime(this.options.time.max)), this.firstTick = (this.firstTick || a()).clone(), this.lastTick = (this.lastTick || a()).clone();
        },
        buildTicks: function buildTicks(a) {
          this.ctx.save();
          var s = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
              o = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
              n = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
              r = e.fontString(s, o, n);
          if (this.ctx.font = r, this.ticks = [], this.unitScale = 1, this.scaleSizeInUnits = 0, this.options.time.unit) this.tickUnit = this.options.time.unit || "day", this.displayFormat = this.options.time.displayFormats[this.tickUnit], this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0), this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, 1);else {
            var h = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom),
                l = this.tickFormatFunction(this.firstTick, 0, []),
                c = this.ctx.measureText(l).width,
                d = Math.cos(e.toRadians(this.options.ticks.maxRotation)),
                u = Math.sin(e.toRadians(this.options.ticks.maxRotation));
            c = c * d + s * u;
            var f = h / c;
            this.tickUnit = "millisecond", this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0), this.displayFormat = this.options.time.displayFormats[this.tickUnit];

            for (var g = 0, m = i.units[g]; g < i.units.length;) {
              if (this.unitScale = 1, e.isArray(m.steps) && Math.ceil(this.scaleSizeInUnits / f) < e.max(m.steps)) {
                for (var p = 0; p < m.steps.length; ++p) {
                  if (m.steps[p] >= Math.ceil(this.scaleSizeInUnits / f)) {
                    this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, m.steps[p]);
                    break;
                  }
                }

                break;
              }

              if (m.maxStep === !1 || Math.ceil(this.scaleSizeInUnits / f) < m.maxStep) {
                this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / f));
                break;
              }

              ++g, m = i.units[g], this.tickUnit = m.name;
              var b = this.firstTick.diff(this.firstTick.clone().startOf(this.tickUnit), this.tickUnit, !0),
                  v = this.lastTick.clone().add(1, this.tickUnit).startOf(this.tickUnit).diff(this.lastTick, this.tickUnit, !0);
              this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0) + b + v, this.displayFormat = this.options.time.displayFormats[m.name];
            }
          }
          var x;

          if (this.options.time.min ? x = this.firstTick.clone().startOf(this.tickUnit) : (this.firstTick.startOf(this.tickUnit), x = this.firstTick), !this.options.time.max) {
            var y = this.lastTick.clone().startOf(this.tickUnit);
            0 !== y.diff(this.lastTick, this.tickUnit, !0) && this.lastTick.add(1, this.tickUnit).startOf(this.tickUnit);
          }

          this.smallestLabelSeparation = this.width, e.each(this.chart.data.datasets, function (t, e) {
            for (var i = 1; i < this.labelMoments[e].length; i++) {
              this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[e][i].diff(this.labelMoments[e][i - 1], this.tickUnit, !0));
            }
          }, this), this.options.time.displayFormat && (this.displayFormat = this.options.time.displayFormat), this.ticks.push(this.firstTick.clone());

          for (var k = 1; k <= this.scaleSizeInUnits; ++k) {
            var _ = x.clone().add(k, this.tickUnit);

            if (this.options.time.max && _.diff(this.lastTick, this.tickUnit, !0) >= 0) break;
            k % this.unitScale === 0 && this.ticks.push(_);
          }

          var S = this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit);
          (0 !== S || 0 === this.scaleSizeInUnits) && (this.options.time.max ? (this.ticks.push(this.lastTick.clone()), this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, !0)) : (this.ticks.push(this.lastTick.clone()), this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0))), this.ctx.restore();
        },
        getLabelForIndex: function getLabelForIndex(t, e) {
          var i = this.chart.data.labels && t < this.chart.data.labels.length ? this.chart.data.labels[t] : "";
          return "object" == _typeof(this.chart.data.datasets[e].data[0]) && (i = this.getRightValue(this.chart.data.datasets[e].data[t])), this.options.time.tooltipFormat && (i = this.parseTime(i).format(this.options.time.tooltipFormat)), i;
        },
        tickFormatFunction: function tickFormatFunction(t, e, i) {
          var a = t.format(this.displayFormat);
          return this.options.ticks.userCallback ? this.options.ticks.userCallback(a, e, i) : a;
        },
        convertTicksToLabels: function convertTicksToLabels() {
          this.ticks = this.ticks.map(this.tickFormatFunction, this);
        },
        getPixelForValue: function getPixelForValue(t, e, i, a) {
          var s = t && t.isValid && t.isValid() ? t : this.getLabelMoment(i, e);

          if (s) {
            var o = s.diff(this.firstTick, this.tickUnit, !0),
                n = o / this.scaleSizeInUnits;

            if (this.isHorizontal()) {
              var r = this.width - (this.paddingLeft + this.paddingRight),
                  h = (r / Math.max(this.ticks.length - 1, 1), r * n + this.paddingLeft);
              return this.left + Math.round(h);
            }

            var l = this.height - (this.paddingTop + this.paddingBottom),
                c = (l / Math.max(this.ticks.length - 1, 1), l * n + this.paddingTop);
            return this.top + Math.round(c);
          }
        },
        getValueForPixel: function getValueForPixel(t) {
          var e = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom),
              i = (t - (this.isHorizontal() ? this.left + this.paddingLeft : this.top + this.paddingTop)) / e;
          return i *= this.scaleSizeInUnits, this.firstTick.clone().add(a.duration(i, this.tickUnit).asSeconds(), "seconds");
        },
        parseTime: function parseTime(t) {
          return "string" == typeof this.options.time.parser ? a(t, this.options.time.parser) : "function" == typeof this.options.time.parser ? this.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? a(t) : t.isValid && t.isValid() ? t : "string" != typeof this.options.time.format && this.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), this.options.time.format(t)) : a(t, this.options.time.format);
        }
      });
      t.scaleService.registerScaleType("time", o, s);
    };
  }, {
    moment: 6
  }]
}, {}, [7]);

/***/ }),

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! ../js/Chart.bundle.min.js */ "./assets/js/Chart.bundle.min.js");

__webpack_require__(/*! ../../node_modules/bootstrap/ */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! ../scss/app.scss */ "./assets/scss/app.scss");

__webpack_require__(/*! ../js/confirm.js */ "./assets/js/confirm.js");
/*
$(document).ready(function () {
    //var $ = require('jquery')
    var theHREF;

    $(".confirmModalLink").click(function(e) {
        e.preventDefault();
        theHREF = $(this).attr("href");
        $("#confirmModal").modal("show");
    });

    $("#confirmModalNo").click(function(e) {
        $("#confirmModal").modal("hide");
    });

    $("#confirmModalYes").click(function(e) {
        window.location.href = theHREF;
    });
});
*/

/***/ }),

/***/ "./assets/js/confirm.js":
/*!******************************!*\
  !*** ./assets/js/confirm.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).ready(function () {
  var theHREF;
  $(".confirmModalLink").click(function (e) {
    e.preventDefault();
    theHREF = $(this).attr("href");
    $("#confirmModal").modal("show");
  });
  $("#confirmModalNo").click(function (e) {
    $("#confirmModal").modal("hide");
  });
  $("#confirmModalYes").click(function (e) {
    window.location.href = theHREF;
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")) :
  undefined;
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map


/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.6
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;


  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthOddness = reference.width % 2 === popper.width % 2;
  var bothOddWidth = reference.width % 2 === 1 && popper.width % 2 === 1;
  var noRound = function noRound(v) {
    return v;
  };

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthOddness ? Math.round : Math.floor;
  var verticalToInteger = !shouldRound ? noRound : Math.round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["default"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

},[["./assets/js/app.js","runtime"]]]);