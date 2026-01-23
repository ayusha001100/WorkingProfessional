
const MOCK_STORAGE_KEY = 'genai_mock_db';

const getMockDb = () => {
    const data = localStorage.getItem(MOCK_STORAGE_KEY);
    return data ? JSON.parse(data) : { users: {} };
};

const saveMockDb = (db) => {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(db));
};

export const db = {}; // Placeholder for the db object if needed

export const doc = (db, collection, id) => {
    return { collection, id };
};

export const collection = (db, name) => {
    return { name };
};

export const setDoc = async (docRef, data, options = {}) => {
    const { collection, id } = docRef;
    const db = getMockDb();
    if (!db[collection]) db[collection] = {};

    if (options.merge) {
        db[collection][id] = { ...db[collection][id], ...data };
    } else {
        db[collection][id] = data;
    }

    saveMockDb(db);
    return true;
};

export const updateDoc = async (docRef, data) => {
    const { collection, id } = docRef;
    const db = getMockDb();
    if (db[collection]?.[id]) {
        // Handle nested updates if needed (simple merge for now)
        db[collection][id] = { ...db[collection][id], ...data };
        saveMockDb(db);
    }
    return true;
};

export const addDoc = async (collectionRef, data) => {
    const { name } = collectionRef;
    const db = getMockDb();
    if (!db[name]) db[name] = {};
    const id = Math.random().toString(36).substr(2, 9);
    db[name][id] = { ...data, id };
    saveMockDb(db);
    return { id };
};

export const getDoc = async (docRef) => {
    const { collection, id } = docRef;
    const db = getMockDb();
    const data = db[collection]?.[id] || null;
    return {
        exists: () => !!data,
        data: () => data
    };
};

export const onSnapshot = (docRef, callback) => {
    const { collection, id } = docRef;
    const observer = () => {
        const db = getMockDb();
        const data = db[collection]?.[id] || null;
        callback({
            exists: () => !!data,
            data: () => data
        });
    };

    observer();
    // In a real app we'd use a listener, but for now just trigger once.
    return () => { };
};

export const serverTimestamp = () => new Date().toISOString();
export const arrayUnion = (...elements) => elements; // Simplified for mock
export const increment = (value) => value; // Simplified for mock
