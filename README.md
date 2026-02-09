# 个人音乐播放器

这是一个使用GitHub Pages托管的个人音乐播放器网站，仅供个人使用，不对外公开。

## 功能特性

- 🎵 简洁美观的音乐播放界面
- 📱 响应式设计，支持移动端和桌面端
- 🎚️ 完整的播放控制（播放/暂停、上一曲、下一曲）
- ⏰ 实时进度显示和控制
- 🔊 音量调节功能
- 📋 播放列表管理

## 如何使用

### 1. 添加音乐文件

1. 将你的音乐文件（支持MP3、WAV、OGG等格式）添加到 `music` 文件夹中
2. 编辑 `script.js` 文件，在 `playlist` 数组中添加歌曲信息：

```javascript
const playlist = [
    {
        title: "歌曲标题",
        artist: "艺术家",
        src: "music/your-song-file.mp3", // 音乐文件路径
        duration: "3:45" // 歌曲时长
    },
    // 添加更多歌曲...
];
```

### 2. 部署到GitHub Pages

1. 在GitHub上创建一个新的仓库（建议设置为私有仓库）
2. 将本项目的所有文件上传到GitHub仓库
3. 在仓库设置中启用GitHub Pages：
   - 进入仓库的 "Settings" 页面
   - 找到 "Pages" 选项
   - 在 "Source" 下拉菜单中选择 "main" 分支
   - 点击 "Save" 按钮
4. 等待几分钟后，你的音乐播放器网站就会通过GitHub Pages发布

### 3. 访问你的音乐播放器

- 打开浏览器，访问 GitHub Pages 生成的URL（格式：`https://your-username.github.io/your-repo-name`）
- 由于是私有仓库，只有你登录GitHub后才能访问

## 技术栈

- HTML5 - 页面结构
- CSS3 - 样式设计
- JavaScript - 交互功能
- GitHub Pages - 免费托管

## 注意事项

1. **版权问题**：请确保你拥有所添加音乐的版权，或仅使用合法的音乐文件
2. **文件大小**：GitHub Pages 对仓库大小有限制（通常为1GB），请合理控制音乐文件的大小和数量
3. **隐私保护**：虽然设置为私有仓库，但建议不要在网站中包含个人敏感信息
4. **访问速度**：GitHub Pages 的访问速度可能受网络环境影响，建议使用压缩后的音乐文件

## 本地测试

在部署到GitHub Pages之前，你可以在本地测试网站：

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器（如VS Code的Live Server扩展）运行

## 自定义

你可以根据自己的喜好修改：
- `style.css` - 更改播放器的外观样式
- `index.html` - 调整页面结构
- `script.js` - 添加更多功能或修改现有功能

享受你的个人音乐之旅！🎧