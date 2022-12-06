import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Book } from '../models/Book';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const book = await Book.find({});
  res.send(book);
});

router.post(
  '/',
  [
    body('book_title').not().isEmpty().withMessage('Please enter a book name'),
    body('book_author').not().isEmpty().withMessage('please enter book author'),
    body('book_price').not().isEmpty().withMessage('please enter book price'),
  ],
  async (req: Request, res: Response) => {
    
    // check if the book already exists
    let isAvailable = await Book.findOne({ book_title: req.body.book_title });

    if (isAvailable) {
      res.status(400).send(' Book already exists');
    }
    else{
      const book = await Book.build({
        book_title: req.body.book_title,
        book_author: req.body.book_author,
        book_price: req.body.book_price,
      });
  
      try {
        await book.save();
      } catch (err) {
        console.log(err);
      }
      res.status(201).send(book);
    }
    
  }
);

router.delete('/book/:name', async (req: Request, res: Response) => {
  const book = await Book.findOne({ book_title: req.params.name });
  if (!book) {
    res.status(400).send('Not available');
  } else {
    await book.remove({ book_title: req.params.name });
    res.send('Book : ' + book.book_title + ' successfully Removed');
  }
});

router.put(
  '/book/:name',
  [
    body('book_title').not().isEmpty().withMessage('Please enter a book name'),
    body('book_author').not().isEmpty().withMessage('please enter book author'),
    body('book_price').not().isEmpty().withMessage('please enter book price'),
  ],

  async (req: Request, res: Response) => {
    const book = await Book.findOne({ book_title: req.params.name });
    if (!book) {
      //throw new Error('NOt available');
      res.status(400).send('Not available');
    } else {
      book.set({
        book_title: req.body.book_title,
        book_author: req.body.book_author,
        book_price: req.body.book_price,
      });

      await book.save();
      res.status(201).send(book);
    }
  }
);

export { router as bookRouter };
