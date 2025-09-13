// React.createElement, renderをReactっぽくjsで再実装した場合

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

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createDom(fiber) {
  // document. のため、上記関数とは異なる
  const dom = fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode(fiber.props.nodeValue)
    : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(key => key !== "children")
    .forEach(name => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

// 一気にdomを追加していくイメージ
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  // nextUnitOfWorkはfiberの構造になっている
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    }
  };
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

function performUnitOfWork(fiber) {
  // 1. DOMを生成する
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. Fiberノードを作成する
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber;
      // 子が複数いる場合
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // 3. 次の作業単位(Fiber)を返す
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent
  }
  // 上記条件式に当てはまらず、rootまで行くと描画が終わったということ
}

requestIdleCallback(workLoop);

const MyReact = {
  createElement,
  render
}

export default MyReact;
