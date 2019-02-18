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
    path: '/line/single',
    desc: '[Line Chart] Single',
    component: lineSingle
  },
  {
    path: '/line/multi',
    desc: '[Line Chart] Multi',
    component: lineMulti
  },
  {
    path: '/line/multi2',
    desc: '[Line Chart] Multi2',
    component: lineMulti2
  },
  {
    path: '/bar/multi',
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
      <Route path="/line/single" component={lineSingle} />
      <Route path="/line/multi" component={lineMulti} />
      <Route path="/line/multi2" component={lineMulti2} />
      <Route path="/bar/multi" component={bar} />
    </div>
  </Router>
)
