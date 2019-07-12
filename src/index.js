const PORT_NUMBER = 3000;
const app = require('./app');

app.use((req, res) => {
    res.status(404);
    res.send({ error: "not Found - error 404" });
});

app.listen(PORT_NUMBER, () => {
    console.info(`Server listening @ http://localhost:${PORT_NUMBER}`);
});