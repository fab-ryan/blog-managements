'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    //  */await queryInterface.addColumn()
    await queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: Sequelize.STRING,
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: Sequelize.STRING,
        gender: {
          type: Sequelize.ENUM('male', 'female', 'other'),
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'user'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,

        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,

        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,

        },
        likes: {
          type: Sequelize.UUID,
          references: {
            model: 'Likes',
            key:'id'
          }
        }

      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users')
  }
};
