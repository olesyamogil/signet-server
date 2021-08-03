const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'films.csv',
  header: [
    {id: 'id', title: 'Id'},
    {id: 'name', title: 'Name'},
    {id: 'genre1', title: 'Genre1'},
    {id: 'genre2', title: 'Genre2'},
    {id: 'year', title: 'Year'},
  ]
});

const arr = [];

  for (let i = 1; i <= 1000000; i++) {
    const newItem = {
      id: i,
      name: `Movie ${i}`,
      genre1: `Genre ${Math.floor(Math.random() * 4) + 1}`,
      genre2: `Genre ${Math.floor(Math.random() * 4) + 6}`,
      year: Math.floor(Math.random() * 20) + 2000
    }
    arr.push(newItem)
  }

csvWriter
  .writeRecords(arr)
  .then(()=> console.log('The CSV file was written successfully'));