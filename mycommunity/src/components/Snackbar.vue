<template>
    <v-snackbar top v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
      {{ snackbarText }}
      <v-btn dark flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
</template>
<script>
export default {
    name:"snackbar",
    data(){
        return {
            snackbar:false,
            snackbarColor:"",
            snackbarText:"",
            snackbarTimeout:0,
        }
    },
    created() {
        const _this = this;
        this.bus.$on('hint', function(data) {
                _this.snackbar=!data.hide;
            _this.snackbarColor=data.color;
            _this.snackbarText=data.text;
            _this.snackbarTimeout=Number(data.timeout)||0;
        })
    }
}
</script>
