// 心情只存放在当前浏览器；本页面不会发送网络请求。
const STORAGE_KEY = 'pinghejieshi-mood';
const sitButton = document.querySelector('#sit-button');
const welcome = document.querySelector('#welcome');
const moodForm = document.querySelector('#mood-form');
const moodInput = document.querySelector('#mood');
const saveStatus = document.querySelector('#save-status');

function showStatus(message, isError = false) {
  saveStatus.textContent = message;
  saveStatus.classList.toggle('is-error', isError);
}

sitButton.addEventListener('click', () => {
  welcome.hidden = false;
  sitButton.setAttribute('aria-expanded', 'true');
});

// 部分隐私模式或浏览器设置会禁止本地存储，所以读写都需要处理失败。
try {
  const savedMood = localStorage.getItem(STORAGE_KEY);
  if (savedMood !== null) {
    moodInput.value = savedMood;
    showStatus('已找回你上次保存的心情。');
  }
} catch {
  showStatus('当前浏览器无法读取本地记录。你仍可以在这里写下心情。', true);
}

moodInput.addEventListener('input', () => {
  showStatus('内容已修改，点击「保存心情」后才会保存。');
});

moodForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    // 保存空白内容也有效，方便清空旧记录。
    localStorage.setItem(STORAGE_KEY, moodInput.value);
    showStatus(moodInput.value.trim() ? '已保存，愿此刻的你被温柔接住。' : '已保存为空白，旧记录已清空。');
  } catch {
    showStatus('保存未成功：浏览器可能禁用了本地存储或空间不足。请先复制文字留存。', true);
  }
});
