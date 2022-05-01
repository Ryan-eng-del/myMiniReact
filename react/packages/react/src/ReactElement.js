const hasOwnProperty = Object.prototype.hasOwnProperty;
const RESERVED_PROPS = {
  key: true,
  ref: true,
};
const ReactElement = function (type, key, ref, props) {
  const hasSymbol = typeof Symbol === "function" && Symbol.for;
  const REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    ref,
    props,
    key,
  };
};
export function createElement(type, config, children) {
  let propName;
  // Reserved names are extracted
  const props = {};
  /* key 和 ref单独和 props分开 */
  let key = null;
  let ref = null;
  if (config !== null) {
    /* 判断是否是有效的ref和key */
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = "" + config.key;
    }
  }
  /* 写入props对象 */
  for (propName in config) {
    /* 提取props将 RESERVED_PROPS中的key和ref排除*/
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }
  /* 写入props.children */
  /* children的长度 = 参数长度 - type - config */
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    /* 说明children传入一个 */
    props.children = children;
  } else if (childrenLength > 1) {
    /* 说明children传入多个 */
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  return ReactElement(type, key, ref, props);
}

/* createElement示例 */
/* jsx -> JavaScript */
<div id="name">
  <span></span>
  <div></div>
  <div></div>
</div>;

function Cpn() {
  return <h2></h2>;
}
/* babel编译之后 */
React.createElement(
  "div",
  {
    id: "name",
  },
  React.createElement("span", null),
  React.createElement("div", null),
  React.createElement("div", null)
);

function Cpn() {
  return React.createElement("h2", null);
}
