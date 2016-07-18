import low from 'lowdb';
import fileAsync from 'lowdb/lib/file-async';

const createDB = (name) => low(`${process.cwd()}/data/${name}.json`, { storage: fileAsync });

export default createDB;
