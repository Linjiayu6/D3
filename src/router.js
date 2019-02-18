import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import lineSingle from './components/line/single'
import lineMulti from './components/line/multi'
import lineMulti2 from './components/line/multi2'
import bar from './components/bar/multi'
// import pieChart from './components/chart/pieChart'

const routeList = [
  {
    path: '/',
    desc: 'Home',
    component: <div>Home</div>
  },
  {
    path: '/D3/line/single',
    desc: '[Line Chart] Single',
    component: lineSingle
  },
  {
    path: '/D3/line/multi',
    desc: '[Line Chart] Multi',
    component: lineMulti
  },
  {
    path: '/D3/line/multi2',
    desc: '[Line Chart] Multi2',
    component: lineMulti2
  },
  {
    path: '/D3/bar/multi',
    desc: '[Bar Chart] bar',
    component: bar
  }
]

export default () => (
  // https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <ul>
        {
          routeList.map(({ path, desc }, key) => (
            <li key={key}><Link to={path}>{desc}</Link></li>
          ))
        }
      </ul>

      <hr />
      <Route exact path="/" component={() => <div>Home</div>} />
      <Route path="/D3/line/single" component={lineSingle} />
      <Route path="/D3/line/multi" component={lineMulti} />
      <Route path="/D3/line/multi2" component={lineMulti2} />
      <Route path="/D3/bar/multi" component={bar} />
    </div>
  </Router>
)
