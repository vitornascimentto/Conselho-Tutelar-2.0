class User {

    constructor (DB){
        this.DB = DB;
    }

    login(email, senha){
        this.DB.auth().signInWithEmailAndPassword(email, senha).then ((result) => {
            console.log(result);
        }).catch((result) => {
            alert(result.message)
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

    recovery(emailAddress){
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            alert('Email enviado com sucesso!')
            window.location = './index.html';
        }).catch(function(error) {
            // An error happened.
            alert('Esse email não está cadastrado!')
        });
    }

}