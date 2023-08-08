//定义一个原生的bubbleSort方法 默认从小到大排序
Array.prototype.bubbleSort = function (reverse) {
    for(let i = 0; i < this.length - 1; i += 1) {
        for(let j = 0; j < this.length - 1 - i; j += 1) { 
            if(this[j] > this[j+1]) { 
                const temp = this[j];
                this[j] = this[j+1];
                this[j+1] = temp;
            }
        }
    }
    if(reverse) this.reverse();
}
export default null;