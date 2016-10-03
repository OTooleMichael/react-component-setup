import React from 'react';

class TableRow extends React.Component {
	makeRow(){
		var data = this.props.data;
		var row = this.props.row;
		return this.props.columns.map(function(col,i){
			var content =  data[col.title];
			if(col.process) content = col.process(content);
			if(content instanceof Date) content = content.toString();
			if(col.stringify && typeof content == "object") content = JSON.stringify(content);
			var clickFun = function(event){
				var out = {
					row:row,
					col:i,
					columnName:col.title,
					cell:data[col.title],
					rowData:data
				};
				return this.props.cellClick(out);
			}
			var className = "tableCell";
			return (<td key={"C"+i+"-R"+row} className={className} onClick={clickFun.bind(this)}>{content}</td>)
		}.bind(this));
	}
	render(){
		return(
			<tr className="tableRow">{this.makeRow()}</tr>
			)
	}
}

class TableHeader extends React.Component {
	makeHeader(){
		return this.props.columns.map(function(col,i){
			var clickFun = function(){
				var name = col.title;
				return this.props.orderTable(name);
			}
			var className = "tableHeader";
			var text = col.text || col.title;
			var ascDesc = (this.props.orderAsc) ? "asc" :"desc";
			if(this.props.orderCol == col.title) className+=" "+ascDesc;
			return (<td key={col.title} className={className} onClick={clickFun.bind(this)} >{text.toString()}</td>)
		}.bind(this))
	}
	render(){
		return(<thead><tr>{this.makeHeader()}</tr></thead>)
	}
}

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


export default DataTable


