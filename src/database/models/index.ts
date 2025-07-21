import { UserModal, User } from "./User";
import { Sequelize } from "sequelize";
interface Modals {
    User: typeof User
}
export const AllModal = (sequelize: Sequelize): Modals => {
    return {
        User: UserModal(sequelize)
    }
}