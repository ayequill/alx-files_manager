import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || '27017';
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const URL = `mongodb://${HOST}:${PORT}`;

/**
 * Class DBClient
 * @class
 * @classdesc DBClient class
 * @method isAlive - Check if the client is connected to the DB
 * @method nbUsers - Get the number of users
 * @method nbFiles - Get the number of files
 * const dbClient = new DBClient();
 * dbClient.isAlive();
 * dbClient.nbUsers();
 * dbClient.nbFiles();
 */
class DBClient {
  constructor() {
    this.client = new MongoClient(URL, { useUnifiedTopology: true });
    this.client.connect(() => console.log(`Connected to the DB: ${URL}`));
    this.db = this.client.db(DATABASE);
    this.users = this.db.collection('users');
    this.files = this.db.collection('files');
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = await this.users.countDocuments();
    return users;
  }

  async nbFiles() {
    const files = await this.files.countDocuments();
    return files;
  }
}

const dbClient = new DBClient();

export default dbClient;
