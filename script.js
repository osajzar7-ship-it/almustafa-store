let cart = [];
let currentCategory = 'all';

// إضافة منتج للسلة مع إظهار إشعار لطيف
function addToCart(title, price) {
    cart.push({ title: title, price: price });
    updateCart();
    showToast("تمت إضافة " + title + " إلى السلة ✅");
}

// إشعار سفل الشاشة
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

// إرسال للواتساب
function sendOrder() {
    if (cart.length === 0) {
        alert("سلتك فارغة! أضف منتجات أولاً.");
        return;
    }
    let msg = "مرحباً متجر المصطفى، أود طلب القائمة التالية:\n\n";
    cart.forEach((item, i) => msg += `${i + 1}. ${item.title} (${item.price} ل.س)\n`);
    msg += "\nالمجموع الكلي: " + document.getElementById('modalTotal').innerText + " ل.س";
    
    window.open("https://wa.me/963990835712?text=" + encodeURIComponent(msg));
}

// البحث والفلترة
function filterProducts() {
    let search = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        let cat = card.getAttribute('data-category');
        
        let matchesCategory = (currentCategory === 'all' || cat === currentCategory);
        let matchesSearch = name.includes(search);

        card.style.display = (matchesCategory && matchesSearch) ? 'flex' : 'none';
    });
}

function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}
