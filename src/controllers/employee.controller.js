const pool = require("../db");

const createEmployee = async (req, res, next) => {
  try {
    const { name, birthday, address, id_department, date_start } = req.body;

    const newEmployee = await pool.query(
      "INSERT INTO employee (name, birthday, address, id_department, date_start) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, birthday, address, id_department, date_start]
    );

    res.json(newEmployee.rows[0]);
  } catch (error) {
    next(error);
  }
};

// const getAllEmployees = async (req, res, next) => {
//   try {
//     const allEmployees = await pool.query("SELECT * FROM employee inner join department on employee.id_department =department.id_department");
//     res.json(allEmployees.rows);
//   } catch (error) {
//     next(error);
//   }
// };

// Calcula los años laborados para cada empleado
// const getAllEmployees = async (req, res, next) => {
//   try {
//     const query = `
//       SELECT
//         employee.id_employee,
//         employee.name,
//         employee.birthday,
//         employee.address,
//         employee.id_department,
//         employee.date_start,
//         department.description,
//         DATE_PART('year', CURRENT_DATE - employee.date_start) AS antiguedad
//       FROM employee
//       INNER JOIN department ON employee.id_department = department.id_department
//     `;
//     const allEmployees = await pool.query(query);
//     res.json(allEmployees.rows);
//   } catch (error) {
//     next(error);
//   }
// };

// Calcula los días laborados para cada empleado
const getAllEmployees = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        employee.id_employee,
        employee.name,
        employee.birthday,
        employee.address,
        employee.id_department,
        employee.date_start,
        department.description,
        (CURRENT_DATE - employee.date_start) AS antiguedad
      FROM employee
      INNER JOIN department ON employee.id_department = department.id_department
    `;
    const allEmployees = await pool.query(query);
    res.json(allEmployees.rows);
  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM employee WHERE id_employee = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthday, address, id_department, date_start } = req.body;

    const result = await pool.query(
      "UPDATE employee SET name = $1, birthday = $2, address = $3, id_department = $4, date_start = $5 WHERE id_employee = $6 RETURNING *",
      [name, birthday, address, id_department, date_start, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM employee WHERE id_employee = $1",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Employee not found" });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
