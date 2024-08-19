const { Client } = require("pg");
require("dotenv").config();

const SQL = ``;

const main = async function () {
    try {
        const connectionString = process.argv[2];
        if (!connectionString) {
            console.error(
                "Please provide the database connection string as an argument."
            );
            process.exit(1);
        }

        console.log("Seeding...");
        const client = new Client({ connectionString });

        await client.connect();
        await client.query(SQL);
        await client.end();

        console.log("Done");
    } catch (error) {
        console.error("Error during seeding: ", error);
        process.exit(1);
    }
};

main();
