// Reactで書く場合
function MyComponent() {
  return <h1 title="foo">Hello</h1>;
}
const container = document.getElementById('root');
ReactDOM.render(<MyComponent />, container);
