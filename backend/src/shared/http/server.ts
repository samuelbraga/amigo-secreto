import app from "./app";

const { PORT } = process.env;
app.listen(PORT || 3333, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running!\n${process.env.BASE_URL}:${PORT || 3333}`);
});
