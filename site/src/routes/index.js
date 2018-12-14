import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import MainLayout from "MainLayout";

import NotFound from "pages/NotFound";
// import QuickStart from "pages/Markdowns/QuickStart.md";
// import ChartBar from "pages/Markdowns/ChartBar.md";
// import ChartLine from "pages/Markdowns/ChartLine.md";
// import ChartPie from "pages/Markdowns/ChartPie.md";
// import ChartRelation from "pages/Markdowns/ChartRelation.md";
// import ChartLineBar from "pages/Markdowns/ChartLineBar.md";
// import ChartRadar from "pages/Markdowns/ChartRadar.md";
// import ChartTagCloud from "pages/Markdowns/ChartTagCloud.md";

import Home from "pages/Home";
import QuickStart from "pages/QuickStart";
import ChartBar from "pages/ChartBar";
import ChartLine from "pages/ChartLine";
import ChartPie from "pages/ChartPie";
import ChartRelation from "pages/ChartRelation";
import ChartLineBar from "pages/ChartLineBar";
import ChartRadar from "pages/ChartRadar";
import ChartTagCloud from "pages/ChartTagCloud";
import ApiDoc from "pages/ApiDoc";


const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/quickStart" component={MainLayout}>
      <IndexRoute component={QuickStart} />
      <Route path="/quickStart" component={QuickStart} />
      <Route path="/chart-bar" component={ChartBar} />
      <Route path="/chart-line" component={ChartLine} />
      <Route path="/chart-pie" component={ChartPie} />
      <Route path="/chart-relation" component={ChartRelation} />
      <Route path="/chart-linebar" component={ChartLineBar} />
      <Route path="/chart-radar" component={ChartRadar} />
      <Route path="/chart-tagcloud" component={ChartTagCloud} />
      <Route path="/doc" component={ApiDoc} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
