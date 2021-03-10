import PouchDB from "pouchdb";


const GLOBAL_DB_NAME =  "EasyZmp"





export const DBUtils = {
  createTable: (table) => new PouchDB(GLOBAL_DB_NAME + "/" + table),
  get: (table, key, callback, errorCallback) => table.get(key).then(
      doc => {
        const { value } = doc
        callback && callback(value)
      })
      .catch(
          (err) => {
            if (err.name === 'not_found') {
              errorCallback && errorCallback()
            } else { // hm, some other error
              throw err;
            }
          }
      )
  ,
  set: (table, key, value, callback, errorCallback) => {
    table.get(key).then((doc) => {
      doc.value = value;
      table.put(doc).then(() => {
        callback && callback()
      }).catch(
          () => errorCallback && errorCallback()
      )
    })
    .catch(
      (err) => {
        if (err.name === 'not_found') {
          const doc = {}
          doc._id = key
          doc.value = value;

          table.put(doc).then(() => {
            callback && callback()
          }).catch(
              (err) => errorCallback && errorCallback(err)
          )
        } else { // hm, some other error
          throw err;
        }
      }
    )


  }
}

const Database = () => {

}

export default Database;
