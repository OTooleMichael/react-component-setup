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

export default TableRow