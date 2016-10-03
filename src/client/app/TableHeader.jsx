import React from 'react';

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

export default TableHeader