<template >
  <el-row>
    <el-col :span="5" style=" border-right: 1px solid #0877e6;">
      <el-scrollbar height="400px">
        <div v-for="(item,index) in bigAddress" :key="item" class="bigSubject" @click="selectBig(index)" :class="{actived: chooseBig === index}">
          <p>{{ item }}</p>
          <p>></p>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="19">
      <div class="smallAddress">
        <p v-for="(item , index) in smallAddress[chooseBig]" @click="chooseOne(index)">{{ item }}</p>
      </div>
    </el-col>
  </el-row>
  <div class="selectBottom">
    <div class="hadChoose">
      <div class="result">已选：<p>{{ Select.length }}</p>/5</div>
      <div class="resultItems" v-for="(item , index) in Select">{{ item }}<p @click="cancelOne(index)">X</p></div>
    </div>
    <div class="selectBtns">
      <div class="cancel" @click="cancel()">取消</div>
      <div class="confirm" @click="confirm()">确定</div>
    </div>
  </div>
</template>
<script setup>
import {ref  ,defineEmits,watch } from 'vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['selectAdd','cancelAdd']);
const chooseBig = ref(0)
const chooseSmall = ref(0)
const bigAddress = ['热门','广东','湖北','陕西','四川','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广西','海南','贵州','云南','西藏','甘肃','青海','宁夏','新疆','港澳台']
const smallAddress = [
  ["北京","上海","广州","重庆","深圳","天津","武汉","西安","成都","大连","长春","沈阳","南京","济南","杭州","青岛","厦门","南昌","长沙","哈尔滨"],
  ["全广东","广州","深圳","惠州","佛山","韶关","珠海","汕头","江门","东莞","中山","肇庆","阳江","茂名","湛江","清远","潮州","揭阳","云浮","汕尾"],
  ["全湖北","武汉","黄石","十堰","宜昌","襄阳","鄂州","荆门","孝感","黄冈","咸阳","随州","恩施","天门市","仙桃市","潜江市"],
  ["全陕西","西安","西咸新区","铜川","宝鸡","咸阳","渭南","延安","汉中","榆林","安康","商洛"],
  ["全四川","成都","自贡","攀枝花","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","宜宾","广安","达州","巴中","眉山","雅安","资阳","阿坝","甘孜","凉山"],
  ["全吉林","长春","吉林市","四平","辽源","通化","白山","松原","白城","延边"],
  ["全黑龙江","哈尔滨","齐齐哈尔","鸡西","鹤岗","双鸭山","大庆","伊春","佳木斯","七台河","牡丹江","黑河","绥化","大兴安岭"],
  ["全江苏","南京","无锡","徐州","常州","苏州","南通","连云港","淮安","盐城","扬州","镇江","泰州","宿迁"],
  ["全浙江","杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"],
  ["全安徽","合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山","滁州","阜阳","宿州","巢湖","六安","亳州","池州","宣城"],
  ["全福建","福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"],
  ["全江西","南昌","景德镇","萍乡","九江","新余","鹰潭","赣州","吉安","宜春","抚州","上饶"],
  ["全山东","济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","菏泽"],
  ["全河南","郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店","济源"],
  ["全湖北","武汉","黄石","十堰","宜昌","襄阳","鄂州","荆门","孝感","黄冈","咸阳","随州","恩施","天门市","仙桃市","潜江市"],
  ["全湖南","长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","益阳","郴州","永州","怀化","娄底","湘西"],
  ["全广西","南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","百色","贺州","河池","来宾","崇左"],
  ["全海南","海口","三亚","三沙","儋州","五指山","琼海","文昌","万宁","东方","定安县","屯昌县","澄迈县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县"],
  ["全贵州","贵阳","六盘水","遵义","安顺","毕节","铜仁","黔西南","黔东南","黔南"],
  ["全云南","昆明","曲靖","玉溪","保山","昭通","丽江","普洱","临沧","楚雄","红河","文山","西双版纳","大理","德宏","怒江","迪庆"],
  ["全西藏","拉萨","日喀则","昌都","林芝","山南","那曲","阿里"],
  ["全甘肃","兰州","嘉峪关","金昌","白银","天水","武威","张掖","平昌","酒泉","庆阳","定西","陇南","临夏","甘南"],
  ["全青海","西宁","海东","海北","黄南","海南","果洛","玉树","海西"],
  ["全宁夏","银川","石嘴山","吴忠","固原","中卫"],
  ["全新疆","乌鲁木齐","克拉玛依","吐鲁番","哈密","昌吉","博尔塔拉","巴音郭楞","阿克苏","克孜勒苏柯尔克孜","喀什","和田","伊犁哈萨克","塔城","阿勒泰","石河子","阿拉尔","图木舒克","五家渠","北屯","铁门关","双河","可克达拉","昆玉"],
  ["港澳台","香港","澳门","台湾"]
]
const hadSelect = ref([])
const Select = ref([])
const props = defineProps({
  Citys: {
    type: Array,
    required: true, // 必传
    default: () => []
  }
});
watch(()=>props.Citys,
  (newArray)=>{
    Select.value = [...newArray]
    hadSelect.value = [...newArray]
  },
  {immediate: true ,deep: true}
)
const selectBig = (index) => {
  chooseBig.value = index
}
const chooseOne = (index) => {
  if(smallAddress[chooseBig.value][index]!=="全国") {
    if (Select.value.includes("全国")) {
      Select.value.splice(Select.value.indexOf("全国"), 1);
    }
  }
  if(Select.value.length >= 5) {
    ElMessage.error('工作地点最多只能选5个')
    return
  }
  if(Select.value.some(item => item === smallAddress[chooseBig.value][index])) {
    ElMessage.error('该工作地点已选择')
    return
  }
  chooseSmall.value = index
  const item = ref([])
  item.value = smallAddress[chooseBig.value][index]
  Select.value.push(item.value)
}
const cancelOne = (index) => {
  Select.value.splice(index, 1)
}
const cancel = () =>{
  Select.value=[...hadSelect.value];
  emit('cancelAdd')
}
const confirm = () =>{
  //将Select中的数据赋值给hadSelect，让hadSelect中的数据与Select中的数据保持一致
  let selectAddress = []
  if(Select.value.length === 0) {
    selectAddress.push("全国")
  }else{
    hadSelect.value = [...Select.value];
    Select.value.forEach(item => {
        selectAddress.push(item)
      })
  }
  emit('selectAdd',selectAddress)
}

</script>
<style lang="scss" scoped>
.el-row{
  width: 100%;
  margin-left: -16px;
}
.bigSubject{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  width: 86%;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  .items{
    width: 90%;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden; /* 隐藏超出的部分 */
    text-overflow: ellipsis; 
  }
}
.bigSubject:hover{
  background-color: #0877e614;
  p{
    color: rgba(0, 0, 255, 0.6);
  }
}
.actived{
  background-color: #0877e614;
}
.smallAddress{
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
  p{
    padding: 7px 15px;
    border-radius: 5px;
    background-color: #0877e614;
    cursor: pointer;
    margin-right: 30px;
    margin-bottom: 20px;
  }
  p:hover{
    color: rgba(0, 0, 255, 0.6);
  }
}
.selectBottom{
  margin-left: -2%;
  width: 104%;
  height: 150px;
  border-top: 1px solid #0877e6;
  .hadChoose{
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 15px;
    align-items: center;
    .result{
      display: flex;
      height: 30px;
      line-height: 30px;
      p{
      font-size: 22px;
      }
    }   
    .resultItems{
      display: flex;
      margin-left: 15px;
      padding: 8px 12px;
      background-color: #50a0ef2c;
      border: 1px solid #0877e666;
      color: #0877e6;
      font-size: 15px;
      border-radius: 5px;
      p{
        margin-left: 10px;
        padding: 2px 5px;
        font-size: 10px;
        margin-top: 0.5px;
        cursor: pointer;
      }
      p:hover{
        background-color: rgba(0, 106, 255, 0.426);
        border-radius: 50%;
        color: white;
      }
    }
  }
}
.selectBtns{
  display: flex;
  margin-top: 45px;
  margin-left: 73%;
  height: 50px;
  div{
    cursor: pointer;
  }
  .cancel{
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: #0877e6 solid 1.5px;
    color: #0877e6;
  }
  .cancel:hover{
    background-color: #0877e614;
    color: rgba(0, 0, 255, 0.6);
  }
  .confirm{
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 20px;
    background-color: #0877e6;
    border-radius: 5px;
    color: white;
  }
  .confirm:hover{
    background-color: #0264c6;
  }
}
.selectActive{
  border: #0877e6 solid 1.5px;
}
</style>