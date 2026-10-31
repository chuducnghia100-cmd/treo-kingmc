const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot dang chay 24/7!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingmc.net',
    username: 'TenAccCuaBan', // <-- Xóa chữ này đi và thay bằng TÊN ACC của bạn
    version: '1.16.5'
  });

  bot.on('spawn', () => {
    console.log('Bot da vao sanh cho!');
    setTimeout(() => { bot.chat('/login MatKhauCuaBan'); }, 2000); // <-- Thay bằng MẬT KHẨU game của bạn
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
        try { await bot.clickWindow(slotGoc, 0, 0); console.log('Da vao KingSMP!'); } 
        catch (err) { console.log(err); }
      }, 2000);
    }
  });

  bot.on('end', () => { setTimeout(createBot, 60000); }); // Tự vào lại sau 1 phút nếu server restart lúc 4h sáng
}
createBot();
