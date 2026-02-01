import mongoose from 'mongoose';

/* 
Databse configuration
Implements connection pooling, retry logic, and  event handling
*/

class Database {
    constructor() {
        this.connection = null;
        this.connectionAttempts = 0;
        this.maxRetries = 5;
        this.retryDelay = 5000; // 5 seconds
    }

    async connect() {
        const options = {
            // Connection pooling
            maxPoolSize: 10, //Maximum 10 connections in pool

            minPoolSize: 2, //Minimum 2 connections always ready

            //Timeouts
            serverSelectionTimeoutMS: 5000, //Timeout after 5s if can't connect
            socketTimeoutMS: 45000, //close sockets after 45s of inactivity

            // Reconnection
            retryWrites: true, //Retry failed writes
            retryReads: true, // Retry failed reads

            //Naming
            dbName: 'distributex', // Database name
        };

        try {
            this.connectionAttempts++;

            console.log(`Attempting MongoDB connection (${this.connectionAttempts}/${this.maxRetries})...`);

            await mongoose.connect(process.env.MONGO_URI, options);

            this.connection = mongoose.connection;
            this.setupEventHandlers();

            console.log(`MOngoDB connected successfully`);
            console.log(`Database: ${this.connection.name}`);
            console.log(` Host: ${this.connection.host}`)

            return this.connection;

        } catch (error) {
            console.error('MongoDB connection failed:', error.message);

            if (this.connectionAttempts < this.maxRetries) {
                console.log(`Retrying in ${this.retryDelay / 1000} seconds...`);

                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.connect();
            }
            else {
                console.error('Max connection retries reached. EXiting...')
                process.exit(1);
            }
        }
    }


    setupEventHandlers() {
        this.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        this.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from Mongodb');
        });

        this.connection('error', (err) => {
            console.error('Mongoose connection error: ', err);
        });

        // Reconnection events
        this.connection.on('reconnected', () => {
            console.log('Mongoose reconnected to MongoDB');
        });

        this.connection.on('reconnectFailed', () {
            console.error('Mongoose reconnection failed');
        })
    }

    //Gracefully close database connection

    async disconnect() {
        if (this.connection) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed gracefully');
        }
    }

    //Get connection status
    getStatus() {
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };
        return states[mongoose.connection.readyState] || 'unknown';
    }
}

//Export singleton instance
export default new Database();