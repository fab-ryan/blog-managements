import databaseConfig from '../config/config'
import { Sequelize } from 'sequelize'
import { AllModal } from './models';
interface ConfigInterface {
    username: string;
    password: string;
    database: string;
    port: number;
    host: string;
}
const getPrefix = () => {
    var env = process.env.ENV;
    if (!env) {
        return env = 'DEV'
    }
    return env
}

export const dbConnection = () => {
    const db_config = databaseConfig() as ConfigInterface
    const sequelize = new Sequelize({
        ...db_config,
        dialect: 'postgres',
    })
    return sequelize
}

const models = AllModal(dbConnection())

Object.values(models).forEach(model => {
    if (model?.association) {
        model.association(model)
    }
})

export const Database = { ...models, database: dbConnection() }
