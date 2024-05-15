let list = []

export default {
  mounted() {
    list.push(this);
      window.onresize = () => {
        this.debounce(() => {
          list.forEach(item => {
            if (item.isOnResize) {
              const clearfixBox = document.getElementById(`${item.Id}`);
              item.templateWidth = clearfixBox.clientWidth / item.col - 5 + 'px';
            }
          })
        })
      }
    list.forEach(item => {
      const clearfixBox = document.getElementById(`${item.Id}`);
      item.templateWidth = clearfixBox.clientWidth / item.col - 5 + 'px';

      const style = document.createElement('style');
      style.id = 'draggable-ghost-style'
      style.textContent = `
          .ghostClass-${item.col} {
            width: ${(100 / item.col).toFixed(2)}%!important;
          }
        `;
      document.head.appendChild(style);
    })
  },
  methods: {
    debounce(fn) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(fn, 50);
    }
  }
}
