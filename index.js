import express from "express";
import TypingMetrics from 'typing-metrics';
import loremGenerator from "dummy-text-generator";

const app = express();
const port = 3000;
const typingMetrics = new TypingMetrics();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // let words = req.body.words || 10;
    // let paragraph = loremGenerator.generateSentence(words);
    let paragraph = loremGenerator.generateParagraph(5, 10);
    res.render("index.ejs", { paragraph: paragraph });
});

app.post("/results", (req, res) => {
    try {
        const paragraph = req.body.paragraph;
        const input = req.body.input;
        const timeLimit = parseInt(req.body.timeLimit, 10) || 60; // Default to 60 seconds if no time limit is provided
        const metrics = typingMetrics.calculateMetrics(paragraph, input, timeLimit);
        res.render("results.ejs", { metrics: metrics });
    } catch (error) {
        console.error("Error calculating typing metrics:", error);
        res.status(500).send("An error occurred while calculating typing metrics.");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
