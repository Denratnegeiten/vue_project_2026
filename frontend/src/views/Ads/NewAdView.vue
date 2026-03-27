<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <h1 class="text--secondary mb-3 mt-3">Create Ad</h1>
        
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Ad Title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>

          <v-text-field
            label="Image URL"
            name="imageSrc"
            type="text"
            v-model="imageSrc"
          ></v-text-field>

          <v-textarea
            name="description"
            label="Ad Description"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
            class="mb-3"
          ></v-textarea>

          <v-switch v-model="promo" label="Add to Promo?"></v-switch>

          <v-btn
            :loading="loading"
            :disabled="!valid || loading"
            color="primary"
            @click="createAd"
          >
            Create Ad
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      title: "",
      description: "",
      imageSrc: "",
      promo: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          desc: this.description,
          promo: this.promo,
          src: this.imageSrc || "https://picsum.photos/400/300"
        }

        this.$store.dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/ads")
          })
          .catch(() => {})
      }
    }
  }
}
</script>