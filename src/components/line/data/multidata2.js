
import * as d3 from 'd3'

export default async () => {
  const data = await d3.csv( 'https://gist.githubusercontent.com/greenafrican/c836adcb2e4827e86b3a9ac4754a7255/raw/be5c88d28cda07e1bca7f1ba5ed0c21156605d1a/population.csv', (d, i, columns) => {
    for (let i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]]
    return d
  })
  return data
}
