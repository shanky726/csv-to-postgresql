const Pool = require("pg").Pool;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Create a connection to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testdb",
  password: "123",
  port: 5432
});

// open the PostgreSQL connection
pool.connect((err, client, done) => {
  if (err) throw err;

  client.query("SELECT * FROM category", (err, res) => {
    done();

    if (err) {
      console.log(err.stack);
    } else {
      const jsonData = JSON.parse(JSON.stringify(res.rows));
      console.log("jsonData", jsonData);

      const csvWriter = createCsvWriter({
        path: "postgresql_csvWriter.csv",
        header: [
          { id: "Region", title: "Region" },
          { id: "Country", title: "Country" },
          { id: "Item Types", title: "Item Types" },
          { id: "Sales Channel", title: "Sales Channel" },
          { id: "Order Priority", title: "Order Priority" },
          { id: "Order Date", title: "Order Date" },
          { id: "Order ID", title: "Order ID" },
          { id: "Ship Date", title: "Ship Date" },
          { id: "Units Sold", title: "Units Sold" },
          { id: "Unit price", title: "Unit price" },
          { id: "Unit Cost", title: "Unit Cost" },
          { id: "Total Revenue", title: "Total Revenue" },
          { id: "Total Cost", title: "Total Cost" },
          { id: "Total Profit", title: "Total Profi" },
        ]
      });

      csvWriter
        .writeRecords(jsonData)
        .then(() =>
          console.log("Write to postgresql_csvWriter.csv successfully!")
        );
    }
  });
});
