### Overview
Sample node API to parse a csv file with configurable columns. Uses micro as a lightweight api, https://www.npmjs.com/package/micro. Form parsing is with formidable, https://www.npmjs.com/package/formidable.

### Start
```
npm npm
npm run start
```

### Testing the /csv endpoint
Use Postman POST request to http://localhost:3000/csv
with body as form-data and form fields:
    company: TEST123
    csv: test.csv (This is of type file, used the test file provided)

