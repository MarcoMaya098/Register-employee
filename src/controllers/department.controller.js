const pool = require("../db");

const createDepartment = async (req, res, next) => {
  try {
    const { description } = req.body;

    const newDepartment = await pool.query(
      "INSERT INTO department (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newDepartment.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    const allDepartments = await pool.query("SELECT * FROM department");
    res.json(allDepartments.rows);
  } catch (error) {
    next(error);
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM department WHERE id_department = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Department not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const result = await pool.query(
      "UPDATE department SET description = $1 WHERE id_department = $2 RETURNING *",
      [description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Department not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM department WHERE id_department = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Department not found" });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
