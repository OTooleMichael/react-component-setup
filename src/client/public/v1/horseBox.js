// horse Box

var create = {
	HorseBox:function(horse,dom,holder){
		if(dom){
			this.setDom(dom);
		};
		this.holder =holder;
		this.sortValues ={};
		this.visibile = true;
		return this.updateHorse(horse)
	},
	Settings:function(raceSelect){
		this.raceSelect = raceSelect;
		this.kelly = 30000;
		this.bookieList = "BY,PP,LD";
		this.races = {};
		this.racesOrderedArray = [];
		this.updated ={
			odds: new Date(),
			bf:new Date()
		}
		return this
	},
	Bets:function(){
		this.betsArray = [];
		this.betsHorses = {};
		return this
	},
	CoreInfo:function(bets){
		this.performance;
		this.targets = {
			winnings:[-1,90000],
			betfair:[-1,7],
			odds:[-1,20],
			proxies:[20,90000],
			passRate:[40,100]
		}
		this.betsObj = bets;
		this.arr = ["bets","remaining","races","winnings","winnings","odds","proxies","passRate","winnings"];
		this.cycle = 0;
		this.interval;
		this.dom = document.createElement("div");
		this.dom.id = "coreInfo";
		document.getElementsByTagName("body")[0].appendChild(this.dom);
		this.dom.className = "infoBox";
		return this
	},
	BetfairButton:function(socket){
		this.betfairAge = new Date();
		this.socket = socket;
		this.targets = {
			betfair:[-1,7]
		}
		this.interval;
		this.dom = document.createElement("div");
		this.dom.id = "betfairButton";
		this.dom.className = "infoBox";
		document.getElementsByTagName("body")[0].appendChild(this.dom);
		return this
	},
	Holder:function(dom,settings,betLogForm){
		this.fractional = true;
		this.settings = settings;
		this.dom = dom;
		this.betForm = betLogForm;
		this.sort = {
			field:"wTheo",
			direction:-1
		};
		this.filters = {
			odds:{
				on:false,
				values:[0,500]
			},
			anyTheo:{
				on:false,
				values:[0.00001,500]
			},
			wTheo:{
				on:false,
				values:[0,500]
			},
			ewWinTheo:{
				on:false,
				values:[0,500]
			},
			kelly:{
				on:true,
				values:[0,1]
			},
			race:{
				on:true,
				values:[20,60*20]
			}
			//race:0
		};
		this.horses = {};
		this.array = [];
		this.sliders = {};
		return this;
	},
	BetForm:function(dom,socket){
		this.betborder = dom;
		this.form = dom.children[1].children[0];
		this.inputs = this.$inputs();
		this.horse =  null;
		this.socket = socket;
		this.init();
		return this
	}
};
create.BetForm.prototype ={
	constructor:create.BetForm,
	setHolder:function(holder){
		this.holder = holder;
		return this
	},
	$:function(){
		return $(this.form)
	},
	$inputs:function(){
		return this.$().find(":input")
	},
	getIn:function(i){
		if(i){
			return this.inputs.eq(i)
		}else{
			return this.inputs
		}
	},
	setTitle:function(text){
		$(this.betborder).children().first().html(text)
		return this
	},
	show:function(){
		$(this.betborder).parent().show();
		return this
	},
	hide:function(){
		$(this.betborder).parent().hide();
		return this
	},
	init:function(){
		this.inputs.eq(3).change(this.selectChange.bind(this));
		this.inputs.eq(2).change(this.oddsChange.bind(this));
		this.$().submit(this.placeBet.bind(this));
		return this
	},
	oddsChange:function(e){
		var odds = (e) ? e.target.value : this.bookie.odds;
		var F = this.horse.getFair();

		var WinTheo = (odds-F[0])/F[0];
        //Kelly
        var kelly = this.holder.settings.kelly;
        var kellyPer = ((odds-F[0])/(odds-1))*1/F[0];
		var text = "<br>Fractional :"+ toFractional(odds);
		var recommendedKelly = Math.round(kellyPer*kelly);
		this.$().children().eq(2).html(text);
		this.getIn(1).attr("placeholder",recommendedKelly);
		this.getIn(5).val(recommendedKelly);
		return this
	},
	selectChange:function(e){
		console.log(e.target.value);
		if(!this.horse){
			return this
		}
		this.setBookie(e.target.value).oddsChange();
		return this
	},
	setHorse:function(horse){
		this.horse = horse;
		//set Name
		var name = horse.getName()
		this.setTitle(name).inputs.eq(0).val(name);
		// Add Bookies
		this.inputs.eq(3).children().remove();
		var list  = this.horse.filteredBookies();
		for(var i in list){
			this.inputs.eq(3).append($('<option>', {
			    value: i,
			    text: i
			}));
		};
		this.inputs.eq(3).append($('<option>', {
		    value: "other",
		    text: "other"
		}));
		var bookieName = this.inputs.eq(3).val();
		this.setBookie(bookieName);
		return this
	},
	setBookie:function(name){
		this.bookie = this.horse.getBookie(name);
		if(this.bookie){
			var kelly  = this.holder.settings.kelly;
			var recommendedKelly = Math.round(this.bookie.kelly*kelly);
			this.getIn(1).attr("placeholder",recommendedKelly);
			this.getIn(5).val(recommendedKelly);
			this.getIn(2).val(this.bookie.odds); 
		}else{
			this.bookie = "other"
		}
		return this
	},
	placeBet:function(e){
		var name = this.getIn(0).val();
		if(!this.getIn(1).val()){
			console.log("no value");
			return false
		}
		var bet ={
			name:name,
			place:[null,null,null,null,null,null],
			race:this.horse.getRaceData(),
			size: parseFloat(this.getIn(1).val()),
			ew: this.getIn(4)[0].checked,
			defaultKelly:parseFloat(this.getIn(5).val()),
			bookie:this.bookie,
			placedAt:new Date(),
			status:"ACTIVE",
			odds:parseFloat(this.getIn(2).val())
		};
		console.log(bet);
		this.socket.emit("manageBets",{
			task:"insert",
			bet:bet
		});
		this.hide();
		return false;
	}
}

create.Holder.prototype ={
	constructor:create.Holder,
	intSliders:function(){
		var filtersList = [
			{
			  name:"ewWinTheo",
			  title:"EW & Win Theo",
			  start:[0,0.6],
			  step:0.05,
			  range:{ 
			    'min': -0.4,
			    'max': 0.6
			  }
			},
			{
			  name:"wTheo",
			  title:"Win Theo",
			  start:[0,0.6],
			  step:0.05,
			  range:{ 
			    'min': -0.4,
			    'max': 0.6
			  }
			},
			{
			  name:"odds",
			  title:"Odds",
			  start:[1,31],
			  step:1,
			  range:{ 
			    'min': 0,
			    'max': 31
			  }
			},
			{
			  name:"anyTheo",
			  title:"Any Theo",
			  start:[0,0.5],
			  step:0.05,
			  range:{ 
			    'min': -0.5,
			    'max': 0.5
			  }
			},
			{
				name:"race",
				title:"Starting Mins from Now",
				start:[20,300],
				step:1,
				range:{ 
					'min': 0,
					'max': 301
				},
				onChange:function(self,name,range){
					return function(values,handle){
						values[0] = (values[0] == 0)? 0 : parseFloat(values[0]);
						values[1] = (values[1] == 301)? 24*60 : parseFloat(values[1]);
						self.setRaceTimeFilter(values);
						var id = "#race-Filter";
						$(id).html("+"+values[0]+" - "+values[1]+" mins" );
					}
				}
			},
			{
				name:"kelly",
				title:"Kelly",
				start:[0.000001,0.2],
				step:0.01,
				range:{ 
					'min': -0.05,
					'max': 0.21 
				},
				onChange:function(self,name,range){
					console.log(self);
					return function(values,handle){
						values[0] = (values[0] == -0.05)? -1 : parseFloat(values[0]);
						values[1] = (values[1]== 0.2)? 1 : parseFloat(values[1]);
						$("#kelly-Filter").html(values[0]+" - "+values[1]+"<br>(€"+ Math.round(values[0]*settings.kelly)+" - "+Math.round(values[1]*settings.kelly) +")");
						self.filters.kelly.values = values;
					}
				}
			}
		];
		var table = document.getElementById("filterTable");
		for(var i = 0; i < filtersList.length;i++){
			var one  =  filtersList[i];
			var row = table.insertRow(1);
			var sliderCell = row.insertCell(0);
			var infoCell = row.insertCell(0);
			infoCell.id = one.name+"-Info";
			infoCell.style.background = (this.filters[one.name].on) ? "lightgreen" : "lightsalmon";
			var self = this;
			$("#"+one.name+"-Info").click(function(event){
				console.log(event.target);
				var id = event.target.id.split("-")[0];
				self.filters[id].on = !self.filters[id].on;
				$("#"+id+"-Info")[0].style.background = (self.filters[id].on) ? "lightgreen" : "lightsalmon";
			});
			sliderCell.innerHTML = '<div id="'+one.name+'-Slider"></div>';
			infoCell.innerHTML = '<b>'+one.title+'</b><br><div id="'+one.name+'-Filter"></div>';
			var options = {
				connect: true, // Display a colored bar between the handles
				orientation: 'horizontal', // Orient the slider vertically
				behaviour: 'tap-drag', // Move handle on tap, bar is draggable
			}
			options.range =  one.range;
			options.step = one.step;
			options.start = one.start;
			this.sliders[name] = document.getElementById(one.name+"-Slider");
			var onChange = (one.onChange) ? one.onChange(this,one.name,one.range) : silderChange(this,one.name,one.range);
			noUiSlider.create(this.sliders[name],options);
			this.sliders[name].noUiSlider.on("update",onChange);
		}
		return this
		function silderChange(self,name,range){
			return function(values,handle){
				values[0] = (values[0] == range.min)? -999 : parseFloat(values[0]);
				values[1] = (values[1] == range.max)? 999 : parseFloat(values[1]);
				var id = "#"+name+"-Filter";
				$(id).html(values[0]+" - "+values[1] );
				self.filters[name].values = values;
			}
		}
	},
	input:function(horse){
		var name = horse.name;
		if(this.horses[name]){
			this.horses[name].updateHorse(horse);
		}else{
			var horseDiv = this.newDiv(name);
			var thisHorse =  new create.HorseBox(horse,horseDiv,this);
      		this.horses[name] = thisHorse;
      		var i = this.array.push(thisHorse) - 1;
      		this.horses[name].setSort(i);
		}
		this.get(name).setSort().position().filter();
		return this
	},
	newDiv: function (name){
		var iDiv = document.createElement('div');
		iDiv.id = name;
		iDiv.className = 'horse';
		this.dom.appendChild(iDiv);

		//overview
		var overview = document.createElement('div');
		overview.className = "overview";
		iDiv.appendChild(overview);

		//extra
		var extra = document.createElement('div');
		iDiv.appendChild(extra);
		extra.className = "extra";
		extra.style.display = "none";

		var footerOne = document.createElement('div');
		footerOne.className = "hfoot";
		iDiv.appendChild(footerOne);

		var footerTwo = document.createElement('div');
		footerTwo.className = "hfoot";

		iDiv.appendChild(footerTwo);
		hoverPrime();
		return iDiv
	},
	get:function(id){
		if(typeof id =="string"){
			return this.horses[id]
		}else if(typeof id == "number"){
			return this.array[id]
		}
		return null
	},
	order:function(field,direction){
		this.sort.field = field || this.sort.field;
		direction = (direction) ? direction : 1;
		this.sort.direction = direction;
		this.array.sort(dynamicSort(field,direction));
		return this.orderArrange(field,direction)
		function dynamicSort(property,direction) {
		    return function (a,b) {
		        var result = (a.sortField(property) < b.sortField(property) ) ? -1 : (a.sortField(property) > b.sortField(property)) ? 1 : 0;
		        return result * direction;
		    }
		}
	},
	orderArrange:function(field,direction){
		this.sort.field = field || this.sort.field;
		this.sort.direction = (direction) ? direction : -1;
		var self = this;
		oneByOne(0);
		function oneByOne(i){
			if(i < self.array.length){
				self.get(i).setSort(i).prepend(function(){
					i++;
					oneByOne(i);
				});
			}else{

			}
		}
		return this
	},
	setRaceTimeFilter:function(values){
		var start = new Date();
		var mins = start.getMinutes();
		start.setMinutes(values[0]+mins);
		var end = new Date().setMinutes(values[1]+mins);
		this.filters.race.values = [start,new Date(end)];
		return this
	}
}


create.HorseBox.prototype = {
	constructor:create.HorseBox,
	filter:function(callback){
		callback = callback || function(){};
		if(this.data.status =="REMOVED"){
			return this.hide(callback)
		}
		var list = this.bookiesInUse();
		if(!list){
			console.log("no bookies");
			return this.hide()
		}
		var myMax =  this.maxValues(list);
		//race Time
		if(this.holder.filters.race.on){
			var f = this.holder.filters.race.values;
			var value =  this.sortField("race");
			var pass = (f[0] <=  value && value  < f[1]);
			if(!pass){
				return this.hide(callback)
			}
		}
		// books
		if( !this.filterBook(myMax) ){
			return this.hide(callback)
		}
		return this.show(callback)
	},
	filterBook:function(book){
		var filtersList = ["odds","anyTheo","wTheo","ewWinTheo","kelly"];
		for(var i =0;i<filtersList.length;i++){
			var filter = filtersList[i];
			var f = this.holder.filters[filter].values;
			if(this.holder.filters[filter].on){
				if(filter == "anyTheo"){
					pass = (f[0] <=  book.wTheo && book.wTheo  < f[1]) || (f[0] <=  book.ewWinTheo && book.ewWinTheo  < f[1]) 
				}else{
					var value =  book[filter];
					var pass = (f[0] <=  value && value  < f[1]);
				}
				if(!pass){
					return false
				}
			}
		}
		return true
	},
	bookiesInUse:function(returnType){
		var bookieList = {};
		var list = this.holder.settings.bookieList;
		for(var b in this.data.oldBook){
			if(b=="BF"){
				// do nothing
			}else if(b=="FB" && list.search("BF") > -1){
				bookieList[b] = this.data.oldBook[b];
			}else if(list.search(b) > -1){
				bookieList[b] = this.data.oldBook[b];
			}
			
		}
		if( Object.keys(bookieList).length == 0){
			return null 
		}
		var output = (returnType == "odds") ? this.bookReshape(bookieList) : bookieList;
		return output
	},
	filteredBookies:function(returnType){
		var list = this.bookiesInUse();
		var output = {};
		for(var i in list){
			var book  =  list[i];
			if(this.filterBook(book)){
				output[i] = book;
			}
		}
		if( Object.keys(output).length == 0){
			return null 
		}
		output = (returnType == "odds") ? this.bookReshape(output) : output;
		return output
	},
	myFilterables:function(){
		var max =  this.maxValues();
		var fields = {
			name:this.data.name,
			race: new Date(this.data.race.raceStart),
			wTheo:max.wTheo,
			odds:max.odds,
			ewWinTheo:max.ewWinTheo,
			kelly:max.kelly
		};
	},
	setDom:function(dom){
		this.dom = dom;
		this.overview = dom.children[0];
		this.extra = dom.children[1];
		this.betFooter = dom.children[3];
		this.oddsFooter = dom.children[2];
		this.old = {
			overviewHTML:null,
			extraHTML:null
		};
		this.new = {
			overviewHTML:null,
			extraHTML:null
		};
		return this
	},
	append:function(callback){
		if($(this.dom).parent().children().last() == this.dom){
			return this
		}
		var self = this;
		this.hide(function(){
			$(self.dom).parent().append(self.dom);
			callback();
			self.show();
		});
		return this
	},
	prepend:function(callback){
		var self =  this;
		$(self.dom).parent().append(self.dom);
			callback();
			self.filter();
		return this
	},
	position:function(callback){
		callback = callback || function(){};
		var me = this.dom,
			right = $(me).next(),
			left =  $(me).prev(),
			myIndex = $(me).data("index"),
			myValue = $(me).data("value"),
			altL,
			altR;
		if(typeof myValue == "string"){
			altL = "aaa";
			altR = "zzz";
		}else{ 
			altL = myValue -1;
			altR = myValue + 1;
		}
		var lI = $(left).data("index") || myIndex -1,
			lV = $(left).data("value") || altL,
			rI = $(right).data("index")|| myIndex +1,
			rV = $(right).data("value") || altR;
		if(myValue <= rV && myValue >= lV){ // correct place
			return this.filter(callback);
		}
		this.hide();
		if(myValue < lV){
			left.data("index",myIndex);
			$(me).data("index",lI);
			$(left).before(me);
		}else{
			right.data("index",myIndex);
			$(me).data("index",rI);
			$(right).after(me);
		}
		return this.position(callback)
	},
	setSort:function(index,field,direction){
		direction = direction || this.holder.sort.direction || 1;
		index = index || this.sortValues.index;
		field = field || this.holder.sort.field;
		var value = this.sortField(field)
		value = (typeof value == "string")? value : value*direction;
		$(this.dom).data("value",value);
		$(this.dom).data("index",index);
		this.sortValues = {
			index:index,
			field:field,
			value:value,
			direction:direction
		};
		return this
	},
	getSortValue(){
		return this.sortValues.value;
	},
	hide:function(callback){
		callback = callback || function(){};
		if(this.visibile){
			this.visibile = false;
			$(this.dom).hide("fast",callback);
		}else{
			callback();
		}
		return this
	},
	show:function(callback){
		callback = callback || function(){};
		if(!this.visibile){
			this.visibile = true;
			$(this.dom).show("fast");
			callback();
		}else{
			callback();
		}
		return this
	},
	sortField:function(field){
		var list = this.bookiesInUse(),
			max =  this.maxValues(list),
			fields = {
			name:this.data.name,
			race: new Date(this.data.race.raceStart),
			wTheo:max.wTheo,
			odds:max.odds,
			ewWinTheo:max.ewWinTheo,
			kelly:max.kelly
		};
		if(field == "all"){
			return fields
		}else if(fields[field] !== undefined){
			return fields[field]
		}else{

			throw field +" is not a valid field";
		}	
	},
	maxValues:function(list){
		list = list || this.data.oldBook;
		var max = {};
		for(var el in list){
			var book = list[el];
			for(var l in book){
				max[l] = (max[l] < book[l] && book[l]!=null || !max[l]) ? book[l] : max[l];
			}
		}
		return max
	},
	getDom:function(){
		return this.dom
	},
	getJDom:function(){
		return $(this.dom)
	},
	updateHorse:function(horse){
		this.lastUpdated = horse.update;
		var newBook = this.bookReshape(horse.book);
		horse.oldBook = horse.book;
		horse.book = newBook;
		this.data = horse;
		return this
	},
	bookReshape:function(bookList){
	    var booksObj = {};
	    for(var bookieName in bookList){
			var book = bookList[bookieName];
			var odds = book.odds.toString();
			var ewTerms = book.places+"/"+book.ewDiv;
			if(booksObj[odds]==undefined){
				booksObj[odds]={};
			}
			if(booksObj[odds][ewTerms]==undefined){
				booksObj[odds][ewTerms]={
					odds:book.odds,
					kelly:book.kelly,
					wTheo:book.wTheo,
					ewTheo:book.ewTheo,
					ewWinTheo:book.ewWinTheo,
					name:[],
					places:book.places,
					url:[],
					ewDiv:book.ewDiv
				};
			}
		    booksObj[odds][ewTerms].name.push(book.name);
		    booksObj[odds][ewTerms].url.push(book.url);
	    }
	    return booksObj
	},
	isActive:function(){
		return this.data.status=="ACTIVE"
	},
	getFair:function(){
		var fair = this.data.place.map(function(ob){
			if(ob){
				return ob.fair
			}
			return null
		});
		return fair
	},
	getName:function(){
		return this.data.name
	},
	getRace:function(){
		return this.data.race.time+" "+this.data.race.venue
	},
	getBookie:function(bookieName){
		return this.data.oldBook[bookieName]
	},
	getRaceData:function(){
		return this.data.race
	},
	getBfAge:function(){
		var age = new Date() - new Date(this.data.updated.bf);
		return age
	},
	getOddsAge:function(){
		var age = new Date() - new Date(this.data.updated.ods);
		return age
	},
	makeOverview:function(){
		// overview Text
		var settings = this.holder.settings;
		var list = this.bookiesInUse(),
			max = this.maxValues(list);
		var oddsName = list[max.odds];
		var bookName = max.odds;
	    var bestKelly = Math.round(max.kelly*settings.kelly);
	    var maxOdds = (this.holder.fractional) ? toFractional(max.odds) : max.odds;
		var overviewHTML = "<b>"+this.data.name.capital()+"</b> @ "+maxOdds+"<br>Kelly : €"+bestKelly;
      	overviewHTML+= "<br>Theo : "+round(max.wTheo)+"%<br>";
     	overviewHTML+= "EW : "+round(max.ewWinTheo)+"%<br>";
    	var lineCount = -1;
     
	    for(var terms in oddsName){
	      var tempBook = oddsName[terms].name;
	      var tempUrl = oddsName[terms].url;
	      for(var b = 0; b < tempBook.length; b++ ){
	      lineCount ++;
	        if( this.filterBook(oddsName[terms]) ){
	          overviewHTML+=' <a href="'+tempUrl[b]+'" target="_blank">'+tempBook[b]+'</a> '
	        }
	        // isInterval is a prototype to make line breaks
	        if( lineCount.isInterval(5,1) ){
	          overviewHTML+="<br>";
	        }

	      } 
	    }
	    // colour Picking
		var bfIsUpdated = this.getBfAge() < 1000*100;
		if(bfIsUpdated){
			var green = 220 - ((max.wTheo/0.25)*255);
			if(max.wTheo < 0){ green=255 };
			if(green<0){ green = 0 };
			var overviewColor = "rgb("+Math.round(green)+", 255, "+Math.round(green)+")";
		}else{
			var overviewColor ="rgb(230,230,230)";
		}
		// make output
		this.new.overviewHTML = overviewHTML;
 		this.new.overviewColor = overviewColor;
	    return this
	},
	renderOverview:function(){
		var oldHTML = false;
		if(this.old.overviewHTML){
			oldHTML = this.old.overviewHTML;
		} 
		var newHTML = this.new.overviewHTML;
		if(oldHTML != newHTML){
			//console.log("render ",this);
			this.overview.innerHTML = newHTML;
			this.old.overviewHTML = newHTML;
			this.overview.style.background = this.new.overviewColor;
		}else{
			//console.log("dont render ",this);
		}
		return this
	},
	getOddsFooterColor:function(){
		var now = new Date();
	    var oldness = this.getOddsAge();
	    if(oldness > 1000*60*5){
	      color = "red";
	    }else if(oldness > 1000*60*2){
	      color = "yellow";
	    }else if(oldness > 1000*60*1){
	      color = "black";
	    }else{
	      color = "green";
	    }
	    return color
	},
	makeExtra:function(notused,bets){
		var settings = this.holder.settings;
		var h = this.data; // h is horse
		var extraHTML="<table><tr>";
	    extraHTML+="<td>Fair<br>W :"+h.place[0].fair;
	    for(var f = 1;f<h.place.length;f++){
	    	if(h.place[f]){
	    		extraHTML+="<br>"+[f+1]+" Places :"+h.place[f].fair;
	    	}	
	    }
	    extraHTML+="</td>";
	    extraHTML+="<td>";
	    extraHTML+=raceLink(h.race.time,h.race.venue)+"<br>Matched: €"+h.race.matchedVolume+"<br>Market:"+h.race.market;
	    function raceLink(time,venue){
	    	var link = "http://www.oddschecker.com/horse-racing/"+venue+"/"+time+"/winner";
	    	return '<a href="'+link+'" target="_blank">'+time+" - "+venue.capital()+'</a>'
	    }


	    extraHTML+='<br><div id="'+h.name+'But"><button onclick="loggingForm()">Record Bet</button></div></td>';
	    extraHTML+="</tr></table><br>";
	    extraHTML+="<table>";
	    extraHTML+="<thead><td>Ods</td><td>Plcs/Div</td><td>Bkies</td><td>Kelly</td><td>W</td><td>EW</td></thead>";
	    var bookList = this.bookiesInUse("odds");
	    for(var oddsName in bookList){

	      for(var terms in bookList[oddsName]){
	        var odds  = bookList[oddsName][terms];

	        //Loop through odds - no non positives
	        if( this.filterBook(odds) ){
	          var bookTrue = 0; 
	          //loop through books - no odds if no books
	          for(var b = 0; b < odds.name.length; b++ ){
	              //Start of the Row
	              if(bookTrue==0){
	              	var myOdds = (this.holder.fractional) ?  toFractional(odds.odds) : odds.odds;
	                extraHTML+="<tr>";
	                extraHTML+="<td>"+myOdds+"</td>";
	                extraHTML+="<td>"+terms+"</td>";
	                extraHTML+="<td>";
	              }
	              //bookie names
	              bookTrue = 1;
	              extraHTML+=' <a href="'+odds.url[b]+'" target="_blank">'+odds.name[b]+'</a> ';
	              if( b.isInterval(4,1) ){
	                extraHTML+="<br>";
	              }
	              //end of the Row  

	          }
	          if( bookTrue==1){
	            extraHTML+="</td>";
	            var Kelly = Math.round(odds.kelly*settings.kelly);
	            extraHTML+="<td>"+Kelly+"</td>";
	            extraHTML+="<td>"+round(odds.wTheo)+"</td>";
	            extraHTML+="<td>"+round(odds.ewWinTheo)+"</td>";
	            extraHTML+="</tr>";
	            bookTrue = 0;
	          }
	        }
	      }
	    }
	    extraHTML+="</table>";
		if( bets.hasHorse(h.name) ){
	      	extraHTML += bets.makeExtra(h.name);
	     	this.hasBets = true;
	    }else{
	    	this.hasBets = false;
	    }
	    this.new.extraHTML = extraHTML;
	    return this
	},
	renderFooters:function(){
		// odds Footer
		if(this.oddsFooter.style.background != this.getOddsFooterColor() ){
			this.oddsFooter.style.background = this.getOddsFooterColor();
		}
		// Bets Footer
		var newBetColor ='black';
		if( this.hasBets ){
			newBetColor = "red";
	    }
	    if(this.betFooter.style.background != newBetColor ){
			this.betFooter.style.background = newBetColor 
		}
		return this
	},
	renderExtra:function(){
		var oldHTML = false;
		if(this.old.extraHTML){
			oldHTML = this.old.extraHTML;
		} 
		//old = old.replaceAll("&amp;","&");
		var newHTML = this.new.extraHTML;
		if(oldHTML != newHTML){
			this.extra.innerHTML = newHTML;
			this.old.extraHTML = newHTML;
		}else{
			
		}
		return this
	},
	makeBetLogForm:function(){
		this.holder.betForm.setHorse(this).show();
		return this
	}
};



create.BetfairButton.prototype ={
	constructor:create.BetfairButton,
	int:function(){
		this.dom.addEventListener("click",this.sendPing.bind(this));
		this.interval = setInterval(this.update.bind(this),1000);
		return this
	},
	sendPing:function(){
		console.log("send ping for fresh info");
		this.socket.emit("pingBF",true);
		return this
	},
	targetColour:function(target,value){
		if(this.targets[target]){
			var target = this.targets[target]
			if(value > target[0] && value < target[1]){
				return "lightgreen"
			}else{
				return "lightsalmon"
			}
		}else{
			return "white"
		}
	},
	setText:function(text){
		this.dom.innerHTML = "<H4>"+text+"</H4>";
		return this
	},
	setColour:function(colour){
		this.dom.style.background = colour;
		return this
	},
	update:function(){
		var age = Math.round((new Date() - new Date(this.betfairAge))/100)/10;
		var colour = this.targetColour("betfair",age);
		return this.setText("BF Age: "+age).setColour(colour)
	},
	horseIn:function(updated){
		var newAge = new Date(updated.bf);
		if(newAge > this.betfairAge){
			this.betfairAge = newAge;
			this.update();
		}
		return this
	}
}
create.CoreInfo.prototype ={
	constructor:create.CoreInfo,
	setRotation:function(array){
		this.arr = array;
		return this
	},
	int:function(){
		var self = this;
		this.dom.addEventListener("click", 
			function(){
				self.update();
		});
		this.interval = setInterval(function(){
			self.update();
		},15*1000);
		return this
	},
	targetColour:function(target,value){
		if(this.targets[target]){
			var target = this.targets[target]
			if(value > target[0] && value < target[1]){
				return "lightgreen"
			}else{
				return "lightsalmon"
			}
		}else{
			return "white"
		}
	},
	setText:function(text){
		this.dom.innerHTML = "<H4>"+text+"</H4>";
		return this
	},
	setColour:function(colour){
		this.dom.style.background = colour;
		return this
	},
	update:function(){
		this.cycle ++;
		if(this.cycle == this.arr.length ){
			this.cycle = 0;
		}
		return this[this.arr[this.cycle]]()
	},
	winnings:function(){
		var info = this.betsObj.getResults();
		var winnings = info.winnings.total - info.cost.total;
		var text = "Won:"+winnings
		var colour = this.targetColour("winnings",winnings);
		return this.setText(text).setColour(colour)
	},
	bets:function(){
		var info = this.betsObj.getResults();
		var count = info.count.win + info.remaining.win;
		var text = "Placed Bets:"+count
		return this.setText(text)
	},
	cost:function(){
		var info = this.betsObj.getResults();
		var cost =  info.cost.total;
		var text = "Spend : €"+cost;
		return this.setText(text); 
	},
	remaining:function(){
		var info = this.betsObj.getResults();
		var count = info.remaining.win;
		var text = "Remaing Bets:"+count
		return this.setText(text);
	},
	outstandingValue:function(){
		var info = this.betsObj.getResults();
		var count = info.outstandingValue.total;
		var text = "Remaing Bets: €"+count
		return this.setText(text);
	},
	races:function(){
		return this.setText("Races Left: "+this.performance.activeRaces)
	},
	odds:function(){
		var age = Math.round((new Date() - new Date(this.performance.odds.minAge))/100)/10;
		var colour = this.targetColour("odds",age);
		return this.setText("Odds Age: "+age).setColour(colour)
	},
	betfair:function(){
		var age = Math.round((new Date() - new Date(this.performance.betfair.minAge))/100)/10;
		var colour = this.targetColour("betfair",age);
		return this.setText("BF Age: "+age).setColour(colour)
	},
	proxies:function(){
		var colour = this.targetColour("proxies",this.performance.proxies.activeProxies);
		return this.setText("Proxies: "+this.performance.proxies.activeProxies).setColour(colour)
	},
	passRate:function(){
		var passRate = Math.round(this.performance.proxies.passRate*100)
		var colour = this.targetColour("passRate",passRate);
		return this.setText("Pass Rate: "+passRate+"%").setColour(colour)
	},
	setPerformance:function(performance){
		this.performance = performance;
		return this
	}
}

create.Bets.prototype = {
	constructor:create.Bet,
	getHorseBets:function(name){
		return this.betsHorses[name]
	},
	hasHorse:function(name){
		return !!this.betsHorses[name]
	},
	getBetNumber:function(){
		return this.betsArray.length
	},
	getBets:function(){
		return this.betsArray
	},
	addBet:function(bet){	
		if(this.betsHorses[bet.name] == undefined){
			this.betsHorses[bet.name] = [];
		}
		this.betsArray.push(bet);
		this.betsHorses[bet.name].push(bet);
		return this
	},
	makeExtra:function(name){
		var total = 0;
		var extraHTML ="<b>Bets</b><br>";
		for(var p = 0; p<this.betsHorses[name].length; p++){
			total += this.betsHorses[name][p].size;
			extraHTML+=" <b>||||</b> €"+this.betsHorses[name][p].size+" | EW: "+this.betsHorses[name][p].ew+" | "+this.betsHorses[name][p].bookie.name+" "+this.betsHorses[name][p].bookie.odds+"<br>";
		}
		extraHTML+="<b>Total : € "+total+ "</b>";
		return extraHTML
	},
	removeDb:function(index,socket){
        var request = {
            task:"remove",
            remove:this.betsArray[index]._id
        }
        socket.emit('manageBets',request);
		return this
	},
	updateDb:function(index,fields,socket){
		this.betsArray[index].size = fields.size;
		this.betsArray[index].ew = fields.ew;
        var request = {
            task:"update",
            update:this.betsArray[index]._id,
            fields:fields
        }
        socket.emit('manageBets',request);
	},
	getFlattenedData:function(fields){
	    var tableData =[];
        for(var i =0; i < this.betsArray.length; i++){
            var d = this.betsArray[i]
            var possibleFields = {
                index:i,
                user:d.user||"projectIron",
                name:d.name,
                win:d.place[0],
                second:d.place[1],
                third:d.place[2],
                fourth:d.place[3],
                race:d.race.time+" "+d.race.venue,
                status:d.race.status,
                size:d.size,
                ew:d.ew,
                bookie:d.bookie.name || "other",
                odds:d.odds || d.bookie.odds,
                ewTerms:d.bookie.places+"/"+d.bookie.ewDiv,
                placedAt:d.placedAt.split("T")[1].split(".")[0]
            }
            if(fields){
            	console.log(fields);
            	var toPush ={
            		index:i
            	};
            	for(var j=0; j<fields.length;j++){
            		var field = fields[j];
            		if(possibleFields[field] !== undefined){
            			toPush[field] = possibleFields[field]
            		}
            	}
            }else{
            	var toPush = possibleFields;
            }
            tableData.push(toPush);
        }
        return tableData
	},
	getFormData:function(index){
		var bet = this.betsArray[index];
		var race = bet.race;
		var bookie = bet.bookie || null;
		var odds =  bet.odds || bookie.odds;
		var out = {
			name:bet.name.capital(),
			user:bet.user,
			size:bet.size,
			recommendedKelly:bet.defaultKelly,
			odds:odds,
			ew:bet.ew,
			winValue:parseFloat(bet.size)*parseFloat(odds),
			ewWinValue:parseFloat(bet.size)*(((parseFloat(odds)-1)/parseFloat(bookie.ewDiv))+1),
			winner:bet.place[0],
			place:null,
			horse:bet.status,
			status:race.status,
			race:race.time+" "+race.venue,
			bookie:bookie.name || "other",
			placedAt:bet.placedAt.split("T")[1].split(".")[0],
			placedDay:bet.placedAt.split("T")[0]
		};
		var placeResult = bet.place[ parseFloat(bookie.places) - 1] || "NA";
		out.place = placeResult;
		return out
	},
	getResults:function(){
		var output = {
			cost:{
				win:0,
				ew:0,
				total:0
			},
			winnings:{
				win:0,
				ew:0,
				total:0
			},
			count:{
				win:0,
				ew:0,
				total:0
			},
			remaining:{
				win:0,
				ew:0,
				total:0
			},
			outstandingValue:{
				win:0,
				ew:0,
				total:0
			}
		};
		for(var i=0; i<this.betsArray.length;i++){
			var bet = this.betsArray[i];
			var bookie = bet.bookie,
				race = bet.race;
			var size = parseFloat(bet.size);
			var odds =parseFloat(bet.bookie.odds);
			if(bet.status == "REMOVED"){
				output.count.win ++;
				output.cost.win += size;
				output.winnings.win += size;
				if(bet.ew){
					output.count.ew ++;
					output.cost.ew += size;
					output.winnings.ew += size;
				}
			}else if(bet.race.status == "CLOSED"){
				output.count.win ++;
				output.cost.win += size;
				output.winnings.win += odds*size*bet.place[0];
				if(bet.ew && bet.bookie.ewDiv){
					var place = bet.place[ parseFloat(bookie.places) -1 ] || 0;
					var ewOds = ((odds-1)/parseFloat(bet.bookie.ewDiv))+1;
					output.count.ew ++;
					output.cost.ew += size;
					output.winnings.ew += ewOds*size*parseFloat(place);
				}
			}else{
				output.outstandingValue.win += size;
				output.remaining.win ++;
				if(bet.ew){
					output.remaining.ew ++;
					output.outstandingValue.ew += size;
				}
			}
		}
		for(var el in output){
			output[el].total = output[el].win + output[el].ew
		}

		return output
	}
};
create.Settings.prototype = {
	constructor:create.Settings,
	updateKelly:function(kelly){
		if(typeof kelly ==="number"){
			this.kelly = kelly;
		}else{
			console.log("the New Kelly Was not a Number")
		}
		return this
	},
	updateBookieList:function(bookieList){
		if(typeof bookieList ==="string"){
			this.bookieList = bookieList;
		}else{
			console.log("the New Kelly Was not a String");
		}
		return this
	},
	selectRace:function(raceName){
		if(raceName =="all"){
			for(var race in this.races){
				this.races[race] = 1;
			}
		}else{
			for(var race in this.races){
				this.races[race] = 0;
			}
			this.races[raceName] = 1;
		}
		return this
	},
	isFilterRace:function(race){
		return this.races[race] === 1
	},
	addRace:function(raceName){
		if(this.races[raceName] === undefined){
			this.races[raceName] = 1;
		}
		return this
	},
	updateRaceSelect:function(){
		// check If the current list and the new list are teh same
		var tempOrderedArray =[];
		for(var race in this.races){
			tempOrderedArray.push(race);
		}
		tempOrderedArray.sort();
		var areArraysEqual = false;
		for(var i=0;i<tempOrderedArray.length;i++){ 
			if(tempOrderedArray[i] === this.racesOrderedArray[i]){
				areArraysEqual = true
			}else{
				areArraysEqual = false;
				i = tempOrderedArray.length + 1;
			} 
		}
		if(areArraysEqual){ // if they are the same do nothing
			return this	
		}else{
			this.racesOrderedArray = tempOrderedArray;
			while (this.raceSelect.firstChild) { // remove All select Options
    			this.raceSelect.removeChild(this.raceSelect.firstChild);
    		};
    		var all = document.createElement("option");
    		all.text = "All";
    		all.value = "all";
    		this.raceSelect.add(all);
    		for(var j = 0; j < this.racesOrderedArray.length; j++){ // add the select options in  the correct order
    			var option = document.createElement("option");
    			option.value = this.racesOrderedArray[j];
      			option.text = this.racesOrderedArray[j];
      			this.raceSelect.add(option);
    		}
		}
		return this
	},
	monitorDataAge: function(updated){
		var oddsStamp  = new Date(updated.ods);
		var bfStamp  = new Date(updated.bf);
		if( oddsStamp > this.updated.odds){
	      this.updated.odds = oddsStamp;
	    }
	    if(bfStamp  > this.updated.bf){
	      this.updated.bf = bfStamp;
	    }
	}
}


