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

          <v-file-input
            label="Choose an image"
            v-model="imageFile"
            accept="image/*"
            prepend-icon="mdi-camera"
            required
            :rules="[v => !!v || 'Image is required']"
          ></v-file-input>

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
            :disabled="!valid || !imageFile || loading"
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
      imageFile: null,
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
      if (this.$refs.form.validate() && this.imageFile) {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('promo', this.promo)
        formData.append('image', this.imageFile)
        this.$store.dispatch("createAd", formData)
          .then(() => {
            this.$router.push("/ads")
          })
          .catch(err => {
            console.error("Ошибка при создании объявления:", err)
          })
      }
    }
  }
}
</script>