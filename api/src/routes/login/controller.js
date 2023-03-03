const { User, Role } = require('../../db.js');

const findUser = async (mail) => {
  try {
    const usuario = await User.findOne({
      where: { mail },
      include: [
        {
          model: Role,
          attributes: ['name'],
        },
      ],
    });
    return usuario;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUser,
};
