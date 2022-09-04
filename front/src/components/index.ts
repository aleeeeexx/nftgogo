import MjButton from './MjButton/index.vue'

export default function install(app: { component: Function }) {
  app.component('mj-button', MjButton)
}
