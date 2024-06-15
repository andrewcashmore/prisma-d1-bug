## Steps
1. Login to Cloudflare and create a new D1 database called `prisma-example`
2. Copy the database ID into the `wrangler.toml` file
3. Run `npm install` followed by `npm run setup` to run the database migrations
4. Run `npm start` & navigate to `http://localhost:4444` you should see an error appear
5. Check the console to see the error output 🐛 
6. Comment out the `where` clause in the select statement on line 26 and refresh the page, the results should return successfully

## Reported
[Prisma Bug Report](https://github.com/prisma/prisma/issues/24545)