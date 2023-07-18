-- CreateTable
CREATE TABLE "pastes" (
    "code" VARCHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "pastes_pkey" PRIMARY KEY ("code")
);
