/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Blogs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE blogs_id_seq;
ALTER TABLE "Blogs" ALTER COLUMN "id" SET DEFAULT nextval('blogs_id_seq'),
ALTER COLUMN "keyword" DROP NOT NULL;
ALTER SEQUENCE blogs_id_seq OWNED BY "Blogs"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_slug_key" ON "Blogs"("slug");
