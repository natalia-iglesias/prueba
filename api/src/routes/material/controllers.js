const { Material } = require('../../db.js');

//FUNCIONA. CREA LA RELACION CON LA VDV. AL HACER GET EN VDV, TE TRAE LAS VDVS CON LOS MATERIALES CREADOS
//...USANDO ESTA RUTA DE CREACION
// !!! El problema es que hay que agregar los materiales de a uno. Asi como se agregaban las actividades
//...en el PI de countries !!

// ACA NO VINCULAMOS NADA!! SOLO CREAMOS UN MATERIAL . VINCULAMOS CON LA VDV

const createMaterial = async (body) => {
  const { name, VdVId } = body;

  try {
    const newMaterial = await Material.create({
      name: name,
      VdVId: VdVId,
    });

    await newMaterial.addVdV(VdVId, { through: { selfGranted: false } });

    return newMaterial;
  } catch (error) {
    throw Error('Ocurrio un error. No fue posible procesar la peticion');
  }
};

const crearMaterialFinal = async (body) => {
  const { name } = body;
  const material = await Material.create({
    name,
  });
  return material;
};

// Treaemos los nombres de los materiales -> SIN VDV
const getAllMaterials = async () => {
  const allMaterials = await Material.findAll();
  console.log(allMaterials);
  // const allMaterialsReturn = allMaterials.map((elem) => elem.name);
  return allMaterials;
};

// elimina material
const deleteMaterial = async (name) => {
  const material = await Material.destroy({
    where: { name: name },
  });
  return material;
};

const chargeDbMaterial = async () => {
  const bulkCreateMaterial = await Material.bulkCreate([
    { name: 'Madera' },
    { name: 'Vidrio' },
    { name: 'Papel' },
    { name: 'Plastico' },
    { name: 'Chapa' },
    { name: 'Hierro' },
  ]);

  /*
const materialsArray = [
  'Plástico',
  'Vidrio',
  'Metal',
  'Vidrio',
  'Tapitas',
  'Cartón',
  'Aceite',
  'Aluminio',
  'Madera',
  'Textiles',
  'Baterias',
  'Papel',
];
*/

  return bulkCreateMaterial;
};

module.exports = {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
  crearMaterialFinal,
  chargeDbMaterial,
};
