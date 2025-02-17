declare module 'next' {
  interface NextApiRequest {
    file?: Express.Multer.File;
  }
}

declare module 'multer'; 