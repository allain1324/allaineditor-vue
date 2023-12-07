<template>
  <div style="display: flex;">
    <CreateEditor
      :editor="editorRef"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
    <div disabled v-html="defaultHtml" style="margin-left: 5px; border: 1px solid #ccc; width: 100%; height: 577px; max-height: 577px; overflow: auto;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, shallowRef, reactive, onBeforeUnmount } from 'vue'
import CreateEditor from '../components/CreateEditor.vue'
import { IDomEditor } from '@wangeditor/editor'

export default defineComponent({
  components: {
    CreateEditor
  },
  setup() {
    const flag = ref(false)
    // 模式
    const mode = 'default'

    // 编辑器实例，必须使用 shallowRef ！！！
    const editorRef = shallowRef<IDomEditor | undefined>(undefined)

    // 编辑器默认内容 - JSON 格式
    const defaultContent = ref([
      {
        type: 'paragraph',
        children: [{ text: '一行文字' }],
      },
    ])

    // 编辑器默认内容 - HTML 格式
    // const defaultHtml = '<p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>'
    const defaultHtml = ref<string>('')

    // 编辑器相关配置
    const editorConfig = {
      placeholder: '请输入内容...',
      // 菜单配置
      MENU_CONF: {
        uploadImage: {
          server: 'http://106.12.198.214:3000/api/upload-img', // 上传图片地址
          fieldName: 'vue-demo-fileName',
        },
        insertImage: {
          checkImage(src: string, alt: string, href: string): boolean | string | undefined {
            if (src.indexOf('http') !== 0) {
              return '图片网址必须以 http/https 开头'
            }
            return true
          },
        },
      },
    }

    setTimeout(() => {
      // defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
      // defaultHtml.value = '<p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>'
      defaultContent.value = [{ type: 'paragraph', children: [{ text: 'ajax 异步获取的内容' }] }]
      flag.value = true
    }, 2000)

    // 编辑器创建完成触发
    const handleCreated = (editor: IDomEditor) => {
      console.log('created', editor)
      editorRef.value = editor // 记录 editor 实例
    }
    // 编辑器change事件触发
    const handleChange = (editor: IDomEditor) => {
      console.log('change:', editor.getText())
      defaultHtml.value = editor.getHtml();
    }
    // 自定义粘贴事件
    const handlePaste = (
      editor: IDomEditor,
      event: ClipboardEvent,
      callback: (val: boolean) => void
    ) => {
      editor.insertText('test')
      callback(false)
    }

    const handleCreateEditor = () => {
      flag.value = !flag.value
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return

      editor.destroy()
    })

    return {
      flag,
      editorRef,
      mode,
      defaultHtml,
      defaultContent,
      editorConfig,
      handleCreated,
      handleChange,
      handlePaste,
      handleCreateEditor,
    }
  },
})
</script>

<style>
@import url(@wangeditor/editor/dist/css/style.css);
</style>
