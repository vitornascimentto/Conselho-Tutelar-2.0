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

    recovery(emailAddress){
        var auth = firebase.auth();
        //var emailAddress = "user@example.com";

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            alert('Email enviado com sucesso!')
            window.location = './index.html';
        }).catch(function(error) {
            // An error happened.
            alert('Esse email não está cadastrado!')
        });
    }

    async adicionar(){        
        // Crinça
        let docRefCrianca = await this.DB.firestore().collection('crianca').add({
            name: localStorage.getItem('name'),
            dateNascimento: new Date(localStorage.getItem('dataNascimento'))
            //sexo: sexoCria
        });

        console.log(docRefCrianca.id);

        // Responsável
        let docRefResponsavel = await self.DB.firestore().collection('responsável').add({
            pai: localStorage.getItem('pai'),
            mae: localStorage.getItem('mae'),
            outros: localStorage.getItem('outros'),
            endereco: {
                bairro: localStorage.getItem('bairro'),
                rua: localStorage.getItem('rua'),
                numero: Number(localStorage.getItem("numero")),
                pontoReferencia: localStorage.getItem("pontoReferencia"),
                enderecoAlternativo: localStorage.getItem("enderecoAlternativo"),
            }, 
            telefone: localStorage.getItem('telefone')
        });

        console.log(docRefResponsavel.id);

        // Ocorrência
        await self.DB.firestore().collection('ocorrencia').add({
            dataAtendimento: new Date(localStorage.getItem('dataAtendimento')),
            description: localStorage.getItem('descricao'),
            numeroRegistro: Number(localStorage.getItem('numeroRegistro')),
            observacoes: localStorage.getItem('observacoes'),
            
            reference_crianca: {
                id: docRefCrianca.id,
                reference: docRefCrianca
            },
            reference_responsavel: {
                id: docRefResponsavel.id,
                refence: docRefResponsavel
            }
        });
    }

}