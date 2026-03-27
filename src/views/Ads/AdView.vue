<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5">
          <v-img
            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
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
        title: 'First ad',
        desc: 'Hello I am description',
        id: '123'
      }
    }
  }
}
</script>