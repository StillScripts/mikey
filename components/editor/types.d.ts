export interface EditorjsData {
  time: number
  blocks: Block[]
  version: string
}

export interface Block {
  id: string
  type: BlockType
  data: Data
}

export interface Data {
  text: string
}

export type BlockType = 'header' | 'paragraph' | 'link' | 'list'
