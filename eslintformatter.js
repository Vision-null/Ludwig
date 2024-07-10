module.exports = function (results, context) {
  // accumulate the errors and warnings

  // extraction helper func
  const extractError = () => {
    const outputObj = {};
    console.log("result", results);
    results.forEach((el) => {
      el.messages.forEach((mess) => {
        console.log("el.messages: ", el.messages)
        console.log('mess: ', mess);
        // const keyname = mess.line.toString().concat(':').concat(mess.column.toString());

        // console.log("mess: ", mess);
        // console.log('mess.line: ', mess.line);
        // console.log('keyname: ', typeof keyname);
        // console.log('column: ', typeof mess.column);

        if (!outputObj) {
          outputObj['test'] = mess;
        }
      });
    });
    console.log('outputObj: ', outputObj);
    return outputObj;
  };

  extractError();
  // only extract eslint by fileId

  const extractFile = () => {
    // console.log(results);
    results.forEach((el) => {
      const { filePath } = el;
      const file = filePath.split('/');
      return console.log(`File Path: ${file[file.length - 1]}`);
    });
  };

  extractFile();

  const summary = results.reduce(
    (seq, current) => {
      // console.log('RESULT[0].messages:', results[0].messages);
      seq.errors += current.errorCount;
      seq.warnings += current.warningCount;
      return seq;
    },
    { errors: 0, warnings: 0 },
  );

  if (summary.errors > 0 || summary.warnings > 0) {
    return `Errors: ${summary.errors}, Warnings: ${summary.warnings}\n`;
  }

  return '';
};
