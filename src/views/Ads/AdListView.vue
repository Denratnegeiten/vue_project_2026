<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <h1 class="text--secondary mb-3 mt-3">My Ads</h1>

        <v-card 
          class="elevation-10 mb-3" 
          v-for="ad in ads" 
          :key="ad.id"
        >
          <v-row no-gutters>
            <v-col cols="4">
              <v-img
                :src="ad.src"
                height="160px"
              ></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.desc }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      ads: [
        {
          title: "First",
          desc: "First Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "1"
        },
        {
          title: "Second",
          desc: "Second Desc",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "2"
        }
      ]
    }
  }
}
</script>