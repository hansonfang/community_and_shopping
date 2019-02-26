<template>
  <div class="count">
    <div class="">
      <v-btn
        fab
        flat
        small
        @click="increase()"
      >
        <v-icon>fa-plus</v-icon>
      </v-btn>
    </div>
    <v-text-field
      class="number-input"
      @input="updateVal($event.target.value)"
      :value="value"
      type="number"
    ></v-text-field>
    <div class="">
      <v-btn
        fab
        flat
        small
        @click="decrease()"
      >
        <v-icon>fa-minus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "count",
  data() {
    return {
        number:0,
    };
  },
  model:{
      prop:"value",
      event:"update"
  },
  props: {
    value: {
      type: Number,
      default:0,
    },
    max: {
      type: Number,
      default: 5
    }
  },
  mounted(){
      this.number=this.value;
  },
  methods: {
    increase() {
      if (this.number < this.max) this.number++;
    },
    decrease() {
      if (this.number > 0) this.number--;
    },
    updateVal(val) {
      this.$emit("update", val);
    }
  },
  watch:{
      number(val){
          this.$emit("update",val);
      }
  }
};
</script>
<style scoped>
.d-none {
  display: none;
}
.count {
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-text-field {
  width: 2vw;
}

>>> .number-input input[type="number"] {
  -moz-appearance: textfield;
}
>>> .number-input input::-webkit-outer-spin-button,
>>> .number-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

