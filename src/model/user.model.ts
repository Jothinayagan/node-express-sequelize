export const userModel = (sequelize: any, Sequelize: any, DataTypes: any) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
        },
    });

    return User;
};
