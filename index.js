"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TableHeader = require("./TableHeader.jsx");

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableRow = require("./TableRow.jsx");

var _TableRow2 = _interopRequireDefault(_TableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_React$Component) {
	_inherits(DataTable, _React$Component);

	function DataTable(props) {
		_classCallCheck(this, DataTable);

		var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

		var columns = _this.props.columns.map(function (col) {
			if (typeof col == "string") {
				return { title: col, stringify: true };
			} else {
				return col;
			}
		});
		_this.state = {
			columns: columns,
			orderCol: columns[0].title,
			orderAsc: true,
			searchText: "",
			searchValue: null,
			cellClick: _this.props.cellClick || function () {},
			page: 0,
			pageLength: _this.props.pageLength || 10,
			usePages: _this.props.pagination || true,
			showFilter: _this.props.showFilter || true,
			isFilterNotSearch: false
		};
		return _this;
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
				rows.push(_react2.default.createElement(_TableRow2.default, { key: "R" + j, row: j, data: data[j], columns: this.state.columns, cellClick: this.state.cellClick }));
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
					_react2.default.createElement(_TableHeader2.default, { columns: this.state.columns, orderCol: this.state.orderCol, orderAsc: this.state.orderAsc, orderTable: this.orderTable.bind(this) }),
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
