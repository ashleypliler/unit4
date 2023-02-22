import { DataTypes } from "sequelize/types";
import { sequelize } from "../util/database";

module.exports = {
    user: sequelize.define('user', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING
    })
}