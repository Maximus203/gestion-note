const Express = require("express");
const morgan = require("morgan");
const backend = Express();
const adresseIp = "localhost";
const port = 4300;

const { creerEtiquette, listeEtiquettes } = require("./controllers/etiquette/etiquette");

backend.use(Express.json());
// Middleware de journalisation avec Morgan
backend.use(morgan('dev'));

backend.get("/", (req, res) => {
    res.json({
        message: "Accueil"
    });
});

backend.get("/etiquette/lister", async (req, res) => {
    let etiquettes = await listeEtiquettes()
    res.json(etiquettes);
});

backend.post("/etiquette/creer", async (req, res) => {
    let donnees = req.body;
    if (await creerEtiquette(donnees["nom_etiquette"])) {
        res.json({ message: `Création de l'étiquette: ${donnees["nom_etiquette"]}` });
    }
});

backend.all("", (req, res) => {
    res.json({
        message: "Not found"
    }).status(404);
});

backend.listen(port, adresseIp, () => {
    console.log(`Le serveur tourne sur l'adresse: http://${adresseIp}:${port}/`);
});