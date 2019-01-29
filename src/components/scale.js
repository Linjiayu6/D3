
import React, { Component } from 'react'
import * as d3 from 'd3'

/**
 * 2. 比例尺
 * http://wiki.jikexueyuan.com/project/d3wiki/scale.html
 * 比例尺 上一章制作了一个柱形图，当时有一个数组: [150, 50, 20]
 * 背景: 绘图不友好，直接使用 250 给矩形的宽度赋值，即矩形的宽度就是 250 个像素
 * 解决: 将某一区域的值映射到另一区域，其大小关系不变
 */

class Scale extends Component {
  componentDidMount () {
    // --------- 线性比例尺 ---------
    /**
     * 线性比例尺
     * 将 dataset 中最小的值，映射成 0；将最大的值，映射成 500
     */
    const dataset = [1.2, 5.5, 1.4, 1.6, 0.5, 4]
    const min = d3.min(dataset) // 0.5 
    const max = d3.max(dataset) // 5.5
    const linear = d3.scaleLinear()
                  .domain([min, max]) // 定义域
                  .range([50, 500]) // 值域          
    // console.log(linear(5.5)) // 500
    console.log('线性比例尺', linear(4)) // 350
    // --------- END 线性比例尺 END ---------

    // --------- 序数比例尺 ---------
    /**
     * 我们希望 0 对应颜色 red，1 对应 blue，依次类推
     * 但是，这些值都是离散的，线性比例尺不适合，需要用到序数比例尺
     */
    const index = [1, 2, 3, 4, 5]
    const color = ['red', 'blue', 'green', 'yellow', 'black']
    const ordinal = d3.scaleOrdinal()
                      .domain(index)
                      .range(color)
    console.log('序数比例尺', ordinal(4)) // yellow
    // --------- END 序数比例尺 END ---------


    // --------- 线性比例尺图形 ---------
    var rectHeight = 30   // 每个矩形所占的像素高度(包括空白)
    // 画 画布
    const svg = d3.select('div', '#rect')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 30)
      .attr('y', (d, i) => i * rectHeight)
      .attr('width', (d) => linear(d)) // 比例尺使用
      .attr('height', rectHeight - 5)
      .attr("fill","steelblue")
  }

  render() {
    return (
      <div id="scale"></div>
    );
  }
}

export default Scale;
