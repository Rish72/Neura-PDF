# Neura PDF: AI-Powered Document Interaction

![image](https://github.com/user-attachments/assets/70834be2-578e-40fe-a54d-716b4248ff40)
Neura PDF is an innovative AI-powered web application that revolutionizes how users interact with their PDF documents. Upload your PDF files, and engage in a conversational chat to extract answers, summarize content, and gain insights directly from your documents.

## ✨ Features

* **PDF Upload:** Easily upload your PDF documents through a user-friendly interface.
* **Conversational Chat:** Ask questions and receive AI-generated answers directly from the content of your uploaded PDFs.
* **Intelligent Content Retrieval:** Utilizes advanced Retrieval-Augmented Generation (RAG) to ensure accurate and contextually relevant responses.
* **Vector Database Integration:** Stores document embeddings in a Pinecone vector database for efficient semantic search.
* **Robust AI Model:** Powered by Google Gemini for generating high-quality embeddings and conversational responses.
* **User Authentication:** Secure user management powered by Clerk for managing your documents and chat sessions.
* **Scalable Architecture:** Built on a modern Next.js framework with serverless functions for efficient processing.

## 🚀 Technologies Used

* **Frontend:**
    * [Next.js](https://nextjs.org/) (React Framework)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [TanStack Query](https://tanstack.com/query/latest) (for data fetching)
    * [Clerk](https://clerk.com/) (for authentication)
    * [react-dropzone](https://react-dropzone.js.org/) (for file uploads)
    * [Lucide React Icons](https://lucide.dev/)
* **Backend & AI:**
    * [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes) (for serverless functions)
    * [Google Gemini API](https://ai.google.dev/docs/) (for embeddings and LLM)
    * [Pinecone](https://www.pinecone.io/) (Vector Database)
    * [LangChain.js](https://js.langchain.com/docs/) (for AI orchestration, PDF loading, text splitting, and embeddings)
    * [AWS S3](https://aws.amazon.com/s3/) (for PDF storage)
    * [Drizzle ORM](https://orm.drizzle.team/docs/) (for database interactions)
* **Database:**
    * Your chosen SQL database (e.g., PostgreSQL, MySQL)

## ⚙️ Setup and Installation

Follow these steps to get your Neura PDF project up and running locally:

### Prerequisites

* Node.js (v18.x or higher recommended)
* npm or Yarn
* AWS S3 Bucket
* Google Cloud Project with Gemini API enabled
* Pinecone Account and Index
* A SQL Database (e.g., PostgreSQL)
* Clerk Account

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd neura-pdf-project
```
### 2. Install dependencies
```bash
npm install
# or
yarn install
```


### 3. Configure Environment Variables
Create a .env.local file in the root of your project and add the following environment variables. Ensure sensitive keys are NOT prefixed with NEXT_PUBLIC_ if used server-side.

   * #### Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
   
   * #### AWS S3 (Note: NEXT_PUBLIC_ for client-side uploads, if any)
    NEXT_PUBLIC_S3_ACCESS_KEY_ID=your_s3_access_key_id
    NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your_s3_secret_access_key
    NEXT_PUBLIC_S3_BUCKET_NAME=your_s3_bucket_name
    AWS_REGION=your_aws_region # e.g., ap-south-1
   
   * #### Google Gemini API
    GEMINI_API_KEY=your_gemini_api_key
   
   * #### Pinecone
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_ENVIRONMENT=your_pinecone_environment # or PINECONE_CLOUD/PINECONE_REGION
   
   * #### Database (Drizzle ORM)
      DATABASE_URL="postgresql://user:password@host:port/database_name" # Your database connection string


### 4. Database Migrations (if using Drizzle)
Ensure your database schema is in sync. Refer to your Drizzle setup for migration commands (e.g., drizzle-kit push:pg).

5. Run the application
```bash
npm run dev
# or
yarn dev
```
## 🚀 Deployment
This project is designed for deployment on Vercel. Ensure all environment variables are correctly configured in your Vercel project settings, paying close attention to the distinction between NEXT_PUBLIC_ and server-only variables.

For handling long-running PDF processing tasks, consider implementing Vercel Background Functions or a Vercel Queue to avoid API timeouts.

## 🤝 Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

## 📄 License
This project is open-source and available under the MIT License.
