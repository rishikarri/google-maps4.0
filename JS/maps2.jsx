/******************* GOOGLE *******************/
//First set the mapOptions so when we make the Map constructor, it's easier to read : )
var mapOptions = {
	center: {lat: 39.8282, lng: -98.5795},
	zoom: 4
};

var map = new google.maps.Map(
	document.getElementById('map'),
	mapOptions
);

//let's build a function that creates a marker when we call it 
var markers = []
function createMarker(city){
	var markerLocation = {
		lat: city.lat,
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: markerLocation,
		map: map,
		title: city.city
	})
	markers.push(marker)
}
console.log(markers);



/******************* REACT *******************/
var GoogleCity = React.createClass({
	render: function(){
		return(
			<tr>
				<td className="city-name"> {this.props.cityObject.city} </td>
				<td className="city-rank"> {this.props.cityObject.yearRank} </td>
			</tr>
		)
	}
})

var Cities = React.createClass({
	getInitialState: function(){
		{/*massive array of all citie objects is now set to currCities */}
		return(
			{
				currCities: this.props.cities
			}
		)
	},
	handleInputChange: function(event){
		{/*need to filter the array as the user*/}
		var filteredCities = []; 
		var userInput = event.target.value; 
		

		this.props.cities.map(function(currentCity, index){
			

			if(currentCity.city.indexOf(userInput) !== -1){
				{/*The city matches one letter of what the user typed in */}
				filteredCities.push(currentCity);
			}
		})
		
		this.setState({
			currCities: filteredCities			
		})
	},
	
	render: function(){
		var cityRows = []; 
		this.state.currCities.map(function(currentCity, index){
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
			createMarker(currentCity)

		});

			return(
			<div>
				<form>
					<input type="text" onChange={this.handleInputChange} />
					<input type="submit" value="Update Markers" />
				</form>

				<table>
					<thead>
						<tr>
							<th>City Name</th>
							<th>City Rank</th>
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
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)