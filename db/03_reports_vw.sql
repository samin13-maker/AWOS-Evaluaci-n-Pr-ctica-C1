CREATE OR REPLACE VIEW vw_most_borrowed_books AS
SELECT
    b.id AS book_id,
    b.title,
    b.author,
    COUNT(l.id) AS total_prestamos,
    RANK() OVER (ORDER BY COUNT(l.id) DESC) AS ranking
FROM books b
JOIN copies c ON c.book_id = b.id
JOIN loans l ON l.copy_id = c.id
GROUP BY b.id, b.title, b.author;


CREATE OR REPLACE VIEW vw_overdue_loans AS
WITH overdue AS (
    SELECT
        l.id AS loan_id,
        m.name AS member_name,
        b.title AS book_title,
        l.loaned_at,
        l.due_at,
        CURRENT_DATE - l.due_at AS dias_atraso
    FROM loans l
    JOIN members m ON m.id = l.member_id
    JOIN copies c ON c.id = l.copy_id
    JOIN books b ON b.id = c.book_id
    WHERE l.returned_at IS NULL
      AND l.due_at < CURRENT_DATE
)
SELECT
    loan_id,
    member_name,
    book_title,
    loaned_at,
    due_at,
    dias_atraso,
    CASE
        WHEN dias_atraso <= 5 THEN dias_atraso * 5
        ELSE dias_atraso * 10
    END AS monto_sugerido
FROM overdue;


CREATE OR REPLACE VIEW vw_fines_summary AS
SELECT
    DATE_TRUNC('month', l.due_at) AS mes,
    SUM(CASE WHEN f.paid_at IS NOT NULL THEN f.amount ELSE 0 END) AS total_pagadas,
    SUM(CASE WHEN f.paid_at IS NULL THEN f.amount ELSE 0 END) AS total_pendientes
FROM fines f
JOIN loans l ON l.id = f.loan_id
GROUP BY DATE_TRUNC('month', l.due_at)
HAVING SUM(f.amount) > 0;


CREATE OR REPLACE VIEW vw_member_activity AS
SELECT
    m.id AS member_id,
    m.name,
    COUNT(l.id) AS total_prestamos,
    SUM(
        CASE
            WHEN l.returned_at IS NULL AND l.due_at < CURRENT_DATE THEN 1
            ELSE 0
        END
    ) AS prestamos_atrasados,
    ROUND(
        COALESCE(
            SUM(
                CASE
                    WHEN l.returned_at IS NULL AND l.due_at < CURRENT_DATE THEN 1
                    ELSE 0
                END
            )::NUMERIC / NULLIF(COUNT(l.id), 0),
            0
        ) * 100,
        2
    ) AS tasa_atraso
FROM members m
JOIN loans l ON l.member_id = m.id
GROUP BY m.id, m.name
HAVING COUNT(l.id) > 0;


CREATE OR REPLACE VIEW vw_inventory_health AS
SELECT
    b.category,
    SUM(CASE WHEN c.status = 'available' THEN 1 ELSE 0 END) AS disponibles,
    SUM(CASE WHEN c.status = 'loaned' THEN 1 ELSE 0 END) AS prestados,
    SUM(CASE WHEN c.status = 'lost' THEN 1 ELSE 0 END) AS perdidos
FROM books b
JOIN copies c ON c.book_id = b.id
GROUP BY b.category;