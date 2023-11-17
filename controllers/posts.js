const posts = require("../db.js");

// Creiamo poi una rotta /posts che ritorni tramite content negotiation la lista dei post, da un array locale. Ritorniamo i dati sotto forma di json e html stampando una semplice ul.
function index(req, res) {
    res.format({
        html: () => {
            const html = ["<h1> Elenco posts </h1>"]

            html.push("<ul>");

            for (const post of posts) {
                html.push(
                    `<li>
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <img src="/imgs/posts/${post.image}" alt="" style="width: 100px"
                        </li>`);
            }
            html.push("</ul>");

            res.send(html.join(""));
        },

        json: () => {
            res.type("json").send({
                totalPosts: posts.length,
                list: posts
            });
        },

        default: () => {
            res.status(406).send("Error");
        }
    });
}

function show(req, res) {

    res.format({
        json: () => {
            const postSlug = req.params.slug;

            const post = posts.find((post) => post.slug == postSlug);

            if (!post) {
                res.status(404).send("Error");
                return;
            }

            res.json(post);
        },

        default: () => {
            res.status(404).send("no buono");
        }


    })

}













module.exports = {
    index,
    show,
}