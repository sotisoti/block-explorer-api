'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

const removeID = (obj) => {
    try{
       delete obj.id
    }catch(e){}
    return obj
}

const parseJSON = (obj, key) => {
    try{
        obj[key] = JSON.parse(obj[key])
    }catch(e){}
    return obj
}

module.exports = {
    find: async () => {
        let results = await strapi.query('subblocks').model
            .find({}, { "id": 0, "_id": 0, "__v": 0})
            .sort('-blockNum')
            .limit(25)

        return results.map(result => {
            result = removeID(sanitizeEntity(result, { model: strapi.models.subblocks }))
            result = parseJSON(result, 'transactions')
            result = parseJSON(result, 'merkleLeaves')
            result = parseJSON(result, 'signatures')
            return result
        });
    },
    findOne: async () => {
        let results = await strapi.query('subblocks').model
            .find({}, { "id": 0, "_id": 0, "__v": 0})
            .sort('-blockNum')
            .limit(25)

        return results.map(result => {
            result = removeID(sanitizeEntity(result, { model: strapi.models.subblocks }))
            result = parseJSON(result, 'transactions')
            result = parseJSON(result, 'merkleLeaves')
            result = parseJSON(result, 'signatures')
            return result
        });
    },
};
