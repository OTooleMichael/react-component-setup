webpackJsonp([1],{0:function(e,t,n){e.exports=n(92)},89:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(27),s=r(u),c=n(90),f=r(c),d=n(91),p=r(d),h=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=n.props.columns.map(function(e){return"string"==typeof e?{title:e,stringify:!0}:e});return n.state={columns:r,orderCol:r[0].title,orderAsc:!0,searchText:"",searchValue:null,cellClick:n.props.cellClick||function(){},page:0,pageLength:n.props.pageLength||10,usePages:n.props.pagination||!0,showFilter:n.props.showFilter||!0,isFilterNotSearch:!1},n}return i(t,e),l(t,[{key:"orderTable",value:function(e){var t=!this.state.orderAsc;this.setState({orderCol:e,orderAsc:t})}},{key:"makeRows",value:function(){var e=this.props.data;this.state.searchValue&&(e=e.filter(function(e){var t=JSON.stringify(e);return this.state.isFilterNotSearch?t.search(this.state.searchValue)==-1:t.search(this.state.searchValue)!=-1}.bind(this)));var t=this.state.orderCol,n=this.state.orderAsc?1:-1;e=e.sort(function(e,r){var o=e[t]<r[t]?-1:e[t]>r[t]?1:0;return o*n});for(var r=this.state.page*this.state.pageLength,o=this.usePages?r+this.state.pageLength:e.length,a=[];r<o&&r<e.length;r++)a.push(s["default"].createElement(p["default"],{key:"R"+r,row:r,data:e[r],columns:this.state.columns,cellClick:this.state.cellClick}));return a}},{key:"changePage",value:function(e){var t=this.state.page+e;t*this.state.pageLength>this.props.data.length||this.setState({page:t})}},{key:"pagination",value:function(){return this.state.usePages?s["default"].createElement("div",null,s["default"].createElement("button",{onClick:function(){this.changePage(-1)}.bind(this)},"Prev"),s["default"].createElement("button",{onClick:function(){this.changePage(1)}.bind(this)},"Next")):s["default"].createElement("div",null)}},{key:"isSearch",value:function(){if(this.state.showFilter){var e=this.state.isFilterNotSearch?"Filter":"Search";return s["default"].createElement("div",null,s["default"].createElement("span",{onClick:this.toggleFilter.bind(this)},e),s["default"].createElement("input",{value:this.state.searchText,onChange:this.setSearch.bind(this)}))}return null}},{key:"setSearch",value:function(e){var t=e.target.value;t.length>0?this.setState({searchText:t,searchValue:t}):this.setState({searchText:t,searchValue:null})}},{key:"toggleFilter",value:function(){var e=!this.state.isFilterNotSearch;this.setState({isFilterNotSearch:e})}},{key:"render",value:function(){return s["default"].createElement("div",null,this.isSearch(),s["default"].createElement("table",{className:"dataTable"},s["default"].createElement(f["default"],{columns:this.state.columns,orderCol:this.state.orderCol,orderAsc:this.state.orderAsc,orderTable:this.orderTable.bind(this)}),s["default"].createElement("tbody",null,this.makeRows())),this.pagination())}}]),t}(s["default"].Component);t["default"]=h},90:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(27),s=r(u),c=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"makeHeader",value:function(){return this.props.columns.map(function(e,t){var n=function(){var t=e.title;return this.props.orderTable(t)},r="tableHeader",o=e.text||e.title,a=this.props.orderAsc?"asc":"desc";return this.props.orderCol==e.title&&(r+=" "+a),s["default"].createElement("td",{key:e.title,className:r,onClick:n.bind(this)},o.toString())}.bind(this))}},{key:"render",value:function(){return s["default"].createElement("thead",null,s["default"].createElement("tr",null,this.makeHeader()))}}]),t}(s["default"].Component);t["default"]=c},91:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(27),c=r(s),f=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"makeRow",value:function(){var e=this.props.data,t=this.props.row;return this.props.columns.map(function(n,r){var o=e[n.title];n.process&&(o=n.process(o)),o instanceof Date&&(o=o.toString()),n.stringify&&"object"==("undefined"==typeof o?"undefined":l(o))&&(o=JSON.stringify(o));var a=function(o){var a={row:t,col:r,columnName:n.title,cell:e[n.title],rowData:e};return this.props.cellClick(a)},i="tableCell";return c["default"].createElement("td",{key:"C"+r+"-R"+t,className:i,onClick:a.bind(this)},o)}.bind(this))}},{key:"render",value:function(){return c["default"].createElement("tr",{className:"tableRow"},this.makeRow())}}]),t}(c["default"].Component);t["default"]=f},92:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(27),s=r(u),c=n(59),f=n(89),d=r(f),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=[{name:"a",age:10,dob:new Date("2016-08-10"),food:"d"},{name:"a",age:22,dob:new Date("2006-08-01"),food:"if"},{name:"k",age:30,dob:new Date("2016-08-10"),food:"k"},{name:"b",age:23,dob:new Date("2016-08-01"),food:"t"},{name:"f",age:2,dob:new Date("2015-08-10"),food:"d"},{name:"a",age:12,dob:new Date("2016-08-01"),food:"d"},{name:"r",age:20,dob:new Date("2016-09-13"),food:"d"},{name:"a",age:24,dob:new Date("2016-08-02"),food:"z"},{name:"a",age:16,dob:new Date("2014-08-21"),food:"d"},{name:"k",age:30,dob:new Date("2016-08-10"),food:"k"},{name:"b",age:23,dob:new Date("2016-08-01"),food:"t"},{name:"f",age:2,dob:new Date("2015-08-10"),food:"d"},{name:"a",age:12,dob:new Date("2016-08-01"),food:"d"},{name:"r",age:20,dob:new Date("2016-09-13"),food:"d"},{name:"a",age:24,dob:new Date("2016-08-02"),food:"z"},{name:"a",age:16,dob:new Date("2014-08-21"),food:"d"}];return r=r.map(function(e,t){return e.id=t,e}),n.state={data:r,inFocus:null},n}return i(t,e),l(t,[{key:"intoFocus",value:function(e){var t=this.state.data[e.rowData.id];this.setState({inFocus:JSON.stringify(t)})}},{key:"render",value:function(){var e=["name","age",{title:"dob",process:function(e){return e.toISOString().split("T")[0]}},"food"];return s["default"].createElement("div",null,s["default"].createElement(d["default"],{data:this.state.data,columns:e,cellClick:this.intoFocus.bind(this)}),s["default"].createElement("span",null,JSON.stringify(this.state.inFocus)))}}]),t}(s["default"].Component);(0,c.render)(s["default"].createElement(p,null),document.getElementById("app"))}});