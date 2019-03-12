class Crud {
    /**
     *
     * @param name
     * @param model
     */
    constructor(name, model) {
        this.name = name;
        this.model = model;
    }

    /**
     *
     * @param data
     * @returns {Promise<any>}
     */
    create(data) {
        return new Promise((resolve, reject) => {
            let date = new Date();
            data = {
                ...data,
                _createdAt: date,
                _updatedAt: date
            };
            this.model.create(data, (err, doc) => {
                    if (err) reject(true);
                    else resolve(doc);
                }
            )
        });
    }

    /**
     *
     * @param identifier
     * @returns {Promise<any>}
     */
    get(identifier = {}) {
        return new Promise((resolve, reject) => {
            this.model.find(identifier, (err, docs) => {
                if (err) reject(true);
                else resolve(docs);

            })
        });
    };

    /**
     *
     * @param data
     * @param identifier
     * @returns {Promise<any>}
     */
    update(data, identifier = {}) {
        return new Promise((resolve, reject) => {
            data._updatedAt = new Date();
            this.model.updateOne(identifier, data, (err, res) => {
                    (err)
                        ? reject(true)
                        : resolve(res);
                }
            )
        });
    };

    /**
     *
     * @param identifier
     * @returns {Promise<any>}
     */
    delete(identifier = {}) {
        return new Promise((resolve, reject) => {
            this.model.deleteMany(identifier, (err, result) => {
                if (err) reject(true);
                else if (!result.n) reject(true);
                else resolve("Success");
            })
        });
    };

    /**
     *
     * @param identifier
     * @returns {Promise<any>}
     */
    getOne(identifier = {}) {
        return new Promise((resolve, reject) => {
            this.model.find(identifier, (err, docs) => {
                if (err) reject(true);
                else if (!docs.length) reject(true);
                else resolve(docs[0]);
            })
        });
    };

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    getById(id) {
        return this.getOne({ _id: id })
    }

    /**
     *
     * @param data
     * @returns {Promise<any>}
     */
    updateById(data) {
        return this.update(data, { _id: data.id })
    }

    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    deleteById(id) {
        return this.delete({ _id: id })
    }
}

/**
 *
 * @type {Crud}
 */
module.exports = Crud;
