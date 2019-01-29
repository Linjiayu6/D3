
import React, { Component } from 'react';
import * as d3 from "d3";

/**
 * 1. 图表
 * http://wiki.jikexueyuan.com/project/d3wiki/makechart.html
 */

class Rect extends Component {
  componentDidMount () {
    const rectHeight = 40   //每个矩形所占的像素高度(包括空白)
    // 画 画布
    const svg = d3.select('div', '#rect')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height', 500)
    // 画 矩形
    // 有数据，而没有足够图形元素的时候，使用此方法可以添加足够的元素
    svg.selectAll('rect') // 选择svg内所有的矩形
       .data([150, 50, 20]) // 绑定数据
       .enter() // 指定选择集的enter部分
       .append('rect') // 添加足够数量的矩形元素
       .attr('x', (d, i) => 30)
       .attr('y', (d, i) => i * rectHeight)
       .attr('width', d => d) // 长度是数据长度
       .attr('height', rectHeight - 10)
       .attr('fill', 'pink')
  }

  render() {
    return (
      <div id="rect"></div>
    );
  }
}

export default Rect;
