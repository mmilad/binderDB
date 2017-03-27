window.MutationObserver = window.MutationObserver
    || window.WebKitMutationObserver
    || window.MozMutationObserver;
var binderDB = function() {
    var SELF = this,
        ATTACHMENTS=[],
        DATABASE = document.createElement('div');

    this.mainObj = DATABASE;
    this.db = DATABASE.dataset;
    this.outputBind = function(config) {
        if(!ATTACHMENTS[config.bind]) {ATTACHMENTS[config.bind] = [];}
        ATTACHMENTS[config.bind].push(config.to);
    };

    function conCamel(input) { 
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
    function ini() {
        var docObserver = new MutationObserver(function(mutations) {       
            var key;
            mutations.forEach(function(mutation){
                key = conCamel(mutation.attributeName.substring(5));
                if(ATTACHMENTS[key]) {
                    ATTACHMENTS[key].forEach(function(config){
                            if(config.element) {
                                if(config.attribute) {
                                    config.element.setAttribute(config.attribute, SELF.db[key]);
                                }
                                if(config.property){
                                    config.element[config.property] = SELF.db[key];
                                }
                            }
                    });
                }
                console.log(key+" changed to:");
                console.log(mutation.target.dataset[key]);
            });
        });
        docObserver.observe(DATABASE, { attributes: true});
    }
    ini();

    return this;
};