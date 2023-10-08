const validateCardsValues = (request, response, next) => {
    const { acesso_unico, codigo_qr } = request.body;

    if (!Number.isInteger(acesso_unico)) {
        return response.status(400).json({ message: 'acesso_unico não é um valor inteiro' });
    }

    next();
};

module.exports = {validateCardsValues}