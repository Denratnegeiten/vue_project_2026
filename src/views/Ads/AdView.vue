<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
            :src="ad.src"
            height="300px"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning" variant="text">Edit</v-btn>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      ad: {
        title: "First ad",
        desc: "This is a detailed description of the first ad. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        promo: true,
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        id: "1"
      }
    }
  }
}
</script>