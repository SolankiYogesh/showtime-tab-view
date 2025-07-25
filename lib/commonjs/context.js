"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeaderTabContext = exports.HeaderTabContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const HeaderTabContext = exports.HeaderTabContext = /*#__PURE__*/_react.default.createContext(null);
const useHeaderTabContext = () => {
  const ctx = (0, _react.useContext)(HeaderTabContext);
  if (!ctx) throw new Error("HeaderTabContext not found");
  return ctx;
};
exports.useHeaderTabContext = useHeaderTabContext;
//# sourceMappingURL=context.js.map