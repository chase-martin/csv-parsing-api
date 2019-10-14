const { send } = require('micro');
const ParsingService = require('./parsing-service');
const formidable = require('formidable');

module.exports = async (req, res) => {
  try {
    // Parse input form
    // To test, use Postman POST request to http://localhost/csv
    // With body as form-date and form fields:
    // company: TEST123
    // csv: test.csv (This is of type file, used the test file provided)
    const form = new formidable.IncomingForm();
    const parsedForm = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
                return;
            }

            resolve({fields:fields, files:files});
        }); 
    });

    // Instanciate parsing service and parse file.
    // path is in file uploaded from a web form.
    const parser = new ParsingService(
      parsedForm.files.csv.path,
      parsedForm.fields.company
    );

    const result = await parser.parse();
    send(res, 200, result);
  } catch (err) {
    send(res, 500, err.message);
  }
}
