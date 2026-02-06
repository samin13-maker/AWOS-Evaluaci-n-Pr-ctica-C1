CREATE ROLE app_user
WITH LOGIN PASSWORD 'app123';

GRANT CONNECT ON DATABASE library TO app_user;

GRANT USAGE ON SCHEMA public TO app_user;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app_user;

GRANT SELECT ON
  vw_most_borrowed_books,
  vw_member_activity,
  vw_inventory_health
TO app_user;