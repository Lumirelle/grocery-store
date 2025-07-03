# TS 基础手册 / TS Basic Manual

## 结构类型系统（鸭子类型） / Structural Type System (Duck Typing)

```ts
// 如果你定义了接口 Point 如下
interface Point {
  x: number
  y: number
}

// 设计了函数 logPoint，接受 Point 类型
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

// 结构类型系统会把“长的像” Point 类型的对象当作 Point 类型来处理，即使你从来没有声明过这个这个对象是 Point 类型
// 这个行为就称为鸭子类型（Duck Typing）
const point = { x: 12, y: 26 }
logPoint(point)
```

## TS 类型体操 / TS Type Challenges

见 <https://github.com/type-challenges/type-challenges>。
