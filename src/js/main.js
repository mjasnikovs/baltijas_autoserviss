/* global
google
*/

const initMap = () => {
	const myLocation = new google.maps.LatLng(56.6332034, 23.2813948)

	const mapOptions = {
		center: myLocation,
		zoom: 15
	}

	const marker = new google.maps.Marker({
		position: myLocation,
		title: 'Baltijas autoserviss'
	})

	const map = new google.maps.Map(document.getElementById('map-container'), mapOptions)

	marker.setMap(map)
}

google.maps.event.addDomListener(window, 'load', initMap)
