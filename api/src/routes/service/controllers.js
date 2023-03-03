const { Service, User, VdV } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbServices() {
  const bulkCreateServices = await Service.bulkCreate([
    { amount: '5000', UserId: '1', VdVId: '1' },
    { amount: '5000', UserId: '1', VdVId: '1' },
    { amount: '5000', UserId: '1', VdVId: '2' },
    { amount: '5000', UserId: '2', VdVId: '2' },
    { amount: '5000', UserId: '3', VdVId: '3' },
    { amount: '5000', UserId: '4', VdVId: '4' },
  ]);

  return bulkCreateServices;
}

async function createService(body) {
  const { amount, UserId, VdVId } = body;
  const newService = await Service.create({
    amount,
    UserId,
    VdVId,
  });

  return newService;
}

const getServiceById = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id de usuario');

    const service = Service.findByPk(id, {
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });

    if (!service) throw Error('El servicio no existe');

    return service;
  } catch (error) {
    throw Error('Ocurrio un error. No se encuentra el servicio');
  }
};

// Ver como podria utilizar un objeto que sea where el cual modifico dependiendo la peticion
const getByUserId = async (id) => {
  if (!id) throw Error('Debes ingresar un id');

  const checkuser = await User.findAll({ where: { id: id } });
  if (!checkuser) throw Error('El usuario no existe');

  const serviceByUser = await Service.findAll({
    where: {
      UserId: id,
    },
    include: [
      { model: User, attributes: ['name', 'last_name'] },
      { model: VdV, attributes: ['name'] },
    ],
  });
  return serviceByUser;
};

const getByVdVId = async (id) => {
  if (!id) throw Error('Debes ingresar un id');

  const checkvdv = await VdV.findAll({ where: { id: id } });
  if (!checkvdv) throw Error('La VdV no existe');

  const serviceForVdV = await Service.findAll({
    where: {
      VdVId: id,
    },
    include: [
      { model: User, attributes: ['name', 'last_name'] },
      { model: VdV, attributes: ['name'] },
    ],
  });
  return serviceForVdV;
};

const getAll = async () => {
  const allService = await Service.findAll({
    include: [
      { model: User, attributes: ['name', 'last_name'] },
      { model: VdV, attributes: ['name'] },
    ],
  });
  return allService;
};

module.exports = {
  createService,
  getByUserId,
  getByVdVId,
  chargeDbServices,
  getAll,
  getServiceById,
};
