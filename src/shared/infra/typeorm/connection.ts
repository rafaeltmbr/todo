import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    // ajust postgre driver timestamp parsing
    const driver = connection.driver as any;
    driver.postgres.defaults.parseInputDatesAsUTC = true;
    driver.postgres.types.setTypeParser(
      1114,
      (str: any) => new Date(`${str}Z`)
    );
  })
  .catch(console.error);
