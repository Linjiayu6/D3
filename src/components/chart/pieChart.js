
import React, { Component } from 'react'
import * as d3 from 'd3'

const originData = [12, 4, 1, 10]
const width = 500
const height = 500
const color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])  

class PieChart extends Component {

  componentDidMount () {
    this.renderSvg()
    this.renderPie()
  }

  renderSvg () {
    this.svg = d3.select('div', '#pieChart')
                 .append('svg')
                 .attr('width', width)
                 .attr('height', height)
                 .attr("text-anchor", "middle")
                 .style('border', '1px solid #ccc')
  }

  renderPie () {
    // generate the pie
    this.pie = d3.pie()
    
    // input data to the model, 放入数据, 计算模型位置
    const modelData = this.pie(originData).sort()
    console.log('模型数据是', modelData)
    /**
     * [{
     *  data: 2
        endAngle: 6.283185307179586
        index: 3
        padAngle: 0
        startAngle: 5.759586531581287
        value: 2
     * }]
     */

    /**
     * generate the arcs
     * If the inner radius is 0, the result will be a piechart, 
     *        otherwise the result will be a donut chart.
     * .innerRadius(0) 是pie
     * .innerRadius(100) 是donut
     */
    const arcs = d3.arc()
                  .innerRadius(0)
                  .outerRadius(250)

    // label arcs
    const labelArcs = d3.arc()
                        .innerRadius(150)
                        .outerRadius(250)

    // generate the group
    const g = this.svg.append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    const groupArcs = g.selectAll('arc')
                        .data(modelData)
                        .enter()
                        .append('g')
                        .attr('class', 'arc')

     // draw arc paths
     groupArcs.append('path')
              .attr('fill', (d, i) => color(i))
              .attr('d', arcs)
  }

  render () {
    return (
      <div id="pieChart"></div>
    )
  }
}

export default PieChart
