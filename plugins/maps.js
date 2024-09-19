import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'
import GmapCustomMarker from 'vue2-gmap-custom-marker'

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBBW2OEoZdzWA_9SAp42t3u_wi0gyLWjLc',
		libraries: 'places',
		region: 'VI',
		language: 'vi',
	},
})
Vue.component('MarkerCluster', GmapCluster)
Vue.component('GmapCustomMarker', GmapCustomMarker)
