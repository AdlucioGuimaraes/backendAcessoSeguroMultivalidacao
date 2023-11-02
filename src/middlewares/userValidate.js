const validateValues = (request, response, next) => {
    const { body } = request;
    const requiredFields = ['nome', 'email', 'senha', 'tipo' ];

    for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === '') {
            return response.status(400).json({ message: `${field} indefinido ou não preenchido` });
        }

    }

    if(!Number.isInteger(body['tipo'])) return response.status(400).json({ message: 'o campo tipo deve ser um valor inteiro' });
    if(!Number.isInteger(body.biometria)) return response.status(400).json({ message: 'o campo biometria deve ser um valor inteiro' });

    next();
};

module.exports = {
    validateValues
};
