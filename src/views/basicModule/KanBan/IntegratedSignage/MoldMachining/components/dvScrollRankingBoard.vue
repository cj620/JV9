
<template>
  <div class="dv-scroll-ranking-board" :ref="ref">
    <div
      class="row-item"
      v-for="(item, index) in rows"
      :key="item.toString() + item.scroll"
      :style="`height: ${heights[index]}px;`"
    >
      <div class="ranking-info">
        <div class="info-name"  >{{item.Name}}</div>

        <div
          class="inside-column"
        >
          <div :class="[item.index%2==0 ? 'bgColor1' : 'bgColor2','shine']" :style="{width:item.Percentage+'%'}"/>
        </div>


<!--        <div class="ranking-value">{{ item.Value }}</div>-->
        <div  class="ranking-progress" >{{ item.Percentage }}%</div>
      </div>

<!--      <div class="ranking-column">
        <div
          class="inside-column"
          :style="`width: ${item.percent}%;`"
        >
          <div class="shine" />
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import autoResize from './autoResize'
/*import { deepMerge } from '@jiaminghi/charts/lib/util/index'
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'*/
export default {
  name: 'DvScrollRankingBoard',
  mixins: [autoResize],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      ref: 'scroll-ranking-board',
      defaultConfig: {
        /**
         * @description Board data
         * @type {Array<Object>}
         * @default data = []
         */
        data: [],
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 6,
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2000
         */
        waitTime: 5000,
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single',
        /**
         * @description Value unit
         * @type {String}
         * @default unit = ''
         * @example unit = 'ton'
         */
        unit: '',
        /**
         * @description Auto sort by value
         * @type {Boolean}
         * @default sort = true
         */
        sort: true,
        /**
         * @description Value formatter
         * @type {Function}
         * @default valueFormatter = null
         */
        valueFormatter: null
      },
      mergedConfig: null,
      rowsData: [],
      rows: [],
      heights: [],
      animationIndex: 0,
      animationHandler: '',
      updater: 0
    }
  },
  watch: {
    config () {
      const { stopAnimation, calcData } = this
      stopAnimation()
      calcData()
    }
  },
  methods: {
    afterAutoResizeMixinInit () {
      const { calcData } = this
      calcData()
    },
    onResize () {
      const { mergedConfig, calcHeights } = this
      if (!mergedConfig) return
      calcHeights(true)
    },
    calcData () {
      const { mergeConfig, calcRowsData } = this
      mergeConfig()
      calcRowsData()
      const { calcHeights } = this
      calcHeights()
      const { animation } = this
      animation(true)
    },
    mergeConfig () {
      let { config, defaultConfig } = this
      console.log(defaultConfig);
      this.mergedConfig = Object.assign({},defaultConfig,config)
    },
    calcRowsData () {
      let { data, rowNum, sort } = this.mergedConfig
      console.log(data, rowNum, sort);
      sort && data.sort(({ value: a }, { value: b }) => {
        if (a > b) return -1
        if (a < b) return 1
        if (a === b) return 0
      })
      const value = data.map(({ value }) => value)

      const min = Math.min(...value) || 0
      // abs of min
      const minAbs = Math.abs(min)
      const max = Math.max(...value) || 0
      // abs of max
      const maxAbs = Math.abs(max)
      const total = max + minAbs
      data = data.map((row, i) => ({ ...row, ranking: i + 1, percent: (row.value + minAbs) / total * 100 }))
      const rowLength = data.length
      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }
      data = data.map((d, i) => ({ ...d, scroll: i }))
      this.rowsData = data
      this.rows = data
    },
    calcHeights (onresize = false) {
      const { height, mergedConfig } = this
      const { rowNum, data } = mergedConfig
      const avgHeight = height / rowNum
      this.avgHeight = avgHeight
      if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
    },
    async animation (start = false) {
      let { avgHeight, animationIndex, mergedConfig, rowsData, animation, updater } = this
      const { waitTime, carousel, rowNum } = mergedConfig
      const rowLength = rowsData.length
      if (rowNum >= rowLength) return
      if (start) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        if (updater !== this.updater) return
      }
      const animationNum = carousel === 'single' ? 1 : rowNum
      let rows = rowsData.slice(animationIndex)
      rows.push(...rowsData.slice(0, animationIndex))
      this.rows = rows.slice(0, rowNum + 1)
      this.heights = new Array(rowLength).fill(avgHeight)
      await new Promise(resolve => setTimeout(resolve, 300))
      if (updater !== this.updater) return
      this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
      animationIndex += animationNum
      const back = animationIndex - rowLength
      if (back >= 0) animationIndex = back
      this.animationIndex = animationIndex
      this.animationHandler = setTimeout(animation, waitTime - 300)
    },
    stopAnimation () {
      const { animationHandler, updater } = this
      this.updater = (updater + 1) % 999999
      if (!animationHandler) return
      clearTimeout(animationHandler)
    },
  },
  destroyed () {
    const { stopAnimation } = this
    stopAnimation()
  },

}
</script>

<style lang="scss" scoped>
$color: #1370fb;
.dv-scroll-ranking-board {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  .row-item {
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    .ranking-info {
      display: flex;
      width: 100%;
      font-size: 16px;

      .info-name {
        width: 100px;
        font-size: 16px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .inside-column {
        position: relative;
        height: 24px;
        background-color: #5A5F75;
        width: 230px;
        margin-right: 10px;
        border-radius:0 12px 12px 0;
        .shine {
          position: absolute;
          left: 0%;
          top: 0px;
          height: 24px;
          width: 50%;
          border-radius:0 12px 12px 0;

        }
        .bgColor1{
          background-image: linear-gradient(to right, #272d4b , #30a7f2);

        }
        /* 偶数行 */
        .bgColor2{
          background-image: linear-gradient(to right, #272d4b , #ff5a6a);


        }

      }
      .ranking-value{
        width: 40px;
        margin:0 15px;
      }
      .ranking-progress{
        width: 70px;
      }
    }

  }




  }

@keyframes shine {
  80% {
    left: 0%;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}

</style>
