'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import TableHeader from "./TableHeader.jsx";
//import TableRow from "./TableRow.jsx";
/*
class DataTable extends React.Component {
	constructor(props) {
		super(props);
		var columns = this.props.columns.map(function(col){
			if(typeof col == "string"){
				return {title:col,stringify:true}
			}else{
				return col
			}
		});
		this.state = {
			columns:columns,
			orderCol:columns[0].title,
			orderAsc:true,
			searchText:"",
			searchValue:null,
			cellClick:this.props.cellClick || function(){},
			page:0,
			pageLength:this.props.pageLength || 10,
			usePages:this.props.pagination||true,
			showFilter:this.props.showFilter || true,
			isFilterNotSearch:false
		}
	}
	orderTable(orderCol){
		var orderAsc = !this.state.orderAsc;
		this.setState({orderCol:orderCol,orderAsc:orderAsc});
	}

	makeRows(){
		var data =  this.props.data;
		if(this.state.searchValue){
			data = data.filter(function(r){
				var str = JSON.stringify(r);
				return (this.state.isFilterNotSearch) ? (str.search(this.state.searchValue) == -1) : (str.search(this.state.searchValue) != -1);
			}.bind(this));
		}
		var property = this.state.orderCol;
		var direction = (this.state.orderAsc) ? 1:-1;
		data = data.sort(function(a,b){
		    var r = (a[property] < b[property] ) ? -1 : (a[property] > b[property]) ? 1 : 0;
		    return r*direction
		});
		var j = this.state.page*this.state.pageLength;
		var k = (this.usePages) ? (j + this.state.pageLength) : data.length;
		var rows = [];
		for(;(j<k&&j<data.length);j++){
			rows.push(	(<TableRow key={"R"+j} row={j} data={data[j]} columns={this.state.columns} cellClick={this.state.cellClick}/>) );
		}
		return rows
	}
	changePage(move){
		var page = this.state.page+move;
		if(page*this.state.pageLength > this.props.data.length) return
		this.setState({page:page});
	}
	pagination(){
		if(this.state.usePages){
			return (<div>
				<button onClick={function(){this.changePage(-1)}.bind(this)}>Prev</button>
				<button onClick={function(){this.changePage(1)}.bind(this)}>Next</button>
			</div>)
		}else{
			return (<div></div>)
		}
	}
	isSearch(){
		if(this.state.showFilter){
			var text = (this.state.isFilterNotSearch) ? "Filter" : "Search";
			return (<div>
				<span onClick={this.toggleFilter.bind(this)}>{text}</span>
				<input value={this.state.searchText} onChange={this.setSearch.bind(this)}/>		
			</div>)
		}else{
			return null
		}
	}
	setSearch(event){
		var val = event.target.value;
		if(val.length > 0){
			this.setState({searchText:val,searchValue:val});
		}else{
			this.setState({searchText:val,searchValue:null});
		}
	}
	toggleFilter(){
		var change = !this.state.isFilterNotSearch;
		this.setState({isFilterNotSearch:change});
	}

	render(){
		return(<div>
			{this.isSearch()}
			<table className="dataTable">
			<TableHeader columns={this.state.columns} orderCol={this.state.orderCol} orderAsc={this.state.orderAsc} orderTable={this.orderTable.bind(this)}/>
			<tbody>{this.makeRows()}</tbody>
			</table>
			{this.pagination()}
			</div>)
	}
}
*/
var Test = function (_React$Component) {
	_inherits(Test, _React$Component);

	function Test() {
		_classCallCheck(this, Test);

		return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
	}

	_createClass(Test, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'This Test Worked'
			);
		}
	}]);

	return Test;
}(_react2.default.Component);

exports.default = Test;
