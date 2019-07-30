/**
 * @name Reroll-Initiative
 * @version 0.1
 * @author Evan Clarke <errational>
 * @description Rerolls initiative on combat round change
 */

 /**
  * --------------------
  * Set module variables
  * --------------------
  */
let RRI_CONFIG = {
    enabled: true
}
  

/**
 * @class RerollInitiative
 * @description Hooks on combat update and rerolls initiative for all combatants
 * @todo Add configurability for when to reroll and for whom
 */
class RerollInitiative {
    constructor() {
        this.postUpdateCombatHook();
    }

    /**
     * @name postUpdateCombatHook
     * @description Hook on combat update and if round in update is greater than previous -- call resetAndReroll
     */
    postUpdateCombatHook() {
        Hooks.on("updateCombat", (combat,update) =>  {
            if(RerollInitiativeSettings.getSettings.enabled){
                //Currently the previous round is captured in the 1st index of the Combat._previous array
                if(update.round && combat._previous && update.round > combat._previous[0]){
                    //console.log("Reroll-Initiative: Round incremented - rerolling initiative")
                    this.resetAndReroll(combat);
                }
            }
            
        }); 
    }

    /**
     * @name resetAndReroll
     * @param {Combat} combat
     * @description For the given combat instance, call the resetAll method and the rollAll method
     */
    async resetAndReroll(combat){
        await combat.resetAll();
        combat.rollAll();
    }
}

class RerollInitiativeConfig extends CombatTrackerConfig{
    static get defaultOptions(){
        const options = super.defaultOptions;
        //in the template, find the last element and then add a checkbox that flags whether to reroll or not
        const template = options.template;


    }

    
}

/**
 * @class RerollInitiativeSettings
 * @description Manages the settings for the module
 */
class RerollInitiativeSettings {
    constructor(){
        this._registerSettings();
    }

    static _registerSettings () {
        game.settings.register("reroll-initiative","defaultSettings",{
            name: "Reroll-Initiative Settings",
            config: RRI_CONFIG,
            default: this._defaultSettings,
            onChange: {
               this.settings  
            }

        })
    }

    static _defaultSettings() {

    }

    static _saveSettings () {

    }

    static _loadSettings (){
        this.settings = game.settings.get("reroll-initiative")
    }
}

let rri = new RerollInitiative();




