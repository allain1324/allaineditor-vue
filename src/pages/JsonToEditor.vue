<template>
  <input type="file" accept="docx/*" @input="onPickFile" />
  <div style="display: flex">
    <textarea
      :value="valueJSON"
      disabled
      style="width: 100%; height: 577px; flex: 1"
      @input="handleOnChange"
    ></textarea>
    <CreateEditor
      ref="refCreateEditor"
      style="flex: 1"
      :editor="editorRef"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import CreateEditor from '../components/CreateEditor.vue'
import { IDomEditor } from '@wangeditor/editor'
import { Node } from 'slate'

export default defineComponent({
  components: {
    CreateEditor,
  },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef<IDomEditor | undefined>(undefined)
    const valueJSON = ref<string>('')
    const valueHtml = ref<string>('')
    const refCreateEditor = ref(null)
    // 编辑器相关配置
    const editorConfig = {
      placeholder: '请输入内容...',
      // autofocus: false,
      // readOnly: true
    }

    function handleCreated(editor: IDomEditor) {
      console.log('handleCreated', editor)
      editorRef.value = editor
    }

    const onPickFile = (e: Event) => {
      const files: FileList = (e.target as HTMLInputElement).files as FileList
      if (files.length) {
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post('https://sharaku-convert.developer.vi-jp-te.info/convert/docx2json', formData)
          .then(res => {
            valueJSON.value = JSON.stringify(res.data.data, null, 2)
            console.log('valueJSON', refCreateEditor.value)
            if (refCreateEditor.value) {
              (refCreateEditor.value as any).setJSONToEditor(valueJSON.value)
            }
          })
        console.log('onPickFile')
      }
    }

    const handleOnChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = JSON.parse(target.value) as Node[]
      console.log('handleOnChange', target.value)
      editorRef.value?.insertFragment(value)
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return

      editor.destroy()
    })

    return {
      editorRef,
      handleCreated,
      handleOnChange,
      valueJSON,
      valueHtml,
      onPickFile,
      refCreateEditor
    }
  },
})
</script>
