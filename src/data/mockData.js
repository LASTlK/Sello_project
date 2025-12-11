// Новости для демонстрации
export const mockNews = [
  {
    id: 1,
    title: 'Новая коллекция осень-зима 2024',
    description: 'Представляем новую коллекцию одежды на холодный сезон. Стильные куртки, теплые свитеры и аксессуары.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    date: '2024-10-15',
    category: 'Новости'
  },
  {
    id: 2,
    title: 'Скидки до 50% на все товары',
    description: 'Только этой недели скидки на всю продукцию. Успейте купить по выгодной цене!',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w-400&h=300&fit=crop',
    date: '2024-10-10',
    category: 'Акции'
  },
  {
    id: 3,
    title: 'Открытие нового магазина',
    description: 'Приглашаем на открытие нашего нового магазина в центре города. Подарки первым посетителям!',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    date: '2024-10-05',
    category: 'События'
  },
  {
    id: 4,
    title: 'Бесплатная доставка по городу',
    description: 'Теперь при заказе от 3000 рублей - бесплатная доставка в пределах города.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    date: '2024-10-01',
    category: 'Услуги'
  }
];

// Товары для демонстрации
export const mockProducts = [
  {
    id: 1,
    name: 'Смартфон XYZ Pro',
    description: 'Флагманский смартфон с тройной камерой 108 Мп, 256 ГБ памяти',
    price: 79999,
    oldPrice: 89999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    category: 'Электроника',
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: 'Беспроводные наушники',
    description: 'Наушники с активным шумоподавлением, время работы 30 часов',
    price: 14999,
    oldPrice: 19999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'Аксессуары',
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: 'Футболка Premium Cotton',
    description: 'Хлопковая футболка премиум качества, 100% хлопок',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'Одежда',
    rating: 4.7,
    inStock: false
  },
  {
    id: 4,
    name: 'Часы Smart Watch Pro',
    description: 'Умные часы с функцией отслеживания здоровья и уведомлениями',
    price: 24999,
    oldPrice: 29999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'Гаджеты',
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    name: 'Кроссовки спортивные',
    description: 'Легкие кроссовки для бега и повседневной носки',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'Обувь',
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: 'Ноутбук UltraBook',
    description: 'Ультратонкий ноутбук с процессором i7 и SSD 512 ГБ',
    price: 129999,
    oldPrice: 149999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    category: 'Электроника',
    rating: 4.8,
    inStock: true
  }
];

// Категории
export const mockCategories = [
  { id: 1, name: 'Электроника', count: 45 },
  { id: 2, name: 'Одежда', count: 120 },
  { id: 3, name: 'Обувь', count: 67 },
  { id: 4, name: 'Аксессуары', count: 89 },
  { id: 5, name: 'Красота', count: 56 },
  { id: 6, name: 'Дом и сад', count: 234 }
];