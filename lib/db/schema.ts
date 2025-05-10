import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

export const chats = pgTable('chats' ,{
    id: serial('id').primaryKey(),
    pdfName : text('pdf_name').notNull(),
    pdfUrl : text('pdf_url').notNull(),
    createAt : timestamp('created_At').notNull().defaultNow(),
    userId : varchar('userId', {length:256}).notNull(),
    fileKey : text('file_key').notNull()
})

export const messages = pgTable('messages', {
    id : serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => chats.id).notNull(),
    content: text('content').notNull(),
    createAt : timestamp('created_At').notNull().defaultNow(),
    role : userSystemEnum('role').notNull(),
})