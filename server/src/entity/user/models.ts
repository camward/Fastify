import { DataTypes, Model } from "sequelize";
import { UserProps } from "./types";
import sequelize from "../../db";

class User extends Model<UserProps> implements UserProps {
  declare id: number;
  declare fio: string;
  declare date: string;
  declare status: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
