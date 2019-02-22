<template>
  <div class="login">
    <div class="bg">
      <canvas id="canvasBg" width="1440" height="900"></canvas>
    </div>
    <div class="enterSection">
      <Input prefix="ios-contact" placeholder="输入用户名" style="margin:10px 0;"/>
      <Input prefix="md-key" placeholder="输入密码"/>
      <Button type="primary" long style="margin:10px auto;">登录</Button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var q = document.getElementById("canvasBg");
    var s = window.screen;
    var width = (q.width = s.width);
    var height = q.height;
    var yPositions = Array(300)
      .join(0)
      .split("");
    var ctx = q.getContext("2d");
    function draw() {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "green"; /*代码颜色*/
      ctx.font = "10pt Georgia";
      yPositions.map(function(y, index) {
        var text = String.fromCharCode(1e2 + Math.random() * 330);
        var x = index * 10 + 10;
        q.getContext("2d").fillText(text, x, y);
        if (y > Math.random() * 1e4) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 10;
        }
      });
    }
    draw();
    setInterval(draw, 30);
  },
  methods: {}
};
</script>

<style scoped lang="less">
.login {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .bg {
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
  .enterSection {
    width: 400px;
    height: 300px;
    margin: 250px auto;
  }
}
</style>
