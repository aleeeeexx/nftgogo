import {
  ConfigProvider,
  Button,
  Cell,
  CellGroup,
  Field,
  ActionSheet,
  Tab,
  Tabs,
  Icon,
  Sticky,
  Image as VanImage,
  Radio,
  RadioGroup,
  Search,
  DropdownMenu,
  DropdownItem,
  PullRefresh,
  List,
  Picker,
  Popup,
  Dialog,
  Cascader,
  Lazyload,
  Checkbox,
  CheckboxGroup
} from 'vant'
import { App } from '@vue/runtime-core'
import 'vant/lib/index.css'
//TODO 修改为每个组件按需加载 或者基础组件全局 特定组件全部按需 优化
const installVant = (app: App) => {
  app.use(Button)
  app.use(Cell)
  app.use(CellGroup)
  app.use(ConfigProvider)
  app.use(Field)
  app.use(ActionSheet)
  app.use(Tab)
  app.use(Tabs)
  app.use(Icon)
  app.use(Sticky)
  app.use(VanImage)
  app.use(Radio)
  app.use(RadioGroup)
  app.use(Search)
  app.use(DropdownMenu)
  app.use(DropdownItem)
  app.use(PullRefresh)
  app.use(List)
  app.use(Picker)
  app.use(Popup)
  app.use(Dialog)
  app.use(Cascader)
  app.use(Lazyload)
  app.use(Checkbox)
  app.use(CheckboxGroup)
  return app
}

export default installVant
