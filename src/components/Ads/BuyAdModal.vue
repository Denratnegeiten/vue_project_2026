<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props" variant="elevated">Buy</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title>
              <h1 class="text--secondary">Do you want to buy it?</h1>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                name="name"
                label="Your name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                name="phone"
                label="Your phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onCancel">Close</v-btn>
              <v-btn color="success" @click="onSave">Buy it!</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: ''
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        // Логику сохранения добавим в 18.3
        this.modal = false
      }
    }
  }
}
</script>