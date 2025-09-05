const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 200]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const tags = this.getDataValue('tags');
        return tags ? JSON.parse(tags) : [];
      },
      set(value) {
        this.setDataValue('tags', JSON.stringify(value));
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'published'
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'blogs',
    indexes: [
      {
        unique: true,
        fields: ['slug']
      },
      {
        fields: ['category']
      },
      {
        fields: ['status']
      }
    ],
    hooks: {
      beforeCreate: (blog) => {
        if (!blog.slug) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);
        }
        if (!blog.excerpt && blog.content) {
          blog.excerpt = blog.content.substring(0, 200) + '...';
        }
      },
      beforeUpdate: (blog) => {
        if (blog.changed('title') && !blog.changed('slug')) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-6);
        }
        if (blog.changed('content') && !blog.changed('excerpt')) {
          blog.excerpt = blog.content.substring(0, 200) + '...';
        }
      }
    }
  });

  return Blog;
};
