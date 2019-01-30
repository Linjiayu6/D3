## Manipulate DOM
https://www.tutorialsteacher.com/d3js/dom-manipulation-using-d3js

- text('content')
- append('element name') // insert
- insert('element name') // Inserts a new element
- remove()
- html("content")
- attr("name", "value") // attribute
- property("name", "value")
- style("name", "value")
- classed("css class", bool)

## Function of Data
https://www.tutorialsteacher.com/d3js/function-of-data-in-d3js

## Data binding
- 绑定数据 data() d3.select('p').data(originData).text((d) => { ... })
  但是data只能绑定一个, 如果是很多数据就需要加入 enter()
- enter():
  The enter() method dynamically creates placeholder references corresponding to the number of data values
- exit()
- datum(): The datum() function is used for static visualization which does not need updates. It binds data directly to an element.

## SVG ELEMENT
https://www.tutorialsteacher.com/d3js/create-svg-elements-in-d3js

- Line  svg.append("line")
- Rectangle svg.append("rect")
  `<rect x="0" y="0" width="200" height="200"></rect>`
- Circle svg.append("circle")
- Ellipse svg.append("ellipse")
- Text svg.append("text")
- 
  