const { Router } = require('express');

const router = Router();

const userMiddle = require('./user/usuario.js');
const vdvMiddle = require('./VdV/vdv.js');
const donationMiddle = require('./donation/donations.js');
const feedbackMiddle = require('./feedback/feedback.js');
const serviceMiddle = require('./service/service.js');
const materialMiddle = require('./material/material.js');
const roleMiddle = require('./role/role.js');
const chargeDbMiddle = require('./chargeDb/chargeDb.js');
const contactMiddle = require('./contact/contact.js');
const loginMiddle = require('./login/login.js');
const logoutMiddle = require('./login/login.js');
const authMiddle = require('./login/login.js');

router.use('/user', userMiddle);
router.use('/vdv', vdvMiddle);
router.use('/donation', donationMiddle);
router.use('/feedback', feedbackMiddle);
router.use('/service', serviceMiddle);
router.use('/material', materialMiddle);
router.use('/role', roleMiddle);
router.use('/chargedb', chargeDbMiddle);
router.use('/contact', contactMiddle);
router.use('/login', loginMiddle);
router.use('/logout', logoutMiddle);
router.use('/auth', authMiddle);

module.exports = router;
