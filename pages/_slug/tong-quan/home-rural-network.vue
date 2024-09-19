<template>
	<div v-if="!loading">
		<div
			class="text-center text-[#44b97c] font-bold text-[18px] md:text-[20px] lg:text-[28px] mb-4"
		>
			MẠNG LƯỚI NÔNG THÔN THÔNG MINH
		</div>
		<div>
			<GmapMap
				:options="{
					zoomControl: false,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false,
					disableDefaultUi: false,
				}"
				:center="center"
				:zoom="zoom"
				style="height: 70vh; width: 100%"
			>
				<MarkerCluster>
					<GmapCustomMarker
						v-for="(m, index) in markers"
						:key="index"
						:marker="{
							lat: +m?.coordinates?.lat || 0,
							lng: +m?.coordinates?.long || 0,
						}"
					>
						<div>
							<img
								loading="lazy"
								:src="LOGO_APP"
								alt="thumbnail"
							/>
						</div>
					</GmapCustomMarker>
				</MarkerCluster>
			</GmapMap>
		</div>
	</div>
</template>

<script>
export default {
	ssr: false,
	name: 'HomeRuralNetwork',
	data() {
		return {
			ADMIN_ZOOM: 5.7,
			WARD_ZOOM: 14,
			LOGO_APP: require('@/assets/images/logo_map.png'),
			center: { lat: 16.463713, lng: 107.590866 },
			zoom: 5.7,
			markers: [],
			loading: false,
		}
	},
	async created() {
		this.loading = true
		await this.getListRuralNetworks()
		this.setCoordinateCenterMapFromMakerList()
		this.loading = false
	},
	methods: {
		showInformation(maker) {
			this.center = {
				lat: +maker?.coordinates?.lat ?? 0,
				lng: +maker?.coordinates?.long ?? 0,
			}
		},
		setZoomMap(size = this.WARD_ZOOM) {
			this.zoom = size
		},
		setCenterMap(coordinate = { lat: 16.463713, long: 107.590866 }) {
			this.center = {
				lat: +coordinate?.lat ?? 0,
				lng: +coordinate?.long ?? 0,
			}
		},
		isCurrentWard(wardId) {
			return this.$store.state.location.location.id === wardId
		},
		setCoordinateCenterMapFromMakerList() {
			const coordinateCenter = this.markers.find((maker) =>
				this.isCurrentWard(maker.ward_id)
			)?.coordinates
			coordinateCenter
				? this.setCenterMap(coordinateCenter)
				: this.setCenterMap()
			coordinateCenter
				? this.setZoomMap(this.WARD_ZOOM)
				: this.setZoomMap()
		},
		async getListRuralNetworks() {
			const response = await this.$store.dispatch(
				'ruralNetworks/ListRuralNetworks'
			)
			this.markers = response.data.entries.map((maker) => {
				return {
					...maker,
					url: maker.ward.slug,
				}
			})
		},
	},
}
</script>
