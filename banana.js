/*!
 * banana javascript library v1.5
 * based on the jquery.js
 * http://jquery.com/
 * date: 2015-05-04
 * author:zhangwei
 * 备注：banana.js,朋友们都说好
 */
(function (factory) {
    var root = this;
    var count = 5;//检测5次
    var handle;
    var detection = function () {
        var _$ = root.jQuery || root.top.jQuery || root.Zepto || root.top.Zepto;
        if (!_$) {
            if (count > 0) {
                count--;
                handle = setTimeout(function () {
                    detection();
                }, count > 0 ? 1000 : 5000);//最后一次放宽检测时间间隔
            } else {
                if (handle && handle > 0) { clearTimeout(handle); }
                var errorMsg = 'Banana javascript requires jquery or zepto';
                if (root === root.top || root.location.href.toLowerCase() === root.top.location.href.toLowerCase()) {
                    //alert(errorMsg);
                    throw Error(errorMsg);
                } else {
                    throw Error(errorMsg);
                }
            }
        } else {
            if (handle && handle > 0) { clearTimeout(handle); }
            factory.call(root, _$);
        }
    };
    detection();
}).call(window, function ($) {

    var root = this;
    var Banana = window.Banana || {};//namespace
    Banana.name = 'banana.js';
    //version
    Banana.version = '1.5';
    Banana.info = 'banana.js 朋友们都说好';
    //debug
    Banana.DEBUG = false;

    var extention = {};//拓展方法

    /***** Banana.Constant *****/
    Banana.Constant = {
        COMMAND_KEY: 'banana-cmd'
        , COMMAND_ARGS: 'banana-args'
        , FUNCTION_COMMAND_TRIGGER: 'buttonClick'
        , FUNCTION_STARTUP: 'startup'
        , FUNCTION_RESIZE: 'resize'
        , DEVICE: {
            PC: 'pc'
            , IPAD: 'ipad'
        },
        KEY_SYSVER: 'sysver'
    };

    /***** Banana.Global *****/
    Banana.Global = function (win) {
        /// <summary>
        /// 全局对象，单例
        /// </summary>
        var inited = false;
        win = win || window;
        //win._fn = {};//拓展方法

        var _init = function () {
            if (inited) return;
            _library().initMustache();
            _library().initEnumerable();
            _library().initAvgrund();
            _library().initCookie();
            inited = true;
        };
        var _library = function () {
            /// <summary>
            /// 第三方库
            /// </summary>
            var _mustache = function () {
                if (win.Mustache) return;
                //#region mustache
                (function (k, p) { "object" === typeof exports && exports ? p(exports) : "function" === typeof define && define.amd ? define(["exports"], p) : (k.Mustache = {}, p(Mustache)) })(win, function (k) {
                    function p(a) { return "function" === typeof a } function y(a) { return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") } function A(a, c) { return null != a && "object" === typeof a && c in a } function C(a, c) {
                        function b(a) {
                            "string" === typeof a && (a = a.split(D, 2)); if (!x(a) || 2 !== a.length) throw Error("Invalid tags: " + a); m = new RegExp(y(a[0]) + "\\s*"); v = new RegExp("\\s*" +
                y(a[1])); p = new RegExp("\\s*" + y("}" + a[1]))
                        } if (!a) return []; var d = [], e = [], g = [], h = !1, f = !1, m, v, p; b(c || k.tags); for (var n = new w(a), r, l, q, u; !n.eos() ;) {
                            r = n.pos; if (q = n.scanUntil(m)) { u = 0; for (var t = q.length; u < t; ++u) if (l = q.charAt(u), E.call(F, l) ? f = !0 : g.push(e.length), e.push(["text", l, r, r + 1]), r += 1, "\n" === l) { if (h && !f) for (; g.length;) delete e[g.pop()]; else g = []; f = h = !1 } } if (!n.scan(m)) break; h = !0; l = n.scan(G) || "name"; n.scan(H); "=" === l ? (q = n.scanUntil(B), n.scan(B), n.scanUntil(v)) : "{" === l ? (q = n.scanUntil(p), n.scan(I), n.scanUntil(v),
                            l = "&") : q = n.scanUntil(v); if (!n.scan(v)) throw Error("Unclosed tag at " + n.pos); u = [l, q, r, n.pos]; e.push(u); if ("#" === l || "^" === l) d.push(u); else if ("/" === l) { l = d.pop(); if (!l) throw Error('Unopened section "' + q + '" at ' + r); if (l[1] !== q) throw Error('Unclosed section "' + l[1] + '" at ' + r); } else "name" === l || "{" === l || "&" === l ? f = !0 : "=" === l && b(q)
                        } if (l = d.pop()) throw Error('Unclosed section "' + l[1] + '" at ' + n.pos); return J(K(e))
                    } function K(a) {
                        for (var c = [], b, d, e = 0, g = a.length; e < g; ++e) if (b = a[e]) "text" === b[0] && d && "text" === d[0] ?
                        (d[1] += b[1], d[3] = b[3]) : (c.push(b), d = b); return c
                    } function J(a) { for (var c = [], b = c, d = [], e, g = 0, h = a.length; g < h; ++g) switch (e = a[g], e[0]) { case "#": case "^": b.push(e); d.push(e); b = e[4] = []; break; case "/": b = d.pop(); b[5] = e[2]; b = 0 < d.length ? d[d.length - 1][4] : c; break; default: b.push(e) } return c } function w(a) { this.tail = this.string = a; this.pos = 0 } function t(a, c) { this.view = a; this.cache = { ".": this.view }; this.parent = c } function m() { this.cache = {} } var L = Object.prototype.toString, x = Array.isArray || function (a) {
                        return "[object Array]" ===
                        L.call(a)
                    }, E = RegExp.prototype.test, F = /\S/, M = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" }, H = /\s*/, D = /\s+/, B = /\s*=/, I = /\s*\}/, G = /#|\^|\/|>|\{|&|=|!/; w.prototype.eos = function () { return "" === this.tail }; w.prototype.scan = function (a) { a = this.tail.match(a); if (!a || 0 !== a.index) return ""; a = a[0]; this.tail = this.tail.substring(a.length); this.pos += a.length; return a }; w.prototype.scanUntil = function (a) {
                        a = this.tail.search(a); var c; switch (a) {
                            case -1: c = this.tail; this.tail = ""; break; case 0: c = "";
                                break; default: c = this.tail.substring(0, a), this.tail = this.tail.substring(a)
                        } this.pos += c.length; return c
                    }; t.prototype.push = function (a) { return new t(a, this) }; t.prototype.lookup = function (a) { var c = this.cache, b; if (c.hasOwnProperty(a)) b = c[a]; else { for (var d = this, e, g, h = !1; d;) { if (0 < a.indexOf(".")) for (b = d.view, e = a.split("."), g = 0; null != b && g < e.length;) g === e.length - 1 && (h = A(b, e[g])), b = b[e[g++]]; else b = d.view[a], h = A(d.view, a); if (h) break; d = d.parent } c[a] = b } p(b) && (b = b.call(this.view)); return b }; m.prototype.clearCache =
                    function () { this.cache = {} }; m.prototype.parse = function (a, c) { var b = this.cache, d = b[a]; null == d && (d = b[a] = C(a, c)); return d }; m.prototype.render = function (a, c, b) { var d = this.parse(a); c = c instanceof t ? c : new t(c); return this.renderTokens(d, c, b, a) }; m.prototype.renderTokens = function (a, c, b, d) {
                        for (var e = "", g, h, f, k = 0, m = a.length; k < m; ++k) f = void 0, g = a[k], h = g[0], "#" === h ? f = this.renderSection(g, c, b, d) : "^" === h ? f = this.renderInverted(g, c, b, d) : ">" === h ? f = this.renderPartial(g, c, b, d) : "&" === h ? f = this.unescapedValue(g, c) : "name" ===
                        h ? f = this.escapedValue(g, c) : "text" === h && (f = this.rawValue(g)), void 0 !== f && (e += f); return e
                    }; m.prototype.renderSection = function (a, c, b, d) {
                        function e(a) { return g.render(a, c, b) } var g = this, h = "", f = c.lookup(a[1]); if (f) {
                            if (x(f)) for (var k = 0, m = f.length; k < m; ++k) h += this.renderTokens(a[4], c.push(f[k]), b, d); else if ("object" === typeof f || "string" === typeof f || "number" === typeof f) h += this.renderTokens(a[4], c.push(f), b, d); else if (p(f)) {
                                if ("string" !== typeof d) throw Error("Cannot use higher-order sections without the original template");
                                f = f.call(c.view, d.slice(a[3], a[5]), e); null != f && (h += f)
                            } else h += this.renderTokens(a[4], c, b, d); return h
                        }
                    }; m.prototype.renderInverted = function (a, c, b, d) { var e = c.lookup(a[1]); if (!e || x(e) && 0 === e.length) return this.renderTokens(a[4], c, b, d) }; m.prototype.renderPartial = function (a, c, b) { if (b && (a = p(b) ? b(a[1]) : b[a[1]], null != a)) return this.renderTokens(this.parse(a), c, b, a) }; m.prototype.unescapedValue = function (a, c) { var b = c.lookup(a[1]); if (null != b) return b }; m.prototype.escapedValue = function (a, c) {
                        var b = c.lookup(a[1]);
                        if (null != b) return k.escape(b)
                    }; m.prototype.rawValue = function (a) { return a[1] }; k.name = "mustache.js"; k.version = "2.1.2"; k.tags = ["{{", "}}"]; var z = new m; k.clearCache = function () { return z.clearCache() }; k.parse = function (a, c) { return z.parse(a, c) }; k.render = function (a, c, b) { if ("string" !== typeof a) throw c = TypeError, a = x(a) ? "array" : typeof a, new c('Invalid template! Template should be a "string" but "' + a + '" was given as the first argument for mustache#render(template, view, partials)'); return z.render(a, c, b) }; k.to_html =
                    function (a, c, b, d) { a = k.render(a, c, b); if (p(d)) d(a); else return a }; k.escape = function (a) { return String(a).replace(/[&<>"'\/]/g, function (a) { return M[a] }) }; k.Scanner = w; k.Context = t; k.Writer = m
                });
                //#endregion
            };
            var _enumerable = function () {
                //#region enumerable
                win.Enumerable = function () {
                    var e = function (a) { this.GetEnumerator = a }; e.Choice = function () { var a = arguments[0] instanceof Array ? arguments[0] : arguments; return new e(function () { return new h(k.Blank, function () { return this.Yield(a[Math.floor(Math.random() * a.length)]) }, k.Blank) }) }; e.Cycle = function () { var a = arguments[0] instanceof Array ? arguments[0] : arguments; return new e(function () { var b = 0; return new h(k.Blank, function () { b >= a.length && (b = 0); return this.Yield(a[b++]) }, k.Blank) }) }; e.Empty = function () {
                        return new e(function () {
                            return new h(k.Blank,
                function () { return !1 }, k.Blank)
                        })
                    }; e.From = function (a) {
                        if (null == a) return e.Empty(); if (a instanceof e) return a; if (typeof a == q.Number || typeof a == q.Boolean) return e.Repeat(a, 1); if (typeof a == q.String) return new e(function () { var b = 0; return new h(k.Blank, function () { return b < a.length ? this.Yield(a.charAt(b++)) : !1 }, k.Blank) }); if (typeof a != q.Function) {
                            if (typeof a.length == q.Number) return new l(a); if (!(a instanceof Object) && f.IsIEnumerable(a)) return new e(function () {
                                var b = !0, c; return new h(function () { c = new Enumerator(a) },
                                function () { b ? b = !1 : c.moveNext(); return c.atEnd() ? !1 : this.Yield(c.item()) }, k.Blank)
                            })
                        } return new e(function () { var b = [], c = 0; return new h(function () { for (var c in a) a[c] instanceof Function || b.push({ Key: c, Value: a[c] }) }, function () { return c < b.length ? this.Yield(b[c++]) : !1 }, k.Blank) })
                    }; e.Return = function (a) { return e.Repeat(a, 1) }; e.Matches = function (a, b, c) {
                        null == c && (c = ""); b instanceof RegExp && (c += b.ignoreCase ? "i" : "", c += b.multiline ? "m" : "", b = b.source); -1 === c.indexOf("g") && (c += "g"); return new e(function () {
                            var d;
                            return new h(function () { d = new RegExp(b, c) }, function () { var b = d.exec(a); return b ? this.Yield(b) : !1 }, k.Blank)
                        })
                    }; e.Range = function (a, b, c) { null == c && (c = 1); return e.ToInfinity(a, c).Take(b) }; e.RangeDown = function (a, b, c) { null == c && (c = 1); return e.ToNegativeInfinity(a, c).Take(b) }; e.RangeTo = function (a, b, c) { null == c && (c = 1); return a < b ? e.ToInfinity(a, c).TakeWhile(function (a) { return a <= b }) : e.ToNegativeInfinity(a, c).TakeWhile(function (a) { return a >= b }) }; e.Repeat = function (a, b) {
                        return null != b ? e.Repeat(a).Take(b) : new e(function () {
                            return new h(k.Blank,
                            function () { return this.Yield(a) }, k.Blank)
                        })
                    }; e.RepeatWithFinalize = function (a, b) { a = f.CreateLambda(a); b = f.CreateLambda(b); return new e(function () { var c; return new h(function () { c = a() }, function () { return this.Yield(c) }, function () { null != c && (b(c), c = null) }) }) }; e.Generate = function (a, b) { if (null != b) return e.Generate(a).Take(b); a = f.CreateLambda(a); return new e(function () { return new h(k.Blank, function () { return this.Yield(a()) }, k.Blank) }) }; e.ToInfinity = function (a, b) {
                        null == a && (a = 0); null == b && (b = 1); return new e(function () {
                            var c;
                            return new h(function () { c = a - b }, function () { return this.Yield(c += b) }, k.Blank)
                        })
                    }; e.ToNegativeInfinity = function (a, b) { null == a && (a = 0); null == b && (b = 1); return new e(function () { var c; return new h(function () { c = a + b }, function () { return this.Yield(c -= b) }, k.Blank) }) }; e.Unfold = function (a, b) { b = f.CreateLambda(b); return new e(function () { var c = !0, d; return new h(k.Blank, function () { if (c) return c = !1, d = a, this.Yield(d); d = b(d); return this.Yield(d) }, k.Blank) }) }; e.prototype = {
                        CascadeBreadthFirst: function (a, b) {
                            var c = this; a = f.CreateLambda(a);
                            b = f.CreateLambda(b); return new e(function () { var d, g = 0, m = []; return new h(function () { d = c.GetEnumerator() }, function () { for (; ;) { if (d.MoveNext()) return m.push(d.Current()), this.Yield(b(d.Current(), g)); var c = e.From(m).SelectMany(function (b) { return a(b) }); if (c.Any()) g++, m = [], f.Dispose(d), d = c.GetEnumerator(); else return !1 } }, function () { f.Dispose(d) }) })
                        }, CascadeDepthFirst: function (a, b) {
                            var c = this; a = f.CreateLambda(a); b = f.CreateLambda(b); return new e(function () {
                                var d = [], g; return new h(function () { g = c.GetEnumerator() },
                                function () { for (; ;) { if (g.MoveNext()) { var c = b(g.Current(), d.length); d.push(g); g = e.From(a(g.Current())).GetEnumerator(); return this.Yield(c) } if (0 >= d.length) return !1; f.Dispose(g); g = d.pop() } }, function () { try { f.Dispose(g) } finally { e.From(d).ForEach(function (a) { a.Dispose() }) } })
                            })
                        }, Flatten: function () {
                            var a = this; return new e(function () {
                                var b, c = null; return new h(function () { b = a.GetEnumerator() }, function () {
                                    for (; ;) {
                                        if (null != c) { if (c.MoveNext()) return this.Yield(c.Current()); c = null } if (b.MoveNext()) if (b.Current() instanceof
                                        Array) { f.Dispose(c); c = e.From(b.Current()).SelectMany(k.Identity).Flatten().GetEnumerator(); continue } else return this.Yield(b.Current()); return !1
                                    }
                                }, function () { try { f.Dispose(b) } finally { f.Dispose(c) } })
                            })
                        }, Pairwise: function (a) { var b = this; a = f.CreateLambda(a); return new e(function () { var c; return new h(function () { c = b.GetEnumerator(); c.MoveNext() }, function () { var b = c.Current(); return c.MoveNext() ? this.Yield(a(b, c.Current())) : !1 }, function () { f.Dispose(c) }) }) }, Scan: function (a, b, c) {
                            if (null != c) return this.Scan(a,
                            b).Select(c); var d; null == b ? (b = f.CreateLambda(a), d = !1) : (b = f.CreateLambda(b), d = !0); var g = this; return new e(function () { var c, e, p = !0; return new h(function () { c = g.GetEnumerator() }, function () { if (p) { p = !1; if (d) return this.Yield(e = a); if (c.MoveNext()) return this.Yield(e = c.Current()) } return c.MoveNext() ? this.Yield(e = b(e, c.Current())) : !1 }, function () { f.Dispose(c) }) })
                        }, Select: function (a) {
                            var b = this; a = f.CreateLambda(a); return new e(function () {
                                var c, d = 0; return new h(function () { c = b.GetEnumerator() }, function () {
                                    return c.MoveNext() ?
                                    this.Yield(a(c.Current(), d++)) : !1
                                }, function () { f.Dispose(c) })
                            })
                        }, SelectMany: function (a, b) { var c = this; a = f.CreateLambda(a); null == b && (b = function (a, b) { return b }); b = f.CreateLambda(b); return new e(function () { var d, g = void 0, m = 0; return new h(function () { d = c.GetEnumerator() }, function () { if (void 0 === g && !d.MoveNext()) return !1; do { if (null == g) { var c = a(d.Current(), m++); g = e.From(c).GetEnumerator() } if (g.MoveNext()) return this.Yield(b(d.Current(), g.Current())); f.Dispose(g); g = null } while (d.MoveNext()); return !1 }, function () { try { f.Dispose(d) } finally { f.Dispose(g) } }) }) },
                        Where: function (a) { a = f.CreateLambda(a); var b = this; return new e(function () { var c, d = 0; return new h(function () { c = b.GetEnumerator() }, function () { for (; c.MoveNext() ;) if (a(c.Current(), d++)) return this.Yield(c.Current()); return !1 }, function () { f.Dispose(c) }) }) }, OfType: function (a) {
                            var b; switch (a) { case Number: b = q.Number; break; case String: b = q.String; break; case Boolean: b = q.Boolean; break; case Function: b = q.Function; break; default: b = null } return null === b ? this.Where(function (b) { return b instanceof a }) : this.Where(function (a) {
                                return typeof a ===
                                b
                            })
                        }, Zip: function (a, b) { b = f.CreateLambda(b); var c = this; return new e(function () { var d, g, m = 0; return new h(function () { d = c.GetEnumerator(); g = e.From(a).GetEnumerator() }, function () { return d.MoveNext() && g.MoveNext() ? this.Yield(b(d.Current(), g.Current(), m++)) : !1 }, function () { try { f.Dispose(d) } finally { f.Dispose(g) } }) }) }, Join: function (a, b, c, d, g) {
                            b = f.CreateLambda(b); c = f.CreateLambda(c); d = f.CreateLambda(d); g = f.CreateLambda(g); var m = this; return new e(function () {
                                var n, p, v = null, l = 0; return new h(function () {
                                    n = m.GetEnumerator();
                                    p = e.From(a).ToLookup(c, k.Identity, g)
                                }, function () { for (; ;) { if (null != v) { var a = v[l++]; if (void 0 !== a) return this.Yield(d(n.Current(), a)); l = 0 } if (n.MoveNext()) a = b(n.Current()), v = p.Get(a).ToArray(); else return !1 } }, function () { f.Dispose(n) })
                            })
                        }, GroupJoin: function (a, b, c, d, g) {
                            b = f.CreateLambda(b); c = f.CreateLambda(c); d = f.CreateLambda(d); g = f.CreateLambda(g); var m = this; return new e(function () {
                                var n = m.GetEnumerator(), p = null; return new h(function () { n = m.GetEnumerator(); p = e.From(a).ToLookup(c, k.Identity, g) }, function () {
                                    if (n.MoveNext()) {
                                        var a =
                                        p.Get(b(n.Current())); return this.Yield(d(n.Current(), a))
                                    } return !1
                                }, function () { f.Dispose(n) })
                            })
                        }, All: function (a) { a = f.CreateLambda(a); var b = !0; this.ForEach(function (c) { if (!a(c)) return b = !1 }); return b }, Any: function (a) { a = f.CreateLambda(a); var b = this.GetEnumerator(); try { if (0 == arguments.length) return b.MoveNext(); for (; b.MoveNext() ;) if (a(b.Current())) return !0; return !1 } finally { f.Dispose(b) } }, Concat: function (a) {
                            var b = this; return new e(function () {
                                var c, d; return new h(function () { c = b.GetEnumerator() }, function () {
                                    if (null ==
                                    d) { if (c.MoveNext()) return this.Yield(c.Current()); d = e.From(a).GetEnumerator() } return d.MoveNext() ? this.Yield(d.Current()) : !1
                                }, function () { try { f.Dispose(c) } finally { f.Dispose(d) } })
                            })
                        }, Insert: function (a, b) { var c = this; return new e(function () { var d, g, m = 0, n = !1; return new h(function () { d = c.GetEnumerator(); g = e.From(b).GetEnumerator() }, function () { return m == a && g.MoveNext() ? (n = !0, this.Yield(g.Current())) : d.MoveNext() ? (m++, this.Yield(d.Current())) : !n && g.MoveNext() ? this.Yield(g.Current()) : !1 }, function () { try { f.Dispose(d) } finally { f.Dispose(g) } }) }) },
                        Alternate: function (a) { a = e.Return(a); return this.SelectMany(function (b) { return e.Return(b).Concat(a) }).TakeExceptLast() }, Contains: function (a, b) { b = f.CreateLambda(b); var c = this.GetEnumerator(); try { for (; c.MoveNext() ;) if (b(c.Current()) === a) return !0; return !1 } finally { f.Dispose(c) } }, DefaultIfEmpty: function (a) { var b = this; return new e(function () { var c, d = !0; return new h(function () { c = b.GetEnumerator() }, function () { return c.MoveNext() ? (d = !1, this.Yield(c.Current())) : d ? (d = !1, this.Yield(a)) : !1 }, function () { f.Dispose(c) }) }) },
                        Distinct: function (a) { return this.Except(e.Empty(), a) }, Except: function (a, b) { b = f.CreateLambda(b); var c = this; return new e(function () { var d, g; return new h(function () { d = c.GetEnumerator(); g = new t(b); e.From(a).ForEach(function (a) { g.Add(a) }) }, function () { for (; d.MoveNext() ;) { var a = d.Current(); if (!g.Contains(a)) return g.Add(a), this.Yield(a) } return !1 }, function () { f.Dispose(d) }) }) }, Intersect: function (a, b) {
                            b = f.CreateLambda(b); var c = this; return new e(function () {
                                var d, g, m; return new h(function () {
                                    d = c.GetEnumerator();
                                    g = new t(b); e.From(a).ForEach(function (a) { g.Add(a) }); m = new t(b)
                                }, function () { for (; d.MoveNext() ;) { var a = d.Current(); if (!m.Contains(a) && g.Contains(a)) return m.Add(a), this.Yield(a) } return !1 }, function () { f.Dispose(d) })
                            })
                        }, SequenceEqual: function (a, b) { b = f.CreateLambda(b); var c = this.GetEnumerator(); try { var d = e.From(a).GetEnumerator(); try { for (; c.MoveNext() ;) if (!d.MoveNext() || b(c.Current()) !== b(d.Current())) return !1; return d.MoveNext() ? !1 : !0 } finally { f.Dispose(d) } } finally { f.Dispose(c) } }, Union: function (a, b) {
                            b =
                            f.CreateLambda(b); var c = this; return new e(function () { var d, g, m; return new h(function () { d = c.GetEnumerator(); m = new t(b) }, function () { var b; if (void 0 === g) { for (; d.MoveNext() ;) if (b = d.Current(), !m.Contains(b)) return m.Add(b), this.Yield(b); g = e.From(a).GetEnumerator() } for (; g.MoveNext() ;) if (b = g.Current(), !m.Contains(b)) return m.Add(b), this.Yield(b); return !1 }, function () { try { f.Dispose(d) } finally { f.Dispose(g) } }) })
                        }, OrderBy: function (a) { return new r(this, a, !1) }, OrderByDescending: function (a) {
                            return new r(this, a,
                            !0)
                        }, Reverse: function () { var a = this; return new e(function () { var b, c; return new h(function () { b = a.ToArray(); c = b.length }, function () { return 0 < c ? this.Yield(b[--c]) : !1 }, k.Blank) }) }, Shuffle: function () { var a = this; return new e(function () { var b; return new h(function () { b = a.ToArray() }, function () { if (0 < b.length) { var a = Math.floor(Math.random() * b.length); return this.Yield(b.splice(a, 1)[0]) } return !1 }, k.Blank) }) }, GroupBy: function (a, b, c, d) {
                            var g = this; a = f.CreateLambda(a); b = f.CreateLambda(b); null != c && (c = f.CreateLambda(c));
                            d = f.CreateLambda(d); return new e(function () { var e; return new h(function () { e = g.ToLookup(a, b, d).ToEnumerable().GetEnumerator() }, function () { for (; e.MoveNext() ;) return null == c ? this.Yield(e.Current()) : this.Yield(c(e.Current().Key(), e.Current())); return !1 }, function () { f.Dispose(e) }) })
                        }, PartitionBy: function (a, b, c, d) {
                            var g = this; a = f.CreateLambda(a); b = f.CreateLambda(b); d = f.CreateLambda(d); var m; null == c ? (m = !1, c = function (a, b) { return new w(a, b) }) : (m = !0, c = f.CreateLambda(c)); return new e(function () {
                                var n, p, k, l = [];
                                return new h(function () { n = g.GetEnumerator(); n.MoveNext() && (p = a(n.Current()), k = d(p), l.push(b(n.Current()))) }, function () { for (var g; 1 == (g = n.MoveNext()) ;) if (k === d(a(n.Current()))) l.push(b(n.Current())); else break; if (0 < l.length) { var f = m ? c(p, e.From(l)) : c(p, l); g ? (p = a(n.Current()), k = d(p), l = [b(n.Current())]) : l = []; return this.Yield(f) } return !1 }, function () { f.Dispose(n) })
                            })
                        }, BufferWithCount: function (a) {
                            var b = this; return new e(function () {
                                var c; return new h(function () { c = b.GetEnumerator() }, function () {
                                    for (var b =
                                    [], g = 0; c.MoveNext() ;) if (b.push(c.Current()), ++g >= a) return this.Yield(b); return 0 < b.length ? this.Yield(b) : !1
                                }, function () { f.Dispose(c) })
                            })
                        }, Aggregate: function (a, b, c) { return this.Scan(a, b, c).Last() }, Average: function (a) { a = f.CreateLambda(a); var b = 0, c = 0; this.ForEach(function (d) { b += a(d); ++c }); return b / c }, Count: function (a) { a = null == a ? k.True : f.CreateLambda(a); var b = 0; this.ForEach(function (c, d) { a(c, d) && ++b }); return b }, Max: function (a) {
                            null == a && (a = k.Identity); return this.Select(a).Aggregate(function (a, c) {
                                return a >
                                c ? a : c
                            })
                        }, Min: function (a) { null == a && (a = k.Identity); return this.Select(a).Aggregate(function (a, c) { return a < c ? a : c }) }, MaxBy: function (a) { a = f.CreateLambda(a); return this.Aggregate(function (b, c) { return a(b) > a(c) ? b : c }) }, MinBy: function (a) { a = f.CreateLambda(a); return this.Aggregate(function (b, c) { return a(b) < a(c) ? b : c }) }, Sum: function (a) { null == a && (a = k.Identity); return this.Select(a).Aggregate(0, function (a, c) { return a + c }) }, ElementAt: function (a) {
                            var b, c = !1; this.ForEach(function (d, g) { if (g == a) return b = d, c = !0, !1 }); if (!c) throw Error("index is less than 0 or greater than or equal to the number of elements in source.");
                            return b
                        }, ElementAtOrDefault: function (a, b) { var c, d = !1; this.ForEach(function (b, e) { if (e == a) return c = b, d = !0, !1 }); return d ? c : b }, First: function (a) { if (null != a) return this.Where(a).First(); var b, c = !1; this.ForEach(function (a) { b = a; c = !0; return !1 }); if (!c) throw Error("First:No element satisfies the condition."); return b }, FirstOrDefault: function (a, b) { if (null != b) return this.Where(b).FirstOrDefault(a); var c, d = !1; this.ForEach(function (a) { c = a; d = !0; return !1 }); return d ? c : a }, Last: function (a) {
                            if (null != a) return this.Where(a).Last();
                            var b, c = !1; this.ForEach(function (a) { c = !0; b = a }); if (!c) throw Error("Last:No element satisfies the condition."); return b
                        }, LastOrDefault: function (a, b) { if (null != b) return this.Where(b).LastOrDefault(a); var c, d = !1; this.ForEach(function (a) { d = !0; c = a }); return d ? c : a }, Single: function (a) { if (null != a) return this.Where(a).Single(); var b, c = !1; this.ForEach(function (a) { if (c) throw Error("Single:sequence contains more than one element."); c = !0; b = a }); if (!c) throw Error("Single:No element satisfies the condition."); return b },
                        SingleOrDefault: function (a, b) { if (null != b) return this.Where(b).SingleOrDefault(a); var c, d = !1; this.ForEach(function (a) { if (d) throw Error("Single:sequence contains more than one element."); d = !0; c = a }); return d ? c : a }, Skip: function (a) { var b = this; return new e(function () { var c, d = 0; return new h(function () { for (c = b.GetEnumerator() ; d++ < a && c.MoveNext() ;); }, function () { return c.MoveNext() ? this.Yield(c.Current()) : !1 }, function () { f.Dispose(c) }) }) }, SkipWhile: function (a) {
                            a = f.CreateLambda(a); var b = this; return new e(function () {
                                var c,
                                d = 0, g = !1; return new h(function () { c = b.GetEnumerator() }, function () { for (; !g;) if (c.MoveNext()) { if (!a(c.Current(), d++)) return g = !0, this.Yield(c.Current()) } else return !1; return c.MoveNext() ? this.Yield(c.Current()) : !1 }, function () { f.Dispose(c) })
                            })
                        }, Take: function (a) { var b = this; return new e(function () { var c, d = 0; return new h(function () { c = b.GetEnumerator() }, function () { return d++ < a && c.MoveNext() ? this.Yield(c.Current()) : !1 }, function () { f.Dispose(c) }) }) }, TakeWhile: function (a) {
                            a = f.CreateLambda(a); var b = this; return new e(function () {
                                var c,
                                d = 0; return new h(function () { c = b.GetEnumerator() }, function () { return c.MoveNext() && a(c.Current(), d++) ? this.Yield(c.Current()) : !1 }, function () { f.Dispose(c) })
                            })
                        }, TakeExceptLast: function (a) { null == a && (a = 1); var b = this; return new e(function () { if (0 >= a) return b.GetEnumerator(); var c, d = []; return new h(function () { c = b.GetEnumerator() }, function () { for (; c.MoveNext() ;) { if (d.length == a) return d.push(c.Current()), this.Yield(d.shift()); d.push(c.Current()) } return !1 }, function () { f.Dispose(c) }) }) }, TakeFromLast: function (a) {
                            if (0 >=
                            a || null == a) return e.Empty(); var b = this; return new e(function () { var c, d, g = []; return new h(function () { c = b.GetEnumerator() }, function () { for (; c.MoveNext() ;) g.length == a && g.shift(), g.push(c.Current()); null == d && (d = e.From(g).GetEnumerator()); return d.MoveNext() ? this.Yield(d.Current()) : !1 }, function () { f.Dispose(d) }) })
                        }, IndexOf: function (a) { var b = null; this.ForEach(function (c, d) { if (c === a) return b = d, !0 }); return null !== b ? b : -1 }, LastIndexOf: function (a) { var b = -1; this.ForEach(function (c, d) { c === a && (b = d) }); return b }, ToArray: function () {
                            var a =
                            []; this.ForEach(function (b) { a.push(b) }); return a
                        }, ToLookup: function (a, b, c) { a = f.CreateLambda(a); b = f.CreateLambda(b); c = f.CreateLambda(c); var d = new t(c); this.ForEach(function (c) { var e = a(c); c = b(c); var f = d.Get(e); void 0 !== f ? f.push(c) : d.Add(e, [c]) }); return new x(d) }, ToObject: function (a, b) { a = f.CreateLambda(a); b = f.CreateLambda(b); var c = {}; this.ForEach(function (d) { c[a(d)] = b(d) }); return c }, ToDictionary: function (a, b, c) {
                            a = f.CreateLambda(a); b = f.CreateLambda(b); c = f.CreateLambda(c); var d = new t(c); this.ForEach(function (c) {
                                d.Add(a(c),
                                b(c))
                            }); return d
                        }, ToJSON: function (a, b) { return JSON.stringify(this.ToArray(), a, b) }, ToString: function (a, b) { null == a && (a = ""); null == b && (b = k.Identity); return this.Select(b).ToArray().join(a) }, Do: function (a) { var b = this; a = f.CreateLambda(a); return new e(function () { var c, d = 0; return new h(function () { c = b.GetEnumerator() }, function () { return c.MoveNext() ? (a(c.Current(), d++), this.Yield(c.Current())) : !1 }, function () { f.Dispose(c) }) }) }, ForEach: function (a) {
                            a = f.CreateLambda(a); var b = 0, c = this.GetEnumerator(); try {
                                for (; c.MoveNext() &&
                                !1 !== a(c.Current(), b++) ;);
                            } finally { f.Dispose(c) }
                        }, Write: function (a, b) { null == a && (a = ""); b = f.CreateLambda(b); var c = !0; this.ForEach(function (d) { c ? c = !1 : document.write(a); document.write(b(d)) }) }, WriteLine: function (a) { a = f.CreateLambda(a); this.ForEach(function (b) { document.write(a(b)); document.write("<br />") }) }, Force: function () { var a = this.GetEnumerator(); try { for (; a.MoveNext() ;); } finally { f.Dispose(a) } }, Let: function (a) {
                            a = f.CreateLambda(a); var b = this; return new e(function () {
                                var c; return new h(function () { c = e.From(a(b)).GetEnumerator() },
                                function () { return c.MoveNext() ? this.Yield(c.Current()) : !1 }, function () { f.Dispose(c) })
                            })
                        }, Share: function () { var a = this, b; return new e(function () { return new h(function () { null == b && (b = a.GetEnumerator()) }, function () { return b.MoveNext() ? this.Yield(b.Current()) : !1 }, k.Blank) }) }, MemoizeAll: function () { var a = this, b, c; return new e(function () { var d = -1; return new h(function () { null == c && (c = a.GetEnumerator(), b = []) }, function () { d++; return b.length <= d ? c.MoveNext() ? this.Yield(b[d] = c.Current()) : !1 : this.Yield(b[d]) }, k.Blank) }) },
                        Catch: function (a) { a = f.CreateLambda(a); var b = this; return new e(function () { var c; return new h(function () { c = b.GetEnumerator() }, function () { try { return c.MoveNext() ? this.Yield(c.Current()) : !1 } catch (b) { return a(b), !1 } }, function () { f.Dispose(c) }) }) }, Finally: function (a) { a = f.CreateLambda(a); var b = this; return new e(function () { var c; return new h(function () { c = b.GetEnumerator() }, function () { return c.MoveNext() ? this.Yield(c.Current()) : !1 }, function () { try { f.Dispose(c) } finally { a() } }) }) }, Trace: function (a, b) {
                            null == a &&
                            (a = "Trace"); b = f.CreateLambda(b); return this.Do(function (c) { console.log(a, ":", b(c)) })
                        }
                    }; var k = { Identity: function (a) { return a }, True: function () { return !0 }, Blank: function () { } }, q = { Boolean: "boolean", Number: "number", String: "string", Object: "object", Undefined: "undefined", Function: "function" }, f = {
                        CreateLambda: function (a) {
                            if (null == a) return k.Identity; if (typeof a == q.String) {
                                if ("" == a) return k.Identity; if (-1 == a.indexOf("=>")) return new Function("$,$$,$$$,$$$$", "return " + a); a = a.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
                                return new Function(a[1], "return " + a[2])
                            } return a
                        }, IsIEnumerable: function (a) { if (typeof Enumerator != q.Undefined) try { return new Enumerator(a), !0 } catch (b) { } return !1 }, Compare: function (a, b) { return a === b ? 0 : a > b ? 1 : -1 }, Dispose: function (a) { null != a && a.Dispose() }
                    }, h = function (a, b, c) {
                        var d = new y, g = 0; this.Current = d.Current; this.MoveNext = function () { try { switch (g) { case 0: g = 1, a(); case 1: if (b.apply(d)) return !0; this.Dispose(); return !1; case 2: return !1 } } catch (c) { throw this.Dispose(), c; } }; this.Dispose = function () {
                            if (1 == g) try { c() } finally {
                                g =
                                2
                            }
                        }
                    }, y = function () { var a = null; this.Current = function () { return a }; this.Yield = function (b) { a = b; return !0 } }, r = function (a, b, c, d) { this.source = a; this.keySelector = f.CreateLambda(b); this.descending = c; this.parent = d }; r.prototype = new e; r.prototype.CreateOrderedEnumerable = function (a, b) { return new r(this.source, a, b, this) }; r.prototype.ThenBy = function (a) { return this.CreateOrderedEnumerable(a, !1) }; r.prototype.ThenByDescending = function (a) { return this.CreateOrderedEnumerable(a, !0) }; r.prototype.GetEnumerator = function () {
                        var a =
                        this, b, c, d = 0; return new h(function () { b = []; c = []; a.source.ForEach(function (a, d) { b.push(a); c.push(d) }); var d = u.Create(a, null); d.GenerateKeys(b); c.sort(function (a, b) { return d.Compare(a, b) }) }, function () { return d < c.length ? this.Yield(b[c[d++]]) : !1 }, k.Blank)
                    }; var u = function (a, b, c) { this.keySelector = a; this.descending = b; this.child = c; this.keys = null }; u.Create = function (a, b) { var c = new u(a.keySelector, a.descending, b); return null != a.parent ? u.Create(a.parent, c) : c }; u.prototype.GenerateKeys = function (a) {
                        for (var b = a.length,
                        c = this.keySelector, d = Array(b), g = 0; g < b; g++) d[g] = c(a[g]); this.keys = d; null != this.child && this.child.GenerateKeys(a)
                    }; u.prototype.Compare = function (a, b) { var c = f.Compare(this.keys[a], this.keys[b]); if (0 == c) { if (null != this.child) return this.child.Compare(a, b); c = f.Compare(a, b) } return this.descending ? -c : c }; var l = function (a) { this.source = a }; l.prototype = new e; l.prototype.Any = function (a) { return null == a ? 0 < this.source.length : e.prototype.Any.apply(this, arguments) }; l.prototype.Count = function (a) {
                        return null == a ? this.source.length :
                        e.prototype.Count.apply(this, arguments)
                    }; l.prototype.ElementAt = function (a) { return 0 <= a && a < this.source.length ? this.source[a] : e.prototype.ElementAt.apply(this, arguments) }; l.prototype.ElementAtOrDefault = function (a, b) { return 0 <= a && a < this.source.length ? this.source[a] : b }; l.prototype.First = function (a) { return null == a && 0 < this.source.length ? this.source[0] : e.prototype.First.apply(this, arguments) }; l.prototype.FirstOrDefault = function (a, b) {
                        return null != b ? e.prototype.FirstOrDefault.apply(this, arguments) : 0 < this.source.length ?
                        this.source[0] : a
                    }; l.prototype.Last = function (a) { return null == a && 0 < this.source.length ? this.source[this.source.length - 1] : e.prototype.Last.apply(this, arguments) }; l.prototype.LastOrDefault = function (a, b) { return null != b ? e.prototype.LastOrDefault.apply(this, arguments) : 0 < this.source.length ? this.source[this.source.length - 1] : a }; l.prototype.Skip = function (a) { var b = this.source; return new e(function () { var c; return new h(function () { c = 0 > a ? 0 : a }, function () { return c < b.length ? this.Yield(b[c++]) : !1 }, k.Blank) }) }; l.prototype.TakeExceptLast =
                    function (a) { null == a && (a = 1); return this.Take(this.source.length - a) }; l.prototype.TakeFromLast = function (a) { return this.Skip(this.source.length - a) }; l.prototype.Reverse = function () { var a = this.source; return new e(function () { var b; return new h(function () { b = a.length }, function () { return 0 < b ? this.Yield(a[--b]) : !1 }, k.Blank) }) }; l.prototype.SequenceEqual = function (a, b) { return (a instanceof l || a instanceof Array) && null == b && e.From(a).Count() != this.Count() ? !1 : e.prototype.SequenceEqual.apply(this, arguments) }; l.prototype.ToString =
                    function (a, b) { if (null != b || !(this.source instanceof Array)) return e.prototype.ToString.apply(this, arguments); null == a && (a = ""); return this.source.join(a) }; l.prototype.GetEnumerator = function () { var a = this.source, b = 0; return new h(k.Blank, function () { return b < a.length ? this.Yield(a[b++]) : !1 }, k.Blank) }; var t = function () {
                        var a = function (a) { return null === a ? "null" : void 0 === a ? "undefined" : typeof a.toString === q.Function ? a.toString() : Object.prototype.toString.call(a) }, b = function (a, b) {
                            this.Key = a; this.Value = b; this.Next =
                            this.Prev = null
                        }, c = function () { this.Last = this.First = null }; c.prototype = { AddLast: function (a) { null != this.Last ? (this.Last.Next = a, a.Prev = this.Last, this.Last = a) : this.First = this.Last = a }, Replace: function (a, b) { null != a.Prev ? (a.Prev.Next = b, b.Prev = a.Prev) : this.First = b; null != a.Next ? (a.Next.Prev = b, b.Next = a.Next) : this.Last = b }, Remove: function (a) { null != a.Prev ? a.Prev.Next = a.Next : this.First = a.Next; null != a.Next ? a.Next.Prev = a.Prev : this.Last = a.Prev } }; var d = function (a) {
                            this.count = 0; this.entryList = new c; this.buckets = {}; this.compareSelector =
                            null == a ? k.Identity : a
                        }; d.prototype = {
                            Add: function (c, d) { var e = this.compareSelector(c), f = a(e), h = new b(c, d); if (Object.prototype.hasOwnProperty.call(this.buckets, f)) { for (var f = this.buckets[f], k = 0; k < f.length; k++) if (this.compareSelector(f[k].Key) === e) { this.entryList.Replace(f[k], h); f[k] = h; return } f.push(h) } else this.buckets[f] = [h]; this.count++; this.entryList.AddLast(h) }, Get: function (b) {
                                b = this.compareSelector(b); var c = a(b); if (Object.prototype.hasOwnProperty.call(this.buckets, c)) for (var c = this.buckets[c], d =
                                0; d < c.length; d++) { var e = c[d]; if (this.compareSelector(e.Key) === b) return e.Value }
                            }, Set: function (c, d) { var e = this.compareSelector(c), f = a(e); if (Object.prototype.hasOwnProperty.call(this.buckets, f)) for (var f = this.buckets[f], h = 0; h < f.length; h++) if (this.compareSelector(f[h].Key) === e) return e = new b(c, d), this.entryList.Replace(f[h], e), f[h] = e, !0; return !1 }, Contains: function (b) {
                                b = this.compareSelector(b); var c = a(b); if (!Object.prototype.hasOwnProperty.call(this.buckets, c)) return !1; for (var c = this.buckets[c], d = 0; d <
                                c.length; d++) if (this.compareSelector(c[d].Key) === b) return !0; return !1
                            }, Clear: function () { this.count = 0; this.buckets = {}; this.entryList = new c }, Remove: function (b) { b = this.compareSelector(b); var c = a(b); if (Object.prototype.hasOwnProperty.call(this.buckets, c)) for (var d = this.buckets[c], e = 0; e < d.length; e++) if (this.compareSelector(d[e].Key) === b) { this.entryList.Remove(d[e]); d.splice(e, 1); 0 == d.length && delete this.buckets[c]; this.count--; break } }, Count: function () { return this.count }, ToEnumerable: function () {
                                var a = this;
                                return new e(function () { var b; return new h(function () { b = a.entryList.First }, function () { if (null != b) { var a = { Key: b.Key, Value: b.Value }; b = b.Next; return this.Yield(a) } return !1 }, k.Blank) })
                            }
                        }; return d
                    }(), x = function (a) { this.Count = function () { return a.Count() }; this.Get = function (b) { return e.From(a.Get(b)) }; this.Contains = function (b) { return a.Contains(b) }; this.ToEnumerable = function () { return a.ToEnumerable().Select(function (a) { return new w(a.Key, a.Value) }) } }, w = function (a, b) {
                        this.Key = function () { return a }; this.source =
                        b
                    }; w.prototype = new l; return e
                }();
                //#endregion
            };
            var _avgrund = function () {
                extention.Avgrund = (function () {

                    var container = document.documentElement,
                        popup = document.querySelector('.avgrund-popup-animate'),
                        cover = document.querySelector('.avgrund-cover'),
                        currentState = null;

                    container.className = container.className.replace(/\s+$/gi, '') + ' avgrund-ready';

                    // Deactivate on ESC
                    function onDocumentKeyUp(event) {
                        if (event.keyCode === 27) {
                            deactivate();
                        }
                    }

                    // Deactivate on click outside
                    function onDocumentClick(event) {
                        if (event.target === cover) {
                            deactivate();
                        }
                    }

                    function activate(state) {
                        //document.addEventListener('keyup', onDocumentKeyUp, false);
                        //document.addEventListener('click', onDocumentClick, false);
                        //document.addEventListener('touchstart', onDocumentClick, false);

                        removeClass(popup, currentState);
                        addClass(popup, 'no-transition');
                        addClass(popup, state);

                        setTimeout(function () {
                            removeClass(popup, 'no-transition');
                            addClass(container, 'avgrund-active');
                        }, 0);

                        currentState = state;
                    }

                    function deactivate() {
                        //document.removeEventListener('keyup', onDocumentKeyUp, false);
                        //document.removeEventListener('click', onDocumentClick, false);
                        //document.removeEventListener('touchstart', onDocumentClick, false);

                        removeClass(container, 'avgrund-active');
                        removeClass(popup, 'avgrund-popup-animate')
                    }

                    function disableBlur() {
                        addClass(document.documentElement, 'no-blur');
                    }

                    function addClass(element, name) {
                        //if (name == null || name == undefined) return;
                        element.className = element.className.replace(/\s+$/gi, '') + ' ' + name;
                    }

                    function removeClass(element, name) {
                        element.className = element.className.replace(name, '');
                    }

                    function show(selector) {
                        popup = document.querySelector(selector);
                        addClass(popup, 'avgrund-popup-animate');
                        activate();
                        return this;
                    }
                    function hide() {
                        deactivate();
                    }

                    return {
                        activate: activate,
                        deactivate: deactivate,
                        disableBlur: disableBlur,
                        show: show,
                        hide: hide
                    }

                })();
            };
            var _cookie = function () {
                /*!
                 * jQuery Cookie Plugin v1.4.1
                 * https://github.com/carhartl/jquery-cookie
                 *
                 * Copyright 2006, 2014 Klaus Hartl
                 * Released under the MIT license
                 */
                (function (factory) {
                    factory(extention);
                }(function (host) {

                    var pluses = /\+/g;

                    function encode(s) {
                        return config.raw ? s : encodeURIComponent(s);
                    }

                    function decode(s) {
                        return config.raw ? s : decodeURIComponent(s);
                    }

                    function stringifyCookieValue(value) {
                        return encode(config.json ? JSON.stringify(value) : String(value));
                    }

                    function parseCookieValue(s) {
                        if (s.indexOf('"') === 0) {
                            // This is a quoted cookie as according to RFC2068, unescape...
                            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                        }

                        try {
                            // Replace server-side written pluses with spaces.
                            // If we can't decode the cookie, ignore it, it's unusable.
                            // If we can't parse the cookie, ignore it, it's unusable.
                            s = decodeURIComponent(s.replace(pluses, ' '));
                            return config.json ? JSON.parse(s) : s;
                        } catch (e) { }
                    }

                    function read(s, converter) {
                        var value = config.raw ? s : parseCookieValue(s);
                        return $.isFunction(converter) ? converter(value) : value;
                    }

                    var config = host.cookie = function (key, value, options) {

                        // Write

                        if (arguments.length > 1 && !$.isFunction(value)) {
                            options = $.extend({}, config.defaults, options);

                            if (typeof options.expires === 'number') {
                                var days = options.expires, t = options.expires = new Date();
                                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
                            }

                            return (document.cookie = [
                                encode(key), '=', stringifyCookieValue(value),
                                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                                options.path ? '; path=' + options.path : '',
                                options.domain ? '; domain=' + options.domain : '',
                                options.secure ? '; secure' : ''
                            ].join(''));
                        }

                        // Read

                        var result = key ? undefined : {},
                            // To prevent the for loop in the first place assign an empty array
                            // in case there are no cookies at all. Also prevents odd result when
                            // calling $.cookie().
                            cookies = document.cookie ? document.cookie.split('; ') : [],
                            i = 0,
                            l = cookies.length;

                        for (; i < l; i++) {
                            var parts = cookies[i].split('='),
                                name = decode(parts.shift()),
                                cookie = parts.join('=');

                            if (key === name) {
                                // If second argument (value) is a function it's a converter...
                                result = read(cookie, value);
                                break;
                            }

                            // Prevent storing a cookie that we couldn't decode.
                            if (!key && (cookie = read(cookie)) !== undefined) {
                                result[name] = cookie;
                            }
                        }

                        return result;
                    };

                    config.defaults = {};

                    host.removeCookie = function (key, options) {
                        // Must not alter options, thus extending a fresh object...
                        host.cookie(key, '', $.extend({}, options, { expires: -1 }));
                        return !host.cookie(key);
                    };

                }));
            };
            return {
                initMustache: _mustache
                , initEnumerable: _enumerable
                , initAvgrund: _avgrund
                , initCookie: _cookie
            }
        };
        var _message = (function () {
            return {
                ok: function (msg) { $.message(msg, true); }
                , error: function (msg) { $.message(msg, false); }
                , alert: function (msg, icon) { $.alert(msg); }
            }
        })();
        return {
            init: _init
            , window: win
            , fn: extention
            , message: _message
        }
    };

    Banana.G = (function () {
        if (window === window.top || window.location.href.toLowerCase() === window.top.location.href.toLowerCase()) {
            var g = new Banana.Global(window);
            g.init();
            return g;
        } else {
            if (window.top.Banana) {
                return window.top.Banana.G;
            } else {
                return null;
            }
        }
    })();

    /***** Banana.Helper *****/
    Banana.Helper = (function () {
        var _log = function (a, b) {
            if (!Banana.DEBUG) return;
            if (window.console) {
                if (b == null) {
                    window.console.log(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>', a);
                } else {
                    window.console.log(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>');
                    window.console.log(a, b);
                }
            }
        };
        var _dir = function (o) {
            if (!Banana.DEBUG) return;
            if (window && window.console) {
                window.console.log(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>');
                window.console.dir(o);
            }
        };
        var _warn = function (a, b) {
            if (!Banana.DEBUG) return;
            if (window.console) {
                if (b == null)
                    window.console.warn(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>', a);
                else {
                    window.console.warn(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>');
                    window.console.warn(a, b);
                }
            }
        };
        var _error = function (a, b) {
            if (!Banana.DEBUG) return;
            if (window.console) {
                if (b == null)
                    window.console.error(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>', a);
                else {
                    window.console.error(new Date().format("yyyy-MM-dd hh:mm:ss") + '>>>');
                    window.console.error(a, b);
                }
            }
        };
        var _getRandom = function (len) {
            /// <summary>
            /// 获取随机数（默认6位）
            /// </summary>
            /// <param name="len">长度（选填）</param>
            /// <returns type="string"></returns>
            len = len || 6;
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var str = "";
            for (var i = 0; i < len ; i++) {
                var id = Math.ceil(Math.random() * 60);
                str += chars[id];
            }
            return str;
        };
        var _createID = function () {
            /// <summary>
            /// 创建ID
            /// </summary>
            /// <returns type="string"></returns>
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        var _createGUID = function () {
            /// <summary>
            /// 创建GUID
            /// </summary>
            /// <returns type="string"></returns>
            return _createID() + _createID() + _createID() + _createID() + _createID() + _createID() + _createID() + _createID();
        };
        var _getFunction = function (fnName, context) {
            /// <summary>
            /// 获取方法
            /// </summary>
            /// <param name="fnName">方法名</param>
            /// <param name="context">上下文对象（选填）</param>
            /// <returns type="function"></returns>
            if (typeof fnName === 'function') {
                return fnName;
            }

            var _context = window;
            if (context) {
                if (Banana.Helper.isWindow(context) === true) {
                    _context = context;
                }
            }

            var fn = _context[fnName];
            if ($.isFunction(fn)) return fn;
            else return null;
        }
        var _ajax = function (option) {
            /// <summary>
            /// http请求加载远程数据
            /// </summary>
            /// <param name="option">参数配置</param>
            if (!option) {
                return {
                    get: $.get
                    , getJSON: $.getJSON
                    , load: function (target, url, data, callback) {
                        if (!(target instanceof $)) { target = $(target); }
                        if (!url) return;
                        if (data) {
                            if (typeof data === 'function') {
                                target.load(url, data);
                            } else {
                                target.load(url, data, callback);
                            }
                        } else {
                            target.load(url);
                        }
                    }
                    , getScript: $.getScript
                    , post: $.post
                };
            }

            var defaults = {
                url: ''
                , type: 'POST' // GET,POST,PUT,DELETE
                , target: null //源对象，一般在执行时将此对象设置为只读
                , async: true
                , cache: false
                , loading: false
                , crossDomain: false //是否跨域
                , filterError: false //取消神的拦截
                //, contentType: 'application/json; charset=utf-8'
                , dataType: 'json' //text,xml,html,script,json,jsonp
                //, headers: {
                //    'apikey': 'b3761d6f3549c72705142e854edba0c2'
                //}
                //, username: ''
                //, password:''
                , data: null //form data
                , beforeSend: function (XMLHttpRequest) {
                    //XMLHttpRequest.setRequestHeader("apikey", "b3761d6f3549c72705142e854edba0c2");
                    if (this.loading === true) {
                        B.Helper.loading(true);
                    }
                }
                , onOk: null//请求成功时的回调函数
                , onError: null//请求失败时的回调函数
                , onsuccess: null //[推荐]请求成功时的回调函数
                , onerror: null//[推荐]请求失败时的回调函数
                , complete: function (XMLHttpRequest, textStatus) {
                    if (defaults.target != null) {
                        $(defaults.target).removeAttr("disabled");
                    }
                    if (this.loading === true) {
                        B.Helper.loading(false);
                    }
                }
                , success: function (data, textStatus, jqXHR) {
                    //this // 调用本次AJAX请求时传递的options参数
                    //if (Banana.tool.loading) { Banana.tool.loading(false); }
                    var _onsuccess = Banana.Helper.getFunction(this.onsuccess);
                    if (_onsuccess == null) {
                        _onsuccess = Banana.Helper.getFunction(this.onOk);
                    }
                    if (_onsuccess != null) { _onsuccess(data); }
                }
                , error: function (jqXHR, textStatus, errorThrown) {
                    //if (Banana.tool.loading) { Banana.tool.loading(false); }
                    var _onerror = Banana.Helper.getFunction(this.onerror);
                    if (_onerror == null) {
                        _onerror = Banana.Helper.getFunction(this.onError);
                    }
                    if (_onerror != null) { _onerror(jqXHR); }
                }
                , statusCode: {
                    404: function () {
                        alert('404:没有找到页面');
                    }
                    , 500: function () {
                        alert('500:服务器内部错误');
                    }
                }
            };
            var settings = $.extend(defaults, option);

            if (settings.crossDomain === true) {
                delete settings.dataType;//跨域一律采用jsonp
                //跨域请求
                settings = $.extend({
                    dataType: 'JSONP'
                    , jsonp: 'callback'
                    , jsonpCallback: 'ajax_callback'
                }, settings);
            }

            Banana.Helper.log('ajax data', settings.data);
            //X-HTTP-Method-Override  
            if (settings.type.toUpperCase() != "GET" && settings.type.toUpperCase() != "POST") {
                settings.headers = { "X-HTTP-Method-Override": settings.type }
                settings.type = "POST";
            }
            //if (settings.loading) {
            //    if (Banana.tool.loading) { Banana.tool.loading(true); }
            //}
            if (settings.target != null) {
                $(settings.target).attr("disabled", "disabled");
            }
            $.ajax(settings);
        };
        var _addStorage = function (key, value) {
            /// <summary>
            /// 添加storage
            /// </summary>
            /// <param name="key">键</param>
            /// <param name="value">值</param>
            if (!window.localStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return;
            }
            window.localStorage.setItem(key, value);
        };
        var _getStorage = function (key) {
            /// <summary>
            /// 获取storage值
            /// </summary>
            /// <param name="key">键</param>
            /// <returns type="object"></returns>
            if (!window.localStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return null;
            }
            return window.localStorage.getItem(key);
        };
        var _removeStorage = function (key) {
            /// <summary>
            /// 移除storage值
            /// </summary>
            /// <param name="key">键</param>
            if (!window.localStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return;
            }
            window.localStorage.removeItem(key);
        };
        var _getSessionStorage = function (key) {
            /// <summary>
            /// 获取storage值
            /// </summary>
            /// <param name="key">键</param>
            /// <returns type="object"></returns>
            if (!window.sessionStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return null;
            }
            return window.sessionStorage.getItem(key);
        };
        var _addSessionStorage = function (key, value) {
            /// <summary>
            /// 添加storage
            /// </summary>
            /// <param name="key">键</param>
            /// <param name="value">值</param>
            if (!window.sessionStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return;
            }
            window.sessionStorage.setItem(key, value);
        };
        var _removeSessionStorage = function (key) {
            /// <summary>
            /// 移除storage值
            /// </summary>
            /// <param name="key">键</param>
            if (!window.sessionStorage) {
                Banana.Helper.warn('你的浏览器不支持storage');
                return;
            }
            window.sessionStorage.removeItem(key);
        };
        var _setTitle = function (title) {
            /// <summary>
            /// 设置顶层视窗的标题
            /// </summary>
            /// <param name="title">标题</param>
            Banana.G.window.document.title = title;
        };
        var _htmlDecode = function (str) {
            if (!str || str.length == 0) return '';
            return str.replace(/&gt;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(/<br>/g, "\n");
        };
        var _getStrCombination = function (str) {
            /// <summary>
            /// 获取字符串组合
            /// </summary>
            /// <param name="str">字符串</param>
            /// <returns type="object"></returns>
            var length = 0;
            if (!str) return length;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    length += 1;
                }
                else {
                    length += 2;
                }
            }

            var _isChinese = function (c) {
                return c.match(/^([\u4E00-\u9FA5]+，?)+$/) != null;
            };
            var _isEnglish = function (c) {
                return !(/[^A-Za-z]/.test(c));
            };

            var chineseCount = 0, englishCount = 0, symboCount = 0;
            for (var i in str) {
                if (typeof str[i] == 'function') continue;
                if (_isChinese(str[i])) {
                    chineseCount++;
                } else if (_isEnglish(str[i])) {
                    englishCount++;
                } else {
                    symboCount++;
                }
            }

            return {
                byteLength: length
                , length: str.length
                , chineseLength: chineseCount
                , englishLength: englishCount
                , symbolLength: symboCount
            };
        };
        var _getByteLength = function (str, callback) {
            /// <summary>
            /// 获取字节长度
            /// </summary>
            /// <param name="str">字符串</param>
            /// <returns type="int"></returns>
            var length = 0;
            if (!str) return length;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    length += 1;
                }
                else {
                    length += 2;
                }
            }

            var _callback = _getFunction(callback);
            if (_callback != null) {
                _callback(_getStrCombination(str));
            }

            return length;
        };
        var _replaceEnter = function (str, newWrap, oldWrap) {
            /// <summary>
            /// 替换回车换行符
            /// </summary>
            /// <param name="str">要替换的字符串</param>
            /// <param name="newWrap">新字符串</param>
            /// <param name="oldWrap">老字符串</param>
            /// <returns type="string"></returns>
            var _ow = oldWrap || '\r\n', _nw = newWrap || '<br />';
            return str.replace(new RegExp(_ow, "g"), _nw);
        };
        var _getMustache = function (fn) {
            /// <summary>
            /// 获取模板引擎
            /// </summary>
            /// <param name="fn">执行函数（可选）</param>
            /// <returns type="">Mustache</returns>
            if (!Banana.G.window.Mustache) {
                Banana.Helper.warn('mustache not loaded');
                return;
            }
            if (!fn || typeof fn !== 'function') {
                return Banana.G.window.Mustache;
            } else {
                fn.call(window, Banana.G.window.Mustache);
            }
        };
        var _mustacheRender = function (options) {
            /// <summary>
            /// 快速解析模板
            /// </summary>
            /// <param name="options"></param>
            if (!options.container) {
                Banana.Helper.error('container is undefined in option');
                return;
            }
            if (!options.template) {
                Banana.Helper.error('template is undefined in option');
                return;
            }
            if (!options.view) {
                Banana.Helper.error('view is undefined in option');
                return;
            }
            Banana.Helper.getMustache(function (Mustache) {
                var defaults = {
                    container: null
                    , template: ''
                    , view: null
                    , partials: null
                };
                options = $.extend(defaults, options);

                if (options.template instanceof $) {
                    options.template = options.template.html();
                } else {
                    if (options.template.indexOf('{{') < 0) {
                        options.template = $(options.template).html();
                    }
                }

                Mustache.parse(options.template);
                var content = Mustache.render(options.template, options.view, options.partials);
                if (!(options.container instanceof $)) { options.container = $(options.container); }
                options.container.html(content);
            });
        };
        var _getEnumerable = function (fn) {
            /// <summary>
            /// 获取linq集合引擎
            /// </summary>
            /// <param name="fn">执行函数（可选）</param>
            /// <returns type="">Enumerable</returns>
            if (!Banana.G.window.Enumerable) {
                Banana.Helper.warn('enumerable not loaded');
                return;
            }
            if (!fn || typeof fn !== 'function') {
                return Banana.G.window.Enumerable;
            } else {
                fn.call(window, Banana.G.window.Enumerable);
            }
        };
        var _isWindow = function (win) {
            /// <summary>
            /// 判断一个对象是否是window对象
            /// </summary>
            /// <param name="win">需要判断的对象</param>
            /// <returns type="boolean"></returns>
            if (typeof win !== "object") return false;//必须是一个对象 
            var expando = "_temp_object_" + (new Date - 0);
            var js = document.createElement("script");
            var head = document.getElementsByTagName("head")[0];
            head.insertBefore(js, head.firstChild);
            js.text = expando + " = {};"
            head.removeChild(js);
            return window[expando] === win[expando];
        };
        var _validateUrl = function (url) {
            var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
            if (new RegExp(strRegex).test(url)) {
                return true;
            } else {
                return false;
            }
        };
        var _loading = function (hide) {
            if (hide != null && hide == false) {
                $(".busy", $(B.G.window.document)).remove();
            } else {
                $("<div class='busy'><div style='position: absolute;left: 50%;top: 50%;'><img src='/Plugin/busy/indicator_medium.gif' /></div></busy>").appendTo($(B.G.window.document).find('body'));
            }
        };
        var _isNullOrUndefined = function (target) {
            /// <summary>
            /// 指示对象是 null、还是undefined
            /// </summary>
            var t = typeof target;
            if ((target == null && t == 'object') || (target == undefined && t == 'undefined')) {
                return true;
            }
            return false;
        };
        var _signalr = (function () {
            var _init = function (options) {
                var config = {
                    url: ''
                    , qs: null
                    , hub: 'myHub'
                    , logging: false
                    , onsuccess: function (e) { }
                    , onerror: function (e) {
                        //console.error('连接失败:' + e);
                    }
                    , clientHandle: function (e) { }
                    , stateChanged: function (state) {
                        B.Helper.log('状态改变', state);
                    }
                };
                $.extend(config, options);
                $.connection.hub.url = config.url;
                $.connection.hub.qs = config.qs;
                $.connection.hub.logging = config.logging;
                var _hub = $.connection[config.hub];

                if (!_hub || !_hub.client) {
                    B.Helper.error('消息服务器未启动');
                    return;
                }

                $.connection.hub.stateChanged(function (state) {
                    _invokeFunction(config.stateChanged, state);
                });

                for (var name in config.clientEvents) {
                    _hub.client[name] = config.clientEvents[name];
                }

                //console.log('connectionState', $.connection.connectionState);

                config.clientHandle({
                    client: _hub.client
                    , hub: _hub
                    , connection: _hub.connection
                    , hubName: _hub.hubName
                    , connectionState: {
                        connecting: 0,
                        connected: 1,
                        reconnecting: 2,
                        disconnected: 4
                    }
                });

                $.connection.hub.starting(function () {
                    B.Helper.log('请求连接');
                }).start({
                    waitForPageLoad: true
                   , callback: function () {
                       B.Helper.log('连接成功');
                   }
                }).fail(function (error) {
                    config.onerror(error.message);
                    B.Helper.log('连接失败');
                }).done(function (chat) {
                    config.onsuccess({
                        server: _hub.server
                        , connection: _hub.connection
                        , hub: _hub
                        , chat: chat
                        , connectionState: {
                            connecting: 0,
                            connected: 1,
                            reconnecting: 2,
                            disconnected: 4
                        }
                    });
                }).always(function (chat) {
                    B.Helper.log('连接完成 always', chat);
                });
            };
            return {
                init: _init
            }
        })();
        var _invokeFunction = function (fnName) {
            /// <summary>
            /// 调用方法（动态参数）
            /// </summary>
            /// <param name="fnName">方法名或方法体（可选填为object，格式为：{fnName:'',context:{}}）</param>
            /// <returns type="object"></returns>       
            if (fnName == null) return;

            var fn = null;
            switch (typeof fnName) {
                case 'string':
                    fn = _getFunction(fnName, null);
                    break;
                case 'object':
                    if (fnName.fnName && fnName.context) {
                        fn = _getFunction(fnName.fnName, fnName.context);
                    }
                    break;
                default:
                    fn = _getFunction(fnName, null);
                    break;
            }
            if (fn != null) {
                var args = arguments;
                if (args.length > 1) {
                    [].shift.call(args);
                    args = arguments;
                }
                return fn.apply(window, (function () {
                    var params = [];
                    for (var i in args) {
                        params.push(args[i]);
                    }
                    return params;
                }()));
            }
        };
        var _addCookie = function (key, value, options) {
            /// <summary>
            /// 添加cookie
            /// </summary>
            /// <param name="key" type="type"></param>
            /// <param name="value" type="type"></param>
            return B.Helper.invokeFunction(B.G.fn.cookie, key, value, options);
        };
        var _getCookie = function (key) {
            /// <summary>
            /// 获取cookie
            /// </summary>
            /// <param name="key" type="type"></param>
            if (arguments.length > 1) {
                return B.Helper.invokeFunction(B.G.fn.cookie, key, arguments[1]);
            }
            return B.Helper.invokeFunction(B.G.fn.cookie, key);
        };
        var _removeCookie = function (key) {
            /// <summary>
            /// 移除cookie
            /// </summary>
            /// <param name="key" type="type"></param>
            return B.Helper.invokeFunction(B.G.fn.removeCookie, key);
        };
        return {
            log: _log
            , dir: _dir
            , warn: _warn
            , error: _error
            , getRandom: _getRandom
            , createID: _createID
            , createGUID: _createGUID
            , getFunction: _getFunction
            , ajax: _ajax
            , addStorage: _addStorage
            , getStorage: _getStorage
            , removeStorage: _removeStorage
            , addSessionStorage: _addSessionStorage
            , getSessionStorage: _getSessionStorage
            , removeSessionStorage: _removeSessionStorage
            , setTitle: _setTitle
            , htmlDecode: _htmlDecode
            , getByteLength: _getByteLength
            , getStrCombination: _getStrCombination
            , replaceEnter: _replaceEnter
            , getMustache: _getMustache
            , mustacheRender: _mustacheRender
            , getEnumerable: _getEnumerable
            , isWindow: _isWindow
            , validateUrl: _validateUrl
            , loading: _loading
            , isNullOrUndefined: _isNullOrUndefined
            , signalr: _signalr
            , invokeFunction: _invokeFunction
            , addCookie: _addCookie
            , getCookie: _getCookie
            , removeCookie: _removeCookie
        };
    })();

    /***** Banana.Space *****/
    Banana.Space = function (win) {
        var root = this;
        var win = win || window;
        var inited = false;
        //系统空间ID
        win.spaceId = Banana.Helper.createGUID();
        var _init = function () {
            if (inited) return;
            _extention();
            Banana.Helper.log('init space');
            (function () {
                //#region 系统版本的判断
                var serverVer = Banana.Helper.getStorage(Banana.Constant.KEY_SYSVER);
                if (serverVer != null) {
                    if (win.__banana) {
                        var currentVer = win.__banana.sysver;
                        if (serverVer != currentVer) {
                            Banana.Helper.removeStorage(Banana.Constant.KEY_SYSVER);
                        }
                    }
                }
                //#endregion

                //事件订阅
                var o = $(win);
                Banana.subscribe = function () {
                    o.on.apply(o, arguments);
                };
                Banana.unsubscribe = function () {
                    o.off.apply(o, arguments);
                };
                Banana.publish = function () {
                    o.trigger.apply(o, arguments);
                };

            })();
            $(win.document.body).on('click', '*[' + Banana.Constant.COMMAND_KEY + ']', function (e) {
                var cmdtrigger = Banana.Helper.getFunction(Banana.Constant.FUNCTION_COMMAND_TRIGGER);
                if (cmdtrigger != null) {
                    var $target = $(this);
                    var _args = $target.attr(Banana.Constant.COMMAND_ARGS);
                    if (_args != null && _args != '') {
                        try {
                            if (_args.substr(0, 1) === '{') {
                                _args = $.parseJSON(_args.replace(/'/g, '"'));
                            }
                        } catch (err) { }
                    }
                    cmdtrigger.call(win, { target: $target, cmd: $target.attr(Banana.Constant.COMMAND_KEY), args: _args });
                }
            });
            var handler = function () {
                var startup = Banana.Helper.getFunction(Banana.Constant.FUNCTION_STARTUP, win);
                if (null != startup) {
                    startup.call(win, { window: win });
                    return true;
                }
            };
            if (!handler()) {
                var count = 3, interval, recursive;
                recursive = function () {
                    interval = setInterval(function () {
                        if (count > 0) {
                            count--;
                            if (!handler()) {
                                recursive();
                            } else {
                                clearInterval(interval);
                            }
                        } else {
                            clearInterval(interval);
                        }
                    }, 100);
                };
                recursive();
            }
            inited = !inited;
            Banana.Helper.log('end init space');
            Banana.Helper.log(B.info);
        };
        var _extention = function () {
            /// <summary>
            /// 类型扩展
            /// </summary>

            //#region object

            //Object.prototype.isNullOrUndefined = function () {
            //    /// <summary>
            //    /// 指示对象是 null、还是undefined
            //    /// </summary>
            //    var t = typeof this;
            //    if ((this == null && t == 'object') || (this == undefined && t == 'undefined')) {
            //        return true;
            //    }
            //    return false;
            //};

            //#endregion

            //#region string

            String.prototype.toDate = function () {
                var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
                return date;
            };

            String.prototype.dateFormat = function () {
                var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
                //月份为0-11，所以+1，月份小于10时补个0
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return date.getFullYear() + "-" + month + "-" + currentDate;
            };

            String.prototype.format = function (params) {
                /// <summary>
                /// 将指定字符串中的格式项替换为指定数组中相应对象的字符串表示形式。
                /// </summary>
                /// <param name="params">可使用索引占位符或键值占位符</param>
                var result = this;
                if (arguments.length > 0) {
                    if (arguments.length == 1 && typeof (params) == "object") {
                        for (var key in params) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, params[key] ? params[key] : "");
                        }
                    } else {
                        for (var i = 0; i < arguments.length; i++) {
                            var reg = new RegExp("({[" + i + "]})", "g");
                            result = result.replace(reg, arguments[i] ? arguments[i] : "");
                        }
                    }
                }
                return result;
            };

            String.prototype.encodeXml = function () {
                /// <summary>
                /// 转XML
                /// </summary>
                return $("<div/>").html(this.toString()).text();
            };

            String.prototype.decodeXml = function () {
                /// <summary>
                /// 解析XML
                /// </summary>
                return $("<div/>").text(this.toString()).html();
            };

            String.prototype.getByteLength = function () {
                /// <summary>
                /// 获取字节长度
                /// </summary>
                return Banana.Helper.getByteLength(this);
            };

            String.prototype.ltrim = function () {
                /// <summary>
                /// 去除字符串左侧空白字符
                /// </summary>
                if (!Banana.Helper.isNullOrUndefined(this)) {
                    return this.replace(/(^\s*)/g, "");
                }
                return '';
            };

            String.prototype.rtrim = function () {
                /// <summary>
                /// 去除字符串右侧空白字符
                /// </summary>
                if (!Banana.Helper.isNullOrUndefined(this)) {
                    return this.replace(/(\s*$)/g, "");
                }
                return '';
            };

            String.prototype.isNullOrEmpty = String.prototype.isNullOrWhiteSpace = function () {
                /// <summary>
                /// 指示指定的字符串是 null、空还是仅由空白字符组成。
                /// </summary>
                if (!Banana.Helper.isNullOrUndefined(this)) {
                    if (this.constructor.name.toLowerCase() == 'string' && this.trim().length == 0) {
                        return true;
                    }
                }
                return false;
            };

            //#endregion

            //#region date

            Date.prototype.format = function (formatStr) {
                /// <summary>
                /// <para>函数：格式化日期</para>
                /// <para>d：将日显示为不带前导零的数字，如1</para>
                /// <para>dd：将日显示为带前导零的数字，如01</para>
                /// <para>ddd：将日显示为缩写形式，如Sun</para>
                /// <para>dddd：将日显示为全名，如Sunday</para>
                /// <para>M：将月份显示为不带前导零的数字，如一月显示为1</para>
                /// <para>MM：将月份显示为带前导零的数字，如01</para>
                /// <para>MMM：将月份显示为缩写形式，如Jan</para>
                /// <para>MMMM：将月份显示为完整月份名，如January</para>
                /// <para>yy：以两位数字格式显示年份</para>
                /// <para>yyyy：以四位数字格式显示年份</para>
                /// <para>h：使用12小时制将小时显示为不带前导零的数字，注意 || 的用法</para>
                /// <para>hh：使用12小时制将小时显示为带前导零的数字</para>
                /// <para>H：使用24小时制将小时显示为不带前导零的数字</para>
                /// <para>HH：使用24小时制将小时显示为带前导零的数字</para>
                /// <para>m：将分钟显示为不带前导零的数字</para>
                /// <para>mm：将分钟显示为带前导零的数字</para>
                /// <para>s：将秒显示为不带前导零的数字</para>
                /// <para>ss：将秒显示为带前导零的数字</para>
                /// <para>l：将毫秒显示为不带前导零的数字</para>
                /// <para>ll：将毫秒显示为带前导零的数字</para>
                /// <para>tt：显示am / pm</para>
                /// <para>TT：显示AM / PM</para>
                /// </summary>
                /// <param name="formatStr">格式化字符串</param>
                /// <returns type="string"></returns>
                var date = this;
                var zeroize = function (value, length) {
                    if (!length) {
                        length = 2;
                    }
                    value = new String(value);
                    for (var i = 0, zeros = ''; i < (length - value.length) ; i++) {
                        zeros += '0';
                    }
                    return zeros + value;
                };
                return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
                    switch ($0) {
                        case 'd': return date.getDate();
                        case 'dd': return zeroize(date.getDate());
                        case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                        case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                        case 'M': return date.getMonth() + 1;
                        case 'MM': return zeroize(date.getMonth() + 1);
                        case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                        case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                        case 'yy': return new String(date.getFullYear()).substr(2);
                        case 'yyyy': return date.getFullYear();
                        case 'h': return date.getHours() % 12 || 12;
                        case 'hh': return zeroize(date.getHours() % 12 || 12);
                        case 'H': return date.getHours();
                        case 'HH': return zeroize(date.getHours());
                        case 'm': return date.getMinutes();
                        case 'mm': return zeroize(date.getMinutes());
                        case 's': return date.getSeconds();
                        case 'ss': return zeroize(date.getSeconds());
                        case 'l': return date.getMilliseconds();
                        case 'll': return zeroize(date.getMilliseconds());
                        case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
                        case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
                    }
                });
            }

            //#endregion

            //#region array
            Array.prototype.mustacheExtend = function (funcArrs) {
                for (var i = 0; i < this.length; i++) {
                    var item = this[i];
                    for (var func in funcArrs) {
                        if (funcArrs.hasOwnProperty(func) && typeof funcArrs[func] == "function") {
                            item[func] = funcArrs[func];
                        }
                    }
                }
            }
            //#endregion

            //#region Math

            Math.add = function (p1, p2) {
                /// <summary>
                /// 加法（不固定参数）
                /// </summary>
                /// <returns type="Number"></returns>
                var args = arguments;
                var inner = function (a, b) {
                    var r1, r2, m;
                    try { r1 = a.toString().split(".")[1].length; } catch (e) { r1 = 0; }
                    try { r2 = b.toString().split(".")[1].length; } catch (e) { r2 = 0; }
                    m = Math.pow(10, Math.max(r1, r2));
                    return (a * m + b * m) / m;
                };
                var temp = 0;
                for (var i in args) {
                    temp = inner(temp, args[i]);
                }
                return temp;
            };
            Math.sub = function (p1, p2) {
                /// <summary>
                /// 减法（不固定参数）
                /// </summary>
                /// <returns type="Number"></returns>
                var args = arguments;
                var inner = function (a, b) {
                    var r1, r2, m;
                    try { r1 = a.toString().split(".")[1].length; } catch (e) { r1 = 0; }
                    try { r2 = b.toString().split(".")[1].length; } catch (e) { r2 = 0; }
                    m = Math.pow(10, Math.max(r1, r2));
                    return (a * m + b * m) / m;
                };
                var temp = 0;
                for (var i in args) {
                    if (i == 0) {
                        temp = inner(args[i], temp);
                    } else {
                        temp = inner(temp, (-1 * args[i]));
                    }
                }
                return temp;
            };
            Math.mul = function (p1, p2) {
                /// <summary>
                /// 乘法（不固定参数）
                /// </summary>
                /// <param name="p1" type="type"></param>
                /// <param name="p2" type="type"></param>
                var args = arguments;
                var inner = function (a, b) {
                    var m = 0, s1 = a.toString(), s2 = b.toString();
                    try { m += s1.split(".")[1].length; } catch (e) { }
                    try { m += s2.split(".")[1].length; } catch (e) { }
                    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
                };
                var temp = 0;
                if (args.length > 0) {
                    temp = 1;
                    for (var i in args) {
                        temp = inner(args[i], temp);
                    }
                }
                return temp;
            };
            Math.div = function (p1, p2) {
                /// <summary>
                /// 除法（不固定参数）
                /// </summary>
                /// <param name="p1" type="type"></param>
                /// <param name="p2" type="type"></param>
                var args = arguments;
                var inner = function (a, b) {
                    var t1 = 0, t2 = 0, r1, r2;
                    try { t1 = a.toString().split(".")[1].length; } catch (e) { }
                    try { t2 = b.toString().split(".")[1].length; } catch (e) { }
                    with (Math) {
                        r1 = Number(a.toString().replace(".", ""));
                        r2 = Number(b.toString().replace(".", ""));
                        return (r1 / r2) * pow(10, t2 - t1);
                    }
                };
                var temp = 0, length = args.length;
                if (length > 1) {
                    for (var i in args) {
                        i = parseInt(i);
                        if ((i + 1) == length) break;
                        temp = inner(args[i], args[i + 1]);
                    }
                } else { temp = args[0] || 0; }
                return temp;
            };

            //#endregion

            if (!Banana.name) Banana.name = 'banana.js';
        };
        var _close = function () {
            win.close();
        };
        return {
            init: _init
            , close: _close
        };
    };

    /***** Banana.Controls *****/
    Banana.Controls = (function () {

        var _confirm = function (opt) {
            var option = {
                title: ''
                , content: ''
                , okValue: '确定'
                , cancelValue: '取消'
                , ok: function () { }
                , cancel: function () { }
                , noCancel: false
                , lock: true
                , init: function () { }
                , esc: false
                , wrap: "section"
                , blur: true
                , blurValue: 0.8
            };
            option = $.extend(option, opt);
            var $wrap = $(option.wrap);

            if ($('body .avgrund-cover').length == 0) {
                var clientWidth = $(window).width();
                var avgrundCover = $('<div class="avgrund-cover"></div>').appendTo('body');
                if (option.blur) {
                    if (option.blurValue > 0) {
                        var blur = option.blurValue;
                        $wrap.css({
                            "-webkit-filter": "blur(" + blur + "px)",
                            "-moz-filter": "blur(" + blur + "px)",
                            "-ms-filter": "blur(" + blur + "px)",
                            "-o-filter": "blur(" + blur + "px)",
                            "filter": "blur(" + blur + "px)"
                        });
                    }
                }
            }

            var id = 'banana_avgrund_' + B.Helper.createID();
            var clientHeight = $(window).height();
            var offsetTop = $(window).height() / 2 - 50;
            var html = '';
            html += '<div id="' + id + '" class="scale-bx" style="top:' + offsetTop + 'px">';
            html += '<div>';

            if (option.title != '') {
                html += '<h4>' + option.title + '</h4>';
            }
            if (option.content != '') {
                html += '<p>' + option.content + '</p>';
            }
            html += '</div>';
            html += '<div style="text-align:right;">';
            html += '<input type="button" class="btn btn-primary btn-sm" value="' + option.okValue + '" banana-avgrund-cmd="ok" />';
            if (!option.noCancel) {
                html += '&nbsp;<input type="button" class="btn btn-default btn-sm" value="' + option.cancelValue + '" banana-avgrund-cmd="close" />';
            }
            html += '</div>';
            html += '</div>';
            $('body').append(html);

            var hideAvgrund = function () {
                B.G.fn.Avgrund.hide();
                $('.avgrund-cover,#' + id).remove();
                $('body').css({ 'overflow': 'auto' });
                document.oncontextmenu = null;
                if (option.blur) {
                    $wrap.css({
                        "-webkit-filter": "",
                        "-moz-filter": "",
                        "-ms-filter": "",
                        "-o-filter": "",
                        "filter": ""
                    });
                }
            };

            $('#' + id).find('[banana-avgrund-cmd="ok"]').on('click', function () {
                var result = B.Helper.invokeFunction(option.ok);
                if (result == false) return;
                hideAvgrund();
            });
            $('#' + id).find('[banana-avgrund-cmd="close"]').on('click', function () {
                var result = B.Helper.invokeFunction(option.cancel);
                if (result == false) return;
                hideAvgrund();
            });
            if (!option.lock) {
                $('.avgrund-cover').on('click', function () {
                    hideAvgrund();
                });
            }
            if (option.esc) {
                $(document).on('keyup', function (e) {
                    if (e.keyCode == 27) {
                        hideAvgrund();
                    }
                });
            }
            $('body').css({ 'overflow': 'hidden' });
            document.oncontextmenu = function (e) { e.preventDefault(); };
            B.G.fn.Avgrund.show('#' + id);
        };

        var _alert = function (opt) {
            var o = {
                noCancel: true
            };

            if (typeof opt == 'string') {
                _confirm($.extend(o, { title: opt }));
            } else {
                _confirm($.extend(o, opt));
            }
        };

        var _combobox = function (opt) {
            /// <summary>
            /// combobox
            /// </summary>
            /// <param name="opt" type="object"></param>

            //selections
            var currentSelection = -1;
            var currentProposals = [];

            var option = {
                target: ''
                , height: 30
                , width: 80
                , placeholder: ''//占位符
                , hints: []//待匹配的数据数组
                , ajaxUrl: ''//获取数据的url
                , ajaxMatch: false //是否使用服务端匹配规则
                , ajaxData: function () { return {}; } //获取前置ajax参数
                , showButton: false//是否显示下拉按钮
                , onChange: function (d) { }//选择一个项
                , noKeyQuery: true//空关键字时加载
                , beforeSend: function () { return true; }//发送请求之前
            };
            $.extend(option, opt);
            B.Helper.log(option);


            //是否异步获取json
            var asyncHint = false;
            if ($.trim(option.ajaxUrl) != '') asyncHint = true;

            //获取匹配数据
            var queryHints = function () {
                var ajaxData = B.Helper.invokeFunction(option.ajaxData);

                if (!ajaxData) { input.val(''); return; }

                if (arguments.length > 1) {
                    if (ajaxData == null || typeof ajaxData != 'object') { ajaxData = {}; }
                    ajaxData['keyword'] = arguments[1];
                }

                var callback = arguments[0];
                B.Helper.ajax({
                    url: option.ajaxUrl
                    , data: ajaxData
                    , onsuccess: function (data) {
                        option.hints = data;
                        B.Helper.invokeFunction(callback);
                    }
                    , onerror: function () {
                        proposalList.append($('<li class="banana-proposal" data-value="">数据请求失败</li>'));
                    }
                });
            };

            //原始dom
            var target = $(option.target);

            var setData = function (obj) {
                if (obj.value == '') {
                    B.Helper.log(input, '数据清空');
                } else {
                    B.Helper.log(input, obj);
                }

                target.val(obj.value);
                target.data('text', obj.text);
                input.val(obj.text);
                option.onChange(obj);
            };
            var getData = function () {
                return {
                    text: target.data('text')
                    , value: target.val()
                };
            };

            var id = 'banana_combobox_' + B.Helper.createID();

            //container
            var searchContainer = $('<div id="' + id + '"></div>').addClass('banana-combobox-container');

            //text input		
            var input = $('<input class="form-control input-sm" type="text" autocomplete="off" name="query" placeholder="' + option.placeholder + '" >')
                .addClass('banana-combobox-input').val(target.data('text'));

            //proposals

            var proposals = $('<div></div>').addClass('banana-combobox-proposal');
            var proposalList = $('<ul></ul>').addClass('banana-combobox-proposal-list');
            proposals.append(proposalList);

            //处理页面高度
            var restHeight = $(window).height() - target.offset().top - 120;
            if (restHeight < 400) {
                //console.log('设置高度',restHeight);
                proposals.css({
                    "max-height": restHeight
                });
            }

            input.on('keydown', function (e) {
                if (t) {
                    clearTimeout(t); t = null; return;
                }
                switch (e.which) {
                    case 38: // Up arrow
                        e.preventDefault();
                        $('ul.banana-combobox-proposal-list li').removeClass('selected');
                        if ((currentSelection - 1) >= 0) {
                            currentSelection--;
                            $("ul.banana-combobox-proposal-list li:eq(" + currentSelection + ")")
                                .addClass('selected');
                        } else {
                            currentSelection = -1;
                        }
                        break;
                    case 40: // Down arrow
                        e.preventDefault();
                        if ((currentSelection + 1) < currentProposals.length) {
                            $('ul.banana-combobox-proposal-list li').removeClass('selected');
                            currentSelection++;
                            $("ul.banana-combobox-proposal-list li:eq(" + currentSelection + ")")
                                .addClass('selected');
                        }
                        break;
                    case 13: // Enter
                        if (currentSelection < 0) {
                            return;
                        }

                        var $proposal = $("ul.banana-combobox-proposal-list li:eq(" + currentSelection + ")");

                        currentSelection = -1;
                        proposalList.empty();

                        var data = {
                            'text': $proposal.html()
                            , 'value': $proposal.data('value')
                        };

                        setData(data);
                        break;
                    case 27: // Esc button
                        currentSelection = -1;
                        proposalList.empty();
                        setData({ 'text': '', 'value': '' });
                        break;
                }
            });

            var queryFn = function () {
                currentProposals = [];
                currentSelection = -1;
                proposalList.empty();

                var result = B.Helper.invokeFunction(option.beforeSend);
                if (result === false) {
                    B.Helper.log('beforeSend blocked.'); return;
                }

                proposalList.append($('<li class="banana-proposal"><img src="/img/load.gif" style="width:14px;height:14px;">&nbsp;加载中...</li>'));

                if (option.ajaxMatch == true) {
                    queryHints(function () {
                        proposalList.empty();

                        if (option.hints == null || option.hints.length == 0) {
                            proposalList.append($('<li class="banana-proposal" data-value="">无数据</li>'));
                        }

                        $(option.hints).each(function (a, b) {
                            currentProposals.push(b);

                            var element = $('<li data-value="' + b['value'] + '"></li>')
                                .text(b['text'])
                                .addClass('banana-proposal')
                                .on('click', function () {
                                    var data = {
                                        'text': $(this).html()
                                        , 'value': $(this).data('value')
                                    };
                                    proposalList.empty();
                                    setData(data);
                                })
                                .mouseenter(function () {
                                    $(this).addClass('selected');
                                })
                                .mouseleave(function () {
                                    $(this).removeClass('selected');
                                });

                            if (b['text'] == input.val()) {
                                element.addClass('selected');
                            }

                            proposalList.append(element);
                        });

                        if ($('.banana-proposal.selected').length > 0) {
                            currentSelection = $('.banana-proposal.selected').index('.banana-proposal');
                        }

                    }, input.val());
                }
                else {
                    queryHints(function () {
                        var word = "^" + input.val() + ".*";
                        proposalList.empty();

                        if (option.hints == null || option.hints.length == 0) {
                            proposalList.append($('<li class="banana-proposal" data-value="">无数据</li>'));
                        }

                        $(option.hints).each(function (a, b) {
                            if (b['text'].match(word)) {
                                currentProposals.push(b);
                                var element = $('<li data-value="' + b['value'] + '"></li>')
                                    .html(b['text'])
                                    .addClass('banana-proposal')
                                    .click(function () {
                                        var data = {
                                            'text': $(this).html()
                                            , 'value': $(this).data('value')
                                        };
                                        proposalList.empty();
                                        setData(data);
                                    })
                                    .mouseenter(function () {
                                        $(this).addClass('selected');
                                    })
                                    .mouseleave(function () {
                                        $(this).removeClass('selected');
                                    });
                                proposalList.append(element);
                            }
                        });
                    });
                }
            };

            //focus
            var i, j;
            input.on("paste keyup", function (e) {
                if (t) {
                    clearTimeout(t); t = null; return;
                }
                if (e.which != 13 && e.which != 27 && e.which != 38 && e.which != 40) {
                    if (option.noKeyQuery == true || input.val() != '') {

                        //延迟请求
                        j = setTimeout(function () {
                            if (!j || j == null) return;
                            clearTimeout(j);
                            j = null;

                            queryFn();
                        }, 300);

                    }
                }
            });

            $(document).on('click', function (e) {
                if (!$(e.target).hasClass('banana-combobox-input') && !$(e.target).hasClass('banana-combobox-button') && !$(e.target).is('i')) {
                    //console.log('::not', e.target);

                    //取消上次的请求
                    if (j && j != null) {
                        clearTimeout(j);
                        j = null;
                    }

                    t = setTimeout(function () {
                        if (t) { clearTimeout(t); t = null; }

                        //光标离开时，上次的值不等于本次的值，清空数据
                        if (getData().text != '' && getData().text != input.val()) {
                            setData({ 'text': '', 'value': '' });
                        }

                        currentSelection = -1;
                        proposalList.find('*').slideUp(200, function () {
                            proposalList.empty();
                        });
                    }, 300);

                }
                e.stopPropagation();
            });

            var t;
            input.on('blur', function (e) {
                return;
            });

            if (option.showButton == true) {
                var button = $('<span><i></i></span>').addClass("banana-combobox-button");
                button.on('click', function () {
                    if (t) {
                        clearTimeout(t); t = null;
                    }
                    queryFn();
                    input.focus();
                });
            }

            searchContainer.append(input).append(button);
            searchContainer.append(proposals);

            target.hide();
            target.before(searchContainer);
            return {
                id: id
                , destory: function () {
                    $('#' + id).remove();
                    target.show();
                }
                , clear: function () {
                    setData({
                        'text': '', 'value': ''
                    });
                }
                , setAjaxData: function (obj) {
                    option.ajaxData = function () {
                        return obj;
                    };
                }
                , getData: getData
            };
        };

        return {
            alert: _alert
            , confirm: _confirm
            , combobox: _combobox
        }

    })();

    /***** Banana.Call *****/
    Banana.Call = (function () {
        var events = [];
        var inited = false;
        var win = window;
        var handler = function () {
            if (inited) return;
            for (var i = 0; i < events.length; i++) {
                events[i].call(win, { 'window': win, 'initialization': true });
            }
            inited = true;
            delete events;
        };
        $(function () {
            if (!win.space) {
                win.space = new Banana.Space(win);
                win.space.init();
            }
            Banana.Helper.log('banana call');
            handler();
            Banana.Helper.log('end banana call');
        });
        return function (fn) {
            /// <summary>
            /// Banana启动方法
            /// </summary>
            /// <param name="fn">方法</param>
            if (typeof fn !== 'function') return;
            if (inited) {
                Banana.Helper.log('banana call');
                fn.call(win, { 'window': win, 'initialization': false });
                Banana.Helper.log('end banana call');
            }
            else {
                events.push(fn);
            }
        }
    })();

    //set alias name
    root.B = root.Banana = Banana;

    var noop = function () {
        Banana.Helper.log('noop call');
    };

    //the first call to initialize space
    Banana.Call($ ? ($.noop ? $.noop : noop) : noop);

});

/*!
 * 模板示例
   <script id="myTemplate" type="banana-template">
       <tr>
           <td>{{id}}</td>
           <td>{{name}}</td>
           <td>{{phone}}</td>
           <td>
               <a href="javascript:alert('编辑 {{name}}');">编辑</a>
               <a href="javascript:alert('禁用 {{name}}');">禁用</a>
           </td>
       </tr>
   </script>
 */

/*
var socket = new WebSocket('ws://127.0.0.1:6188');
// 打开Socket 
socket.onopen = function (event) {
    console.log('socket onopen');
    // 发送一个初始化消息
    //socket.send('I am the client and I\'m listening!');

    // 监听消息
    socket.onmessage = function (event) {
        console.log('onmessage', event);
    };

    // 监听Socket的关闭
    socket.onclose = function (event) {
        console.log('onclose', event);
    };

    // 关闭Socket.... 
    //socket.close() 
};
socket.onerror = function (event) {
    console.log('onerror',event);
};
*/

/*

  *0 ：对应常量CONNECTING (numeric value 0)，
   *正在建立连接连接，还没有完成。The connection has not yet been established.
   *1 ：对应常量OPEN (numeric value 1)，
   *连接成功建立，可以进行通信。The WebSocket connection is established and communication is possible.
   *2 ：对应常量CLOSING (numeric value 2)
   *连接正在进行关闭握手，即将关闭。The connection is going through the closing handshake.
   *3 : 对应常量CLOSED (numeric value 3)
   *连接已经关闭或者根本没有建立。The connection has been closed or could not be opened.

*/