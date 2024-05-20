export interface ChangeOutput {
  key: string
  params: any
  value: any
}

export interface UiFormOptions {
  gridItem?: { span: number }
  grid?: { xGap: number; yGap: number; cols: number }
}
