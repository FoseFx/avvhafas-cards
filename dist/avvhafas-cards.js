const D = globalThis, z = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = /* @__PURE__ */ Symbol(), G = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (s) => new lt(typeof s == "string" ? s : s + "", void 0, Z), ht = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce(((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1]), s[0]);
  return new lt(e, s, Z);
}, Ct = (s, t) => {
  if (z) s.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const i = document.createElement("style"), r = D.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, K = z ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return At(e);
})(s) : s;
const { is: bt, defineProperty: wt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: St, getOwnPropertySymbols: Ht, getPrototypeOf: xt } = Object, I = globalThis, Q = I.trustedTypes, Mt = Q ? Q.emptyScript : "", Pt = I.reactiveElementPolyfillSupport, x = (s, t) => s, R = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Mt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (s, t) => !bt(s, t), Y = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), I.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && wt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, i = [...St(e), ...Ht(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(K(r));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ct(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : R).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : R;
      this._$Em = r;
      const l = o.fromAttribute(e, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      const r = this.constructor, n = this[t];
      if (i ??= r.getPropertyOptions(t), !((i.hasChanged ?? q)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((i) => i.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[x("elementProperties")] = /* @__PURE__ */ new Map(), b[x("finalized")] = /* @__PURE__ */ new Map(), Pt?.({ ReactiveElement: b }), (I.reactiveElementVersions ??= []).push("2.1.1");
const B = globalThis, V = B.trustedTypes, tt = V ? V.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ct = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + m, Tt = `<${dt}>`, y = document, M = () => y.createComment(""), P = (s) => s === null || typeof s != "object" && typeof s != "function", F = Array.isArray, Nt = (s) => F(s) || typeof s?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, st = />/g, g = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, rt = /"/g, ut = /^(?:script|style|textarea|title)$/i, Ot = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Ot(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), v = y.createTreeWalker(y, 129);
function pt(s, t) {
  if (!F(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Ut = (s, t) => {
  const e = s.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = H;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d, u, c = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === H ? u[1] === "!--" ? o = et : u[1] !== void 0 ? o = st : u[2] !== void 0 ? (ut.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = g) : u[3] !== void 0 && (o = g) : o === g ? u[0] === ">" ? (o = r ?? H, c = -1) : u[1] === void 0 ? c = -2 : (c = o.lastIndex - u[2].length, d = u[1], o = u[3] === void 0 ? g : u[3] === '"' ? rt : it) : o === rt || o === it ? o = g : o === et || o === st ? o = H : (o = g, r = void 0);
    const $ = o === g && s[l + 1].startsWith("/>") ? " " : "";
    n += o === H ? a + Tt : c >= 0 ? (i.push(d), a.slice(0, c) + ct + a.slice(c) + m + $) : a + m + (c === -2 ? l : $);
  }
  return [pt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, u] = Ut(t, e);
    if (this.el = T.createElement(d, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = v.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(ct)) {
          const p = u[o++], $ = r.getAttribute(c).split(m), U = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: U[2], strings: $, ctor: U[1] === "." ? Rt : U[1] === "?" ? Vt : U[1] === "@" ? It : L }), r.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: n }), r.removeAttribute(c));
        if (ut.test(r.tagName)) {
          const c = r.textContent.split(m), p = c.length - 1;
          if (p > 0) {
            r.textContent = V ? V.emptyScript : "";
            for (let $ = 0; $ < p; $++) r.append(c[$], M()), v.nextNode(), a.push({ type: 2, index: ++n });
            r.append(c[p], M());
          }
        }
      } else if (r.nodeType === 8) if (r.data === dt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(s, t, e = s, i) {
  if (t === A) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = E(s, r._$AS(s, t.values), r, i)), t;
}
class Dt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? y).importNode(e, !0);
    v.currentNode = r;
    let n = v.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new O(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Lt(n, this, t)), this._$AV.push(d), a = i[++l];
      }
      o !== a?.index && (n = v.nextNode(), o++);
    }
    return v.currentNode = y, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), P(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(pt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Dt(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t) r === e.length ? e.push(i = new O(this.O(M()), this.O(M()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = E(this, t, e, 0), o = !P(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = E(this, l[i + a], e, a), d === A && (d = this._$AH[a]), o ||= !P(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Vt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class It extends L {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? h) === A) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const jt = B.litHtmlPolyfillSupport;
jt?.(T, O), (B.litHtmlVersions ??= []).push("3.3.1");
const kt = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = r = new O(t.insertBefore(M(), n), n, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
const W = globalThis;
let w = class extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
};
w._$litElement$ = !0, w.finalized = !0, W.litElementHydrateSupport?.({ LitElement: w });
const zt = W.litElementPolyfillSupport;
zt?.({ LitElement: w });
(W.litElementVersions ??= []).push("4.2.1");
const ft = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer((() => {
    customElements.define(s, t);
  })) : customElements.define(s, t);
};
const Zt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: q }, qt = (s = Zt, t, e) => {
  const { kind: i, metadata: r } = e;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, s);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function C(s) {
  return (t, e) => typeof e == "object" ? qt(s, t, e) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(s, t, e);
}
function Bt(s) {
  return C({ ...s, state: !0, attribute: !1 });
}
function Ft(s, t) {
  return s.length === t.length && s.every((e, i) => e === t[i]);
}
const X = (s) => {
  const [t, e] = s.split(":", 3);
  return +t * 60 + +e;
}, ot = (s) => ({
  scheduled: s.departure,
  delay: X(s.delay),
  platform: s.platform,
  stationName: s.origin
}), Wt = (s) => ({
  scheduled: s.arrival,
  delay: X(s.delay_arrival),
  platform: s.platform_arrival,
  stationName: s.destination
});
function $t(s, t) {
  const e = new Date(s), i = new Date(t), r = Math.abs(+e - +i);
  return Math.round(r / 1e3 / 60);
}
function mt(s, t) {
  const e = X(t.delay), i = +new Date(t.departure) - +s;
  return Math.round(i / 1e3 / 60) + e;
}
function Xt(s, t, e) {
  let i = Kt(s);
  return i = Qt(i), i = Jt(i, t), i = Gt(i, e), i;
}
function Jt(s, t) {
  const i = (r) => r.slice(1);
  return _t(
    s,
    s[0],
    3,
    i,
    "origin",
    t
  );
}
function Gt(s, t) {
  const i = (r) => r.slice(0, -1);
  return _t(
    s,
    s[s.length - 1],
    5,
    i,
    "destination",
    t
  );
}
function _t(s, t, e, i, r, n) {
  return s.length === 0 || !t || t.mode !== "walking" ? s : $t(t.departure, t.arrival) > e ? (n && (t[r] = n), s) : i(s);
}
function Kt(s) {
  return s.filter(
    (t) => !(t.mode === "walking" && t.destination === t.origin)
  );
}
function Qt(s) {
  return s.forEach((t, e) => {
    if (t.mode !== "walking") return;
    const i = e > 0 ? s[e - 1] : void 0, r = e + 1 < s.length ? s[e + 1] : void 0;
    i && (t.origin = i.destination, t.platform = i.platform_arrival), r && (t.destination = r.origin, t.platform_arrival = r.platform);
  }), s;
}
const Yt = `<svg width="16" height="19" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.625 16C1.39479 16 1.20182 15.9193 1.04609 15.7579C0.890365 15.5965 0.8125 15.3965 0.8125 15.1579V13.4316C0.56875 13.1509 0.372396 12.8386 0.223437 12.4947C0.0744792 12.1509 0 11.7754 0 11.3684V3.36842C0 2.20351 0.521354 1.35088 1.56406 0.810526C2.60677 0.270175 4.25208 0 6.5 0C8.82917 0 10.4948 0.259649 11.4969 0.778947C12.499 1.29825 13 2.1614 13 3.36842V11.3684C13 11.7754 12.9255 12.1509 12.7766 12.4947C12.6276 12.8386 12.4312 13.1509 12.1875 13.4316V15.1579C12.1875 15.3965 12.1096 15.5965 11.9539 15.7579C11.7982 15.9193 11.6052 16 11.375 16H10.5625C10.3323 16 10.1393 15.9193 9.98359 15.7579C9.82786 15.5965 9.75 15.3965 9.75 15.1579V14.3158H3.25V15.1579C3.25 15.3965 3.17214 15.5965 3.01641 15.7579C2.86068 15.9193 2.66771 16 2.4375 16H1.625ZM6.54062 2.52632H11.0906H1.99062H6.54062ZM9.75 8.42105H1.625H11.375H9.75ZM1.625 6.73684H11.375V4.21053H1.625V6.73684ZM3.65625 11.7895C3.99479 11.7895 4.28255 11.6667 4.51953 11.4211C4.75651 11.1754 4.875 10.8772 4.875 10.5263C4.875 10.1754 4.75651 9.87719 4.51953 9.63158C4.28255 9.38597 3.99479 9.26316 3.65625 9.26316C3.31771 9.26316 3.02995 9.38597 2.79297 9.63158C2.55599 9.87719 2.4375 10.1754 2.4375 10.5263C2.4375 10.8772 2.55599 11.1754 2.79297 11.4211C3.02995 11.6667 3.31771 11.7895 3.65625 11.7895ZM9.34375 11.7895C9.68229 11.7895 9.97005 11.6667 10.207 11.4211C10.444 11.1754 10.5625 10.8772 10.5625 10.5263C10.5625 10.1754 10.444 9.87719 10.207 9.63158C9.97005 9.38597 9.68229 9.26316 9.34375 9.26316C9.00521 9.26316 8.71745 9.38597 8.48047 9.63158C8.24349 9.87719 8.125 10.1754 8.125 10.5263C8.125 10.8772 8.24349 11.1754 8.48047 11.4211C8.71745 11.6667 9.00521 11.7895 9.34375 11.7895ZM1.99062 2.52632H11.0906C10.8875 2.28772 10.4508 2.08772 9.78047 1.92632C9.11016 1.76491 8.03021 1.68421 6.54062 1.68421C5.09167 1.68421 4.03203 1.77193 3.36172 1.94737C2.69141 2.12281 2.23438 2.31579 1.99062 2.52632ZM3.25 12.6316H9.75C10.1969 12.6316 10.5794 12.4667 10.8977 12.1368C11.2159 11.807 11.375 11.4105 11.375 10.9474V8.42105H1.625V10.9474C1.625 11.4105 1.78411 11.807 2.10234 12.1368C2.42057 12.4667 2.80312 12.6316 3.25 12.6316Z" fill="currentColor"/>
</svg>
`, te = `<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 13.5V4C0 3.11667 0.229167 2.4125 0.6875 1.8875C1.14583 1.3625 1.75 0.9625 2.5 0.6875C3.25 0.4125 4.10417 0.229167 5.0625 0.1375C6.02083 0.0458333 7 0 8 0C9.1 0 10.1375 0.0458333 11.1125 0.1375C12.0875 0.229167 12.9375 0.4125 13.6625 0.6875C14.3875 0.9625 14.9583 1.3625 15.375 1.8875C15.7917 2.4125 16 3.11667 16 4V13.5C16 14.4833 15.6625 15.3125 14.9875 15.9875C14.3125 16.6625 13.4833 17 12.5 17L14 18.5V19H12L10 17H6L4 19H2V18.5L3.5 17C2.51667 17 1.6875 16.6625 1.0125 15.9875C0.3375 15.3125 0 14.4833 0 13.5ZM8 2C6.23333 2 4.94167 2.10417 4.125 2.3125C3.30833 2.52083 2.75 2.75 2.45 3H13.65C13.4 2.71667 12.8625 2.47917 12.0375 2.2875C11.2125 2.09583 9.86667 2 8 2ZM2 8H7V5H2V8ZM12.5 10H2H14H12.5ZM9 8H14V5H9V8ZM4.5 14C4.93333 14 5.29167 13.8583 5.575 13.575C5.85833 13.2917 6 12.9333 6 12.5C6 12.0667 5.85833 11.7083 5.575 11.425C5.29167 11.1417 4.93333 11 4.5 11C4.06667 11 3.70833 11.1417 3.425 11.425C3.14167 11.7083 3 12.0667 3 12.5C3 12.9333 3.14167 13.2917 3.425 13.575C3.70833 13.8583 4.06667 14 4.5 14ZM11.5 14C11.9333 14 12.2917 13.8583 12.575 13.575C12.8583 13.2917 13 12.9333 13 12.5C13 12.0667 12.8583 11.7083 12.575 11.425C12.2917 11.1417 11.9333 11 11.5 11C11.0667 11 10.7083 11.1417 10.425 11.425C10.1417 11.7083 10 12.0667 10 12.5C10 12.9333 10.1417 13.2917 10.425 13.575C10.7083 13.8583 11.0667 14 11.5 14ZM3.5 15H12.5C12.9333 15 13.2917 14.8583 13.575 14.575C13.8583 14.2917 14 13.9333 14 13.5V10H2V13.5C2 13.9333 2.14167 14.2917 2.425 14.575C2.70833 14.8583 3.06667 15 3.5 15ZM8 3H13.65H2.45H8Z" fill="currentColor"/>
</svg>
`, ee = '<svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="m280-40 112-564-72 28v136h-80v-188l202-86q14-6 29.5-7t29.5 4q14 5 26.5 14t20.5 23l40 64q26 42 70.5 69T760-520v80q-70 0-125-29t-94-74l-25 123 84 80v300h-80v-260l-84-64-72 324h-84Zm260-700q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z"/></sv', se = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23,12H17V10L20.39,6H17V4H23V6L19.62,10H23V12M15,16H9V14L12.39,10H9V8H15V10L11.62,14H15V16M7,20H1V18L4.39,14H1V12H7V14L3.62,18H7V20Z" /></svg>';
const ie = { CHILD: 2 }, re = (s) => (...t) => ({ _$litDirective$: s, values: t });
class ne {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
class k extends ne {
  constructor(t) {
    if (super(t), this.it = h, t.type !== ie.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === h || t == null) return this._t = void 0, this.it = t;
    if (t === A) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
k.directiveName = "unsafeHTML", k.resultType = 1;
const at = re(k);
var oe = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, S = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ae(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && oe(t, e, r), r;
};
let _ = class extends w {
  constructor() {
    super(...arguments), this.dateFormat = new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  render() {
    return f`
      <div class="card">
        ${this.renderHeadline(this.headline, this.legs[0], this.active)}
        ${this.legs.map((s, t, e) => this.renderLeg(s, t, e))}
      </div>
    `;
  }
  renderHeadline(s, t, e) {
    if (!s || !t) return h;
    const i = mt(this.now, t), r = i <= 0 ? "jetzt" : `in ${i} min`;
    return f`<div class="headline">
      <h1>${e ? h : at(se)}${this.headline}</h1>
      <span>${r}</span>
    </div>`;
  }
  renderLeg(s, t, e) {
    const i = e[t + 1];
    return f`
      ${t == 0 ? this.renderStations(ot(s), null, !1) : h}
      ${this.renderMode(s, t)}
      ${this.renderStations(
      Wt(s),
      i ? ot(i) : null,
      t === e.length - 1
    )}
    `;
  }
  renderStations(s, t, e) {
    const i = this.renderStation(s, e);
    let r = t ? this.renderStation(t, !1) : h;
    return r = r !== h && !Ft(i.values, r.values) ? r : h, f`
      <div class="${t ? "slim" : ""}">
        <div class="symbols">
          <div class="delay">
            ${s.delay > 0 ? "+" + s.delay : ""}<br />
            ${t?.delay > 0 ? "+" + t?.delay : ""}
          </div>
          <div class="bullet">&bull;</div>
        </div>
        <div>${this.renderStation(s, e)} ${r}</div>
      </div>
    `;
  }
  formatDate(s) {
    return this.dateFormat.format(new Date(s));
  }
  formatStationName(s) {
    let t = s;
    for (const e of this.searchReplace) {
      const [i, r] = e.split("/", 2);
      t = t.replaceAll(new RegExp(i, "gi"), r ?? "");
    }
    return t.trim();
  }
  renderStation(s, t) {
    return f`
      <span>${this.formatDate(s.scheduled)}&nbsp;-</span>
      <span class="${t ? "bold" : ""}">
        ${this.formatStationName(s.stationName)}
      </span>
      <span> ${s.platform} </span>
      <br />
    `;
  }
  renderMode(s, t) {
    const e = { bus: Yt, train: te, walking: ee }[s.mode];
    return f`
      <div>
        <div class="symbols">
          <div class="icon">${at(e)}</div>
        </div>
        <div>
          <span class="bold">
            ${s.mode !== "walking" ? s.name : `${$t(
      s.departure,
      s.arrival
    )} min Fußweg`}
          </span>
        </div>
      </div>
    `;
  }
};
_.styles = ht`
    :host {
      --gradient1: #112042;
      --gradient2: #6831AC;
      --color: white;
      --delay-color: red;

      --symbol-width: 3rem;
      --symbol-padding: 1rem;
      --font-size: 1.3rem;
      --vertical-space: 1rem;
      --line-padding: 0.9rem;
      --line-color: rgba(255, 255, 255, 0.6);
    }

    .headline {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .headline h1 {
      font-size: var(--ha-font-size-3xl);
      margin: 0;
    }
    .headline svg {
      fill: currentColor;
      height: var(--ha-font-size-3xl);
      padding: 0.5rem;
    }
      
    
    .bold {
      font-weight: bold;
    }

    .card {
      border-radius: var(--ha-card-border-radius,var(--ha-border-radius-lg));
      margin: 0.3rem;
      color: var(--color);
      padding: 1rem;
      background: linear-gradient(180deg, var(--gradient1) 0%, var(--gradient2) 100%);
      display: flex;
      flex-direction: column;
      font-size: var(--font-size);
      gap: var(--vertical-space);
    }

    .card > div, .symbols {
      display: flex;
      flex-direction row;
    }

    .symbols {
      width: var(--symbol-width);
      padding-right: var(--symbol-padding);
      flex-shrink: 0;
      justify-content: end;
    }

    .icon {
      position: relative;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }

    .icon::before, .icon::after {
      content: '';
      display: block;
      position: absolute;
      height: var(--vertical-space);
      border-left: dashed var(--line-color) 3px;
      right: 2px;
    }
    .icon::after {
      top: calc(var(--line-padding) + var(--font-size));
    }
    .icon::before {
      bottom: calc(var(--line-padding) + var(--font-size));
    }

    .icon svg {
      margin-right: -4px;
    }
    .delay {
      color: var(--delay-color);
    }

    .bullet {
      margin-left: var(--symbol-padding);
      display: flex;
      align-items: center;
    }

    .slim {
      line-height: 1.4rem;
    }
  `;
S([
  C()
], _.prototype, "now", 2);
S([
  C()
], _.prototype, "headline", 2);
S([
  C()
], _.prototype, "active", 2);
S([
  C()
], _.prototype, "legs", 2);
S([
  C()
], _.prototype, "searchReplace", 2);
_ = S([
  ft("bmn-itinerary")
], _);
const gt = [255, 255, 255], vt = [17, 32, 66], yt = [104, 49, 172], le = [
  {
    name: "title",
    selector: {
      text: {}
    }
  },
  {
    name: "entity",
    required: !0,
    selector: {
      entity: {
        filter: {
          domain: "sensor"
        }
      }
    }
  },
  {
    name: "index",
    selector: {
      number: {
        min: 0
      }
    },
    required: !0
  },
  {
    name: "origin_name",
    selector: {
      text: {}
    }
  },
  {
    name: "destination_name",
    selector: {
      text: {}
    }
  },
  {
    name: "search_replace",
    selector: {
      text: {
        multiple: !0
      }
    }
  },
  {
    name: "color",
    selector: {
      color_rgb: {}
    },
    default: gt
  },
  {
    name: "gradient1",
    selector: {
      color_rgb: {}
    },
    default: vt
  },
  {
    name: "gradient2",
    selector: {
      color_rgb: {}
    },
    default: yt
  }
];
function he() {
  return {
    computeLabel: (s) => {
      if (s.name === "title") return "Title";
      if (s.name === "entity") return "Sensor";
      if (s.name === "index") return "Index";
      if (s.name === "search_replace") return "Suppressed Words";
    },
    computeHelper: (s) => {
      if (s.name === "entity") return "hacs-hafas sensor for connection";
      if (s.name === "index")
        return "Which connection of the sensor do you want to display? 0 being the first";
      if (s.name === "origin_name")
        return "If origin requires an initial walking leg, this name is displayed as initial origin.";
      if (s.name === "destination_name")
        return "If destination requires a final walking leg, this name is displayed as total origin.";
      if (s.name === "search_replace")
        return "Regular Expression to find. Replace is text only. Find may not contain slashes. e.g. 'fi?nd+/replace'";
    },
    schema: le
  };
}
var ce = Object.defineProperty, de = Object.getOwnPropertyDescriptor, J = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? de(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (r = (i ? o(t, e, r) : o(r)) || r);
  return i && r && ce(t, e, r), r;
};
let N = class extends w {
  constructor() {
    super(...arguments), this.now = Date.now(), this.timer = void 0;
  }
  // set in setConfig
  get sensorState() {
    const s = this.config?.entity;
    return s ? this.hass.states[s] : void 0;
  }
  get searchReplace() {
    return this.config?.search_replace ? Array.isArray(this.config.search_replace) ? this.config.search_replace : [this.config.search_replace] : [];
  }
  // lit's render function
  render() {
    if (!this.config) return f`Configuration issues`;
    const s = this.sensorState?.attributes.active ?? !1, t = this.sensorState?.attributes.last_query;
    let e = this.sensorState?.attributes.connections;
    if (e = e ?? [], e = e.filter(
      (a) => a.legs[0] && mt(this.now, a.legs[0]) >= 0
    ), e.length === 0) return f`No connections`;
    const i = this.config.color ?? gt, r = this.config.gradient1 ?? vt, n = this.config.gradient2 ?? yt, o = [
      `--gradient1: rgb(${r.join(", ")})`,
      `--gradient2: rgb(${n.join(", ")})`,
      `--color: rgb(${i.join(", ")})`,
      `--line-color: rgba(${i.join(", ")}, 0.6)`
    ], l = Xt(
      e[this.config.index].legs,
      this.config.origin_name,
      this.config.destination_name
    );
    return f` <ha-card>
      <bmn-itinerary
        .now="${this.now}"
        .active="${s}"
        .headline="${this.config.title}"
        .searchReplace="${this.searchReplace}"
        .legs="${l}"
        style="${o.join("; ")}"
      >
      </bmn-itinerary>
      <small style="padding-left: 0.5rem">
      Updated
        ${t ? new Intl.DateTimeFormat("en-DE", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Berlin"
    }).format(new Date(t)) : "unknown"}
        </small>
    </ha-card>`;
  }
  // user supplied configuration
  setConfig(s) {
    if (!s.entity)
      throw new Error("You need to define an entity");
    this.config = s;
  }
  // home assistant calls this function to display a config form for this card
  static getConfigForm() {
    return he();
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = setInterval(() => {
      this.now = Date.now();
    }, 5e3);
  }
  disconnectedCallback() {
    typeof this.timer < "u" && clearInterval(this.timer), super.disconnectedCallback();
  }
};
N.styles = ht``;
J([
  C()
], N.prototype, "hass", 2);
J([
  Bt()
], N.prototype, "now", 2);
N = J([
  ft("avvhafas-journeys")
], N);
console.info("ha-hacs-journeys loaded");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aGFmYXMtY2FyZHMuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvY3NzLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvcmVhY3RpdmUtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saXQtaHRtbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXQtZWxlbWVudC9saXQtZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9jdXN0b20tZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9zdGF0ZS5qcyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9hc3NldHMvYnVzLnN2Zz9yYXciLCIuLi9zcmMvYXNzZXRzL3RyYWluLnN2Zz9yYXciLCIuLi9zcmMvYXNzZXRzL3dhbGtpbmcuc3ZnP3JhdyIsIi4uL3NyYy9hc3NldHMvc2xlZXAuc3ZnP3JhdyIsIi4uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9kaXJlY3RpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvZGlyZWN0aXZlcy91bnNhZmUtaHRtbC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2l0aW5lcmFyeS50cyIsIi4uL3NyYy9qb3VybmV5c0NvbmZpZy50cyIsIi4uL3NyYy9qb3VybmV5cy50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IHQ9Z2xvYmFsVGhpcyxlPXQuU2hhZG93Um9vdCYmKHZvaWQgMD09PXQuU2hhZHlDU1N8fHQuU2hhZHlDU1MubmF0aXZlU2hhZG93KSYmXCJhZG9wdGVkU3R5bGVTaGVldHNcImluIERvY3VtZW50LnByb3RvdHlwZSYmXCJyZXBsYWNlXCJpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZSxzPVN5bWJvbCgpLG89bmV3IFdlYWtNYXA7Y2xhc3Mgbntjb25zdHJ1Y3Rvcih0LGUsbyl7aWYodGhpcy5fJGNzc1Jlc3VsdCQ9ITAsbyE9PXMpdGhyb3cgRXJyb3IoXCJDU1NSZXN1bHQgaXMgbm90IGNvbnN0cnVjdGFibGUuIFVzZSBgdW5zYWZlQ1NTYCBvciBgY3NzYCBpbnN0ZWFkLlwiKTt0aGlzLmNzc1RleHQ9dCx0aGlzLnQ9ZX1nZXQgc3R5bGVTaGVldCgpe2xldCB0PXRoaXMubztjb25zdCBzPXRoaXMudDtpZihlJiZ2b2lkIDA9PT10KXtjb25zdCBlPXZvaWQgMCE9PXMmJjE9PT1zLmxlbmd0aDtlJiYodD1vLmdldChzKSksdm9pZCAwPT09dCYmKCh0aGlzLm89dD1uZXcgQ1NTU3R5bGVTaGVldCkucmVwbGFjZVN5bmModGhpcy5jc3NUZXh0KSxlJiZvLnNldChzLHQpKX1yZXR1cm4gdH10b1N0cmluZygpe3JldHVybiB0aGlzLmNzc1RleHR9fWNvbnN0IHI9dD0+bmV3IG4oXCJzdHJpbmdcIj09dHlwZW9mIHQ/dDp0K1wiXCIsdm9pZCAwLHMpLGk9KHQsLi4uZSk9Pntjb25zdCBvPTE9PT10Lmxlbmd0aD90WzBdOmUucmVkdWNlKCgoZSxzLG8pPT5lKyh0PT57aWYoITA9PT10Ll8kY3NzUmVzdWx0JClyZXR1cm4gdC5jc3NUZXh0O2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVybiB0O3Rocm93IEVycm9yKFwiVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6IFwiK3QrXCIuIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5cIil9KShzKSt0W28rMV0pLHRbMF0pO3JldHVybiBuZXcgbihvLHQscyl9LFM9KHMsbyk9PntpZihlKXMuYWRvcHRlZFN0eWxlU2hlZXRzPW8ubWFwKCh0PT50IGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldD90OnQuc3R5bGVTaGVldCkpO2Vsc2UgZm9yKGNvbnN0IGUgb2Ygbyl7Y29uc3Qgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiksbj10LmxpdE5vbmNlO3ZvaWQgMCE9PW4mJm8uc2V0QXR0cmlidXRlKFwibm9uY2VcIixuKSxvLnRleHRDb250ZW50PWUuY3NzVGV4dCxzLmFwcGVuZENoaWxkKG8pfX0sYz1lP3Q9PnQ6dD0+dCBpbnN0YW5jZW9mIENTU1N0eWxlU2hlZXQ/KHQ9PntsZXQgZT1cIlwiO2Zvcihjb25zdCBzIG9mIHQuY3NzUnVsZXMpZSs9cy5jc3NUZXh0O3JldHVybiByKGUpfSkodCk6dDtleHBvcnR7biBhcyBDU1NSZXN1bHQsUyBhcyBhZG9wdFN0eWxlcyxpIGFzIGNzcyxjIGFzIGdldENvbXBhdGlibGVTdHlsZSxlIGFzIHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyxyIGFzIHVuc2FmZUNTU307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jc3MtdGFnLmpzLm1hcFxuIiwiaW1wb3J0e2dldENvbXBhdGlibGVTdHlsZSBhcyB0LGFkb3B0U3R5bGVzIGFzIHN9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7ZXhwb3J0e0NTU1Jlc3VsdCxjc3Msc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzLHVuc2FmZUNTU31mcm9tXCIuL2Nzcy10YWcuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2NvbnN0e2lzOmksZGVmaW5lUHJvcGVydHk6ZSxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6aCxnZXRPd25Qcm9wZXJ0eU5hbWVzOnIsZ2V0T3duUHJvcGVydHlTeW1ib2xzOm8sZ2V0UHJvdG90eXBlT2Y6bn09T2JqZWN0LGE9Z2xvYmFsVGhpcyxjPWEudHJ1c3RlZFR5cGVzLGw9Yz9jLmVtcHR5U2NyaXB0OlwiXCIscD1hLnJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydCxkPSh0LHMpPT50LHU9e3RvQXR0cmlidXRlKHQscyl7c3dpdGNoKHMpe2Nhc2UgQm9vbGVhbjp0PXQ/bDpudWxsO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dD1udWxsPT10P3Q6SlNPTi5zdHJpbmdpZnkodCl9cmV0dXJuIHR9LGZyb21BdHRyaWJ1dGUodCxzKXtsZXQgaT10O3N3aXRjaChzKXtjYXNlIEJvb2xlYW46aT1udWxsIT09dDticmVhaztjYXNlIE51bWJlcjppPW51bGw9PT10P251bGw6TnVtYmVyKHQpO2JyZWFrO2Nhc2UgT2JqZWN0OmNhc2UgQXJyYXk6dHJ5e2k9SlNPTi5wYXJzZSh0KX1jYXRjaCh0KXtpPW51bGx9fXJldHVybiBpfX0sZj0odCxzKT0+IWkodCxzKSxiPXthdHRyaWJ1dGU6ITAsdHlwZTpTdHJpbmcsY29udmVydGVyOnUscmVmbGVjdDohMSx1c2VEZWZhdWx0OiExLGhhc0NoYW5nZWQ6Zn07U3ltYm9sLm1ldGFkYXRhPz89U3ltYm9sKFwibWV0YWRhdGFcIiksYS5saXRQcm9wZXJ0eU1ldGFkYXRhPz89bmV3IFdlYWtNYXA7Y2xhc3MgeSBleHRlbmRzIEhUTUxFbGVtZW50e3N0YXRpYyBhZGRJbml0aWFsaXplcih0KXt0aGlzLl8kRWkoKSwodGhpcy5sPz89W10pLnB1c2godCl9c3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKXtyZXR1cm4gdGhpcy5maW5hbGl6ZSgpLHRoaXMuXyRFaCYmWy4uLnRoaXMuXyRFaC5rZXlzKCldfXN0YXRpYyBjcmVhdGVQcm9wZXJ0eSh0LHM9Yil7aWYocy5zdGF0ZSYmKHMuYXR0cmlidXRlPSExKSx0aGlzLl8kRWkoKSx0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0KSYmKChzPU9iamVjdC5jcmVhdGUocykpLndyYXBwZWQ9ITApLHRoaXMuZWxlbWVudFByb3BlcnRpZXMuc2V0KHQscyksIXMubm9BY2Nlc3Nvcil7Y29uc3QgaT1TeW1ib2woKSxoPXRoaXMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHQsaSxzKTt2b2lkIDAhPT1oJiZlKHRoaXMucHJvdG90eXBlLHQsaCl9fXN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IodCxzLGkpe2NvbnN0e2dldDplLHNldDpyfT1oKHRoaXMucHJvdG90eXBlLHQpPz97Z2V0KCl7cmV0dXJuIHRoaXNbc119LHNldCh0KXt0aGlzW3NdPXR9fTtyZXR1cm57Z2V0OmUsc2V0KHMpe2NvbnN0IGg9ZT8uY2FsbCh0aGlzKTtyPy5jYWxsKHRoaXMscyksdGhpcy5yZXF1ZXN0VXBkYXRlKHQsaCxpKX0sY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITB9fXN0YXRpYyBnZXRQcm9wZXJ0eU9wdGlvbnModCl7cmV0dXJuIHRoaXMuZWxlbWVudFByb3BlcnRpZXMuZ2V0KHQpPz9ifXN0YXRpYyBfJEVpKCl7aWYodGhpcy5oYXNPd25Qcm9wZXJ0eShkKFwiZWxlbWVudFByb3BlcnRpZXNcIikpKXJldHVybjtjb25zdCB0PW4odGhpcyk7dC5maW5hbGl6ZSgpLHZvaWQgMCE9PXQubCYmKHRoaXMubD1bLi4udC5sXSksdGhpcy5lbGVtZW50UHJvcGVydGllcz1uZXcgTWFwKHQuZWxlbWVudFByb3BlcnRpZXMpfXN0YXRpYyBmaW5hbGl6ZSgpe2lmKHRoaXMuaGFzT3duUHJvcGVydHkoZChcImZpbmFsaXplZFwiKSkpcmV0dXJuO2lmKHRoaXMuZmluYWxpemVkPSEwLHRoaXMuXyRFaSgpLHRoaXMuaGFzT3duUHJvcGVydHkoZChcInByb3BlcnRpZXNcIikpKXtjb25zdCB0PXRoaXMucHJvcGVydGllcyxzPVsuLi5yKHQpLC4uLm8odCldO2Zvcihjb25zdCBpIG9mIHMpdGhpcy5jcmVhdGVQcm9wZXJ0eShpLHRbaV0pfWNvbnN0IHQ9dGhpc1tTeW1ib2wubWV0YWRhdGFdO2lmKG51bGwhPT10KXtjb25zdCBzPWxpdFByb3BlcnR5TWV0YWRhdGEuZ2V0KHQpO2lmKHZvaWQgMCE9PXMpZm9yKGNvbnN0W3QsaV1vZiBzKXRoaXMuZWxlbWVudFByb3BlcnRpZXMuc2V0KHQsaSl9dGhpcy5fJEVoPW5ldyBNYXA7Zm9yKGNvbnN0W3Qsc11vZiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzKXtjb25zdCBpPXRoaXMuXyRFdSh0LHMpO3ZvaWQgMCE9PWkmJnRoaXMuXyRFaC5zZXQoaSx0KX10aGlzLmVsZW1lbnRTdHlsZXM9dGhpcy5maW5hbGl6ZVN0eWxlcyh0aGlzLnN0eWxlcyl9c3RhdGljIGZpbmFsaXplU3R5bGVzKHMpe2NvbnN0IGk9W107aWYoQXJyYXkuaXNBcnJheShzKSl7Y29uc3QgZT1uZXcgU2V0KHMuZmxhdCgxLzApLnJldmVyc2UoKSk7Zm9yKGNvbnN0IHMgb2YgZSlpLnVuc2hpZnQodChzKSl9ZWxzZSB2b2lkIDAhPT1zJiZpLnB1c2godChzKSk7cmV0dXJuIGl9c3RhdGljIF8kRXUodCxzKXtjb25zdCBpPXMuYXR0cmlidXRlO3JldHVybiExPT09aT92b2lkIDA6XCJzdHJpbmdcIj09dHlwZW9mIGk/aTpcInN0cmluZ1wiPT10eXBlb2YgdD90LnRvTG93ZXJDYXNlKCk6dm9pZCAwfWNvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLl8kRXA9dm9pZCAwLHRoaXMuaXNVcGRhdGVQZW5kaW5nPSExLHRoaXMuaGFzVXBkYXRlZD0hMSx0aGlzLl8kRW09bnVsbCx0aGlzLl8kRXYoKX1fJEV2KCl7dGhpcy5fJEVTPW5ldyBQcm9taXNlKCh0PT50aGlzLmVuYWJsZVVwZGF0aW5nPXQpKSx0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLl8kRV8oKSx0aGlzLnJlcXVlc3RVcGRhdGUoKSx0aGlzLmNvbnN0cnVjdG9yLmw/LmZvckVhY2goKHQ9PnQodGhpcykpKX1hZGRDb250cm9sbGVyKHQpeyh0aGlzLl8kRU8/Pz1uZXcgU2V0KS5hZGQodCksdm9pZCAwIT09dGhpcy5yZW5kZXJSb290JiZ0aGlzLmlzQ29ubmVjdGVkJiZ0Lmhvc3RDb25uZWN0ZWQ/LigpfXJlbW92ZUNvbnRyb2xsZXIodCl7dGhpcy5fJEVPPy5kZWxldGUodCl9XyRFXygpe2NvbnN0IHQ9bmV3IE1hcCxzPXRoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXM7Zm9yKGNvbnN0IGkgb2Ygcy5rZXlzKCkpdGhpcy5oYXNPd25Qcm9wZXJ0eShpKSYmKHQuc2V0KGksdGhpc1tpXSksZGVsZXRlIHRoaXNbaV0pO3Quc2l6ZT4wJiYodGhpcy5fJEVwPXQpfWNyZWF0ZVJlbmRlclJvb3QoKXtjb25zdCB0PXRoaXMuc2hhZG93Um9vdD8/dGhpcy5hdHRhY2hTaGFkb3codGhpcy5jb25zdHJ1Y3Rvci5zaGFkb3dSb290T3B0aW9ucyk7cmV0dXJuIHModCx0aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRTdHlsZXMpLHR9Y29ubmVjdGVkQ2FsbGJhY2soKXt0aGlzLnJlbmRlclJvb3Q/Pz10aGlzLmNyZWF0ZVJlbmRlclJvb3QoKSx0aGlzLmVuYWJsZVVwZGF0aW5nKCEwKSx0aGlzLl8kRU8/LmZvckVhY2goKHQ9PnQuaG9zdENvbm5lY3RlZD8uKCkpKX1lbmFibGVVcGRhdGluZyh0KXt9ZGlzY29ubmVjdGVkQ2FsbGJhY2soKXt0aGlzLl8kRU8/LmZvckVhY2goKHQ9PnQuaG9zdERpc2Nvbm5lY3RlZD8uKCkpKX1hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodCxzLGkpe3RoaXMuXyRBSyh0LGkpfV8kRVQodCxzKXtjb25zdCBpPXRoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXMuZ2V0KHQpLGU9dGhpcy5jb25zdHJ1Y3Rvci5fJEV1KHQsaSk7aWYodm9pZCAwIT09ZSYmITA9PT1pLnJlZmxlY3Qpe2NvbnN0IGg9KHZvaWQgMCE9PWkuY29udmVydGVyPy50b0F0dHJpYnV0ZT9pLmNvbnZlcnRlcjp1KS50b0F0dHJpYnV0ZShzLGkudHlwZSk7dGhpcy5fJEVtPXQsbnVsbD09aD90aGlzLnJlbW92ZUF0dHJpYnV0ZShlKTp0aGlzLnNldEF0dHJpYnV0ZShlLGgpLHRoaXMuXyRFbT1udWxsfX1fJEFLKHQscyl7Y29uc3QgaT10aGlzLmNvbnN0cnVjdG9yLGU9aS5fJEVoLmdldCh0KTtpZih2b2lkIDAhPT1lJiZ0aGlzLl8kRW0hPT1lKXtjb25zdCB0PWkuZ2V0UHJvcGVydHlPcHRpb25zKGUpLGg9XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb252ZXJ0ZXI/e2Zyb21BdHRyaWJ1dGU6dC5jb252ZXJ0ZXJ9OnZvaWQgMCE9PXQuY29udmVydGVyPy5mcm9tQXR0cmlidXRlP3QuY29udmVydGVyOnU7dGhpcy5fJEVtPWU7Y29uc3Qgcj1oLmZyb21BdHRyaWJ1dGUocyx0LnR5cGUpO3RoaXNbZV09cj8/dGhpcy5fJEVqPy5nZXQoZSk/P3IsdGhpcy5fJEVtPW51bGx9fXJlcXVlc3RVcGRhdGUodCxzLGkpe2lmKHZvaWQgMCE9PXQpe2NvbnN0IGU9dGhpcy5jb25zdHJ1Y3RvcixoPXRoaXNbdF07aWYoaT8/PWUuZ2V0UHJvcGVydHlPcHRpb25zKHQpLCEoKGkuaGFzQ2hhbmdlZD8/ZikoaCxzKXx8aS51c2VEZWZhdWx0JiZpLnJlZmxlY3QmJmg9PT10aGlzLl8kRWo/LmdldCh0KSYmIXRoaXMuaGFzQXR0cmlidXRlKGUuXyRFdSh0LGkpKSkpcmV0dXJuO3RoaXMuQyh0LHMsaSl9ITE9PT10aGlzLmlzVXBkYXRlUGVuZGluZyYmKHRoaXMuXyRFUz10aGlzLl8kRVAoKSl9Qyh0LHMse3VzZURlZmF1bHQ6aSxyZWZsZWN0OmUsd3JhcHBlZDpofSxyKXtpJiYhKHRoaXMuXyRFaj8/PW5ldyBNYXApLmhhcyh0KSYmKHRoaXMuXyRFai5zZXQodCxyPz9zPz90aGlzW3RdKSwhMCE9PWh8fHZvaWQgMCE9PXIpfHwodGhpcy5fJEFMLmhhcyh0KXx8KHRoaXMuaGFzVXBkYXRlZHx8aXx8KHM9dm9pZCAwKSx0aGlzLl8kQUwuc2V0KHQscykpLCEwPT09ZSYmdGhpcy5fJEVtIT09dCYmKHRoaXMuXyRFcT8/PW5ldyBTZXQpLmFkZCh0KSl9YXN5bmMgXyRFUCgpe3RoaXMuaXNVcGRhdGVQZW5kaW5nPSEwO3RyeXthd2FpdCB0aGlzLl8kRVN9Y2F0Y2godCl7UHJvbWlzZS5yZWplY3QodCl9Y29uc3QgdD10aGlzLnNjaGVkdWxlVXBkYXRlKCk7cmV0dXJuIG51bGwhPXQmJmF3YWl0IHQsIXRoaXMuaXNVcGRhdGVQZW5kaW5nfXNjaGVkdWxlVXBkYXRlKCl7cmV0dXJuIHRoaXMucGVyZm9ybVVwZGF0ZSgpfXBlcmZvcm1VcGRhdGUoKXtpZighdGhpcy5pc1VwZGF0ZVBlbmRpbmcpcmV0dXJuO2lmKCF0aGlzLmhhc1VwZGF0ZWQpe2lmKHRoaXMucmVuZGVyUm9vdD8/PXRoaXMuY3JlYXRlUmVuZGVyUm9vdCgpLHRoaXMuXyRFcCl7Zm9yKGNvbnN0W3Qsc11vZiB0aGlzLl8kRXApdGhpc1t0XT1zO3RoaXMuXyRFcD12b2lkIDB9Y29uc3QgdD10aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRQcm9wZXJ0aWVzO2lmKHQuc2l6ZT4wKWZvcihjb25zdFtzLGldb2YgdCl7Y29uc3R7d3JhcHBlZDp0fT1pLGU9dGhpc1tzXTshMCE9PXR8fHRoaXMuXyRBTC5oYXMocyl8fHZvaWQgMD09PWV8fHRoaXMuQyhzLHZvaWQgMCxpLGUpfX1sZXQgdD0hMTtjb25zdCBzPXRoaXMuXyRBTDt0cnl7dD10aGlzLnNob3VsZFVwZGF0ZShzKSx0Pyh0aGlzLndpbGxVcGRhdGUocyksdGhpcy5fJEVPPy5mb3JFYWNoKCh0PT50Lmhvc3RVcGRhdGU/LigpKSksdGhpcy51cGRhdGUocykpOnRoaXMuXyRFTSgpfWNhdGNoKHMpe3Rocm93IHQ9ITEsdGhpcy5fJEVNKCksc310JiZ0aGlzLl8kQUUocyl9d2lsbFVwZGF0ZSh0KXt9XyRBRSh0KXt0aGlzLl8kRU8/LmZvckVhY2goKHQ9PnQuaG9zdFVwZGF0ZWQ/LigpKSksdGhpcy5oYXNVcGRhdGVkfHwodGhpcy5oYXNVcGRhdGVkPSEwLHRoaXMuZmlyc3RVcGRhdGVkKHQpKSx0aGlzLnVwZGF0ZWQodCl9XyRFTSgpe3RoaXMuXyRBTD1uZXcgTWFwLHRoaXMuaXNVcGRhdGVQZW5kaW5nPSExfWdldCB1cGRhdGVDb21wbGV0ZSgpe3JldHVybiB0aGlzLmdldFVwZGF0ZUNvbXBsZXRlKCl9Z2V0VXBkYXRlQ29tcGxldGUoKXtyZXR1cm4gdGhpcy5fJEVTfXNob3VsZFVwZGF0ZSh0KXtyZXR1cm4hMH11cGRhdGUodCl7dGhpcy5fJEVxJiY9dGhpcy5fJEVxLmZvckVhY2goKHQ9PnRoaXMuXyRFVCh0LHRoaXNbdF0pKSksdGhpcy5fJEVNKCl9dXBkYXRlZCh0KXt9Zmlyc3RVcGRhdGVkKHQpe319eS5lbGVtZW50U3R5bGVzPVtdLHkuc2hhZG93Um9vdE9wdGlvbnM9e21vZGU6XCJvcGVuXCJ9LHlbZChcImVsZW1lbnRQcm9wZXJ0aWVzXCIpXT1uZXcgTWFwLHlbZChcImZpbmFsaXplZFwiKV09bmV3IE1hcCxwPy4oe1JlYWN0aXZlRWxlbWVudDp5fSksKGEucmVhY3RpdmVFbGVtZW50VmVyc2lvbnM/Pz1bXSkucHVzaChcIjIuMS4xXCIpO2V4cG9ydHt5IGFzIFJlYWN0aXZlRWxlbWVudCxzIGFzIGFkb3B0U3R5bGVzLHUgYXMgZGVmYXVsdENvbnZlcnRlcix0IGFzIGdldENvbXBhdGlibGVTdHlsZSxmIGFzIG5vdEVxdWFsfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0aXZlLWVsZW1lbnQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IHQ9Z2xvYmFsVGhpcyxpPXQudHJ1c3RlZFR5cGVzLHM9aT9pLmNyZWF0ZVBvbGljeShcImxpdC1odG1sXCIse2NyZWF0ZUhUTUw6dD0+dH0pOnZvaWQgMCxlPVwiJGxpdCRcIixoPWBsaXQkJHtNYXRoLnJhbmRvbSgpLnRvRml4ZWQoOSkuc2xpY2UoMil9JGAsbz1cIj9cIitoLG49YDwke299PmAscj1kb2N1bWVudCxsPSgpPT5yLmNyZWF0ZUNvbW1lbnQoXCJcIiksYz10PT5udWxsPT09dHx8XCJvYmplY3RcIiE9dHlwZW9mIHQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQsYT1BcnJheS5pc0FycmF5LHU9dD0+YSh0KXx8XCJmdW5jdGlvblwiPT10eXBlb2YgdD8uW1N5bWJvbC5pdGVyYXRvcl0sZD1cIlsgXFx0XFxuXFxmXFxyXVwiLGY9LzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nLHY9Ly0tPi9nLF89Lz4vZyxtPVJlZ0V4cChgPnwke2R9KD86KFteXFxcXHNcIic+PS9dKykoJHtkfSo9JHtkfSooPzpbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dfChcInwnKXwpKXwkKWAsXCJnXCIpLHA9LycvZyxnPS9cIi9nLCQ9L14oPzpzY3JpcHR8c3R5bGV8dGV4dGFyZWF8dGl0bGUpJC9pLHk9dD0+KGksLi4ucyk9Pih7XyRsaXRUeXBlJDp0LHN0cmluZ3M6aSx2YWx1ZXM6c30pLHg9eSgxKSxiPXkoMiksdz15KDMpLFQ9U3ltYm9sLmZvcihcImxpdC1ub0NoYW5nZVwiKSxFPVN5bWJvbC5mb3IoXCJsaXQtbm90aGluZ1wiKSxBPW5ldyBXZWFrTWFwLEM9ci5jcmVhdGVUcmVlV2Fsa2VyKHIsMTI5KTtmdW5jdGlvbiBQKHQsaSl7aWYoIWEodCl8fCF0Lmhhc093blByb3BlcnR5KFwicmF3XCIpKXRocm93IEVycm9yKFwiaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5XCIpO3JldHVybiB2b2lkIDAhPT1zP3MuY3JlYXRlSFRNTChpKTppfWNvbnN0IFY9KHQsaSk9Pntjb25zdCBzPXQubGVuZ3RoLTEsbz1bXTtsZXQgcixsPTI9PT1pP1wiPHN2Zz5cIjozPT09aT9cIjxtYXRoPlwiOlwiXCIsYz1mO2ZvcihsZXQgaT0wO2k8cztpKyspe2NvbnN0IHM9dFtpXTtsZXQgYSx1LGQ9LTEseT0wO2Zvcig7eTxzLmxlbmd0aCYmKGMubGFzdEluZGV4PXksdT1jLmV4ZWMocyksbnVsbCE9PXUpOyl5PWMubGFzdEluZGV4LGM9PT1mP1wiIS0tXCI9PT11WzFdP2M9djp2b2lkIDAhPT11WzFdP2M9Xzp2b2lkIDAhPT11WzJdPygkLnRlc3QodVsyXSkmJihyPVJlZ0V4cChcIjwvXCIrdVsyXSxcImdcIikpLGM9bSk6dm9pZCAwIT09dVszXSYmKGM9bSk6Yz09PW0/XCI+XCI9PT11WzBdPyhjPXI/P2YsZD0tMSk6dm9pZCAwPT09dVsxXT9kPS0yOihkPWMubGFzdEluZGV4LXVbMl0ubGVuZ3RoLGE9dVsxXSxjPXZvaWQgMD09PXVbM10/bTonXCInPT09dVszXT9nOnApOmM9PT1nfHxjPT09cD9jPW06Yz09PXZ8fGM9PT1fP2M9ZjooYz1tLHI9dm9pZCAwKTtjb25zdCB4PWM9PT1tJiZ0W2krMV0uc3RhcnRzV2l0aChcIi8+XCIpP1wiIFwiOlwiXCI7bCs9Yz09PWY/cytuOmQ+PTA/KG8ucHVzaChhKSxzLnNsaWNlKDAsZCkrZStzLnNsaWNlKGQpK2greCk6cytoKygtMj09PWQ/aTp4KX1yZXR1cm5bUCh0LGwrKHRbc118fFwiPD8+XCIpKygyPT09aT9cIjwvc3ZnPlwiOjM9PT1pP1wiPC9tYXRoPlwiOlwiXCIpKSxvXX07Y2xhc3MgTntjb25zdHJ1Y3Rvcih7c3RyaW5nczp0LF8kbGl0VHlwZSQ6c30sbil7bGV0IHI7dGhpcy5wYXJ0cz1bXTtsZXQgYz0wLGE9MDtjb25zdCB1PXQubGVuZ3RoLTEsZD10aGlzLnBhcnRzLFtmLHZdPVYodCxzKTtpZih0aGlzLmVsPU4uY3JlYXRlRWxlbWVudChmLG4pLEMuY3VycmVudE5vZGU9dGhpcy5lbC5jb250ZW50LDI9PT1zfHwzPT09cyl7Y29uc3QgdD10aGlzLmVsLmNvbnRlbnQuZmlyc3RDaGlsZDt0LnJlcGxhY2VXaXRoKC4uLnQuY2hpbGROb2Rlcyl9Zm9yKDtudWxsIT09KHI9Qy5uZXh0Tm9kZSgpKSYmZC5sZW5ndGg8dTspe2lmKDE9PT1yLm5vZGVUeXBlKXtpZihyLmhhc0F0dHJpYnV0ZXMoKSlmb3IoY29uc3QgdCBvZiByLmdldEF0dHJpYnV0ZU5hbWVzKCkpaWYodC5lbmRzV2l0aChlKSl7Y29uc3QgaT12W2ErK10scz1yLmdldEF0dHJpYnV0ZSh0KS5zcGxpdChoKSxlPS8oWy4/QF0pPyguKikvLmV4ZWMoaSk7ZC5wdXNoKHt0eXBlOjEsaW5kZXg6YyxuYW1lOmVbMl0sc3RyaW5nczpzLGN0b3I6XCIuXCI9PT1lWzFdP0g6XCI/XCI9PT1lWzFdP0k6XCJAXCI9PT1lWzFdP0w6a30pLHIucmVtb3ZlQXR0cmlidXRlKHQpfWVsc2UgdC5zdGFydHNXaXRoKGgpJiYoZC5wdXNoKHt0eXBlOjYsaW5kZXg6Y30pLHIucmVtb3ZlQXR0cmlidXRlKHQpKTtpZigkLnRlc3Qoci50YWdOYW1lKSl7Y29uc3QgdD1yLnRleHRDb250ZW50LnNwbGl0KGgpLHM9dC5sZW5ndGgtMTtpZihzPjApe3IudGV4dENvbnRlbnQ9aT9pLmVtcHR5U2NyaXB0OlwiXCI7Zm9yKGxldCBpPTA7aTxzO2krKylyLmFwcGVuZCh0W2ldLGwoKSksQy5uZXh0Tm9kZSgpLGQucHVzaCh7dHlwZToyLGluZGV4OisrY30pO3IuYXBwZW5kKHRbc10sbCgpKX19fWVsc2UgaWYoOD09PXIubm9kZVR5cGUpaWYoci5kYXRhPT09bylkLnB1c2goe3R5cGU6MixpbmRleDpjfSk7ZWxzZXtsZXQgdD0tMTtmb3IoOy0xIT09KHQ9ci5kYXRhLmluZGV4T2YoaCx0KzEpKTspZC5wdXNoKHt0eXBlOjcsaW5kZXg6Y30pLHQrPWgubGVuZ3RoLTF9YysrfX1zdGF0aWMgY3JlYXRlRWxlbWVudCh0LGkpe2NvbnN0IHM9ci5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cmV0dXJuIHMuaW5uZXJIVE1MPXQsc319ZnVuY3Rpb24gUyh0LGkscz10LGUpe2lmKGk9PT1UKXJldHVybiBpO2xldCBoPXZvaWQgMCE9PWU/cy5fJENvPy5bZV06cy5fJENsO2NvbnN0IG89YyhpKT92b2lkIDA6aS5fJGxpdERpcmVjdGl2ZSQ7cmV0dXJuIGg/LmNvbnN0cnVjdG9yIT09byYmKGg/Ll8kQU8/LighMSksdm9pZCAwPT09bz9oPXZvaWQgMDooaD1uZXcgbyh0KSxoLl8kQVQodCxzLGUpKSx2b2lkIDAhPT1lPyhzLl8kQ28/Pz1bXSlbZV09aDpzLl8kQ2w9aCksdm9pZCAwIT09aCYmKGk9Uyh0LGguXyRBUyh0LGkudmFsdWVzKSxoLGUpKSxpfWNsYXNzIE17Y29uc3RydWN0b3IodCxpKXt0aGlzLl8kQVY9W10sdGhpcy5fJEFOPXZvaWQgMCx0aGlzLl8kQUQ9dCx0aGlzLl8kQU09aX1nZXQgcGFyZW50Tm9kZSgpe3JldHVybiB0aGlzLl8kQU0ucGFyZW50Tm9kZX1nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX11KHQpe2NvbnN0e2VsOntjb250ZW50Oml9LHBhcnRzOnN9PXRoaXMuXyRBRCxlPSh0Py5jcmVhdGlvblNjb3BlPz9yKS5pbXBvcnROb2RlKGksITApO0MuY3VycmVudE5vZGU9ZTtsZXQgaD1DLm5leHROb2RlKCksbz0wLG49MCxsPXNbMF07Zm9yKDt2b2lkIDAhPT1sOyl7aWYobz09PWwuaW5kZXgpe2xldCBpOzI9PT1sLnR5cGU/aT1uZXcgUihoLGgubmV4dFNpYmxpbmcsdGhpcyx0KToxPT09bC50eXBlP2k9bmV3IGwuY3RvcihoLGwubmFtZSxsLnN0cmluZ3MsdGhpcyx0KTo2PT09bC50eXBlJiYoaT1uZXcgeihoLHRoaXMsdCkpLHRoaXMuXyRBVi5wdXNoKGkpLGw9c1srK25dfW8hPT1sPy5pbmRleCYmKGg9Qy5uZXh0Tm9kZSgpLG8rKyl9cmV0dXJuIEMuY3VycmVudE5vZGU9cixlfXAodCl7bGV0IGk9MDtmb3IoY29uc3QgcyBvZiB0aGlzLl8kQVYpdm9pZCAwIT09cyYmKHZvaWQgMCE9PXMuc3RyaW5ncz8ocy5fJEFJKHQscyxpKSxpKz1zLnN0cmluZ3MubGVuZ3RoLTIpOnMuXyRBSSh0W2ldKSksaSsrfX1jbGFzcyBSe2dldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTT8uXyRBVT8/dGhpcy5fJEN2fWNvbnN0cnVjdG9yKHQsaSxzLGUpe3RoaXMudHlwZT0yLHRoaXMuXyRBSD1FLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFBPXQsdGhpcy5fJEFCPWksdGhpcy5fJEFNPXMsdGhpcy5vcHRpb25zPWUsdGhpcy5fJEN2PWU/LmlzQ29ubmVjdGVkPz8hMH1nZXQgcGFyZW50Tm9kZSgpe2xldCB0PXRoaXMuXyRBQS5wYXJlbnROb2RlO2NvbnN0IGk9dGhpcy5fJEFNO3JldHVybiB2b2lkIDAhPT1pJiYxMT09PXQ/Lm5vZGVUeXBlJiYodD1pLnBhcmVudE5vZGUpLHR9Z2V0IHN0YXJ0Tm9kZSgpe3JldHVybiB0aGlzLl8kQUF9Z2V0IGVuZE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFCfV8kQUkodCxpPXRoaXMpe3Q9Uyh0aGlzLHQsaSksYyh0KT90PT09RXx8bnVsbD09dHx8XCJcIj09PXQ/KHRoaXMuXyRBSCE9PUUmJnRoaXMuXyRBUigpLHRoaXMuXyRBSD1FKTp0IT09dGhpcy5fJEFIJiZ0IT09VCYmdGhpcy5fKHQpOnZvaWQgMCE9PXQuXyRsaXRUeXBlJD90aGlzLiQodCk6dm9pZCAwIT09dC5ub2RlVHlwZT90aGlzLlQodCk6dSh0KT90aGlzLmsodCk6dGhpcy5fKHQpfU8odCl7cmV0dXJuIHRoaXMuXyRBQS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LHRoaXMuXyRBQil9VCh0KXt0aGlzLl8kQUghPT10JiYodGhpcy5fJEFSKCksdGhpcy5fJEFIPXRoaXMuTyh0KSl9Xyh0KXt0aGlzLl8kQUghPT1FJiZjKHRoaXMuXyRBSCk/dGhpcy5fJEFBLm5leHRTaWJsaW5nLmRhdGE9dDp0aGlzLlQoci5jcmVhdGVUZXh0Tm9kZSh0KSksdGhpcy5fJEFIPXR9JCh0KXtjb25zdHt2YWx1ZXM6aSxfJGxpdFR5cGUkOnN9PXQsZT1cIm51bWJlclwiPT10eXBlb2Ygcz90aGlzLl8kQUModCk6KHZvaWQgMD09PXMuZWwmJihzLmVsPU4uY3JlYXRlRWxlbWVudChQKHMuaCxzLmhbMF0pLHRoaXMub3B0aW9ucykpLHMpO2lmKHRoaXMuXyRBSD8uXyRBRD09PWUpdGhpcy5fJEFILnAoaSk7ZWxzZXtjb25zdCB0PW5ldyBNKGUsdGhpcykscz10LnUodGhpcy5vcHRpb25zKTt0LnAoaSksdGhpcy5UKHMpLHRoaXMuXyRBSD10fX1fJEFDKHQpe2xldCBpPUEuZ2V0KHQuc3RyaW5ncyk7cmV0dXJuIHZvaWQgMD09PWkmJkEuc2V0KHQuc3RyaW5ncyxpPW5ldyBOKHQpKSxpfWsodCl7YSh0aGlzLl8kQUgpfHwodGhpcy5fJEFIPVtdLHRoaXMuXyRBUigpKTtjb25zdCBpPXRoaXMuXyRBSDtsZXQgcyxlPTA7Zm9yKGNvbnN0IGggb2YgdCllPT09aS5sZW5ndGg/aS5wdXNoKHM9bmV3IFIodGhpcy5PKGwoKSksdGhpcy5PKGwoKSksdGhpcyx0aGlzLm9wdGlvbnMpKTpzPWlbZV0scy5fJEFJKGgpLGUrKztlPGkubGVuZ3RoJiYodGhpcy5fJEFSKHMmJnMuXyRBQi5uZXh0U2libGluZyxlKSxpLmxlbmd0aD1lKX1fJEFSKHQ9dGhpcy5fJEFBLm5leHRTaWJsaW5nLGkpe2Zvcih0aGlzLl8kQVA/LighMSwhMCxpKTt0IT09dGhpcy5fJEFCOyl7Y29uc3QgaT10Lm5leHRTaWJsaW5nO3QucmVtb3ZlKCksdD1pfX1zZXRDb25uZWN0ZWQodCl7dm9pZCAwPT09dGhpcy5fJEFNJiYodGhpcy5fJEN2PXQsdGhpcy5fJEFQPy4odCkpfX1jbGFzcyBre2dldCB0YWdOYW1lKCl7cmV0dXJuIHRoaXMuZWxlbWVudC50YWdOYW1lfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfWNvbnN0cnVjdG9yKHQsaSxzLGUsaCl7dGhpcy50eXBlPTEsdGhpcy5fJEFIPUUsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLmVsZW1lbnQ9dCx0aGlzLm5hbWU9aSx0aGlzLl8kQU09ZSx0aGlzLm9wdGlvbnM9aCxzLmxlbmd0aD4yfHxcIlwiIT09c1swXXx8XCJcIiE9PXNbMV0/KHRoaXMuXyRBSD1BcnJheShzLmxlbmd0aC0xKS5maWxsKG5ldyBTdHJpbmcpLHRoaXMuc3RyaW5ncz1zKTp0aGlzLl8kQUg9RX1fJEFJKHQsaT10aGlzLHMsZSl7Y29uc3QgaD10aGlzLnN0cmluZ3M7bGV0IG89ITE7aWYodm9pZCAwPT09aCl0PVModGhpcyx0LGksMCksbz0hYyh0KXx8dCE9PXRoaXMuXyRBSCYmdCE9PVQsbyYmKHRoaXMuXyRBSD10KTtlbHNle2NvbnN0IGU9dDtsZXQgbixyO2Zvcih0PWhbMF0sbj0wO248aC5sZW5ndGgtMTtuKyspcj1TKHRoaXMsZVtzK25dLGksbikscj09PVQmJihyPXRoaXMuXyRBSFtuXSksb3x8PSFjKHIpfHxyIT09dGhpcy5fJEFIW25dLHI9PT1FP3Q9RTp0IT09RSYmKHQrPShyPz9cIlwiKStoW24rMV0pLHRoaXMuXyRBSFtuXT1yfW8mJiFlJiZ0aGlzLmoodCl9aih0KXt0PT09RT90aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSk6dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsdD8/XCJcIil9fWNsYXNzIEggZXh0ZW5kcyBre2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnR5cGU9M31qKHQpe3RoaXMuZWxlbWVudFt0aGlzLm5hbWVdPXQ9PT1FP3ZvaWQgMDp0fX1jbGFzcyBJIGV4dGVuZHMga3tjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy50eXBlPTR9aih0KXt0aGlzLmVsZW1lbnQudG9nZ2xlQXR0cmlidXRlKHRoaXMubmFtZSwhIXQmJnQhPT1FKX19Y2xhc3MgTCBleHRlbmRzIGt7Y29uc3RydWN0b3IodCxpLHMsZSxoKXtzdXBlcih0LGkscyxlLGgpLHRoaXMudHlwZT01fV8kQUkodCxpPXRoaXMpe2lmKCh0PVModGhpcyx0LGksMCk/P0UpPT09VClyZXR1cm47Y29uc3Qgcz10aGlzLl8kQUgsZT10PT09RSYmcyE9PUV8fHQuY2FwdHVyZSE9PXMuY2FwdHVyZXx8dC5vbmNlIT09cy5vbmNlfHx0LnBhc3NpdmUhPT1zLnBhc3NpdmUsaD10IT09RSYmKHM9PT1FfHxlKTtlJiZ0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWUsdGhpcyxzKSxoJiZ0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm5hbWUsdGhpcyx0KSx0aGlzLl8kQUg9dH1oYW5kbGVFdmVudCh0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLl8kQUg/dGhpcy5fJEFILmNhbGwodGhpcy5vcHRpb25zPy5ob3N0Pz90aGlzLmVsZW1lbnQsdCk6dGhpcy5fJEFILmhhbmRsZUV2ZW50KHQpfX1jbGFzcyB6e2NvbnN0cnVjdG9yKHQsaSxzKXt0aGlzLmVsZW1lbnQ9dCx0aGlzLnR5cGU9Nix0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBTT1pLHRoaXMub3B0aW9ucz1zfWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfV8kQUkodCl7Uyh0aGlzLHQpfX1jb25zdCBaPXtNOmUsUDpoLEE6byxDOjEsTDpWLFI6TSxEOnUsVjpTLEk6UixIOmssTjpJLFU6TCxCOkgsRjp6fSxqPXQubGl0SHRtbFBvbHlmaWxsU3VwcG9ydDtqPy4oTixSKSwodC5saXRIdG1sVmVyc2lvbnM/Pz1bXSkucHVzaChcIjMuMy4xXCIpO2NvbnN0IEI9KHQsaSxzKT0+e2NvbnN0IGU9cz8ucmVuZGVyQmVmb3JlPz9pO2xldCBoPWUuXyRsaXRQYXJ0JDtpZih2b2lkIDA9PT1oKXtjb25zdCB0PXM/LnJlbmRlckJlZm9yZT8/bnVsbDtlLl8kbGl0UGFydCQ9aD1uZXcgUihpLmluc2VydEJlZm9yZShsKCksdCksdCx2b2lkIDAscz8/e30pfXJldHVybiBoLl8kQUkodCksaH07ZXhwb3J0e1ogYXMgXyRMSCx4IGFzIGh0bWwsdyBhcyBtYXRobWwsVCBhcyBub0NoYW5nZSxFIGFzIG5vdGhpbmcsQiBhcyByZW5kZXIsYiBhcyBzdmd9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWh0bWwuanMubWFwXG4iLCJpbXBvcnR7UmVhY3RpdmVFbGVtZW50IGFzIHR9ZnJvbVwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50XCI7ZXhwb3J0KmZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiO2ltcG9ydHtyZW5kZXIgYXMgZSxub0NoYW5nZSBhcyByfWZyb21cImxpdC1odG1sXCI7ZXhwb3J0KmZyb21cImxpdC1odG1sXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9jb25zdCBzPWdsb2JhbFRoaXM7Y2xhc3MgaSBleHRlbmRzIHR7Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMucmVuZGVyT3B0aW9ucz17aG9zdDp0aGlzfSx0aGlzLl8kRG89dm9pZCAwfWNyZWF0ZVJlbmRlclJvb3QoKXtjb25zdCB0PXN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtyZXR1cm4gdGhpcy5yZW5kZXJPcHRpb25zLnJlbmRlckJlZm9yZT8/PXQuZmlyc3RDaGlsZCx0fXVwZGF0ZSh0KXtjb25zdCByPXRoaXMucmVuZGVyKCk7dGhpcy5oYXNVcGRhdGVkfHwodGhpcy5yZW5kZXJPcHRpb25zLmlzQ29ubmVjdGVkPXRoaXMuaXNDb25uZWN0ZWQpLHN1cGVyLnVwZGF0ZSh0KSx0aGlzLl8kRG89ZShyLHRoaXMucmVuZGVyUm9vdCx0aGlzLnJlbmRlck9wdGlvbnMpfWNvbm5lY3RlZENhbGxiYWNrKCl7c3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKSx0aGlzLl8kRG8/LnNldENvbm5lY3RlZCghMCl9ZGlzY29ubmVjdGVkQ2FsbGJhY2soKXtzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpLHRoaXMuXyREbz8uc2V0Q29ubmVjdGVkKCExKX1yZW5kZXIoKXtyZXR1cm4gcn19aS5fJGxpdEVsZW1lbnQkPSEwLGlbXCJmaW5hbGl6ZWRcIl09ITAscy5saXRFbGVtZW50SHlkcmF0ZVN1cHBvcnQ/Lih7TGl0RWxlbWVudDppfSk7Y29uc3Qgbz1zLmxpdEVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQ7bz8uKHtMaXRFbGVtZW50Oml9KTtjb25zdCBuPXtfJEFLOih0LGUscik9Pnt0Ll8kQUsoZSxyKX0sXyRBTDp0PT50Ll8kQUx9OyhzLmxpdEVsZW1lbnRWZXJzaW9ucz8/PVtdKS5wdXNoKFwiNC4yLjFcIik7ZXhwb3J0e2kgYXMgTGl0RWxlbWVudCxuIGFzIF8kTEV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWVsZW1lbnQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IHQ9dD0+KGUsbyk9Pnt2b2lkIDAhPT1vP28uYWRkSW5pdGlhbGl6ZXIoKCgpPT57Y3VzdG9tRWxlbWVudHMuZGVmaW5lKHQsZSl9KSk6Y3VzdG9tRWxlbWVudHMuZGVmaW5lKHQsZSl9O2V4cG9ydHt0IGFzIGN1c3RvbUVsZW1lbnR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VzdG9tLWVsZW1lbnQuanMubWFwXG4iLCJpbXBvcnR7ZGVmYXVsdENvbnZlcnRlciBhcyB0LG5vdEVxdWFsIGFzIGV9ZnJvbVwiLi4vcmVhY3RpdmUtZWxlbWVudC5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovY29uc3Qgbz17YXR0cmlidXRlOiEwLHR5cGU6U3RyaW5nLGNvbnZlcnRlcjp0LHJlZmxlY3Q6ITEsaGFzQ2hhbmdlZDplfSxyPSh0PW8sZSxyKT0+e2NvbnN0e2tpbmQ6bixtZXRhZGF0YTppfT1yO2xldCBzPWdsb2JhbFRoaXMubGl0UHJvcGVydHlNZXRhZGF0YS5nZXQoaSk7aWYodm9pZCAwPT09cyYmZ2xvYmFsVGhpcy5saXRQcm9wZXJ0eU1ldGFkYXRhLnNldChpLHM9bmV3IE1hcCksXCJzZXR0ZXJcIj09PW4mJigodD1PYmplY3QuY3JlYXRlKHQpKS53cmFwcGVkPSEwKSxzLnNldChyLm5hbWUsdCksXCJhY2Nlc3NvclwiPT09bil7Y29uc3R7bmFtZTpvfT1yO3JldHVybntzZXQocil7Y29uc3Qgbj1lLmdldC5jYWxsKHRoaXMpO2Uuc2V0LmNhbGwodGhpcyxyKSx0aGlzLnJlcXVlc3RVcGRhdGUobyxuLHQpfSxpbml0KGUpe3JldHVybiB2b2lkIDAhPT1lJiZ0aGlzLkMobyx2b2lkIDAsdCxlKSxlfX19aWYoXCJzZXR0ZXJcIj09PW4pe2NvbnN0e25hbWU6b309cjtyZXR1cm4gZnVuY3Rpb24ocil7Y29uc3Qgbj10aGlzW29dO2UuY2FsbCh0aGlzLHIpLHRoaXMucmVxdWVzdFVwZGF0ZShvLG4sdCl9fXRocm93IEVycm9yKFwiVW5zdXBwb3J0ZWQgZGVjb3JhdG9yIGxvY2F0aW9uOiBcIituKX07ZnVuY3Rpb24gbih0KXtyZXR1cm4oZSxvKT0+XCJvYmplY3RcIj09dHlwZW9mIG8/cih0LGUsbyk6KCh0LGUsbyk9Pntjb25zdCByPWUuaGFzT3duUHJvcGVydHkobyk7cmV0dXJuIGUuY29uc3RydWN0b3IuY3JlYXRlUHJvcGVydHkobyx0KSxyP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSxvKTp2b2lkIDB9KSh0LGUsbyl9ZXhwb3J0e24gYXMgcHJvcGVydHksciBhcyBzdGFuZGFyZFByb3BlcnR5fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnR5LmpzLm1hcFxuIiwiaW1wb3J0e3Byb3BlcnR5IGFzIHR9ZnJvbVwiLi9wcm9wZXJ0eS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovZnVuY3Rpb24gcihyKXtyZXR1cm4gdCh7Li4ucixzdGF0ZTohMCxhdHRyaWJ1dGU6ITF9KX1leHBvcnR7ciBhcyBzdGF0ZX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXBcbiIsImltcG9ydCB0eXBlIHsgVGltZWRlbHRhLCBMZWcsIExlZ1N0YXRpb24sIFRpbWVzdGFtcCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUVxdWFsczxUPihhcnIxOiBUW10sIGFycjI6IFRbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gYXJyMS5sZW5ndGggPT09IGFycjIubGVuZ3RoICYmIGFycjEuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFycjJbaV0pO1xufVxuXG5leHBvcnQgY29uc3QgY2FsY0RlbGF5ID0gKHRkOiBUaW1lZGVsdGEpOiBudW1iZXIgPT4ge1xuICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGQuc3BsaXQoXCI6XCIsIDMpO1xuICByZXR1cm4gK2hvdXJzICogNjAgKyArbWludXRlcztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdGFydCA9IChsZWc6IExlZyk6IExlZ1N0YXRpb24gPT4gKHtcbiAgc2NoZWR1bGVkOiBsZWcuZGVwYXJ0dXJlLFxuICBkZWxheTogY2FsY0RlbGF5KGxlZy5kZWxheSksXG4gIHBsYXRmb3JtOiBsZWcucGxhdGZvcm0sXG4gIHN0YXRpb25OYW1lOiBsZWcub3JpZ2luLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRFbmQgPSAobGVnOiBMZWcpOiBMZWdTdGF0aW9uID0+ICh7XG4gIHNjaGVkdWxlZDogbGVnLmFycml2YWwsXG4gIGRlbGF5OiBjYWxjRGVsYXkobGVnLmRlbGF5X2Fycml2YWwpLFxuICBwbGF0Zm9ybTogbGVnLnBsYXRmb3JtX2Fycml2YWwsXG4gIHN0YXRpb25OYW1lOiBsZWcuZGVzdGluYXRpb24sXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNUaW1lU3RhbXBEZWx0YU1pbnMoYTogVGltZXN0YW1wLCBiOiBUaW1lc3RhbXApOiBudW1iZXIge1xuICBjb25zdCBhRCA9IG5ldyBEYXRlKGEpO1xuICBjb25zdCBiRCA9IG5ldyBEYXRlKGIpO1xuXG4gIGNvbnN0IG1zRGlmZiA9IE1hdGguYWJzKCthRCAtICtiRCk7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zRGlmZiAvIDEwMDAgLyA2MCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5zVG9GaXJzdExlZyhub3c6IG51bWJlciwgZmlyc3RMZWc6IExlZykge1xuICBjb25zdCBkZWxheSA9IGNhbGNEZWxheShmaXJzdExlZy5kZWxheSk7XG4gIGNvbnN0IGluTXMgPSArbmV3IERhdGUoZmlyc3RMZWcuZGVwYXJ0dXJlKSAtICtub3c7XG4gIGNvbnN0IGluTWlucyA9IE1hdGgucm91bmQoaW5NcyAvIDEwMDAgLyA2MCkgKyBkZWxheTtcbiAgcmV0dXJuIGluTWlucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NMZWdzKFxuICBsZWdzOiBMZWdbXSxcbiAgb3JpZ2luTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBkZXN0aW5hdGlvbk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogTGVnW10ge1xuICBsZXQgcHJvY2Vzc2VkID0gZmlsdGVyUGxhdGZvcm1DaGFuZ2UobGVncyk7XG4gIHByb2Nlc3NlZCA9IHdhbGtUb1BsYXRmb3JtKHByb2Nlc3NlZCk7XG4gIHByb2Nlc3NlZCA9IHByb2Nlc3NTaG9ydEluaXRpYWxXYWxrKHByb2Nlc3NlZCwgb3JpZ2luTmFtZSk7XG4gIHByb2Nlc3NlZCA9IHByb2Nlc3NTaG9ydEZpbmFsV2Fsayhwcm9jZXNzZWQsIGRlc3RpbmF0aW9uTmFtZSk7XG4gIHJldHVybiBwcm9jZXNzZWQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTaG9ydEluaXRpYWxXYWxrKFxuICBsZWdzOiBMZWdbXSxcbiAgb3JpZ2luTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBMZWdbXSB7XG4gIGNvbnN0IE1BWF9EVVJBVElPTl9NSU5TID0gMztcbiAgY29uc3QgcG9wRm4gPSAodnM6IExlZ1tdKSA9PiB2cy5zbGljZSgxKTtcbiAgcmV0dXJuIHByb2Nlc3NTaG9ydFdhbGsoXG4gICAgbGVncyxcbiAgICBsZWdzWzBdLFxuICAgIE1BWF9EVVJBVElPTl9NSU5TLFxuICAgIHBvcEZuLFxuICAgIFwib3JpZ2luXCIsXG4gICAgb3JpZ2luTmFtZVxuICApO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2hvcnRGaW5hbFdhbGsoXG4gIGxlZ3M6IExlZ1tdLFxuICBkZXN0aW5hdGlvbk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogTGVnW10ge1xuICBjb25zdCBNQVhfRFVSQVRJT05fTUlOUyA9IDU7XG4gIGNvbnN0IHBvcEZuID0gKHZzOiBMZWdbXSkgPT4gdnMuc2xpY2UoMCwgLTEpO1xuICByZXR1cm4gcHJvY2Vzc1Nob3J0V2FsayhcbiAgICBsZWdzLFxuICAgIGxlZ3NbbGVncy5sZW5ndGggLSAxXSxcbiAgICBNQVhfRFVSQVRJT05fTUlOUyxcbiAgICBwb3BGbixcbiAgICBcImRlc3RpbmF0aW9uXCIsXG4gICAgZGVzdGluYXRpb25OYW1lXG4gICk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTaG9ydFdhbGsoXG4gIGxlZ3M6IExlZ1tdLFxuICBsZWc6IExlZyB8IHVuZGVmaW5lZCxcbiAgbWF4RHVyYXRpb246IG51bWJlcixcbiAgcG9wRm46IChsczogTGVnW10pID0+IExlZ1tdLFxuICByZW5hbWVUYXJnZXQ6IFwib3JpZ2luXCIgfCBcImRlc3RpbmF0aW9uXCIsXG4gIHVzZXJEZWZpbmVkTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBMZWdbXSB7XG4gIGlmIChsZWdzLmxlbmd0aCA9PT0gMCB8fCAhbGVnIHx8IGxlZy5tb2RlICE9PSBcIndhbGtpbmdcIikgcmV0dXJuIGxlZ3M7XG5cbiAgY29uc3QgZHVyYXRpb24gPSBjYWxjVGltZVN0YW1wRGVsdGFNaW5zKGxlZy5kZXBhcnR1cmUsIGxlZy5hcnJpdmFsKTtcbiAgaWYgKGR1cmF0aW9uID4gbWF4RHVyYXRpb24pIHtcbiAgICAvLyB3ZSB3b250IHJlbW92ZSB0aGlzIGxlZywgY2FuIHdlIHJlcGxhY2UgaXRzIG5hbWU/XG4gICAgaWYgKHVzZXJEZWZpbmVkTmFtZSkgbGVnW3JlbmFtZVRhcmdldF0gPSB1c2VyRGVmaW5lZE5hbWU7XG4gICAgcmV0dXJuIGxlZ3M7XG4gIH1cblxuICByZXR1cm4gcG9wRm4obGVncyk7XG59XG5cbi8vIFBsYXRmb3JtIGNoYW5nZXMgKGkuZS4gYXQgdGhlIHNhbWUgc3RhdGlvbikgYXJlIG5vdCBcInJlYWxcIiB3YWxraW5nIGxlZ3NcbmZ1bmN0aW9uIGZpbHRlclBsYXRmb3JtQ2hhbmdlKGxlZ3M6IExlZ1tdKTogTGVnW10ge1xuICByZXR1cm4gbGVncy5maWx0ZXIoXG4gICAgKGxlZykgPT4gIShsZWcubW9kZSA9PT0gXCJ3YWxraW5nXCIgJiYgbGVnLmRlc3RpbmF0aW9uID09PSBsZWcub3JpZ2luKVxuICApO1xufVxuXG4vLyBXYWxraW5nIGxlZ3MgaGF2ZSB0aGVpciBvd24gb3JpZ2luL2Rlc3RpbmF0aW9uLFxuLy8gaW5zdGVhZCB1c2UgdGhlIHByZXZpb3VzIGxlZydzIGRlc3RpbmF0aW9uIGFzIG9yaWdpblxuLy8gYW5kIG5leHQgbGVnJ3Mgb3JpZ2luIGFzIGRlc3RpbmF0aW9uXG5mdW5jdGlvbiB3YWxrVG9QbGF0Zm9ybShsZWdzOiBMZWdbXSk6IExlZ1tdIHtcbiAgbGVncy5mb3JFYWNoKChsZWcsIGkpID0+IHtcbiAgICBpZiAobGVnLm1vZGUgIT09IFwid2Fsa2luZ1wiKSByZXR1cm47XG5cbiAgICBjb25zdCBwcmV2ID0gaSA+IDAgPyBsZWdzW2kgLSAxXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuZXh0ID0gaSArIDEgPCBsZWdzLmxlbmd0aCA/IGxlZ3NbaSArIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGxlZy5vcmlnaW4gPSBwcmV2LmRlc3RpbmF0aW9uO1xuICAgICAgbGVnLnBsYXRmb3JtID0gcHJldi5wbGF0Zm9ybV9hcnJpdmFsO1xuICAgIH1cbiAgICBpZiAobmV4dCkge1xuICAgICAgbGVnLmRlc3RpbmF0aW9uID0gbmV4dC5vcmlnaW47XG4gICAgICBsZWcucGxhdGZvcm1fYXJyaXZhbCA9IG5leHQucGxhdGZvcm07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxlZ3M7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBcIjxzdmcgd2lkdGg9XFxcIjE2XFxcIiBoZWlnaHQ9XFxcIjE5XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTMgMTZcXFwiIGZpbGw9XFxcIm5vbmVcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+XFxuPHBhdGggZD1cXFwiTTEuNjI1IDE2QzEuMzk0NzkgMTYgMS4yMDE4MiAxNS45MTkzIDEuMDQ2MDkgMTUuNzU3OUMwLjg5MDM2NSAxNS41OTY1IDAuODEyNSAxNS4zOTY1IDAuODEyNSAxNS4xNTc5VjEzLjQzMTZDMC41Njg3NSAxMy4xNTA5IDAuMzcyMzk2IDEyLjgzODYgMC4yMjM0MzcgMTIuNDk0N0MwLjA3NDQ3OTIgMTIuMTUwOSAwIDExLjc3NTQgMCAxMS4zNjg0VjMuMzY4NDJDMCAyLjIwMzUxIDAuNTIxMzU0IDEuMzUwODggMS41NjQwNiAwLjgxMDUyNkMyLjYwNjc3IDAuMjcwMTc1IDQuMjUyMDggMCA2LjUgMEM4LjgyOTE3IDAgMTAuNDk0OCAwLjI1OTY0OSAxMS40OTY5IDAuNzc4OTQ3QzEyLjQ5OSAxLjI5ODI1IDEzIDIuMTYxNCAxMyAzLjM2ODQyVjExLjM2ODRDMTMgMTEuNzc1NCAxMi45MjU1IDEyLjE1MDkgMTIuNzc2NiAxMi40OTQ3QzEyLjYyNzYgMTIuODM4NiAxMi40MzEyIDEzLjE1MDkgMTIuMTg3NSAxMy40MzE2VjE1LjE1NzlDMTIuMTg3NSAxNS4zOTY1IDEyLjEwOTYgMTUuNTk2NSAxMS45NTM5IDE1Ljc1NzlDMTEuNzk4MiAxNS45MTkzIDExLjYwNTIgMTYgMTEuMzc1IDE2SDEwLjU2MjVDMTAuMzMyMyAxNiAxMC4xMzkzIDE1LjkxOTMgOS45ODM1OSAxNS43NTc5QzkuODI3ODYgMTUuNTk2NSA5Ljc1IDE1LjM5NjUgOS43NSAxNS4xNTc5VjE0LjMxNThIMy4yNVYxNS4xNTc5QzMuMjUgMTUuMzk2NSAzLjE3MjE0IDE1LjU5NjUgMy4wMTY0MSAxNS43NTc5QzIuODYwNjggMTUuOTE5MyAyLjY2NzcxIDE2IDIuNDM3NSAxNkgxLjYyNVpNNi41NDA2MiAyLjUyNjMySDExLjA5MDZIMS45OTA2Mkg2LjU0MDYyWk05Ljc1IDguNDIxMDVIMS42MjVIMTEuMzc1SDkuNzVaTTEuNjI1IDYuNzM2ODRIMTEuMzc1VjQuMjEwNTNIMS42MjVWNi43MzY4NFpNMy42NTYyNSAxMS43ODk1QzMuOTk0NzkgMTEuNzg5NSA0LjI4MjU1IDExLjY2NjcgNC41MTk1MyAxMS40MjExQzQuNzU2NTEgMTEuMTc1NCA0Ljg3NSAxMC44NzcyIDQuODc1IDEwLjUyNjNDNC44NzUgMTAuMTc1NCA0Ljc1NjUxIDkuODc3MTkgNC41MTk1MyA5LjYzMTU4QzQuMjgyNTUgOS4zODU5NyAzLjk5NDc5IDkuMjYzMTYgMy42NTYyNSA5LjI2MzE2QzMuMzE3NzEgOS4yNjMxNiAzLjAyOTk1IDkuMzg1OTcgMi43OTI5NyA5LjYzMTU4QzIuNTU1OTkgOS44NzcxOSAyLjQzNzUgMTAuMTc1NCAyLjQzNzUgMTAuNTI2M0MyLjQzNzUgMTAuODc3MiAyLjU1NTk5IDExLjE3NTQgMi43OTI5NyAxMS40MjExQzMuMDI5OTUgMTEuNjY2NyAzLjMxNzcxIDExLjc4OTUgMy42NTYyNSAxMS43ODk1Wk05LjM0Mzc1IDExLjc4OTVDOS42ODIyOSAxMS43ODk1IDkuOTcwMDUgMTEuNjY2NyAxMC4yMDcgMTEuNDIxMUMxMC40NDQgMTEuMTc1NCAxMC41NjI1IDEwLjg3NzIgMTAuNTYyNSAxMC41MjYzQzEwLjU2MjUgMTAuMTc1NCAxMC40NDQgOS44NzcxOSAxMC4yMDcgOS42MzE1OEM5Ljk3MDA1IDkuMzg1OTcgOS42ODIyOSA5LjI2MzE2IDkuMzQzNzUgOS4yNjMxNkM5LjAwNTIxIDkuMjYzMTYgOC43MTc0NSA5LjM4NTk3IDguNDgwNDcgOS42MzE1OEM4LjI0MzQ5IDkuODc3MTkgOC4xMjUgMTAuMTc1NCA4LjEyNSAxMC41MjYzQzguMTI1IDEwLjg3NzIgOC4yNDM0OSAxMS4xNzU0IDguNDgwNDcgMTEuNDIxMUM4LjcxNzQ1IDExLjY2NjcgOS4wMDUyMSAxMS43ODk1IDkuMzQzNzUgMTEuNzg5NVpNMS45OTA2MiAyLjUyNjMySDExLjA5MDZDMTAuODg3NSAyLjI4NzcyIDEwLjQ1MDggMi4wODc3MiA5Ljc4MDQ3IDEuOTI2MzJDOS4xMTAxNiAxLjc2NDkxIDguMDMwMjEgMS42ODQyMSA2LjU0MDYyIDEuNjg0MjFDNS4wOTE2NyAxLjY4NDIxIDQuMDMyMDMgMS43NzE5MyAzLjM2MTcyIDEuOTQ3MzdDMi42OTE0MSAyLjEyMjgxIDIuMjM0MzggMi4zMTU3OSAxLjk5MDYyIDIuNTI2MzJaTTMuMjUgMTIuNjMxNkg5Ljc1QzEwLjE5NjkgMTIuNjMxNiAxMC41Nzk0IDEyLjQ2NjcgMTAuODk3NyAxMi4xMzY4QzExLjIxNTkgMTEuODA3IDExLjM3NSAxMS40MTA1IDExLjM3NSAxMC45NDc0VjguNDIxMDVIMS42MjVWMTAuOTQ3NEMxLjYyNSAxMS40MTA1IDEuNzg0MTEgMTEuODA3IDIuMTAyMzQgMTIuMTM2OEMyLjQyMDU3IDEyLjQ2NjcgMi44MDMxMiAxMi42MzE2IDMuMjUgMTIuNjMxNlpcXFwiIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIvPlxcbjwvc3ZnPlxcblwiIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3ZnIHdpZHRoPVxcXCIxNlxcXCIgaGVpZ2h0PVxcXCIxOVxcXCIgdmlld0JveD1cXFwiMCAwIDE2IDE5XFxcIiBmaWxsPVxcXCJub25lXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlxcbjxwYXRoIGQ9XFxcIk0wIDEzLjVWNEMwIDMuMTE2NjcgMC4yMjkxNjcgMi40MTI1IDAuNjg3NSAxLjg4NzVDMS4xNDU4MyAxLjM2MjUgMS43NSAwLjk2MjUgMi41IDAuNjg3NUMzLjI1IDAuNDEyNSA0LjEwNDE3IDAuMjI5MTY3IDUuMDYyNSAwLjEzNzVDNi4wMjA4MyAwLjA0NTgzMzMgNyAwIDggMEM5LjEgMCAxMC4xMzc1IDAuMDQ1ODMzMyAxMS4xMTI1IDAuMTM3NUMxMi4wODc1IDAuMjI5MTY3IDEyLjkzNzUgMC40MTI1IDEzLjY2MjUgMC42ODc1QzE0LjM4NzUgMC45NjI1IDE0Ljk1ODMgMS4zNjI1IDE1LjM3NSAxLjg4NzVDMTUuNzkxNyAyLjQxMjUgMTYgMy4xMTY2NyAxNiA0VjEzLjVDMTYgMTQuNDgzMyAxNS42NjI1IDE1LjMxMjUgMTQuOTg3NSAxNS45ODc1QzE0LjMxMjUgMTYuNjYyNSAxMy40ODMzIDE3IDEyLjUgMTdMMTQgMTguNVYxOUgxMkwxMCAxN0g2TDQgMTlIMlYxOC41TDMuNSAxN0MyLjUxNjY3IDE3IDEuNjg3NSAxNi42NjI1IDEuMDEyNSAxNS45ODc1QzAuMzM3NSAxNS4zMTI1IDAgMTQuNDgzMyAwIDEzLjVaTTggMkM2LjIzMzMzIDIgNC45NDE2NyAyLjEwNDE3IDQuMTI1IDIuMzEyNUMzLjMwODMzIDIuNTIwODMgMi43NSAyLjc1IDIuNDUgM0gxMy42NUMxMy40IDIuNzE2NjcgMTIuODYyNSAyLjQ3OTE3IDEyLjAzNzUgMi4yODc1QzExLjIxMjUgMi4wOTU4MyA5Ljg2NjY3IDIgOCAyWk0yIDhIN1Y1SDJWOFpNMTIuNSAxMEgySDE0SDEyLjVaTTkgOEgxNFY1SDlWOFpNNC41IDE0QzQuOTMzMzMgMTQgNS4yOTE2NyAxMy44NTgzIDUuNTc1IDEzLjU3NUM1Ljg1ODMzIDEzLjI5MTcgNiAxMi45MzMzIDYgMTIuNUM2IDEyLjA2NjcgNS44NTgzMyAxMS43MDgzIDUuNTc1IDExLjQyNUM1LjI5MTY3IDExLjE0MTcgNC45MzMzMyAxMSA0LjUgMTFDNC4wNjY2NyAxMSAzLjcwODMzIDExLjE0MTcgMy40MjUgMTEuNDI1QzMuMTQxNjcgMTEuNzA4MyAzIDEyLjA2NjcgMyAxMi41QzMgMTIuOTMzMyAzLjE0MTY3IDEzLjI5MTcgMy40MjUgMTMuNTc1QzMuNzA4MzMgMTMuODU4MyA0LjA2NjY3IDE0IDQuNSAxNFpNMTEuNSAxNEMxMS45MzMzIDE0IDEyLjI5MTcgMTMuODU4MyAxMi41NzUgMTMuNTc1QzEyLjg1ODMgMTMuMjkxNyAxMyAxMi45MzMzIDEzIDEyLjVDMTMgMTIuMDY2NyAxMi44NTgzIDExLjcwODMgMTIuNTc1IDExLjQyNUMxMi4yOTE3IDExLjE0MTcgMTEuOTMzMyAxMSAxMS41IDExQzExLjA2NjcgMTEgMTAuNzA4MyAxMS4xNDE3IDEwLjQyNSAxMS40MjVDMTAuMTQxNyAxMS43MDgzIDEwIDEyLjA2NjcgMTAgMTIuNUMxMCAxMi45MzMzIDEwLjE0MTcgMTMuMjkxNyAxMC40MjUgMTMuNTc1QzEwLjcwODMgMTMuODU4MyAxMS4wNjY3IDE0IDExLjUgMTRaTTMuNSAxNUgxMi41QzEyLjkzMzMgMTUgMTMuMjkxNyAxNC44NTgzIDEzLjU3NSAxNC41NzVDMTMuODU4MyAxNC4yOTE3IDE0IDEzLjkzMzMgMTQgMTMuNVYxMEgyVjEzLjVDMiAxMy45MzMzIDIuMTQxNjcgMTQuMjkxNyAyLjQyNSAxNC41NzVDMi43MDgzMyAxNC44NTgzIDMuMDY2NjcgMTUgMy41IDE1Wk04IDNIMTMuNjVIMi40NUg4WlxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIi8+XFxuPC9zdmc+XFxuXCIiLCJleHBvcnQgZGVmYXVsdCBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiBoZWlnaHQ9XFxcIjIxXFxcIiB2aWV3Qm94PVxcXCIwIC05NjAgOTYwIDk2MFxcXCIgd2lkdGg9XFxcIjIyXFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiPjxwYXRoIGQ9XFxcIm0yODAtNDAgMTEyLTU2NC03MiAyOHYxMzZoLTgwdi0xODhsMjAyLTg2cTE0LTYgMjkuNS03dDI5LjUgNHExNCA1IDI2LjUgMTR0MjAuNSAyM2w0MCA2NHEyNiA0MiA3MC41IDY5VDc2MC01MjB2ODBxLTcwIDAtMTI1LTI5dC05NC03NGwtMjUgMTIzIDg0IDgwdjMwMGgtODB2LTI2MGwtODQtNjQtNzIgMzI0aC04NFptMjYwLTcwMHEtMzMgMC01Ni41LTIzLjVUNDYwLTgyMHEwLTMzIDIzLjUtNTYuNVQ1NDAtOTAwcTMzIDAgNTYuNSAyMy41VDYyMC04MjBxMCAzMy0yMy41IDU2LjVUNTQwLTc0MFpcXFwiLz48L3N2XCIiLCJleHBvcnQgZGVmYXVsdCBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiPjxwYXRoIGQ9XFxcIk0yMywxMkgxN1YxMEwyMC4zOSw2SDE3VjRIMjNWNkwxOS42MiwxMEgyM1YxMk0xNSwxNkg5VjE0TDEyLjM5LDEwSDlWOEgxNVYxMEwxMS42MiwxNEgxNVYxNk03LDIwSDFWMThMNC4zOSwxNEgxVjEySDdWMTRMMy42MiwxOEg3VjIwWlxcXCIgLz48L3N2Zz5cIiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuY29uc3QgdD17QVRUUklCVVRFOjEsQ0hJTEQ6MixQUk9QRVJUWTozLEJPT0xFQU5fQVRUUklCVVRFOjQsRVZFTlQ6NSxFTEVNRU5UOjZ9LGU9dD0+KC4uLmUpPT4oe18kbGl0RGlyZWN0aXZlJDp0LHZhbHVlczplfSk7Y2xhc3MgaXtjb25zdHJ1Y3Rvcih0KXt9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9XyRBVCh0LGUsaSl7dGhpcy5fJEN0PXQsdGhpcy5fJEFNPWUsdGhpcy5fJENpPWl9XyRBUyh0LGUpe3JldHVybiB0aGlzLnVwZGF0ZSh0LGUpfXVwZGF0ZSh0LGUpe3JldHVybiB0aGlzLnJlbmRlciguLi5lKX19ZXhwb3J0e2kgYXMgRGlyZWN0aXZlLHQgYXMgUGFydFR5cGUsZSBhcyBkaXJlY3RpdmV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlyZWN0aXZlLmpzLm1hcFxuIiwiaW1wb3J0e25vdGhpbmcgYXMgdCxub0NoYW5nZSBhcyBpfWZyb21cIi4uL2xpdC1odG1sLmpzXCI7aW1wb3J0e0RpcmVjdGl2ZSBhcyByLFBhcnRUeXBlIGFzIHMsZGlyZWN0aXZlIGFzIG59ZnJvbVwiLi4vZGlyZWN0aXZlLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9jbGFzcyBlIGV4dGVuZHMgcntjb25zdHJ1Y3RvcihpKXtpZihzdXBlcihpKSx0aGlzLml0PXQsaS50eXBlIT09cy5DSElMRCl0aHJvdyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLmRpcmVjdGl2ZU5hbWUrXCIoKSBjYW4gb25seSBiZSB1c2VkIGluIGNoaWxkIGJpbmRpbmdzXCIpfXJlbmRlcihyKXtpZihyPT09dHx8bnVsbD09cilyZXR1cm4gdGhpcy5fdD12b2lkIDAsdGhpcy5pdD1yO2lmKHI9PT1pKXJldHVybiByO2lmKFwic3RyaW5nXCIhPXR5cGVvZiByKXRocm93IEVycm9yKHRoaXMuY29uc3RydWN0b3IuZGlyZWN0aXZlTmFtZStcIigpIGNhbGxlZCB3aXRoIGEgbm9uLXN0cmluZyB2YWx1ZVwiKTtpZihyPT09dGhpcy5pdClyZXR1cm4gdGhpcy5fdDt0aGlzLml0PXI7Y29uc3Qgcz1bcl07cmV0dXJuIHMucmF3PXMsdGhpcy5fdD17XyRsaXRUeXBlJDp0aGlzLmNvbnN0cnVjdG9yLnJlc3VsdFR5cGUsc3RyaW5nczpzLHZhbHVlczpbXX19fWUuZGlyZWN0aXZlTmFtZT1cInVuc2FmZUhUTUxcIixlLnJlc3VsdFR5cGU9MTtjb25zdCBvPW4oZSk7ZXhwb3J0e2UgYXMgVW5zYWZlSFRNTERpcmVjdGl2ZSxvIGFzIHVuc2FmZUhUTUx9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5zYWZlLWh0bWwuanMubWFwXG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBjc3MsIGh0bWwsIG5vdGhpbmcgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHR5cGUgeyBJdGluZXJhcnksIExlZywgTGVnU3RhdGlvbiwgVGltZXN0YW1wIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQge1xuICBhcnJheUVxdWFscyxcbiAgY2FsY1RpbWVTdGFtcERlbHRhTWlucyxcbiAgZ2V0RW5kLFxuICBnZXRTdGFydCxcbiAgbWluc1RvRmlyc3RMZWcsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IGJ1cyBmcm9tIFwiLi4vYXNzZXRzL2J1cy5zdmc/cmF3XCI7XG5pbXBvcnQgdHJhaW4gZnJvbSBcIi4uL2Fzc2V0cy90cmFpbi5zdmc/cmF3XCI7XG5pbXBvcnQgd2Fsa2luZyBmcm9tIFwiLi4vYXNzZXRzL3dhbGtpbmcuc3ZnP3Jhd1wiO1xuaW1wb3J0IHNsZWVwIGZyb20gXCIuLi9hc3NldHMvc2xlZXAuc3ZnP3Jhd1wiO1xuaW1wb3J0IHsgdW5zYWZlSFRNTCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy91bnNhZmUtaHRtbC5qc1wiO1xuXG5AY3VzdG9tRWxlbWVudChcImJtbi1pdGluZXJhcnlcIilcbmV4cG9ydCBjbGFzcyBJdGluZXJhcnlDYXJkIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIEBwcm9wZXJ0eSgpXG4gIG5vdyE6IG51bWJlcjtcblxuICBAcHJvcGVydHkoKVxuICBoZWFkbGluZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAcHJvcGVydHkoKVxuICBhY3RpdmUhOiBib29sZWFuO1xuXG4gIEBwcm9wZXJ0eSgpXG4gIGxlZ3MhOiBJdGluZXJhcnk7XG5cbiAgQHByb3BlcnR5KClcbiAgc2VhcmNoUmVwbGFjZSE6IHN0cmluZ1tdO1xuXG4gIGRhdGVGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImRlLURFXCIsIHtcbiAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAke3RoaXMucmVuZGVySGVhZGxpbmUodGhpcy5oZWFkbGluZSwgdGhpcy5sZWdzWzBdLCB0aGlzLmFjdGl2ZSl9XG4gICAgICAgICR7dGhpcy5sZWdzLm1hcCgobGVnLCBpLCBsZWdzKSA9PiB0aGlzLnJlbmRlckxlZyhsZWcsIGksIGxlZ3MpKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICByZW5kZXJIZWFkbGluZShcbiAgICBoZWFkbGluZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGZpcnN0TGVnOiBMZWcgfCB1bmRlZmluZWQsXG4gICAgYWN0aXZlOiBib29sZWFuXG4gICkge1xuICAgIGlmICghaGVhZGxpbmUgfHwgIWZpcnN0TGVnKSByZXR1cm4gbm90aGluZztcbiAgICBjb25zdCBpbk1pbnMgPSBtaW5zVG9GaXJzdExlZyh0aGlzLm5vdywgZmlyc3RMZWcpO1xuXG4gICAgY29uc3QgdGltZUhpbnQgPSBpbk1pbnMgPD0gMCA/IGBqZXR6dGAgOiBgaW4gJHtpbk1pbnN9IG1pbmA7XG5cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5cbiAgICAgIDxoMT4ke2FjdGl2ZSA/IG5vdGhpbmcgOiB1bnNhZmVIVE1MKHNsZWVwKX0ke3RoaXMuaGVhZGxpbmV9PC9oMT5cbiAgICAgIDxzcGFuPiR7dGltZUhpbnR9PC9zcGFuPlxuICAgIDwvZGl2PmA7XG4gIH1cblxuICByZW5kZXJMZWcobGVnOiBMZWcsIGk6IG51bWJlciwgbGVnczogTGVnW10pIHtcbiAgICBjb25zdCBuZXh0TGVnOiBMZWcgfCB1bmRlZmluZWQgPSBsZWdzW2kgKyAxXTtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICR7aSA9PSAwID8gdGhpcy5yZW5kZXJTdGF0aW9ucyhnZXRTdGFydChsZWcpLCBudWxsLCBmYWxzZSkgOiBub3RoaW5nfVxuICAgICAgJHt0aGlzLnJlbmRlck1vZGUobGVnLCBpKX1cbiAgICAgICR7dGhpcy5yZW5kZXJTdGF0aW9ucyhcbiAgICAgICAgZ2V0RW5kKGxlZyksXG4gICAgICAgIG5leHRMZWcgPyBnZXRTdGFydChuZXh0TGVnKSA6IG51bGwsXG4gICAgICAgIGkgPT09IGxlZ3MubGVuZ3RoIC0gMVxuICAgICAgKX1cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyU3RhdGlvbnMoXG4gICAgbGVnU3RhdGlvbjogTGVnU3RhdGlvbixcbiAgICBuZXh0TGVnU3RhdGlvbjogTGVnU3RhdGlvbiB8IG51bGwsXG4gICAgYm9sZDogYm9vbGVhblxuICApIHtcbiAgICBjb25zdCBsZWdTdGF0aW9uSHRtbCA9IHRoaXMucmVuZGVyU3RhdGlvbihsZWdTdGF0aW9uLCBib2xkKTtcblxuICAgIGxldCBuZXh0TGVnU3RhdGlvbkh0bWwgPSBuZXh0TGVnU3RhdGlvblxuICAgICAgPyB0aGlzLnJlbmRlclN0YXRpb24obmV4dExlZ1N0YXRpb24sIGZhbHNlKVxuICAgICAgOiBub3RoaW5nO1xuXG4gICAgY29uc3QgaXNOZXh0U3RhdGlvbk5lZWRlZCA9XG4gICAgICBuZXh0TGVnU3RhdGlvbkh0bWwgIT09IG5vdGhpbmcgJiZcbiAgICAgICFhcnJheUVxdWFscyhsZWdTdGF0aW9uSHRtbC52YWx1ZXMsIG5leHRMZWdTdGF0aW9uSHRtbC52YWx1ZXMpO1xuXG4gICAgbmV4dExlZ1N0YXRpb25IdG1sID0gaXNOZXh0U3RhdGlvbk5lZWRlZCA/IG5leHRMZWdTdGF0aW9uSHRtbCA6IG5vdGhpbmc7XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCIke25leHRMZWdTdGF0aW9uID8gXCJzbGltXCIgOiBcIlwifVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ltYm9sc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxheVwiPlxuICAgICAgICAgICAgJHtsZWdTdGF0aW9uLmRlbGF5ID4gMCA/IFwiK1wiICsgbGVnU3RhdGlvbi5kZWxheSA6IFwiXCJ9PGJyIC8+XG4gICAgICAgICAgICAke25leHRMZWdTdGF0aW9uPy5kZWxheSEgPiAwID8gXCIrXCIgKyBuZXh0TGVnU3RhdGlvbj8uZGVsYXkgOiBcIlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidWxsZXRcIj4mYnVsbDs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+JHt0aGlzLnJlbmRlclN0YXRpb24obGVnU3RhdGlvbiwgYm9sZCl9ICR7bmV4dExlZ1N0YXRpb25IdG1sfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGZvcm1hdERhdGUodHM6IFRpbWVzdGFtcCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdC5mb3JtYXQobmV3IERhdGUodHMpKTtcbiAgfVxuXG4gIGZvcm1hdFN0YXRpb25OYW1lKHJhd05hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IG5hbWUgPSByYXdOYW1lO1xuICAgIGZvciAoY29uc3QgaW5zdHJ1Y3Rpb24gb2YgdGhpcy5zZWFyY2hSZXBsYWNlKSB7XG4gICAgICBjb25zdCBbcmVnZXgsIHJlcGxhY2VdID0gaW5zdHJ1Y3Rpb24uc3BsaXQoXCIvXCIsIDIpO1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZUFsbChuZXcgUmVnRXhwKHJlZ2V4LCBcImdpXCIpLCByZXBsYWNlID8/IFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZS50cmltKCk7XG4gIH1cblxuICByZW5kZXJTdGF0aW9uKGxlZ1N0YXRpb246IExlZ1N0YXRpb24sIGJvbGQ6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxzcGFuPiR7dGhpcy5mb3JtYXREYXRlKGxlZ1N0YXRpb24uc2NoZWR1bGVkKX0mbmJzcDstPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCIke2JvbGQgPyBcImJvbGRcIiA6IFwiXCJ9XCI+XG4gICAgICAgICR7dGhpcy5mb3JtYXRTdGF0aW9uTmFtZShsZWdTdGF0aW9uLnN0YXRpb25OYW1lKX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuPiAke2xlZ1N0YXRpb24ucGxhdGZvcm19IDwvc3Bhbj5cbiAgICAgIDxiciAvPlxuICAgIGA7XG4gIH1cblxuICByZW5kZXJNb2RlKGxlZzogTGVnLCBfaTogbnVtYmVyKSB7XG4gICAgY29uc3QgaWNvbiA9IHsgYnVzLCB0cmFpbiwgd2Fsa2luZyB9W2xlZy5tb2RlXTtcblxuICAgIHJldHVybiBodG1sYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN5bWJvbHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPiR7dW5zYWZlSFRNTChpY29uKX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJib2xkXCI+XG4gICAgICAgICAgICAke2xlZy5tb2RlICE9PSBcIndhbGtpbmdcIlxuICAgICAgICAgICAgICA/IGxlZy5uYW1lXG4gICAgICAgICAgICAgIDogYCR7Y2FsY1RpbWVTdGFtcERlbHRhTWlucyhcbiAgICAgICAgICAgICAgICAgIGxlZy5kZXBhcnR1cmUsXG4gICAgICAgICAgICAgICAgICBsZWcuYXJyaXZhbFxuICAgICAgICAgICAgICAgICl9IG1pbiBGdcOfd2VnYH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIHN0YXRpYyBzdHlsZXMgPSBjc3NgXG4gICAgOmhvc3Qge1xuICAgICAgLS1ncmFkaWVudDE6ICMxMTIwNDI7XG4gICAgICAtLWdyYWRpZW50MjogIzY4MzFBQztcbiAgICAgIC0tY29sb3I6IHdoaXRlO1xuICAgICAgLS1kZWxheS1jb2xvcjogcmVkO1xuXG4gICAgICAtLXN5bWJvbC13aWR0aDogM3JlbTtcbiAgICAgIC0tc3ltYm9sLXBhZGRpbmc6IDFyZW07XG4gICAgICAtLWZvbnQtc2l6ZTogMS4zcmVtO1xuICAgICAgLS12ZXJ0aWNhbC1zcGFjZTogMXJlbTtcbiAgICAgIC0tbGluZS1wYWRkaW5nOiAwLjlyZW07XG4gICAgICAtLWxpbmUtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICB9XG5cbiAgICAuaGVhZGxpbmUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmhlYWRsaW5lIGgxIHtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0taGEtZm9udC1zaXplLTN4bCk7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuICAgIC5oZWFkbGluZSBzdmcge1xuICAgICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgICAgaGVpZ2h0OiB2YXIoLS1oYS1mb250LXNpemUtM3hsKTtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICB9XG4gICAgICBcbiAgICBcbiAgICAuYm9sZCB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgICAuY2FyZCB7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1oYS1jYXJkLWJvcmRlci1yYWRpdXMsdmFyKC0taGEtYm9yZGVyLXJhZGl1cy1sZykpO1xuICAgICAgbWFyZ2luOiAwLjNyZW07XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3IpO1xuICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHZhcigtLWdyYWRpZW50MSkgMCUsIHZhcigtLWdyYWRpZW50MikgMTAwJSk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplKTtcbiAgICAgIGdhcDogdmFyKC0tdmVydGljYWwtc3BhY2UpO1xuICAgIH1cblxuICAgIC5jYXJkID4gZGl2LCAuc3ltYm9scyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb24gcm93O1xuICAgIH1cblxuICAgIC5zeW1ib2xzIHtcbiAgICAgIHdpZHRoOiB2YXIoLS1zeW1ib2wtd2lkdGgpO1xuICAgICAgcGFkZGluZy1yaWdodDogdmFyKC0tc3ltYm9sLXBhZGRpbmcpO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICB9XG5cbiAgICAuaWNvbiB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmljb246OmJlZm9yZSwgLmljb246OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBoZWlnaHQ6IHZhcigtLXZlcnRpY2FsLXNwYWNlKTtcbiAgICAgIGJvcmRlci1sZWZ0OiBkYXNoZWQgdmFyKC0tbGluZS1jb2xvcikgM3B4O1xuICAgICAgcmlnaHQ6IDJweDtcbiAgICB9XG4gICAgLmljb246OmFmdGVyIHtcbiAgICAgIHRvcDogY2FsYyh2YXIoLS1saW5lLXBhZGRpbmcpICsgdmFyKC0tZm9udC1zaXplKSk7XG4gICAgfVxuICAgIC5pY29uOjpiZWZvcmUge1xuICAgICAgYm90dG9tOiBjYWxjKHZhcigtLWxpbmUtcGFkZGluZykgKyB2YXIoLS1mb250LXNpemUpKTtcbiAgICB9XG5cbiAgICAuaWNvbiBzdmcge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAtNHB4O1xuICAgIH1cbiAgICAuZGVsYXkge1xuICAgICAgY29sb3I6IHZhcigtLWRlbGF5LWNvbG9yKTtcbiAgICB9XG5cbiAgICAuYnVsbGV0IHtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1zeW1ib2wtcGFkZGluZyk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAuc2xpbSB7XG4gICAgICBsaW5lLWhlaWdodDogMS40cmVtO1xuICAgIH1cbiAgYDtcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgSFRNTEVsZW1lbnRUYWdOYW1lTWFwIHtcbiAgICBcImJtbi1pdGluZXJhcnlcIjogSXRpbmVyYXJ5Q2FyZDtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBIYUZvcm1TY2hlbWEsIExvdmVsYWNlQ29uZmlnRm9ybSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIFJHQiA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcblxuZXhwb3J0IHR5cGUgSm91cm5leXNDb25maWcgPSB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBlbnRpdHk6IHN0cmluZztcbiAgc2VhcmNoX3JlcGxhY2U/OiBzdHJpbmdbXSB8IHN0cmluZztcbiAgb3JpZ2luX25hbWU/OiBzdHJpbmc7XG4gIGRlc3RpbmF0aW9uX25hbWU/OiBzdHJpbmc7XG4gIGluZGV4OiBudW1iZXI7XG4gIGNvbG9yOiBSR0I7XG4gIGdyYWRpZW50MTogUkdCO1xuICBncmFkaWVudDI6IFJHQjtcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTE9SID0gWzI1NSwgMjU1LCAyNTVdO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfR1JBRElFTlQxID0gWzE3LCAzMiwgNjZdO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfR1JBRElFTlQyID0gWzEwNCwgNDksIDE3Ml07XG5cbmV4cG9ydCBjb25zdCBTQ0hFTUE6IEhhRm9ybVNjaGVtYVtdID0gW1xuICB7XG4gICAgbmFtZTogXCJ0aXRsZVwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICB0ZXh0OiB7fSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJlbnRpdHlcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgZW50aXR5OiB7XG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGRvbWFpbjogXCJzZW5zb3JcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiaW5kZXhcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgbnVtYmVyOiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwib3JpZ2luX25hbWVcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgdGV4dDoge30sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZGVzdGluYXRpb25fbmFtZVwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICB0ZXh0OiB7fSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzZWFyY2hfcmVwbGFjZVwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICB0ZXh0OiB7XG4gICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjb2xvclwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICBjb2xvcl9yZ2I6IHt9LFxuICAgIH0sXG4gICAgZGVmYXVsdDogREVGQVVMVF9DT0xPUixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ3JhZGllbnQxXCIsXG4gICAgc2VsZWN0b3I6IHtcbiAgICAgIGNvbG9yX3JnYjoge30sXG4gICAgfSxcbiAgICBkZWZhdWx0OiBERUZBVUxUX0dSQURJRU5UMSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ3JhZGllbnQyXCIsXG4gICAgc2VsZWN0b3I6IHtcbiAgICAgIGNvbG9yX3JnYjoge30sXG4gICAgfSxcbiAgICBkZWZhdWx0OiBERUZBVUxUX0dSQURJRU5UMixcbiAgfSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGb3JtKCk6IExvdmVsYWNlQ29uZmlnRm9ybSB7XG4gIHJldHVybiB7XG4gICAgY29tcHV0ZUxhYmVsOiAoc2NoZW1hKSA9PiB7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwidGl0bGVcIikgcmV0dXJuIFwiVGl0bGVcIjtcbiAgICAgIGlmIChzY2hlbWEubmFtZSA9PT0gXCJlbnRpdHlcIikgcmV0dXJuIFwiU2Vuc29yXCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwiaW5kZXhcIikgcmV0dXJuIFwiSW5kZXhcIjtcbiAgICAgIGlmIChzY2hlbWEubmFtZSA9PT0gXCJzZWFyY2hfcmVwbGFjZVwiKSByZXR1cm4gXCJTdXBwcmVzc2VkIFdvcmRzXCI7XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBjb21wdXRlSGVscGVyOiAoc2NoZW1hKSA9PiB7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwiZW50aXR5XCIpIHJldHVybiBcImhhY3MtaGFmYXMgc2Vuc29yIGZvciBjb25uZWN0aW9uXCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwiaW5kZXhcIilcbiAgICAgICAgcmV0dXJuIFwiV2hpY2ggY29ubmVjdGlvbiBvZiB0aGUgc2Vuc29yIGRvIHlvdSB3YW50IHRvIGRpc3BsYXk/IDAgYmVpbmcgdGhlIGZpcnN0XCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwib3JpZ2luX25hbWVcIilcbiAgICAgICAgcmV0dXJuIFwiSWYgb3JpZ2luIHJlcXVpcmVzIGFuIGluaXRpYWwgd2Fsa2luZyBsZWcsIHRoaXMgbmFtZSBpcyBkaXNwbGF5ZWQgYXMgaW5pdGlhbCBvcmlnaW4uXCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwiZGVzdGluYXRpb25fbmFtZVwiKVxuICAgICAgICByZXR1cm4gXCJJZiBkZXN0aW5hdGlvbiByZXF1aXJlcyBhIGZpbmFsIHdhbGtpbmcgbGVnLCB0aGlzIG5hbWUgaXMgZGlzcGxheWVkIGFzIHRvdGFsIG9yaWdpbi5cIjtcbiAgICAgIGlmIChzY2hlbWEubmFtZSA9PT0gXCJzZWFyY2hfcmVwbGFjZVwiKVxuICAgICAgICByZXR1cm4gXCJSZWd1bGFyIEV4cHJlc3Npb24gdG8gZmluZC4gUmVwbGFjZSBpcyB0ZXh0IG9ubHkuIEZpbmQgbWF5IG5vdCBjb250YWluIHNsYXNoZXMuIGUuZy4gJ2ZpP25kKy9yZXBsYWNlJ1wiO1xuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2NoZW1hOiBTQ0hFTUEsXG4gIH07XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBjc3MsIGh0bWwgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSwgc3RhdGUgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbmltcG9ydCB0eXBlIHtcbiAgSGFGQXNTZW5zb3JTdGF0ZSxcbiAgSG9tZUFzc2lzdGFudCxcbiAgTG92ZWxhY2VDb25maWdGb3JtLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IFwiLi9jb21wb25lbnRzL2l0aW5lcmFyeVwiO1xuaW1wb3J0IHsgbWluc1RvRmlyc3RMZWcsIHByb2Nlc3NMZWdzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7XG4gIGNvbmZpZ0Zvcm0sXG4gIERFRkFVTFRfQ09MT1IsXG4gIERFRkFVTFRfR1JBRElFTlQxLFxuICBERUZBVUxUX0dSQURJRU5UMixcbiAgdHlwZSBKb3VybmV5c0NvbmZpZyxcbn0gZnJvbSBcIi4vam91cm5leXNDb25maWdcIjtcblxuLyoqXG4gKiB0aGlzIGlzIHRoZSByb290IGNvbXBvbmVudFxuICovXG5AY3VzdG9tRWxlbWVudChcImF2dmhhZmFzLWpvdXJuZXlzXCIpXG5leHBvcnQgY2xhc3MgSm91cm5leXMgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgQHByb3BlcnR5KClcbiAgaGFzcyE6IEhvbWVBc3Npc3RhbnQ7IC8vIHNldCBieSBob21lIGFzc2lzdGFudCBvbiAoZXZlcnk/KSBzdGF0ZSBjaGFuZ2VcblxuICBjb25maWc/OiBKb3VybmV5c0NvbmZpZzsgLy8gc2V0IGluIHNldENvbmZpZ1xuXG4gIGdldCBzZW5zb3JTdGF0ZSgpOiBIYUZBc1NlbnNvclN0YXRlIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlbnRpdHlOYW1lID0gdGhpcy5jb25maWc/LmVudGl0eTtcbiAgICByZXR1cm4gZW50aXR5TmFtZVxuICAgICAgPyAodGhpcy5oYXNzLnN0YXRlc1tlbnRpdHlOYW1lXSBhcyBIYUZBc1NlbnNvclN0YXRlKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgc2VhcmNoUmVwbGFjZSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZz8uc2VhcmNoX3JlcGxhY2UpIHJldHVybiBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5zZWFyY2hfcmVwbGFjZSkpXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuc2VhcmNoX3JlcGxhY2U7XG4gICAgcmV0dXJuIFt0aGlzLmNvbmZpZy5zZWFyY2hfcmVwbGFjZV07XG4gIH1cblxuICAvLyBsaXQncyByZW5kZXIgZnVuY3Rpb25cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5jb25maWcpIHJldHVybiBodG1sYENvbmZpZ3VyYXRpb24gaXNzdWVzYDtcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLnNlbnNvclN0YXRlPy5hdHRyaWJ1dGVzLmFjdGl2ZSA/PyBmYWxzZTtcbiAgICBjb25zdCBsYXN0UXVlcnkgPSB0aGlzLnNlbnNvclN0YXRlPy5hdHRyaWJ1dGVzLmxhc3RfcXVlcnk7XG4gICAgbGV0IGNvbm5lY3Rpb25zID0gdGhpcy5zZW5zb3JTdGF0ZT8uYXR0cmlidXRlcy5jb25uZWN0aW9ucztcbiAgICBjb25uZWN0aW9ucyA9IGNvbm5lY3Rpb25zID8/IFtdO1xuICAgIGNvbm5lY3Rpb25zID0gY29ubmVjdGlvbnMuZmlsdGVyKFxuICAgICAgKGNvbm5lY3Rpb24pID0+XG4gICAgICAgIGNvbm5lY3Rpb24ubGVnc1swXSAmJiBtaW5zVG9GaXJzdExlZyh0aGlzLm5vdywgY29ubmVjdGlvbi5sZWdzWzBdKSA+PSAwXG4gICAgKTtcbiAgICBpZiAoY29ubmVjdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4gaHRtbGBObyBjb25uZWN0aW9uc2A7XG5cbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yID8/IERFRkFVTFRfQ09MT1I7XG4gICAgY29uc3QgZ3JhZGllbnQxID0gdGhpcy5jb25maWcuZ3JhZGllbnQxID8/IERFRkFVTFRfR1JBRElFTlQxO1xuICAgIGNvbnN0IGdyYWRpZW50MiA9IHRoaXMuY29uZmlnLmdyYWRpZW50MiA/PyBERUZBVUxUX0dSQURJRU5UMjtcblxuICAgIGNvbnN0IHN0eWxlID0gW1xuICAgICAgYC0tZ3JhZGllbnQxOiByZ2IoJHtncmFkaWVudDEuam9pbihcIiwgXCIpfSlgLFxuICAgICAgYC0tZ3JhZGllbnQyOiByZ2IoJHtncmFkaWVudDIuam9pbihcIiwgXCIpfSlgLFxuICAgICAgYC0tY29sb3I6IHJnYigke2NvbG9yLmpvaW4oXCIsIFwiKX0pYCxcbiAgICAgIGAtLWxpbmUtY29sb3I6IHJnYmEoJHtjb2xvci5qb2luKFwiLCBcIil9LCAwLjYpYCxcbiAgICBdO1xuXG4gICAgY29uc3QgbGVncyA9IHByb2Nlc3NMZWdzKFxuICAgICAgY29ubmVjdGlvbnNbdGhpcy5jb25maWcuaW5kZXhdLmxlZ3MsXG4gICAgICB0aGlzLmNvbmZpZy5vcmlnaW5fbmFtZSxcbiAgICAgIHRoaXMuY29uZmlnLmRlc3RpbmF0aW9uX25hbWVcbiAgICApO1xuXG4gICAgcmV0dXJuIGh0bWxgIDxoYS1jYXJkPlxuICAgICAgPGJtbi1pdGluZXJhcnlcbiAgICAgICAgLm5vdz1cIiR7dGhpcy5ub3d9XCJcbiAgICAgICAgLmFjdGl2ZT1cIiR7YWN0aXZlfVwiXG4gICAgICAgIC5oZWFkbGluZT1cIiR7dGhpcy5jb25maWcudGl0bGV9XCJcbiAgICAgICAgLnNlYXJjaFJlcGxhY2U9XCIke3RoaXMuc2VhcmNoUmVwbGFjZX1cIlxuICAgICAgICAubGVncz1cIiR7bGVnc31cIlxuICAgICAgICBzdHlsZT1cIiR7c3R5bGUuam9pbihcIjsgXCIpfVwiXG4gICAgICA+XG4gICAgICA8L2Jtbi1pdGluZXJhcnk+XG4gICAgICA8c21hbGwgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IDAuNXJlbVwiPlxuICAgICAgVXBkYXRlZFxuICAgICAgICAke2xhc3RRdWVyeVxuICAgICAgICAgID8gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1ERVwiLCB7XG4gICAgICAgICAgICAgIGRhdGVTdHlsZTogXCJmdWxsXCIsXG4gICAgICAgICAgICAgIHRpbWVTdHlsZTogXCJsb25nXCIsXG4gICAgICAgICAgICAgIHRpbWVab25lOiBcIkV1cm9wZS9CZXJsaW5cIixcbiAgICAgICAgICAgIH0pLmZvcm1hdChuZXcgRGF0ZShsYXN0UXVlcnkpKVxuICAgICAgICAgIDogXCJ1bmtub3duXCJ9XG4gICAgICAgIDwvc21hbGw+XG4gICAgPC9oYS1jYXJkPmA7XG4gIH1cblxuICAvLyB1c2VyIHN1cHBsaWVkIGNvbmZpZ3VyYXRpb25cbiAgc2V0Q29uZmlnKGNvbmZpZzogSm91cm5leXNDb25maWcpIHtcbiAgICBpZiAoIWNvbmZpZy5lbnRpdHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBuZWVkIHRvIGRlZmluZSBhbiBlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvLyBob21lIGFzc2lzdGFudCBjYWxscyB0aGlzIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYSBjb25maWcgZm9ybSBmb3IgdGhpcyBjYXJkXG4gIHN0YXRpYyBnZXRDb25maWdGb3JtKCk6IExvdmVsYWNlQ29uZmlnRm9ybSB7XG4gICAgcmV0dXJuIGNvbmZpZ0Zvcm0oKTtcbiAgfVxuXG4gIC8qXG4gIEluIHRoZW9yeSwgd2UgYXJlIG5vdCBndWFyYW50ZWVkIHVwZGF0ZXMgb2YgdGhlIGhhc3Mgb2JqZWN0IGV2ZXJ5IG1pbnV0ZSxcbiAgd2Ugd2Uga2VlcCB0aGUgY3VycmVudCB0aW1lIG91cnNlbHZlcyB3aXRoIDUgc2Vjb25kIGFjY3VyYWN5ICh0aGlzIHdpbGwgdHJpZ2dlciBhIHJlbmRlcigpKVxuICAqL1xuICBAc3RhdGUoKVxuICBub3cgPSBEYXRlLm5vdygpO1xuICB0aW1lcj86IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm5vdyA9IERhdGUubm93KCk7XG4gICAgfSwgNTAwMCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGltZXIgIT09IFwidW5kZWZpbmVkXCIpIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHN0YXRpYyBzdHlsZXMgPSBjc3NgYDtcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgSFRNTEVsZW1lbnRUYWdOYW1lTWFwIHtcbiAgICBcImF2dmhhZmFzLWpvdXJuZXlzXCI6IEpvdXJuZXlzO1xuICB9XG59XG4iLCIvLyBSZWdpc3RlciBhbGwgY29tcG9uZW50c1xuaW1wb3J0ICcuL2pvdXJuZXlzJztcblxuY29uc29sZS5pbmZvKCdoYS1oYWNzLWpvdXJuZXlzIGxvYWRlZCcpO1xuIl0sIm5hbWVzIjpbInQiLCJlIiwicyIsIm8iLCJuJDMiLCJyIiwibiIsImkiLCJTIiwiYyIsImgiLCJhIiwibCIsInAiLCJkIiwidSIsImYiLCJiIiwieSIsInYiLCJfIiwibSIsImciLCIkIiwieCIsIlQiLCJFIiwiQSIsIkMiLCJQIiwiViIsIk4iLCJIIiwiSSIsIkwiLCJrIiwiTSIsIlIiLCJ6IiwiaiIsIkIiLCJhcnJheUVxdWFscyIsImFycjEiLCJhcnIyIiwiY2FsY0RlbGF5IiwidGQiLCJob3VycyIsIm1pbnV0ZXMiLCJnZXRTdGFydCIsImxlZyIsImdldEVuZCIsImNhbGNUaW1lU3RhbXBEZWx0YU1pbnMiLCJhRCIsImJEIiwibXNEaWZmIiwibWluc1RvRmlyc3RMZWciLCJub3ciLCJmaXJzdExlZyIsImRlbGF5IiwiaW5NcyIsInByb2Nlc3NMZWdzIiwibGVncyIsIm9yaWdpbk5hbWUiLCJkZXN0aW5hdGlvbk5hbWUiLCJwcm9jZXNzZWQiLCJmaWx0ZXJQbGF0Zm9ybUNoYW5nZSIsIndhbGtUb1BsYXRmb3JtIiwicHJvY2Vzc1Nob3J0SW5pdGlhbFdhbGsiLCJwcm9jZXNzU2hvcnRGaW5hbFdhbGsiLCJwb3BGbiIsInZzIiwicHJvY2Vzc1Nob3J0V2FsayIsIm1heER1cmF0aW9uIiwicmVuYW1lVGFyZ2V0IiwidXNlckRlZmluZWROYW1lIiwicHJldiIsIm5leHQiLCJidXMiLCJ0cmFpbiIsIndhbGtpbmciLCJzbGVlcCIsIkl0aW5lcmFyeUNhcmQiLCJMaXRFbGVtZW50IiwiaHRtbCIsImhlYWRsaW5lIiwiYWN0aXZlIiwibm90aGluZyIsImluTWlucyIsInRpbWVIaW50IiwidW5zYWZlSFRNTCIsIm5leHRMZWciLCJsZWdTdGF0aW9uIiwibmV4dExlZ1N0YXRpb24iLCJib2xkIiwibGVnU3RhdGlvbkh0bWwiLCJuZXh0TGVnU3RhdGlvbkh0bWwiLCJ0cyIsInJhd05hbWUiLCJuYW1lIiwiaW5zdHJ1Y3Rpb24iLCJyZWdleCIsInJlcGxhY2UiLCJfaSIsImljb24iLCJjc3MiLCJfX2RlY29yYXRlQ2xhc3MiLCJwcm9wZXJ0eSIsImN1c3RvbUVsZW1lbnQiLCJERUZBVUxUX0NPTE9SIiwiREVGQVVMVF9HUkFESUVOVDEiLCJERUZBVUxUX0dSQURJRU5UMiIsIlNDSEVNQSIsImNvbmZpZ0Zvcm0iLCJzY2hlbWEiLCJKb3VybmV5cyIsImVudGl0eU5hbWUiLCJsYXN0UXVlcnkiLCJjb25uZWN0aW9ucyIsImNvbm5lY3Rpb24iLCJjb2xvciIsImdyYWRpZW50MSIsImdyYWRpZW50MiIsInN0eWxlIiwiY29uZmlnIiwic3RhdGUiXSwibWFwcGluZ3MiOiJBQUtBLE1BQU1BLElBQUUsWUFBV0MsSUFBRUQsRUFBRSxlQUFzQkEsRUFBRSxhQUFYLFVBQXFCQSxFQUFFLFNBQVMsaUJBQWUsd0JBQXVCLFNBQVMsYUFBVyxhQUFZLGNBQWMsV0FBVUUsSUFBRSx1QkFBTSxHQUFHQyxJQUFFLG9CQUFJO0FBQU8sSUFBQUMsS0FBQyxNQUFPO0FBQUEsRUFBQyxZQUFZLEdBQUUsR0FBRUQsR0FBRTtBQUFDLFFBQUcsS0FBSyxlQUFhLElBQUdBLE1BQUlELEVBQUUsT0FBTSxNQUFNLG1FQUFtRTtBQUFFLFNBQUssVUFBUSxHQUFFLEtBQUssSUFBRTtBQUFBLEVBQUM7QUFBQSxFQUFDLElBQUksYUFBWTtBQUFDLFFBQUksSUFBRSxLQUFLO0FBQUUsVUFBTUEsSUFBRSxLQUFLO0FBQUUsUUFBR0QsS0FBWSxNQUFULFFBQVc7QUFBQyxZQUFNQSxJQUFXQyxNQUFULFVBQWdCQSxFQUFFLFdBQU47QUFBYSxNQUFBRCxNQUFJLElBQUVFLEVBQUUsSUFBSUQsQ0FBQyxJQUFZLE1BQVQsWUFBYyxLQUFLLElBQUUsSUFBRSxJQUFJLGlCQUFlLFlBQVksS0FBSyxPQUFPLEdBQUVELEtBQUdFLEVBQUUsSUFBSUQsR0FBRSxDQUFDO0FBQUEsSUFBRTtBQUFDLFdBQU87QUFBQSxFQUFDO0FBQUEsRUFBQyxXQUFVO0FBQUMsV0FBTyxLQUFLO0FBQUEsRUFBTztBQUFDO0FBQUMsTUFBTUcsS0FBRSxDQUFBTCxNQUFHLElBQUlNLEdBQVksT0FBT04sS0FBakIsV0FBbUJBLElBQUVBLElBQUUsSUFBRyxRQUFPRSxDQUFDLEdBQUVLLEtBQUUsQ0FBQ1AsTUFBS0MsTUFBSTtBQUFDLFFBQU1FLElBQU1ILEVBQUUsV0FBTixJQUFhQSxFQUFFLENBQUMsSUFBRUMsRUFBRSxRQUFRLENBQUNBLEdBQUVD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
