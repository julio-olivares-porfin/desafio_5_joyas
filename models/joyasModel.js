import { pool } from "../database/db.js";
import format from "pg-format";

const findAll = async ({ limit = 10, order_by = "id_ASC", page = 1 }) => {
  const offset = (page - 1) * limit;
  const [nombre, orden] = order_by.split("_");
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;",
    nombre,
    orden,
    limit,
    offset
  );
  const { rows: joyas } = await pool.query(formattedQuery);
  return joyas;
};

const findByID = async (id) => {
  const consulta = "SELECT * FROM inventario WHERE id = $1;";
  const values = [id];
  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

export const findJoyasByFilter = async (extras = "", values = []) => {
  const consulta = `SELECT * FROM inventario ${extras};`;
  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

export const prepareFilter = (queryString) => {
  let filters = [];
  let values = [];

  if (queryString == {}) return [(filters = ""), (values = "")];
  const addFilter = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filters;
    filters.push(`${campo} ${comparador} $${length + 1} `);
  };

  const { precio_max, precio_min, categoria, metal } = queryString;
  if (precio_max) addFilter("precio", "<=", precio_max);
  if (precio_min) addFilter("precio", ">=", precio_min);
  if (categoria) addFilter("categoria", "=", categoria);
  if (metal) addFilter("metal", "=", metal);

  filters = filters.join(" AND ");

  filters = `WHERE ${filters}`;

  return [filters, values];
};

export const joyasModel = {
  findAll,
  findByID,
  findJoyasByFilter,
  prepareFilter,
};