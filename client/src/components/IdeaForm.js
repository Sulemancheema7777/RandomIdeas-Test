import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList.js"

class IdeaForm{
    constructor(){
        this._formModal = document.querySelector('#form-modal');
        this._ideaList = new IdeaList();
    }

    addEventListeners(){
        this._form.addEventListener('submit',this.handleSubmit.bind(this));
    }

    async handleSubmit(e){
        e.preventDefault();
        
        if(!this._form.elements.title.value || !this._form.elements.username.value || !this._form.elements.tag.value){
            alert('Enter values for all the fields');
            return;
        }

        const idea = {
            title:this._form.elements.title.value,
            tag:this._form.elements.tag.value,
            username:this._form.elements.username.value,
        }

        localStorage.setItem('username',this._form.elements.username.value);


        //add idea to server
        const newIdea = await IdeasApi.createIdea(idea);
        const data = await newIdea.json();

        
        //add idea to list
        this._ideaList.addIdeaToList(data.data);

        //empty form
        this._form.elements.title.value = '';
        this._form.elements.tag.value = '';
        //this._form.elements.username.value = '';

        this.render();


        document.dispatchEvent(new Event('closemodal'));

    }

    render(){
        this._formModal.innerHTML= `<form id="idea-form">
                <div class="form-control">
                    <label for="idea-text">Enter a Username</label>
                    <input type="text" name="username" id="username" value="${
                        localStorage.getItem('username') ? localStorage.getItem('username') : '' }"/>
                </div>
                <div class="form-control">
                    <label for="idea-title">What's Your Idea?</label>
                    <textarea name="title" id="idea-title"></textarea>
                </div>
                <div class="form-control">
                    <label for="tag">Tag</label>
                    <input type="text" name="tag" id="tag" />
                </div>
                <button class="btn" type="submit" id="submit">Submit</button>
            </form>`;
            this._form = document.querySelector('#idea-form');
            this.addEventListeners();
    }
}

export default IdeaForm;