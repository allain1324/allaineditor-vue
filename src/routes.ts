import BasicDemo from "./pages/Preview.vue";
import ToJSON from "./pages/ToJSON.vue";
import JsonToEditor from "./pages/JsonToEditor.vue";
const routes = [
  {
    path: "/",
    component: BasicDemo,
  },
  {
    path: "/basic",
    component: BasicDemo,
  },
  {
    path: "/2json",
    component: ToJSON,
  },
  {
    path: "/json2editor",
    component: JsonToEditor,
  },
];
export default routes;