CREATE TABLE department (
  id_department SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE employee (
  id_employee SERIAL PRIMARY KEY,
  name VARCHAR(255),
  birthday DATE,
  address VARCHAR(255),
  id_department INT,
  date_start DATE,
  FOREIGN KEY (id_department) REFERENCES department(id_department)
);
