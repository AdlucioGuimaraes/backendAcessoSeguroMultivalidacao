const validateValues = (request, response, next) => {
    const { body } = request;
    const requiredFields = ['nome', 'email', 'senha', 'tipo'];

    for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === '') {
            return response.status(400).json({ message: `${field} indefinido ou não preenchido` });
        }
    }

    next();
};

module.exports = {
    validateValues
};
