// قائمة المنتجات الاحتياطية لمكتبة المصطفى
const products = [
  // القرطاسية والأقلام
  { id: '1', category: 'stationery', name: 'دفتر سلك 100 ورقة', desc: 'غلاف مقوى أنيق - ورق ممتازة', price: 150, img: 'images/notebook.jpg', stockAlert: false },
  { id: '2', category: 'stationery', name: 'طقم أقلام حبر (4 ألوان)', desc: 'أزرق، أسود، أحمر، أخضر', price: 60, img: 'images/pens.jpg', stockAlert: false },
  { id: '3', category: 'stationery', name: 'علبة أقلام رصاص مع محاية', desc: 'درزينة أقلام فابر كاستل عالية الجودة', price: 110, img: 'images/pencils.jpg', stockAlert: true },
  { id: '12', category: 'stationery', name: 'دفتر إنجليزي 60 صفحة', desc: 'سطور واضحة ومناسبة لتحسين الخط وتدريب الطلاب', price: 60, img: 'images/english-notebook.jpg', stockAlert: false },
  { id: '13', category: 'stationery', name: 'دفتر إنجليزي', desc: 'ورق ممتاز بجودة عالية وسطور واضحة للتدريب والتعليم', price: 40, img: 'images/english-notebook.jpg', stockAlert: false },
  { id: '14', category: 'stationery', name: 'دفتر إنجليزي قسمين', desc: 'ورق مقوى ممتاز بأسطر واضحة مقسمة لسهولة التنظيم والدراسة', price: 70, img: 'images/english-notebook-2.jpg', stockAlert: false },
  { id: '15', category: 'stationery', name: 'دفتر عربي صغير', desc: 'ورق ممتاز بجودة عالية وسطور منتظمة مناسبة للتدوين والدروس', price: 30, img: 'images/arabic-notebook-small.jpg', stockAlert: false },
  { id: '16', category: 'stationery', name: 'دفتر عربي 3 أقسام', desc: 'ورق ممتاز بجودة عالية ومقسم لتنظيم عدة مواد بسهولة', price: 100, img: 'images/arabic-notebook-3.jpg', stockAlert: false },
  { id: '17', category: 'stationery', name: 'دفتر عربي 5 أقسام', desc: 'ورق ممتاز عالي الجودة مقسم عملياً لجمع عدة مواد في دفتر واحد', price: 110, img: 'images/arabic-notebook-5.jpg', stockAlert: false },
  { id: '18', category: 'stationery', name: 'دفتر رسم وسط', desc: 'ورق أبيض ناصع بجودة ممتازة مناسب للرسم والتلوين بمختلف الألوان', price: 40, img: 'images/drawing-notebook-medium.jpg', stockAlert: false },
  { id: '19', category: 'stationery', name: 'دفتر رسم صغير', desc: 'ورق أبيض ناصع وممتاز للرسم والتلوين وتنمية مهارات الأطفال', price: 30, img: 'images/drawing-notebook-small.jpg', stockAlert: false },
  { id: '20', category: 'stationery', name: 'دفتر عربي 70 صفحة', desc: 'ورق ممتاز عالي الجودة بسطور واضحة ومناسبة للكتابة والتدوين', price: 50, img: 'images/arabic-notebook-70.jpg', stockAlert: false },
  { id: '21', category: 'stationery', name: 'دفتر عربي قسمين', desc: 'ورق عالي الجودة مقسم عملياً لتسهيل تنظيم ودراسة مادتين', price: 70, img: 'images/arabic-notebook-2.jpg', stockAlert: false },
  { id: '22', category: 'stationery', name: 'دفتر عربي 3 أقسام', desc: 'ورق عالي الجودة مقسم بأسلوب منظم لجمع أكثر من مادة دراسية', price: 100, img: 'images/arabic-notebook-3.jpg', stockAlert: false },
  { id: '23', category: 'stationery', name: 'دفتر عربي 5 أقسام', desc: 'ورق فاخر مقسم عملياً لجمع المواد وتسهيل التدوين اليومي', price: 120, img: 'images/arabic-notebook-5.jpg', stockAlert: false },
  { id: '24', category: 'stationery', name: 'دفتر جامعي قسمين', desc: 'حجم مناسب للطلاب بجودة ورق ممتازة وتقسيم عملي للملاحظات', price: 120, img: 'images/university-notebook-2.jpg', stockAlert: false },
  { id: '25', category: 'stationery', name: 'قصص الأنبياء', desc: 'سلسلة ممتازة بأسلوب ميسر وممتع لتعليم الناشئة والأطفال', price: 30, img: 'images/prophets-stories.jpg', stockAlert: true },
  { id: '27', category: 'stationery', name: 'متن الأربعين النووية', desc: 'طبعة أنيقة بكلمات واضحة لحفظ وتدارس الأحاديث النبوية الشريفة', price: 40, img: 'images/40-nawawi.jpg', stockAlert: false },
  { id: '28', category: 'stationery', name: 'فتح الرحمن', desc: 'كتاب تعليم القراءة وتجويد القرآن الكريم بأسلوب مبسط وممتاز', price: 70, img: 'images/fath-alrahman.jpg', stockAlert: false },
  { id: '29', category: 'stationery', name: 'جزء عم', desc: 'طبعة واضحة وممتازة مخصصة لتعليم وتحفيظ الأطفال والطلاب', price: 30, img: 'images/juz-amma.jpg', stockAlert: false },
  { id: '30', category: 'stationery', name: 'قرآن كريم حجم صغير', desc: 'طبعة أنيقة بحجم مدمج وسهل الحمل والتنقل في أي مكان', price: 190, img: 'images/quran-small.jpg', stockAlert: false },
  { id: '31', category: 'stationery', name: 'قرآن كريم حجم كبير', desc: 'طبعة فاخرة بخط واضح وجلي مريح للعين أثناء القراءة والتدبر', price: 310, img: 'images/quran-large.jpg', stockAlert: false },
  { id: '32', category: 'stationery', name: 'دفتر كشكول 5 أقسام', desc: 'تصميم أنيق وورق عالي الجودة مقسم عملياً لكافة التدوينات', price: 50, img: 'images/kashkul-5.jpg', stockAlert: false },
  { id: '33', category: 'stationery', name: 'ورق A4 ملون 10 ألوان مختلفة', desc: 'حزمة ورق ممتازة بألوان زاهية متعددة الاستخدامات للطباعة والأعمال الفنية', price: 320, img: 'images/a4-colored-paper.jpg', stockAlert: false },

  // باقات المدارس
  { id: '4', category: 'school-packages', name: 'باقة الصفوف الأولى', desc: 'دفاتر مسطرة، أقلام رصاص، تلوين، ومحاية', price: 280, img: 'images/package-primary.jpg', stockAlert: false },
  { id: '5', category: 'school-packages', name: 'باقة المدارس المتكاملة', desc: 'دفاتر، أقلام حبر ورصاص، مقلمة، وأدوات هندسية', price: 390, img: 'images/package-full.jpg', stockAlert: false },

  // الألعاب والهدايا
  { id: '6', category: 'toys-gifts', name: 'سيارة ألعاب تحكم عن بعد', desc: 'حجم متوسط شاملة البطاريات', price: 320, img: 'images/toy-car.jpg', stockAlert: true },
  { id: '7', category: 'toys-gifts', name: 'صندوق هدية جاهز', desc: 'مغلف مسبقاً مع بطاقات المعايدة', price: 210, img: 'images/gift-box.jpg', stockAlert: false },
  { id: '26', category: 'toys', name: 'لابتوب رسم مغناطيسي مع قلم', desc: 'لعبة تعليمية وممتعة لتنمية مهارات الرسم والابتكار لدى الأطفال', price: 260, img: 'images/magnetic-drawing-laptop.jpg', stockAlert: true },
  // الطواقي والإكسسوارات
  { id: '8', category: 'hats-accessories', name: 'طاقية صوف دافئة', desc: 'خامة ممتازة - ألوان متعددة', price: 130, img: 'images/hat.jpg', stockAlert: false },
  { id: '9', category: 'hats-accessories', name: 'طقم إكسسوارات بناتي', desc: 'تشكيلة ملونة وأنيقة لشعر الأطفال', price: 90, img: 'images/accessories.jpg', stockAlert: false },

  // الورد والتغليف
  { id: '10', category: 'flowers-wrapping', name: 'باقة ورد تنسيق خاص', desc: 'ورد طبيعي / صناعي للهدايا', price: 290, img: 'images/flower-bouquet.jpg', stockAlert: false },
  { id: '11', category: 'flowers-wrapping', name: 'تغليف هدية محترف', desc: 'ورق فاخر وشريط زينة مميز', price: 70, img: 'images/wrapping.jpg', stockAlert: false }
];
