const mongoose = require('mongoose');

const Fighter = mongoose.model('Fighter');

module.exports = {
    async index(req, res) {
        try {
            const fighters = await Fighter.find();

            return res.status(200).json(fighters);
        } catch (error) {
            return res.status(500).send('Erro ao buscar lutadores');
        }
    },

    async store(req, res) {
        try {
            const fighter = await Fighter.create(req.body);

            return res.status(200).json(fighter);
        } catch (error) {
            return res.status(500).send('Erro ao cadastrar lutador');
        }
    },

    async random(req, res) {
        try {
            let fighters = await Fighter.find({ 'gender': req.params.gender, 'category': req.params.category});

            if(!fighters) {
                return res.status(404).send('Não existem lutadores cadastrados nesta categoria');
            }

            if (fighters.length < 2) {
                return res.status(404).send('Quantidade insuficiente de lutadores para esta categoria');
            }

            const fighter1 = fighters[Math.floor(Math.random() * fighters.length)];
    
            fighters = fighters.filter(f =>f != fighter1);

            const fighter2 = fighters[Math.floor(Math.random() * fighters.length)];
           
            return res.status(200).json([fighter1, fighter2]);
        } catch (error) {
            return res.status(500).send('Erro ao gerar luta aleatória');
        }
    }
};