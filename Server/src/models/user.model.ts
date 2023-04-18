import { sequelize } from '../database/connection';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from 'sequelize';

type BattleStyleT =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7;

// Based on Star Wars saga there are 6 diferent color of lightsabers
type LightSaberColorT =
    | "blue"
    | "yellow"
    | "green"
    | "purple"
    | "orange"
    | "red";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare lightSaberColor: CreationOptional<LightSaberColorT>;
    declare isApprentice: CreationOptional<boolean>;
    declare battleStyle: CreationOptional<BattleStyleT>;
    declare isDeleted: CreationOptional<boolean>;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lightSaberColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Blue"
        },
        isApprentice: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        battleStyle: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
    {
        tableName: 'users',
        sequelize,
    }
);

