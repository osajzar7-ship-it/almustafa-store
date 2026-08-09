let cart = [];
let currentCategory = 'all';

// إضافة منتج للسلة مع إظهار إشعار لطيف
function addToCart(title, price) {
    cart.push({ title: title, price: price });
    updateCart();
    showToast("تمت إضافة " + title + " إلى السلة ✅");
}

// إشعار أسفل الشاشة
function showToast(message) {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 2500);
}

// حذف منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// فتح وإغلاق النافذة
function toggleCart() {
    let modal = document.getElementById('cartModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// تحديث الواجهة
function updateCart() {
    let list = document.getElementById('cartItemsList');
    let total = 0;
    list.innerHTML = '';
    
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888;">السلة فارغة حالياً</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            list.innerHTML += `
                <div class="cart-item">
                    <span>${item.title} - <strong>${item.price} ل.س</strong></span>
                    <button class="btn-remove" onclick="removeFromCart(${index})">حذف ❌</button>
                </div>
            `;
        });
    }
    
    document.getElementById('cartCount').innerText = cart.length;
    document.getElementById('totalPrice').innerText = total;
    document.getElementById('modalTotal').innerText = total;
}

// إرسال الطلب عبر الواتساب مع حساب الخصم 5%
function sendOrder() {
    if (cart.length === 0) {
        alert("سلتك فارغة! أضف منتجات أولاً.");
        return;
    }
    
    let total = parseFloat(document.getElementById('modalTotal').innerText);
    let discount = total * 0.05; // حساب 5% خصم
    let finalTotal = total - discount;

    let msg = "مرحباً مكتبة المصطفى، أود طلب القائمة التالية عبر الموقع (مع خصم 5%):\n\n";
    cart.forEach((item, i) => msg += `${i + 1}. ${item.title} (${item.price} ل.س)\n`);
    
    msg += `\n----------------------`;
    msg += `\nالمجموع الأصلي: ${total} ل.س`;
    msg += `\nقيمة الخصم (5%): ${discount.toFixed(0)} ل.س`;
    msg += `\nالمجموع النهائي بعد الخصم: ${finalTotal.toFixed(0)} ل.س`;
    
    window.open("https://wa.me/963990835712?text=" + encodeURIComponent(msg));
}

// دالة تنظيف النصوص لجعل البحث ذكياً
function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .trim();
}

// البحث والفلترة الاحترافية
function filterProducts() {
    let search = normalizeText(document.getElementById('searchInput').value);
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let name = normalizeText(card.getAttribute('data-name'));
        let cat = card.getAttribute('data-category');
        
        let matchesCategory = (currentCategory === 'all' || cat === currentCategory);
        let matchesSearch = name.includes(search);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}
