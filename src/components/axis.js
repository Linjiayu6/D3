
import React, { Component } from 'react';
import * as d3 from "d3";

/**
 * 3. 坐标轴
 * http://wiki.jikexueyuan.com/project/d3wiki/makechart.html
 */

class Axis extends Component {
  componentDidMount () {
    // --------- 1. 线性比例尺 ---------
    /**
     * 线性比例尺
     * 将 dataset 中最小的值，映射成 0；将最大的值，映射成 500
     */
    const dataset = [2.5 , 2.1 , 1.7 , 1.3 , 0.9]
    const linear = d3.scaleLinear()
                  .domain([0, d3.max(dataset)]) // 定义域
                  .range([0, 250]) // 值域

    // --------- 2. 刻度 ---------
    const axis = d3.axisBottom(linear) // 指定比例尺
                   .ticks(5) // 指定刻度的数量

    const rectHeight = 30 // 每个矩形所占的像素高度(包括空白)
    // 画 画布
    const svg = d3.select('div', '#axis')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height', 500)

    const distantX = 20

    // 画 矩阵
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', distantX)
      .attr('y', (d, i) => i * rectHeight)
      .attr('width', (d) => linear(d)) // 比例尺使用
      .attr('height', rectHeight - 5)
      .attr("fill","steelblue")

    // 刻度 - 坐标轴的位置，可以通过 transform 属性来设定
    // svg.append('g').call(axis)
    svg.append("g")
       .attr("transform",`translate(${distantX}, 160)`)
       .call(axis)
  }

  render() {
    return (
      <div id="axis"></div>
    );
  }
}

export default Axis;
