
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

/**
 * 2. 格式化数据
 * date转为: 2000 => Sat Jan 01 2000 00:00:00 GMT+0800 (China Standard Time) {}
 * price string 转为 number类型
 */
const parseDate = d3.timeParse("%Y")
const data = []
multidata.forEach(({ name, values }) => {
  data.push({
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
const xScale = d3.scaleTime()
                 .domain(d3.extent(data[0].values, ({ date }) => date ))
                 .range([0, width - margin])

const yScale = d3.scaleLinear()
                 .domain([0, d3.max(data[0].values, ({ price }) => price)])
                 .range([height - margin, 0])

class Multi extends Component {
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

  // 处理 鼠标浮动在线上 的动效
  handleLines = function (d, action, that) {
    if (action === 'mouseover') {
      d3.selectAll('.line-group')
        .style('opacity', 0.3)
        .append('text')
        .attr('class', 'lineName')
        
        .attr('x', margin)
        .attr('y', margin)
        .text(d.name)

      d3.selectAll('.circle-group')
        .style('opacity', 0.3)
      d3.select(that)
        .attr('style', 'opacity: 1; stroke-width: 4px; cursor: pointer; fill: none;')
    }
    if (action === 'mouseout') {
      d3.selectAll('.line-group')
        .style('opacity', 1)
      d3.selectAll('.lineName').remove()
      d3.selectAll('.circle-group')
        .style('opacity', 1)
      d3.select(that)
        .attr('style', lineStyle)
    }
  }

  // 处理 鼠标浮动在远点时候的 动效
  handleCircles = function (d, content, action, that) {
    if (content === 'text') {
      // 鼠标浮动上去, 显示当前数据
      if (action === 'mouseover') {
        d3.select(that)
          .append('text')
          .text(d.price)
          .attr('x', d => xScale(d.date) - 5)
          .attr('y', d => yScale(d.price) - 15)
      }
      if (action === 'mouseout') {
        d3.select(that)
          .transition() // 动效不是马上消失
          .duration(200)
          .selectAll('text').remove()
      }
    }
  
    if (content === 'circle') {
      if (action === 'mouseover') {
        d3.select(that)
          .attr('r', '6')
      }
      if (action === 'mouseout') {
        d3.select(that)
          .transition() // 动效不是马上消失
          .duration(200)
          .attr('r', '3')
      }
    }
  }

  renderAxis () {
    /**
     * 5. 画 xAxis, yAxis
     */
    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).ticks(10)

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
    const { handleLines, handleCircles } = this
    const line= d3.line()
                   .x(d => xScale(d.date))
                   .y(d => yScale(d.price))

    // 定义画线区域
    const drawLine = this.svg.append('g')
                             .attr('id', 'lines')

    // 单纯画线
    drawLine.selectAll('.line-group')
            .data(data).enter()
            .append('g')
            .attr('class', d => `line-group ${d.name}`) // <g class="line-group"></g>

            .append('path') // <g class="line-group"><path></path></g>
            .attr('d', d => line(d.values)) // <g class="line-group"><path d="...."></path></g>
            .attr('style', lineStyle) // 必须要有
            .attr('stroke', (d, i) => color(i))
            .on('mouseover', function (d, i) { handleLines(d, 'mouseover', this)})
            .on('mouseout', function (d, i) { handleLines(d, 'mouseout', this)})

    // 数据点 每个画圆圈
    drawLine.selectAll('.circle-group') // 选择下面所有circle-group
            .data(data).enter() // 所有数据绑定数据
            .append('g') // 添加足够数量的元素
            .style("fill", (d, i) => color(i))
            .attr('class', d => `circle-group ${d.name}`) // <g class="circle-group Maxico"></g>

            // 相当于一个循环: 单个item的所有点
            /**
             * 显示mouseover浮动值
             * 1. .on('click', function (d) { console.log(this) } )
             * 这里的this是 <circle class="circle 221" cx="666.514598540146" cy="45.64315352697099" r="3"></circle>
             * 2. .on('click', (d) => console.log(this) )
             * 箭头函数是 react里面的作用域, 作用域不一致
             */
            .selectAll('circle') // 选择所有点
            .data(d => d.values).enter() // 选择当前数据中的values
            .append('g')
            .on('mouseover', function (d) { handleCircles(d, 'text', 'mouseover', this) } )
            .on('mouseout', function (d) { handleCircles(d, 'text', 'mouseout', this) } )
            
            .append('circle') // 创建circle标签
            .attr("class", d => `circle ${d.price}`) // 属性挂在
            .attr('cx', d => xScale(d.date))
            .attr('cy', d => yScale(d.price))
            .attr('r', 3)
            .on('mouseover', function (d) { handleCircles(d, 'circle', 'mouseover', this) } )
            .on('mouseout', function (d) { handleCircles(d, 'circle', 'mouseout', this) } )
  }

  render () {
    return (
      <div>
        <div id="multiChart"></div>
      </div>
    )
  }
}

export default Multi
