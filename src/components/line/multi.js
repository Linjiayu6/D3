
import React, { Component } from 'react'
import * as d3 from 'd3'

import multidata from './data/multidata'

/**
 * 1. 定义视图大小
 */
const width = 800,
      height = 600,
      margin = 50,
      svgWidth = width + margin,
      svgHeight = height + margin
const color = d3.scaleOrdinal(d3.schemeCategory10)

const lineStyle = 'opacity: 0.3; stroke-width: 2px; cursor: none; fill: none;'

class Multi extends Component {

  constructor (props) {
    super(props)
    /**
     * 2. 格式化数据
     * date转为: 2000 => Sat Jan 01 2000 00:00:00 GMT+0800 (China Standard Time) {}
     * price string 转为 number类型
     */
    const parseDate = d3.timeParse("%Y")
    this.data = []
    multidata.forEach(({ name, values }) => {
      this.data.push({
        name,
        values: values.map(({ date, price}) => ({
          date: parseDate(date),
          price: +price
        }))
      })
    })

    /**
     * 3. Scale 定义坐标位置 by this.state.height || width
     * xScale, yScale
     *  - 定义数据大小范围;
     *  - 根据前端定义的画布大小, 计算当前数据的位置
     */
    this.xScale = d3.scaleTime()
                    .domain(d3.extent(this.data[0].values, ({ date }) => date ))
                    .range([0, width - margin])

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.data[0].values, ({ price }) => price)])
                    .range([height - margin, 0])
  }

  componentDidMount () {
    /**
     * 4. 画布定义
     */
    this.svg = d3.select('#multiChart').append('svg')
                 .attr('width', svgWidth)
                 .attr('height', svgHeight)
                 .attr('style', 'border: 1px solid rgb(204, 204, 204);')
                 .append('g')
                 .attr('id', 'chartcontainer')
                 .attr('transform', `translate(${margin}, ${margin})`)

    this.renderAxis()
    this.renderLines()
  }

  renderAxis () {
    /**
     * 5. 画 xAxis, yAxis
     */
    const xAxis = d3.axisBottom(this.xScale).ticks(10)
    const yAxis = d3.axisLeft(this.yScale).ticks(10)

    this.svg.append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${svgHeight - 2 * margin})`)
            .call(xAxis)

    this.svg.append('g')
            .attr('id', 'yAxis')
            .attr('transform', `translate(0, 0)`)
            .call(yAxis)
  }

  renderLines () {
    const line= d3.line()
                   .x(d => this.xScale(d.date))
                   .y(d => this.yScale(d.price))
    // 定义画线区域
    const drawLine = this.svg.append('g')
                             .attr('id', 'lines')

    // 单纯画线
    drawLine.selectAll('.line-group')
            .data(this.data).enter()
            .append('g')
            .attr('class', d => `line-group ${d.name}`) // <g class="line-group"></g>
            .append('path') // <g class="line-group"><path></path></g>
            .attr('d', d => line(d.values)) // <g class="line-group"><path d="...."></path></g>
            .attr('style', lineStyle) // 必须要有
            .attr('stroke', (d, i) => color(i))

    // 数据点画圆圈
    drawLine.selectAll('.circle-group')
            .data(this.data).enter() // 需要对当前数据进行操作
            .append('g')
            .style("fill", (d, i) => color(i))
            .attr('class', d => `circle-group ${d.name}`) // <g class="circle-group Maxico"></g>

            // 单个item的所有点
            .selectAll('circle') // 选择所有点
            .data(d => d.values).enter() // 数据进入
            .append('circle') // 创建circle标签
            .attr("class", d => `circle ${d.price}`) // 属性挂在
            .attr('cx', d => this.xScale(d.date))
            .attr('cy', d => this.yScale(d.price))
            .attr('r', 3)
  }

  render () {
    return (
      <div id="multiChart"></div>
    )
  }
}

export default Multi
