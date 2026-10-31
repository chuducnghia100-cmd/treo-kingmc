const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot dang chay 24/7!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'kingmc.vn',
    username: 'Nghz',
    version: '1.21.11'
  });

  bot.on('spawn', () => {
    console.log('Bot da vao sanh cho!');
    
    // 1. Tự động đăng nhập mật khẩu sau 3 giây khi vừa vào sảnh
    setTimeout(() => { 
      bot.chat('/login nghia1111'); 
      console.log('Da go lenh login.');
    }, 3000); 

    // 2. Đợi han 15 giây (vượt qua mức 10s cua server) rồi mới gõ /menu
    setTimeout(() => { 
      console.log('Da qua 10s cho, dang mo menu server...');
      bot.chat('/menu'); 
    }, 18000); // 3s đăng nhập + 15s chờ = 18 giây tổng cộng
  });

  // 3. Bộ lọc quét giao diện rương để click tự động vào KingSMP
  bot.on('windowOpen', async (window) => {
    console.log('Giao dien menu da mo!');
    const slots = window.slots;
    let slotGoc = -1;
    
    for (let i = 0; i < slots.length; i++) {
      const item = slots[i];
      if (item && item.displayName) {
        const clearName = item.displayName.replace(/§[0-9a-fk-or]/g, '').toLowerCase();
        if (clearName.includes('kingsmp')) { 
          slotGoc = i; 
          break; 
        }
      }
    }
    
    if (slotGoc !== -1) {
      setTimeout(async () => {
        try { 
          await bot.clickWindow(slotGoc, 0, 0); 
          console.log('Da click vao nut KingSMP thanh cong!'); 
        } 
        catch (err) { console.log('Loi click menu: ', err); }
      }, 2000);
    } else {
      console.log('Khong tim thay nut KingSMP trong menu.');
    }
  });

  // 4. Cứ 15 giây cho bot tự nhảy một cái để chống bị tính AFK đá ra ngoài
  bot.on('login', () => {
    setInterval(() => {
      if (bot && bot.setControlState) {
        bot.setControlState('jump', true);
        setTimeout(() => { bot.setControlState('jump', false); }, 500);
      }
    }, 15000);
  });

  bot.on('end', () => { 
    console.log('Mat ket noi, dang tien hanh vao lai...');
    setTimeout(createBot, 10000); // Thử kết nối lại sau 10 giây
  }); 
}
createBot();
