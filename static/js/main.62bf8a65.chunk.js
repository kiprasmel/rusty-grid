(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{18:function(t,e,n){var r,a=("/"!==(r=n(32).homepage)[0]&&(r=[".","./"].includes(r)?"/":[".","./"].includes(r[0])?r.substring(1):"/".concat(r)),"/"!==r[r.length-1]&&(r="".concat(r,"/")),r);t.exports={homepageUrl:a}},23:function(t,e,n){},32:function(t){t.exports=JSON.parse('{"name":"my-app","version":"0.1.0","private":true,"homepage":"rusty-grid","dependencies":{"@emotion/react":"^11.1.5","@reduxjs/toolkit":"^1.2.5","@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.3.2","@testing-library/user-event":"^7.1.2","@types/jest":"^24.0.0","@types/node":"^12.0.0","@types/react":"^16.9.0","@types/react-dom":"^16.9.0","@types/react-redux":"^7.1.7","emotion":"^10.0.0","react":"^17.0.1","react-dom":"^17.0.1","react-redux":"^7.2.0","react-scripts":"4.0.3","typescript":"^4.2.2"},"scripts":{"start":"BROWSER=\'\' react-app-rewired start","build":"react-app-rewired build","test":"react-app-rewired test","eject":"react-scripts eject","lint":"    eslint . --ext js,jsx,ts,tsx","lint:fix":"eslint . --ext js,jsx,ts,tsx --fix"},"eslintConfig":{"extends":"eslint-config-sarpik","rules":{"no-nested-ternary":0}},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@typescript-eslint/eslint-plugin":"^2.11.0","@typescript-eslint/parser":"^2.11.0","babel-eslint":"^10.0.3","eslint":"7.x","eslint-config-airbnb":"^18.0.0","eslint-config-prettier":"^6.7.0","eslint-config-sarpik":"0.2.10","eslint-plugin-flowtype":"^4.5.2","eslint-plugin-html":"^6.0.0","eslint-plugin-import":"^2.18.0","eslint-plugin-jsx-a11y":"^6.2.3","eslint-plugin-monorepo":"^0.2.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-react":"^7.14.2","eslint-plugin-react-hooks":"^2.3.0","esprima":"^4.0.1","prettier":"^1.16.4","react-app-rewired":"^2.1.8","wasm-loader":"^1.3.0"}}')},33:function(t,e,n){"use strict";n.r(e);var r,a,i=n(1),c=n.n(i),s=n(10),l=n.n(s),o=(n(23),n(4)),d=n(3),j=n(2),b=n(9),u=n(15),h=n.n(u),O=n(17),m=n(7),p=n(8),f=n(6),g=function(t,e,n){return Math.max(Math.min(t,n),e)},x=function(t){return Math.round(Math.random()*(t-1))},y=function(t){return function(e,n){return e*t+n}},v=n(0);!function(t){t[t.Filled=0]="Filled",t[t.Clear=1]="Clear",t[t.Start=2]="Start",t[t.End=3]="End"}(a||(a={}));var S,w,k,N,C,P,q,E,F,I,R,U,z,A,D,M,_,G,B,J,K,W,H,$,L,Q,T,V,X=function(t){var e,n=(e={},Object(f.a)(e,a.Filled,a.Clear),Object(f.a)(e,a.Clear,a.Filled),Object(f.a)(e,a.Start,a.Start),Object(f.a)(e,a.End,a.End),e)[t];if(!n&&0!==n)throw new Error("invalid squareState provided to `swapSquareState` function (".concat(t,")"));return n},Y=function(t){var e,n=t.state,i=t.isPartOfShortestPath,c=void 0!==i&&i,s=t.handleClick,l=void 0===s?function(){}:s,o=t.className,b=t.children,u=Object(p.a)(t,["state","isPartOfShortestPath","handleClick","className","children"]),h=c&&![a.Start,a.End].includes(n)?"hsl(130, 100%, 87%)":(e={},Object(f.a)(e,a.Start,"hsl(-60,100%,90%)"),Object(f.a)(e,a.End,"hsl(170, 100%,85%)"),Object(f.a)(e,a.Filled,"hsl(0, 0%, 90%)"),Object(f.a)(e,a.Clear,"white"),e)[n];return Object(v.jsx)("button",Object(m.a)(Object(m.a)({type:"button"},u),{},{onClick:l,className:Object(j.b)(Object(j.a)(r||(r=Object(d.a)(["\n\t\t\t\t\tmin-width: 35px;\n\t\t\t\t\tmin-height: 35px;\n\n\t\t\t\t\tmax-width: 70px;\n\t\t\t\t\tmax-height: 70px;\n\n\t\t\t\t\tmargin: 0;\n\t\t\t\t\tpadding: 0;\n\n\t\t\t\t\tbackground-color: ",";\n\n\t\t\t\t\tborder: 1px solid hsla(0, 0%, 50%, 0.5);\n\n\t\t\t\t\t&:hover {\n\t\t\t\t\t\tbackground: ",";\n\t\t\t\t\t}\n\n\t\t\t\t\t&:active {\n\t\t\t\t\t\tbackground: hsla(0, 0%, 50%, 0.5);\n\t\t\t\t\t}\n\t\t\t\t"])),h,c||[a.Start,a.End,a.Filled].includes(n)?h:"hsla(0, 0%, 95%, 0.95)"),o),children:b}))},Z=function(t){var e=t.rows,n=t.children;return Object(v.jsx)(v.Fragment,{children:new Array(e).fill(0).map((function(t,e){return Object(v.jsx)(v.Fragment,{children:n(e)})}))})},tt=function(t){var e=t.rows,n=t.cols,r=t.row,a=t.grid,i=t.indicesOfShortestPathSquares,c=Object(o.b)();return Object(v.jsx)(v.Fragment,{children:new Array(n).fill(0).map((function(t,s){var l=y(n)(r,s),o=a[l];return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(Y,{state:o,isPartOfShortestPath:i.includes(l),handleClick:function(){return c(ht(a,e,n,l,o))}})})}))})},et=!1,nt=function(){var t=Object(O.a)(h.a.mark((function t(){var e;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.e(3).then(n.bind(null,35));case 2:e=t.sent,S=e.breadth_first_search_shortest_path,et=!0,window.sp=S;case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),rt=function(t,e,n){if(t.filter((function(t){return t===a.Clear})).length<Math.min(e,n)-2)return console.log("skipping computation because impossible"),new Uint16Array;if(!et)throw new Error("wasm not loaded yet");var r=function(e){for(var n=0;n<t.length;n++)if(t[n]===e)return n;throw new Error("state not found")}(a.Start);return S(t,e,n,r)},at=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=new Uint8Array(t*e),i=y(e),c=0;c<t;c++)for(var s=0;s<e;s++)r[i(c,s)]=n?a.Clear:a.Filled;return r[i(x(t),0)]=a.Start,r[i(x(t),e-1)]=a.End,r},it=function(){return{grid:at(),rows:10,cols:10,dirtyRows:10,dirtyCols:10,hasShortestPath:!1,indicesOfShortestPathSquares:new Uint16Array,isInverted:!1,hideUIStates:!1}},ct=it(),st=Object(b.b)({name:"grid",initialState:ct,reducers:{reset:function(){return it()},eventuallySetRows:function(t,e){t.dirtyRows=g(e.payload,1,20)},eventuallySetCols:function(t,e){t.dirtyCols=g(e.payload,1,20)},commitResize:function(t){t.rows=t.dirtyRows,t.cols=t.dirtyCols;var e=at(t.dirtyRows,t.dirtyCols,t.isInverted);t.grid=e,t.hasShortestPath=!1,t.indicesOfShortestPathSquares=rt(e,t.dirtyRows,t.dirtyCols)},toggleUIStates:function(t){t.hideUIStates=!t.hideUIStates},invert:{reducer:function(t,e){t.isInverted=!t.isInverted,t.grid=e.payload.grid,t.indicesOfShortestPathSquares=e.payload.indicesOfShortestPathSquares,t.hasShortestPath=e.payload.hasShortestPath},prepare:function(t,e,n){var r=t.map(X),a=rt(r,e,n);return{payload:{grid:r,indicesOfShortestPathSquares:a,hasShortestPath:a.length>0}}}},clickSquare:{reducer:function(t,e){var n=e.payload,r=n.grid,i=n.squareState,c=n.hasShortestPath,s=n.indicesOfShortestPathSquares;[a.Start,a.End].includes(i)||(t.grid=r,t.hasShortestPath=c,t.indicesOfShortestPathSquares=s)},prepare:function(t,e,n,r,a){var i=function(t,e,n){if(!t[e]&&0!==t[e])throw new Error("target not found when preparing `clickSquare`");var r=new Uint8Array(t),a=X(n);return r[e]=a,console.log("state",n,"newState",a),r}(t,r,a),c=rt(i,e,n);return{payload:{squareState:a,grid:i,hasShortestPath:c.length>0,indicesOfShortestPathSquares:c}}}}}}),lt=st.actions,ot=(lt.reset,lt.eventuallySetRows),dt=lt.eventuallySetCols,jt=lt.commitResize,bt=lt.invert,ut=lt.toggleUIStates,ht=lt.clickSquare,Ot=st.reducer,mt=function(t){var e=t.children,n=Object(p.a)(t,["children"]);return Object(v.jsx)("button",Object(m.a)(Object(m.a)({type:"button"},n),{},{className:Object(j.b)(Object(j.a)(w||(w=Object(d.a)(["\n\t\t\t\t/* font-size: 1.5rem; */\n\t\t\t\tfont-size: 1.75rem;\n\t\t\t\t/* padding: 0.4rem 1rem; */\n\t\t\t\tpadding: 0.6rem 1.5rem;\n\n\t\t\t\tletter-spacing: -0.02em;\n\t\t\t\tborder-radius: 8px;\n\n\t\t\t\tbackground-color: hsl(220, 100%, 60%);\n\t\t\t\tcolor: white;\n\n\t\t\t\t&:hover {\n\t\t\t\t\tbackground-color: hsl(220, 100%, 75%);\n\t\t\t\t\ttransition: background-color 0.2s ease-in-out;\n\t\t\t\t}\n\n\t\t\t\t&:focus {\n\t\t\t\t\tbackground-color: hsl(220, 100%, 35%);\n\t\t\t\t}\n\t\t\t"]))),n.className),children:e}))},pt=function(){var t=Object(o.b)(),e=Object(o.c)((function(t){return t.grid.grid})),n=Object(o.c)((function(t){return t.grid.rows})),r=Object(o.c)((function(t){return t.grid.cols})),a=Object(o.c)((function(t){return t.grid.dirtyRows})),i=Object(o.c)((function(t){return t.grid.dirtyCols})),c=Object(o.c)((function(t){return t.grid.indicesOfShortestPathSquares}));return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("article",{className:Object(j.a)(k||(k=Object(d.a)(["\n\t\t\t\t\tbackground-color: hsla(0, 0%, 85%, 0.69);\n\t\t\t\t\tpadding: 1.5rem 3rem;\n\t\t\t\t\tborder-radius: 0.5rem;\n\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: row;\n\n\t\t\t\t\tjustify-content: flex-start;\n\t\t\t\t\talign-items: flex-end;\n\n\t\t\t\t\t& > * + * {\n\t\t\t\t\t\tmargin-left: 1rem;\n\t\t\t\t\t}\n\t\t\t\t"]))),children:Object(v.jsxs)("table",{className:Object(j.a)(N||(N=Object(d.a)(["\n\t\t\t\t\t\ttext-align: left;\n\n\t\t\t\t\t\t/**\n\t\t\t\t\t\t * select items inside all <tr> children\n\t\t\t\t\t\t * to add margin, because margin does not apply\n\t\t\t\t\t\t * to <tr> itself\n\t\t\t\t\t\t *\n\t\t\t\t\t\t * & > (thead|tbody) > tr > all but not first (th|td) > some_itrem\n\t\t\t\t\t\t*/\n\t\t\t\t\t\t& > * > * > * + * > * {\n\t\t\t\t\t\t\tmargin-left: 1rem;\n\t\t\t\t\t\t}\n\t\t\t\t\t"]))),children:[Object(v.jsx)("thead",{children:Object(v.jsxs)("tr",{children:[Object(v.jsx)("th",{children:Object(v.jsx)("p",{className:Object(j.a)(C||(C=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tfont-weight: normal;\n\t\t\t\t\t\t\t\t\t\tfont-size: 1.5rem;\n\t\t\t\t\t\t\t\t\t"]))),children:"Rows"})}),Object(v.jsx)("th",{children:Object(v.jsx)("span",{})}),Object(v.jsx)("th",{children:Object(v.jsx)("p",{className:Object(j.a)(P||(P=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tfont-weight: normal;\n\t\t\t\t\t\t\t\t\t\tfont-size: 1.5rem;\n\t\t\t\t\t\t\t\t\t"]))),children:"Columns"})}),Object(v.jsx)("th",{children:Object(v.jsx)("span",{})})]})}),Object(v.jsx)("tbody",{children:Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{children:Object(v.jsx)("input",{id:"rows",type:"number",value:a,onChange:function(e){return t(ot(Number(e.target.value)))},onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),t(jt()))},className:Object(j.a)(q||(q=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tfont-size: 2.25rem;\n\t\t\t\t\t\t\t\t\t\tpadding: 0.2rem 0.1rem;\n\t\t\t\t\t\t\t\t\t\tmax-width: 6rem;\n\n\t\t\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\t\t\t\t\tappearance: textfield;\n\t\t\t\t\t\t\t\t\t"])))})}),Object(v.jsx)("td",{children:Object(v.jsx)("p",{className:Object(j.a)(E||(E=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tfont-size: 1.5rem;\n\t\t\t\t\t\t\t\t\t"]))),children:"x"})}),Object(v.jsx)("td",{children:Object(v.jsx)("input",{id:"columns",type:"number",value:i,onChange:function(e){return t(dt(Number(e.target.value)))},onKeyPress:function(e){"Enter"===e.key&&(e.preventDefault(),t(jt()))},className:Object(j.a)(F||(F=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tfont-size: 2.25rem;\n\t\t\t\t\t\t\t\t\t\tpadding: 0.2rem 0.1rem;\n\t\t\t\t\t\t\t\t\t\tmax-width: 6rem;\n\n\t\t\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\t\t\t\t\tappearance: textfield;\n\t\t\t\t\t\t\t\t\t"])))})}),Object(v.jsx)("td",{children:Object(v.jsx)(mt,{className:Object(j.a)(I||(I=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tmargin-left: 2rem;\n\t\t\t\t\t\t\t\t\t"]))),onClick:function(){return t(jt())},children:Object(v.jsx)("span",{className:Object(j.a)(R||(R=Object(d.a)([""]))),children:"Generate"})})}),Object(v.jsx)("td",{children:Object(v.jsx)(mt,{className:Object(j.a)(U||(U=Object(d.a)(["\n\t\t\t\t\t\t\t\t\t\tmargin-left: 2rem;\n\t\t\t\t\t\t\t\t\t"]))),onClick:function(){return t(bt(e,n,r))},children:Object(v.jsx)("span",{className:Object(j.a)(z||(z=Object(d.a)([""]))),children:"Invert"})})})]})})]})}),Object(v.jsx)("article",{className:Object(j.a)(A||(A=Object(d.a)(["\n\t\t\t\t\tmargin-left: auto;\n\t\t\t\t\tmargin-right: auto;\n\n\t\t\t\t\tmax-width: 46rem;\n\t\t\t\t\tmax-height: 46rem;\n\n\t\t\t\t\tborder: 1px solid hsla(0, 0%, 50%, 0.5);\n\n\t\t\t\t\tdisplay: grid;\n\n\t\t\t\t\tgrid-template-columns: repeat(",", minmax(35px, 70px));\n\t\t\t\t\tgrid-template-rows: repeat(",", minmax(35px, 70px));\n\t\t\t\t"])),r,n),children:Object(v.jsx)(Z,{rows:n,children:function(t){return Object(v.jsx)(tt,{grid:e,rows:n,cols:r,row:t,indicesOfShortestPathSquares:c})}})})]})},ft=function(t){var e=t.children,n=(t.ref,Object(p.a)(t,["children","ref"]));return Object(v.jsx)("div",Object(m.a)(Object(m.a)({},n),{},{className:Object(j.b)(Object(j.a)(D||(D=Object(d.a)(["\n\t\t\t\tdisplay: flex;\n\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n\n\t\t\t\t/* & > * {\n\t\t\t\tflex: 1;\n\t\t\t} */\n\t\t\t"]))),n.className),children:e}))},gt=function(t){var e=t.label,n=t.children;return Object(v.jsxs)("div",{className:Object(j.a)(M||(M=Object(d.a)(["\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\n\t\t\talign-items: flex-start;\n\n\t\t\t& > * + * {\n\t\t\t\tmargin-top: 0.25rem;\n\t\t\t}\n\t\t"]))),children:[Object(v.jsx)("p",{className:Object(j.a)(_||(_=Object(d.a)(["\n\t\t\t\tmargin: 0;\n\t\t\t\tpadding: 0;\n\n\t\t\t\tfont-size: 1.5rem;\n\n\t\t\t\tword-wrap: normal;\n\t\t\t"]))),children:e}),n]})},xt=function(){var t=Object(o.b)(),e=function(){return t(ut())};return Object(o.c)((function(t){return t.grid.hideUIStates}))?null:Object(v.jsxs)("article",{children:[Object(v.jsx)("h2",{title:"Click to hide",onKeyPress:e,onClick:e,className:Object(j.a)(G||(G=Object(d.a)(["\n\t\t\t\t\ttext-align: left;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t"]))),children:"UI States"}),Object(v.jsxs)("div",{className:Object(j.a)(B||(B=Object(d.a)(["\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\n\t\t\t\t\t& > * + * {\n\t\t\t\t\t\tmargin-top: 3rem;\n\t\t\t\t\t}\n\t\t\t\t"]))),children:[Object(v.jsxs)(ft,{className:Object(j.a)(J||(J=Object(d.a)(["\n\t\t\t\t\t\tjustify-content: flex-start;\n\t\t\t\t\t\t& > * + * {\n\t\t\t\t\t\t\tmargin-left: 4rem;\n\t\t\t\t\t\t}\n\t\t\t\t\t"]))),children:[Object(v.jsx)(gt,{label:"Default",children:Object(v.jsx)(mt,{children:"Generate"})}),Object(v.jsx)(gt,{label:"Hover",children:Object(v.jsx)(mt,{className:Object(j.a)(K||(K=Object(d.a)(["\n\t\t\t\t\t\t\t\tbackground-color: hsl(220, 100%, 75%);\n\t\t\t\t\t\t\t"]))),children:"Generate"})}),Object(v.jsx)(gt,{label:"Down",children:Object(v.jsx)(mt,{className:Object(j.a)(W||(W=Object(d.a)(["\n\t\t\t\t\t\t\t\tbackground-color: hsl(220, 100%, 35%);\n\t\t\t\t\t\t\t"]))),children:"Generate"})})]}),Object(v.jsxs)("div",{className:Object(j.a)(H||(H=Object(d.a)(["\n\t\t\t\t\t\tdisplay: grid;\n\t\t\t\t\t\tgrid-template-columns: repeat(4, 1fr);\n\t\t\t\t\t\tgrid-row-gap: 1rem;\n\t\t\t\t\t"]))),children:[Object(v.jsx)(gt,{label:"Filled (default)",children:Object(v.jsx)(Y,{state:a.Filled})}),Object(v.jsx)(gt,{label:"Hover",children:Object(v.jsx)(Y,{state:a.Clear,className:Object(j.a)($||($=Object(d.a)(["\n\t\t\t\t\t\t\t\tbackground: hsla(0, 0%, 95%, 0.95);\n\t\t\t\t\t\t\t"])))})}),Object(v.jsx)(gt,{label:"Down",children:Object(v.jsx)(Y,{state:a.Filled,className:Object(j.a)(L||(L=Object(d.a)(["\n\t\t\t\t\t\t\t\tbackground: hsla(0, 0%, 50%, 0.5);\n\t\t\t\t\t\t\t"])))})}),Object(v.jsx)(gt,{label:"Clear",children:Object(v.jsx)(Y,{state:a.Clear})}),Object(v.jsx)(gt,{label:"Start point",children:Object(v.jsx)(Y,{state:a.Start})}),Object(v.jsx)(gt,{label:"End point",children:Object(v.jsx)(Y,{state:a.End})}),Object(v.jsx)(gt,{label:"Shortest path",children:Object(v.jsx)(Y,{state:a.Clear,isPartOfShortestPath:!0})})]})]})]})},yt=n(18),vt=function(){return Object(v.jsx)("article",{className:Object(j.a)(Q||(Q=Object(d.a)(["\n\t\t\ttext-align: left;\n\t\t"]))),children:Object(v.jsx)("img",{src:"".concat(yt.homepageUrl,"assets/grid-logo.png"),alt:"Grid logo"})})};function St(){return Object(i.useEffect)((function(){nt()}),[]),Object(v.jsx)("div",{className:Object(j.a)(T||(T=Object(d.a)(["\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\tmin-height: 100vh;\n\n\t\t\t\tmargin-top: 2rem;\n\t\t\t\tmargin-bottom: 2rem;\n\n\t\t\t\ttext-align: center;\n\t\t\t"]))),children:Object(v.jsxs)("main",{className:Object(j.a)(V||(V=Object(d.a)(["\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\n\t\t\t\t\t& > * {\n\t\t\t\t\t\tmargin-top: 4rem;\n\t\t\t\t\t}\n\n\t\t\t\t\tmargin-bottom: 4rem;\n\t\t\t\t"]))),children:[Object(v.jsx)(vt,{}),Object(v.jsx)(pt,{}),Object(v.jsx)(xt,{})]})})}var wt=Object(b.a)({reducer:{grid:Ot},middleware:Object(b.c)({serializableCheck:{ignoredActions:["grid/clickSquare","grid/invert"],ignoredPaths:["grid.grid","grid.indicesOfShortestPathSquares"]}})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(o.a,{store:wt,children:Object(v.jsx)(St,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.62bf8a65.chunk.js.map