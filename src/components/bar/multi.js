
// import React, { Component } from 'react'
// import * as d3 from 'd3'
// import keys from 'ramda/src/keys'
// import remove from 'ramda/src/remove'
// import flatten from 'ramda/src/flatten'

// import multidata from '../line/data/multidata2'

// let data = [],
//     lineData = [],
//     xScale = null,
//     yScale = null,
//     selectedY = -1

// /**
//  * 1. 定义各种大小
//  */
// const margin = 60,
//       height = 400,
//       width = 600,
//       svgWidth = width + margin,
//       svgHeight = height + margin

// const parseDate = d3.timeParse("%Y-%m-%d")
// const color = d3.scaleOrdinal(d3.schemeCategory10)
// const lineStyle = 'opacity: 0.3; stroke-width: 3; cursor: none; fill: none;'


// // tooltip
// const renderToolTip = () => {
//   const tooltip = d3.select('#container' )
//                     .append('div')
//                     .attr('class', 'tooltip')
//   const selectedYkeys = keys(data[selectedY]) || []
//   const html = selectedYkeys.map((item) => {
//     return `<span>${item}: ${data[selectedY][item]}</span>`
//   })
//   tooltip.html(`<div>${html}</div>`)
// }

// // 1. handle data
// const onData = nextData => {
//   console.log(nextData)
//   // 去掉date后的key值, ["Polo", "T-Shirt", "Hoodie", "Sunglasses", "Cap"]
//   const keysByTotals = remove(0, 1, keys(nextData[0]))
//   /**
//    * [{
//    *   key: 'Cap',
//    *   values: [{ date: "2018-05-30", value: 10604510 }]
//    * }]
//    */
//   lineData = keysByTotals.map(key => {
//     return {
//       key,
//       values: nextData.map((item) => ({ date: parseDate(item.date), value: item[key] }))
//     }
//   })
// }

//   // 2. handle scale
// const onScale = lineData => {
//   // 所有value值
//   const allValues = flatten(
//     lineData.map(({ values }) =>
//       values.map(({ value }) => value)
//     )
//   )
//   xScale = d3.scaleTime()
//               .domain(d3.extent(lineData[0].values, ({ date }) => date ))
//               .range([0, width - margin])

//   yScale = d3.scaleLinear()
//               .domain([0, d3.max(allValues, d => d )])
//               .range([height - margin, 0])
// }

// class BarMulti extends Component {

//   componentDidMount () {
//     multidata().then(d => {
//       data = d
//       onData(data)
//       onScale(lineData)

//       this.renderSvg()
//       this.renderAxis({ xScale, yScale })
//       this.renderBar({ lineData, xScale, yScale })
//       this.renderFocusLine({ lineData, xScale })
//     })
//   }

//   // 3. draw svg
//   renderSvg () {
//     this.svg = d3.select('#multiChart2')
//                  .append('svg')
//                  .attr('width', svgWidth)
//                  .attr('height', svgHeight)
//                  .attr('style', 'border: 1px solid rgb(204, 204, 204);')
//                  .append('g')
//                  .attr('id', 'chart')
//                  .attr('transform', `translate(${margin}, ${margin})`)

//     document.getElementById('chart').addEventListener('mouseover', e => {
//       this.setState({ mouseOverHover: e.clientX - margin})
//     })
//   }

//   // 4. renderAxis & renderGrid
//   renderAxis ({ xScale, yScale }) {
//     const xAxis = d3.axisBottom(xScale)
//                     .ticks(5)
//                     // .tickFormat('') // 下面没有值

//     /**
//      * axisLeft: 数字向左
//      * axisRight: 数字向右
//      */
//     // const yAxis = d3.axisLeft(yScale)
//     //                 .ticks(5)
//     const yAxis = d3.axisRight(yScale)
//                     .ticks(5)
//                     .tickSize(svgWidth - 2 * margin) // grid样式
//                     .tickFormat(d => `${d / 1000}W`) // x轴说明
//                     .tickPadding(5) // 线与文字说明距离

//     this.svg.append('g')
//             .attr('id', 'xAxis')
//             .attr('transform', `translate(0, ${svgHeight - 2 * margin})`)
//             .call(xAxis)
//             .style('stroke-opacity', 0.2)

//     this.svg.append('g')
//             .attr('id', 'yAxis')
//             .attr('transform', `translate(0, 0)`)
//             .call(yAxis)

//             .call(
//               g => {
//                 g.selectAll('text') // 删除y轴上面的各种text说明
//                  .attr('x', - margin + 10) // 本来y轴text说明是在右边的, 这里操作了方向
//                 g.select('.domain').remove() // 删除y轴上面的各种竖线
//                 g.select('.tick').remove() // y轴 最下面虚线删除, 因为是虚线
//               }
//             ) // 删除: y轴的 竖坐标
//             .style('stroke', '#eee') // y轴虚线及颜色定义
//             .style('stroke-dasharray', ("3, 3"))
//             .style('stroke-opacity', 0.1)
//   }

//   // 5. renderLines
//   renderBar ({ lineData, xScale, yScale }) {
//     const line = d3.line()
//                   .x(d => xScale(d.date))
//                   .y(d => yScale(d.value))
//     // 定义画线
//     const drawLine = this.svg.append('g')
//                              .attr('id', 'line')
//     // 画 直线
//     drawLine.selectAll('.line-group')
//             .data(lineData).enter()
//             .append('g')
//             .attr('class', d => `line-group ${d.key}`)

//             .append('path')
//             .attr('d', d => line(d.values)) // M0,178.7884815045674L128,194.11823082820422L256,212.64948592627098L384,214.18797851102974L512,219.75877056082743L640,223.30984835697265
//             .attr('style', lineStyle) // 必须要有
//             .attr('stroke', (d, i) => color(i))
//             .attr('stroke-width', 1)

//     // 画 直线上的点
//     // drawLine.selectAll('.circle-group')
//     //         .data(lineData).enter()
//     //         .append('g')
//     //         .attr('class', 'circle-group')
//     //         .attr('fill', (d, i) => color(i))

//     //         .selectAll('.circle-item')
//     //         .data(d => d.values).enter()
//     //         .append('g')

//     //         .append('circle')
//     //         .attr('class', (d, i) => `circle-item${i}`)
//     //         .attr('cx', d => xScale(new Date(d.date)))
//     //         .attr('cy', d => yScale(d.value))
//     //         .attr('r', 2)
//     //         .style('opacity', '0.5' ) // 点 周围有镂空
//     //         .attr('stroke', '#fff' ) // 点 周围有镂空
//   }

//   // 6. renderFocusLine
//   renderFocusLine ({ lineData, xScale }) {
//     /**
//      * 需要计算出来line线的 x1, y1, x2, y2 几个数
//      * eg: x轴对应的值 [0, 128, 256, 384, 512, 640]
//      */
//     const focusLineXAxis = lineData[0].values.map(({ date }) => xScale(date))
//     const focusLine = this.svg.append('g')
//                           .attr('id', 'focusline')
//                           .selectAll('.grid-group')
//                           .data(focusLineXAxis).enter()
//                           .append('g')
//                           .attr('class', 'grid-groups')

//     /**
//      * 思路: 先画好, 如果有事件发生时候，用css控制是否展示
//      * 
//      * 1. 会有一个问题是: mouseover好控制, 但是移开这个点, 就会消失?
//      *    解决: 类似垫片, 下面还有一层结构 'rect', 如果离开当前结构, 才会显示下个内容 
//      */
    
//     // 画线, 是所有线全部都画
//     // focusLine.append('line')
//     //           .attr('class', 'grid-item')
//     //           .attr('x1', d => d)
//     //           .attr('y1', 0)
//     //           .attr('x2', d => d)
//     //           .attr('y2', height - margin)
//     //           .attr('stroke', '#aaa')
//     //           .attr('stroke-width', 2)
//     //           .attr('opacity', '0')

//     focusLine.append('rect')
//               .attr('class', (d, i) => `rect-g${i}`)
//               .attr('x', (d, i) => d)
//               .attr('y', 0)
//               .attr('width', focusLineXAxis[1])
//               .attr('height', height - margin)
//               .attr('opacity', 0)
//               .on('mouseover', function(d, i, nodes) {
//                 selectedY = i
//                 d3.select(nodes[i].parentNode)
//                   .select('.grid-item')
//                   .attr('opacity', 1)

//                 d3.selectAll(`.circle-item${i}`)
//                   .attr('r', 4)

//                 d3.select(`.rect-g${i}`)
//                   .attr('opacity', 0.1)

//                 renderToolTip()
//               })
//               .on('mouseout', function(d, i, nodes) {
//                 selectedY = -1
//                 d3.select(nodes[i].parentNode)
//                   .select('.grid-item')
//                   .attr('opacity', 0)

//                 d3.selectAll(`.circle-item${i}`)
//                   .attr('r', 2)

//                 d3.select(`.rect-g${i}`)
//                   .attr('opacity', 0)
                
//                 d3.select('.tooltip').remove()
//               })
//   }

//   render () {
//     return (
//       <div id="container">
//         <div id="multiChart2"></div>
//       </div>
//     )
//   }
// }

// export default BarMulti
