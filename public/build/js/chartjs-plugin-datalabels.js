(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/chartjs-plugin-datalabels"],{

/***/ "./assets/js/chartjs-plugin-datalabels.js":
/*!************************************************!*\
  !*** ./assets/js/chartjs-plugin-datalabels.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * @license
 * chartjs-plugin-datalabels
 * http://chartjs.org/
 * Version: 0.5.0
 *
 * Copyright 2018 Chart.js Contributors
 * Released under the MIT license
 * https://github.com/chartjs/chartjs-plugin-datalabels/blob/master/LICENSE.md
 */
(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'chart.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module 'chart.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(this, function (Chart) {
  'use strict';

  Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;
  var helpers = Chart.helpers;

  var devicePixelRatio = function () {
    if (typeof window !== 'undefined') {
      if (window.devicePixelRatio) {
        return window.devicePixelRatio;
      } // devicePixelRatio is undefined on IE10
      // https://stackoverflow.com/a/20204180/8837887
      // https://github.com/chartjs/chartjs-plugin-datalabels/issues/85


      var screen = window.screen;

      if (screen) {
        return (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);
      }
    }

    return 1;
  }();

  var utils = {
    // @todo move this in Chart.helpers.toTextLines
    toTextLines: function toTextLines(inputs) {
      var lines = [];
      var input;
      inputs = [].concat(inputs);

      while (inputs.length) {
        input = inputs.pop();

        if (typeof input === 'string') {
          lines.unshift.apply(lines, input.split('\n'));
        } else if (Array.isArray(input)) {
          inputs.push.apply(inputs, input);
        } else if (!helpers.isNullOrUndef(inputs)) {
          lines.unshift('' + input);
        }
      }

      return lines;
    },
    // @todo move this method in Chart.helpers.canvas.toFont (deprecates helpers.fontString)
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
    toFontString: function toFontString(font) {
      if (!font || helpers.isNullOrUndef(font.size) || helpers.isNullOrUndef(font.family)) {
        return null;
      }

      return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
    },
    // @todo move this in Chart.helpers.canvas.textSize
    // @todo cache calls of measureText if font doesn't change?!
    textSize: function textSize(ctx, lines, font) {
      var items = [].concat(lines);
      var ilen = items.length;
      var prev = ctx.font;
      var width = 0;
      var i;
      ctx.font = font.string;

      for (i = 0; i < ilen; ++i) {
        width = Math.max(ctx.measureText(items[i]).width, width);
      }

      ctx.font = prev;
      return {
        height: ilen * font.lineHeight,
        width: width
      };
    },
    // @todo move this method in Chart.helpers.options.toFont
    parseFont: function parseFont(value) {
      var global = Chart.defaults.global;
      var size = helpers.valueOrDefault(value.size, global.defaultFontSize);
      var font = {
        family: helpers.valueOrDefault(value.family, global.defaultFontFamily),
        lineHeight: helpers.options.toLineHeight(value.lineHeight, size),
        size: size,
        style: helpers.valueOrDefault(value.style, global.defaultFontStyle),
        weight: helpers.valueOrDefault(value.weight, null),
        string: ''
      };
      font.string = utils.toFontString(font);
      return font;
    },

    /**
     * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
     * @todo move this method in Chart.helpers.bound
     * https://doc.qt.io/qt-5/qtglobal.html#qBound
     */
    bound: function bound(min, value, max) {
      return Math.max(min, Math.min(value, max));
    },

    /**
     * Returns an array of pair [value, state] where state is:
     * * -1: value is only in a0 (removed)
     * *  1: value is only in a1 (added)
     */
    arrayDiff: function arrayDiff(a0, a1) {
      var prev = a0.slice();
      var updates = [];
      var i, j, ilen, v;

      for (i = 0, ilen = a1.length; i < ilen; ++i) {
        v = a1[i];
        j = prev.indexOf(v);

        if (j === -1) {
          updates.push([v, 1]);
        } else {
          prev.splice(j, 1);
        }
      }

      for (i = 0, ilen = prev.length; i < ilen; ++i) {
        updates.push([prev[i], -1]);
      }

      return updates;
    },

    /**
     * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
     */
    rasterize: function rasterize(v) {
      return Math.round(v * devicePixelRatio) / devicePixelRatio;
    }
  };

  function orient(point, origin) {
    var x0 = origin.x;
    var y0 = origin.y;

    if (x0 === null) {
      return {
        x: 0,
        y: -1
      };
    }

    if (y0 === null) {
      return {
        x: 1,
        y: 0
      };
    }

    var dx = point.x - x0;
    var dy = point.y - y0;
    var ln = Math.sqrt(dx * dx + dy * dy);
    return {
      x: ln ? dx / ln : 0,
      y: ln ? dy / ln : -1
    };
  }

  function aligned(x, y, vx, vy, align) {
    switch (align) {
      case 'center':
        vx = vy = 0;
        break;

      case 'bottom':
        vx = 0;
        vy = 1;
        break;

      case 'right':
        vx = 1;
        vy = 0;
        break;

      case 'left':
        vx = -1;
        vy = 0;
        break;

      case 'top':
        vx = 0;
        vy = -1;
        break;

      case 'start':
        vx = -vx;
        vy = -vy;
        break;

      case 'end':
        // keep natural orientation
        break;

      default:
        // clockwise rotation (in degree)
        align *= Math.PI / 180;
        vx = Math.cos(align);
        vy = Math.sin(align);
        break;
    }

    return {
      x: x,
      y: y,
      vx: vx,
      vy: vy
    };
  } // Line clipping (Cohen–Sutherland algorithm)
  // https://en.wikipedia.org/wiki/Cohen–Sutherland_algorithm


  var R_INSIDE = 0;
  var R_LEFT = 1;
  var R_RIGHT = 2;
  var R_BOTTOM = 4;
  var R_TOP = 8;

  function region(x, y, rect) {
    var res = R_INSIDE;

    if (x < rect.left) {
      res |= R_LEFT;
    } else if (x > rect.right) {
      res |= R_RIGHT;
    }

    if (y < rect.top) {
      res |= R_TOP;
    } else if (y > rect.bottom) {
      res |= R_BOTTOM;
    }

    return res;
  }

  function clipped(segment, area) {
    var x0 = segment.x0;
    var y0 = segment.y0;
    var x1 = segment.x1;
    var y1 = segment.y1;
    var r0 = region(x0, y0, area);
    var r1 = region(x1, y1, area);
    var r, x, y; // eslint-disable-next-line no-constant-condition

    while (true) {
      if (!(r0 | r1) || r0 & r1) {
        // both points inside or on the same side: no clipping
        break;
      } // at least one point is outside


      r = r0 || r1;

      if (r & R_TOP) {
        x = x0 + (x1 - x0) * (area.top - y0) / (y1 - y0);
        y = area.top;
      } else if (r & R_BOTTOM) {
        x = x0 + (x1 - x0) * (area.bottom - y0) / (y1 - y0);
        y = area.bottom;
      } else if (r & R_RIGHT) {
        y = y0 + (y1 - y0) * (area.right - x0) / (x1 - x0);
        x = area.right;
      } else if (r & R_LEFT) {
        y = y0 + (y1 - y0) * (area.left - x0) / (x1 - x0);
        x = area.left;
      }

      if (r === r0) {
        x0 = x;
        y0 = y;
        r0 = region(x0, y0, area);
      } else {
        x1 = x;
        y1 = y;
        r1 = region(x1, y1, area);
      }
    }

    return {
      x0: x0,
      x1: x1,
      y0: y0,
      y1: y1
    };
  }

  function compute(range, config) {
    var anchor = config.anchor;
    var segment = range;
    var x, y;

    if (config.clamp) {
      segment = clipped(segment, config.area);
    }

    if (anchor === 'start') {
      x = segment.x0;
      y = segment.y0;
    } else if (anchor === 'end') {
      x = segment.x1;
      y = segment.y1;
    } else {
      x = (segment.x0 + segment.x1) / 2;
      y = (segment.y0 + segment.y1) / 2;
    }

    return aligned(x, y, range.vx, range.vy, config.align);
  }

  var positioners = {
    arc: function arc(vm, config) {
      var angle = (vm.startAngle + vm.endAngle) / 2;
      var vx = Math.cos(angle);
      var vy = Math.sin(angle);
      var r0 = vm.innerRadius;
      var r1 = vm.outerRadius;
      return compute({
        x0: vm.x + vx * r0,
        y0: vm.y + vy * r0,
        x1: vm.x + vx * r1,
        y1: vm.y + vy * r1,
        vx: vx,
        vy: vy
      }, config);
    },
    point: function point(vm, config) {
      var v = orient(vm, config.origin);
      var rx = v.x * vm.radius;
      var ry = v.y * vm.radius;
      return compute({
        x0: vm.x - rx,
        y0: vm.y - ry,
        x1: vm.x + rx,
        y1: vm.y + ry,
        vx: v.x,
        vy: v.y
      }, config);
    },
    rect: function rect(vm, config) {
      var v = orient(vm, config.origin);
      var x = vm.x;
      var y = vm.y;
      var sx = 0;
      var sy = 0;

      if (vm.horizontal) {
        x = Math.min(vm.x, vm.base);
        sx = Math.abs(vm.base - vm.x);
      } else {
        y = Math.min(vm.y, vm.base);
        sy = Math.abs(vm.base - vm.y);
      }

      return compute({
        x0: x,
        y0: y + sy,
        x1: x + sx,
        y1: y,
        vx: v.x,
        vy: v.y
      }, config);
    },
    fallback: function fallback(vm, config) {
      var v = orient(vm, config.origin);
      return compute({
        x0: vm.x,
        y0: vm.y,
        x1: vm.x,
        y1: vm.y,
        vx: v.x,
        vy: v.y
      }, config);
    }
  };
  var helpers$1 = Chart.helpers;
  var rasterize = utils.rasterize;

  function boundingRects(model) {
    var borderWidth = model.borderWidth || 0;
    var padding = model.padding;
    var th = model.size.height;
    var tw = model.size.width;
    var tx = -tw / 2;
    var ty = -th / 2;
    return {
      frame: {
        x: tx - padding.left - borderWidth,
        y: ty - padding.top - borderWidth,
        w: tw + padding.width + borderWidth * 2,
        h: th + padding.height + borderWidth * 2
      },
      text: {
        x: tx,
        y: ty,
        w: tw,
        h: th
      }
    };
  }

  function getScaleOrigin(el) {
    var horizontal = el._model.horizontal;
    var scale = el._scale || horizontal && el._xScale || el._yScale;

    if (!scale) {
      return null;
    }

    if (scale.xCenter !== undefined && scale.yCenter !== undefined) {
      return {
        x: scale.xCenter,
        y: scale.yCenter
      };
    }

    var pixel = scale.getBasePixel();
    return horizontal ? {
      x: pixel,
      y: null
    } : {
      x: null,
      y: pixel
    };
  }

  function getPositioner(el) {
    if (el instanceof Chart.elements.Arc) {
      return positioners.arc;
    }

    if (el instanceof Chart.elements.Point) {
      return positioners.point;
    }

    if (el instanceof Chart.elements.Rectangle) {
      return positioners.rect;
    }

    return positioners.fallback;
  }

  function drawFrame(ctx, rect, model) {
    var bgColor = model.backgroundColor;
    var borderColor = model.borderColor;
    var borderWidth = model.borderWidth;

    if (!bgColor && (!borderColor || !borderWidth)) {
      return;
    }

    ctx.beginPath();
    helpers$1.canvas.roundedRect(ctx, rasterize(rect.x) + borderWidth / 2, rasterize(rect.y) + borderWidth / 2, rasterize(rect.w) - borderWidth, rasterize(rect.h) - borderWidth, model.borderRadius);
    ctx.closePath();

    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fill();
    }

    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'miter';
      ctx.stroke();
    }
  }

  function textGeometry(rect, align, font) {
    var h = font.lineHeight;
    var w = rect.w;
    var x = rect.x;
    var y = rect.y + h / 2;

    if (align === 'center') {
      x += w / 2;
    } else if (align === 'end' || align === 'right') {
      x += w;
    }

    return {
      h: h,
      w: w,
      x: x,
      y: y
    };
  }

  function drawTextLine(ctx, text, cfg) {
    var shadow = ctx.shadowBlur;
    var stroked = cfg.stroked;
    var x = rasterize(cfg.x);
    var y = rasterize(cfg.y);
    var w = rasterize(cfg.w);

    if (stroked) {
      ctx.strokeText(text, x, y, w);
    }

    if (cfg.filled) {
      if (shadow && stroked) {
        // Prevent drawing shadow on both the text stroke and fill, so
        // if the text is stroked, remove the shadow for the text fill.
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y, w);

      if (shadow && stroked) {
        ctx.shadowBlur = shadow;
      }
    }
  }

  function drawText(ctx, lines, rect, model) {
    var align = model.textAlign;
    var color = model.color;
    var filled = !!color;
    var font = model.font;
    var ilen = lines.length;
    var strokeColor = model.textStrokeColor;
    var strokeWidth = model.textStrokeWidth;
    var stroked = strokeColor && strokeWidth;
    var i;

    if (!ilen || !filled && !stroked) {
      return;
    } // Adjust coordinates based on text alignment and line height


    rect = textGeometry(rect, align, font);
    ctx.font = font.string;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = model.textShadowBlur;
    ctx.shadowColor = model.textShadowColor;

    if (filled) {
      ctx.fillStyle = color;
    }

    if (stroked) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
    }

    for (i = 0, ilen = lines.length; i < ilen; ++i) {
      drawTextLine(ctx, lines[i], {
        stroked: stroked,
        filled: filled,
        w: rect.w,
        x: rect.x,
        y: rect.y + rect.h * i
      });
    }
  }

  var Label = function Label(config, ctx, el, index) {
    var me = this;
    me._config = config;
    me._index = index;
    me._model = null;
    me._rects = null;
    me._ctx = ctx;
    me._el = el;
  };

  helpers$1.extend(Label.prototype, {
    /**
     * @private
     */
    _modelize: function _modelize(display, lines, config, context) {
      var me = this;
      var index = me._index;
      var resolve = helpers$1.options.resolve;
      var font = utils.parseFont(resolve([config.font, {}], context, index));
      var color = resolve([config.color, Chart.defaults.global.defaultFontColor], context, index);
      return {
        align: resolve([config.align, 'center'], context, index),
        anchor: resolve([config.anchor, 'center'], context, index),
        area: context.chart.chartArea,
        backgroundColor: resolve([config.backgroundColor, null], context, index),
        borderColor: resolve([config.borderColor, null], context, index),
        borderRadius: resolve([config.borderRadius, 0], context, index),
        borderWidth: resolve([config.borderWidth, 0], context, index),
        clamp: resolve([config.clamp, false], context, index),
        clip: resolve([config.clip, false], context, index),
        color: color,
        display: display,
        font: font,
        lines: lines,
        offset: resolve([config.offset, 0], context, index),
        opacity: resolve([config.opacity, 1], context, index),
        origin: getScaleOrigin(me._el),
        padding: helpers$1.options.toPadding(resolve([config.padding, 0], context, index)),
        positioner: getPositioner(me._el),
        rotation: resolve([config.rotation, 0], context, index) * (Math.PI / 180),
        size: utils.textSize(me._ctx, lines, font),
        textAlign: resolve([config.textAlign, 'start'], context, index),
        textShadowBlur: resolve([config.textShadowBlur, 0], context, index),
        textShadowColor: resolve([config.textShadowColor, color], context, index),
        textStrokeColor: resolve([config.textStrokeColor, color], context, index),
        textStrokeWidth: resolve([config.textStrokeWidth, 0], context, index)
      };
    },
    update: function update(context) {
      var me = this;
      var model = null;
      var rects = null;
      var index = me._index;
      var config = me._config;
      var value, label, lines; // We first resolve the display option (separately) to avoid computing
      // other options in case the label is hidden (i.e. display: false).

      var display = helpers$1.options.resolve([config.display, true], context, index);

      if (display) {
        value = context.dataset.data[index];
        label = helpers$1.valueOrDefault(helpers$1.callback(config.formatter, [value, context]), value);
        lines = helpers$1.isNullOrUndef(label) ? [] : utils.toTextLines(label);

        if (lines.length) {
          model = me._modelize(display, lines, config, context);
          rects = boundingRects(model);
        }
      }

      me._model = model;
      me._rects = rects;
    },
    geometry: function geometry() {
      return this._rects ? this._rects.frame : {};
    },
    rotation: function rotation() {
      return this._model ? this._model.rotation : 0;
    },
    visible: function visible() {
      return this._model && this._model.opacity;
    },
    model: function model() {
      return this._model;
    },
    draw: function draw(chart, center) {
      var me = this;
      var ctx = chart.ctx;
      var model = me._model;
      var rects = me._rects;
      var area;

      if (!this.visible()) {
        return;
      }

      ctx.save();

      if (model.clip) {
        area = model.area;
        ctx.beginPath();
        ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
        ctx.clip();
      }

      ctx.globalAlpha = utils.bound(0, model.opacity, 1);
      ctx.translate(rasterize(center.x), rasterize(center.y));
      ctx.rotate(model.rotation);
      drawFrame(ctx, rects.frame, model);
      drawText(ctx, model.lines, rects.text, model);
      ctx.restore();
    }
  });
  var helpers$2 = Chart.helpers;
  var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
  var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

  function rotated(point, center, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var cx = center.x;
    var cy = center.y;
    return {
      x: cx + cos * (point.x - cx) - sin * (point.y - cy),
      y: cy + sin * (point.x - cx) + cos * (point.y - cy)
    };
  }

  function projected(points, axis) {
    var min = MAX_INTEGER;
    var max = MIN_INTEGER;
    var origin = axis.origin;
    var i, pt, vx, vy, dp;

    for (i = 0; i < points.length; ++i) {
      pt = points[i];
      vx = pt.x - origin.x;
      vy = pt.y - origin.y;
      dp = axis.vx * vx + axis.vy * vy;
      min = Math.min(min, dp);
      max = Math.max(max, dp);
    }

    return {
      min: min,
      max: max
    };
  }

  function toAxis(p0, p1) {
    var vx = p1.x - p0.x;
    var vy = p1.y - p0.y;
    var ln = Math.sqrt(vx * vx + vy * vy);
    return {
      vx: (p1.x - p0.x) / ln,
      vy: (p1.y - p0.y) / ln,
      origin: p0,
      ln: ln
    };
  }

  var HitBox = function HitBox() {
    this._rotation = 0;
    this._rect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
  };

  helpers$2.extend(HitBox.prototype, {
    center: function center() {
      var r = this._rect;
      return {
        x: r.x + r.w / 2,
        y: r.y + r.h / 2
      };
    },
    update: function update(center, rect, rotation) {
      this._rotation = rotation;
      this._rect = {
        x: rect.x + center.x,
        y: rect.y + center.y,
        w: rect.w,
        h: rect.h
      };
    },
    contains: function contains(point) {
      var me = this;
      var margin = 1;
      var rect = me._rect;
      point = rotated(point, me.center(), -me._rotation);
      return !(point.x < rect.x - margin || point.y < rect.y - margin || point.x > rect.x + rect.w + margin * 2 || point.y > rect.y + rect.h + margin * 2);
    },
    // Separating Axis Theorem
    // https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
    intersects: function intersects(other) {
      var r0 = this._points();

      var r1 = other._points();

      var axes = [toAxis(r0[0], r0[1]), toAxis(r0[0], r0[3])];
      var i, pr0, pr1;

      if (this._rotation !== other._rotation) {
        // Only separate with r1 axis if the rotation is different,
        // else it's enough to separate r0 and r1 with r0 axis only!
        axes.push(toAxis(r1[0], r1[1]), toAxis(r1[0], r1[3]));
      }

      for (i = 0; i < axes.length; ++i) {
        pr0 = projected(r0, axes[i]);
        pr1 = projected(r1, axes[i]);

        if (pr0.max < pr1.min || pr1.max < pr0.min) {
          return false;
        }
      }

      return true;
    },

    /**
     * @private
     */
    _points: function _points() {
      var me = this;
      var rect = me._rect;
      var angle = me._rotation;
      var center = me.center();
      return [rotated({
        x: rect.x,
        y: rect.y
      }, center, angle), rotated({
        x: rect.x + rect.w,
        y: rect.y
      }, center, angle), rotated({
        x: rect.x + rect.w,
        y: rect.y + rect.h
      }, center, angle), rotated({
        x: rect.x,
        y: rect.y + rect.h
      }, center, angle)];
    }
  });

  function coordinates(view, model, geometry) {
    var point = model.positioner(view, model);
    var vx = point.vx;
    var vy = point.vy;

    if (!vx && !vy) {
      // if aligned center, we don't want to offset the center point
      return {
        x: point.x,
        y: point.y
      };
    }

    var w = geometry.w;
    var h = geometry.h; // take in account the label rotation

    var rotation = model.rotation;
    var dx = Math.abs(w / 2 * Math.cos(rotation)) + Math.abs(h / 2 * Math.sin(rotation));
    var dy = Math.abs(w / 2 * Math.sin(rotation)) + Math.abs(h / 2 * Math.cos(rotation)); // scale the unit vector (vx, vy) to get at least dx or dy equal to
    // w or h respectively (else we would calculate the distance to the
    // ellipse inscribed in the bounding rect)

    var vs = 1 / Math.max(Math.abs(vx), Math.abs(vy));
    dx *= vx * vs;
    dy *= vy * vs; // finally, include the explicit offset

    dx += model.offset * vx;
    dy += model.offset * vy;
    return {
      x: point.x + dx,
      y: point.y + dy
    };
  }

  function collide(labels, collider) {
    var i, j, s0, s1; // IMPORTANT Iterate in the reverse order since items at the end of the
    // list have an higher weight/priority and thus should be less impacted
    // by the overlapping strategy.

    for (i = labels.length - 1; i >= 0; --i) {
      s0 = labels[i].$layout;

      for (j = i - 1; j >= 0 && s0._visible; --j) {
        s1 = labels[j].$layout;

        if (s1._visible && s0._box.intersects(s1._box)) {
          collider(s0, s1);
        }
      }
    }

    return labels;
  }

  function compute$1(labels) {
    var i, ilen, label, state, geometry, center; // Initialize labels for overlap detection

    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      label = labels[i];
      state = label.$layout;

      if (state._visible) {
        geometry = label.geometry();
        center = coordinates(label._el._model, label.model(), geometry);

        state._box.update(center, geometry, label.rotation());
      }
    } // Auto hide overlapping labels


    return collide(labels, function (s0, s1) {
      var h0 = s0._hidable;
      var h1 = s1._hidable;

      if (h0 && h1 || h1) {
        s1._visible = false;
      } else if (h0) {
        s0._visible = false;
      }
    });
  }

  var layout = {
    prepare: function prepare(datasets) {
      var labels = [];
      var i, j, ilen, jlen, label;

      for (i = 0, ilen = datasets.length; i < ilen; ++i) {
        for (j = 0, jlen = datasets[i].length; j < jlen; ++j) {
          label = datasets[i][j];
          labels.push(label);
          label.$layout = {
            _box: new HitBox(),
            _hidable: false,
            _visible: true,
            _set: i,
            _idx: j
          };
        }
      } // TODO New `z` option: labels with a higher z-index are drawn
      // of top of the ones with a lower index. Lowest z-index labels
      // are also discarded first when hiding overlapping labels.


      labels.sort(function (a, b) {
        var sa = a.$layout;
        var sb = b.$layout;
        return sa._idx === sb._idx ? sa._set - sb._set : sb._idx - sa._idx;
      });
      this.update(labels);
      return labels;
    },
    update: function update(labels) {
      var dirty = false;
      var i, ilen, label, model, state;

      for (i = 0, ilen = labels.length; i < ilen; ++i) {
        label = labels[i];
        model = label.model();
        state = label.$layout;
        state._hidable = model && model.display === 'auto';
        state._visible = label.visible();
        dirty |= state._hidable;
      }

      if (dirty) {
        compute$1(labels);
      }
    },
    lookup: function lookup(labels, point) {
      var i, state; // IMPORTANT Iterate in the reverse order since items at the end of
      // the list have an higher z-index, thus should be picked first.

      for (i = labels.length - 1; i >= 0; --i) {
        state = labels[i].$layout;

        if (state && state._visible && state._box.contains(point)) {
          return {
            dataset: state._set,
            label: labels[i]
          };
        }
      }

      return null;
    },
    draw: function draw(chart, labels) {
      var i, ilen, label, state, geometry, center;

      for (i = 0, ilen = labels.length; i < ilen; ++i) {
        label = labels[i];
        state = label.$layout;

        if (state._visible) {
          geometry = label.geometry();
          center = coordinates(label._el._view, label.model(), geometry);

          state._box.update(center, geometry, label.rotation());

          label.draw(chart, center);
        }
      }
    }
  };
  /**
   * @module Options
   */

  var helpers$3 = Chart.helpers;
  var defaults = {
    /**
     * The label box alignment relative to `anchor` that can be expressed either by a number
     * representing the clockwise angle (in degree) or by one of the following string presets:
     * - 'start': before the anchor point, following the same direction
     * - 'end': after the anchor point, following the same direction
     * - 'center': centered on the anchor point
     * - 'right': 0°
     * - 'bottom': 90°
     * - 'left': 180°
     * - 'top': 270°
     * @member {String|Number|Array|Function}
     * @default 'center'
     */
    align: 'center',

    /**
     * The label box alignment relative to the element ('start'|'center'|'end')
     * @member {String|Array|Function}
     * @default 'center'
     */
    anchor: 'center',

    /**
     * The color used to draw the background of the surrounding frame.
     * @member {String|Array|Function|null}
     * @default null (no background)
     */
    backgroundColor: null,

    /**
     * The color used to draw the border of the surrounding frame.
     * @member {String|Array|Function|null}
     * @default null (no border)
     */
    borderColor: null,

    /**
     * The border radius used to add rounded corners to the surrounding frame.
     * @member {Number|Array|Function}
     * @default 0 (not rounded)
     */
    borderRadius: 0,

    /**
     * The border width of the surrounding frame.
     * @member {Number|Array|Function}
     * @default 0 (no border)
     */
    borderWidth: 0,

    /**
     * When `true`, the anchor position is calculated based on the visible
     * geometry of the associated element (i.e. part inside the chart area).
     * @see https://github.com/chartjs/chartjs-plugin-datalabels/issues/98
     * @member {Boolean|Array|Function}
     * @default false
     */
    clamp: false,

    /**
     * Clip the label drawing to the chart area.
     * @member {Boolean|Array|Function}
     * @default false (no clipping)
     */
    clip: false,

    /**
     * The color used to draw the label text.
     * @member {String|Array|Function}
     * @default undefined (use Chart.defaults.global.defaultFontColor)
     */
    color: undefined,

    /**
     * When `false`, the label is hidden and associated options are not
     * calculated, else if `true`, the label is drawn. If `auto`, the
     * label is automatically hidden if it appears under another label.
     * @member {Boolean|String|Array|Function}
     * @default true
     */
    display: true,

    /**
     * The font options used to draw the label text.
     * @member {Object|Array|Function}
     * @prop {String} font.family - defaults to Chart.defaults.global.defaultFontFamily
     * @prop {Number} font.lineHeight - defaults to 1.2
     * @prop {Number} font.size - defaults to Chart.defaults.global.defaultFontSize
     * @prop {String} font.style - defaults to Chart.defaults.global.defaultFontStyle
     * @prop {Number} font.weight - defaults to 'normal'
     * @default Chart.defaults.global.defaultFont.*
     */
    font: {
      family: undefined,
      lineHeight: 1.2,
      size: undefined,
      style: undefined,
      weight: null
    },

    /**
     * Allows to customize the label text by transforming input data.
     * @member {Function|null}
     * @prop {*} value - The data value
     * @prop {Object} context - The function unique argument:
     * @prop {Chart} context.chart - The current chart
     * @prop {Number} context.dataIndex - Index of the current data
     * @prop {Object} context.dataset - The current dataset
     * @prop {Number} context.datasetIndex - Index of the current dataset
     * @default data[index]
     */
    formatter: function formatter(value) {
      if (helpers$3.isNullOrUndef(value)) {
        return null;
      }

      var label = value;
      var keys, klen, k;

      if (helpers$3.isObject(value)) {
        if (!helpers$3.isNullOrUndef(value.label)) {
          label = value.label;
        } else if (!helpers$3.isNullOrUndef(value.r)) {
          label = value.r;
        } else {
          label = '';
          keys = Object.keys(value);

          for (k = 0, klen = keys.length; k < klen; ++k) {
            label += (k !== 0 ? ', ' : '') + keys[k] + ': ' + value[keys[k]];
          }
        }
      }

      return '' + label;
    },

    /**
     * Event listeners, where the property is the type of the event to listen and the value
     * a callback with a unique `context` argument containing the same information as for
     * scriptable options. If a callback explicitly returns `true`, the label is updated
     * with the current context and the chart re-rendered. This allows to implement visual
     * interactions with labels such as highlight, selection, etc.
     *
     * Event currently supported are:
     * - 'click': a mouse click is detected within a label
     * - 'enter': the mouse enters a label
     * - 'leave': the mouse leaves a label
     *
     * @member {Object}
     * @default {}
     */
    listeners: {},

    /**
     * The distance (in pixels) to pull the label away from the anchor point, the direction
     * being determined by the `align` value (only applicable if `align` is `start` or `end`).
     * @member {Number|Array|Function}
     * @default 4
     */
    offset: 4,

    /**
     * The label global opacity, including the text, background, borders, etc., specified as
     * a number between 0.0 (fully transparent) and 1.0 (fully opaque).
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
     * @member {Number|Array|Function}
     * @default 1
     */
    opacity: 1,

    /**
     * The padding (in pixels) to apply between the text and the surrounding frame.
     * @member {Number|Object|Array|Function}
     * @prop {Number} padding.top - Space above the text.
     * @prop {Number} padding.right - Space on the right of the text.
     * @prop {Number} padding.bottom - Space below the text.
     * @prop {Number} padding.left - Space on the left of the text.
     * @default 4 (all values)
     */
    padding: {
      top: 4,
      right: 4,
      bottom: 4,
      left: 4
    },

    /**
     * Clockwise rotation of the label relative to its center.
     * @member {Number|Array|Function}
     * @default 0
     */
    rotation: 0,

    /**
     * Text alignment for multi-lines labels ('left'|'right'|'start'|'center'|'end').
     * @member {String|Array|Function}
     * @default 'start'
     */
    textAlign: 'start',

    /**
     * The stroke color used to draw the label text. If this options is
     * not set (default), the value of the `color` option will be used.
     * @member {String|Array|Function|null}
     * @default color
     */
    textStrokeColor: undefined,

    /**
     * The width of the stroke for the label text.
     * @member {Number|Array|Function}
     * @default 0 (no stroke)
     */
    textStrokeWidth: 0,

    /**
     * The amount of blur applied to shadow under the label text.
     * @member {Number|Array|Function}
     * @default 0 (no shadow)
     */
    textShadowBlur: 0,

    /**
     * The color of the shadow under the label text.
     * @member {String|Array|Function|null}
     * @default `color`
     */
    textShadowColor: undefined
  };
  /**
   * @see https://github.com/chartjs/Chart.js/issues/4176
   */

  var helpers$4 = Chart.helpers;
  var EXPANDO_KEY = '$datalabels';
  Chart.defaults.global.plugins.datalabels = defaults;

  function configure(dataset, options) {
    var override = dataset.datalabels;
    var config = {};

    if (override === false) {
      return null;
    }

    if (override === true) {
      override = {};
    }

    return helpers$4.merge(config, [options, override]);
  }

  function dispatchEvent(chart, listeners, target) {
    var callback = listeners && listeners[target.dataset];

    if (!callback) {
      return;
    }

    var label = target.label;
    var context = label.$context;

    if (helpers$4.callback(callback, [context]) === true) {
      // Users are allowed to tweak the given context by injecting values that can be
      // used in scriptable options to display labels differently based on the current
      // event (e.g. highlight an hovered label). That's why we update the label with
      // the output context and schedule a new chart render by setting it dirty.
      chart[EXPANDO_KEY]._dirty = true;
      label.update(context);
    }
  }

  function dispatchMoveEvents(chart, listeners, previous, target) {
    var enter, leave;

    if (!previous && !target) {
      return;
    }

    if (!previous) {
      enter = true;
    } else if (!target) {
      leave = true;
    } else if (previous.label !== target.label) {
      leave = enter = true;
    }

    if (leave) {
      dispatchEvent(chart, listeners.leave, previous);
    }

    if (enter) {
      dispatchEvent(chart, listeners.enter, target);
    }
  }

  function handleMoveEvents(chart, event) {
    var expando = chart[EXPANDO_KEY];
    var listeners = expando._listeners;
    var previous, target;

    if (!listeners.enter && !listeners.leave) {
      return;
    }

    if (event.type === 'mousemove') {
      target = layout.lookup(expando._labels, event);
    } else if (event.type !== 'mouseout') {
      return;
    }

    previous = expando._hovered;
    expando._hovered = target;
    dispatchMoveEvents(chart, listeners, previous, target);
  }

  function handleClickEvents(chart, event) {
    var expando = chart[EXPANDO_KEY];
    var handlers = expando._listeners.click;
    var target = handlers && layout.lookup(expando._labels, event);

    if (target) {
      dispatchEvent(chart, handlers, target);
    }
  }

  Chart.defaults.global.plugins.datalabels = defaults;
  var plugin = {
    id: 'datalabels',
    beforeInit: function beforeInit(chart) {
      chart[EXPANDO_KEY] = {
        _actives: []
      };
    },
    beforeUpdate: function beforeUpdate(chart) {
      var expando = chart[EXPANDO_KEY];
      expando._listened = false;
      expando._listeners = {}; // {event-type: {dataset-index: function}}

      expando._datasets = []; // per dataset labels: [[Label]]

      expando._labels = []; // layouted labels: [Label]
    },
    afterDatasetUpdate: function afterDatasetUpdate(chart, args, options) {
      var datasetIndex = args.index;
      var expando = chart[EXPANDO_KEY];
      var labels = expando._datasets[datasetIndex] = [];
      var visible = chart.isDatasetVisible(datasetIndex);
      var dataset = chart.data.datasets[datasetIndex];
      var config = configure(dataset, options);
      var elements = args.meta.data || [];
      var ilen = elements.length;
      var ctx = chart.ctx;
      var i, el, label;
      ctx.save();

      for (i = 0; i < ilen; ++i) {
        el = elements[i];

        if (visible && el && !el.hidden && !el._model.skip) {
          labels.push(label = new Label(config, ctx, el, i));
          label.update(label.$context = {
            active: false,
            chart: chart,
            dataIndex: i,
            dataset: dataset,
            datasetIndex: datasetIndex
          });
        } else {
          label = null;
        }

        el[EXPANDO_KEY] = label;
      }

      ctx.restore(); // Store listeners at the chart level and per event type to optimize
      // cases where no listeners are registered for a specific event

      helpers$4.merge(expando._listeners, config.listeners || {}, {
        merger: function merger(key, target, source) {
          target[key] = target[key] || {};
          target[key][args.index] = source[key];
          expando._listened = true;
        }
      });
    },
    afterUpdate: function afterUpdate(chart, options) {
      chart[EXPANDO_KEY]._labels = layout.prepare(chart[EXPANDO_KEY]._datasets, options);
    },
    // Draw labels on top of all dataset elements
    // https://github.com/chartjs/chartjs-plugin-datalabels/issues/29
    // https://github.com/chartjs/chartjs-plugin-datalabels/issues/32
    afterDatasetsDraw: function afterDatasetsDraw(chart) {
      layout.draw(chart, chart[EXPANDO_KEY]._labels);
    },
    beforeEvent: function beforeEvent(chart, event) {
      // If there is no listener registered for this chart, `listened` will be false,
      // meaning we can immediately ignore the incoming event and avoid useless extra
      // computation for users who don't implement label interactions.
      if (chart[EXPANDO_KEY]._listened) {
        switch (event.type) {
          case 'mousemove':
          case 'mouseout':
            handleMoveEvents(chart, event);
            break;

          case 'click':
            handleClickEvents(chart, event);
            break;

          default:
        }
      }
    },
    afterEvent: function afterEvent(chart) {
      var expando = chart[EXPANDO_KEY];
      var previous = expando._actives;
      var actives = expando._actives = chart.lastActive || []; // public API?!

      var updates = utils.arrayDiff(previous, actives);
      var i, ilen, update, label;

      for (i = 0, ilen = updates.length; i < ilen; ++i) {
        update = updates[i];

        if (update[1]) {
          label = update[0][EXPANDO_KEY];

          if (label) {
            label.$context.active = update[1] === 1;
            label.update(label.$context);
          }
        }
      }

      if (expando._dirty || updates.length) {
        layout.update(expando._labels);

        if (!chart.animating) {
          chart.render();
        }
      }

      delete expando._dirty;
    }
  }; // TODO Remove at version 1, we shouldn't automatically register plugins.
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/42

  Chart.plugins.register(plugin);
  return plugin;
});

/***/ })

},[["./assets/js/chartjs-plugin-datalabels.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJkZWZpbmUiLCJDaGFydCIsImhhc093blByb3BlcnR5IiwiaGVscGVycyIsImRldmljZVBpeGVsUmF0aW8iLCJ3aW5kb3ciLCJzY3JlZW4iLCJkZXZpY2VYRFBJIiwibG9naWNhbFhEUEkiLCJ1dGlscyIsInRvVGV4dExpbmVzIiwiaW5wdXRzIiwibGluZXMiLCJpbnB1dCIsImNvbmNhdCIsImxlbmd0aCIsInBvcCIsInVuc2hpZnQiLCJhcHBseSIsInNwbGl0IiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImlzTnVsbE9yVW5kZWYiLCJ0b0ZvbnRTdHJpbmciLCJmb250Iiwic2l6ZSIsImZhbWlseSIsInN0eWxlIiwid2VpZ2h0IiwidGV4dFNpemUiLCJjdHgiLCJpdGVtcyIsImlsZW4iLCJwcmV2Iiwid2lkdGgiLCJpIiwic3RyaW5nIiwiTWF0aCIsIm1heCIsIm1lYXN1cmVUZXh0IiwiaGVpZ2h0IiwibGluZUhlaWdodCIsInBhcnNlRm9udCIsInZhbHVlIiwiZGVmYXVsdHMiLCJ2YWx1ZU9yRGVmYXVsdCIsImRlZmF1bHRGb250U2l6ZSIsImRlZmF1bHRGb250RmFtaWx5Iiwib3B0aW9ucyIsInRvTGluZUhlaWdodCIsImRlZmF1bHRGb250U3R5bGUiLCJib3VuZCIsIm1pbiIsImFycmF5RGlmZiIsImEwIiwiYTEiLCJzbGljZSIsInVwZGF0ZXMiLCJqIiwidiIsImluZGV4T2YiLCJzcGxpY2UiLCJyYXN0ZXJpemUiLCJyb3VuZCIsIm9yaWVudCIsInBvaW50Iiwib3JpZ2luIiwieDAiLCJ4IiwieTAiLCJ5IiwiZHgiLCJkeSIsImxuIiwic3FydCIsImFsaWduZWQiLCJ2eCIsInZ5IiwiYWxpZ24iLCJQSSIsImNvcyIsInNpbiIsIlJfSU5TSURFIiwiUl9MRUZUIiwiUl9SSUdIVCIsIlJfQk9UVE9NIiwiUl9UT1AiLCJyZWdpb24iLCJyZWN0IiwicmVzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiY2xpcHBlZCIsInNlZ21lbnQiLCJhcmVhIiwieDEiLCJ5MSIsInIwIiwicjEiLCJyIiwiY29tcHV0ZSIsInJhbmdlIiwiY29uZmlnIiwiYW5jaG9yIiwiY2xhbXAiLCJwb3NpdGlvbmVycyIsImFyYyIsInZtIiwiYW5nbGUiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJpbm5lclJhZGl1cyIsIm91dGVyUmFkaXVzIiwicngiLCJyYWRpdXMiLCJyeSIsInN4Iiwic3kiLCJob3Jpem9udGFsIiwiYmFzZSIsImFicyIsImZhbGxiYWNrIiwiaGVscGVycyQxIiwiYm91bmRpbmdSZWN0cyIsIm1vZGVsIiwiYm9yZGVyV2lkdGgiLCJwYWRkaW5nIiwidGgiLCJ0dyIsInR4IiwidHkiLCJmcmFtZSIsInciLCJoIiwidGV4dCIsImdldFNjYWxlT3JpZ2luIiwiZWwiLCJfbW9kZWwiLCJzY2FsZSIsIl9zY2FsZSIsIl94U2NhbGUiLCJfeVNjYWxlIiwieENlbnRlciIsInVuZGVmaW5lZCIsInlDZW50ZXIiLCJwaXhlbCIsImdldEJhc2VQaXhlbCIsImdldFBvc2l0aW9uZXIiLCJlbGVtZW50cyIsIkFyYyIsIlBvaW50IiwiUmVjdGFuZ2xlIiwiZHJhd0ZyYW1lIiwiYmdDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiYmVnaW5QYXRoIiwiY2FudmFzIiwicm91bmRlZFJlY3QiLCJib3JkZXJSYWRpdXMiLCJjbG9zZVBhdGgiLCJmaWxsU3R5bGUiLCJmaWxsIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJsaW5lSm9pbiIsInN0cm9rZSIsInRleHRHZW9tZXRyeSIsImRyYXdUZXh0TGluZSIsImNmZyIsInNoYWRvdyIsInNoYWRvd0JsdXIiLCJzdHJva2VkIiwic3Ryb2tlVGV4dCIsImZpbGxlZCIsImZpbGxUZXh0IiwiZHJhd1RleHQiLCJ0ZXh0QWxpZ24iLCJjb2xvciIsInN0cm9rZUNvbG9yIiwidGV4dFN0cm9rZUNvbG9yIiwic3Ryb2tlV2lkdGgiLCJ0ZXh0U3Ryb2tlV2lkdGgiLCJ0ZXh0QmFzZWxpbmUiLCJ0ZXh0U2hhZG93Qmx1ciIsInNoYWRvd0NvbG9yIiwidGV4dFNoYWRvd0NvbG9yIiwiTGFiZWwiLCJpbmRleCIsIm1lIiwiX2NvbmZpZyIsIl9pbmRleCIsIl9yZWN0cyIsIl9jdHgiLCJfZWwiLCJleHRlbmQiLCJwcm90b3R5cGUiLCJfbW9kZWxpemUiLCJkaXNwbGF5IiwiY29udGV4dCIsInJlc29sdmUiLCJkZWZhdWx0Rm9udENvbG9yIiwiY2hhcnQiLCJjaGFydEFyZWEiLCJjbGlwIiwib2Zmc2V0Iiwib3BhY2l0eSIsInRvUGFkZGluZyIsInBvc2l0aW9uZXIiLCJyb3RhdGlvbiIsInVwZGF0ZSIsInJlY3RzIiwibGFiZWwiLCJkYXRhc2V0IiwiZGF0YSIsImNhbGxiYWNrIiwiZm9ybWF0dGVyIiwiZ2VvbWV0cnkiLCJ2aXNpYmxlIiwiZHJhdyIsImNlbnRlciIsInNhdmUiLCJnbG9iYWxBbHBoYSIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsInJlc3RvcmUiLCJoZWxwZXJzJDIiLCJNSU5fSU5URUdFUiIsIk51bWJlciIsIk1JTl9TQUZFX0lOVEVHRVIiLCJNQVhfSU5URUdFUiIsIk1BWF9TQUZFX0lOVEVHRVIiLCJyb3RhdGVkIiwiY3giLCJjeSIsInByb2plY3RlZCIsInBvaW50cyIsImF4aXMiLCJwdCIsImRwIiwidG9BeGlzIiwicDAiLCJwMSIsIkhpdEJveCIsIl9yb3RhdGlvbiIsIl9yZWN0IiwiY29udGFpbnMiLCJtYXJnaW4iLCJpbnRlcnNlY3RzIiwib3RoZXIiLCJfcG9pbnRzIiwiYXhlcyIsInByMCIsInByMSIsImNvb3JkaW5hdGVzIiwidmlldyIsInZzIiwiY29sbGlkZSIsImxhYmVscyIsImNvbGxpZGVyIiwiczAiLCJzMSIsIiRsYXlvdXQiLCJfdmlzaWJsZSIsIl9ib3giLCJjb21wdXRlJDEiLCJzdGF0ZSIsImgwIiwiX2hpZGFibGUiLCJoMSIsImxheW91dCIsInByZXBhcmUiLCJkYXRhc2V0cyIsImpsZW4iLCJfc2V0IiwiX2lkeCIsInNvcnQiLCJhIiwiYiIsInNhIiwic2IiLCJkaXJ0eSIsImxvb2t1cCIsIl92aWV3IiwiaGVscGVycyQzIiwia2V5cyIsImtsZW4iLCJrIiwiaXNPYmplY3QiLCJPYmplY3QiLCJsaXN0ZW5lcnMiLCJoZWxwZXJzJDQiLCJFWFBBTkRPX0tFWSIsInBsdWdpbnMiLCJkYXRhbGFiZWxzIiwiY29uZmlndXJlIiwib3ZlcnJpZGUiLCJtZXJnZSIsImRpc3BhdGNoRXZlbnQiLCJ0YXJnZXQiLCIkY29udGV4dCIsIl9kaXJ0eSIsImRpc3BhdGNoTW92ZUV2ZW50cyIsInByZXZpb3VzIiwiZW50ZXIiLCJsZWF2ZSIsImhhbmRsZU1vdmVFdmVudHMiLCJldmVudCIsImV4cGFuZG8iLCJfbGlzdGVuZXJzIiwidHlwZSIsIl9sYWJlbHMiLCJfaG92ZXJlZCIsImhhbmRsZUNsaWNrRXZlbnRzIiwiaGFuZGxlcnMiLCJjbGljayIsInBsdWdpbiIsImlkIiwiYmVmb3JlSW5pdCIsIl9hY3RpdmVzIiwiYmVmb3JlVXBkYXRlIiwiX2xpc3RlbmVkIiwiX2RhdGFzZXRzIiwiYWZ0ZXJEYXRhc2V0VXBkYXRlIiwiYXJncyIsImRhdGFzZXRJbmRleCIsImlzRGF0YXNldFZpc2libGUiLCJtZXRhIiwiaGlkZGVuIiwic2tpcCIsImFjdGl2ZSIsImRhdGFJbmRleCIsIm1lcmdlciIsImtleSIsInNvdXJjZSIsImFmdGVyVXBkYXRlIiwiYWZ0ZXJEYXRhc2V0c0RyYXciLCJiZWZvcmVFdmVudCIsImFmdGVyRXZlbnQiLCJhY3RpdmVzIiwibGFzdEFjdGl2ZSIsImFuaW1hdGluZyIsInJlbmRlciIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0FBVUMsV0FBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkI7QUFDNUIsZ0NBQU9DLE9BQVAs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QjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxVQUFJUSxPQUFPLENBQUNQLE1BQVIsSUFBa0J0UCxPQUFPLENBQUMzQyxNQUE5QixFQUFzQztBQUNyQ2tRLGNBQU0sQ0FBQzVELE1BQVAsQ0FBY2tHLE9BQU8sQ0FBQ0csT0FBdEI7O0FBQ0EsWUFBSSxDQUFDN0csS0FBSyxDQUFDMkksU0FBWCxFQUFzQjtBQUNyQjNJLGVBQUssQ0FBQzRJLE1BQU47QUFDQTtBQUNEOztBQUVELGFBQU9sQyxPQUFPLENBQUNQLE1BQWY7QUFDQTtBQXhIVyxHQUFiLENBOXpDMEIsQ0F5N0MxQjtBQUNBOztBQUNBL1MsT0FBSyxDQUFDdVMsT0FBTixDQUFja0QsUUFBZCxDQUF1QjNCLE1BQXZCO0FBRUEsU0FBT0EsTUFBUDtBQUVDLENBbjhDQSxDQUFELEMiLCJmaWxlIjoianMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIGNoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHNcbiAqIGh0dHA6Ly9jaGFydGpzLm9yZy9cbiAqIFZlcnNpb246IDAuNS4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTggQ2hhcnQuanMgQ29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xudHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2NoYXJ0LmpzJykpIDpcbnR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2NoYXJ0LmpzJ10sIGZhY3RvcnkpIDpcbihnbG9iYWwuQ2hhcnREYXRhTGFiZWxzID0gZmFjdG9yeShnbG9iYWwuQ2hhcnQpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChDaGFydCkgeyAndXNlIHN0cmljdCc7XG5cbkNoYXJ0ID0gQ2hhcnQgJiYgQ2hhcnQuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSA/IENoYXJ0WydkZWZhdWx0J10gOiBDaGFydDtcblxudmFyIGhlbHBlcnMgPSBDaGFydC5oZWxwZXJzO1xuXG52YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cdFx0fVxuXG5cdFx0Ly8gZGV2aWNlUGl4ZWxSYXRpbyBpcyB1bmRlZmluZWQgb24gSUUxMFxuXHRcdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDIwNDE4MC84ODM3ODg3XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy9pc3N1ZXMvODVcblx0XHR2YXIgc2NyZWVuID0gd2luZG93LnNjcmVlbjtcblx0XHRpZiAoc2NyZWVuKSB7XG5cdFx0XHRyZXR1cm4gKHNjcmVlbi5kZXZpY2VYRFBJIHx8IDEpIC8gKHNjcmVlbi5sb2dpY2FsWERQSSB8fCAxKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gMTtcbn0oKSk7XG5cbnZhciB1dGlscyA9IHtcblx0Ly8gQHRvZG8gbW92ZSB0aGlzIGluIENoYXJ0LmhlbHBlcnMudG9UZXh0TGluZXNcblx0dG9UZXh0TGluZXM6IGZ1bmN0aW9uKGlucHV0cykge1xuXHRcdHZhciBsaW5lcyA9IFtdO1xuXHRcdHZhciBpbnB1dDtcblxuXHRcdGlucHV0cyA9IFtdLmNvbmNhdChpbnB1dHMpO1xuXHRcdHdoaWxlIChpbnB1dHMubGVuZ3RoKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0cy5wb3AoKTtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGxpbmVzLnVuc2hpZnQuYXBwbHkobGluZXMsIGlucHV0LnNwbGl0KCdcXG4nKSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0XHRcdGlucHV0cy5wdXNoLmFwcGx5KGlucHV0cywgaW5wdXQpO1xuXHRcdFx0fSBlbHNlIGlmICghaGVscGVycy5pc051bGxPclVuZGVmKGlucHV0cykpIHtcblx0XHRcdFx0bGluZXMudW5zaGlmdCgnJyArIGlucHV0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbGluZXM7XG5cdH0sXG5cblx0Ly8gQHRvZG8gbW92ZSB0aGlzIG1ldGhvZCBpbiBDaGFydC5oZWxwZXJzLmNhbnZhcy50b0ZvbnQgKGRlcHJlY2F0ZXMgaGVscGVycy5mb250U3RyaW5nKVxuXHQvLyBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9mb250XG5cdHRvRm9udFN0cmluZzogZnVuY3Rpb24oZm9udCkge1xuXHRcdGlmICghZm9udCB8fCBoZWxwZXJzLmlzTnVsbE9yVW5kZWYoZm9udC5zaXplKSB8fCBoZWxwZXJzLmlzTnVsbE9yVW5kZWYoZm9udC5mYW1pbHkpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gKGZvbnQuc3R5bGUgPyBmb250LnN0eWxlICsgJyAnIDogJycpXG5cdFx0XHQrIChmb250LndlaWdodCA/IGZvbnQud2VpZ2h0ICsgJyAnIDogJycpXG5cdFx0XHQrIGZvbnQuc2l6ZSArICdweCAnXG5cdFx0XHQrIGZvbnQuZmFtaWx5O1xuXHR9LFxuXG5cdC8vIEB0b2RvIG1vdmUgdGhpcyBpbiBDaGFydC5oZWxwZXJzLmNhbnZhcy50ZXh0U2l6ZVxuXHQvLyBAdG9kbyBjYWNoZSBjYWxscyBvZiBtZWFzdXJlVGV4dCBpZiBmb250IGRvZXNuJ3QgY2hhbmdlPyFcblx0dGV4dFNpemU6IGZ1bmN0aW9uKGN0eCwgbGluZXMsIGZvbnQpIHtcblx0XHR2YXIgaXRlbXMgPSBbXS5jb25jYXQobGluZXMpO1xuXHRcdHZhciBpbGVuID0gaXRlbXMubGVuZ3RoO1xuXHRcdHZhciBwcmV2ID0gY3R4LmZvbnQ7XG5cdFx0dmFyIHdpZHRoID0gMDtcblx0XHR2YXIgaTtcblxuXHRcdGN0eC5mb250ID0gZm9udC5zdHJpbmc7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgaWxlbjsgKytpKSB7XG5cdFx0XHR3aWR0aCA9IE1hdGgubWF4KGN0eC5tZWFzdXJlVGV4dChpdGVtc1tpXSkud2lkdGgsIHdpZHRoKTtcblx0XHR9XG5cblx0XHRjdHguZm9udCA9IHByZXY7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aGVpZ2h0OiBpbGVuICogZm9udC5saW5lSGVpZ2h0LFxuXHRcdFx0d2lkdGg6IHdpZHRoXG5cdFx0fTtcblx0fSxcblxuXHQvLyBAdG9kbyBtb3ZlIHRoaXMgbWV0aG9kIGluIENoYXJ0LmhlbHBlcnMub3B0aW9ucy50b0ZvbnRcblx0cGFyc2VGb250OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHZhciBnbG9iYWwgPSBDaGFydC5kZWZhdWx0cy5nbG9iYWw7XG5cdFx0dmFyIHNpemUgPSBoZWxwZXJzLnZhbHVlT3JEZWZhdWx0KHZhbHVlLnNpemUsIGdsb2JhbC5kZWZhdWx0Rm9udFNpemUpO1xuXHRcdHZhciBmb250ID0ge1xuXHRcdFx0ZmFtaWx5OiBoZWxwZXJzLnZhbHVlT3JEZWZhdWx0KHZhbHVlLmZhbWlseSwgZ2xvYmFsLmRlZmF1bHRGb250RmFtaWx5KSxcblx0XHRcdGxpbmVIZWlnaHQ6IGhlbHBlcnMub3B0aW9ucy50b0xpbmVIZWlnaHQodmFsdWUubGluZUhlaWdodCwgc2l6ZSksXG5cdFx0XHRzaXplOiBzaXplLFxuXHRcdFx0c3R5bGU6IGhlbHBlcnMudmFsdWVPckRlZmF1bHQodmFsdWUuc3R5bGUsIGdsb2JhbC5kZWZhdWx0Rm9udFN0eWxlKSxcblx0XHRcdHdlaWdodDogaGVscGVycy52YWx1ZU9yRGVmYXVsdCh2YWx1ZS53ZWlnaHQsIG51bGwpLFxuXHRcdFx0c3RyaW5nOiAnJ1xuXHRcdH07XG5cblx0XHRmb250LnN0cmluZyA9IHV0aWxzLnRvRm9udFN0cmluZyhmb250KTtcblx0XHRyZXR1cm4gZm9udDtcblx0fSxcblxuXHQvKipcblx0ICogUmV0dXJucyB2YWx1ZSBib3VuZGVkIGJ5IG1pbiBhbmQgbWF4LiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gbWF4KG1pbiwgbWluKHZhbHVlLCBtYXgpKS5cblx0ICogQHRvZG8gbW92ZSB0aGlzIG1ldGhvZCBpbiBDaGFydC5oZWxwZXJzLmJvdW5kXG5cdCAqIGh0dHBzOi8vZG9jLnF0LmlvL3F0LTUvcXRnbG9iYWwuaHRtbCNxQm91bmRcblx0ICovXG5cdGJvdW5kOiBmdW5jdGlvbihtaW4sIHZhbHVlLCBtYXgpIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFpciBbdmFsdWUsIHN0YXRlXSB3aGVyZSBzdGF0ZSBpczpcblx0ICogKiAtMTogdmFsdWUgaXMgb25seSBpbiBhMCAocmVtb3ZlZClcblx0ICogKiAgMTogdmFsdWUgaXMgb25seSBpbiBhMSAoYWRkZWQpXG5cdCAqL1xuXHRhcnJheURpZmY6IGZ1bmN0aW9uKGEwLCBhMSkge1xuXHRcdHZhciBwcmV2ID0gYTAuc2xpY2UoKTtcblx0XHR2YXIgdXBkYXRlcyA9IFtdO1xuXHRcdHZhciBpLCBqLCBpbGVuLCB2O1xuXG5cdFx0Zm9yIChpID0gMCwgaWxlbiA9IGExLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuXHRcdFx0diA9IGExW2ldO1xuXHRcdFx0aiA9IHByZXYuaW5kZXhPZih2KTtcblxuXHRcdFx0aWYgKGogPT09IC0xKSB7XG5cdFx0XHRcdHVwZGF0ZXMucHVzaChbdiwgMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJldi5zcGxpY2UoaiwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaWxlbiA9IHByZXYubGVuZ3RoOyBpIDwgaWxlbjsgKytpKSB7XG5cdFx0XHR1cGRhdGVzLnB1c2goW3ByZXZbaV0sIC0xXSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwZGF0ZXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvaXNzdWVzLzcwXG5cdCAqL1xuXHRyYXN0ZXJpemU6IGZ1bmN0aW9uKHYpIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCh2ICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBvcmllbnQocG9pbnQsIG9yaWdpbikge1xuXHR2YXIgeDAgPSBvcmlnaW4ueDtcblx0dmFyIHkwID0gb3JpZ2luLnk7XG5cblx0aWYgKHgwID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIHt4OiAwLCB5OiAtMX07XG5cdH1cblx0aWYgKHkwID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIHt4OiAxLCB5OiAwfTtcblx0fVxuXG5cdHZhciBkeCA9IHBvaW50LnggLSB4MDtcblx0dmFyIGR5ID0gcG9pbnQueSAtIHkwO1xuXHR2YXIgbG4gPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdHJldHVybiB7XG5cdFx0eDogbG4gPyBkeCAvIGxuIDogMCxcblx0XHR5OiBsbiA/IGR5IC8gbG4gOiAtMVxuXHR9O1xufVxuXG5mdW5jdGlvbiBhbGlnbmVkKHgsIHksIHZ4LCB2eSwgYWxpZ24pIHtcblx0c3dpdGNoIChhbGlnbikge1xuXHRjYXNlICdjZW50ZXInOlxuXHRcdHZ4ID0gdnkgPSAwO1xuXHRcdGJyZWFrO1xuXHRjYXNlICdib3R0b20nOlxuXHRcdHZ4ID0gMDtcblx0XHR2eSA9IDE7XG5cdFx0YnJlYWs7XG5cdGNhc2UgJ3JpZ2h0Jzpcblx0XHR2eCA9IDE7XG5cdFx0dnkgPSAwO1xuXHRcdGJyZWFrO1xuXHRjYXNlICdsZWZ0Jzpcblx0XHR2eCA9IC0xO1xuXHRcdHZ5ID0gMDtcblx0XHRicmVhaztcblx0Y2FzZSAndG9wJzpcblx0XHR2eCA9IDA7XG5cdFx0dnkgPSAtMTtcblx0XHRicmVhaztcblx0Y2FzZSAnc3RhcnQnOlxuXHRcdHZ4ID0gLXZ4O1xuXHRcdHZ5ID0gLXZ5O1xuXHRcdGJyZWFrO1xuXHRjYXNlICdlbmQnOlxuXHRcdC8vIGtlZXAgbmF0dXJhbCBvcmllbnRhdGlvblxuXHRcdGJyZWFrO1xuXHRkZWZhdWx0OlxuXHRcdC8vIGNsb2Nrd2lzZSByb3RhdGlvbiAoaW4gZGVncmVlKVxuXHRcdGFsaWduICo9IChNYXRoLlBJIC8gMTgwKTtcblx0XHR2eCA9IE1hdGguY29zKGFsaWduKTtcblx0XHR2eSA9IE1hdGguc2luKGFsaWduKTtcblx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0eDogeCxcblx0XHR5OiB5LFxuXHRcdHZ4OiB2eCxcblx0XHR2eTogdnlcblx0fTtcbn1cblxuLy8gTGluZSBjbGlwcGluZyAoQ29oZW7igJNTdXRoZXJsYW5kIGFsZ29yaXRobSlcbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvaGVu4oCTU3V0aGVybGFuZF9hbGdvcml0aG1cblxudmFyIFJfSU5TSURFID0gMDtcbnZhciBSX0xFRlQgPSAxO1xudmFyIFJfUklHSFQgPSAyO1xudmFyIFJfQk9UVE9NID0gNDtcbnZhciBSX1RPUCA9IDg7XG5cbmZ1bmN0aW9uIHJlZ2lvbih4LCB5LCByZWN0KSB7XG5cdHZhciByZXMgPSBSX0lOU0lERTtcblxuXHRpZiAoeCA8IHJlY3QubGVmdCkge1xuXHRcdHJlcyB8PSBSX0xFRlQ7XG5cdH0gZWxzZSBpZiAoeCA+IHJlY3QucmlnaHQpIHtcblx0XHRyZXMgfD0gUl9SSUdIVDtcblx0fVxuXHRpZiAoeSA8IHJlY3QudG9wKSB7XG5cdFx0cmVzIHw9IFJfVE9QO1xuXHR9IGVsc2UgaWYgKHkgPiByZWN0LmJvdHRvbSkge1xuXHRcdHJlcyB8PSBSX0JPVFRPTTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGNsaXBwZWQoc2VnbWVudCwgYXJlYSkge1xuXHR2YXIgeDAgPSBzZWdtZW50LngwO1xuXHR2YXIgeTAgPSBzZWdtZW50LnkwO1xuXHR2YXIgeDEgPSBzZWdtZW50LngxO1xuXHR2YXIgeTEgPSBzZWdtZW50LnkxO1xuXHR2YXIgcjAgPSByZWdpb24oeDAsIHkwLCBhcmVhKTtcblx0dmFyIHIxID0gcmVnaW9uKHgxLCB5MSwgYXJlYSk7XG5cdHZhciByLCB4LCB5O1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblx0d2hpbGUgKHRydWUpIHtcblx0XHRpZiAoIShyMCB8IHIxKSB8fCAocjAgJiByMSkpIHtcblx0XHRcdC8vIGJvdGggcG9pbnRzIGluc2lkZSBvciBvbiB0aGUgc2FtZSBzaWRlOiBubyBjbGlwcGluZ1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Ly8gYXQgbGVhc3Qgb25lIHBvaW50IGlzIG91dHNpZGVcblx0XHRyID0gcjAgfHwgcjE7XG5cblx0XHRpZiAociAmIFJfVE9QKSB7XG5cdFx0XHR4ID0geDAgKyAoeDEgLSB4MCkgKiAoYXJlYS50b3AgLSB5MCkgLyAoeTEgLSB5MCk7XG5cdFx0XHR5ID0gYXJlYS50b3A7XG5cdFx0fSBlbHNlIGlmIChyICYgUl9CT1RUT00pIHtcblx0XHRcdHggPSB4MCArICh4MSAtIHgwKSAqIChhcmVhLmJvdHRvbSAtIHkwKSAvICh5MSAtIHkwKTtcblx0XHRcdHkgPSBhcmVhLmJvdHRvbTtcblx0XHR9IGVsc2UgaWYgKHIgJiBSX1JJR0hUKSB7XG5cdFx0XHR5ID0geTAgKyAoeTEgLSB5MCkgKiAoYXJlYS5yaWdodCAtIHgwKSAvICh4MSAtIHgwKTtcblx0XHRcdHggPSBhcmVhLnJpZ2h0O1xuXHRcdH0gZWxzZSBpZiAociAmIFJfTEVGVCkge1xuXHRcdFx0eSA9IHkwICsgKHkxIC0geTApICogKGFyZWEubGVmdCAtIHgwKSAvICh4MSAtIHgwKTtcblx0XHRcdHggPSBhcmVhLmxlZnQ7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPT09IHIwKSB7XG5cdFx0XHR4MCA9IHg7XG5cdFx0XHR5MCA9IHk7XG5cdFx0XHRyMCA9IHJlZ2lvbih4MCwgeTAsIGFyZWEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR4MSA9IHg7XG5cdFx0XHR5MSA9IHk7XG5cdFx0XHRyMSA9IHJlZ2lvbih4MSwgeTEsIGFyZWEpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0eDA6IHgwLFxuXHRcdHgxOiB4MSxcblx0XHR5MDogeTAsXG5cdFx0eTE6IHkxXG5cdH07XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGUocmFuZ2UsIGNvbmZpZykge1xuXHR2YXIgYW5jaG9yID0gY29uZmlnLmFuY2hvcjtcblx0dmFyIHNlZ21lbnQgPSByYW5nZTtcblx0dmFyIHgsIHk7XG5cblx0aWYgKGNvbmZpZy5jbGFtcCkge1xuXHRcdHNlZ21lbnQgPSBjbGlwcGVkKHNlZ21lbnQsIGNvbmZpZy5hcmVhKTtcblx0fVxuXG5cdGlmIChhbmNob3IgPT09ICdzdGFydCcpIHtcblx0XHR4ID0gc2VnbWVudC54MDtcblx0XHR5ID0gc2VnbWVudC55MDtcblx0fSBlbHNlIGlmIChhbmNob3IgPT09ICdlbmQnKSB7XG5cdFx0eCA9IHNlZ21lbnQueDE7XG5cdFx0eSA9IHNlZ21lbnQueTE7XG5cdH0gZWxzZSB7XG5cdFx0eCA9IChzZWdtZW50LngwICsgc2VnbWVudC54MSkgLyAyO1xuXHRcdHkgPSAoc2VnbWVudC55MCArIHNlZ21lbnQueTEpIC8gMjtcblx0fVxuXG5cdHJldHVybiBhbGlnbmVkKHgsIHksIHJhbmdlLnZ4LCByYW5nZS52eSwgY29uZmlnLmFsaWduKTtcbn1cblxudmFyIHBvc2l0aW9uZXJzID0ge1xuXHRhcmM6IGZ1bmN0aW9uKHZtLCBjb25maWcpIHtcblx0XHR2YXIgYW5nbGUgPSAodm0uc3RhcnRBbmdsZSArIHZtLmVuZEFuZ2xlKSAvIDI7XG5cdFx0dmFyIHZ4ID0gTWF0aC5jb3MoYW5nbGUpO1xuXHRcdHZhciB2eSA9IE1hdGguc2luKGFuZ2xlKTtcblx0XHR2YXIgcjAgPSB2bS5pbm5lclJhZGl1cztcblx0XHR2YXIgcjEgPSB2bS5vdXRlclJhZGl1cztcblxuXHRcdHJldHVybiBjb21wdXRlKHtcblx0XHRcdHgwOiB2bS54ICsgdnggKiByMCxcblx0XHRcdHkwOiB2bS55ICsgdnkgKiByMCxcblx0XHRcdHgxOiB2bS54ICsgdnggKiByMSxcblx0XHRcdHkxOiB2bS55ICsgdnkgKiByMSxcblx0XHRcdHZ4OiB2eCxcblx0XHRcdHZ5OiB2eVxuXHRcdH0sIGNvbmZpZyk7XG5cdH0sXG5cblx0cG9pbnQ6IGZ1bmN0aW9uKHZtLCBjb25maWcpIHtcblx0XHR2YXIgdiA9IG9yaWVudCh2bSwgY29uZmlnLm9yaWdpbik7XG5cdFx0dmFyIHJ4ID0gdi54ICogdm0ucmFkaXVzO1xuXHRcdHZhciByeSA9IHYueSAqIHZtLnJhZGl1cztcblxuXHRcdHJldHVybiBjb21wdXRlKHtcblx0XHRcdHgwOiB2bS54IC0gcngsXG5cdFx0XHR5MDogdm0ueSAtIHJ5LFxuXHRcdFx0eDE6IHZtLnggKyByeCxcblx0XHRcdHkxOiB2bS55ICsgcnksXG5cdFx0XHR2eDogdi54LFxuXHRcdFx0dnk6IHYueVxuXHRcdH0sIGNvbmZpZyk7XG5cdH0sXG5cblx0cmVjdDogZnVuY3Rpb24odm0sIGNvbmZpZykge1xuXHRcdHZhciB2ID0gb3JpZW50KHZtLCBjb25maWcub3JpZ2luKTtcblx0XHR2YXIgeCA9IHZtLng7XG5cdFx0dmFyIHkgPSB2bS55O1xuXHRcdHZhciBzeCA9IDA7XG5cdFx0dmFyIHN5ID0gMDtcblxuXHRcdGlmICh2bS5ob3Jpem9udGFsKSB7XG5cdFx0XHR4ID0gTWF0aC5taW4odm0ueCwgdm0uYmFzZSk7XG5cdFx0XHRzeCA9IE1hdGguYWJzKHZtLmJhc2UgLSB2bS54KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0eSA9IE1hdGgubWluKHZtLnksIHZtLmJhc2UpO1xuXHRcdFx0c3kgPSBNYXRoLmFicyh2bS5iYXNlIC0gdm0ueSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXB1dGUoe1xuXHRcdFx0eDA6IHgsXG5cdFx0XHR5MDogeSArIHN5LFxuXHRcdFx0eDE6IHggKyBzeCxcblx0XHRcdHkxOiB5LFxuXHRcdFx0dng6IHYueCxcblx0XHRcdHZ5OiB2Lnlcblx0XHR9LCBjb25maWcpO1xuXHR9LFxuXG5cdGZhbGxiYWNrOiBmdW5jdGlvbih2bSwgY29uZmlnKSB7XG5cdFx0dmFyIHYgPSBvcmllbnQodm0sIGNvbmZpZy5vcmlnaW4pO1xuXG5cdFx0cmV0dXJuIGNvbXB1dGUoe1xuXHRcdFx0eDA6IHZtLngsXG5cdFx0XHR5MDogdm0ueSxcblx0XHRcdHgxOiB2bS54LFxuXHRcdFx0eTE6IHZtLnksXG5cdFx0XHR2eDogdi54LFxuXHRcdFx0dnk6IHYueVxuXHRcdH0sIGNvbmZpZyk7XG5cdH1cbn07XG5cbnZhciBoZWxwZXJzJDEgPSBDaGFydC5oZWxwZXJzO1xudmFyIHJhc3Rlcml6ZSA9IHV0aWxzLnJhc3Rlcml6ZTtcblxuZnVuY3Rpb24gYm91bmRpbmdSZWN0cyhtb2RlbCkge1xuXHR2YXIgYm9yZGVyV2lkdGggPSBtb2RlbC5ib3JkZXJXaWR0aCB8fCAwO1xuXHR2YXIgcGFkZGluZyA9IG1vZGVsLnBhZGRpbmc7XG5cdHZhciB0aCA9IG1vZGVsLnNpemUuaGVpZ2h0O1xuXHR2YXIgdHcgPSBtb2RlbC5zaXplLndpZHRoO1xuXHR2YXIgdHggPSAtdHcgLyAyO1xuXHR2YXIgdHkgPSAtdGggLyAyO1xuXG5cdHJldHVybiB7XG5cdFx0ZnJhbWU6IHtcblx0XHRcdHg6IHR4IC0gcGFkZGluZy5sZWZ0IC0gYm9yZGVyV2lkdGgsXG5cdFx0XHR5OiB0eSAtIHBhZGRpbmcudG9wIC0gYm9yZGVyV2lkdGgsXG5cdFx0XHR3OiB0dyArIHBhZGRpbmcud2lkdGggKyBib3JkZXJXaWR0aCAqIDIsXG5cdFx0XHRoOiB0aCArIHBhZGRpbmcuaGVpZ2h0ICsgYm9yZGVyV2lkdGggKiAyXG5cdFx0fSxcblx0XHR0ZXh0OiB7XG5cdFx0XHR4OiB0eCxcblx0XHRcdHk6IHR5LFxuXHRcdFx0dzogdHcsXG5cdFx0XHRoOiB0aFxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NhbGVPcmlnaW4oZWwpIHtcblx0dmFyIGhvcml6b250YWwgPSBlbC5fbW9kZWwuaG9yaXpvbnRhbDtcblx0dmFyIHNjYWxlID0gZWwuX3NjYWxlIHx8IChob3Jpem9udGFsICYmIGVsLl94U2NhbGUpIHx8IGVsLl95U2NhbGU7XG5cblx0aWYgKCFzY2FsZSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0aWYgKHNjYWxlLnhDZW50ZXIgIT09IHVuZGVmaW5lZCAmJiBzY2FsZS55Q2VudGVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4ge3g6IHNjYWxlLnhDZW50ZXIsIHk6IHNjYWxlLnlDZW50ZXJ9O1xuXHR9XG5cblx0dmFyIHBpeGVsID0gc2NhbGUuZ2V0QmFzZVBpeGVsKCk7XG5cdHJldHVybiBob3Jpem9udGFsID9cblx0XHR7eDogcGl4ZWwsIHk6IG51bGx9IDpcblx0XHR7eDogbnVsbCwgeTogcGl4ZWx9O1xufVxuXG5mdW5jdGlvbiBnZXRQb3NpdGlvbmVyKGVsKSB7XG5cdGlmIChlbCBpbnN0YW5jZW9mIENoYXJ0LmVsZW1lbnRzLkFyYykge1xuXHRcdHJldHVybiBwb3NpdGlvbmVycy5hcmM7XG5cdH1cblx0aWYgKGVsIGluc3RhbmNlb2YgQ2hhcnQuZWxlbWVudHMuUG9pbnQpIHtcblx0XHRyZXR1cm4gcG9zaXRpb25lcnMucG9pbnQ7XG5cdH1cblx0aWYgKGVsIGluc3RhbmNlb2YgQ2hhcnQuZWxlbWVudHMuUmVjdGFuZ2xlKSB7XG5cdFx0cmV0dXJuIHBvc2l0aW9uZXJzLnJlY3Q7XG5cdH1cblx0cmV0dXJuIHBvc2l0aW9uZXJzLmZhbGxiYWNrO1xufVxuXG5mdW5jdGlvbiBkcmF3RnJhbWUoY3R4LCByZWN0LCBtb2RlbCkge1xuXHR2YXIgYmdDb2xvciA9IG1vZGVsLmJhY2tncm91bmRDb2xvcjtcblx0dmFyIGJvcmRlckNvbG9yID0gbW9kZWwuYm9yZGVyQ29sb3I7XG5cdHZhciBib3JkZXJXaWR0aCA9IG1vZGVsLmJvcmRlcldpZHRoO1xuXG5cdGlmICghYmdDb2xvciAmJiAoIWJvcmRlckNvbG9yIHx8ICFib3JkZXJXaWR0aCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjdHguYmVnaW5QYXRoKCk7XG5cblx0aGVscGVycyQxLmNhbnZhcy5yb3VuZGVkUmVjdChcblx0XHRjdHgsXG5cdFx0cmFzdGVyaXplKHJlY3QueCkgKyBib3JkZXJXaWR0aCAvIDIsXG5cdFx0cmFzdGVyaXplKHJlY3QueSkgKyBib3JkZXJXaWR0aCAvIDIsXG5cdFx0cmFzdGVyaXplKHJlY3QudykgLSBib3JkZXJXaWR0aCxcblx0XHRyYXN0ZXJpemUocmVjdC5oKSAtIGJvcmRlcldpZHRoLFxuXHRcdG1vZGVsLmJvcmRlclJhZGl1cyk7XG5cblx0Y3R4LmNsb3NlUGF0aCgpO1xuXG5cdGlmIChiZ0NvbG9yKSB7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGJnQ29sb3I7XG5cdFx0Y3R4LmZpbGwoKTtcblx0fVxuXG5cdGlmIChib3JkZXJDb2xvciAmJiBib3JkZXJXaWR0aCkge1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9IGJvcmRlckNvbG9yO1xuXHRcdGN0eC5saW5lV2lkdGggPSBib3JkZXJXaWR0aDtcblx0XHRjdHgubGluZUpvaW4gPSAnbWl0ZXInO1xuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxufVxuXG5mdW5jdGlvbiB0ZXh0R2VvbWV0cnkocmVjdCwgYWxpZ24sIGZvbnQpIHtcblx0dmFyIGggPSBmb250LmxpbmVIZWlnaHQ7XG5cdHZhciB3ID0gcmVjdC53O1xuXHR2YXIgeCA9IHJlY3QueDtcblx0dmFyIHkgPSByZWN0LnkgKyBoIC8gMjtcblxuXHRpZiAoYWxpZ24gPT09ICdjZW50ZXInKSB7XG5cdFx0eCArPSB3IC8gMjtcblx0fSBlbHNlIGlmIChhbGlnbiA9PT0gJ2VuZCcgfHwgYWxpZ24gPT09ICdyaWdodCcpIHtcblx0XHR4ICs9IHc7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGg6IGgsXG5cdFx0dzogdyxcblx0XHR4OiB4LFxuXHRcdHk6IHlcblx0fTtcbn1cblxuZnVuY3Rpb24gZHJhd1RleHRMaW5lKGN0eCwgdGV4dCwgY2ZnKSB7XG5cdHZhciBzaGFkb3cgPSBjdHguc2hhZG93Qmx1cjtcblx0dmFyIHN0cm9rZWQgPSBjZmcuc3Ryb2tlZDtcblx0dmFyIHggPSByYXN0ZXJpemUoY2ZnLngpO1xuXHR2YXIgeSA9IHJhc3Rlcml6ZShjZmcueSk7XG5cdHZhciB3ID0gcmFzdGVyaXplKGNmZy53KTtcblxuXHRpZiAoc3Ryb2tlZCkge1xuXHRcdGN0eC5zdHJva2VUZXh0KHRleHQsIHgsIHksIHcpO1xuXHR9XG5cblx0aWYgKGNmZy5maWxsZWQpIHtcblx0XHRpZiAoc2hhZG93ICYmIHN0cm9rZWQpIHtcblx0XHRcdC8vIFByZXZlbnQgZHJhd2luZyBzaGFkb3cgb24gYm90aCB0aGUgdGV4dCBzdHJva2UgYW5kIGZpbGwsIHNvXG5cdFx0XHQvLyBpZiB0aGUgdGV4dCBpcyBzdHJva2VkLCByZW1vdmUgdGhlIHNoYWRvdyBmb3IgdGhlIHRleHQgZmlsbC5cblx0XHRcdGN0eC5zaGFkb3dCbHVyID0gMDtcblx0XHR9XG5cblx0XHRjdHguZmlsbFRleHQodGV4dCwgeCwgeSwgdyk7XG5cblx0XHRpZiAoc2hhZG93ICYmIHN0cm9rZWQpIHtcblx0XHRcdGN0eC5zaGFkb3dCbHVyID0gc2hhZG93O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBkcmF3VGV4dChjdHgsIGxpbmVzLCByZWN0LCBtb2RlbCkge1xuXHR2YXIgYWxpZ24gPSBtb2RlbC50ZXh0QWxpZ247XG5cdHZhciBjb2xvciA9IG1vZGVsLmNvbG9yO1xuXHR2YXIgZmlsbGVkID0gISFjb2xvcjtcblx0dmFyIGZvbnQgPSBtb2RlbC5mb250O1xuXHR2YXIgaWxlbiA9IGxpbmVzLmxlbmd0aDtcblx0dmFyIHN0cm9rZUNvbG9yID0gbW9kZWwudGV4dFN0cm9rZUNvbG9yO1xuXHR2YXIgc3Ryb2tlV2lkdGggPSBtb2RlbC50ZXh0U3Ryb2tlV2lkdGg7XG5cdHZhciBzdHJva2VkID0gc3Ryb2tlQ29sb3IgJiYgc3Ryb2tlV2lkdGg7XG5cdHZhciBpO1xuXG5cdGlmICghaWxlbiB8fCAoIWZpbGxlZCAmJiAhc3Ryb2tlZCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBBZGp1c3QgY29vcmRpbmF0ZXMgYmFzZWQgb24gdGV4dCBhbGlnbm1lbnQgYW5kIGxpbmUgaGVpZ2h0XG5cdHJlY3QgPSB0ZXh0R2VvbWV0cnkocmVjdCwgYWxpZ24sIGZvbnQpO1xuXG5cdGN0eC5mb250ID0gZm9udC5zdHJpbmc7XG5cdGN0eC50ZXh0QWxpZ24gPSBhbGlnbjtcblx0Y3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXHRjdHguc2hhZG93Qmx1ciA9IG1vZGVsLnRleHRTaGFkb3dCbHVyO1xuXHRjdHguc2hhZG93Q29sb3IgPSBtb2RlbC50ZXh0U2hhZG93Q29sb3I7XG5cblx0aWYgKGZpbGxlZCkge1xuXHRcdGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0fVxuXHRpZiAoc3Ryb2tlZCkge1xuXHRcdGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XG5cdFx0Y3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdpZHRoO1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuXHR9XG5cblx0Zm9yIChpID0gMCwgaWxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuXHRcdGRyYXdUZXh0TGluZShjdHgsIGxpbmVzW2ldLCB7XG5cdFx0XHRzdHJva2VkOiBzdHJva2VkLFxuXHRcdFx0ZmlsbGVkOiBmaWxsZWQsXG5cdFx0XHR3OiByZWN0LncsXG5cdFx0XHR4OiByZWN0LngsXG5cdFx0XHR5OiByZWN0LnkgKyByZWN0LmggKiBpXG5cdFx0fSk7XG5cdH1cbn1cblxudmFyIExhYmVsID0gZnVuY3Rpb24oY29uZmlnLCBjdHgsIGVsLCBpbmRleCkge1xuXHR2YXIgbWUgPSB0aGlzO1xuXG5cdG1lLl9jb25maWcgPSBjb25maWc7XG5cdG1lLl9pbmRleCA9IGluZGV4O1xuXHRtZS5fbW9kZWwgPSBudWxsO1xuXHRtZS5fcmVjdHMgPSBudWxsO1xuXHRtZS5fY3R4ID0gY3R4O1xuXHRtZS5fZWwgPSBlbDtcbn07XG5cbmhlbHBlcnMkMS5leHRlbmQoTGFiZWwucHJvdG90eXBlLCB7XG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X21vZGVsaXplOiBmdW5jdGlvbihkaXNwbGF5LCBsaW5lcywgY29uZmlnLCBjb250ZXh0KSB7XG5cdFx0dmFyIG1lID0gdGhpcztcblx0XHR2YXIgaW5kZXggPSBtZS5faW5kZXg7XG5cdFx0dmFyIHJlc29sdmUgPSBoZWxwZXJzJDEub3B0aW9ucy5yZXNvbHZlO1xuXHRcdHZhciBmb250ID0gdXRpbHMucGFyc2VGb250KHJlc29sdmUoW2NvbmZpZy5mb250LCB7fV0sIGNvbnRleHQsIGluZGV4KSk7XG5cdFx0dmFyIGNvbG9yID0gcmVzb2x2ZShbY29uZmlnLmNvbG9yLCBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnRDb2xvcl0sIGNvbnRleHQsIGluZGV4KTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlnbjogcmVzb2x2ZShbY29uZmlnLmFsaWduLCAnY2VudGVyJ10sIGNvbnRleHQsIGluZGV4KSxcblx0XHRcdGFuY2hvcjogcmVzb2x2ZShbY29uZmlnLmFuY2hvciwgJ2NlbnRlciddLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHRhcmVhOiBjb250ZXh0LmNoYXJ0LmNoYXJ0QXJlYSxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogcmVzb2x2ZShbY29uZmlnLmJhY2tncm91bmRDb2xvciwgbnVsbF0sIGNvbnRleHQsIGluZGV4KSxcblx0XHRcdGJvcmRlckNvbG9yOiByZXNvbHZlKFtjb25maWcuYm9yZGVyQ29sb3IsIG51bGxdLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHRib3JkZXJSYWRpdXM6IHJlc29sdmUoW2NvbmZpZy5ib3JkZXJSYWRpdXMsIDBdLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHRib3JkZXJXaWR0aDogcmVzb2x2ZShbY29uZmlnLmJvcmRlcldpZHRoLCAwXSwgY29udGV4dCwgaW5kZXgpLFxuXHRcdFx0Y2xhbXA6IHJlc29sdmUoW2NvbmZpZy5jbGFtcCwgZmFsc2VdLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHRjbGlwOiByZXNvbHZlKFtjb25maWcuY2xpcCwgZmFsc2VdLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHRjb2xvcjogY29sb3IsXG5cdFx0XHRkaXNwbGF5OiBkaXNwbGF5LFxuXHRcdFx0Zm9udDogZm9udCxcblx0XHRcdGxpbmVzOiBsaW5lcyxcblx0XHRcdG9mZnNldDogcmVzb2x2ZShbY29uZmlnLm9mZnNldCwgMF0sIGNvbnRleHQsIGluZGV4KSxcblx0XHRcdG9wYWNpdHk6IHJlc29sdmUoW2NvbmZpZy5vcGFjaXR5LCAxXSwgY29udGV4dCwgaW5kZXgpLFxuXHRcdFx0b3JpZ2luOiBnZXRTY2FsZU9yaWdpbihtZS5fZWwpLFxuXHRcdFx0cGFkZGluZzogaGVscGVycyQxLm9wdGlvbnMudG9QYWRkaW5nKHJlc29sdmUoW2NvbmZpZy5wYWRkaW5nLCAwXSwgY29udGV4dCwgaW5kZXgpKSxcblx0XHRcdHBvc2l0aW9uZXI6IGdldFBvc2l0aW9uZXIobWUuX2VsKSxcblx0XHRcdHJvdGF0aW9uOiByZXNvbHZlKFtjb25maWcucm90YXRpb24sIDBdLCBjb250ZXh0LCBpbmRleCkgKiAoTWF0aC5QSSAvIDE4MCksXG5cdFx0XHRzaXplOiB1dGlscy50ZXh0U2l6ZShtZS5fY3R4LCBsaW5lcywgZm9udCksXG5cdFx0XHR0ZXh0QWxpZ246IHJlc29sdmUoW2NvbmZpZy50ZXh0QWxpZ24sICdzdGFydCddLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHR0ZXh0U2hhZG93Qmx1cjogcmVzb2x2ZShbY29uZmlnLnRleHRTaGFkb3dCbHVyLCAwXSwgY29udGV4dCwgaW5kZXgpLFxuXHRcdFx0dGV4dFNoYWRvd0NvbG9yOiByZXNvbHZlKFtjb25maWcudGV4dFNoYWRvd0NvbG9yLCBjb2xvcl0sIGNvbnRleHQsIGluZGV4KSxcblx0XHRcdHRleHRTdHJva2VDb2xvcjogcmVzb2x2ZShbY29uZmlnLnRleHRTdHJva2VDb2xvciwgY29sb3JdLCBjb250ZXh0LCBpbmRleCksXG5cdFx0XHR0ZXh0U3Ryb2tlV2lkdGg6IHJlc29sdmUoW2NvbmZpZy50ZXh0U3Ryb2tlV2lkdGgsIDBdLCBjb250ZXh0LCBpbmRleClcblx0XHR9O1xuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24oY29udGV4dCkge1xuXHRcdHZhciBtZSA9IHRoaXM7XG5cdFx0dmFyIG1vZGVsID0gbnVsbDtcblx0XHR2YXIgcmVjdHMgPSBudWxsO1xuXHRcdHZhciBpbmRleCA9IG1lLl9pbmRleDtcblx0XHR2YXIgY29uZmlnID0gbWUuX2NvbmZpZztcblx0XHR2YXIgdmFsdWUsIGxhYmVsLCBsaW5lcztcblxuXHRcdC8vIFdlIGZpcnN0IHJlc29sdmUgdGhlIGRpc3BsYXkgb3B0aW9uIChzZXBhcmF0ZWx5KSB0byBhdm9pZCBjb21wdXRpbmdcblx0XHQvLyBvdGhlciBvcHRpb25zIGluIGNhc2UgdGhlIGxhYmVsIGlzIGhpZGRlbiAoaS5lLiBkaXNwbGF5OiBmYWxzZSkuXG5cdFx0dmFyIGRpc3BsYXkgPSBoZWxwZXJzJDEub3B0aW9ucy5yZXNvbHZlKFtjb25maWcuZGlzcGxheSwgdHJ1ZV0sIGNvbnRleHQsIGluZGV4KTtcblxuXHRcdGlmIChkaXNwbGF5KSB7XG5cdFx0XHR2YWx1ZSA9IGNvbnRleHQuZGF0YXNldC5kYXRhW2luZGV4XTtcblx0XHRcdGxhYmVsID0gaGVscGVycyQxLnZhbHVlT3JEZWZhdWx0KGhlbHBlcnMkMS5jYWxsYmFjayhjb25maWcuZm9ybWF0dGVyLCBbdmFsdWUsIGNvbnRleHRdKSwgdmFsdWUpO1xuXHRcdFx0bGluZXMgPSBoZWxwZXJzJDEuaXNOdWxsT3JVbmRlZihsYWJlbCkgPyBbXSA6IHV0aWxzLnRvVGV4dExpbmVzKGxhYmVsKTtcblxuXHRcdFx0aWYgKGxpbmVzLmxlbmd0aCkge1xuXHRcdFx0XHRtb2RlbCA9IG1lLl9tb2RlbGl6ZShkaXNwbGF5LCBsaW5lcywgY29uZmlnLCBjb250ZXh0KTtcblx0XHRcdFx0cmVjdHMgPSBib3VuZGluZ1JlY3RzKG1vZGVsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtZS5fbW9kZWwgPSBtb2RlbDtcblx0XHRtZS5fcmVjdHMgPSByZWN0cztcblx0fSxcblxuXHRnZW9tZXRyeTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlY3RzID8gdGhpcy5fcmVjdHMuZnJhbWUgOiB7fTtcblx0fSxcblxuXHRyb3RhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX21vZGVsID8gdGhpcy5fbW9kZWwucm90YXRpb24gOiAwO1xuXHR9LFxuXG5cdHZpc2libGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5vcGFjaXR5O1xuXHR9LFxuXG5cdG1vZGVsOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fbW9kZWw7XG5cdH0sXG5cblx0ZHJhdzogZnVuY3Rpb24oY2hhcnQsIGNlbnRlcikge1xuXHRcdHZhciBtZSA9IHRoaXM7XG5cdFx0dmFyIGN0eCA9IGNoYXJ0LmN0eDtcblx0XHR2YXIgbW9kZWwgPSBtZS5fbW9kZWw7XG5cdFx0dmFyIHJlY3RzID0gbWUuX3JlY3RzO1xuXHRcdHZhciBhcmVhO1xuXG5cdFx0aWYgKCF0aGlzLnZpc2libGUoKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGN0eC5zYXZlKCk7XG5cblx0XHRpZiAobW9kZWwuY2xpcCkge1xuXHRcdFx0YXJlYSA9IG1vZGVsLmFyZWE7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHgucmVjdChcblx0XHRcdFx0YXJlYS5sZWZ0LFxuXHRcdFx0XHRhcmVhLnRvcCxcblx0XHRcdFx0YXJlYS5yaWdodCAtIGFyZWEubGVmdCxcblx0XHRcdFx0YXJlYS5ib3R0b20gLSBhcmVhLnRvcCk7XG5cdFx0XHRjdHguY2xpcCgpO1xuXHRcdH1cblxuXHRcdGN0eC5nbG9iYWxBbHBoYSA9IHV0aWxzLmJvdW5kKDAsIG1vZGVsLm9wYWNpdHksIDEpO1xuXHRcdGN0eC50cmFuc2xhdGUocmFzdGVyaXplKGNlbnRlci54KSwgcmFzdGVyaXplKGNlbnRlci55KSk7XG5cdFx0Y3R4LnJvdGF0ZShtb2RlbC5yb3RhdGlvbik7XG5cblx0XHRkcmF3RnJhbWUoY3R4LCByZWN0cy5mcmFtZSwgbW9kZWwpO1xuXHRcdGRyYXdUZXh0KGN0eCwgbW9kZWwubGluZXMsIHJlY3RzLnRleHQsIG1vZGVsKTtcblxuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cbn0pO1xuXG52YXIgaGVscGVycyQyID0gQ2hhcnQuaGVscGVycztcblxudmFyIE1JTl9JTlRFR0VSID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIgfHwgLTkwMDcxOTkyNTQ3NDA5OTE7XG52YXIgTUFYX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCA5MDA3MTk5MjU0NzQwOTkxO1xuXG5mdW5jdGlvbiByb3RhdGVkKHBvaW50LCBjZW50ZXIsIGFuZ2xlKSB7XG5cdHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG5cdHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cdHZhciBjeCA9IGNlbnRlci54O1xuXHR2YXIgY3kgPSBjZW50ZXIueTtcblxuXHRyZXR1cm4ge1xuXHRcdHg6IGN4ICsgY29zICogKHBvaW50LnggLSBjeCkgLSBzaW4gKiAocG9pbnQueSAtIGN5KSxcblx0XHR5OiBjeSArIHNpbiAqIChwb2ludC54IC0gY3gpICsgY29zICogKHBvaW50LnkgLSBjeSlcblx0fTtcbn1cblxuZnVuY3Rpb24gcHJvamVjdGVkKHBvaW50cywgYXhpcykge1xuXHR2YXIgbWluID0gTUFYX0lOVEVHRVI7XG5cdHZhciBtYXggPSBNSU5fSU5URUdFUjtcblx0dmFyIG9yaWdpbiA9IGF4aXMub3JpZ2luO1xuXHR2YXIgaSwgcHQsIHZ4LCB2eSwgZHA7XG5cblx0Zm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSkge1xuXHRcdHB0ID0gcG9pbnRzW2ldO1xuXHRcdHZ4ID0gcHQueCAtIG9yaWdpbi54O1xuXHRcdHZ5ID0gcHQueSAtIG9yaWdpbi55O1xuXHRcdGRwID0gYXhpcy52eCAqIHZ4ICsgYXhpcy52eSAqIHZ5O1xuXHRcdG1pbiA9IE1hdGgubWluKG1pbiwgZHApO1xuXHRcdG1heCA9IE1hdGgubWF4KG1heCwgZHApO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRtaW46IG1pbixcblx0XHRtYXg6IG1heFxuXHR9O1xufVxuXG5mdW5jdGlvbiB0b0F4aXMocDAsIHAxKSB7XG5cdHZhciB2eCA9IHAxLnggLSBwMC54O1xuXHR2YXIgdnkgPSBwMS55IC0gcDAueTtcblx0dmFyIGxuID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcblxuXHRyZXR1cm4ge1xuXHRcdHZ4OiAocDEueCAtIHAwLngpIC8gbG4sXG5cdFx0dnk6IChwMS55IC0gcDAueSkgLyBsbixcblx0XHRvcmlnaW46IHAwLFxuXHRcdGxuOiBsblxuXHR9O1xufVxuXG52YXIgSGl0Qm94ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuX3JvdGF0aW9uID0gMDtcblx0dGhpcy5fcmVjdCA9IHtcblx0XHR4OiAwLFxuXHRcdHk6IDAsXG5cdFx0dzogMCxcblx0XHRoOiAwXG5cdH07XG59O1xuXG5oZWxwZXJzJDIuZXh0ZW5kKEhpdEJveC5wcm90b3R5cGUsIHtcblx0Y2VudGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgciA9IHRoaXMuX3JlY3Q7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHg6IHIueCArIHIudyAvIDIsXG5cdFx0XHR5OiByLnkgKyByLmggLyAyXG5cdFx0fTtcblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uKGNlbnRlciwgcmVjdCwgcm90YXRpb24pIHtcblx0XHR0aGlzLl9yb3RhdGlvbiA9IHJvdGF0aW9uO1xuXHRcdHRoaXMuX3JlY3QgPSB7XG5cdFx0XHR4OiByZWN0LnggKyBjZW50ZXIueCxcblx0XHRcdHk6IHJlY3QueSArIGNlbnRlci55LFxuXHRcdFx0dzogcmVjdC53LFxuXHRcdFx0aDogcmVjdC5oXG5cdFx0fTtcblx0fSxcblxuXHRjb250YWluczogZnVuY3Rpb24ocG9pbnQpIHtcblx0XHR2YXIgbWUgPSB0aGlzO1xuXHRcdHZhciBtYXJnaW4gPSAxO1xuXHRcdHZhciByZWN0ID0gbWUuX3JlY3Q7XG5cblx0XHRwb2ludCA9IHJvdGF0ZWQocG9pbnQsIG1lLmNlbnRlcigpLCAtbWUuX3JvdGF0aW9uKTtcblxuXHRcdHJldHVybiAhKHBvaW50LnggPCByZWN0LnggLSBtYXJnaW5cblx0XHRcdHx8IHBvaW50LnkgPCByZWN0LnkgLSBtYXJnaW5cblx0XHRcdHx8IHBvaW50LnggPiByZWN0LnggKyByZWN0LncgKyBtYXJnaW4gKiAyXG5cdFx0XHR8fCBwb2ludC55ID4gcmVjdC55ICsgcmVjdC5oICsgbWFyZ2luICogMik7XG5cdH0sXG5cblx0Ly8gU2VwYXJhdGluZyBBeGlzIFRoZW9yZW1cblx0Ly8gaHR0cHM6Ly9nYW1lZGV2ZWxvcG1lbnQudHV0c3BsdXMuY29tL3R1dG9yaWFscy9jb2xsaXNpb24tZGV0ZWN0aW9uLXVzaW5nLXRoZS1zZXBhcmF0aW5nLWF4aXMtdGhlb3JlbS0tZ2FtZWRldi0xNjlcblx0aW50ZXJzZWN0czogZnVuY3Rpb24ob3RoZXIpIHtcblx0XHR2YXIgcjAgPSB0aGlzLl9wb2ludHMoKTtcblx0XHR2YXIgcjEgPSBvdGhlci5fcG9pbnRzKCk7XG5cdFx0dmFyIGF4ZXMgPSBbXG5cdFx0XHR0b0F4aXMocjBbMF0sIHIwWzFdKSxcblx0XHRcdHRvQXhpcyhyMFswXSwgcjBbM10pXG5cdFx0XTtcblx0XHR2YXIgaSwgcHIwLCBwcjE7XG5cblx0XHRpZiAodGhpcy5fcm90YXRpb24gIT09IG90aGVyLl9yb3RhdGlvbikge1xuXHRcdFx0Ly8gT25seSBzZXBhcmF0ZSB3aXRoIHIxIGF4aXMgaWYgdGhlIHJvdGF0aW9uIGlzIGRpZmZlcmVudCxcblx0XHRcdC8vIGVsc2UgaXQncyBlbm91Z2ggdG8gc2VwYXJhdGUgcjAgYW5kIHIxIHdpdGggcjAgYXhpcyBvbmx5IVxuXHRcdFx0YXhlcy5wdXNoKFxuXHRcdFx0XHR0b0F4aXMocjFbMF0sIHIxWzFdKSxcblx0XHRcdFx0dG9BeGlzKHIxWzBdLCByMVszXSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGF4ZXMubGVuZ3RoOyArK2kpIHtcblx0XHRcdHByMCA9IHByb2plY3RlZChyMCwgYXhlc1tpXSk7XG5cdFx0XHRwcjEgPSBwcm9qZWN0ZWQocjEsIGF4ZXNbaV0pO1xuXG5cdFx0XHRpZiAocHIwLm1heCA8IHByMS5taW4gfHwgcHIxLm1heCA8IHByMC5taW4pIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3BvaW50czogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG1lID0gdGhpcztcblx0XHR2YXIgcmVjdCA9IG1lLl9yZWN0O1xuXHRcdHZhciBhbmdsZSA9IG1lLl9yb3RhdGlvbjtcblx0XHR2YXIgY2VudGVyID0gbWUuY2VudGVyKCk7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0cm90YXRlZCh7eDogcmVjdC54LCB5OiByZWN0Lnl9LCBjZW50ZXIsIGFuZ2xlKSxcblx0XHRcdHJvdGF0ZWQoe3g6IHJlY3QueCArIHJlY3QudywgeTogcmVjdC55fSwgY2VudGVyLCBhbmdsZSksXG5cdFx0XHRyb3RhdGVkKHt4OiByZWN0LnggKyByZWN0LncsIHk6IHJlY3QueSArIHJlY3QuaH0sIGNlbnRlciwgYW5nbGUpLFxuXHRcdFx0cm90YXRlZCh7eDogcmVjdC54LCB5OiByZWN0LnkgKyByZWN0Lmh9LCBjZW50ZXIsIGFuZ2xlKVxuXHRcdF07XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBjb29yZGluYXRlcyh2aWV3LCBtb2RlbCwgZ2VvbWV0cnkpIHtcblx0dmFyIHBvaW50ID0gbW9kZWwucG9zaXRpb25lcih2aWV3LCBtb2RlbCk7XG5cdHZhciB2eCA9IHBvaW50LnZ4O1xuXHR2YXIgdnkgPSBwb2ludC52eTtcblxuXHRpZiAoIXZ4ICYmICF2eSkge1xuXHRcdC8vIGlmIGFsaWduZWQgY2VudGVyLCB3ZSBkb24ndCB3YW50IHRvIG9mZnNldCB0aGUgY2VudGVyIHBvaW50XG5cdFx0cmV0dXJuIHt4OiBwb2ludC54LCB5OiBwb2ludC55fTtcblx0fVxuXG5cdHZhciB3ID0gZ2VvbWV0cnkudztcblx0dmFyIGggPSBnZW9tZXRyeS5oO1xuXG5cdC8vIHRha2UgaW4gYWNjb3VudCB0aGUgbGFiZWwgcm90YXRpb25cblx0dmFyIHJvdGF0aW9uID0gbW9kZWwucm90YXRpb247XG5cdHZhciBkeCA9IE1hdGguYWJzKHcgLyAyICogTWF0aC5jb3Mocm90YXRpb24pKSArIE1hdGguYWJzKGggLyAyICogTWF0aC5zaW4ocm90YXRpb24pKTtcblx0dmFyIGR5ID0gTWF0aC5hYnModyAvIDIgKiBNYXRoLnNpbihyb3RhdGlvbikpICsgTWF0aC5hYnMoaCAvIDIgKiBNYXRoLmNvcyhyb3RhdGlvbikpO1xuXG5cdC8vIHNjYWxlIHRoZSB1bml0IHZlY3RvciAodngsIHZ5KSB0byBnZXQgYXQgbGVhc3QgZHggb3IgZHkgZXF1YWwgdG9cblx0Ly8gdyBvciBoIHJlc3BlY3RpdmVseSAoZWxzZSB3ZSB3b3VsZCBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIHRvIHRoZVxuXHQvLyBlbGxpcHNlIGluc2NyaWJlZCBpbiB0aGUgYm91bmRpbmcgcmVjdClcblx0dmFyIHZzID0gMSAvIE1hdGgubWF4KE1hdGguYWJzKHZ4KSwgTWF0aC5hYnModnkpKTtcblx0ZHggKj0gdnggKiB2cztcblx0ZHkgKj0gdnkgKiB2cztcblxuXHQvLyBmaW5hbGx5LCBpbmNsdWRlIHRoZSBleHBsaWNpdCBvZmZzZXRcblx0ZHggKz0gbW9kZWwub2Zmc2V0ICogdng7XG5cdGR5ICs9IG1vZGVsLm9mZnNldCAqIHZ5O1xuXG5cdHJldHVybiB7XG5cdFx0eDogcG9pbnQueCArIGR4LFxuXHRcdHk6IHBvaW50LnkgKyBkeVxuXHR9O1xufVxuXG5mdW5jdGlvbiBjb2xsaWRlKGxhYmVscywgY29sbGlkZXIpIHtcblx0dmFyIGksIGosIHMwLCBzMTtcblxuXHQvLyBJTVBPUlRBTlQgSXRlcmF0ZSBpbiB0aGUgcmV2ZXJzZSBvcmRlciBzaW5jZSBpdGVtcyBhdCB0aGUgZW5kIG9mIHRoZVxuXHQvLyBsaXN0IGhhdmUgYW4gaGlnaGVyIHdlaWdodC9wcmlvcml0eSBhbmQgdGh1cyBzaG91bGQgYmUgbGVzcyBpbXBhY3RlZFxuXHQvLyBieSB0aGUgb3ZlcmxhcHBpbmcgc3RyYXRlZ3kuXG5cblx0Zm9yIChpID0gbGFiZWxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdFx0czAgPSBsYWJlbHNbaV0uJGxheW91dDtcblxuXHRcdGZvciAoaiA9IGkgLSAxOyBqID49IDAgJiYgczAuX3Zpc2libGU7IC0taikge1xuXHRcdFx0czEgPSBsYWJlbHNbal0uJGxheW91dDtcblxuXHRcdFx0aWYgKHMxLl92aXNpYmxlICYmIHMwLl9ib3guaW50ZXJzZWN0cyhzMS5fYm94KSkge1xuXHRcdFx0XHRjb2xsaWRlcihzMCwgczEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBsYWJlbHM7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGUkMShsYWJlbHMpIHtcblx0dmFyIGksIGlsZW4sIGxhYmVsLCBzdGF0ZSwgZ2VvbWV0cnksIGNlbnRlcjtcblxuXHQvLyBJbml0aWFsaXplIGxhYmVscyBmb3Igb3ZlcmxhcCBkZXRlY3Rpb25cblx0Zm9yIChpID0gMCwgaWxlbiA9IGxhYmVscy5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcblx0XHRsYWJlbCA9IGxhYmVsc1tpXTtcblx0XHRzdGF0ZSA9IGxhYmVsLiRsYXlvdXQ7XG5cblx0XHRpZiAoc3RhdGUuX3Zpc2libGUpIHtcblx0XHRcdGdlb21ldHJ5ID0gbGFiZWwuZ2VvbWV0cnkoKTtcblx0XHRcdGNlbnRlciA9IGNvb3JkaW5hdGVzKGxhYmVsLl9lbC5fbW9kZWwsIGxhYmVsLm1vZGVsKCksIGdlb21ldHJ5KTtcblx0XHRcdHN0YXRlLl9ib3gudXBkYXRlKGNlbnRlciwgZ2VvbWV0cnksIGxhYmVsLnJvdGF0aW9uKCkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEF1dG8gaGlkZSBvdmVybGFwcGluZyBsYWJlbHNcblx0cmV0dXJuIGNvbGxpZGUobGFiZWxzLCBmdW5jdGlvbihzMCwgczEpIHtcblx0XHR2YXIgaDAgPSBzMC5faGlkYWJsZTtcblx0XHR2YXIgaDEgPSBzMS5faGlkYWJsZTtcblxuXHRcdGlmICgoaDAgJiYgaDEpIHx8IGgxKSB7XG5cdFx0XHRzMS5fdmlzaWJsZSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoaDApIHtcblx0XHRcdHMwLl92aXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcbn1cblxudmFyIGxheW91dCA9IHtcblx0cHJlcGFyZTogZnVuY3Rpb24oZGF0YXNldHMpIHtcblx0XHR2YXIgbGFiZWxzID0gW107XG5cdFx0dmFyIGksIGosIGlsZW4sIGpsZW4sIGxhYmVsO1xuXG5cdFx0Zm9yIChpID0gMCwgaWxlbiA9IGRhdGFzZXRzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuXHRcdFx0Zm9yIChqID0gMCwgamxlbiA9IGRhdGFzZXRzW2ldLmxlbmd0aDsgaiA8IGpsZW47ICsraikge1xuXHRcdFx0XHRsYWJlbCA9IGRhdGFzZXRzW2ldW2pdO1xuXHRcdFx0XHRsYWJlbHMucHVzaChsYWJlbCk7XG5cdFx0XHRcdGxhYmVsLiRsYXlvdXQgPSB7XG5cdFx0XHRcdFx0X2JveDogbmV3IEhpdEJveCgpLFxuXHRcdFx0XHRcdF9oaWRhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRfdmlzaWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRfc2V0OiBpLFxuXHRcdFx0XHRcdF9pZHg6IGpcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBUT0RPIE5ldyBgemAgb3B0aW9uOiBsYWJlbHMgd2l0aCBhIGhpZ2hlciB6LWluZGV4IGFyZSBkcmF3blxuXHRcdC8vIG9mIHRvcCBvZiB0aGUgb25lcyB3aXRoIGEgbG93ZXIgaW5kZXguIExvd2VzdCB6LWluZGV4IGxhYmVsc1xuXHRcdC8vIGFyZSBhbHNvIGRpc2NhcmRlZCBmaXJzdCB3aGVuIGhpZGluZyBvdmVybGFwcGluZyBsYWJlbHMuXG5cdFx0bGFiZWxzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIHNhID0gYS4kbGF5b3V0O1xuXHRcdFx0dmFyIHNiID0gYi4kbGF5b3V0O1xuXG5cdFx0XHRyZXR1cm4gc2EuX2lkeCA9PT0gc2IuX2lkeFxuXHRcdFx0XHQ/IHNhLl9zZXQgLSBzYi5fc2V0XG5cdFx0XHRcdDogc2IuX2lkeCAtIHNhLl9pZHg7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnVwZGF0ZShsYWJlbHMpO1xuXG5cdFx0cmV0dXJuIGxhYmVscztcblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uKGxhYmVscykge1xuXHRcdHZhciBkaXJ0eSA9IGZhbHNlO1xuXHRcdHZhciBpLCBpbGVuLCBsYWJlbCwgbW9kZWwsIHN0YXRlO1xuXG5cdFx0Zm9yIChpID0gMCwgaWxlbiA9IGxhYmVscy5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcblx0XHRcdGxhYmVsID0gbGFiZWxzW2ldO1xuXHRcdFx0bW9kZWwgPSBsYWJlbC5tb2RlbCgpO1xuXHRcdFx0c3RhdGUgPSBsYWJlbC4kbGF5b3V0O1xuXHRcdFx0c3RhdGUuX2hpZGFibGUgPSBtb2RlbCAmJiBtb2RlbC5kaXNwbGF5ID09PSAnYXV0byc7XG5cdFx0XHRzdGF0ZS5fdmlzaWJsZSA9IGxhYmVsLnZpc2libGUoKTtcblx0XHRcdGRpcnR5IHw9IHN0YXRlLl9oaWRhYmxlO1xuXHRcdH1cblxuXHRcdGlmIChkaXJ0eSkge1xuXHRcdFx0Y29tcHV0ZSQxKGxhYmVscyk7XG5cdFx0fVxuXHR9LFxuXG5cdGxvb2t1cDogZnVuY3Rpb24obGFiZWxzLCBwb2ludCkge1xuXHRcdHZhciBpLCBzdGF0ZTtcblxuXHRcdC8vIElNUE9SVEFOVCBJdGVyYXRlIGluIHRoZSByZXZlcnNlIG9yZGVyIHNpbmNlIGl0ZW1zIGF0IHRoZSBlbmQgb2Zcblx0XHQvLyB0aGUgbGlzdCBoYXZlIGFuIGhpZ2hlciB6LWluZGV4LCB0aHVzIHNob3VsZCBiZSBwaWNrZWQgZmlyc3QuXG5cblx0XHRmb3IgKGkgPSBsYWJlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcblx0XHRcdHN0YXRlID0gbGFiZWxzW2ldLiRsYXlvdXQ7XG5cblx0XHRcdGlmIChzdGF0ZSAmJiBzdGF0ZS5fdmlzaWJsZSAmJiBzdGF0ZS5fYm94LmNvbnRhaW5zKHBvaW50KSkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRhdGFzZXQ6IHN0YXRlLl9zZXQsXG5cdFx0XHRcdFx0bGFiZWw6IGxhYmVsc1tpXVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdGRyYXc6IGZ1bmN0aW9uKGNoYXJ0LCBsYWJlbHMpIHtcblx0XHR2YXIgaSwgaWxlbiwgbGFiZWwsIHN0YXRlLCBnZW9tZXRyeSwgY2VudGVyO1xuXG5cdFx0Zm9yIChpID0gMCwgaWxlbiA9IGxhYmVscy5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcblx0XHRcdGxhYmVsID0gbGFiZWxzW2ldO1xuXHRcdFx0c3RhdGUgPSBsYWJlbC4kbGF5b3V0O1xuXG5cdFx0XHRpZiAoc3RhdGUuX3Zpc2libGUpIHtcblx0XHRcdFx0Z2VvbWV0cnkgPSBsYWJlbC5nZW9tZXRyeSgpO1xuXHRcdFx0XHRjZW50ZXIgPSBjb29yZGluYXRlcyhsYWJlbC5fZWwuX3ZpZXcsIGxhYmVsLm1vZGVsKCksIGdlb21ldHJ5KTtcblx0XHRcdFx0c3RhdGUuX2JveC51cGRhdGUoY2VudGVyLCBnZW9tZXRyeSwgbGFiZWwucm90YXRpb24oKSk7XG5cdFx0XHRcdGxhYmVsLmRyYXcoY2hhcnQsIGNlbnRlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgT3B0aW9uc1xuICovXG5cbnZhciBoZWxwZXJzJDMgPSBDaGFydC5oZWxwZXJzO1xuXG52YXIgZGVmYXVsdHMgPSB7XG5cdC8qKlxuXHQgKiBUaGUgbGFiZWwgYm94IGFsaWdubWVudCByZWxhdGl2ZSB0byBgYW5jaG9yYCB0aGF0IGNhbiBiZSBleHByZXNzZWQgZWl0aGVyIGJ5IGEgbnVtYmVyXG5cdCAqIHJlcHJlc2VudGluZyB0aGUgY2xvY2t3aXNlIGFuZ2xlIChpbiBkZWdyZWUpIG9yIGJ5IG9uZSBvZiB0aGUgZm9sbG93aW5nIHN0cmluZyBwcmVzZXRzOlxuXHQgKiAtICdzdGFydCc6IGJlZm9yZSB0aGUgYW5jaG9yIHBvaW50LCBmb2xsb3dpbmcgdGhlIHNhbWUgZGlyZWN0aW9uXG5cdCAqIC0gJ2VuZCc6IGFmdGVyIHRoZSBhbmNob3IgcG9pbnQsIGZvbGxvd2luZyB0aGUgc2FtZSBkaXJlY3Rpb25cblx0ICogLSAnY2VudGVyJzogY2VudGVyZWQgb24gdGhlIGFuY2hvciBwb2ludFxuXHQgKiAtICdyaWdodCc6IDDCsFxuXHQgKiAtICdib3R0b20nOiA5MMKwXG5cdCAqIC0gJ2xlZnQnOiAxODDCsFxuXHQgKiAtICd0b3AnOiAyNzDCsFxuXHQgKiBAbWVtYmVyIHtTdHJpbmd8TnVtYmVyfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCAnY2VudGVyJ1xuXHQgKi9cblx0YWxpZ246ICdjZW50ZXInLFxuXG5cdC8qKlxuXHQgKiBUaGUgbGFiZWwgYm94IGFsaWdubWVudCByZWxhdGl2ZSB0byB0aGUgZWxlbWVudCAoJ3N0YXJ0J3wnY2VudGVyJ3wnZW5kJylcblx0ICogQG1lbWJlciB7U3RyaW5nfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCAnY2VudGVyJ1xuXHQgKi9cblx0YW5jaG9yOiAnY2VudGVyJyxcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIHVzZWQgdG8gZHJhdyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgc3Vycm91bmRpbmcgZnJhbWUuXG5cdCAqIEBtZW1iZXIge1N0cmluZ3xBcnJheXxGdW5jdGlvbnxudWxsfVxuXHQgKiBAZGVmYXVsdCBudWxsIChubyBiYWNrZ3JvdW5kKVxuXHQgKi9cblx0YmFja2dyb3VuZENvbG9yOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBUaGUgY29sb3IgdXNlZCB0byBkcmF3IHRoZSBib3JkZXIgb2YgdGhlIHN1cnJvdW5kaW5nIGZyYW1lLlxuXHQgKiBAbWVtYmVyIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb258bnVsbH1cblx0ICogQGRlZmF1bHQgbnVsbCAobm8gYm9yZGVyKVxuXHQgKi9cblx0Ym9yZGVyQ29sb3I6IG51bGwsXG5cblx0LyoqXG5cdCAqIFRoZSBib3JkZXIgcmFkaXVzIHVzZWQgdG8gYWRkIHJvdW5kZWQgY29ybmVycyB0byB0aGUgc3Vycm91bmRpbmcgZnJhbWUuXG5cdCAqIEBtZW1iZXIge051bWJlcnxBcnJheXxGdW5jdGlvbn1cblx0ICogQGRlZmF1bHQgMCAobm90IHJvdW5kZWQpXG5cdCAqL1xuXHRib3JkZXJSYWRpdXM6IDAsXG5cblx0LyoqXG5cdCAqIFRoZSBib3JkZXIgd2lkdGggb2YgdGhlIHN1cnJvdW5kaW5nIGZyYW1lLlxuXHQgKiBAbWVtYmVyIHtOdW1iZXJ8QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0IDAgKG5vIGJvcmRlcilcblx0ICovXG5cdGJvcmRlcldpZHRoOiAwLFxuXG5cdC8qKlxuXHQgKiBXaGVuIGB0cnVlYCwgdGhlIGFuY2hvciBwb3NpdGlvbiBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSB2aXNpYmxlXG5cdCAqIGdlb21ldHJ5IG9mIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgKGkuZS4gcGFydCBpbnNpZGUgdGhlIGNoYXJ0IGFyZWEpLlxuXHQgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvaXNzdWVzLzk4XG5cdCAqIEBtZW1iZXIge0Jvb2xlYW58QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRjbGFtcDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIENsaXAgdGhlIGxhYmVsIGRyYXdpbmcgdG8gdGhlIGNoYXJ0IGFyZWEuXG5cdCAqIEBtZW1iZXIge0Jvb2xlYW58QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0IGZhbHNlIChubyBjbGlwcGluZylcblx0ICovXG5cdGNsaXA6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBUaGUgY29sb3IgdXNlZCB0byBkcmF3IHRoZSBsYWJlbCB0ZXh0LlxuXHQgKiBAbWVtYmVyIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0IHVuZGVmaW5lZCAodXNlIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udENvbG9yKVxuXHQgKi9cblx0Y29sb3I6IHVuZGVmaW5lZCxcblxuXHQvKipcblx0ICogV2hlbiBgZmFsc2VgLCB0aGUgbGFiZWwgaXMgaGlkZGVuIGFuZCBhc3NvY2lhdGVkIG9wdGlvbnMgYXJlIG5vdFxuXHQgKiBjYWxjdWxhdGVkLCBlbHNlIGlmIGB0cnVlYCwgdGhlIGxhYmVsIGlzIGRyYXduLiBJZiBgYXV0b2AsIHRoZVxuXHQgKiBsYWJlbCBpcyBhdXRvbWF0aWNhbGx5IGhpZGRlbiBpZiBpdCBhcHBlYXJzIHVuZGVyIGFub3RoZXIgbGFiZWwuXG5cdCAqIEBtZW1iZXIge0Jvb2xlYW58U3RyaW5nfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCB0cnVlXG5cdCAqL1xuXHRkaXNwbGF5OiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBUaGUgZm9udCBvcHRpb25zIHVzZWQgdG8gZHJhdyB0aGUgbGFiZWwgdGV4dC5cblx0ICogQG1lbWJlciB7T2JqZWN0fEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAcHJvcCB7U3RyaW5nfSBmb250LmZhbWlseSAtIGRlZmF1bHRzIHRvIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5kZWZhdWx0Rm9udEZhbWlseVxuXHQgKiBAcHJvcCB7TnVtYmVyfSBmb250LmxpbmVIZWlnaHQgLSBkZWZhdWx0cyB0byAxLjJcblx0ICogQHByb3Age051bWJlcn0gZm9udC5zaXplIC0gZGVmYXVsdHMgdG8gQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U2l6ZVxuXHQgKiBAcHJvcCB7U3RyaW5nfSBmb250LnN0eWxlIC0gZGVmYXVsdHMgdG8gQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250U3R5bGVcblx0ICogQHByb3Age051bWJlcn0gZm9udC53ZWlnaHQgLSBkZWZhdWx0cyB0byAnbm9ybWFsJ1xuXHQgKiBAZGVmYXVsdCBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZGVmYXVsdEZvbnQuKlxuXHQgKi9cblx0Zm9udDoge1xuXHRcdGZhbWlseTogdW5kZWZpbmVkLFxuXHRcdGxpbmVIZWlnaHQ6IDEuMixcblx0XHRzaXplOiB1bmRlZmluZWQsXG5cdFx0c3R5bGU6IHVuZGVmaW5lZCxcblx0XHR3ZWlnaHQ6IG51bGxcblx0fSxcblxuXHQvKipcblx0ICogQWxsb3dzIHRvIGN1c3RvbWl6ZSB0aGUgbGFiZWwgdGV4dCBieSB0cmFuc2Zvcm1pbmcgaW5wdXQgZGF0YS5cblx0ICogQG1lbWJlciB7RnVuY3Rpb258bnVsbH1cblx0ICogQHByb3Ageyp9IHZhbHVlIC0gVGhlIGRhdGEgdmFsdWVcblx0ICogQHByb3Age09iamVjdH0gY29udGV4dCAtIFRoZSBmdW5jdGlvbiB1bmlxdWUgYXJndW1lbnQ6XG5cdCAqIEBwcm9wIHtDaGFydH0gY29udGV4dC5jaGFydCAtIFRoZSBjdXJyZW50IGNoYXJ0XG5cdCAqIEBwcm9wIHtOdW1iZXJ9IGNvbnRleHQuZGF0YUluZGV4IC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgZGF0YVxuXHQgKiBAcHJvcCB7T2JqZWN0fSBjb250ZXh0LmRhdGFzZXQgLSBUaGUgY3VycmVudCBkYXRhc2V0XG5cdCAqIEBwcm9wIHtOdW1iZXJ9IGNvbnRleHQuZGF0YXNldEluZGV4IC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgZGF0YXNldFxuXHQgKiBAZGVmYXVsdCBkYXRhW2luZGV4XVxuXHQgKi9cblx0Zm9ybWF0dGVyOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGlmIChoZWxwZXJzJDMuaXNOdWxsT3JVbmRlZih2YWx1ZSkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHZhciBsYWJlbCA9IHZhbHVlO1xuXHRcdHZhciBrZXlzLCBrbGVuLCBrO1xuXHRcdGlmIChoZWxwZXJzJDMuaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRpZiAoIWhlbHBlcnMkMy5pc051bGxPclVuZGVmKHZhbHVlLmxhYmVsKSkge1xuXHRcdFx0XHRsYWJlbCA9IHZhbHVlLmxhYmVsO1xuXHRcdFx0fSBlbHNlIGlmICghaGVscGVycyQzLmlzTnVsbE9yVW5kZWYodmFsdWUucikpIHtcblx0XHRcdFx0bGFiZWwgPSB2YWx1ZS5yO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGFiZWwgPSAnJztcblx0XHRcdFx0a2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblx0XHRcdFx0Zm9yIChrID0gMCwga2xlbiA9IGtleXMubGVuZ3RoOyBrIDwga2xlbjsgKytrKSB7XG5cdFx0XHRcdFx0bGFiZWwgKz0gKGsgIT09IDAgPyAnLCAnIDogJycpICsga2V5c1trXSArICc6ICcgKyB2YWx1ZVtrZXlzW2tdXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gJycgKyBsYWJlbDtcblx0fSxcblxuXHQvKipcblx0ICogRXZlbnQgbGlzdGVuZXJzLCB3aGVyZSB0aGUgcHJvcGVydHkgaXMgdGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBhbmQgdGhlIHZhbHVlXG5cdCAqIGEgY2FsbGJhY2sgd2l0aCBhIHVuaXF1ZSBgY29udGV4dGAgYXJndW1lbnQgY29udGFpbmluZyB0aGUgc2FtZSBpbmZvcm1hdGlvbiBhcyBmb3Jcblx0ICogc2NyaXB0YWJsZSBvcHRpb25zLiBJZiBhIGNhbGxiYWNrIGV4cGxpY2l0bHkgcmV0dXJucyBgdHJ1ZWAsIHRoZSBsYWJlbCBpcyB1cGRhdGVkXG5cdCAqIHdpdGggdGhlIGN1cnJlbnQgY29udGV4dCBhbmQgdGhlIGNoYXJ0IHJlLXJlbmRlcmVkLiBUaGlzIGFsbG93cyB0byBpbXBsZW1lbnQgdmlzdWFsXG5cdCAqIGludGVyYWN0aW9ucyB3aXRoIGxhYmVscyBzdWNoIGFzIGhpZ2hsaWdodCwgc2VsZWN0aW9uLCBldGMuXG5cdCAqXG5cdCAqIEV2ZW50IGN1cnJlbnRseSBzdXBwb3J0ZWQgYXJlOlxuXHQgKiAtICdjbGljayc6IGEgbW91c2UgY2xpY2sgaXMgZGV0ZWN0ZWQgd2l0aGluIGEgbGFiZWxcblx0ICogLSAnZW50ZXInOiB0aGUgbW91c2UgZW50ZXJzIGEgbGFiZWxcblx0ICogLSAnbGVhdmUnOiB0aGUgbW91c2UgbGVhdmVzIGEgbGFiZWxcblx0ICpcblx0ICogQG1lbWJlciB7T2JqZWN0fVxuXHQgKiBAZGVmYXVsdCB7fVxuXHQgKi9cblx0bGlzdGVuZXJzOiB7fSxcblxuXHQvKipcblx0ICogVGhlIGRpc3RhbmNlIChpbiBwaXhlbHMpIHRvIHB1bGwgdGhlIGxhYmVsIGF3YXkgZnJvbSB0aGUgYW5jaG9yIHBvaW50LCB0aGUgZGlyZWN0aW9uXG5cdCAqIGJlaW5nIGRldGVybWluZWQgYnkgdGhlIGBhbGlnbmAgdmFsdWUgKG9ubHkgYXBwbGljYWJsZSBpZiBgYWxpZ25gIGlzIGBzdGFydGAgb3IgYGVuZGApLlxuXHQgKiBAbWVtYmVyIHtOdW1iZXJ8QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0IDRcblx0ICovXG5cdG9mZnNldDogNCxcblxuXHQvKipcblx0ICogVGhlIGxhYmVsIGdsb2JhbCBvcGFjaXR5LCBpbmNsdWRpbmcgdGhlIHRleHQsIGJhY2tncm91bmQsIGJvcmRlcnMsIGV0Yy4sIHNwZWNpZmllZCBhc1xuXHQgKiBhIG51bWJlciBiZXR3ZWVuIDAuMCAoZnVsbHkgdHJhbnNwYXJlbnQpIGFuZCAxLjAgKGZ1bGx5IG9wYXF1ZSkuXG5cdCAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQvZ2xvYmFsQWxwaGFcblx0ICogQG1lbWJlciB7TnVtYmVyfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCAxXG5cdCAqL1xuXHRvcGFjaXR5OiAxLFxuXG5cdC8qKlxuXHQgKiBUaGUgcGFkZGluZyAoaW4gcGl4ZWxzKSB0byBhcHBseSBiZXR3ZWVuIHRoZSB0ZXh0IGFuZCB0aGUgc3Vycm91bmRpbmcgZnJhbWUuXG5cdCAqIEBtZW1iZXIge051bWJlcnxPYmplY3R8QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBwcm9wIHtOdW1iZXJ9IHBhZGRpbmcudG9wIC0gU3BhY2UgYWJvdmUgdGhlIHRleHQuXG5cdCAqIEBwcm9wIHtOdW1iZXJ9IHBhZGRpbmcucmlnaHQgLSBTcGFjZSBvbiB0aGUgcmlnaHQgb2YgdGhlIHRleHQuXG5cdCAqIEBwcm9wIHtOdW1iZXJ9IHBhZGRpbmcuYm90dG9tIC0gU3BhY2UgYmVsb3cgdGhlIHRleHQuXG5cdCAqIEBwcm9wIHtOdW1iZXJ9IHBhZGRpbmcubGVmdCAtIFNwYWNlIG9uIHRoZSBsZWZ0IG9mIHRoZSB0ZXh0LlxuXHQgKiBAZGVmYXVsdCA0IChhbGwgdmFsdWVzKVxuXHQgKi9cblx0cGFkZGluZzoge1xuXHRcdHRvcDogNCxcblx0XHRyaWdodDogNCxcblx0XHRib3R0b206IDQsXG5cdFx0bGVmdDogNFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbG9ja3dpc2Ugcm90YXRpb24gb2YgdGhlIGxhYmVsIHJlbGF0aXZlIHRvIGl0cyBjZW50ZXIuXG5cdCAqIEBtZW1iZXIge051bWJlcnxBcnJheXxGdW5jdGlvbn1cblx0ICogQGRlZmF1bHQgMFxuXHQgKi9cblx0cm90YXRpb246IDAsXG5cblx0LyoqXG5cdCAqIFRleHQgYWxpZ25tZW50IGZvciBtdWx0aS1saW5lcyBsYWJlbHMgKCdsZWZ0J3wncmlnaHQnfCdzdGFydCd8J2NlbnRlcid8J2VuZCcpLlxuXHQgKiBAbWVtYmVyIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259XG5cdCAqIEBkZWZhdWx0ICdzdGFydCdcblx0ICovXG5cdHRleHRBbGlnbjogJ3N0YXJ0JyxcblxuXHQvKipcblx0ICogVGhlIHN0cm9rZSBjb2xvciB1c2VkIHRvIGRyYXcgdGhlIGxhYmVsIHRleHQuIElmIHRoaXMgb3B0aW9ucyBpc1xuXHQgKiBub3Qgc2V0IChkZWZhdWx0KSwgdGhlIHZhbHVlIG9mIHRoZSBgY29sb3JgIG9wdGlvbiB3aWxsIGJlIHVzZWQuXG5cdCAqIEBtZW1iZXIge1N0cmluZ3xBcnJheXxGdW5jdGlvbnxudWxsfVxuXHQgKiBAZGVmYXVsdCBjb2xvclxuXHQgKi9cblx0dGV4dFN0cm9rZUNvbG9yOiB1bmRlZmluZWQsXG5cblx0LyoqXG5cdCAqIFRoZSB3aWR0aCBvZiB0aGUgc3Ryb2tlIGZvciB0aGUgbGFiZWwgdGV4dC5cblx0ICogQG1lbWJlciB7TnVtYmVyfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCAwIChubyBzdHJva2UpXG5cdCAqL1xuXHR0ZXh0U3Ryb2tlV2lkdGg6IDAsXG5cblx0LyoqXG5cdCAqIFRoZSBhbW91bnQgb2YgYmx1ciBhcHBsaWVkIHRvIHNoYWRvdyB1bmRlciB0aGUgbGFiZWwgdGV4dC5cblx0ICogQG1lbWJlciB7TnVtYmVyfEFycmF5fEZ1bmN0aW9ufVxuXHQgKiBAZGVmYXVsdCAwIChubyBzaGFkb3cpXG5cdCAqL1xuXHR0ZXh0U2hhZG93Qmx1cjogMCxcblxuXHQvKipcblx0ICogVGhlIGNvbG9yIG9mIHRoZSBzaGFkb3cgdW5kZXIgdGhlIGxhYmVsIHRleHQuXG5cdCAqIEBtZW1iZXIge1N0cmluZ3xBcnJheXxGdW5jdGlvbnxudWxsfVxuXHQgKiBAZGVmYXVsdCBgY29sb3JgXG5cdCAqL1xuXHR0ZXh0U2hhZG93Q29sb3I6IHVuZGVmaW5lZCxcbn07XG5cbi8qKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvNDE3NlxuICovXG5cbnZhciBoZWxwZXJzJDQgPSBDaGFydC5oZWxwZXJzO1xudmFyIEVYUEFORE9fS0VZID0gJyRkYXRhbGFiZWxzJztcblxuQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLnBsdWdpbnMuZGF0YWxhYmVscyA9IGRlZmF1bHRzO1xuXG5mdW5jdGlvbiBjb25maWd1cmUoZGF0YXNldCwgb3B0aW9ucykge1xuXHR2YXIgb3ZlcnJpZGUgPSBkYXRhc2V0LmRhdGFsYWJlbHM7XG5cdHZhciBjb25maWcgPSB7fTtcblxuXHRpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKG92ZXJyaWRlID09PSB0cnVlKSB7XG5cdFx0b3ZlcnJpZGUgPSB7fTtcblx0fVxuXG5cdHJldHVybiBoZWxwZXJzJDQubWVyZ2UoY29uZmlnLCBbb3B0aW9ucywgb3ZlcnJpZGVdKTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChjaGFydCwgbGlzdGVuZXJzLCB0YXJnZXQpIHtcblx0dmFyIGNhbGxiYWNrID0gbGlzdGVuZXJzICYmIGxpc3RlbmVyc1t0YXJnZXQuZGF0YXNldF07XG5cdGlmICghY2FsbGJhY2spIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR2YXIgbGFiZWwgPSB0YXJnZXQubGFiZWw7XG5cdHZhciBjb250ZXh0ID0gbGFiZWwuJGNvbnRleHQ7XG5cblx0aWYgKGhlbHBlcnMkNC5jYWxsYmFjayhjYWxsYmFjaywgW2NvbnRleHRdKSA9PT0gdHJ1ZSkge1xuXHRcdC8vIFVzZXJzIGFyZSBhbGxvd2VkIHRvIHR3ZWFrIHRoZSBnaXZlbiBjb250ZXh0IGJ5IGluamVjdGluZyB2YWx1ZXMgdGhhdCBjYW4gYmVcblx0XHQvLyB1c2VkIGluIHNjcmlwdGFibGUgb3B0aW9ucyB0byBkaXNwbGF5IGxhYmVscyBkaWZmZXJlbnRseSBiYXNlZCBvbiB0aGUgY3VycmVudFxuXHRcdC8vIGV2ZW50IChlLmcuIGhpZ2hsaWdodCBhbiBob3ZlcmVkIGxhYmVsKS4gVGhhdCdzIHdoeSB3ZSB1cGRhdGUgdGhlIGxhYmVsIHdpdGhcblx0XHQvLyB0aGUgb3V0cHV0IGNvbnRleHQgYW5kIHNjaGVkdWxlIGEgbmV3IGNoYXJ0IHJlbmRlciBieSBzZXR0aW5nIGl0IGRpcnR5LlxuXHRcdGNoYXJ0W0VYUEFORE9fS0VZXS5fZGlydHkgPSB0cnVlO1xuXHRcdGxhYmVsLnVwZGF0ZShjb250ZXh0KTtcblx0fVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE1vdmVFdmVudHMoY2hhcnQsIGxpc3RlbmVycywgcHJldmlvdXMsIHRhcmdldCkge1xuXHR2YXIgZW50ZXIsIGxlYXZlO1xuXG5cdGlmICghcHJldmlvdXMgJiYgIXRhcmdldCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICghcHJldmlvdXMpIHtcblx0XHRlbnRlciA9IHRydWU7XG5cdH0gZWxzZSBpZiAoIXRhcmdldCkge1xuXHRcdGxlYXZlID0gdHJ1ZTtcblx0fSBlbHNlIGlmIChwcmV2aW91cy5sYWJlbCAhPT0gdGFyZ2V0LmxhYmVsKSB7XG5cdFx0bGVhdmUgPSBlbnRlciA9IHRydWU7XG5cdH1cblxuXHRpZiAobGVhdmUpIHtcblx0XHRkaXNwYXRjaEV2ZW50KGNoYXJ0LCBsaXN0ZW5lcnMubGVhdmUsIHByZXZpb3VzKTtcblx0fVxuXHRpZiAoZW50ZXIpIHtcblx0XHRkaXNwYXRjaEV2ZW50KGNoYXJ0LCBsaXN0ZW5lcnMuZW50ZXIsIHRhcmdldCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW92ZUV2ZW50cyhjaGFydCwgZXZlbnQpIHtcblx0dmFyIGV4cGFuZG8gPSBjaGFydFtFWFBBTkRPX0tFWV07XG5cdHZhciBsaXN0ZW5lcnMgPSBleHBhbmRvLl9saXN0ZW5lcnM7XG5cdHZhciBwcmV2aW91cywgdGFyZ2V0O1xuXG5cdGlmICghbGlzdGVuZXJzLmVudGVyICYmICFsaXN0ZW5lcnMubGVhdmUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScpIHtcblx0XHR0YXJnZXQgPSBsYXlvdXQubG9va3VwKGV4cGFuZG8uX2xhYmVscywgZXZlbnQpO1xuXHR9IGVsc2UgaWYgKGV2ZW50LnR5cGUgIT09ICdtb3VzZW91dCcpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRwcmV2aW91cyA9IGV4cGFuZG8uX2hvdmVyZWQ7XG5cdGV4cGFuZG8uX2hvdmVyZWQgPSB0YXJnZXQ7XG5cdGRpc3BhdGNoTW92ZUV2ZW50cyhjaGFydCwgbGlzdGVuZXJzLCBwcmV2aW91cywgdGFyZ2V0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQ2xpY2tFdmVudHMoY2hhcnQsIGV2ZW50KSB7XG5cdHZhciBleHBhbmRvID0gY2hhcnRbRVhQQU5ET19LRVldO1xuXHR2YXIgaGFuZGxlcnMgPSBleHBhbmRvLl9saXN0ZW5lcnMuY2xpY2s7XG5cdHZhciB0YXJnZXQgPSBoYW5kbGVycyAmJiBsYXlvdXQubG9va3VwKGV4cGFuZG8uX2xhYmVscywgZXZlbnQpO1xuXHRpZiAodGFyZ2V0KSB7XG5cdFx0ZGlzcGF0Y2hFdmVudChjaGFydCwgaGFuZGxlcnMsIHRhcmdldCk7XG5cdH1cbn1cblxuQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLnBsdWdpbnMuZGF0YWxhYmVscyA9IGRlZmF1bHRzO1xuXG52YXIgcGx1Z2luID0ge1xuXHRpZDogJ2RhdGFsYWJlbHMnLFxuXG5cdGJlZm9yZUluaXQ6IGZ1bmN0aW9uKGNoYXJ0KSB7XG5cdFx0Y2hhcnRbRVhQQU5ET19LRVldID0ge1xuXHRcdFx0X2FjdGl2ZXM6IFtdXG5cdFx0fTtcblx0fSxcblxuXHRiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uKGNoYXJ0KSB7XG5cdFx0dmFyIGV4cGFuZG8gPSBjaGFydFtFWFBBTkRPX0tFWV07XG5cdFx0ZXhwYW5kby5fbGlzdGVuZWQgPSBmYWxzZTtcblx0XHRleHBhbmRvLl9saXN0ZW5lcnMgPSB7fTsgICAgIC8vIHtldmVudC10eXBlOiB7ZGF0YXNldC1pbmRleDogZnVuY3Rpb259fVxuXHRcdGV4cGFuZG8uX2RhdGFzZXRzID0gW107ICAgICAgLy8gcGVyIGRhdGFzZXQgbGFiZWxzOiBbW0xhYmVsXV1cblx0XHRleHBhbmRvLl9sYWJlbHMgPSBbXTsgICAgICAgIC8vIGxheW91dGVkIGxhYmVsczogW0xhYmVsXVxuXHR9LFxuXG5cdGFmdGVyRGF0YXNldFVwZGF0ZTogZnVuY3Rpb24oY2hhcnQsIGFyZ3MsIG9wdGlvbnMpIHtcblx0XHR2YXIgZGF0YXNldEluZGV4ID0gYXJncy5pbmRleDtcblx0XHR2YXIgZXhwYW5kbyA9IGNoYXJ0W0VYUEFORE9fS0VZXTtcblx0XHR2YXIgbGFiZWxzID0gZXhwYW5kby5fZGF0YXNldHNbZGF0YXNldEluZGV4XSA9IFtdO1xuXHRcdHZhciB2aXNpYmxlID0gY2hhcnQuaXNEYXRhc2V0VmlzaWJsZShkYXRhc2V0SW5kZXgpO1xuXHRcdHZhciBkYXRhc2V0ID0gY2hhcnQuZGF0YS5kYXRhc2V0c1tkYXRhc2V0SW5kZXhdO1xuXHRcdHZhciBjb25maWcgPSBjb25maWd1cmUoZGF0YXNldCwgb3B0aW9ucyk7XG5cdFx0dmFyIGVsZW1lbnRzID0gYXJncy5tZXRhLmRhdGEgfHwgW107XG5cdFx0dmFyIGlsZW4gPSBlbGVtZW50cy5sZW5ndGg7XG5cdFx0dmFyIGN0eCA9IGNoYXJ0LmN0eDtcblx0XHR2YXIgaSwgZWwsIGxhYmVsO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBpbGVuOyArK2kpIHtcblx0XHRcdGVsID0gZWxlbWVudHNbaV07XG5cblx0XHRcdGlmICh2aXNpYmxlICYmIGVsICYmICFlbC5oaWRkZW4gJiYgIWVsLl9tb2RlbC5za2lwKSB7XG5cdFx0XHRcdGxhYmVscy5wdXNoKGxhYmVsID0gbmV3IExhYmVsKGNvbmZpZywgY3R4LCBlbCwgaSkpO1xuXHRcdFx0XHRsYWJlbC51cGRhdGUobGFiZWwuJGNvbnRleHQgPSB7XG5cdFx0XHRcdFx0YWN0aXZlOiBmYWxzZSxcblx0XHRcdFx0XHRjaGFydDogY2hhcnQsXG5cdFx0XHRcdFx0ZGF0YUluZGV4OiBpLFxuXHRcdFx0XHRcdGRhdGFzZXQ6IGRhdGFzZXQsXG5cdFx0XHRcdFx0ZGF0YXNldEluZGV4OiBkYXRhc2V0SW5kZXhcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsYWJlbCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGVsW0VYUEFORE9fS0VZXSA9IGxhYmVsO1xuXHRcdH1cblxuXHRcdGN0eC5yZXN0b3JlKCk7XG5cblx0XHQvLyBTdG9yZSBsaXN0ZW5lcnMgYXQgdGhlIGNoYXJ0IGxldmVsIGFuZCBwZXIgZXZlbnQgdHlwZSB0byBvcHRpbWl6ZVxuXHRcdC8vIGNhc2VzIHdoZXJlIG5vIGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZCBmb3IgYSBzcGVjaWZpYyBldmVudFxuXHRcdGhlbHBlcnMkNC5tZXJnZShleHBhbmRvLl9saXN0ZW5lcnMsIGNvbmZpZy5saXN0ZW5lcnMgfHwge30sIHtcblx0XHRcdG1lcmdlcjogZnVuY3Rpb24oa2V5LCB0YXJnZXQsIHNvdXJjZSkge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHRhcmdldFtrZXldIHx8IHt9O1xuXHRcdFx0XHR0YXJnZXRba2V5XVthcmdzLmluZGV4XSA9IHNvdXJjZVtrZXldO1xuXHRcdFx0XHRleHBhbmRvLl9saXN0ZW5lZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0YWZ0ZXJVcGRhdGU6IGZ1bmN0aW9uKGNoYXJ0LCBvcHRpb25zKSB7XG5cdFx0Y2hhcnRbRVhQQU5ET19LRVldLl9sYWJlbHMgPSBsYXlvdXQucHJlcGFyZShcblx0XHRcdGNoYXJ0W0VYUEFORE9fS0VZXS5fZGF0YXNldHMsXG5cdFx0XHRvcHRpb25zKTtcblx0fSxcblxuXHQvLyBEcmF3IGxhYmVscyBvbiB0b3Agb2YgYWxsIGRhdGFzZXQgZWxlbWVudHNcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy9pc3N1ZXMvMjlcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy9pc3N1ZXMvMzJcblx0YWZ0ZXJEYXRhc2V0c0RyYXc6IGZ1bmN0aW9uKGNoYXJ0KSB7XG5cdFx0bGF5b3V0LmRyYXcoY2hhcnQsIGNoYXJ0W0VYUEFORE9fS0VZXS5fbGFiZWxzKTtcblx0fSxcblxuXHRiZWZvcmVFdmVudDogZnVuY3Rpb24oY2hhcnQsIGV2ZW50KSB7XG5cdFx0Ly8gSWYgdGhlcmUgaXMgbm8gbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBjaGFydCwgYGxpc3RlbmVkYCB3aWxsIGJlIGZhbHNlLFxuXHRcdC8vIG1lYW5pbmcgd2UgY2FuIGltbWVkaWF0ZWx5IGlnbm9yZSB0aGUgaW5jb21pbmcgZXZlbnQgYW5kIGF2b2lkIHVzZWxlc3MgZXh0cmFcblx0XHQvLyBjb21wdXRhdGlvbiBmb3IgdXNlcnMgd2hvIGRvbid0IGltcGxlbWVudCBsYWJlbCBpbnRlcmFjdGlvbnMuXG5cdFx0aWYgKGNoYXJ0W0VYUEFORE9fS0VZXS5fbGlzdGVuZWQpIHtcblx0XHRcdHN3aXRjaCAoZXZlbnQudHlwZSkge1xuXHRcdFx0Y2FzZSAnbW91c2Vtb3ZlJzpcblx0XHRcdGNhc2UgJ21vdXNlb3V0Jzpcblx0XHRcdFx0aGFuZGxlTW92ZUV2ZW50cyhjaGFydCwgZXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2NsaWNrJzpcblx0XHRcdFx0aGFuZGxlQ2xpY2tFdmVudHMoY2hhcnQsIGV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRhZnRlckV2ZW50OiBmdW5jdGlvbihjaGFydCkge1xuXHRcdHZhciBleHBhbmRvID0gY2hhcnRbRVhQQU5ET19LRVldO1xuXHRcdHZhciBwcmV2aW91cyA9IGV4cGFuZG8uX2FjdGl2ZXM7XG5cdFx0dmFyIGFjdGl2ZXMgPSBleHBhbmRvLl9hY3RpdmVzID0gY2hhcnQubGFzdEFjdGl2ZSB8fCBbXTsgIC8vIHB1YmxpYyBBUEk/IVxuXHRcdHZhciB1cGRhdGVzID0gdXRpbHMuYXJyYXlEaWZmKHByZXZpb3VzLCBhY3RpdmVzKTtcblx0XHR2YXIgaSwgaWxlbiwgdXBkYXRlLCBsYWJlbDtcblxuXHRcdGZvciAoaSA9IDAsIGlsZW4gPSB1cGRhdGVzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuXHRcdFx0dXBkYXRlID0gdXBkYXRlc1tpXTtcblx0XHRcdGlmICh1cGRhdGVbMV0pIHtcblx0XHRcdFx0bGFiZWwgPSB1cGRhdGVbMF1bRVhQQU5ET19LRVldO1xuXHRcdFx0XHRpZiAobGFiZWwpIHtcblx0XHRcdFx0XHRsYWJlbC4kY29udGV4dC5hY3RpdmUgPSAodXBkYXRlWzFdID09PSAxKTtcblx0XHRcdFx0XHRsYWJlbC51cGRhdGUobGFiZWwuJGNvbnRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGV4cGFuZG8uX2RpcnR5IHx8IHVwZGF0ZXMubGVuZ3RoKSB7XG5cdFx0XHRsYXlvdXQudXBkYXRlKGV4cGFuZG8uX2xhYmVscyk7XG5cdFx0XHRpZiAoIWNoYXJ0LmFuaW1hdGluZykge1xuXHRcdFx0XHRjaGFydC5yZW5kZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkZWxldGUgZXhwYW5kby5fZGlydHk7XG5cdH1cbn07XG5cbi8vIFRPRE8gUmVtb3ZlIGF0IHZlcnNpb24gMSwgd2Ugc2hvdWxkbid0IGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgcGx1Z2lucy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvaXNzdWVzLzQyXG5DaGFydC5wbHVnaW5zLnJlZ2lzdGVyKHBsdWdpbik7XG5cbnJldHVybiBwbHVnaW47XG5cbn0pKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9