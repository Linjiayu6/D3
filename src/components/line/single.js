import React, { Component } from 'react'
import * as d3 from 'd3'

import data from './data/linedata.js'

const width = 800,
      height = 500,
      margin = 50,
      xAxisWidth = width - 2 * margin,
      yAxisHeight = height - margin

const pathStyle = {
  stroke: 'steelblue',
  strokeWidth: '2px',
  fill: 'none'
}
/**
 * g: 组合所有对象 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g
 */
class Single extends Component {

  componentWillMount () {
    // 确定 x轴 数值区间
    this.xScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.x)])
                .range([margin, xAxisWidth]) // 在绘图中值域
    // 确定 y轴 数据区间
    this.yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.y)]) // domain: [0, max] of y
                     .range([yAxisHeight, margin]) // y轴是从最大的开始

    // 确定 当前line线
    this.line = d3.line()
                  .x(d => this.xScale(d.x))
                  .y(d => this.yScale(d.y))
                  .curve(d3.curveCatmullRom.alpha(0.6))
  }

  renderXAxis () {
    if (!this.xScale) return null
    /**
     * 1. xTicks 画刻度
     *    ticks 指定刻度的数量 10个
     *    xScale.ticks(10): 返回值 [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
     *    xScale(d): 每个刻度在svg图中的位置
     * 2. line 画一条直线
     */
    const xTicks = this.xScale.ticks(10).map((d, key) => (
      <g key={key} transform={`translate(${this.xScale(d)}, ${height - margin})`}>  
        <text x='-5' y='20'>{d}</text>
        {/* line: 每个坐标点 上面的指示标志 */}
        <line style={{ stroke: '#aaa'}} x1='0' x2='0' y1='0' y2='5' transform="translate(0, 0)" />
      </g>
    ))
    return (
      <g id="xAxis">
        {xTicks}
        <line style={{ stroke: '#aaa'}} x1={margin} x2={xAxisWidth} y1={height - margin} y2={height - margin} />
      </g>
    )
  }

  renderYAxis () {
    if (!this.yScale) return null
    const yTicks = this.yScale.ticks(6).map((d, key) => (
      <g key={key} transform={`translate(${margin}, ${this.yScale(d)})`}>
        <text x='-20' y='5'>{d}</text>
        <line style={{ stroke: '#aaa'}} x1='0' x2='5' y1='0' y2='0' transform="translate(0, 0)" />
      </g>
    ))
    return (
      <g id="yAxis">
        {yTicks}
        <line style={{ stroke: '#aaa'}} x1={margin} x2={margin} y1={margin} y2={height - margin} />
      </g>
    )
  }

  render () {
    return (
      <div style={{ margin: '20px' }}>
        <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
          {this.renderXAxis()}
          {this.renderYAxis()}
          {this.line && <path d={this.line(data)} style={pathStyle} />}
        </svg>
      </div>
    )
  }
}

export default Single
