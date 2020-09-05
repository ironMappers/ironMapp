const postalCodesEs = require('../resources/postalCodesES');
module.exports.renderHome = (req, res, next) => {
    res.render('home', {codes: {
        CAs: postalCodesEs.REG_CODES
    }});
};

