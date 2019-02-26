class User {

    constructor (DB){
        this.DB = DB;
    }

    login(email, senha){
        this.DB.auth().signInWithEmailAndPassword(email, senha).then ((result) => {
            console.log(result);
        });
    }

    check(){
        firebase.auth().onAuthStateChanged(function(user){
            if (user){
                window.location = './inicio.html';
            }else{
                if (window.location.href.split('/')[window.location.href.split('/').length-1] != 'index.html'){
                    window.location = './index.html';
                }
            }
        });
    }

    logout(){
        this.DB.auth().signOut();
    }

}