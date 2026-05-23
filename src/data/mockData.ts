export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Inventory {
  id: string;
  name: string;
  categories: Category[];
}

export const mockInventories: Inventory[] = [
  {
    id: '1',
    name: 'Main Shop',
    categories: [
      {
        id: 'cat1',
        name: 'Drinks',
        items: [
          { id: 'item1', name: 'Coca-Cola 500ml', quantity: 48 },
          { id: 'item2', name: 'Mineral Water 1L', quantity: 72 },
          { id: 'item3', name: 'Orange Juice 250ml', quantity: 24 },
        ],
      },
      {
        id: 'cat2',
        name: 'Snacks',
        items: [
          { id: 'item4', name: 'Potato Chips', quantity: 36 },
          { id: 'item5', name: 'Chocolate Bars', quantity: 60 },
        ],
      },
      {
        id: 'cat3',
        name: 'Dairy',
        items: [
          { id: 'item6', name: 'Fresh Milk 1L', quantity: 20 },
          { id: 'item7', name: 'Greek Yogurt', quantity: 15 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Warehouse',
    categories: [
      {
        id: 'cat4',
        name: 'Electronics',
        items: [
          { id: 'item8', name: 'USB Cables', quantity: 120 },
          { id: 'item9', name: 'Phone Chargers', quantity: 45 },
        ],
      },
      {
        id: 'cat5',
        name: 'Office Supplies',
        items: [
          { id: 'item10', name: 'A4 Paper (500 sheets)', quantity: 30 },
          { id: 'item11', name: 'Ballpoint Pens (12pk)', quantity: 50 },
          { id: 'item12', name: 'Stapler', quantity: 12 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Storage Unit',
    categories: [
      {
        id: 'cat6',
        name: 'Tools',
        items: [
          { id: 'item13', name: 'Screwdriver Set', quantity: 8 },
          { id: 'item14', name: 'Hammer', quantity: 5 },
        ],
      },
    ],
  },
];
