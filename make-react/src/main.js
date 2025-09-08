// 1. Reactで書く場合
// function MyComponent() {
//   return <h1 title="foo">Hello</h1>;
// }
// const container = document.getElementById('root');
// ReactDOM.render(<MyComponent />, container);

// 2. JSXがコンパイル(jsに変換)された状態（最初の3行のコンポーネント部分がReact.createElementに変換されている）
// JSX：人間が分かりやすいコードの書き方
// const element = React.createElement("h1", { title: "foo" }, "Hello");
// const container = document.getElementById("root");
// ReactDOM.render(element, container);

// 3. 1の状態のコードをjsのみで書いた場合
// createElementをすると下記(element)がreturnされる
// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "Hello",
//   },
// };

// const container = document.getElementById("root");

// // renderっぽいものをjsで書くと下記のようになる
// // render=DOMが作られる
// const node = document.createElement(element.type);
// node["title"] = element.props.title;

// const text = document.createTextNode("");
// text["nodeValue"] = element.props.children;

// node.appendChild(text);
// container.appendChild(node);


// 4. createElementをjsで書いた場合

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

// オブジェクトにすることによって、情報を追加することができるので、Reaceは全てをオブジェクトで管理したい、という考え方
// JavaScript内では文字列や数値はオブジェクトではないため、そのままでは仮想DOM要素として扱えないため同じような形のオブジェクトにしてあげる

// 普通のテキストをオブジェクトに変換する関数
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


// 5. renderをReactっぽくjsで書く場合
