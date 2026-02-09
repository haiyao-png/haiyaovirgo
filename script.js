// 音乐播放列表
const playlist = [
    {
        title: "我的纸飞机",
        artist: "GooGoo & 王之睿",
        src: "music/我的纸飞机 - GooGoo & 王之睿.mp3",
        duration: "0:00"
    }
];

// 加载音乐文件（简化版本）
function loadMusicFiles() {
    console.log('音乐文件加载完成:', playlist);
    return playlist;
}

// 更新歌曲时长
function updateSongDuration(songIndex, duration) {
    if (playlist[songIndex]) {
        playlist[songIndex].duration = duration;
        // 更新播放列表显示
        renderPlaylist();
    }
}

// DOM元素
const audioElement = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const volumeSlider = document.getElementById('volume-slider');
const playlistEl = document.getElementById('playlist');

let currentSongIndex = 0;
let isPlaying = false;

// 初始化播放器
function initPlayer() {
    // 先加载音乐文件
    loadMusicFiles();
    // 加载第一首歌曲
    if (playlist.length > 0) {
        loadSong(playlist[0]);
    }
    // 渲染播放列表
    renderPlaylist();
    // 添加事件监听器
    addEventListeners();
}

// 加载歌曲
function loadSong(song) {
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    audioElement.src = song.src;
    // 更新播放列表活动状态
    updatePlaylistActiveState();
    
    // 重置进度条
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    totalTimeEl.textContent = '0:00';
}

// 播放歌曲
function playSong() {
    isPlaying = true;
    audioElement.play();
    playBtn.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    `;
}

// 暂停歌曲
function pauseSong() {
    isPlaying = false;
    audioElement.pause();
    playBtn.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
}

// 播放上一首
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

// 播放下一首
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

// 更新进度条
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // 更新时间显示
        updateTimeDisplay(currentTime, duration);
    }
}

// 更新时间显示
function updateTimeDisplay(currentTime, duration) {
    // 格式化当前时间
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    
    // 格式化总时间
    if (duration) {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        const formattedDuration = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        totalTimeEl.textContent = formattedDuration;
        
        // 更新播放列表中的歌曲时长
        updateSongDuration(currentSongIndex, formattedDuration);
    }
}

// 设置进度条
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickX / width) * duration;
}

// 调节音量
function adjustVolume() {
    audioElement.volume = this.value;
}

// 渲染播放列表
function renderPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="song-name">${song.title} - ${song.artist}</span>
            <span class="song-duration">${song.duration}</span>
        `;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(playlist[currentSongIndex]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

// 更新播放列表活动状态
function updatePlaylistActiveState() {
    const playlistItems = playlistEl.querySelectorAll('li');
    playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 添加事件监听器
function addEventListeners() {
    // 播放/暂停按钮
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    
    // 上一首按钮
    prevBtn.addEventListener('click', playPrevSong);
    
    // 下一首按钮
    nextBtn.addEventListener('click', playNextSong);
    
    // 音频时间更新
    audioElement.addEventListener('timeupdate', updateProgress);
    
    // 音频元数据加载完成
    audioElement.addEventListener('loadedmetadata', () => {
        if (audioElement.duration) {
            updateTimeDisplay(0, audioElement.duration);
        }
    });
    
    // 音频结束
    audioElement.addEventListener('ended', playNextSong);
    
    // 进度条点击
    progressBar.addEventListener('click', setProgress);
    
    // 音量调节
    volumeSlider.addEventListener('input', adjustVolume);
}

// 初始化播放器
initPlayer();