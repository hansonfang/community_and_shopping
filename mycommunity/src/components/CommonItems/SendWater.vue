<template>
  <div>
    <v-card>
      <v-img
        contain
        :src="image"
        aspect-ratio="1.8"
      ></v-img>

      <v-card-title primary-title>
        <div style="width:100%;height:270px">
          <h3 class="headline mb-0">{{title}}</h3>

          <!-- 送水 -->
          <v-data-table
            hide-actions
            flat
            :headers="headers"
            :items="brands"
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td class="text-xs-center">{{ props.item.brand }}</td>
              <td class="text-xs-center">{{ props.item.price }}</td>
            </template>
          </v-data-table>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          @click="order_dialog=true"
        >预约送水</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 送水dialog -->
    <v-dialog
      v-model="order_dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title class="text-xs-center">
          <span class="headline">预约送水</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  v-model="selectedValue"
                  :items="waterBrandPrice"
                  attach
                  chips
                  label="选择品牌"
                  multiple
                >

                </v-select>
                <v-list>
                  <v-list-tile
                    v-for="(item,index) in selectedInfo"
                    :key="index"
                  >
                    <v-list-tile-content>{{item.brand}} - {{item.price}} * {{item.count}}</v-list-tile-content>
                    <v-list-tile-action>
                      <Count v-model="item.count" />
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="电话"
                  required
                >{{telephone}}</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="地址"
                  required
                >
                  {{address}}
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="expectedDate"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="100px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="expectedDate"
                    label="期望上门日期"
                    prepend-icon="fa-calendar-week"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="expectedDate"
                    no-title
                    scrollable
                      locale="zh-cn"
                    @input="$refs.menu.save(expectedDate);dateMenu=false"
                  >

                  </v-date-picker>
                </v-menu>
              </v-flex>

              <!-- 时间 -->
              <v-flex xs6>
                <v-menu
                  ref="timeMenu"
                  v-model="timeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="expectedTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    v-model="expectedTime"
                    label="期望上门时间"
                    prepend-icon="fa-clock"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timeMenu"
                    v-model="expectedTime"
                    full-width
                    format="24hr"
                    @click:minute="$refs.timeMenu.save(expectedTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  solo
                  name="repairText"
                  label="备注信息"
                  v-model="orderText"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            flat
            @click="order_dialog=false"
          >关闭</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="sendWaterSubmit()"
          >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
import Count from "@/components/Tool/Count";
export default {
  name: "sendWater",
  components: {
    Count
  },
  data() {
    return {
      order_dialog: false,
      image: require("@/assets/images/songshui.jpg"),
      title: "送水服务",
      headers: [
        { text: "品牌", value: "brand", align: "center" },
        { text: "价格(元/桶)", value: "price", align: "center" }
      ],
      selectedValue: [],
      selectedInfo: [],
      orderText: "", //预约送水备注信息
      address: "",
      telephone: "",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: null,
      dateMenu: false,
      timeMenu: false
    };
  },
  props: {
    brands: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    this.brands.forEach(element => {
      element["count"] = 0;
    });
  },
  computed: {
    waterBrandPrice() {
      return this.brands.map(value => `${value.brand} - ${value.price}`);
    }
  },
  methods: {
    sendWaterSubmit() {}
  },
  watch: {
    selectedValue() {
      const temp = [];
      this.selectedValue.forEach(value => {
        const arr = value.split(" -");
        temp.push({ brand: arr[0], price: arr[1], count: 0 });
      });
      this.selectedInfo = temp;
    }
  }
};
</script>
<style scoped>

</style>
