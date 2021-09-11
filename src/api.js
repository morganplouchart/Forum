
//url du post 1
const getOnePost = new Request(' https://jsonplaceholder.typicode.com/posts/1/');
//url des commentaires du post 1
const getPostComments = new Request(' https://jsonplaceholder.typicode.com/posts/1/comments');

//Loader
const spinner = document.getElementById("spinner");

// Permet d'afficher l'erreur
const displayError = (name, className, message) => {
    name = document.createElement("div");
    name.className = className;
    document.body.appendChild(name);
    name.innerHTML = message
}

// Permet d'afficher un element html
const elementHtml = (name, className, data) => {
    name = document.querySelector(`.${className}`);
    name.innerHTML = data
}

//Permet de récupérer le post 1 et d'insérer le résulat dans des éléments html
const fetchOnePost = () => {
    //On affiche le loader
    spinner.removeAttribute('hidden');
    return fetch(getOnePost)
        .then(response => response.json())
        .then(data => {
            //On test et on ajoute l'attribute hidden
            if(data){
                spinner.setAttribute('hidden', '');
            }
            //Titre du Post
            elementHtml("postTitle", "postTitle", data.title);
            //Contenu du Post
            elementHtml("postContent", "postContent", data.body);
        }).catch(err => {
            //Gestion de l'erreur si l'api ne répond pas
            if (err) {
                return displayError("getPostError", "postError", "Désolé mais nous n'avons pas réussis à récupérer le post demandé veuillez vérifier votre connection internet &#128540;")
            }

        });
}

//Permet de récupérer les commentaires du post 1 et d'insérer le résulat dans des éléments html
const fetchPostComments = () => {
    //On affiche le loader
    spinner.removeAttribute('hidden');

    return fetch(getPostComments)
        .then(response => response.json())
        .then(data => {
            //On test et on ajoute l'attribute hidden
            if (data){
                spinner.setAttribute('hidden', '');
            }

            //Liste des commentaires
            let listComments = '<div>'

            //On boucle sur la data (ici les commentaires)
            data.forEach(function (comment) {
                //On ajoute dans notre variable à chaque passage de la boucle un nom, un email, et le corp du commentaire
                listComments += '<div class="cardComment">' + '<h2>' + comment.name + '</h2>' + '<h3>' + '<span>' + "email: " + '</span>' + comment.email + '</h3>' + +'<h4>' + comment.body + '</h4>' + '</div>';

            });

            listComments += '</div>';
            document.getElementById("comments").innerHTML = listComments;


        }).catch(err => {
            //Gestion de l'erreur si l'api ne répond pas
            if (err) {
                return displayError("getCommentError", "commentError", "Désolé mais nous n'avons pas réussi à récupérer le ou les commentaires de ce post veuillez vérifier votre connection internet &#128540;")
            }
        });
}