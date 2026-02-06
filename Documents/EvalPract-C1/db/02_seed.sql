INSERT INTO members (name, email, member_type, joined_at) VALUES
('Ana López', 'ana@mail.com', 'student', '2023-01-10'),
('Carlos Ruiz', 'carlos@mail.com', 'teacher', '2022-08-05'),
('Luis Gómez', 'luis@mail.com', 'student', '2023-06-01'),
('Fernanda Torres', 'fer@mail.com', 'external', '2022-11-15'),
('María Pérez', 'maria@mail.com', 'student', '2023-03-20');

INSERT INTO books (title, author, category, isbn) VALUES
('Clean Code', 'Robert Martin', 'Programming', '1111'),
('The Pragmatic Programmer', 'Andrew Hunt', 'Programming', '2222'),
('1984', 'George Orwell', 'Novel', '3333'),
('Refactoring', 'Martin Fowler', 'Programming', '4444'),
('Animal Farm', 'George Orwell', 'Novel', '5555');

INSERT INTO copies (book_id, barcode, status) VALUES
(1, 'BC001', 'available'),
(1, 'BC002', 'loaned'),
(2, 'BC003', 'available'),
(3, 'BC004', 'loaned'),
(2, 'BC005', 'loaned'),
(4, 'BC006', 'available'),
(5, 'BC007', 'lost');


INSERT INTO loans (copy_id, member_id, loaned_at, due_at, returned_at) VALUES
(2, 1, '2024-01-01', '2024-01-10', NULL),
(4, 2, '2024-01-05', '2024-01-12', '2024-01-15'),
(5, 3, '2024-02-01', '2024-02-10', NULL),      
(6, 4, '2024-03-05', '2024-03-12', '2024-03-10'), 
(7, 5, '2024-01-15', '2024-01-25', NULL);       


INSERT INTO fines (loan_id, amount, paid_at) VALUES
(2, 50.00, NULL),
(3, 30.00, '2024-03-15'),
(4, 45.00, NULL);