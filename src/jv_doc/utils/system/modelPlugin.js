import Vue from 'vue'
import { Dialog } from 'element-ui'

let instance

const Modal = function ({ component, methods, props, componentProps }) {
  if (Vue.prototype.$isServer) return
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  instance = new Vue({
    el: dom,
    data () {
      return {
        showModal: true
      }
    },
    components: {
      Dialog: Dialog,
      Plugin: component
    },
    render (createElement) {
      const plugin = this.showModal ? () => createElement('Plugin', {
        props: {
          ...componentProps
        },
        on: {
          close: (e) => this.close(e),
          ...methods
        }
      }) : null
      return createElement(
        'Dialog', {
          props: {
            visible: this.showModal,
            closeOnClickModal: false,
            ...props
          },
          on: {
            close: (e) => this.close(e)
          },
          scopedSlots: {
            default: plugin
          }
        })
    },
    methods: {
      close () {
        this.showModal = false
        document.body.removeChild(this.$el)
        this.$destroy()
      }
    }
  })
  return instance
}

export default Modal
