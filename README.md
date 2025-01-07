# POE2 自动登录脚本 - 放课后

## 简介

本脚本用于实现 POE2 的自动登录功能。

## 前提条件

**Node.js 20 及以上版本**：确保在电脑上安装了 Node.js 20 或更高版本。[Node.js 安装教程](https://blog.csdn.net/m0_70470601/article/details/141436283)。

## 配置步骤

### 1. 配置电脑的浏览器

1. 电脑上，找到你用于玩游戏的浏览器快捷方式。
2. 右键点击快捷方式，选择“属性”。
3. 在“目标”输入框中，找到浏览器的路径，并在路径末尾添加以下内容：
   ```
   --remote-debugging-port=19222
   ```
   例如：
   ```
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=19222
   ```
4. 关闭所有浏览器窗口，然后通过修改后的快捷方式启动浏览器。
5. 克隆或下载此代码仓库。
6. windows 创建一个新的桌面！！必须做，这样可以使自动登陆不影响你的其他操作。 win+tab键，然后新建桌面，去第二个桌面执行后续操作
7. 打开命令行（cmd），进入代码目录。
8. 安装依赖：（首次运行执行）
   ```
   npm install
   ```
9. 全局安装 `pm2`：（首次运行执行）
   ```
   npm install pm2 -g
   ```
10. 打开autoLogin.js文件 修改代码中的 `webDevAddress`，将其改为浏览器调试地址。例如：
   ```
   http://127.0.0.1:19222
   ```
   修改你自己的账号密码
11. 运行脚本：（后续直接运行即可，务必在第二个windows桌面的cmd窗口内执行，执行完了就可以切回原桌面）
   ```
   npm run dev
   ```
12. 停止脚本：
   ```
   pm2 stop autoLogin
   ```
13. 重启脚本：
   ```
   pm2 restart autoLogin
   ```
14. 查看脚本日志：
   ```
   pm2 logs
   ```

## 运行效果

- 脚本会自动修改浏览器 cookie，以保持登录状态。

## 注意事项

- 如果你不熟悉 Node.js 的安装，可以参考 [Node.js 安装教程](https://blog.csdn.net/m0_70470601/article/details/141436283)。

## 代码说明

代码较为简单，主要功能是通过远程调试接口控制 A 电脑的浏览器，实现自动登录和保持登录状态。如果你对代码有疑问，可以使用 GPT 等工具进行解读。
