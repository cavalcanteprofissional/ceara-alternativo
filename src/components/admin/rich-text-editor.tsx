'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { Toggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Code,
  Heading1,
  Heading2,
} from 'lucide-react'
import { useCallback, useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Escreva seu conteúdo aqui...' }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-red-700 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
  })

  const setLink = useCallback(() => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run()
    } else {
      editor?.chain().focus().unsetLink().run()
    }
    setShowLinkInput(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  if (!editor) {
    return (
      <div className="border rounded-lg bg-stone-50 dark:bg-stone-900 min-h-[400px] animate-pulse" />
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-stone-50 dark:bg-stone-900">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-stone-300 dark:bg-stone-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-stone-300 dark:bg-stone-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-stone-300 dark:bg-stone-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={editor.isActive('link') ? 'bg-stone-200 dark:bg-stone-700' : ''}
        >
          <LinkIcon className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-stone-300 dark:bg-stone-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {showLinkInput && (
        <div className="flex items-center gap-2 p-2 border-b bg-stone-50 dark:bg-stone-900">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-1 text-sm border rounded"
            onKeyDown={(e) => e.key === 'Enter' && setLink()}
          />
          <Button type="button" size="sm" onClick={setLink}>
            Adicionar
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl('')
            }}
          >
            Cancelar
          </Button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}