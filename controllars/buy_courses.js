import buy_course_model from "../models/buy_course_model.js";

export const add_buyed_course = async (req, res) => {
    try {
        const { _id, name, image, duration, price, videoUrl, notes, User_id } = req.body;

        const chechking = await buy_course_model.find({ name })
        const mapping = chechking.some(
            (item) => item.name === name && item.User_id === User_id
        );

        if (mapping) {
            res.send("YOU ARE ALREADY ENROLLED")

        }
        else {
            const inserting = await buy_course_model({ name, image, duration, price, videoUrl, notes, User_id });
            inserting.save();
            res.send('sucess')
        }

    } catch (error) {
        console.log(error)
        res.send(error.message);

    }


}

export const buyed_course_data = async (req, res) => {
    try {
        const { User_id } = req.body;

        // Check if User_id exists
        if (!User_id) {
            return res.status(400).json({
                success: false,
                message: "User_id is required",
            });
        }

        const finding = await buy_course_model.find({ User_id });

        res.send(finding)

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};