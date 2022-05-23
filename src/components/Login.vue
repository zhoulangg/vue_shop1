<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 label-width给文字占位 ref引用拿到表单实例对象 -->
      <!-- 
            * :relus：表单项属性prop必须是relus对象里的属性
            * ref：用来标识表单域
            * :model：表单项属性 v-model 必须是model对象里面的属性
       -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 导入font-class 需要加入iconfont  以及图标的名字 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-renyuanhuaxiang"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-shujujiami"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      //   登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户是否合法
        username: [
          // trigger: ‘blur’:失去焦点时触发
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: 'blur' },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮  重置登录表单
    resetLoginForm() {
      // 清空 loginFormRef 实例
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 登录效验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        // post请求方式 login请求地址  请求参数:为需要提交的表单数据
        // 返回一个promise 需要（只能修饰async）await简化这次操作  变成具体的响应对象
        // 返回的data属性重命名为 res
        const { data: res } = await this.$http.post("login", this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登陆失败');
        this.$message.success(); ('登录成功')

        console.log(res);

        // 登录之后的token，保存在客户端的 sessionStorage 中
        window.sessionStorage.setItem("token", res.data.token);
        // 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  },
}
</script>

<!-- 支持less语法格式  scoped  控制组件的样式 生效区间  当前组件内生效-->
<style lang="less" scoped>
.login_container {
  background: skyblue;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  //   创建（1~4个）圆角效果
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  //  transform: translateY(-50%) 实现元素垂直居中效果
  //  实现水平垂直居中
  //  通过position absolute和top 50%，结合transform产生效果。
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 120px;
    width: 120px;
    border: 1px solid seashell;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    //   根据父盒子的高度来占比
    transform: translate(-50%, -30%);
    background: seashell;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #ebe5e5;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  //   元素的总高度和宽度包含内边距和边框(padding 与 border)
  box-sizing: border-box;
}
.btns {
  display: flex;
  /* 从行尾位置开始排列 */
  justify-content: flex-end;
}
</style>