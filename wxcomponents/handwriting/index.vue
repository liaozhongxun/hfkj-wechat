<template>
<uni-shadow-root class="handwriting-index"><view class="atom-container-weidget">
  <image class="atom-handwriting-image" mode="aspectFit" @click="onEdit" :src="tempFilePath"></image>
  <image class="btn-clear" src="./images/handwriting_clear.svg" @click="clearHandWriting"></image>
</view>

<view class="atom-container-canvas" :style="'display: '+(showCanvas ? '' : 'none')">

  <canvas class="atom-canvas-handwriting" :style="'width: '+(canvasWidth)+'px;height: '+(canvasHeidht)+'px'" canvas-id="canvas-handwriting" @touchstart="onTouchStart" @touchmove="onTouchmove" @touchend="onTouchEnd" @error="onError"></canvas>

  <view class="atom-handwriting-tools">
    <image src="./images/paint_brush.svg" @click="showBrush"></image>
    <image src="./images/palette.svg" @click="showPalette"></image>
    <view @click="finishDraw">完成</view>
  </view>

  

  

  <cover-view class="atom-container-palette" :style="'display: '+(showPalette ? '' : 'none')">
    <cover-view v-for="(item,index) in (colorBlocks)" :key="item" class="atom-palette-block">
      <cover-view class="atom-palette-block-view" :style="'background-color: '+(item)" :data-color="item" @click="changeColor"></cover-view>
    </cover-view>
  </cover-view>




  <cover-view class="atom-container-brush" :style="'display: '+(showBrush ? '' : 'none')">
    <button class="atom-container-brush-button" data-width="3" @click="onBrushChange">细</button>
    <button class="atom-container-brush-button" data-width="6" @click="onBrushChange">适中</button>
    <button class="atom-container-brush-button" data-width="10" @click="onBrushChange">粗</button>
  </cover-view>



</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'handwriting/index'
let tempPath = [];
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    showCanvas: false,
    colorBlocks: ['#FF0000', '#FF4081', '#FFA000', '#FFEB3B', '#00BCD4', '#2196F3', '#9E9E9E', '#000000'],
    showPalette: false,
    showBrush: false,
    color: '#000000',
    strokeWidth: 6,
    windowWidth: 0,
    windowHeight: 0,
    canvasWidth: wx.getSystemInfoSync().windowWidth,
    canvasHeidht: wx.getSystemInfoSync().windowHeight - 46,
    toolBarHeight: 46,
    ctx: null,
    timeStamp: -1000,
    paths: [], // 路径二维数组
    tempFilePath: ''
  },
  lifetimes: {
    created: function() {
      // console.log('handwriting ----> created')
      const res = wx.getSystemInfoSync() 
      let canvasWidth = res.windowWidth;
      let canvasHeidht = res.windowHeight - this.data.toolBarHeight;
      // console.log(`设置画板:canvasWidth->${canvasWidth},canvasHeidht->${canvasHeidht}`)
      this.setData({
        canvasWidth,
        canvasHeidht
      })
    },
    attached: function() {
      // console.log('handwriting ----> attached')
    },
    ready: function() {
      // console.log('handwriting ----> ready')
      let ctx = wx.createCanvasContext('canvas-handwriting', this);
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, 1000, 1000)
      ctx.setLineWidth(this.data.strokeWidth)
      ctx.draw()
      this.setData({
        ctx
      })
    },
    detached: function() {
      // console.log('handwriting ----> detached')
    },
  },
  pageLifetimes: {
    show: function() {
      // console.log('handwriting ----> show')
    },
    hide: function() {
      // console.log('handwriting ----> hide')
    },
    resize: function(size) {
      // console.log('handwriting ----> resize')
    }
  },
  methods: {
    showPalette: function() {
      this.setData({
        showBrush: false,
        showPalette: !this.data.showPalette
      })
    },
    showBrush: function() {
      this.setData({
        showPalette: false,
        showBrush: !this.data.showBrush
      })
    },
    changeColor: function(event) {
      let color = event.currentTarget.dataset.color;
      this.setData({
        showPalette: false,
        color
      })
      let ctx = this.data.ctx;
      ctx.setStrokeStyle(color)
    },
    onBrushChange: function(event) {
      // let strokeWidth = event.detail.value;
      let strokeWidth = event.currentTarget.dataset.width;
      this.setData({
        showBrush: false,
        strokeWidth
      })
      let ctx = this.data.ctx;
      ctx.setLineWidth(strokeWidth)
    },
    onEdit: function() {
      this.setData({
        showCanvas: true
      })
    },
    clearHandWriting: function() {
      this.setData({
        tempFilePath: '',
        timeStamp: -1000,
        paths: []
      })
      let ctx = this.data.ctx;
      console.log(ctx)
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.setFillStyle('#fff')
      ctx.setLineWidth(this.data.strokeWidth)
      ctx.fillRect(0, 0, 1000, 1000)
      ctx.draw();
    },
    finishDraw: function() {
      console.log('finishDraw ----> ')
      let _this = this;
      wx.canvasToTempFilePath({
        canvasId: 'canvas-handwriting',
        fileType: 'jpg',
        quality: 1.0,
        success(res) {
          // console.log(res)
          _this.setData({
            showCanvas: false,
            tempFilePath: res.tempFilePath
          })
          _this.triggerEvent('OnComplete', res.tempFilePath);
        },
        fail(res) {
          console.error(res)
        }
      }, this)
    },
    isPaused: function() {
      return this.data.showBrush || this.data.showPalette;
    },
    onTouchStart: function(event) {
      // console.log('onTouchStart ----> ', event)
      if (this.isPaused()) {
        console.log('onTouchstart ----> 处于设置状态')
        return
      }
      let point = {
        x: event.touches[0].x,
        y: event.touches[0].y
      };
      tempPath = [point];
    },
    onTouchEnd: function(event) {
      // console.log('onTouchEnd ----> ', event)
      let paths = this.data.paths;
      paths.push(tempPath);
      tempPath = [];
      // 利用临时数组来记录轨迹，最后保留，解决频繁setData导致性能急剧下降的问题
      this.setData({
        paths
      })
    },
    onTouchmove: function(event) {
      // console.log('onTouchmove ----> ', event)
      if (this.isPaused()) {
        console.log('onTouchstart ----> 处于设置状态')
        return
      }
      // let timeStamp = this.data.timeStamp;
      // let gap = event.timeStamp - timeStamp;
      // if (gap < 20) {
      //   console.log('渲染太快，舍弃');
      //   return;
      // } 
      let point = {
        x: event.touches[0].x,
        y: event.touches[0].y
      };
      tempPath.push(point)
      let ctx = this.data.ctx;
      ctx.moveTo(tempPath[tempPath.length - 2].x, tempPath[tempPath.length - 2].y)
      ctx.setLineCap('round')
      // ctx.setLineJoin('round')
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
      ctx.draw(true )
    },
    onError: function(event) {
      console.error('onError ----> ', event)
    },
  }
})
export default global['__wxComponents']['handwriting/index']
</script>
<style platform="mp-weixin">
.atom-container-weidget {
  position: relative;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-clear {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0px;
  right: 4px;
}

.atom-container-canvas {
  /* transform:rotate(90deg); */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.atom-handwriting-image {
  width: 80%;
  height: 120px;
}

.atom-canvas-handwriting {
  z-index: 1;
}

.atom-handwriting-tools {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 46px;
  display: flex;
  background-color: #f2f2f2;
  justify-content: space-around;
  align-items: center;
  padding: 4px 0px;
}

.atom-handwriting-tools image {
  width: 32px;
  height: 32px;
}

.atom-container-palette {
  padding: 6px 2px;
  width: 100%;
  bottom: 46px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(33, 33, 33, 0.5);
  z-index: 999;
}

.atom-palette-block {
  flex-basis: 25%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.atom-palette-block > view {
  width: 32px;
  height: 32px;
  margin: 4px 0px;
  border-radius: 5px;
  background-color: #aaa;
}

.atom-palette-block-view {
  width: 32px;
  height: 32px;
  margin: 4px 0px;
  border-radius: 5px;
  background-color: #aaa;
}

.atom-container-brush {
  padding: 12px 4px;
  background-color: rgba(33, 33, 33, 0.5);
  width: 100%;
  bottom: 46px;
  position: absolute;
  z-index: 999;
  display: flex;
}

.atom-container-brush-button {
  width: 80px;
  height: 26px;
  padding: 0px;
  font-size: 12px;
}
</style>