import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  vector,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Dimensi embedding harus sama dengan output model embedding yang dipakai.
export const documents = pgTable(
  'documents',
  {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('documents_embedding_idx').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops'),
    ),
  ],
);
