# 処理の流れメモ

##  1. render()で下記が生成される

```
nextUnitOfWork = {
  dom: <div id="root"></div>
  props: {
    children: [
      {
        type: "h1",
        props: {
          title: "foo",
          children: [
            {
              type: "TEXT_ELEMENT",
              props: {
                nodeValue: "Hello",
                children: []
              }
            }
          ]
        }
      }
    ]
  }
}
```

##  2. 114行目の下記により、机が空いたタイミングでworkLooop()が実行される

```
requestIdleCallback(workLoop);
```


## 3. workLoop()実行

* nextUnitOfWorkには「1」で生成された値が入っている
* whileの条件式がtrueになり、performUnitOfWork()が実行される


## 4. performUnitOfWork()実行

* 「1. DOMの生成」はいずれのifの条件式にも当てはまらないため、特に処理は実行されない
* 「2. Fiberノードの作成」elementsの値は下記になる
  * elementsの値は1つしかないため、while文は1回だけ実行される

```
elements = {
  type: "h1",
  props: {
    title: "foo",
    children: [
      {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: "Hello",
          children: []
        }
      }
    ]
  }
}
```

* Whileの中の処理
  * elementsの値は1つしかないため、elementの値はelementsと一緒
  * newFiberには下記の値が入る

```
newFiber = {
  type: "h1",
  props: {
    title: "foo",
    children: [
      {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: "Hello",
          children: []
        }
      }
    ]
  },
  parent: {
    dom: <div id="root"></div>
    props: {
      children: [
        {
          type: "h1",
          props: {
            title: "foo",
            children: [
              {
                type: "TEXT_ELEMENT",
                props: {
                  nodeValue: "Hello",
                  children: []
                }
              }
            ]
          }
        }
      ]
    }
  },
  dom: null
}
```

* index === 0なので、fiber(=nextUnitOfWork)のchildに上記newFiberが追加される

```
{
  dom: <div id="root"></div>
  props: {
    children: [
      {
        type: "h1",
        props: {
          title: "foo",
          children: [
            {
              type: "TEXT_ELEMENT",
              props: {
                nodeValue: "Hello",
                children: []
              }
            }
          ]
        }
      }
    ],
    // 下記childが追加
    child: {
        type: "h1",
        props: {
            title: "foo",
            children: [
            {
                type: "TEXT_ELEMENT",
                props: {
                nodeValue: "Hello",
                children: []
                }
            }
            ]
        },
        parent: {
            dom: <div id="root"></div>
            props: {
            children: [
                {
                type: "h1",
                props: {
                    title: "foo",
                    children: [
                    {
                        type: "TEXT_ELEMENT",
                        props: {
                        nodeValue: "Hello",
                        children: []
                        }
                    }
                    ]
                }
                }
            ]
            }
        },
        dom: null
        }
    }
}

```

* 「3. 次の作業単位を返す」で、fiberにchildrenがあるので、最初のif文が実行される
  * returnされるので、workLoop()の処理に戻る
  * nextUnitOfWorkにreturnされた値(=fiber.child)が代入される

## 5. workLoop()の処理に戻る

* 時間が余っていれば次の作業が行われる
* 時間が余っていると仮定して次の処理を記載する

## 6. 再度workLoop()が実行される

* 今回はnextUnitOfWorkの値は下記の通りになる
* while文の条件式がtrueになるためperformUnitOfWork()が実行される

```
{
    type: "h1",
    props: {
        title: "foo",
        children: [
        {
            type: "TEXT_ELEMENT",
            props: {
            nodeValue: "Hello",
            children: []
            }
        }
        ]
    },
    parent: {
        dom: <div id="root"></div>
        props: {
        children: [
            {
            type: "h1",
            props: {
                title: "foo",
                children: [
                {
                    type: "TEXT_ELEMENT",
                    props: {
                    nodeValue: "Hello",
                    children: []
                    }
                }
                ]
            }
            }
        ]
        }
    },
    dom: null
}
```

## 7. performUnitOfWork()の実行

* 今回はfiber.domがないため、createDom()が実行され、下記値が返ってくる

```
<h1 title="foo"></h1>
```

* 2つ目のif文の条件も合致するため、fiber.parent.domの値は下記通りになる

```
<div id="root"><h1 title="foo"></h1></div>
```

* while文の「index === 0」は、performUnitOfWork()が2回目の実行なので初期化されているため、trueになる
* その他の処理は基本的には上記と一緒で、この後の流れも同じような感じ
* 
