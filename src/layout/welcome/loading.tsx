import { FC, MutableRefObject, useEffect, useRef } from 'react'
import style from './welcome.module.scss'

const Loading: FC = () => {
  const loading: MutableRefObject<null> = useRef(null)
  let timeEle: NodeJS.Timeout|number = 0
  let rem: number = 1
  useEffect(() => {
    drawCircle()
    return () => {
      clearTimeout(timeEle)
    }
  }, [])
  function drawCircle() {
    const el: HTMLElement = document.documentElement
    rem = Number((el.clientWidth / 1920).toFixed(5))
    const canvas: any = loading.current
    canvas.width = 500 * rem
    canvas.height = 300 * rem
    const ctx = canvas.getContext('2d')
    drawLine(ctx, canvas, 0)
  }
  function drawEL(ctx: any,c: number, angle = 0) {
    let r: number = 100 * rem;
    const cx: number = 250 * rem
    const cy: number = 150 * rem
    const x1: number = cx - (r + 30 * rem) * Math.cos(Math.PI / 180 * angle) * Math.PI / 300 * c
    const y1: number = cy + 20 * rem - (r - 50 * rem) * Math.sin(Math.PI / 180 * angle) * Math.PI / 100 * c
    ctx.fillStyle = 'rgb(247, 244, 237)'
    ctx.shadowColor = 'rgb(247, 244, 237, 0.75)'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 8 * rem
    ctx.beginPath()
    if (c != 0) {
      ctx.arc(x1, y1, 8 * rem, Math.PI * 0, Math.PI * 2)
    } else {
      ctx.arc(x1, y1, 12 * rem, Math.PI * 0, Math.PI * 2)
      ctx.shadowBlur = 12
    }
    ctx.fill()
    ctx.closePath()
  }
  function drawLine(ctx: any, el: any, angle = 0) {
    if (angle >= 360) {
      angle = 0
    }
    let r: number = 100 * rem;
    const cx: number = 250 * rem
    const cy: number = 150 * rem
    ctx.clearRect(0, 0, el.width, el.height)
    // 绘制多个椭圆
    const als: number[] = [-45 * rem, 0, 45 * rem]
    als.forEach(val => {
      drawEL(ctx, val, angle)
    })
    // 椭圆绘制
    ctx.lineWidth = 5 * rem
    ctx.strokeStyle = 'rgb(247, 244, 237)'
    ctx.beginPath()
    ctx.ellipse(cx, cy + 20 * rem, r + 30 * rem, r - 50 * rem, 0, Math.PI * 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.closePath()
    // 椭圆轨迹卫星绘制
    const x1: number = cx - (r + 30 * rem) * Math.cos(Math.PI / 180 * angle)
    const y1: number = cy + 20 * rem - (r - 50 * rem) * Math.sin(Math.PI / 180 * angle)
    ctx.fillStyle = 'rgba(247, 244, 237, 0.85)'
    ctx.shadowColor = 'rgb(247, 244, 237, 0.65)'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 12 * rem
    ctx.beginPath()
    ctx.arc(x1, y1, 9 * rem, Math.PI * 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    // 正圆绘制
    ctx.lineWidth = 5 * rem
    ctx.strokeStyle = 'rgb(247, 244, 237)'
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI * 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
    // 正圆轨迹卫星绘制
    const x: number = cx - r * Math.sin(Math.PI * 2 / 360 * angle)
    const y: number = cy + r * Math.cos(Math.PI * 2 / 360 * angle)
    ctx.fillStyle = 'rgb(247, 244, 237)'
    ctx.shadowColor = 'rgb(247, 244, 237, 0.75)'
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 8 * rem
    ctx.beginPath()
    ctx.arc(x, y, 8 * rem, Math.PI * 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    timeEle = setTimeout(() => drawLine(ctx, el, angle + 1), 10)
  }
  return(<div className={style.mask}>
    <div className={style.content}>
      <canvas ref={loading} width={500} height={300}></canvas>
      <div className={style.content_text}>
        <div className={style.content_col}>琅</div>
        <span></span>
        <div className={style.content_col}>寰</div>
        <span></span>
        <div className={style.content_col}>科</div>
        <span></span>
        <div className={style.content_col}>技</div>
      </div>
    </div>
  </div>)
}

export default Loading