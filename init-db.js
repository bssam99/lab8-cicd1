db = db.getSiblingDB('lab8db1');

db.tasks.drop();

db.tasks.insertMany([
  { id: 1, name: 'Milk',         status: 'done'    },
  { id: 2, name: 'Eggs',         status: 'done'    },
  { id: 3, name: 'Bread',        status: 'pending' },
  { id: 4, name: 'Butter',       status: 'pending' },
  { id: 5, name: 'Orange juice', status: 'pending' },
]);

print('Database seeded with 5 tasks');