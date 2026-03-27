<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="ad" class="mt-5" elevation="10">
          <v-img
            height="400px"
            :src="ad.src"
            cover
          ></v-img>
          <v-card-text>
            <h1 class="text-primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <modal-dialog :ad="ad" v-if="isOwner"></modal-dialog>
            <buy-ad-modal :ad="ad"></buy-ad-modal>
          </v-card-actions>
        </v-card>
        
        <div v-else class="text-center mt-5">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from '../../components/Ads/EditAdModal.vue'

export default {
  props: ['id'],
  computed: {
    ad() {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    isOwner() {
      if (!this.$store.getters.user) return false;
      if (!this.ad) return false;
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    'modal-dialog': EditAdModal
  }
}
</script>