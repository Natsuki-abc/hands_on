// JSXがコンパイル(jsに変換)された状態
// main_1.jsとの違いは、最初の3行のコンポーネント部分(MyComponent)がReact.createElementに変換されている
// JSX：人間が分かりやすいコードの書き方
const element = React.createElement("h1", { title: "foo" }, "Hello");

const container = document.getElementById("root");
ReactDOM.render(element, container);
