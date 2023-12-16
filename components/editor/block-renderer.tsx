import type { Block } from './types'

const ResolveBlock = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.data?.text ?? ''}</p>
  }
}

export const BlockRenderer = ({ content }: { content: string }) => {
  const blocks = JSON.parse(content)?.blocks as Block[]
  console.log(blocks)
  return (
    <main>
      {blocks.map((block) => (
        <ResolveBlock key={block.id} block={block} />
      ))}
    </main>
  )
}
