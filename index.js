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
    
    // 1. Tự động đăng nhập mật khẩu sau 2 giây
    setTimeout(() => { 
      bot.chat('/login nghia1111'); 
      console.log('Da go lenh login.');
    }, 2000); 

    // 2. Đợi qua 5s quy định, tự chuyển sang ô số 5 trên hotbar và bấm chuột phải mở Menu
    setTimeout(() => { 
      console.log('Da qua 5s cho. Dang chuyen sang o hotbar so 5...');
      
      // Trong code, các ô hotbar đếm từ 0 đến 8 (Ô 1 là số 0, ô 5 là số 4)
      bot.setQuickBarSlot(4); 
      
      setTimeout(() => {
        console.log('Dang bam chuot phai dong ho...');
        bot.activateItem(false); // Giả lập bấm chuột phải tay chính để mở menu rương
      }, 1000);

    }, 8000); // Tổng thời gian chờ 8 giây sau khi vào sảnh
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
          console.log('Da click vao nut KingSMP thanh cong! Bot da vao game.'); 
        } 
        catch (err) { console.log('Loi click menu: ', err); }
      }, 2000);
    }
  });

  // 4. Cứ 15 giây cho bot tự nhảy một cái để chống bị tính AFK đá ra ngoài sảnh
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
