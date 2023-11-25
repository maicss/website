---
date: 2023/11/24
description: image preview
image: 
prev:
  text: javascript promise pool
  link: /blog/promise-pool
next:
  text: Blog 首页
  link: /blog/
---
# image preview

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
      }
      div {
        position: fixed;
        inset: 0px;
        background-color: rgba(0, 0, 0, 0.3);
        justify-content: center;
        display: flex;
        align-items: center;
      }
      img {
        transition: all 0.2s ease-in-out;
      }
    </style>
  </head>
  <body>
    <script>
      const scale_up_pre_time = 1.2
      const scale_down_pre_time = 0.8

      const dragstartPosition = {
        x: 0,
        y: 0,
      }
      /**
       * @param {Event} event
       */
      const moveStartHandler = (event) => {
        console.log('start', event)
        dragstartPosition.x = event.touches[0].pageX
        dragstartPosition.y = event.touches[0].pageY
      }
      /**
       * @param {Event} event
       */
      const moveHandler = (event, img) => {
        dragstartPosition.x = event.touches[0].pageX
        dragstartPosition.y = event.touches[0].pageY
        const { m11: scaleX, m22: scaleY } = new WebKitCSSMatrix(getComputedStyle(img).transform)
      }
      /**
       * @param {Event} event
       */
      const moveEndHandler = (event) => {
        console.log('end', event)
      }
      /**
       * @param img {HTMLImageElement}
       */
      function onload1(img) {
        const widthRatio = document.documentElement.clientWidth / img.naturalWidth
        const heightRatio = document.documentElement.clientHeight / img.naturalHeight
        const minRatio = Math.min(widthRatio, heightRatio)
        console.log(minRatio)
        if (minRatio < 1) {
          const scaleRange = [minRatio * (document.documentElement.clientWidth < 1024 ? 1 : 0.8), 1]
          img.style.transform = `scale(${scaleRange[0]})`
          img.style.cursor = 'zoom-in'
          let scaleDirection = 'up'
          img.addEventListener('click', () => {
            const { m11: scaleX, m22: scaleY, m41: transformX, m42: transformY } = new WebKitCSSMatrix(getComputedStyle(img).transform)
            // img.style.transform = `scale(${})`
            console.log(scaleX, scaleY)
            let scale = scaleX
            if (scaleDirection === 'down') {
              scale = scale * scale_down_pre_time
              if (scale < scaleRange[0]) {
                img.style.cursor = 'zoom-in'
                scale = scaleRange[0]
                scaleDirection = 'up'
              }
            } else {
              scale = scaleX * scale_up_pre_time
              if (scale > scaleRange[1]) {
                scale = scaleRange[1]
                scaleDirection = 'down'
                img.style.cursor = 'zoom-out'
              }
            }
            img.style.transform = `scale(${scale})`
          })
          img.addEventListener('touchstart', moveStartHandler)
          img.addEventListener('dragstart', moveStartHandler)
          img.addEventListener('touchmove', event => moveHandler(event, img))
          img.addEventListener('drag', moveHandler)
          img.addEventListener('touchend', moveEndHandler)
          img.addEventListener('dragend', moveEndHandler)
        } else {
          // 不需要缩放，有两个处理方式，一个是强制放大，一个是显示实际大小
          if (document.documentElement.clientWidth < 1024) {
            img.style.width = '100%'
          } else {
            img.width = img.naturalWidth
          }
        }
      }
    </script>
    <div>
      <img src="https://dummyimage.com/4000x1000" onload="onload1(this)" draggable />
    </div>
  </body>
</html>


```
