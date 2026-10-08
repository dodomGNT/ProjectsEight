CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1536),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "documents_embedding_idx" ON "documents" USING hnsw ("embedding" vector_cosine_ops);