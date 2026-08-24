// ==========================================
// الإعدادات والمتغيرات الأساسية
// ==========================================
let cart = [];
const DISCOUNT_RATE = 0.05;      // نسبة الخصم (5%)
const DELIVERY_FEE = 80;         // رسوم التوصيل داخل قباسين
const FREE_DELIVERY_LIMIT = 350; // الحد الأدنى للتوصيل المجاني
const WHATSAPP_NUMBER = "963990835712"; // استبدل هذا الرقم برقم واتساب المكتبة بدون (+)

// ==========================================
// 1. إضافة منتج إلى السلة
// ==========================================
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCartUI();
    showToast(`تمت إضافة "${name}" إلى السلة!`);
}

// ==========================================
// 2. حذف منتج من السلة
// ==========================================
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ==========================================
// 3. تحديث الواجهة والحسابات (الخصم + التوصيل)
// ==========================================
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalPrice = document.getElementById('totalPrice');
    const modalTotal = document.getElementById('modalTotal');
    const cartItemsList = document.getElementById('cartItemsList');

    // حساب إجمالي عناصر السلة
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // حساب قيمة الخصم (5%)
    const discountAmount = rawTotal * DISCOUNT_RATE;
    const totalAfterDiscount = rawTotal - discountAmount;
    
    // حساب رسوم التوصيل داخل قباسين
    let currentDelivery = 0;
    if (rawTotal > 0) {
        currentDelivery = (rawTotal < FREE_DELIVERY_LIMIT) ? DELIVERY_FEE : 0;
    }

    // المجموع النهائي المطلوب
    const finalTotal = totalAfterDiscount + currentDelivery;

    // تحديث الأرقام بالشريط العائم والنافذة
    cartCount.innerText = totalItems;
    totalPrice.innerText = Math.round(finalTotal).toLocaleString();
    modalTotal.innerText = Math.round(finalTotal).toLocaleString();

    // تفريغ القائمة قبل إعادتها
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 15px 0;">السلة فارغة حالياً</p>';
        return;
    }

    // بناء العناصر في النافذة المنبثقة
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <strong style="color: var(--navy-dark);">${item.name}</strong>
                <div style="font-size:0.85rem; color: var(--text-muted); margin-top:2px;">
                    ${item.price} ل.س × ${item.quantity} = ${item.price * item.quantity} ل.س
                </div>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItemsList.appendChild(itemElement);
    });

    // إضافة ملخص الخصم والتوصيل في السلة
    const summaryDiv = document.createElement('div');
    summaryDiv.style.cssText = "margin-top:15px; font-size:0.88rem; color:#475569; border-top:1px dashed #e2e8f0; padding-top:10px;";
    
    let deliveryText = currentDelivery === 0 
        ? '<strong style="color:green;">مجاني 🎉</strong>' 
        : `${DELIVERY_FEE} ل.س`;

    let tipMessage = '';
    if (rawTotal < FREE_DELIVERY_LIMIT) {
        const remaining = FREE_DELIVERY_LIMIT - rawTotal;
        tipMessage = `<small style="color:#d97706; display:block; margin-top:4px;">💡 أضف منتجات بـ ${remaining} ل.س للحصول على توصيل مجاني في قباسين!</small>`;
    }

    summaryDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>خصم الموقع (5%):</span>
            <span style="color:green;">-${Math.round(discountAmount)} ل.س</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
            <span>توصيل قباسين:</span>
            <span>${deliveryText}</span>
        </div>
        ${tipMessage}
    `;
    cartItemsList.appendChild(summaryDiv);
}

// ==========================================
// 4. تصفية المنتجات حسب الأقسام
// ==========================================
function filterCategory(category, button) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// 5. البحث في المنتجات
// ==========================================
function filterProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = (card.getAttribute('data-name') || '').toLowerCase();
        const cardTitle = card.querySelector('.card-title').innerText.toLowerCase();
        const cardDesc = card.querySelector('.card-desc').innerText.toLowerCase();

        if (cardName.includes(searchQuery) || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// 6. فتح وإغلاق السلة المنبثقة
// ==========================================
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// ==========================================
// 7. إشعار التنبيه السريع (Toast)
// ==========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { 
        toast.classList.remove('show'); 
    }, 2500);
}

// ==========================================
// 8. تجهيز الطلب وإرساله إلى الواتساب
// ==========================================
function sendOrder() {
    if (cart.length === 0) {
        alert('السلة فارغة! يرجى إضافة منتجات أولاً.');
        return;
    }

    let message = "مرحباً مكتبة المصطفى 👋\nأرغب في تأكيد الطلب مع خدمة التوصيل في قباسين:\n\n";
    
    let rawTotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        rawTotal += itemTotal;
        message += `${index + 1}. *${item.name}*\n   العدد: ${item.quantity} | السعر: ${itemTotal} ل.س\n`;
    });

    const discountAmount = rawTotal * DISCOUNT_RATE;
    const totalAfterDiscount = rawTotal - discountAmount;
    const deliveryFee = (rawTotal < FREE_DELIVERY_LIMIT) ? DELIVERY_FEE : 0;
    const finalTotal = totalAfterDiscount + deliveryFee;

    message += `\n------------------------------`;
    message += `\n💰 المجموع قبل الخصم: ${rawTotal} ل.س`;
    message += `\n🎁 خصم الموقع (5%): -${Math.round(discountAmount)} ل.س`;
    message += `\n🚚 أجور التوصيل (قباسين): ${deliveryFee === 0 ? 'مجاني' : deliveryFee + ' ل.س'}`;
    message += `\n✅ *الإجمالي النهائي: ${Math.round(finalTotal)} ل.س*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
