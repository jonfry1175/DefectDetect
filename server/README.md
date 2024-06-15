LANGKAH LANGKAH PEMBUATAN API

1. pnpm init -y
- untuk membuat package.json, package.json berfungsi untuk menyimpan informasi package/modul dalam aplikasi kita.
- NPM = node package manager

2. npm install <package_name>
- untuk menginstall modul dari pnpm
- pnpm install express pg sequelize dotenv cors bcrypt jsonwebtoken
- pnpm install nodemon sequelize-cli --save-dev

3. Membuat file app.js dan .gitignore, .env
- gitignore berfungsi untuk tidak memasukkan node_modules ke dalam GitHub repository.
- env berfungsi untuk meletakan variable yang akan di gunakan dalam environment tertentu.

4. Membuat _routing dan controllers__

5. npx nodemon app.js
- untuk menjalankan


KONFIGURASI POSTGRES MENGGUNAKAN SEQUELIZE

1. npx sequelize-cli init
- untuk membuat initiation awal sequelize

2. Konfigurasi database di dalam config.json

3. npx sequelize-cli db:create
- untuk membuat database lewat sequelize tanpa query manual

4. npx sequelize-cli model:generate --name User --attributes name:string,password:string

- untuk membuat class dan juga migrations


5. npx sequelize-cli db:migrate 
- untuk melakukan migrations
- agar table di buat