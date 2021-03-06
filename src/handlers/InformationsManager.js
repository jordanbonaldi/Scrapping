const Information = require('../handlers/Information');


class InformationsManager {

    /**
     *
     * @param engines {Array}
     */
    constructor(engines) {
        this._engines = engines;
    }

    launch() {
        return Promise
            .all(this._engines.map((e) => e.loadProcedure()))
    }

    /**
     *
     * @param hotels
     * @returns {Promise<any[]>}
     */
    updateAddress(hotels) {
        return Promise.all(this._engines.map(e => e.loadAddress(hotels)))
    }

    /**
     *
     * @param engine
     * @param name
     * @returns {PromiseLike<any[]|never>}
     */
    searchHotelName(engine, name) {
        return this.getByName(engine).loadHotel(name)
    }

    /**
     *
     * @param name
     * @returns {Information}
     */
    getByName(name) {
        return this._engines.filter(e => e.name == name)[0]
    }

    get engines() {
        return this._engines;
    }
}

const fs = require('fs');

const site = './src/sites/';

/**
 *
 * @param from
 * @returns {Array}
 */
const getEngines = (from = '') => {

    if (from !== '')
        from += '/';

    let files = fs.readdirSync(site + from);

    let engines = [];

    files.forEach(f => {
        if (!f.includes('.js'))
            engines = engines.concat(getEngines(from + f));
        else if (f.includes('Information.js'))
            engines.push(
                require('../sites/' + from + f)
            )
    });

    return engines;
};

/**
 *
 * @type {InformationsManager}
 */
module.exports = new InformationsManager
(
    getEngines()
);
