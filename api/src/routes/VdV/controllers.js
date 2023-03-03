const { VdV, Material } = require('../../db.js');
const { Op } = require('sequelize');

//FUNCIONA. No agrega la relacion aun!!
const chargeDbVdVs = (array) => {
  const result = array.map(async (element) => {
    return await vdvCreate(element);
  });
  return Promise.all(result);
};

//La password queda en null.
const vdvCreate = async (body) => {
  const { name, img, description, mail, address, cbu, materials, lat, lng } =
    body;

  if (!name || !img || !description || !mail || !address)
    throw Error('Debes completar todos los campos obligatorios');
  const vdvCreate = await VdV.create({
    name,
    img,
    mail,
    address,
    description,
    cbu,
    lat,
    lng,
  });

  await vdvCreate.addMaterials(materials); // Unir VdV con materiales
  return vdvCreate;
};

//FUNCIONA. TRAE LAS ENTIDADES CON SUS MATERIALES ASOCIADOS
// Hay que hacerla como se debe
const getVdV = async (name) => {
  if (name) {
    const allVdVquey = await VdV.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Material,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    return allVdVquey;
  } else {
    const allVdV = await VdV.findAll({
      include: {
        model: Material,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    return allVdV;
  }
};

const getPending = async () => {
  const allVdV = await VdV.findAll({
    where: { status: 'Pending' },
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  return allVdV;
};

const getActive = async () => {
  const allVdV = await VdV.findAll({
    where: { status: 'Active' },
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  return allVdV;
};

// SEGUIR BUSCNADO LA SOLUCION PARA QUE ME TRAIGA LOS MATERIALES EN LAS VDV EN UN SOLO ARRAY SIN OBJETOS, DIRECTAMNETE LS NOMBRES DE LOS AMTERIALES

// const result = allVdV.map((elem) => {
//   const array = [];
//   elem.dataValues.materials.map((ele) => {
//     array.push(ele.dataValues.name);
//   });
//   return [...elem, (elem.dataValues.materials = array)];
// });
// return result;

//FUNCIONA
const getByIdVdV = async (id) => {
  const VdVFind = await VdV.findByPk(id, {
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return VdVFind;
};

//FUNCIONA. RETORNA LOS CAMBIOS HECHOS
const upDateVdV = async (id, body) => {
  if (body.materials) {
    await VdV.update(body, {
      where: { id },
    });
    const result = await getByIdVdV(id);
    await result.setMaterials(body.materials);
    const resultFinal = await getByIdVdV(id);
    return resultFinal;
  } else {
    await VdV.update(body, {
      where: { id },
    });
    const result = await getByIdVdV(id);
    return result;
  }
};

//FUNCIONA
const deleteVdV = (id) => {
  const VdVdelete = VdV.destroy({
    where: {
      id,
    },
  });
  return VdVdelete;
};

// FUNCIONA. Implemente creacion de contrasena provisoria. Fijense si les parece bien
// No se como se pueden generar contrasenas seguras aleatorias, de momento lo estableci con un string fijo
const functionRandom = () => {
  return (random = Math.random() * 55.2);
};

const changeStatus = async (id) => {
  // Hay que invertir los valores cuando ya este el Admin funcionando
  const randomPassword = functionRandom();

  await VdV.update(
    { status: 'Active', password: `!dfg${randomPassword}` },
    { where: { id } }
  );

  const result = await getByIdVdV(id);
  return result;
};

module.exports = {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
  changeStatus,
  getPending,
  getActive,
};
