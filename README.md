# POE2 自动登录脚本

## 简介

本脚本用于实现 POE2 的自动登录功能。由于无法通过无头浏览器模式绕过 Cloudflare 的防护（CF盾），因此需要使用两台电脑或 Windows 虚拟机来运行此脚本。如果你不具备这些条件，可以关闭了。

## 前提条件

1. **两台电脑** 或 **Windows 虚拟机**：
   - **A电脑**：用于玩游戏的电脑。
   - **B电脑**：用于运行此脚本的电脑。

2. **Node.js 20 及以上版本**：确保在 B 电脑上安装了 Node.js 20 或更高版本。[Node.js 安装教程](https://blog.csdn.net/m0_70470601/article/details/141436283)。

## 配置步骤

### 1. 配置 A 电脑的浏览器

1. 在 A 电脑上，找到你用于玩游戏的浏览器快捷方式。
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

### 2. 配置 A 电脑的端口转发 netsh 或者 nginx，以下是netsh的配置方法

1. 打开 A 电脑的命令提示符（cmd）。
2. 获取 A 电脑的局域网ip，不会的请百度。获取到ip例如：`192.168.1.100`
2. 输入以下命令，将 `192.168.1.100` 替换为 A 电脑的局域网 IP 地址：
   ```
   netsh interface portproxy add v4tov4 listenaddress=192.168.1.100 listenport=19222 connectaddress=127.0.0.1 connectport=19222
   ```
   这将允许 B 电脑通过局域网访问 A 电脑的调试端口。

### 3. 配置 B 电脑

1. 在 B 电脑上，克隆或下载此代码仓库。
2. 打开命令行（cmd），进入代码目录。
3. 安装依赖：
   ```
   npm install
   ```
4. 全局安装 `pm2`：
   ```
   npm install pm2 -g
   ```
5. 打开autoLogin.js文件 修改代码中的 `webDevAddress`，将其改为 A 电脑的调试地址。例如：
   ```
   http://192.168.1.100:19222
   ```
   修改你自己的账号密码
6. 运行脚本：
   ```
   npm run dev
   ```

## 运行效果

- 脚本会自动修改 A 电脑的浏览器 cookie，以保持登录状态。

## 注意事项

- 如果你不熟悉 Node.js 的安装，可以参考 [Node.js 安装教程](https://blog.csdn.net/m0_70470601/article/details/141436283)。

## 代码说明

代码较为简单，主要功能是通过远程调试接口控制 A 电脑的浏览器，实现自动登录和保持登录状态。如果你对代码有疑问，可以使用 GPT 等工具进行解读。
