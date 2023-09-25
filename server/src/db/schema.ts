import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users
export const users = sqliteTable('users', {
  bio: text('bio'),
  createdAt: text('createdAt').notNull(),
  displayName: text('displayName').notNull(),
  email: text('email').unique(),
  id: integer('id').primaryKey(),
  photo: text('photo'),
  username: text('username').unique(),
});
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

// Posts
export const posts = sqliteTable('posts', {
  authorId: integer('authorId').notNull(),
  createdAt: text('createdAt').notNull(),
  id: integer('id').primaryKey(),
  message: text('message').notNull(),
  reactions: integer('reactions').default(0),
});
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
