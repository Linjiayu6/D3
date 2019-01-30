
import React, { Component } from 'react'
import * as d3 from 'd3'

import origindata from './data/lineChartSingleData'

const margin = { top: 10, right: 20, bottom: 20, left: 30 }
const width = 500
const height = 300

class lineChartSingle extends Component {

  componentDidMount () {
    // 1. set up svg
    this.svg = d3.select('div', '#lineChart')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('border', '1px solid #ccc')

    this.defineScale()
    this.renderAxis()
    this.renderLines()
  }

  defineScale () {
    // 2. define scales
    this.xScale = d3.scaleLinear()
                    .domain([0, d3.max(origindata, d => d.x)])
                    .range([margin.left, width - margin.right])

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(origindata, d => d.y)])
                    .range([height - margin.bottom, margin.top])

  }

  renderAxis () {
    /**
     * x 轴
     * <g transform="translate(${margin.left}, 0)" ref={g => d3.select(g).call(d3.axisLeft(this.yScale))} />
     */
    const xAxis = d3.axisBottom(this.xScale)
    this.svg.append("g")
            .classed("xAxis", true)
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis)

    // y 轴
    const yAxis = d3.axisLeft(this.yScale)
    this.svg.append("g")
            .classed("yAxis", true)
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(yAxis)
  }

  renderLines () {
    /**
     * <path 
        fill="none" 
        stroke="#33C7FF" 
        stroke-width="2" 
        d={d3.line().x(d => this.xScale(d.x)).y(d => this.yScale(d.y))(origindata)} />
     */
    const defineLine = d3.line().x(({ x }) => this.xScale(x))
                              .y(({ y }) => this.yScale(y))
    this.svg.append('path')
            .attr('d', defineLine(origindata))
            .attr('fill', 'none')
            .attr('stroke', '#fb9a99')
            .attr('stroke-width', '2')
            .classed('path-line', true)
  }

  /**
   * 结构相当于:
   * return htm`
      <svg width=${width} height=${height}>
        <path 
          fill="none" 
          stroke="#33C7FF" 
          stroke-width="2" 
          d=${d3.line().x(d => x(d.x)).y(d => y(d.y))(data)} />
        <g 
          transform="translate(${margin.left},0)" 
          ref=${g => d3.select(g).call(d3.axisLeft(y))} />
        <g 
          transform="translate(0,${height - margin.bottom})" 
          ref=${g => d3.select(g).call(d3.axisBottom(x))} />
      </svg>
    `;
   */

  render () {
    return (
      <div id="lineChart"></div>
    )
  }
}

export default lineChartSingle
