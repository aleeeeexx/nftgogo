import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installVant from './vant'
import '@/style/index.scss'
import 'nprogress/nprogress.css'
import store from '@/store'
import components from '@/components/index'
// 非生产环境下显示vconsole
if (!process.env.VUE_APP_HIDDEN_VCONSOLE) {
  const VConsole = () => import(/* webpackChunkName: "vconsole" */ 'vconsole')
  const vConsole = VConsole()
  vConsole.then(res => {
    const VConsole = res.default
    new VConsole()
  })
}
const app = createApp(App)
app.use(router)
app.use(store)
app.use(components)
installVant(app).mount('#app')
