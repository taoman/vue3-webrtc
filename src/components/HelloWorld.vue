<template>
  <div class="container">
		<p>流程：</p>
		<ul>
			<li class="btn" @click="jump('answer')">打开接收方页面</li>
			<li class="btn" @click="jump('offer')">打开发起方页面</li>
			<li>确认双方都已建立ws连接；</li>
			<li>发起方点击 开始通话 按钮。</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter();
  const jump = (target: string) => {
    const {href} = router.resolve({
      path:'/videoVoice',
      query:{
        target
      }
    })
    window.open(href,"_blank")
  };
</script>

<style lang="scss" scoped>
.container {
  width: 250px;
  margin: 100px auto;
  padding: 10px 30px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: #303133;
  .btn{
    color: blue;
  }
}
</style>
