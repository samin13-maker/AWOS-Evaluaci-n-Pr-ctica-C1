CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    member_type TEXT NOT NULL,
    joined_at DATE NOT NULL
);


CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL
);


CREATE TABLE copies (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    barcode TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);


CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    copy_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    loaned_at DATE NOT NULL,
    due_at DATE NOT NULL,
    returned_at DATE,
    FOREIGN KEY (copy_id) REFERENCES copies(id),
    FOREIGN KEY (member_id) REFERENCES members(id)
);


CREATE TABLE fines (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    paid_at DATE,
    FOREIGN KEY (loan_id) REFERENCES loans(id)
);
