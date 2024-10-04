class Item {
    constructor(nom,prix, itemList){
        var _date = new Date();
        this.nom = nom;  
        this.prix = prix;
        this.date = String(_date.getMonth() + 1 ).padStart(2,'0') + '/' + String(_date.getDate()).padStart(2,'0') + '/' +String(_date.getFullYear());
        this.id = itemList.getLastItemId() + 1;
    }
}

class ItemList {
    constructor(){
        this.tab = [];
    }
    add(item){
        this.tab.push(item);
    }
    getLength(){
        return this.tab.length;
    }
    removeItemById(id){
        const originalLength = this.getLength();
        this.tab = this.tab.filter(item => item.id != id);
        return this.getLength() < originalLength ? 1 : 0;
    }
    removeItemByName(nom){
        const originalLength = this.getLength();
        this.tab = this.tab.filter(item => item.nom != nom);
        return this.getLength() < originalLength ? 1 : 0;
    }
    getLastItemId(){
        var length = this.getLength()
        if(length > 0)
            return this.tab[length -1].id;
        return 0;
    }
}






// console.log("ItemList après ajout de 3 items :", itemList.tab);

// itemList.removeItemById(2);
// console.log("ItemList après suppression de l'item du milieu (id = 2) :", itemList.tab);

// const item4 = new Item( 'kiwi', '1,50', itemList);
// itemList.add(item4);
// console.log("ItemList après ajout d'un nouvel item (kiwi) :", itemList.tab);

// itemList.removeItemByName('banane');
// console.log("ItemList après suppression du 1er item par nom (banane) :", itemList.tab);

module.exports = {Item, ItemList};