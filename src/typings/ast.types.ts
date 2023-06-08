
export interface NodeBasics {
  nodeType: string
}

export interface ASTNode {
  remove: Function
  find: Function
  attr: Function
}

export interface HTMLNode extends NodeBasics {
  parentRef: HTMLNode
  content: {
    name: string
    children: HTMLNode[],
    openEnd: any
  }
}

export interface JavaScriptNode extends NodeBasics {

}

export interface CssNode extends NodeBasics {

}

export interface EnumTypeNode {
  FunctionDeclaration: any[]
  VariableDeclaration: any[]
  ImportDeclaration: any[]
  ExportNamedDeclaration: any[]
  Identifier: any[]
  TSInterfaceBody: any[]
}