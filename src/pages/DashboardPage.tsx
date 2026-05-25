import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Package, Search } from 'lucide-react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { mockInventories, Inventory } from '../data/mockData';

function DashboardPage() {
  const [inventories, setInventories] = useState<Inventory[]>(mockInventories);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInventoryName, setNewInventoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredInventories = inventories.filter((inventory) =>
    inventory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInventory = () => {
    if (!newInventoryName.trim()) return;

    const newInventory: Inventory = {
      id: Date.now().toString(),
      name: newInventoryName.trim(),
      categories: [],
    };

    setInventories([...inventories, newInventory]);
    setNewInventoryName('');
    setIsCreateModalOpen(false);
  };

  const handleDeleteInventory = (id: string) => {
    setInventories(inventories.filter((inv) => inv.id !== id));
  };

  const handleOpenInventory = (id: string) => {
    navigate(`/inventory/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Inventories</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your inventory lists
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search inventories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventories.map((inventory) => (
            <div
              key={inventory.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {inventory.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {inventory.categories.length} categories
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenInventory(inventory.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open
                </button>
                <button
                  onClick={() => handleDeleteInventory(inventory.id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  aria-label="Delete inventory"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInventories.length === 0 && inventories.length > 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No inventories match your search</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {inventories.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No inventories yet</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first inventory
            </button>
          </div>
        )}
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setNewInventoryName('');
        }}
        title="Create New Inventory"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateInventory();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="inventory-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Inventory Name
            </label>
            <input
              id="inventory-name"
              type="text"
              value={newInventoryName}
              onChange={(e) => setNewInventoryName(e.target.value)}
              placeholder="e.g., Main Shop, Warehouse"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setNewInventoryName('');
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newInventoryName.trim()}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default DashboardPage;
