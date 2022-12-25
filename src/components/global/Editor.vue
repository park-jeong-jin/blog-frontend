<template>
  <div class="editor">
    <div v-if="editor && editable">
      <button :disabled="!editor.can().chain().focus().toggleBold().run()" :class="['bold', { 'is-active': editor.isActive('bold') }]" @click="editor.chain().focus().toggleBold().run()">bold</button>
      <button :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="['italic', { 'is-active': editor.isActive('italic') }]" @click="editor.chain().focus().toggleItalic().run()">italic</button>
      <button :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="['strike', { 'is-active': editor.isActive('strike') }]" @click="editor.chain().focus().toggleStrike().run()">strike</button>
      <button :disabled="!editor.can().chain().focus().toggleCode().run()" :class="['code', { 'is-active': editor.isActive('code') }]" @click="editor.chain().focus().toggleCode().run()">code</button>
      <button :class="['h1', { 'is-active': editor.isActive('heading', { level: 1 }) }]" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">h1</button>
      <button :class="['h2', { 'is-active': editor.isActive('heading', { level: 2 }) }]" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">h2</button>
      <button :class="['h3', { 'is-active': editor.isActive('heading', { level: 3 }) }]" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">h3</button>
      <button :class="['h4', { 'is-active': editor.isActive('heading', { level: 4 }) }]" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">h4</button>
      <button :class="['h5', { 'is-active': editor.isActive('heading', { level: 5 }) }]" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">h5</button>
      <button :class="['h6', { 'is-active': editor.isActive('heading', { level: 6 }) }]" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">h6</button>
      <button :class="['paragraph', { 'is-active': editor.isActive('paragraph') }]" @click="editor.chain().focus().setParagraph().run()">paragraph</button>
      <button :class="['bulletList', { 'is-active': editor.isActive('bulletList') }]" @click="editor.chain().focus().toggleBulletList().run()">bulletList</button>
      <button :class="['orderedList', { 'is-active': editor.isActive('orderedList') }]" @click="editor.chain().focus().toggleOrderedList().run()">orderedList</button>
      <button :class="['codeBlock', { 'is-active': editor.isActive('codeBlock') }]" @click="editor.chain().focus().toggleCodeBlock().run()">codeBlock</button>
      <button :class="['blockquote', { 'is-active': editor.isActive('blockquote') }]" @click="editor.chain().focus().toggleBlockquote().run()">blockquote</button>
      <button :class="['horizontalRule']" @click="editor.chain().focus().setHorizontalRule().run()">separator</button>
      <button :class="['text-wrap']" @click="editor.chain().focus().setHardBreak().run()">text-wrap</button>
      <button :class="['undo']" :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">undo</button>
      <button :class="['redo']" :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">redo</button>
    </div>
    <editor-content :editor="editor"/>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: 'Editor',
  components: {
    EditorContent
  },
  props: {
    modelValue: { type: String, default: '' },
    editable: { type: Boolean, default: true }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      editor: null
    }
  },
  watch: {
    modelValue (newValue, oldValue) {
      if (this.editor.getHTML() === newValue) return
      this.editor.commands.setContent(newValue, false)
    },
    editable (newValue, oldValue) {
      this.editor.setEditable(this.editable)
    }
  },
  mounted () {
    this.editor = new Editor({
      content: this.modelValue,
      editable: this.editable,
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      }
    })
  },
  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss" scoped>
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}

.checkbox {
  margin-bottom: 1rem;

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
}

[contenteditable=false] {
  color: #999;
}

.editor > div:not(:last-child) {
  border-bottom: 1px solid $border-color1;
}

button {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.1rem;
  border: 0;

  > img {
    vertical-align: middle;
  }
}
</style>
