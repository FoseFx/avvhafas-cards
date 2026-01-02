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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aGFmYXMtY2FyZHMubWpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2Nzcy10YWcuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3JlYWN0aXZlLWVsZW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGl0LWh0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbGl0LWVsZW1lbnQvbGl0LWVsZW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvc3RhdGUuanMiLCIuLi9zcmMvdXRpbHMudHMiLCIuLi9zcmMvYXNzZXRzL2J1cy5zdmc/cmF3IiwiLi4vc3JjL2Fzc2V0cy90cmFpbi5zdmc/cmF3IiwiLi4vc3JjL2Fzc2V0cy93YWxraW5nLnN2Zz9yYXciLCIuLi9zcmMvYXNzZXRzL3NsZWVwLnN2Zz9yYXciLCIuLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvZGlyZWN0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2RpcmVjdGl2ZXMvdW5zYWZlLWh0bWwuanMiLCIuLi9zcmMvY29tcG9uZW50cy9pdGluZXJhcnkudHMiLCIuLi9zcmMvam91cm5leXNDb25maWcudHMiLCIuLi9zcmMvam91cm5leXMudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCB0PWdsb2JhbFRoaXMsZT10LlNoYWRvd1Jvb3QmJih2b2lkIDA9PT10LlNoYWR5Q1NTfHx0LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykmJlwiYWRvcHRlZFN0eWxlU2hlZXRzXCJpbiBEb2N1bWVudC5wcm90b3R5cGUmJlwicmVwbGFjZVwiaW4gQ1NTU3R5bGVTaGVldC5wcm90b3R5cGUscz1TeW1ib2woKSxvPW5ldyBXZWFrTWFwO2NsYXNzIG57Y29uc3RydWN0b3IodCxlLG8pe2lmKHRoaXMuXyRjc3NSZXN1bHQkPSEwLG8hPT1zKXRocm93IEVycm9yKFwiQ1NTUmVzdWx0IGlzIG5vdCBjb25zdHJ1Y3RhYmxlLiBVc2UgYHVuc2FmZUNTU2Agb3IgYGNzc2AgaW5zdGVhZC5cIik7dGhpcy5jc3NUZXh0PXQsdGhpcy50PWV9Z2V0IHN0eWxlU2hlZXQoKXtsZXQgdD10aGlzLm87Y29uc3Qgcz10aGlzLnQ7aWYoZSYmdm9pZCAwPT09dCl7Y29uc3QgZT12b2lkIDAhPT1zJiYxPT09cy5sZW5ndGg7ZSYmKHQ9by5nZXQocykpLHZvaWQgMD09PXQmJigodGhpcy5vPXQ9bmV3IENTU1N0eWxlU2hlZXQpLnJlcGxhY2VTeW5jKHRoaXMuY3NzVGV4dCksZSYmby5zZXQocyx0KSl9cmV0dXJuIHR9dG9TdHJpbmcoKXtyZXR1cm4gdGhpcy5jc3NUZXh0fX1jb25zdCByPXQ9Pm5ldyBuKFwic3RyaW5nXCI9PXR5cGVvZiB0P3Q6dCtcIlwiLHZvaWQgMCxzKSxpPSh0LC4uLmUpPT57Y29uc3Qgbz0xPT09dC5sZW5ndGg/dFswXTplLnJlZHVjZSgoKGUscyxvKT0+ZSsodD0+e2lmKCEwPT09dC5fJGNzc1Jlc3VsdCQpcmV0dXJuIHQuY3NzVGV4dDtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdDt0aHJvdyBFcnJvcihcIlZhbHVlIHBhc3NlZCB0byAnY3NzJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2NzcycgZnVuY3Rpb24gcmVzdWx0OiBcIit0K1wiLiBVc2UgJ3Vuc2FmZUNTUycgdG8gcGFzcyBub24tbGl0ZXJhbCB2YWx1ZXMsIGJ1dCB0YWtlIGNhcmUgdG8gZW5zdXJlIHBhZ2Ugc2VjdXJpdHkuXCIpfSkocykrdFtvKzFdKSx0WzBdKTtyZXR1cm4gbmV3IG4obyx0LHMpfSxTPShzLG8pPT57aWYoZSlzLmFkb3B0ZWRTdHlsZVNoZWV0cz1vLm1hcCgodD0+dCBpbnN0YW5jZW9mIENTU1N0eWxlU2hlZXQ/dDp0LnN0eWxlU2hlZXQpKTtlbHNlIGZvcihjb25zdCBlIG9mIG8pe2NvbnN0IG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLG49dC5saXROb25jZTt2b2lkIDAhPT1uJiZvLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsbiksby50ZXh0Q29udGVudD1lLmNzc1RleHQscy5hcHBlbmRDaGlsZChvKX19LGM9ZT90PT50OnQ9PnQgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0Pyh0PT57bGV0IGU9XCJcIjtmb3IoY29uc3QgcyBvZiB0LmNzc1J1bGVzKWUrPXMuY3NzVGV4dDtyZXR1cm4gcihlKX0pKHQpOnQ7ZXhwb3J0e24gYXMgQ1NTUmVzdWx0LFMgYXMgYWRvcHRTdHlsZXMsaSBhcyBjc3MsYyBhcyBnZXRDb21wYXRpYmxlU3R5bGUsZSBhcyBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMsciBhcyB1bnNhZmVDU1N9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3NzLXRhZy5qcy5tYXBcbiIsImltcG9ydHtnZXRDb21wYXRpYmxlU3R5bGUgYXMgdCxhZG9wdFN0eWxlcyBhcyBzfWZyb21cIi4vY3NzLXRhZy5qc1wiO2V4cG9ydHtDU1NSZXN1bHQsY3NzLHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyx1bnNhZmVDU1N9ZnJvbVwiLi9jc3MtdGFnLmpzXCI7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9jb25zdHtpczppLGRlZmluZVByb3BlcnR5OmUsZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOmgsZ2V0T3duUHJvcGVydHlOYW1lczpyLGdldE93blByb3BlcnR5U3ltYm9sczpvLGdldFByb3RvdHlwZU9mOm59PU9iamVjdCxhPWdsb2JhbFRoaXMsYz1hLnRydXN0ZWRUeXBlcyxsPWM/Yy5lbXB0eVNjcmlwdDpcIlwiLHA9YS5yZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQsZD0odCxzKT0+dCx1PXt0b0F0dHJpYnV0ZSh0LHMpe3N3aXRjaChzKXtjYXNlIEJvb2xlYW46dD10P2w6bnVsbDticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnQ9bnVsbD09dD90OkpTT04uc3RyaW5naWZ5KHQpfXJldHVybiB0fSxmcm9tQXR0cmlidXRlKHQscyl7bGV0IGk9dDtzd2l0Y2gocyl7Y2FzZSBCb29sZWFuOmk9bnVsbCE9PXQ7YnJlYWs7Y2FzZSBOdW1iZXI6aT1udWxsPT09dD9udWxsOk51bWJlcih0KTticmVhaztjYXNlIE9iamVjdDpjYXNlIEFycmF5OnRyeXtpPUpTT04ucGFyc2UodCl9Y2F0Y2godCl7aT1udWxsfX1yZXR1cm4gaX19LGY9KHQscyk9PiFpKHQscyksYj17YXR0cmlidXRlOiEwLHR5cGU6U3RyaW5nLGNvbnZlcnRlcjp1LHJlZmxlY3Q6ITEsdXNlRGVmYXVsdDohMSxoYXNDaGFuZ2VkOmZ9O1N5bWJvbC5tZXRhZGF0YT8/PVN5bWJvbChcIm1ldGFkYXRhXCIpLGEubGl0UHJvcGVydHlNZXRhZGF0YT8/PW5ldyBXZWFrTWFwO2NsYXNzIHkgZXh0ZW5kcyBIVE1MRWxlbWVudHtzdGF0aWMgYWRkSW5pdGlhbGl6ZXIodCl7dGhpcy5fJEVpKCksKHRoaXMubD8/PVtdKS5wdXNoKHQpfXN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCl7cmV0dXJuIHRoaXMuZmluYWxpemUoKSx0aGlzLl8kRWgmJlsuLi50aGlzLl8kRWgua2V5cygpXX1zdGF0aWMgY3JlYXRlUHJvcGVydHkodCxzPWIpe2lmKHMuc3RhdGUmJihzLmF0dHJpYnV0ZT0hMSksdGhpcy5fJEVpKCksdGhpcy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkodCkmJigocz1PYmplY3QuY3JlYXRlKHMpKS53cmFwcGVkPSEwKSx0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldCh0LHMpLCFzLm5vQWNjZXNzb3Ipe2NvbnN0IGk9U3ltYm9sKCksaD10aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcih0LGkscyk7dm9pZCAwIT09aCYmZSh0aGlzLnByb3RvdHlwZSx0LGgpfX1zdGF0aWMgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHQscyxpKXtjb25zdHtnZXQ6ZSxzZXQ6cn09aCh0aGlzLnByb3RvdHlwZSx0KT8/e2dldCgpe3JldHVybiB0aGlzW3NdfSxzZXQodCl7dGhpc1tzXT10fX07cmV0dXJue2dldDplLHNldChzKXtjb25zdCBoPWU/LmNhbGwodGhpcyk7cj8uY2FsbCh0aGlzLHMpLHRoaXMucmVxdWVzdFVwZGF0ZSh0LGgsaSl9LGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwfX1zdGF0aWMgZ2V0UHJvcGVydHlPcHRpb25zKHQpe3JldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmdldCh0KT8/Yn1zdGF0aWMgXyRFaSgpe2lmKHRoaXMuaGFzT3duUHJvcGVydHkoZChcImVsZW1lbnRQcm9wZXJ0aWVzXCIpKSlyZXR1cm47Y29uc3QgdD1uKHRoaXMpO3QuZmluYWxpemUoKSx2b2lkIDAhPT10LmwmJih0aGlzLmw9Wy4uLnQubF0pLHRoaXMuZWxlbWVudFByb3BlcnRpZXM9bmV3IE1hcCh0LmVsZW1lbnRQcm9wZXJ0aWVzKX1zdGF0aWMgZmluYWxpemUoKXtpZih0aGlzLmhhc093blByb3BlcnR5KGQoXCJmaW5hbGl6ZWRcIikpKXJldHVybjtpZih0aGlzLmZpbmFsaXplZD0hMCx0aGlzLl8kRWkoKSx0aGlzLmhhc093blByb3BlcnR5KGQoXCJwcm9wZXJ0aWVzXCIpKSl7Y29uc3QgdD10aGlzLnByb3BlcnRpZXMscz1bLi4ucih0KSwuLi5vKHQpXTtmb3IoY29uc3QgaSBvZiBzKXRoaXMuY3JlYXRlUHJvcGVydHkoaSx0W2ldKX1jb25zdCB0PXRoaXNbU3ltYm9sLm1ldGFkYXRhXTtpZihudWxsIT09dCl7Y29uc3Qgcz1saXRQcm9wZXJ0eU1ldGFkYXRhLmdldCh0KTtpZih2b2lkIDAhPT1zKWZvcihjb25zdFt0LGldb2Ygcyl0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldCh0LGkpfXRoaXMuXyRFaD1uZXcgTWFwO2Zvcihjb25zdFt0LHNdb2YgdGhpcy5lbGVtZW50UHJvcGVydGllcyl7Y29uc3QgaT10aGlzLl8kRXUodCxzKTt2b2lkIDAhPT1pJiZ0aGlzLl8kRWguc2V0KGksdCl9dGhpcy5lbGVtZW50U3R5bGVzPXRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpfXN0YXRpYyBmaW5hbGl6ZVN0eWxlcyhzKXtjb25zdCBpPVtdO2lmKEFycmF5LmlzQXJyYXkocykpe2NvbnN0IGU9bmV3IFNldChzLmZsYXQoMS8wKS5yZXZlcnNlKCkpO2Zvcihjb25zdCBzIG9mIGUpaS51bnNoaWZ0KHQocykpfWVsc2Ugdm9pZCAwIT09cyYmaS5wdXNoKHQocykpO3JldHVybiBpfXN0YXRpYyBfJEV1KHQscyl7Y29uc3QgaT1zLmF0dHJpYnV0ZTtyZXR1cm4hMT09PWk/dm9pZCAwOlwic3RyaW5nXCI9PXR5cGVvZiBpP2k6XCJzdHJpbmdcIj09dHlwZW9mIHQ/dC50b0xvd2VyQ2FzZSgpOnZvaWQgMH1jb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5fJEVwPXZvaWQgMCx0aGlzLmlzVXBkYXRlUGVuZGluZz0hMSx0aGlzLmhhc1VwZGF0ZWQ9ITEsdGhpcy5fJEVtPW51bGwsdGhpcy5fJEV2KCl9XyRFdigpe3RoaXMuXyRFUz1uZXcgUHJvbWlzZSgodD0+dGhpcy5lbmFibGVVcGRhdGluZz10KSksdGhpcy5fJEFMPW5ldyBNYXAsdGhpcy5fJEVfKCksdGhpcy5yZXF1ZXN0VXBkYXRlKCksdGhpcy5jb25zdHJ1Y3Rvci5sPy5mb3JFYWNoKCh0PT50KHRoaXMpKSl9YWRkQ29udHJvbGxlcih0KXsodGhpcy5fJEVPPz89bmV3IFNldCkuYWRkKHQpLHZvaWQgMCE9PXRoaXMucmVuZGVyUm9vdCYmdGhpcy5pc0Nvbm5lY3RlZCYmdC5ob3N0Q29ubmVjdGVkPy4oKX1yZW1vdmVDb250cm9sbGVyKHQpe3RoaXMuXyRFTz8uZGVsZXRlKHQpfV8kRV8oKXtjb25zdCB0PW5ldyBNYXAscz10aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRQcm9wZXJ0aWVzO2Zvcihjb25zdCBpIG9mIHMua2V5cygpKXRoaXMuaGFzT3duUHJvcGVydHkoaSkmJih0LnNldChpLHRoaXNbaV0pLGRlbGV0ZSB0aGlzW2ldKTt0LnNpemU+MCYmKHRoaXMuXyRFcD10KX1jcmVhdGVSZW5kZXJSb290KCl7Y29uc3QgdD10aGlzLnNoYWRvd1Jvb3Q/P3RoaXMuYXR0YWNoU2hhZG93KHRoaXMuY29uc3RydWN0b3Iuc2hhZG93Um9vdE9wdGlvbnMpO3JldHVybiBzKHQsdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50U3R5bGVzKSx0fWNvbm5lY3RlZENhbGxiYWNrKCl7dGhpcy5yZW5kZXJSb290Pz89dGhpcy5jcmVhdGVSZW5kZXJSb290KCksdGhpcy5lbmFibGVVcGRhdGluZyghMCksdGhpcy5fJEVPPy5mb3JFYWNoKCh0PT50Lmhvc3RDb25uZWN0ZWQ/LigpKSl9ZW5hYmxlVXBkYXRpbmcodCl7fWRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7dGhpcy5fJEVPPy5mb3JFYWNoKCh0PT50Lmhvc3REaXNjb25uZWN0ZWQ/LigpKSl9YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHQscyxpKXt0aGlzLl8kQUsodCxpKX1fJEVUKHQscyl7Y29uc3QgaT10aGlzLmNvbnN0cnVjdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmdldCh0KSxlPXRoaXMuY29uc3RydWN0b3IuXyRFdSh0LGkpO2lmKHZvaWQgMCE9PWUmJiEwPT09aS5yZWZsZWN0KXtjb25zdCBoPSh2b2lkIDAhPT1pLmNvbnZlcnRlcj8udG9BdHRyaWJ1dGU/aS5jb252ZXJ0ZXI6dSkudG9BdHRyaWJ1dGUocyxpLnR5cGUpO3RoaXMuXyRFbT10LG51bGw9PWg/dGhpcy5yZW1vdmVBdHRyaWJ1dGUoZSk6dGhpcy5zZXRBdHRyaWJ1dGUoZSxoKSx0aGlzLl8kRW09bnVsbH19XyRBSyh0LHMpe2NvbnN0IGk9dGhpcy5jb25zdHJ1Y3RvcixlPWkuXyRFaC5nZXQodCk7aWYodm9pZCAwIT09ZSYmdGhpcy5fJEVtIT09ZSl7Y29uc3QgdD1pLmdldFByb3BlcnR5T3B0aW9ucyhlKSxoPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29udmVydGVyP3tmcm9tQXR0cmlidXRlOnQuY29udmVydGVyfTp2b2lkIDAhPT10LmNvbnZlcnRlcj8uZnJvbUF0dHJpYnV0ZT90LmNvbnZlcnRlcjp1O3RoaXMuXyRFbT1lO2NvbnN0IHI9aC5mcm9tQXR0cmlidXRlKHMsdC50eXBlKTt0aGlzW2VdPXI/P3RoaXMuXyRFaj8uZ2V0KGUpPz9yLHRoaXMuXyRFbT1udWxsfX1yZXF1ZXN0VXBkYXRlKHQscyxpKXtpZih2b2lkIDAhPT10KXtjb25zdCBlPXRoaXMuY29uc3RydWN0b3IsaD10aGlzW3RdO2lmKGk/Pz1lLmdldFByb3BlcnR5T3B0aW9ucyh0KSwhKChpLmhhc0NoYW5nZWQ/P2YpKGgscyl8fGkudXNlRGVmYXVsdCYmaS5yZWZsZWN0JiZoPT09dGhpcy5fJEVqPy5nZXQodCkmJiF0aGlzLmhhc0F0dHJpYnV0ZShlLl8kRXUodCxpKSkpKXJldHVybjt0aGlzLkModCxzLGkpfSExPT09dGhpcy5pc1VwZGF0ZVBlbmRpbmcmJih0aGlzLl8kRVM9dGhpcy5fJEVQKCkpfUModCxzLHt1c2VEZWZhdWx0OmkscmVmbGVjdDplLHdyYXBwZWQ6aH0scil7aSYmISh0aGlzLl8kRWo/Pz1uZXcgTWFwKS5oYXModCkmJih0aGlzLl8kRWouc2V0KHQscj8/cz8/dGhpc1t0XSksITAhPT1ofHx2b2lkIDAhPT1yKXx8KHRoaXMuXyRBTC5oYXModCl8fCh0aGlzLmhhc1VwZGF0ZWR8fGl8fChzPXZvaWQgMCksdGhpcy5fJEFMLnNldCh0LHMpKSwhMD09PWUmJnRoaXMuXyRFbSE9PXQmJih0aGlzLl8kRXE/Pz1uZXcgU2V0KS5hZGQodCkpfWFzeW5jIF8kRVAoKXt0aGlzLmlzVXBkYXRlUGVuZGluZz0hMDt0cnl7YXdhaXQgdGhpcy5fJEVTfWNhdGNoKHQpe1Byb21pc2UucmVqZWN0KHQpfWNvbnN0IHQ9dGhpcy5zY2hlZHVsZVVwZGF0ZSgpO3JldHVybiBudWxsIT10JiZhd2FpdCB0LCF0aGlzLmlzVXBkYXRlUGVuZGluZ31zY2hlZHVsZVVwZGF0ZSgpe3JldHVybiB0aGlzLnBlcmZvcm1VcGRhdGUoKX1wZXJmb3JtVXBkYXRlKCl7aWYoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKXJldHVybjtpZighdGhpcy5oYXNVcGRhdGVkKXtpZih0aGlzLnJlbmRlclJvb3Q/Pz10aGlzLmNyZWF0ZVJlbmRlclJvb3QoKSx0aGlzLl8kRXApe2Zvcihjb25zdFt0LHNdb2YgdGhpcy5fJEVwKXRoaXNbdF09czt0aGlzLl8kRXA9dm9pZCAwfWNvbnN0IHQ9dGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50UHJvcGVydGllcztpZih0LnNpemU+MClmb3IoY29uc3RbcyxpXW9mIHQpe2NvbnN0e3dyYXBwZWQ6dH09aSxlPXRoaXNbc107ITAhPT10fHx0aGlzLl8kQUwuaGFzKHMpfHx2b2lkIDA9PT1lfHx0aGlzLkMocyx2b2lkIDAsaSxlKX19bGV0IHQ9ITE7Y29uc3Qgcz10aGlzLl8kQUw7dHJ5e3Q9dGhpcy5zaG91bGRVcGRhdGUocyksdD8odGhpcy53aWxsVXBkYXRlKHMpLHRoaXMuXyRFTz8uZm9yRWFjaCgodD0+dC5ob3N0VXBkYXRlPy4oKSkpLHRoaXMudXBkYXRlKHMpKTp0aGlzLl8kRU0oKX1jYXRjaChzKXt0aHJvdyB0PSExLHRoaXMuXyRFTSgpLHN9dCYmdGhpcy5fJEFFKHMpfXdpbGxVcGRhdGUodCl7fV8kQUUodCl7dGhpcy5fJEVPPy5mb3JFYWNoKCh0PT50Lmhvc3RVcGRhdGVkPy4oKSkpLHRoaXMuaGFzVXBkYXRlZHx8KHRoaXMuaGFzVXBkYXRlZD0hMCx0aGlzLmZpcnN0VXBkYXRlZCh0KSksdGhpcy51cGRhdGVkKHQpfV8kRU0oKXt0aGlzLl8kQUw9bmV3IE1hcCx0aGlzLmlzVXBkYXRlUGVuZGluZz0hMX1nZXQgdXBkYXRlQ29tcGxldGUoKXtyZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpfWdldFVwZGF0ZUNvbXBsZXRlKCl7cmV0dXJuIHRoaXMuXyRFU31zaG91bGRVcGRhdGUodCl7cmV0dXJuITB9dXBkYXRlKHQpe3RoaXMuXyRFcSYmPXRoaXMuXyRFcS5mb3JFYWNoKCh0PT50aGlzLl8kRVQodCx0aGlzW3RdKSkpLHRoaXMuXyRFTSgpfXVwZGF0ZWQodCl7fWZpcnN0VXBkYXRlZCh0KXt9fXkuZWxlbWVudFN0eWxlcz1bXSx5LnNoYWRvd1Jvb3RPcHRpb25zPXttb2RlOlwib3BlblwifSx5W2QoXCJlbGVtZW50UHJvcGVydGllc1wiKV09bmV3IE1hcCx5W2QoXCJmaW5hbGl6ZWRcIildPW5ldyBNYXAscD8uKHtSZWFjdGl2ZUVsZW1lbnQ6eX0pLChhLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zPz89W10pLnB1c2goXCIyLjEuMVwiKTtleHBvcnR7eSBhcyBSZWFjdGl2ZUVsZW1lbnQscyBhcyBhZG9wdFN0eWxlcyx1IGFzIGRlZmF1bHRDb252ZXJ0ZXIsdCBhcyBnZXRDb21wYXRpYmxlU3R5bGUsZiBhcyBub3RFcXVhbH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdGl2ZS1lbGVtZW50LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCB0PWdsb2JhbFRoaXMsaT10LnRydXN0ZWRUeXBlcyxzPWk/aS5jcmVhdGVQb2xpY3koXCJsaXQtaHRtbFwiLHtjcmVhdGVIVE1MOnQ9PnR9KTp2b2lkIDAsZT1cIiRsaXQkXCIsaD1gbGl0JCR7TWF0aC5yYW5kb20oKS50b0ZpeGVkKDkpLnNsaWNlKDIpfSRgLG89XCI/XCIraCxuPWA8JHtvfT5gLHI9ZG9jdW1lbnQsbD0oKT0+ci5jcmVhdGVDb21tZW50KFwiXCIpLGM9dD0+bnVsbD09PXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LGE9QXJyYXkuaXNBcnJheSx1PXQ9PmEodCl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/LltTeW1ib2wuaXRlcmF0b3JdLGQ9XCJbIFxcdFxcblxcZlxccl1cIixmPS88KD86KCEtLXxcXC9bXmEtekEtWl0pfChcXC8/W2EtekEtWl1bXj5cXHNdKil8KFxcLz8kKSkvZyx2PS8tLT4vZyxfPS8+L2csbT1SZWdFeHAoYD58JHtkfSg/OihbXlxcXFxzXCInPj0vXSspKCR7ZH0qPSR7ZH0qKD86W14gXFx0XFxuXFxmXFxyXCInXFxgPD49XXwoXCJ8Jyl8KSl8JClgLFwiZ1wiKSxwPS8nL2csZz0vXCIvZywkPS9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaSx5PXQ9PihpLC4uLnMpPT4oe18kbGl0VHlwZSQ6dCxzdHJpbmdzOmksdmFsdWVzOnN9KSx4PXkoMSksYj15KDIpLHc9eSgzKSxUPVN5bWJvbC5mb3IoXCJsaXQtbm9DaGFuZ2VcIiksRT1TeW1ib2wuZm9yKFwibGl0LW5vdGhpbmdcIiksQT1uZXcgV2Vha01hcCxDPXIuY3JlYXRlVHJlZVdhbGtlcihyLDEyOSk7ZnVuY3Rpb24gUCh0LGkpe2lmKCFhKHQpfHwhdC5oYXNPd25Qcm9wZXJ0eShcInJhd1wiKSl0aHJvdyBFcnJvcihcImludmFsaWQgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVwiKTtyZXR1cm4gdm9pZCAwIT09cz9zLmNyZWF0ZUhUTUwoaSk6aX1jb25zdCBWPSh0LGkpPT57Y29uc3Qgcz10Lmxlbmd0aC0xLG89W107bGV0IHIsbD0yPT09aT9cIjxzdmc+XCI6Mz09PWk/XCI8bWF0aD5cIjpcIlwiLGM9Zjtmb3IobGV0IGk9MDtpPHM7aSsrKXtjb25zdCBzPXRbaV07bGV0IGEsdSxkPS0xLHk9MDtmb3IoO3k8cy5sZW5ndGgmJihjLmxhc3RJbmRleD15LHU9Yy5leGVjKHMpLG51bGwhPT11KTspeT1jLmxhc3RJbmRleCxjPT09Zj9cIiEtLVwiPT09dVsxXT9jPXY6dm9pZCAwIT09dVsxXT9jPV86dm9pZCAwIT09dVsyXT8oJC50ZXN0KHVbMl0pJiYocj1SZWdFeHAoXCI8L1wiK3VbMl0sXCJnXCIpKSxjPW0pOnZvaWQgMCE9PXVbM10mJihjPW0pOmM9PT1tP1wiPlwiPT09dVswXT8oYz1yPz9mLGQ9LTEpOnZvaWQgMD09PXVbMV0/ZD0tMjooZD1jLmxhc3RJbmRleC11WzJdLmxlbmd0aCxhPXVbMV0sYz12b2lkIDA9PT11WzNdP206J1wiJz09PXVbM10/ZzpwKTpjPT09Z3x8Yz09PXA/Yz1tOmM9PT12fHxjPT09Xz9jPWY6KGM9bSxyPXZvaWQgMCk7Y29uc3QgeD1jPT09bSYmdFtpKzFdLnN0YXJ0c1dpdGgoXCIvPlwiKT9cIiBcIjpcIlwiO2wrPWM9PT1mP3MrbjpkPj0wPyhvLnB1c2goYSkscy5zbGljZSgwLGQpK2Urcy5zbGljZShkKStoK3gpOnMraCsoLTI9PT1kP2k6eCl9cmV0dXJuW1AodCxsKyh0W3NdfHxcIjw/PlwiKSsoMj09PWk/XCI8L3N2Zz5cIjozPT09aT9cIjwvbWF0aD5cIjpcIlwiKSksb119O2NsYXNzIE57Y29uc3RydWN0b3Ioe3N0cmluZ3M6dCxfJGxpdFR5cGUkOnN9LG4pe2xldCByO3RoaXMucGFydHM9W107bGV0IGM9MCxhPTA7Y29uc3QgdT10Lmxlbmd0aC0xLGQ9dGhpcy5wYXJ0cyxbZix2XT1WKHQscyk7aWYodGhpcy5lbD1OLmNyZWF0ZUVsZW1lbnQoZixuKSxDLmN1cnJlbnROb2RlPXRoaXMuZWwuY29udGVudCwyPT09c3x8Mz09PXMpe2NvbnN0IHQ9dGhpcy5lbC5jb250ZW50LmZpcnN0Q2hpbGQ7dC5yZXBsYWNlV2l0aCguLi50LmNoaWxkTm9kZXMpfWZvcig7bnVsbCE9PShyPUMubmV4dE5vZGUoKSkmJmQubGVuZ3RoPHU7KXtpZigxPT09ci5ub2RlVHlwZSl7aWYoci5oYXNBdHRyaWJ1dGVzKCkpZm9yKGNvbnN0IHQgb2Ygci5nZXRBdHRyaWJ1dGVOYW1lcygpKWlmKHQuZW5kc1dpdGgoZSkpe2NvbnN0IGk9dlthKytdLHM9ci5nZXRBdHRyaWJ1dGUodCkuc3BsaXQoaCksZT0vKFsuP0BdKT8oLiopLy5leGVjKGkpO2QucHVzaCh7dHlwZToxLGluZGV4OmMsbmFtZTplWzJdLHN0cmluZ3M6cyxjdG9yOlwiLlwiPT09ZVsxXT9IOlwiP1wiPT09ZVsxXT9JOlwiQFwiPT09ZVsxXT9MOmt9KSxyLnJlbW92ZUF0dHJpYnV0ZSh0KX1lbHNlIHQuc3RhcnRzV2l0aChoKSYmKGQucHVzaCh7dHlwZTo2LGluZGV4OmN9KSxyLnJlbW92ZUF0dHJpYnV0ZSh0KSk7aWYoJC50ZXN0KHIudGFnTmFtZSkpe2NvbnN0IHQ9ci50ZXh0Q29udGVudC5zcGxpdChoKSxzPXQubGVuZ3RoLTE7aWYocz4wKXtyLnRleHRDb250ZW50PWk/aS5lbXB0eVNjcmlwdDpcIlwiO2ZvcihsZXQgaT0wO2k8cztpKyspci5hcHBlbmQodFtpXSxsKCkpLEMubmV4dE5vZGUoKSxkLnB1c2goe3R5cGU6MixpbmRleDorK2N9KTtyLmFwcGVuZCh0W3NdLGwoKSl9fX1lbHNlIGlmKDg9PT1yLm5vZGVUeXBlKWlmKHIuZGF0YT09PW8pZC5wdXNoKHt0eXBlOjIsaW5kZXg6Y30pO2Vsc2V7bGV0IHQ9LTE7Zm9yKDstMSE9PSh0PXIuZGF0YS5pbmRleE9mKGgsdCsxKSk7KWQucHVzaCh7dHlwZTo3LGluZGV4OmN9KSx0Kz1oLmxlbmd0aC0xfWMrK319c3RhdGljIGNyZWF0ZUVsZW1lbnQodCxpKXtjb25zdCBzPXIuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO3JldHVybiBzLmlubmVySFRNTD10LHN9fWZ1bmN0aW9uIFModCxpLHM9dCxlKXtpZihpPT09VClyZXR1cm4gaTtsZXQgaD12b2lkIDAhPT1lP3MuXyRDbz8uW2VdOnMuXyRDbDtjb25zdCBvPWMoaSk/dm9pZCAwOmkuXyRsaXREaXJlY3RpdmUkO3JldHVybiBoPy5jb25zdHJ1Y3RvciE9PW8mJihoPy5fJEFPPy4oITEpLHZvaWQgMD09PW8/aD12b2lkIDA6KGg9bmV3IG8odCksaC5fJEFUKHQscyxlKSksdm9pZCAwIT09ZT8ocy5fJENvPz89W10pW2VdPWg6cy5fJENsPWgpLHZvaWQgMCE9PWgmJihpPVModCxoLl8kQVModCxpLnZhbHVlcyksaCxlKSksaX1jbGFzcyBNe2NvbnN0cnVjdG9yKHQsaSl7dGhpcy5fJEFWPVtdLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5fJEFEPXQsdGhpcy5fJEFNPWl9Z2V0IHBhcmVudE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFNLnBhcmVudE5vZGV9Z2V0IF8kQVUoKXtyZXR1cm4gdGhpcy5fJEFNLl8kQVV9dSh0KXtjb25zdHtlbDp7Y29udGVudDppfSxwYXJ0czpzfT10aGlzLl8kQUQsZT0odD8uY3JlYXRpb25TY29wZT8/cikuaW1wb3J0Tm9kZShpLCEwKTtDLmN1cnJlbnROb2RlPWU7bGV0IGg9Qy5uZXh0Tm9kZSgpLG89MCxuPTAsbD1zWzBdO2Zvcig7dm9pZCAwIT09bDspe2lmKG89PT1sLmluZGV4KXtsZXQgaTsyPT09bC50eXBlP2k9bmV3IFIoaCxoLm5leHRTaWJsaW5nLHRoaXMsdCk6MT09PWwudHlwZT9pPW5ldyBsLmN0b3IoaCxsLm5hbWUsbC5zdHJpbmdzLHRoaXMsdCk6Nj09PWwudHlwZSYmKGk9bmV3IHooaCx0aGlzLHQpKSx0aGlzLl8kQVYucHVzaChpKSxsPXNbKytuXX1vIT09bD8uaW5kZXgmJihoPUMubmV4dE5vZGUoKSxvKyspfXJldHVybiBDLmN1cnJlbnROb2RlPXIsZX1wKHQpe2xldCBpPTA7Zm9yKGNvbnN0IHMgb2YgdGhpcy5fJEFWKXZvaWQgMCE9PXMmJih2b2lkIDAhPT1zLnN0cmluZ3M/KHMuXyRBSSh0LHMsaSksaSs9cy5zdHJpbmdzLmxlbmd0aC0yKTpzLl8kQUkodFtpXSkpLGkrK319Y2xhc3MgUntnZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0/Ll8kQVU/P3RoaXMuXyRDdn1jb25zdHJ1Y3Rvcih0LGkscyxlKXt0aGlzLnR5cGU9Mix0aGlzLl8kQUg9RSx0aGlzLl8kQU49dm9pZCAwLHRoaXMuXyRBQT10LHRoaXMuXyRBQj1pLHRoaXMuXyRBTT1zLHRoaXMub3B0aW9ucz1lLHRoaXMuXyRDdj1lPy5pc0Nvbm5lY3RlZD8/ITB9Z2V0IHBhcmVudE5vZGUoKXtsZXQgdD10aGlzLl8kQUEucGFyZW50Tm9kZTtjb25zdCBpPXRoaXMuXyRBTTtyZXR1cm4gdm9pZCAwIT09aSYmMTE9PT10Py5ub2RlVHlwZSYmKHQ9aS5wYXJlbnROb2RlKSx0fWdldCBzdGFydE5vZGUoKXtyZXR1cm4gdGhpcy5fJEFBfWdldCBlbmROb2RlKCl7cmV0dXJuIHRoaXMuXyRBQn1fJEFJKHQsaT10aGlzKXt0PVModGhpcyx0LGkpLGModCk/dD09PUV8fG51bGw9PXR8fFwiXCI9PT10Pyh0aGlzLl8kQUghPT1FJiZ0aGlzLl8kQVIoKSx0aGlzLl8kQUg9RSk6dCE9PXRoaXMuXyRBSCYmdCE9PVQmJnRoaXMuXyh0KTp2b2lkIDAhPT10Ll8kbGl0VHlwZSQ/dGhpcy4kKHQpOnZvaWQgMCE9PXQubm9kZVR5cGU/dGhpcy5UKHQpOnUodCk/dGhpcy5rKHQpOnRoaXMuXyh0KX1PKHQpe3JldHVybiB0aGlzLl8kQUEucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodCx0aGlzLl8kQUIpfVQodCl7dGhpcy5fJEFIIT09dCYmKHRoaXMuXyRBUigpLHRoaXMuXyRBSD10aGlzLk8odCkpfV8odCl7dGhpcy5fJEFIIT09RSYmYyh0aGlzLl8kQUgpP3RoaXMuXyRBQS5uZXh0U2libGluZy5kYXRhPXQ6dGhpcy5UKHIuY3JlYXRlVGV4dE5vZGUodCkpLHRoaXMuXyRBSD10fSQodCl7Y29uc3R7dmFsdWVzOmksXyRsaXRUeXBlJDpzfT10LGU9XCJudW1iZXJcIj09dHlwZW9mIHM/dGhpcy5fJEFDKHQpOih2b2lkIDA9PT1zLmVsJiYocy5lbD1OLmNyZWF0ZUVsZW1lbnQoUChzLmgscy5oWzBdKSx0aGlzLm9wdGlvbnMpKSxzKTtpZih0aGlzLl8kQUg/Ll8kQUQ9PT1lKXRoaXMuXyRBSC5wKGkpO2Vsc2V7Y29uc3QgdD1uZXcgTShlLHRoaXMpLHM9dC51KHRoaXMub3B0aW9ucyk7dC5wKGkpLHRoaXMuVChzKSx0aGlzLl8kQUg9dH19XyRBQyh0KXtsZXQgaT1BLmdldCh0LnN0cmluZ3MpO3JldHVybiB2b2lkIDA9PT1pJiZBLnNldCh0LnN0cmluZ3MsaT1uZXcgTih0KSksaX1rKHQpe2EodGhpcy5fJEFIKXx8KHRoaXMuXyRBSD1bXSx0aGlzLl8kQVIoKSk7Y29uc3QgaT10aGlzLl8kQUg7bGV0IHMsZT0wO2Zvcihjb25zdCBoIG9mIHQpZT09PWkubGVuZ3RoP2kucHVzaChzPW5ldyBSKHRoaXMuTyhsKCkpLHRoaXMuTyhsKCkpLHRoaXMsdGhpcy5vcHRpb25zKSk6cz1pW2VdLHMuXyRBSShoKSxlKys7ZTxpLmxlbmd0aCYmKHRoaXMuXyRBUihzJiZzLl8kQUIubmV4dFNpYmxpbmcsZSksaS5sZW5ndGg9ZSl9XyRBUih0PXRoaXMuXyRBQS5uZXh0U2libGluZyxpKXtmb3IodGhpcy5fJEFQPy4oITEsITAsaSk7dCE9PXRoaXMuXyRBQjspe2NvbnN0IGk9dC5uZXh0U2libGluZzt0LnJlbW92ZSgpLHQ9aX19c2V0Q29ubmVjdGVkKHQpe3ZvaWQgMD09PXRoaXMuXyRBTSYmKHRoaXMuXyRDdj10LHRoaXMuXyRBUD8uKHQpKX19Y2xhc3Mga3tnZXQgdGFnTmFtZSgpe3JldHVybiB0aGlzLmVsZW1lbnQudGFnTmFtZX1nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1jb25zdHJ1Y3Rvcih0LGkscyxlLGgpe3RoaXMudHlwZT0xLHRoaXMuXyRBSD1FLHRoaXMuXyRBTj12b2lkIDAsdGhpcy5lbGVtZW50PXQsdGhpcy5uYW1lPWksdGhpcy5fJEFNPWUsdGhpcy5vcHRpb25zPWgscy5sZW5ndGg+Mnx8XCJcIiE9PXNbMF18fFwiXCIhPT1zWzFdPyh0aGlzLl8kQUg9QXJyYXkocy5sZW5ndGgtMSkuZmlsbChuZXcgU3RyaW5nKSx0aGlzLnN0cmluZ3M9cyk6dGhpcy5fJEFIPUV9XyRBSSh0LGk9dGhpcyxzLGUpe2NvbnN0IGg9dGhpcy5zdHJpbmdzO2xldCBvPSExO2lmKHZvaWQgMD09PWgpdD1TKHRoaXMsdCxpLDApLG89IWModCl8fHQhPT10aGlzLl8kQUgmJnQhPT1ULG8mJih0aGlzLl8kQUg9dCk7ZWxzZXtjb25zdCBlPXQ7bGV0IG4scjtmb3IodD1oWzBdLG49MDtuPGgubGVuZ3RoLTE7bisrKXI9Uyh0aGlzLGVbcytuXSxpLG4pLHI9PT1UJiYocj10aGlzLl8kQUhbbl0pLG98fD0hYyhyKXx8ciE9PXRoaXMuXyRBSFtuXSxyPT09RT90PUU6dCE9PUUmJih0Kz0ocj8/XCJcIikraFtuKzFdKSx0aGlzLl8kQUhbbl09cn1vJiYhZSYmdGhpcy5qKHQpfWoodCl7dD09PUU/dGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpOnRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLHQ/P1wiXCIpfX1jbGFzcyBIIGV4dGVuZHMga3tjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy50eXBlPTN9aih0KXt0aGlzLmVsZW1lbnRbdGhpcy5uYW1lXT10PT09RT92b2lkIDA6dH19Y2xhc3MgSSBleHRlbmRzIGt7Y29uc3RydWN0b3IoKXtzdXBlciguLi5hcmd1bWVudHMpLHRoaXMudHlwZT00fWoodCl7dGhpcy5lbGVtZW50LnRvZ2dsZUF0dHJpYnV0ZSh0aGlzLm5hbWUsISF0JiZ0IT09RSl9fWNsYXNzIEwgZXh0ZW5kcyBre2NvbnN0cnVjdG9yKHQsaSxzLGUsaCl7c3VwZXIodCxpLHMsZSxoKSx0aGlzLnR5cGU9NX1fJEFJKHQsaT10aGlzKXtpZigodD1TKHRoaXMsdCxpLDApPz9FKT09PVQpcmV0dXJuO2NvbnN0IHM9dGhpcy5fJEFILGU9dD09PUUmJnMhPT1FfHx0LmNhcHR1cmUhPT1zLmNhcHR1cmV8fHQub25jZSE9PXMub25jZXx8dC5wYXNzaXZlIT09cy5wYXNzaXZlLGg9dCE9PUUmJihzPT09RXx8ZSk7ZSYmdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMscyksaCYmdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLHRoaXMsdCksdGhpcy5fJEFIPXR9aGFuZGxlRXZlbnQodCl7XCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5fJEFIP3RoaXMuXyRBSC5jYWxsKHRoaXMub3B0aW9ucz8uaG9zdD8/dGhpcy5lbGVtZW50LHQpOnRoaXMuXyRBSC5oYW5kbGVFdmVudCh0KX19Y2xhc3Mgentjb25zdHJ1Y3Rvcih0LGkscyl7dGhpcy5lbGVtZW50PXQsdGhpcy50eXBlPTYsdGhpcy5fJEFOPXZvaWQgMCx0aGlzLl8kQU09aSx0aGlzLm9wdGlvbnM9c31nZXQgXyRBVSgpe3JldHVybiB0aGlzLl8kQU0uXyRBVX1fJEFJKHQpe1ModGhpcyx0KX19Y29uc3QgWj17TTplLFA6aCxBOm8sQzoxLEw6VixSOk0sRDp1LFY6UyxJOlIsSDprLE46SSxVOkwsQjpILEY6en0saj10LmxpdEh0bWxQb2x5ZmlsbFN1cHBvcnQ7aj8uKE4sUiksKHQubGl0SHRtbFZlcnNpb25zPz89W10pLnB1c2goXCIzLjMuMVwiKTtjb25zdCBCPSh0LGkscyk9Pntjb25zdCBlPXM/LnJlbmRlckJlZm9yZT8/aTtsZXQgaD1lLl8kbGl0UGFydCQ7aWYodm9pZCAwPT09aCl7Y29uc3QgdD1zPy5yZW5kZXJCZWZvcmU/P251bGw7ZS5fJGxpdFBhcnQkPWg9bmV3IFIoaS5pbnNlcnRCZWZvcmUobCgpLHQpLHQsdm9pZCAwLHM/P3t9KX1yZXR1cm4gaC5fJEFJKHQpLGh9O2V4cG9ydHtaIGFzIF8kTEgseCBhcyBodG1sLHcgYXMgbWF0aG1sLFQgYXMgbm9DaGFuZ2UsRSBhcyBub3RoaW5nLEIgYXMgcmVuZGVyLGIgYXMgc3ZnfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1odG1sLmpzLm1hcFxuIiwiaW1wb3J0e1JlYWN0aXZlRWxlbWVudCBhcyB0fWZyb21cIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiO2V4cG9ydCpmcm9tXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjtpbXBvcnR7cmVuZGVyIGFzIGUsbm9DaGFuZ2UgYXMgcn1mcm9tXCJsaXQtaHRtbFwiO2V4cG9ydCpmcm9tXCJsaXQtaHRtbFwiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovY29uc3Qgcz1nbG9iYWxUaGlzO2NsYXNzIGkgZXh0ZW5kcyB0e2NvbnN0cnVjdG9yKCl7c3VwZXIoLi4uYXJndW1lbnRzKSx0aGlzLnJlbmRlck9wdGlvbnM9e2hvc3Q6dGhpc30sdGhpcy5fJERvPXZvaWQgMH1jcmVhdGVSZW5kZXJSb290KCl7Y29uc3QgdD1zdXBlci5jcmVhdGVSZW5kZXJSb290KCk7cmV0dXJuIHRoaXMucmVuZGVyT3B0aW9ucy5yZW5kZXJCZWZvcmU/Pz10LmZpcnN0Q2hpbGQsdH11cGRhdGUodCl7Y29uc3Qgcj10aGlzLnJlbmRlcigpO3RoaXMuaGFzVXBkYXRlZHx8KHRoaXMucmVuZGVyT3B0aW9ucy5pc0Nvbm5lY3RlZD10aGlzLmlzQ29ubmVjdGVkKSxzdXBlci51cGRhdGUodCksdGhpcy5fJERvPWUocix0aGlzLnJlbmRlclJvb3QsdGhpcy5yZW5kZXJPcHRpb25zKX1jb25uZWN0ZWRDYWxsYmFjaygpe3N1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCksdGhpcy5fJERvPy5zZXRDb25uZWN0ZWQoITApfWRpc2Nvbm5lY3RlZENhbGxiYWNrKCl7c3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKSx0aGlzLl8kRG8/LnNldENvbm5lY3RlZCghMSl9cmVuZGVyKCl7cmV0dXJuIHJ9fWkuXyRsaXRFbGVtZW50JD0hMCxpW1wiZmluYWxpemVkXCJdPSEwLHMubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0Py4oe0xpdEVsZW1lbnQ6aX0pO2NvbnN0IG89cy5saXRFbGVtZW50UG9seWZpbGxTdXBwb3J0O28/Lih7TGl0RWxlbWVudDppfSk7Y29uc3Qgbj17XyRBSzoodCxlLHIpPT57dC5fJEFLKGUscil9LF8kQUw6dD0+dC5fJEFMfTsocy5saXRFbGVtZW50VmVyc2lvbnM/Pz1bXSkucHVzaChcIjQuMi4xXCIpO2V4cG9ydHtpIGFzIExpdEVsZW1lbnQsbiBhcyBfJExFfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1lbGVtZW50LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5jb25zdCB0PXQ9PihlLG8pPT57dm9pZCAwIT09bz9vLmFkZEluaXRpYWxpemVyKCgoKT0+e2N1c3RvbUVsZW1lbnRzLmRlZmluZSh0LGUpfSkpOmN1c3RvbUVsZW1lbnRzLmRlZmluZSh0LGUpfTtleHBvcnR7dCBhcyBjdXN0b21FbGVtZW50fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWN1c3RvbS1lbGVtZW50LmpzLm1hcFxuIiwiaW1wb3J0e2RlZmF1bHRDb252ZXJ0ZXIgYXMgdCxub3RFcXVhbCBhcyBlfWZyb21cIi4uL3JlYWN0aXZlLWVsZW1lbnQuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2NvbnN0IG89e2F0dHJpYnV0ZTohMCx0eXBlOlN0cmluZyxjb252ZXJ0ZXI6dCxyZWZsZWN0OiExLGhhc0NoYW5nZWQ6ZX0scj0odD1vLGUscik9Pntjb25zdHtraW5kOm4sbWV0YWRhdGE6aX09cjtsZXQgcz1nbG9iYWxUaGlzLmxpdFByb3BlcnR5TWV0YWRhdGEuZ2V0KGkpO2lmKHZvaWQgMD09PXMmJmdsb2JhbFRoaXMubGl0UHJvcGVydHlNZXRhZGF0YS5zZXQoaSxzPW5ldyBNYXApLFwic2V0dGVyXCI9PT1uJiYoKHQ9T2JqZWN0LmNyZWF0ZSh0KSkud3JhcHBlZD0hMCkscy5zZXQoci5uYW1lLHQpLFwiYWNjZXNzb3JcIj09PW4pe2NvbnN0e25hbWU6b309cjtyZXR1cm57c2V0KHIpe2NvbnN0IG49ZS5nZXQuY2FsbCh0aGlzKTtlLnNldC5jYWxsKHRoaXMsciksdGhpcy5yZXF1ZXN0VXBkYXRlKG8sbix0KX0saW5pdChlKXtyZXR1cm4gdm9pZCAwIT09ZSYmdGhpcy5DKG8sdm9pZCAwLHQsZSksZX19fWlmKFwic2V0dGVyXCI9PT1uKXtjb25zdHtuYW1lOm99PXI7cmV0dXJuIGZ1bmN0aW9uKHIpe2NvbnN0IG49dGhpc1tvXTtlLmNhbGwodGhpcyxyKSx0aGlzLnJlcXVlc3RVcGRhdGUobyxuLHQpfX10aHJvdyBFcnJvcihcIlVuc3VwcG9ydGVkIGRlY29yYXRvciBsb2NhdGlvbjogXCIrbil9O2Z1bmN0aW9uIG4odCl7cmV0dXJuKGUsbyk9Plwib2JqZWN0XCI9PXR5cGVvZiBvP3IodCxlLG8pOigodCxlLG8pPT57Y29uc3Qgcj1lLmhhc093blByb3BlcnR5KG8pO3JldHVybiBlLmNvbnN0cnVjdG9yLmNyZWF0ZVByb3BlcnR5KG8sdCkscj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsbyk6dm9pZCAwfSkodCxlLG8pfWV4cG9ydHtuIGFzIHByb3BlcnR5LHIgYXMgc3RhbmRhcmRQcm9wZXJ0eX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wZXJ0eS5qcy5tYXBcbiIsImltcG9ydHtwcm9wZXJ0eSBhcyB0fWZyb21cIi4vcHJvcGVydHkuanNcIjtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL2Z1bmN0aW9uIHIocil7cmV0dXJuIHQoey4uLnIsc3RhdGU6ITAsYXR0cmlidXRlOiExfSl9ZXhwb3J0e3IgYXMgc3RhdGV9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwXG4iLCJpbXBvcnQgdHlwZSB7IFRpbWVkZWx0YSwgTGVnLCBMZWdTdGF0aW9uLCBUaW1lc3RhbXAgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlFcXVhbHM8VD4oYXJyMTogVFtdLCBhcnIyOiBUW10pOiBib29sZWFuIHtcbiAgcmV0dXJuIGFycjEubGVuZ3RoID09PSBhcnIyLmxlbmd0aCAmJiBhcnIxLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcnIyW2ldKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNhbGNEZWxheSA9ICh0ZDogVGltZWRlbHRhKTogbnVtYmVyID0+IHtcbiAgY29uc3QgW2hvdXJzLCBtaW51dGVzXSA9IHRkLnNwbGl0KFwiOlwiLCAzKTtcbiAgcmV0dXJuICtob3VycyAqIDYwICsgK21pbnV0ZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U3RhcnQgPSAobGVnOiBMZWcpOiBMZWdTdGF0aW9uID0+ICh7XG4gIHNjaGVkdWxlZDogbGVnLmRlcGFydHVyZSxcbiAgZGVsYXk6IGNhbGNEZWxheShsZWcuZGVsYXkpLFxuICBwbGF0Zm9ybTogbGVnLnBsYXRmb3JtLFxuICBzdGF0aW9uTmFtZTogbGVnLm9yaWdpbixcbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0RW5kID0gKGxlZzogTGVnKTogTGVnU3RhdGlvbiA9PiAoe1xuICBzY2hlZHVsZWQ6IGxlZy5hcnJpdmFsLFxuICBkZWxheTogY2FsY0RlbGF5KGxlZy5kZWxheV9hcnJpdmFsKSxcbiAgcGxhdGZvcm06IGxlZy5wbGF0Zm9ybV9hcnJpdmFsLFxuICBzdGF0aW9uTmFtZTogbGVnLmRlc3RpbmF0aW9uLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjVGltZVN0YW1wRGVsdGFNaW5zKGE6IFRpbWVzdGFtcCwgYjogVGltZXN0YW1wKTogbnVtYmVyIHtcbiAgY29uc3QgYUQgPSBuZXcgRGF0ZShhKTtcbiAgY29uc3QgYkQgPSBuZXcgRGF0ZShiKTtcblxuICBjb25zdCBtc0RpZmYgPSBNYXRoLmFicygrYUQgLSArYkQpO1xuICByZXR1cm4gTWF0aC5yb3VuZChtc0RpZmYgLyAxMDAwIC8gNjApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluc1RvRmlyc3RMZWcobm93OiBudW1iZXIsIGZpcnN0TGVnOiBMZWcpIHtcbiAgY29uc3QgZGVsYXkgPSBjYWxjRGVsYXkoZmlyc3RMZWcuZGVsYXkpO1xuICBjb25zdCBpbk1zID0gK25ldyBEYXRlKGZpcnN0TGVnLmRlcGFydHVyZSkgLSArbm93O1xuICBjb25zdCBpbk1pbnMgPSBNYXRoLnJvdW5kKGluTXMgLyAxMDAwIC8gNjApICsgZGVsYXk7XG4gIHJldHVybiBpbk1pbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzTGVncyhcbiAgbGVnczogTGVnW10sXG4gIG9yaWdpbk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgZGVzdGluYXRpb25OYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IExlZ1tdIHtcbiAgbGV0IHByb2Nlc3NlZCA9IGZpbHRlclBsYXRmb3JtQ2hhbmdlKGxlZ3MpO1xuICBwcm9jZXNzZWQgPSB3YWxrVG9QbGF0Zm9ybShwcm9jZXNzZWQpO1xuICBwcm9jZXNzZWQgPSBwcm9jZXNzU2hvcnRJbml0aWFsV2Fsayhwcm9jZXNzZWQsIG9yaWdpbk5hbWUpO1xuICBwcm9jZXNzZWQgPSBwcm9jZXNzU2hvcnRGaW5hbFdhbGsocHJvY2Vzc2VkLCBkZXN0aW5hdGlvbk5hbWUpO1xuICByZXR1cm4gcHJvY2Vzc2VkO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2hvcnRJbml0aWFsV2FsayhcbiAgbGVnczogTGVnW10sXG4gIG9yaWdpbk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogTGVnW10ge1xuICBjb25zdCBNQVhfRFVSQVRJT05fTUlOUyA9IDM7XG4gIGNvbnN0IHBvcEZuID0gKHZzOiBMZWdbXSkgPT4gdnMuc2xpY2UoMSk7XG4gIHJldHVybiBwcm9jZXNzU2hvcnRXYWxrKFxuICAgIGxlZ3MsXG4gICAgbGVnc1swXSxcbiAgICBNQVhfRFVSQVRJT05fTUlOUyxcbiAgICBwb3BGbixcbiAgICBcIm9yaWdpblwiLFxuICAgIG9yaWdpbk5hbWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Nob3J0RmluYWxXYWxrKFxuICBsZWdzOiBMZWdbXSxcbiAgZGVzdGluYXRpb25OYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IExlZ1tdIHtcbiAgY29uc3QgTUFYX0RVUkFUSU9OX01JTlMgPSA1O1xuICBjb25zdCBwb3BGbiA9ICh2czogTGVnW10pID0+IHZzLnNsaWNlKDAsIC0xKTtcbiAgcmV0dXJuIHByb2Nlc3NTaG9ydFdhbGsoXG4gICAgbGVncyxcbiAgICBsZWdzW2xlZ3MubGVuZ3RoIC0gMV0sXG4gICAgTUFYX0RVUkFUSU9OX01JTlMsXG4gICAgcG9wRm4sXG4gICAgXCJkZXN0aW5hdGlvblwiLFxuICAgIGRlc3RpbmF0aW9uTmFtZVxuICApO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2hvcnRXYWxrKFxuICBsZWdzOiBMZWdbXSxcbiAgbGVnOiBMZWcgfCB1bmRlZmluZWQsXG4gIG1heER1cmF0aW9uOiBudW1iZXIsXG4gIHBvcEZuOiAobHM6IExlZ1tdKSA9PiBMZWdbXSxcbiAgcmVuYW1lVGFyZ2V0OiBcIm9yaWdpblwiIHwgXCJkZXN0aW5hdGlvblwiLFxuICB1c2VyRGVmaW5lZE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogTGVnW10ge1xuICBpZiAobGVncy5sZW5ndGggPT09IDAgfHwgIWxlZyB8fCBsZWcubW9kZSAhPT0gXCJ3YWxraW5nXCIpIHJldHVybiBsZWdzO1xuXG4gIGNvbnN0IGR1cmF0aW9uID0gY2FsY1RpbWVTdGFtcERlbHRhTWlucyhsZWcuZGVwYXJ0dXJlLCBsZWcuYXJyaXZhbCk7XG4gIGlmIChkdXJhdGlvbiA+IG1heER1cmF0aW9uKSB7XG4gICAgLy8gd2Ugd29udCByZW1vdmUgdGhpcyBsZWcsIGNhbiB3ZSByZXBsYWNlIGl0cyBuYW1lP1xuICAgIGlmICh1c2VyRGVmaW5lZE5hbWUpIGxlZ1tyZW5hbWVUYXJnZXRdID0gdXNlckRlZmluZWROYW1lO1xuICAgIHJldHVybiBsZWdzO1xuICB9XG5cbiAgcmV0dXJuIHBvcEZuKGxlZ3MpO1xufVxuXG4vLyBQbGF0Zm9ybSBjaGFuZ2VzIChpLmUuIGF0IHRoZSBzYW1lIHN0YXRpb24pIGFyZSBub3QgXCJyZWFsXCIgd2Fsa2luZyBsZWdzXG5mdW5jdGlvbiBmaWx0ZXJQbGF0Zm9ybUNoYW5nZShsZWdzOiBMZWdbXSk6IExlZ1tdIHtcbiAgcmV0dXJuIGxlZ3MuZmlsdGVyKFxuICAgIChsZWcpID0+ICEobGVnLm1vZGUgPT09IFwid2Fsa2luZ1wiICYmIGxlZy5kZXN0aW5hdGlvbiA9PT0gbGVnLm9yaWdpbilcbiAgKTtcbn1cblxuLy8gV2Fsa2luZyBsZWdzIGhhdmUgdGhlaXIgb3duIG9yaWdpbi9kZXN0aW5hdGlvbixcbi8vIGluc3RlYWQgdXNlIHRoZSBwcmV2aW91cyBsZWcncyBkZXN0aW5hdGlvbiBhcyBvcmlnaW5cbi8vIGFuZCBuZXh0IGxlZydzIG9yaWdpbiBhcyBkZXN0aW5hdGlvblxuZnVuY3Rpb24gd2Fsa1RvUGxhdGZvcm0obGVnczogTGVnW10pOiBMZWdbXSB7XG4gIGxlZ3MuZm9yRWFjaCgobGVnLCBpKSA9PiB7XG4gICAgaWYgKGxlZy5tb2RlICE9PSBcIndhbGtpbmdcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJldiA9IGkgPiAwID8gbGVnc1tpIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbmV4dCA9IGkgKyAxIDwgbGVncy5sZW5ndGggPyBsZWdzW2kgKyAxXSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBsZWcub3JpZ2luID0gcHJldi5kZXN0aW5hdGlvbjtcbiAgICAgIGxlZy5wbGF0Zm9ybSA9IHByZXYucGxhdGZvcm1fYXJyaXZhbDtcbiAgICB9XG4gICAgaWYgKG5leHQpIHtcbiAgICAgIGxlZy5kZXN0aW5hdGlvbiA9IG5leHQub3JpZ2luO1xuICAgICAgbGVnLnBsYXRmb3JtX2Fycml2YWwgPSBuZXh0LnBsYXRmb3JtO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsZWdzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3ZnIHdpZHRoPVxcXCIxNlxcXCIgaGVpZ2h0PVxcXCIxOVxcXCIgdmlld0JveD1cXFwiMCAwIDEzIDE2XFxcIiBmaWxsPVxcXCJub25lXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlxcbjxwYXRoIGQ9XFxcIk0xLjYyNSAxNkMxLjM5NDc5IDE2IDEuMjAxODIgMTUuOTE5MyAxLjA0NjA5IDE1Ljc1NzlDMC44OTAzNjUgMTUuNTk2NSAwLjgxMjUgMTUuMzk2NSAwLjgxMjUgMTUuMTU3OVYxMy40MzE2QzAuNTY4NzUgMTMuMTUwOSAwLjM3MjM5NiAxMi44Mzg2IDAuMjIzNDM3IDEyLjQ5NDdDMC4wNzQ0NzkyIDEyLjE1MDkgMCAxMS43NzU0IDAgMTEuMzY4NFYzLjM2ODQyQzAgMi4yMDM1MSAwLjUyMTM1NCAxLjM1MDg4IDEuNTY0MDYgMC44MTA1MjZDMi42MDY3NyAwLjI3MDE3NSA0LjI1MjA4IDAgNi41IDBDOC44MjkxNyAwIDEwLjQ5NDggMC4yNTk2NDkgMTEuNDk2OSAwLjc3ODk0N0MxMi40OTkgMS4yOTgyNSAxMyAyLjE2MTQgMTMgMy4zNjg0MlYxMS4zNjg0QzEzIDExLjc3NTQgMTIuOTI1NSAxMi4xNTA5IDEyLjc3NjYgMTIuNDk0N0MxMi42Mjc2IDEyLjgzODYgMTIuNDMxMiAxMy4xNTA5IDEyLjE4NzUgMTMuNDMxNlYxNS4xNTc5QzEyLjE4NzUgMTUuMzk2NSAxMi4xMDk2IDE1LjU5NjUgMTEuOTUzOSAxNS43NTc5QzExLjc5ODIgMTUuOTE5MyAxMS42MDUyIDE2IDExLjM3NSAxNkgxMC41NjI1QzEwLjMzMjMgMTYgMTAuMTM5MyAxNS45MTkzIDkuOTgzNTkgMTUuNzU3OUM5LjgyNzg2IDE1LjU5NjUgOS43NSAxNS4zOTY1IDkuNzUgMTUuMTU3OVYxNC4zMTU4SDMuMjVWMTUuMTU3OUMzLjI1IDE1LjM5NjUgMy4xNzIxNCAxNS41OTY1IDMuMDE2NDEgMTUuNzU3OUMyLjg2MDY4IDE1LjkxOTMgMi42Njc3MSAxNiAyLjQzNzUgMTZIMS42MjVaTTYuNTQwNjIgMi41MjYzMkgxMS4wOTA2SDEuOTkwNjJINi41NDA2MlpNOS43NSA4LjQyMTA1SDEuNjI1SDExLjM3NUg5Ljc1Wk0xLjYyNSA2LjczNjg0SDExLjM3NVY0LjIxMDUzSDEuNjI1VjYuNzM2ODRaTTMuNjU2MjUgMTEuNzg5NUMzLjk5NDc5IDExLjc4OTUgNC4yODI1NSAxMS42NjY3IDQuNTE5NTMgMTEuNDIxMUM0Ljc1NjUxIDExLjE3NTQgNC44NzUgMTAuODc3MiA0Ljg3NSAxMC41MjYzQzQuODc1IDEwLjE3NTQgNC43NTY1MSA5Ljg3NzE5IDQuNTE5NTMgOS42MzE1OEM0LjI4MjU1IDkuMzg1OTcgMy45OTQ3OSA5LjI2MzE2IDMuNjU2MjUgOS4yNjMxNkMzLjMxNzcxIDkuMjYzMTYgMy4wMjk5NSA5LjM4NTk3IDIuNzkyOTcgOS42MzE1OEMyLjU1NTk5IDkuODc3MTkgMi40Mzc1IDEwLjE3NTQgMi40Mzc1IDEwLjUyNjNDMi40Mzc1IDEwLjg3NzIgMi41NTU5OSAxMS4xNzU0IDIuNzkyOTcgMTEuNDIxMUMzLjAyOTk1IDExLjY2NjcgMy4zMTc3MSAxMS43ODk1IDMuNjU2MjUgMTEuNzg5NVpNOS4zNDM3NSAxMS43ODk1QzkuNjgyMjkgMTEuNzg5NSA5Ljk3MDA1IDExLjY2NjcgMTAuMjA3IDExLjQyMTFDMTAuNDQ0IDExLjE3NTQgMTAuNTYyNSAxMC44NzcyIDEwLjU2MjUgMTAuNTI2M0MxMC41NjI1IDEwLjE3NTQgMTAuNDQ0IDkuODc3MTkgMTAuMjA3IDkuNjMxNThDOS45NzAwNSA5LjM4NTk3IDkuNjgyMjkgOS4yNjMxNiA5LjM0Mzc1IDkuMjYzMTZDOS4wMDUyMSA5LjI2MzE2IDguNzE3NDUgOS4zODU5NyA4LjQ4MDQ3IDkuNjMxNThDOC4yNDM0OSA5Ljg3NzE5IDguMTI1IDEwLjE3NTQgOC4xMjUgMTAuNTI2M0M4LjEyNSAxMC44NzcyIDguMjQzNDkgMTEuMTc1NCA4LjQ4MDQ3IDExLjQyMTFDOC43MTc0NSAxMS42NjY3IDkuMDA1MjEgMTEuNzg5NSA5LjM0Mzc1IDExLjc4OTVaTTEuOTkwNjIgMi41MjYzMkgxMS4wOTA2QzEwLjg4NzUgMi4yODc3MiAxMC40NTA4IDIuMDg3NzIgOS43ODA0NyAxLjkyNjMyQzkuMTEwMTYgMS43NjQ5MSA4LjAzMDIxIDEuNjg0MjEgNi41NDA2MiAxLjY4NDIxQzUuMDkxNjcgMS42ODQyMSA0LjAzMjAzIDEuNzcxOTMgMy4zNjE3MiAxLjk0NzM3QzIuNjkxNDEgMi4xMjI4MSAyLjIzNDM4IDIuMzE1NzkgMS45OTA2MiAyLjUyNjMyWk0zLjI1IDEyLjYzMTZIOS43NUMxMC4xOTY5IDEyLjYzMTYgMTAuNTc5NCAxMi40NjY3IDEwLjg5NzcgMTIuMTM2OEMxMS4yMTU5IDExLjgwNyAxMS4zNzUgMTEuNDEwNSAxMS4zNzUgMTAuOTQ3NFY4LjQyMTA1SDEuNjI1VjEwLjk0NzRDMS42MjUgMTEuNDEwNSAxLjc4NDExIDExLjgwNyAyLjEwMjM0IDEyLjEzNjhDMi40MjA1NyAxMi40NjY3IDIuODAzMTIgMTIuNjMxNiAzLjI1IDEyLjYzMTZaXFxcIiBmaWxsPVxcXCJjdXJyZW50Q29sb3JcXFwiLz5cXG48L3N2Zz5cXG5cIiIsImV4cG9ydCBkZWZhdWx0IFwiPHN2ZyB3aWR0aD1cXFwiMTZcXFwiIGhlaWdodD1cXFwiMTlcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNiAxOVxcXCIgZmlsbD1cXFwibm9uZVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj5cXG48cGF0aCBkPVxcXCJNMCAxMy41VjRDMCAzLjExNjY3IDAuMjI5MTY3IDIuNDEyNSAwLjY4NzUgMS44ODc1QzEuMTQ1ODMgMS4zNjI1IDEuNzUgMC45NjI1IDIuNSAwLjY4NzVDMy4yNSAwLjQxMjUgNC4xMDQxNyAwLjIyOTE2NyA1LjA2MjUgMC4xMzc1QzYuMDIwODMgMC4wNDU4MzMzIDcgMCA4IDBDOS4xIDAgMTAuMTM3NSAwLjA0NTgzMzMgMTEuMTEyNSAwLjEzNzVDMTIuMDg3NSAwLjIyOTE2NyAxMi45Mzc1IDAuNDEyNSAxMy42NjI1IDAuNjg3NUMxNC4zODc1IDAuOTYyNSAxNC45NTgzIDEuMzYyNSAxNS4zNzUgMS44ODc1QzE1Ljc5MTcgMi40MTI1IDE2IDMuMTE2NjcgMTYgNFYxMy41QzE2IDE0LjQ4MzMgMTUuNjYyNSAxNS4zMTI1IDE0Ljk4NzUgMTUuOTg3NUMxNC4zMTI1IDE2LjY2MjUgMTMuNDgzMyAxNyAxMi41IDE3TDE0IDE4LjVWMTlIMTJMMTAgMTdINkw0IDE5SDJWMTguNUwzLjUgMTdDMi41MTY2NyAxNyAxLjY4NzUgMTYuNjYyNSAxLjAxMjUgMTUuOTg3NUMwLjMzNzUgMTUuMzEyNSAwIDE0LjQ4MzMgMCAxMy41Wk04IDJDNi4yMzMzMyAyIDQuOTQxNjcgMi4xMDQxNyA0LjEyNSAyLjMxMjVDMy4zMDgzMyAyLjUyMDgzIDIuNzUgMi43NSAyLjQ1IDNIMTMuNjVDMTMuNCAyLjcxNjY3IDEyLjg2MjUgMi40NzkxNyAxMi4wMzc1IDIuMjg3NUMxMS4yMTI1IDIuMDk1ODMgOS44NjY2NyAyIDggMlpNMiA4SDdWNUgyVjhaTTEyLjUgMTBIMkgxNEgxMi41Wk05IDhIMTRWNUg5VjhaTTQuNSAxNEM0LjkzMzMzIDE0IDUuMjkxNjcgMTMuODU4MyA1LjU3NSAxMy41NzVDNS44NTgzMyAxMy4yOTE3IDYgMTIuOTMzMyA2IDEyLjVDNiAxMi4wNjY3IDUuODU4MzMgMTEuNzA4MyA1LjU3NSAxMS40MjVDNS4yOTE2NyAxMS4xNDE3IDQuOTMzMzMgMTEgNC41IDExQzQuMDY2NjcgMTEgMy43MDgzMyAxMS4xNDE3IDMuNDI1IDExLjQyNUMzLjE0MTY3IDExLjcwODMgMyAxMi4wNjY3IDMgMTIuNUMzIDEyLjkzMzMgMy4xNDE2NyAxMy4yOTE3IDMuNDI1IDEzLjU3NUMzLjcwODMzIDEzLjg1ODMgNC4wNjY2NyAxNCA0LjUgMTRaTTExLjUgMTRDMTEuOTMzMyAxNCAxMi4yOTE3IDEzLjg1ODMgMTIuNTc1IDEzLjU3NUMxMi44NTgzIDEzLjI5MTcgMTMgMTIuOTMzMyAxMyAxMi41QzEzIDEyLjA2NjcgMTIuODU4MyAxMS43MDgzIDEyLjU3NSAxMS40MjVDMTIuMjkxNyAxMS4xNDE3IDExLjkzMzMgMTEgMTEuNSAxMUMxMS4wNjY3IDExIDEwLjcwODMgMTEuMTQxNyAxMC40MjUgMTEuNDI1QzEwLjE0MTcgMTEuNzA4MyAxMCAxMi4wNjY3IDEwIDEyLjVDMTAgMTIuOTMzMyAxMC4xNDE3IDEzLjI5MTcgMTAuNDI1IDEzLjU3NUMxMC43MDgzIDEzLjg1ODMgMTEuMDY2NyAxNCAxMS41IDE0Wk0zLjUgMTVIMTIuNUMxMi45MzMzIDE1IDEzLjI5MTcgMTQuODU4MyAxMy41NzUgMTQuNTc1QzEzLjg1ODMgMTQuMjkxNyAxNCAxMy45MzMzIDE0IDEzLjVWMTBIMlYxMy41QzIgMTMuOTMzMyAyLjE0MTY3IDE0LjI5MTcgMi40MjUgMTQuNTc1QzIuNzA4MzMgMTQuODU4MyAzLjA2NjY3IDE1IDMuNSAxNVpNOCAzSDEzLjY1SDIuNDVIOFpcXFwiIGZpbGw9XFxcImN1cnJlbnRDb2xvclxcXCIvPlxcbjwvc3ZnPlxcblwiIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgaGVpZ2h0PVxcXCIyMVxcXCIgdmlld0JveD1cXFwiMCAtOTYwIDk2MCA5NjBcXFwiIHdpZHRoPVxcXCIyMlxcXCIgZmlsbD1cXFwiY3VycmVudENvbG9yXFxcIj48cGF0aCBkPVxcXCJtMjgwLTQwIDExMi01NjQtNzIgMjh2MTM2aC04MHYtMTg4bDIwMi04NnExNC02IDI5LjUtN3QyOS41IDRxMTQgNSAyNi41IDE0dDIwLjUgMjNsNDAgNjRxMjYgNDIgNzAuNSA2OVQ3NjAtNTIwdjgwcS03MCAwLTEyNS0yOXQtOTQtNzRsLTI1IDEyMyA4NCA4MHYzMDBoLTgwdi0yNjBsLTg0LTY0LTcyIDMyNGgtODRabTI2MC03MDBxLTMzIDAtNTYuNS0yMy41VDQ2MC04MjBxMC0zMyAyMy41LTU2LjVUNTQwLTkwMHEzMyAwIDU2LjUgMjMuNVQ2MjAtODIwcTAgMzMtMjMuNSA1Ni41VDU0MC03NDBaXFxcIi8+PC9zdlwiIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgdmlld0JveD1cXFwiMCAwIDI0IDI0XFxcIj48cGF0aCBkPVxcXCJNMjMsMTJIMTdWMTBMMjAuMzksNkgxN1Y0SDIzVjZMMTkuNjIsMTBIMjNWMTJNMTUsMTZIOVYxNEwxMi4zOSwxMEg5VjhIMTVWMTBMMTEuNjIsMTRIMTVWMTZNNywyMEgxVjE4TDQuMzksMTRIMVYxMkg3VjE0TDMuNjIsMThIN1YyMFpcXFwiIC8+PC9zdmc+XCIiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbmNvbnN0IHQ9e0FUVFJJQlVURToxLENISUxEOjIsUFJPUEVSVFk6MyxCT09MRUFOX0FUVFJJQlVURTo0LEVWRU5UOjUsRUxFTUVOVDo2fSxlPXQ9PiguLi5lKT0+KHtfJGxpdERpcmVjdGl2ZSQ6dCx2YWx1ZXM6ZX0pO2NsYXNzIGl7Y29uc3RydWN0b3IodCl7fWdldCBfJEFVKCl7cmV0dXJuIHRoaXMuXyRBTS5fJEFVfV8kQVQodCxlLGkpe3RoaXMuXyRDdD10LHRoaXMuXyRBTT1lLHRoaXMuXyRDaT1pfV8kQVModCxlKXtyZXR1cm4gdGhpcy51cGRhdGUodCxlKX11cGRhdGUodCxlKXtyZXR1cm4gdGhpcy5yZW5kZXIoLi4uZSl9fWV4cG9ydHtpIGFzIERpcmVjdGl2ZSx0IGFzIFBhcnRUeXBlLGUgYXMgZGlyZWN0aXZlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZS5qcy5tYXBcbiIsImltcG9ydHtub3RoaW5nIGFzIHQsbm9DaGFuZ2UgYXMgaX1mcm9tXCIuLi9saXQtaHRtbC5qc1wiO2ltcG9ydHtEaXJlY3RpdmUgYXMgcixQYXJ0VHlwZSBhcyBzLGRpcmVjdGl2ZSBhcyBufWZyb21cIi4uL2RpcmVjdGl2ZS5qc1wiO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovY2xhc3MgZSBleHRlbmRzIHJ7Y29uc3RydWN0b3IoaSl7aWYoc3VwZXIoaSksdGhpcy5pdD10LGkudHlwZSE9PXMuQ0hJTEQpdGhyb3cgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5kaXJlY3RpdmVOYW1lK1wiKCkgY2FuIG9ubHkgYmUgdXNlZCBpbiBjaGlsZCBiaW5kaW5nc1wiKX1yZW5kZXIocil7aWYocj09PXR8fG51bGw9PXIpcmV0dXJuIHRoaXMuX3Q9dm9pZCAwLHRoaXMuaXQ9cjtpZihyPT09aSlyZXR1cm4gcjtpZihcInN0cmluZ1wiIT10eXBlb2Ygcil0aHJvdyBFcnJvcih0aGlzLmNvbnN0cnVjdG9yLmRpcmVjdGl2ZU5hbWUrXCIoKSBjYWxsZWQgd2l0aCBhIG5vbi1zdHJpbmcgdmFsdWVcIik7aWYocj09PXRoaXMuaXQpcmV0dXJuIHRoaXMuX3Q7dGhpcy5pdD1yO2NvbnN0IHM9W3JdO3JldHVybiBzLnJhdz1zLHRoaXMuX3Q9e18kbGl0VHlwZSQ6dGhpcy5jb25zdHJ1Y3Rvci5yZXN1bHRUeXBlLHN0cmluZ3M6cyx2YWx1ZXM6W119fX1lLmRpcmVjdGl2ZU5hbWU9XCJ1bnNhZmVIVE1MXCIsZS5yZXN1bHRUeXBlPTE7Y29uc3Qgbz1uKGUpO2V4cG9ydHtlIGFzIFVuc2FmZUhUTUxEaXJlY3RpdmUsbyBhcyB1bnNhZmVIVE1MfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuc2FmZS1odG1sLmpzLm1hcFxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCwgY3NzLCBodG1sLCBub3RoaW5nIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHkgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbmltcG9ydCB0eXBlIHsgSXRpbmVyYXJ5LCBMZWcsIExlZ1N0YXRpb24sIFRpbWVzdGFtcCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHtcbiAgYXJyYXlFcXVhbHMsXG4gIGNhbGNUaW1lU3RhbXBEZWx0YU1pbnMsXG4gIGdldEVuZCxcbiAgZ2V0U3RhcnQsXG4gIG1pbnNUb0ZpcnN0TGVnLFxufSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBidXMgZnJvbSBcIi4uL2Fzc2V0cy9idXMuc3ZnP3Jhd1wiO1xuaW1wb3J0IHRyYWluIGZyb20gXCIuLi9hc3NldHMvdHJhaW4uc3ZnP3Jhd1wiO1xuaW1wb3J0IHdhbGtpbmcgZnJvbSBcIi4uL2Fzc2V0cy93YWxraW5nLnN2Zz9yYXdcIjtcbmltcG9ydCBzbGVlcCBmcm9tIFwiLi4vYXNzZXRzL3NsZWVwLnN2Zz9yYXdcIjtcbmltcG9ydCB7IHVuc2FmZUhUTUwgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvdW5zYWZlLWh0bWwuanNcIjtcblxuQGN1c3RvbUVsZW1lbnQoXCJibW4taXRpbmVyYXJ5XCIpXG5leHBvcnQgY2xhc3MgSXRpbmVyYXJ5Q2FyZCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBAcHJvcGVydHkoKVxuICBub3chOiBudW1iZXI7XG5cbiAgQHByb3BlcnR5KClcbiAgaGVhZGxpbmUhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgQHByb3BlcnR5KClcbiAgYWN0aXZlITogYm9vbGVhbjtcblxuICBAcHJvcGVydHkoKVxuICBsZWdzITogSXRpbmVyYXJ5O1xuXG4gIEBwcm9wZXJ0eSgpXG4gIHNlYXJjaFJlcGxhY2UhOiBzdHJpbmdbXTtcblxuICBkYXRlRm9ybWF0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJkZS1ERVwiLCB7XG4gICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgJHt0aGlzLnJlbmRlckhlYWRsaW5lKHRoaXMuaGVhZGxpbmUsIHRoaXMubGVnc1swXSwgdGhpcy5hY3RpdmUpfVxuICAgICAgICAke3RoaXMubGVncy5tYXAoKGxlZywgaSwgbGVncykgPT4gdGhpcy5yZW5kZXJMZWcobGVnLCBpLCBsZWdzKSl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVySGVhZGxpbmUoXG4gICAgaGVhZGxpbmU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBmaXJzdExlZzogTGVnIHwgdW5kZWZpbmVkLFxuICAgIGFjdGl2ZTogYm9vbGVhblxuICApIHtcbiAgICBpZiAoIWhlYWRsaW5lIHx8ICFmaXJzdExlZykgcmV0dXJuIG5vdGhpbmc7XG4gICAgY29uc3QgaW5NaW5zID0gbWluc1RvRmlyc3RMZWcodGhpcy5ub3csIGZpcnN0TGVnKTtcblxuICAgIGNvbnN0IHRpbWVIaW50ID0gaW5NaW5zIDw9IDAgPyBgamV0enRgIDogYGluICR7aW5NaW5zfSBtaW5gO1xuXG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+XG4gICAgICA8aDE+JHthY3RpdmUgPyBub3RoaW5nIDogdW5zYWZlSFRNTChzbGVlcCl9JHt0aGlzLmhlYWRsaW5lfTwvaDE+XG4gICAgICA8c3Bhbj4ke3RpbWVIaW50fTwvc3Bhbj5cbiAgICA8L2Rpdj5gO1xuICB9XG5cbiAgcmVuZGVyTGVnKGxlZzogTGVnLCBpOiBudW1iZXIsIGxlZ3M6IExlZ1tdKSB7XG4gICAgY29uc3QgbmV4dExlZzogTGVnIHwgdW5kZWZpbmVkID0gbGVnc1tpICsgMV07XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICAke2kgPT0gMCA/IHRoaXMucmVuZGVyU3RhdGlvbnMoZ2V0U3RhcnQobGVnKSwgbnVsbCwgZmFsc2UpIDogbm90aGluZ31cbiAgICAgICR7dGhpcy5yZW5kZXJNb2RlKGxlZywgaSl9XG4gICAgICAke3RoaXMucmVuZGVyU3RhdGlvbnMoXG4gICAgICAgIGdldEVuZChsZWcpLFxuICAgICAgICBuZXh0TGVnID8gZ2V0U3RhcnQobmV4dExlZykgOiBudWxsLFxuICAgICAgICBpID09PSBsZWdzLmxlbmd0aCAtIDFcbiAgICAgICl9XG4gICAgYDtcbiAgfVxuXG4gIHJlbmRlclN0YXRpb25zKFxuICAgIGxlZ1N0YXRpb246IExlZ1N0YXRpb24sXG4gICAgbmV4dExlZ1N0YXRpb246IExlZ1N0YXRpb24gfCBudWxsLFxuICAgIGJvbGQ6IGJvb2xlYW5cbiAgKSB7XG4gICAgY29uc3QgbGVnU3RhdGlvbkh0bWwgPSB0aGlzLnJlbmRlclN0YXRpb24obGVnU3RhdGlvbiwgYm9sZCk7XG5cbiAgICBsZXQgbmV4dExlZ1N0YXRpb25IdG1sID0gbmV4dExlZ1N0YXRpb25cbiAgICAgID8gdGhpcy5yZW5kZXJTdGF0aW9uKG5leHRMZWdTdGF0aW9uLCBmYWxzZSlcbiAgICAgIDogbm90aGluZztcblxuICAgIGNvbnN0IGlzTmV4dFN0YXRpb25OZWVkZWQgPVxuICAgICAgbmV4dExlZ1N0YXRpb25IdG1sICE9PSBub3RoaW5nICYmXG4gICAgICAhYXJyYXlFcXVhbHMobGVnU3RhdGlvbkh0bWwudmFsdWVzLCBuZXh0TGVnU3RhdGlvbkh0bWwudmFsdWVzKTtcblxuICAgIG5leHRMZWdTdGF0aW9uSHRtbCA9IGlzTmV4dFN0YXRpb25OZWVkZWQgPyBuZXh0TGVnU3RhdGlvbkh0bWwgOiBub3RoaW5nO1xuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiJHtuZXh0TGVnU3RhdGlvbiA/IFwic2xpbVwiIDogXCJcIn1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN5bWJvbHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsYXlcIj5cbiAgICAgICAgICAgICR7bGVnU3RhdGlvbi5kZWxheSA+IDAgPyBcIitcIiArIGxlZ1N0YXRpb24uZGVsYXkgOiBcIlwifTxiciAvPlxuICAgICAgICAgICAgJHtuZXh0TGVnU3RhdGlvbj8uZGVsYXkhID4gMCA/IFwiK1wiICsgbmV4dExlZ1N0YXRpb24/LmRlbGF5IDogXCJcIn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVsbGV0XCI+JmJ1bGw7PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PiR7dGhpcy5yZW5kZXJTdGF0aW9uKGxlZ1N0YXRpb24sIGJvbGQpfSAke25leHRMZWdTdGF0aW9uSHRtbH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBmb3JtYXREYXRlKHRzOiBUaW1lc3RhbXApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQuZm9ybWF0KG5ldyBEYXRlKHRzKSk7XG4gIH1cblxuICBmb3JtYXRTdGF0aW9uTmFtZShyYXdOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBuYW1lID0gcmF3TmFtZTtcbiAgICBmb3IgKGNvbnN0IGluc3RydWN0aW9uIG9mIHRoaXMuc2VhcmNoUmVwbGFjZSkge1xuICAgICAgY29uc3QgW3JlZ2V4LCByZXBsYWNlXSA9IGluc3RydWN0aW9uLnNwbGl0KFwiL1wiLCAyKTtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2VBbGwobmV3IFJlZ0V4cChyZWdleCwgXCJnaVwiKSwgcmVwbGFjZSA/PyBcIlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudHJpbSgpO1xuICB9XG5cbiAgcmVuZGVyU3RhdGlvbihsZWdTdGF0aW9uOiBMZWdTdGF0aW9uLCBib2xkOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8c3Bhbj4ke3RoaXMuZm9ybWF0RGF0ZShsZWdTdGF0aW9uLnNjaGVkdWxlZCl9Jm5ic3A7LTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtib2xkID8gXCJib2xkXCIgOiBcIlwifVwiPlxuICAgICAgICAke3RoaXMuZm9ybWF0U3RhdGlvbk5hbWUobGVnU3RhdGlvbi5zdGF0aW9uTmFtZSl9XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3Bhbj4gJHtsZWdTdGF0aW9uLnBsYXRmb3JtfSA8L3NwYW4+XG4gICAgICA8YnIgLz5cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyTW9kZShsZWc6IExlZywgX2k6IG51bWJlcikge1xuICAgIGNvbnN0IGljb24gPSB7IGJ1cywgdHJhaW4sIHdhbGtpbmcgfVtsZWcubW9kZV07XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzeW1ib2xzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj4ke3Vuc2FmZUhUTUwoaWNvbil9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYm9sZFwiPlxuICAgICAgICAgICAgJHtsZWcubW9kZSAhPT0gXCJ3YWxraW5nXCJcbiAgICAgICAgICAgICAgPyBsZWcubmFtZVxuICAgICAgICAgICAgICA6IGAke2NhbGNUaW1lU3RhbXBEZWx0YU1pbnMoXG4gICAgICAgICAgICAgICAgICBsZWcuZGVwYXJ0dXJlLFxuICAgICAgICAgICAgICAgICAgbGVnLmFycml2YWxcbiAgICAgICAgICAgICAgICApfSBtaW4gRnXDn3dlZ2B9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzdGF0aWMgc3R5bGVzID0gY3NzYFxuICAgIDpob3N0IHtcbiAgICAgIC0tZ3JhZGllbnQxOiAjMTEyMDQyO1xuICAgICAgLS1ncmFkaWVudDI6ICM2ODMxQUM7XG4gICAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICAgIC0tZGVsYXktY29sb3I6IHJlZDtcblxuICAgICAgLS1zeW1ib2wtd2lkdGg6IDNyZW07XG4gICAgICAtLXN5bWJvbC1wYWRkaW5nOiAxcmVtO1xuICAgICAgLS1mb250LXNpemU6IDEuM3JlbTtcbiAgICAgIC0tdmVydGljYWwtc3BhY2U6IDFyZW07XG4gICAgICAtLWxpbmUtcGFkZGluZzogMC45cmVtO1xuICAgICAgLS1saW5lLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gICAgfVxuXG4gICAgLmhlYWRsaW5lIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5oZWFkbGluZSBoMSB7XG4gICAgICBmb250LXNpemU6IHZhcigtLWhhLWZvbnQtc2l6ZS0zeGwpO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgICAuaGVhZGxpbmUgc3ZnIHtcbiAgICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcbiAgICAgIGhlaWdodDogdmFyKC0taGEtZm9udC1zaXplLTN4bCk7XG4gICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgfVxuICAgICAgXG4gICAgXG4gICAgLmJvbGQge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmNhcmQge1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0taGEtY2FyZC1ib3JkZXItcmFkaXVzLHZhcigtLWhhLWJvcmRlci1yYWRpdXMtbGcpKTtcbiAgICAgIG1hcmdpbjogMC4zcmVtO1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yKTtcbiAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCB2YXIoLS1ncmFkaWVudDEpIDAlLCB2YXIoLS1ncmFkaWVudDIpIDEwMCUpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZSk7XG4gICAgICBnYXA6IHZhcigtLXZlcnRpY2FsLXNwYWNlKTtcbiAgICB9XG5cbiAgICAuY2FyZCA+IGRpdiwgLnN5bWJvbHMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uIHJvdztcbiAgICB9XG5cbiAgICAuc3ltYm9scyB7XG4gICAgICB3aWR0aDogdmFyKC0tc3ltYm9sLXdpZHRoKTtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXN5bWJvbC1wYWRkaW5nKTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgfVxuXG4gICAgLmljb24ge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgIH1cblxuICAgIC5pY29uOjpiZWZvcmUsIC5pY29uOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgaGVpZ2h0OiB2YXIoLS12ZXJ0aWNhbC1zcGFjZSk7XG4gICAgICBib3JkZXItbGVmdDogZGFzaGVkIHZhcigtLWxpbmUtY29sb3IpIDNweDtcbiAgICAgIHJpZ2h0OiAycHg7XG4gICAgfVxuICAgIC5pY29uOjphZnRlciB7XG4gICAgICB0b3A6IGNhbGModmFyKC0tbGluZS1wYWRkaW5nKSArIHZhcigtLWZvbnQtc2l6ZSkpO1xuICAgIH1cbiAgICAuaWNvbjo6YmVmb3JlIHtcbiAgICAgIGJvdHRvbTogY2FsYyh2YXIoLS1saW5lLXBhZGRpbmcpICsgdmFyKC0tZm9udC1zaXplKSk7XG4gICAgfVxuXG4gICAgLmljb24gc3ZnIHtcbiAgICAgIG1hcmdpbi1yaWdodDogLTRweDtcbiAgICB9XG4gICAgLmRlbGF5IHtcbiAgICAgIGNvbG9yOiB2YXIoLS1kZWxheS1jb2xvcik7XG4gICAgfVxuXG4gICAgLmJ1bGxldCB7XG4gICAgICBtYXJnaW4tbGVmdDogdmFyKC0tc3ltYm9sLXBhZGRpbmcpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLnNsaW0ge1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgICB9XG4gIGA7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIEhUTUxFbGVtZW50VGFnTmFtZU1hcCB7XG4gICAgXCJibW4taXRpbmVyYXJ5XCI6IEl0aW5lcmFyeUNhcmQ7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgSGFGb3JtU2NoZW1hLCBMb3ZlbGFjZUNvbmZpZ0Zvcm0gfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBSR0IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbmV4cG9ydCB0eXBlIEpvdXJuZXlzQ29uZmlnID0ge1xuICB0aXRsZT86IHN0cmluZztcbiAgZW50aXR5OiBzdHJpbmc7XG4gIHNlYXJjaF9yZXBsYWNlPzogc3RyaW5nW10gfCBzdHJpbmc7XG4gIG9yaWdpbl9uYW1lPzogc3RyaW5nO1xuICBkZXN0aW5hdGlvbl9uYW1lPzogc3RyaW5nO1xuICBpbmRleDogbnVtYmVyO1xuICBjb2xvcjogUkdCO1xuICBncmFkaWVudDE6IFJHQjtcbiAgZ3JhZGllbnQyOiBSR0I7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT0xPUiA9IFsyNTUsIDI1NSwgMjU1XTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0dSQURJRU5UMSA9IFsxNywgMzIsIDY2XTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0dSQURJRU5UMiA9IFsxMDQsIDQ5LCAxNzJdO1xuXG5leHBvcnQgY29uc3QgU0NIRU1BOiBIYUZvcm1TY2hlbWFbXSA9IFtcbiAge1xuICAgIG5hbWU6IFwidGl0bGVcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgdGV4dDoge30sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZW50aXR5XCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgc2VsZWN0b3I6IHtcbiAgICAgIGVudGl0eToge1xuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBkb21haW46IFwic2Vuc29yXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImluZGV4XCIsXG4gICAgc2VsZWN0b3I6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDAsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm9yaWdpbl9uYW1lXCIsXG4gICAgc2VsZWN0b3I6IHtcbiAgICAgIHRleHQ6IHt9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRlc3RpbmF0aW9uX25hbWVcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgdGV4dDoge30sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic2VhcmNoX3JlcGxhY2VcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgdGV4dDoge1xuICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY29sb3JcIixcbiAgICBzZWxlY3Rvcjoge1xuICAgICAgY29sb3JfcmdiOiB7fSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6IERFRkFVTFRfQ09MT1IsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdyYWRpZW50MVwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICBjb2xvcl9yZ2I6IHt9LFxuICAgIH0sXG4gICAgZGVmYXVsdDogREVGQVVMVF9HUkFESUVOVDEsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdyYWRpZW50MlwiLFxuICAgIHNlbGVjdG9yOiB7XG4gICAgICBjb2xvcl9yZ2I6IHt9LFxuICAgIH0sXG4gICAgZGVmYXVsdDogREVGQVVMVF9HUkFESUVOVDIsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnRm9ybSgpOiBMb3ZlbGFjZUNvbmZpZ0Zvcm0ge1xuICByZXR1cm4ge1xuICAgIGNvbXB1dGVMYWJlbDogKHNjaGVtYSkgPT4ge1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcInRpdGxlXCIpIHJldHVybiBcIlRpdGxlXCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwiZW50aXR5XCIpIHJldHVybiBcIlNlbnNvclwiO1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcImluZGV4XCIpIHJldHVybiBcIkluZGV4XCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwic2VhcmNoX3JlcGxhY2VcIikgcmV0dXJuIFwiU3VwcHJlc3NlZCBXb3Jkc1wiO1xuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgY29tcHV0ZUhlbHBlcjogKHNjaGVtYSkgPT4ge1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcImVudGl0eVwiKSByZXR1cm4gXCJoYWNzLWhhZmFzIHNlbnNvciBmb3IgY29ubmVjdGlvblwiO1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcImluZGV4XCIpXG4gICAgICAgIHJldHVybiBcIldoaWNoIGNvbm5lY3Rpb24gb2YgdGhlIHNlbnNvciBkbyB5b3Ugd2FudCB0byBkaXNwbGF5PyAwIGJlaW5nIHRoZSBmaXJzdFwiO1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcIm9yaWdpbl9uYW1lXCIpXG4gICAgICAgIHJldHVybiBcIklmIG9yaWdpbiByZXF1aXJlcyBhbiBpbml0aWFsIHdhbGtpbmcgbGVnLCB0aGlzIG5hbWUgaXMgZGlzcGxheWVkIGFzIGluaXRpYWwgb3JpZ2luLlwiO1xuICAgICAgaWYgKHNjaGVtYS5uYW1lID09PSBcImRlc3RpbmF0aW9uX25hbWVcIilcbiAgICAgICAgcmV0dXJuIFwiSWYgZGVzdGluYXRpb24gcmVxdWlyZXMgYSBmaW5hbCB3YWxraW5nIGxlZywgdGhpcyBuYW1lIGlzIGRpc3BsYXllZCBhcyB0b3RhbCBvcmlnaW4uXCI7XG4gICAgICBpZiAoc2NoZW1hLm5hbWUgPT09IFwic2VhcmNoX3JlcGxhY2VcIilcbiAgICAgICAgcmV0dXJuIFwiUmVndWxhciBFeHByZXNzaW9uIHRvIGZpbmQuIFJlcGxhY2UgaXMgdGV4dCBvbmx5LiBGaW5kIG1heSBub3QgY29udGFpbiBzbGFzaGVzLiBlLmcuICdmaT9uZCsvcmVwbGFjZSdcIjtcblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNjaGVtYTogU0NIRU1BLFxuICB9O1xufVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCwgY3NzLCBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHN0YXRlIH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEhhRkFzU2Vuc29yU3RhdGUsXG4gIEhvbWVBc3Npc3RhbnQsXG4gIExvdmVsYWNlQ29uZmlnRm9ybSxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCBcIi4vY29tcG9uZW50cy9pdGluZXJhcnlcIjtcbmltcG9ydCB7IG1pbnNUb0ZpcnN0TGVnLCBwcm9jZXNzTGVncyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge1xuICBjb25maWdGb3JtLFxuICBERUZBVUxUX0NPTE9SLFxuICBERUZBVUxUX0dSQURJRU5UMSxcbiAgREVGQVVMVF9HUkFESUVOVDIsXG4gIHR5cGUgSm91cm5leXNDb25maWcsXG59IGZyb20gXCIuL2pvdXJuZXlzQ29uZmlnXCI7XG5cbi8qKlxuICogdGhpcyBpcyB0aGUgcm9vdCBjb21wb25lbnRcbiAqL1xuQGN1c3RvbUVsZW1lbnQoXCJhdnZoYWZhcy1qb3VybmV5c1wiKVxuZXhwb3J0IGNsYXNzIEpvdXJuZXlzIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIEBwcm9wZXJ0eSgpXG4gIGhhc3MhOiBIb21lQXNzaXN0YW50OyAvLyBzZXQgYnkgaG9tZSBhc3Npc3RhbnQgb24gKGV2ZXJ5Pykgc3RhdGUgY2hhbmdlXG5cbiAgY29uZmlnPzogSm91cm5leXNDb25maWc7IC8vIHNldCBpbiBzZXRDb25maWdcblxuICBnZXQgc2Vuc29yU3RhdGUoKTogSGFGQXNTZW5zb3JTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZW50aXR5TmFtZSA9IHRoaXMuY29uZmlnPy5lbnRpdHk7XG4gICAgcmV0dXJuIGVudGl0eU5hbWVcbiAgICAgID8gKHRoaXMuaGFzcy5zdGF0ZXNbZW50aXR5TmFtZV0gYXMgSGFGQXNTZW5zb3JTdGF0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0IHNlYXJjaFJlcGxhY2UoKTogc3RyaW5nW10ge1xuICAgIGlmICghdGhpcy5jb25maWc/LnNlYXJjaF9yZXBsYWNlKSByZXR1cm4gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuc2VhcmNoX3JlcGxhY2UpKVxuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnNlYXJjaF9yZXBsYWNlO1xuICAgIHJldHVybiBbdGhpcy5jb25maWcuc2VhcmNoX3JlcGxhY2VdO1xuICB9XG5cbiAgLy8gbGl0J3MgcmVuZGVyIGZ1bmN0aW9uXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnKSByZXR1cm4gaHRtbGBDb25maWd1cmF0aW9uIGlzc3Vlc2A7XG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5zZW5zb3JTdGF0ZT8uYXR0cmlidXRlcy5hY3RpdmUgPz8gZmFsc2U7XG4gICAgY29uc3QgbGFzdFF1ZXJ5ID0gdGhpcy5zZW5zb3JTdGF0ZT8uYXR0cmlidXRlcy5sYXN0X3F1ZXJ5O1xuICAgIGxldCBjb25uZWN0aW9ucyA9IHRoaXMuc2Vuc29yU3RhdGU/LmF0dHJpYnV0ZXMuY29ubmVjdGlvbnM7XG4gICAgY29ubmVjdGlvbnMgPSBjb25uZWN0aW9ucyA/PyBbXTtcbiAgICBjb25uZWN0aW9ucyA9IGNvbm5lY3Rpb25zLmZpbHRlcihcbiAgICAgIChjb25uZWN0aW9uKSA9PlxuICAgICAgICBjb25uZWN0aW9uLmxlZ3NbMF0gJiYgbWluc1RvRmlyc3RMZWcodGhpcy5ub3csIGNvbm5lY3Rpb24ubGVnc1swXSkgPj0gMFxuICAgICk7XG4gICAgaWYgKGNvbm5lY3Rpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGh0bWxgTm8gY29ubmVjdGlvbnNgO1xuXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbmZpZy5jb2xvciA/PyBERUZBVUxUX0NPTE9SO1xuICAgIGNvbnN0IGdyYWRpZW50MSA9IHRoaXMuY29uZmlnLmdyYWRpZW50MSA/PyBERUZBVUxUX0dSQURJRU5UMTtcbiAgICBjb25zdCBncmFkaWVudDIgPSB0aGlzLmNvbmZpZy5ncmFkaWVudDIgPz8gREVGQVVMVF9HUkFESUVOVDI7XG5cbiAgICBjb25zdCBzdHlsZSA9IFtcbiAgICAgIGAtLWdyYWRpZW50MTogcmdiKCR7Z3JhZGllbnQxLmpvaW4oXCIsIFwiKX0pYCxcbiAgICAgIGAtLWdyYWRpZW50MjogcmdiKCR7Z3JhZGllbnQyLmpvaW4oXCIsIFwiKX0pYCxcbiAgICAgIGAtLWNvbG9yOiByZ2IoJHtjb2xvci5qb2luKFwiLCBcIil9KWAsXG4gICAgICBgLS1saW5lLWNvbG9yOiByZ2JhKCR7Y29sb3Iuam9pbihcIiwgXCIpfSwgMC42KWAsXG4gICAgXTtcblxuICAgIGNvbnN0IGxlZ3MgPSBwcm9jZXNzTGVncyhcbiAgICAgIGNvbm5lY3Rpb25zW3RoaXMuY29uZmlnLmluZGV4XS5sZWdzLFxuICAgICAgdGhpcy5jb25maWcub3JpZ2luX25hbWUsXG4gICAgICB0aGlzLmNvbmZpZy5kZXN0aW5hdGlvbl9uYW1lXG4gICAgKTtcblxuICAgIHJldHVybiBodG1sYCA8aGEtY2FyZD5cbiAgICAgIDxibW4taXRpbmVyYXJ5XG4gICAgICAgIC5ub3c9XCIke3RoaXMubm93fVwiXG4gICAgICAgIC5hY3RpdmU9XCIke2FjdGl2ZX1cIlxuICAgICAgICAuaGVhZGxpbmU9XCIke3RoaXMuY29uZmlnLnRpdGxlfVwiXG4gICAgICAgIC5zZWFyY2hSZXBsYWNlPVwiJHt0aGlzLnNlYXJjaFJlcGxhY2V9XCJcbiAgICAgICAgLmxlZ3M9XCIke2xlZ3N9XCJcbiAgICAgICAgc3R5bGU9XCIke3N0eWxlLmpvaW4oXCI7IFwiKX1cIlxuICAgICAgPlxuICAgICAgPC9ibW4taXRpbmVyYXJ5PlxuICAgICAgPHNtYWxsIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAwLjVyZW1cIj5cbiAgICAgIFVwZGF0ZWRcbiAgICAgICAgJHtsYXN0UXVlcnlcbiAgICAgICAgICA/IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tREVcIiwge1xuICAgICAgICAgICAgICBkYXRlU3R5bGU6IFwiZnVsbFwiLFxuICAgICAgICAgICAgICB0aW1lU3R5bGU6IFwibG9uZ1wiLFxuICAgICAgICAgICAgICB0aW1lWm9uZTogXCJFdXJvcGUvQmVybGluXCIsXG4gICAgICAgICAgICB9KS5mb3JtYXQobmV3IERhdGUobGFzdFF1ZXJ5KSlcbiAgICAgICAgICA6IFwidW5rbm93blwifVxuICAgICAgICA8L3NtYWxsPlxuICAgIDwvaGEtY2FyZD5gO1xuICB9XG5cbiAgLy8gdXNlciBzdXBwbGllZCBjb25maWd1cmF0aW9uXG4gIHNldENvbmZpZyhjb25maWc6IEpvdXJuZXlzQ29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcuZW50aXR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbmVlZCB0byBkZWZpbmUgYW4gZW50aXR5XCIpO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgLy8gaG9tZSBhc3Npc3RhbnQgY2FsbHMgdGhpcyBmdW5jdGlvbiB0byBkaXNwbGF5IGEgY29uZmlnIGZvcm0gZm9yIHRoaXMgY2FyZFxuICBzdGF0aWMgZ2V0Q29uZmlnRm9ybSgpOiBMb3ZlbGFjZUNvbmZpZ0Zvcm0ge1xuICAgIHJldHVybiBjb25maWdGb3JtKCk7XG4gIH1cblxuICAvKlxuICBJbiB0aGVvcnksIHdlIGFyZSBub3QgZ3VhcmFudGVlZCB1cGRhdGVzIG9mIHRoZSBoYXNzIG9iamVjdCBldmVyeSBtaW51dGUsXG4gIHdlIHdlIGtlZXAgdGhlIGN1cnJlbnQgdGltZSBvdXJzZWx2ZXMgd2l0aCA1IHNlY29uZCBhY2N1cmFjeSAodGhpcyB3aWxsIHRyaWdnZXIgYSByZW5kZXIoKSlcbiAgKi9cbiAgQHN0YXRlKClcbiAgbm93ID0gRGF0ZS5ub3coKTtcbiAgdGltZXI/OiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5ub3cgPSBEYXRlLm5vdygpO1xuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRpbWVyICE9PSBcInVuZGVmaW5lZFwiKSBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBzdGF0aWMgc3R5bGVzID0gY3NzYGA7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIEhUTUxFbGVtZW50VGFnTmFtZU1hcCB7XG4gICAgXCJhdnZoYWZhcy1qb3VybmV5c1wiOiBKb3VybmV5cztcbiAgfVxufVxuIiwiLy8gUmVnaXN0ZXIgYWxsIGNvbXBvbmVudHNcbmltcG9ydCAnLi9qb3VybmV5cyc7XG5cbmNvbnNvbGUuaW5mbygnaGEtaGFjcy1qb3VybmV5cyBsb2FkZWQnKTtcbiJdLCJuYW1lcyI6WyJ0IiwiZSIsInMiLCJvIiwibiQzIiwiciIsIm4iLCJpIiwiUyIsImMiLCJoIiwiYSIsImwiLCJwIiwiZCIsInUiLCJmIiwiYiIsInkiLCJ2IiwiXyIsIm0iLCJnIiwiJCIsIngiLCJUIiwiRSIsIkEiLCJDIiwiUCIsIlYiLCJOIiwiSCIsIkkiLCJMIiwiayIsIk0iLCJSIiwieiIsImoiLCJCIiwiYXJyYXlFcXVhbHMiLCJhcnIxIiwiYXJyMiIsImNhbGNEZWxheSIsInRkIiwiaG91cnMiLCJtaW51dGVzIiwiZ2V0U3RhcnQiLCJsZWciLCJnZXRFbmQiLCJjYWxjVGltZVN0YW1wRGVsdGFNaW5zIiwiYUQiLCJiRCIsIm1zRGlmZiIsIm1pbnNUb0ZpcnN0TGVnIiwibm93IiwiZmlyc3RMZWciLCJkZWxheSIsImluTXMiLCJwcm9jZXNzTGVncyIsImxlZ3MiLCJvcmlnaW5OYW1lIiwiZGVzdGluYXRpb25OYW1lIiwicHJvY2Vzc2VkIiwiZmlsdGVyUGxhdGZvcm1DaGFuZ2UiLCJ3YWxrVG9QbGF0Zm9ybSIsInByb2Nlc3NTaG9ydEluaXRpYWxXYWxrIiwicHJvY2Vzc1Nob3J0RmluYWxXYWxrIiwicG9wRm4iLCJ2cyIsInByb2Nlc3NTaG9ydFdhbGsiLCJtYXhEdXJhdGlvbiIsInJlbmFtZVRhcmdldCIsInVzZXJEZWZpbmVkTmFtZSIsInByZXYiLCJuZXh0IiwiYnVzIiwidHJhaW4iLCJ3YWxraW5nIiwic2xlZXAiLCJJdGluZXJhcnlDYXJkIiwiTGl0RWxlbWVudCIsImh0bWwiLCJoZWFkbGluZSIsImFjdGl2ZSIsIm5vdGhpbmciLCJpbk1pbnMiLCJ0aW1lSGludCIsInVuc2FmZUhUTUwiLCJuZXh0TGVnIiwibGVnU3RhdGlvbiIsIm5leHRMZWdTdGF0aW9uIiwiYm9sZCIsImxlZ1N0YXRpb25IdG1sIiwibmV4dExlZ1N0YXRpb25IdG1sIiwidHMiLCJyYXdOYW1lIiwibmFtZSIsImluc3RydWN0aW9uIiwicmVnZXgiLCJyZXBsYWNlIiwiX2kiLCJpY29uIiwiY3NzIiwiX19kZWNvcmF0ZUNsYXNzIiwicHJvcGVydHkiLCJjdXN0b21FbGVtZW50IiwiREVGQVVMVF9DT0xPUiIsIkRFRkFVTFRfR1JBRElFTlQxIiwiREVGQVVMVF9HUkFESUVOVDIiLCJTQ0hFTUEiLCJjb25maWdGb3JtIiwic2NoZW1hIiwiSm91cm5leXMiLCJlbnRpdHlOYW1lIiwibGFzdFF1ZXJ5IiwiY29ubmVjdGlvbnMiLCJjb25uZWN0aW9uIiwiY29sb3IiLCJncmFkaWVudDEiLCJncmFkaWVudDIiLCJzdHlsZSIsImNvbmZpZyIsInN0YXRlIl0sIm1hcHBpbmdzIjoiQUFLQSxNQUFNQSxJQUFFLFlBQVdDLElBQUVELEVBQUUsZUFBc0JBLEVBQUUsYUFBWCxVQUFxQkEsRUFBRSxTQUFTLGlCQUFlLHdCQUF1QixTQUFTLGFBQVcsYUFBWSxjQUFjLFdBQVVFLElBQUUsdUJBQU0sR0FBR0MsSUFBRSxvQkFBSTtBQUFPLElBQUFDLEtBQUMsTUFBTztBQUFBLEVBQUMsWUFBWSxHQUFFLEdBQUVELEdBQUU7QUFBQyxRQUFHLEtBQUssZUFBYSxJQUFHQSxNQUFJRCxFQUFFLE9BQU0sTUFBTSxtRUFBbUU7QUFBRSxTQUFLLFVBQVEsR0FBRSxLQUFLLElBQUU7QUFBQSxFQUFDO0FBQUEsRUFBQyxJQUFJLGFBQVk7QUFBQyxRQUFJLElBQUUsS0FBSztBQUFFLFVBQU1BLElBQUUsS0FBSztBQUFFLFFBQUdELEtBQVksTUFBVCxRQUFXO0FBQUMsWUFBTUEsSUFBV0MsTUFBVCxVQUFnQkEsRUFBRSxXQUFOO0FBQWEsTUFBQUQsTUFBSSxJQUFFRSxFQUFFLElBQUlELENBQUMsSUFBWSxNQUFULFlBQWMsS0FBSyxJQUFFLElBQUUsSUFBSSxpQkFBZSxZQUFZLEtBQUssT0FBTyxHQUFFRCxLQUFHRSxFQUFFLElBQUlELEdBQUUsQ0FBQztBQUFBLElBQUU7QUFBQyxXQUFPO0FBQUEsRUFBQztBQUFBLEVBQUMsV0FBVTtBQUFDLFdBQU8sS0FBSztBQUFBLEVBQU87QUFBQztBQUFDLE1BQU1HLEtBQUUsQ0FBQUwsTUFBRyxJQUFJTSxHQUFZLE9BQU9OLEtBQWpCLFdBQW1CQSxJQUFFQSxJQUFFLElBQUcsUUFBT0UsQ0FBQyxHQUFFSyxLQUFFLENBQUNQLE1BQUtDLE1BQUk7QUFBQyxRQUFNRSxJQUFNSCxFQUFFLFdBQU4sSUFBYUEsRUFBRSxDQUFDLElBQUVDLEVBQUUsUUFBUSxDQUFDQSxHQUFF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
