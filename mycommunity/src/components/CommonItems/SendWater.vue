<template>
  <div>
    <v-card>
      <v-img contain :src="image" aspect-ratio="1.8"></v-img>

      <v-card-title primary-title>
        <div style="width:100%;height:270px">
          <h3 class="headline mb-0">{{title}}</h3>

          <!-- 送水 -->
            <v-data-table hide-actions flat :headers="headers" :items="brands">
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.brand }}</td>
                <td class="text-xs-center">{{ props.item.price }}</td>
              </template>
            </v-data-table>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="order_dialog=true">预约送水</v-btn>
      </v-card-actions>
    </v-card>

      
        <!-- 送水dialog -->
        <v-dialog v-model="order_dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">送水dialog</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Legal first name*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Legal middle name"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="order_dialog=false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="order_dialog=false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

  </div>
</template>
<script>
export default {
  name: "sendWater",
  data() {
    return {
      order_dialog: false,
      image: require("../../assets/images/songshui.jpg"),
      title: "送水服务",
      headers: [
        { text: "品牌", value: "brand", align: "center" },
        { text: "价格(元/桶)", value: "price", align: "center" }
      ]
    };
  },
  props:{
      brands:{
          type:Array,
          default(){return []}
      }
  }
};
</script>
