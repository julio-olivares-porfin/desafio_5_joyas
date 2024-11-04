import { joyasModel } from "../models/joyasModel.js";

const read = async (req, res) => {
  try {
    const joyas = await joyasModel.findAll(req.query);
    const HATEOAS = prepararHATEOAS(joyas, req.query.page);
    return res.json(HATEOAS);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readById = async (req, res) => {
  const id = req.params.id;
  try {
    const joya = await joyasModel.findByID(id);
    if (!joya) {
      res.status(404).json({ message: "Joya not found" });
    }
    res.json(joya);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readByFilter = async (req, res) => {
  try {
    const [filters, values] = joyasModel.prepareFilter(req.query);
    const joyas = await joyasModel.findJoyasByFilter(filters, values);
    if (!joyas) {
      res.status(404).json({ message: "Joya not found" });
    }
    res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const prepararHATEOAS = (joyas, page) => {
  const url = "http://localhost:3000";
  const results = joyas.map((m) => {
    return {
      name: m.nombre,
      categoria: m.categoria,
      href: `${url}/joyas/joya/${m.id}`,
    };
  });
  const prev = page <= 1 ? null : page - 1;
  const next = page <= 1 ? null : parseInt(!page ? 1 : page) + 1;
  const totalStock = joyas.reduce((total, joya) => total + joya.stock, 0);
  const total = joyas.length;
  const HATEOAS = {
    total,
    totalStock,
    prev,
    next,
    results,
  };
  return HATEOAS;
};

const reportarConsulta = async (req, res, next) => {
  const parametros = req.query;
  const url = req.url;
  console.log(
    `Hoy ${new Date()} 
    Se ha recibido una consulta en la ruta ${url} con los parámetros: `,
    parametros
  );
  next();
};

export const joyaController = {
  read,
  readById,
  readByFilter,
  reportarConsulta,
};