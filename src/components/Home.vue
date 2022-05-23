<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/qq.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 左侧边栏菜单区域 -->
        <!-- active-text-color 激活文本的名字 -->
        <!-- unique-opened = true只保持一个子菜单的展开-->
        <!-- collapse="true"  表示显示菜单折叠 -->
        <!-- collapse-transition="fakse"是否开启折叠动画 -->
        <!-- default-active 激活当前菜单文字高亮 -->
        <el-menu
          :default-active="activePath"
          unique-openeds
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
        >
          <!-- 一级菜单  :index 自己的Index值-->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- router 激活导航时 以index 作为 path 进行路由跳转-->
            <el-menu-item
              @click="saveNavState('/' + subItem.path)"
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      //   左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-renyuanhuaxiang',
        '103': 'iconfont icon-shujujiami',
        '101': 'iconfont icon-renyuanhuaxiang',
        '102': 'iconfont icon-shujujiami',
        '145': 'iconfont icon-renyuanhuaxiang'
      },
      isCollapse: false,
      //   被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList(),
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      //   清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data
      console.log(res);
    },
    // 点击按钮，切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  //   与交叉轴两端对齐，轴线之间的间隔平均分布。
  justify-content: space-between;
  padding-left: 0;
  //   横向居中对齐弹性盒的各项 <div> 元素：
  align-items: center;
  //   纵向居中对其
  > div {
    display: flex;
    align-items: center;
  }
  span {
    color: #3c81dc;
    margin-left: 15px;
  }
  img {
    height: 50px;
    width: 50px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  // 字体间距
  letter-spacing: 0.2em;
  // 鼠标变成手型指标
  cursor: pointer;
}
</style>