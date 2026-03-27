<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <v-img
            height="400px"
            :src="ad.src"
            cover
          ></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <add-edit-ad-modal :ad="ad"></add-edit-ad-modal>
            <v-btn color="primary" variant="elevated">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from '@/components/Ads/EditAdModal.vue'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    }
  },
  components: {
    addEditAdModal: EditAdModal
  }
}
</script>