const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
commentSchema.virtual('author', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

commentSchema.virtual('blog', {
  ref: 'Blog',
  localField: 'blogId',
  foreignField: '_id',
  justOne: true
});

// Indexes
commentSchema.index({ userId: 1 });
commentSchema.index({ blogId: 1 });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
