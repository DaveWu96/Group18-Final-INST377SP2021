export default (database, DataTypes) => {
    const Players = database.define(
      'players',
      {
        first_name:{
          type: DataTypes.STRING
        },

        last_name:{
          type: DataTypes.STRING
        },

        player_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        height:{
          type: DataTypes.FLOAT
        },
        weight:{
          type: DataTypes.INTEGER
        },
        position:{
            type: DataTypes.STRING
        },
        college:{
            type: DataTypes.STRING
        },
        year_drafted:{
            type: DataTypes.INTEGER
        },
        team_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        }
    },
    { freezeTableName: true, timestamps: false }
  );

  return Players;
};
  