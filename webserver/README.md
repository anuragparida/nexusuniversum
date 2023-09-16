This Project was developed with Vue 3 in Vite.
Server: https://nexus-app.dev.netlands.de/


------ Installation/get started ------
install Node.js v18.16.0

npm install

for localhost run: 
npm run dev 

to updated changes to the server run: 
npm run build
Then copy the 'dist' folder and paste it into the 'webserver' folder.


------ Database ------
With the parser.php file we adapt your database and make a cache.

If you want to change the database, you have to change 
    "const db = 'https://nexus-app.dev.netlands.de/db/Parser.php'" 
to: 
    "const db = 'https://example.com/db/database.php'" 

in 'index.js' from this directory: src/store/index.js.