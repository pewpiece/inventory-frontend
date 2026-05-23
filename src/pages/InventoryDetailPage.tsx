import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, Package, FolderOpen, Box, Search } from 'lucide-react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { mockInventories, Inventory, Category, Item } from '../data/mockData';

function InventoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initialInventory = mockInventories.find((inv) => inv.id === id);

  const [inventory, setInventory] = useState<Inventory | null>(
    initialInventory || null
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addItemModal, setAddItemModal] = useState<{
    isOpen: boolean;
    categoryId: string;
  } | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredCategories = (): Category[] => {
    if (!inventory || !searchQuery.trim()) return inventory?.categories || [];

    const query = searchQuery.toLowerCase();

    return inventory.categories
      .map((category) => {
        const categoryMatches = category.name.toLowerCase().includes(query);
        const filteredItems = category.items.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        if (categoryMatches) {
          return category;
        }

        if (filteredItems.length > 0) {
          return { ...category, items: filteredItems };
        }

        return null;
      })
      .filter((cat): cat is Category => cat !== null);
  };

  const filteredCategories = getFilteredCategories();

  if (!inventory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Inventory not found</p>
          </div>
        </main>
      </div>
    );
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      items: [],
    };

    setInventory({
      ...inventory,
      categories: [...inventory.categories, newCategory],
    });
    setNewCategoryName('');
    setIsAddCategoryModalOpen(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setInventory({
      ...inventory,
      categories: inventory.categories.filter((cat) => cat.id !== categoryId),
    });
  };

  const handleAddItem = (categoryId: string) => {
    if (!newItemName.trim() || !newItemQuantity) return;

    const newItem: Item = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: parseInt(newItemQuantity, 10) || 0,
    };

    setInventory({
      ...inventory,
      categories: inventory.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat
      ),
    });

    setNewItemName('');
    setNewItemQuantity('1');
    setAddItemModal(null);
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setInventory({
      ...inventory,
      categories: inventory.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
          : cat
      ),
    });
  };

  const handleUpdateQuantity = (
    categoryId: string,
    itemId: string,
    delta: number
  ) => {
    setInventory({
      ...inventory,
      categories: inventory.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                  : item
              ),
            }
          : cat
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {inventory.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {inventory.categories.length} categories
            </p>
          </div>
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories and items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setAddItemModal({ isOpen: true, categoryId: category.id })
                    }
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Item
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1.5 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    aria-label="Delete category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {category.items.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No items in this category
                  </div>
                ) : (
                  category.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gray-100 rounded">
                          <Box className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(category.id, item.id, -1)
                            }
                            className="p-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(category.id, item.id, 1)
                            }
                            className="p-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            handleDeleteItem(category.id, item.id)
                          }
                          className="p-1 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && inventory.categories.length > 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No categories or items match your search</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}

          {inventory.categories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No categories yet</p>
              <button
                onClick={() => setIsAddCategoryModalOpen(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first category
              </button>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isAddCategoryModalOpen}
        onClose={() => {
          setIsAddCategoryModalOpen(false);
          setNewCategoryName('');
        }}
        title="Add New Category"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCategory();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              id="category-name"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Drinks, Snacks"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddCategoryModalOpen(false);
                setNewCategoryName('');
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newCategoryName.trim()}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Category
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={addItemModal?.isOpen || false}
        onClose={() => {
          setAddItemModal(null);
          setNewItemName('');
          setNewItemQuantity('1');
        }}
        title="Add New Item"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (addItemModal) {
              handleAddItem(addItemModal.categoryId);
            }
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="item-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Item Name
            </label>
            <input
              id="item-name"
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g., Coca-Cola 500ml"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="item-quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              id="item-quantity"
              type="number"
              min="0"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setAddItemModal(null);
                setNewItemName('');
                setNewItemQuantity('1');
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newItemName.trim()}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default InventoryDetailPage;
