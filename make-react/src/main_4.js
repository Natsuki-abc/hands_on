// React.createElement()をjsで再実装した場合
// ※render部分はjsで簡易的に書いただけなので、このままだとDOM操作の効率が悪い

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  }
}

// 普通のテキストをオブジェクトに変換する関数
// JavaScript内では文字列や数値はオブジェクトではないため、そのままでは仮想DOM要素として扱えないため同じような形のオブジェクトにしてあげる
// オブジェクトにすることによって情報を追加できるので、Reactは全てをオブジェクトで管理したい、という考え方である
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [], // テキストノードはchildrenが無いというルールがある
    },
  }
}

const element = createElement("h1", { title: "foo" }, "Hello");

const container = document.getElementById("root");
const node = document.createElement(element.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);
