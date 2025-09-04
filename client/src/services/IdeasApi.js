class IdeasApi{
    constructor(){
        this._apiURL =  'http://localhost:5000/api/ideas';
    }

    getIdeas(){
        return fetch(`${this._apiURL}`);
    }

    createIdea(data){
        return fetch(`${this._apiURL}`,{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
    }

    updateIdea(id,data){
        return fetch(`${this._apiURL}/${id}`,{
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(username)
        });
    }

    deleteIdea(id){
        const username =  localStorage.getItem('username') ?  localStorage.getItem('username') : '';
        console.log(id);
        return fetch(`${this._apiURL}/${id}`,{
            method:'DELETE',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username})
        });
    }
}

export default new IdeasApi();