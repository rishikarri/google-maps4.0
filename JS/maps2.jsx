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
}



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
	
	render: function(){
		var cityRows = []; 
		this.state.currCities.map(function(currentCity, index){
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
			createMarker(currentCity)

		});

			return(
			<div>
				<form>
					<input type="text" />
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