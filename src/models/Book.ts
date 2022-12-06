import mongoose from 'mongoose';

interface BookAttributes {
  book_title: string;
  book_author: String;
  book_price: number;
}

interface CategotyModel extends mongoose.Model<BookDoc> {
  build(attributes: BookAttributes): BookDoc;
}

interface BookDoc extends mongoose.Document {
  book_title: string;
  book_author: String;
  book_price: number;
}

const BookSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
    },
    book_author: {
      type: String,
      require: true,
    },
    book_price: {
      type: Number,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BookSchema.statics.build = (attributes: BookAttributes) => {
  return new Book(attributes);
};

const Book = mongoose.model<BookDoc, CategotyModel>('Book', BookSchema);

export { Book };
