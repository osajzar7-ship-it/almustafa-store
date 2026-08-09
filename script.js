let cart = [];
let currentCategory = 'all';

// إضافة للسلة
function addToCart(title, price) {
    cart.push({ title: title, price: price });
    updateCart();
    alert("تمت إضافة: " + title);
}

// حذف من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// فتح وإغلاق نافذة السلة
function toggleCart() {
    let modal = document.getElementById('cartModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// تحديث الواجهة
function updateCart() {
    let list = document.getElementById('cartItemsList');
    let total = 0;
    list.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.title} (${item.price} ل.س)</span>
                <button class="btn-remove" onclick="removeFromCart(${index})">حذف</button>
            </div>
        `;
    });
    
    document.getElementById('cartCount').innerText = cart.length;
    document.getElementById('totalPrice').innerText = total;
    document.getElementById('modalTotal').innerText = total;
}

// إرسال للواتساب
function sendOrder() {
    if (cart.length === 0) return;
    let msg = "طلب جديد من متجر المصطفى:\n";
    cart.forEach(i => msg += i.title + " - " + i.price + " ل.س\n");
    msg += "\nالمجموع الكلي: " + document.getElementById('totalPrice').innerText + " ل.س";
    window.open("https://wa.me/963990835712?text=" + encodeURIComponent(msg));
}

// البحث والفلترة
function filterProducts() {
    let search = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        let cat = card.getAttribute('data-category');
        let match = (currentCategory === 'all' || cat === currentCategory) && name.includes(search);
        card.style.display = match ? 'block' : 'none';
    });
}

function filterCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}
