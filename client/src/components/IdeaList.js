import IdeasApi from '../services/IdeasApi.js';


class IdeaList{
    constructor(){
        this._ideaListEl = document.querySelector('#idea-list');
        this.getIdeas();
        this._ideas = [
        ]
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    }

    addEventListeners(){
        this._ideaListEl.addEventListener('click',(e)=>{
            if(e.target.classList.contains('fa-times')){
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }
        })
    }

    async getIdeas(){
        try {
            const res = await IdeasApi.getIdeas();
            const data = await res.json();
            this._ideas = data.data;
            console.log(this._ideas);
            this.render();
        } catch (error) {
            console.log(`error in fetching ${error}`);
        }
    }

    addIdeaToList(idea){
        this._ideas.push(idea);
        this.render();
    }

    async deleteIdea(ideaId){
        console.log(ideaId);
        try {
            const res = await IdeasApi.deleteIdea(ideaId);
            // const feedback = await res.json();
            // this._ideas.filter((idea)=> {
            //     console.log(idea._id);
            //     console.log(idea._id !== ideaId);
            //     return idea._id !== ideaId;
            // });
            this.getIdeas();
        } catch (error) {
            console.log(`error in deleting ${error}`);
        }
    }

    getTagClass(tag){
        tag = tag.toLowerCase();
        let tagClass = '';
        if(this._validTags.has(tag)){
            tagClass = `tag-${tag}`;
        }
        else{
            tagClass = '';
        }
        return tagClass;
    }

    render(){
        this._ideaListEl.innerHTML = this._ideas.map((idea)=>{
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem('username') ? 
            `<button class="delete"><i class="fas fa-times"></i></button>` : '';

            return `
                <div class="card" data-id="${idea._id}">
                ${deleteBtn}
                    <h3>
                        ${idea.title}
                    </h3>
                    <p class="tag ${tagClass}">${idea.tag.toLocaleUpperCase()}</p>
                    <p>
                        Posted on <span class="date">${idea.date}</span> by
                        <span class="author">${idea.username}</span>
                    </p>
                </div>
            `;
        }).join('');
        this.addEventListeners();
    }
}

export default IdeaList;