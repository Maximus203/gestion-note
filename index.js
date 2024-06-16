const Express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const backend = Express();
const adresseIp = "localhost";
const port = 4300;

const { creerEtiquette, listeEtiquettes } = require("./controllers/etiquette/etiquette");

backend.set('view engine', 'ejs');
backend.use(Express.json());
backend.use(Express.static('views'));
// Middleware de journalisation avec Morgan
backend.use(morgan('dev'));

backend.get("/", (req, res) => {
    res.render("accueil.ejs");
});

backend.get("/api", (req, res) => {
    res.json({
        message: "Accueil"
    });
});

backend.get("/etiquette/lister", async (req, res) => {
    let etiquettes = await listeEtiquettes()
    res.render("etiquette/index.ejs", { "etiquettes": etiquettes });
});

backend.get("/api/etiquette/lister", async (req, res) => {
    let etiquettes = await listeEtiquettes()
    res.json(etiquettes);
});



backend.post("/api/etiquette/creer", async (req, res) => {
    let donnees = req.body;
    if (await creerEtiquette(donnees["nom_etiquette"])) {
        res.json({ message: `Création de l'étiquette: ${donnees["nom_etiquette"]}` });
    }
});



backend.listen(port, adresseIp, () => {
    console.log(`Le serveur tourne sur l'adresse: http://${adresseIp}:${port}/`);
});