import db from "../config/dbConfig.js"
import verify from "../utils/authHelper.js";


const getBudget = async (req, res) => {
    const header = req.headers;
    try {
        const answer = verify(header, req.params.id);
        if (answer.status !== 200) {
            return res.status(400).json({ message: answer.message });
        }
        const { id } = answer.payload;

        const data = await db.query("SELECT amount FROM budgets WHERE user_id=$1", [id]);
        if (data.rows.length === 0) {
            return res.status(404).json({ message: "There is no such field" });
        }
        return res.status(200).json({ ...data.rows[0] });

    }
    catch (error) {
        console.log(error.message);

        if (process.env.NODE_ENV === "test") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        } else {
            return res.status(500).json({ message: "Error during get budget amount" });
        }
    }
};


const postBudget = async (req, res) => {
    if (!req.body.amount) {
        return res.status(400).json({ message: "Missing request body" });
    }
    const header = req.headers;



    try {
        const { amount } = req.body;
        if (typeof amount !== "number" || amount < 0 || isNaN(amount)) {
            return res.status(400).json({ message: "Budget must be a valid positive number" });
        }
        const check = verify(header, req.params.id);
        if (check.status !== 200) {
            return res.status(400).json({ message: check.message });
        }

        const { id } = check.payload;

        await db.query("INSERT INTO budgets (user_id,amount) VALUES ($1,$2)", [id, amount]);

        return res.status(202).json({ message: "Budget added to user" });
    }
    catch (error) {
        console.log("The error message: "+error.message);

        if (process.env.NODE_ENV === "test") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        }

        return res.status(500).json({ message: "Error during update budget" });
        
    }
};


const deleteBudget = async (req, res) => {
    const header = req.headers;
    try {
        const check = verify(header, req.params.id);
        if (check.status !== 200) {
            return res.status(400).json({ message: check.message })
        }
        const { id } = check.payload;
        await db.query("DELETE FROM budgets WHERE user_id=$1", [id]);
        return res.status(200).json({ message: "budget deleted" });

    }
    catch (error) {
        console.log(error.message);

        if (process.env.NODE_ENV === "test") {
            return res.status(500).json({ message: error.message, stack: error.stack });
        } else {
            return res.status(500).json({ message: "Error during delete budget" });
        }
    }

};

export default { getBudget, postBudget, deleteBudget };