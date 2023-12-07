<template>
  <div style="display: flex;">
    <CreateEditor
      :editor="editorRef"
      @onCreated="handleCreated"
      @onChange="handleOnChange"
    />
    <textarea :value="valueJSON" style="width: 100%; height: 577px"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import CreateEditor from '../components/CreateEditor.vue'
import { IDomEditor } from '@wangeditor/editor'

export default defineComponent({
  components: {
    CreateEditor,
  },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef<IDomEditor | undefined>(undefined)
    const valueJSON = ref<string>('')
    const valueHtml = ref<string>('')

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

    const handleOnChange = (editor: IDomEditor) => {
      valueJSON.value = JSON.stringify(editor.children, null, 2)
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
    }
  },
})
</script>
