

export interface ASTNode {
  type: string
  attr: () => void

}








/**
 * 在 AST（抽象语法树）中，常见的数据类型包括但不限于以下几种：

1. **StringLiteral（字符串字面量）**：代表字符串类型的数据，比如 "hello, world"。

2. **NumericLiteral（数值字面量）**：代表数值类型的数据，比如 123。

3. **BooleanLiteral（布尔字面量）**：代表布尔类型的数据，即 true 或 false。

4. **NullLiteral（空字面量）**：代表空值，用来表示变量值为空。

5. **Identifier（标识符）**：代表变量名、函数名等标识符。

6. **ObjectExpression（对象表达式）**：代表 JavaScript 中的对象，包括键值对等信息。

7. **ArrayExpression（数组表达式）**：代表 JavaScript 中的数组，包括数组元素等信息。

8. **FunctionExpression（函数表达式）**：代表函数类型的数据。

9. **UnaryExpression（一元表达式）**：代表一元运算表达式，比如取反操作符（!）。

10. **BinaryExpression（二元表达式）**：代表二元运算表达式，比如加法、减法等。

11. **LogicalExpression（逻辑表达式）**：代表逻辑运算表达式，比如与（&&）、或（||）操作。

12. **ConditionalExpression（条件表达式）**：代表条件运算表达式，即三元运算符（? :）。

以上是一些常见的 AST 中的数据类型，不同的编程语言和工具可能会有所不同。在处理 AST 时，了解这些数据类型可以帮助开发人员更好地理解代码的结构，从而进行相应的代码分析、转换或其他操作。
 */
