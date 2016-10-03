"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRow = function (_React$Component) {
	_inherits(TableRow, _React$Component);

	function TableRow() {
		_classCallCheck(this, TableRow);

		return _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));
	}

	_createClass(TableRow, [{
		key: "makeRow",
		value: function makeRow() {
			var data = this.props.data;
			var row = this.props.row;
			return this.props.columns.map(function (col, i) {
				var content = data[col.title];
				if (col.process) content = col.process(content);
				if (content instanceof Date) content = content.toString();
				if (col.stringify && (typeof content === "undefined" ? "undefined" : _typeof(content)) == "object") content = JSON.stringify(content);
				var clickFun = function clickFun(event) {
					var out = {
						row: row,
						col: i,
						columnName: col.title,
						cell: data[col.title],
						rowData: data
					};
					return this.props.cellClick(out);
				};
				var className = "tableCell";
				return _react2.default.createElement(
					"td",
					{ key: "C" + i + "-R" + row, className: className, onClick: clickFun.bind(this) },
					content
				);
			}.bind(this));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tr",
				{ className: "tableRow" },
				this.makeRow()
			);
		}
	}]);

	return TableRow;
}(_react2.default.Component);

var TableHeader = function (_React$Component2) {
	_inherits(TableHeader, _React$Component2);

	function TableHeader() {
		_classCallCheck(this, TableHeader);

		return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
	}

	_createClass(TableHeader, [{
		key: "makeHeader",
		value: function makeHeader() {
			return this.props.columns.map(function (col, i) {
				var clickFun = function clickFun() {
					var name = col.title;
					return this.props.orderTable(name);
				};
				var className = "tableHeader";
				var text = col.text || col.title;
				var ascDesc = this.props.orderAsc ? "asc" : "desc";
				if (this.props.orderCol == col.title) className += " " + ascDesc;
				return _react2.default.createElement(
					"td",
					{ key: col.title, className: className, onClick: clickFun.bind(this) },
					text.toString()
				);
			}.bind(this));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"thead",
				null,
				_react2.default.createElement(
					"tr",
					null,
					this.makeHeader()
				)
			);
		}
	}]);

	return TableHeader;
}(_react2.default.Component);

var DataTable = function (_React$Component3) {
	_inherits(DataTable, _React$Component3);

	function DataTable(props) {
		_classCallCheck(this, DataTable);

		var _this3 = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

		var columns = _this3.props.columns.map(function (col) {
			if (typeof col == "string") {
				return { title: col, stringify: true };
			} else {
				return col;
			}
		});
		_this3.state = {
			columns: columns,
			orderCol: columns[0].title,
			orderAsc: true,
			searchText: "",
			searchValue: null,
			cellClick: _this3.props.cellClick || function () {},
			page: 0,
			pageLength: _this3.props.pageLength || 10,
			usePages: _this3.props.pagination || true,
			showFilter: _this3.props.showFilter || true,
			isFilterNotSearch: false
		};
		return _this3;
	}

	_createClass(DataTable, [{
		key: "orderTable",
		value: function orderTable(orderCol) {
			var orderAsc = !this.state.orderAsc;
			this.setState({ orderCol: orderCol, orderAsc: orderAsc });
		}
	}, {
		key: "makeRows",
		value: function makeRows() {
			var data = this.props.data;
			if (this.state.searchValue) {
				data = data.filter(function (r) {
					var str = JSON.stringify(r);
					return this.state.isFilterNotSearch ? str.search(this.state.searchValue) == -1 : str.search(this.state.searchValue) != -1;
				}.bind(this));
			}
			var property = this.state.orderCol;
			var direction = this.state.orderAsc ? 1 : -1;
			data = data.sort(function (a, b) {
				var r = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
				return r * direction;
			});
			var j = this.state.page * this.state.pageLength;
			var k = this.usePages ? j + this.state.pageLength : data.length;
			var rows = [];
			for (; j < k && j < data.length; j++) {
				rows.push(_react2.default.createElement(TableRow, { key: "R" + j, row: j, data: data[j], columns: this.state.columns, cellClick: this.state.cellClick }));
			}
			return rows;
		}
	}, {
		key: "changePage",
		value: function changePage(move) {
			var page = this.state.page + move;
			if (page * this.state.pageLength > this.props.data.length) return;
			this.setState({ page: page });
		}
	}, {
		key: "pagination",
		value: function pagination() {
			if (this.state.usePages) {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"button",
						{ onClick: function () {
								this.changePage(-1);
							}.bind(this) },
						"Prev"
					),
					_react2.default.createElement(
						"button",
						{ onClick: function () {
								this.changePage(1);
							}.bind(this) },
						"Next"
					)
				);
			} else {
				return _react2.default.createElement("div", null);
			}
		}
	}, {
		key: "isSearch",
		value: function isSearch() {
			if (this.state.showFilter) {
				var text = this.state.isFilterNotSearch ? "Filter" : "Search";
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"span",
						{ onClick: this.toggleFilter.bind(this) },
						text
					),
					_react2.default.createElement("input", { value: this.state.searchText, onChange: this.setSearch.bind(this) })
				);
			} else {
				return null;
			}
		}
	}, {
		key: "setSearch",
		value: function setSearch(event) {
			var val = event.target.value;
			if (val.length > 0) {
				this.setState({ searchText: val, searchValue: val });
			} else {
				this.setState({ searchText: val, searchValue: null });
			}
		}
	}, {
		key: "toggleFilter",
		value: function toggleFilter() {
			var change = !this.state.isFilterNotSearch;
			this.setState({ isFilterNotSearch: change });
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				this.isSearch(),
				_react2.default.createElement(
					"table",
					{ className: "dataTable" },
					_react2.default.createElement(TableHeader, { columns: this.state.columns, orderCol: this.state.orderCol, orderAsc: this.state.orderAsc, orderTable: this.orderTable.bind(this) }),
					_react2.default.createElement(
						"tbody",
						null,
						this.makeRows()
					)
				),
				this.pagination()
			);
		}
	}]);

	return DataTable;
}(_react2.default.Component);

exports.default = DataTable;
