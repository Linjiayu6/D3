import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import lineSingle from './components/line/single'
import lineMulti from './components/line/multi'
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
      {/* {
        routeList.map(({ path, component }) => (
          <Route path={path} component={component()} />
        ))
      } */}

      <Route exact path="/" component={() => <div>Home</div>} />
      <Route path="/line/single" component={lineSingle} />
      <Route path="/line/multi" component={lineMulti} />
    </div>
  </Router>
)
