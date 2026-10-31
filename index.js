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
    
    // 1. Tự động đăng nhập mật khẩu sau 3 giây
    setTimeout(() => { 
      bot.chat('/login nghia1111'); 
      console.log('Da go lenh login.');
    }, 3000); 

    // 2. Thử gõ lệnh /lobby hoặc /menu để mở rương sau 15 giây
    setTimeout(() => { 
      console.log('Dang mo menu bang cach su dung vat pham...');
      // Giả lập hành động chuột phải khi đang cầm đồng hồ ở sảnh chờ
      bot.activateItem(); 
    }, 15000);
  });

  // 3. Bộ lọc quét giao diện rương để click tự động vào KingSMP
  bot.on('windowOpen', async (window) => {
    console.log('Giao dien menu da mo thanh cong!');
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
    setTimeout(createBot, 10000); 
  }); 
}
createBot();
