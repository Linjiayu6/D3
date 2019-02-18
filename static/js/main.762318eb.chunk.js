(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(t,e,n){t.exports=n(41)},41:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(18),i=n.n(c),o=n(5),l=n(6),u=n(8),s=n(7),p=n(9),d=n(45),m=n(43),f=n(44),h=n(1),v=[{x:1,y:3},{x:2,y:6},{x:3,y:2},{x:4,y:12},{x:5,y:8}],y={stroke:"steelblue",strokeWidth:"2px",fill:"none"},g=function(t){function e(){return Object(o.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentWillMount",value:function(){var t=this;this.xScale=h.i().domain([0,h.h(v,function(t){return t.x})]).range([50,700]),this.yScale=h.i().domain([0,h.h(v,function(t){return t.y})]).range([450,50]),this.line=h.g().x(function(e){return t.xScale(e.x)}).y(function(e){return t.yScale(e.y)}).curve(h.e.alpha(.6))}},{key:"renderXAxis",value:function(){var t=this;if(!this.xScale)return null;var e=this.xScale.ticks(10).map(function(e,n){return r.a.createElement("g",{key:n,transform:"translate(".concat(t.xScale(e),", ").concat(450,")")},r.a.createElement("text",{x:"-5",y:"20"},e),r.a.createElement("line",{style:{stroke:"#aaa"},x1:"0",x2:"0",y1:"0",y2:"5",transform:"translate(0, 0)"}))});return r.a.createElement("g",{id:"xAxis"},e,r.a.createElement("line",{style:{stroke:"#aaa"},x1:50,x2:700,y1:450,y2:450}))}},{key:"renderYAxis",value:function(){var t=this;if(!this.yScale)return null;var e=this.yScale.ticks(6).map(function(e,n){return r.a.createElement("g",{key:n,transform:"translate(".concat(50,", ").concat(t.yScale(e),")")},r.a.createElement("text",{x:"-20",y:"5"},e),r.a.createElement("line",{style:{stroke:"#aaa"},x1:"0",x2:"5",y1:"0",y2:"0",transform:"translate(0, 0)"}))});return r.a.createElement("g",{id:"yAxis"},e,r.a.createElement("line",{style:{stroke:"#aaa"},x1:50,x2:50,y1:50,y2:450}))}},{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"20px"}},r.a.createElement("svg",{width:800,height:500,style:{border:"1px solid #ccc"}},this.renderXAxis(),this.renderYAxis(),this.line&&r.a.createElement("path",{d:this.line(v),style:y})))}}]),e}(a.Component),x=50,k=500+x,b=300+x,E=h.j(h.l),j="opacity: 0.3; stroke-width: 2px; cursor: none; fill: none;",O=h.o("%Y"),A=[];[{name:"USA",values:[{date:"2000",price:"100"},{date:"2001",price:"110"},{date:"2002",price:"145"},{date:"2003",price:"141"},{date:"2004",price:"101"},{date:"2005",price:"90"},{date:"2006",price:"110"},{date:"2007",price:"135"},{date:"2008",price:"211"},{date:"2009",price:"201"},{date:"2010",price:"202"}]},{name:"Canada",values:[{date:"2000",price:"200"},{date:"2001",price:"120"},{date:"2002",price:"131"},{date:"2003",price:"221"},{date:"2004",price:"151"},{date:"2005",price:"190"},{date:"2006",price:"120"},{date:"2007",price:"185"},{date:"2008",price:"221"},{date:"2009",price:"101"},{date:"2010",price:"120"}]}].forEach(function(t){var e=t.name,n=t.values;A.push({name:e,values:n.map(function(t){var e=t.date,n=t.price;return{date:O(e),price:+n}})})});var S=h.k().domain(h.f(A[0].values,function(t){return t.date})).range([0,500-x]),w=h.i().domain([0,h.h(A[0].values,function(t){return t.price})]).range([300-x,0]),C=function(t){function e(){var t,n;Object(o.a)(this,e);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(u.a)(this,(t=Object(s.a)(e)).call.apply(t,[this].concat(r)))).handleLines=function(t,e,n){"mouseover"===e&&(h.n(".line-group").style("opacity",.3).append("text").attr("class","lineName").attr("x",x).attr("y",x).text(t.name),h.n(".circle-group").style("opacity",.3),h.m(n).attr("style","opacity: 1; stroke-width: 4px; cursor: pointer; fill: none;")),"mouseout"===e&&(h.n(".line-group").style("opacity",1),h.n(".lineName").remove(),h.n(".circle-group").style("opacity",1),h.m(n).attr("style",j))},n.handleCircles=function(t,e,n,a){"text"===e&&("mouseover"===n&&h.m(a).append("text").text(t.price).attr("x",function(t){return S(t.date)-5}).attr("y",function(t){return w(t.price)-15}),"mouseout"===n&&h.m(a).transition().duration(200).selectAll("text").remove()),"circle"===e&&("mouseover"===n&&h.m(a).attr("r","6"),"mouseout"===n&&h.m(a).transition().duration(200).attr("r","3"))},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.svg=h.m("#multiChart").append("svg").attr("width",k).attr("height",b).attr("style","border: 1px solid rgb(204, 204, 204);").append("g").attr("id","chartcontainer").attr("transform","translate(".concat(x,", ").concat(x,")")),this.renderAxis(),this.renderLines()}},{key:"renderAxis",value:function(){var t=h.a(S).ticks(6),e=h.b(w).ticks(6);this.svg.append("g").attr("id","xAxis").attr("transform","translate(0, ".concat(b-2*x,")")).call(t),this.svg.append("g").attr("id","yAxis").attr("transform","translate(0, 0)").call(e)}},{key:"renderLines",value:function(){var t=this.handleLines,e=this.handleCircles,n=h.g().x(function(t){return S(t.date)}).y(function(t){return w(t.price)}),a=this.svg.append("g").attr("id","lines");a.selectAll(".line-group").data(A).enter().append("g").attr("class",function(t){return"line-group ".concat(t.name)}).append("path").attr("d",function(t){return n(t.values)}).attr("style",j).attr("stroke",function(t,e){return E(e)}).on("mouseover",function(e,n){t(e,"mouseover",this)}).on("mouseout",function(e,n){t(e,"mouseout",this)}),a.selectAll(".circle-group").data(A).enter().append("g").style("fill",function(t,e){return E(e)}).attr("class",function(t){return"circle-group ".concat(t.name)}).selectAll("circle").data(function(t){return t.values}).enter().append("g").on("mouseover",function(t){e(t,"text","mouseover",this)}).on("mouseout",function(t){e(t,"text","mouseout",this)}).append("circle").attr("class",function(t){return"circle ".concat(t.price)}).attr("cx",function(t){return S(t.date)}).attr("cy",function(t){return w(t.price)}).attr("r",3).on("mouseover",function(t){e(t,"circle","mouseover",this)}).on("mouseout",function(t){e(t,"circle","mouseout",this)})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{id:"multiChart"}))}}]),e}(a.Component),L=n(15),D=n.n(L),M=n(20),H=n.n(M),N=n(21),W=n.n(N),Y=n(14),B=n.n(Y),F=n(19),X=Object(F.a)(B.a.mark(function t(){var e;return B.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.d("https://gist.githubusercontent.com/greenafrican/c836adcb2e4827e86b3a9ac4754a7255/raw/be5c88d28cda07e1bca7f1ba5ed0c21156605d1a/population.csv",function(t,e,n){for(var a=1,r=n.length;a<r;++a)t[n[a]]=+t[n[a]];return t});case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}},t,this)})),I=[],J=[],z=null,P=null,U=-1,q=window.innerWidth-120,G=q+60,K=h.o("%Y-%m-%d"),Q=h.j(h.l),R=function(t){function e(){return Object(o.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;X().then(function(e){(function(t){console.log(t);var e=H()(0,1,D()(t[0]));J=e.map(function(e){return{key:e,values:t.map(function(t){return{date:K(t.date),value:t[e]}})}})})(I=e),function(t){var e=W()(t.map(function(t){return t.values.map(function(t){return t.value})}));z=h.k().domain(h.f(t[0].values,function(t){return t.date})).range([0,q-60]),P=h.i().domain([0,h.h(e,function(t){return t})]).range([340,0])}(J),t.renderSvg(),t.renderAxis({xScale:z,yScale:P}),t.renderLines({lineData:J,xScale:z,yScale:P}),t.renderFocusLine({lineData:J,xScale:z})})}},{key:"renderSvg",value:function(){var t=this;this.svg=h.m("#multiChart2").append("svg").attr("width",G).attr("height",460).attr("style","border: 1px solid rgb(204, 204, 204);").append("g").attr("id","chart").attr("transform","translate(".concat(60,", ").concat(60,")")),document.getElementById("chart").addEventListener("mouseover",function(e){t.setState({mouseOverHover:e.clientX-60})})}},{key:"renderAxis",value:function(t){var e=t.xScale,n=t.yScale,a=h.a(e).ticks(5),r=h.c(n).ticks(5).tickSize(G-120).tickFormat(function(t){return"".concat(t/1e3,"W")}).tickPadding(5);this.svg.append("g").attr("id","xAxis").attr("transform","translate(0, ".concat(340,")")).call(a).style("stroke-opacity",.2),this.svg.append("g").attr("id","yAxis").attr("transform","translate(0, 0)").call(r).call(function(t){t.selectAll("text").attr("x",-50),t.select(".domain").remove(),t.select(".tick").remove()}).style("stroke","#eee").style("stroke-dasharray","3, 3").style("stroke-opacity",.1)}},{key:"renderLines",value:function(t){var e=t.lineData,n=t.xScale,a=t.yScale,r=h.g().x(function(t){return n(t.date)}).y(function(t){return a(t.value)}),c=this.svg.append("g").attr("id","line");c.selectAll(".line-group").data(e).enter().append("g").attr("class",function(t){return"line-group ".concat(t.key)}).append("path").attr("d",function(t){return r(t.values)}).attr("style","opacity: 0.3; stroke-width: 3; cursor: none; fill: none;").attr("stroke",function(t,e){return Q(e)}).attr("stroke-width",1),c.selectAll(".circle-group").data(e).enter().append("g").attr("class","circle-group").attr("fill",function(t,e){return Q(e)}).selectAll(".circle-item").data(function(t){return t.values}).enter().append("g").append("circle").attr("class",function(t,e){return"circle-item".concat(e)}).attr("cx",function(t){return n(new Date(t.date))}).attr("cy",function(t){return a(t.value)}).attr("r",2).style("opacity","0.5").attr("stroke","#fff")}},{key:"renderFocusLine",value:function(t){var e=t.lineData,n=t.xScale,a=e[0].values.map(function(t){var e=t.date;return n(e)}),r=this.svg.append("g").attr("id","focusline").selectAll(".grid-group").data(a).enter().append("g").attr("class","grid-groups");r.append("line").attr("class","grid-item").attr("x1",function(t){return t}).attr("y1",0).attr("x2",function(t){return t}).attr("y2",340).attr("stroke","#aaa").attr("stroke-width",2).attr("opacity","0"),r.append("rect").attr("class",function(t,e){return"rect-g".concat(e)}).attr("x",function(t,e){return t}).attr("y",0).attr("width",a[1]).attr("height",340).attr("opacity",0).on("mouseover",function(t,e,n){U=e,h.m(n[e].parentNode).select(".grid-item").attr("opacity",1),h.n(".circle-item".concat(e)).attr("r",4),h.m(".rect-g".concat(e)).attr("opacity",.1),function(){var t=h.m("#container").append("div").attr("class","tooltip"),e=(D()(I[U])||[]).map(function(t){return"<span>".concat(t,": ").concat(I[U][t],"</span>")});t.html("<div>".concat(e,"</div>"))}()}).on("mouseout",function(t,e,n){U=-1,h.m(n[e].parentNode).select(".grid-item").attr("opacity",0),h.n(".circle-item".concat(e)).attr("r",2),h.m(".rect-g".concat(e)).attr("opacity",0),h.m(".tooltip").remove()})}},{key:"render",value:function(){return r.a.createElement("div",{id:"container"},r.a.createElement("div",{id:"multiChart2"}))}}]),e}(a.Component),T=function(t){function e(){return Object(o.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement("div",null,"12123")}}]),e}(a.Component),V=[{path:"/",desc:"Home",component:r.a.createElement("div",null,"Home")},{path:"/line/single",desc:"[Line Chart] Single",component:g},{path:"/line/multi",desc:"[Line Chart] Multi",component:C},{path:"/line/multi2",desc:"[Line Chart] Multi2",component:R},{path:"/bar/multi",desc:"[Bar Chart] bar",component:T}],Z=function(){return r.a.createElement(d.a,{basename:"."},r.a.createElement("div",null,r.a.createElement("ul",null,V.map(function(t,e){var n=t.path,a=t.desc;return r.a.createElement("li",{key:e},r.a.createElement(m.a,{to:n},a))})),r.a.createElement("hr",null),r.a.createElement(f.a,{exact:!0,path:"/",component:function(){return r.a.createElement("div",null,"Home")}}),r.a.createElement(f.a,{path:"/line/single",component:g}),r.a.createElement(f.a,{path:"/line/multi",component:C}),r.a.createElement(f.a,{path:"/line/multi2",component:R}),r.a.createElement(f.a,{path:"/bar/multi",component:T})))},$=function(t){function e(){return Object(o.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{id:"App"},r.a.createElement(Z,null))}}]),e}(a.Component);i.a.render(r.a.createElement($,null),document.getElementById("root"))}},[[23,2,1]]]);
//# sourceMappingURL=main.762318eb.chunk.js.map