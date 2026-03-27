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
            <v-btn 
                text 
                @click="onCancel" 
                :disabled="localLoading"
            >
                Close
            </v-btn>
            <v-btn 
                color="success" 
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
            >
                Buy it!
            </v-btn>
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
        name: "",
        phone: "",
        localLoading: false
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
        this.localLoading = true
        this.$store.dispatch('createOrder', {
        name: this.name,
        phone: this.phone,
        adId: this.ad.id,
        userId: this.ad.userId
        })
        .finally(() => {
        this.localLoading = false
        this.name = ""
        this.phone = ""
        this.modal = false
        })
    }
    }
  }
}
</script>