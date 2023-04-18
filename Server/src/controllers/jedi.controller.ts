import { Request, Response } from "express";
import { User } from "../models/user.model";

const saberColors = ["blue", "yellow", "green", "purple", "orange", "red"];

const jediController = {
    createJedi: async (req: Request, res: Response) => {

        const { name, lightSaberColor, isApprentice, battleStyle } = req.body;

        if (!name) {
            return res.status(400).send({ error: 'The name field is mandatory!' });
        }

        if (!saberColors.includes(lightSaberColor)) {
            return res.status(400).send({ error: 'You must choose a valid color JEDI!' });
        }

        if (battleStyle < 1 || battleStyle > 7) {
            return res.status(400).send({ error: 'Valid battle styles are 1 - 7!' });
        }

        try {
            await User.create({
                name: name,
                lightSaberColor: lightSaberColor,
                isApprentice: isApprentice,
                battleStyle: battleStyle
            });
            return res.status(200).send({ success: `A new Jedi with name: ${name} was created successfully!` });
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
    },
    getAllJedis: async (req: Request, res: Response) => {
        try {
            const jedis = await User.findAll();

            if (jedis.length < 1) {
                return res.status(404).json({ error: "The jedi list is empty!" })
            }

            return res.status(200).json({ success: jedis });
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
    },
    getJediByPk: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const jedi = await User.findByPk(id);

            if (!jedi) {
                return res.status(404).json({ error: "The jedi doesn't exist!" });
            }

            return res.status(200).json({ success: jedi });
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
    },
    updateJediByPk: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, lightSaberColor, isApprentice, battleStyle } = req.body;

        if (lightSaberColor) {
            if (!saberColors.includes(lightSaberColor)) {
                return res.status(400).send({ error: 'You must choose a valid color JEDI!' });
            }
        }

        if (battleStyle < 1 || battleStyle > 7) {
            return res.status(400).send({ error: 'Valid battle styles are 1 - 7!' });
        }
        try {
            const jedi = await User.findByPk(id);

            if (!jedi) {
                return res.status(404).json({ error: "The jedi doesn't exist!" });
            }

            if (name) {
                jedi.name = name
                await jedi.save({ fields: ['name'] });
            }

            if (lightSaberColor) {
                jedi.lightSaberColor = lightSaberColor
                await jedi.save({ fields: ['lightSaberColor'] });
            }

            if (isApprentice) {
                jedi.isApprentice = isApprentice
                await jedi.save({ fields: ['isApprentice'] });
            }

            if (battleStyle) {
                jedi.battleStyle = battleStyle
                await jedi.save({ fields: ['battleStyle'] });
            }

            const updatedJedi = await jedi.reload();
            return res.status(200).json({ success: updatedJedi });
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
    },
    deleteJediByPk: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const jedi = await User.findByPk(id);

            if (!jedi) {
                return res.status(404).json({ error: "The jedi doesn't exist!" });
            }
            await User.destroy({
                where: {
                    id: id
                }
            })
            return res.status(200).json({ success: "Jedi deleted succesfully!" });
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong!' });
        }
    }
}

export default jediController;