const { Feedback, User, VdV } = require('../../db.js');
const { Op } = require('sequelize');

//ESTE ES EL BULKCREATE NO LO BORREN
const chargeDbFeedback = async () => {
  try {
    const bulkCreateFeedbacks = await Feedback.bulkCreate([
      {
        comment: 'Muy malo, me trataron re mal',
        rating: '1',
        UserId: '1',
        VdVId: '1',
      },
      {
        comment: 'Muy bueno. Mejoraron su atencion al cliente',
        rating: '5',
        UserId: '1',
        VdVId: '1',
      },
      {
        comment: 'Muy bueno, me encanto',
        rating: '5',
        UserId: '2',
        VdVId: '2',
      },
      { comment: 'Muy malo', rating: '1', UserId: '2', VdVId: '2' },
      { comment: 'Horrible todo', rating: '1', UserId: '3', VdVId: '3' },
      { comment: 'Super bien toy feliz', rating: '4', UserId: '4', VdVId: '4' },
    ]);

    return bulkCreateFeedbacks;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo cargar la base de datos');
  }
};

const createFeedback = async (body) => {
  try {
    const { comment, rating, UserId, VdVId } = body;

    const checkUsers = await User.findAll({
      where: { id: UserId },
    });
    const checkVdvs = await VdV.findAll({
      where: { id: VdVId },
    });

    if (!checkUsers || !checkVdvs)
      throw Error('No se pudo crear el feedback. Usuario o Entidad no existen');

    const newFeedback = await Feedback.create({
      comment,
      rating,
      UserId,
      VdVId,
    });

    return newFeedback;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo crear el feedback');
  }
};

const getFeedbacks = async () => {
  try {
    const feedbacksWUsersVdvData = await Feedback.findAll({
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });

    return feedbacksWUsersVdvData;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo traer los feedbacks');
  }
};

const getFeedbacksById = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const feedback = Feedback.findByPk(id, {
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });

    if (!feedback) throw Error('El feedback no existe');

    return feedback;
  } catch (error) {
    throw Error('Ocurrio un error. No se pudo traer el feedback');
  }
};

const getFeedbacksByUserId = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const checkuser = await User.findAll({ where: { id: id } });
    if (!checkuser) throw Error('El usuario no existe');

    const feedbackWUsersVdvData = await Feedback.findAll({
      where: {
        UserId: {
          [Op.eq]: id,
        },
      },
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });
    if (!feedbackWUsersVdvData)
      throw Error(
        `Ocurrio un error. No se encontraron feedbacks del usuario de id ${id}`
      );

    return feedbackWUsersVdvData;
  } catch (error) {
    throw Error(error.message);
  }
};

const getFeedbacksByVdVId = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const checkVdV = await VdV.findAll({ where: { id: id } });
    if (!checkVdV) throw Error('La entidad no existe');

    const feedbackWUsersVdvData = await Feedback.findAll({
      where: {
        VdVId: {
          [Op.eq]: id,
        },
      },
      include: [
        { model: User, attributes: ['name', 'last_name'] },
        { model: VdV, attributes: ['name'] },
      ],
    });
    if (!feedbackWUsersVdvData)
      throw Error(
        `Ocurrio un error. No se encontraron feedbacks para la entidad de id ${id}`
      );

    return feedbackWUsersVdvData;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateFeedback = async (id, comment, rating) => {
  try {
    if (!comment || !rating || !id) throw Error('Faltan datos');

    const feedbackToUpdate = await Feedback.findAll({ where: { id: id } });
    if (!feedbackToUpdate) throw Error('No existe un feedback con ese id');

    await Feedback.update(
      {
        comment: comment,
        rating: rating,
      },
      { where: { id: id } }
    );

    const updatedFeedback = await getFeedbacksById(id);

    return updatedFeedback;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

const deleteFeedback = async (id) => {
  try {
    if (!id) throw Error('Debes ingresar un id');

    const feedbackToDelete = await Feedback.findAll({ where: { id: id } });
    if (!feedbackToDelete) throw Error('El feedback no existe');

    const deleting = await Feedback.destroy({ where: { id: id } });

    return deleting;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

// sort rating

// Traigo los ids de las entidades
const getAllVdV = async () => {
  const checkVdvs = await VdV.findAll();
  return checkVdvs.map((ele) => ele.dataValues.id); //[1,2,3,4,10]
};

// obtengo un array que dentro tiene un array por entidad que dentro tiene objetos que son cada reseña hecha a la entidad
const mapeoDeIds = (array) => {
  const result = array.map(async (ele) => {
    return await getFeedbacksByVdVId(ele); //[[{reseña} {reseña}]] [ [[entidad {reseñas1, reseña2}]]
  });
  return Promise.all(result);
};

// Obtengo el array de las entidades con las reseñas
const getFeedbacksForVdV = async () => {
  const result = mapeoDeIds(await getAllVdV());
  return result;
};

// Obtengo un array con objetos -> cada objeto es el nombde de la entidad con su promedio de rating [{"Entidad_A : 5","Entidad_B : 2",etc }]
const getRatings = async () => {
  const entitiesAndReviews = await getFeedbacksForVdV();
  const entitiesWithReviews = entitiesAndReviews.filter(
    (ent) => ent.length > 0
  ); // Entidades a las cuales se les haya haecho reseñas/puntuacion
  // primer reocrrido para pasar por c/u de las entidades
  entitiesWithReviews.forEach(async (ele) => {
    let contador = 0;
    let rating = 0;
    // segundo recorrido para pasar por c/u de las reseñas
    ele.forEach((element) => {
      rating += element.rating;
      contador++;
    });
    await VdV.update(
      { rating: Math.floor(rating / contador) },
      {
        where: { name: ele[0].VdV.name },
      }
    );
  });

  const vdvUpdateRating = await VdV.findAll();
  return vdvUpdateRating.filter((vdv) => vdv.dataValues.rating !== null);
};

// Obtengo un array con los nombres de las entidades en orden ASC o DES ["Entidad-con-menor-raiting", "Entidad-con-mayor-rating"] ><
const ratingSort = async (order) => {
  const result = await getRatings();
  order === 'Ascendente'
    ? result.sort((a, b) => a.dataValues.rating - b.dataValues.rating)
    : result.sort((a, b) => b.dataValues.rating - a.dataValues.rating);
  return result;
};

module.exports = {
  chargeDbFeedback,
  createFeedback,
  getFeedbacks,
  getFeedbacksById,
  getFeedbacksByUserId,
  getFeedbacksByVdVId,
  updateFeedback,
  deleteFeedback,
  getRatings,
  ratingSort,
  getFeedbacksForVdV,
};
