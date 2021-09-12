import commentsView from '@app/views/comments.twig';
import indexView from '@app/views/index.twig';

document.getElementById("app").innerHTML = indexView({});

//url du post 1
const getOnePost = new Request('https://jsonplaceholder.typicode.com/posts/1/');
//url des commentaires du post 1
const getPostComments = new Request('https://jsonplaceholder.typicode.com/posts/1/comments');

//Loader
const loader = document.getElementById("spinner");
const setLoading = loading => {
   if(!loading) {
       loader.setAttribute('hidden', '');
   } else {
       loader.removeAttribute('hidden');
   }
}
// Permet d'afficher l'erreur
const displayError = (name, className, message) => {
    name = document.createElement("div");
    name.className = className;
    document.body.appendChild(name);
    name.innerHTML = message
}

// Permet d'ajouter de la data dans un element html
const setElementContentByClassName = (className, html) => {
    const name = document.querySelector(`.${className}`);
    name.innerHTML = html
}

//Permet de récupérer le post 1 et d'insérer le résulat dans des éléments html
const fetchOnePost = () => {
    //On affiche le loader
    setLoading(true)
    return fetch(getOnePost)
        .then(response => response.json())
        .then(data => {
            //Titre du Post
            setElementContentByClassName("postTitle",  data.title);
            //Contenu du Post
            setElementContentByClassName("postContent",  data.body);
        }).catch(err => {
            //Gestion de l'erreur si l'api ne répond pas
            if (err) {
                displayError("getPostError", "postError", "Désolé mais nous n'avons pas réussis à récupérer le post demandé veuillez vérifier votre connection internet &#128540;")
            }
        }).finally(() => {
            setLoading(false)
        });
}



//Permet de récupérer les commentaires du post 1 et d'insérer le résulat dans des éléments html
const fetchPostComments = () => {
    //On affiche le loader
    setLoading(true)

    return fetch(getPostComments)
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                document.getElementById("comments").innerHTML = commentsView({comments: data});
            }else{
                document.getElementById("comments").innerHTML = "Aucun commentaires"
            }
        }).catch(err => {
            //Gestion de l'erreur si l'api ne répond pas
            if (err) {
                displayError("getCommentError", "commentError", "Désolé mais nous n'avons pas réussi à récupérer le ou les commentaires de ce post veuillez vérifier votre connection internet &#128540;")
            }
        }).finally(() => {
            setLoading(false)
        });
}

// Ajout des events d'initialisation
document.addEventListener("DOMContentLoaded", function() {
    fetchOnePost();
})

document.querySelectorAll('.loadComments').forEach(el => el.addEventListener("click", fetchPostComments))
