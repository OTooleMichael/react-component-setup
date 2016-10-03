import React from 'react'
import { render } from 'react-dom'
import DataTable from "./Table.jsx";


class App extends React.Component {
	constructor(props){
		super(props)
		var data = [
			{name:"a",age:10,dob:new Date("2016-08-10"),food:"d"},
			{name:"a",age:22,dob:new Date("2006-08-01"),food:"if"},
			{name:"k",age:30,dob:new Date("2016-08-10"),food:"k"},
			{name:"b",age:23,dob:new Date("2016-08-01"),food:"t"},
			{name:"f",age:2,dob:new Date("2015-08-10"),food:"d"},
			{name:"a",age:12,dob:new Date("2016-08-01"),food:"d"},
			{name:"r",age:20,dob:new Date("2016-09-13"),food:"d"},
			{name:"a",age:24,dob:new Date("2016-08-02"),food:"z"},
			{name:"a",age:16,dob:new Date("2014-08-21"),food:"d"},
			{name:"k",age:30,dob:new Date("2016-08-10"),food:"k"},
			{name:"b",age:23,dob:new Date("2016-08-01"),food:"t"},
			{name:"f",age:2,dob:new Date("2015-08-10"),food:"d"},
			{name:"a",age:12,dob:new Date("2016-08-01"),food:"d"},
			{name:"r",age:20,dob:new Date("2016-09-13"),food:"d"},
			{name:"a",age:24,dob:new Date("2016-08-02"),food:"z"},
			{name:"a",age:16,dob:new Date("2014-08-21"),food:"d"},
		];
		data = data.map(function(r,i){
			r.id = i;
			return r
		})
		this.state={
			data:data,
			inFocus:null
		}
	}
	intoFocus(cellClick){
		var row = this.state.data[cellClick.rowData.id];
		this.setState({inFocus:JSON.stringify(row)});
	}
	render(){
		
		var columns = ["name","age",{title:"dob",process:function(dob){return dob.toISOString().split("T")[0]}},"food"];
		return (<div>
			<DataTable data={this.state.data} columns={columns} cellClick={this.intoFocus.bind(this)}/>
			<span>{JSON.stringify(this.state.inFocus)}</span>
		</div>)
	}
}
render(<App/>, document.getElementById('app'));