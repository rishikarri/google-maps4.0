// ********************************************************GOOGLE PORTION*****************************************************
var mapOptions = {
	center: {lat: 39.8282, lng: -98.5795},
	zoom: 4
};

var map = new google.maps.Map(
	document.getElementById('map'),
	mapOptions
)


// ********************************************************REACT PORTION*****************************************************
var GoogleCity = React.createClass({

	zoomToCity: function(){
		var newMapOptions = {
			center: {lat: this.props.cityObject.lat, lng: this.props.cityObject.lon},
			zoom: 8
		};
		var map = new google.maps.Map(
			document.getElementById('map'),
			newMapOptions
		)

	},
	getDirections: function(){
		console.log('hi');
	},
	render: function(){
		var cityName = this.props.cityObject.city;
		var cityState = this.props.cityObject.state; 
		var cityRank = this.props.cityObject.yearRank;
		return(
			<tr>
				<td>{cityName}</td>				
				<td>{cityRank}</td>
				<td> <button onClick={this.zoomToCity}>Zoom In! </button> </td>
				<td> <button onClick={this.getDirections}>Get Directions! </button> </td>
			</tr>
		)
	}
})
var markersArray = []
function dropMarker(cityObject){
	var markerLocation = {
		lat: cityObject.lat, 
		lng: cityObject.lon
	}

	var marker = new google.maps.Marker({
		position: markerLocation,
		map: map,
		animation: google.maps.Animation.DROP,
		title: cityObject.city
	})
	markersArray.push(marker);

}

//
console.log(markersArray);
var Cities = React.createClass({
	getInitialState: function(){
		return(
			{
				currentCities: this.props.citiesArray
			}
		)
		
	},

	handleInputChange: function(event){
		var filteredCities = []	
		var userInput = event.target.value.toLowerCase();

		this.props.citiesArray.map(function(currentCity, index){
			if(currentCity.city.toLowerCase().indexOf(userInput) !== -1){
				//we have a hit 
				filteredCities.push(currentCity)
			}	
		});

		this.setState({
			currentCities: filteredCities
		});

		this.updateMarkers()
		
	},
	updateMarkers: function(){
		markersArray.map(function(marker, index){
			marker.setMap(null)
		})
	},



	render: function(){
		{/*Go through each city in the cities array and pass a city object as a prop to GoogleCity*/}
		var cityRows = []
		var dogCatArray = ["dog", "Cat"]
		this.state.currentCities.map(function(currentCity, index){
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
			dropMarker(currentCity);
		})
		return(	
			<div>
				<form>
					<input type="text" placeholder="City Name" onChange={this.handleInputChange} />
				</form>

				<table>							
					<thead>
						<tr>
							<th>City Name </th>
							<th>City Rank </th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>
					
				</table>
			</div>
		)	
	}
	
})

ReactDOM.render(
	<Cities citiesArray={cities} />,
	document.getElementById('cities-container') 
)