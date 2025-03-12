<template>
  <el-affix :offset="0">
    <div class="bigBoxMain">
      <div class="top">
        <div class="Icon">
            <div class="name">好工作</div>
            <p>haogongzou.com</p>     
        </div>
        <div class="tips">好工作，工作就是好！</div>
      </div>
    </div>

  </el-affix>
</template>

<style lang="scss" scoped>
.bigBoxMain{
 width: 100%;
 background-color: #fff;
}
.top{
  display: flex;
  max-width: 1400px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: #fff;
}
.Icon{
  margin-left: 20px;
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: white;
  .name{
    font-family: "阿里妈妈方圆体 VF Regular";
    font-size: 30px;
    font-weight: 700;
  }
}
@font-face {
  font-family: "阿里妈妈方圆体 VF Regular";
  src: url("../fontResource/KCBE3ffOGlMG.woff2") format("woff2"),
  url("../fontResource/KCBE3ffOGlMG.woff") format("woff");
}
.tips{
  line-height: 100px;
  margin-left: 20px;
  font-family: "阿里妈妈方圆体 VF Regular";
  font-size: 18px;
  font-weight: 600;
}
</style>