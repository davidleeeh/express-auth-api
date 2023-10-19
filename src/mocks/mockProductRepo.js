const { v4: uuid } = require("uuid");

const mockProductRepo = () => {
  let products = [
    {
      id: "001",
      name: "Play Station",
      price: 400,
      inventory: 10
    },
    {
      id: "002",
      name: "MacBook Pro",
      price: 2500,
      inventory: 321
    },
    {
      id: "003",
      name: "4K TV",
      price: 1699,
      inventory: 35
    }
  ];

  return {
    items: function () {
      return products;
    },
    get: function (id) {
      return products.find((it) => it.id === id);
    },
    update: function (id, updates) {
      const item = this.get(id);
      if (!item) throw Error(`Cannot find product with id: ${id}`);

      const otherItems = products.filter((it) => it.id !== id);

      const updatedItem = {
        ...item,
        ...updates
      };

      products = [...otherItems, updatedItem];
      return updatedItem;
    },
    add: function (item) {
      const newItem = {
        id: uuid(),
        ...item
      };

      products = products.concat(newItem);

      return newItem.id;
    },
    delete: function (id) {
      const deleted = this.get(id);
      products = products.filter((it) => it.id !== id);

      return deleted;
    }
  };
};

module.exports = mockProductRepo;
