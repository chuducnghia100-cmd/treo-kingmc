const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot dang chay 24/7!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingmc.vn', // IP chuẩn của server KingMC
    username: 'TenAccCuaBan', // <-- BẠN CHỈ CẦN ĐỔI CHỮ NÀY THÀNH TÊN ACC TRONG GAME CỦA BẠN
    version: '1.16.5'
  });

  bot.on('spawn', () => {
    console.log('Bot da vao sanh cho!');
    // Tự động đăng nhập bằng mật khẩu nghia1111 sau 2 giây
    setTimeout(() => { bot.chat('/login nghia1111'); }, 2000); 
    // Tự động mở menu sau 6 giây
    setTimeout(() => { bot.chat('/menu'); }, 6000);
  });

  bot.on('windowOpen', async (window) => {
    const slots = window.slots;
    let slotGoc = -1;
    for (let i = 0; i < slots.length; i++) {
      const item = slots[i];
      if (item && item.displayName) {
        const clearName = item.displayName.replace(/§[0-9a-fk-or]/g, '').toLowerCase();
        if (clearName.includes('kingsmp')) { slotGoc = i; break; }
      }
    }
    if (slotGoc !== -1) {
      setTimeout(async () => {
        try { 
          await bot.clickWindow(slotGoc, 0, 0); 
          console.log('Da click vao KingSMP thanh cong!'); 
        } 
        catch (err) { console.log(err); }
      }, 2000);
    }
  });

  bot.on('end', () => { setTimeout(createBot, 60000); }); 
}
createBot();
